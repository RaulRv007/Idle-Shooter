class Player {
	constructor(x, y, health, speed, powerup, color, sprite) {
		this.x = x;
		this.y = y;
		this.health = health;
		this.speed = speed;
		this.powerup = powerup;
		this.color = color
        this.sprite = sprite
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
            image(wizardSprites[1][frameCount % wizardSprites[1].length], this.x, this.y);
        } else if (keyIsDown('D'.charCodeAt())) {
            image(wizardSprites[2][frameCount % wizardSprites[2].length], this.x, this.y);
        } else {
            image(wizardSprites[0][4], this.x, this.y);
        }
	}
    displayHealth(){
        fill('white')
        rect(this.x-15, this.y-40, 30, 5)
        fill('green')
        rect(this.x-15, this.y-40, (30*this.health)/100, 5)
    }
}