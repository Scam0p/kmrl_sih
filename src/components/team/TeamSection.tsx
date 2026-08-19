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
  { name: 'Himanshu Kumar', id: '1EP24IC014', role: 'Full-Stack Operations UI & Engine' },
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

      {/* Main Container */}
      <div className="w-full rounded-xl bg-[#EFE3CA] border-2 border-[#8ACBD0] p-4 md:p-6 shadow-xs space-y-5">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#8ACBD0]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#170C79] text-[#EFE3CA]">
              <Users className="w-4 h-4 text-[#56B6C6]" />
            </div>
            <h3 className="font-mono-tech font-bold text-sm sm:text-base text-[#170C79] uppercase tracking-wide">
              TEAM ROSTER & CREDENTIALS
            </h3>
          </div>
          <span className="text-[10px] font-mono-tech text-[#2C2B68] font-bold">
            6 RESEARCH SCHOLARS
          </span>
        </div>

        {/* 3x2 Responsive Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-[#FFFFFF] rounded-xl p-4 border border-[#8ACBD0] hover:border-[#56B6C6] transition-colors shadow-xs flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono-tech text-[#2C2B68]">
                    <Hash className="w-3 h-3 text-[#56B6C6]" />
                    <span className="font-bold text-[#56B6C6] bg-[#56B6C6]/15 px-2 py-0.5 rounded border border-[#56B6C6]/30">
                      {member.id}
                    </span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#56B6C6]"></span>
                </div>

                <h4 className="font-mono-tech font-bold text-base text-[#170C79] tracking-tight">
                  {member.name}
                </h4>
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

        {/* Department & Institution Anchor Banner (Responsive stacking) */}
        <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#8ACBD0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
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

          <div className="sm:text-right font-mono-tech text-xs">
            <span className="text-[#2C2B68] block text-[9.5px] font-medium">SUBMISSION TARGET</span>
            <span className="text-[#170C79] font-bold">SMART INDIA HACKATHON 2026 (SIH)</span>
          </div>
        </div>
      </div>
    </section>
  );
};
