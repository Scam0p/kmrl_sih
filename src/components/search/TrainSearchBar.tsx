import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Train as TrainIcon, ChevronRight, Activity, ArrowRight } from 'lucide-react';
import { Train } from '../../types/simulation';

interface TrainSearchBarProps {
  trains: Train[];
  onSelectTrain: (train: Train) => void;
}

export const TrainSearchBar: React.FC<TrainSearchBarProps> = ({ trains, onSelectTrain }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredTrains = trains.filter((t) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    const idMatch = t.id.toLowerCase().includes(q);
    const nameMatch = t.name.toLowerCase().includes(q);
    const statusMatch = t.status.toLowerCase().replace('_', ' ').includes(q);
    const locationMatch = t.location.toLowerCase().includes(q);
    const directionMatch = (t.direction === 'DOWN' ? 'southbound tripunithura down line' : 'northbound aluva up line').includes(q);
    const routeMatch = t.assignedRoute.toLowerCase().includes(q);
    return idMatch || nameMatch || statusMatch || locationMatch || directionMatch || routeMatch;
  });

  const getStatusBadge = (status: Train['status']) => {
    switch (status) {
      case 'IN_SERVICE':
        return { bg: 'bg-[#2E8B57]/20', text: 'text-[#2E8B57]', border: 'border-[#2E8B57]/40', dot: 'bg-[#2E8B57]', label: 'IN SERVICE' };
      case 'INDUCTING':
        return { bg: 'bg-[#56B6C6]/25', text: 'text-[#170C79]', border: 'border-[#56B6C6]/50', dot: 'bg-[#56B6C6]', label: 'AI INDUCTING' };
      case 'READY_INDUCTION':
        return { bg: 'bg-[#D9A24B]/20', text: 'text-[#170C79]', border: 'border-[#D9A24B]/50', dot: 'bg-[#D9A24B]', label: 'HOT RESERVE' };
      case 'STANDBY':
        return { bg: 'bg-[#8ACBD0]/30', text: 'text-[#170C79]', border: 'border-[#8ACBD0]', dot: 'bg-[#8ACBD0]', label: 'DEPOT STANDBY' };
      case 'MAINTENANCE':
        return { bg: 'bg-[#C53030]/20', text: 'text-[#C53030]', border: 'border-[#C53030]/40', dot: 'bg-[#C53030]', label: 'MAINTENANCE' };
      default:
        return { bg: 'bg-[#EFE3CA]', text: 'text-[#2C2B68]', border: 'border-[#8ACBD0]', dot: 'bg-[#170C79]', label: status };
    }
  };

  const handleSelect = (train: Train) => {
    onSelectTrain(train);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md" ref={searchRef}>
      {/* Search Input Field */}
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#56B6C6]">
          <Search className="w-3.5 h-3.5" />
        </div>
        <input
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Search train ID, status or route..."
          className="w-full pl-9 pr-8 py-1.5 rounded-xl bg-[#120963] border border-[#56B6C6]/40 focus:border-[#56B6C6] focus:outline-none text-xs font-mono-tech text-[#EFE3CA] placeholder-[#EFE3CA]/50 shadow-inner transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-[#EFE3CA]/60 hover:text-[#EFE3CA] cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Intelligent Search Suggestions Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-[#120963] border-2 border-[#56B6C6] rounded-xl shadow-2xl z-50 overflow-hidden font-mono-tech text-xs animate-in fade-in">
          {/* Suggestions Subheader */}
          <div className="px-3 py-2 bg-[#170C79] border-b border-[#56B6C6]/30 flex items-center justify-between text-[10px]">
            <span className="text-[#8ACBD0] font-bold uppercase tracking-wider">
              {query ? `SEARCH RESULTS (${filteredTrains.length})` : `FLEET TRAINSETS (${trains.length})`}
            </span>
            <span className="text-[#56B6C6] font-bold">ALSTOM METROPOLIS</span>
          </div>

          {/* List of Train Suggestions */}
          <div className="max-h-72 overflow-y-auto divide-y divide-[#56B6C6]/20 scrollbar-thin">
            {filteredTrains.length > 0 ? (
              filteredTrains.map((train) => {
                const status = getStatusBadge(train.status);
                const isDownLine = train.direction === 'DOWN';

                return (
                  <button
                    key={train.id}
                    onClick={() => handleSelect(train)}
                    className="w-full p-2.5 text-left hover:bg-[#22158E] transition-colors cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      {/* Train ID Badge */}
                      <div className="w-9 h-9 rounded-lg bg-[#170C79] border border-[#56B6C6]/40 flex items-center justify-center font-mono-tech font-bold text-sm text-[#EFE3CA] group-hover:border-[#D9A24B] group-hover:text-[#D9A24B] transition-colors shadow-xs flex-shrink-0">
                        {train.id}
                      </div>

                      {/* Details */}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#EFE3CA] group-hover:text-[#D9A24B]">
                            {train.name}
                          </span>
                          <span className="text-[9px] text-[#8ACBD0] uppercase font-mono-tech">
                            ALSTOM METROPOLIS
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mt-0.5 text-[10px] text-[#EFE3CA]/80">
                          <span className="font-bold text-[#56B6C6]">
                            {isDownLine ? 'DOWN LINE' : 'UP LINE'}
                          </span>
                          <span>•</span>
                          <span className="truncate max-w-[160px] sm:max-w-[200px]">
                            {train.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status Pill on Right */}
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[8.5px] font-bold border flex items-center gap-1 ${status.bg} ${status.text} ${status.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
                        <span>{status.label}</span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#56B6C6]/60 group-hover:text-[#D9A24B] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-4 text-center text-xs text-[#EFE3CA]/60">
                No trainsets found matching &quot;{query}&quot;
              </div>
            )}
          </div>

          {/* Quick Search Tip Footer */}
          <div className="px-3 py-1.5 bg-[#170C79] border-t border-[#56B6C6]/30 text-[9.5px] text-[#8ACBD0] flex items-center justify-between">
            <span>Tip: Search &quot;T04&quot;, &quot;Maintenance&quot; or &quot;Edappally&quot;</span>
            <span className="font-bold text-[#56B6C6]">CLICK TO VIEW PROFILE</span>
          </div>
        </div>
      )}
    </div>
  );
};
