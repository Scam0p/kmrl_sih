import React from 'react';
import { Bot, FileText } from 'lucide-react';

interface FloatingQuickActionsProps {
  onOpenAssistant: () => void;
  onOpenSummary: () => void;
}

export const FloatingQuickActions: React.FC<FloatingQuickActionsProps> = ({
  onOpenAssistant,
  onOpenSummary
}) => {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2 select-none font-mono-tech">
      {/* 1. Situation Summary Quick Button */}
      <button
        onClick={onOpenSummary}
        className="px-3 py-2 rounded-xl bg-[#170C79] hover:bg-[#22158E] text-[#EFE3CA] hover:text-[#D9A24B] border-2 border-[#56B6C6]/50 shadow-xl transition-colors cursor-pointer flex items-center gap-2 text-xs font-bold"
        title="Open Live Operations Summary & Reports"
        aria-label="Open Operations Summary"
      >
        <FileText className="w-4 h-4 text-[#56B6C6]" />
        <span className="hidden sm:inline">Summary</span>
      </button>

      {/* 2. AI Assistant / Chatbot Quick Button */}
      <button
        onClick={onOpenAssistant}
        className="px-3.5 py-2 rounded-xl bg-[#170C79] hover:bg-[#22158E] text-[#EFE3CA] hover:text-[#D9A24B] border-2 border-[#56B6C6]/50 shadow-xl transition-colors cursor-pointer flex items-center gap-2 text-xs font-bold"
        title="Open KMRL AI Operations Assistant"
        aria-label="Open AI Operations Assistant"
      >
        <div className="w-5 h-5 rounded-md bg-[#56B6C6] text-[#170C79] flex items-center justify-center font-bold">
          <Bot className="w-3.5 h-3.5" />
        </div>
        <span className="hidden sm:inline">AI Copilot</span>
      </button>
    </div>
  );
};
