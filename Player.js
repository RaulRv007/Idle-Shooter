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
		circle(this.x, this.y, 30)
	}
    displayHealth(){
        fill('white')
        rect(this.x-15, this.y-40, 30, 5)
        fill('green')
        rect(this.x-15, this.y-40, (30*this.health)/100, 5)
    }
}