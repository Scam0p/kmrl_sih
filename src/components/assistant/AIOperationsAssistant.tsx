import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  RotateCcw, 
  X, 
  Sparkles, 
  ArrowRight, 
  Train as TrainIcon, 
  AlertTriangle, 
  Activity, 
  Cpu, 
  Clock, 
  Layers, 
  CheckCircle2, 
  HelpCircle, 
  ChevronRight,
  ShieldAlert,
  Radio
} from 'lucide-react';
import { Train, Station, KPISet, AIRecommendation, AIEventLog, CaseType, ScenarioType } from '../../types/simulation';
import { useAuth } from '../../context/AuthContext';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  timestamp: string;
  text: string;
  richData?: {
    type: 'trains' | 'station' | 'recommendation' | 'summary' | 'alert';
    data?: any;
  };
  recommendationLink?: boolean;
}

interface AIOperationsAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  trains: Train[];
  stations: Station[];
  kpis: KPISet;
  recommendations: AIRecommendation[];
  eventLogs: AIEventLog[];
  currentCase: CaseType;
  activeScenario: ScenarioType;
  simTime: string;
  onNavigateToRecommendation?: () => void;
}

const SUGGESTED_QUESTIONS = [
  "Which train has the highest passenger load?",
  "Which trains are currently in service?",
  "What is the current network status?",
  "Are there any active incidents or alerts?",
  "Which station has the highest congestion?",
  "Which trains are available for induction?",
  "Why is T04 being flagged?",
  "Summarize the current operational situation."
];

export const AIOperationsAssistant: React.FC<AIOperationsAssistantProps> = ({
  isOpen,
  onClose,
  trains,
  stations,
  kpis,
  recommendations,
  eventLogs,
  currentCase,
  activeScenario,
  simTime,
  onNavigateToRecommendation
}) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with OCC Intelligence Welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome-msg',
          sender: 'ai',
          timestamp: simTime || '08:42 IST',
          text: `Welcome, ${user?.name || 'OCC Officer'} (${user?.roleTitle || 'Operator'}). I am the KMRL AI Operations Assistant. I monitor real-time GoA2 telemetry, passenger queues across Aluva–Tripunithura, and Pareto dispatch schedules. How can I assist your shift?`
        }
      ]);
    }
  }, [user, simTime]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const activeTrainsCount = trains.filter(t => t.status === 'IN_SERVICE' || t.status === 'INDUCTING').length;
  const activeAlertsCount = eventLogs.filter(l => l.type === 'ANOMALY' || l.type === 'WARNING').length;

  // Process and compute dynamic context-aware answer
  const generateAIResponse = (query: string): ChatMessage => {
    const q = query.toLowerCase().trim();
    const timestamp = simTime || '08:42 IST';

    // 1. Highest load query
    if (q.includes('highest') && (q.includes('load') || q.includes('passenger') || q.includes('crowd'))) {
      const sortedByLoad = [...trains].sort((a, b) => (b.passengerLoad / b.capacity) - (a.passengerLoad / a.capacity));
      const topTrain = sortedByLoad[0];
      const loadPct = Math.round((topTrain.passengerLoad / topTrain.capacity) * 100);

      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        timestamp,
        text: `Trainset ${topTrain.id} (${topTrain.name}) currently has the highest passenger load at ${loadPct}% (${topTrain.passengerLoad} / ${topTrain.capacity} PAX).`,
        richData: {
          type: 'trains',
          data: {
            id: topTrain.id,
            name: topTrain.name,
            status: topTrain.status,
            speed: topTrain.speedKmh,
            location: topTrain.location,
            direction: topTrain.direction === 'DOWN' ? 'SOUTHBOUND (Tripunithura)' : 'NORTHBOUND (Aluva)',
            motorTemp: topTrain.motorTempC
          }
        }
      };
    }

    // 2. In-Service trains query
    if (q.includes('in service') || (q.includes('which trains') && q.includes('service')) || q.includes('active trains')) {
      const inService = trains.filter(t => t.status === 'IN_SERVICE' || t.status === 'INDUCTING');
      const listStr = inService.map(t => `${t.id} (${t.location}, ${t.speedKmh} km/h)`).join('; ');

      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        timestamp,
        text: `Currently ${inService.length} out of ${trains.length} trainsets are in active revenue service on the mainline:\n• ${listStr}\nAll units are synchronized in GoA2 CBTC automated speed regulation.`
      };
    }

    // 3. Available for induction / Standby query
    if (q.includes('available') || q.includes('induction') || q.includes('standby') || q.includes('hot reserve')) {
      const available = trains.filter(t => t.status === 'READY_INDUCTION' || t.status === 'STANDBY');
      const rec = recommendations.find(r => r.status === 'PENDING');

      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        timestamp,
        text: available.length > 0
          ? `There are ${available.length} trainsets ready for dynamic siding turnout at Muttom Depot: ${available.map(t => t.id + ' (' + t.status.replace('_', ' ') + ')').join(', ')}.\n${rec ? `AI recommends deploying ${rec.trainId} to mitigate platform wait times.` : 'Siding merge interlocks are cleared for GoA2 injection within 42ms.'}`
          : `All fleet trainsets are currently committed to active mainline service.`,
        recommendationLink: !!rec
      };
    }

    // 4. Why is T04 flagged / maintenance query
    if (q.includes('t04') || q.includes('flagged') || q.includes('breakdown') || q.includes('fault')) {
      const t04 = trains.find(t => t.id === 'T04');
      const isMaint = t04?.status === 'MAINTENANCE';
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        timestamp,
        text: `Trainset T04 (Bravo-02) Telemetry Alert:\n• Stator Inverter Temperature: ${t04?.motorTempC || 74}°C (Threshold Warning: >70°C).\n• Current State: ${t04?.status.replace('_', ' ')} at ${t04?.location || 'Kalamassery'}.\n• AI Mitigation: Automated hot-reserve swap recommended to isolate T04 to Muttom Depot Bay 4 and inject T08 to preserve 04:30 headway.`,
        recommendationLink: true
      };
    }

    // 5. Station congestion query
    if (q.includes('station') || q.includes('congestion') || q.includes('edappally') || q.includes('waiting') || q.includes('surge')) {
      const sortedStations = [...stations].sort((a, b) => b.passengerDemandPct - a.passengerDemandPct);
      const topStation = sortedStations[0];

      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        timestamp,
        text: `${topStation.name} currently exhibits the highest corridor passenger surge at ${topStation.passengerDemandPct}% capacity with ${topStation.waitingCount} passengers on the platform.\nPlatform inflow rate: ${topStation.inflowRatePerMin} PAX/min. Automated dwell compression active.`,
        richData: {
          type: 'station',
          data: topStation
        }
      };
    }

    // 6. Network status / Corridor summary
    if (q.includes('network status') || q.includes('corridor') || q.includes('line') || q.includes('cbtc')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        timestamp,
        text: `Kochi Metro Rail Corridor Operational Status:\n• Alignment: Aluva Terminal ↔ Tripunithura Terminal (25.6 km)\n• Signaling: Alstom Urbalis 400 GoA2 CBTC Bidirectional Link\n• Traction Grid: 750V DC Bottom-Contact Third Rail (Nominal 748V)\n• Active Paradigm: ${currentCase.toUpperCase()} ARCHITECTURE\n• Current Headway: ${currentCase === 'ai' ? '04:30 min (Optimized)' : currentCase === 'conventional' ? '06:00 min (Fixed Timetable)' : '08:00 min (Manual Dispatch)'}`
      };
    }

    // 7. Active incidents or alerts query
    if (q.includes('incident') || q.includes('alert') || q.includes('anomaly') || q.includes('warning')) {
      const recentAlerts = eventLogs.filter(l => l.type === 'ANOMALY' || l.type === 'WARNING').slice(0, 3);
      if (recentAlerts.length > 0) {
        return {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          timestamp,
          text: `Active OCC Alerts & Audit Logs (${recentAlerts.length} logged):\n${recentAlerts.map(a => `• [${a.time}] ${a.title}: ${a.detail}`).join('\n')}`
        };
      }
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        timestamp,
        text: `No critical track circuit anomalies or emergency brake applications reported. All sensors nominal.`
      };
    }

    // 8. Situation summary / KPI report
    if (q.includes('summar') || q.includes('situation') || q.includes('report') || q.includes('kpi') || q.includes('overview')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        timestamp,
        text: `KMRL OCC Operational Situation Report [${timestamp}]:\n• Headway Consistency: ${kpis.headwayConsistencyPct}%\n• Average Passenger Wait Time: ${kpis.avgWaitTimeMin} min\n• Fleet Utilization: ${kpis.fleetUtilizationPct}%\n• Energy Efficiency Index: ${kpis.energyCostIndex} (28.6% regenerative recovery)\n• Active Fleet: ${activeTrainsCount}/${trains.length} units deployed\n• Operating Mode: ${currentCase.toUpperCase()} induction engine active.`,
        recommendationLink: recommendations.some(r => r.status === 'PENDING')
      };
    }

    // Generic Fallback
    return {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      timestamp,
      text: `I have analyzed your query regarding "${query}". In the current operational dataset, all 8 Alstom Metropolis units and 5 terminal stations are operating under ${currentCase.toUpperCase()} mode at ${timestamp} IST. You can ask for specific train telemetry (e.g. T01-T08), station loads, active incidents, or AI induction recommendations.`
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: simTime || '08:42 IST',
      text: text.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Realistic OCC Copilot processing delay
    setTimeout(() => {
      const response = generateAIResponse(text);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 450);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-clear-${Date.now()}`,
        sender: 'ai',
        timestamp: simTime || '08:42 IST',
        text: `Conversation cleared. Ready for new operational queries, ${user?.name || 'Officer'}.`
      }
    ]);
  };

  const handleReviewRecommendationClick = () => {
    onClose();
    if (onNavigateToRecommendation) {
      onNavigateToRecommendation();
    } else {
      const el = document.getElementById('ai-engine-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#170C79]/75 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-4xl h-[88vh] max-h-[750px] bg-[#8ACBD0] rounded-2xl p-2 border-2 border-[#56B6C6]/60 shadow-2xl font-mono-tech flex flex-col justify-between overflow-hidden">
        {/* Top Window Bezel with Micro-Rivets & Master Header */}
        <div className="flex items-center justify-between px-3 pt-2 pb-1.5 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
            </div>
            <div className="p-1 rounded-md bg-[#EFE3CA] border border-[#8ACBD0] text-[#170C79]">
              <Bot className="w-4 h-4 text-[#56B6C6]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-mono-tech font-bold text-sm sm:text-base text-[#170C79] uppercase tracking-wide">
                  KMRAIL OPERATIONS ASSISTANT
                </h3>
                <span className="hidden sm:inline-block text-[8.5px] font-mono-tech px-2 py-0.5 rounded bg-[#170C79] text-[#EFE3CA] font-bold">
                  OCC-PARETO-V4 • 12ms
                </span>
              </div>
              <span className="font-inter text-[10.5px] text-[#2C2B68] font-medium hidden sm:block">
                Operational intelligence for authorized personnel • Smart India Hackathon 2026
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearChat}
              className="px-2.5 py-1 rounded-lg bg-[#EFE3CA] hover:bg-[#FFFFFF] text-[#170C79] border border-[#8ACBD0] text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1"
              title="Clear conversation"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">RESET CHAT</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#EFE3CA] hover:bg-[#FFFFFF] text-[#170C79] transition-colors cursor-pointer border border-[#8ACBD0]"
              aria-label="Close AI Assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Inner Main Inset Panel */}
        <div className="bg-[#EFE3CA] rounded-xl p-3 sm:p-4 border border-[#8ACBD0] shadow-inner flex flex-col justify-between flex-1 overflow-hidden space-y-3">
          {/* Quick Live Status Context Panel at Top */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 p-2 rounded-xl bg-[#FFFFFF] border border-[#8ACBD0] shadow-xs text-xs font-mono-tech flex-shrink-0">
            <div className="p-1.5 rounded-lg bg-[#F6F1E6] border border-[#8ACBD0]/40">
              <span className="text-[9px] text-[#2C2B68] font-bold block">ACTIVE TRAINS</span>
              <span className="text-xs font-bold text-[#170C79] flex items-center gap-1">
                <TrainIcon className="w-3 h-3 text-[#56B6C6]" />
                {activeTrainsCount}/{trains.length} Units
              </span>
            </div>

            <div className="p-1.5 rounded-lg bg-[#F6F1E6] border border-[#8ACBD0]/40">
              <span className="text-[9px] text-[#2C2B68] font-bold block">ACTIVE ALERTS</span>
              <span className={`text-xs font-bold flex items-center gap-1 ${activeAlertsCount > 0 ? 'text-[#C53030]' : 'text-[#2E8B57]'}`}>
                <AlertTriangle className="w-3 h-3" />
                {activeAlertsCount} Flagged
              </span>
            </div>

            <div className="p-1.5 rounded-lg bg-[#F6F1E6] border border-[#8ACBD0]/40 col-span-2 sm:col-span-1">
              <span className="text-[9px] text-[#2C2B68] font-bold block">NETWORK STATUS</span>
              <span className="text-xs font-bold text-[#170C79] truncate block">
                750V DC GoA2
              </span>
            </div>

            <div className="p-1.5 rounded-lg bg-[#F6F1E6] border border-[#8ACBD0]/40">
              <span className="text-[9px] text-[#2C2B68] font-bold block">CURRENT MODE</span>
              <span className="text-xs font-bold text-[#56B6C6] uppercase">
                {currentCase === 'ai' ? '03. AI Dynamic' : currentCase === 'conventional' ? '02. CBTC' : '01. Manual'}
              </span>
            </div>

            <div className="p-1.5 rounded-lg bg-[#F6F1E6] border border-[#8ACBD0]/40">
              <span className="text-[9px] text-[#2C2B68] font-bold block">SIMULATION TIME</span>
              <span className="text-xs font-bold text-[#170C79]">
                {simTime} IST
              </span>
            </div>
          </div>

          {/* Conversation Chat Stream */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {/* Header label & timestamp */}
                <div className="flex items-center gap-2 mb-1 px-1 text-[10px] font-mono-tech text-[#2C2B68]">
                  <span className="font-bold text-[#170C79]">
                    {msg.sender === 'user' ? (user?.name || 'OCC Officer') : 'KMRL AI OCC COPILOT'}
                  </span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] sm:max-w-[78%] p-3.5 rounded-2xl text-xs shadow-xs font-inter leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#170C79] text-[#EFE3CA] rounded-tr-none font-medium'
                      : 'bg-[#FFFFFF] text-[#170C79] border border-[#8ACBD0] rounded-tl-none font-medium'
                  }`}
                >
                  <p className="whitespace-pre-line font-inter">{msg.text}</p>

                  {/* Rich Data Card if present */}
                  {msg.richData && msg.richData.type === 'trains' && (
                    <div className="mt-2.5 p-2.5 rounded-xl bg-[#F6F1E6] border border-[#8ACBD0] font-mono-tech text-[11px] space-y-1">
                      <div className="flex justify-between font-bold text-[#170C79]">
                        <span>TRAINSET: {msg.richData.data.id}</span>
                        <span className="text-[#56B6C6]">{msg.richData.data.status}</span>
                      </div>
                      <div className="flex justify-between text-[#2C2B68]">
                        <span>VELOCITY: {msg.richData.data.speed} km/h</span>
                        <span>MOTOR TEMP: {msg.richData.data.motorTemp}°C</span>
                      </div>
                      <div className="text-[10px] text-[#170C79] font-bold">
                        BLOCK: {msg.richData.data.location}
                      </div>
                    </div>
                  )}

                  {/* Recommendation CTA button */}
                  {msg.recommendationLink && (
                    <div className="mt-3 pt-2.5 border-t border-[#8ACBD0]/40 flex items-center justify-between">
                      <span className="text-[10.5px] font-mono-tech text-[#56B6C6] font-bold">
                        AI INDUCTION PROPOSAL PENDING
                      </span>
                      <button
                        onClick={handleReviewRecommendationClick}
                        className="px-3 py-1 rounded-lg bg-[#170C79] hover:bg-[#56B6C6] hover:text-[#170C79] text-[#EFE3CA] font-mono-tech font-bold text-[10px] uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                      >
                        <span>REVIEW RECOMMENDATION</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 p-2 text-xs font-mono-tech text-[#2C2B68]">
                <Bot className="w-4 h-4 text-[#56B6C6] animate-pulse" />
                <span>AI analyzing corridor sensor telemetry...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Questions Strip */}
          <div className="space-y-1.5 flex-shrink-0 pt-1 border-t border-[#8ACBD0]/40">
            <span className="text-[9.5px] uppercase tracking-widest text-[#2C2B68] font-bold block">
              SUGGESTED OPERATIONAL INQUIRIES:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono-tech text-xs scrollbar-thin">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="px-2.5 py-1 rounded-lg bg-[#FFFFFF] hover:bg-[#170C79] hover:text-[#EFE3CA] text-[#170C79] border border-[#8ACBD0] transition-colors cursor-pointer text-[10.5px] whitespace-nowrap font-medium flex items-center gap-1 shadow-2xs"
                >
                  <Sparkles className="w-2.5 h-2.5 text-[#D9A24B]" />
                  <span>{q}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Box & Send Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 pt-1 flex-shrink-0"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about trains, stations, incidents or operations..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border-2 border-[#8ACBD0] focus:border-[#56B6C6] focus:outline-none text-xs font-mono-tech text-[#170C79] placeholder-[#2C2B68]/50 shadow-xs transition-colors"
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="py-2.5 px-4 rounded-xl bg-[#170C79] hover:bg-[#56B6C6] hover:text-[#170C79] disabled:opacity-50 text-[#EFE3CA] font-mono-tech font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 shadow-md flex-shrink-0"
            >
              <span>SEND</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
