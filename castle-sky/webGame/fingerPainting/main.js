window.global = {fingerMode: 'single',
				 color: '#f00',
				 fingerMap: {
				 	none: '禁用手指',
				 	single: '单指模式',
				 	double: '双指模式',
				 	multiple: '多指模式'
				 },
				 lineWidth: 5
				};


//功能1：全屏模式
window.addEventListener('load', function () {
	var fullscreen = document.querySelector('span.fullscreen');
	fullscreen.addEventListener('click', function () {
		if (document.fullscreenEnabled) {
			if (document.fullscreenElement) {
				document.exitFullscreen();
				fullscreen.innerHTML = '全屏模式';
			} else {
				document.documentElement.requestFullscreen();
				fullscreen.innerHTML = '取消全屏';
			}
		} else {
			fullscreen.innerHTML = '你的浏览器不支持全屏模式'
		}
	}, false);

	document.addEventListener('fullscreenerror', function () {
		var currentMode = '';
		if (document.fullscreenElement) {
			currentMode = '退出全屏';
			fullscreen.innerHTML = '取消全屏';
		} else {
			currentMode = '进入全屏';
			fullscreen.innerHTML = '全屏模式';
		}
		alert(`${currentMode}失败，请重新尝试`);
	}, false);
}, false);

//功能2：手指模式
window.addEventListener('load', function () {
	var currentFingerMode = document.querySelector('span.currentFingerMode');
	var toggleFingerMode = document.querySelector('span.toggleFingerMode');
	var fingerMode = document.querySelector('div.fingerMode');
	var fingerModeIcon = document.querySelector('span.fingerModeIcon');

	fingerMode.style.display = 'none';
	document.querySelector('input#single').checked = true;

	toggleFingerMode.addEventListener('click', function () {
		var fingerModeDisplay = fingerMode.style.display == 'none' ? 'inline-block' : 'none';
		var icon = fingerMode.style.display == 'none' ? '<<' : '>>';

		fingerMode.style.display = fingerModeDisplay;
		fingerModeIcon.innerHTML = icon;
	}, false);


	fingerMode.addEventListener('click', function (e) {
		var inputs = document.querySelectorAll('div.fingerMode input');
		for (let item in inputs) {
			if (inputs[item]['nodeName'] == 'INPUT') {
				if (inputs[item]['checked'] == true) {
					currentFingerMode.innerHTML = global.fingerMap[inputs[item]['value']];
					global.fingerMode = inputs[item]['value'];
				}
			}
			
		}
	}, false);
}, false);

//功能3：切换颜色
window.addEventListener('load', function () {
	var currentColor = document.querySelector('span.currentColor');
	var toggleColor = document.querySelector('span.toggleColor');
	var colorOptions = document.querySelector('div.colorOptions');
	var colorIcon = document.querySelector('span.colorIcon');

	colorOptions.style.display = 'none';

	toggleColor.addEventListener('click', function () {
		var colorOptionsDispaly = colorOptions.style.display == 'none' ? 'inline-block' : 'none';
		var icon = colorOptions.style.display == 'none' ? '<<' : '>>';

		colorOptions.style.display = colorOptionsDispaly;
		colorIcon.innerHTML = icon;
	}, false);

	colorOptions.addEventListener('click', function (e) {
		if (e.target.nodeName == 'SPAN') {
			var color = e.target.dataset.color;
			currentColor.dataset.color = color;
			setBackgroundColor('span.currentColor');
			global.color = color;
		}
		
	}, false);

	setBackgroundColor('span.currentColor');
	setBackgroundColor('div.colorOptions span');

	function setBackgroundColor(selector) {
		var results = document.querySelectorAll(selector);
		for (let item of results) {
			item.style.background = item['dataset']['color'];
		}
	}
}, false);

//功能4：切换线宽
window.addEventListener('load', function () {
	var currentLineWidth = document.querySelector('span.currentLineWidth');
	var toggleLineWidth = document.querySelector('span.toggleLineWidth');
	var lineWidthIcon = document.querySelector('span.lineWidthIcon');
	var lineWidthOptions = document.querySelector('div.lineWidthOptions');
	var moreLineWidth = document.querySelector('span.moreLineWidth');

	lineWidthOptions.style.display = 'none';

	toggleLineWidth.addEventListener('click', function () {
		var lineWidthOptionsDispaly = lineWidthOptions.style.display == 'none' ? 'inline-block' : 'none';
		var icon = lineWidthOptions.style.display == 'none' ? '<<' : '>>';

		lineWidthOptions.style.display = lineWidthOptionsDispaly;
		lineWidthIcon.innerHTML = icon;
	}, false);

	lineWidthOptions.addEventListener('click', function (e) {
		if (e.target.nodeName == 'SPAN') {
			var lineWidth = e.target.dataset.lineWidth;
			currentLineWidth.dataset.lineWidth = lineWidth;
			global.lineWidth = lineWidth;
			setLineWidth('span.currentLineWidth');
		}
	}, false);

	setLineWidth('span.currentLineWidth');

	function setLineWidth(selector) {
		var results = document.querySelectorAll(selector);
		for (let item of results) {
			item.innerHTML = item.dataset.lineWidth;
		}
	}

	moreLineWidth.addEventListener('click', function (e) {
		e.stopPropagation();

		var result = prompt('请输入新的规格值（正数）');
		console.log(Number(result));
		if (result <= 0) {
			alert('输入有误！！！！');
		} else {
			currentLineWidth.dataset.lineWidth = Number(result);
			global.lineWidth = Number(result);
			setLineWidth('span.currentLineWidth');
		}
	}, false);

}, false);

//功能6：设置绘图区大小
window.addEventListener('load', function () {
	var confirm = document.querySelector('input#confirm');
	var warning = document.querySelector('span.warning');
	var canvas = document.querySelector('canvas');
	var canvasWidth = document.querySelector('input#canvasWidth');
	var canvasHeight = document.querySelector('input#canvasHeight');

	confirm.addEventListener('click', function(e) {
		if (canvasWidth.value > 0 && canvasHeight.value > 0) {
			canvas.width = canvasWidth.value;
			canvas.height = canvasHeight.value;
			warning.style.display = 'none';
		} else {
			warning.style.display = 'block';
		}
	}, false)
}, false);

//canvas绘图代码
window.addEventListener('load', function () {
	var clearCanvas = document.querySelector('span.clearCanvas');
	var canvas = document.querySelector('div.paintingZone canvas');
	var ctx = canvas.getContext('2d');
	var ongoingTouches = [];

	clearCanvas.addEventListener('click', function () {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}, false);

	canvas.addEventListener('touchstart', startHandler, false);
	canvas.addEventListener('touchmove', moveHandler, false);
	canvas.addEventListener('touchend', endHandler, false);

	function startHandler(e) {
		//当处于“禁用手指”模式时，恢复touch的默认行为，
		//因此可以在“禁用手指”模式滚动、缩放页面
		if (!(global.fingerMode == 'none')) {
			e.preventDefault();			
		}

		var touches = e.changedTouches;
		var length = 0;

		switch (global.fingerMode) {
			case 'none':
				//清空ongoingTouches数组
				if (ongoingTouches.length) {
					ongoingTouches = [];
				}
				return;
			case 'single':
				ongoingTouches.splice(1);
				if (ongoingTouches.length < 1) {
					ongoingTouches.push(copyTouch(touches[0]));
					length = 1;
				}
				break;
			case 'double':
				ongoingTouches.splice(2);
				while (length < touches.length && ongoingTouches.length < 2) {
					ongoingTouches.push(copyTouch(Array.from(touches).shift()));
					length++;
				}
				break;
			case 'multiple':
				while (length < touches.length) {
					ongoingTouches.push(copyTouch(Array.from(touches).shift()));
					length++;
				}
		}

		for (let i = 0; i < length; i++) {
			ctx.beginPath();
			ctx.arc(touches[i].pageX - canvas.offsetLeft, touches[i].pageY - canvas.offsetTop, global.lineWidth / 2, 0, 2 * Math.PI, false);
			ctx.fillStyle = global.color;
			ctx.fill();
		}
	}

	function moveHandler(e) {
		//当处于“禁用手指”模式时，恢复touch的默认行为，
		//因此可以在“禁用手指”模式滚动、缩放页面
		if (!(global.fingerMode == 'none')) {
			e.preventDefault();			
		}

		var touches = e.changedTouches;

		for (let i = 0, length = touches.length; i < length; i++) {
			var idx = ongoingTouchIndexById(touches[i].identifier);

			if (idx > -1) {
				ctx.beginPath();
				ctx.moveTo(ongoingTouches[idx].pageX - canvas.offsetLeft, ongoingTouches[idx].pageY - canvas.offsetTop);
				ctx.lineTo(touches[i].pageX - canvas.offsetLeft, touches[i].pageY - canvas.offsetTop);
				ctx.strokeStyle = global.color;
				ctx.lineWidth = global.lineWidth;
				ctx.lineCap = 'round';
				ctx.stroke();

				ongoingTouches.splice(idx, 1, copyTouch(touches[i]));
			}
		}
	}

	function endHandler(e) {
		//当处于“禁用手指”模式时，恢复touch的默认行为，
		//因此可以在“禁用手指”模式滚动、缩放页面
		if (!(global.fingerMode == 'none')) {
			e.preventDefault();			
		}

		var touches = e.changedTouches;

		for (let i = 0, length = touches.length; i < length; i++) {
			var idx = ongoingTouchIndexById(touches[i].identifier);

			if (idx > -1) {
				ctx.beginPath();
				ctx.arc(touches[i].pageX - canvas.offsetLeft, touches[i].pageY - canvas.offsetTop, global.lineWidth / 2, 0, 2 * Math.PI, false);
				ctx.fillStyle = global.color;
				ctx.fill();

				ongoingTouches.splice(idx, 1);
			}
		}
	}

	function ongoingTouchIndexById(idToFind) {
		for (let i = 0; i < ongoingTouches.length; i++) {
			if (idToFind == ongoingTouches[i].identifier) {
				return i
			}
		}
		return -1
	}

	function copyTouch({identifier, pageX, pageY}) {
		return {identifier, pageX, pageY}
	}

}, false);

window.addEventListener('resize', function () {
	alert('i am resized');
})