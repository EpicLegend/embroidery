export default class Score {
	constructor(parent) {
		this.parent = parent;
		this.score = 0;
		this.blockScore;

		this.drawUI();
	}

	incScore() {
		this.score++;
		this.update();
	}

	loadScore() {
		// todo : здесь должна быть загрузка, но ее нет
	}

	drawUI() {
		this.blockScore = document.createElement("div");
		this.blockScore.id = "score";
		this.blockScore.innerHTML = this.score;
		console.log(this.parent);
		document.querySelector(this.parent).appendChild( this.blockScore );
	}

	update() {
		this.blockScore.innerHTML = this.score;
	}
}