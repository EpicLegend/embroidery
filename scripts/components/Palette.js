export default class Palette {

	constructor(appentParent, gameData, selectedColor = null) {
		this.gameData = gameData;
		this.alphabet = [ "а", "б", "в", "г", "д", "е", "ё",
						  "ж", "з", "и", "й", "к", "л", "м",
						  "н", "о", "п", "р", "с", "т", "у",
						  "ф", "х", "ц", "ч", "ш", "щ", "ъ",
						  "ы", "ь", "э", "ю", "я"];
		this.parent = appentParent;
		this.colors = [];
		this.gameData.corePalette.forEach((item, index)=> {

			this.colors.push( {

				title: this.alphabet[index],
				color: item

			});

		});

		this.colorAlphabet = [];
		this.selectedColor = selectedColor;
		this.selectedColorTitle;

		this.drawUI();

	}

	drawUI() {

		// создание ui палитры и вставка в this.parent
		let blockPalette = document.createElement("div");
		blockPalette.id = "palette";

		let wrapper = document.createElement("div");
		wrapper.classList.add( "palette-wrapper" );

		this.colors.forEach( (item)=>{
			let btn = document.createElement("button");
			btn.classList.add("palette-item");
			btn.innerHTML = item.title;
			btn.style.backgroundColor = this.convertRGBtoHEX( item.color.r, item.color.g, item.color.b );
			this.colorAlphabet.push( {title: item.title, color: item.color} );

			// определить выбранный цвет
			btn.addEventListener("click", () => {

				this.selectedColor = this.convertRGBtoHEX( item.color.r, item.color.g, item.color.b );
				this.selectedColorTitle = item.title;
				console.log(item);

			});

			wrapper.appendChild( btn );
		} );


		blockPalette.appendChild( wrapper );
		document.querySelector(this.parent).appendChild( blockPalette );

	}

	convertRGBtoHEX(r, g, b){
		return "#" + this.toHex(r) + this.toHex(g) + this.toHex(b);
	}
	toHex(a) {
		a = parseInt(a, 10);
		if (isNaN(a))
			return "00";
		a = Math.max(0, Math.min(a, 255));
		return "0123456789ABCDEF".charAt((a - a % 16) / 16) + "0123456789ABCDEF".charAt(a % 16)
	}
	
}