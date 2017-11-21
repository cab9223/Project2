
"use strict";
var app = app || {};

app.Emitter=function(){

	function Emitter(){
		// public
		this.numParticles = 25;
		this.useCircles = true;
		this.useCircles2 = false;
		this.useSquares = false;
		this.xRange = 4;
		this.yRange = 4;
		this.minXspeed = 5;
		this.maxXspeed = 20;
		this.minYspeed = -1;
		this.maxYspeed = 1;
		this.startRadius = 8;
		this.expansionRate = 0.1;
		this.decayRate = 4.5;
		this.lifetime = 30;
		this.red = 0;
		this.green = 0;
		this.blue = 0;
		
		// private
		this._particles = undefined;
	};
	
	
	// "public" methods
	var p=Emitter.prototype;
	
	p.createParticles = function(emitterPoint){
		// initialize particle array
		this._particles = [];
				
		// create exhaust particles
		for(var i=0; i< this.numParticles; i++){
			// create a particle object and add to array
			var p = {};
			this._particles.push(_initParticle(this, p, emitterPoint));
		}

		// log the particles
		//console.log(this._particles );
	};
	
	p.updateAndDraw = function(ctx, emitterPoint){
			/* move and draw particles */
			// each frame, loop through particles array
			// move each particle down screen, and slightly left or right
			// make it bigger, and fade it out
			// increase its age so we know when to recycle it
			
			for(var i=0;i<this._particles.length;i++){
				var p = this._particles[i];
							
				p.age += this.decayRate;
				p.r += this.expansionRate;
				p.x += p.xSpeed
				p.y += p.ySpeed
				var alpha = 1 - p.age/this.lifetime;
				
				if(this.useSquares){
					// fill a rectangle	
					ctx.fillStyle = "rgba(" + this.red + "," + this.green + "," + 			
					this.blue + "," + alpha + ")"; 
					ctx.fillRect(p.x, p.y, p.r, p.r);
					// note: this code is easily modified to draw images
				}
				
				if(this.useCircles){
					// fill a circle
					ctx.fillStyle = "rgba(" + this.red + "," + this.green + "," + 			
					this.blue + "," + alpha + ")"; 
			
					ctx.beginPath();
					ctx.arc(p.x, 0, p.r, Math.PI * 2, false);
					ctx.closePath();
					ctx.fill();
				}
				
				if(this.useCircles2){
					// fill a circle
					ctx.fillStyle = "rgba(" + this.red + "," + this.green + "," + 			
					this.blue + "," + alpha + ")"; 
			
					ctx.beginPath();
					ctx.arc(p.x, p.y, p.r, Math.PI * 2, false);
					ctx.closePath();
					ctx.fill();
				}
							
				// if the particle is too old, recycle it
				if(p.age >= this.lifetime){
					_initParticle(this, p, emitterPoint);
				}		
			} // end for loop of this._particles
	} // end updateAndDraw()
			
	// "private" method
	function _initParticle(obj, p, emitterPoint){
		
		// give it a random age when first created
		p.age = getRandom(0,obj.lifetime);
				
		p.x = emitterPoint.x + getRandom(-obj.xRange, obj.xRange);
		p.y = emitterPoint.y + getRandom(0, obj.yRange);
		p.r = getRandom(obj.startRadius/2, obj.startRadius); // radius
		p.xSpeed = getRandom(obj.minXspeed, obj.maxXspeed);
		p.ySpeed = getRandom(obj.minYspeed, obj.maxYspeed);
		return p;
	};
	
	
	return Emitter;
}();