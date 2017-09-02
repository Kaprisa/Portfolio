import { $ } from './bling';
import smooth_scroll_to from './smoothScroll';

function arrows() {
if ($('.arrow-down')) {
	$('.arrow-down').on('click', function(){
		const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		smooth_scroll_to(document.body, h, 2000);
	});
}

if ($('.arrow-up')) {
	$('.arrow-up').on('click', function(){
		smooth_scroll_to(document.body, 0, 2000);
	});
}

}



export default arrows();