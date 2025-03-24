Wizard Quest

Wizard Quest is an idle shooter game. The main goal of this game is to advance to the next level by killing all the enemies in each level.
Idle shooters are games where the player’s movement is restricted to one axis of the screen, in the case of wizard quest it is the x axis, or horizontal axis. 
Wizard Quest has pixel art and medieval fantastic world aesthetics, being the main player a wizard and the enemies fantastic monsters. All the load and transition screens follow the aesthetic of the game.

Features:
Player can move right or left using keys ‘A’ and ‘D’
Player can shoot using key ‘S’
Enemies appear randomly in the scene and move vertically and horizontally with independent random velocities
Enemies collide and bounce when they collide with a wall
Enemies shoot with a cooldown system that is random and independent between enemies
The damage of the projectiles of the enemies is configurable
The damage player’s projectiles is configurable
There is a transition system between levels
There is a ammo system
Game gets harder and harder every single level
There is a powerup system that includes:
Superball: blue projectile that lasts for a configurable amount of time and that does double damage
Shield: a shield that covers the character from any damage
Triple shoot: every time the character shoots, 3 projectiles are created
Triple angled shoot: everytime the character shoots, 3 projectiles are created and the 2 on the right and on the left have a sideways trajectory
Small, medium and big ammo reload: ammo reload of 20, 50 and 100
The game’s resolution is adaptative, and it can be played in a wide range of devices
Local multiplayer system
The player 2 plays with the controls ‘G’ and ‘J’ for movement and ‘H’ for shooting
The player 3 plays with the controls ‘Z’ and ‘C’ for movement and ‘X’ for shooting
The player 4 plays with the controls ‘B’ and ‘M’ for movement and ‘N’ for shooting
Different players have sprites with a different color palette so they can be differentiable
Every other feature on the game applies for multiplayer mode (except accessibility)
Accessibility mode where the user controls the character with the index finger that is visible to the camera and shoots closing the middle and index finger, no requirement of keyboard
Flying power ups with a random probability that is more probable as the game advances (flying power ups are power ups that appear and fall on the middle of a level and when the user shoots them, the player gets a random powerup.

Download and install:
Download this repository: https://github.com/RaulRv007/Idle-Shooter.git
Have installed python in the PC, the last version will not work , I have tried it with Python 3.10.8 and 3.11.8
Install VSCode (It is not necessary but it is really helpful to run multiple terminals)
Open a terminal on the folder of the repository
Make sure pip is installed.
	To check if pip is installed run  pip --version in the terminal
	If pip is not installed, run python -m ensurepip --upgrade in the terminal
Setup a virtual environment (this is not necessity but it is recommended)
Run all these commands in the terminal
pip install virtualenv
python -m venv my_venv
.\venv\Scripts\activate
Install all the required dependencies
Run:
pip install -r requirements.txt

Run the game:
All the terminals must be created on the folder of the project
Open a terminal and run: python api.py
Open another terminal and run: python track.py
Open another terminal and run: python3 -m http.server
In the browser type localhost:8000
And PLAY!!!

Close the game:
As the game is a prototype there is not a nice way to close the game
Go to the terminal where python api.py was run and press Ctrl + C
Go to the terminal where python3 -m http.server was run and press Ctrl + C
Go to task manager, press in python and press “terminate task”
Controls: 
Start of the game
Press a number between 1 and 4 (not numpad numbers), if no key is pressed the number of players will be 1
Press H for accessibility mode, for accessibility mode it is required to have only one player (if not the game will crash)
Press space to enter the game
1 Player mode
A to move to the right
D to move to the left
S to shoot
Multiplayer Mode
Player 1:
A to move to the right
D to move to the left
S to shoot
Player 2:
G to move to the right
J to move to the left
H to shoot
Player 3:
Z to move to the right
C to move to the left
X to shoot
Player 4:
B to move to the right
M to move to the left
N to shoot
Accessibility mode:
Put the hand to around 20 cm to the camera, no more than 40
Make this pose with the hand (this is the more comfortable pose, but there is a 10 % chance it may not work. If it does not work try the second picture pose.
 
Displace the hand sideways to move the character
To shoot, close the index finger and the middle finger

It is recommended to have the camera stream accessible to check that the hand is visible to the camera
During all modes:
ESC to pause the game
When the game is paused E to reload the game

Goal Audience
This game aims for teenagers, university students or anybody that wants to learn how to code. The game is open source and it is easy to access and edit to play the game so everybody can learn and test. This game covers the main basics of programming such as object oriented programming, variables, loops, arrays, logic, key events… and some more other advanced features such as client server structure and computer vision using machine learning. Also it covers 2 programming languages that although they are quite similar, it can open the mind of a programmer that for one project it is not necessary to hook to only one programming language, due to programming languages are just a way to communicate with the computer as humans.

Areas of Improvement and Future plans
This is a game prototype, for the near future it will have a better structure with more layers of abstractions to avoid repeating that much code, also it will have comments that will help everybody to learn from the code.
In terms of features:
Add more variety in enemies
Add more variety in powerups
Add different scenarios
Add a character selector
Add a shop to get new weapons and new characters. With the shop it could be possible to create a purchase system to teach the learners to connect the game with real world features as payment. As well to finance the project
Make the accessibility mode up to 2 players that will control the characters with the right and left hand
Improve the graphics and make the load, game over and start screen responsive to the resolution
Make the graphics more coherent with the game’s theme
Solve some bugs that may appear due to not enough testing time
Run a whole marketing campaign so the project gets to more students so more people can learn from it
Assets
Pseudocode
Pseudocode can be found in the folder pseudocode in the repository, for now there is only pseudocode for the 2 main scripts of the project, Player.js and mySketch.js.js another future plan will be right more pseudocode so everybody can learn easily from this project
Server structure
To run the accessibility mode, connection between the machine learning model and the videogame is required. An API in python using the framework flask is run while the game runs. The script with the computer machine model (running at the same time) PUTs the position of all the key points of the hand in the API. The game GETs those positions and uses them to track the movement of the character.
For more information in HTTP methods and APIs visit https://blog.postman.com/what-are-http-methods/



