import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { TaskGroup } from '../types/task';

interface NewTaskModalProps {
  groups: TaskGroup[];
  onCreateTask: (groupName: string, task: {
    name: string;
    description: string;
    due?: string;
  }) => void;
  onClose: () => void;
}

const NewTaskModal: React.FC<NewTaskModalProps> = ({ groups, onCreateTask, onClose }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(groups[0]?.name || '');
  const [addAnother, setAddAnother] = useState(false);

  const handleCreate = () => {
    if (!taskName.trim()) return;
    
    onCreateTask(selectedGroup, {
      name: taskName,
      description,
      due: dueDate || undefined
    });

    if (!addAnother) {
      onClose();
    } else {
      setTaskName('');
      setDescription('');
      setDueDate('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleCreate();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">Create New Task</h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Task Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Task Name *
            </label>
            <input
              type="text"
              placeholder="What needs to be done?"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 placeholder-slate-400"
              autoFocus
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description
            </label>
            <textarea
              placeholder="Add more details about this task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800"
            />
          </div>

          {/* Group Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Group
            </label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800"
            >
              {groups.map((group, i) => (
                <option key={i} value={group.name}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>

          {/* Add Another Checkbox */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="addAnother"
              checked={addAnother}
              onChange={() => setAddAnother(!addAnother)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
            />
            <label htmlFor="addAnother" className="text-sm text-slate-700">
              Create another task after this one
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 bg-slate-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!taskName.trim()}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="h-4 w-4" />
            <span>Create Task</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTaskModal;