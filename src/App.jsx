import { useState } from "react";
import store from "./store";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [storeData, setStoreData] = useState(store.getState());
  store.subscribe(storeChange);

  function storeChange() {
    setStoreData(store.getState());
  }
  const addTodo = () => {
    if(todo){
      store.dispatch({
        type: "ADD_TODO",
        text: todo,
        completed: false,
      });
    } else {
      alert('还没输入todo呢！');
    }

  };

  const toggleTodo = (e, id) => {
    store.dispatch({
      type: "TOGGLE_TODO",
      id: id,
    });
  };

  const handleFilter = (e, f) => {
    store.dispatch({
      type: "SET_VISIBILITY_FILTER",
      filter: f,
    });
  };

  const todosFilter = () => {
    switch (storeData.visibilityFilter) {
      case "SHOW_ALL":
        return storeData.todos;
        break;
      case "SHOW_COMPLETED":
        return storeData.todos.filter((i) => i.completed);
        break;
      case "SHOW_UNCOMPLETED":
        return storeData.todos.filter((i) => !i.completed);
        break;
      default:
        return storeData.todos;
        break;
    }
  };
  return (
    <div className="App">
      <input
        type="text"
        onChange={(e) => {
          setTodo(e.target.value);
        }}
      />
      <button onClick={addTodo} className={"addBtn"}>
        添加
      </button>
      <ul>
        {todosFilter().map((i) => (
          <li
            key={i.id}
            style={{ textDecoration: i.completed ? "line-through" : "none" }}
          >
            {i.text}
            <button className={"delBtn"} onClick={(e) => toggleTodo(e, i.id)}>
              {i.completed ? "未完成" : "已完成"}
            </button>
          </li>
        ))}
          </ul>
          <button onClick={(e)=>handleFilter(e, "SHOW_ALL")}>显示全部</button>
          <button onClick={(e)=>handleFilter(e, "SHOW_UNCOMPLETED")} style={{margin: "0 10px"}}>仅显示未完成</button>
          <button onClick={(e)=>handleFilter(e, "SHOW_COMPLETED")} style={{margin: "0 10px"}}>仅显示已完成</button>
    </div>
  );
}

export default App;
