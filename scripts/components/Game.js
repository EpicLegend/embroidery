import Grid from "./Grid.js";
import Palette from "./Palette.js";
import Camera from "./Camera.js";
import SaveLoadGame from "./SaveLoadGame.js";

export default class Game {
	/*
		Основной блок кода
		- все остальные компоненты лишь работают внутри себя и данные получают из основного кода
	*/
	constructor(parent, settings, app) {

		this.app = app;
		this.parent = parent;
		this.settings = settings;
		this.cells = [];
		this.camera = new Camera();
		// Grid(ширина грида, высота грида, ширина приложения[канваса], высота приложения[канваса], канвас, размер одного блока)
		this.grid = new Grid(this.settings.widthGrid, this.settings.heightGrid, this.settings.sizeBlock, this.app.screen.width, this.app.screen.height , this.app );
		// SaveLoadGame(что сохраняем, куда  )
		new SaveLoadGame(this.cells, );

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


		

		
	}
}



