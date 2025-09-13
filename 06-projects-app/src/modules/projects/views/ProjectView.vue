<template>
  <div class="w-full">
    <h1 class="text-4xl mb-3 p-2 text-center">Tareas del proyecto {{ project?.name ?? 'N/A' }}</h1>
    <section class="p-3">
      <bread-crumbs :name="project?.name ?? 'No name'" />
    </section>

    <section class="m-2">
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th class="w-14">Completada</th>
              <th>Tarea</th>
              <th>Completada en</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="task in project?.tasks" :key="task.id" class="hover:bg-base-300">
              <td>
                <input
                  type="checkbox"
                  class="checkbox checkbox-primary"
                  :checked="!!task.completedAt"
                  @change="projectStore.toggleTask(project?.id ?? '', task.id)"
                />
              </td>
              <td>
                <span
                  v-if="!editingTaskId || editingTaskId !== task.id"
                  @dblclick="startEditing(task.id, task.name)"
                >
                  {{ task.name }}
                </span>
                <input
                  v-else
                  :id="`task-edit-${task.id}`"
                  v-model="editedTaskName"
                  @keyup.enter="saveTaskName(task.id)"
                  @blur="saveTaskName(task.id)"
                  @keydown.esc="editingTaskId = null"
                  class="input input-sm"
                />
              </td>
              <td>{{ task.completedAt ? task.completedAt.toLocaleString() : '-' }}</td>
              <td>
                <button
                  class="btn btn-primary btn-xs me-2"
                  @click="startEditing(task.id, task.name)"
                >
                  Modificar
                </button>
                <button
                  class="btn btn-error btn-xs"
                  @click="projectStore.removeTaskFromProject(props.id, task.id)"
                >
                  Eliminar
                </button>
              </td>
            </tr>
            <tr class="hover:bg-base-300">
              <th></th>
              <td>
                <input
                  type="text"
                  class="input input-primary w-full opacity-60 transition-all hover:opacity-100"
                  placeholder="Nueva tarea"
                  v-model="newTaskName"
                  @keyup.enter="addTask"
                />
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import BreadCrumbs from '@/modules/common/components/BreadCrumbs.vue';
import { useProjectsStore } from '../store/projects.store';
import { nextTick, ref, watch } from 'vue';
import type { Project } from '../interfaces/project.interface';
import { useRouter } from 'vue-router';

interface Props {
  id: string;
}

const router = useRouter();
const props = defineProps<Props>();
const projectStore = useProjectsStore();
const project = ref<Project | null>();
const editingTaskId = ref<string | null>(null);
const editedTaskName = ref('');

watch(
  () => props.id,
  () => {
    project.value = projectStore.projectList.find((project) => project.id === props.id);
    if (!project.value) {
      router.push('/');
    }
  },
  {
    immediate: true,
  },
);

// TASK
const newTaskName = ref('');

const addTask = () => {
  if (!project.value) return;
  projectStore.addTaskToProject(project.value.id, newTaskName.value);
  newTaskName.value = ''; // limpia el input
};

const startEditing = async (taskId: string, currentName: string) => {
  editingTaskId.value = taskId;
  editedTaskName.value = currentName;

  await nextTick();
  setTimeout(() => {
    const el = document.getElementById(`task-edit-${taskId}`) as HTMLInputElement | null;
    if (el) {
      el.focus();
      el.select();
    }
  }, 75); // 50-100ms si hace falta
};

const saveTaskName = (taskId: string) => {
  if (!project.value) return;
  projectStore.updateTaskName(project.value.id, taskId, editedTaskName.value);
  editingTaskId.value = null;
};
</script>
