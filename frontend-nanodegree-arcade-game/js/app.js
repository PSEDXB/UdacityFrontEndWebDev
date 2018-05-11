
//TODO: Creativity and collectibles? :)

'use strict';

class Enemy {
    constructor(x, y, speed) {

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = Math.floor(Math.random() * 1000) + 1;

    // Parameter: dt, a time delta between ticks
        this.update = function(dt) {

        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
            this.x += this.speed * dt;
                if (this.x > 500) {
                    this.x = -100;
                    this.speed = Math.floor(Math.random() * 500)+ 200;
                }

        // Checks for player, establishes defeat condition.
            if ((this.x < player.x + 50) && (this.x > player.x - 50) && (this.y < player.y + 50) && (this.y > player.y -50)) {
                setTimeout(player.defeat, 5);
            }
        };
        
    // Draw the enemy on the screen, required method for game
        this.render = function() {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        };
    }
}

class Player {
    constructor(x, y, speed) {
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
        this.speed = speed;

        this.update = function(dt) {
            this.speed *= dt;
        };

        this.render = function() {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        };

        // The two next methods reset the game and display victory/defeat alerts.  TODO: modals!
        this.victory = function() {
            player.y = 410;
            player.x = 200;
            alert('Victory!');
        };

        this.defeat = function() {
            player.y = 410;
            player.x = 200;
            alert('You dead!');
        };

    // Ternary operators did not interfere with subsequent conditional whereas an if/else statement did.  Is this too 
        this.handleInput = function(k) {
            switch (k)  {
                case 'left':
                    this.x < 101 ? this.x = 0 : this.x -= 101;
                    break;
                case 'up':
                    this.y -= 83;
                     break;
                case 'right':
                    this.x > 300 ? this.x = 400 : this.x += 101;
                    break;
                case 'down':
                    this.y += 83;
                    break;
            }

    // Constrains player.y and establishes victory condition/action.
            if (this.y > 410) {
                this.y = 410;
            } else if (this.y < 0) {
                this.y = 0;
                setTimeout(this.victory, 100);
            } else {
                return this.y;
            }
        };
    }
}

// Instantiates player, enemies, and (TODO) collectibles.
const enemy1 = new Enemy(0, 225);
const enemy2 = new Enemy(0, 145);
const enemy3 = new Enemy(0, 65);

const allEnemies = [enemy1, enemy2, enemy3];

const player = new Player(200, 410, 500);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});