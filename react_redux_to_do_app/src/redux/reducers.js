import { ADD_TODO, TOGGLE_TODO } from "./actionTypes";

const intialState = {
  todos: [],
  filter: "ALL",
  searchTerm: "",
};
const todoReducer = (state = intialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: [
          ...state.todos,
          { text: action.payload.text, completed: false },
        ],
        filter: state.filter,
        searchTerm: state.searchTerm,
      };

    case TOGGLE_TODO:
      return {
        todos: state.todos.map((todo, index) => index === action.payload.id ? {...todo, completed: !todo.completed} : todo),
        filter: state.filter,
        searchTerm: state.searchTerm,
      };

    default:
      break;
  }
};

export default todoReducer;
