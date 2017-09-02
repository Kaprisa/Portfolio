import { $$, $ } from './bling';
import axios from 'axios';

function changePageReq(navParentClass, page ,  hst = true) {
	axios.get(`${page}?axs=1`).then(res => {
		if (!res.data) return;
		$('.admin-tabs').innerHTML = res.data;
		const state = { page: page };
		if (hst){
			history.pushState(state, 'Портфолио', state.page);
		}
		let event = new Event('changePage');
		$('.admin-tabs').dispatchEvent(event);
		changePage(navParentClass);
	})
}

function changePage(navParentClass){
	if (!$(`.${navParentClass}`)) return;
		$$(`.${navParentClass}__link`).on('click', function(e){
			e.preventDefault();
			$(`.${navParentClass}__item_active`).classList.remove(`${navParentClass}__item_active`);
			this.parentNode.classList.add(`${navParentClass}__item_active`);
			const href = this.getAttribute('href');
			changePageReq(navParentClass, href);
		});
	window.onpopstate = function(e) {
  	if (!e.state) return;
  	changePageReq(navParentClass, e.state.page, false);
	};
}

export default changePage;