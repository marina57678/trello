const INIT_STATE = {
   statuses: [],
   isLoadedStatuses: false,
};
const cardsReducer = (state = INIT_STATE, action) => {
   switch (action.type) {
      case "SET_STATUSES":
         return {
            ...state,
            statuses: action.payload,
            isLoadedStatuses: true,
         };
      case "IS_LOADED_STATUSES":
         return {
            ...state,
            isLoadedStatuses: action.payload,
         };
      default:
         return state;
   }
};
export default cardsReducer;
