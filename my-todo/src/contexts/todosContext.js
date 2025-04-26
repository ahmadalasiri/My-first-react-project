import { createContext, useContext, useReducer, useEffect } from "react";
import todosReducer from "../reducers/todosReducer";

export const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(
    todosReducer,
    JSON.parse(localStorage.getItem("todos")) || []
  );

  useEffect(() => {
    dispatch({ type: "GET_TODOS" });
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  return useContext(TodosContext);
};
