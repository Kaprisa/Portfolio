import { $ } from './bling';
import { fadeToggle } from './animate';

function hamburger() {
	const popup = $('.popup-menu')
	popup.style.display = 'none';
	$('.header__hamburger').on('click', function(){
		this.classList.toggle('on')
		fadeToggle(popup);
		let animationDelay = 0;
		popup.querySelectorAll('.menu__item').forEach( item => {
			animationDelay ++;
			item.style.cssText = 
				`animation-name: bounceIn;
				animation-duration: .5s;
				animation-fill-mode: both;
				animation-delay: ${animationDelay/10}s;`
		})
	});
}

export default hamburger();