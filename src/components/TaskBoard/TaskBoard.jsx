import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskBoardItem from "../TaskBoardItem/TaskBoardItem";
import { movingСard } from "../../utils/movingСard";
import ExitButton from "../ExitButton"
import { fetchCards } from '../../redux/cardsActions';
import { fetchStatuses } from "../../redux/statusesActions";
import "./style.css";

function TaskBoard({onClickToLogout}) {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const [movingTask, setMovingTask] = useState(()=>{});
	const { tasksList } = useSelector(({ cardsReducer }) => cardsReducer);
	const {statuses, isLoadedStatuses } = useSelector(({ statusesReducer }) => statusesReducer);

	
	useEffect(() => {
		dispatch(fetchStatuses())
		dispatch(fetchCards())
	}, []);

	useEffect(() => {
		if (statuses.length !== 0) {
			const changeTaskStatuses  = movingСard(statuses)
			setMovingTask(changeTaskStatuses)
			setIsLoading(false);
		}
	}, [statuses]);

	function getTaskByStatus(status) {
		return tasksList.filter(task=>task.status === status)
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
