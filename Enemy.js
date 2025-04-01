class Enemy{
	constructor(x, y, projectile, health, damage, sprite, speedX, speedY, cadence){
		this.x = x
		this.y = y
		this.projectile = projectile
		this.health = health
		this.damage = damage
		this.sprite = sprite
		this.speedX = speedX
		this.speedY = speedY
        this.cadence = Math.ceil(random(cadence-2, cadence+8))
	}
	display(){

		if(this.speedX > 0) image(this.sprite[2][Math.floor(frameCount/6) % this.sprite[1].length], this.x, this.y)
		else image(this.sprite[1][Math.floor(frameCount/6) % this.sprite[2].length], this.x, this.y)

	}
	move(){
		this.x += this.speedX
		this.y += this.speedY
		if(this.x >= WIDTH_CANVAS - WALL_SIZE - 10 || this.x <= WALL_SIZE + 10){
			this.speedX *= -1
		}
		if(this.y >= HEIGHT_CANVAS-WALL_SIZE - 10 || this.y <= WALL_SIZE + 10){
			this.speedY *= -1
		}
	}
	makeDamage(dam){
		this.health -= dam
		fill('white')
		circle(this.x, this.y, 20)
		let hitTime = frameCount
		if(hitTime - frameCount > 10){
			fill(this.color)
			circle(this.x, this.y, 20)
		}
	}
    shoot(){
		
        if (frameCount % this.cadence === 0) {
            let newProjectile = new Projectile(this.x, this.y + 10, 5, this.projectile, 10, 5, true);
            projectiles.push(newProjectile);
			pewEnemySound.play()
        }

        

    
    }
    displayHealth(){
        fill('white')
        rect(this.x-10, this.y-30, 20, 5)
        fill('red')
        rect(this.x-10, this.y-30, this.health*2, 5)
    }


}