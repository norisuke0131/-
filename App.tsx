import React, { useState } from 'react';
import Header from './components/Header';
import Quiz from './components/Quiz';
import Result from './components/Result';
import ImageEditor from './components/ImageEditor';
import { AppState, UserAnswers } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.HOME);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const handleQuizComplete = (answers: string[]) => {
    setUserAnswers(answers);
    setAppState(AppState.RESULT);
  };

  const handleNavigate = (state: AppState) => {
    // Reset if going home
    if (state === AppState.HOME) {
      setUserAnswers([]);
    }
    setAppState(state);
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.HOME:
        return (
          <div className="max-w-md mx-auto px-6 pt-12 pb-6 text-center">
            <div className="mb-10 relative">
               <div className="absolute inset-0 bg-base-red opacity-5 blur-3xl rounded-full"></div>
               <img 
                 src="https://images.unsplash.com/photo-1579631542720-3a87824fff86?q=80&w=600&auto=format&fit=crop" 
                 alt="Delicious Pasta" 
                 className="relative w-48 h-48 object-cover rounded-full mx-auto shadow-2xl border-4 border-white rotate-3 hover:rotate-6 transition-transform duration-500"
               />
            </div>
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Base
              <span className="block text-base-red text-xl font-sans font-medium mt-2 tracking-widest uppercase">Pasta & Pizza</span>
            </h1>
            <p className="text-gray-500 mb-10 leading-relaxed">
              今日何を食べようか迷っていませんか？<br/>
              5つの質問に答えるだけで、AIシェフが今の気分にぴったりのメニューをご提案します。
            </p>
            <button
              onClick={() => setAppState(AppState.QUIZ)}
              className="w-full bg-base-red text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-red-200 hover:shadow-red-300 hover:translate-y-[-2px] transition-all"
            >
              メニューを決める
            </button>
            <div className="mt-6">
                <button 
                    onClick={() => setAppState(AppState.IMAGE_EDITOR)}
                    className="text-sm text-gray-400 hover:text-base-blue underline decoration-dashed underline-offset-4"
                >
                    料理写真の加工はこちら
                </button>
            </div>
          </div>
        );
      case AppState.QUIZ:
        return <Quiz onComplete={handleQuizComplete} />;
      case AppState.RESULT:
        return (
          <Result 
            answers={userAnswers} 
            onReset={() => handleNavigate(AppState.HOME)}
            onGoToEditor={() => setAppState(AppState.IMAGE_EDITOR)}
          />
        );
      case AppState.IMAGE_EDITOR:
        return <ImageEditor />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-900 pb-10">
      <Header activeTab={appState} onNavigate={handleNavigate} />
      <main className="animate-fade-in">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;