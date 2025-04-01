# Wizard Quest

Wizard Quest is an idle shooter game. The main goal of this game is to advance to the next level by killing all the enemies in each level. Idle shooters are games where the player’s movement is restricted to one axis of the screen. In Wizard Quest, it is the x-axis (horizontal axis). The game features pixel art and medieval fantasy aesthetics, with the player as a wizard and enemies as fantastic monsters. All load and transition screens follow the game's aesthetic.

## Features

- **Player Controls**:
	- Move left or right using keys `A` and `D`.
	- Shoot using key `S`.

- **Enemies**:
	- Appear randomly in the scene and move vertically and horizontally with independent random velocities.
	- Collide and bounce when hitting walls.
	- Shoot with a random cooldown system independent for each enemy.
	- Configurable projectile damage.

- **Player Projectiles**:
	- Configurable damage.

- **Game Mechanics**:
	- Transition system between levels.
	- Ammo system.
	- Increasing difficulty with each level.

- **Power-Up System**:
	- **Superball**: Blue projectile that lasts for a configurable time and deals double damage.
	- **Shield**: Protects the character from any damage.
	- **Triple Shoot**: Fires three projectiles simultaneously.
	- **Triple Angled Shoot**: Fires three projectiles, with two angled sideways.
	- **Ammo Reloads**: Small (20), Medium (50), and Big (100).

- **Resolution**:
	- Adaptive resolution for a wide range of devices.

- **Local Multiplayer**:
	- Player 2: `G` (right), `J` (left), `H` (shoot).
	- Player 3: `Z` (right), `C` (left), `X` (shoot).
	- Player 4: `B` (right), `M` (left), `N` (shoot).
	- Different player sprites with unique color palettes for differentiation.
	- All features apply to multiplayer mode (except accessibility).

- **Accessibility Mode**:
	- Control the character with the index finger visible to the camera.
	- Shoot by closing the index and middle fingers.
	- No keyboard required.

- **Flying Power-Ups**:
	- Appear randomly during levels and fall mid-screen.
	- Shooting them grants a random power-up.

## Download and Install

1. Clone the repository: [Idle-Shooter GitHub](https://github.com/RaulRv007/Idle-Shooter.git).
2. Install Python (tested with Python 3.10.8 and 3.11.8).
3. (Optional) Install VSCode for easier terminal management.
4. Open a terminal in the repository folder.
5. Ensure `pip` is installed:
	 - Check: `pip --version`.
	 - If not installed: `python -m ensurepip --upgrade`.
6. (Optional) Set up a virtual environment:
	 ```bash
	 pip install virtualenv
	 python -m venv my_venv
	 .\venv\Scripts\activate
	 ```
7. Install dependencies:
	 ```bash
	 pip install -r requirements.txt
	 ```

## Run the Game

1. Open terminals in the project folder.
2. Run the following commands in separate terminals:
	 - `python api.py`
	 - `python track.py`
	 - `python3 -m http.server`
3. Open a browser and go to `localhost:8000` to play.

## Close the Game

1. Stop the `api.py` terminal with `Ctrl + C`.
2. Stop the `http.server` terminal with `Ctrl + C`.
3. Terminate Python tasks in Task Manager.

## Controls

### Start of the Game
- Press a number (1–4) to select the number of players (default is 1).
- Press `H` for accessibility mode (requires single-player mode).
- Press `Space` to start the game.

### Single Player
- `A`: Move left.
- `D`: Move right.
- `S`: Shoot.

### Multiplayer
- **Player 1**: `A` (left), `D` (right), `S` (shoot).
- **Player 2**: `G` (left), `J` (right), `H` (shoot).
- **Player 3**: `Z` (left), `C` (right), `X` (shoot).
- **Player 4**: `B` (left), `M` (right), `N` (shoot).

### Accessibility Mode
- Place your hand 20–40 cm from the camera.
- Move your hand sideways to control the character.
- Close the index and middle fingers to shoot.
- Ensure the camera stream is visible for better tracking.

### During All Modes
- `ESC`: Pause the game.
- `E`: Reload the game (when paused).

## Goal Audience

This game is designed for teenagers, university students, or anyone interested in learning to code. As an open-source project, it is accessible and editable, allowing users to learn and experiment. The game introduces programming basics (e.g., OOP, variables, loops, arrays, logic, key events) and advanced concepts (e.g., client-server structure, computer vision with machine learning). It also demonstrates the use of multiple programming languages in a single project.

## Areas of Improvement and Future Plans

- Add more enemy and power-up variety.
- Introduce different scenarios.
- Implement a character selector.
- Add a shop for weapons and characters, potentially integrating a payment system.
- Enable accessibility mode for up to two players.
- Improve graphics and make screens responsive to resolution.
- Enhance graphical coherence with the game’s theme.
- Fix bugs through extensive testing.
- Launch a marketing campaign to reach more students.

## Assets

### Pseudocode
- Found in the `pseudocode` folder of the repository.
- Currently includes pseudocode for `Player.js` and `mySketch.js`.
- Future plans include adding more pseudocode for easier learning.

### Server Structure
- Accessibility mode requires a connection between the machine learning model and the game.
- A Python Flask API runs alongside the game:
	- The machine learning script sends hand keypoint positions to the API (`PUT`).
	- The game retrieves these positions (`GET`) to track character movement.
- Learn more about HTTP methods and APIs: [Postman Blog](https://blog.postman.com/what-are-http-methods/).
