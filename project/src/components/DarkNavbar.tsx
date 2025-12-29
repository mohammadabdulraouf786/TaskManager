import React from 'react';
import { CheckSquare, Home, LogIn, UserPlus } from 'lucide-react';

interface DarkNavbarProps {
  onNavigate: (page: string) => void;
}

const DarkNavbar: React.FC<DarkNavbarProps> = ({ onNavigate }) => {
  return (
    <nav className="bg-slate-900/90 backdrop-blur-sm border-b border-slate-700/50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div 
          className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => onNavigate('home')}
        >
          <CheckSquare className="h-8 w-8 text-blue-400" />
          <span className="text-2xl font-bold text-white">TaskFlow</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </button>
          <button 
            onClick={() => onNavigate('login')}
            className="flex items-center space-x-2 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
          >
            <LogIn className="h-4 w-4" />
            <span>Login</span>
          </button>
          <button 
            onClick={() => onNavigate('signup')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            <UserPlus className="h-4 w-4" />
            <span>Sign Up</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DarkNavbar;