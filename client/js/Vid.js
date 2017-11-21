
"use strict";

var app = app || {};

//HANDLES VIDEO CONTENT
app.Vid = (function(){
	
	function Vid(){
		
		//SETUP ALL CONNECTIONS
		this.vid = document.getElementById("video1"); 
		this.videoPos = document.getElementById("videoPos");
		this.vid2 = document.getElementById("video2"); 
		this.videoPos2 = document.getElementById("videoPos2");
		this.vid3 = document.getElementById("video3"); 
		this.videoPos3 = document.getElementById("videoPos3");
		this.vid4 = document.getElementById("video4"); 
		this.videoPos4 = document.getElementById("videoPos4");
		
		
		this.border = document.getElementById("border");
		this.bar = document.getElementById("bar");
		this.bar2 = document.getElementById("smallBar1");
		this.bar3 = document.getElementById("smallBar2");
		this.canvasEX = document.getElementById("trueTop");
	}
	
	
	//A HANDFUL OF FUCNTIONS TO PLAY, PAUSE, STOP, AND RELOCATE VIDEO CONTENT
	
	Vid.prototype.start = function(){
		this.bar.style.zIndex = 3;
		this.videoPos.style.zIndex = 2;
		this.vid.play();
	};
	
	Vid.prototype.end = function(){
		this.bar.style.zIndex = -3;
		this.videoPos.style.zIndex = -1;
		this.vid.pause();
	};
	
	Vid.prototype.rewind = function(){
		this.vid.currentTime = 0;
		this.vid2.currentTime = 0;
		this.vid3.currentTime = 0;
		this.vid4.currentTime = 0;
	};
	
	Vid.prototype.startE = function(){
		this.videoPos2.style.zIndex = 3;
		this.vid2.play();
	};
	
	Vid.prototype.endE = function(){
		this.videoPos2.style.zIndex = -2;
		this.vid2.pause();
	};
	
	Vid.prototype.startO = function(){
		this.canvasEX.style.zIndex = -3;
		this.bar2.style.zIndex = 3;
		this.bar3.style.zIndex = 3;
		this.border.style.zIndex = 4;
		this.videoPos3.style.zIndex = 3;
		this.vid3.play();
	};
	
	Vid.prototype.pauseS = function(){
		this.vid4.pause();
	};
	
	Vid.prototype.pauseO = function(){
		this.vid3.pause();
	};
	
	Vid.prototype.pauseE = function(){
		this.vid2.pause();
	};
	
	Vid.prototype.pause = function(){
		this.vid.pause();
	};
	
	Vid.prototype.endO = function(){
		this.bar2.style.zIndex = -3;
		this.bar3.style.zIndex = -3;
		this.videoPos3.style.zIndex = -2;
		this.border.style.zIndex = -3;
		this.vid3.pause();
	};
	
	Vid.prototype.startS = function(){
		this.videoPos4.style.zIndex = 5;
		this.vid4.play();
	};
	
	Vid.prototype.endS = function(){
		this.videoPos4.style.zIndex = -2;
		this.vid4.pause();
	};
	
	
	return Vid; 
})(); //end IIFE