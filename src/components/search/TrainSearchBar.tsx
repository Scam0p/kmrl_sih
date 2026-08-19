import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronRight } from 'lucide-react';
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
        return { bg: 'bg-[#C8DFDB]', text: 'text-[#3368A0]', border: 'border-[#C8DFDB]', dot: 'bg-[#3368A0]', label: 'IN SERVICE' };
      case 'INDUCTING':
        return { bg: 'bg-[#C8DFDB]', text: 'text-[#3368A0]', border: 'border-[#C8DFDB]', dot: 'bg-[#3368A0]', label: 'AI INDUCTING' };
      case 'READY_INDUCTION':
        return { bg: 'bg-[#C8DFDB]', text: 'text-[#3368A0]', border: 'border-[#C8DFDB]', dot: 'bg-[#3368A0]', label: 'HOT RESERVE' };
      case 'STANDBY':
        return { bg: 'bg-[#3368A0]', text: 'text-[#F2EFE7]', border: 'border-[#C8DFDB]', dot: 'bg-[#C8DFDB]', label: 'DEPOT STANDBY' };
      case 'MAINTENANCE':
        return { bg: 'bg-[#3368A0]', text: 'text-[#F2EFE7]', border: 'border-[#C8DFDB]', dot: 'bg-[#C8DFDB]', label: 'MAINTENANCE' };
      default:
        return { bg: 'bg-[#C8DFDB]', text: 'text-[#3368A0]', border: 'border-[#C8DFDB]', dot: 'bg-[#3368A0]', label: status };
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
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#3368A0]">
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
          className="w-full pl-9 pr-8 py-1.5 rounded-xl bg-[#F2EFE7] border border-[#C8DFDB] focus:border-[#3368A0] focus:bg-[#FFFFFF] focus:outline-none text-xs font-mono-tech font-medium text-[#3368A0] placeholder-[#3368A0]/60 shadow-xs transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-[#3368A0]/60 hover:text-[#3368A0] cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* High-Contrast Search Suggestions Dropdown (#3368A0 Background, #C8DFDB Cards/Borders, #F2EFE7 Text) */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-[#3368A0] border-2 border-[#C8DFDB] rounded-xl shadow-2xl z-50 overflow-hidden font-mono-tech text-xs animate-in fade-in">
          {/* Suggestions Subheader */}
          <div className="px-3 py-2 bg-[#3368A0] border-b border-[#C8DFDB]/40 flex items-center justify-between text-[10px]">
            <span className="text-[#F2EFE7] font-bold uppercase tracking-wider">
              {query ? `SEARCH RESULTS (${filteredTrains.length})` : `FLEET TRAINSETS (${trains.length})`}
            </span>
            <span className="text-[#C8DFDB] font-bold">ALSTOM METROPOLIS</span>
          </div>

          {/* List of Train Suggestions */}
          <div className="max-h-72 overflow-y-auto divide-y divide-[#C8DFDB]/20 scrollbar-thin">
            {filteredTrains.length > 0 ? (
              filteredTrains.map((train) => {
                const status = getStatusBadge(train.status);
                const isDownLine = train.direction === 'DOWN';

                return (
                  <button
                    key={train.id}
                    onClick={() => handleSelect(train)}
                    className="w-full p-2.5 text-left bg-[#3368A0] hover:bg-[#2A5685] transition-colors cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      {/* Train ID Card Badge */}
                      <div className="w-9 h-9 rounded-lg bg-[#C8DFDB] border border-[#C8DFDB] flex items-center justify-center font-mono-tech font-bold text-sm text-[#3368A0] shadow-xs flex-shrink-0">
                        {train.id}
                      </div>

                      {/* Details */}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#F2EFE7]">
                            {train.name}
                          </span>
                          <span className="text-[9px] text-[#C8DFDB] uppercase font-mono-tech font-bold">
                            ALSTOM METROPOLIS
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mt-0.5 text-[10px] text-[#F2EFE7]/80">
                          <span className="font-bold text-[#C8DFDB]">
                            {isDownLine ? 'DOWN LINE' : 'UP LINE'}
                          </span>
                          <span>•</span>
                          <span className="truncate max-w-[160px] sm:max-w-[200px] text-[#F2EFE7]/90">
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
                      <ChevronRight className="w-3.5 h-3.5 text-[#C8DFDB] group-hover:text-[#F2EFE7] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-4 text-center text-xs text-[#F2EFE7]/70">
                No trainsets found matching &quot;{query}&quot;
              </div>
            )}
          </div>

          {/* Quick Search Tip Footer */}
          <div className="px-3 py-1.5 bg-[#3368A0] border-t border-[#C8DFDB]/40 text-[9.5px] text-[#C8DFDB] flex items-center justify-between">
            <span>Tip: Search &quot;T04&quot;, &quot;Maintenance&quot; or &quot;Edappally&quot;</span>
            <span className="font-bold text-[#F2EFE7]">CLICK TO VIEW PROFILE</span>
          </div>
        </div>
      )}
    </div>
  );
};
