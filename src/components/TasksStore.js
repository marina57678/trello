const INIT_STATE = { tasksList: [] };
const reducer = (state = INIT_STATE, action) => {
   switch (action.type) {
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
            tasksList: action.payload.tasksList,
         };
      case "ADD_TASKLIST":
         return {
            ...state,
            tasksList: [...state.tasksList, action.payload.newTasksList],
         };
      case "EDIT_TASKLIST":
         return {
            ...state,
            tasksList: state.tasksList.map((task) =>
               task.id === action.payload.modifiedCard.id
                  ? action.payload.modifiedCard
                  : task
            ),
         };
      case "CHANGE_STATUS_TASKLIST":
         return {
            ...state,
            tasksList: state.tasksList.map((task) =>
               task.id === action.payload.modifiedCard.id
                  ? action.payload.modifiedCard
                  : task
            ),
         };
      default:
         return state;
   }
};

const createStore = (reducer) => {
   let state = reducer(undefined, {});
   let c;
   return {
      dispatch: (action) => {
         state = reducer(state, action);
         c();
      },
      getState: () => state,
      subscribe: (callback) => {
         c = callback;
      },
   };
};

export const store = createStore(reducer);
console.log(store.getState());

// store.dispatch(removeTaskFromList)
