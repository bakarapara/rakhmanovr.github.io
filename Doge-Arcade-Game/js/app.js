///////// General variables /////////


var tileWidth = 101,
    tileHeight = 83;
var initialScore = 5; // initial score
var scoreToWin = 10; // score to win the game
var positions = [tileHeight, tileHeight * 2, tileHeight * 3, tileHeight * 4 ]; // enemies start positions
var speed = 100;


////////////////////////////////////////////
////////////////// Super //////////////////
////////////////////////////////////////////


 var Char = function (x, y, sprite) {
   this.x = x;
   this.y = y;
   this.sprite = sprite;
   this.reset();
 };

 Char.prototype.render = function() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
 };


////////////////////////////////////////////
////////////////// Enemy //////////////////
////////////////////////////////////////////



// Enemies our player must avoid
var Enemy = function(x, y) {
    Char.call(this, x, y, 'images/kitty.png'); // calling super class
    this.speed = Math.floor((Math.random() * speed) + speed);
};

Enemy.prototype = Object.create(Char.prototype);

Enemy.prototype.update = function(dt) {

    this.x += this.speed * dt;
    // reset enemy if out of canvas
    if (this.x > tileWidth * 5) {
        this.reset();
    }
    // check if collided
    collision(this);
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
  };


////////////////////////////////////////////
////////////////// Player //////////////////
////////////////////////////////////////////


var Player = function(x, y) {
    Char.call(this, x, y, 'images/doge.png'); // calling super class
};

Player.prototype = Object.create(Char.prototype);

Player.prototype.update = function() {
    // this.collide(); moved collision check method into Enemy prototype
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

///////////// Objects /////////////

var cat1 = new Enemy();
var cat2 = new Enemy();
var cat3 = new Enemy();
var cat4 = new Enemy();
var cat5 = new Enemy();

var allEnemies = [cat1, cat2, cat3, cat4, cat5];

var player = new Player();

// This listens for key presses and sends the keys to your Player.handleInput() method.

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
