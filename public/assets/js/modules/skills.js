import { $, $$ } from './bling';
import axios from 'axios';
import { showPopup, hidePopup, dynamicPopup } from './popup';

function clearPopup(parentClass) {
	$(`.${parentClass}__input`).value = '';
  if ($(`.${parentClass}__item`)) {
    $$(`.${parentClass}__item`).forEach( item => {
      item.remove();
    });
	}
}

 function addSkillsItem(parentClass, name, percent) {
  	const li = document.createElement('li');
  	li.className = `${parentClass}__item`;
  	li.innerHTML =
  		`<input class="${parentClass}__input" type="text" name="name" placeholder="name" value="${name}">
  		<input class="${parentClass}__input ${parentClass}__input_small" type="text" name="percent" placeholder="percent" value="${percent}">
  		<span class="btn_remove-skill"></span>`;
  	$(`.${parentClass}__list`).appendChild(li);
    li.querySelector('.btn_remove-skill').addEventListener('click', function(){
      li.remove();
    });
 };

 function getUpdateSkillsPopup(parentClass, elem) {
 		clearPopup(parentClass);
  	const category = elem.getAttribute('data-category');
  	$(`.${parentClass}__input`).value = category;
  	axios.get(`/skills?category=${category}`).then( res => {
  		const skills = res.data;
  		skills.forEach( skill => {
  			addSkillsItem(parentClass, skill.name, skill.percent);
  		});
  		showPopup($('.admin-skills__popup'));
  	}).catch( err => { console.error(err) });
 }

 function deleteExistingItem(category) {
 	const existingCategorySpan = $(`span[data-category="${category}"]`);
	if (existingCategorySpan) {
		existingCategorySpan.parentElement.remove();
	}
 }

function skills() {
	if (!$('#about')) return;

	$('.admin-skills-save').on('submit', function(e) {
		e.preventDefault();
		let data = {};
		$$('.admin-skills__input-text').forEach( item => {
	    const category = item.getAttribute('data-category');
	    const skill = item.getAttribute('data-skill');
	    if (!(category in data)) {
	      data[category] = {};
	    }
	    data[category][skill] = item.value;
	  });
		axios.post(this.action, data).then( res => {
			dynamicPopup({action: 'success', msg: 'Данные успешно загружены!'});
		}).catch( err => { 
			dynamicPopup({action: 'error', msg: 'Ошибка загрузки данных :('});
			console.error(err);
		});	
	});

	if ($('.btn_update-skills')) {
		$$('.btn_update-skills').on('click', function(){
			getUpdateSkillsPopup('skills-editor', this);
	 });
	}


	$('.btn_add-skills').on('click', function(){
		clearPopup('skills-editor');
	  showPopup($('.admin-skills__popup'));
	});

	$('.btn_delete-skills').on('click', function() {
		const category = this.parentElement.querySelector('input[name="category"]').value;
		axios.delete(`/skills/${category}`).then( res => {
			deleteExistingItem(category);
			hidePopup($('.admin-skills__popup'));
			dynamicPopup({action: 'success', msg: 'Удаление прошло успешно'});
		}).catch( err => {
			dynamicPopup({action: 'error', msg: 'Ошибка удаления данных :('});
			console.error(err);
		})
	});

	$('.btn_add-skill').on('click', function() {
		addSkillsItem('skills-editor', '', '');
	});

	$('.skills-editor__form').on('submit', function(e) {
		e.preventDefault();
		const category = this.querySelector('input[name="category"]').value;
		let data = {
			category,
			skills: []
		};
		$$('.skills-editor__item').forEach( item => {
			data.skills.push({
				name: item.querySelector('input[name="name"]').value,
				percent: item.querySelector('input[name="percent"]').value
			});
    });
		axios.post(`${this.action}/${category}`, data).then( res => {
			hidePopup($('.admin-skills__popup'));
			dynamicPopup({action: 'success', msg: 'Данные успешно загружены!'});
			deleteExistingItem(category);
			const div = document.createElement('div');
			div.className = 'admin-tabs__section';
			div.innerHTML = res.data;
			$('.admin-skills-save').insertBefore(div, $('.admin__buttons'));
			div.querySelector('.btn_update-skills').addEventListener('click', function() {
				getUpdateSkillsPopup('skills-editor', this);
			});
		}).catch( err => {
			dynamicPopup({action: 'error', msg: 'Ошибка загрузки данных :('});
		 	console.error(err);
		});
	})
}

export default skills;