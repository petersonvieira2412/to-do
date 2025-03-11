<script>
  import axios from 'axios'

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

  const tasksService = {
    async getTasks() {
      try {
        const response = await axios.get(`${API_URL}/tasks`)
        return response.data
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error)
        throw error
      }
    },

    async createTask(task) {
      try {
        const response = await axios.post(`${API_URL}/tasks`, task)
        return response.data
      } catch (error) {
        console.error('Erro ao criar tarefa:', error)
        throw error
      }
    },

    async updateTask(id, updatedData) {
      try {
        const response = await axios.put(`${API_URL}/tasks/${id}`, updatedData)
        return response.data
      } catch (error) {
        throw new Error('Falha ao atualizar tarefa')
      }
    },

    async reorderTasks(reorderTasks) {
      try {
        const response = await axios.put(`${API_URL}/tasks/reorder`, reorderTasks)
        return response.data
      } catch (error) {
        throw new Error('Falha ao reordenar tarefas')
      }
    },

    async deleteTask(id) {
      try {
        const response = await axios.delete(`${API_URL}/tasks/${id}`)
        return response.data
      } catch (error) {
        console.error(`Erro ao deletar a tarefa com id ${id}:`, error)
        throw error
      }
    },
  }
  export default tasksService
</script>
