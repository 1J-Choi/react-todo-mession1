import { useTodos } from '../context/TodoContext'
import TodoListItem from './TodoListItem'

function TodoList() {
    const { getFilteredTodos, toggleTodo, removeTodo, toggleModify, modifyTodo, selectFilter, todos } = useTodos()

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 w-full gap-2">
                <span className="text-gray-700">
                    총 할일: <span className="font-bold">{todos.length}</span>
                </span>
                <span className="text-gray-700">
                    완료된 할일:{' '}
                    <span className="font-bold text-blue-600">{todos.filter((todo) => todo.completed).length}</span>
                </span>
            </div>
            <div className="mb-4 w-full">
                <select
                    name="filter"
                    onChange={selectFilter}
                    className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-auto"
                >
                    <option value="all">전체</option>
                    <option value="active">미완료</option>
                    <option value="completed">완료</option>
                </select>
            </div>
            <ul className="space-y-2 w-full">
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
