import SaveGame from "./SaveGame.js";
import LoadGame from "./LoadGame.js";

export default class SaveLoadGame {
	constructor(gameData) {

		/*
			Работает только с сохранением массива объектов
			
			сохранение и загрузка прогресса игры
			с помощью JSON
			{
				id: id ячейки
				fill: true/false закрасили ячейку или нет
				fillCorrectly: true/false закрасили ячейку верно или нет
				fillColor: цвет ячейки в шестнадцатеричном формате(без начальных символов| #123ABC = 123ABC)
				obj: ячейка/объект от pixi.js
			}
		*/

		// load/save game
			let wrapperSD = document.createElement("div");
			wrapperSD.id = "wrapper-save-load";

			this.saveGame = new SaveGame(gameData);
			let btnSave = document.createElement("button");
			btnSave.innerHTML = "Сохранить";
			btnSave.classList.add("btn-save");
			btnSave.addEventListener( "click", ()=>{ this.saveGame.save('local') } );
			wrapperSD.appendChild( btnSave );

			this.loadGame = new LoadGame(gameData);
			let btnLoad = document.createElement("button");
			btnLoad.innerHTML = "Загрузить";
			btnLoad.classList.add("btn-load");
			btnLoad.addEventListener( "click", () => { this.loadGame.load() } );
			wrapperSD.appendChild( btnLoad );

			document.body.appendChild( wrapperSD );
	}
}