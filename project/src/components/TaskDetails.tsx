import React from 'react';
import { Calendar, Clock, Folder, Trash2, CheckCircle2, PlayCircle } from 'lucide-react';
import { Task, TaskGroup } from '../types/task';

interface TaskDetailsProps {
  selectedTask: (Task & { groupIndex: number; taskIndex: number }) | null;
  groups: TaskGroup[];
  onUpdateTask: (updates: Partial<Task>) => void;
  onDeleteTask: () => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ selectedTask, groups, onUpdateTask, onDeleteTask }) => {
  if (!selectedTask) {
    return (
      <section className="w-96 bg-white/70 backdrop-blur-sm border-l border-slate-200/50 p-6">
        <div className="h-full flex items-center justify-center text-center">
          <div>
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-12 w-12 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-600 mb-2">Select a task</h3>
            <p className="text-slate-500">Choose a task from the list to see its details and make updates</p>
          </div>
        </div>
      </section>
    );
  }

  const handleMarkComplete = () => {
    onUpdateTask({ completed: !selectedTask.completed });
  };

  const handleStartTask = () => {
    onUpdateTask({ started: !selectedTask.started });
  };

  return (
    <section className="w-96 bg-white/70 backdrop-blur-sm border-l border-slate-200/50 overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-800 leading-tight">{selectedTask.name}</h2>
            <button
              onClick={handleMarkComplete}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedTask.completed
                  ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              {selectedTask.completed ? 'Completed' : 'Mark Complete'}
            </button>
          </div>
          
          {/* Status Badge */}
          <div className="flex items-center space-x-2 mb-4">
            {selectedTask.completed && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Completed
              </span>
            )}
            {selectedTask.started && !selectedTask.completed && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <PlayCircle className="h-3 w-3 mr-1" />
                In Progress
              </span>
            )}
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-slate-800 mb-3">Progress</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-slate-500" />
                <span className="text-slate-600">Created</span>
              </div>
              <span className="font-medium text-slate-800">{selectedTask.created}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <PlayCircle className="h-4 w-4 text-slate-500" />
                <span className="text-slate-600">Status</span>
              </div>
              <button
                onClick={handleStartTask}
                className={`text-sm font-medium transition-colors ${
                  selectedTask.started 
                    ? 'text-blue-600 hover:text-blue-700' 
                    : 'text-slate-500 hover:text-blue-600'
                }`}
              >
                {selectedTask.started ? 'In Progress' : 'Start Task'}
              </button>
            </div>
            
            {selectedTask.due && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <span className="text-slate-600">Due Date</span>
                </div>
                <span className="font-medium text-slate-800">
                  {new Date(selectedTask.due).toLocaleDateString()}
                </span>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-slate-500" />
                <span className="text-slate-600">Time Spent</span>
              </div>
              <span className="font-medium text-slate-800">{selectedTask.timeSpent}</span>
            </div>
          </div>
        </div>

        {/* Group Info */}
        <div className="bg-white/50 rounded-lg p-4 mb-6 border border-slate-200/50">
          <div className="flex items-center space-x-2 mb-2">
            <Folder className="h-4 w-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-600">Group</span>
          </div>
          <span className="text-slate-800 font-medium">
            {groups[selectedTask.groupIndex].name}
          </span>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
          <textarea
            value={selectedTask.description}
            onChange={(e) => onUpdateTask({ description: e.target.value })}
            placeholder="Add a description for this task..."
            rows={4}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-slate-700 placeholder-slate-400"
          />
        </div>

        {/* Actions */}
        <div className="pt-6 border-t border-slate-200">
          <button
            onClick={onDeleteTask}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete Task</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TaskDetails;