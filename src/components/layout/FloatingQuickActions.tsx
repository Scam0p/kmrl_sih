import React from 'react';
import { Bot, FileText, AlertTriangle } from 'lucide-react';

interface FloatingQuickActionsProps {
  onOpenAssistant: () => void;
  onOpenSummary: () => void;
  onOpenAlerts: () => void;
}

export const FloatingQuickActions: React.FC<FloatingQuickActionsProps> = ({
  onOpenAssistant,
  onOpenSummary,
  onOpenAlerts
}) => {
  return (
    <>
      {/* 1. Left Corner Column: Alerts & Summary Buttons */}
      <div className="fixed bottom-16 sm:bottom-4 left-3 sm:left-4 z-40 select-none font-mono-tech flex flex-col gap-2">
        {/* Alerts & Incidents Button */}
        <button
          onClick={onOpenAlerts}
          className="px-3 sm:px-3.5 py-2 rounded-xl bg-[#170C79] hover:bg-[#22158E] text-[#EFE3CA] hover:text-[#D9A24B] border-2 border-[#56B6C6]/50 shadow-xl transition-colors cursor-pointer flex items-center gap-1.5 sm:gap-2 text-xs font-bold"
          title="Open Alerts & Incident Management Console"
          aria-label="Open Alerts Console"
        >
          <AlertTriangle className="w-4 h-4 text-[#56B6C6]" />
          <span className="hidden sm:inline">Alerts</span>
        </button>

        {/* Situation Summary Button */}
        <button
          onClick={onOpenSummary}
          className="px-3 sm:px-3.5 py-2 rounded-xl bg-[#170C79] hover:bg-[#22158E] text-[#EFE3CA] hover:text-[#D9A24B] border-2 border-[#56B6C6]/50 shadow-xl transition-colors cursor-pointer flex items-center gap-1.5 sm:gap-2 text-xs font-bold"
          title="Open Live Operations Summary & Reports"
          aria-label="Open Operations Summary"
        >
          <FileText className="w-4 h-4 text-[#56B6C6]" />
          <span className="hidden sm:inline">Summary</span>
        </button>
      </div>

      {/* 2. Right Corner: AI Assistant / Chatbot Quick Button */}
      <div className="fixed bottom-16 sm:bottom-4 right-3 sm:right-4 z-40 select-none font-mono-tech">
        <button
          onClick={onOpenAssistant}
          className="px-3 sm:px-3.5 py-2 rounded-xl bg-[#170C79] hover:bg-[#22158E] text-[#EFE3CA] hover:text-[#D9A24B] border-2 border-[#56B6C6]/50 shadow-xl transition-colors cursor-pointer flex items-center gap-1.5 sm:gap-2 text-xs font-bold"
          title="Open KMRL AI Operations Assistant"
          aria-label="Open AI Operations Assistant"
        >
          <div className="w-5 h-5 rounded-md bg-[#56B6C6] text-[#170C79] flex items-center justify-center font-bold">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <span className="hidden sm:inline">AI Copilot</span>
        </button>
      </div>
    </>
  );
};
