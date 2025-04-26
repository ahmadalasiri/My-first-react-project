import React, { useState } from "react";

function TodoItem({ todo, toggleTodo, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    editTodo(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <div className="todo-item" style={{ backgroundColor: "#2c3a83" }}>
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="edit-input"
          />
          <div className="buttons">
            <button className="edit-button" onClick={handleEdit}>
              <span role="img" aria-label="Save">
                ✅
              </span>
            </button>
          </div>
        </div>
      ) : (
        <>
          <span
            className={`todo-text ${todo.completed ? "completed" : ""}`}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.text}
          </span>
          <div className="buttons">
            <button
              className="delete-button"
              onClick={() => deleteTodo(todo.id)}
            >
              <span role="img" aria-label="Delete">
                🗑️
              </span>
            </button>
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              <span role="img" aria-label="Edit">
                ✏️
              </span>
            </button>
            <button
              className="complete-button"
              onClick={() => toggleTodo(todo.id)}
            >
              <span role="img" aria-label="Complete">
                ✅
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TodoItem;
