import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { fetchAddCard } from '../../redux/cardsActions';
import { Button } from '../Button';
import "./style.css";

export function CreateCard({ handleCloseForm, status }) {
	const dispatch = useDispatch()
	
	const [data,setData] = useState({
		title : '',
		description : ''
	})

	const updField = (e) =>{
		setData({
			...data,
			[e.target.name]: e.target.value
		})
	}

	function onSubmit(event){
		event.preventDefault();

		dispatch(fetchAddCard(data, status))
		handleCloseForm()
	}

	return (
		<form className="card card-create">
			<span className="card__title-large">Add note</span>

			<label className="card__label">title</label>
			<input 
				name="title" 
				className="card__input input-title" 
				type="text" 
				onChange = {updField}
			/>

			<label className="card__label">description</label>
			<textarea 
				name="description" 
				className="card__input input-description"
				type="text" 
				onChange = {updField}
			/>

			<span className="card__buttons">
				<Button 
					className="card__button button card__button-cancel" 
					onClick = {handleCloseForm}
					value="cancel"
				/>
					<Button
					type="submit"
					className="card__button button card__button-done" 
					onClick = {onSubmit}
					value="create"
				/>
			</span>
		</form>
		);
}

export default CreateCard;