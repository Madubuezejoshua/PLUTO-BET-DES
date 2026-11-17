import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { GroupStanding } from '../data/worldCupData';
import { FlagIcon } from './FlagIcon';

interface GroupsOverviewCardProps {
  groups: GroupStanding[];
  onViewAllGroups: (groupId?: string) => void;
}

export const GroupsOverviewCard: React.FC<GroupsOverviewCardProps> = ({
  groups,
  onViewAllGroups,
}) => {
  const previewGroups = groups.slice(0, 4);

  return (
    <section className="rounded-2xl bg-white dark:bg-[#0F1426] border border-slate-200 dark:border-[#1D253E] p-4 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[14.5px] font-bold text-slate-900 dark:text-white tracking-tight">
          Groups Overview
        </h2>
        <button
          type="button"
          onClick={() => onViewAllGroups()}
          className="inline-flex items-center gap-0.5 text-[11.5px] font-medium text-[#60A5FA] hover:text-[#93C5FD] transition-colors cursor-pointer"
        >
          <span>View All Groups</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5">
        {previewGroups.map((group) => (
          <div
            key={group.id}
            onClick={() => onViewAllGroups(group.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onViewAllGroups(group.id);
            }}
            className="rounded-xl bg-slate-50 dark:bg-[#13192D] border border-slate-200 dark:border-white/[0.06] hover:border-[#3B82F6]/40 p-2.5 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-200 dark:border-white/[0.06]">
              <span className="text-[12px] font-bold text-slate-800 dark:text-slate-100">
                {group.name}
              </span>
              <span className="text-[9.5px] font-semibold text-slate-400 dark:text-[#64748B] tracking-wider flex items-center gap-2">
                <span>P</span>
                <span>PTS</span>
              </span>
            </div>

            <div className="space-y-1.5">
              {group.rows.map((row) => (
                <div
                  key={row.code}
                  className="flex items-center justify-between gap-1.5 text-[11.5px]"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-3 text-[10.5px] text-slate-400 dark:text-[#64748B] font-mono-num shrink-0">
                      {row.pos}
                    </span>
                    <FlagIcon code={row.code} size="xs" />
                    <span className="text-slate-800 dark:text-slate-200 font-medium truncate">
                      {row.team}
                    </span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white font-mono-num shrink-0">
                    {row.pts}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
