import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import Input from '../ui/Input';
import Button from '../ui/Button';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (data.session) {
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.message.toLowerCase().includes('confirm')) {
        setError('Your email is not confirmed. Please check your inbox for the confirmation link.');
      } else {
        setError('Invalid email or password.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
    if (authError) setError(authError.message);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-up">
      <Input 
        label="Email Address" 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      
      <div className="space-y-2">
        <div className="flex justify-between items-center px-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest invisible">Password</label>
           <a href="#" className="text-xs font-bold text-primary hover:underline underline-offset-4">Forgot Password?</a>
        </div>
        <Input 
          label="Password" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>

      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

      <Button 
        type="submit" 
        variant="primary" 
        size="lg" 
        className="w-full py-4 text-base shadow-xl flex items-center justify-center gap-2"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Signing In...
          </>
        ) : "Sign In"}
      </Button>

      <div className="relative flex items-center py-4">
        <div className="flex-grow border-t border-slate-100"></div>
        <span className="mx-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">or continue with</span>
        <div className="flex-grow border-t border-slate-100"></div>
      </div>

      <button 
        type="button"
        onClick={handleGoogleLogin}
        className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
        </svg>
        Continue with Google
      </button>

    </form>
  );
};

export default SignInForm;
