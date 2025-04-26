import React from "react";

function TodoForm({ newTodoText, setNewTodoText, addTodo }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo();
  };

  return (
    <div className="todo-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="عنوان المهمة"
          className="todo-input"
        />
        <button type="submit" className="add-button">
          إضافة
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
