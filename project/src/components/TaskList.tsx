import React from 'react';
import { Trash2, CheckCircle2, Circle } from 'lucide-react';
import { Task, TaskGroup } from '../types/task';

interface TaskListProps {
  groups: TaskGroup[];
  onDeleteGroup: (index: number) => void;
  onSelectTask: (task: Task, groupIndex: number, taskIndex: number) => void;
  onToggleTask: (groupIndex: number, taskIndex: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ groups, onDeleteGroup, onSelectTask, onToggleTask }) => {
  return (
    <section className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Your Tasks</h2>
          <p className="text-slate-600">Organize and manage your daily activities</p>
        </div>

        <div className="grid gap-6">
          {groups.map((group, groupIndex) => (
            <div key={groupIndex} className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/50 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-4 border-b border-slate-200/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-slate-800">{group.name}</h3>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-slate-500">
                      {group.tasks.filter(t => t.completed).length}/{group.tasks.length} completed
                    </span>
                    <button 
                      onClick={() => onDeleteGroup(groupIndex)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                {group.tasks.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <Circle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No tasks yet. Create your first task to get started!</p>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {group.tasks.map((task, taskIndex) => (
                      <li 
                        key={taskIndex}
                        onClick={() => onSelectTask(task, groupIndex, taskIndex)}
                        className="flex items-center space-x-4 p-4 bg-white/50 hover:bg-white/80 rounded-lg cursor-pointer transition-all duration-200 border border-transparent hover:border-blue-200"
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleTask(groupIndex, taskIndex);
                          }}
                          className="flex-shrink-0"
                        >
                          {task.completed ? (
                            <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                          ) : (
                            <Circle className="h-6 w-6 text-slate-400 hover:text-blue-500 transition-colors" />
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-medium ${task.completed ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                            {task.name}
                          </h4>
                          {task.description && (
                            <p className="text-sm text-slate-500 mt-1 truncate">{task.description}</p>
                          )}
                          <div className="flex items-center space-x-4 mt-2 text-xs text-slate-400">
                            <span>Created: {task.created}</span>
                            {task.due && <span>Due: {new Date(task.due).toLocaleDateString()}</span>}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TaskList;