function transition() {
	for(let player of players){
		player.goToMiddle();
		player.goUp()
		if (player.y <= (HEIGHT_CANVAS/4)*3.5) {
			fadeIn()
		}
		if (player.y <= (HEIGHT_CANVAS/4)*3) {
			chestAnim()
		}
		if (player.y <= (HEIGHT_CANVAS/4)*2.5 + 5 && player.y >= (HEIGHT_CANVAS/4)*2.5 - 20) {
			print('getPowerUp')
			getPowerUp()
		}
		if(player.y < (HEIGHT_CANVAS/4)*2.5 - 21){
			applyAmmo = true
			image(activeItem.getImage(), WIDTH_CANVAS / 2, HEIGHT_CANVAS / 2 - 100)
		}
	}

}
function fadeIn() {
	fill(0, 0, 0, alpha)
	rect(0, 0, width, height)

	alpha += fadeSpeed
	if (alpha >= 255) {
		alpha = 255;
	}
}
function fadeOut() {
	fill(0, 0, 0, alpha)
	rect(0, 0, width, height)

	alpha -= fadeSpeed
	if (alpha <= 255) {
		alpha = 255;
	}
}
function chestAnim() {
	if (chestIndex <= 2) {
		if (frameCount % 20 == 0) {
			chestIndex++;
			if(chestIndex == 1){
				points ++
			}
		}
	}

	print(chestIndex);
	image(chestSprite[0][chestIndex], WIDTH_CANVAS / 2, HEIGHT_CANVAS / 2)
	fill('white')
	text(points, WIDTH_CANVAS/2, (HEIGHT_CANVAS/2) + 100)
}

function getPowerUp() {
	activeItem = random([new Items(ItemType.SHIELD),
		new Items(ItemType.SUPERBALL),
		new Items(ItemType.BIG_AMMO),
		new Items(ItemType.MEDIUM_AMMO),
		new Items(ItemType.SMALL_AMMO),
		new Items(ItemType.TRIPLE_SHOOT),
		new Items(ItemType.ANGLED_SHOOT)
	]
	)

	if(applyAmmo){
		for(let player of players){

            if(activeItem.type = ItemType.BIG_AMMO){
                player.ammo += 100
            }else if(activeItem.type = ItemType.MEDIUM_AMMO){
                player.ammo += 50
            }else if(activeItem.type = ItemType.SMALL_AMMO){
                player.ammo += 20
            }
							
			
		}
		applyAmmo = false
	}
	image(activeItem.getImage(), WIDTH_CANVAS / 2, HEIGHT_CANVAS / 2 - 100)
	print(activeItem);
}
function setLevel() {
	level += 1;

	if(itemProbability>0){
		itemProbability--
	}
	for (let i = 0; i <= level; i++) {
		enemies.push(
			new Enemy(
				Math.round(random(WALL_SIZE + 2, WIDTH_CANVAS - WALL_SIZE - 1)),
				Math.round(random(WALL_SIZE + 4, HEIGHT_CANVAS - 2 *WALL_SIZE)),
				enemyFireballSprites,
				10,
				5,
				enemy1Sprites,
				Math.round(random([-3, -2, -1, 1, 2, 3])),
				Math.round(Math.round(random([-3, -2, -1, 1, 2, 3]))),
				50
			)
		);
	}
	for(let player of players){
		player.y = HEIGHT_CANVAS - 50;
	}
	dungeon = new Dungeon("", tilesSprites, 0, 20, WIDTH_CANVAS/2, doorSprite)
	chestIndex = 0;
}

function gameOver(){
	image(gameOverScreen, WIDTH_CANVAS/2, HEIGHT_CANVAS/2)
	text(points, WIDTH_CANVAS/2, (HEIGHT_CANVAS/2) + 100)
	isGameOver = true

	gameStarted = false
}
function keyPressed() {
	if (keyCode === 27) { 
	  print("Escape pressed!")
	  isRunning = !isRunning
	  if(isGameOver){
		window.location.reload()
	  }
	}
	if(keyCode == 69){
		if(!isRunning){
			gameStarted  =false
			window.location.reload()
		}
	}
  }
function sliceSpriteSheet(spriteSheet, rows, columns, spriteArray) {
	let w = spriteSheet.width / columns
	let h = spriteSheet.height / rows

	for (let y = 0; y < columns; y++) {
		// create another emoty array for that row
		spriteArray[y] = []
		// there are 12 images in a row, iterate through them
		for (let x = 0; x < rows; x++) {
			// get the image subsection there and then stor in the array
			spriteArray[y][x] = spriteSheet.get(x * w, y * h, w, h)
		}
	}
	return spriteArray
}

