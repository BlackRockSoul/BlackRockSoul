/*jslint browser: true*/
/*global $, jQuery, alert*/

setInterval(function () {
	"use strict";
	$('#home_main_2').animate({
		'opacity': 1
	}, 1e3).delay(7e3).animate({
		'opacity': 0
	}, 1e3).delay(7e3);
}, 5e3);

$(document).ready(function () {
	"use strict";
	jQuery.scrollSpeed(80, 2000);
	scrollTo(0, 0);
	$('#main_sub > li > a')[0].className = 'main_menu_active';
	$('.sub_text2').slick();
});

var pos = [],
	ost_blck = [];

var fixed_block = function (i, hgth_px, hght_vh_min, item, fixed) {
	"use strict";
	var fixblock_pos = [],
		style_fixed = { //определяем стиль блокировки элемента
			position: "fixed",
			top: hght_vh_min[i] + 'vh'
		},
		style_unlock = { //тоже самое для удаления стилей с элемента
			position: "",
			top: ""
		};

	if (fixed[i] === 'unlocked') {
		fixblock_pos[i] = hgth_px[i] - window.innerHeight / 100 * hght_vh_min[i]; //из пиксельной высоты элемента вычитаем высоту экрана умноженную на остаток высоты блока до верха, к примеру блок высотой 90% высоты экрана, от него остается 10%. как раз они и вычитаются. забыл уже для чего, по другому не работает
		if ($(window).scrollTop() >= fixblock_pos[i]) { //если пользователь прокрутил до этой позиции..
			$(item).css(style_fixed);
			fixed[i] = 'locked';
		}
	} else {

		if (fixed[i] === 'locked') {
			fixblock_pos[i] = hgth_px[i] - window.innerHeight / 100 * hght_vh_min[i];
			if (($(window).scrollTop() < fixblock_pos[i]) && ($(item).css('position') === 'fixed')) { //если пользователь прокрутил до этой позиции..
				$(item).css(style_unlock); //очищаем лишние стили
				fixed[i] = 'unlocked';
			}
		}
	}
};

var scroller = function (i, item, hgth_px, hght_vh_min) {
	"use strict";
	var fixblock_pos = [],
		top_vh = [];
	fixblock_pos[i] = hgth_px[i] - window.innerHeight / 100 * hght_vh_min[i];
	top_vh[i] = Math.round($(item).position().top / $(window).height() * 100);
	if ((top_vh[i] !== hght_vh_min[i]) && ($(window).scrollTop() > 30)) {
		$('html, body').animate({
			scrollTop: $(item).offset().top
		}, 1500);
	}


};

$(function () {
	"use strict";
	var arr = document.querySelectorAll('.sub_block1'), //получаем все элементы с нужным классом
		mon_hght = window.innerHeight, //получаем высоту экрана пользователя !один раз! для вычислений относительных значений высоты и положения элементов
		fixblock_pos = [], //тут пока всё понятно, раньше объяснил
		top_vh = [], //положение элемента по высоте в процентах (на самом деле без, только тсс..)
		hght_vh = [], //высота в процентах. просто числом, на которое нужно что-то умножить
		hgth_px = [], //высота, только в пикселях
		hght_vh_min = [], //оставшаяся от блока высота в процентах
		fixed = [],
		zu = 0,
		i;

	for (i = 0; i < arr.length; i += 1) { //для всех полученных элементов единожды запускаем, которая...
		var item = arr[i],
			waypoint_text = new Waypoint({
				element: document.getElementById($(item).attr("id")),
				handler: function (direction) {
					$(arr[zu]).children().animate({
						opacity: 1,
						left: '50%',
						top: '50%'
					}, 1500);
					zu += 1;
				},
				offset: '75%'
			});
		hgth_px[i] = Math.round($(item).position().top); //берет позицию элемента  по высоте в пикселях и...
		top_vh[i] = Math.round($(item).position().top / window.innerHeight * 100); //получаем само положение элемента по высоте, но уже в vh (процентах)
		hght_vh[i] = Math.round($(item).height() / window.innerHeight * 100); //так же и с высотой элемента
		hght_vh_min[i] = 100 - hght_vh[i]; //из 100% высоты экрана вычитаем место, которое способен занять элемент и получаем остаток от блока. нужен для фиксирования позиции элемента
		//[i] = false;
		fixblock_pos[i] = hgth_px[i] - window.innerHeight / 100 * hght_vh_min[i];
		window.ost_blck[i] = fixblock_pos[i];

		fixed[i] = 'unlocked';

	}
	$(window).resize(function () { //и при изменении размера окна (ебучий ведроид)
		for (i = 0; i < arr.length; i += 1) {
			var item = arr[i];
			hgth_px[i] = window.innerHeight / 100 * top_vh[i]; //пишем отдельную переменную под высоту элемента. пока ебался с остальным забыл зачем нужна, но без неё не работает.		в общем, не трогать
			fixblock_pos[i] = hgth_px[i] - window.innerHeight / 100 * hght_vh_min[i];
			window.ost_blck[i] = fixblock_pos[i];
			fixed_block(i, hgth_px, hght_vh_min, item, fixed); //вызов функции при изменении размера окна. нужно для того чтобы всё к хуям не сломалось при ресайзе
		}
	});

	function remClass() {
		$('#main_sub > li > a').each(
			function () {
				$(this).removeClass();
			}
		);
	}

	$(window).scroll(function () { //при прокрутке страницы
		var item = [];
		for (i = 0; i < arr.length; i += 1) {
			item = arr[i];

			if ($(window).scrollTop() >= window.ost_blck[i] - 30) {
				if (i !== 4) {
					remClass();
					try {
						$('#main_sub > li > a')[i + 1].className = 'main_menu_active';
					} catch (errrr) {}
				}
			} else {
				if ($(window).scrollTop() < window.ost_blck[0] - 30) {
					remClass();
					$('#main_sub > li > a')[0].className = 'main_menu_active';
				}
			}
			fixed_block(i, hgth_px, hght_vh_min, item, fixed); //основной вызов функции, но уже при прокрутке.
		}

	});
});

var moveTo_block = function (block_num) {
	"use strict";
	if (block_num !== -1) {
		$('html, body').animate({
			scrollTop: window.ost_blck[block_num]
		}, 1000);
	} else {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	}

};
