import React, { useState } from 'react';
import { 
  BarChart2, 
  TrendingDown, 
  TrendingUp, 
  Zap, 
  Clock, 
  Layers, 
  Calendar, 
  Download, 
  FileText, 
  CheckCircle2, 
  Filter, 
  X, 
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { Train, Station, KPISet, CaseType } from '../../types/simulation';
import { useAuth } from '../../context/AuthContext';

interface AnalyticsReportsConsoleProps {
  isOpen: boolean;
  onClose: () => void;
  trains: Train[];
  stations: Station[];
  kpis: KPISet;
  currentCase: CaseType;
  simTime: string;
}

type TimeFilter = 'TODAY' | '7_DAYS' | '30_DAYS' | 'CUSTOM';
type ParadigmFilter = 'ALL' | 'AI' | 'CONVENTIONAL' | 'MANUAL';
type ReportType = 'DAILY_OPERATIONS' | 'HEADWAY_CONGESTION' | 'ENERGY_REGEN' | 'AI_PARETO_BENCHMARK';

export const AnalyticsReportsConsole: React.FC<AnalyticsReportsConsoleProps> = ({
  isOpen,
  onClose,
  trains,
  stations,
  kpis,
  currentCase,
  simTime
}) => {
  const { user, checkPermission } = useAuth();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('TODAY');
  const [paradigmFilter, setParadigmFilter] = useState<ParadigmFilter>('ALL');
  const [selectedReportType, setSelectedReportType] = useState<ReportType>('DAILY_OPERATIONS');
  const [reportDateRange, setReportDateRange] = useState('2026-08-19');
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  // Sorting trains for performance comparison
  const sortedTrainsByLoad = [...trains].sort((a, b) => (b.passengerLoad / b.capacity) - (a.passengerLoad / a.capacity));
  const topTrain = sortedTrainsByLoad[0] || trains[0];
  const bottomTrain = sortedTrainsByLoad[sortedTrainsByLoad.length - 1] || trains[trains.length - 1];

  // Sorting stations by congestion
  const sortedStations = [...stations].sort((a, b) => b.passengerDemandPct - a.passengerDemandPct);

  // Dynamic calculations based on active time filter
  const multiplier = timeFilter === '30_DAYS' ? 28.5 : timeFilter === '7_DAYS' ? 7.2 : 1;
  const totalRidership = Math.round(48500 * multiplier);
  const totalEnergyMwh = ((kpis.energyCostIndex * 1420 * multiplier) / 1000).toFixed(1);
  const aiOptimizationRuns = Math.round(148 * multiplier);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const reportContent = `KMRL OPERATIONS REPORT [${selectedReportType.replace(/_/g, ' ')}]
Generated: 2026-08-19 ${simTime || '08:45'} IST | Officer: ${user?.name || 'KMRL Controller'} (${user?.roleTitle || 'Operator'})
Corridor: Aluva Terminal ↔ Tripunithura Terminal (25.6 km • GoA2 CBTC)
--------------------------------------------------------------------------------
• Operating Paradigm: ${currentCase.toUpperCase()}
• Average Passenger Wait Time: ${kpis.avgWaitTimeMin} min (Target: <5.5 min)
• Headway Consistency Index: ${kpis.headwayConsistencyPct}% (Variance: ±18s)
• Total Fleet Utilization: ${kpis.fleetUtilizationPct}% (${trains.filter(t => t.status === 'IN_SERVICE' || t.status === 'INDUCTING').length}/${trains.length} Units Active)
• Traction Energy Index: ${kpis.energyCostIndex} (28.6% Regenerative Braking Recovery)
• High Congestion Stations: ${sortedStations.slice(0, 2).map(s => `${s.name} (${s.passengerDemandPct}%)`).join(', ')}
• Fleet Flagged for Depot Inspection: ${trains.filter(t => t.status === 'MAINTENANCE').map(t => t.id).join(', ') || 'None (All Nominal)'}
--------------------------------------------------------------------------------
AI Multi-Objective Pareto Solver status: NOMINAL (Optimized with 04:30 headway)`;
      setGeneratedReport(reportContent);
    }, 400);
  };

  const handleExport = (format: 'JSON' | 'CSV' | 'TXT') => {
    if (checkPermission('canChangeParadigm', 'REPORT EXPORT', 'Exporting official OCC operational telemetry requires Operator or Manager clearance.')) {
      const dataToExport = {
        meta: {
          title: `KMRL Analytics Report - ${selectedReportType}`,
          timestamp: `2026-08-19 ${simTime} IST`,
          officer: user?.name,
          role: user?.role
        },
        kpis,
        trains: trains.map(t => ({ id: t.id, name: t.name, status: t.status, speed: t.speedKmh, load: t.passengerLoad, capacity: t.capacity, temp: t.motorTempC })),
        stations: stations.map(s => ({ id: s.id, name: s.name, demandPct: s.passengerDemandPct, waiting: s.waitingCount, inflowRate: s.inflowRatePerMin, status: s.status }))
      };

      const blob = new Blob(
        [format === 'JSON' ? JSON.stringify(dataToExport, null, 2) : format === 'CSV' ? `TrainID,Name,Status,Speed,Load,Capacity\n${trains.map(t => `${t.id},${t.name},${t.status},${t.speedKmh},${t.passengerLoad},${t.capacity}`).join('\n')}` : (generatedReport || 'KMRL Report Data')],
        { type: format === 'JSON' ? 'application/json' : 'text/plain' }
      );

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `KMRL_Analytics_${selectedReportType}_${timeFilter}.${format.toLowerCase()}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setExportNotice(`Exported ${format} report successfully.`);
      setTimeout(() => setExportNotice(null), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#170C79]/75 backdrop-blur-md animate-in fade-in select-none">
      <div 
        className="relative w-full max-w-5xl h-[92vh] max-h-[820px] rounded-2xl p-2 sm:p-3 border-2 shadow-2xl font-mono-tech flex flex-col justify-between overflow-hidden"
        style={{
          backgroundColor: '#C8DFDB',
          borderColor: '#66A3BF'
        }}
      >
        {/* Top Window Header */}
        <div className="flex items-center justify-between px-3 pt-2 pb-2 flex-shrink-0 border-b border-[#66A3BF]/40">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#3368A0] text-[#F2EFE7] shadow-xs">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-mono-tech font-bold text-base sm:text-lg uppercase tracking-wide" style={{ color: '#3368A0' }}>
                  KMRL ANALYTICS & OPERATIONS REPORTS
                </h2>
                <span className="text-[9px] font-mono-tech px-2 py-0.5 rounded font-bold bg-[#3368A0] text-[#F2EFE7]">
                  SIH 2026
                </span>
              </div>
              <span className="font-inter text-xs font-medium" style={{ color: '#3368A0' }}>
                Corridor Performance Benchmarking, Headway Analytics & Export Console
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#F2EFE7] hover:bg-[#FFFFFF] border border-[#66A3BF] text-[#3368A0] transition-colors cursor-pointer"
            aria-label="Close Analytics Console"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Main Content Viewport */}
        <div 
          className="rounded-xl p-3 sm:p-4 border shadow-inner flex-1 overflow-y-auto space-y-4 my-2 scrollbar-thin"
          style={{
            backgroundColor: '#F2EFE7',
            borderColor: '#66A3BF'
          }}
        >
          {/* Controls Bar: Time Filters & Paradigm Comparison */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#FFFFFF] border border-[#66A3BF]/40 shadow-xs">
            {/* Time Filter Buttons */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider mr-1" style={{ color: '#3368A0' }}>
                TIMEFRAME:
              </span>
              {(['TODAY', '7_DAYS', '30_DAYS', 'CUSTOM'] as TimeFilter[]).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeFilter(tf)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    timeFilter === tf
                      ? 'bg-[#3368A0] text-[#F2EFE7] shadow-xs'
                      : 'bg-[#C8DFDB]/60 text-[#3368A0] hover:bg-[#C8DFDB]'
                  }`}
                >
                  {tf.replace('_', ' ')}
                </button>
              ))}
            </div>

            {/* Paradigm Comparison Toggles */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider mr-1" style={{ color: '#3368A0' }}>
                PARADIGM:
              </span>
              {(['ALL', 'AI', 'CONVENTIONAL', 'MANUAL'] as ParadigmFilter[]).map((pf) => (
                <button
                  key={pf}
                  onClick={() => setParadigmFilter(pf)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                    paradigmFilter === pf
                      ? 'bg-[#66A3BF] text-[#F2EFE7]'
                      : 'bg-[#F2EFE7] text-[#3368A0] border border-[#66A3BF]/40 hover:bg-[#C8DFDB]'
                  }`}
                >
                  {pf}
                </button>
              ))}
            </div>
          </div>

          {/* Core Analytics KPI Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#66A3BF]/40 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-[10px] font-bold" style={{ color: '#66A3BF' }}>
                <span>AVG WAIT TIME</span>
                <Clock className="w-3.5 h-3.5" />
              </div>
              <div className="font-mono-tech font-bold text-2xl" style={{ color: '#3368A0' }}>
                {kpis.avgWaitTimeMin} <span className="text-xs font-medium">min</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-[#2E8B57]">
                <TrendingDown className="w-3 h-3" />
                <span>-62% vs Manual Dispatch</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#66A3BF]/40 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-[10px] font-bold" style={{ color: '#66A3BF' }}>
                <span>FLEET UTILIZATION</span>
                <Layers className="w-3.5 h-3.5" />
              </div>
              <div className="font-mono-tech font-bold text-2xl" style={{ color: '#3368A0' }}>
                {kpis.fleetUtilizationPct}%
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold" style={{ color: '#3368A0' }}>
                <span>{trains.filter(t => t.status === 'IN_SERVICE' || t.status === 'INDUCTING').length}/{trains.length} Active Units</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#66A3BF]/40 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-[10px] font-bold" style={{ color: '#66A3BF' }}>
                <span>HEADWAY STABILITY</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2E8B57]" />
              </div>
              <div className="font-mono-tech font-bold text-2xl" style={{ color: '#3368A0' }}>
                {kpis.headwayConsistencyPct}%
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-[#2E8B57]">
                <TrendingUp className="w-3 h-3" />
                <span>±18s GoA2 Variance</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#66A3BF]/40 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-[10px] font-bold" style={{ color: '#66A3BF' }}>
                <span>TOTAL RIDERSHIP</span>
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <div className="font-mono-tech font-bold text-2xl" style={{ color: '#3368A0' }}>
                {totalRidership.toLocaleString()} <span className="text-xs font-medium">PAX</span>
              </div>
              <div className="text-[10px] font-bold" style={{ color: '#66A3BF' }}>
                Energy: {totalEnergyMwh} MWh (28.6% regen)
              </div>
            </div>
          </div>

          {/* Visual Performance Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Chart 1: Headway vs Passenger Inflow Curve */}
            <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#66A3BF]/40 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#3368A0' }}>
                  HEADWAY COMPRESSION (06:00 → 22:00)
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#C8DFDB] text-[#3368A0]">
                  INTERVAL MINUTES
                </span>
              </div>

              {/* Minimal SVG Area Line Chart */}
              <div className="h-40 w-full pt-2">
                <svg viewBox="0 0 400 120" className="w-full h-full">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#66A3BF" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#C8DFDB" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  {/* Grid lines */}
                  <line x1="30" y1="20" x2="390" y2="20" stroke="#C8DFDB" strokeDasharray="3,3" />
                  <line x1="30" y1="55" x2="390" y2="55" stroke="#C8DFDB" strokeDasharray="3,3" />
                  <line x1="30" y1="90" x2="390" y2="90" stroke="#C8DFDB" strokeDasharray="3,3" />

                  {/* Manual Dispatch Line (Red-ish) */}
                  {(paradigmFilter === 'ALL' || paradigmFilter === 'MANUAL') && (
                    <polyline
                      fill="none"
                      stroke="#A05252"
                      strokeWidth="1.5"
                      strokeDasharray="4,4"
                      points="30,85 80,82 140,86 200,90 260,84 320,88 380,85"
                    />
                  )}

                  {/* Conventional Line */}
                  {(paradigmFilter === 'ALL' || paradigmFilter === 'CONVENTIONAL') && (
                    <polyline
                      fill="none"
                      stroke="#66A3BF"
                      strokeWidth="2"
                      points="30,60 80,58 140,56 200,60 260,58 320,62 380,58"
                    />
                  )}

                  {/* AI Dynamic Area & Line */}
                  {(paradigmFilter === 'ALL' || paradigmFilter === 'AI') && (
                    <>
                      <polygon
                        fill="url(#chartGrad)"
                        points="30,105 30,45 80,30 140,32 200,42 260,30 320,35 380,48 380,105"
                      />
                      <polyline
                        fill="none"
                        stroke="#3368A0"
                        strokeWidth="2.5"
                        points="30,45 80,30 140,32 200,42 260,30 320,35 380,48"
                      />
                      <circle cx="80" cy="30" r="3.5" fill="#3368A0" />
                      <circle cx="260" cy="30" r="3.5" fill="#3368A0" />
                    </>
                  )}

                  {/* Axis labels */}
                  <text x="30" y="115" fontSize="8" fill="#66A3BF" fontFamily="JetBrains Mono">06:00</text>
                  <text x="140" y="115" fontSize="8" fill="#66A3BF" fontFamily="JetBrains Mono">10:00 (PEAK)</text>
                  <text x="260" y="115" fontSize="8" fill="#66A3BF" fontFamily="JetBrains Mono">18:00 (PEAK)</text>
                  <text x="370" y="115" fontSize="8" fill="#66A3BF" fontFamily="JetBrains Mono">22:00</text>
                </svg>
              </div>

              <div className="flex items-center justify-between text-[10px] font-bold pt-1 border-t border-[#C8DFDB]">
                <span style={{ color: '#3368A0' }}>AI Peak Headway: 04:30 min</span>
                <span style={{ color: '#66A3BF' }}>Conventional: 06:00 min</span>
                <span className="text-[#A05252]">Manual: 08:00 min</span>
              </div>
            </div>

            {/* Chart 2: Station Queue Congestion Distribution */}
            <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#66A3BF]/40 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#3368A0' }}>
                  CORRIDOR STATION CONGESTION INDEX
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#C8DFDB] text-[#3368A0]">
                  PLATFORM LOAD %
                </span>
              </div>

              <div className="space-y-2 pt-1 font-mono-tech text-xs">
                {stations.map((st) => (
                  <div key={st.id} className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span style={{ color: '#3368A0' }}>{st.name}</span>
                      <span style={{ color: st.passengerDemandPct > 80 ? '#A05252' : '#3368A0' }}>
                        {st.passengerDemandPct}% ({st.waitingCount} PAX)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full overflow-hidden bg-[#C8DFDB]/60">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${st.passengerDemandPct}%`,
                          backgroundColor: st.passengerDemandPct > 80 ? '#A05252' : '#3368A0'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fleet Performance Comparison Table */}
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#66A3BF]/40 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#3368A0' }}>
                ALSTOM METROPOLIS FLEET PERFORMANCE RANKING
              </span>
              <span className="text-[10px] font-bold" style={{ color: '#66A3BF' }}>
                SORTED BY OCCUPANCY EFFICIENCY
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono-tech border-collapse">
                <thead>
                  <tr className="border-b border-[#C8DFDB] text-[10px] uppercase font-bold" style={{ color: '#66A3BF' }}>
                    <th className="pb-2">TRAIN ID</th>
                    <th className="pb-2">NAME</th>
                    <th className="pb-2">STATUS</th>
                    <th className="pb-2">SPEED</th>
                    <th className="pb-2">OCCUPANCY</th>
                    <th className="pb-2">TRACTION TEMP</th>
                    <th className="pb-2">HEALTH</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C8DFDB]/50">
                  {trains.map((t) => {
                    const loadPct = Math.round((t.passengerLoad / t.capacity) * 100);
                    return (
                      <tr key={t.id} className="hover:bg-[#F2EFE7]/60 transition-colors">
                        <td className="py-2 font-bold" style={{ color: '#3368A0' }}>{t.id}</td>
                        <td className="py-2" style={{ color: '#3368A0' }}>{t.name}</td>
                        <td className="py-2">
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                            t.status === 'IN_SERVICE' ? 'bg-[#2E8B57]/15 text-[#2E8B57]' :
                            t.status === 'INDUCTING' ? 'bg-[#66A3BF]/20 text-[#3368A0]' :
                            t.status === 'MAINTENANCE' ? 'bg-[#A05252]/15 text-[#A05252]' :
                            'bg-[#C8DFDB] text-[#3368A0]'
                          }`}>
                            {t.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-2" style={{ color: '#3368A0' }}>{t.speedKmh} km/h</td>
                        <td className="py-2 font-bold" style={{ color: '#3368A0' }}>
                          {t.passengerLoad}/{t.capacity} ({loadPct}%)
                        </td>
                        <td className={`py-2 ${t.motorTempC > 70 ? 'text-[#A05252] font-bold' : ''}`} style={{ color: t.motorTempC > 70 ? '#A05252' : '#3368A0' }}>
                          {t.motorTempC}°C
                        </td>
                        <td className="py-2 font-bold" style={{ color: t.healthScorePct < 85 ? '#A05252' : '#2E8B57' }}>
                          {t.healthScorePct}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Official Report Generator Panel */}
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#66A3BF]/40 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#C8DFDB]">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" style={{ color: '#3368A0' }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#3368A0' }}>
                  OCC OFFICIAL REPORT GENERATOR & EXPORT
                </span>
              </div>
              <span className="text-[10px] font-bold" style={{ color: '#66A3BF' }}>
                ISO-9001 RAILWAY AUDIT COMPLIANT
              </span>
            </div>

            {exportNotice && (
              <div className="p-2 rounded-lg bg-[#2E8B57]/15 border border-[#2E8B57]/40 text-[#2E8B57] text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{exportNotice}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-[10px] font-bold uppercase block mb-1" style={{ color: '#3368A0' }}>
                  REPORT TYPE:
                </label>
                <select
                  value={selectedReportType}
                  onChange={(e) => setSelectedReportType(e.target.value as ReportType)}
                  className="w-full p-2 rounded-lg border font-mono-tech text-xs bg-[#F2EFE7] focus:outline-none"
                  style={{ borderColor: '#66A3BF', color: '#3368A0' }}
                >
                  <option value="DAILY_OPERATIONS">Daily Operations Summary (SOP-04)</option>
                  <option value="HEADWAY_CONGESTION">Headway & Passenger Congestion Audit</option>
                  <option value="ENERGY_REGEN">Energy Usage & Regenerative Braking</option>
                  <option value="AI_PARETO_BENCHMARK">AI Pareto Induction Benchmark</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase block mb-1" style={{ color: '#3368A0' }}>
                  DATE REFERENCE:
                </label>
                <input
                  type="date"
                  value={reportDateRange}
                  onChange={(e) => setReportDateRange(e.target.value)}
                  className="w-full p-2 rounded-lg border font-mono-tech text-xs bg-[#F2EFE7] focus:outline-none"
                  style={{ borderColor: '#66A3BF', color: '#3368A0' }}
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                  className="w-full py-2 px-3 rounded-lg font-mono-tech font-bold text-xs uppercase transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                  style={{
                    backgroundColor: '#3368A0',
                    color: '#F2EFE7'
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isGenerating ? 'GENERATING...' : 'GENERATE REPORT'}</span>
                </button>
              </div>
            </div>

            {/* Generated Report Preview Area */}
            {generatedReport && (
              <div className="p-3 rounded-lg bg-[#F2EFE7] border space-y-2 font-mono-tech text-xs animate-in fade-in" style={{ borderColor: '#66A3BF' }}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[11px]" style={{ color: '#3368A0' }}>
                    REPORT PREVIEW:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleExport('JSON')}
                      className="px-2.5 py-1 rounded bg-[#FFFFFF] hover:bg-[#C8DFDB] border text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                      style={{ borderColor: '#66A3BF', color: '#3368A0' }}
                    >
                      <Download className="w-3 h-3" /> JSON
                    </button>
                    <button
                      onClick={() => handleExport('CSV')}
                      className="px-2.5 py-1 rounded bg-[#FFFFFF] hover:bg-[#C8DFDB] border text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                      style={{ borderColor: '#66A3BF', color: '#3368A0' }}
                    >
                      <Download className="w-3 h-3" /> CSV
                    </button>
                    <button
                      onClick={() => handleExport('TXT')}
                      className="px-2.5 py-1 rounded text-[#F2EFE7] text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                      style={{ backgroundColor: '#3368A0' }}
                    >
                      <Download className="w-3 h-3" /> EXPORT TXT
                    </button>
                  </div>
                </div>

                <pre className="p-3 bg-[#FFFFFF] rounded-lg border text-[10.5px] leading-relaxed overflow-x-auto whitespace-pre-wrap" style={{ borderColor: '#C8DFDB', color: '#3368A0' }}>
                  {generatedReport}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Console Footer */}
        <div className="flex items-center justify-between px-3 pt-2 border-t flex-shrink-0 text-[10px] font-mono-tech" style={{ borderColor: '#66A3BF', color: '#3368A0' }}>
          <span>KOCHI METRO RAIL LIMITED • HISTORICAL ANALYTICS & AUDIT PORTAL</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-[#F2EFE7] font-bold text-xs uppercase transition-colors cursor-pointer"
            style={{ backgroundColor: '#3368A0' }}
          >
            CLOSE ANALYTICS CONSOLE
          </button>
        </div>
      </div>
    </div>
  );
};
