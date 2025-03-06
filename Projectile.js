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
		/*for(let i = 0; i<this.sprite[0].length; i++){
			print(i)
			image(this.sprite[0][i], this.x, this.y)
		}*/
		image(this.sprite[0][0], this.x, this.y)
		image(this.sprite[0][1], this.x, this.y)
		image(this.sprite[0][2], this.x, this.y)
	}
	move(){
		this.y += this.speed
	}


	
}
