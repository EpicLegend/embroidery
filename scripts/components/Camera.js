export default class Camera {

	constructor(zoom = 1, defaultZoom = 1) {

		this.nowZoom = zoom;
		this.oldZoom = this.nowZoom;
		this.defaultZoom = defaultZoom;

		this.drawUIControl();

	}

	zoom (a) {

		if ( this.nowZoom + a <= 1 ) {
			this.nowZoom = this.defaultZoom;
		} else {
			this.nowZoom = this.nowZoom + a;
		}

	}

	scrollEvent() {

		this.oldZoom = this.nowZoom;		
		return this.nowZoom;
		
	}

	drawUIControl() {
		
		// resize picture
		const blocResize = document.createElement("div");
		blocResize.id = "resize";

		const titleResize = document.createElement("span");
		titleResize.innerHTML = "Размер:";
		blocResize.appendChild( titleResize );

		const btnInc = document.createElement("button");
		btnInc.classList.add( "resize-inc" );
		btnInc.innerHTML = "+";
		blocResize.appendChild( btnInc ); 
		btnInc.addEventListener( "click", ()=> { this.incZoom(); } );

		const btnDec = document.createElement("button");
		btnDec.classList.add( "resize-dec" );
		btnDec.innerHTML = "-";
		blocResize.appendChild( btnDec );
		btnDec.addEventListener( "click", ()=> { this.decZoom(); } );

		document.body.appendChild( blocResize );

	}

	incZoom() {

		this.zoom(2);

	}

	decZoom() {

		this.zoom(-2);

	}

	log() {

		console.log("nowZoom: ", this.nowZoom);
		console.log("oldZoom: ", this.oldZoom);
		console.log("defaultZoom: ", this.defaultZoom);

	}
	
}