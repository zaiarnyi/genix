function email_test(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};

function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('body').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('body').classList.add('_touch');
}

function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll("._ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();

if (document.querySelector('.wrapper')) {
	document.querySelector('.wrapper').classList.add('_loaded');
}

let unlock = true;

//=================
//ActionsOnHash
if (location.hash) {
	const hsh = location.hash.replace('#', '');
	if (document.querySelector('.popup_' + hsh)) {
		popup_open(hsh);
	} else if (document.querySelector('div.' + hsh)) {
		_goto(document.querySelector('.' + hsh), 500, '');
	}
}
//=================
//Menu
let iconMenu = document.querySelector(".icon-menu");
if (iconMenu != null) {
	let delay = 500;
	let menuBody = document.querySelector(".menu__body");
	iconMenu.addEventListener("click", function (e) {
		if (unlock) {
			body_lock(delay);
			iconMenu.classList.toggle("_active");
			menuBody.classList.toggle("_active");
		}
	});
};

function menu_close() {
	let iconMenu = document.querySelector(".icon-menu");
	let menuBody = document.querySelector(".menu__body");
	iconMenu.classList.remove("_active");
	menuBody.classList.remove("_active");
}
//=================
//BodyLock
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}

function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}

function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
//=================

// LettersAnimation
let title = document.querySelectorAll('._letter-animation');
if (title) {
	for (let index = 0; index < title.length; index++) {
		let el = title[index];
		let txt = el.innerHTML;
		let txt_words = txt.replace('  ', ' ').split(' ');
		let new_title = '';
		for (let index = 0; index < txt_words.length; index++) {
			let txt_word = txt_words[index];
			let len = txt_word.length;
			new_title = new_title + '<p>';
			for (let index = 0; index < len; index++) {
				let it = txt_word.substr(index, 1);
				if (it == ' ') {
					it = '&nbsp;';
				}
				new_title = new_title + '<span>' + it + '</span>';
			}
			el.innerHTML = new_title;
			new_title = new_title + '&nbsp;</p>';
		}
	}
}
//=================

//=================








//=================
//SlideToggle
let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
//========================================
//Wrap
function _wrap(el, wrapper) {
	el.parentNode.insertBefore(wrapper, el);
	wrapper.appendChild(el);
}
//========================================
//RemoveClasses
function _removeClasses(el, class_name) {
	for (var i = 0; i < el.length; i++) {
		el[i].classList.remove(class_name);
	}
}
//========================================
//IsHidden
function _is_hidden(el) {
	return (el.offsetParent === null)
}
//========================================
//Animate
function animate({
	timing,
	draw,
	duration
}) {
	let start = performance.now();
	requestAnimationFrame(function animate(time) {
		// timeFraction изменяется от 0 до 1
		let timeFraction = (time - start) / duration;
		if (timeFraction > 1) timeFraction = 1;

		// вычисление текущего состояния анимации
		let progress = timing(timeFraction);

		draw(progress); // отрисовать её

		if (timeFraction < 1) {
			requestAnimationFrame(animate);
		}

	});
}

function makeEaseOut(timing) {
	return function (timeFraction) {
		return 1 - timing(1 - timeFraction);
	}
}

function makeEaseInOut(timing) {
	return function (timeFraction) {
		if (timeFraction < .5)
			return timing(2 * timeFraction) / 2;
		else
			return (2 - timing(2 * (1 - timeFraction))) / 2;
	}
}

function quad(timeFraction) {
	return Math.pow(timeFraction, 2)
}

function circ(timeFraction) {
	return 1 - Math.sin(Math.acos(timeFraction));
}
/*
animate({
	duration: 1000,
	timing: makeEaseOut(quad),
	draw(progress) {
		window.scroll(0, start_position + 400 * progress);
	}
});*/

//Полифилы
(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
//=================


// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		//customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());
//let btn = document.querySelectorAll('button[type="submit"],input[type="submit"]');
let forms = document.querySelectorAll('form');
if (forms.length > 0) {
	for (let index = 0; index < forms.length; index++) {
		const el = forms[index];
		el.addEventListener('submit', form_submit);
	}
}
function form_submit(e) {
	let btn = event.target;
	let form = btn.closest('form');
	let message = form.getAttribute('data-message');
	let error = form_validate(form);
	if (error == 0) {
		//SendForm
		form_clean(form);
		if (message) {
			popup_open('message-' + message);
			e.preventDefault();
		}
	} else {
		let form_error = form.querySelectorAll('._error');
		if (form_error && form.classList.contains('_goto-error')) {
			_goto(form_error[0], 1000, 50);
		}
		event.preventDefault();
	}
}
function form_validate(form) {
	let error = 0;
	let form_req = form.querySelectorAll('._req');
	if (form_req.length > 0) {
		for (let index = 0; index < form_req.length; index++) {
			const el = form_req[index];
			if (!_is_hidden(el)) {
				error += form_validate_input(el);
			}
		}
	}
	return error;
}
function form_validate_input(input) {
	let error = 0;
	let input_g_value = input.getAttribute('data-value');

	if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
		if (input.value != input_g_value) {
			let em = input.value.replace(" ", "");
			input.value = em;
		}
		if (email_test(input) || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}
	} else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
		form_add_error(input);
		error++;
	} else {
		if (input.value == '' || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}
	}
	return error;
}
function form_add_error(input) {
	input.classList.add('_error');
	input.parentElement.classList.add('_error');

	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
	let input_error_text = input.getAttribute('data-error');
	if (input_error_text && input_error_text != '') {
		input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
	}
}
function form_remove_error(input) {
	input.classList.remove('_error');
	input.parentElement.classList.remove('_error');

	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
}
function form_clean(form) {
	let inputs = form.querySelectorAll('input,textarea');
	for (let index = 0; index < inputs.length; index++) {
		const el = inputs[index];
		el.parentElement.classList.remove('_focus');
		el.classList.remove('_focus');
		el.value = el.getAttribute('data-value');
	}
	let checkboxes = form.querySelectorAll('.checkbox__input');
	if (checkboxes.length > 0) {
		for (let index = 0; index < checkboxes.length; index++) {
			const checkbox = checkboxes[index];
			checkbox.checked = false;
		}
	}
	let selects = form.querySelectorAll('select');
	if (selects.length > 0) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_default_value = select.getAttribute('data-default');
			select.value = select_default_value;
			select_item(select);
		}
	}
}

let viewPass = document.querySelectorAll('.form__viewpass');
for (let index = 0; index < viewPass.length; index++) {
	const element = viewPass[index];
	element.addEventListener("click", function (e) {
		if (element.classList.contains('_active')) {
			element.parentElement.querySelector('input').setAttribute("type", "password");
		} else {
			element.parentElement.querySelector('input').setAttribute("type", "text");
		}
		element.classList.toggle('_active');
	});
}


//Select
let selects = document.getElementsByTagName('select');
if (selects.length > 0) {
	selects_init();
}
function selects_init() {
	for (let index = 0; index < selects.length; index++) {
		const select = selects[index];
		select_init(select);
	}
	//select_callback();
	document.addEventListener('click', function (e) {
		selects_close(e);
	});
	document.addEventListener('keydown', function (e) {
		if (e.which == 27) {
			selects_close(e);
		}
	});
}
function selects_close(e) {
	const selects = document.querySelectorAll('.select');
	if (!e.target.closest('.select')) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			select.classList.remove('_active');
			_slideUp(select_body_options, 100);
		}
	}
}
function select_init(select) {
	const select_parent = select.parentElement;
	const select_modifikator = select.getAttribute('class');
	const select_selected_option = select.querySelector('option:checked');
	select.setAttribute('data-default', select_selected_option.value);
	select.style.display = 'none';

	select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

	let new_select = select.parentElement.querySelector('.select');
	new_select.appendChild(select);
	select_item(select);
}
function select_item(select) {
	const select_parent = select.parentElement;
	const select_items = select_parent.querySelector('.select__item');
	const select_options = select.querySelectorAll('option');
	const select_selected_option = select.querySelector('option:checked');
	const select_selected_text = select_selected_option.text;
	const select_type = select.getAttribute('data-type');

	if (select_items) {
		select_items.remove();
	}

	let select_type_content = '';
	if (select_type == 'input') {
		select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
	} else {
		select_type_content = '<div class="select__value icon-select-arrow"><span>' + select_selected_text + '</span></div>';
	}

	select_parent.insertAdjacentHTML('beforeend',
		'<div class="select__item">' +
		'<div class="select__title">' + select_type_content + '</div>' +
		'<div class="select__options">' + select_get_options(select_options) + '</div>' +
		'</div></div>');

	select_actions(select, select_parent);
}
function select_actions(original, select) {
	const select_item = select.querySelector('.select__item');
	const select_body_options = select.querySelector('.select__options');
	const select_options = select.querySelectorAll('.select__option');
	const select_type = original.getAttribute('data-type');
	const select_input = select.querySelector('.select__input');

	select_item.addEventListener('click', function () {
		let selects = document.querySelectorAll('.select');
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			if (select != select_item.closest('.select')) {
				select.classList.remove('_active');
				_slideUp(select_body_options, 100);
			}
		}
		_slideToggle(select_body_options, 100);
		select.classList.toggle('_active');
	});

	for (let index = 0; index < select_options.length; index++) {
		const select_option = select_options[index];
		const select_option_value = select_option.getAttribute('data-value');
		const select_option_text = select_option.innerHTML;

		if (select_type == 'input') {
			select_input.addEventListener('keyup', select_search);
		} else {
			if (select_option.getAttribute('data-value') == original.value) {
				select_option.style.display = 'none';
			}
		}
		select_option.addEventListener('click', function () {
			for (let index = 0; index < select_options.length; index++) {
				const el = select_options[index];
				el.style.display = 'block';
			}
			if (select_type == 'input') {
				select_input.value = select_option_text;
				original.value = select_option_value;
			} else {
				select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
				original.value = select_option_value;
				select_option.style.display = 'none';
			}
		});
	}
}
function select_get_options(select_options) {
	if (select_options) {
		let select_options_content = '';
		for (let index = 0; index < select_options.length; index++) {
			const select_option = select_options[index];
			const select_option_value = select_option.value;
			if (select_option_value != '') {
				const select_option_text = select_option.text;
				select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
			}
		}
		return select_options_content;
	}
}
function select_search(e) {
	let select_block = e.target.closest('.select ').querySelector('.select__options');
	let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
	let select_search_text = e.target.value.toUpperCase();

	for (let i = 0; i < select_options.length; i++) {
		let select_option = select_options[i];
		let select_txt_value = select_option.textContent || select_option.innerText;
		if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
			select_option.style.display = "";
		} else {
			select_option.style.display = "none";
		}
	}
}
function selects_update_all() {
	let selects = document.querySelectorAll('select');
	if (selects) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			select_item(select);
		}
	}
}

//Placeholers
let inputs = document.querySelectorAll('input[data-value],textarea[data-value]');
inputs_init(inputs);

function inputs_init(inputs) {
	if (inputs.length > 0) {
		for (let index = 0; index < inputs.length; index++) {
			const input = inputs[index];
			const input_g_value = input.getAttribute('data-value');
			input_placeholder_add(input);
			if (input.value != '' && input.value != input_g_value) {
				input_focus_add(input);
			}
			input.addEventListener('focus', function (e) {
				if (input.value == input_g_value) {
					input_focus_add(input);
					input.value = '';
				}
				if (input.getAttribute('data-type') === "pass") {
					input.setAttribute('type', 'password');
				}
				if (input.classList.contains('_date')) {
					/*
					input.classList.add('_mask');
					Inputmask("99.99.9999", {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
					*/
				}
				if (input.classList.contains('_phone')) {
					//'+7(999) 999 9999'
					//'+38(999) 999 9999'
					//'+375(99)999-99-99'
					input.classList.add('_mask');
					Inputmask("+375 (99) 9999999", {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
				}
				if (input.classList.contains('_digital')) {
					input.classList.add('_mask');
					Inputmask("9{1,}", {
						"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
				}
				form_remove_error(input);
			});
			input.addEventListener('blur', function (e) {
				if (input.value == '') {
					input.value = input_g_value;
					input_focus_remove(input);
					if (input.classList.contains('_mask')) {
						input_clear_mask(input, input_g_value);
					}
					if (input.getAttribute('data-type') === "pass") {
						input.setAttribute('type', 'text');
					}
				}
			});
			if (input.classList.contains('_date')) {
				datepicker(input, {
					customDays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
					customMonths: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
					formatter: (input, date, instance) => {
						const value = date.toLocaleDateString()
						input.value = value
					},
					onSelect: function (input, instance, date) {
						input_focus_add(input.el);
					}
				});
			}
		}
	}
}
function input_placeholder_add(input) {
	const input_g_value = input.getAttribute('data-value');
	if (input.value == '' && input_g_value != '') {
		input.value = input_g_value;
	}
}
function input_focus_add(input) {
	input.classList.add('_focus');
	input.parentElement.classList.add('_focus');
}
function input_focus_remove(input) {
	input.classList.remove('_focus');
	input.parentElement.classList.remove('_focus');
}
function input_clear_mask(input, input_g_value) {
	input.inputmask.remove();
	input.value = input_g_value;
	input_focus_remove(input);
}


let quantityButtons = document.querySelectorAll('.quantity__button');
if (quantityButtons.length > 0) {
	for (let index = 0; index < quantityButtons.length; index++) {
		const quantityButton = quantityButtons[index];
		quantityButton.addEventListener("click", function (e) {
			let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
			if (quantityButton.classList.contains('quantity__button_plus')) {
				value++;
			} else {
				value = value - 1;
				if (value < 1) {
					value = 1
				}
			}
			quantityButton.closest('.quantity').querySelector('input').value = value;
		});
	}
}
//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
	sliders_bild_callback();
}

function sliders_bild_callback(params) {}

/* Проверяем есть блок со слайдом - через переменные достаем картинку слайда и добавляем в дотс */
if (document.querySelector('.mainslider')) {
	let mainslider = new Swiper('.mainslider__body', {
		/*
		effect: 'fade',
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		*/
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: true,
		speed: 800,
		//touchRatio: 0,
		//simulateTouch: false,
		//loop: true,
		//preloadImages: false,
		//lazy: true,
		// Dotts
		pagination: {
			el: '.mainslider__dotts',
			clickable: true,
		},
		/*// Arrows
		navigation: {
			nextEl: '.about__more .more__item_next',
			prevEl: '.about__more .more__item_prev',
		},
		*/

		on: {
			lazyImageReady: function () {
				ibg();
			},
		}
		// And if we need scrollbar
		//scrollbar: {
		//	el: '.swiper-scrollbar',
		//},
	});
	/* 	let mainsliderImages = document.querySelectorAll('.mainslider__image');
		let mainsliderDotts = document.querySelectorAll('.mainslider__dotts .swiper-pagination-bullet');

		for (let index = 0; index < mainsliderImages.length; index++) {
			const mainsliderImage = mainsliderImages[index].querySelector('img').getAttribute('src');
			mainsliderDotts[index].style.backgroundImage = "url('" + mainsliderImage + "')";

		} */
}

if (document.querySelector('.home-block')) {
	let homeslider = new Swiper('.home-block__item', {
		direction: 'vertical',
		effect: 'fade',
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: true,
		speed: 800,
		//touchRatio: 0,
		//simulateTouch: false,
		//loop: true,
		preloadImages: false,
		lazy: true,
		pagination: {
			el: '.home-block__pagination',
			clickable: true,
		},


		on: {
			lazyImageReady: function () {
				ibg();
			},
		}
	});
}

if (document.querySelector('.reviews-about__slider')) {
	let reviewsAbout = new Swiper('.reviews-about__items', {
		observer: true,
		observeParents: true,
		slidesPerView: 'auto',
		spaceBetween: 0,
		autoHeight: true,
		speed: 800,
		//touchRatio: 0,
		//simulateTouch: false,
		//loop: true,
		//preloadImages: false,
		//lazy: true,
		// Dotts
		pagination: {
			el: '.reviews-about__pagination',
			clickable: true,
		},
		// Arrows
		navigation: {
			nextEl: '.reviews-about__arrow_next',
			prevEl: '.reviews-about__arrow_prev',
		},


		on: {
			lazyImageReady: function () {
				ibg();
			},
		}
	});
}

if (document.querySelector('.single-portfolio')) {
	let portfolio = new Swiper('.single-portfolio__slider', {
		observer: true,
		observeParents: true,
		slidesPerView: 'auto',
		spaceBetween: 0,
		autoHeight: true,
		speed: 800,
		//touchRatio: 0,
		//simulateTouch: false,
		//loop: true,
		preloadImages: false,
		lazy: true,
		// Dotts
		// Arrows
		navigation: {
			nextEl: '.info-portfolio__arrow_next',
			prevEl: '.info-portfolio__arrow_prev',
		},
		on: {
			lazyImageReady: function () {
				ibg();
			},
		}
	});
}
if (document.querySelector('.content-blog__slider')) {
	let contentBlogSlider = new Swiper('.content-blog__slidies', {
		observer: true,
		observeParents: true,
		slidesPerView: 'auto',
		spaceBetween: 0,
		autoHeight: true,
		speed: 800,
		//touchRatio: 0,
		//simulateTouch: false,
		loop: true,
		preloadImages: true,
		lazy: true,
		// Dotts
		pagination: {
			el: '.content-blog__pagination',
			clickable: true,
		},
		// Arrows
		navigation: {
			nextEl: '.content-blog__arrow_next',
			prevEl: '.content-blog__arrow_prev',
		},
		on: {
			lazyImageReady: function () {
				ibg();
			},
		}
	});
}

document.querySelector('.aside-block__label').addEventListener('click', _ => {
	document.querySelector('.menu__body').classList.toggle('_active');
});



// Инициализая секции с которой работаем
let grid = new Isotope('.work-portfolio__items', {
	itemSelector: '.work-portfolio__item',
	layoutMode: 'fitRows',
	percentPosition: true,
	transitionDuration: '0.8s'
});

// Работаем с кнопками фильтров
let filterBtn = document.querySelectorAll('.work-portfolio__list .work-portfolio__link');
for (let i = 0; i < filterBtn.length; i++) {
	// Если кликнули по ссылке
	filterBtn[i].onclick = function (click) {
		// Отменяем переход
		click.preventDefault();
		// Получаем значение дата-атрибута кнопки
		let filterData = event.target.getAttribute('data-filter');
		// Применяем фильтрацию элементов в Isotope
		grid.arrange({
			filter: filterData
		});
	};
}

let asideBlogBurger = document.querySelector('.aside-blog__burger');
let asideBlogBody = document.querySelector('.aside-blog__content');

asideBlogBurger.addEventListener("click", function (e) {
	asideBlogBurger.classList.toggle('_active');
	_slideToggle(asideBlogBody);
});

