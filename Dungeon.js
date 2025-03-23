class Dungeon{
	constructor(theme, sprite, level, size, startDoor, doorSprite){
		this.theme = theme
		this.sprite = sprite
		this.level = level
		this.size = size
		this.startDoor = startDoor
		this.doorSprite = doorSprite
	}
	drawDungeon(){
		fill('cornflowerblue')
		for(let x = WALL_SIZE; x<=windowWidth - WALL_SIZE; x = x+this.size){
			for(let y = WALL_SIZE; y<=windowHeight - WALL_SIZE; y=y+this.size){
				image(this.sprite[0][0], x, y+10)
			}
		}
        for(let x = 0; x<=windowWidth; x = x+this.size){
			image(this.sprite[1][0], x + 10, 10)
			image(this.sprite[1][0], x + 10, HEIGHT_CANVAS-WALL_SIZE+10)
        }
        
        for(let y = 0; y<=windowHeight; y = y+this.size){
            fill('black')
			image(this.sprite[1][0], 10, y + 10)
			image(this.sprite[1][0], WIDTH_CANVAS-WALL_SIZE + 10, y + 10)

        }
	}
	drawDungeonWhenLevelChanging(){

		for(let x = WALL_SIZE; x<=windowWidth; x = x+this.size){
			for(let y = 0; y<=windowHeight; y=y+this.size){
				image(this.sprite[0][0], x, y+10)
			}
		}
        for(let x = 0; x<=WIDTH_CANVAS; x = x+this.size){

			if(x <= (WIDTH_CANVAS/15)*7 || x >= (WIDTH_CANVAS/15)*8){

				image(this.sprite[1][0], x + 10, 10)
			}else{
				image(this.sprite[0][1], x + 10, 10)

			}

        }
		/*for(let x = this.startDoor; x<=WIDTH_CANVAS; x = x+this.size){
			if(x >= (WIDTH_CANVAS/15)*5 && x <= (WIDTH_CANVAS/15)*9){
				image(this.doorSprite, x + 20, 5)
			}
        }*/
	   image(this.doorSprite, this.startDoor, 5)

		/*for(let x = this.startDoor; x<=WIDTH_CANVAS; x = x+this.size){
			if(x >= (WIDTH_CANVAS/15)*6 && x <= (WIDTH_CANVAS/15)*8){
				image(this.sprite[1][0], x + 10, 10)
			}
		}*/
		/*for(let player of players){
			if(player.id = 0){
				fill('black')
			}else if(player.id = 1){
				fill('red')
			}
			else if(player.id = 2){
				fill('green')
			}else if(player.id = 3){
				fill('blue')
			}
			text(player.ammo, ammoPos, 40)
			ammoPos += 100
		}*/

		if(playersNumber == 1){
			text(players[0].ammo, ammoPos, 40)
		}else if(playersNumber == 2){
			text(players[0].ammo, ammoPos, 40)
			fill('red')
			text(players[1].ammo, ammoPos + 75, 40)
		}else if(playersNumber == 3){
			text(players[0].ammo, ammoPos, 40)
			fill('red')
			text(players[1].ammo, ammoPos + 75, 40)
			fill('green')
			text(players[2].ammo, ammoPos + 150, 40)
		}else if(playersNumber == 4){
			text(players[0].ammo, ammoPos, 40)
			fill('red')
			text(players[1].ammo, ammoPos + 75, 40)
			fill('green')
			text(players[2].ammo, ammoPos + 150, 40)
			fill('blue')
			text(players[3].ammo, ammoPos + 225, 40)
		}

        
        for(let y = 0; y<=windowHeight; y = y+this.size){
            fill('black')
			image(this.sprite[1][0], 10, y + 10)
			image(this.sprite[1][0], WIDTH_CANVAS-WALL_SIZE + 10, y + 10)

        }


		

	}
}