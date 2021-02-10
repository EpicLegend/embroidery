import Grid from "./Grid.js";
import Palette from "./Palette.js";
import Camera from "./Camera.js";

export default class Game {
	/*
		Основной блок кода
		- все остальные компоненты лишь работают внутри себя и данные получают из основного кода
	*/
	constructor(parent, settings, app) {

		this.app = app;
		this.parent = parent;
		this.settings = settings;
		this.camera = new Camera();
		// Grid(ширина грида, высота грида, ширина приложения[канваса], высота приложения[канваса], канвас, размер одного блока)
		this.grid = new Grid(this.settings.widthGrid, this.settings.heightGrid, this.settings.sizeBlock, this.app.screen.width, this.app.screen.height , this.app );

		//запуск игры
		this.start();
	}

	start() {
		
		let state = play;

		this.app.ticker.add( delta => gameLoop( delta ) );
		function gameLoop(delta) {
			state( delta );
		}

		function play(delta) {
		}

		// Palette(appendChild, colors[type array])
		let palette1 = new Palette("#game", ["8B0000", "C71585", "FF4500", "9400D3", "48D1CC"]);
		palette1.drawUI();

		ui();
		function ui() {

			

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


		function handlerClick (e, pointx, pointy) {
			if ( settings.selectedColor === null ) {
				console.log("клика не будет!");
				return false;
			}

			cells.forEach((item, index) => {
				if( item.id == `${pointx.toString()}x${pointy.toString()}` ) {

					let graphics = new PIXI.Graphics();
					graphics.beginFill( `0x${settings.selectedColor}` );
					graphics.drawRect( 0, 0, 32, 32);
					graphics.endFill();
					graphics.position.set( e.target.x, e.target.y );
					
					graphics.interactive = true;
					graphics.buttonMode = true;
					graphics.on("pointerdown", function (e) {
						handlerClick(e, pointx, pointy);
					});

					containerGraphics.addChild( graphics );
					containerGraphics.swapChildren( graphics, containerGraphics.children[ index ] );
					containerGraphics.removeChildAt( containerGraphics.children.length - 1 );
				}
			});
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


		function saveProgress() {
			
			/*
				сохранение прогресса игры
				с помощью JSON
				{
					id: id ячейки
					fill: true/false закрасили ячейку или нет
					fillCorrectly: true/false закрасили ячейку верно или нет
					fillColor: цвет ячейки в шестнадцатеричном формате(без начальных символов| #123ABC = 123ABC)
					obj: ячейка/объект от pixi.js
				}
			*/
			let saveData = [];
			cells.forEach((item)=> {
				
				// копировать переменные 
				// чтобы не повредить данные в текущей сессии
				// * todo можно оптимизировать копирование, но сейчас и так сойдет
				var tmpCell = Object.assign({}, item);
				tmpCell.obj = null;
				saveData.push( tmpCell );

			});

			/*
				куда выгружать сохранение
			*/
			localStorage.setItem( 'saveData', JSON.stringify(saveData) );
		}

		function loadProgress() {
			
			let loadData = JSON.parse( localStorage.getItem('saveData') );

			// очистить канвас и контейнер с данными
			containerGraphics.destroy( {children:true, texture:true, baseTexture:true} );
			containerGraphics = new Container();
			cells = [];

			/*
				разбор JSON и проецировать на canvas
			*/

			const n = Math.round( settings.widthGrid / settings.sizeBlock );
			const k = Math.round( settings.heightGrid / settings.sizeBlock );

			let fill, fillCorrectly, fillColor;

			let indexData = 0;
			for(let i = 0; i < n; i++) {

				for(let j = 0; j < k; j++) {

					fill = loadData[indexData].fill;
					fillCorrectly = loadData[indexData].fillCorrectly;
					fillColor = loadData[indexData].fillColor;

					//console.log(1, fillColor);

					let graphics = new PIXI.Graphics();

					if( fillColor === null ) {
						graphics.beginFill( 0xDE3249 );
					} else {
						graphics.beginFill( `0x${fillColor}` );
					}
					graphics.drawRect( (i * 32) + (1 * i), (j * 32) + (1 * j), 32, 32);
					graphics.endFill();
					
					graphics.interactive = true;
					graphics.buttonMode = true;
					graphics.on("pointerdown", function (e) {
						handlerClick(e, i, j);
					});
					
					cells.push({
						id: `${i.toString()}x${j.toString()}`,
						fill: fill,
						fillCorrectly: fillCorrectly,
						fillColor: fillColor,
						obj: graphics
					});
					
					containerGraphics.addChild( graphics );
					indexData++;

				}

			}

			// центрируем сетку
			containerGraphicsCentered();

			app.stage.addChild( containerGraphics );

		}
	}
}



