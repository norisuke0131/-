import React, { useEffect, useState } from 'react';
import { Sparkles, RotateCcw, Share2, Camera } from 'lucide-react';
import { getDishRecommendation } from '../services/geminiService';

interface ResultProps {
  answers: string[];
  onReset: () => void;
  onGoToEditor: () => void;
}

const Result: React.FC<ResultProps> = ({ answers, onReset, onGoToEditor }) => {
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    const fetchRecommendation = async () => {
      try {
        const text = await getDishRecommendation(answers);
        if (mounted) {
          setRecommendation(text);
          setLoading(false);
        }
      } catch (error) {
        if (mounted) {
          setRecommendation("申し訳ありません。シェフが忙しいようです。もう一度お試しください。");
          setLoading(false);
        }
      }
    };

    fetchRecommendation();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="max-w-md mx-auto p-6 min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-base-red border-t-transparent"></div>
        <p className="text-gray-500 font-medium animate-pulse">シェフがメニューを考案中...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-8 animate-fade-in-up">
      <div className="text-center space-y-2">
        <div className="inline-block p-3 bg-yellow-100 rounded-full mb-2">
          <Sparkles className="w-6 h-6 text-yellow-600" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-gray-900">あなたへのおすすめ</h2>
        <p className="text-gray-500">今の気分にぴったりの一皿です</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-base-red to-yellow-400"></div>
        <div className="prose prose-lg text-gray-700 whitespace-pre-line leading-relaxed">
          {recommendation}
        </div>
      </div>

      <div className="space-y-3 pt-4">
        <button
          onClick={onGoToEditor}
          className="w-full py-4 bg-base-blue text-white rounded-xl font-bold shadow-lg hover:bg-opacity-90 transition-transform active:scale-95 flex items-center justify-center space-x-2"
        >
          <Camera className="w-5 h-5" />
          <span>料理の写真を加工する</span>
        </button>
        
        <button
          onClick={onReset}
          className="w-full py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>最初からやり直す</span>
        </button>
      </div>
    </div>
  );
};

export default Result;