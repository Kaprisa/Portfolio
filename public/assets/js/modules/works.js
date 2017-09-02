import axios from 'axios';
import { fadeIn, fadeOut } from './animate';
import { $, $$ } from './bling';
import { dynamicPopup, showPopup, hidePopup } from './popup';

function addWorksItem(parentClass, name, id) {
  const li = document.createElement('li');
  li.className = `${parentClass}__item`;
  li.innerHTML =
      `<span class="${parentClass}__name">${name}</span>
      <button class="btn btn_small button_delete-work" data-id="${id}">Удалить</button>`;
  $(`.${parentClass}__list`).appendChild(li);
  li.querySelector('.button_delete-work').addEventListener('click', function(){
    deleteWork(id, li);
  });
}

function deleteWork(id, elem) {
    axios.delete(`/works/${id}`).then( res => {
      dynamicPopup({action: 'success', msg: 'Работа успешно удалена'});
      fadeOut(elem, function() {
        elem.remove();
      });
    }).catch( err => {
      dynamicPopup({action: 'error', msg: 'Ошибка удаления данных :('});
      console.error(err);
    })
}

function works() {
	if (!$('#works')) return;

	$('.admin-works-add').on('submit', function(e) {
		e.preventDefault();
		let data = new FormData();
    data.append('name', $('#name').value);
    data.append('link', $('#link').value);
    data.append('description', $('#description').value);
    data.append('photo', $('#photo').files[0]);
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }
    axios.post('/works/add', data, config).then( res => {
      addWorksItem('admin-works', res.data.name, res.data._id);
    	dynamicPopup({action: 'success', msg: 'Работа успешно загружена!'});
    }).catch( err => {
    	dynamicPopup({action: 'error', msg: 'Ошибка загрузки данных :('});
    	console.error(err)
    })
	})

  $$('.button_delete-work').on('click', function() {
    deleteWork(this.getAttribute('data-id'), this.parentElement);
  })
}

export default works;