<template>
  <div
    class="md:w-4/12 px-2 bg-[#f8f8f8] shadow-md rounded-md h-3/12"
    :class="{
      'max-h-[500px] overflow-y-auto': tasks.length > 8,
      'min-w-[250px]': true,
    }"
  >
    <div class="flex flex-wrap gap-4 items-center justify-center p-1">
      <div class="flex justify-between items-center w-full pt-2">
        <div class="md:w-7/12 flex items-center p-1 rounded-sm" :class="bgColor">
          <v-icon :name="icon" class="h-4" :class="color" />
          <h2 class="text-xs font-semibold" :class="color">{{ title }}</h2>
        </div>
        <div class="md:w-5/12 flex justify-between">
          <span id="todo-count" class="text-gray-600 pl-2 text-sm">{{ tasks.length }}</span>
          <button @click="addTask(title)" class="bg-transparent text-gray-600 flex justify-end">
            <v-icon name="hi-plus-sm" class="text-gray-600 h-5 hover:cursor-pointer" />
          </button>
        </div>
      </div>
      <draggable
        v-model="tasks"
        group="tasks"
        class="w-full"
        @add="onTaskMove"
        @change="onTaskChange"
        item-class="task-item"
      >
        <template #item="{ element }">
          <li
            :key="element.id"
            class="relative group flex justify-between items-center p-2 mb-2 bg-white shadow-sm rounded-[6px] border-1 hover:border-gray-400 hover:cursor-pointer"
            @click.stop="handleTaskClick(element)"
          >
            <div class="grid">
              <span
                :id="element.id"
                class="text-gray-600 text-sm font-medium hover:cursor-pointer transition-all"
                :class="element.status === 'Done' ? 'line-through' : ''"
              >
                {{ element.title }}
              </span>
              <v-icon
                v-if="element.description"
                name="md-formatlistbulleted-outlined"
                class="text-gray-600 h-3"
              />
            </div>
            <div
              class="absolute top-0.5 right-[3px] flex justify-center items-center gap-1 opacity-1 group-hover:opacity-100 transition-opacity bg-[#f8f8f8] shadow-md rounded-xs p-1"
              @click.stop
            >
              <v-icon
                name="la-pen-solid"
                class="text-gray-600 h-3.5 hover:cursor-pointer"
                @click.stop="clickTask(element)"
              />
              <span class="text-gray-600 text-[15px]">|</span>
              <v-icon
                name="io-trash-outline"
                class="trash-icon text-red-600 h-3.5 hover:cursor-pointer"
                @click.stop="removeTask(element.id)"
              />
            </div>
          </li>
        </template>
      </draggable>
    </div>
    <div class="flex justify-between items-center mb-2 bg-none rounded-[6px] hover:border-gray-400">
      <button
        class="flex justify-right items-center bg-transparent w-full py-1 font-medium text-sm text-gray-400 hover:cursor-pointer hover:bg-gray-200 hover:rounded-[3px]"
        @click="addTask(title)"
      >
        <v-icon name="hi-plus-sm" class="text-gray-400 h-4" />
        Adicionar Tarefa
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref, defineProps, watch } from 'vue'
  import { addIcons, OhVueIcon } from 'oh-vue-icons'
  import {
    FaRegularCircle,
    BiCircleHalf,
    BiCheckCircleFill,
    HiPlusSm,
    MdFormatlistbulletedOutlined,
    LaPenSolid,
    IoTrashOutline,
  } from 'oh-vue-icons/icons'
  import draggable from 'vuedraggable'
  import Swal from 'sweetalert2'
  import { useToast } from 'vue-toast-notification'
  import 'vue-toast-notification/dist/theme-sugar.css'
  import tasksService from '../services/tasksService.vue'

  const props = defineProps({
    title: { type: String, required: true },
    icon: { type: String, required: true },
    bgColor: { type: String, required: true },
    color: { type: String, required: true },
    tasks: { type: Array, default: [], required: true },
  })

  addIcons(
    FaRegularCircle,
    BiCircleHalf,
    BiCheckCircleFill,
    HiPlusSm,
    MdFormatlistbulletedOutlined,
    LaPenSolid,
    IoTrashOutline,
  )

  const VIcon = OhVueIcon
  const $toast = useToast()
  const tasks = ref(props.tasks)

  watch(
    () => props.tasks,
    (newTasks) => {
      tasks.value = newTasks
    },
    { immediate: true },
  )

  const editingTask = ref(null)
  const isReordering = ref(false)

  const taskModal = async (
    task = { title: '', description: '' },
    isNew = false,
    isRemove = false,
  ) => {
    if (!isRemove) {
      const modalTitle = isNew ? 'Adicionar Tarefa' : 'Editar Tarefa'
      const confirmButtonText = isNew ? 'Adicionar' : 'Salvar'
      const { value: formValues } = await Swal.fire({
        title: modalTitle,
        html: `
          <input id="title" class="swal2-input custom-input mx-0 my-2" placeholder="Título" value="${task.title}" required>
          <textarea id="description" class="swal2-textarea custom-textarea m-0" placeholder="Descrição">${task.description || ''}</textarea>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        cancelButtonText: 'Cancelar',
        customClass: {
          confirmButton:
            'bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mr-2 hover:cursor-pointer',
          cancelButton:
            'bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded hover:cursor-pointer',
        },
        buttonsStyling: false,

        preConfirm: () => {
          const title = document.getElementById('title').value
          const description = document.getElementById('description').value
          if (!title) {
            Swal.showValidationMessage('O título é obrigatório')
          }
          return { title, description }
        },
      })
      return formValues
    } else {
      const { value: confirm } = await Swal.fire({
        title: 'Excluir Tarefa?',
        text: 'Deseja excluir a tarefa permanentemente?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Cancelar',
        customClass: {
          confirmButton:
            'bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-2 hover:cursor-pointer',
          cancelButton:
            'bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded hover:cursor-pointer',
        },
        buttonsStyling: false,
      })
      return confirm
    }
  }

  const clickTask = async (task) => {
    const formValues = await taskModal(task, false)
    if (formValues) {
      const success = await updateTask(task.id, formValues)
      if (success) {
        $toast.success('Alterações realizadas com sucesso!', { position: 'top-right' })
      }
    }
    editingTask.value = null
  }

  const addTask = async (category) => {
    const formValues = await taskModal({ title: '', description: '' }, true)
    if (formValues && formValues.title.trim() !== '') {
      const newTask = {
        title: formValues.title,
        description: formValues.description,
        completed: category === 'Done',
        status: category,
      }
      try {
        const data = await tasksService.createTask(newTask)
        tasks.value.push({ ...newTask, id: data.id })
        $toast.success('Tarefa adicionada com sucesso!', { position: 'top-right' })
      } catch (error) {
        const errorMsg = 'Erro ao criar tarefa!'
        console.error(errorMsg, error)
        $toast.error(errorMsg, { position: 'top-right' })
      }
    }
  }

  const updateTask = async (taskId, updatedFields) => {
    try {
      const updatedTask = await tasksService.updateTask(taskId, updatedFields)

      const index = tasks.value.findIndex((t) => t.id === taskId)
      if (index !== -1) {
        Object.assign(tasks.value[index], updatedTask)
      }
      return true
    } catch (error) {
      const errorMsg = 'Erro ao atualizar tarefa!'
      console.error(errorMsg, error)
      $toast.error(errorMsg, { position: 'top-right' })
      return false
    }
  }

  const onTaskMove = async (event) => {
    const item = event.item.__draggable_context.element

    if (item.status !== props.title) {
      await updateTask(item.id, { status: props.title })
      await reorderTasks()
    }
  }

  const onTaskChange = async (event) => {
    await reorderTasks()
  }

  const reorderTasks = async () => {
    isReordering.value = true

    const reorders = tasks.value.map((task, index) => ({
      id: Number(task.id),
      order: index,
      status: props.title,
    }))

    try {
      await tasksService.reorderTasks(reorders)

      tasks.value = tasks.value.map((task, index) => ({
        ...task,
        order: index,
        status: props.title,
      }))
    } catch (error) {
      const errorMsg = 'Erro ao reordenar tarefas!'
      console.error(errorMsg, error)
      $toast.error(errorMsg, { position: 'top-right' })
    } finally {
      isReordering.value = false
    }
  }

  const removeTask = async (id) => {
    const confirmed = await taskModal({ id }, false, true)
    if (confirmed) {
      try {
        await tasksService.deleteTask(id)
        tasks.value = tasks.value.filter((task) => task.id !== id)
        $toast.success('Tarefa excluída com sucesso!', { position: 'top-right' })
      } catch (error) {
        const errorMsg = 'Erro ao excluir tarefa!'
        console.error(errorMsg, error)
        $toast.error(errorMsg, { position: 'top-right' })
      }
    }
  }

  const handleTaskClick = (task) => {
    clickTask(task)
  }
</script>
