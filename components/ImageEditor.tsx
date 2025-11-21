import React, { useState, useRef } from 'react';
import { Upload, Wand2, Download, X, Image as ImageIcon, RefreshCw } from 'lucide-react';
import { editFoodImage } from '../services/geminiService';

const ImageEditor: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result as string);
        setGeneratedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!originalImage || !prompt.trim()) return;

    setLoading(true);
    try {
      const result = await editFoodImage(originalImage, prompt);
      setGeneratedImage(result);
    } catch (error) {
      console.error("Generation failed", error);
      alert("画像の生成に失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  const clearImage = () => {
    setOriginalImage(null);
    setGeneratedImage(null);
    setPrompt('');
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 min-h-[80vh] flex flex-col">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-bold text-gray-900">AIフードスタイリスト</h2>
        <p className="text-gray-500 text-sm">Powered by Gemini 2.5 Flash</p>
      </div>

      {!originalImage ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center p-8 cursor-pointer hover:border-base-red hover:bg-red-50 transition-all group min-h-[300px]"
        >
          <div className="bg-white p-4 rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8 text-base-red" />
          </div>
          <p className="text-gray-900 font-medium">料理の写真をアップロード</p>
          <p className="text-gray-400 text-sm mt-1">タップして選択</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-100 aspect-square">
             {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-10 backdrop-blur-sm text-white">
                    <RefreshCw className="w-10 h-10 animate-spin mb-2" />
                    <span className="font-medium">魔法をかけています...</span>
                </div>
             )}
            <img 
              src={generatedImage || originalImage} 
              alt="Food" 
              className="w-full h-full object-cover"
            />
            {generatedImage && (
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    編集済み
                </div>
            )}
             <button 
                onClick={clearImage}
                className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-md"
            >
                <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
               どのように編集しますか？
            </label>
            <div className="flex space-x-2">
                <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder='例: "湯気を追加して", "レトロな雰囲気に"'
                className="flex-1 p-3 rounded-xl border border-gray-200 focus:border-base-red focus:ring-2 focus:ring-red-100 outline-none transition-all"
                />
                <button
                onClick={handleGenerate}
                disabled={!prompt || loading}
                className="p-3 bg-base-red text-white rounded-xl hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                <Wand2 className="w-6 h-6" />
                </button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
                {['チーズをとろけさせて', '湯気を追加', 'シネマティックな照明', 'お洒落なカフェ風に'].map((suggestion) => (
                    <button
                        key={suggestion}
                        onClick={() => setPrompt(suggestion)}
                        className="text-xs px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                    >
                        {suggestion}
                    </button>
                ))}
            </div>
          </div>

          {generatedImage && (
            <a 
                href={generatedImage} 
                download="base-remixed-food.png"
                className="flex items-center justify-center w-full py-3 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
            >
                <Download className="w-5 h-5 mr-2" />
                画像を保存
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageEditor;