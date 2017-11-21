
"use strict";

var app = app || {};


app.Energy = (function(){
	
	function Energy(initX, initY, left, user, attackType){
		
		//VARIABLES
		this.lifetime = 0;
		this.counter = 0;
		this.replace = 0;
		this.replace2 = 0;
		this.copy = 0;
		this.exhaust = [];
		this.dirLeft = left;
		this.type = attackType;
		this.blastUser = user;
		//0 = 18
		//1 = Vegeta
		//2 = Piccolo
		//3 = Gohan
		
		this.moving = true;
		this.trigger = false;
		this.triggerState = 0;
		this.turnTrigger = false;
		this.lockedIn = 0;
		this.tracking = new Victor(0,0);
		this.noTrack = false;
		
		this.turnDown = false;
		this.firstTurn = false;
		this.turnLocation = 0;
		
		this.groundTrigger = false;
		
		this.fix = false;
		this.fix2 = false;
		
		this.getAngle = getRandom(0,360);
		
		//this.position = new Victor(initX,initY);
		this.local = new Victor(initX,initY);
		if(this.type == 0){
			this.size = new Victor(60,35);
			this.attackSize = new Victor(60,35);
			this.position = new Victor(initX,initY);
			this.attackPosition = new Victor(initX,initY);
		} else if(this.type == 1){
			if(this.dirLeft == true) {
				this.size = new Victor(100,60);
				this.attackSize = new Victor(100,60);
				this.position = new Victor(initX - 200,initY + 10);
				this.attackPosition = new Victor(initX - 200,initY + 10);
			} else {
				this.size = new Victor(100,60);
				this.attackSize = new Victor(100,60);
				this.position = new Victor(initX,initY + 10);
				this.attackPosition = new Victor(initX,initY + 10);
			}
		} else if(this.type == 2){
			if(this.dirLeft == true) {
				this.size = new Victor(120,20);
				this.attackSize = new Victor(120,20);
				this.position = new Victor(initX - 200,initY + 10);
				this.attackPosition = new Victor(initX - 200,initY + 10);
			} else {
				this.size = new Victor(120,20);
				this.attackSize = new Victor(120,20);
				this.position = new Victor(initX,initY + 10);
				this.attackPosition = new Victor(initX,initY + 10);
			}
		} else if(this.type == 3){
			if(this.dirLeft == true) {
				this.size = new Victor(120,120);
				this.attackSize = new Victor(120,120);
				this.position = new Victor(initX,initY - 45);
				this.attackPosition = new Victor(initX,initY - 45);
			} else {
				this.size = new Victor(120,120);
				this.attackSize = new Victor(120,120);
				this.position = new Victor(initX,initY - 45);
				this.attackPosition = new Victor(initX,initY - 45);
			}
		} else if(this.type == 5){
			if(this.dirLeft == true) {
				this.size = new Victor(50,35);
				this.attackSize = new Victor(50,35);
				this.position = new Victor(initX - 15,initY - 25);
				this.attackPosition = new Victor(initX - 15,initY - 25);
			} else {
				this.size = new Victor(50,35);
				this.attackSize = new Victor(50,35);
				this.position = new Victor(initX + 30,initY - 25);
				this.attackPosition = new Victor(initX + 30,initY - 25);
			}
		} else if(this.type == 6){
			if(this.dirLeft == true) {
				this.size = new Victor(400,15);
				this.attackSize = new Victor(400,15);
				this.position = new Victor(initX - 140,initY + 10);
				this.attackPosition = new Victor(initX - 140,initY + 10);
			} else {
				this.size = new Victor(400,15);
				this.attackSize = new Victor(400,15);
				this.position = new Victor(initX - 350,initY + 10);
				this.attackPosition = new Victor(initX - 350,initY + 10);
			}
		} else if(this.type == 7){
			if(this.dirLeft == true) {
				this.size = new Victor(120,40);
				this.attackSize = new Victor(120,40);
				this.position = new Victor(initX - 200,initY + 10);
				this.attackPosition = new Victor(initX - 200,initY + 10);
			} else {
				this.size = new Victor(120,40);
				this.attackSize = new Victor(120,40);
				this.position = new Victor(initX,initY + 10);
				this.attackPosition = new Victor(initX,initY + 10);
			}
		} else if(this.type == 9){
			if(this.dirLeft == true) {
				this.size = new Victor(4024,210);
				this.attackSize = new Victor(4024,210);
				this.position = new Victor(initX - 1000,initY - 100);
				this.attackPosition = new Victor(initX - 1000,initY - 100);
			} else {
				this.size = new Victor(4024,210);
				this.attackSize = new Victor(4024,210);
				this.position = new Victor(initX - 1000,initY - 100);
				this.attackPosition = new Victor(initX - 1000,initY - 100);
			}
		} else if(this.type == 10){
			this.size = new Victor(60,20);
			this.attackSize = new Victor(60,20);
			this.position = new Victor(initX,initY);
			this.attackPosition = new Victor(initX,initY);
		}
		
		this.exploding = false;
		this.activated = false;
		
		//PREP PARTICLE EFFECT
		for(var i = 0; i < 20; i++){
		this.exhaust[i] = new app.Emitter();
		this.exhaust[i].numParticles = 100;
		this.exhaust[i].red = 248;
		this.exhaust[i].green = 200;
		this.exhaust[i].blue = 24;
		this.exhaust[i].expansionRate = -1;
		this.exhaust[i].lifetime = 20;
		this.exhaust[i].startRadius = 10;
		this.exhaust[i].createParticles({x:10,y:10});
		}
		
		//IMAGES
		var image = new Image();
		image.src =  app.attack.blast1;
		this.blast1 = image;
		
		image = new Image();
		image.src =  app.attack.beamB1;
		this.beamB1 = image;
		
		image = new Image();
		image.src =  app.attack.beamB2;
		this.beamB2 = image;
		
		image = new Image();
		image.src =  app.attack.beamB3;
		this.beamB3 = image;
		
		image = new Image();
		image.src =  app.attack.beamB4;
		this.beamB4 = image;
		
		image = new Image();
		image.src =  app.attack.beamB5;
		this.beamB5 = image;
		
		image = new Image();
		image.src =  app.attack.beamT1;
		this.beamT1 = image;
		
		image = new Image();
		image.src =  app.attack.beam1;
		this.beam1 = image;
		
		image = new Image();
		image.src =  app.attack.beam2;
		this.beam2 = image;
		
		image = new Image();
		image.src =  app.attack.beam3;
		this.beam3 = image;
		
		image = new Image();
		image.src =  app.attack.beam4;
		this.beam4 = image;
		
		image = new Image();
		image.src =  app.attack.beam5;
		this.beam5 = image;
		
		image = new Image();
		image.src =  app.attack.ball1;
		this.ball1 = image;
		
		image = new Image();
		image.src =  app.attack.triBeam;
		this.triBeam = image;
		
		image = new Image();
		image.src =  app.attack.explosion1;
		this.explosion1 = image;
		
		image = new Image();
		image.src =  app.attack.explosion2;
		this.explosion2 = image;
		
		image = new Image();
		image.src =  app.attack.explosion3;
		this.explosion3 = image;
		
		image = new Image();
		image.src =  app.attack.explosion4;
		this.explosion4 = image;
		
		image = new Image();
		image.src =  app.attack.explosion5;
		this.explosion5 = image;
		
		image = new Image();
		image.src =  app.attack.explosion6;
		this.explosion6 = image;
		
		image = new Image();
		image.src =  app.attack.bigExplosion1;
		this.bigExplosion1 = image;
		
		image = new Image();
		image.src =  app.attack.bigExplosion2;
		this.bigExplosion2 = image;
		
		image = new Image();
		image.src =  app.attack.bigExplosion3;
		this.bigExplosion3 = image;
		
		image = new Image();
		image.src =  app.attack.bigExplosion4;
		this.bigExplosion4 = image;
		
		image = new Image();
		image.src =  app.attack.bigExplosion5;
		this.bigExplosion5 = image;
		
		image = new Image();
		image.src =  app.attack.bigExplosion6;
		this.bigExplosion6 = image;	
		
		image = new Image();
		image.src =  app.attack.circleExplosion2;
		this.circleExplosion2 = image;
		
		image = new Image();
		image.src =  app.attack.circleExplosion3;
		this.circleExplosion3 = image;
		
		image = new Image();
		image.src =  app.attack.circleExplosion4;
		this.circleExplosion4 = image;
		
		image = new Image();
		image.src =  app.attack.circleExplosion5;
		this.circleExplosion5 = image;
		
		image = new Image();
		image.src =  app.attack.circleExplosion6;
		this.circleExplosion6 = image;
		
		image = new Image();
		image.src =  app.attack.disk1;
		this.disk1 = image;
		
		image = new Image();
		image.src =  app.attack.disk2;
		this.disk2 = image;
		
		
	}
	
	//DRAW ENERGY ATTACKS
	Energy.prototype.draw = function(ctx){
		if(this.moving == true)
		{
			this.lifetime++;
		}
		
		//console.log("BLAST IS AT: " + this.position);
		
		//if((hitTest(this,app.main.android18) != true && hitTest(this,app.main.vegeta) != true) || this.type == 1 || this.type == 2 || this.type == 3){
			this.activated = true;
			//console.log("ACTIVATED!");
		//}
		

		//HIT BOX UPDATES
		if(this.type == 0){
			if(this.dirLeft == true){
				this.attackPosition.x = this.position.x - 50;
				this.attackPosition.y = this.position.y;
			} else {
				this.attackPosition.x = this.position.x;
				this.attackPosition.y = this.position.y;
			}
			
		} else if(this.type == 1){
			if(this.dirLeft == true){
				this.attackPosition.x = this.position.x + 20;
				this.attackPosition.y = this.position.y - 30;
			} else {
				this.attackPosition.x = this.position.x + 140;
				this.attackPosition.y = this.position.y - 30;
			}
		} else if(this.type == 2){
			if(this.dirLeft == true){
				this.attackPosition.x = this.position.x - 20;
				this.attackPosition.y = this.position.y - 10;
			} else {
				this.attackPosition.x = this.position.x + 145;
				this.attackPosition.y = this.position.y - 10;
			}
		} else if(this.type == 3){
			if(this.dirLeft == true){
				this.attackPosition.x = this.position.x - 80;
				this.attackPosition.y = this.position.y - 20;
			} else {
				this.attackPosition.x = this.position.x + 60;
				this.attackPosition.y = this.position.y - 20;
			}
		} else if(this.type == 4){
			if(this.dirLeft == true){
				this.attackPosition.x = this.position.x;
				this.attackPosition.y = this.position.y;
			} else {
				this.attackPosition.x = this.position.x;
				this.attackPosition.y = this.position.y;
			}
		} else if(this.type == 5){
			if(this.dirLeft == true){
				this.attackPosition.x = this.position.x - 20;
				this.attackPosition.y = this.position.y - 10;
			} else {
				this.attackPosition.x = this.position.x - 30;
				this.attackPosition.y = this.position.y - 10;
			}
		} else if(this.type == 6){
			if(this.dirLeft == true){
				this.attackPosition.x = this.position.x;
				this.attackPosition.y = this.position.y - 10;
			} else {
				this.attackPosition.x = this.position.x + 135;
				this.attackPosition.y = this.position.y - 10;
			}
		} else if(this.type == 7){
			if(this.dirLeft == true) {
				if(this.turnTrigger == true && this.fix == true && this.turnDown == false){
					this.size = new Victor(65,80);
					this.attackSize = new Victor(65,80);
					this.attackPosition.x = this.position.x + 152;
					this.attackPosition.y = this.position.y - 165;
				} else if(this.turnTrigger == true && this.fix == true && this.turnDown == true){
					this.size = new Victor(65,80);
					this.attackSize = new Victor(65,80);
					this.attackPosition.x = this.position.x + 152;
					this.attackPosition.y = this.position.y + 85;
				} else {
					this.size = new Victor(80,65);
					this.attackSize = new Victor(80,65);
					this.attackPosition.x = this.position.x;
					this.attackPosition.y = this.position.y - 35;
				}
			} else {
				if(this.turnTrigger == true && this.turnDown == false){
					this.size = new Victor(65,80);
					this.attackSize = new Victor(65,80);
					this.attackPosition.x = this.position.x + 140;
					this.attackPosition.y = this.position.y - 65;
				} else if(this.turnTrigger == true && this.turnDown == true){
					this.size = new Victor(65,80);
					this.attackSize = new Victor(65,80);
					this.attackPosition.x = this.position.x + 140;
					this.attackPosition.y = this.position.y - 15;
				} else {
					this.size = new Victor(80,65);
					this.attackSize = new Victor(80,65);
					this.attackPosition.x = this.position.x + 155;
					this.attackPosition.y = this.position.y - 35;
				}
			}
		}  else if(this.type == 9){
			if(this.dirLeft == true){
				this.attackPosition.x = this.position.x;
				this.attackPosition.y = this.position.y;
			} else {
				this.attackPosition.x = this.position.x;
				this.attackPosition.y = this.position.y;
			}
		} else if(this.type == 10){
			if(this.dirLeft == true){
				this.attackPosition.x = this.position.x - 80;
				this.attackPosition.y = this.position.y;
			} else {
				this.attackPosition.x = this.position.x + 20;
				this.attackPosition.y = this.position.y;
			}
			
		}
		
		
		if(this.dirLeft == true && this.exploding == false){
			if(this.type == 0){
				this.exhaust[0].minXspeed = 5;
				this.exhaust[0].maxXspeed = 20;
				ctx.save();
				ctx.translate(this.position.x, this.position.y + 10);
				if(this.lifetime > 1){
					this.exhaust[0].updateAndDraw(ctx, {x:0,y:0});
				}
			
				ctx.save();
				ctx.scale(-2, 2);
				ctx.drawImage(this.blast1,-10,-8);
				ctx.restore();
				this.position.x = this.position.x - 25;
				if(app.main.vegeta.position.y < this.position.y + 200 && app.main.vegeta.position.y > this.position.y - 200 && this.noTrack == false){				
					if(app.main.vegeta.position.x < this.position.x ){
					if(app.main.vegeta.position.y < this.position.y - 50){
						this.position.y -= 8;
					}
					if(app.main.vegeta.position.y > this.position.y){
						this.position.y += 8;
					}
					}
				} else {
					this.noTrack = true;
				}
				
				if(app.main.vegeta.focus17 == false){
					
				if(app.main.android18.position.x < this.position.x ){
					if(app.main.android18.position.y < this.position.y - 50){
						this.position.y -= 8;
					}
					if(app.main.android18.position.y > this.position.y){
						this.position.y += 8;
					}
				}
				
				} else {
					if(app.main.android17.position.x < this.position.x ){
						if(app.main.android17.position.y < this.position.y - 50){
							this.position.y -= 8;
						}
						if(app.main.android17.position.y > this.position.y){
							this.position.y += 8;
						}
					}
				}
				this.position.x = this.position.x - 25;
				ctx.restore();
			
			} else if(this.type == 1){//Standard large beam
				ctx.save();
				ctx.translate(this.position.x + 160, this.position.y);
				ctx.scale(-2, 2);
				ctx.drawImage(this.beamB1,22,-16.5, 50, 35);
				this.position.x = this.position.x - 50;
				ctx.restore();
				ctx.save();
				this.replace = 0;
				if(this.lifetime > 10){
					ctx.translate(this.position.x + 660, this.position.y);
				} else {
					this.copy = this.copy + 1;
					ctx.translate(this.local.x - 40, this.local.y + 10);
				}
				
				for(var i = 0; i < this.copy; i++){
					this.replace = this.replace - 50;
					
					if(this.lifetime > 10 && i == 0){
						ctx.drawImage(this.beamT1,this.replace,-8,60,20);
					} else {
						ctx.drawImage(this.beam1,this.replace,-8,60,20);
					}
					/* //Flashing TEST
					ctx.save();
					ctx.fillStyle = "black";
					ctx.globalAlpha = .2;
					if(this.copy % 2 == 0){
						ctx.fillRect(this.replace, -8, 60, 20);
					}
					ctx.restore();
					*/
				}
				ctx.restore();
				ctx.save();
				if(this.lifetime > 10){
					//Nothing
				} else {
					ctx.translate(this.local.x, this.local.y + 10);
					ctx.drawImage(this.beamB1,-84,-28, 65, 60);
				}
				
				ctx.restore();
				if(this.limetime > 30) {
					this.lifetime = 301;
				}
			} else if(this.type == 2){//Finger beam
				ctx.save();
				ctx.translate(this.position.x + 160, this.position.y);
				ctx.scale(-2, 2);
				ctx.drawImage(this.beamB1,22,-5.5, 60, 8.75);
				this.position.x = this.position.x - 50;
				ctx.restore();
				ctx.save();
				this.replace = 0;
				if(this.lifetime > 10){
					ctx.translate(this.position.x + 660, this.position.y);
				} else {
					this.copy = this.copy + 1;
					ctx.translate(this.local.x - 40, this.local.y + 10);
				}
				
				for(var i = 0; i < this.copy; i++){
					this.replace = this.replace - 50;
					
					if(this.lifetime > 10 && i == 0){
						ctx.drawImage(this.beamT1,this.replace,-5,60,5);
					} else {
						ctx.drawImage(this.beam1,this.replace,-5,60,5);
					}
				}
				ctx.restore();
				ctx.save();
				if(this.lifetime > 10){
					//Nothing
				} else {
					ctx.translate(this.local.x, this.local.y + 10);
					ctx.drawImage(this.beamB1,-86,-10.5, 65, 15);
				}
				
				ctx.restore();
				if(this.limetime > 30) {
					this.lifetime = 301;
				}
			} else if(this.type == 3){
				ctx.save();
				ctx.translate(this.position.x, this.position.y + 10);
				if(this.lifetime > 1){
					for(var i = 1; i < 10; i++){
						this.exhaust[i].minXspeed = 5;
						this.exhaust[i].maxXspeed = 20;
						this.exhaust[i].useCircles = false;
						this.exhaust[i].useCircles2 = true;
						this.exhaust[i].updateAndDraw(ctx, {x:0,y:(i*6)});
					}
				}
			
				ctx.save();
				ctx.scale(-2, 2);
				ctx.drawImage(this.ball1,-10,-8);
				ctx.restore();
				this.position.x = this.position.x - 50;
				ctx.restore();
				if(this.limetime > 30) {
					//console.log("DISAPEAR");
					this.lifetime = 301;
				}
			
			} else if(this.type == 5){ //Piccolo ball
				ctx.save();
				ctx.translate(this.position.x, this.position.y + 10);
				ctx.save();
				ctx.scale(-2, 2);
				if(this.moving == false && this.triggerState == 0){
					this.count++;
					if(this.count < 2)
					{
						ctx.drawImage(this.ball1,-10,-8, 15, 15);
					} else {
						this.count = 0;
					}
				} else {
					ctx.drawImage(this.ball1,-10,-8, 15, 15);
				}
				if(this.trigger == true && this.triggerState == 0){
					this.trigger = false;
					//this.moving = true;
					if(app.main.android18.position.x < this.position.x){
						if(app.main.android18.position.y < this.position.y - 50){
							this.triggerState = 1;
						}
						if(app.main.android18.position.y > this.position.y){
							this.triggerState = 2;
						}
					} else if(app.main.android18.position.x > this.position.x){
						if(app.main.android18.position.y < this.position.y - 50){
							this.triggerState = 3;
						}
						if(app.main.android18.position.y > this.position.y){
							this.triggerState = 4;
						}
					}
					this.tracking = new Victor(app.main.android18.position.x, app.main.android18.position.y);
				}
				ctx.restore();
				if(this.moving == true) {
					if(this.triggerState == 0){
						this.position.x = this.position.x - 50;
					}
				}
				
				if(this.triggerState == 1 && this.turnTrigger == false){
						
						if(this.tracking.x < this.position.x){
							this.position.x -= 35;
						}
						if(this.tracking.y + 50 < this.position.y){
							this.position.y -= 35;
						}
						if(this.tracking.x >= this.position.x && this.tracking.y + 50 >= this.position.y){
							this.turnTrigger = true;
						}
				} else if(this.triggerState == 2 && this.turnTrigger == false){
						
						if(this.tracking.x < this.position.x){
							this.position.x -= 35;
						}
						if(this.tracking.y + 50 > this.position.y){
							this.position.y += 35;
						}
						if(this.tracking.x >= this.position.x && this.tracking.y + 50 <= this.position.y){
							this.turnTrigger = true;
						}
				} else if(this.triggerState == 3 && this.turnTrigger == false){

						if(this.tracking.x > this.position.x){
							this.position.x += 35;
						} 
						if(this.tracking.y + 50 < this.position.y){
							this.position.y -= 35;
						}
						if(this.tracking.x <= this.position.x && this.tracking.y + 50 >= this.position.y){
							this.turnTrigger = true;
						}
				} else if(this.triggerState == 4 && this.turnTrigger == false){

						if(this.tracking.x > this.position.x){
							this.position.x += 35;
						}
						if(this.tracking.y + 50 > this.position.y){
							this.position.y += 35;
						}
						if(this.tracking.x <= this.position.x && this.tracking.y + 50 <= this.position.y){
							this.turnTrigger = true;
						}
				}
				
				if(this.turnTrigger == true && this.lockedIn == 0){
					if(this.position.y < app.main.android18.position.y + 125 && this.position.y > app.main.android18.position.y - 75) {
						if(this.tracking.x < app.main.android18.position.x){
							this.lockedIn = 1;
						} else {
							this.lockedIn = 2;
						}
					} else {
						if(this.tracking.y < app.main.android18.position.y){
							this.lockedIn = 3;
						} else {
							this.lockedIn = 4;
						}
					}
				}
				
				if(this.lockedIn != 0){
					if(this.lockedIn == 1){
						this.position.x += 35;
					} else if(this.lockedIn == 2){
						this.position.x -= 35;
					} else if(this.lockedIn == 3){
						this.position.y += 35;
					} else if(this.lockedIn == 4){
						this.position.y -= 35;
					}
				}
				
				if(this.position.y > 725){
					app.main.sound.playEnergyReaction(6);
					app.main.environment.shake = true;
					this.exploding = true;
				}
		
				ctx.restore();
				if(this.lifetime > getRandom(2, 40) && this.lockedIn == 0) {
					this.lifetime = 0;
					this.moving = false;
				} else if(this.lifetime > 100) {
					this.exploding = true;
				}
			} else if(this.type == 6){//Special beam
				this.position.x = this.position.x - 50;

				ctx.save();
				this.replace = 0;
				if(this.lifetime > 10){
					ctx.translate(this.position.x + 600, this.position.y);
				} else {
					this.copy = this.copy + 1;
					ctx.translate(this.local.x - 40, this.local.y + 10);
				}
				
				for(var i = 0; i < this.copy; i++){
					this.replace = this.replace - 50;
					
					if(this.lifetime > 10 && i == 0){
						ctx.drawImage(this.beamT1,this.replace,-4,60,5);
					} else {
						ctx.drawImage(this.beam2,this.replace,-8,50,13);
					}
				}
				ctx.restore();
				ctx.save();
				if(this.lifetime > 10){
					//Nothing
				} else {
					ctx.translate(this.local.x, this.local.y + 10);
					ctx.scale(-1,1);
					ctx.drawImage(this.beamB2,-35,-40, 120, 100);
				}
				
				ctx.restore();
				
				ctx.save();
				ctx.translate(this.position.x + 100, this.position.y);
				ctx.scale(2, 2);
				ctx.drawImage(this.beamB2,-65,-16, 90, 40);
				ctx.restore();
				
				if(this.limetime > 30) {
					this.lifetime = 301;
				}
			} else if(this.type == 7){//Mesenko

			
				if(this.trigger == true){
					this.trigger = false;
					this.triggerState = this.copy + 1;
					//this.size = new Victor(30,150);
					//this.attackSize = new Victor(30,150);
					this.turnTrigger = true;
					/* this.position.x = this.position.x - 50;
					if(this.turnDown == false){
						this.position.y = this.position.y - 50;
					} else {
						this.position.y = this.position.y + 50;
					} */
				}
				
				ctx.save();
				ctx.translate(this.position.x + 160, this.position.y);
				if(this.fix == false){
					ctx.scale(-2, 2);
					ctx.drawImage(this.beamB3,22,-16.5, 50, 32);
					this.position.x = this.position.x - 50;
				} else {
					if(this.turnDown == false){
						ctx.scale(-2, -2);
						ctx.drawImage(this.beamB4,-28,33.5, 32, 50);
						this.position.y = this.position.y - 50;
					} else {
						ctx.scale(-2, 2);
						ctx.drawImage(this.beamB4,-28,33.5, 32, 50);
						this.position.y = this.position.y + 50;
					}
				}
				ctx.restore();
				ctx.save();
				this.replace = 0;
				this.replace2 = 0;
				if(this.lifetime > 30){
					ctx.translate(this.position.x + 660, this.position.y);
				} else {
					this.copy = this.copy + 1;
					ctx.translate(this.local.x - 40, this.local.y + 10);
				}
				
				for(var i = 0; i < this.copy; i++){
					if(this.turnTrigger == false){
						this.replace = this.replace - 50;
					} else {
						this.replace = this.replace - 50;
						
					}
					
					if(this.lifetime > 30 && i == 0){
						ctx.save();
						ctx.scale(-1,1);
						ctx.drawImage(this.beamT1,this.replace * -1 - 50,-8,60,14);
						ctx.restore();
					} else {
						if(this.turnTrigger == false){
							ctx.drawImage(this.beam3,this.replace,-8,60,14);
						} else {
							if(i < this.triggerState){
								ctx.drawImage(this.beam3,this.replace,-8,60,14);
								this.turnLocation = this.replace;
							} else if(i < (this.triggerState + 1)){
								this.fix = true;
								if(this.turnDown == false){
									ctx.save();
									ctx.scale(-1,-1);
									ctx.drawImage(this.beam4,(this.turnLocation) * -1,-6 , 32, 32);
									ctx.restore();
								} else {
									ctx.save();
									ctx.scale(-1,1);
									ctx.drawImage(this.beam4,(this.turnLocation) * -1,-8 ,32, 33);
									ctx.restore();
								}
							} else {
								//console.log("DRAW DRAW DRAW %%%%%%%%%%%");
								//console.log(this.turnLocation);
								//console.log(this.replace2);
								if(this.turnDown == false){
									ctx.save();
									ctx.scale(-1,1);
									ctx.drawImage(this.beam5,(this.turnLocation - 18) * -1,(this.replace2 -8) - 77,14,60);
									this.replace2 = this.replace2 - 50;
									ctx.restore();
								} else {
									ctx.save();
									ctx.scale(-1,1);
									ctx.drawImage(this.beam5,(this.turnLocation - 18) * -1,(this.replace2 -8) + 27,14,60);
									this.replace2 = this.replace2 + 50;
									ctx.restore();
									
								}
							}
						}
					}
					/* //Flashing TEST
					ctx.save();
					ctx.fillStyle = "black";
					ctx.globalAlpha = .2;
					if(this.copy % 2 == 0){
						ctx.fillRect(this.replace, -8, 60, 20);
					}
					ctx.restore();
					*/
				}
				ctx.restore();
				ctx.save();
				
				if(this.position.y > 725){
					app.main.sound.playEnergyReaction(6);
					this.groundTrigger = true;
					app.main.environment.shake = true;
					this.exploding = true;
				}
				
				if(this.lifetime > 30){
					//Nothing
				} else {
					ctx.translate(this.local.x, this.local.y + 10);
					ctx.scale(1,1);
					ctx.drawImage(this.beamB5,-84,-24, 65, 46);
				}
				
				ctx.restore();
				if(this.limetime > 40) {
					this.lifetime = 301;
				}
			} else if(this.type == 9){//TriBeam
				this.counter++;
				ctx.save();
				ctx.translate(this.position.x, this.position.y);
				if(this.counter < 2){
					ctx.globalAlpha = .7;
					ctx.drawImage(this.triBeam,0,0);
				} else {
					//ctx.globalAlpha = .6;
					//ctx.drawImage(this.triBeam,0,0);
					this.counter = 0;
				}
				ctx.restore();
				
				if(this.lifetime > 20){
					this.lifetime = 300;
				}
			} else if(this.type == 10){
				ctx.save();
				ctx.translate(this.position.x, this.position.y + 10);
				ctx.save();
				ctx.scale(-2, 2);
				ctx.drawImage(this.disk2,-10,-8);
				ctx.restore();
				this.position.x = this.position.x - 25;
				if(app.main.vegeta.position.x < this.position.x ){
					if(app.main.vegeta.position.y < this.position.y - 50){
						this.position.y -= 4;
					}
					if(app.main.vegeta.position.y > this.position.y){
						this.position.y += 4;
					}
				}
				if(app.main.vegeta.focus17 == false){
					
				if(app.main.android18.position.x < this.position.x ){
					if(app.main.android18.position.y < this.position.y - 50){
						this.position.y -= 4;
					}
					if(app.main.android18.position.y > this.position.y){
						this.position.y += 4;
					}
				}
				
				} else {
					if(app.main.android17.position.x < this.position.x ){
						if(app.main.android17.position.y < this.position.y - 50){
							this.position.y -= 4;
						}
						if(app.main.android17.position.y > this.position.y){
							this.position.y += 4;
						}
					}
				}
				this.position.x = this.position.x - 25;
				ctx.restore();
			
			}
		} else if(this.dirLeft == false && this.exploding == false){
			if(this.type == 0){
				this.exhaust[0].minXspeed = -5;
				this.exhaust[0].maxXspeed = -20;
				ctx.save();
				ctx.translate(this.position.x, this.position.y + 10);
				if(this.lifetime > 1){
					this.exhaust[0].updateAndDraw(ctx, {x:0,y:0});
				}
				ctx.save();
				ctx.scale(2, 2);
				ctx.drawImage(this.blast1,-10,-8);
				ctx.restore();
				this.position.x = this.position.x + 25;
				if(app.main.vegeta.position.y < this.position.y + 200 && app.main.vegeta.position.y > this.position.y - 200 && this.noTrack == false){				
					if(app.main.vegeta.position.x > this.position.x ){
					if(app.main.vegeta.position.y < this.position.y - 50){
						this.position.y -= 8;
					}
					if(app.main.vegeta.position.y > this.position.y){
						this.position.y += 8;
					}
					}
				} else {
					this.noTrack = true;
				}
				
				if(app.main.vegeta.focus17 == false){
					
				if(app.main.android18.position.x > this.position.x ){
					if(app.main.android18.position.y < this.position.y - 50){
						this.position.y -= 8;
					}
					if(app.main.android18.position.y > this.position.y){
						this.position.y += 8;
					}
				}
				
				} else {
					if(app.main.android17.position.x > this.position.x ){
						if(app.main.android17.position.y < this.position.y - 50){
							this.position.y -= 8;
						}
						if(app.main.android17.position.y > this.position.y){
							this.position.y += 8;
						}
					}
				}
				
				
				this.position.x = this.position.x + 25;
				ctx.restore();
			} else if(this.type == 1){//Standard large beam
				ctx.save();
				ctx.translate(this.position.x - 360, this.position.y);
				ctx.scale(2, 2);
				ctx.drawImage(this.beamB1,250,-16.5, 50, 35);
				this.position.x = this.position.x + 50;
				ctx.restore();
				ctx.save();
				this.replace = 0;
				if(this.lifetime > 10){
					ctx.translate(this.position.x - 460, this.position.y);
				} else {
					this.copy = this.copy + 1;
					ctx.translate(this.local.x + 30, this.local.y + 10);
				}
				
				for(var i = 0; i < this.copy; i++){
					this.replace = this.replace + 50;
					
					if(this.lifetime > 10 && i == 0){
						ctx.save();
						ctx.scale(-1,1);
						ctx.drawImage(this.beamT1,this.replace * -1 - 50,-8,60,20);
						ctx.restore();
					} else {
						ctx.drawImage(this.beam1,this.replace,-8,60,20);
					}
					/* //Flashing TEST
					ctx.save();
					ctx.fillStyle = "black";
					ctx.globalAlpha = .2;
					if(this.copy % 2 == 0){
						ctx.fillRect(this.replace, -8, 60, 20);
					}
					ctx.restore();
					*/
				}
				ctx.restore();
				ctx.save();
				
				if(this.lifetime > 10){
					//Nothing
				} else {
					ctx.translate(this.local.x, this.local.y + 10);
					ctx.scale(-1,1);
					ctx.drawImage(this.beamB1,-97,-28, 65, 60);
				}
				
				ctx.restore();
				if(this.limetime > 30) {
					this.lifetime = 301;
				}
			} else if(this.type == 2){//Finger beam
				ctx.save();
				ctx.translate(this.position.x - 360, this.position.y);
				ctx.scale(2, 2);
				ctx.drawImage(this.beamB1,250,-5.5, 50, 8.75);
				this.position.x = this.position.x + 50;
				ctx.restore();
				ctx.save();
				this.replace = 0;
				if(this.lifetime > 10){
					ctx.translate(this.position.x - 460, this.position.y);
				} else {
					this.copy = this.copy + 1;
					ctx.translate(this.local.x + 30, this.local.y + 10);
				}
				
				for(var i = 0; i < this.copy; i++){
					this.replace = this.replace + 50;
					
					if(this.lifetime > 10 && i == 0){
						ctx.save();
						ctx.scale(-1,1);
						ctx.drawImage(this.beamT1,this.replace * -1 - 50,-5,60,5);
						ctx.restore();
					} else {
						ctx.drawImage(this.beam1,this.replace,-5,60,5);
					}
				}
				ctx.restore();
				ctx.save();
				
				if(this.lifetime > 10){
					//Nothing
				} else {
					ctx.translate(this.local.x, this.local.y + 10);
					ctx.scale(-1,1);
					ctx.drawImage(this.beamB1,-97,-10.5, 65, 15);
				}
				
				ctx.restore();
				if(this.limetime > 30) {
					this.lifetime = 301;
				}
			} if(this.type == 3){
				ctx.save();
				ctx.translate(this.position.x, this.position.y + 10);
				if(this.lifetime > 1){
					for(var i = 1; i < 10; i++){
						this.exhaust[i].minXspeed = -5;
						this.exhaust[i].maxXspeed = -20;
						this.exhaust[i].useCircles = false;
						this.exhaust[i].useCircles2 = true;
						this.exhaust[i].updateAndDraw(ctx, {x:100,y:(i*6)});
					}
				}
				ctx.save();
				ctx.scale(2, 2);
				ctx.drawImage(this.ball1,40,-8);
				ctx.restore();
				this.position.x = this.position.x + 50;
				ctx.restore();
			} else if(this.type == 5){ //Piccolo ball
				ctx.save();
				ctx.translate(this.position.x, this.position.y + 10);
				ctx.save();
				ctx.scale(2, 2);
				if(this.moving == false && this.triggerState == 0){
					this.count++;
					if(this.count < 2)
					{
						ctx.drawImage(this.ball1,-10,-8, 15, 15);
					} else {
						this.count = 0;
					}
				} else {
					ctx.drawImage(this.ball1,-10,-8, 15, 15);
				}
				ctx.restore();
				if(this.trigger == true && this.triggerState == 0){
					this.trigger = false;
					//this.moving = true;
					if(app.main.android18.position.x < this.position.x){
						if(app.main.android18.position.y < this.position.y - 50){
							this.triggerState = 1;
						}
						if(app.main.android18.position.y > this.position.y){
							this.triggerState = 2;
						}
					} else if(app.main.android18.position.x > this.position.x){
						if(app.main.android18.position.y < this.position.y - 50){
							this.triggerState = 3;
						}
						if(app.main.android18.position.y > this.position.y){
							this.triggerState = 4;
						}
					}
					this.tracking = new Victor(app.main.android18.position.x, app.main.android18.position.y);
				}
				ctx.restore();
				if(this.moving == true) {
					//console.log("MOVINGBLASTSTSTSTSTS");
					if(this.triggerState == 0){
						this.position.x = this.position.x + 50;
					}
				}
				if(this.triggerState == 1 && this.turnTrigger == false){
						
						if(this.tracking.x < this.position.x){
							this.position.x -= 35;
						}
						if(this.tracking.y + 50 < this.position.y){
							this.position.y -= 35;
						}
						if(this.tracking.x >= this.position.x && this.tracking.y + 50 >= this.position.y){
							this.turnTrigger = true;
						}
				} else if(this.triggerState == 2 && this.turnTrigger == false){
						
						if(this.tracking.x < this.position.x){
							this.position.x -= 35;
						}
						if(this.tracking.y + 50 > this.position.y){
							this.position.y += 35;
						}
						if(this.tracking.x >= this.position.x && this.tracking.y + 50 <= this.position.y){
							this.turnTrigger = true;
						}
				} else if(this.triggerState == 3 && this.turnTrigger == false){

						if(this.tracking.x > this.position.x){
							this.position.x += 35;
						} 
						if(this.tracking.y + 50 < this.position.y){
							this.position.y -= 35;
						}
						if(this.tracking.x <= this.position.x && this.tracking.y + 50 >= this.position.y){
							this.turnTrigger = true;
						}
				} else if(this.triggerState == 4 && this.turnTrigger == false){

						if(this.tracking.x > this.position.x){
							this.position.x += 35;
						}
						if(this.tracking.y + 50 > this.position.y){
							this.position.y += 35;
						}
						if(this.tracking.x <= this.position.x && this.tracking.y + 50 <= this.position.y){
							this.turnTrigger = true;
						}
				}
				
				if(this.turnTrigger == true && this.lockedIn == 0){
					if(this.position.y < app.main.android18.position.y + 125 && this.position.y > app.main.android18.position.y - 75) {
						if(this.tracking.x < app.main.android18.position.x){
							this.lockedIn = 1;
						} else {
							this.lockedIn = 2;
						}
					} else {
						if(this.tracking.y < app.main.android18.position.y){
							this.lockedIn = 3;
						} else {
							this.lockedIn = 4;
						}
					}
				}
				
				if(this.lockedIn != 0){
					if(this.lockedIn == 1){
						this.position.x += 35;
					} else if(this.lockedIn == 2){
						this.position.x -= 35;
					} else if(this.lockedIn == 3){
						this.position.y += 35;
					} else if(this.lockedIn == 4){
						this.position.y -= 35;
					}
				}
				
				if(this.position.y > 725){
					app.main.sound.playEnergyReaction(6);
					app.main.environment.shake = true;
					this.exploding = true;
				}
				
				ctx.restore();
				if(this.lifetime > getRandom(2, 40) && this.lockedIn == 0) {
					this.lifetime = 0;
					this.moving = false;
				} else if(this.lifetime > 100) {
					this.exploding = true;
				}
			} else if(this.type == 6){//Special beam
				this.position.x = this.position.x + 50;
				ctx.save();
				this.replace = 0;
				if(this.lifetime > 10){
					ctx.translate(this.position.x - 110, this.position.y);
				} else {
					this.copy = this.copy + 1;
					ctx.translate(this.local.x + 30, this.local.y + 10);
				}
				
				for(var i = 0; i < this.copy; i++){
					this.replace = this.replace + 50;
					
					if(this.lifetime > 10 && i == 0){
						ctx.save();
						ctx.scale(-1,1);
						ctx.drawImage(this.beamT1,this.replace * -1 - 50,-4,60,5);
						ctx.restore();
					} else {
						ctx.drawImage(this.beam2,this.replace,-8,50,13);
					}
				}
				ctx.restore();
				ctx.save();
				
				if(this.lifetime > 10){
					//Nothing
				} else {
					ctx.translate(this.local.x, this.local.y + 10);
					ctx.drawImage(this.beamB2,0,-40, 120, 100);
				}
				
				ctx.restore();
				
				ctx.save();
				ctx.translate(this.position.x - 10, this.position.y);
				ctx.scale(-2, 2);
				ctx.drawImage(this.beamB2,-287,-16, 90, 40);
				ctx.restore();
				
				if(this.limetime > 30) {
					this.lifetime = 301;
				}
			} else if(this.type == 7){//Gohan masenko
			
				if(this.trigger == true){
					this.trigger = false;
					this.triggerState = this.copy + 1;
					//this.size = new Victor(30,150);
					//this.attackSize = new Victor(30,150);
					this.turnTrigger = true;
					this.position.x = this.position.x - 67;
					if(this.turnDown == false){
						this.position.y = this.position.y - 50;
					} else {
						this.position.y = this.position.y + 50;
					}
				}
				
				ctx.save();
				ctx.translate(this.position.x - 360, this.position.y);
				if(this.turnTrigger == false){
					ctx.scale(2, 2);
					ctx.drawImage(this.beamB3,250,-16.5, 50, 32);
					this.position.x = this.position.x + 50;
				} else {
					if(this.turnDown == false){
						ctx.scale(2, -2);
						ctx.drawImage(this.beamB4,250,-16.5, 32, 50);
						this.position.y = this.position.y - 50;
					} else {
						ctx.scale(2, 2);
						ctx.drawImage(this.beamB4,250,-16.5, 32, 50);
						this.position.y = this.position.y + 50;
					}
				}
				ctx.restore();
				ctx.save();
				this.replace = 0;
				this.replace2 = 0;
				if(this.lifetime > 30){
					ctx.translate(this.position.x - 460, this.position.y);
				} else {
					this.copy = this.copy + 1;
					ctx.translate(this.local.x + 30, this.local.y + 10);
				}
				
				for(var i = 0; i < this.copy; i++){
					if(this.turnTrigger == false){
						this.replace = this.replace + 50;
					} else {
						this.replace = this.replace + 50;
						
					}
					
					if(this.lifetime > 30 && i == 0){
						ctx.save();
						ctx.scale(-1,1);
						ctx.drawImage(this.beamT1,this.replace * -1 - 50,-8,60,14);
						ctx.restore();
					} else {
						if(this.turnTrigger == false){
							ctx.drawImage(this.beam3,this.replace,-8,60,14);
						} else {
							if(i < this.triggerState - 1){
								ctx.drawImage(this.beam3,this.replace,-8,60,14);
								this.turnLocation = this.replace;
							} else if(i < (this.triggerState)){
								if(this.turnDown == false){
									ctx.save();
									ctx.scale(1,-1);
									ctx.drawImage(this.beam4,this.turnLocation + 50,-6 , 32, 32);
									ctx.restore();
								} else {
									ctx.drawImage(this.beam4,this.turnLocation + 50,-8 ,32, 33);
								}
							} else {
								//console.log("DRAW DRAW DRAW %%%%%%%%%%%");
								//console.log(this.turnLocation);
								//console.log(this.replace2);
								if(this.turnDown == false){
									ctx.drawImage(this.beam5,this.turnLocation + 68,(this.replace2 -8) - 77,14,60);
									this.replace2 = this.replace2 - 50;
								} else {
									ctx.drawImage(this.beam5,this.turnLocation + 68,(this.replace2 -8) + 27,14,60);
									this.replace2 = this.replace2 + 50;
								}
							}
						}
					}
					/* //Flashing TEST
					ctx.save();
					ctx.fillStyle = "black";
					ctx.globalAlpha = .2;
					if(this.copy % 2 == 0){
						ctx.fillRect(this.replace, -8, 60, 20);
					}
					ctx.restore();
					*/
				}
				ctx.restore();
				ctx.save();
				
				if(this.position.y > 725){
					app.main.sound.playEnergyReaction(6);
					app.main.environment.shake = true;
					this.groundTrigger = true;
					this.exploding = true;
				}
				
				if(this.lifetime > 30){
					//Nothing
				} else {
					ctx.translate(this.local.x, this.local.y + 10);
					ctx.scale(-1,1);
					ctx.drawImage(this.beamB5,-97,-24, 65, 46);
				}
				
				ctx.restore();
				if(this.limetime > 40) {
					this.lifetime = 301;
				}
			} else if(this.type == 9){//TriBeam
				this.counter++;
				ctx.save();
				ctx.translate(this.position.x, this.position.y);
				if(this.counter < 2){
					ctx.scale(-1,1);
					ctx.globalAlpha = .7;
					ctx.drawImage(this.triBeam,0,0);
				} else {
					ctx.globalAlpha = .6;
					ctx.drawImage(this.triBeam,0,0);
					this.counter = 0;
				}
				ctx.restore();
				
				if(this.lifetime > 20){
					this.lifetime = 300;
				}
			} else if(this.type == 10){
				ctx.save();
				ctx.translate(this.position.x, this.position.y + 10);
				ctx.save();
				ctx.scale(2, 2);
				ctx.drawImage(this.disk2,-10,-8);
				ctx.restore();
				this.position.x = this.position.x + 25;
				if(app.main.vegeta.position.x > this.position.x ){
					if(app.main.vegeta.position.y < this.position.y - 50){
						this.position.y -= 4;
					}
					if(app.main.vegeta.position.y > this.position.y){
						this.position.y += 4;
					}
				}
				
				if(app.main.vegeta.focus17 == false){
					
				if(app.main.android18.position.x > this.position.x ){
					if(app.main.android18.position.y < this.position.y - 50){
						this.position.y -= 4;
					}
					if(app.main.android18.position.y > this.position.y){
						this.position.y += 4;
					}
				}
				
				} else {
					if(app.main.android17.position.x > this.position.x ){
						if(app.main.android17.position.y < this.position.y - 50){
							this.position.y -= 4;
						}
						if(app.main.android17.position.y > this.position.y){
							this.position.y += 4;
						}
					}
				}
				
				
				this.position.x = this.position.x + 25;
				ctx.restore();
			}
		//DRAW EXPLOSION
		} else if(this.exploding == true){
			this.getAngle = getRandom(0,360);
			this.counter++;
			if(this.type == 0){
				ctx.save();
				ctx.translate(this.position.x - 5, this.position.y + 10);
				ctx.scale(4, 4);
				if(this.counter < 2){
					ctx.drawImage(this.explosion1,-10,-17);
				} else if(this.counter < 3){
					ctx.drawImage(this.explosion2,-10,-17);
				} else if(this.counter < 4){
					ctx.drawImage(this.explosion3,-10,-17);
				} else if(this.counter < 5){
					if(attackHitTestSmog(this.attackPosition,this.size) != true){
						if(this.dirLeft == true){
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 5,this.attackPosition.y - 75));
						} else {
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 55,this.attackPosition.y - 75));
						}
						app.main.environment.smogSize.push(new Victor(150,150));
						app.main.environment.smogAlpha.push(.8);
						app.main.environment.smogTimer.push(0);
						app.main.environment.smogAngle.push(this.getAngle);
						app.main.environment.smogCount += 1;
					} else {
						if(app.main.environment.smogSize[app.main.environment.smogTarget].x < 700){
							app.main.environment.smogSize[app.main.environment.smogTarget].x += 20;
							app.main.environment.smogSize[app.main.environment.smogTarget].y += 20;
							app.main.environment.smogPos[app.main.environment.smogTarget].x -= 10;
							app.main.environment.smogPos[app.main.environment.smogTarget].y -= 10;
						}
						if(app.main.environment.smogAlpha[app.main.environment.smogTarget] < 1.3){
						if(app.main.environment.smogAlpha[app.main.environment.smogTarget] < .25){
							if(this.dirLeft == true){
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 5,this.attackPosition.y - 75));
						} else {
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 55,this.attackPosition.y - 75));
						}
							app.main.environment.smogSize.push(new Victor(150,150));
							app.main.environment.smogAlpha.push(.8);
							app.main.environment.smogTimer.push(0);
							app.main.environment.smogAngle.push(this.getAngle);
							app.main.environment.smogCount += 1;
						} else {
							app.main.environment.smogAlpha[app.main.environment.smogTarget] += .3;
						}
						}
						app.main.environment.smogTarget = -1;
					}
					ctx.drawImage(this.explosion4,-10,-17);
				} else if(this.counter < 6){
					ctx.drawImage(this.explosion5,-10,-17);
				} else if(this.counter < 7){
					ctx.drawImage(this.explosion6,-10,-17);
					
				} else {
					this.lifetime = 301;
				}
				ctx.restore();
			} else if(this.type == 1 || this.type == 6 || this.type == 10){
				ctx.save();
				if(this.dirLeft == true){
					ctx.translate(this.position.x - 5, this.position.y + 10);
				} else {
					ctx.translate(this.position.x + 125, this.position.y + 10);
				}
				ctx.scale(6, 6);
				if(this.counter < 2){
					ctx.drawImage(this.explosion1,-10,-17);
				} else if(this.counter < 3){
					ctx.drawImage(this.explosion2,-10,-17);
				} else if(this.counter < 4){
					ctx.drawImage(this.explosion3,-10,-17);
				} else if(this.counter < 5){
					if(attackHitTestSmog(this.attackPosition,this.size) != true){
						if(this.dirLeft == true){
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 77.5,this.attackPosition.y - 75));
						} else {
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 77.5,this.attackPosition.y - 75));
						}
						app.main.environment.smogSize.push(new Victor(225,225));
						app.main.environment.smogAlpha.push(1.1);
						app.main.environment.smogTimer.push(0);
						app.main.environment.smogAngle.push(this.getAngle);
						app.main.environment.smogCount += 1;
					} else {
						if(app.main.environment.smogSize[app.main.environment.smogTarget].x < 700){
							app.main.environment.smogSize[app.main.environment.smogTarget].x += 100;
							app.main.environment.smogSize[app.main.environment.smogTarget].y += 100;
							app.main.environment.smogPos[app.main.environment.smogTarget].x -= 50;
							app.main.environment.smogPos[app.main.environment.smogTarget].y -= 50;
						}
						if(app.main.environment.smogAlpha[app.main.environment.smogTarget] < 1.3){
						if(app.main.environment.smogAlpha[app.main.environment.smogTarget] < .25){
							if(this.dirLeft == true){
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 77.5,this.attackPosition.y - 75));
						} else {
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 77.5,this.attackPosition.y - 75));
						}
							app.main.environment.smogSize.push(new Victor(225,225));
							app.main.environment.smogAlpha.push(1.1);
							app.main.environment.smogTimer.push(0);
							app.main.environment.smogAngle.push(this.getAngle);
							app.main.environment.smogCount += 1;
						} else {
							app.main.environment.smogAlpha[app.main.environment.smogTarget] += .8;
						}
						}
						app.main.environment.smogTarget = -1;
					}
					ctx.drawImage(this.explosion4,-10,-17);
				} else if(this.counter < 6){
					ctx.drawImage(this.explosion5,-10,-17);
				} else if(this.counter < 7){
					ctx.drawImage(this.explosion6,-10,-17);
				} else {
					this.lifetime = 301;
				}
				ctx.restore();
			} else if(this.type == 2){
				ctx.save();
				if(this.dirLeft == true){
					ctx.translate(this.position.x - 5, this.position.y + 10);
				} else {
					ctx.translate(this.position.x + 125, this.position.y + 10);
				}
				ctx.scale(2.5, 2.5);
				if(this.counter < 2){
					ctx.drawImage(this.bigExplosion1,-10,-37);
				} else if(this.counter < 3){
					ctx.drawImage(this.bigExplosion2,-10,-37);
				} else if(this.counter < 4){
					ctx.drawImage(this.bigExplosion3,-10,-37);
				} else if(this.counter < 5){
					if(attackHitTestSmog(this.attackPosition,this.size) != true){
						if(this.dirLeft == true){
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 55,this.attackPosition.y - 90));
						} else {
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 77.5,this.attackPosition.y - 90));
						}
						app.main.environment.smogSize.push(new Victor(225,225));
						app.main.environment.smogAlpha.push(1.1);
						app.main.environment.smogTimer.push(0);
						app.main.environment.smogAngle.push(this.getAngle);
						app.main.environment.smogCount += 1;
					} else {
						if(app.main.environment.smogSize[app.main.environment.smogTarget].x < 700){
							app.main.environment.smogSize[app.main.environment.smogTarget].x += 100;
							app.main.environment.smogSize[app.main.environment.smogTarget].y += 100;
							app.main.environment.smogPos[app.main.environment.smogTarget].x -= 50;
							app.main.environment.smogPos[app.main.environment.smogTarget].y -= 50;
						}
						if(app.main.environment.smogAlpha[app.main.environment.smogTarget] < 1.3){
						if(app.main.environment.smogAlpha[app.main.environment.smogTarget] < .25){
							if(this.dirLeft == true){
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 55,this.attackPosition.y - 90));
						} else {
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 77.5,this.attackPosition.y - 90));
						}
							app.main.environment.smogSize.push(new Victor(225,225));
							app.main.environment.smogAlpha.push(1.1);
							app.main.environment.smogTimer.push(0);
							app.main.environment.smogAngle.push(this.getAngle);
							app.main.environment.smogCount += 1;
						} else {
							app.main.environment.smogAlpha[app.main.environment.smogTarget] += .8;
						}
						}
						app.main.environment.smogTarget = -1;
					}
					ctx.drawImage(this.bigExplosion4,-10,-37);
				} else if(this.counter < 6){
					ctx.drawImage(this.bigExplosion5,-10,-37);
				} else if(this.counter < 7){
					ctx.drawImage(this.bigExplosion6,-10,-37);
				} else {
					this.lifetime = 301;
				}
				ctx.restore();
			} else if(this.type == 3){
				ctx.save();
				if(this.dirLeft == true){
					ctx.translate(this.position.x - 5, this.position.y + 10);
				} else {
					ctx.translate(this.position.x + 125, this.position.y + 10);
				}
				ctx.scale(4, 4);
				if(this.counter < 2){
					ctx.drawImage(this.circleExplosion2,-10,-17);
				} else if(this.counter < 3){
					ctx.drawImage(this.circleExplosion3,-10,-17);
				} else if(this.counter < 4){
					if(attackHitTestSmog(this.attackPosition,this.size) != true){
						if(this.dirLeft == true){
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x + 45,this.attackPosition.y - 40));
						} else {
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x + 45,this.attackPosition.y - 40));
						}
						app.main.environment.smogSize.push(new Victor(250,250));
						app.main.environment.smogAlpha.push(1.1);
						app.main.environment.smogTimer.push(0);
						app.main.environment.smogAngle.push(this.getAngle);
						app.main.environment.smogCount += 1;
					} else {
						if(app.main.environment.smogSize[app.main.environment.smogTarget].x < 700){
							app.main.environment.smogSize[app.main.environment.smogTarget].x += 100;
							app.main.environment.smogSize[app.main.environment.smogTarget].y += 100;
							app.main.environment.smogPos[app.main.environment.smogTarget].x -= 50;
							app.main.environment.smogPos[app.main.environment.smogTarget].y -= 50;
						}
						if(app.main.environment.smogAlpha[app.main.environment.smogTarget] < 1.3){
						if(app.main.environment.smogAlpha[app.main.environment.smogTarget] < .25){
							if(this.dirLeft == true){
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x + 45,this.attackPosition.y - 40));
						} else {
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x + 45,this.attackPosition.y - 40));
						}
							app.main.environment.smogSize.push(new Victor(250,250));
							app.main.environment.smogAlpha.push(1.1);
							app.main.environment.smogTimer.push(0);
							app.main.environment.smogAngle.push(this.getAngle);
							app.main.environment.smogCount += 1;
						} else {
							app.main.environment.smogAlpha[app.main.environment.smogTarget] += .8;
						}
						}
						app.main.environment.smogTarget = -1;
					}
					ctx.drawImage(this.circleExplosion4,-10,-17);
				} else if(this.counter < 5){
					ctx.drawImage(this.circleExplosion5,-10,-17);
				} else if(this.counter < 6){
					ctx.drawImage(this.circleExplosion6,-10,-17);
				} else {
					this.lifetime = 301;
				}
				ctx.restore();
			} else if(this.type == 5){
				ctx.save();
				ctx.translate(this.position.x - 5, this.position.y + 10);
				ctx.scale(4, 4);
				if(this.counter < 2){
					ctx.drawImage(this.explosion1,-10,-17);
				} else if(this.counter < 3){
					ctx.drawImage(this.explosion2,-10,-17);
				} else if(this.counter < 4){
					ctx.drawImage(this.explosion3,-10,-17);
				} else if(this.counter < 5){
					if(attackHitTestSmog(this.attackPosition,this.size) != true){
						if(this.dirLeft == true){
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 5,this.attackPosition.y - 75));
						} else {
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 55,this.attackPosition.y - 75));
						}
						app.main.environment.smogSize.push(new Victor(150,150));
						app.main.environment.smogAlpha.push(.8);
						app.main.environment.smogTimer.push(0);
						app.main.environment.smogAngle.push(this.getAngle);
						app.main.environment.smogCount += 1;
					} else {
						if(app.main.environment.smogSize[app.main.environment.smogTarget].x < 700){
							app.main.environment.smogSize[app.main.environment.smogTarget].x += 20;
							app.main.environment.smogSize[app.main.environment.smogTarget].y += 20;
							app.main.environment.smogPos[app.main.environment.smogTarget].x -= 10;
							app.main.environment.smogPos[app.main.environment.smogTarget].y -= 10;
						}
						if(app.main.environment.smogAlpha[app.main.environment.smogTarget] < 1.3){
						if(app.main.environment.smogAlpha[app.main.environment.smogTarget] < .25){
							if(this.dirLeft == true){
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 5,this.attackPosition.y - 75));
						} else {
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 55,this.attackPosition.y - 75));
						}
							app.main.environment.smogSize.push(new Victor(150,150));
							app.main.environment.smogAlpha.push(.8);
							app.main.environment.smogTimer.push(0);
							app.main.environment.smogAngle.push(this.getAngle);
							app.main.environment.smogCount += 1;
						} else {
							app.main.environment.smogAlpha[app.main.environment.smogTarget] += .3;
						}
						}
						app.main.environment.smogTarget = -1;
					}
					ctx.drawImage(this.explosion4,-10,-17);
				} else if(this.counter < 6){
					ctx.drawImage(this.explosion5,-10,-17);
				} else if(this.counter < 7){
					ctx.drawImage(this.explosion6,-10,-17);
				} else {
					this.lifetime = 301;
				}
				ctx.restore();
			} else if(this.type == 7){
				ctx.save();
				if(this.dirLeft == true){ 
					if(this.groundTrigger == false && this.turnTrigger == false){
						ctx.translate(this.position.x - 5, this.position.y + 10);
					} else {
						ctx.translate(this.position.x + 135, this.position.y + 10);
					}
				} else {
					if(this.groundTrigger == false && this.turnTrigger == false){
						ctx.translate(this.position.x + 140, this.position.y + 10);
					} else {
						ctx.translate(this.position.x + 125, this.position.y + 10);
					}
				}
				ctx.scale(6, 6);
				if(this.counter < 2){
					ctx.drawImage(this.explosion1,-10,-17);
				} else if(this.counter < 3){
					ctx.drawImage(this.explosion2,-10,-17);
				} else if(this.counter < 4){
					ctx.drawImage(this.explosion3,-10,-17);
				} else if(this.counter < 5){
					if(attackHitTestSmog(this.attackPosition,this.size) != true){
						if(this.dirLeft == true){
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 77.5,this.attackPosition.y - 75));
						} else {
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 77.5,this.attackPosition.y - 75));
						}
						app.main.environment.smogSize.push(new Victor(225,225));
						app.main.environment.smogAlpha.push(1.1);
						app.main.environment.smogTimer.push(0);
						app.main.environment.smogAngle.push(this.getAngle);
						app.main.environment.smogCount += 1;
					} else {
						if(app.main.environment.smogSize[app.main.environment.smogTarget].x < 700){
							app.main.environment.smogSize[app.main.environment.smogTarget].x += 100;
							app.main.environment.smogSize[app.main.environment.smogTarget].y += 100;
							app.main.environment.smogPos[app.main.environment.smogTarget].x -= 50;
							app.main.environment.smogPos[app.main.environment.smogTarget].y -= 50;
						}
						if(app.main.environment.smogAlpha[app.main.environment.smogTarget] < 1.3){
						if(app.main.environment.smogAlpha[app.main.environment.smogTarget] < .25){
							if(this.dirLeft == true){
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 77.5,this.attackPosition.y - 75));
						} else {
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 77.5,this.attackPosition.y - 75));
						}
							app.main.environment.smogSize.push(new Victor(225,225));
							app.main.environment.smogAlpha.push(1.1);
							app.main.environment.smogTimer.push(0);
							app.main.environment.smogAngle.push(this.getAngle);
							app.main.environment.smogCount += 1;
						} else {
							app.main.environment.smogAlpha[app.main.environment.smogTarget] += .8;
						}
						}
						app.main.environment.smogTarget = -1;
					}
					ctx.drawImage(this.explosion4,-10,-17);
				} else if(this.counter < 6){
					ctx.drawImage(this.explosion5,-10,-17);
				} else if(this.counter < 7){
					ctx.drawImage(this.explosion6,-10,-17);
				} else {
					this.lifetime = 301;
					this.groundTrigger = false;
				}
				ctx.restore();
			}
		}
		
	}
	
	
	
	return Energy; 
})(); //end IIFE