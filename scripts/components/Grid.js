export default class Grid {
	constructor(widthGrid, heightGrid, sizeBlock, widthApp, heightApp, app, gameData, marginBlock = 1) {
		
		this.app = app;
		this.gameData = gameData;

		// создает сетку из графических примитивов
		// на основе widthGrid и heiight плоскости
		// если widthGrid || heightGrid не делится целиком на K
		// то округляем к ближайшему числу 321/32 = 10

		// кол-во ячеек по горизонтали в изображение
		this.n = Math.round( widthGrid / sizeBlock );
		// кол-во ячеек по вертикали в изображение
		this.k = Math.round( heightGrid / sizeBlock );

		// ширина приложения(канвас)
		this.widthApp = widthApp;
		// высота приложения(канвас)
		this.heightApp = heightApp;
		
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
				graphics.on("pointerdown", function (e) {
					handlerClick(e, i, j);
				});
				
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
}