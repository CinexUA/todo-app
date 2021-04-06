<template>
    <div class="todo-wrap">
        <div :class="['todo-item', todo.done ? 'todo-crossed' : '']" @click="changeStatus(todo.index)">
            {{todo.position}}: {{todo.name}}
        </div>
        <a @click.prevent="removeTodoItem(todo.index)" href="#">
            [X]
        </a>
    </div>
</template>

<script>
    export default {
        name: "TodoItem",
        props: {
            todo: {
                required: true,
                type: Object
            }
        },
        methods: {
            changeStatus(index){
                this.$store.dispatch('todos/changeStatusTodo', index)
            },
            removeTodoItem(index){
                this.$store.dispatch('todos/removeTodo', index)
                this.$root.$emit('reloadTodos')
            }
        }
    }
</script>

<style scoped>
    .todo-wrap{
        max-width: 350px;
        margin: 0 auto;
    }
    .todo-item{
        cursor: pointer;
        display: inline-block;
        color: #3b3b3b;
        background: #e8e8e8;
        margin-bottom: 5px;
        width: 80%;
    }
    .todo-crossed{
        text-decoration: line-through;
    }
</style>