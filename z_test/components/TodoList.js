import React, { useState } from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, toggleTodo, deleteTodo, editTodo }) {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;
