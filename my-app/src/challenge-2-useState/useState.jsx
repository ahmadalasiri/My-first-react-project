import { useState } from "react";

function MyButton() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <p>Count: {count}</p>
    </div>
  );
}

function MyInput() {
  return <label>Your name</label>;
}
