import React from 'react';
import { CheckSquare, Plus, PlusCircle, LogOut, Calendar, List } from 'lucide-react';
import { TaskGroup } from '../types/task';

interface SidebarProps {
  groups: TaskGroup[];
  onAddGroup: () => void;
  onNewTask: () => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ groups, onAddGroup, onNewTask, onLogout }) => {
  const totalTasks = groups.reduce((sum, group) => sum + group.tasks.length, 0);
  const completedTasks = groups.reduce((sum, group) => 
    sum + group.tasks.filter(task => task.completed).length, 0
  );

  return (
    <aside className="w-80 bg-white/80 backdrop-blur-sm border-r border-slate-200/50 shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-slate-200/50">
        <div className="flex items-center space-x-3 mb-4">
          <CheckSquare className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-slate-800">TaskFlow</h1>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg p-4">
          <div className="text-sm text-slate-600 mb-1">Progress Today</div>
          <div className="text-2xl font-bold text-slate-800">{completedTasks}/{totalTasks}</div>
          <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: totalTasks > 0 ? `${(completedTasks / totalTasks) * 100}%` : '0%' }}
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-6">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Overview</h3>
        <ul className="space-y-2">
          <li>
            <button className="w-full flex items-center space-x-3 px-3 py-2 text-left bg-blue-50 text-blue-700 rounded-lg font-medium">
              <List className="h-5 w-5" />
              <span>All Tasks</span>
              <span className="ml-auto bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                {totalTasks}
              </span>
            </button>
          </li>
          <li>
            <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
              <Calendar className="h-5 w-5" />
              <span>Today</span>
              <span className="ml-auto bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-xs">
                {groups.reduce((sum, group) => 
                  sum + group.tasks.filter(task => 
                    task.due === new Date().toISOString().split('T')[0]
                  ).length, 0
                )}
              </span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Action Buttons */}
      <div className="p-6 space-y-3">
        <button 
          onClick={onAddGroup}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Group</span>
        </button>
        <button 
          onClick={onNewTask}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
        >
          <PlusCircle className="h-4 w-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* User Actions */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white/90 to-transparent">
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-lg font-medium transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;