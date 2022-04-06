import React from 'react'
import "./style.css";
import UserStorage from '../../utils/UserStorage.js';

export function ExitButton({onClickToLogout}) {
	
	function toLogout() {
		UserStorage.removeUser();
		onClickToLogout(true);
	}

	return (
		<button type="button" className="button exit__button" onClick={toLogout}>
			Exit
		</button>
	);
}
export default ExitButton;