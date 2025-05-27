
import { Shield, AlertTriangle } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-gray-800 border-b border-red-900/30">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Shield className="w-8 h-8 text-red-500" />
              <AlertTriangle className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">LLM Red Team</h1>
              <p className="text-gray-400 text-sm">AI Security Assessment Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-400">Session Status</div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
