<template>
  <aside
    :class="sidebarOpen ? 'w-64' : 'w-16'"
    class="relative bg-gray-100 min-h-screen transition-all duration-300 flex flex-col border-r border-gray-300"
  >
    <div class="flex items-center justify-between p-4 border-b border-gray-300">
      <div class="flex items-center justify-center w-full">
        <img v-if="sidebarOpen" src="@/assets/logo.png" alt="Logo" class="h-8 w-auto" />
        <img v-else src="@/assets/logo-icon.png" alt="Logo" class="h-8 w-auto" />
      </div>
      <button @click="toggleSidebar" class="absolute right-2 top-2 p-2 text-gray-700">
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
            class="flex items-center space-x-2 p-5 rounded-md transition-colors bg-[var(--color-background)] text-blue-700"
          >
            <v-icon
              name="bi-clipboard-check-fill"
              class="text-white h-5 hover:cursor-pointer hover:text-blue-700"
            />
            <span v-if="sidebarOpen" class="font-semibold">Tasks</span>
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

  addIcons(BiClipboardCheckFill)

  const VIcon = OhVueIcon

  const sidebarOpen = ref(true)
  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }
</script>
