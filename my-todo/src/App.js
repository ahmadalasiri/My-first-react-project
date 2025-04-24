import TodoList from "./components/TodoList";

export default function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <TodoList />
    </div>
  );
}
