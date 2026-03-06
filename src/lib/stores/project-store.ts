import { create } from 'zustand';
import type { Project } from '@/lib/types';

interface ProjectState {
  currentProject: Project | null;
  projects: Project[];
  isLoading: boolean;

  setCurrentProject: (project: Project | null) => void;
  setProjects: (projects: Project[]) => void;
  setLoading: (loading: boolean) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  currentProject: null,
  projects: [],
  isLoading: false,

  setCurrentProject: (project) => set({ currentProject: project }),
  setProjects: (projects) => set({ projects }),
  setLoading: (isLoading) => set({ isLoading }),
  updateProject: (id, updates) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
      currentProject:
        state.currentProject?.id === id
          ? { ...state.currentProject, ...updates }
          : state.currentProject,
    })),
}));

interface UIState {
  sidebarOpen: boolean;
  activeTab: string;
  aiPanelOpen: boolean;

  setSidebarOpen: (open: boolean) => void;
  setActiveTab: (tab: string) => void;
  setAiPanelOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  activeTab: 'overview',
  aiPanelOpen: false,

  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setActiveTab: (activeTab) => set({ activeTab }),
  setAiPanelOpen: (aiPanelOpen) => set({ aiPanelOpen }),
}));
