let player;
let dungeon
let enemies = []
let level =2
let HEIGHT_CANVAS = 600
let WIDTH_CANVAS = 300
let WALL_SIZE = 20
let projectiles = [];
let cadence = 10;
let shotFrame = 0;
function setup() {
	createCanvas(WIDTH_CANVAS, HEIGHT_CANVAS);
	background(100);
	frameRate(60)
	player = new Player(WIDTH_CANVAS/2, 550, 100, 5, "none", 'orange');
	dungeon = new Dungeon('', '', 0, 20)
	for(let i = 0;i<=level;i++){
		enemies.push(
			new Enemy(Math.round(random(20, WIDTH_CANVAS-20)),
			Math.round(random(20, HEIGHT_CANVAS-20)),
			'',
			10,
			10,
			'red',
			Math.round(random([-3, -2, -1, 1, 2, 3])),
			Math.round(Math.round(random([-3, -2, -1, 1, 2, 3]))))
		)
		
	}
	print(enemies)



}

function draw() {
	
	clear()
	dungeon.drawDungeon()

	for(let i = 0; i<enemies.length; i++){
		enemies[i].display()
		enemies[i].move()
	}
	fill('orange');
	player.display();
	player.move();
	handleProjectiles();
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
				if (dist(enemy.x, enemy.y, projectile.x, projectile.y) < 15) {
					hitProjectile  = projectile
					enemy.health -= projectile.damage;
					projectiles.splice(projectiles.indexOf(projectile), 1);
				}
			}

		}
	}
	for (let enemy of enemies) {
		if (dist(enemy.x, enemy.y, player.x, player.y) < 20) {
			player.health -= enemy.damage;
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

}

class Player {
	constructor(x, y, health, speed, powerup, color) {
		this.x = x;
		this.y = y;
		this.health = health;
		this.speed = speed;
		this.powerup = powerup;
		this.color = color
	}

	move() {
		if (keyIsDown('A'.charCodeAt())) this.x -= this.speed;
		if (keyIsDown('D'.charCodeAt())) this.x += this.speed;
	}

	display() {
		fill(this.color)
		circle(this.x, this.y, 30)
	}
}

class Dungeon{
	constructor(theme, sprite, level, size){
		this.theme = theme
		this.sprite = sprite
		this.level = level
		this.size = size
	}
	drawDungeon(){
		fill('cornflowerblue')
		for(let x =0; x<=windowWidth; x = x+this.size){
			for(let y = 0; y<=windowHeight; y=y+this.size){
				rect(x, y, this.size, this.size)
			}
		}
	}
}
class Enemy{
	constructor(x, y, projectile, health, damage, color, speedX, speedY){
		this.x = x
		this.y = y
		this.projectile = projectile
		this.health = health
		this.damage = damage
		this.color = color
		this.speedX = speedX
		this.speedY = speedY
	}
	display(){
		fill(this.color)
		circle(this.x, this.y, 20)
	}
	move(){
		this.x += this.speedX
		this.y += this.speedY
		if(this.x >= WIDTH_CANVAS - WALL_SIZE || this.x <= WALL_SIZE){
			this.speedX *= -1
		}
		if(this.y >= HEIGHT_CANVAS-WALL_SIZE || this.y <= WALL_SIZE){
			this.speedY *= -1
		}
	}
}
class Projectile{
	constructor(x, y, speed, color, cadence, damage){
		this.x = x
		this.y = y
		this.speed = speed
		this.color = color
		this.cadence = cadence
		this.damage = damage
	}
	display(){
		fill(this.color)
		circle(this.x, this.y, 5)
	}
	move(){
		this.y += this.speed
	}
}
function handleProjectiles() {	
	if (keyIsDown(32)) { // 32 is the keyCode for the spacebar
		if (frameCount - shotFrame > cadence) {
			projectiles.push(new Projectile(player.x, player.y, -5, 'yellow', cadence, 5));
			shotFrame = frameCount;
		}

	}


}
