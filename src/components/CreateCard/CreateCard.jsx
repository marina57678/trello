import React, { useState } from 'react'
import "./style.css";
import CardsRequests from "../../services/CardsRequests"
import { useDispatch } from "../TaskContext";
import { addTaskToList } from "../actions";


export function CreateCard({ onChange, status }) {
	const [submit,setSubmit] = useState(false)
	const [data,setData] = useState({
		title : '',
		description : ''
	})

	const dispatch = useDispatch()

	function handleOpenForm(bool){
		setData({
			...data,
			title : '',
			description : ''
		})
		onChange(bool)
	}

	function updField(e){
		setData({
			...data,
			[e.target.name]: e.target.value
		})
	}

	function onSubmit(event){
		event.preventDefault();

		setSubmit(true)
		CardsRequests.addCard(data.title,data.description, status)
		.then((newCard)=>{
			dispatch(addTaskToList(newCard));
			setSubmit(false)
			handleOpenForm(false)
		})

		// setSubmit(false)
		// handleOpenForm(false)
	}

	return (
		<form className="card card-create" onSubmit={onSubmit}>
			<span className="card__title-large">Add note</span>

			<label className="card__label">title</label>
			<input name="title" className="card__input input-title" type="text" 
				onChange = {updField}/>

			<label className="card__label">description</label>
			<textarea name="description" className="card__input input-description" type="text" 
				onChange = {updField} />

			<span className="card__buttons">
				<button type="button" className="card__button button card__button-cancel"
					onClick = {()=>handleOpenForm(false)}>
					cancel
				</button>
				<button type="submit" className="card__button button card__button-done" 
					disabled={submit ? true:false}>
					create
				</button>
			</span>
		</form>
		);
}

export default CreateCard;