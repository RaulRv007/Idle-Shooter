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

function preload() {
	wizardSpriteSheet = loadImage("assets/wizard2.png");
	tilesSpriteSheet = loadImage("assets/tiles.png");
}
  

function setup() {
	createCanvas(WIDTH_CANVAS, HEIGHT_CANVAS);
	background(100);
	frameRate(30)
	imageMode(CENTER);


	tilesSprites = sliceSpriteSheet(tilesSpriteSheet, 2, 3, tilesSprites);
	wizardSprites = sliceSpriteSheet(wizardSpriteSheet, 5, 8, wizardSprites);

	//print(wizardSprites[0][1])
	player = new Player(WIDTH_CANVAS/2, 550, 100, 5, "none", 'orange', wizardSprites)
	dungeon = new Dungeon('', '', 0, 20)
	for(let i = 0;i<=level;i++){
		enemies.push(
			new Enemy(
				Math.round(random(WALL_SIZE+1, WIDTH_CANVAS-WALL_SIZE-1)),
				Math.round(random(50, HEIGHT_CANVAS-500)),
				'',
				10,
				5,
				'red',
				Math.round(random([-3, -2, -1, 1, 2, 3])),
				Math.round(Math.round(random([-3, -2, -1, 1, 2, 3]))),
				50
			)
		)
		
	}
	//print(enemies)



}

function draw() {
	
	clear()
	dungeon.drawDungeon()

	for(let i = 0; i<enemies.length; i++){
		enemies[i].display()
		enemies[i].move()
		enemies[i].shoot()
		enemies[i].displayHealth()
	}


	fill('orange');
	player.display();
	player.move();
	player.displayHealth();

	handleProjectiles();

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
		level += 1
		for(let i = 0;i<=level;i++){
			enemies.push(
				new Enemy(
					Math.round(random(WALL_SIZE+1, WIDTH_CANVAS-WALL_SIZE-1)),
					Math.round(random(50, HEIGHT_CANVAS-500)),
					'',
					10,
					5,
					'red',
					Math.round(random([-3, -2, -1, 1, 2, 3])),
					Math.round(Math.round(random([-3, -2, -1, 1, 2, 3]))),
					50
				)
			)
			
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
		  spriteArray[y][x] = wizardSpriteSheet.get(x * w, y * h, w, h);
		}
	
	}
	return spriteArray;
}






