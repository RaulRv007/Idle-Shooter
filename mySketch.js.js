let player;
let dungeon
let enemies = []
let level = 2
let HEIGHT_CANVAS = 600
let WIDTH_CANVAS = 300
let WALL_SIZE = 20
let projectiles = [];
let cadence = 10;
let shotFrame = 0;

let wizardSpriteSheet;
let wizardSprites = [];

let tilesSpriteSheet;
let tilesSprites = [];

let fireBallSpriteSheet;
let fireBallSprites = [];

let enemy1SpriteSheet;
let enemy1Sprites = [];

let doorSprite

let chestSpriteSheet
let chestSprite = []

let isTransition

let alpha = 0;
let fadeSpeed = 4;
let fadingIn = true;

let chestAnimComplete = false;
let chestIndex = 0

//items
let activeItem

let shieldSprite

function preload() {
	wizardSpriteSheet = loadImage("assets/wizard2.png");
	tilesSpriteSheet = loadImage("assets/tiles.png");
	fireBallSpriteSheet = loadImage("assets/fireball.png");
	enemy1SpriteSheet = loadImage("assets/gorksprite.png");
	doorSprite = loadImage("assets/Door.png")
	chestSpriteSheet = loadImage("assets/chest.png")
	shieldSprite = loadImage("assets/shield.png")
}
  

function setup() {
	createCanvas(WIDTH_CANVAS, HEIGHT_CANVAS);
	background(100);
	frameRate(30)
	imageMode(CENTER);


	tilesSprites = sliceSpriteSheet(tilesSpriteSheet, 2, 3, tilesSprites);
	wizardSprites = sliceSpriteSheet(wizardSpriteSheet, 5, 8, wizardSprites);
	fireBallSprites = sliceSpriteSheet(fireBallSpriteSheet, 16, 6, fireBallSprites);
	enemy1Sprites = sliceSpriteSheet(enemy1SpriteSheet, 4, 4, enemy1Sprites);
	chestSprite = sliceSpriteSheet(chestSpriteSheet, 4, 5, chestSprite)


	player = new Player(WIDTH_CANVAS/2, 550, 100, 5, "none", 'orange', wizardSprites, 200)
	dungeon = new Dungeon('', tilesSprites, 0, 20, 120, doorSprite)
	for(let i = 0;i<=level;i++){
		enemies.push(
			new Enemy(
				Math.round(random(WALL_SIZE+1, WIDTH_CANVAS-WALL_SIZE-1)),
				Math.round(random(50, HEIGHT_CANVAS-500)),
				fireBallSprites,
				10,
				5,
				enemy1Sprites,
				Math.round(random([-3, -2, -1, 1, 2, 3])),
				Math.round(Math.round(random([-3, -2, -1, 1, 2, 3]))),
				50
			)
		)
		
	}
	//print(enemies)



}

function draw() {
	if(!isTransition){
	clear()
	dungeon.drawDungeonWhenLevelChanging()
	text(player.ammo, 20, 20)
	for(let i = 0; i<enemies.length; i++){
		enemies[i].display()
		enemies[i].move()

		enemies[i].displayHealth()
	}

	print(projectiles)
	enemies.forEach(enemy => enemy.shoot());
	fill('orange');
	player.display();
	player.move();
	player.displayHealth();

	player.handleProjectiles();

	//print(player.health)

	for (let projectile of projectiles) {
		projectile.display();
		projectile.move();
		if(projectile.x <= 0 || projectile.x >= WIDTH_CANVAS || projectile.y <= 0 || projectile.y >= HEIGHT_CANVAS){
			projectiles.splice(projectiles.indexOf(projectile), 1)
		}
	}

	for (let enemy of enemies) {
		for (let projectile of projectiles) {
			let hitProjectile
			if(hitProjectile != projectile){
				if(!projectile.isEnemy){
					if (dist(enemy.x, enemy.y, projectile.x, projectile.y) < 15) {
						hitProjectile  = projectile
						enemy.makeDamage(projectile.damage)
						projectiles.splice(projectiles.indexOf(projectile), 1);
					}
				}	
			}

		}
	}

	for (let enemy of enemies) {
		let itTouched = false
		if (dist(enemy.x, enemy.y, player.x, player.y) < 20 && itTouched) {
			itTouched = true
			player.health -= enemy.damage;
		}else{
			itTouched = false
		}
		if(itTouched){

			itTouched = false
		}
	}

	for (let projectile of projectiles) {
		if(projectile.isEnemy){
			if (dist(player.x, player.y, projectile.x, projectile.y) < 15) {
				player.health -= projectile.damage;
				projectiles.splice(projectiles.indexOf(projectile), 1);
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

	if(enemies.length == 0){


		if(dungeon.startDoor == -78){
			isTransition = true
			

		}else if(dungeon.startDoor >= -78 ){
			dungeon.startDoor--
			
		}

	}
	}else{
		print("entra")
		transition()
		if(player.y <= 200){
			isTransition = false
			dungeon.startDoor = 119
			setLevel()
		}
	}

	print(player.y)
	print(isTransition)

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
function transition(){
	player.goToMiddle()
	player.goUp()
	if(player.y <= 500){
		fade()
	}
	if(player.y<=400){
		chestAnim()
	}
	if(player.y<=300){
		getPowerUp()
	}

	
}
function fade(){
	fill(0, 0, 0, alpha);
	rect(0, 0, width, height);
  
	alpha += fadeSpeed;
	if (alpha >= 255) {
		alpha = 255;
		fadingIn = false;
	}


	
}
function chestAnim(){
	if(chestIndex<=2){
		if(frameCount % 20 == 0){
			chestIndex++
		}
	}	
	print(chestIndex)
	image(chestSprite[0][chestIndex],  WIDTH_CANVAS/2, HEIGHT_CANVAS/2)

}

function getPowerUp(){
	activeItem = new Items(ItemType.SHIELD)
	image(activeItem.getImage(), WIDTH_CANVAS/2, HEIGHT_CANVAS/2 - 100)
	//rect(20, 20, 20, 29)
	print(activeItem)
}
function setLevel(){
	level += 1
	for(let i = 0;i<=level;i++){
		enemies.push(
			new Enemy(
				Math.round(random(WALL_SIZE+1, WIDTH_CANVAS-WALL_SIZE-1)),
				Math.round(random(50, HEIGHT_CANVAS-500)),
				fireBallSprites,
				10,
				5,
				enemy1Sprites,
				Math.round(random([-3, -2, -1, 1, 2, 3])),
				Math.round(Math.round(random([-3, -2, -1, 1, 2, 3]))),
				50
			)
		)
		
	}
	player.y = 550
	dungeon = new Dungeon('', tilesSprites, 0, 20, 120, doorSprite)
}






