// Set up the canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define the ball object
var ball = {
	x: canvas.width / 2,
	y: canvas.height / 2,
	radius: 10,
	speed: 5,
	velocityX: 5,
	velocityY: 5,
	draw: function() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = '#000';
		ctx.fill();
		ctx.closePath();
	},
	reset: function() {
		this.x = canvas.width / 2;
		this.y = canvas.height / 2;
		this.velocityX = -this.velocityX;
	},
	bounce: function() {
		this.velocityX = -this.velocityX;
	},
	move: function() {
		this.x += this.velocityX;
		this.y += this.velocityY;
		
		// Check for collision with walls
		if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
			this.velocityY = -this.velocityY;
		}
		
		// Check for collision with paddles
		if (this.x - this.radius < player1.x + player1.width && this.y + this.radius > player1.y && this.y - this.radius < player1.y + player1.height) {
			this.bounce();
			this.velocityY += (player1.velocityY / 2);
		}
		else if (this.x + this.radius > player2.x && this.y + this.radius > player2.y && this.y - this.radius < player2.y + player2.height) {
			this.bounce();
			this.velocityY += (player2.velocityY / 2);
		}
		
		// Check for game over
		if (this.x < 0 || this.x > canvas.width) {
			this.reset();
		}
	}
};

// Define the player 1 object
var player1 = {
	x: 50,
	y: canvas.height / 2 - 50,
	width: 10,
	height: 100,
	speed: 5,
	velocityY: 0,
	score: 0,
	draw: function() {
		ctx.fillStyle = '#000';
		ctx.fillRect(this.x, this.y, this.width, this.height);
	},
	moveUp: function() {
		this.velocityY = -this.speed;
	},
	moveDown: function() {
		this.velocityY = this.speed;
	},
	stop: function() {
		this.velocityY = 0;
	}
};

// Define the player 2 object
var player2 = {
	x: canvas.width - 60,
	y: canvas.height / 2 - 50,
	width: 10,
	height: 100,
	speed: 5,
	velocityY: 0,
	score: 0,
	draw: function() {
		ctx.fillStyle = '#000';
		ctx.fillRect(this.x, this.y, this.width, this.height);
	},
	moveUp: function() {
		this.velocityY = -this.speed;
	},
	moveDown: function() {
		this.velocityY = this.speed;
	},
	stop: function() {
		this.velocityY = 0;
	}
};

// Define the game loop
function gameLoop() {
	// Clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	// Move the ball
	ball.move();
	
	// Move the players
	player1.y += player1.velocityY;
	player2.y += player2.velocityY;
	
	// Keep the players within the canvas
	if (player1.y < 0) {
		player1.y = 0;
	}
	else if (player1.y + player1.height > canvas.height) {
		player1.y = canvas.height - player1.height;
	}
	
	if (player2.y < 0) {
		player2.y = 0;
	}
	else if (player2.y + player2.height > canvas.height) {
		player2.y = canvas.height - player2.height;
	}
	
	// Draw the ball and players
	ball.draw();
	player1.draw();
	player2.draw();
	
	// Update the score
	ctx.font = '20px Arial';
	ctx.fillText('Player 1: ' + player1.score, 20, 30);
	ctx.fillText('Player 2: ' + player2.score, canvas.width - 120, 30);
	
	// Check for keyboard input
	document.onkeydown = function(e) {
		switch (e.keyCode) {
			case 38: // Up arrow key
				player2.moveUp();
				break;
			case 40: // Down arrow key
				player2.moveDown();
				break;
			case 87: // W key
				player1.moveUp();
				break;
			case 83: // S key
				player1.moveDown();
				break;
		}
	};
	
	document.onkeyup = function(e) {
		switch (e.keyCode) {
			case 38: // Up arrow key
			case 40: // Down arrow key
				player2.stop();
				break;
			case 87: // W key
			case 83: // S key
				player1.stop();
				break;
		}
	};
	
	// Increase the score if the ball goes out of bounds
	if (ball.x < 0) {
		player2.score++;
		ball.reset();
	}
	else if (ball.x > canvas.width) {
		player1.score++;
		ball.reset();
	}
	
	// Repeat the game loop
	requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();