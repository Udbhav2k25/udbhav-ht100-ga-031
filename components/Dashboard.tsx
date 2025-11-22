import React, { useEffect, useState } from 'react';
import { User, Project } from '../types';
import { Plus, Clock, BookOpen, Layout, ArrowLeft, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../services/api';

interface DashboardProps {
  user?: User;
  onCreateProject: () => void;
  onBack: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onCreateProject, onBack }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      if (user?.id) {
        try {
          const data = await api.getProjects(user.id);
          setProjects(data);
        } catch (error) {
          console.error("Failed to fetch projects", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchProjects();
  }, [user]);

  const templates = [
    { id: 1, title: "Wedding Template 1", desc: "Classic layout with romantic serif fonts.", image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop" },
    { id: 2, title: "Wedding Template 2", desc: "Classic layout with romantic serif fonts.", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop" },
    { id: 3, title: "Wedding Template 3", desc: "Classic layout with romantic serif fonts.", image: "https://images.unsplash.com/photo-1520854221256-17451cc330e7?q=80&w=1631&auto=format&fit=crop" },
  ];

  return (
    <div className="min-h-screen bg-blue-50 font-sans pb-20">
      <main className="max-w-6xl mx-auto px-6 pt-12">
        
        {/* Hero Welcome Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl shadow-blue-100/50 overflow-hidden text-center relative mb-12"
        >
          {/* Back Button */}
          <button 
            onClick={onBack}
            className="absolute top-6 left-6 p-2 text-slate-400 hover:text-pink-500 hover:bg-slate-50 rounded-full transition-all z-20 cursor-pointer"
            title="Back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          {/* Top decorative gradient bar */}
          <div className="h-2 w-full bg-gradient-to-r from-blue-200 via-pink-300 to-blue-200" />
          
          <div className="py-16 px-6 flex flex-col items-center">
            <h1 className="font-serif text-5xl md:text-6xl text-slate-800 mb-6 tracking-tight">
              WELCOME {user?.name?.toUpperCase() || 'STORYTELLER'}
            </h1>

             {/* Quote inside card - Placed between Title and Button */}
            <p className="font-serif text-2xl text-slate-400 italic tracking-wide mb-8">
              "Create your immersive storybook"
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCreateProject}
              className="inline-flex items-center gap-2 px-8 py-4 bg-pink-400 hover:bg-pink-500 text-white rounded-full text-sm md:text-base font-bold tracking-wide shadow-lg shadow-pink-300/50 transition-all uppercase cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              Make Your Own Project
            </motion.button>
          </div>
        </motion.div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Previous Projects */}
          <div>
            <div className="flex items-center gap-2 mb-6 text-slate-600 font-bold text-sm tracking-wider uppercase">
              <Clock className="w-5 h-5" />
              <h3>Previous Projects</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* New Project Placeholder - Always First */}
              <div 
                className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer" 
                onClick={onCreateProject}
              >
                <Plus className="w-8 h-8 mb-2 opacity-50" />
                <span className="text-xs font-medium">New Project</span>
              </div>

              {isLoading ? (
                <div className="aspect-square rounded-2xl bg-white flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-pink-400 animate-spin" />
                </div>
              ) : projects.length > 0 ? (
                projects.map((project) => (
                  <motion.div 
                    key={project.id}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-slate-200">
                      {project.coverImage ? (
                        <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-pink-50 flex items-center justify-center text-pink-300">
                          <BookOpen className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                    <h4 className="font-serif text-lg text-slate-900 font-bold px-1 leading-tight truncate">
                      {project.title || "Untitled Story"}
                    </h4>
                    <p className="text-xs text-slate-400 px-1 mt-1 font-medium">
                      {project.date}
                    </p>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-1 text-slate-400 text-sm italic py-4">
                  No stories woven yet.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Pre-prepared Albums */}
          <div>
            <div className="flex items-center gap-2 mb-6 text-slate-600 font-bold text-sm tracking-wider uppercase">
              <BookOpen className="w-5 h-5" />
              <h3>Pre-prepared Albums</h3>
            </div>

            <div className="space-y-4">
              {templates.map((template) => (
                <motion.div 
                  key={template.id}
                  whileHover={{ scale: 1.01 }}
                  className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer flex gap-4 items-center group"
                >
                  <div className="w-20 h-20 shrink-0 rounded-xl bg-slate-200 overflow-hidden">
                    <img src={template.image} alt={template.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  
                  <div>
                    <h4 className="font-serif text-slate-900 font-bold text-lg mb-1">
                      {template.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {template.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;