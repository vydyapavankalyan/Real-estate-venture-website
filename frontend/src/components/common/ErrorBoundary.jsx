import React from 'react';
import { AlertTriangle, RefreshCw, Phone } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary] ERROR:', error?.message);
    console.error('[ErrorBoundary] STACK:', error?.stack);
    console.error('[ErrorBoundary] COMPONENT STACK:', info?.componentStack);
    this.setState({ info });
  }

  render() {
    if (this.state.hasError) {
      const isDev = import.meta.env.DEV;
      return (
        <div className="min-h-screen bg-obsidian-950 flex flex-col items-center justify-center text-center px-4 py-24">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-6">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>

          <h1 className="font-serif text-3xl font-bold text-white mb-3">Something Went Wrong</h1>
          <p className="text-slate-400 text-sm max-w-md leading-relaxed mb-8">
            An unexpected error occurred. Please reload the page. If the issue persists, contact our support team.
          </p>

          {/* Show real error in dev mode */}
          {isDev && this.state.error && (
            <div className="w-full max-w-2xl mb-8 text-left">
              <div className="bg-red-950/60 border border-red-500/40 rounded-xl p-4 mb-3">
                <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">Error Message</p>
                <p className="text-sm text-red-200 font-mono">{this.state.error.message}</p>
              </div>
              {this.state.info?.componentStack && (
                <div className="bg-obsidian-900 border border-white/10 rounded-xl p-4 overflow-auto max-h-48">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Component Stack</p>
                  <pre className="text-[10px] text-slate-400 font-mono whitespace-pre-wrap">
                    {this.state.info.componentStack}
                  </pre>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-sm uppercase tracking-wider hover:from-gold-400 hover:to-gold-500 transition-all"
            >
              <RefreshCw className="w-4 h-4" /> Reload Page
            </button>
            <a
              href="tel:+919090104949"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl border border-gold-500/40 text-gold-300 font-semibold text-sm uppercase tracking-wider hover:bg-gold-500/10 transition-all"
            >
              <Phone className="w-4 h-4" /> +91 9090104949
            </a>
          </div>

          <p className="mt-10 text-xs text-slate-600">
            Rajan Castle Properties &mdash; Hyderabad, Telangana 500074
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
