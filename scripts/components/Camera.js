export default class Camera {

	constructor(zoom = 1, stepZoom = 1, defaultZoom = 1) {

		this.nowZoom = zoom;
		this.oldZoom = this.nowZoom;
		this.defaultZoom = defaultZoom;
		this.stepZoom = stepZoom;

		this.drawUIControl();

	}

	zoom (a) {
		if ( this.nowZoom + a <= this.defaultZoom ) {
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