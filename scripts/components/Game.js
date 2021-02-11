import Grid from "./Grid.js";
import Palette from "./Palette.js";
import Camera from "./Camera.js";
import SaveLoadGame from "./SaveLoadGame.js";
import Score from "./Score.js";

export default class Game {

	/*
		Основной блок кода
		- все остальные компоненты лишь работают внутри себя и данные получают из основного кода
	*/

	constructor(parent, settings, app) {

		this.app = app;
		this.parent = parent;
		this.settings = settings;

		this.score = new Score("#game");
		this.gameData = {
			cells: [],
			containerGraphics: null,
			score: this.score
		}

		this.camera = new Camera();		
		// Palette(appendChild, colors[type array])
		this.palette = new Palette("#game", ["8B0000", "C71585", "FF4500", "9400D3", "48D1CC"]);
		// Grid(ширина грида, высота грида, ширина приложения[канваса], высота приложения[канваса], канвас, размер одного блока)
		this.grid = new Grid( this.settings, this.app, this.gameData, this.palette );
		// SaveLoadGame(что сохраняем, куда(данные игры)  )
		new SaveLoadGame( this.gameData, this.settings, this.grid );

		//запуск игры
		this.start();

	}

	start() {
		
		this.app.ticker.add( delta => this.gameLoop( delta ) );
		
	}

	gameLoop( delta ) {

		if ( this.camera.nowZoom != this.camera.oldZoom  ) {
			this.gameData.containerGraphics.scale.set( this.camera.scrollEvent() );
			this.grid.containerGraphicsCentered();
		}

	}

	resize() {

		this.grid.containerGraphicsCentered();

		this.settings.widthApp = window.innerWidth;
		this.settings.heightApp = window.innerHeight;
		this.app.renderer.resize( this.settings.widthApp, this.settings.heightApp );
		
	}
}



