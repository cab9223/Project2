// All of these functions are in the global scope
		
"use strict";


function getRandom(min, max) {
  	return Math.random() * (max - min) + min;
}


function simplePreload(imageArray){
	// loads images all at once
	for (var i = 0; i < imageArray.length; i++) {
		var img = new Image();
		img.src = imageArray[i];
	}
}


function loadImagesWithCallback(sources, callback) {
	var imageObjects = [];
	var numImages = sources.length;
	var numLoadedImages = 0;
	
	for (var i = 0; i < numImages; i++) {
	  imageObjects[i] = new Image();
	  imageObjects[i].onload = function() {
	  	numLoadedImages++;
	  	//console.log("loaded image at '" + this.src + "'")
		if(numLoadedImages >= numImages) {
		  callback(imageObjects); // send the images back
		}
	  };
	  
	  imageObjects[i].src = sources[i];
	}
  }


/*
Function Name: clamp(val, min, max)
Author: Web - various sources
Return Value: the constrained value
Description: returns a value that is
constrained between min and max (inclusive) 
*/
function clamp(val, min, max){
	return Math.max(min, Math.min(max, val));
}


 // FULL SCREEN MODE
function requestFullscreen(element) {
	if (element.requestFullscreen) {
	  element.requestFullscreen();
	} else if (element.mozRequestFullscreen) {
	  element.mozRequestFullscreen();
	} else if (element.mozRequestFullScreen) { // camel-cased 'S' was changed to 's' in spec
	  element.mozRequestFullScreen();
	} else if (element.webkitRequestFullscreen) {
	  element.webkitRequestFullscreen();
	}
	// .. and do nothing if the method is not supported
};


//STANDARD HIT CHECK
function hitTest(obj1, obj2){
	/* app.main.ctx.save();
	app.main.ctx.translate(obj1.position.x,obj1.position.y);
	app.main.ctx.fillStyle = "black";
	app.main.ctx.fillRect(0,0,obj1.size.x, obj1.size.y);
	app.main.ctx.restore();
	app.main.ctx.save();
	app.main.ctx.translate(obj2.position.x,obj2.position.y);
	app.main.ctx.fillStyle = "black";
	app.main.ctx.fillRect(0,0,obj2.size.x, obj2.size.y);
	app.main.ctx.restore(); */
	if (obj1.position.x < obj2.position.x + obj2.size.x &&
		obj1.position.x + obj1.size.x > obj2.position.x &&
		obj1.position.y < obj2.position.y + obj2.size.y &&
		obj1.size.y + obj1.position.y > obj2.position.y) {
			return true;
	}
}

//ATTACK RANGE HIT CHECK
function attackHitTest(obj1, obj2){
	/* app.main.ctx.save();
	app.main.ctx.translate(obj1.attackPosition.x,obj1.attackPosition.y);
	app.main.ctx.fillStyle = "green";
	app.main.ctx.fillRect(0,0,obj1.attackSize.x, obj1.attackSize.y);
	app.main.ctx.restore();  */
	if (obj1.attackPosition.x < obj2.position.x + obj2.size.x &&
		obj1.attackPosition.x + obj1.attackSize.x > obj2.position.x &&
		obj1.attackPosition.y < obj2.position.y + obj2.size.y &&
		obj1.attackSize.y + obj1.attackPosition.y > obj2.position.y) {
			return true;
	}
}

//LONGER ATTACK RANGE HIT CHECK
function hardAttackHitTest(obj1, obj2){
	/* app.main.ctx.save();
	app.main.ctx.translate(obj1.hardAttackPosition.x,obj1.hardAttackPosition.y);
	app.main.ctx.fillStyle = "blue";
	app.main.ctx.fillRect(0,0,obj1.attackSize.x, obj1.attackSize.y);
	app.main.ctx.restore(); */
	if (obj1.attackPosition.x < obj2.position.x + obj2.size.x &&
		obj1.attackPosition.x + obj1.attackSize.x > obj2.position.x &&
		obj1.attackPosition.y < obj2.position.y + obj2.size.y &&
		obj1.attackSize.y + obj1.attackPosition.y > obj2.position.y) {
			return true;
	} else if (obj1.hardAttackPosition.x < obj2.position.x + obj2.size.x &&
		obj1.hardAttackPosition.x + obj1.attackSize.x > obj2.position.x &&
		obj1.hardAttackPosition.y < obj2.position.y + obj2.size.y &&
		obj1.attackSize.y + obj1.hardAttackPosition.y > obj2.position.y) {
			return true;
	}
}

//BLAST ATTACK HIT CHECK
function attackHitTestBlast(obj1, obj2){
	/* app.main.ctx.save();
	app.main.ctx.translate(obj1.attackPosition.x,obj1.attackPosition.y);
	app.main.ctx.fillStyle = "Red";
	app.main.ctx.fillRect(0,0,obj1.attackSize.x, obj1.attackSize.y);
	app.main.ctx.restore();   */
	if (obj1.attackPosition.x < obj2.position.x + obj2.size.x &&
		obj1.attackPosition.x + obj1.attackSize.x > obj2.position.x &&
		obj1.attackPosition.y < obj2.position.y + obj2.size.y &&
		obj1.attackSize.y + obj1.attackPosition.y > obj2.position.y) {
			return true;
	}
}

//BLAST ATTACK HIT CHECK
function blastHitTestBlast(obj1, obj2){
	/* app.main.ctx.save();
	app.main.ctx.translate(obj1.attackPosition.x,obj1.attackPosition.y);
	app.main.ctx.fillStyle = "Red";
	app.main.ctx.fillRect(0,0,obj1.attackSize.x, obj1.attackSize.y);
	app.main.ctx.restore(); */  
	if (obj1.attackPosition.x < obj2.attackPosition.x + obj2.attackSize.x &&
		obj1.attackPosition.x + obj1.attackSize.x > obj2.attackPosition.x &&
		obj1.attackPosition.y < obj2.attackPosition.y + obj2.attackSize.y &&
		obj1.attackSize.y + obj1.attackPosition.y > obj2.attackPosition.y) {
			return true;
	}
}


//BLAST ATTACK SMOG EFFECT
function attackHitTestSmog(attackPosition, attackSize){
	/* app.main.ctx.save();
	app.main.ctx.translate(obj1.attackPosition.x,obj1.attackPosition.y);
	app.main.ctx.fillStyle = "Red";
	app.main.ctx.fillRect(0,0,obj1.attackSize.x, obj1.attackSize.y);
	app.main.ctx.restore();   */
	for (var i = 0; i < app.main.environment.smogCount;i++){
		if (attackPosition.x + 35 < app.main.environment.smogPos[i].x + app.main.environment.smogSize[i].x &&
			attackPosition.x + 35 + attackSize.x - 70 > app.main.environment.smogPos[i].x &&
			attackPosition.y + 35 < app.main.environment.smogPos[i].y + app.main.environment.smogSize[i].y &&
			attackSize.y - 70 + attackPosition.y + 35 > app.main.environment.smogPos[i].y) {
				app.main.environment.smogTarget = i;
				return true;
		}
	}
}

