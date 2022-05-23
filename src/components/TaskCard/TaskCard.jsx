import React, { useState } from 'react'
import EditCard from '../EditCard';
import { useDispatch, useSelector } from "react-redux";
import { fetchMoveTaskLeft,fetchMoveTaskRight, fetchRemoveCard } from '../../redux/cardsActions'
import "./style.css";


export function TaskCard({task}) {
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState(false);
	const statusTypes = useSelector(({ statusesReducer }) => statusesReducer.statuses).map(status => status.value);
	
	function handleClickDel(){
		dispatch(fetchRemoveCard(task.id))
		setIsEditing(false)
	}
	function handleMoveTaskLeft(){
		dispatch(fetchMoveTaskLeft(task, statusTypes));
	}
	function handleMoveTaskRight(){
		dispatch(fetchMoveTaskRight(task, statusTypes));
	}


	return (
		<div className="card">
			<button type="button" className="button-del button card__button-del" 
				onClick = {handleClickDel}>x</button>
			{
				isEditing ? <EditCard isEditing={setIsEditing} {...task} /> :
					<>
						<span className="card__title">{task.title}</span>
						<p className="card__text">{task.description}</p>
						<span className="card__buttons">
							<button type="button" className="card__button button card__button-upg" 
								onClick={() => setIsEditing(true)}>
								edit
							</button>
						{
						(task.status !== 'to_do') ? 
							<button type="button" name="prev" className="card__button button card__button-prev" 
								onClick={handleMoveTaskLeft}>
								prev
							</button>
							: null
						}
						{
						(task.status !== 'done') ? 
							<button type="button" name="done" className="card__button button card__button-done" 
								onClick={handleMoveTaskRight}>
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