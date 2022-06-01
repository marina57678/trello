const INIT_STATE = {
   data: [],
   isLoaded: false,
};
const cardsReducer = (state = INIT_STATE, action) => {
   switch (action.type) {
      case "SET_TASKLIST":
         return {
            ...state,
            data: action.payload,
            isLoaded: true,
         };
      case "IS_LOADED_TASKLIST":
         return {
            ...state,
            isLoaded: action.payload,
         };
      case "REMOVE_TASK":
         return {
            ...state,
            data: state.data.filter((task) => task.id !== action.payload),
         };
      case "ADD_TASKLIST":
         return {
            ...state,
            data: [...state.data, action.payload],
         };
      case "EDIT_TASKLIST":
         return {
            ...state,
            data: state.data.map((task) =>
               task.id === action.payload.id ? action.payload : task
            ),
         };
      case "CHANGE_STATUS_TASKLIST":
         return {
            ...state,
            data: state.data.map((task) =>
               task.id === action.payload.id ? action.payload : task
            ),
         };
      default:
         return state;
   }
};
export default cardsReducer;
