/*

1) Закрашивание изображения N*M
	- N <= 500 px
	- M <= 500 px
	- Закрашивание по номерам
	- Каждый номер это спрайт или прямоугольник размером K px
	- K = 32 px
2) Цветовая палитра
	- палитра из C цветов
	- у С нет ограничений
3) Масштабирование
	- Приблизить/отдалить изображение
4) Загрузка и сохранение
	- подумать о оптимизации сохранения
5) ** Загрузка картинки и квантование цветов пикселей к палитре

пример 1 - https://www.youtube.com/watch?v=S4C05RYlw3Y&ab_channel=MCCHEMODAN
пример 2 - https://www.youtube.com/watch?v=mldeWaDA8q4&ab_channel=MCCHEMODAN
пример 3 - https://www.youtube.com/watch?v=d-ah72hxgD8&ab_channel=MCCHEMODAN

Теория
	- создается изображение N*M из пикслеей размером K = 32px

	- Интерфейс палитры
	- Группа пикселей из N*M соответвствует цвету из палитры C

	- интерфейс кнопок управления
	- Приблизить  и отдалить на кнопки.

	- интерфейс сохранения и загрузки
	- сохранить/загрузить игру

*/

import Settings from "./components/Settings.js";
import Game from "./components/Game.js";

//Settings(width[ширина 'картинки'], height[высота 'картинки'], sizeBlock, selectedColor = null)
let settings = new Settings( 100, 100, 32, window.innerWidth, window.innerHeight );

let app = new PIXI.Application({
	width: settings.widthApp,
	height: settings.heightApp,
	antialias: true,
	resizeTo: window
});
document.body.appendChild( app.view );

let game = new Game(document, settings, app);

window.addEventListener("resize", () => {

	game.resize();

});