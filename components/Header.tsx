import React from 'react';
import { UtensilsCrossed, Camera, ChefHat } from 'lucide-react';
import { AppState } from '../types';

interface HeaderProps {
  activeTab: AppState;
  onNavigate: (state: AppState) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onNavigate }) => {
  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => onNavigate(AppState.HOME)}
        >
          <div className="bg-base-red p-1.5 rounded-lg">
            <ChefHat className="text-white w-6 h-6" />
          </div>
          <span className="font-serif text-2xl font-bold text-gray-900 tracking-tight">Base</span>
        </div>

        <nav className="flex space-x-1">
          <button
            onClick={() => onNavigate(AppState.HOME)}
            className={`p-2 rounded-full transition-colors ${
              activeTab === AppState.HOME || activeTab === AppState.QUIZ || activeTab === AppState.RESULT
                ? 'bg-gray-100 text-base-red'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <UtensilsCrossed className="w-5 h-5" />
          </button>
          <button
            onClick={() => onNavigate(AppState.IMAGE_EDITOR)}
            className={`p-2 rounded-full transition-colors ${
              activeTab === AppState.IMAGE_EDITOR
                ? 'bg-gray-100 text-base-red'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Camera className="w-5 h-5" />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
