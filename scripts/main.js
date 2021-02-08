
/*

1) Закрашивание изображения N*M
	- N <= 500 px
	- M <- 500 px
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

Фичи:
1) Ачивки
2) Очки
3) Эффекты

*/

/*

Теория
	- создается изображение N*M из пикслеей размером K = 32px

	- Интерфейс палитры
	- Группа пикселей из N*M соответвствует цвету из палитры C

	- интерфейс кнопок управления
	- Приблизить  и отдалить на кнопки.

	- интерфейс сохранения и загрузки
	- сохранить/загрузить игру

*/

class Settings {
	constructor() {
		this.sizeBlock = 32;
		this.widthGrid = 321;
		this.heightGrid = 329;
		this.widthApp = window.innerWidth;
		this.heightApp = window.innerHeight;
		this.selectedColor = null;

		console.log( this );
	}
}
let settings = new Settings();

class Camera {
	constructor(zoom = 1) {
		this.nowZoom = zoom;
		this.oldZoom = this.nowZoom;
		this.defaultZoom = 1;
	}

	scroll (a) {
		console.log(`this.nowZoom(${this.nowZoom}) + a(${a}) = `, this.nowZoom + a);
		if ( this.nowZoom + a <= 1 ) {
			this.nowZoom = this.defaultZoom;
		} else {
			this.nowZoom = this.nowZoom + a;
		}
		
		// console.log( this.nowZoom );

	}

	scrollEvent() {
		this.oldZoom = this.nowZoom;		
		return this.nowZoom;
	}
}
const camera = new Camera();


// class Game {
// 	constructor() {
// 		this.isWin = false;
// 	}
// }

// class Canvas {
// 	constructor() {
		
// 	}
// }


let Application			= PIXI.Application,
	Container			= PIXI.Container,
	loader				= PIXI.loader,
	resources			= PIXI.loader.resources,
	Graphics			= PIXI.Graphics,
	TextureCache		= PIXI.utils.TextureCache,
	Sprite				= PIXI.Sprite,
	Text				= PIXI.Text,
	TextStyle			= PIXI.TextStyle;


let app = new Application({
	width: settings.widthApp,
	height: settings.heightApp,
	antialias: true,
	resizeTo: window
});
document.body.appendChild( app.view );



state = play;
app.ticker.add( delta => gameLoop( delta ) );
function gameLoop(delta) {
	state( delta );
}

function play(delta) {

	// console.log(delta);

	if ( camera.nowZoom != camera.oldZoom  ) {
		containerGraphics.scale.set( camera.scrollEvent() );
		containerGraphicsCentered();
	}
	
}






let palette = [
	{
		title: "a",
		color: "8B0000",
	},
	{
		title: "б",
		color: "C71585",
	},
	{
		title: "в",
		color: "FF4500",
	},
	{
		title: "г",
		color: "9400D3",
	},
	{
		title: "д",
		color: "48D1CC",
	},
];


ui();
function ui() {

	// palette
	const blockPalette = document.createElement("div");
	blockPalette.id = "palette";

	const titlePalette = document.createElement("span");
	titlePalette.innerHTML = "Палитра:";
	blockPalette.appendChild( titlePalette );

	const wrapper = document.createElement("div");
	wrapper.classList.add( "palette-wrapper" );

	palette.forEach( (item)=>{
		const btn = document.createElement("button");
		btn.classList.add("palette-item");

		btn.innerHTML = item.title;
		btn.style.backgroundColor = `#${item.color}`;

		btn.addEventListener("click", () => {
			settings.selectedColor = item.color;
		});

		wrapper.appendChild( btn );
	} );

	blockPalette.appendChild( wrapper );

	document.body.appendChild( blockPalette );

	// resize picture
	const blocResize = document.createElement("div");
	blocResize.id = "resize";

	const titleResize = document.createElement("span");
	titleResize.innerHTML = "Размер:";
	blocResize.appendChild( titleResize ); 

	const btnInc = document.createElement("button");
	btnInc.classList.add( "resize-inc" );
	btnInc.innerHTML = "+";
	blocResize.appendChild( btnInc ); 
	btnInc.addEventListener("click", () => {
		camera.scroll(2);
	});

	const btnDec = document.createElement("button");
	btnDec.classList.add( "resize-dec" );
	btnDec.innerHTML = "-";
	blocResize.appendChild( btnDec );
	btnDec.addEventListener("click", () => {
		camera.scroll(-2);
	});

	document.body.appendChild( blocResize );

	// load/save game
	let wrapperSD = document.createElement("div");
	wrapperSD.id = "wrapper-save-load";

	let btnSave = document.createElement("button");
	btnSave.innerHTML = "Сохранить";
	btnSave.classList.add("btn-save");
	btnSave.addEventListener( "click", saveProgress );
	wrapperSD.appendChild( btnSave );

	let btnLoad = document.createElement("button");
	btnLoad.innerHTML = "Загрузить";
	btnLoad.classList.add("btn-load");
	btnLoad.addEventListener( "click", loadProgress );
	wrapperSD.appendChild( btnLoad );

	document.body.appendChild( wrapperSD );

}

let cells = [];

// let palette = {
// 	alphabet: [ "а", "б", "в", "г", "д", "е", "ё",
// 				"ж", "з", "и", "й", "к", "л", "м",
// 				"н", "о", "п", "р", "с", "т", "у",
// 				"ф", "х", "ц", "ч", "ш", "щ", "ъ",
// 				"ы", "ь", "э", "ю", "я"],
// 	cellColors: ['8B0000', "C71585", "FF4500", "9400D3", "48D1CC"]
// }
// let graphicsElementCollection = [];

let containerGraphics = new Container();
drawGrid( settings.widthGrid, settings.heightGrid );
function drawGrid(widthPicture, heightPicture) {
	// создает сетку из графических примитивов
	// на основе width и heiight изображения
	// если width || height не делится целиком на K
	// то округление к ближайшему числу 321/32 = 10

	// Ячейка формируется на основе правил разбиения цвета картинки


	// кол-во ячеек по горизонтали в изображение
	const n = Math.round( widthPicture / settings.sizeBlock );
	// кол-во ячеек по вертикали в изображение
	const k = Math.round( heightPicture / settings.sizeBlock );

	// создаем сетку 
	for(let i = 0; i < n; i++) {

		for(let j = 0; j < k; j++) {

			let graphics = new PIXI.Graphics();

			graphics.beginFill(0xDE3249);
			graphics.drawRect( (i * 32) + (1 * i), (j * 32) + (1 * j), 32, 32);
			graphics.endFill();
			
			graphics.interactive = true;
			graphics.buttonMode = true;
			graphics.on("pointerdown", function (e) {
				handlerClick(e, i, j);
			});
			
			cells.push({
				id: `${i.toString()}x${j.toString()}`,
				fill: false,
				fillCorrectly: null,
				fillColor: null,
				obj: graphics
			});

			
			containerGraphics.addChild( graphics );

		}

	}

	// console.log( graphicsElementCollection );

	// центрируем сетку
	containerGraphicsCentered();

	app.stage.addChild( containerGraphics );
}

function handlerClick (e, pointx, pointy) {
	if ( settings.selectedColor === null )
		return false;

	cells.forEach((item) => {
		if( item.id == `${pointx.toString()}x${pointy.toString()}` ) {
			item.fill = true;
			item.fillColor = settings.selectedColor;
		}
	});

	e.target.tint = `0x${settings.selectedColor}`;
	console.log( cells, settings.selectedColor );
}

function randomInteger(min, max) {
	// случайное число от min до (max+1)
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}

window.addEventListener("resize", () => {
	resize();
});

function resize() {
	// центрируем сетку
	containerGraphicsCentered();

	settings.widthApp = window.innerWidth;
	settings.heightApp = window.innerHeight;
	app.renderer.resize(settings.widthApp, settings.heightApp);
}

function containerGraphicsCentered() {

	console.log("containerGraphicsCentered");
	containerGraphics.x =  (app.screen.width / 2) - (containerGraphics.width / 2);
	containerGraphics.y =  (app.screen.height / 2) - (containerGraphics.height / 2);
}

function saveProgress() {
	
	/*
		сохранение прогресса игры
		с помощью JSON
		{
			id: id ячейки
			fill: true/false закрасили ячейку или нет
			fillCorrectly: true/false закрасили ячейку верно или нет
			fillColor: цвет ячейки в шестнадцатеричном формате(без начальных символов| #123ABC = 123ABC)
		}
	*/



	/*
		куда выгружать сохранение
	*/
	const saveData = [];
	cells.forEach((item)=> {
		// item.obj = null;
		var obj = item;
		var copy = Object.assign({}, obj);
		console.log(copy);
		// копировать переменные 
		// чтобы не повредить данные в текущей сессии
		saveData.push( item );
	});
	console.log( "cells[0]", cells[0] );

	
	// localStorage.setItem( '', JSON.stringify(saveData) );
	// console.log( JSON.parse( localStorage.getItem('') ) ); 
}

function loadProgress() {

	//console.log( JSON.parse( localStorage.getItem('') ) ); 

	// for(let key in localStorage) {
	// 	if (!localStorage.hasOwnProperty(key)) {
	// 		continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
	// 	  }
	// 	alert(`${key}: ${localStorage.getItem(key)}`);
	// }
	/*
		загрузка прогресса игры
		с помощью JSON
		{
			id: id ячейки
			fill: true/false закрасили ячейку или нет
			fillCorrectly: true/false закрасили ячейку верно или нет
			fillColor: цвет ячейки в шестнадцатеричном формате(без начальных символов| #123ABC = 123ABC)
		}
	*/

	/*
		разбор JSON и проецировать на canvas
	*/

}


// let state, scoreBar, value = 0, score, target, gameScene,
// 	id, bg, timer = 10, targetClick = true;

// loader
// 	.add("images/atlas.json")
// 	.load( setup );

// function setup() {
// 	id = resources["images/atlas.json"].textures;

// 	gameScene = new Container();
// 	app.stage.addChild( gameScene );

// 	bg = new Sprite( id["background.png"] );
// 	bg.anchor.set(0, 0);
// 	gameScene.addChild( bg );

// 	let scoreBar = new Container();
// 	scoreBar.position.set( app.stage.width / 2 - scoreBar.width / 2, 22 );
// 	gameScene.addChild( scoreBar );

// 	let bgScoreBar = new Sprite( id["score.png"] );
// 	scoreBar.addChild( bgScoreBar );

// 	let style = new TextStyle({
// 		fontFamily: "Arial",
// 		fontSize: 28,
// 		fill: "white",
// 	});

// 	score = new Text( "0", style );
// 	score.x = -score.width / 2;
// 	score.y = -score.height / 2 - 1;
// 	scoreBar.addChild( score );

// 	target = new Sprite( id["cookie.png"] );
// 	target.x = gameScene.width / 2;
// 	target.y = gameScene.height / 2;
// 	target.interactive = true;
// 	target.buttonMode = true;
// 	target.on("pointerdown", handlerClick);
// 	gameScene.addChild( target );

// 	state = play;
// 	app.ticker.add( delta => gameLoop( delta ) );
// }

// function gameLoop(delta) {
// 	state( delta );
// }

// function play() {
// 	if ( timer == 0 ) {
// 		targetClick = true;

// 		target.scale.x = 1;
// 		target.scale.y = 1;
// 	} else if ( timer > 0 ) {
// 		timer--;
// 	}
// }

// function handlerClick () {
// 	if ( targetClick ) {
// 		value++;
// 		score.text = value;

// 		score.x = -score.width / 2;
// 		score.y = -score.height / 2;

// 		target.scale.x = 0.95;
// 		target.scale.y = 0.95;

// 		targetClick = false;

// 		timer = 10;
// 	}
// }