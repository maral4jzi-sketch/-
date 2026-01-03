
import React, { useState, useRef } from 'react';
import Layout from './components/Layout';
import AnalysisResult from './components/AnalysisResult';
import { analyzeBusinessIdea } from './services/geminiService';
import { AnalysisRecord, AnalysisResponse } from './types';
import { 
  Rocket, 
  X, 
  Loader2, 
  History, 
  TrendingUp, 
  Zap,
  Shirt,
  Home,
  Cpu,
  ShoppingBag,
  MoreHorizontal
} from 'lucide-react';

const CATEGORIES = [
  { id: 'fashion', label: 'Хувцас загвар', icon: Shirt },
  { id: 'household', label: 'Гэр ахуй', icon: Home },
  { id: 'tech', label: 'Технологи', icon: Cpu },
  { id: 'retail', label: 'Худалдаа', icon: ShoppingBag },
  { id: 'other', label: 'Бусад', icon: MoreHorizontal },
];

const App: React.FC = () => {
  const [idea, setIdea] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].id);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [history, setHistory] = useState<AnalysisRecord[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async () => {
    if (!idea.trim()) {
      setError("Бизнесийн санаагаа оруулна уу.");
      return;
    }
    setAnalyzing(true);
    setError(null);
    try {
      const analysisResult = await analyzeBusinessIdea(idea, category);
      setResult(analysisResult);
      
      const newRecord: AnalysisRecord = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        idea: idea,
        category: CATEGORIES.find(c => c.id === category)?.label || category,
        analysis: analysisResult
      };
      setHistory(prev => [newRecord, ...prev].slice(0, 10));
    } catch (err) {
      console.error(err);
      setError("Шинжилгээ хийхэд алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setAnalyzing(false);
    }
  };

  const reset = () => {
    setIdea('');
    setResult(null);
    setAnalyzing(false);
    setError(null);
  };

  return (
    <Layout>
      <div className="space-y-12 max-w-5xl mx-auto">
        {/* Header Section */}
        {!result && (
          <div className="text-center space-y-6 py-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-bold">
              <Zap size={16} />
              Бизнес Хөгжүүлэлтийн Ухаалаг Зөвлөх
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Бизнес Санаагаа <span className="text-blue-600">Монгол</span> Хөрсөнд Үнэл
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-3xl mx-auto">
              Санаагаа бичээд Монголын эдийн засгийн бодит нөхцөл байдалд тулгуурласан үнэн зөв дүгнэлт болон стратегийн шийдлийг хормын дотор хүлээн ав.
            </p>
          </div>
        )}

        {/* Form Zone */}
        {!result && (
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 space-y-8">
            <div className="space-y-4">
              <label className="text-lg font-bold text-slate-800 block">1. Салбараа сонгоно уу</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                        category === cat.id 
                          ? 'border-blue-600 bg-blue-50 text-blue-600' 
                          : 'border-slate-100 hover:border-slate-200 text-slate-500'
                      }`}
                    >
                      <Icon size={24} />
                      <span className="text-xs font-bold">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-lg font-bold text-slate-800 block">2. Бизнесийн санаагаа бичнэ үү</label>
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Жишээ: Монгол үндэсний хээтэй орчин үеийн спорт гутал үйлдвэрлэх..."
                className="w-full h-48 p-6 rounded-3xl border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-lg leading-relaxed text-slate-700 resize-none bg-slate-50/50"
              />
            </div>

            {error && (
              <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl text-sm border border-rose-100 flex items-center gap-2">
                <X size={18} />
                {error}
              </div>
            )}

            <button 
              onClick={handleAnalysis}
              disabled={analyzing || !idea.trim()}
              className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-4 transition-all shadow-xl shadow-slate-200 active:scale-[0.98]"
            >
              {analyzing ? (
                <>
                  <Loader2 className="animate-spin" size={28} />
                  Шинжээчид өгөгдөл боловсруулж байна...
                </>
              ) : (
                <>
                  <Rocket size={28} />
                  Бизнесийн шинжилгээ хийх
                </>
              )}
            </button>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex items-center justify-between">
              <button 
                onClick={reset}
                className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors bg-white px-6 py-3 rounded-full shadow-sm"
              >
                <X size={18} />
                Шинэ санаа үнэлэх
              </button>
              <div className="text-sm font-bold text-slate-400 bg-slate-100 px-4 py-2 rounded-full">
                {CATEGORIES.find(c => c.id === category)?.label}
              </div>
            </div>
            <AnalysisResult data={result} idea={idea} />
          </div>
        )}

        {/* History Section */}
        {history.length > 0 && (
          <div className="border-t border-slate-200 pt-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-slate-900 text-white p-3 rounded-2xl">
                  <History size={24} />
                </div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Өмнөх шинжилгээнүүд</h2>
              </div>
              <span className="text-sm font-bold text-slate-400">{history.length} санаа хадгалагдсан</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {history.map((record) => (
                <div 
                  key={record.id} 
                  onClick={() => {
                    setIdea(record.idea);
                    setResult(record.analysis);
                    setCategory(CATEGORIES.find(c => c.label === record.category)?.id || 'other');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-50 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {record.category}
                    </span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${record.analysis.feasibilityScore >= 8 ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'}`}>
                      {record.analysis.feasibilityScore}/10
                    </span>
                  </div>
                  <p className="text-slate-700 font-bold line-clamp-2 mb-4 group-hover:text-blue-600 transition-colors">
                    "{record.idea}"
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                    <div className="text-[10px] text-slate-400">{new Date(record.timestamp).toLocaleDateString()}</div>
                    <TrendingUp size={14} className="text-slate-300 group-hover:text-blue-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default App;
