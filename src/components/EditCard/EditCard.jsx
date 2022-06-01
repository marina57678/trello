import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { fetchUpdateCard } from '../../redux/cardsActions';
import { Button } from '../Button';

import "./style.css";

export function EditCard({handleCloseEditForm,id,title,description}) {
	const dispatch = useDispatch();

	const [editedData,setEditedData] = useState({
		title : title,
		description : description
	})

	function updField(e){
		setEditedData({
			...editedData,
			[e.target.name]: e.target.value
		})
	}

	function onSubmit(){
		dispatch(fetchUpdateCard(id, editedData.title, editedData.description));
		handleCloseEditForm();
	}

	return (
		<form> 
			<input 
				className="card__title input title__input"
				name="title"
				type="text" 
				aria-label="edit-title-input" 
				defaultValue={title} 
				onChange={updField} 
			/>
			<textarea 
				className="card__text input text__input" 
				name="description" 
				type="text"
				aria-label="edit-text-input" 
				defaultValue={description} 
				onChange={updField}
			/> 
			<span className="card__buttons">
				<Button 
					className="card__button button card__button-cancel" 
					onClick = {handleCloseEditForm}
					value="cancel"
				/>
				<Button 
					className="card__button button card__button-edit" 
					onClick={onSubmit}
					value="edit"
				/>
			</span>
		</form>
	)
}

export default EditCard;