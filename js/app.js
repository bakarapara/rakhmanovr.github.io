///////// General variables /////////


var tileWidth = 101,
    tileHeight = 83;
var initialScore = 5; // initial score
var scoreToWin = 10; // score to win the game
var positions = [tileHeight, tileHeight * 2, tileHeight * 3, tileHeight * 4 ]; // enemies start positions
var speed = 300;


////////////////////////////////////////////
////////////////// Enemy //////////////////
////////////////////////////////////////////



// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = -tileWidth;
    this.y = tileHeight;
    this.speed = Math.floor((Math.random() * speed) + speed);
    this.sprite = 'images/kitty.png';
    this.reset();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    // reset enemy if out of canvas
    if (this.x > tileWidth * 5) {
        this.reset();
    }
    collision(this); // check if collided
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Enemy.prototype.reset = function() {
    this.x = -tileWidth;
    this.y = positions[Math.floor(Math.random() * 4)];
};

var collision = function(enemy) {
    if (
        player.y + 125 >= enemy.y + 75
        && player.x + 25 <= enemy.x + 75
        && player.y + 75 <= enemy.y + 125
        && player.x + 75 >= enemy.x + 25) {
        player.hit();
        player.reset();
        console.log('collided!');
    }
    }


////////////////////////////////////////////
////////////////// Player //////////////////
////////////////////////////////////////////

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var Player = function() {
    this.x = tileWidth * 2;
    this.y = tileHeight * 5;
    this.sprite = 'images/doge.png';
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.update = function() {
    // this.collide(); moved collision check method into Enemy.prototype
};




Player.prototype.reset = function() {
  this.x = tileWidth * 2;
  this.y = tileHeight * 5;
};


///////// Player moves /////////



Player.prototype.handleInput = function(event) {
    this.userInput = event;
    if (this.userInput === 'left') {
        this.x = this.x - tileWidth;
    } else if (this.userInput === 'right') {
        this.x = this.x + tileWidth;
    } else if (this.userInput === 'up') {
        this.y = this.y - tileHeight;
    } else if (this.userInput === 'down') {
        this.y = this.y + tileHeight;
    }
    if (this.y > tileHeight * 5 || this.x < -tileHeight  || this.x > tileWidth * 4) {
        this.reset();
        console.log('reset!');
    }
    if (this.y <= -tileHeight) {
        this.score();
        this.reset();
        console.log('score!');
    }
};


///////// Score, Hit, Win, Lose /////////


Player.prototype.score = function() {
  initialScore++;
  var scoresLeft = scoreToWin - initialScore;
  var scoreText = 'Ave Doge! Your total score is: ' + initialScore + '. Score ' + scoresLeft + ' more to win!';
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 500, 500);
  ctx.fillStyle = 'green';
  ctx.textAlign = 'center';
  ctx.font = '13pt arial';
  ctx.fillText(scoreText, 250, 35);
  this.reset();

  if (initialScore >= scoreToWin) {
      console.log('win!');
      alert('Such wow! Much Proud! So Talent! You Win!');
      location.reload();
  }

};

Player.prototype.hit = function() {
  initialScore--;
  var scoreText = 'You lost 1 point. ' + initialScore + ' left. Poor Doge!';
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 500, 500);
  ctx.fillStyle = 'red';
  ctx.textAlign = 'center';
  ctx.font = '13pt arial';
  ctx.fillText(scoreText, 250, 35);
  if (initialScore === 0) {
      console.log('Lost!');
      alert('Such bad! Much Dislike! Wow! You Lost!');
      location.reload();
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var cat1 = new Enemy();
var cat2 = new Enemy();
var cat3 = new Enemy();
var cat4 = new Enemy();
var cat5 = new Enemy();

var allEnemies = [cat1, cat2, cat3, cat4, cat5];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
