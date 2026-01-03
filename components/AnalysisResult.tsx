
import React from 'react';
import { AnalysisResponse } from '../types';
import { 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Lightbulb, 
  Target, 
  BarChart3,
  ChevronRight,
  Globe
} from 'lucide-react';

interface AnalysisResultProps {
  data: AnalysisResponse;
  idea: string;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ data, idea }) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (score >= 5) return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-rose-100 text-rose-700 border-rose-200';
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Input Idea & Score */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Таны санаа</h3>
            <p className="text-slate-800 font-medium italic leading-relaxed">
              "{idea}"
            </p>
          </div>

          <div className={`p-6 rounded-2xl border ${getScoreColor(data.feasibilityScore)}`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold flex items-center gap-2">
                <BarChart3 size={20} />
                Хэрэгжих боломж
              </h3>
              <span className="text-3xl font-black">{data.feasibilityScore}/10</span>
            </div>
            <div className="w-full bg-white/50 rounded-full h-2 mb-4">
              <div 
                className={`h-full rounded-full ${data.feasibilityScore >= 8 ? 'bg-emerald-500' : data.feasibilityScore >= 5 ? 'bg-blue-500' : 'bg-rose-500'}`}
                style={{ width: `${data.feasibilityScore * 10}%` }}
              />
            </div>
            <p className="text-sm leading-relaxed opacity-90">{data.economicReality}</p>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-2xl">
            <h3 className="font-bold flex items-center gap-2 mb-3">
              <Globe size={18} className="text-blue-400" />
              Салбарын төлөв
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {data.categoryContext}
            </p>
          </div>
        </div>

        {/* Right Column: Detailed Business Feedback */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <Target className="text-blue-600" />
              Шинжээчийн дүгнэлт
            </h2>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <p className="text-slate-700 leading-relaxed text-lg font-medium">
                {data.summary}
              </p>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
              <h3 className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
                <CheckCircle2 size={20} />
                Давуу тал
              </h3>
              <ul className="space-y-3">
                {data.strengths.map((str, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-emerald-900/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    {str}
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100">
              <h3 className="font-bold text-rose-800 mb-4 flex items-center gap-2">
                <AlertCircle size={20} />
                Эрсдэл ба Сул тал
              </h3>
              <ul className="space-y-3">
                {data.weaknesses.map((weak, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-rose-900/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                    {weak}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section>
            <div className="bg-blue-600 p-8 rounded-3xl shadow-xl shadow-blue-200 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Lightbulb size={120} />
              </div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Lightbulb />
                Технологид суурилсан өсөлтийн шийдэл
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.techSolutions.map((sol, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/20">
                    <h4 className="font-bold mb-2 flex items-center justify-between">
                      {sol.title}
                      <ChevronRight size={14} />
                    </h4>
                    <p className="text-sm text-blue-50 leading-relaxed">
                      {sol.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <TrendingUp size={18} className="text-blue-500" />
              Зах зээлийн багтаамж
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {data.marketFit}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
