function TodoListItem({ todo, onToggle, onRemove, onToggleModify, onModifySubmit }) {
    return (
        <li
            key={todo.id}
            className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded px-3 py-2 shadow-sm"
        >
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className="accent-blue-500 w-5 h-5"
            />
            <span
                className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'} ${
                    todo.modify ? 'italic' : ''
                }`}
            >
                {todo.text}
            </span>
            <button
                onClick={() => onRemove(todo.id)}
                className="text-red-500 hover:text-red-700 px-2 py-1 rounded transition-colors"
            >
                X
            </button>
            <button
                onClick={() => onToggleModify(todo.id)}
                className="text-blue-500 hover:text-blue-700 px-2 py-1 rounded transition-colors"
            >
                수정
            </button>
            {todo.modify && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        const newText = e.target.elements.editText.value.trim()
                        onModifySubmit(todo.id, newText)
                    }}
                    className="flex gap-2 ml-2"
                >
                    <input
                        placeholder="새 todo 내용"
                        name="editText"
                        type="text"
                        className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                        type="submit"
                    >
                        저장
                    </button>
                </form>
            )}
        </li>
    )
}

export default TodoListItem
