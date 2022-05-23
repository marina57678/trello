import CardsRequests from "../services/CardsRequests";

export function inputNumber(number) {
   return {
      type: "INPUT_NUMBER",
      payload: number,
   };
}

export function removeTaskFromList(id) {
   return {
      type: "REMOVE_TASK",
      payload: id,
   };
}

export function setTaskFromList(tasksList) {
   return {
      type: "SET_TASKLIST",
      payload: tasksList,
   };
}

export function addTaskToList(newTasksList) {
   return {
      type: "ADD_TASKLIST",
      payload: newTasksList,
   };
}

export function editTask(modifiedCard) {
   return {
      type: "EDIT_TASKLIST",
      payload: modifiedCard,
   };
}

export function changeStatus(modifiedCard) {
   return {
      type: "CHANGE_STATUS_TASKLIST",
      payload: modifiedCard,
   };
}

export const fetchCards = () => async (dispatch) => {
   const responseTasks = await CardsRequests.loadAllCards();
   dispatch(setTaskFromList(responseTasks));
};

export const fetchRemoveCard = (id) => async (dispatch) => {
   await CardsRequests.deleteCard(id);
   dispatch(removeTaskFromList(id));
};

export const fetchAddCard =
   (title, description, status) => async (dispatch) => {
      const newCard = await CardsRequests.addCard(title, description, status);
      dispatch(addTaskToList(newCard));
   };

export const fetchUpdateCard = (id, title, description) => async (dispatch) => {
   const modifiedCard = await CardsRequests.updateCard(id, title, description);
   dispatch(editTask(modifiedCard));
};
