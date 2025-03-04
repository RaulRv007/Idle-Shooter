class Projectile{
	constructor(x, y, speed, color, cadence, damage, isEnemy){
		this.x = x
		this.y = y
		this.speed = speed
		this.color = color
		this.cadence = cadence
		this.damage = damage
        this.isEnemy = isEnemy
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
			projectiles.push(new Projectile(player.x, player.y, -5, 'yellow', cadence, 5, false));
			shotFrame = frameCount;
		}

	}


}