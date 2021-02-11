export default class Grid {
	constructor(settings, app, gameData, palette, marginBlock = 1) {

		this.app = app;
		this.gameData = gameData;
		this.settings = settings;
		this.palette = palette;

		this.drawGrid();
	   
	}

	drawGrid() {

		// создает сетку из графических примитивов
		// на основе widthGrid и heiight плоскости
		// если widthGrid || heightGrid не делится целиком на K
		// то округляем к ближайшему числу 321/32 = 10

		// кол-во ячеек по горизонтали в изображение
		this.n = Math.round( this.settings.widthGrid / this.settings.sizeBlock );
		// кол-во ячеек по вертикали в изображение
		this.k = Math.round( this.settings.heightGrid / this.settings.sizeBlock );

		// ширина приложения(канвас)
		this.widthApp = this.app.screen.width;
		// высота приложения(канвас)
		this.heightApp = this.app.screen.height;
		
		this.gameData.containerGraphics = new PIXI.Container();
		
		// создаем сетку 
		for(let i = 0; i < this.n; i++) {

			for(let j = 0; j <  this.k; j++) {
				
				let graphics = this.drawGraphics( i, j );
				this.addCells( i, j, graphics );
				this.gameData.containerGraphics.addChild( graphics );

			}

		}

		this.containerGraphicsCentered();

		this.app.stage.addChild( this.gameData.containerGraphics );

	}	

	drawGraphics( y, x, fillColor = null ) {

		let graphics = new PIXI.Graphics();

		if( fillColor === null ) {
			graphics.beginFill( 0xDE3249 );
		} else {
			graphics.beginFill( `0x${fillColor}` );
		}
		graphics.drawRect( 0, 0, this.settings.sizeBlock, this.settings.sizeBlock);
		graphics.position.set( (y * 32) + (1 * y), (x * 32) + (1 * x) );
		graphics.endFill();
		
		graphics.interactive = true;
		graphics.buttonMode = true;
		graphics.on("pointerdown", (e) => {
			this.handlerCellClick(e, y, x);
		} );
		
		return graphics;

	}

	addCells(y, x, item, fill = false, fillCorrectly = null, fillColor = null) {
		this.gameData.cells.push({
			id: `${y.toString()}x${x.toString()}`,
			fill: fill,
			fillCorrectly: fillCorrectly,
			fillColor: fillColor,
			obj: item
		});
	}

	handlerCellClick (e, pointx, pointy) {
		// pointx - x индекс в массиве
		// pointy - y индекс в массиве

		if ( this.palette.selectedColor === null ) {
			console.log("клика не будет!");
			return false;
		}
	

		this.gameData.cells.forEach((item, index) => {

			if( item.id == `${pointx.toString()}x${pointy.toString()}` ) {

				item.fill = true;
				item.fillColor = this.palette.selectedColor;

				let graphics = new PIXI.Graphics();
				graphics.beginFill( `0x${this.palette.selectedColor}` );
				graphics.drawRect( 0, 0, 32, 32);
				graphics.endFill();
				graphics.position.set( e.target.x, e.target.y );
				
				graphics.interactive = true;
				graphics.buttonMode = true;
				graphics.on("pointerdown", (e) => {

					this.handlerCellClick(e, pointx, pointy);
					
				});

				this.gameData.containerGraphics.addChild( graphics );
				this.gameData.containerGraphics.swapChildren( graphics, this.gameData.containerGraphics.children[ index ] );
				this.gameData.containerGraphics.removeChildAt( this.gameData.containerGraphics.children.length - 1 );

			}

		});

	}

	downloadedGrid(loadData) {
		
		this.clearData();
		/*
			разбор JSON и проецировать на canvas
		*/

		const n = Math.round( this.settings.widthGrid / this.settings.sizeBlock );
		const k = Math.round( this.settings.heightGrid / this.settings.sizeBlock );

		let fill, fillCorrectly, fillColor;

		let indexData = 0;
		for(let i = 0; i < n; i++) {

			for(let j = 0; j < k; j++) {

				fill = loadData[indexData].fill;
				fillCorrectly = loadData[indexData].fillCorrectly;
				fillColor = loadData[indexData].fillColor;
				
				let graphics = this.drawGraphics( i, j, fillColor );
				this.addCells( i, j, graphics, fill, fillCorrectly, fillColor );
				
				this.gameData.containerGraphics.addChild( graphics );

				indexData++;

			}

		}

		// центрируем сетку
		this.containerGraphicsCentered();

		this.app.stage.addChild( this.gameData.containerGraphics );
	}

	clearData() {

		// очистить канвас и контейнер с данными
		this.gameData.containerGraphics.destroy( {children:true, texture:true, baseTexture:true} );
		this.gameData.containerGraphics = new PIXI.Container();
		this.gameData.cells = [];

	}
	
	containerGraphicsCentered() {

		this.gameData.containerGraphics.x =  ( this.app.screen.width / 2) - ( this.gameData.containerGraphics.width / 2 );
		this.gameData.containerGraphics.y =  ( this.app.screen.height / 2) - ( this.gameData.containerGraphics.height / 2 );

	}

	

}