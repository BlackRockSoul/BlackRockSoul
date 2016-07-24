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


$(function () {
	"use strict";
	$('#main_sub > li > a').each(function () {
		if ($(this).attr('href') === window.location.pathname) {
			$(this).addClass('main_menu_active');
		}
	});
});

var fixed_block = function (i, hgth_px, hght_vh_min, item, style_fixed, style_unlock) {
	"use strict";
	var fixblock_pos = [];

	fixblock_pos[i] = hgth_px[i] - window.innerHeight / 100 * hght_vh_min[i]; //из пиксельной высоты элемента вычитаем высоту экрана умноженную на остаток высоты блока до верха, к примеру блок высотой 90% высоты экрана, от него остается 10%. как раз они и вычитаются. забыл уже для чего, по другому не работает
	if (($(window).scrollTop() >= fixblock_pos[i]) && ($(item).css('position') !== 'fixed')) { //если пользователь прокрутил до этой позиции..
		$(item).css(style_fixed);
	}
	if (($(window).scrollTop() < fixblock_pos[i]) && ($(item).css('position') === 'fixed')) { //если пользователь прокрутил до этой позиции..
		$(item).css(style_unlock); //очищаем лишние стили
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
		shoved = []; //

	arr.forEach(function (item, i, arr) { //для всех полученных элементов единожды запускаем, которая...
		hgth_px[i] = $(arr[i]).position().top; //берет позицию элемента  по высоте в пикселях и...
		top_vh[i] = Math.round($(item).position().top / window.innerHeight * 100); //получаем само положение элемента по высоте, но уже в vh (процентах)
		hght_vh[i] = Math.round($(item).height() / window.innerHeight * 100); //так же и с высотой элемента
		hght_vh_min[i] = 100 - hght_vh[i]; //из 100% высоты экрана вычитаем место, которое способен занять элемент и получаем остаток от блока. нужен для фиксирования позиции элемента
		shoved[i] = false;
		fixblock_pos[i] = hgth_px[i] - window.innerHeight / 100 * hght_vh_min[i];
		var style_fixed = { //определяем стиль блокировки элемента
				position: "fixed",
				top: hght_vh_min[i] + 'vh'
			},
			style_unlock = { //тоже самое для удаления стилей с элемента
				position: "",
				top: ""
			};

		$(window).resize(function () { //и при изменении размера окна (ебучий ведроид)
			hgth_px[i] = window.innerHeight / 100 * top_vh[i]; //пишем отдельную переменную под высоту элемента. пока ебался с остальным забыл зачем нужна, но без неё не работает.		в общем, не трогать
			fixed_block(i, hgth_px, hght_vh_min, item, style_fixed, style_unlock); //вызов функции при изменении размера окна. нужно для того чтобы всё к хуям не сломалось при ресайзе
			fixblock_pos[i] = hgth_px[i] - window.innerHeight / 100 * hght_vh_min[i];
		});
		$(window).scroll(function () { //при прокрутке страницы


			if (($(window).scrollTop() >= fixblock_pos[i] - mon_hght * 0.3) && (shoved[i] === false)) {
				$(item).children().animate({
					opacity: 1,
					left: 0,
					top: 0
				}, 1500);
				shoved[i] = true;
			}


			fixed_block(i, hgth_px, hght_vh_min, item, style_fixed, style_unlock); //основной вызов функции, но уже при прокрутке.
		});
	});
});
