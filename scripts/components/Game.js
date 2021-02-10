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
		this.gameData = {
			cells: [],
			containerGraphics: null,
		}
		this.camera = new Camera();
		// Palette(appendChild, colors[type array])
		this.palette = new Palette("#game", ["8B0000", "C71585", "FF4500", "9400D3", "48D1CC"]);
		this.palette.drawUI();
		// Grid(ширина грида, высота грида, ширина приложения[канваса], высота приложения[канваса], канвас, размер одного блока)
		this.grid = new Grid( this.settings, this.app, this.gameData, this.palette );
		// SaveLoadGame(что сохраняем, куда(данные игры)  )
		new SaveLoadGame( this.gameData );

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



