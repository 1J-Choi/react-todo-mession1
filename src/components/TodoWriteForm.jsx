import { useTodos } from '../context/TodoContext'

function TodoWriteForm() {
    const { addTodo } = useTodos()

    const handleSubmit = (e) => {
        e.preventDefault()
        const inputText = e.target.elements.todo.value
        addTodo(inputText)
        e.target.reset()
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <input
                type="text"
                name="todo"
                placeholder="할 일을 입력하세요."
                className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
                추가
            </button>
        </form>
    )
}

export default TodoWriteForm
