import { useTodos } from '../context/TodoContext'

function TodoWriteForm() {
    const { addTodo } = useTodos()

    const handleSubmit = (e) => {
        e.preventDefault()
        const inputText = e.target.elements.todo.value
        // 무조건 addTodo 호출, 검증은 addTodo에서!
        addTodo(inputText)
        e.target.reset()
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="todo" placeholder="할 일을 입력하세요." />
            <button type="submit">추가</button>
        </form>
    )
}

export default TodoWriteForm
