<template>
  <div ref="chatRef" class="flex-1 overflow-y-auto p-4">
    <div class="flex flex-col space-y-2">
      <!-- Messages go here -->
      <ChatBubble
        v-for="message in messages"
        :key="message.id"
        v-bind="message" 
      />
        <!-- v-bind hace el mapeo automático de claves, equivalente a: -->
        <!-- :its-mine="message.itsMine"
        :message="message.message"
        :image="message.image" -->

      <div v-if="loading" class="flex items-center space-x-1 text-gray-600">
        <i class="fa-solid fa-pen"></i>
        <span>Escribiendo</span>
        <span class="animate-bounce" style="animation-delay:0ms">.</span>
        <span class="animate-bounce" style="animation-delay:150ms">.</span>
        <span class="animate-bounce" style="animation-delay:300ms">.</span>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import ChatBubble from '@/components/chat/ChatBubble.vue';
import type { ChatMessage } from '@/interfaces/chat-message.interface';
import { ref, watch } from 'vue';

interface Props {
  messages: ChatMessage[];
  loading: boolean; // Optional prop to indicate loading state
}

const { messages } = defineProps<Props>();
const chatRef = ref<HTMLDivElement|null>(null);

watch(
  () => messages,
  () => {
    setTimeout(() => {      
      chatRef.value?.scrollTo({
        top: chatRef.value.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  },
  { deep: true } // <- Esto permite detectar cambios dentro del array (messages) y no solo cuando se reemplaza el array completo.
);

</script>