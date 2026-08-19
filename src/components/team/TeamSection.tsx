import React from 'react';
import { Users, GraduationCap, Award, Hash } from 'lucide-react';

interface TeamMember {
  name: string;
  id: string;
  role: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  { name: 'Arjun V', id: '1EP24IC007', role: 'System Architecture & Modeling' },
  { name: 'Harsh Jangir', id: '1EP24IC012', role: 'AI Simulation & Pareto Optimization' },
  { name: 'HImanshu Kumar', id: '1EP24IC014', role: 'Full-Stack Operations UI & Engine' },
  { name: 'Jeevan Jaikumar', id: '1EP24IC015', role: 'CBTC & Signal Siding Logic' },
  { name: 'Roshni Singh R', id: '1EP24IC044', role: 'Telemetry & Passenger Demand Analytics' },
  { name: 'Shailesh M', id: '1EP24IC050', role: 'Fleet Readiness & Safety Constraints' }
];

export const TeamSection: React.FC = () => {
  return (
    <section id="team-section" className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#56B6C6]"></span>
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#56B6C6] font-bold">
              SIH 2026 • PROJECT TEAM
            </span>
          </div>
          <h2 className="font-mono-tech font-bold text-xl sm:text-2xl text-[#170C79] uppercase tracking-wide">
            POWERHOUSE INNOVATION TEAM
          </h2>
          <p className="font-inter text-xs sm:text-sm text-[#2C2B68] font-medium mt-0.5">
            KMRL AI Train Induction Planning & Scheduling Engineering Division
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#FFFFFF] px-3.5 py-1.5 rounded-xl border border-[#8ACBD0] text-xs font-mono-tech text-[#170C79] shadow-xs">
          <Award className="w-4 h-4 text-[#56B6C6]" />
          <span className="font-bold">SMART INDIA HACKATHON 2026</span>
        </div>
      </div>

      {/* Main Train-Window Container */}
      <div className="w-full rounded-2xl bg-[#8ACBD0] border-2 border-[#56B6C6]/50 p-2 shadow-sm space-y-3">
        {/* Top Window Bezel with Micro-Rivets */}
        <div className="flex items-center justify-between px-3 pt-2 pb-1">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#56B6C6]" />
            <span className="font-mono-tech font-bold text-xs md:text-sm text-[#170C79] uppercase tracking-wider">
              TEAM ROSTER & CREDENTIALS
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
          </div>
        </div>

        {/* Inner Inset Viewport Pane */}
        <div className="bg-[#EFE3CA] rounded-xl p-4 md:p-6 border border-[#8ACBD0] space-y-5 shadow-inner">
          {/* 3x2 Responsive Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="bg-[#FFFFFF] rounded-xl p-4 border border-[#8ACBD0] hover:border-[#56B6C6] transition-all duration-200 shadow-xs flex flex-col justify-between space-y-3 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono-tech text-[#2C2B68]">
                      <Hash className="w-3 h-3 text-[#56B6C6]" />
                      <span className="font-bold text-[#56B6C6] bg-[#56B6C6]/15 px-2 py-0.5 rounded border border-[#56B6C6]/30">
                        {member.id}
                      </span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[#8ACBD0] group-hover:bg-[#56B6C6] transition-colors"></span>
                  </div>

                  <h3 className="font-mono-tech font-bold text-base text-[#170C79] tracking-tight">
                    {member.name}
                  </h3>
                  <p className="font-inter text-xs text-[#2C2B68] font-medium mt-1">
                    {member.role}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#8ACBD0]/30 flex items-center justify-between text-[9.5px] font-mono-tech text-[#2C2B68]">
                  <span>RESEARCH DIVISION</span>
                  <span className="text-[#170C79] font-bold">KMRL-AI-SIH</span>
                </div>
              </div>
            ))}
          </div>

          {/* Department & Institution Anchor Banner */}
          <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#8ACBD0] flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#EFE3CA] border border-[#8ACBD0] text-[#170C79]">
                <GraduationCap className="w-5 h-5 text-[#56B6C6]" />
              </div>
              <div>
                <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#2C2B68] font-bold block">
                  ACADEMIC DEPARTMENT & SPECIALIZATION
                </span>
                <span className="font-mono-tech font-bold text-sm md:text-base text-[#170C79]">
                  Dept. of CSE-IoT & CSBT
                </span>
              </div>
            </div>

            <div className="text-right font-mono-tech text-xs">
              <span className="text-[#2C2B68] block text-[9.5px] font-medium">SUBMISSION TARGET</span>
              <span className="text-[#170C79] font-bold">SMART INDIA HACKATHON 2026 (SIH)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
