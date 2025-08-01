# [AIBE3/5팀/최원제] Todo List App

![Todo App 화면](./img/image1.png)

## 0. 요약

제시된 Todo List App의 기본 기능을 구현 한 뒤 추가적으로 아래의 기능 및 요소들을 추가하였다.

> 1. 중복 및 빈 문자열 방지
> 2. todo의 상태 (completed 참거짓 여부) 에 따른 todo 출력 필터링
> 3. 각 todo 마다의 text 수정 기능
> 4. windtailcss를 사용한 UI 정리

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

이 프로젝트는 LocalStorage를 활용하여 `todos`와 `lastId` 두 가지 데이터를 관리한다.

-   `todos`는 위와 같이 4개의 key(id, text, completed, modify)로 구성되어 있다. 여기서 `modify`는 수정창 팝업 여부를 결정하는 값이다.
-   `lastId`는 새로운 todo의 id 생성을 위해 사용되며, todo가 추가될 때마다 1씩 증가하여 저장된다.

## 2. 기본 구현 내용 (핵심 코드)

-   **할 일 추가**

```jsx
const addTodo = (inputText) => {
    // 중복 및 검증 과정 생략
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
```

입력값을 검증한 뒤 새로운 `todo` 객체를 만들어 리스트 맨 앞에 추가하고, 상태와 localStorage에 모두 저장한다.

-   **할 일 삭제**

```jsx
const removeTodo = (id) => {
    const nowTodos = todos.filter((todo) => id !== todo.id)
    setTodos(nowTodos)
    setItem('todos', nowTodos)
}
```

선택한 `todo`의 `id`를 기준으로 리스트에서 제거하고, 변경된 상태를 localStorage에도 반영한다.

-   **완료 체크**

```jsx
const toggleTodo = (id) => {
    const nowTodos = todos.map((todo) => (id === todo.id ? { ...todo, completed: !todo.completed } : todo))
    setTodos(nowTodos)
    setItem('todos', nowTodos)
}
```

체크박스를 클릭하면 해당 `todo`의 `completed` 값을 반전시키고, 상태와 localStorage를 동기화한다.

-   **localStorage에서 초기 로드**

```jsx
const lastId = parseInt(localStorage.getItem('lastId') || '0')
const [todos, setTodos] = useState(() => getItem('todos', []))
```

앱이 마운트될 때 localStorage에 저장된 `todos` 배열과 `lastId`을 불러와 초기 상태로 사용한다.

## 3. 추가 구현 내용 (핵심 코드)

-   **중복 및 빈 문자열 방지**

```jsx
const newText = inputText.trim()
if (!newText) {
    alert('할 일을 입력해주세요.')
    return
}
if (todos.some((todo) => todo.text === newText)) {
    alert('이미 등록된 todo 입니다.')
    return
}
```

`todo` 추가 및 text 수정 시 입력값이 비어있거나 이미 존재하는 텍스트라면 경고를 띄우고 return으로 function에서 나간다.

-   **완료/미완료 todo 필터링 출력 기능**

```jsx
// 현재 페이지의 todo 필터링 상태를 저장하는 변수 filterType
const [filterType, setFilterType] = useState('all')

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

`filterType` 문자열 값에 따라 전체, 미완료, 완료된 todo만 리스트에 보여준다.

-   **todo text 수정 모드 진입/취소**

```jsx
const toggleModify = (id) => {
    const nowTodos = todos.map(todo =>
        todo.id === id ? { ...todo, modify: !todo.modify } : { ...todo, modify: false }
    )
    setTodos(nowTodos)
    setItem('todos', nowTodos)
}
```

수정 버튼을 누르면 해당 `todo`만 `modify`가 true가 되어 수정 input이 활성화된다.

나머지 `todo`들은 `modify`가 false로 바뀌며 수정 input이 닫는다.

-   **todo text 수정 기능**

```jsx
    const modifyTodo = (id, newText) => {
        newText = newText.trim()
        // 중복 및 빈 문자열 판독 기능 생략
        const nowTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, text: newText, modify: false } : { ...todo, modify: false },
        )
        setTodos(nowTodos)
        setItem('todos', nowTodos)
    }
```

수정 input에서 저장 버튼을 누를 시, 해당 `todo`의 `text`를 변경하고 `modify`값을 false로 바꾸어 수정 input을 닫으며, 변경사항을 localStorage에도 반영한다.

## 4. 소감 및 고찰

지난주 WTL에 팀 스터디 주제로 Todo앱의 확장과 컴포넌트 분리를 진행하여 보다 수월하게 진행 할 수 있었다.
여기에 부족했던 UI를 WindTailCSS와 Github Copilot을 통해 쉽고 효율적으로 정리할 수 있었다.
