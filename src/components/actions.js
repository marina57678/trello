export function removeTaskFromList(id) {
   return {
      type: "REMOVE_TASK",
      payload: id,
   };
}

export function setTaskFromList(tasksList) {
   return {
      type: "SET_TASKLIST",
      payload: {
         tasksList: tasksList,
      },
   };
}

export function addTaskToList(newTasksList) {
   return {
      type: "ADD_TASKLIST",
      payload: {
         newTasksList: newTasksList,
      },
   };
}

export function editTask(modifiedCard) {
   return {
      type: "EDIT_TASKLIST",
      payload: {
         modifiedCard: modifiedCard,
      },
   };
}

export function changeStatus(modifiedCard) {
   return {
      type: "CHANGE_STATUS_TASKLIST",
      payload: {
         modifiedCard: modifiedCard,
      },
   };
}
