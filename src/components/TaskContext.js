import React, { useContext, useState, useEffect, createContext } from "react";
import { store } from "./TasksStore";

const TasksContext = createContext([]);
// TasksContext.displayName = "TasksListContext";

export function useTasks() {
   return useContext(TasksContext);
}

export function TasksProvider({ children }) {
   const [tasksList, setTasksList] = useState(store.getState());

   useEffect(() => {
      store.subscribe(() => {
         setTasksList({ ...store.getState() });
      });
   }, []);

   return (
      <TasksContext.Provider value={tasksList}>
         {children}
      </TasksContext.Provider>
   );
}

export function useDispatch() {
   return store.dispatch;
}
