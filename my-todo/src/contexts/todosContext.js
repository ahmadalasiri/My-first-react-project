import { createContext, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
export const TodosContext = createContext();

const initialTodos = [
  {
    id: uuidv4(),
    title: "Read a book",
    description: "Read a book about React",
    completed: false,
  },
  {
    id: uuidv4(),
    title: "Buy a new phone",
    description: "Buy a new phone with 128GB of storage",
    completed: true,
  },
  {
    id: uuidv4(),
    title: "Go to the gym",
    description: "Go to the gym and lift weights",
    completed: false,
  },
];

export const TodosProvider = ({ children }) => {
  // const initialTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, setTodos] = useState(initialTodos);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  return useContext(TodosContext);
};
