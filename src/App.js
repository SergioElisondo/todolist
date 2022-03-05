import React, { useState, useRef, useEffect } from "react"; // useState allows us to render and keep our todos
import TodoList from './TodoList'
// import uuidv4 from './uuid/v4'

const LOCAL_STORAGE_KEY = 'todosApp.todos'

// rfc react function component with plugin 
// use () on return for nicer formatting - grabs all code 
// <jsx />   <---  react's version of HTML which allows you to embed compenents into other components

// returns can only return 1 thing... so use fragments! you will WRAP what you want returned
// <> </> fragment aka empty element allows us to return more than one 

// below is all the HTML needed for app component - make "skeleton" here
function App() {
 const [todos, setTodos] = useState([]) // todos is ALL todos in our todo state, useState is funtion used to update todos
 const todoNameRef = useRef()
  // keep array empty since it starts like that
  // tested with this: {id: 1, name: "Todo 1", complete: false}

  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
   if ( storedTodos) setTodos(storedTodos)
  }, [])

useEffect(() => {
localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
}, [todos])
function toggleTodo(id){
  const newTodos = [...todos]
  const todo = newTodos.find(todo => todo.id === id)
  todo.complete = !todo.complete
  setTodos(newTodos)
}


function handleAddTodo(e) {
const name = todoNameRef.current.value
if (name === '') return
setTodos(prevTodos => {
  return [...prevTodos, { id: 1 + Math.random(), name: name, completed: false}]
})
todoNameRef.current.value = null
}

function handleClearTodos (){
  const newTodos = todos.filter(todo => !todo.complete)
  setTodos(newTodos)
}

  return (
    <>
    <TodoList todos={todos} toggleTodo={toggleTodo} />
    <input ref={todoNameRef} type="text" />
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear Completed Todos</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
