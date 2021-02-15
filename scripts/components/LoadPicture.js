export default class LoadPicture {

	constructor() {

		let wrapperLoadPicture = document.createElement("div");
		wrapperLoadPicture.id = "wrapper-load-picture";

		let btnLoadPicture = document.createElement("button");
		btnLoadPicture.classList.add("btn", "load-picture");

		btnLoadPicture.addEventListener( "click", this.load );

		wrapperLoadPicture.appendChild( btnLoadPicture );

		document.body.appendChild( wrapperLoadPicture );
	}

	load() {
		console.log("load");
	}
	
}