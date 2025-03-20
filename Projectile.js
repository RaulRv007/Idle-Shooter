class Projectile{
	constructor(x, y, speed, sprite, cadence, damage, isEnemy, toRight, toLeft){
		this.x = x
		this.y = y
		this.speed = speed
		this.sprite = sprite
		this.cadence = cadence
		this.damage = damage
        this.isEnemy = isEnemy
		this.toLeft = toLeft
		this.toRight = toRight
	}
	display(){
		image(this.sprite[0][0], this.x, this.y)
		image(this.sprite[0][1], this.x, this.y)
		image(this.sprite[0][frameCount % this.sprite.length], this.x, this.y)
	}
	move(){
		if(this.toRight){
			this.y += this.speed
			this.x += this.speed - 1
		}else if(this.toLeft){
			this.y += this.speed
			this.x -= this.speed -1
		}else{
			this.y += this.speed
		}

	}
 

	
}
