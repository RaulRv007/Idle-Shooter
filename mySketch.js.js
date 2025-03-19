let player;
let dungeon;
let enemies = [];
let level = 2;
let HEIGHT_CANVAS = 600;
let WIDTH_CANVAS = 300;
let WALL_SIZE = 20;
let projectiles = [];
let cadence = 10;
let shotFrame = 0;

let wizardSpriteSheet;
let wizardSprites = [];

let tilesSpriteSheet;
let tilesSprites = [];

let fireBallSpriteSheet;
let fireBallSprites = [];

let superBallSpriteSheet;
let superBallSprites = [];

let enemyFireballSpriteSheet
let enemyFireballSprites = []

let enemy1SpriteSheet;
let enemy1Sprites = [];

let doorSprite;

let chestSpriteSheet;
let chestSprite = [];

let isTransition;

let alpha = 0;
let fadeSpeed = 4;
let fadingIn = true;

let chestAnimComplete = false;
let chestIndex = 0;

//items
let activeItem;

let shieldSprite;
let superballImage

let powerUpTime;


let startScreen
let pausedScreen

let gameStarted = false
let isRunning = true
let isHanded = false

let indexPos
let fingerDistance



function preload() {
	wizardSpriteSheet = loadImage("assets/wizard2.png");
	tilesSpriteSheet = loadImage("assets/tiles.png");
	fireBallSpriteSheet = loadImage("assets/fireball.png");
	enemy1SpriteSheet = loadImage("assets/gorksprite.png");
	doorSprite = loadImage("assets/Door.png");
	chestSpriteSheet = loadImage("assets/chest.png");
	shieldSprite = loadImage("assets/shield.png");
	superBallSpriteSheet = loadImage("assets/fireballSuper.png")
	superballImage = loadImage("assets/superballImage.png")
	startScreen = loadImage("assets/StartScreen.png")
	pausedScreen = loadImage("assets/pausedScreen.png")
	enemyFireballSpriteSheet = loadImage("assets/enemyFireball.png")
}

function setup() {
	createCanvas(WIDTH_CANVAS, HEIGHT_CANVAS);
	background(100);
	frameRate(30);
	imageMode(CENTER);

	tilesSprites = sliceSpriteSheet(tilesSpriteSheet, 2, 3, tilesSprites);
	wizardSprites = sliceSpriteSheet(wizardSpriteSheet, 5, 8, wizardSprites);
	fireBallSprites = sliceSpriteSheet(
		fireBallSpriteSheet,
		16,
		6,
		fireBallSprites
	);
	superBallSprites = sliceSpriteSheet(
		superBallSpriteSheet,
		16,
		6,
		superBallSprites
	);
	enemyFireballSprites = sliceSpriteSheet(
		enemyFireballSpriteSheet,
		16,
		6,
		enemyFireballSprites
	);
	enemy1Sprites = sliceSpriteSheet(enemy1SpriteSheet, 4, 4, enemy1Sprites);
	chestSprite = sliceSpriteSheet(chestSpriteSheet, 4, 5, chestSprite);

	player = new Player(
		WIDTH_CANVAS / 2,
		550,
		100,
		5,
		"none",
		"orange",
		wizardSprites,
		200
	);
	dungeon = new Dungeon("", tilesSprites, 0, 20, 120, doorSprite);
	for (let i = 0; i <= level; i++) {
		enemies.push(
			new Enemy(
				Math.round(random(WALL_SIZE + 1, WIDTH_CANVAS - WALL_SIZE - 1)),
				Math.round(random(50, HEIGHT_CANVAS - 500)),
				enemyFireballSprites,
				10,
				5,
				enemy1Sprites,
				Math.round(random([-3, -2, -1, 1, 2, 3])),
				Math.round(Math.round(random([-3, -2, -1, 1, 2, 3]))),
				50
			)
		);
	}
	fetch('http://127.0.0.1:5000/hand')  // Flask API URL
    .then(response => response.json())  // Convert response to JSON
    .then(data => {
		
      console.log(data);  // Log the response from Flask
      textSize(32);
      text(data.message, 50, height / 2);  // Display message from Flask
    })
    .catch(error => {
      console.error('Error:', error);  // Handle any errors
    });
}

function draw() {
	fetch('http://127.0.0.1:5000/hand')  // Flask API URL
    .then(response => response.json())  // Convert response to JSON
    .then(data => {
		indexPos = data.data[0][24]
		fingerDistance = data.data[0][data.data[0].length-1]
      console.log(data.data[0]);  // Log the response from Flask
	  console.log(fingerDistance)
      textSize(32);
      //text(data.message, 50, height / 2);  // Display message from Flask
    })
    .catch(error => {
      console.error('Error:', error);  // Handle any errors
    });
	if(gameStarted){
		if(isRunning){
			clear();
			dungeon.drawDungeonWhenLevelChanging();
			if(!isTransition){
				if(isHanded){
					player.x = WIDTH_CANVAS - (indexPos/3.5)
					player.handleProjectilesHanded()
				}
			}
			if (!isTransition) {
				text(player.ammo, 20, 20);
				for (let i = 0; i < enemies.length; i++) {
					enemies[i].display();
					enemies[i].move();

					enemies[i].displayHealth();
				}

				print(projectiles);
				enemies.forEach((enemy) => enemy.shoot());
				fill("orange");
				player.display();
				player.move();
				player.displayHealth();

				player.handleProjectiles();
				if (activeItem != null) {
					if(activeItem.type == ItemType.SHIELD){
						activeItem.display(player.x, player.y);
					}
				}

				//print(player.health)

				for (let projectile of projectiles) {
					projectile.display();
					projectile.move();
					if (
						projectile.x <= 0 ||
						projectile.x >= WIDTH_CANVAS ||
						projectile.y <= 0 ||
						projectile.y >= HEIGHT_CANVAS
					) {
						projectiles.splice(projectiles.indexOf(projectile), 1);
					}
				}

				for (let enemy of enemies) {
					for (let projectile of projectiles) {
						let hitProjectile;
						if (hitProjectile != projectile) {
							if (!projectile.isEnemy) {
								if (dist(enemy.x, enemy.y, projectile.x, projectile.y) < 15) {
									hitProjectile = projectile;
									enemy.makeDamage(projectile.damage);
									projectiles.splice(projectiles.indexOf(projectile), 1);
								}
							}
						}
					}
				}


				if (activeItem != null) {
					if (activeItem.type == ItemType.SHIELD) {
						print('active is a shield')
						for (let projectile of projectiles) {
							if (projectile.isEnemy) {
								if (dist(player.x, player.y, projectile.x, projectile.y) < 15) {
									player.makeDamage(0)
									projectiles.splice(projectiles.indexOf(projectile), 1);
								}
							}
						}
					}
				} else {
					print("activeItem is not shield");
					for (let enemy of enemies) {
						let itTouched = false;
						if (dist(enemy.x, enemy.y, player.x, player.y) < 20 && itTouched) {
							itTouched = true;
							player.health -= enemy.damage;
							player.makeDamage(enemy.damage)

						} else {
							itTouched = false;
						}
						if (itTouched) {
							itTouched = false;
						}
					}
					for (let projectile of projectiles) {
						if (projectile.isEnemy) {
							if (dist(player.x, player.y, projectile.x, projectile.y) < 15) {
								print("pew");
								//player.health -= projectile.damage;
								player.makeDamage(projectile.damage)
								projectiles.splice(projectiles.indexOf(projectile), 1);

							}
						}
					}
				}

				for (let enemy of enemies) {
					if (enemy.health <= 0) {
						enemies.splice(enemies.indexOf(enemy), 1);
					}
				}
				if (player.health <= 0) {
					noLoop();
				}

				if (enemies.length == 0) {
					if (dungeon.startDoor == -78) {
						isTransition = true;
					} else if (dungeon.startDoor >= -78) {
						dungeon.startDoor--;
					}
				}
				if(activeItem != null){
					if(millis() - powerUpTime >= activeItem.getTime()){
						activeItem = null
					}
				}
			} else {
				print("entra");
				transition();
				if (player.y <= 200) {
					isTransition = false;
					dungeon.startDoor = 119;
					setLevel();
					alpha = 0
					projectiles = []
					powerUpTime = millis()
				}
			}

			//if(keyIsDown(27)) isRunning = false

			
		}else{
			
			image(pausedScreen, WIDTH_CANVAS/2, HEIGHT_CANVAS/2)
			//if(keyIsDown(27)) isRunning = true
		}

	}else{
		image(startScreen, WIDTH_CANVAS/2, HEIGHT_CANVAS/2)
		if(keyIsDown(32)){
			gameStarted = true
		}
		if(keyIsDown('H'.charCodeAt())){
			isHanded = true
		}
	}
}
function keyPressed() {
	if (keyCode === 27) {  // 27 is the key code for Escape
	  print("Escape pressed!");
	  isRunning = !isRunning; // Toggle game state
	}
  }
function sliceSpriteSheet(spriteSheet, rows, columns, spriteArray) {
	let w = spriteSheet.width / columns;
	let h = spriteSheet.height / rows;

	for (let y = 0; y < columns; y++) {
		// create another emoty array for that row
		spriteArray[y] = [];
		// there are 12 images in a row, iterate through them
		for (let x = 0; x < rows; x++) {
			// get the image subsection there and then stor in the array
			spriteArray[y][x] = spriteSheet.get(x * w, y * h, w, h);
		}
	}
	return spriteArray;
}
function transition() {

	player.goToMiddle();
	player.goUp();
	if (player.y <= 500) {
		fadeIn();
	}
	if (player.y <= 400) {
		chestAnim();
	}
	if (player.y == 300) {
		getPowerUp();
	}
	if(player.y < 300){
		image(activeItem.getImage(), WIDTH_CANVAS / 2, HEIGHT_CANVAS / 2 - 100);
	}

}
function fadeIn() {
	fill(0, 0, 0, alpha);
	rect(0, 0, width, height);

	alpha += fadeSpeed;
	if (alpha >= 255) {
		alpha = 255;
	}
}
function fadeOut() {
	fill(0, 0, 0, alpha);
	rect(0, 0, width, height);

	alpha -= fadeSpeed;
	if (alpha <= 255) {
		alpha = 255;
	}
}
function chestAnim() {
	if (chestIndex <= 2) {
		if (frameCount % 20 == 0) {
			chestIndex++;
		}
	}
	print(chestIndex);
	image(chestSprite[0][chestIndex], WIDTH_CANVAS / 2, HEIGHT_CANVAS / 2);
}

function getPowerUp() {
	//activeItem = new Items(ItemType.SHIELD);
	//activeItem = new Items(ItemType.SUPERBALL);
	activeItem = random([new Items(ItemType.SHIELD), new Items(ItemType.SUPERBALL)])
	image(activeItem.getImage(), WIDTH_CANVAS / 2, HEIGHT_CANVAS / 2 - 100);
	//rect(20, 20, 20, 29)
	print(activeItem);
}
function setLevel() {
	level += 1;
	for (let i = 0; i <= level; i++) {
		enemies.push(
			new Enemy(
				Math.round(random(WALL_SIZE + 1, WIDTH_CANVAS - WALL_SIZE - 1)),
				Math.round(random(50, HEIGHT_CANVAS - 500)),
				enemyFireballSprites,
				10,
				5,
				enemy1Sprites,
				Math.round(random([-3, -2, -1, 1, 2, 3])),
				Math.round(Math.round(random([-3, -2, -1, 1, 2, 3]))),
				50
			)
		);
	}
	player.y = 550;
	dungeon = new Dungeon("", tilesSprites, 0, 20, 120, doorSprite);
	chestIndex = 0;
}
