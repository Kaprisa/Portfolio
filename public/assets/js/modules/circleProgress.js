import { $, $$ } from './bling';

const circleRect = $('.skills__circle_fill').getBoundingClientRect();
const circleLength = circleRect.width * 3.14;

function fillProgress() {
	$$('.skills__item').forEach( item => {
		const circle = item.querySelector('.skills__circle_fill');
		const percent = 100 - item.getAttribute('data-percent');	
		const dasharray = ( percent < 50 ) ? circleLength * (100 - percent) / 100 : circleLength * percent / 100;
		circle.style.cssText = `stroke-dasharray: ${dasharray};transition: stroke-dasharray 1s ease`;
		if (percent < 50){
			const dashoffset = dasharray - (circleLength - dasharray);
			circle.style.cssText += `stroke-dashoffset: ${dashoffset};transition: stroke-dashoffset 1s ease`;
		}
	});
}

function removeProgress() {
	$$('.skills__item').forEach( item => {
		item.querySelector('.skills__circle_fill').style.cssText = '';
	});
}
const progressSection = $('.about-skills');
const topBorder = progressSection.offsetTop - screen.height / 3;
const bottomBorder = progressSection.offsetTop + progressSection.offsetHeight - screen.height / 3;

let filled = false;

const circleProgressListener = function() {
	if ( !filled && window.scrollY > topBorder && window.scrollY < bottomBorder) {
		fillProgress();
		filled = true;
	} else
	if ( filled && (window.scrollY > bottomBorder || window.scrollY < topBorder)) {
		removeProgress();
		filled = false;
	}
}

window.addEventListener( 'scroll', circleProgressListener);