import React from 'react';
import type { ComponentType } from 'react';

type SidebarItem = {
  id: string;
  label: string;
  icon?: ComponentType<{ className?: string }>;
};

type SidebarProps = {
  items: SidebarItem[];
  activeId: string;
  onSelect: (id: string) => void;
};

export default function Sidebar({ items, activeId, onSelect }: SidebarProps) {
  return (
    <aside className="hidden md:flex md:w-64 lg:w-72 xl:w-80 flex-col bg-gray-900/80 border-r border-gray-800 backdrop-blur-sm z-20">
      <div className="px-6 py-5 border-b border-gray-800">
        <span className="text-white font-bold text-lg">VStudents</span>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSelect(item.id)}
                  className={[
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                    'text-gray-300 hover:text-white',
                    'hover:bg-gray-800/70',
                    isActive ? 'bg-blue-600/20 text-white border border-blue-500/30' : 'border border-transparent',
                  ].join(' ')}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <span className="ml-auto inline-block w-1.5 h-6 bg-blue-500 rounded-full" aria-hidden="true" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}