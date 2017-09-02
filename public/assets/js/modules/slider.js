import { $, $$ } from './bling';
import { animate, fadeOut, fadeIn } from './animate';

function slider(){

  const slides = $$('.slider__item');

  slides[1].classList.add('slider__item_active');

  $('.slider__name').innerHTML = slides[1].getAttribute('data-name');
  $('.slider__use').innerHTML = slides[1].getAttribute('data-use');
  $('.slider__link').setAttribute('href', slides[1].getAttribute('data-link') );

  function validate(num) {
      let result;

      if (num < 0)
        result = slides.length - 1;
      else if (num > slides.length - 1)
        result = 0;
      else
        result = num;

      return result;
    }


  $$('.slider__arrow_prev, .slider__arrow_next').on('click', function(){

  	let PrevIndex = slides.indexOf($('.slider__item_active'));
   	let index, NextIndex;

  	if  (this.getAttribute('class').indexOf('prev') === -1){
  		index = validate(PrevIndex+1);
  		NextIndex = validate(index+1);
  	} else{
  		index = validate(PrevIndex-1);
  		NextIndex = validate(index-1);
  	}	
  	
  	const bgPrev = slides[PrevIndex].getAttribute('data-img');
  	const bgNext = slides[NextIndex].getAttribute('data-img');
  	const name = slides[index].getAttribute('data-name');
  	const use = slides[index].getAttribute('data-use');

  	$('.slider__name').innerHTML = textChange($('.slider__name'), slides[index].getAttribute('data-name'), 'bounceIn');
  	$('.slider__use').innerHTML = textChange($('.slider__use'), slides[index].getAttribute('data-use'), 'bounceIn');
  	$('.slider__link').setAttribute('href', slides[index].getAttribute('data-link'));

  	$('.slider__controls_prev').querySelector('.slider__image_next').style.cssText = `background-image: url(${bgPrev})`;
  	$('.slider__controls_next').querySelector('.slider__image_next').style.cssText = `background-image: url(${bgNext})`;

    animate($('.slider__controls_prev').querySelector('.slider__image_current'), 'center-to-bottom', 1500, function(){
      $('.slider__controls_prev').querySelector('.slider__image_current').style.cssText = `background-image: url(${bgPrev});top: 0`;
    });
    animate($('.slider__controls_prev').querySelector('.slider__image_next'), 'top-to-center', 1500, function(){
      $('.slider__controls_prev').querySelector('.slider__image_next').style.cssText = `top: -100%`;
    });
    animate($('.slider__controls_next').querySelector('.slider__image_current'), 'center-to-top', 1500, function(){
      $('.slider__controls_next').querySelector('.slider__image_current').style.cssText = `background-image: url(${bgNext});top: 0`;
    });
    animate($('.slider__controls_next').querySelector('.slider__image_next'), 'bottom-to-center', 1500, function(){
      $('.slider__controls_next').querySelector('.slider__image_next').style.cssText = `top: 100%`;
    });
    fadeOut($('.slider__item_active'), function() {
      $('.slider__item_active').classList.remove('slider__item_active');
      fadeIn(slides[index], function(){
        slides[index].classList.add('slider__item_active');
      });
    })
  });
}


function textChange(elem, text, animationName) {
  text = '' + text;
  const letters = text.split('');
  let str = '<span style="display: inline-block;">';
  let animationDelay = 0;

  letters.forEach(function (letter, id) {
    animationDelay++;

    if (letter === ' ') {
      str += '&nbsp;</span><span style="display: inline-block;">';
    } else {
      str += `<span id="letter-${id}" class="${animationName}" style="display: inline-block; animation-delay: ${animationDelay / 20}s">${letter}</span>`;
    }

  });
  str += '</span>';
  return str;
}

export default slider();