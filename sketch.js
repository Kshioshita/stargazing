var stars= [];
var lines=[];
var clickNum=0;
var x1, x2, y1, y2;
var isGrowing=true;

function setup() {
	createCanvas(windowWidth, (windowHeight-162));
	for(var i=0; i<20; i++){
		// creates 20 stars and randomly places them around the page
		stars.push(new Star(random(1300), random(500)));
	}

}

function draw() {
	background("#0e2c5b");
	for(var i=0; i<stars.length; i++){
		// displays the stars
 		stars[i].display();
 		// calls function to make stars blink
 		stars[i].update();
 	}

 	// shows connections between stars
 	for(var i=0; i<lines.length; i++){
 		lines[i].show();
 	}

}

function windoResized(){
	createCanvas(windowWidth, windowHeight);
}

function mousePressed(){
	console.log('mouse clicked');

	// checks to see if a star is clicked
	for(var i=0; i<stars.length; i++){
		if(stars[i].poke()){
			console.log(stars[i].x +","+ stars[i].y);
			// tracks if the first or second star is clicked
			clickNum++;

			if(clickNum==1){
				console.log("clickNum is " + clickNum);
				// stores the location of first star
				x1=mouseX;
				y1=mouseY;
			}
			else if(clickNum==2){
				console.log("clickNum is now " + clickNum);
				// stores the location of the second star
				x2=mouseX;
				y2=mouseY;

				// add a line between star one and two
				lines.push(new Connection(x1, y1, x2, y2));

				// resets number of stars clicked
				clickNum=0;

				console.log('x1 is ' + x1);
				console.log('y1 is ' + y1);
				console.log('x2 is ' + x2);
				console.log('y2 is ' + y2);
				console.log(lines.length);
			}
		}
	}
}

function Star(x, y){
	// create stars
	this.x=x;
	this.y=y;
	// set random size
	this.size=random(10, 20);

	this.display=function(){
		// draws star
		noStroke()
		fill('#ffdd00');
		ellipse(this.x, this.y, this.size, this.size);

	}

	this.update=function(){
		// set the state 
		if(this.size<=10){
			this.isGrowing=true;
		}
		if(this.size>=25){
			this.isGrowing=false;
		}

		// update the size
		if(this.isGrowing){
			// increases size by a random size, so stars blink at different rates
			this.size=this.size+random(3);
		}
		if(!this.isGrowing){
			// decreases size by a random size, so stars blink at different rates
			this.size=this.size-random(3);
		}
	}

	this.poke=function(){
		// checks to see if mouse is touching a star
		if(mouseX > (this.x-this.size/2) &&
			mouseX < (this.x+this.size/2) &&
			mouseY > (this.y-this.size/2) &&
			mouseY < (this.y+this.size/2)){
			console.log(this.x + ',' + this.y);
			return true;
		}
		else{
			return false;
		}

	}

}

function Connection(x1, y1, x2, y2){
	this.x1=x1;
	this.y1=y1;
	this.x2=x2;
	this.y2=y2;

	this.show=function(){
		// draws line between two stars
		stroke('#ffdd00');
		line(this.x1, this.y1, this.x2, this.y2);
	}
}

function reload(){
	// reloads the page so stars are re-generated
	location.reload();
	clickNum=0;
}

function emptylines(){
	// removes the lines between the stars without changing location of the stars
	lines=[];
	background("#0e2c5b");
	clickNum=0;
}










