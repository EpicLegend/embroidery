export default class SaveGame {
	constructor(gameData) {

		this.gameData = gameData;

	}

	load() {
		if ( !localStorage.getItem('saveData') ) {
			let loadData = JSON.parse( localStorage.getItem('saveData') );
		}
		
		console.log(this.gameData);
		// очистить канвас и контейнер с данными
		containerGraphics.destroy( {children:true, texture:true, baseTexture:true} );
		// containerGraphics = new Container();
		// cells = [];

		// /*
		// 	разбор JSON и проецировать на canvas
		// */

		// const n = Math.round( settings.widthGrid / settings.sizeBlock );
		// const k = Math.round( settings.heightGrid / settings.sizeBlock );

		// let fill, fillCorrectly, fillColor;

		// let indexData = 0;
		// for(let i = 0; i < n; i++) {

		// 	for(let j = 0; j < k; j++) {

		// 		fill = loadData[indexData].fill;
		// 		fillCorrectly = loadData[indexData].fillCorrectly;
		// 		fillColor = loadData[indexData].fillColor;

		// 		//console.log(1, fillColor);

		// 		let graphics = new PIXI.Graphics();

		// 		if( fillColor === null ) {
		// 			graphics.beginFill( 0xDE3249 );
		// 		} else {
		// 			graphics.beginFill( `0x${fillColor}` );
		// 		}
		// 		graphics.drawRect( (i * 32) + (1 * i), (j * 32) + (1 * j), 32, 32);
		// 		graphics.endFill();
				
		// 		graphics.interactive = true;
		// 		graphics.buttonMode = true;
		// 		graphics.on("pointerdown", function (e) {
		// 			handlerClick(e, i, j);
		// 		});
				
		// 		cells.push({
		// 			id: `${i.toString()}x${j.toString()}`,
		// 			fill: fill,
		// 			fillCorrectly: fillCorrectly,
		// 			fillColor: fillColor,
		// 			obj: graphics
		// 		});
				
		// 		containerGraphics.addChild( graphics );
		// 		indexData++;

		// 	}

		// }

		// // центрируем сетку
		// containerGraphicsCentered();

		// app.stage.addChild( containerGraphics );

	}
}