const INIT_STATE = {
   data: [],
   isLoaded: false,
};
const statusesReducer = (state = INIT_STATE, action) => {
   switch (action.type) {
      case "SET_STATUSES":
         return {
            ...state,
            data: action.payload,
            isLoaded: true,
         };
      case "IS_LOADED_STATUSES":
         return {
            ...state,
            isLoaded: action.payload,
         };
      default:
         return state;
   }
};
export default statusesReducer;
