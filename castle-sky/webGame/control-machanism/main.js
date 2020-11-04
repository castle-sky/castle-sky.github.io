function placeHTML(dom, html) {
	dom.innerHTML = html;
}


window.onload = function () {
	var canvas = document.querySelector('canvas#mainApp');
	var fullscreen = document.querySelector('span#fullscreen');
	var information = document.querySelector('span#information');

	document.addEventListener('touchstart', handler);
	document.addEventListener('touchmove', handler);
	document.addEventListener('touchend', handler);

	function handler(e) {
		/*var html = 'infromation about touchstart as follows: <br>';
		for (let item in e) {
			html += item + ': ' + e.item + '<br>';
		}
		placeHTML(information, html);*/
		
		if (e.type == 'touchmove' && e.touches) {
			var playerX = e.touches[0].pageX - canvas.offsetLeft;
			var playerY = e.touches[0].pageY - canvas.offsetTop;
			var html = 'player position: ' + playerX + ' ' + playerY;
			placeHTML(information, html);
		}
	}
}
