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

//全屏、取消全屏
window.addEventListener('load', function (event) {
	var fullscreen = document.querySelector('li[data-popup="fullscreen"]');
	var fullscreenImg = fullscreen.querySelector('img');

	fullscreen.addEventListener('click', function (event) {
		if (document.fullscreenEnabled) {
			if (document.fullscreenElement) {
				document.exitFullscreen();
				fullscreenImg.src = './image/setting-tip.jpg';
			} else {
				document.documentElement.requestFullscreen()
				fullscreenImg.src = './image/setting-tip.jpg';
			}
		} else {
			alert('你的浏览器不支持全屏模式！');
		}
	}, false);
}, false);

//手指模式
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

//设置绘图区大小
window.addEventListener('load', function () {
	var confirm = document.querySelector('input#confirm');
	var warning = document.querySelector('span.warning');
	var canvas = document.querySelector('.ui-paint-area canvas');
	var canvasWidth = document.querySelector('.canvasWidth input');
	var canvasHeight = document.querySelector('.canvasHeight input');

	confirm.addEventListener('click', function(e) {
		var newWidth = canvasWidth.value, newHeight = canvasHeight.value;
		if (newWidth > 0 && newHeight > 0) {
			canvas.width = newWidth;
			canvas.height = newHeight;
			canvas.style.width = newWidth + 'px';
			canvas.style.height = newHeight + 'px';

			warning.style.display = 'none';
		} else {
			warning.style.display = 'block';
			warning.style.color = 'red';
		}
	}, false)
}, false);

//设置画笔颜色
window.addEventListener('load', function () {
	var currentColor = document.querySelector('span.currentColor');
	var toggleColor = document.querySelector('span.toggleColor');
	var colorOptions = document.querySelector('div.colorOptions');
	var colorIcon = document.querySelector('span.colorIcon');
	var moreColor = document.querySelector('span.moreColor input');

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

	moreColor.addEventListener('change', function (event) {
		var color = event.target.value;
		currentColor.dataset.color = color;
		setBackgroundColor('span.currentColor');
		global.color = color;		
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

//设置画笔规格
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
		// console.log(Number(result));
		if (result <= 0) {
			alert('输入有误！！！！');
		} else {
			currentLineWidth.dataset.lineWidth = Number(result);
			global.lineWidth = Number(result);
			setLineWidth('span.currentLineWidth');
		}
	}, false);
}, false);

//关闭全部功能区
window.addEventListener('load', function (event) {
	var closeall = document.querySelector('li[data-popup="close-all"]');
	var settingFunctions = document.querySelectorAll('.ui-setting-function');

	closeall.addEventListener('click', function (event) {
		settingFunctions.forEach(function (Function) {
			Function.classList.add('hidden');
		})
	}, false);
}, false);

//canvas绘图代码
window.addEventListener('load', function () {
	var clearCanvas = document.querySelector('li[data-popup="clear-all"]');
	clearCanvas.addEventListener('click', function (event) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}, false);

	var canvas = document.querySelector('.ui-paint-area canvas');
	var ctx = canvas.getContext('2d');
	var ongoingTouches = [];

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

		// console.log(touches);
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

//canvas大小初始化
window.addEventListener('load', function (event) {
	var canvas = document.querySelector('.ui-paint-area canvas');
	canvas.height = canvas.clientHeight;
	canvas.width = canvas.clientWidth;
}, false);

//绑定ui-setting-tip和ui-setting-area
window.addEventListener('load', function (event) {
	var settingTip = document.querySelector('.ui-setting-tip');
	var settingArea = document.querySelector('.ui-setting-area');

	settingTip.addEventListener('click', function (event) {
		settingArea.classList.toggle('hidden');
	}, false);
})

//绑定ui-setting-function和data-popup
window.addEventListener('load', function (event) {
	var settingOptions = document.querySelectorAll('.ui-setting-options li');
	
	settingOptions.forEach(function (option) {
		var id = option.dataset['popup'];
		var settingFunction = document.querySelector(`#${id}`);
		if (settingFunction) {
			option.addEventListener('click', function (event) {
				settingFunction.classList.toggle('hidden');
			}, false);
		}
	})
}, false);

//判断浏览器功能
window.addEventListener('load', function (event) {
	if (window.visualViewport) {
		//缩放页面
		window.visualViewport.addEventListener('resize', function (event) {
			var paintSetting = document.querySelector('.ui-paint-setting');

			// console.log(event);

			paintSetting.style.top = event.target.offsetTop + 'px';
			paintSetting.style.left = event.target.offsetLeft + 'px';

			paintSetting.style.width = (28 / event.target.scale) + 'px';
			paintSetting.style.height = (28 / event.target.scale) + 'px';

			paintSetting.style.fontSize = (1 / event.target.scale) + 'em';
		}, false);

		//滚动页面
		window.visualViewport.addEventListener('scroll', function (event) {
			var paintSetting = document.querySelector('.ui-paint-setting');

			paintSetting.style.top = event.target.pageTop + 'px';
			paintSetting.style.left = event.target.pageLeft + 'px';
		}, false);	
	} else {
		//不能缩放页面时，绑定初始scroll事件
		window.addEventListener('scroll', function (event) {
			var paintSetting = document.querySelector('.ui-paint-setting');

			// console.log(paintSetting);

			paintSetting.style.top = event.target.scrollingElement.scrollTop + 'px';
			paintSetting.style.left = event.target.scrollingElement.scrollLeft + 'px';
		}, false);

		var fingerModeNone = document.querySelector('input[id="none"]');
		fingerModeNone.disabled = true;
		alert('由于您的浏览器不支持某项功能，将不能进行缩放操作');
	}	
}, false);