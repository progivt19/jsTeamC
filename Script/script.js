$(function(){
	let canvas = document.getElementById("canvas");
	let context = canvas.getContext("2d");
	let ctx = canvas.getContext("2d");

	let options = {
		width: window.innerWidth,
		height: window.innerHeight
	}

	canvas.width = options.width;
	canvas.height = options.height;

	function drawBG(){
		let image1 = new Image();
		let image2 = new Image();
		let image3 = new Image();
		image1.src = "Files/Level/level1-principal.png";
		image2.src = "Files/Level/level1-background.png";
		image3.src = "Files/Level/level1-foreground.png";
		context.drawImage(image2, 0, 0, options.width, options.height);
		context.drawImage(image1, 0, 0, options.width, options.height);
		context.drawImage(image3, 0, 0, options.width, options.height);
	}

	class Sprite{
		constructor(x, y){
			this.x = x;
			this.y = y;
			this.dwidth = 50;
			this.dheight = 51.5;
			this.dx = 0;
			this.dy = 0;
			this.width = 210;
			this.height = 220;
			this.image = new Image();
			this.image.src = "Files/Char.png";

			this.isRightOrLeft = false;
			this.isStay = false;
			this.isRun = true;
			this.isBit = false;
			this.isBow = false;
			this.isStrike = false;
			this.isFoam = false;
			this.isFightStay = false;
			this.isFightWalk = false;

			this.speed = 2;
			this.isRight = false;
			this.isLeft = false;
			this.isUp = false;
			this.isDown = false;
		}
		draw = function(){
			if (this.isRightOrLeft){
				context.translate((sprite.x + sprite.width / 2), 0);
				context.scale(-1, 1);
				context.translate(-(sprite.x + sprite.width / 2), 0);
			}
			context.drawImage(this.image, this.dx, this.dy, this.dwidth, this.dheight, this.x, this.y, this.width, this.height);
			if (this.isRightOrLeft){
				context.translate((sprite.x + sprite.width / 2), 0);
				context.scale(-1, 1);
				context.translate(-(sprite.x + sprite.width / 2), 0);
			}
			this.move();
		}
		move = function(){
			if (this.isRight){
				this.walkRight();
			}
			if (this.isLeft){
				this.walkLeft();
			}
			if (this.isUp){
				this.walkUp();
			}
			if (this.isDown){
				this.walkDown();
			}
		}
		animationDraw = function(){
			if (this.isStay){
				this.stayAnimation();
			}
			if (this.isRun){
				this.runAnimation();
			}
			if (this.isBit){
				this.bitAnimation();
			}
			if (this.isBow){
				this.bowAnimation();
			}
			if (this.isStrike){
				this.strikeAnimation();
			}
			if (this.isFoam){
				this.foamAnimation();
			}
			if (this.isFightStay){
				this.fightStayAnimation();
			}
			if (this.isFightWalk){
				this.fightWalkAnimation();
			}
		}
		stayAnimation = function(){
			this.dy = this.dheight * 7;
			this.dx += this.dwidth;
			if (this.dx >= this.dwidth * 10){
				this.dx = 0;
			}
		}
		runAnimation = function(){
			this.dy = 10;
			this.dx += this.dwidth;
			if (this.dx >= this.dwidth * 6){
				this.dx = 0;
			}
		}
		bitAnimation = function(){
			this.dy = this.dheight * 2;
			this.dx += this.dwidth;
			if (this.dx >= this.dwidth * 4){
				this.dx = 0;
			}
		}
		bowAnimation = function(){
			this.dy = this.dheight;
			this.dx += this.dwidth;
			if (this.dx >= this.dwidth * 5){
				this.dx = 0;
			}
		}
		strikeAnimation = function(){
			this.dy = this.dheight * 3;
			this.dx += this.dwidth;
			if (this.dx >= this.dwidth * 5){
				this.dx = 0;
			}
		}
		foamAnimation = function(){
			this.dy = this.dheight * 5;
			this.dx += this.dwidth;
			if (this.dx >= this.dwidth * 3){
				this.dx = 0;
			}
		}
		fightStayAnimation = function(){
			this.dy = this.dheight * 6;
			this.dx += this.dwidth;
			if (this.dx >= this.dwidth * 8){
				this.dx = 0;
			}
		}
		fightWalkAnimation = function(){
			this.dy = this.dheight * 4;
			this.dx += this.dwidth;
			if (this.dx >= this.dwidth * 4){
				this.dx = 0;
			}
		}
		walkRight = function(){
			this.x += this.speed;
		}
		walkLeft = function(){
			this.x -= this.speed;
		}
		walkUp = function(){
			this.y -= this.speed;
		}
		walkDown = function(){
			this.y += this.speed;
		}
	}
	let sprite = new Sprite(200, 400);

	document.addEventListener("keydown", function(e){
		if (e.key == "d"){
			sprite.isRight = true;
			sprite.isRightOrLeft = false;
		}
		if (e.key == "a"){
			sprite.isLeft = true;
			sprite.isRightOrLeft = true;
		}
		if (e.key == "w"){
			sprite.isUp = true;
		}
		if (e.key == "s"){
			sprite.isDown = true;
		}
		if (e.key == "d" || e.key == "a" || e.key == "w" || e.key == "s"){
			sprite.isFightStay = false;
			sprite.isRun = true;
		}
	});
	document.addEventListener("keyup", function(e){
		if (e.key == "d"){
			sprite.isRight = false;
		}
		if (e.key == "a"){
			sprite.isLeft = false;
		}
		if (e.key == "w"){
			sprite.isUp = false;
		}
		if (e.key == "s"){
			sprite.isDown = false;
		}
		if (sprite.isRight == false && sprite.isLeft == false && sprite.isUp == false && sprite.isDown == false){
			sprite.isRun = false;
			sprite.isFightStay = true;
		}
	});

	let spriteAnimation = setInterval(function(){
		sprite.animationDraw();
	}, 150);

	function game(){
		drawBG();
		sprite.draw();
		window.requestAnimationFrame(game);
	}

	game();
});
