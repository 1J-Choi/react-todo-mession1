function TodoListItem({ todo, onToggle, onRemove, onToggleModify, onModifySubmit }) {
    return (
        <li key={todo.id} style={{ display: 'flex' }}>
            <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} />
            {todo.text}
            <button onClick={() => onRemove(todo.id)}>X</button>
            <button onClick={() => onToggleModify(todo.id)}>수정</button>
            {todo.modify && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        const newText = e.target.elements.editText.value.trim()
                        // 무조건 onModifySubmit 호출
                        onModifySubmit(todo.id, newText)
                    }}
                >
                    <input placeholder="새 todo 내용" name="editText" type="text" className="border rounded p-2" />
                    <button className="border rounded p-2" type="submit">
                        저장
                    </button>
                </form>
            )}
        </li>
    )
}

export default TodoListItem
