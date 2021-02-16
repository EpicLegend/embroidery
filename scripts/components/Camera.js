export default class Camera {

	constructor(grid, zoom = 1, stepZoom = 0.1, defaultZoom = 1, minZoom = 0.1) {

		// текущий зум
		this.nowZoom = zoom;
		// предыдущий зум
		this.oldZoom = this.nowZoom;
		// стандартный зум(дефолтное значение зума)
		this.defaultZoom = defaultZoom;
		// шаг для зума
		this.stepZoom = stepZoom;
		// минимальное значение зума
		this.minZoom = minZoom;

		// для перерисовки после зума
		this.grid = grid;

		// перемещение камеры
		this.stepMove = 10;
		// направление камеры
		this.direction = null;
		// координаты камеры(координаты сетки)
		this.position = {
			x: this.grid.gameData.containerGraphics.x,
			y: this.grid.gameData.containerGraphics.y
		};

		

		// рисуем UI для зума
		this.drawUIControl();

		// todo: нужно переписать в класс контроллер
		window.addEventListener( "keydown", (e) => { 
			/*
				управление wasd
				w - вверх
				a - влево
				s - вниз
				d - вправо
				* передвижение только по осям.
				* можно добавить горизонтальное передвижение, но потом
				* главное, что сейчас работает как нужно.
				* и на Eng клавиатуре
			*/
			switch ( e.key.toLowerCase() ) {
				case "w":
					this.direction = "up";
					this.position.y -= this.stepMove;
					break;
				case "a":
					this.direction = "left";
					this.position.x -= this.stepMove;
					break;
				case "s":
					this.direction = "down";
					this.position.y += this.stepMove;
					break;
				case "d":
					this.direction = "right";
					this.position.x += this.stepMove;
					break;
			
				default:
					break;
			}

			this.moveCamera();

		} );

	}

	moveCamera() {
		this.grid.redrawContainer( this.scrollEvent(), this.position );
	}

	zoom (a) {
		if ( this.nowZoom + a <= this.minZoom ) {
			this.nowZoom = this.minZoom;
		} else {
			this.nowZoom = this.nowZoom + a;
		}

		this.position = {
			x: this.grid.gameData.containerGraphics.x,
			y: this.grid.gameData.containerGraphics.y
		};

		this.grid.redrawContainer( this.scrollEvent(), this.position );
	}

	scrollEvent() {
		this.oldZoom = this.nowZoom;		
		return this.nowZoom;		
	}

	drawUIControl() {
		
		// resize picture
		const blocResize = document.createElement("div");
		blocResize.id = "resize";

		const btnInc = document.createElement("button");
		btnInc.classList.add( "btn", "inc" );
		blocResize.appendChild( btnInc ); 
		btnInc.addEventListener( "click", ()=> { this.incZoom(); } );

		const btnDec = document.createElement("button");
		btnDec.classList.add( "btn", "dec" );
		blocResize.appendChild( btnDec );
		btnDec.addEventListener( "click", ()=> { this.decZoom(); } );

		document.body.appendChild( blocResize );

	}

	incZoom() {
		this.zoom( this.stepZoom );

	}

	decZoom() {
		this.zoom( -this.stepZoom );

	}

	log() {

		console.log("nowZoom: ", this.nowZoom);
		console.log("oldZoom: ", this.oldZoom);
		console.log("defaultZoom: ", this.defaultZoom);

	}
	
}