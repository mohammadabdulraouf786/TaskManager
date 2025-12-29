import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TaskList from './TaskList';
import TaskDetails from './TaskDetails';
import NewTaskModal from './NewTaskModal';
import { Task, TaskGroup } from '../types/task';

interface TaskManagerProps {
  onLogout: () => void;
}

const TaskManager: React.FC<TaskManagerProps> = ({ onLogout }) => {
  const [groups, setGroups] = useState<TaskGroup[]>([{ name: 'My Tasks', tasks: [] }]);
  const [selectedTask, setSelectedTask] = useState<Task & { groupIndex: number; taskIndex: number } | null>(null);
  const [showModal, setShowModal] = useState(false);

  const addGroup = () => {
    setGroups([...groups, { name: `Group ${groups.length + 1}`, tasks: [] }]);
  };

  const deleteGroup = (index: number) => {
    const updatedGroups = [...groups];
    updatedGroups.splice(index, 1);
    setGroups(updatedGroups);
    setSelectedTask(null);
  };

  const addTask = (groupIndex: number, task: Omit<Task, 'id' | 'created' | 'started' | 'timeSpent' | 'completed'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      created: new Date().toLocaleDateString('en-GB'),
      started: false,
      timeSpent: '0h 0m',
      completed: false,
      description: task.description || '',
      subtasks: []
    };
    const updatedGroups = [...groups];
    updatedGroups[groupIndex].tasks.push(newTask);
    setGroups(updatedGroups);
  };

  const updateTask = (groupIndex: number, taskIndex: number, updates: Partial<Task>) => {
    const updatedGroups = [...groups];
    updatedGroups[groupIndex].tasks[taskIndex] = {
      ...updatedGroups[groupIndex].tasks[taskIndex],
      ...updates
    };
    setGroups(updatedGroups);
    
    if (selectedTask && selectedTask.groupIndex === groupIndex && selectedTask.taskIndex === taskIndex) {
      setSelectedTask({
        ...updatedGroups[groupIndex].tasks[taskIndex],
        groupIndex,
        taskIndex
      });
    }
  };

  const deleteTask = (groupIndex: number, taskIndex: number) => {
    const updatedGroups = [...groups];
    updatedGroups[groupIndex].tasks.splice(taskIndex, 1);
    setGroups(updatedGroups);
    setSelectedTask(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
        }}
      />
      
      <div className="relative z-10 flex h-screen">
        <Sidebar 
          groups={groups}
          onAddGroup={addGroup}
          onNewTask={() => setShowModal(true)}
          onLogout={onLogout}
        />
        
        <div className="flex-1 flex">
          <TaskList 
            groups={groups}
            onDeleteGroup={deleteGroup}
            onSelectTask={(task, groupIndex, taskIndex) => 
              setSelectedTask({ ...task, groupIndex, taskIndex })
            }
            onToggleTask={(groupIndex, taskIndex) => {
              const task = groups[groupIndex].tasks[taskIndex];
              updateTask(groupIndex, taskIndex, { completed: !task.completed });
            }}
          />
          
          <TaskDetails 
            selectedTask={selectedTask}
            groups={groups}
            onUpdateTask={(updates) => {
              if (selectedTask) {
                updateTask(selectedTask.groupIndex, selectedTask.taskIndex, updates);
              }
            }}
            onDeleteTask={() => {
              if (selectedTask) {
                deleteTask(selectedTask.groupIndex, selectedTask.taskIndex);
              }
            }}
          />
        </div>
      </div>

      {showModal && (
        <NewTaskModal
          groups={groups}
          onCreateTask={(groupName, task) => {
            const groupIndex = groups.findIndex(g => g.name === groupName);
            if (groupIndex !== -1) addTask(groupIndex, task);
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default TaskManager;