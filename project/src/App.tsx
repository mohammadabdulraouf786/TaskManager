import React, { useState } from 'react';
import Home from './components/Home';
import DarkNavbar from './components/DarkNavbar';
import TaskManager from './components/TaskManager';
import AuthPage from './components/AuthPage';

const App = () => {
  const [page, setPage] = useState(localStorage.getItem('currentUser') ? 'app' : 'home');

  const navigate = (newPage: string) => setPage(newPage);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setPage('home');
  };

  const handleLogin = (username: string, password: string) => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
    if (storedUsers[username] && storedUsers[username] === password) {
      localStorage.setItem('currentUser', username);
      setPage('app');
      return true;
    }
    return false;
  };

  const handleSignup = (username: string, password: string, confirm: string) => {
    if (!username || !password || password !== confirm) {
      return { success: false, message: 'Invalid signup details' };
    }

    const existingUsers = JSON.parse(localStorage.getItem('users') || '{}');
    if (existingUsers[username]) {
      return { success: false, message: 'User already exists' };
    }

    const updatedUsers = { ...existingUsers, [username]: password };
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    return { success: true, message: 'Sign up successful. Please log in.' };
  };

  if (page === 'home') {
    return <Home onStart={() => setPage('login')} />;
  }

  if (page === 'login' || page === 'signup') {
    return (
      <AuthPage 
        mode={page as 'login' | 'signup'}
        onNavigate={navigate}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    );
  }

  return <TaskManager onLogout={handleLogout} />;
};

export default App;