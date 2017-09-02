import axios from 'axios';
import { $, $$ } from './bling';
import { fadeIn, fadeOut } from './animate';
import { dynamicPopup, showPopup, hidePopup } from './popup';
import { clearItems } from './helpers';

function addTags(input, parentClass) {
	const tag = input.value;
	if (!tag) return;
	input.value = '';
	const span = document.createElement('span');
	span.className = `${parentClass}__item`; 
	span.innerHTML = tag;
	$(`.${parentClass}__holder`).appendChild(span);
	span.addEventListener('click', function() {
		fadeOut(this, function() {
			span.remove();
		});
	})

}

 function deleteExistingItem(selector) {
 	const existingItem = $(selector);
 	let count = 0;
	if (existingItem) {
		const countHolder = existingItem.querySelector('.article-categories__count').innerHTML;
		count = Number(countHolder.slice(0, countHolder.indexOf(' ')));
		existingItem.remove();
	}
	return count;
 }

 function addCategory(parentClass, category, count) {
  	const div = document.createElement('div');
  	div.className = `${parentClass}__item`;
  	div.setAttribute('data-name', category);
  	div.innerHTML =
  		`<h5 class="${parentClass}__title">${category}</h5>
  		<span class="${parentClass}__count">${count} статьи</span>`;
  	$(`.${parentClass}`).appendChild(div);
  	div.addEventListener('click', function() {
  		showArticlesPopup(this);
  	}) 	
 };

 function showArticlesPopup(elem) {
		const category = elem.getAttribute('data-name');
		$('.admin-articles__category').innerHTML = category;
		axios.get(`/articles?category=${category}`).then( res => {
			$('.admin-articles__list').innerHTML = res.data;
			showPopup($('.article-categories__popup'));
			$$('.delete-article').on('click', function() {
				const id = this.getAttribute('data-id');
				axios.delete(`/articles/${id}`).then( res => {
					const article = this.parentNode;
					fadeOut(article, function() {
						article.remove();
					});
					dynamicPopup({action: 'success', msg: 'Удаление прошло успешно'});
				}).catch( err => {
					dynamicPopup({action: 'error', msg: 'Ошибка удаления данных :('});
					console.error(err);
				})
			})
			$$('.update-article').on('click', function() {
				const id = this.getAttribute('data-id');
				axios.get(`/article/${id}/edit`).then( res => {
					$('.admin-blog-add').innerHTML = res.data;
					$('#tag').on('keydown', function(e) {
						if (e.keyCode === 13) {
							e.preventDefault();
							addTags(this, 'admin-tags');
						}
					});
					hidePopup($('.article-categories__popup'));
				}).catch( err => {
					dynamicPopup({action: 'error', msg: 'Ошибка базы данных :('});
					console.error(err);
				});
			})
			$('#delete-category').on('click', function(){
				axios.delete(`/articles/category/${category}`).then( res => {
					deleteExistingItem(`.article-categories__item[data-name="${category}"]`);
					hidePopup($('.article-categories__popup'));
					dynamicPopup({action: 'success', msg: 'Удаление прошло успешно'});
				}).catch( err => {
					dynamicPopup({action: 'error', msg: 'Ошибка удаления данных :('});
					console.error(err);
				})
			})
		}); 	
 }

function blog() {

	if (!$('#blog')) return;

	$('#tag').on('keydown', function(e) {
		if (e.keyCode === 13) {
			e.preventDefault();
			addTags(this, 'admin-tags');
		}
	});

	$('.admin-blog-add').on('submit', function(e) {
		e.preventDefault();
		let tags = [];
		if ($('.admin-tags__item')) {
			$$('.admin-tags__item').forEach( tag => {
				tags.push(tag.innerHTML);
			});
		}
		const data = {
			title: $('input[name="title"]').value,
			category: $('input[name="category"]').value,
			text: $('textarea[name="text"]').value,
			tags
		};
		const id = $('#article-add').getAttribute('data-id');
		const action = (id === '') ? this.action : `/article/${id}/update`;
		axios.post(action, data).then( res => {
			dynamicPopup({action: 'success', msg: res.data});
			if (id === '') {
				const count = deleteExistingItem(`.article-categories__item[data-name="${data.category}"]`) + 1;
				addCategory('article-categories', data.category, count);
			}
		}).catch( err => { 
			dynamicPopup({action: 'error', msg: 'Ошибка загрузки данных :('});
			console.error(err);
		});	
	});

	$$('.article-categories__item').on('click', function() {
		showArticlesPopup(this);
	});
}


export default blog;