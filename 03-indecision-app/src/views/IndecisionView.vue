<!-- Fuente: https://tailwindcomponents.com/component/chat-layout -->
<template>
  <div class="bg-gray-100 h-screen flex flex-col max-w-lg mx-auto">
    <div class="bg-blue-500 p-4 text-white flex justify-between items-center">
      <span>Una persona jeje</span>
    </div>

    <!-- ChatMessages -->
    <ChatMessages :messages="messages" :loading="loading" />

    <!-- MessageBox -->
    <MessageBox @send-message="onMessage" />
  </div>
</template>

<script lang="ts" setup>
import ChatMessages from '@/components/chat/ChatMessages.vue';
import MessageBox from '@/components/chat/MessageBox.vue';
import { useChat } from '@/composables/useChat';

const {messages, loading, onMessage} = useChat();
</script>