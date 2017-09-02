const movementStrength = 50;

const height = movementStrength / screen.availHeight;
const width = movementStrength / screen.availWidth;

function movingBackground(elem) {
	elem.addEventListener('mousemove', function(e){
	  var pageX = e.pageX - (screen.availWidth / 2);
	  var pageY = e.pageY - (screen.availHeight / 2);
	  var newvalueX = width * pageX * -1 - 25;
	  var newvalueY = height * pageY * -1 - 50;
	  elem.style.cssText += `background-position: ${newvalueX}px ${newvalueY}px`;
	});
}

export default movingBackground;