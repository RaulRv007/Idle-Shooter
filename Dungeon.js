class Dungeon{
	constructor(theme, sprite, level, size){
		this.theme = theme
		this.sprite = sprite
		this.level = level
		this.size = size
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
}