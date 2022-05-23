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

export const fetchMoveTaskLeft =
   ({ id, status }, statusTypes) =>
   async (dispatch) => {
      const idStatus = statusTypes.findIndex(
         (statusType) => statusType === status
      );
      const newStatus =
         idStatus !== 0 ? statusTypes[idStatus - 1] : statusTypes[0];
      const result = await CardsRequests.updateStatusCard(id, newStatus);
      dispatch(changeStatus(result));
   };

export const fetchMoveTaskRight =
   ({ id, status }, statusTypes) =>
   async (dispatch) => {
      const idStatus = statusTypes.findIndex(
         (statusType) => statusType === status
      );
      const newStatus =
         idStatus !== statusTypes.length - 1
            ? statusTypes[idStatus + 1]
            : statusTypes[statusTypes.length - 1];
      const result = await CardsRequests.updateStatusCard(id, newStatus);
      dispatch(changeStatus(result));
   };
