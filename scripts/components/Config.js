export default class Config{
	constructor(){
		/*
			- НЕ РЕДАКТИРУЕТСЯ В ПРОЦЕССЕ РАБОТЫ ИГРЫ!!!
			- много из этого не используется
			- были планы на фичи.
		*/
		
		// куда сохраняем игру
		this.typeSaveGame = "local";
		// кол-во цветов в палитре
		this.countColorPalette = 6;
		// кол-во % до бонуса
		this.precentBonus = 10;

		// выделенная ячейка фон
		this.selectedCellBG = "#CAC9CA";
		// выделенная ячейка текст
		this.selectedCellText = "#828484";
		// дефолтная ячейка фон
		this.defaultCellBG = "#B1B0B2";
		// дефолтная ячейка фон
		this.defaultCellText = "#040304";
		
		
	}


}