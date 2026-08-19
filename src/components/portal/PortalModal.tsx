import React, { useState } from 'react';
import { 
  X, 
  AlertTriangle, 
  Wrench, 
  BarChart2, 
  History, 
  HelpCircle, 
  Bot, 
  Bell, 
  User, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Search,
  BookOpen,
  Radio
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export type PortalModalView = 
  | 'alerts' 
  | 'maintenance' 
  | 'analytics' 
  | 'decision-history' 
  | 'faqs' 
  | 'ai-assistant' 
  | 'notifications' 
  | 'profile' 
  | null;

interface PortalModalProps {
  view: PortalModalView;
  onClose: () => void;
}

interface SOPItem {
  id: string;
  code: string;
  title: string;
  category: 'DISPATCH' | 'SAFETY' | 'DEMAND' | 'ROLLING_STOCK' | 'DEPOT';
  categoryLabel: string;
  trigger: string;
  cbtcLevel: string;
  authorizedRoles: string;
  steps: string[];
  safetyNote: string;
}

const KMRL_SOPS: SOPItem[] = [
  {
    id: 'sop-01',
    code: 'SOP-01',
    title: 'MORNING REVENUE INDUCTION & MAINLINE CLEARANCE',
    category: 'DISPATCH',
    categoryLabel: 'MAINLINE DISPATCH',
    trigger: 'Daily shift start at 05:45 IST prior to morning passenger service commencement.',
    cbtcLevel: 'GoA2 Automated Dispatch • Interlock 750V DC Energized',
    authorizedRoles: 'OCC Duty Controller, Operations Manager',
    steps: [
      'Confirm 750V DC third-rail traction voltage nominal across Aluva–Tripunithura (748V DC).',
      'Verify track circuit continuity and axle-counter calibration from Muttom Depot SCADA.',
      'Execute GoA2 automated rollout for initial 4 trainset consists at 3-minute intervals.',
      'Validate platform screen door (PSD) synchronization at all 22 passenger stations.',
      'Log mainline readiness sign-off in OCC Shift Ledger before 06:00 revenue opening.'
    ],
    safetyNote: 'No trainset may enter mainline block unless ATP beacon bidirectional handshake returns zero packet loss.'
  },
  {
    id: 'sop-02',
    code: 'SOP-02',
    title: 'PEAK-HOUR DYNAMIC SIDING TURNOUT & GAP INJECTION',
    category: 'DISPATCH',
    categoryLabel: 'OCC AUTOMATION',
    trigger: 'AI Pareto Solver detects platform waiting queues >180 PAX or headway compression demand.',
    cbtcLevel: 'GoA2 Dynamic Injection • 42ms Turnout Solve',
    authorizedRoles: 'OCC Controller, Operations Manager, AI System Lead',
    steps: [
      'AI solver identifies optimal merge gap in mainline sequence without delaying active consists.',
      'OCC Controller reviews recommended candidate trainset (e.g. T06 / T08) on siding track 2.',
      'Authorize GoA2 turnout switch turnout interlock; signals auto-set to permissive 35 km/h.',
      'Trainset accelerates smoothly onto mainline, merging into targeted 04:30 headway slot.',
      'Verify passenger distribution re-stabilization across downstream stations within 2 cycles.'
    ],
    safetyNote: 'Siding turnout injection is automatically aborted if approaching mainline consist is within 180m safety block.'
  },
  {
    id: 'sop-03',
    code: 'SOP-03',
    title: 'PLATFORM CROWD SURGE & AUTOMATED HEADWAY COMPRESSION',
    category: 'DEMAND',
    categoryLabel: 'DEMAND MANAGEMENT',
    trigger: 'Station platform CCTV density exceeds 75% capacity (e.g. Edappally / Kaloor / JLN Stadium).',
    cbtcLevel: 'GoA2 Adaptive Timetable Dwell Regulation',
    authorizedRoles: 'OCC Duty Operator, Station Controller',
    steps: [
      'CCTV AI vision alerts OCC of passenger platform backlog exceeding normal boarding limits.',
      'Trigger automated headway compression from 06:00 min down to 04:00 min.',
      'Adjust station dwell times dynamically (+15s at bottleneck station, -10s at low-load stations).',
      'Station Controller enables queue guidance audio broadcasts and secondary boarding turnstiles.',
      'Monitor passenger clearance rate until platform density normalizes below 50% capacity.'
    ],
    safetyNote: 'Platform dwell extension must not exceed 45 seconds to prevent trailing train bunching.'
  },
  {
    id: 'sop-04',
    code: 'SOP-04',
    title: 'HOT-RESERVE TRAINSET SUBSTITUTION & SIDING SWAP',
    category: 'ROLLING_STOCK',
    categoryLabel: 'ROLLING STOCK',
    trigger: 'Active in-service trainset experiences sub-system fault (HVAC / Inverter / Traction Motor).',
    cbtcLevel: 'GoA2 Siding Turnaround & Consist Replacement',
    authorizedRoles: 'OCC Controller, Maintenance Engineer',
    steps: [
      'Receive telemetry fault alarm from active trainset (e.g. T04 Inverter Thermal Warning).',
      'Identify nearest depot bypass siding (Muttom Siding Track 1 / Track 2).',
      'Deploy Hot-Reserve unit (e.g. T08) from Muttom Depot to intercept the exact scheduled timetable slot.',
      'Direct degraded trainset into maintenance bypass siding after disembarking passengers.',
      'Handoff faulted trainset to Muttom Depot Servicing Bay for root-cause diagnostic.'
    ],
    safetyNote: 'Hot-reserve consist must complete full traction brake test prior to mainline track entry.'
  },
  {
    id: 'sop-05',
    code: 'SOP-05',
    title: 'TRACTION MOTOR THERMAL ALERT & DEGRADED MODE PROTOCOL',
    category: 'SAFETY',
    categoryLabel: 'TRACTION & SAFETY',
    trigger: 'Traction motor stator temperature exceeds 70°C threshold (Nominal: 45°–60°C).',
    cbtcLevel: 'GoA2 Speed Derating • Power Limiter Active',
    authorizedRoles: 'OCC Controller, Rolling Stock Depot Lead',
    steps: [
      'OCC alarm annunciator flashes thermal alert with exact motor temperature readout.',
      'CBTC system automatically applies 20% power derating to prevent motor stator insulation damage.',
      'Instruct driver/controller to disembark passengers at next scheduled station terminal.',
      'Route consist to Muttom Maintenance Bay 4 for forced-air cooling and thermal sensor calibration.',
      'Log temperature telemetry time-series graph in OCC Maintenance Audit Ledger.'
    ],
    safetyNote: 'If motor temperature exceeds 85°C, immediate emergency coasting to next platform is mandated.'
  },
  {
    id: 'sop-06',
    code: 'SOP-06',
    title: 'EMERGENCY BRAKING & TRACK CIRCUIT INTERLOCKING RECOVERY',
    category: 'SAFETY',
    categoryLabel: 'SIGNALING & SAFETY',
    trigger: 'Uncommanded ATP emergency brake trip or track circuit loss of shunt.',
    cbtcLevel: 'GoA2 Fail-Safe Hold • Manual Dispatch Clearance',
    authorizedRoles: 'OCC Controller, Signal Engineer, Chief Operations Manager',
    steps: [
      'Immediate red signal clamp applied to 500m upstream and downstream track sectors.',
      'OCC establishes voice radio contact with consist driver/in-cab technician.',
      'Verify track circuit physical integrity, turnout position, and obstacle detection sensors.',
      'Once verified clear, OCC issues verbal & electronic authorization for 25 km/h restricted manual advance.',
      'Restore GoA2 automated supervision once trainset clears affected interlocking zone.'
    ],
    safetyNote: 'Emergency brake reset requires dual-key electronic sign-off from OCC Master Controller.'
  },
  {
    id: 'sop-07',
    code: 'SOP-07',
    title: 'TRIPUNITHURA TERMINAL REVERSING & CROSSOVER OPERATIONS',
    category: 'DISPATCH',
    categoryLabel: 'TERMINAL TURNOUT',
    trigger: 'Inbound trainset reaches southern terminal station for turnaround to northbound Aluva service.',
    cbtcLevel: 'GoA2 Automated Reversing • 90-Second Dwell',
    authorizedRoles: 'OCC Controller, Station Controller',
    steps: [
      'Trainset docks at Platform 1/2; automated PSD doors open for 30s passenger egress.',
      'ATO system executes automatic trailing cab handover to leading cab in under 20 seconds.',
      'Interlocking switches scissor crossover points to Northbound Up-Line track.',
      'Passenger boarding begins; route display updates to "NORTHBOUND • ALUVA TERMINAL".',
      'Trainset departs on schedule within targeted 90-second total dwell turnaround window.'
    ],
    safetyNote: 'Crossover track switch points must be mechanically locked before departure signal turns permissive green.'
  },
  {
    id: 'sop-08',
    code: 'SOP-08',
    title: 'MUTTOM DEPOT NIGHT STABLING & PREVENTATIVE SERVICING',
    category: 'DEPOT',
    categoryLabel: 'DEPOT LOGISTICS',
    trigger: 'Revenue service close at 23:00 IST for overnight rolling stock inspection.',
    cbtcLevel: 'GoA1 / Manual Depot Shunting Protocol',
    authorizedRoles: 'Muttom Depot Lead, Maintenance Technicians',
    steps: [
      'Mainline trainsets sequentially return to Muttom Depot Stabling Tracks 1 through 8.',
      'Automated exterior wash plant run and pantograph 750V DC collector shoe wear inspection.',
      'Connect diagnostic datalogger to download daily blackbox telemetry and energy regen records.',
      'Perform ultrasonic wheelset crack detection and bogie suspension damping checks.',
      'Sign off rolling stock readiness certificate for next morning 05:45 revenue rollout.'
    ],
    safetyNote: 'Depot third-rail traction power must be isolated and grounded before technicians enter undercarriage pit.'
  }
];

export const PortalModal: React.FC<PortalModalProps> = ({ view, onClose }) => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [expandedSOP, setExpandedSOP] = useState<string>('sop-01');
  const [searchQuery, setSearchQuery] = useState('');

  if (!view) return null;

  const filteredSOPs = KMRL_SOPS.filter((sop) => {
    const matchesCat = selectedCategory === 'ALL' || sop.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      sop.code.toLowerCase().includes(q) || 
      sop.title.toLowerCase().includes(q) || 
      sop.categoryLabel.toLowerCase().includes(q) ||
      sop.trigger.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const renderContent = () => {
    switch (view) {
      case 'alerts':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#8ACBD0]">
              <div className="p-2.5 rounded-xl bg-[#C53030]/15 border border-[#C53030]/40 text-[#C53030]">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-mono-tech font-bold text-base text-[#170C79]">
                  ALERTS & INCIDENT MANAGEMENT CONSOLE
                </h3>
                <span className="text-xs font-inter text-[#2C2B68]">
                  Active signal anomalies, platform crowd surges, and track circuit alarms
                </span>
              </div>
            </div>

            <div className="space-y-2 font-mono-tech text-xs">
              <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#170C79] flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-[#C53030]/20 text-[#C53030] text-[9px]">CRITICAL</span>
                    <span>T04 Traction Inverter Thermal Warning</span>
                  </div>
                  <p className="font-inter text-xs text-[#2C2B68] mt-1">
                    Bogie inverter operating at 74°C. Dynamic hot-reserve substitution recommended.
                  </p>
                </div>
                <span className="text-[10px] text-[#2C2B68] font-mono-tech">08:34 IST</span>
              </div>

              <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#170C79] flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-[#D9A24B]/20 text-[#170C79] text-[9px]">HIGH LOAD</span>
                    <span>Edappally Inflow Surge (+45%)</span>
                  </div>
                  <p className="font-inter text-xs text-[#2C2B68] mt-1">
                    Platform waiting count exceeded 280 PAX. Automated headway compression active.
                  </p>
                </div>
                <span className="text-[10px] text-[#2C2B68] font-mono-tech">08:38 IST</span>
              </div>

              <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#170C79] flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-[#2E8B57]/20 text-[#2E8B57] text-[9px]">RESOLVED</span>
                    <span>Aluva Interlocking Signal Calibration</span>
                  </div>
                  <p className="font-inter text-xs text-[#2C2B68] mt-1">
                    Turnout sensor GoA2 link synced with Muttom Depot SCADA dispatch.
                  </p>
                </div>
                <span className="text-[10px] text-[#2C2B68] font-mono-tech">08:12 IST</span>
              </div>
            </div>
          </div>
        );

      case 'maintenance':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#8ACBD0]">
              <div className="p-2.5 rounded-xl bg-[#56B6C6]/20 border border-[#56B6C6]/50 text-[#170C79]">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-mono-tech font-bold text-base text-[#170C79]">
                  MUTTOM ROLLING STOCK DEPOT MAINTENANCE
                </h3>
                <span className="text-xs font-inter text-[#2C2B68]">
                  Preventative servicing schedules, bogie overhauls, and wheelset ultrasonic testing
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono-tech text-xs">
              <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0]">
                <div className="flex justify-between text-[#2C2B68] text-[10px] font-bold">
                  <span>TRAINSET T04</span>
                  <span className="text-[#C53030]">MAINTENANCE DUE</span>
                </div>
                <div className="font-bold text-sm text-[#170C79] mt-1">Inverter Module B Inspection</div>
                <p className="font-inter text-[11px] text-[#2C2B68] mt-1">
                  Scheduled for Stabling Bay 4 • Estimated Downtime: 2.5 hrs
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0]">
                <div className="flex justify-between text-[#2C2B68] text-[10px] font-bold">
                  <span>TRAINSET T06</span>
                  <span className="text-[#2E8B57]">READY FOR SERVICE</span>
                </div>
                <div className="font-bold text-sm text-[#170C79] mt-1">30,000 km Bogie Lubrication Passed</div>
                <p className="font-inter text-[11px] text-[#2C2B68] mt-1">
                  Muttom Hot-Reserve Siding • Ready for Induction in 42ms
                </p>
              </div>
            </div>
          </div>
        );

      case 'decision-history':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#8ACBD0]">
              <div className="p-2.5 rounded-xl bg-[#56B6C6]/20 border border-[#56B6C6]/50 text-[#170C79]">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-mono-tech font-bold text-base text-[#170C79]">
                  OCC AUDIT TRAIL & DECISION HISTORY
                </h3>
                <span className="text-xs font-inter text-[#2C2B68]">
                  Immutable ledger of AI recommendations deployed by OCC Duty Controllers
                </span>
              </div>
            </div>

            <div className="space-y-2 font-mono-tech text-xs">
              <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0] flex justify-between items-center">
                <div>
                  <div className="font-bold text-[#170C79]">HOT-RESERVE INDUCTION: T06 → EDAPPALLY</div>
                  <div className="text-[11px] font-inter text-[#2C2B68]">Approved by Rajesh Kumar (KMRL-OP-4082)</div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded bg-[#2E8B57]/20 text-[#2E8B57] font-bold text-[9.5px]">EXECUTED</span>
                  <div className="text-[10px] text-[#2C2B68] mt-1">08:24 IST</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0] flex justify-between items-center">
                <div>
                  <div className="font-bold text-[#170C79]">HEADWAY COMPRESSION: 06:00 → 04:30 MIN</div>
                  <div className="text-[11px] font-inter text-[#2C2B68]">AI Pareto Solver Auto-Applied</div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded bg-[#56B6C6]/20 text-[#170C79] font-bold text-[9.5px]">OPTIMIZED</span>
                  <div className="text-[10px] text-[#2C2B68] mt-1">08:15 IST</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'faqs':
        return (
          <div className="space-y-4">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#8ACBD0]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#170C79] text-[#EFE3CA]">
                  <BookOpen className="w-5 h-5 text-[#56B6C6]" />
                </div>
                <div>
                  <h3 className="font-mono-tech font-bold text-base text-[#170C79]">
                    STANDARD OPERATING PROCEDURES (SOP) MANUAL
                  </h3>
                  <span className="text-xs font-inter text-[#2C2B68]">
                    Official KMRL OCC Protocols for GoA2 CBTC, Dynamic Siding Turnout, and Emergency Response
                  </span>
                </div>
              </div>

              {/* Search Bar for SOPs */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#2C2B68]" />
                <input
                  type="text"
                  placeholder="Search SOP code, title or trigger..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0] text-xs font-mono-tech text-[#170C79] placeholder-[#2C2B68]/60 focus:outline-none focus:border-[#56B6C6]"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono-tech text-xs scrollbar-thin">
              <span className="text-[10px] font-bold text-[#2C2B68] uppercase mr-1">CATEGORY:</span>
              {[
                { id: 'ALL', label: 'All SOPs (8)' },
                { id: 'DISPATCH', label: 'Dispatch & Siding' },
                { id: 'DEMAND', label: 'Demand & Headway' },
                { id: 'ROLLING_STOCK', label: 'Rolling Stock' },
                { id: 'SAFETY', label: 'Safety & Interlock' },
                { id: 'DEPOT', label: 'Depot Operations' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition-colors cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-[#170C79] text-[#EFE3CA]'
                      : 'bg-[#FFFFFF] text-[#2C2B68] hover:bg-[#F6F1E6] border border-[#8ACBD0]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Comprehensive SOP Accordion List */}
            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1 font-mono-tech text-xs scrollbar-thin">
              {filteredSOPs.map((sop) => {
                const isExpanded = expandedSOP === sop.id;

                return (
                  <div
                    key={sop.id}
                    className="rounded-xl bg-[#FFFFFF] border border-[#8ACBD0] overflow-hidden shadow-xs"
                  >
                    {/* SOP Header Row */}
                    <button
                      onClick={() => setExpandedSOP(isExpanded ? '' : sop.id)}
                      className="w-full p-3.5 text-left flex items-center justify-between hover:bg-[#F6F1E6]/60 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 rounded bg-[#170C79] text-[#EFE3CA] font-bold text-[10px]">
                          {sop.code}
                        </span>
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-[#170C79]">
                            {sop.title}
                          </h4>
                          <span className="text-[10px] text-[#56B6C6] font-bold">
                            {sop.categoryLabel} • {sop.cbtcLevel}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-[#170C79]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#2C2B68]" />
                        )}
                      </div>
                    </button>

                    {/* SOP Expanded Details */}
                    {isExpanded && (
                      <div className="p-4 border-t border-[#8ACBD0]/50 bg-[#F6F1E6]/40 space-y-3">
                        {/* Trigger Condition */}
                        <div className="p-2.5 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0]">
                          <span className="text-[9.5px] font-bold text-[#2C2B68] uppercase block mb-0.5">
                            OPERATIONAL TRIGGER CONDITION:
                          </span>
                          <p className="font-inter text-xs text-[#170C79] font-medium leading-relaxed">
                            {sop.trigger}
                          </p>
                        </div>

                        {/* Step-by-Step Execution Protocol */}
                        <div className="space-y-1.5">
                          <span className="text-[9.5px] font-bold text-[#170C79] uppercase tracking-wider block">
                            MANDATED EXECUTION SEQUENCE:
                          </span>
                          <div className="space-y-1.5">
                            {sop.steps.map((step, stepIdx) => (
                              <div key={stepIdx} className="flex items-start gap-2.5 p-2 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0]">
                                <span className="w-5 h-5 rounded bg-[#170C79] text-[#EFE3CA] flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                                  {stepIdx + 1}
                                </span>
                                <p className="font-inter text-xs text-[#2C2B68] font-medium leading-relaxed">
                                  {step}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Safety Constraint Callout */}
                        <div className="p-2.5 rounded-lg bg-[#C53030]/10 border border-[#C53030]/30 text-xs flex items-start gap-2">
                          <ShieldCheck className="w-4 h-4 text-[#C53030] flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-[#C53030] block text-[10px] uppercase">
                              SAFETY CONSTRAINT & INTERLOCK MANDATE:
                            </span>
                            <span className="font-inter text-xs text-[#170C79] font-medium">
                              {sop.safetyNote}
                            </span>
                          </div>
                        </div>

                        {/* Authorized Roles Footer */}
                        <div className="flex items-center justify-between text-[10px] font-mono-tech text-[#2C2B68] pt-1">
                          <span>CLEARANCE: <strong className="text-[#170C79]">{sop.authorizedRoles}</strong></span>
                          <span className="text-[#56B6C6] font-bold">KMRL OCC REGULATION 2026</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#8ACBD0]">
              <div className="p-2.5 rounded-xl bg-[#56B6C6]/20 border border-[#56B6C6]/50 text-[#170C79]">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-mono-tech font-bold text-base text-[#170C79]">
                  OPERATIONAL NOTIFICATIONS & BROADCASTS
                </h3>
                <span className="text-xs font-inter text-[#2C2B68]">
                  System alerts, timetable synchronization events, and OCC shift handovers
                </span>
              </div>
            </div>

            <div className="space-y-2 font-mono-tech text-xs">
              <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0]">
                <div className="flex justify-between font-bold text-[#170C79]">
                  <span>AI Solver Timetable Synchronization Complete</span>
                  <span className="text-[#2C2B68] text-[10px]">Just now</span>
                </div>
                <p className="font-inter text-xs text-[#2C2B68] mt-0.5">
                  Real-time dwell times synced with Aluva and Edappally station platform displays.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0]">
                <div className="flex justify-between font-bold text-[#170C79]">
                  <span>Morning Shift Roster Confirmed</span>
                  <span className="text-[#2C2B68] text-[10px]">08:00 IST</span>
                </div>
                <p className="font-inter text-xs text-[#2C2B68] mt-0.5">
                  Officer Rajesh Kumar on duty at OCC Central Master Console.
                </p>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#8ACBD0]">
              <div className="w-12 h-12 rounded-xl bg-[#170C79] text-[#56B6C6] border-2 border-[#56B6C6] flex items-center justify-center font-bold text-lg">
                {user?.avatarInitials || 'KM'}
              </div>
              <div>
                <h3 className="font-mono-tech font-bold text-base text-[#170C79]">
                  {user?.name || 'KMRL Officer'}
                </h3>
                <span className="text-xs font-inter text-[#2C2B68]">
                  {user?.roleTitle} • {user?.employeeId}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono-tech text-xs">
              <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0]">
                <div className="text-[10px] text-[#2C2B68] font-bold">DEPARTMENT</div>
                <div className="font-bold text-[#170C79] mt-1">{user?.department}</div>
              </div>

              <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0]">
                <div className="text-[10px] text-[#2C2B68] font-bold">CLEARANCE LEVEL</div>
                <div className="font-bold text-[#56B6C6] mt-1">{user?.role}</div>
              </div>

              <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0]">
                <div className="text-[10px] text-[#2C2B68] font-bold">SECURITY ENCRYPTION</div>
                <div className="font-bold text-[#170C79] mt-1">SSL 256-Bit SHA-2</div>
              </div>

              <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0]">
                <div className="text-[10px] text-[#2C2B68] font-bold">LAST LOGIN SESSION</div>
                <div className="font-bold text-[#170C79] mt-1">{user?.lastLogin}</div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#170C79]/75 backdrop-blur-md animate-in fade-in select-none">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-[#EFE3CA] rounded-2xl p-5 border-2 border-[#8ACBD0] shadow-2xl font-mono-tech flex flex-col justify-between overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#8ACBD0] flex-shrink-0">
          <span className="text-[10px] uppercase tracking-widest text-[#170C79] font-bold">
            KMRL OPERATIONS CONSOLE • SIH 2026
          </span>

          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#FFFFFF] text-[#170C79] transition-colors cursor-pointer border border-[#8ACBD0]"
            aria-label="Close Console"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto py-3 space-y-4 scrollbar-thin">
          {renderContent()}
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-[#8ACBD0] flex items-center justify-between text-[10px] font-mono-tech text-[#2C2B68] flex-shrink-0">
          <span>KOCHI METRO RAIL LIMITED • AI INDUCTION PLATFORM</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#170C79] hover:bg-[#56B6C6] hover:text-[#170C79] text-[#EFE3CA] font-bold text-xs transition-colors cursor-pointer"
          >
            CLOSE CONSOLE
          </button>
        </div>
      </div>
    </div>
  );
};
