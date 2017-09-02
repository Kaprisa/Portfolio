function clearItems(parentClass) {
  if ($(`.${parentClass}__item`)) {
    $$(`.${parentClass}__item`).forEach( item => {
      item.remove();
    });
	}
};

export { clearItems };