import React, {StrictMode, Component} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Error boundary to catch any React crashes and show a helpful message instead of blank page
class ErrorBoundary extends Component<{children: React.ReactNode}, {hasError: boolean, error: string}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: '' };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error: error?.message || String(error) };
  }
  componentDidCatch(error: any, info: any) {
    console.error('[App Error Boundary]', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', background: 'linear-gradient(135deg, #8B0000, #4a0000)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Georgia, serif', color: '#fff', padding: 24, textAlign: 'center'
        }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>💍</div>
          <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 8, color: '#C8960C' }}>Dhobi Matrimony</div>
          <div style={{ fontSize: 15, marginBottom: 24, opacity: 0.8 }}>Something went wrong. Please refresh the page.</div>
          <button onClick={() => { this.setState({ hasError: false }); window.location.reload(); }} style={{
            background: '#C8960C', color: '#fff', border: 'none', borderRadius: 12,
            padding: '12px 32px', fontSize: 15, fontWeight: 700, cursor: 'pointer'
          }}>🔄 Refresh Page</button>
          <div style={{ marginTop: 16, fontSize: 11, opacity: 0.4 }}>{this.state.error}</div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
