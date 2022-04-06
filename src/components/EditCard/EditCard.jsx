import React, { useState } from 'react'
import CardsRequests from "../../services/CardsRequests"
import { useDispatch } from "../TaskContext";
import { editTask } from "../actions";
import "./style.css";

export function EditCard({isEditing,id,title,description}) {
	const [submit,setSubmit] = useState(false)
	const [editedData,setEditedData] = useState({
		title : title,
		description : description
	})

	const dispatch = useDispatch();
	function updField(e){
		setEditedData({
			...editedData,
			[e.target.name]: e.target.value
		})
	}

	function onSubmit(){
		setSubmit(true)
		CardsRequests.updateCard(id, editedData.title, editedData.description)
			.then((modifiedCard)=>{
				dispatch(editTask(modifiedCard));
				isEditing(false)
			})
	}

	return (
		<form> 
			<input className="card__title input title__input" name="title" type="text" 
				aria-label="edit-title-input" defaultValue={title} onChange={updField} />
			<textarea className="card__text input text__input" name="description" type="text"
				aria-label="edit-text-input" defaultValue={description} onChange={updField}/> 
			<span className="card__buttons">
				<button type="button" className="card__button button card__button-cancel"
					onClick={() => isEditing(false)}>cancel</button>
				<button type="button" className="card__button button card__button-edit" 
					onClick={onSubmit} disabled={submit} >edit</button>
			</span>
		</form>
	)
}

export default EditCard;