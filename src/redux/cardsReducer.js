const INIT_STATE = { tasksList: [] };
const cardsReducer = (state = INIT_STATE, action) => {
   switch (action.type) {
      case "INPUT_NUMBER":
         return {
            ...state,
            number: action.payload,
         };
      case "REMOVE_TASK":
         return {
            ...state,
            tasksList: state.tasksList.filter(
               (task) => task.id !== action.payload
            ),
         };
      case "SET_TASKLIST":
         return {
            ...state,
            tasksList: action.payload,
         };
      case "ADD_TASKLIST":
         return {
            ...state,
            tasksList: [...state.tasksList, action.payload],
         };
      case "EDIT_TASKLIST":
         return {
            ...state,
            tasksList: state.tasksList.map((task) =>
               task.id === action.payload.id ? action.payload : task
            ),
         };
      case "CHANGE_STATUS_TASKLIST":
         return {
            ...state,
            tasksList: state.tasksList.map((task) =>
               task.id === action.payload.id ? action.payload : task
            ),
         };
      default:
         return state;
   }
};
export default cardsReducer;
