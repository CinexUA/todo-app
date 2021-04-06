<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/todo_list.png" class="logo">
    <create-todo />

    <div>
       <a @click.prevent="sortByEvenOdd()" href="#">sort by</a> <p>{{sort}}</p>
    </div>

    <todo-list :todos="todos" :key="todos.length" />
  </div>
</template>

<script>
import CreateTodo from './components/CreateTodo.vue'
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    CreateTodo, TodoList
  },
  data: () => ({
    todos: [],
    sort: '',
  }),
  methods: {
    async sortByEvenOdd()
    {
      const todosList = await this.$store.dispatch('todos/loadTodos')

      switch (this.sort) {

        case '':
          this.sort = 'even'
          this.todos = todosList.filter(t => t.position % 2 === 0)
          break

        case 'even':
          this.sort = 'odd'
          this.todos = todosList.filter(t => t.position % 2 !== 0)
          break

        default:
          this.todos = todosList
          this.sort = ''

      }

    },
    earsTodos(){
      this.$store.dispatch('todos/earsTodos')
    }
  },
  async beforeMount() {
    this.todos = await this.$store.dispatch('todos/loadTodos')

    this.$root.$on('reloadTodos', async () => {
      this.todos = await this.$store.dispatch('todos/loadTodos')
    });
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .logo{
    max-width: 120px;
    max-height: 120px;
  }
</style>
