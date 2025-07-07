import { useEffect, useState } from 'react'

function AppApi() {
    useEffect(() => {
        fetch('https://dummyjson.com/todos')
            .then((res) => res.json())
            .then((res) => setTodos(res.todos))
    }, [])

    const [todoId, setTodoId] = useState(4)
    const [todos, setTodos] = useState([])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        // console.log(e.target.elements.todo.value)
        // const form = { id: todoId, todo: e.target.elements.todo.value, completed: false }
        // setTodoId(todoId + 1)
        // setTodos([form, ...todos])
        fetch('https://dummyjson.com/todos/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                todo: e.target.elements.todo.value,
                completed: false,
                userId: 5,
            }),
        })
            .then((res) => res.json())
            .then(console.log)
    }

    const removeTodo = (id) => {
        // setTodos(todos.filter((todo) => id !== todo.id))
        fetch('https://dummyjson.com/todos/${id}', {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then(console.log)
    }

    const toggleTodo = (id) => {
        // setTodos(todos.map((todo) => (id === todo.id ? { ...todo, compeleted: !todo.completed } : todo)))
        /* updating completed status of todo with id 1 */
        fetch('https://dummyjson.com/todos/${id}', {
            method: 'PUT' /* or PATCH */,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                completed: !todo.completed,
            }),
        })
            .then((res) => res.json())
            .then(console.log)
    }

    return (
        <>
            <form onSubmit={handleOnSubmit}>
                <input type="text" name="todo" />
                <button type="submit">등록</button>
            </form>
            <span>총 할일: {todos.length} </span>
            <span>완료된 할일: {todos.filter((todo) => todo.completed).length}</span>
            <ul>
                {todos.map((todo, i) => (
                    <li key={i} style={{ display: 'flex' }}>
                        <input type="checkBox" checked={todo.completed} onChange={() => toggleTodo(todo.id)}></input>-
                        {todo.todo}
                        <button onClick={() => removeTodo(todo.id)}>X</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default App
