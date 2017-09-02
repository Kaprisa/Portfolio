 import { fadeOut } from './animate';

function preloader(){
	window.onload = function() {
		fadeOut( document.querySelector('.preloader'));
	}
}

export default preloader();

