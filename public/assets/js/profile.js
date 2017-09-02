import '../sass/pages/profile.sass';
import axios from 'axios';
import { $ } from './modules/bling';
import { dynamicPopup } from './modules/popup';

$('.panel').style.height = `${document.body.scrollHeight}px`;

$('.panel__hide').on('click', function(){
  $('.panel').offsetLeft === 0 
    ?  ($('.panel').style.left = '-150px', this.style.transform = 'rotate(-90deg)') 
    :  ($('.panel').style.left = '0', this.style.transform = 'rotate(90deg)');
});

$('.dropdown').on('click', function(){
  const list = this.querySelector('.dropdown__list');
  list.style.display === 'block' ? list.style.display = 'none' : list.style.display = 'block';

});

$('#profile-form').on( 'submit' , function(e){
  e.preventDefault();
  const data = {
    name: this.querySelector('input[name="name"]').value,
    location:  this.querySelector('input[name="location"]').value,
    gender:  this.querySelector('input[name="gender"]').value,
  };
  axios.post('/profile/update', data).then( res => {
    dynamicPopup({action: 'success', msg: 'Ваш профиль успешно обновлён!!'});
  }).catch( err => {
    dynamicPopup({action: 'error', msg: 'Ошибка загрузки данных :('});
    console.error(err)
  });
});
