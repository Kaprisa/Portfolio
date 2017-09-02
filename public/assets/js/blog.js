import '../sass/pages/blog.sass';
import { $, $$ } from './modules/bling';
import './modules/preloader';
import './modules/hamburger';
import './modules/arrows';
import smooth_scroll_to from './modules/smoothScroll';

const sidebar = $('.blog-sidebar');
window.scrollTo(0, 0);
const articles = $$('.blog-article');
const articleLinks = $$('.blog-sidebar__link');

if (screen.width > 1200){
	sidebar.style.position = 'fixed';
	const fixedWidth = sidebar.clientWidth;
	sidebar.style.position = 'static';
	const sidebarRect = sidebar.getBoundingClientRect();
	const sidebarPaddingRight = parseInt(getComputedStyle(sidebar, null).getPropertyValue('padding-right'));
	const left = sidebarRect.width - fixedWidth - sidebarPaddingRight;
	window.onscroll = function() {
		const paddingTop = getComputedStyle($('.blog__main'), null).getPropertyValue('padding-top');
		if (window.scrollY-$('.blog__main').offsetTop+parseInt(paddingTop)> 0){
				sidebar.style.cssText = 
					`position: fixed;
					top: 0;
					left: ${left}px;`; 
		}else{
			if(sidebar.style.position === 'fixed'){
				sidebar.style.position = 'static';
			}
		}
	}
} else {
			const body = $('body');
		let
	    touchStartX = 0,
	    touchEndX = 0,
	    threshold = 100;

	  body.on('touchstart', function (event) {
	    if (window.clientWidth >= 1200) return;
	    console.log(event);
	    const touch = event.touches[0] || event.changedTouches[0];

	    touchStartX = touch.pageX;
	  });

	  body.on('touchend', function (event) {
	    if (window.clientWidth >= 1200) return;

	    const touch = event.touches[0] || event.changedTouches[0];//.originalEvent

	    touchEndX = touch.pageX;

	    if (touchEndX - touchStartX > threshold && !sidebar.classList.contains('blog-sidebar_open')) 
	    	sidebar.classList.add('blog-sidebar_open');
	    else if (touchEndX - touchStartX < -threshold && sidebar.classList.contains('blog-sidebar_open'))
	      sidebar.classList.remove('blog-sidebar_open');
	  });
}
	articles.on('wheel', function(){
		const currentIndex= articles.indexOf(this);

		if ($('.blog-sidebar__link_active')) {
			$('.blog-sidebar__link_active').classList.remove('blog-sidebar__link_active');
		}
		articleLinks[currentIndex].classList.add('blog-sidebar__link_active');

	});	


articleLinks.on('click', function(e) {
	e.preventDefault();
	if ($('.blog-sidebar__link_active')) {
		$('.blog-sidebar__link_active').classList.remove('blog-sidebar__link_active');
	}
	this.classList.add('blog-sidebar__link_active');
	const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	smooth_scroll_to(document.body, articles[articleLinks.indexOf(this)].offsetTop, 1000);
})


