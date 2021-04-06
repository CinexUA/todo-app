<template>
    <div>
        <div v-if="todos.length > 0">
            <todo-item v-for="todo in todos" :key="todo.index" :todo="todo" />
        </div>

        <div class="ears-wrapper">
            <a @click.prevent="earsTodos()" href="#">Ears</a>
        </div>
    </div>
</template>

<script>
    import TodoItem from "./TodoItem";

    export default {
        name: "TodoList",
        components: {TodoItem},
        comments: {
            TodoItem
        },
        props: {
            todos: {
                required: true,
                type: Array
            }
        },
        methods: {

            earsTodos(){
                this.$store.dispatch('todos/earsTodos')
                this.$root.$emit('reloadTodos')
            }
        },
    }
</script>

<style scoped>
    .ears-wrapper{
        margin-top: 10px;
    }
</style>