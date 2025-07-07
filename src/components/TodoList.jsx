import { useTodos } from '../context/TodoContext'
import TodoListItem from './TodoListItem'

function TodoList() {
    const { getFilteredTodos, toggleTodo, removeTodo, toggleModify, modifyTodo, selectFilter, todos } = useTodos()

    return (
        <>
            <span>총 할일: {todos.length} </span>
            <span>완료된 할일: {todos.filter((todo) => todo.completed).length}</span>
            <div>
                <select name="filter" onChange={selectFilter}>
                    <option value="all">전체</option>
                    <option value="active">미완료</option>
                    <option value="completed">완료</option>
                </select>
            </div>
            <ul>
                {getFilteredTodos().map((todo) => (
                    <TodoListItem
                        key={todo.id}
                        todo={todo}
                        onToggle={toggleTodo}
                        onRemove={removeTodo}
                        onToggleModify={toggleModify}
                        onModifySubmit={modifyTodo}
                    />
                ))}
            </ul>
        </>
    )
}

export default TodoList
