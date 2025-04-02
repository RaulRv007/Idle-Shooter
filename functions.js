function transition() {
	transitionSound.play()
	for(let player of players){
		player.goToMiddle();
		player.goUp()
		if (millis() - startTransitionTime >= 1000) {
			fadeIn()
		}
		if (millis() - startTransitionTime >= 2000) {
			chestAnim()
		}
		if (millis() - startTransitionTime >= 2500 && millis() - startTransitionTime <= 3500) {
			print('getPowerUp')
			getPowerUp()
		}
		if (millis() - startTransitionTime >= 3300 && millis() - startTransitionTime <= 3335) {
			applyAmmo = true
		}
		if(millis() - startTransitionTime >= 3300){
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
		print('applyAmmo')
		for(let player of players){

            if(activeItem.type = ItemType.BIG_AMMO){
                player.ammo += 100
            }else if(activeItem.type = ItemType.MEDIUM_AMMO){
                player.ammo += 50
            }else if(activeItem.type = ItemType.SMALL_AMMO){
                player.ammo += 20
            }else{
				break
			}
							
			
		}

	}
	image(activeItem.getImage(), WIDTH_CANVAS / 2, HEIGHT_CANVAS / 2 - 100)
	print(activeItem);
	applyAmmo = false
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
	if(keyCode){
		if(isGameOver){
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
function instructionsStartScreen(){
	text("Press H for accesibility mode", 50, 100)
	text("Press a number 1-4 to select", 50, 150)
	text("the number of players", 50, 175)
	text("Press A and D to move", 50, 225)
	text("Press S to shoot", 50, 275)
	text("2nd player:", 50, 325)
	text("Press G and J to move", 50, 355)
	text("Press H to shoot", 50, 380)
	text("3rd player:", 50, 425)
	text("Press Z and C to move", 50, 455)	
	text("Press X to shoot", 50, 480)
	text("4th player:", 50, 525)
	text("Press B and M to move", 50, 555)
	text("Press N to shoot", 50, 580)
}
