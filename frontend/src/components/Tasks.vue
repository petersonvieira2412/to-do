<template>
  <div class="flex flex-wrap md:flex-nowrap gap-5">
    <TaskBoard
      v-for="(board, index) in boardsWithTasks"
      :key="index"
      :title="board.title"
      :icon="board.icon"
      :color="board.color"
      :bg-color="board.bgColor"
      :tasks="board.tasks"
    />
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue'
  import TaskBoard from './TaskBoard.vue'
  import tasksService from '../services/tasksService.vue'

  const allTasks = ref([])

  onMounted(async () => {
    try {
      const response = await tasksService.getTasks()
      allTasks.value = response
    } catch (error) {
      console.error('Erro ao buscar tasks:', error)
    }
  })

  const boards = [
    { title: 'To Do', icon: 'fa-regular-circle', color: 'text-gray-700', bgColor: 'bg-amber-300' },
    { title: 'In Progress', icon: 'bi-circle-half', color: 'text-white', bgColor: 'bg-blue-500' },
    { title: 'Done', icon: 'bi-check-circle-fill', color: 'text-white', bgColor: 'bg-green-500' },
  ]

  const boardsWithTasks = computed(() =>
    boards.map((board) => ({
      ...board,
      tasks: allTasks.value.filter((task) => task.status === board.title),
    })),
  )
</script>
