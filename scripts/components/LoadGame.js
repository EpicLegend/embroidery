export default class LoadGame {

	constructor(gameData, settings, grid) {

		this.gameData = gameData;
		this.settings = settings;
		this.grid = grid;

	}

	load() {

		let loadData;

		if ( localStorage.hasOwnProperty('saveData') ) {

			loadData = JSON.parse( localStorage.getItem('saveData') );

		} else {
			
			this.loadError();
			return false;

		}		
		
		this.grid.downloadedGrid(loadData);

	}

	loadError() {
		console.log( "Данных нет в localstorage!" );
	}

}