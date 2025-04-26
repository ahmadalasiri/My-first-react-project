import { v4 as uuidv4 } from "uuid";

export default function todosReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO": {
      return [
        ...state,
        {
          id: uuidv4(),
          title: action.payload,
          description: "",
          completed: false,
        },
      ];
    }
    case "UPDATE_TODO": {
      return state.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    }
    case "DELETE_TODO": {
      return state.filter((todo) => todo.id !== action.payload);
    }
    case "GET_TODOS": {
      return JSON.parse(localStorage.getItem("todos"));
    }
    default:
      throw new Error("Invalid action");
  }
}
