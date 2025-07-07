import { createContext, useContext, useRef, useState } from 'react'

const TodoContext = createContext()

export function TodoProvider({ children }) {
    const lastIdRef = useRef(0)
    const [filterType, setFilterType] = useState('all')
    const [todos, setTodos] = useState([])

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
        const todoId = lastIdRef.current + 1
        const form = {
            id: todoId,
            text: newText,
            checked: false,
            modify: false,
        }
        lastIdRef.current = todoId
        setTodos([form, ...todos])
    }

    const removeTodo = (id) => {
        setTodos(todos.filter((todo) => id !== todo.id))
    }

    const toggleTodo = (id) => {
        setTodos(todos.map((todo) => (id === todo.id ? { ...todo, checked: !todo.checked } : todo)))
    }

    const selectFilter = (e) => {
        setFilterType(e.target.value)
    }

    const getFilteredTodos = () => {
        switch (filterType) {
            case 'active':
                return todos.filter((todo) => !todo.checked)
            case 'completed':
                return todos.filter((todo) => todo.checked)
            default:
                return todos
        }
    }

    const toggleModify = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, modify: true, editText: todo.text } : { ...todo, modify: false },
            ),
        )
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
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, text: newText, modify: false, editText: '' } : { ...todo, modify: false },
            ),
        )
    }

    const cancelModifyAll = () => {
        setTodos(todos.map((todo) => ({ ...todo, modify: false })))
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
        cancelModifyAll,
    }

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

export function useTodos() {
    return useContext(TodoContext)
}
