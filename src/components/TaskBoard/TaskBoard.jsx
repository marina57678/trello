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
	const cards = useSelector(({ cards }) => cards);
	const statuses  = useSelector(({ statuses }) => statuses);

	useEffect(() => {
		dispatch(fetchStatuses())
		dispatch(fetchCards())
	}, []);


	const getTaskByStatus = useCallback((status)=> cards.data.filter(task=>task.status === status)
	, [cards.data])
	return (
		<>
			<div className="header">
				<ExitButton onClickToLogout={onClickToLogout} />
			</div>
			<div className="board">
				{
					statuses.isLoaded ? statuses.data.map((status, index) => (
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
