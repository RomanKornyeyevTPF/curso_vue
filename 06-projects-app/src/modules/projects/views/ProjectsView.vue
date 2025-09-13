<template>
  <div class="overflow-x-auto w-full">
    <h1 class="text-4xl mb-3 p-2 text-center">Proyectos</h1>
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Proyecto</th>
          <th>Tareas</th>
          <th>Avance</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(project, index) in projectsStore.projectsWithCompletion"
          :key="project.id"
          class="hover:bg-base-300"
        >
          <th>{{ index + 1 }}</th>
          <td>
            <span
              v-if="!editingProjectId || editingProjectId !== project.id"
              @dblclick="startEditing(project.id, project.name)"
              class="underline"
            >
              <RouterLink :to="`/project/${project.id}`">{{ project.name }}</RouterLink>
            </span>
            <input
              v-else
              :id="`project-edit-${project.id}`"
              v-model="editedProjectName"
              @keyup.enter="saveProjectName(project.id)"
              @blur="saveProjectName(project.id)"
              class="input input-sm"
            />
          </td>
          <td>{{ project.taskCount }}</td>
          <td>
            <progress class="progress w-56" :value="project.completion" max="100"></progress>
            {{ project.completion }}
          </td>
          <td>
            <button
              class="btn btn-primary btn-xs me-2"
              @click="startEditing(project.id, project.name)"
            >
              Modificar
            </button>
            <button class="btn btn-error btn-xs" @click="projectsStore.removeProject(project.id)">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <input-modal
    :open="modalOpen"
    @close="modalOpen = false"
    @value="projectsStore.addProject"
    title="Añadir proyecto"
    subtitle="Escriba abajo el nombre de su proyecto"
    placeholder="Ingrese el nombre del proyecto"
  />

  <custom-modal :open="customModalOpen">
    <template #header>
      <h1 class="text-3xl">Titulo del modal</h1>
    </template>
    <template #body>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae nobis dolor, alias autem aut
        expedita laudantium voluptatibus itaque labore nesciunt fuga minima debitis deleniti id?
      </p>
    </template>
    <template #footer>
      <div class="flex justify-end mt-5">
        <button @click="customModalOpen = false" class="btn mr-4">Close</button>
        <button @click="customModalOpen = false" class="btn btn-primary">Aceptar</button>
      </div>
    </template>
  </custom-modal>

  <fab-button @click="modalOpen = true">
    <add-circle />
  </fab-button>

  <fab-button @click="customModalOpen = true" position="bottom-left">
    <modal-icon />
  </fab-button>
</template>

<script lang="ts" setup>
import CustomModal from '@/modules/common/components/CustomModal.vue';
import FabButton from '@/modules/common/components/FabButton.vue';
import InputModal from '@/modules/common/components/InputModal.vue';
import AddCircle from '@/modules/common/icons/AddCircle.vue';
import ModalIcon from '@/modules/common/icons/ModalIcon.vue';
import { nextTick, ref } from 'vue';
import { useProjectsStore } from '../store/projects.store';

const modalOpen = ref(false);
const customModalOpen = ref(false);
const editingProjectId = ref<string | null>(null);
const editedProjectName = ref('');

const projectsStore = useProjectsStore();

const startEditing = async (projectId: string, currentName: string) => {
  editingProjectId.value = projectId;
  editedProjectName.value = currentName;

  await nextTick();
  setTimeout(() => {
    const el = document.getElementById(`project-edit-${projectId}`) as HTMLInputElement | null;
    if (el) {
      el.focus();
      el.select();
    }
  }, 75); // delay para asegurar el render
};

const saveProjectName = (projectId: string) => {
  projectsStore.updateProjectName(projectId, editedProjectName.value);
  editingProjectId.value = null;
};
</script>
