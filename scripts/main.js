import Settings from "./components/Settings.js";
import Game from "./components/Game.js";

//Settings(width[ширина 'картинки'], height[высота 'картинки'], sizeBlock, selectedColor = null)
let settings = new Settings( 100, 100, 48, window.innerWidth, window.innerHeight );

let app = new PIXI.Application({
	width: settings.widthApp,
	height: settings.heightApp,
	antialias: true,
	resizeTo: window
});
document.body.appendChild( app.view );

let game = new Game(document, settings, app, 'images/picture.png');

window.addEventListener("resize", () => {

	game.resize();

});




