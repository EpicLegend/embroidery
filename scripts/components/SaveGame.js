export default class SaveGame {
	constructor(gameData) {

		this.gameData = gameData;
		this.saveData = [];

		// можно удалить, но сейчас пусть будет здесь
		this.typeSave = ["local", "server"];
		
	}

	save(typeSave) {		
		
		this.gameData.cells.forEach((item)=> {
			
			// копировать переменные 
			// чтобы не повредить данные в текущей сессии
			// * todo можно оптимизировать копирование, но сейчас и так сойдет
			var tmpCell = Object.assign({}, item);
			tmpCell.obj = null;
			this.saveData.push( tmpCell );

		});

		// куда сохранять
		switch(typeSave) {
			case "local": 
				this.inLocalStorageSave();
				break;
			case "server":
				this.inServerSave();
				break;
			default:
				break;
		}

	}

	inLocalStorageSave() {
		console.log("сохраняем локально");
		localStorage.setItem( 'saveData', JSON.stringify( this.saveData ) );
	}

	inServerSave() {
		console.log("сохраняем на сервер");
	}
}