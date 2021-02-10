export default class Grid {
	constructor(settings, app, gameData, palette, marginBlock = 1) {

		this.app = app;
		this.gameData = gameData;
		this.settings = settings;
		this.palette = palette;

		// создает сетку из графических примитивов
		// на основе widthGrid и heiight плоскости
		// если widthGrid || heightGrid не делится целиком на K
		// то округляем к ближайшему числу 321/32 = 10

		// кол-во ячеек по горизонтали в изображение
		this.n = Math.round( this.settings.widthGrid / this.settings.sizeBlock );
		// кол-во ячеек по вертикали в изображение
		this.k = Math.round( this.settings.heightGrid / this.settings.sizeBlock );

		// ширина приложения(канвас)
		this.widthApp = app.screen.width;
		// высота приложения(канвас)
		this.heightApp = app.screen.height;
		
		this.gameData.containerGraphics = new PIXI.Container();
		
		// создаем сетку 
		for(let i = 0; i < this.n; i++) {

			for(let j = 0; j <  this.k; j++) {

				let graphics = new PIXI.Graphics();

				graphics.beginFill(0xDE3249);
				graphics.drawRect( 0, 0, 32, 32);
				graphics.endFill();
				graphics.position.set( (i * 32) + (1 * i), (j * 32) + (1 * j) );
				
				graphics.interactive = true;
				graphics.buttonMode = true;
				graphics.on("pointerdown", (e) => { this.handlerCellClick(e, i, j); });
				
				this.gameData.cells.push({
					id: `${i.toString()}x${j.toString()}`,
					fill: false,
					fillCorrectly: null,
					fillColor: null,
					obj: graphics
				});

				this.gameData.containerGraphics.addChild( graphics );

			}

		}

		this.containerGraphicsCentered();

		this.app.stage.addChild( this.gameData.containerGraphics );
	   
	}
	
	containerGraphicsCentered() {
		this.gameData.containerGraphics.x =  ( this.widthApp / 2) - ( this.gameData.containerGraphics.width / 2 );
		this.gameData.containerGraphics.y =  ( this.heightApp / 2) - ( this.gameData.containerGraphics.height / 2 );
	}

	handlerCellClick (e, pointx, pointy) {
		console.log("CLICK!!!");
		if ( this.palette.selectedColor === null ) {
			console.log("клика не будет!");
			return false;
		}

		this.gameData.cells.forEach((item, index) => {
			if( item.id == `${pointx.toString()}x${pointy.toString()}` ) {

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
}