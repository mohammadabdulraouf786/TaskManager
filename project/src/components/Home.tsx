import React from 'react';
import { CheckSquare, Users, BarChart3, Zap } from 'lucide-react';

interface HomeProps {
  onStart: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-slate-900/80" />
      
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex justify-between items-center p-6 lg:p-8">
          <div className="flex items-center space-x-2">
            <CheckSquare className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">TaskFlow</span>
          </div>
          <button 
            onClick={onStart}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
          >
            Get Started
          </button>
        </nav>

        {/* Hero Section */}
        <div className="container mx-auto px-6 lg:px-8 pt-16 pb-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Organize Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400"> Life</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              The ultimate personal task manager that helps you stay organized, 
              focused, and productive. Transform your daily chaos into structured success.
            </p>
            <button 
              onClick={onStart}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Managing Tasks
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            <FeatureCard 
              icon={<CheckSquare className="h-8 w-8" />}
              title="Smart Organization"
              description="Group tasks by projects, priorities, or custom categories"
            />
            <FeatureCard 
              icon={<Users className="h-8 w-8" />}
              title="Team Collaboration"
              description="Share tasks and collaborate with your team members"
            />
            <FeatureCard 
              icon={<BarChart3 className="h-8 w-8" />}
              title="Progress Tracking"
              description="Monitor your productivity with detailed analytics"
            />
            <FeatureCard 
              icon={<Zap className="h-8 w-8" />}
              title="Lightning Fast"
              description="Quick task creation and seamless user experience"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300 group">
    <div className="text-blue-400 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
    <p className="text-slate-300 text-sm">{description}</p>
  </div>
);

export default Home;