let players = [];
let dungeon;
let enemies = [];
let level = 2;
let HEIGHT_CANVAS = 600;
let WIDTH_CANVAS = 300;
let WALL_SIZE = 20;
let projectiles = [];
let cadence = 10;
let shotFrame = 0;

let wizardSpriteSheet = [];
let wizardSprites1 = [];
let wizardSprites2 = [];
let wizardSprites3 = [];
let wizardSprites4 = [];

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
let bigAmmoSprite;
let mediumAmmoSprite;
let smallAmmoSprite;
let tripleShootSprite;
let angledShootSprite

let powerUpTime;


let startScreen
let pausedScreen
let gameOverScreen

let gameStarted = false
let isRunning = true
let isHanded = false

let indexPos
let fingerDistance

let playersNumber =1;

let isSetup = false

let itemProbability = 10
let itemIsFlying = false
let flyingItem
let flyingItemX
let flyingItemY = 0
let flyingItemImage
let secsUntilNextFlyingItem = 40

let ammoPos = 20

let handMappingRate

let applyAmmo = true

let points = 0

let isGameOver = false

function preload() {
	wizardSpriteSheet.push(loadImage("assets/wizard2.png"));
	wizardSpriteSheet.push(loadImage("assets/wizardPlayer2.png"));
	wizardSpriteSheet.push(loadImage("assets/wizardPlayer3.png"));
	wizardSpriteSheet.push(loadImage("assets/wizardPlayer4.png"));
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
	smallAmmoSprite = loadImage("assets/smallAmmo.png")
	bigAmmoSprite = loadImage("assets/bigAmmo.png")
	mediumAmmoSprite = loadImage("assets/mediumAmmo.png")
	tripleShootSprite = loadImage("assets/3shoot.png")
	angledShootSprite = loadImage("assets/angledShot.png")
	flyingItemImage  = loadImage("assets/flyingItem.png")
	gameOverScreen  = loadImage("assets/GameOverScreen.png")
}

function setup() {
	WIDTH_CANVAS = windowWidth - 20
	HEIGHT_CANVAS = windowHeight - 20
	handMappingRate = 1280/WIDTH_CANVAS
	print('players ' + players)
	createCanvas(WIDTH_CANVAS, HEIGHT_CANVAS);
	//createCanvas(windowWidth, windowHeight)
	background(100);
	frameRate(30);
	imageMode(CENTER);

	tilesSprites = sliceSpriteSheet(tilesSpriteSheet, 2, 3, tilesSprites);
	wizardSprites1 = sliceSpriteSheet(wizardSpriteSheet[0], 5, 8, wizardSprites1);
	wizardSprites2 = sliceSpriteSheet(wizardSpriteSheet[1], 5, 8, wizardSprites2);
	wizardSprites3 = sliceSpriteSheet(wizardSpriteSheet[2], 5, 8, wizardSprites3);
	wizardSprites4 = sliceSpriteSheet(wizardSpriteSheet[3], 5, 8, wizardSprites4);

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

	dungeon = new Dungeon("", tilesSprites, 0, 20, WIDTH_CANVAS/2, doorSprite);
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
	if(keyIsDown(49)){
		playersNumber = 1
	}else if(keyIsDown(50)){
		playersNumber = 2
	}else if(keyIsDown(51)){
		playersNumber = 3
	}else if(keyIsDown(52)){
		playersNumber = 4
	}
	if(!gameStarted){
		if(keyIsDown(32)){
			isSetup = true
		}
	}
	if(isSetup){
		if(isHanded){
			players.push(
				new Player(
				windowWidth / 2,
				HEIGHT_CANVAS - 50,
				100,
				5,
				"none",
				"orange",
				wizardSprites1,
				1000,
				0,
				0,
				0
			));
		}else{
			for(let i=0; i<playersNumber; i++){
				if(i == 0){
					players.push(
						new Player(
						windowWidth / 2,
						HEIGHT_CANVAS - 50,
						100,
						5,
						"none",
						"orange",
						wizardSprites1,
						1000,
						i,
						0,
						83
					));
				}else if(i == 1){
					players.push(
						new Player(
						windowWidth / 2,
						HEIGHT_CANVAS - 50,
						100,
						5,
						"none",
						"orange",
						wizardSprites2,
						1000,
						i,
						0,
						72
					));
				}else if(i == 2){
					players.push(
						new Player(
						windowWidth / 2,
						HEIGHT_CANVAS - 50,
						100,
						5,
						"none",
						"orange",
						wizardSprites3,
						1000,
						i,
						0,
						88
					));
				}else if(i == 3){
					players.push(
						new Player(
						windowWidth / 2,
						HEIGHT_CANVAS - 50,
						100,
						5,
						"none",
						"orange",
						wizardSprites4,
						1000,
						i,
						0,
						78
					));
				}
			}
		}
		isSetup = false
	
	}
	print(players)
	if(isHanded){
		fetch('http://127.0.0.1:5000/hand')  
		.then(response => response.json())  
		.then(data => {
			if(data != []){

				indexPos = data.data[0][24]
			}else{
				indexPos = 200
			}

			fingerDistance = data.data[0][data.data[0].length-1]
		console.log(data.data[0]);  // Log the response from Flask
		console.log(fingerDistance)
		textSize(32);
		//text(data.message, 50, height / 2);  // Display message from Flask
		})
		.catch(error => {
		console.error('Error:', error);  // Handle any errors
		});
	}
	if(gameStarted){
		if(isRunning){
			clear();
			dungeon.drawDungeonWhenLevelChanging();
			if(!isTransition){
				if(isHanded){
					print('numberofplayers' + players.length)
					
					print(players[0])
					for(let player of players){
						player.x = WIDTH_CANVAS - (indexPos/handMappingRate)
					}
					players[0].handleProjectilesHanded()
					players[0].display();
					
				}
			}
			if (!isTransition) {
				//text(players[0].ammo, 20, 20);
				for (let i = 0; i < enemies.length; i++) {
					enemies[i].display();
					enemies[i].move();

					enemies[i].displayHealth();
				}

				print(projectiles);
				enemies.forEach((enemy) => enemy.shoot());
				fill("orange");
				for( let player of players){
					player.display();
					player.move();
					player.displayHealth();
					if(player.id == 0){
						player.handleProjectiles(83);
					}else if(player.id == 1){
						player.handleProjectiles(72);
					}else if(player.id == 2){
						player.handleProjectiles(88);
					}else if(player.id == 3){
						player.handleProjectiles(78);
					}
				}


				if (activeItem != null) {
					if(activeItem.type == ItemType.SHIELD){
						for( let player of players){
							activeItem.display(player.x, player.y);
						}
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
								for(let player of players){
									if (dist(player.x, player.y, projectile.x, projectile.y) < 15) {
										player.makeDamage(0)
										projectiles.splice(projectiles.indexOf(projectile), 1);
									}
								}
							}
						}
					}
				} else {
					print("activeItem is not shield");
					for (let enemy of enemies) {
						let itTouched = false;
						for(let player of players){
							if (dist(enemy.x, enemy.y, player.x, player.y) < 20 && itTouched) {
								itTouched = true;
								players.health -= enemy.damage;
								players.makeDamage(enemy.damage)

							} else {
								itTouched = false;
							}
							if (itTouched) {
								itTouched = false;
							}
						}
					}
					for (let projectile of projectiles) {
						if (projectile.isEnemy) {
							for(let player of players){
								if (dist(player.x, player.y, projectile.x, projectile.y) < 15) {
									print("pew");
									//player.health -= projectile.damage;
									player.makeDamage(projectile.damage)
									projectiles.splice(projectiles.indexOf(projectile), 1);

								}
							}
						}
					}
				}

				for (let enemy of enemies) {
					if (enemy.health <= 0) {
						enemies.splice(enemies.indexOf(enemy), 1);
					}
				}
				for(let player of players){
					if (player.health <= 0) {
						players.splice(players.indexOf(player), 1)
					}
					
				}

				if (enemies.length == 0) {
					if (dungeon.startDoor == (WIDTH_CANVAS/2)-50) {
						isTransition = true;
					} else if (dungeon.startDoor >= -78) {
						dungeon.startDoor--;
					}
				}
				if(players.length == 0){
					//noLoop()
					gameOver()

				}
				if(activeItem != null){
					if(millis() - powerUpTime >= activeItem.getTime()){
						activeItem = null
					}
				}
				try{
					if(!itemIsFlying){
						if(frameCount%600 == 0){
							let aNumber = Math.floor(random(0, itemProbability))
							print('aNumber' + aNumber)
							
							if(aNumber == 1){
								itemIsFlying = true
								flyingItemX = 100
								flyingItemY = 0
							}
						}
					}
					if(itemIsFlying){
						if(ammo>20){
							flyingItem = new Items(random([new Items(ItemType.SHIELD),
								new Items(ItemType.SUPERBALL),
								new Items(ItemType.BIG_AMMO),
								new Items(ItemType.MEDIUM_AMMO),
								new Items(ItemType.SMALL_AMMO),
								new Items(ItemType.TRIPLE_SHOOT),
								new Items(ItemType.ANGLED_SHOOT)
							])
							)
						}else{
							flyingItem = new Items(ItemType.BIG_AMMO)
						}
						print(flyingItem.getImage())
						image(flyingItemImage, flyingItemX, flyingItemY)
						for(let projectile of projectiles){
							if (dist(flyingItemX, flyingItemY, projectile.x, projectile.y) < 15) {
							activeItem = flyingItem.type
							projectiles.splice(projectiles.indexOf(projectile), 1);
							itemIsFlying = false
							}
						}

						flyingItemY++
					}
				}catch (error){
					print('error in item')
				}
			} else {
				print("entra");
				dungeon.startDoor--;
				transition();
				for(let player of players){
					if (player.y <= 200) {
						isTransition = false;
						dungeon.startDoor = 119; 
						setLevel();
						alpha = 0
						projectiles = []
						powerUpTime = millis()
					}
				}
			}

			//if(keyIsDown(27)) isRunning = false

			
		}else{
			
			image(pausedScreen, WIDTH_CANVAS/2, HEIGHT_CANVAS/2)
			//if(keyIsDown(27)) isRunning = true
		}

	}else{
		if(!isGameOver){
			image(startScreen, WIDTH_CANVAS/2, HEIGHT_CANVAS/2)
		}
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
	  if(isGameOver){
		window.location.reload()
	  }
	}
	if(keyCode == 69){
		if(!isRunning){
			gameStarted  =false
			window.location.reload()
		}
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
	for(let player of players){
		player.goToMiddle();
		player.goUp();
		if (player.y <= (HEIGHT_CANVAS/4)*3.5) {
			fadeIn();
		}
		if (player.y <= (HEIGHT_CANVAS/4)*3) {
			chestAnim();
		}
		if (player.y <= (HEIGHT_CANVAS/4)*2.5 + 5 && player.y >= (HEIGHT_CANVAS/4)*2.5 - 20) {
			print('getPowerUp')
			getPowerUp();
		}
		if(player.y < (HEIGHT_CANVAS/4)*2.5 - 21){
			applyAmmo = true
			image(activeItem.getImage(), WIDTH_CANVAS / 2, HEIGHT_CANVAS / 2 - 100);
		}
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
			if(chestIndex == 1){
				points ++
			}
		}
	}

	print(chestIndex);
	image(chestSprite[0][chestIndex], WIDTH_CANVAS / 2, HEIGHT_CANVAS / 2);
	fill('white')
	text(points, WIDTH_CANVAS/2, (HEIGHT_CANVAS/2) + 100)
}

function getPowerUp() {
	//activeItem = new Items(ItemType.SHIELD);
	//activeItem = new Items(ItemType.SUPERBALL);
	activeItem = random([new Items(ItemType.SHIELD),
		new Items(ItemType.SUPERBALL),
		new Items(ItemType.BIG_AMMO),
		new Items(ItemType.MEDIUM_AMMO),
		new Items(ItemType.SMALL_AMMO),
		new Items(ItemType.TRIPLE_SHOOT),
		new Items(ItemType.ANGLED_SHOOT)
	]
	)
	//activeItem = new Items(ItemType.BIG_AMMO)
	if(applyAmmo){
		for(let player of players){
			switch(activeItem.type){
				case ItemType.BIG_AMMO:
					player.ammo += 100
					break
				case ItemType.MEDIUM_AMMO:
					player.ammo += 50
					break
				case ItemType.SMALL_AMMO:
					player.ammo += 20
					break
							
			}
		}
		applyAmmo = false
	}
	image(activeItem.getImage(), WIDTH_CANVAS / 2, HEIGHT_CANVAS / 2 - 100);
	//rect(20, 20, 20, 29)
	print(activeItem);
}
function setLevel() {
	level += 1;

	if(itemProbability>0){
		itemProbability--
	}
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
	for(let player of players){
		player.y = HEIGHT_CANVAS - 50;
	}
	dungeon = new Dungeon("", tilesSprites, 0, 20, WIDTH_CANVAS/2, doorSprite);
	chestIndex = 0;
}

function gameOver(){
	image(gameOverScreen, WIDTH_CANVAS/2, HEIGHT_CANVAS/2)
	text(points, WIDTH_CANVAS/2, (HEIGHT_CANVAS/2) + 100)
	isGameOver = true

	gameStarted = false
}
