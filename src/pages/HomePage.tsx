import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
/**
 * Redirects immediately to LoginPage as this is a prototype with a functional entry screen.
 */
export function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    // Immediate redirect to login/persona selection
    navigate('/', { replace: true });
  }, [navigate]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="text-center space-y-8 relative z-10 animate-fade-in w-full">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-primary">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">HYO Arbitragem</h1>
          <p className="text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    </div>
  );
}