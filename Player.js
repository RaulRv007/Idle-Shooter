class Player {
	constructor(x, y, health, speed, powerup, color, sprite, ammo, id) {
		this.x = x;
		this.y = y;
		this.health = health;
		this.speed = speed;
		this.powerup = powerup;
		this.color = color
        this.sprite = sprite
        this.ammo = ammo
        this.id = id
	}

	move() {
        if(this.id == 0){
            if (keyIsDown('A'.charCodeAt()) && this.x > WALL_SIZE) {
                this.x -= this.speed;
            }
            if (keyIsDown('D'.charCodeAt()) && this.x < WIDTH_CANVAS - WALL_SIZE) {
                this.x += this.speed;
            }
        }else if(this.id == 1){
            if (keyIsDown('G'.charCodeAt()) && this.x > WALL_SIZE) {
                this.x -= this.speed;
            }
            if (keyIsDown('J'.charCodeAt()) && this.x < WIDTH_CANVAS - WALL_SIZE) {
                this.x += this.speed;
            }
        }else if(this.id == 2){
            if (keyIsDown('Z'.charCodeAt()) && this.x > WALL_SIZE) {
                this.x -= this.speed;
            }
            if (keyIsDown('C'.charCodeAt()) && this.x < WIDTH_CANVAS - WALL_SIZE) {
                this.x += this.speed;
            }
        }else if(this.id == 3){
            if (keyIsDown('B'.charCodeAt()) && this.x > WALL_SIZE) {
                this.x -= this.speed;
            }
            if (keyIsDown('M'.charCodeAt()) && this.x < WIDTH_CANVAS - WALL_SIZE) {
                this.x += this.speed;
            }
        }
	}

	display() {
        if(this.id == 0){
            fill(this.color)
            if (keyIsDown('A'.charCodeAt())) {
                image(this.sprite[1][frameCount % this.sprite[1].length], this.x, this.y);
            } else if (keyIsDown('D'.charCodeAt())) {
                image(this.sprite[2][frameCount % this.sprite[2].length], this.x, this.y);
            } else {
                image(this.sprite[0][4], this.x, this.y);
            }
        }else if(this.id == 1){
            fill(this.color)
            if (keyIsDown('G'.charCodeAt())) {
                image(this.sprite[1][frameCount % this.sprite[1].length], this.x, this.y);
            } else if (keyIsDown('J'.charCodeAt())) {
                image(this.sprite[2][frameCount % this.sprite[2].length], this.x, this.y);
            } else {
                image(this.sprite[0][4], this.x, this.y);
            }
        }else if(this.id == 2){
            fill(this.color)
            if (keyIsDown('Z'.charCodeAt())) {
                image(this.sprite[1][frameCount % this.sprite[1].length], this.x, this.y);
            } else if (keyIsDown('C'.charCodeAt())) {
                image(this.sprite[2][frameCount % this.sprite[2].length], this.x, this.y);
            } else {
                image(this.sprite[0][4], this.x, this.y);
            }
        }else if(this.id == 3){
            fill(this.color)
            if (keyIsDown('B'.charCodeAt())) {
                image(this.sprite[1][frameCount % this.sprite[1].length], this.x, this.y);
            } else if (keyIsDown('M'.charCodeAt())) {
                image(this.sprite[2][frameCount % this.sprite[2].length], this.x, this.y);
            } else {
                image(this.sprite[0][4], this.x, this.y);
            }

        }


	}
    displayHealth(){
        fill('white')
        rect(this.x-15, this.y-40, 30, 5)
        fill('green')
        rect(this.x-15, this.y-40, (30*this.health)/100, 5)
    }
    handleProjectiles(keyCode) {	
        try {
            
        
        if(activeItem.type== ItemType.TRIPLE_SHOOT){
            if(activeItem != null){
                if(activeItem.type == ItemType.SUPERBALL){
                    if(this.ammo >= 0){
                        if (keyIsDown(keyCode)) { // 32 is the keyCode for the spacebar
                            if (frameCount - shotFrame > cadence) {
                                projectiles.push(new Projectile(this.x - 5, this.y, -5, superBallSprites, cadence, 20, false, false, false));
                                projectiles.push(new Projectile(this.x, this.y, -5, superBallSprites, cadence, 20, false, false, false));
                                projectiles.push(new Projectile(this.x + 5, this.y, -5, superBallSprites, cadence, 20, false, false, false));
                                shotFrame = frameCount;
                                this.ammo--
                            }
                    
                        }
                    }
                }else{
                    if(this.ammo >= 0){
                        if (keyIsDown(keyCode)) { // 32 is the keyCode for the spacebar
                            if (frameCount - shotFrame > cadence) {
                                projectiles.push(new Projectile(this.x - 5, this.y, -5, fireBallSprites, cadence, 5, false, false, false));
                                projectiles.push(new Projectile(this.x, this.y, -5, fireBallSprites, cadence, 5, false, false, false));
                                projectiles.push(new Projectile(this.x + 5, this.y, -5, fireBallSprites, cadence, 5, false, false, false));
                                shotFrame = frameCount;
                                this.ammo--
                            }
                    
                        }
                    }
                }
            }else{
                if(this.ammo >= 0){
                    if (keyIsDown(keyCode)) { // 32 is the keyCode for the spacebar
                        if (frameCount - shotFrame > cadence) {
                            projectiles.push(new Projectile(this.x - 5, this.y, -5, fireBallSprites, cadence, 5, false, false, false));
                            projectiles.push(new Projectile(this.x, this.y, -5, fireBallSprites, cadence, 5, false, false, false));
                            projectiles.push(new Projectile(this.x + 5, this.y, -5, fireBallSprites, cadence, 5, false, false, false));
                            shotFrame = frameCount;
                            this.ammo--
                        }
                
                    }
                }
            }
        }else if(activeItem.type == ItemType.ANGLED_SHOOT){
            if(activeItem != null){
                if(activeItem.type == ItemType.SUPERBALL){
                    if(this.ammo >= 0){
                        if (keyIsDown(keyCode)) { // 32 is the keyCode for the spacebar
                            if (frameCount - shotFrame > cadence) {
                                projectiles.push(new Projectile(this.x - 5, this.y, -5, superBallSprites, cadence, 20, false, true, false));
                                projectiles.push(new Projectile(this.x, this.y, -5, superBallSprites, cadence, 20, false, false, false));
                                projectiles.push(new Projectile(this.x + 5, this.y, -5, superBallSprites, cadence, 20, false, false, true));
                                shotFrame = frameCount;
                                this.ammo--
                            }
                    
                        }
                    }
                }else{
                    if(this.ammo >= 0){
                        if (keyIsDown(keyCode)) { // 32 is the keyCode for the spacebar
                            if (frameCount - shotFrame > cadence) {
                                projectiles.push(new Projectile(this.x - 5, this.y, -5, fireBallSprites, cadence, 5, false, true, false));
                                projectiles.push(new Projectile(this.x, this.y, -5, fireBallSprites, cadence, 5, false, false, false));
                                projectiles.push(new Projectile(this.x + 5, this.y, -5, fireBallSprites, cadence, 5, false, false, true));
                                shotFrame = frameCount;
                                this.ammo--
                            }
                    
                        }
                    }
                }
            }else{
                if(this.ammo >= 0){
                    if (keyIsDown(keyCode)) { // 32 is the keyCode for the spacebar
                        if (frameCount - shotFrame > cadence) {
                            projectiles.push(new Projectile(this.x - 5, this.y, -5, fireBallSprites, cadence, 5, false, true, false));
                            projectiles.push(new Projectile(this.x, this.y, -5, fireBallSprites, cadence, 5, false, false, false));
                            projectiles.push(new Projectile(this.x + 5, this.y, -5, fireBallSprites, cadence, 5, false, false, true));
                            shotFrame = frameCount;
                            this.ammo--
                        }
                
                    }
                }
            }
        }else{
            if(activeItem != null){
                if(activeItem.type == ItemType.SUPERBALL){
                    if(this.ammo >= 0){
                        if (keyIsDown(keyCode)) { // 32 is the keyCode for the spacebar
                            if (frameCount - shotFrame > cadence) {

                                projectiles.push(new Projectile(this.x, this.y, -5, superBallSprites, cadence, 20, false, false, false));

                                shotFrame = frameCount;
                                this.ammo--
                            }
                    
                        }
                    }
                }else{
                    if(this.ammo >= 0){
                        if (keyIsDown(keyCode)) { // 32 is the keyCode for the spacebar
                            if (frameCount - shotFrame > cadence) {

                                projectiles.push(new Projectile(this.x, this.y, -5, fireBallSprites, cadence, 5, false, false, false));

                                shotFrame = frameCount;
                                this.ammo--
                            }
                    
                        }
                    }
                }
            }else{
                if(this.ammo >= 0){
                    if (keyIsDown(keyCode)) { // 32 is the keyCode for the spacebar
                        if (frameCount - shotFrame > cadence) {

                            projectiles.push(new Projectile(this.x, this.y, -5, fireBallSprites, cadence, 5, false, false, false));

                            shotFrame = frameCount;
                            this.ammo--
                        }
                
                    }
                }
            }
        }
    }catch(error){
        console.log("no item")
        if(this.ammo >= 0){
            if (keyIsDown(keyCode)) { // 32 is the keyCode for the spacebar
                if (frameCount - shotFrame > cadence) {
                    
                    projectiles.push(new Projectile(this.x, this.y, -5, fireBallSprites, cadence, 5, false, false, false));

                    shotFrame = frameCount;
                    this.ammo--
                }
        
            }
        }
    }
	}
    handleProjectilesHanded() {	
        try {
            
        
            if(activeItem.type== ItemType.TRIPLE_SHOOT){
                if(activeItem != null){
                    if(activeItem.type == ItemType.SUPERBALL){
                        if(this.ammo >= 0){
                            if (fingerDistance<=50) { // 32 is the keyCode for the spacebar
                                if (frameCount - shotFrame > cadence) {
                                    projectiles.push(new Projectile(this.x - 5, this.y, -5, superBallSprites, cadence, 20, false));
                                    projectiles.push(new Projectile(this.x, this.y, -5, superBallSprites, cadence, 20, false));
                                    projectiles.push(new Projectile(this.x + 5, this.y, -5, superBallSprites, cadence, 20, false));
                                    shotFrame = frameCount;
                                    this.ammo--
                                }
                        
                            }
                        }
                    }else{
                        if(this.ammo >= 0){
                            if (fingerDistance<=50) { // 32 is the keyCode for the spacebar
                                if (frameCount - shotFrame > cadence) {
                                    projectiles.push(new Projectile(this.x - 5, this.y, -5, fireBallSprites, cadence, 5, false));
                                    projectiles.push(new Projectile(this.x, this.y, -5, fireBallSprites, cadence, 5, false));
                                    projectiles.push(new Projectile(this.x + 5, this.y, -5, fireBallSprites, cadence, 5, false));
                                    shotFrame = frameCount;
                                    this.ammo--
                                }
                        
                            }
                        }
                    }
                }else{
                    if(this.ammo >= 0){
                        if (fingerDistance<=50) { // 32 is the keyCode for the spacebar
                            if (frameCount - shotFrame > cadence) {
                                projectiles.push(new Projectile(this.x - 5, this.y, -5, fireBallSprites, cadence, 5, false));
                                projectiles.push(new Projectile(this.x, this.y, -5, fireBallSprites, cadence, 5, false));
                                projectiles.push(new Projectile(this.x + 5, this.y, -5, fireBallSprites, cadence, 5, false));
                                shotFrame = frameCount;
                                this.ammo--
                            }
                    
                        }
                    }
                }
            }else{
                if(activeItem != null){
                    if(activeItem.type == ItemType.SUPERBALL){
                        if(this.ammo >= 0){
                            if (fingerDistance<=50) { // 32 is the keyCode for the spacebar
                                if (frameCount - shotFrame > cadence) {
    
                                    projectiles.push(new Projectile(this.x, this.y, -5, superBallSprites, cadence, 20, false));
    
                                    shotFrame = frameCount;
                                    this.ammo--
                                }
                        
                            }
                        }
                    }else{
                        if(this.ammo >= 0){
                            if (fingerDistance<=50) { // 32 is the keyCode for the spacebar
                                if (frameCount - shotFrame > cadence) {
    
                                    projectiles.push(new Projectile(this.x, this.y, -5, fireBallSprites, cadence, 5, false));
    
                                    shotFrame = frameCount;
                                    this.ammo--
                                }
                        
                            }
                        }
                    }
                }else{
                    if(this.ammo >= 0){
                        if (fingerDistance<=50) { // 32 is the keyCode for the spacebar
                            if (frameCount - shotFrame > cadence) {
    
                                projectiles.push(new Projectile(this.x, this.y, -5, fireBallSprites, cadence, 5, false));
    
                                shotFrame = frameCount;
                                this.ammo--
                            }
                    
                        }
                    }
                }
            }
        }catch(error){
            console.log("no item")
            if(this.ammo >= 0){
                if (fingerDistance<=50) { // 32 is the keyCode for the spacebar
                    if (frameCount - shotFrame > cadence) {
    
                        projectiles.push(new Projectile(this.x, this.y, -5, fireBallSprites, cadence, 5, false));
    
                        shotFrame = frameCount;
                        this.ammo--
                    }
            
                }
            }
        }
	}
    goToMiddle(){
        if(this.x > (WIDTH_CANVAS/2) + 5){
            this.x -= 2
            image(this.sprite[1][frameCount % this.sprite[1].length], this.x, this.y);
        }else if(this.x < (WIDTH_CANVAS/2)-5){
            this.x += 2
            image(this.sprite[2][frameCount % this.sprite[2].length], this.x, this.y);
        }else{
            this.x = WIDTH_CANVAS/2
            image(this.sprite[0][4], this.x, this.y);
        }
    }
    goUp(){
        if(this.x== WIDTH_CANVAS/2){
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