<template>
    <div>
        <div>
            <input type="text" v-model="todo" />
            <a @click.prevent="onAdd()" href="#" class="addBtn">
                add
            </a>
        </div>

        <div class="errors" v-if="errors.length > 0">
            <p v-for="error in errors" :key="error">{{error}}</p>
        </div>

    </div>
</template>

<script>
    export default {
        name: "CreateTodo",
        data: () => ({
            todo: '',
            errors: []
        }),
        methods: {
            validateForm(){
                this.resetErrors()

                if(!this.todo.length){
                    this.errors.push('The field todo name can\'t be empty')
                }
            },
            validatedForm(){
                return !this.errors.length
            },
            resetErrors(){
                this.errors = []
            },
            onAdd(){
                this.validateForm()
                if(this.validatedForm()){
                    this.$store.dispatch('todos/addTodo', this.todo)
                    this.$root.$emit('reloadTodos')
                    this.todo = ''
                }
            }
        }
    }
</script>

<style scoped>
    .addBtn{
        margin-left: 10px;
    }
    .errors p{
        color: #ff0000;
        font-size: .9rem;
    }
</style>