import StatusRequest from "../services/StatusRequest";

export const SET_STATUSES = "SET_STATUSES";
export const IS_LOADED_STATUSES = "SET_LOADED_STATUSES";

export const setStatuses = (statuses) => ({
   type: SET_STATUSES,
   payload: statuses,
});

export const isLoadedStatuses = (bool) => ({
   type: IS_LOADED_STATUSES,
   payload: bool,
});

export const fetchStatuses = () => async (dispatch) => {
   dispatch(isLoadedStatuses(false));
   const responseStatuses = await StatusRequest.loadStatuses();
   dispatch(setStatuses(responseStatuses));
};
