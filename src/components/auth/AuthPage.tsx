import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import heroImage from '@/assets/hero-collaboration.jpg';

interface AuthPageProps {
  onAuthenticated: (user: any) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = async (email: string, password: string) => {
    // TODO: Replace with actual API call
    // Simulating API call
    console.log('Login attempt:', { email, password });
    
    // Mock successful login
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email,
      avatar: null
    };
    
    onAuthenticated(mockUser);
  };

  const handleSignup = async (name: string, email: string, password: string) => {
    // TODO: Replace with actual API call
    // Simulating API call
    console.log('Signup attempt:', { name, email, password });
    
    // Mock successful signup
    const mockUser = {
      id: '1',
      name,
      email,
      avatar: null
    };
    
    onAuthenticated(mockUser);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90"></div>
        <img 
          src={heroImage} 
          alt="Team collaboration" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-8 max-w-lg">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to SynergySphere
            </h1>
            <p className="text-xl opacity-90">
              The intelligent backbone for team collaboration. 
              Streamline communication, manage projects, and work smarter together.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-background to-secondary/50">
        <div className="w-full max-w-md">
          {/* Mobile Hero Section */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">
              SynergySphere
            </h1>
            <p className="text-muted-foreground">
              Intelligent team collaboration platform
            </p>
          </div>

          {isLogin ? (
            <LoginForm
              onLogin={handleLogin}
              onSwitchToSignup={() => setIsLogin(false)}
            />
          ) : (
            <SignupForm
              onSignup={handleSignup}
              onSwitchToLogin={() => setIsLogin(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;