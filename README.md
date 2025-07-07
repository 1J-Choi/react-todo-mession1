# 리액트 투두 앱 만들기 미션 레포

## 1. 데이터 구조

```jsx
// todos 예시
const form = {
    id: todoId,
    text: newText,
    completed: false,
    modify: false
}
// lastId 저장
localStorage.setItem('lastId', todoId)
```

이 프로젝트는 LocalStorage를 활용하여 `todos`와 `lastId` 두 가지 데이터를 관리합니다.

-   `todos`는 위와 같이 4개의 key(id, text, completed, modify)로 구성되어 있습니다. 여기서 `modify`는 수정창 팝업 여부를 결정하는 값입니다.
-   `lastId`는 새로운 todo의 id 생성을 위해 사용되며, todo가 추가될 때마다 1씩 증가하여 저장됩니다.

## 2. 기본 구현 내용 (핵심 코드)

-   **할 일 추가**

```jsx
const addTodo = (inputText) => {
    const newText = inputText.trim()
    if (!newText || todos.some(todo => todo.text === newText)) return
    const todoId = lastId + 1
    const form = { id: todoId, text: newText, completed: false, modify: false }
    localStorage.setItem('lastId', todoId)
    const nowTodos = [form, ...todos]
    setTodos(nowTodos)
    setItem('todos', nowTodos)
}
```

입력값을 받아 새로운 todo를 생성하고 리스트에 추가합니다.

-   **할 일 삭제**

```jsx
const removeTodo = (id) => {
    const nowTodos = todos.filter(todo => id !== todo.id)
    setTodos(nowTodos)
    setItem('todos', nowTodos)
}
```

선택한 todo를 리스트에서 제거합니다.

-   **완료 체크**

```jsx
const toggleTodo = (id) => {
    const nowTodos = todos.map(todo => id === todo.id ? { ...todo, completed: !todo.completed } : todo)
    setTodos(nowTodos)
    setItem('todos', nowTodos)
}
```

체크박스를 클릭하면 해당 todo의 완료 상태를 토글합니다.

-   **localStorage에서 초기 로드**

```jsx
const [todos, setTodos] = useState(() => getItem('todos', []))
```

앱이 시작될 때 localStorage에서 todos를 불러와 상태를 초기화합니다.

## 3. 추가 구현 내용 (핵심 코드)

-   **중복 및 빈 문자열 방지**

```jsx
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
```

동일한 텍스트의 todo나 빈 문자열은 추가/수정이 불가하도록 검증합니다.

-   **완료/미완료 todo 필터링 출력 기능**

```jsx
const getFilteredTodos = () => {
    switch (filterType) {
        case 'active':
            return todos.filter(todo => !todo.completed)
        case 'completed':
            return todos.filter(todo => todo.completed)
        default:
            return todos
    }
}
```

전체/미완료/완료 항목만 볼 수 있도록 필터링합니다.

-   **todo text 수정 모드 진입/취소**

```jsx
const toggleModify = (id) => {
    const nowTodos = todos.map(todo =>
        todo.id === id ? { ...todo, modify: !todo.modify, editText: todo.text } : { ...todo, modify: false }
    )
    setTodos(nowTodos)
    setItem('todos', nowTodos)
}

const cancelModifyAll = () => {
    const nowTodos = todos.map(todo => ({ ...todo, modify: false }))
    setTodos(nowTodos)
    setItem('todos', nowTodos)
}
```

수정 버튼을 누르면 해당 todo만 수정 input이 활성화되고, 취소 시 모두 해제됩니다.

-   **todo text 수정 기능**

```jsx
const modifyTodo = (id, newText) => {
    newText = newText.trim()
    if (!newText || todos.some(todo => todo.text === newText)) return
    const nowTodos = todos.map(todo =>
        todo.id === id ? { ...todo, text: newText, modify: false, editText: '' } : { ...todo, modify: false }
    )
    setTodos(nowTodos)
    setItem('todos', nowTodos)
}
```

수정 input에서 값을 저장하면 해당 todo의 텍스트가 변경됩니다.

## 4. 소감 및 고찰
