import axios from 'axios';
import { dynamicPopup } from './popup';

export default function(form) {
	form.addEventListener('submit', function(e) {
		e.preventDefault();
		const data = {
			name: this.querySelector('input[name="name"]').value,
			email: this.querySelector('input[name="email"]').value,
			message: this.querySelector('textarea[name="message"]').value
		};
		axios.post(this.action, data).then( res => {
			dynamicPopup({action: 'success', msg: 'Ваше сообщение успешно отправлено!'});
		}).catch( err => { 
			dynamicPopup({action: 'error', msg: 'К сожалению, не удалось отправить ваше сообщение :('});
			console.error(err);
		});	
	})
}