class Projectile{
	constructor(x, y, speed, sprite, cadence, damage, isEnemy){
		this.x = x
		this.y = y
		this.speed = speed
		this.sprite = sprite
		this.cadence = cadence
		this.damage = damage
        this.isEnemy = isEnemy
	}
	display(){
		image(this.sprite[0][0], this.x, this.y)
		image(this.sprite[0][1], this.x, this.y)
		image(this.sprite[0][frameCount % this.sprite.length], this.x, this.y)
	}
	move(){
		this.y += this.speed
	}
 

	
}
