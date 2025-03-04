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
				rect(x, y, this.size, this.size)
			}
		}
        for(let x = 0; x<=windowWidth; x = x+this.size){
            fill('black')
            rect(x, 0, this.size, this.size)
            rect(x, HEIGHT_CANVAS-WALL_SIZE, this.size, this.size)
        }
        
        for(let y = 0; y<=windowHeight; y = y+this.size){
            fill('black')
            rect(0, y, this.size, this.size)
            rect(WIDTH_CANVAS-WALL_SIZE, y, this.size, this.size)
        }
	}
}