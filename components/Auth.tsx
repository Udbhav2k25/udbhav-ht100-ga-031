
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, X } from 'lucide-react';
import { api } from '../services/api';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsLoading(true);
      try {
        const user = await api.loginUser(email);
        onLogin(user);
      } catch (error) {
        console.error("Login failed", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGoogleAccountSelect = async (selectedEmail: string) => {
    setShowGoogleModal(false);
    setIsLoading(true);
    try {
      const user = await api.loginUser(selectedEmail);
      onLogin(user);
    } catch (error) {
      console.error("Google login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-pink-100/50 p-10 border border-white">
          <h2 className="font-serif text-4xl text-slate-800 mb-2 text-center">Welcome</h2>
          <p className="text-slate-500 text-center mb-8">Enter your email to access your library.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <input 
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-white/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <input 
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-white/50"
              />
              <p className="text-xs text-slate-400 mt-1 ml-1 text-right">Optional for demo</p>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-xl font-medium shadow-lg shadow-pink-300/50 hover:shadow-xl hover:scale-[1.02] transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center cursor-pointer"
            >
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Sign In / Register'}
            </button>
          </form>
          
          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-400">Or</span>
            </div>
          </div>

          <button 
            onClick={() => setShowGoogleModal(true)}
            disabled={isLoading}
            className="mt-6 w-full py-3 border border-slate-300 rounded-xl font-medium text-slate-600 hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-md disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>
        </div>
      </motion.div>

      {/* Mock Google Account Chooser Modal */}
      <AnimatePresence>
        {showGoogleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden"
            >
              <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
                <span className="font-medium text-slate-700">Choose an account</span>
                <button onClick={() => setShowGoogleModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-2">
                 <p className="text-xs text-slate-500 px-4 py-2 uppercase tracking-wider">to continue to Visual Narrator</p>
                 
                 <div className="space-y-1">
                   {/* Account 1 */}
                   <button 
                    onClick={() => handleGoogleAccountSelect("demo_alice@gmail.com")}
                    className="w-full flex items-center gap-4 px-4 py-3 hover:bg-slate-50 transition-colors text-left border-b border-slate-50 last:border-0"
                   >
                     <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg">
                       A
                     </div>
                     <div>
                       <div className="font-medium text-slate-800">Alice Demo</div>
                       <div className="text-sm text-slate-500">demo_alice@gmail.com</div>
                     </div>
                   </button>

                   {/* Account 2 */}
                   <button 
                    onClick={() => handleGoogleAccountSelect("bob.builder@gmail.com")}
                    className="w-full flex items-center gap-4 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                   >
                     <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-lg">
                       B
                     </div>
                     <div>
                       <div className="font-medium text-slate-800">Bob Builder</div>
                       <div className="text-sm text-slate-500">bob.builder@gmail.com</div>
                     </div>
                   </button>

                   {/* Account 3 */}
                   <button 
                    onClick={() => handleGoogleAccountSelect("charlie_brown@gmail.com")}
                    className="w-full flex items-center gap-4 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                   >
                     <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                       C
                     </div>
                     <div>
                       <div className="font-medium text-slate-800">Charlie Brown</div>
                       <div className="text-sm text-slate-500">charlie_brown@gmail.com</div>
                     </div>
                   </button>
                 </div>
                 
                 <div className="px-4 py-4 border-t border-slate-100 mt-2">
                   <button className="flex items-center gap-3 text-slate-600 hover:text-slate-900 text-sm font-medium w-full">
                     <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center">
                       <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                     </div>
                     Use another account
                   </button>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Auth;