class Enemy{
	constructor(x, y, projectile, health, damage, color, speedX, speedY, cadence){
		this.x = x
		this.y = y
		this.projectile = projectile
		this.health = health
		this.damage = damage
		this.color = color
		this.speedX = speedX
		this.speedY = speedY
        this.cadence = cadence
	}
	display(){
		fill(this.color)
		circle(this.x, this.y, 20)
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
            let newProjectile = new Projectile(this.x, this.y + 10, 2, 'red', 10, 5, true);
            projectiles.push(newProjectile);
        }
        projectiles.forEach((projectile, index) => {
            projectile.move();
            projectile.display();
            if(projectile.x <= 0 || projectile.x >= WIDTH_CANVAS || projectile.y <= 0 || projectile.y >= HEIGHT_CANVAS){
                projectiles.splice(projectiles.indexOf(projectile), 1)
            }
        });
        

    
    }
    displayHealth(){
        fill('white')
        rect(this.x-10, this.y-30, 20, 5)
        fill('red')
        rect(this.x-10, this.y-30, this.health*2, 5)
    }


}