import React, { useState } from 'react'
import TaskCard from "../TaskCard";
import "./style.css";
import CreateCard from "../CreateCard";


function TaskBoardItem({ title, value, changeTaskStatus, taskByStatus}) {
	const [isOpened, setIsOpened] = useState(false);

	return (
		<div className={`task-board__item item-${value}`}>
			{
				isOpened ? <CreateCard onChange={setIsOpened}  status={value}/> : null
			}
			<div className={`status status-${value}`}>
				<span className="item__text">
					{title} 
					<span className="item__count"> {taskByStatus.length}</span>
				</span>
				<button type="button" className="status__button status__button-add" onClick = {() => setIsOpened(true)}>+</button>
			</div>
			{
				taskByStatus.map((task) => 
						<TaskCard key={task.id} changeTaskStatus={changeTaskStatus} task={task}/>
				)
			}
		</div>
	);
}

export default TaskBoardItem;