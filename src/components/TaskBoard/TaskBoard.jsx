import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskBoardItem from "../TaskBoardItem";
import ExitButton from "../ExitButton"
import { fetchCards } from '../../redux/cardsActions';
import { fetchStatuses } from "../../redux/statusesActions";
import "./style.css";
import { useCallback } from "react";

function TaskBoard({onClickToLogout}) {
	const dispatch = useDispatch();
	const { tasksList } = useSelector(({ cardsReducer }) => cardsReducer);
	const {statuses, isLoadedStatuses } = useSelector(({ statusesReducer }) => statusesReducer);

	useEffect(() => {
		dispatch(fetchStatuses())
		dispatch(fetchCards())
	}, []);

	// function getTaskByStatus(status) {
	// 	return tasksList.filter(task=>task.status === status)
	// }
	const getTaskByStatus = useCallback((status)=> tasksList.filter(task=>task.status === status)
	, [tasksList])
	return (
		<>
			<div className="header">
				<ExitButton onClickToLogout={onClickToLogout} />
			</div>
			<div className="board">
				{
					isLoadedStatuses ? statuses.map((status, index) => (
						<TaskBoardItem key={index} 
							taskByStatus = {getTaskByStatus(status.value)} {...status} />
						))
					: <div> loading...</div>
				}
			</div>
		</>
	);
	
}

export default TaskBoard;
