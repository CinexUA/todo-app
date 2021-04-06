import * as types from '../mutation-types'
import {
    ADD_TODO,
    EARS_TODOS,
    LOAD_TODOS,
    REMOVE_TODO,
    SET_STATUS_TODO
} from "../mutation-types";


//region improvised database
function storeToDB(todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}

function readFromDB() {
    return localStorage.getItem('todos')
        ? JSON.parse(localStorage.getItem('todos'))
        : []
}

function resetDB() {
    localStorage.removeItem('todos')
}
//endregion improvised database


// state
export const state = {
    todos: []
}

// getters
export const getters = {
    todos: state => state.todos
}

// mutations
export const mutations = {
    [ADD_TODO] (state, name)
    {
        const todo = {
            index: Date.now().toString(),
            position: state.todos.length + 1,
            done: false,
            name
        }

        state.todos.push(todo)
        storeToDB(state.todos)
    },
    [SET_STATUS_TODO] (state, index)
    {
        state.todos = state.todos.map(todo => {
            if(todo.index === index){
                todo.done = !todo.done
                return todo
            }
            return todo
        })
        storeToDB(state.todos)
    },
    [LOAD_TODOS] (state)
    {
        state.todos = readFromDB()
    },
    [REMOVE_TODO] (state, index)
    {
        state.todos = state.todos.filter(t => t.index !== index)
        storeToDB(state.todos)
    },
    [EARS_TODOS] (state)
    {
        resetDB()
        state.todos = []
    }
}

// actions
export const actions = {
    addTodo({ commit }, name)
    {
        commit(types.ADD_TODO, name)
    },
    changeStatusTodo({ commit }, index)
    {
        commit(types.SET_STATUS_TODO, index)
    },
    loadTodos({ commit, getters })
    {
        commit(types.LOAD_TODOS)
        return getters.todos
    },
    removeTodo({ commit }, index)
    {
        commit(types.REMOVE_TODO, index)
    },
    earsTodos({ commit })
    {
        commit(types.EARS_TODOS)
    }
}
