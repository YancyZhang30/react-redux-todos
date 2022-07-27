const initTodos = [
  {
    id: 1,
    text: "睡觉😴",
    completed: false,
  },
  {
    id: 2,
    text: "吃饭😋",
    completed: false,
  },
  {
    id: 3,
    text: "打豆豆😜",
    completed: true,
  },
];

let nextTodoID = 4;

const todos = (state = initTodos, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: nextTodoID++,
          text: action.text,
          completed: false,
        },
      ];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
};

export default todos;
