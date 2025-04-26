import { createContext, useContext, useReducer, useEffect } from "react";
import todosReducer from "../reducers/todosReducer";

export const TodosContext = createContext();
export const TodosDispatchContext = createContext();

export const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(
    todosReducer,
    JSON.parse(localStorage.getItem("todos")) || []
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosContext.Provider value={todos}>
      <TodosDispatchContext.Provider value={dispatch}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  return useContext(TodosContext);
};

export const useTodosDispatch = () => {
  return useContext(TodosDispatchContext);
};
