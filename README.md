# 리액트 투두 앱 만들기 미션 레포

## 0. 데이터 구조

```jsx
// todos
const form = {
    id: todoId,
    text: newText,
    checked: false,
    modify: false
    }
// lastIndex
localStorage.setItem('lastId', todoId)
```

해당 코드는 LocalStorage를 활용하여 `todos`와 `lastId`의 2가지 데이터를 저장합니다.

`todos`는 위 그림과 같이 4개의 key로 구현되어있으며
