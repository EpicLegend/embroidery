

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
		

		// кол-во ячеек по горизонтали в изображение
		this.n = this.settings.widthPicture ;
		// // кол-во ячеек по вертикали в изображение
		this.k = this.settings.heightPicture;

		// ширина приложения(канвас)
		this.widthApp = this.app.screen.width;
		// высота приложения(канвас)
		this.heightApp = this.app.screen.height;
		
		this.gameData.containerGraphics = new PIXI.Container();
		// создаем сетку 
		let indexPoint = 0;

		for(let i = 0; i < this.n; i++) {

			for(let j = 0; j <  this.k; j++) {

				// найти нужный цвет для блока
				for(let a = 0; a < this.palette.colorAlphabet.length; a++) {
					if ( JSON.stringify( this.gameData.dataPalette[ indexPoint ] ) === JSON.stringify( this.palette.colorAlphabet[a].color ) ) {

						let type = this.palette.colorAlphabet[a]; //this.randomInteger( 0, this.palette.colors.length - 1);
						let graphics = this.drawGraphics( i, j, type );
						this.addCells( i, j, type, graphics );
						this.gameData.containerGraphics.addChild( graphics );

						break;

					}
				}
				
				indexPoint++;
				
			}

		}

		
		this.containerGraphicsCentered();

		this.app.stage.addChild( this.gameData.containerGraphics );

	}

	redrawContainer(cameraZoom = null, cameraMove = null) {

		if (cameraZoom != null) {
			this.gameData.containerGraphics.scale.set( cameraZoom );
			this.containerGraphicsCentered();
		}

		if (cameraMove != null) {
			this.gameData.containerGraphics.position.set( cameraMove.x, cameraMove.y );
		}
		
	}

	drawGraphics( y, x, type, fill = null, fillColor = null ) {
		/*
			- рисует квадрат
			- с width, height(из settings)
			- в позицию x, y(передаем)
			- корректно закрасили(fill)
			- цвет квадрата(fillColor)
		*/
		
		let graphics;

		if( fillColor === null ) {
			// {title: item.title, color: item.color}
			//graphics.beginFill( `0x${ this.palette.convertRGBtoHEX( type.color.r, type.color.g, type.color.b ).slice(1) }` );
			graphics = new PIXI.Graphics();
			graphics.beginFill( `0x${ this.gameData.config.defaultCellBG.slice(1) }` );
			graphics.drawRect( 0, 0, this.settings.sizeBlock, this.settings.sizeBlock);
			graphics.position.set( (y * this.settings.sizeBlock) + (1 * y), (x * this.settings.sizeBlock) + (1 * x) );
			graphics.endFill();
		} else {
			graphics = new PIXI.Sprite( this.gameData.pictureBGtexture.texture )
			graphics.width = this.settings.sizeBlock;
			graphics.height = this.settings.sizeBlock;
			graphics.tint = `0x${ fillColor.slice(1) }`;
			graphics.position.set( (y * this.settings.sizeBlock) + (1 * y), (x * this.settings.sizeBlock) + (1 * x) );
			//graphics.beginFill( `0x${ fillColor.slice(1) }` );

		}

		


		if ( !fill ) {
			let style = new PIXI.TextStyle({
				fontFamily: "Arial",
				fontSize: 14,
				fill: "#828484",
			});
			
			let typeGraphics = new PIXI.Text( type.title , style );
			typeGraphics.x = graphics.width / 2 - typeGraphics.width / 2;
			typeGraphics.y = graphics.height / 2 - typeGraphics.height / 2;
			graphics.addChild( typeGraphics );
		}
		
		graphics.interactive = true;
		graphics.buttonMode = true;
		graphics
			.on("pointerdown", (e) => { this.handlerCellClick(e, y, x); } );
			// .on( 'pointerup', (e)=>{ this.onButtonUp(e) } )
			// .on( 'pointerupoutside', (e)=>{ this.onButtonUp(e) } )
			// .on( 'pointerover', (e)=>{ this.onButtonOver(e) } )
			// .on( 'pointerout', (e)=>{ this.onButtonOut(e) } );
		
		return graphics;

	}

	// onButtonUp(e) {
	// 	console.log( "onButtonUp", e );
	// }
	// onButtonOver(e) {
	// 	console.log( "onButtonOver", e );
	// }
	// onButtonOut(e) {
	// 	console.log( "onButtonOut", e );
	// }

	addCells(y, x, type, item, fill = false, fillCorrectly = null, fillColor = null) {
		this.gameData.cells.push({
			id: `${y.toString()}x${x.toString()}`,
			type: type,
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

		const arrLength = this.gameData.cells.length;
		for(let i = 0; i < arrLength; i++) {

			if( this.gameData.cells[i].id == `${pointx.toString()}x${pointy.toString()}` ) {

				this.gameData.cells[i].fill = true;
				this.gameData.cells[i].fillColor = this.palette.selectedColor;
				

				if ( this.palette.selectedColorTitle == this.gameData.cells[i].type.title ) {
					this.gameData.cells[i].fillCorrectly = true;
					this.gameData.score.incScore();
				} else {
					this.gameData.cells[i].fillCorrectly = false;
				}

				let graphics = new PIXI.Sprite( this.gameData.pictureBGtexture.texture )
				graphics.width = this.settings.sizeBlock;
				graphics.height = this.settings.sizeBlock;
				graphics.tint = `0x${ this.palette.selectedColor.slice(1) }`;
				graphics.position.set( e.target.x, e.target.y );

				graphics.interactive = true;
				graphics.buttonMode = true;
				graphics
					.on("pointerdown", (e) => { this.handlerCellClick(e, pointx, pointy); } );

				this.gameData.containerGraphics.addChild( graphics );
				this.gameData.containerGraphics.swapChildren( graphics, this.gameData.containerGraphics.children[ i ] );
				this.gameData.containerGraphics.removeChildAt( this.gameData.containerGraphics.children.length - 1 );

				break;

			}

		}

	}

	downloadedGrid(loadData) {
		
		this.clearData();
		/*
			разбор JSON и проецировать на canvas
		*/

		// кол-во ячеек по горизонтали в изображение
		const n = this.settings.widthPicture ;
		// // кол-во ячеек по вертикали в изображение
		const k = this.settings.heightPicture;

		let fill, type, fillCorrectly, fillColor;
		let indexData = 0;
		for(let i = 0; i < n; i++) {

			for(let j = 0; j < k; j++) {

				fill = loadData[indexData].fill;
				fillCorrectly = loadData[indexData].fillCorrectly;
				fillColor = loadData[indexData].fillColor;
				type = loadData[indexData].type;
				
				let graphics = this.drawGraphics( i, j, type, fill, fillColor );
				this.addCells( i, j, type, graphics, fill, fillCorrectly, fillColor );
				
				this.gameData.containerGraphics.addChild( graphics );

				indexData++;

			}

		}

		// центрируем сетку
		this.containerGraphicsCentered();
		this.gameData.score.loadScore();

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

	/* supports func */
	randomInteger(min, max) {

		// случайное число от min до (max+1)
		let rand = min + Math.random() * (max + 1 - min);
		return Math.floor(rand);
		
	}

}