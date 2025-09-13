import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Project } from '../interfaces/project.interface';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '@vueuse/core';

const initialLoad = (): Project[] => {
  return [
    {
      id: uuidv4(),
      name: 'Project 1',
      tasks: [],
    },
    {
      id: uuidv4(),
      name: 'Project 2',
      tasks: [],
    },
  ];
};

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref(useLocalStorage<Project[]>('projects', initialLoad()));

  const addProject = (name: string) => {
    if (name.length === 0) return;

    projects.value.push({
      id: uuidv4(),
      name: name,
      tasks: [],
    });
  };

  const updateProjectName = (projectId: string, newName: string) => {
    const project = projects.value.find((p) => p.id === projectId);
    if (!project || !newName.trim()) return;
    project.name = newName.trim();
  };

  const removeProject = (projectId: string) => {
    projects.value = projects.value.filter((p) => p.id !== projectId);
  };

  const addTaskToProject = (projectId: string, name: string) => {
    const project = projects.value.find((p) => p.id === projectId);
    if (!project || name.length === 0) return;

    project.tasks.push({
      id: uuidv4(),
      name,
    });
  };

  const toggleTask = (projectId: string, taskId: string) => {
    const project = projects.value.find((p) => p.id === projectId);
    if (!project) return;

    const task = project.tasks.find((t) => t.id === taskId);
    if (!task) return;

    task.completedAt = task.completedAt ? undefined : new Date();
  };

  const updateTaskName = (projectId: string, taskId: string, newName: string) => {
    const project = projects.value.find((p) => p.id === projectId);
    if (!project || !newName.trim()) return;

    const task = project.tasks.find((t) => t.id === taskId);
    if (task) task.name = newName;
  };

  const removeTaskFromProject = (projectId: string, taskId: string) => {
    const project = projects.value.find((p) => p.id === projectId);
    if (!project) return;

    project.tasks = project.tasks.filter((t) => t.id !== taskId);
  };

  return {
    // Properties
    projects,

    // Getters
    projectList: computed(() => [...projects.value]),
    noProjects: computed(() => (projects.value.length === 0 ? true : false)),

    projectsWithCompletion: computed(() => {
      return projects.value.map((project) => {
        const total = project.tasks.length;
        const completed = project.tasks.filter((t) => t.completedAt).length;
        const completion = total === 0 ? 0 : (completed / total) * 100;

        return {
          id: project.id,
          name: project.name,
          taskCount: total,
          completion: Math.round(completion),
        };
      });
    }),

    // Actions
    addProject,
    updateProjectName,
    removeProject,
    addTaskToProject,
    toggleTask,
    updateTaskName,
    removeTaskFromProject,
  };
});
