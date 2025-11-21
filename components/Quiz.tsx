import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Question } from '../types';

interface QuizProps {
  onComplete: (answers: string[]) => void;
}

const questions: Question[] = [
  {
    id: 1,
    text: "今の気分は？",
    options: ["元気いっぱい！", "まったりリラックス", "ちょっとお疲れ気味", "冒険したい気分"]
  },
  {
    id: 2,
    text: "お腹の空き具合は？",
    options: ["軽く済ませたい", "普通", "ぺこぺこ", "限界に近い！"]
  },
  {
    id: 3,
    text: "どんな味が好み？",
    options: ["濃厚クリーミー", "トマト＆バジル", "パンチのある味", "さっぱりオイル系"]
  },
  {
    id: 4,
    text: "メインの食材は？",
    options: ["お肉が食べたい", "新鮮な魚介類", "野菜たっぷり", "チーズ溺愛"]
  },
  {
    id: 5,
    text: "最後はやっぱり...",
    options: ["パスタ派", "ピザ派", "おまかせ"]
  }
];

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleOptionSelect = (option: string) => {
    const newAnswers = [...answers, option];
    if (currentStep < questions.length - 1) {
      setAnswers(newAnswers);
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="max-w-md mx-auto p-6 min-h-[60vh] flex flex-col justify-center">
      <div className="mb-8">
        <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-base-red transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2 text-right">質問 {currentStep + 1} / 5</p>
      </div>

      <div className="space-y-6 animate-fade-in">
        <h2 className="text-3xl font-serif font-bold text-gray-900 leading-tight">
          {currentQuestion.text}
        </h2>

        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionSelect(option)}
              className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-base-red hover:bg-red-50 transition-all duration-200 group flex items-center justify-between"
            >
              <span className="text-gray-700 group-hover:text-base-red font-medium">{option}</span>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-base-red opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;