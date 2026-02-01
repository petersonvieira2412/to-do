<template>
  <aside
    :class="sidebarOpen ? 'w-64' : 'w-16'"
    class="relative bg-slate-900 min-h-screen transition-all duration-300 flex flex-col border-r border-slate-700"
  >
    <div class="flex items-center justify-between p-4 border-b border-slate-700">
      <div class="flex items-center justify-center w-full min-w-0">
        <Logo v-if="sidebarOpen" />
        <img v-else src="/favicon.svg" alt="PVS.dev" class="h-8 w-8 shrink-0" />
      </div>
      <button @click="toggleSidebar" class="absolute right-2 top-2 p-2 text-slate-300 hover:text-white transition-colors">
        <svg
          v-if="sidebarOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>
    </div>

    <nav class="flex-1 p-4">
      <ul class="space-y-2">
        <li>
          <a
            href="#"
            class="flex items-center space-x-2 p-5 rounded-md transition-colors bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
          >
            <v-icon
              name="bi-clipboard-check-fill"
              class="text-emerald-400 h-5 hover:cursor-pointer"
            />
            <span v-if="sidebarOpen" class="font-semibold text-slate-100">Tasks</span>
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
  import { ref } from 'vue'
  import { addIcons, OhVueIcon } from 'oh-vue-icons'
  import { BiClipboardCheckFill } from 'oh-vue-icons/icons'
  import Logo from './Logo.vue'

  addIcons(BiClipboardCheckFill)

  const VIcon = OhVueIcon

  const sidebarOpen = ref(true)
  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }
</script>
