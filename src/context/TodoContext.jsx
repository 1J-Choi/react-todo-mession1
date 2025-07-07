import { createContext, useContext, useRef, useState } from 'react'
import { getItem, setItem } from '../storage.jsx'

const TodoContext = createContext()

export function TodoProvider({ children }) {
    const lastId = parseInt(localStorage.getItem('lastId') || '0')
    const [filterType, setFilterType] = useState('all')
    const [todos, setTodos] = useState(() => getItem('todos', []))

    const addTodo = (inputText) => {
        const newText = inputText.trim()
        if (!newText) {
            alert('할 일을 입력해주세요.')
            return
        }
        if (todos.some((todo) => todo.text === newText)) {
            alert('이미 등록된 todo 입니다.')
            return
        }
        const todoId = lastId + 1
        const form = {
            id: todoId,
            text: newText,
            completed: false,
            modify: false,
        }
        localStorage.setItem('lastId', todoId)
        const nowTodos = [form, ...todos]
        setTodos(nowTodos)
        setItem('todos', nowTodos)
    }

    const removeTodo = (id) => {
        const nowTodos = todos.filter((todo) => id !== todo.id)
        setTodos(nowTodos)
        setItem('todos', nowTodos)
    }

    const toggleTodo = (id) => {
        const nowTodos = todos.map((todo) => (id === todo.id ? { ...todo, completed: !todo.completed } : todo))
        setTodos(nowTodos)
        setItem('todos', nowTodos)
    }

    const selectFilter = (e) => {
        setFilterType(e.target.value)
    }

    const getFilteredTodos = () => {
        switch (filterType) {
            case 'active':
                return todos.filter((todo) => !todo.completed)
            case 'completed':
                return todos.filter((todo) => todo.completed)
            default:
                return todos
        }
    }

    const toggleModify = (id) => {
        const nowTodos = todos.map(
            (todo) =>
                todo.id === id
                    ? { ...todo, modify: !todo.modify } // 해당 항목만 수정
                    : { ...todo, modify: false }, // 나머지 항목은 수정 모드 해제
        )
        setTodos(nowTodos)
        setItem('todos', nowTodos)
    }

    const modifyTodo = (id, newText) => {
        newText = newText.trim()
        if (!newText) {
            alert('수정할 내용을 입력해주세요.')
            setTodos(todos.map((todo) => ({ ...todo, modify: false })))
            return
        }
        if (todos.some((todo) => todo.text === newText)) {
            alert('이미 등록된 todo 입니다.')
            setTodos(todos.map((todo) => ({ ...todo, modify: false })))
            return
        }
        const nowTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, text: newText, modify: false } : { ...todo, modify: false },
        )
        setTodos(nowTodos)
        setItem('todos', nowTodos)
    }

    const value = {
        todos,
        filterType,
        addTodo,
        removeTodo,
        toggleTodo,
        selectFilter,
        getFilteredTodos,
        toggleModify,
        modifyTodo,
    }

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

export function useTodos() {
    return useContext(TodoContext)
}
