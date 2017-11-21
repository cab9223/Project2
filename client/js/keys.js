// The myKeys object will be in the global scope - it makes this script 
// really easy to reuse between projects

"use strict";

var myKeys = {};

//LIST OF ALL POTENTIAL KEYS
myKeys.KEYBOARD = Object.freeze({
	"KEY_ENTER": 13,
	"KEY_LEFT": 37, 
	"KEY_UP": 38, 
	"KEY_RIGHT": 39, 
	"KEY_DOWN": 40,
	"KEY_SPACE": 32,
	"KEY_SHIFT": 16,
	"KEY_CTRL": 17,
	"KEY_D": 68,
	"KEY_A": 65,
	"KEY_S": 83,
	"KEY_W": 87,
	"KEY_F": 70,
	"KEY_Q": 81,
	"KEY_C": 67,
	"KEY_E": 69,
	"KEY_T": 84,
	"KEY_J": 74
});

// myKeys.keydown array to keep track of which keys are down
myKeys.keydown = [];


// event listeners
window.addEventListener("keydown",function(e){
	//console.log("keydown=" + e.keyCode);
	myKeys.keydown[e.keyCode] = true;
});
	
window.addEventListener("keyup",function(e){
	//console.log("keyup=" + e.keyCode);
	myKeys.keydown[e.keyCode] = false;
	
	// pausing and resuming
	var char = String.fromCharCode(e.keyCode);
	if(app.main.onScreen == true && app.main.loaded == true){
	if (char == "p" || char == "P"){
		if (app.main.paused){
			app.main.resumeGame();
		} else {
			app.main.pausedGame();
		}
	}
	}
	
	
	
});