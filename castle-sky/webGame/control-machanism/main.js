function placeHTML(dom, html) {
	dom.innerHTML = html;
}


window.onload = function () {
	var canvas = document.querySelector('canvas#mainApp');
	var fullscreen = document.querySelector('span#fullscreen');
	var information = document.querySelector('span#information');

	canvas.addEventListener('touchstart', handler);
	canvas.addEventListener('touchmove', handler);
	canvas.addEventListener('touchend', handler);

	function handler(e) {
		var html = 'infromation about touchstart as follows: <br>';
		for (let item in e) {
			html += item + ': ' + e.item + '<br>';
		}
		placeHTML(information, html);
		if (e.touches) {
			playerX = e.touches[0].pageX - canvas.offsetLeft;
			playerY = e.thouches[0].pageY - canvas.offsetTop;
			html = 'player position: ' + playerX + ' ' + playerY;
			placeHTML(infromation, html);
		}
	}
}