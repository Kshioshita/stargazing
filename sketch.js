var stars= [];
var lines=[];
var clickNum=0;
var x1, x2, y1, y2;
var isGrowing=true;

function setup() {
	createCanvas(windowWidth, (windowHeight-162));
	for(var i=0; i<20; i++){
		stars.push(new Star(random(1300), random(500)));
	}

}

function draw() {
	background("#0e2c5b");
	for(var i=0; i<stars.length; i++){
 		stars[i].display();
 		stars[i].update();
 	}

 	for(var i=0; i<lines.length; i++){
 		lines[i].show();
 	}

}

function windoResized(){
	createCanvas(windowWidth, windowHeight);
}

function mousePressed(){
	console.log('mouse clicked');
	for(var i=0; i<stars.length; i++){
		if(stars[i].poke()){
			console.log(stars[i].x +","+ stars[i].y);
			clickNum++;
			if(clickNum==1){
				console.log("clickNum is " + clickNum);
				x1=mouseX;
				y1=mouseY;
			}
			else if(clickNum==2){
				console.log("clickNum is now " + clickNum);
				x2=mouseX;
				y2=mouseY;
				lines.push(new Connection(x1, y1, x2, y2));
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
	this.x=x;
	this.y=y;
	this.size=random(10, 20);

	this.display=function(){
		noStroke()
		fill('#ffdd00');
		ellipse(this.x, this.y, this.size, this.size);

	}

	this.update=function(){
		// this is where grow and shrink happens

		// set the state 
		if(this.size<=10){
			this.isGrowing=true;
		}
		if(this.size>=25){
			this.isGrowing=false;
		}

		// update the size
		if(this.isGrowing){
			// if isGrowing is true, increase size
			this.size=this.size+random(3);
		}
		if(!this.isGrowing){
			// if isGrowing is false, decrease size
			this.size=this.size-random(3);
		}
	}

	this.poke=function(){
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
		stroke('#ffdd00');
		line(this.x1, this.y1, this.x2, this.y2);
	}
}

function reload(){
	location.reload();
	clickNum=0;
}

function emptylines(){
	lines=[];
	background("#0e2c5b");
	clickNum=0;
}










