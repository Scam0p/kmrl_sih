import React from 'react';
import { ShieldAlert, Lock, ArrowRight, X, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';

export const AccessRestrictedModal: React.FC = () => {
  const { user, restrictedModal, closeRestrictedModal, loginWithRole } = useAuth();

  if (!restrictedModal.isOpen) return null;

  const handleSwitchToAdmin = () => {
    loginWithRole('ADMINISTRATOR');
    closeRestrictedModal();
  };

  const handleSwitchToOperator = () => {
    loginWithRole('OPERATOR');
    closeRestrictedModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#170C79]/70 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-md bg-[#8ACBD0] rounded-2xl p-2 border-2 border-[#C53030] shadow-2xl font-mono-tech overflow-hidden">
        {/* Outer Top Bezel with Micro-Rivets */}
        <div className="flex items-center justify-between px-3 pt-2 pb-1.5">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
          </div>
          <span className="text-[9px] uppercase tracking-widest text-[#170C79] font-bold">
            KMRL OCC SECURITY PROTOCOL
          </span>
          <button
            onClick={closeRestrictedModal}
            className="p-1 rounded hover:bg-[#56B6C6] text-[#170C79] transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Inner Inset Viewport */}
        <div className="bg-[#EFE3CA] rounded-xl p-5 border border-[#8ACBD0] shadow-inner space-y-4">
          {/* Header with Lock Icon */}
          <div className="flex items-center gap-3 pb-3 border-b border-[#8ACBD0]">
            <div className="w-11 h-11 rounded-xl bg-[#C53030]/15 border-2 border-[#C53030] flex items-center justify-center text-[#C53030] flex-shrink-0 shadow-xs">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[10px] text-[#C53030] font-bold uppercase tracking-wider">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>ACCESS RESTRICTED</span>
              </div>
              <h3 className="font-mono-tech font-bold text-base text-[#170C79] leading-tight">
                {restrictedModal.title || 'AUTHORIZATION REQUIRED'}
              </h3>
            </div>
          </div>

          {/* Reason Narrative */}
          <p className="font-inter text-xs text-[#2C2B68] leading-relaxed font-medium">
            {restrictedModal.reason}
          </p>

          {/* Role Difference Card */}
          <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0] space-y-2 text-xs font-mono-tech shadow-2xs">
            <div className="flex justify-between items-center">
              <span className="text-[#2C2B68] text-[10px] font-bold">YOUR ACTIVE ROLE:</span>
              <span className="px-2 py-0.5 rounded bg-[#8ACBD0]/40 text-[#170C79] font-bold text-[10px] border border-[#8ACBD0]">
                {user?.roleTitle || user?.role || 'GUEST'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#2C2B68] text-[10px] font-bold">REQUIRED CLEARANCE:</span>
              <span className="px-2 py-0.5 rounded bg-[#C53030]/15 text-[#C53030] font-bold text-[10px] border border-[#C53030]/40">
                {restrictedModal.requiredRole}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleSwitchToAdmin}
              className="flex-1 py-2 px-3 rounded-lg bg-[#170C79] hover:bg-[#56B6C6] hover:text-[#170C79] text-[#EFE3CA] font-mono-tech font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#56B6C6]" />
              <span>ELEVATE TO ADMIN</span>
            </button>

            <button
              onClick={closeRestrictedModal}
              className="py-2 px-4 rounded-lg bg-[#FFFFFF] hover:bg-[#8ACBD0] border border-[#8ACBD0] text-[#170C79] font-mono-tech font-bold text-xs transition-colors cursor-pointer text-center"
            >
              DISMISS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
