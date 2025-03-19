class Player {
	constructor(x, y, health, speed, powerup, color, sprite, ammo) {
		this.x = x;
		this.y = y;
		this.health = health;
		this.speed = speed;
		this.powerup = powerup;
		this.color = color
        this.sprite = sprite
        this.ammo = ammo
	}

	move() {
        if(this.x < WIDTH_CANVAS-WALL_SIZE && this.x > WALL_SIZE){
            if (keyIsDown('A'.charCodeAt())) this.x -= this.speed;
            if (keyIsDown('D'.charCodeAt())) this.x += this.speed;
        }else if(this.x == WIDTH_CANVAS-WALL_SIZE){
            this.x -= this.speed
            
        }else if(this.x == WALL_SIZE){
            this.x += this.speed
        }
	}

	display() {
		fill(this.color)
        if (keyIsDown('A'.charCodeAt())) {
            image(this.sprite[1][frameCount % this.sprite[1].length], this.x, this.y);
        } else if (keyIsDown('D'.charCodeAt())) {
            image(this.sprite[2][frameCount % this.sprite[2].length], this.x, this.y);
        } else {
            image(this.sprite[0][4], this.x, this.y);
        }

	}
    displayHealth(){
        fill('white')
        rect(this.x-15, this.y-40, 30, 5)
        fill('green')
        rect(this.x-15, this.y-40, (30*this.health)/100, 5)
    }
    handleProjectiles() {	
        if(activeItem != null){
            if(activeItem.type == ItemType.SUPERBALL){
                if(this.ammo >= 0){
                    if (keyIsDown(32)) { // 32 is the keyCode for the spacebar
                        if (frameCount - shotFrame > cadence) {
                            projectiles.push(new Projectile(player.x, player.y, -5, superBallSprites, cadence, 20, false));
                            shotFrame = frameCount;
                            this.ammo--
                        }
                
                    }
                }
            }else{
                if(this.ammo >= 0){
                    if (keyIsDown(32)) { // 32 is the keyCode for the spacebar
                        if (frameCount - shotFrame > cadence) {
                            projectiles.push(new Projectile(player.x, player.y, -5, fireBallSprites, cadence, 5, false));
                            shotFrame = frameCount;
                            this.ammo--
                        }
                
                    }
                }
            }
        }else{
            if(this.ammo >= 0){
                if (keyIsDown(32)) { // 32 is the keyCode for the spacebar
                    if (frameCount - shotFrame > cadence) {
                        projectiles.push(new Projectile(player.x, player.y, -5, fireBallSprites, cadence, 5, false));
                        shotFrame = frameCount;
                        this.ammo--
                    }
            
                }
            }
        }
	}
    goToMiddle(){
        if(this.x > 150){
            this.x--
            image(this.sprite[1][frameCount % this.sprite[1].length], this.x, this.y);
        }else if(this.x < 150){
            this.x++
            image(this.sprite[2][frameCount % this.sprite[2].length], this.x, this.y);
        }else{
            this.x = 150
            image(this.sprite[0][4], this.x, this.y);
        }
    }
    goUp(){
        if(this.x== 150){
        this.y--
        }
    }
    makeDamage(dam){

        if(activeItem != null){
            if(activeItem.type == ItemType.SHIELD){
                fill('cornflowerblue')
                circle(this.x, this.y, 20)
                let hitTime = frameCount
                if(hitTime - frameCount > 10){
                    fill(this.color)
                    circle(this.x, this.y, 20)
                }
            }else{
                this.health -= dam
                fill('orange')
                circle(this.x, this.y, 20)
                let hitTime = frameCount
                if(hitTime - frameCount > 10){
                    fill(this.color)
                    circle(this.x, this.y, 20)
                }
            }
        }else{
            this.health -= dam
            fill('orange')
            circle(this.x, this.y, 20)
            let hitTime = frameCount
            if(hitTime - frameCount > 10){
                fill(this.color)
                circle(this.x, this.y, 20)
            }
        }
    }
}