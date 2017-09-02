import '../sass/pages/welcome.sass';
import './modules/preloader';
import { $, $$ } from './modules/bling';
import { animate } from './modules/animate';
import movingBackground from './modules/movingBackground';

$('#login').on('click', function(e){
	e.preventDefault();
	$('#login-form').submit();
});

/*$('#login-form').on('submit', function(e){
	e.preventDefault();
	axios.post('/login', this.serialize()).then( res => {
	}).catch( err => {
	})
});*/

$('.btn-authorization').on('click', function(e){
	e.preventDefault();

	animate(this, 'fade-out', 1000, () => {
		this.style.display = 'none';
	});
	$('.welcome__hello').style.transform = 'rotateY(-180deg)';
	$('.welcome__authorization').style.transform = 'rotateY(0)';
});

$('.btn_flip').on('click', function(e){
	e.preventDefault();
	const btn = $('.btn-authorization')
	btn.style.display = 'inline-block';
	animate( btn, 'fade-in', 1000);
	$('.welcome__hello').style.transform = 'rotateY(0)';
	$('.welcome__authorization').style.transform = 'rotateY(-180deg)';
});

movingBackground($(".welcome"));

