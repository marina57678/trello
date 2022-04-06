import React, { useState } from 'react'
import EditCard from '../EditCard';
import CardsRequests from "../../services/CardsRequests"
import { useDispatch } from '../TaskContext'
import { removeTaskFromList, changeStatus } from '../actions'
import "./style.css";


export function TaskCard({task, changeTaskStatus}) {
	const [isEditing, setIsEditing] = useState(false);
	const dispatch = useDispatch();

	function handleClickDel(){
		CardsRequests.deleteCard(task.id)
			.then((el)=>{
				dispatch(removeTaskFromList(el.id))
			});
		setIsEditing(false)
	}

	return (
		<div className="card">
			<button type="button" className="button-del button card__button-del" 
				onClick = {handleClickDel}>x</button>
			{
				isEditing ? <EditCard isEditing={setIsEditing} {...task} /> 
					:
					<>
						<span className="card__title">{task.title}</span>
						<p className="card__text">{task.description}</p>
						<span className="card__buttons">
							<button type="button" className="card__button button card__button-upg" 
								onClick={() => setIsEditing(true)}>
								edit
							</button>
						{
						(task.status !== 'to_do')	? 
							<button type="button" name="prev" className="card__button button card__button-prev" 
								onClick={()=>
									changeTaskStatus.prev(task.id,task.status)
										.then((res)=>dispatch(changeStatus(res)))	
								}
							>
								prev
							</button>
							: null
						}
						{
						(task.status !== 'done')	? 
							<button type="button" name="done" className="card__button button card__button-done" 
								onClick={()=>
									changeTaskStatus.next(task.id,task.status)
										.then((res)=>dispatch(changeStatus(res)))
								}
							>
								done
							</button>
							: null
						}
						</span>
					</>
			}
		</div>
		);
}

export default TaskCard;