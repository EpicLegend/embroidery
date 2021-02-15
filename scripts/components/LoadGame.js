import Config from "./Config.js";

export default class LoadGame {

	constructor(gameData, settings, grid) {

		this.gameData = gameData;
		this.settings = settings;
		this.grid = grid;

	}

	load() {

		const config = new Config();

		// куда сохранять
		switch(config.typeSaveGame) {
			case "local": 
				this.inLocalStorageLoad();
				break;
			case "server":
				this.inServerLoad();
				break;
			default:
				break;
		}
		
	}

	loadError() {
		console.log( "Данных нет в localstorage!" );
	}

	inLocalStorageLoad() {

		let loadData;

		console.log("Загрузка локально", this.saveData);
		if ( localStorage.hasOwnProperty('saveData') ) {

			loadData = JSON.parse( localStorage.getItem('saveData') );

		} else {
			
			this.loadError();
			return false;

		}		
		
		this.grid.downloadedGrid(loadData);

	}

	inServerLoad() {

		console.log("Загрузка с сервер");
		
	}

}