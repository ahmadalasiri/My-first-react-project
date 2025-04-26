import { useState } from "react";
import "./App.css";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import FilterButtons from "./FilterButtons";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("الكل");
  const [newTodoText, setNewTodoText] = useState("");

  const addTodo = () => {
    if (newTodoText.trim() !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodoText, completed: false },
      ]);
      setNewTodoText("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "منجز") return todo.completed;
    if (filter === "غير منجز") return !todo.completed;
    return true; // 'الكل'
  });

  return (
    <div className="App">
      <div className="todo-container">
        <h1 className="header">مهامي</h1>

        <FilterButtons filter={filter} setFilter={setFilter} />

        <TodoList
          todos={filteredTodos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />

        <TodoForm
          newTodoText={newTodoText}
          setNewTodoText={setNewTodoText}
          addTodo={addTodo}
        />
      </div>
    </div>
  );
}

export default App;
