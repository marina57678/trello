import React, { useState, memo, useCallback} from 'react'
import { useDispatch, useSelector } from "react-redux";

import { fetchMoveTaskLeft, fetchMoveTaskRight, fetchRemoveCard } from '../../redux/cardsActions'
import { Button } from '../Button';
import EditCard from '../EditCard';

import "./style.css";


export function TaskCard({task}) {
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState(false);

	const statusTypes = useSelector(({ statuses }) => statuses.data).map(status => status.value);
	
	const handleClickDel = useCallback(()=>{
		dispatch(fetchRemoveCard(task.id))
		setIsEditing(false)
	},[])

	const handleMoveTaskLeft = useCallback(()=>{
		dispatch(fetchMoveTaskLeft(task, statusTypes));
	},[])

	const handleMoveTaskRight = useCallback(()=>{
		dispatch(fetchMoveTaskRight(task, statusTypes));
	},[])

	const handleCloseEditForm = useCallback(()=>{
		setIsEditing(false);
	},[])

	const handleOpenEditForm = useCallback(()=>{
		setIsEditing(true);
	},[])


	return (
		<div className="card">
			<Button 
				className="button-del button card__button-del" 
				onClick = {handleClickDel}
				value="x"
			/>
			{
				isEditing ? <EditCard handleCloseEditForm={handleCloseEditForm} {...task} /> :
					<>
						<span className="card__title">{task.title}</span>
						<p className="card__text">{task.description}</p>
						<span className="card__buttons">
							<Button 
								className="card__button button card__button-upg" 
								onClick = {handleOpenEditForm}
								value="edit"
							/>
							{
							(task.status !== 'to_do') ? 
								<Button 
									className="card__button button card__button-prev" 
									onClick = {handleMoveTaskLeft}
									value="prev"
								/>
								: null
							}
							{
							(task.status !== 'done') ? 
								<Button 
									className="card__button button card__button-done" 
									onClick = {handleMoveTaskRight}
									value="done"
								/>
								: null
							}
						</span>
					</>
			}
		</div>
		);
}

export default memo(TaskCard);