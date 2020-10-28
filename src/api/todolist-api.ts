import axios from 'axios'

const instance = axios.create({
        baseURL: 'https://social-network.samuraijs.com/api/1.1/',
        withCredentials: true,
        headers: {
            'API-KEY': '2ab06da3-ea5f-4726-b6a5-ae0f930da8a3'
        },
    }
)


export const todoListAPI = {
    getTodoLists() {
        return instance.get('todo-lists')
    },
    createTodoList(title: string) {
        return instance.post('todo-lists', {title})
    },
    deleteTodoList(todolistId: string) {
        return instance.delete(`todo-lists/${todolistId}`)
    },
    updateTodoList(todolistId: string, title: string) {
        return instance.put(`/todo-lists/${todolistId}`, {title})
    }
}


