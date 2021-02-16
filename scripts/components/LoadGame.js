export default class LoadGame {

	constructor(gameData, settings, grid) {

		this.gameData = gameData;
		this.settings = settings;
		this.grid = grid;

	}

	load(type) {


		// куда сохранять
		switch(type) {
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

		
		if ( localStorage.hasOwnProperty('saveData') ) {

			loadData = JSON.parse( localStorage.getItem('saveData') );

		} else {
			
			this.loadError();
			return false;

		}
		console.log("Загрузка локально", loadData);
		
		this.grid.downloadedGrid(loadData);

	}

	inServerLoad() {

		console.log("Загрузка с сервер");
		
	}

}