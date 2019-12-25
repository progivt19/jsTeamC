$(function(){
	let canvas = document.getElementById("canvas");
	let context = canvas.getContext("2d");
	let ctx = canvas.getContext("2d");
	let events = false;

	let options = {
		width: window.innerWidth,
		height: window.innerHeight,
		bitDamage: 10,
		fireDamage: 15
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
		constructor(x, y, src, isRightOrLeft){
			this.x = x;
			this.y = y;
			this.dwidth = 50;
			this.dheight = 51.5;
			this.dx = 0;
			this.dy = 0;
			this.width = 210;
			this.height = 220;
			this.image = new Image();
			this.image.src = src;

			this.isRightOrLeft = isRightOrLeft;
			this.isStay = false;
			this.isRun = false;
			this.isBit = false;
			this.isBow = false;
			this.isStrike = false;
			this.isFoam = false;
			this.isFightStay = true;
			this.isFightWalk = false;

			this.speed = 2;
			this.isRight = false;
			this.isLeft = false;
			this.isUp = false;
			this.isDown = false;

			this.bitBool = true;
			this.canFire = true;

			this.hp = 100;
			this.mp = 100;
		}
		draw = function(){
			if (this.isRightOrLeft){
				context.translate((this.x + this.width / 2), 0);
				context.scale(-1, 1);
				context.translate(-(this.x + this.width / 2), 0);
			}
			context.drawImage(this.image, this.dx, this.dy, this.dwidth, this.dheight, this.x, this.y, this.width, this.height);
			if (this.isRightOrLeft){
				context.translate((this.x + this.width / 2), 0);
				context.scale(-1, 1);
				context.translate(-(this.x + this.width / 2), 0);
			}
			this.move();
			this.border();
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
		border = function(){
			if (this.x <= -70){
				this.x = -70;
			}
			if (this.x + this.width >= options.width + 70){
				this.x = options.width - this.width + 70;
			}
			if (this.y < options.height - options.height * 0.5){
				this.y = options.height - options.height * 0.5;
			}
			if (this.y + this.height > options.height + 50){
				this.y = options.height - this.height + 50;
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
			this.dy = this.dheight * 2 + 8;
			this.dx += this.dwidth;
			if (this.dx >= this.dwidth * 4){
				this.dx = 0;
				this.isBit = false;
				this.isFightStay = true;
			}
		}
		bowAnimation = function(){
			this.dy = this.dheight;
			this.dx += this.dwidth;
			if (this.dx >= this.dwidth * 4){
				this.dx = 0;
				this.isBow = false;
				this.isFightStay = false;
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
				this.isFoam = false;
				this.isFightStay = true;
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

	class Fireball{
		constructor(x, y, rightOrLeft){
			this.x = x;
			this.y = y;
			this.width = 50;
			this.height = 50;
			this.dwidth = 80;
			this.dx = 30 + this.dwidth * 7;
			this.dy = 0;			
			this.dheight = 80;
			this.rightOrLeft = rightOrLeft;
			this.image = new Image();
			this.image.src = "Files/explosions.png"
			this.speed = 5;
			this.isBoom = false;
			this.bool = true;
		}
		draw = function(){
			context.drawImage(this.image, this.dx, this.dy, this.dwidth, this.dheight, this.x, this.y, this.width, this.height);
			this.move();
			this.border();
		}
		move = function(){
			if (this.rightOrLeft){
				this.x += this.speed;
			}
			else{
				this.x -= this.speed;
			}
		}
		border = function(){
			if (this.x <= 0 || this.x + this.width >= options.width || this.y <= 0 || this.y + this.height >= options.height){
				if (this.bool){
					this.boom();
					this.bool = false;					
				}
			}
		}
		boom = function(){
			this.speed = 0;
			this.isBoom = true;
			this.dx = 0;
			this.dy = this.dheight * 11;
			this.y = options.height + 100;
		}
	}

	let sprite_1 = new Sprite(200, 400, "Files/Char.png", false);
	let sprite_2 = new Sprite(options.width - 325, 400, "Files/Char_2.png", true);

	let fireball = [];

	document.addEventListener("keydown", function(e){
		if (notVictory == true && events == true){
			if (e.key == "d" && sprite_1.isLeft == false){
				sprite_1.isRight = true;
				sprite_1.isRightOrLeft = false;
			}
			if (e.key == "a" && sprite_1.isRight == false){
				sprite_1.isLeft = true;
				sprite_1.isRightOrLeft = true;
			}
			if (e.key == "w" && sprite_1.isDown == false){
				sprite_1.isUp = true;
			}
			if (e.key == "s" && sprite_1.isUp == false){
				sprite_1.isDown = true;
			}
			if ((e.key == "d" || e.key == "a" || e.key == "w" || e.key == "s") && sprite_1.isBit == false){
				sprite_1.isFightStay = false;
				sprite_1.isRun = true;
			}
			if (e.key == "r" && sprite_1.isBit == false){
				sprite_1.dx = 0;
				sprite_1.isFightStay = false;
				sprite_1.isRight = false;
				sprite_1.isLeft = false;
				sprite_1.isUp = false;
				sprite_1.isDown = false;
				sprite_1.isBit = true;
				sprite_1.bitBool = true;
			}
			if (e.key == "t" && sprite_1.isBit == false && sprite_1.isFoam == false && sprite_1.mp >= 20 && sprite_1.canFire == true){
				sprite_1.dx = 0;
				sprite_1.isFightStay = false;
				sprite_1.isRight = false;
				sprite_1.isLeft = false;
				sprite_1.isUp = false;
				sprite_1.isDown = false;
				sprite_1.isFoam = true;
				sprite_1.mp -= 25;
				sprite_1.canFire = false;
				setTimeout(function(){
					sprite_1.canFire = true;
				}, 1000)
				if (sprite_1.isRightOrLeft){
					fireball.push(new Fireball(sprite_1.x + 20, sprite_1.y + 30, false));
				}
				else{
					fireball.push(new Fireball(sprite_1.x + sprite_1.width - 60, sprite_1.y + 30, true));
				}
			}
		}
	});

	document.addEventListener("keyup", function(e){
		if (notVictory == true && events == true){
			if (e.key == "d"){
			sprite_1.isRight = false;
			}
			if (e.key == "a"){
				sprite_1.isLeft = false;
			}
			if (e.key == "w"){
				sprite_1.isUp = false;
			}
			if (e.key == "s"){
				sprite_1.isDown = false;
			}
			if (sprite_1.isRight == false && sprite_1.isLeft == false && sprite_1.isUp == false && sprite_1.isDown == false && sprite_1.isBit == false){
				sprite_1.isRun = false;
				sprite_1.isFightStay = true;
			}
		}	
	});
	document.addEventListener("keydown", function(e){
		if (notVictory == true && events == true){
			if (e.key == "ArrowRight" && sprite_2.isLeft == false){
				sprite_2.isRight = true;
				sprite_2.isRightOrLeft = false;
			}
			if (e.key == "ArrowLeft" && sprite_2.isRight == false){
				sprite_2.isLeft = true;
				sprite_2.isRightOrLeft = true;
			}
			if (e.key == "ArrowUp" && sprite_2.isDown == false){
				sprite_2.isUp = true;
			}
			if (e.key == "ArrowDown" && sprite_2.isUp == false){
				sprite_2.isDown = true;
			}
			if ((e.key == "ArrowRight" || e.key == "ArrowLeft" || e.key == "ArrowUp" || e.key == "ArrowDown") && sprite_2.isBit == false){
				sprite_2.isFightStay = false;
				sprite_2.isRun = true;
			}
			if (e.key == "7" && sprite_2.isBit == false){
				sprite_2.dx = 0;
				sprite_2.isFightStay = false;
				sprite_2.isRight = false;
				sprite_2.isLeft = false;
				sprite_2.isUp = false;
				sprite_2.isDown = false;
				sprite_2.isBit = true;
				sprite_2.bitBool = true;
			}
			if (e.key == "8" && sprite_2.isBit == false && sprite_2.isFoam == false && sprite_2.mp >= 20 && sprite_2.canFire == true){
				sprite_2.dx = 0;
				sprite_2.isFightStay = false;
				sprite_2.isRight = false;
				sprite_2.isLeft = false;
				sprite_2.isUp = false;
				sprite_2.isDown = false;
				sprite_2.isFoam = true;
				sprite_2.mp -= 25;
				sprite_2.canFire = false;
				setTimeout(function(){
					sprite_2.canFire = true;
				}, 1000)
				if (sprite_2.isRightOrLeft){
					fireball.push(new Fireball(sprite_2.x + 20, sprite_2.y + 30, false));
				}
				else{
					fireball.push(new Fireball(sprite_2.x + sprite_2.width - 60, sprite_2.y + 30, true));
				}
			}
		}
	});
	document.addEventListener("keyup", function(e){
		if (notVictory == true && events == true){
			if (e.key == "ArrowRight"){
				sprite_2.isRight = false;
			}
			if (e.key == "ArrowLeft"){
				sprite_2.isLeft = false;
			}
			if (e.key == "ArrowUp"){
				sprite_2.isUp = false;
			}
			if (e.key == "ArrowDown"){
				sprite_2.isDown = false;
			}
			if (sprite_2.isRight == false && sprite_2.isLeft == false && sprite_2.isUp == false && sprite_2.isDown == false && sprite_2.isBit == false){
				sprite_2.isRun = false;
				sprite_2.isFightStay = true;
			}
		}	
	});

	let gameAnimation = setInterval(function(){
		sprite_1.animationDraw();
		sprite_2.animationDraw();
	}, 150);

	let manaRegeneration = setInterval(function(){
		if (sprite_1.mp < 100){
			sprite_1.mp++;
		}
		if (sprite_2.mp < 100){
			sprite_2.mp++;
		}
	}, 400);

	let bitSound = new Audio();
	bitSound.src = "Files/PunchSounds/qubodupPunch02.flac";

	function bit(){
		if (sprite_1.isBit == true && sprite_1.bitBool == true){
			sprite_1.bitBool = false;
			let yCenter = (sprite_1.y * 2 + sprite_1.height) / 2;
			if (yCenter > sprite_2.y + 75 && yCenter < sprite_2.y + sprite_2.height - 75){
				if (sprite_1.isRightOrLeft){
					if (sprite_1.x < sprite_2.x + sprite_2.width - 140 && sprite_1.x > sprite_2.x + 10){
						sprite_2.x -= 40;
						sprite_2.hp -= 10;
						bitSound.play();
					}
				}
				else{
					if (sprite_1.x + sprite_1.width - 140 > sprite_2.x && sprite_1.x + sprite_1.width < sprite_2.x + sprite_2.width - 20){
						sprite_2.x += 40;
						sprite_2.hp -= 10;
						bitSound.play();
					}

				}
			}
		}
		if (sprite_2.isBit == true && sprite_2.bitBool == true){
			sprite_2.bitBool = false;
			let yCenter = (sprite_2.y * 2 + sprite_2.height) / 2;
			if (yCenter > sprite_1.y + 75 && yCenter < sprite_1.y + sprite_1.height - 75){
				if (sprite_2.isRightOrLeft){
					if (sprite_2.x < sprite_1.x + sprite_1.width - 140 && sprite_2.x > sprite_1.x + 10){
						sprite_1.x -= 40;
						sprite_1.hp -= options.bitDamage;
						bitSound.play();
					}
				}
				else{
					if (sprite_2.x + sprite_2.width - 140 > sprite_1.x && sprite_2.x + sprite_2.width < sprite_1.x + sprite_1.width - 20){
						sprite_1.x += 40;
						sprite_1.hp -= options.bitDamage;
						bitSound.play();
					}

				}
			}
		}
	}

	function lifeDraw(){
		let hp1 = (sprite_1.hp * options.width * 0.3) / 100;
		let hp2 = (sprite_2.hp * options.width * 0.3) / 100;
		let mp1 = (sprite_1.mp * options.width * 0.3) / 100;
		let mp2 = (sprite_2.mp * options.width * 0.3) / 100;
		if (hp1 <= 0){
			hp1 = 0;
		}
		if (hp2 <= 0){
			hp2 = 0;
		}
		if (mp1 <= 0){
			mp1 = 0;
		}
		if (mp2 <= 0){
			mp2 = 0;
		}
		context.beginPath();
		context.strokeStyle = "red";
		context.lineWidth = options.height * 0.04;
		context.moveTo(options.width * 0.1, options.height * 0.1);
		context.lineTo(options.width * 0.1 + hp1, options.height * 0.1);
		context.moveTo(options.width * 0.6, options.height * 0.1);
		context.lineTo(options.width * 0.6 + hp2, options.height * 0.1);
		context.stroke();
		context.closePath();
		context.beginPath();
		context.strokeStyle = "blue";
		context.moveTo(options.width * 0.1, options.height * 0.15);
		context.lineTo(options.width * 0.1 + mp1, options.height * 0.15);
		context.moveTo(options.width * 0.6, options.height * 0.15);
		context.lineTo(options.width * 0.6 + mp2, options.height * 0.15);
		context.stroke();
		context.closePath();
	}

	let interval;
	let notVictory = true;
	let victoryImage = new Image();
	victoryImage.src = "Files/5daf0c368901416df3c7b521.png";
	let boomSound = new Audio();
	boomSound.src = "Files/PunchSounds/qubodupPunch05.flac";

	function boom(){
		for (let i = 0; i < fireball.length; i++){
			let centerY = fireball[i].y + (fireball[i].height / 2)
			if (fireball[i].rightOrLeft == true){
				if (fireball[i].x + fireball[i].width >= sprite_1.x + 95 && centerY >= sprite_1.y && centerY <= sprite_1.y + sprite_1.height - 100 && fireball[i].x <= sprite_1.x + sprite_1.width - 100){
					sprite_1.hp -= options.fireDamage;
					boomSound.play();
					fireball[i].boom();
				}
			}
			else{
				if (fireball[i].x <= sprite_1.x + sprite_1.width - 95 && centerY >= sprite_1.y && centerY <= sprite_1.y + sprite_1.height - 100 && fireball[i].x + fireball[i].width >= sprite_1.x + 100){
					sprite_1.hp -= options.fireDamage;
					boomSound.play();
					fireball[i].boom();
				}
			}
			if (fireball[i].rightOrLeft == true){
				if (fireball[i].x + fireball[i].width >= sprite_2.x + 95 && centerY >= sprite_2.y && centerY <= sprite_2.y + sprite_2.height - 100 && fireball[i].x <= sprite_2.x + sprite_2.width - 100){
					sprite_2.hp -= options.fireDamage;
					boomSound.play();
					fireball[i].boom();
				}
			}
			else{
				if (fireball[i].x < sprite_2.x + sprite_2.width - 95 && centerY >= sprite_2.y && centerY <= sprite_2.y + sprite_2.height - 100 && fireball[i].x + fireball[i].width >= sprite_2.x + 100){
					sprite_2.hp -= options.fireDamage;
					boomSound.play();
					fireball[i].boom();
				}
			}
		}
	}

	function game(){
		drawBG();
		lifeDraw();
		sprite_1.draw();
		sprite_2.draw();
		boom();
		for (let i = 0; i < fireball.length; i++){
			fireball[i].draw();
		}
		bit();
		if (sprite_1.hp <= 0 && notVictory == true){
			sprite_1.isBow = true;
			notVictory = false;
		}
		if (sprite_2.hp <= 0 && notVictory == true){
			sprite_2.isBow = true;
			notVictory = false;
			sprite_1.isFightStay = true;
			sprite_1.isRight = false;
			sprite_1.isLeft = false;
			sprite_1.isUp = false;
			sprite_1.isDown = false;
			sprite_1.isFoam = false;
			sprite_1.isRun = false;
			sprite_2.isFightStay = true;
			sprite_2.isRight = false;
			sprite_2.isLeft = false;
			sprite_2.isUp = false;
			sprite_2.isDown = false;
			sprite_2.isFoam = false;
			sprite_2.isRun = false;
		}
		if (events == false){
			context.font = "30px Verdana";
			context.fillText("Для начала игры нажмите Enter", 420, options.height / 2);
		}
		if (notVictory == false){
			context.drawImage(victoryImage, options.width - victoryImage.width / 2, options.height - victoryImage / 2);
		}
		if (notVictory == false){
			context.drawImage(victoryImage, options.width * 0.28, options.height * 0.2);
		}
		interval = window.requestAnimationFrame(game);
	}
	let music = new Audio();
	music.src = "Files/Fonovaya_muzyka_Mortal_Kombat_(mp3top.top).mp3";
	music.loop = true;
	document.addEventListener("keydown", function(e){
		if (e.key == "Enter"){
			music.play();
			events = true;
		}
	});
	game();
});