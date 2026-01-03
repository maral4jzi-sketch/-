
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">М</div>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">Эдийн Засгийн <span className="text-blue-600">Хараа</span></h1>
            </div>
            <div className="hidden md:flex gap-6 text-sm font-medium text-slate-500">
              <a href="#" className="hover:text-blue-600 transition-colors">Хянах самбар</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Тайлангууд</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Архив</a>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2026 Монголын Эдийн Засгийн Хараа Платформ. Gemini Flash 3.0 ашиглав.</p>
          <p className="text-xs mt-2 italic">Визуал оюун ухаанаар дамжуулан тогтвортой хөгжлийг дэмжих нь.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
