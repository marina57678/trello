import React, { useState } from 'react'
import TaskCard from "../TaskCard";
import "./style.css";
import CreateCard from "../CreateCard";
import { Button } from '../Button';
import { useCallback } from 'react';

function TaskBoardItem({ title, value, taskByStatus}) {
	const [isOpened, setIsOpened] = useState(false);

	const setIsOpenedTrue = useCallback(()=>{
		setIsOpened(true);
	},[])

	console.log("rerender")
	return (
		<div className={`task-board__item item-${value}`}>
			{
				isOpened ? <CreateCard onChange={setIsOpened}  status={value}/> : null
			}
			<div className={`status status-${value}`}>
				<span className="item__text">
					{title} 
					<span className="item__count">{taskByStatus.length}</span>
				</span>
				<Button 
					className="status__button status__button-add" 
					onClick = {setIsOpenedTrue}
					value="+"
				/>
			</div>
			{
				taskByStatus.map((task) => 
					<TaskCard key={task.id} task={task}/>)
			}
		</div>
	);
}

export default TaskBoardItem;