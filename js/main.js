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

var fixed_block = function (fixblock_pos, i, hgth_px, hght_vh_min, item) {
	"use strict";
	fixblock_pos[i] = hgth_px[i] - window.innerHeight / 100 * hght_vh_min[i]; //из пиксельной высоты элемента вычитаем высоту экрана умноженную на остаток высоты блока до верха, к примеру блок высотой 90% высоты экрана, от него остается 10%. как раз они и вычитаются. забыл уже для чего, по другому не работает
	if ($(window).scrollTop() >= fixblock_pos[i]) { //если пользователь прокрутил до этой позиции..
		$(item).css('position', 'fixed'); //добавляем ему в стиль fixed
		$(item).css('top', hght_vh_min[i] + 'vh'); //так же пишем ему позицию, где он будет стоять. всё просто, верхняя точка - оставшееся от блока место
	} else { //если скроллбар ничего лочить не должен, то заебись..
		$(item).css('position', ''); //очищаем лишние стили
		$(item).css('top', '');
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
		hght_vh_min = []; //оставшаяся от блока высота в процентах
	arr.forEach(function (item, i, arr) { //для всех полученных элементов единожды запускаем, которая...
		hgth_px[i] = $(arr[i]).position().top; //берет позицию элемента  по высоте в пикселях и...
		top_vh[i] = Math.round($(item).position().top / $(window).height() * 100); //получаем само положение элемента по высоте, но уже в vh (процентах)
		hght_vh[i] = Math.round($(item).height() / $(window).height() * 100); //так же и с высотой элемента
		hght_vh_min[i] = 100 - hght_vh[i]; //из 100% высоты экрана вычитаем место, которое способен занять элемент и получаем остаток от блока. нужен для фиксирования позиции элемента

		$(window).resize(function () { //и при изменении размера окна (ебучий ведроид)
			hgth_px[i] = window.innerHeight / 100 * top_vh[i]; //пишем отдельную переменную под высоту элемента. пока ебался с остальным забыл зачем нужна, но без неё не работает.		в общем, не трогать
			fixed_block(fixblock_pos, i, hgth_px, hght_vh_min, item); //вызов функции при изменении размера окна. нужно для того чтобы всё к хуям не сломалось при ресайзе
		});
		$(window).scroll(function () { //при прокрутке страницы
			fixed_block(fixblock_pos, i, hgth_px, hght_vh_min, item); //основной вызов функции, но уже при прокрутке. 
		});
	});
});