import React, { useState, useEffect} from "react";
import "./style.css";
import TaskBoardItem from "../TaskBoardItem/TaskBoardItem";
import StatusRequest from "../../services/StatusRequest";
import { movingСard } from "../../utils/movingСard";
import ExitButton from "../ExitButton"
import {useTasks} from "../TaskContext"
import { store } from "../TasksStore";
import CardsRequests from "../../services/CardsRequests";
import { setTaskFromList } from "../actions";

function TaskBoard({onClickToLogout}) {
	const [isLoading, setIsLoading] = useState(true);
	const [statuses, setStatuses] = useState([]);
	const [movingTask, setMovingTask] = useState(()=>{});
	const tasks = useTasks();

	useEffect(() => {
		async function fetchData() {
			const responseStatus = await StatusRequest.loadStatuses()
			setStatuses(responseStatus);
			const responseTasks = await CardsRequests.loadAllCards();
			store.dispatch(setTaskFromList(responseTasks));
		}
		fetchData();
	}, []);

	useEffect(() => {
		if (statuses.length !== 0) {
			const changeTaskStatuses  = movingСard(statuses)
			setMovingTask(changeTaskStatuses)
			setIsLoading(false);
		}
	}, [statuses]);


	function getTaskByStatus(status) {
		const taskByStatus = tasks.tasksList.filter(task=>task.status === status)
		return taskByStatus
	}

	return (
		<>
			<div className="header">
				<ExitButton onClickToLogout={onClickToLogout} />
			</div>
			<div className="board">
					{
						!isLoading ? statuses.map((status, index) => (
							<TaskBoardItem key={index} 
								changeTaskStatus={movingTask}  
								taskByStatus = {getTaskByStatus(status.value)} {...status} />
							))
						: <div> loading...</div>
					}
			</div>
		</>
	);
	
}

export default TaskBoard;
