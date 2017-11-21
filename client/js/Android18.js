
"use strict";

var app = app || {};


app.Android18 = (function(){
	
	function Android18(start,opponent){
		
		//Core Stats
		this.health = 100;
		this.endurance = 100;
		this.energy = 100;
		this.stamina = 28;
		
		//STATE VARIABLES detected
		
		this.right = true;
		this.left = false;
		this.movingLeft = false;
		this.movingRight = false;
		this.reverse = true;
		this.changeDir = false;
		this.behind = false;
		this.air = false;
		this.ground = false;
		this.decend = false;
		this.flying = false;
		this.fight = false;
		this.intensify = false;
		this.attacking = false;
		this.taunting = false;
		this.basic = false;
		this.hard = false;
		this.hover = false;
		this.blocking = false;
		this.blasting = false;
		this.powerMove = false;
		this.blastRelease = false;
		this.exhausted = false;
		this.blastBurn = false;
		this.hit = false;
		this.hardHit = false;
		this.punching = false;
		this.punched = false;
		this.fallingKick = false;
		this.arms = false;
		this.kicks = false;
		this.kicking = false;
		this.slow = false;
		this.fast = false;
		this.up = false;
		this.down = false;
		this.landed = false;
		this.superSpeed = false;
		this.vanish = false;
		this.aboveBuilding = false;
		this.byBuilding = false;
		this.aboveSky = false;
		this.attackPrep = false;
		this.missed = false;
		this.stun = true;
		this.end = false;
		this.dead = false;
		
		this.punchMove = false;
		this.kickMove = false;
		this.longMove = false;
		this.shortMove = false;
		
		this.teleUp = true;
		this.teleDown = true;
		this.teleRight = false;
		this.teleLeft = false;
		
		this.voiceStop = false;
		this.voiceChance = 0;
		
		this.fieldOn = false;
		this.fieldTimer = 0;
		
		this.lookUp = false;
		this.lookDown = false;
		
		this.cinematic = false;
		this.cine = 0;
		
		this.exhaustTalk = false;
		this.deathTalk = false;
		
		this.alertStart = false;
		
		//Extras
		this.flyDust = false;
		this.landDust = false;
		this.fallDust = false;
		this.prevX = null;

		//Timers
		this.counter = 0;
		this.stunCounter = 0;
		this.speedCounter = 0;
		this.hoverCounter = 0;
		this.hoverTimer = 0;
		this.exhaustedCounter = 0;
		this.blastBurnCounter = 0;
		this.randomEffect = 0;
		this.tauntPick = 0;
		this.flySoundDelay = 0;
		this.smoothTimer = 0;
		
		//Value holders
		this.blastBurnLength = 20;
		
		// CONSTANTS
		this.BUILDING = new Victor(650,270);
		this.GROUND = new Victor(0,620);
		this.SKY = new Victor(0,220);
		this.SKYTOP = new Victor(0,10);
		this.LEFTWALL = new Victor(0,0);
		this.RIGHTWALL = new Victor(950,0);
		this.MAX_STAMINA = 100;
		
		//VECTORS (Victors)
		this.size = new Victor(50, 100);
		this.attackSize = new Victor(30, 60);
		this.position = new Victor(start, this.GROUND.y);
		//this.position = new Victor(start, 400);
		this.attackPosition = new Victor(0, 0);
		this.hardAttackPosition = new Victor(0, 0);
		this.velocity = new Victor(0, 0);
		this.direction = new Victor(1, 0);
		this.accel = new Victor(2.3, 0);
		this.decel = new Victor(0, 0);
		this.jumpVelocity = new Victor(0,-15);
		this.jumpAccel = new Victor(0,-1);
		this.gravity = new Victor(0,1.7);
		
		// IMAGE SETUP 
		var image = new Image();
		image.src =  app.images18.stance;
		this.stance = image;
		
		image = new Image();
		image.src =  app.images18.stanceUp;
		this.stanceUp = image;
		
		image = new Image();
		image.src =  app.images18.stanceDown;
		this.stanceDown = image;
		
		image = new Image();
		image.src =  app.images18.slowFly;
		this.slowFly = image;
		
		image = new Image();
		image.src =  app.images18.fastFly;
		this.fastFly = image;
		
		image = new Image();
		image.src =  app.images18.flyUp;
		this.flyUp = image;
		
		image = new Image();
		image.src =  app.images18.flyUpUp;
		this.flyUpUp = image;
		
		image = new Image();
		image.src =  app.images18.flyUpDown;
		this.flyUpDown = image;
		
		image = new Image();
		image.src =  app.images18.flyDownSlow;
		this.flyDownSlow = image;
		
		image = new Image();
		image.src =  app.images18.flyDownFast;
		this.flyDownFast = image;
		
		image = new Image();
		image.src =  app.images18.reverse;
		this.moveReverse = image;
		
		image = new Image();
		image.src =  app.images18.leftPunch;
		this.leftPunch = image;
		
		image = new Image();
		image.src =  app.images18.rightPunch;
		this.rightPunch = image;
		
		image = new Image();
		image.src =  app.images18.punchPrep;
		this.punchPrep = image;
		
		image = new Image();
		image.src =  app.images18.punchPrepAir;
		this.punchPrepAir = image;
		
		image = new Image();
		image.src =  app.images18.rightPunchAir;
		this.rightPunchAir = image;
		
		image = new Image();
		image.src =  app.images18.leftPunchAir;
		this.leftPunchAir = image;
		
		image = new Image();
		image.src =  app.images18.hit1;
		this.hit1 = image;
		
		image = new Image();
		image.src =  app.images18.hit2;
		this.hit2 = image;
		
		image = new Image();
		image.src =  app.images18.attackE;
		this.attackE = image;
		
		image = new Image(); //both
		image.src =  app.attack.tele;
		this.teleport = image;
		
		image = new Image();
		image.src =  app.images18.blastPrep;
		this.blastPrep = image;
		
		image = new Image();
		image.src =  app.images18.hardKick;
		this.hardKick = image;
		
		image = new Image();
		image.src =  app.images18.ground;
		this.ground18 = image;
		
		image = new Image();
		image.src =  app.images18.fallSide;
		this.fallSide = image;
		
		image = new Image();
		image.src =  app.images18.hardKickPrep;
		this.hardKickPrep = image;
		
		image = new Image();
		image.src =  app.images18.hardKickSwing;
		this.hardKickSwing = image;
		
		image = new Image();
		image.src =  app.images18.hardPunch;
		this.hardPunch = image;
		
		image = new Image();
		image.src =  app.images18.hardPunchAir;
		this.hardPunchAir = image;
		
		image = new Image();
		image.src =  app.images18.hardPunchAirPrep;
		this.hardPunchAirPrep = image;
		
		image = new Image();
		image.src =  app.images18.hardPunchAirSwing;
		this.hardPunchAirSwing = image;
		
		image = new Image();
		image.src =  app.images18.hardPunchPrep;
		this.hardPunchPrep = image;
		
		image = new Image();
		image.src =  app.images18.hitHard;
		this.hitHard = image;
		
		image = new Image();
		image.src =  app.images18.injured;
		this.injured = image;
		
		image = new Image();
		image.src =  app.images18.kick;
		this.kick = image;
		
		image = new Image();
		image.src =  app.images18.kickPrep;
		this.kickPrep = image;
		
		image = new Image();
		image.src =  app.images18.leftBlast;
		this.leftBlast = image;
		
		image = new Image();
		image.src =  app.images18.rightBlast;
		this.rightBlast = image;
		
		image = new Image();
		image.src =  app.images18.block;
		this.block = image;
		
		image = new Image();
		image.src =  app.images18.fallKick;
		this.fallKick = image;
		
		image = new Image();
		image.src =  app.images18.fallDown;
		this.fallDown = image;
		
		image = new Image();
		image.src =  app.images18.taunt;
		this.taunt = image;
		
		image = new Image();
		image.src =  app.images18.launchPrep;
		this.launchPrep = image;
		
		image = new Image();
		image.src =  app.images18.launchSwing;
		this.launchSwing = image;
		
		image = new Image();
		image.src =  app.images18.launch;
		this.launch = image;
		
		image = new Image();
		image.src =  app.images18.finger;
		this.finger = image;
		
		image = new Image();
		image.src =  app.images18.blastSky;
		this.blastSky = image;
		
		image = new Image();
		image.src =  app.images18.energyDown;
		this.energyDown = image;
		
		image = new Image();
		image.src =  app.images18.special1;
		this.special1 = image;
		
		image = new Image();
		image.src =  app.images18.special2;
		this.special2 = image;
		
		image = new Image();
		image.src =  app.images18.mad1;
		this.mad1 = image;
		
		image = new Image();
		image.src =  app.images18.field1;
		this.useField1 = image;
		
		image = new Image();
		image.src =  app.images18.field2;
		this.useField2 = image;
		
		image = new Image();
		image.src =  app.images18.combat1;
		this.combat1 = image;
		
		image = new Image();
		image.src =  app.attack.blastCharge1;
		this.blastCharge1 = image;
		
		image = new Image();
		image.src =  app.attack.field1;
		this.field1 = image;
		
		image = new Image();
		image.src =  app.attack.field2;
		this.field2 = image;
		
		image = new Image();
		image.src =  app.attack.field3;
		this.field3 = image;
		
		image = new Image();
		image.src =  app.attack.field4;
		this.field4 = image;
		
		image = new Image();
		image.src =  app.attack.field5;
		this.field5 = image;
		
		image = new Image();
		image.src =  app.attack.field6;
		this.field6 = image;
		
		image = new Image();
		image.src =  app.attack.field7;
		this.field7 = image;
		
		image = new Image();
		image.src =  app.attack.field8;
		this.field8 = image;
		
		image = new Image();
		image.src =  app.attack.fieldMain;
		this.fieldMain = image;

		
		
	}
	
	//FUNCTION TO UPDATE MANY VALUES
	Android18.prototype.update = function(){
		
		this.flySoundDelay++;
		
		//Look around
		if(this.position.y < app.main.vegeta.position.y - 150){
			this.lookDown = true;
		} else if(this.position.y > app.main.vegeta.position.y + 150){
			this.lookUp = true;
		} else {
			this.lookUp = false;
			this.lookDown = false;
		}
		
		if(this.movingLeft == true && this.landed == false){
			if(this.velocity.x < 0 && this.velocity.x > -20){
				this.slow = true;
				this.fast = false;
			} else if(this.velocity.x < -20){
				this.fast = true;
				this.slow = false;
			} else if(this.velocity.x >= 0){
				this.fast = false;
				this.slow = false;
			}
		}
		if(this.movingRight == true && this.landed == false){
			if(this.velocity.x > 0 && this.velocity.x < 20){
				this.slow = true;
				this.fast = false;
			} else if(this.velocity.x > 20){
				this.fast = true;
				this.slow = false;
			} else if(this.velocity.x <= 0){
				this.fast = false;
				this.slow = false;
			}
		}
		
		//WALL POSITIONING
		if(this.position.x < this.LEFTWALL.x + 10 && (hardAttackHitTest(app.main.android18, app.main.vegeta) == false)){
			this.right = true;
			this.left = false;
		} else if(this.position.x > this.RIGHTWALL.x - 10 && (hardAttackHitTest(app.main.android18, app.main.vegeta) == false)){
			this.right = false;
			this.left = true;
		}
	
		//CREATE BOUNDRIES
		if(this.position.y > this.GROUND.y){
			this.prevX = this.position.x;
			this.position.copyY(this.GROUND);
			//this.jumpVelocity = new Victor(0,-15);
			this.velocity.divideScalar(3);
			this.ground = true;
			this.air = false;
			this.decend = false;
			if(this.end == true || (this.jumpVelocity.y > 20 && this.hardHit == true)){
				this.fallDust = true;
				app.main.environment.shake = true;
				if(this.dead == false){
					app.main.sound.playSpecialReaction(2);
				}
			} else if((app.main.scene == false || app.main.gameState == app.main.GAME_STATE.TUTORIAL || app.main.sceneNum == 1)){
				this.landDust = true;
				if((this.velocity.x < 5 && this.velocity.x > -5) || (myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT] != true && myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT] != true)){
					this.landed = true;
				    app.main.sound.playSpecialReaction(3);
			    } else {
					app.main.sound.playSpecialReaction(74);
				}
			}
		}
		if(this.position.y > this.BUILDING.y && this.aboveBuilding == true && this.down == false){
			this.position.copyY(this.BUILDING);
			//this.jumpVelocity = new Victor(0,-15);
			//console.log("building");
			this.velocity.divideScalar(3);
			this.ground = true;
			this.air = false;
			this.decend = false;
			if(this.position.y == this.BUILDING.y){
			if(this.end == true || (this.jumpVelocity.y > 20 && this.hardHit == true)){
				app.main.environment.shake = true;
				if(this.dead == false){
					this.landed = true;
					app.main.sound.playSpecialReaction(2);
				}
			} else if((app.main.scene == false || app.main.gameState == app.main.GAME_STATE.TUTORIAL || app.main.sceneNum == 1)){
				if((this.velocity.x < 5 && this.velocity.x > -5) || (myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT] != true && myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT] != true)){
					this.landed = true;
				    app.main.sound.playSpecialReaction(3);
			    } else {
					app.main.sound.playSpecialReaction(74);
				}
			}
			}
		} 
		if(this.position.y < this.SKY.y){
			this.aboveSky = true;
		} else {
			this.aboveSky = false;
		}
		if(this.position.y < this.SKYTOP.y){
			this.position.copyY(this.SKYTOP);
			if(this.stun == false){
				this.jumpVelocity = new Victor(0,0);
			}
		}		
		if(this.position.x < this.LEFTWALL.x){
			this.position.copyX(this.LEFTWALL);
			this.decel = new Victor(0,0);
			this.velocity = new Victor(0,0);
		} 
		if(this.position.x > this.RIGHTWALL.x){
			this.position.copyX(this.RIGHTWALL);
			this.decel = new Victor(0,0);
			this.velocity = new Victor(0,0);
		}
		
		if(app.main.activeSupport == true){
			for(var x = 0; x < 2; x++){
				if(hitTest(app.main.android18,app.main.support[x]) == true && app.main.support[x].vanish == false){
					this.decel.zero();
				}
			}
		}
		
		if(this.dead == true){
			this.hit == false;
			this.hardHit == false;
		}
		
		if(this.landed == true){
		  this.slow = false;
		  this.fast = false;
          if (myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT] == true || myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT] == true){
			  console.log("LANDFALSE");
			  this.landed = false;
		  }
		}
		
		//hover smooth
		if(this.hover == true){
			this.smoothTimer++;
			if(this.smoothTimer < 4){
				this.position.y -= 1.5;
			} else if(this.smoothTimer < 8){
				this.position.y += 1.5;
			} else {
				this.smoothTimer = 0;
			}
		} else {
			this.smoothTimer = 0;
		}
		
		
		if(this.exhausted == true && this.alertStart == false){
			app.main.sound.playEffectLoud(53);
			this.alertStart = true;
		} else if(this.alertStart == true && this.exhausted == false){
			this.alertStart = false;
		}
		
		
		//Checks for behind
		if(this.left == true && app.main.vegeta.left == true && this.position.x > app.main.vegeta.position.x){
			this.behind = true;
		} else if(this.left == false && app.main.vegeta.left == false && this.position.x < app.main.vegeta.position.x){
			this.behind = true;
		} else {
			this.behind = false;
		}
		
		//HOVER
		if(app.main.scene == false || app.main.gameState == app.main.GAME_STATE.TUTORIAL){
		if(this.air == true && this.down == false && this.position.y > this.SKYTOP.y && this.up == false && this.hit == false && this.hardHit == false && this.end == false && app.main.vegeta.end == false && ((hardAttackHitTest(app.main.android18,app.main.vegeta) && this.hardHit == false) || this.blasting == true || this.powerMove == true || this.taunting == true || (this.superSpeed == true && hardAttackHitTest(app.main.android18,app.main.vegeta)) || this.blocking == true || this.attacking == true)){ //Hover
			this.hover = true;
			this.hoverTimer = 10;
		} else {
			this.hover = false;
		}
		}
		
		if(this.down == true){
			this.hover = false;
			this.flying = false;
			//this.hoverTimer = 0;
		}
		
		/* if(this.air == true && this.position.y + 20 > this.GROUND.y){
			this.kickMove = false;
			this.punchMove = false;
			this.shortMove = false;
			this.missed = false;
			this.hard = false;
			this.fight = false;
			this.attacking = false;
			this.counter = 0;
			this.intensify = false;
		} */
		
		if(this.hoverTimer > 6 && this.up == true && this.down == false){
			this.jumpVelocity.y = -6;
			this.up = false;
			this.hover = false;
		} else if(this.hoverTimer > 6 && this.down == true && this.up == false){
			this.jumpVelocity.y = 0;
			this.down = false;
			this.hover = false;
			this.hoverTimer = 0;
		}
		
		
		if((this.hover == true || this.hoverTimer > 0) && this.up == false && this.down == false){
			this.hoverCounter++;
			this.hoverTimer--;
			if((hardAttackHitTest(app.main.android18,app.main.vegeta)) && this.down == false){
				if(this.hoverCounter < 5){
					this.flying = false;
				} else {
					if(app.main.vegeta.position.y > this.position.y){
						this.hoverCounter = 5;
					} else {
						this.flying = true;
						this.decend = false;
					}
				}
			} else {
				if(this.hoverCounter < 6){
					this.flying = false;
				} else {
					this.flying = true;
					this.decend = false;
					this.hoverCounter = 0;
				}
			}
		}
		
		//console.log("BEHIND HIM HIM HIM HIM HIM HIM HIM HIM: " + this.behind);
		
		if(this.position.y < this.BUILDING.y && this.position.x > this.BUILDING.x && this.down == false){
			this.aboveBuilding = true;
		}
		if((this.position.x < this.BUILDING.x && this.position.y < this.GROUND.y) || (this.position.y > this.BUILDING.y && this.position.y < this.GROUND.y)) {
			this.air = true;
			this.aboveBuilding = false;
		}
		
		if(app.main.vegeta.air == true && this.vanish == true){ //bug fix
			this.flying = true;
			this.air = true;
			this.jumpVelocity.y = 0;
		}
		
		if(this.exhausted == true && this.fieldOn == false){ // END BLOCKING
			this.blocking = false;
		}
		
		
		//Field ON
		if(this.fieldOn == true){
			
		
		this.energy -= .45;
		
		this.velocity.x = 0;
		this.decel.x = 0;
			
		if(this.position.y < app.main.vegeta.position.y + 150 && this.position.y > app.main.vegeta.position.y - 150){
		if(this.position.x < app.main.vegeta.position.x + 150 && this.position.x > app.main.vegeta.position.x - 150){
			if(app.main.vegeta.left == true){
				if(this.behind == true && this.position.x > app.main.vegeta.position.x){
					app.main.vegeta.velocity.x = -30;
				} else {
					app.main.vegeta.velocity.x = 30;
				}
				if(app.main.android17.active == true){
					app.main.vegeta.focus17 = true;
				} else {
					app.main.aiChoice1 = 0;
					app.main.vegeta.defensive = true;
					app.main.vegeta.aggressive = false;
					app.main.aiReason = 3;
				}
			} else {
				if(this.behind == true && this.position.x < app.main.vegeta.position.x){
					app.main.vegeta.velocity.x = 30;
				} else {
					app.main.vegeta.velocity.x = -30;
				}
				if(app.main.android17.active == true){
					app.main.vegeta.focus17 = true;
				} else {
					app.main.aiChoice1 = 0;
					app.main.vegeta.defensive = true;
					app.main.vegeta.aggressive = false;
					app.main.aiReason = 3;
				}
			}
		}
		}
		}
		
		//GROUND CHECK
		if(this.ground == true) {
			if(this.stun == false && this.hardhit == false){
				this.jumpVelocity = new Victor(0,0);
			}
			if(this.up == true){
				this.prevX = this.position.x;
				if(this.aboveBuilding == false){
					this.flyDust = true;
				}
				this.jumpVelocity = new Victor(0,-15);
			}
		}
		
		/* if(this.blasting == true){
			this.decel.x = 0;
		} */
		
		//PUSH 
		if(app.main.vegeta.vanish == false && app.main.vegeta.dead == false){
		if(hitTest(app.main.android18,app.main.vegeta) && this.behind == false){
			if(app.main.vegeta.left == true){
				this.position.x -= 10;
			} else {
				this.position.x += 10;
			}
		} else if(hitTest(app.main.android18,app.main.vegeta) && this.behind == true){
			if(app.main.vegeta.left == true){
				this.position.x += 10;
			} else {
				this.position.x -= 10;
			}
		}
		}
		
		if(app.main.activeSupport == true){
		//PUSH 
		for(var x = 0; x < 2; x++){
		if(app.main.support[x].vanish == false){
		if(hitTest(app.main.android18,app.main.support[x]) && this.behind == false){
			if(app.main.support[x].left == true){
				this.position.x -= 10;
			} else {
				this.position.x += 10;
			}
		} else if(hitTest(app.main.android18,app.main.support[x]) && this.behind == true){
			if(app.main.support[x].left == true){
				this.position.x += 10;
			} else {
				this.position.x -= 10;
			}
		}
		}
		}
		
		}
		/*
		if(this.vanish == false && this.attacking == true) { 
			this.superSpeed = false;
		}
		*/
		
		if((this.hardHit == true || this.hit == true) && this.blastBurn == true){
			this.blastBurnCounter = 0;
		}
		
		
		//Injured talk
			if(this.exhausted == true && this.exhaustTalk == false){
				this.exhaustTalk = true;
				app.main.sound.playTaunt2(Math.round(getRandom(41,42)));
			} else if(this.exhausted == false){
				this.exhaustTalk = false;
			}
			
			
		//Death Talk
			if(this.end == true && this.deathTalk == false && app.main.scene == false){
				this.deathTalk = true;
				if(this.position.y < 350){
					app.main.sound.playTaunt1(45);
				} else {
					app.main.sound.playTaunt1(46);
				}
			}
		
		//Endurance recovery
		if(this.blastBurn == true){ //Blast burn
			this.blastBurnCounter++;
			if(this.blastBurnCounter > this.blastBurnLength){
				this.blastBurn = false;
				this.blastBurnCounter = 0;
			}
		} else {
			if(this.endurance < 100 && (this.stun == false || app.main.scene == true) && this.end == false){
				this.endurance += .25;
			}
		}
		//Energy recovery
		if(this.energy < 100 && (this.stun == false || app.main.scene == true) && this.end == false){
			this.energy += .18;
		}
		//Stamina recovery
		if(this.stamina > 28 && ((this.stun == false && this.end == false && this.blocking == false) || app.main.scene == true || this.fieldOn == true) || this.exhausted == true){
			this.stamina -= .3;
		}
		
		if((this.velocity.x > 1 || this.velocity.x < -1) && this.attacking == true && this.intensify == true && this.blasting == false){
			//console.log("STAGE 1");
			if(this.punchMove == true){
				//console.log("STAGE 2A");
				if(this.longMove == true && hardAttackHitTest(app.main.android18,app.main.vegeta) && this.attackPrep == false){
					console.log("STAGE 3");
					this.punching = true;
					this.punchMove = false;
					this.longMove = false;
					app.main.detected = true;
					app.main.detectedHard = true;
				} else if(this.shortMove == true && attackHitTest(app.main.android18,app.main.vegeta) && this.attackPrep == false){
					console.log("STAGE 3");
					this.punching = true;
					this.punchMove = false;
					this.shortMove = false;
					app.main.detected = true;
					app.main.detectedHard = true;
				}
			}
			if(this.kickMove == true){
				//console.log("STAGE 2B");
				if(this.longMove == true && hardAttackHitTest(app.main.android18,app.main.vegeta) && this.attackPrep == false){
					console.log("STAGE 3");
					this.kicking = true;
					this.kickMove = false;
					this.longMove = false;
					app.main.detected = true;
					app.main.detectedHard = true;
				} else if(this.shortMove == true && attackHitTest(app.main.android18,app.main.vegeta) && this.attackPrep == false){
					console.log("STAGE 3");
					this.kicking = true;
					this.kickMove = false;
					this.shortMove = false;
					app.main.detected = true;
					app.main.detectedHard = true;
				}
			}
		}
		
		//blast close push
		if(hardAttackHitTest(app.main.android18, app.main.vegeta) == true && app.main.vegeta.blasting == true && this.behind == false) {
			if(app.main.vegeta.left == true){
				this.velocity.x -= 2;
			} else {
			    this.velocity.x -= 2;
			}
		}
		
		if(app.main.scene == true && app.main.gameState != app.main.GAME_STATE.TUTORIAL){
			this.stun = true;
		}

		if(this.basic == true && attackHitTest(app.main.android18, app.main.vegeta) != true){
			app.main.sound.playBasicReaction(Math.round(getRandom(61,63)));
			this.missed = true;
		}
		
		//console.log("MISSED " + this.missed);
		
		
		if(this.basic == true || this.punching == true || this.kicking == true){
			this.attackPrep = false;
		}
		
		//Flight control
		if(this.flying == true && (this.stun == false && this.end == false || this.hover == true) && this.down == false){
			if((this.position.y == this.GROUND.y || this.position.y == this.BUILDING.y) && this.stun == false && this.hover == false && (app.main.scene == false || app.main.gameState == app.main.GAME_STATE.TUTORIAL) && this.end == false && this.flySoundDelay > 10){
				if(myKeys.keydown[myKeys.KEYBOARD.KEY_UP] == true){
					app.main.sound.playSpecialReaction(4);
					this.flySoundDelay = 0;
				}
			}
			if(this.hover == true){
				this.jumpVelocity = new Victor(0,-4);
			} else if(this.jumpVelocity.y > 0 && this.down == false){
				this.jumpVelocity = new Victor(0,-8);
			}
			this.jumpVelocity.addY(this.jumpAccel);
			this.gravity.zero();
		} else if(this.decend == true || (this.hover == true && this.down == true)){
			if(this.powerMove == false){
				this.gravity = new Victor(0,4.5);
				this.velocity.multiplyScalar(1.3);
			} else {
				this.gravity = new Victor(0,1.7);
			}
		} else {
			this.gravity = new Victor(0,1.7);
		}
		if(this.air == true){
			this.ground = false;
			this.jumpVelocity.addY(this.gravity);
			this.position.addY(this.jumpVelocity);
		}
		
		
		

		if(this.hardHit == true && this.air == true){ 
			this.taunting = false;
			this.flying = false;
		} else if (this.hardHit == true && this.air == false && this.hit == false){
			this.stun = false;
			this.hardHit = false;
		}
		
		if(this.hit == true || this.hardHit == true){
			this.taunting = false;
			this.blasting = false;
			this.powerMove = false;
		}
		
		if(this.taunting == false){
			this.tauntPick = getRandom(17, 23);
		}
		
		if(this.position.y == this.BUILDING.y && (this.movingLeft == true || this.movingRight == true || this.stun == true)){
			this.jumpVelocity = new Victor(0,0);
		} else if(this.position.y == this.BUILDING.y && (this.movingLeft == false || this.movingRight == false || this.stun == false)){
			this.jumpVelocity = new Victor(0,-15);
		}
		
		this.decelerate(); //Decel
		
		if(this.velocity.x < .1 && this.velocity.x > -.1 && this.hit == false){
			this.velocity.zero();
		}
		
		if(this.basic == false && this.punching == false && this.kicking == false){
			app.main.damageTimer = 0;
		}
		
		//Mute Voice
		if(this.hit == true && this.voiceStop == false && this.deathTalk == false && this.exhaustTalk == false){
			app.main.sound.pauseVoice1();
			this.voiceStop = true;
		} else if(this.hit == false){
			this.voiceStop = false;
		}
		
		//Varible resets
		if(this.attacking == false && this.fight == false && this.taunting == false){
			app.main.detected = false;
			app.main.detectedHard = false;
			this.counter = 0;
			this.fieldOn = false;
			this.basic = false;
			this.punching = false;
			this.kicking = false;
			this.punchMove = false;
			this.kickMove = false;
			this.longMove = false;
			this.shortMove = false;
			this.blastRelease = false;
		}
		if(this.stun == false && this.end == false && this.dead == false){
			this.stunCounter = 0;
		} else if(this.stunCounter > 30 && this.end == false && this.dead == false){ //Stun stuck fix
			this.stun == false
		}
		
		if(this.position.x > 690){
			this.byBuilding = true;
		} else {
			this.byBuilding = false;
		}
		
		//SPECIAL CASES
		if(app.main.gameState == app.main.GAME_STATE.TUTORIAL){
			this.BUILDING = new Victor(0,135);
		} else {
			if(app.main.environment.buildingActive == true){
				this.BUILDING = new Victor(650,250);
			} else {
				this.BUILDING = new Victor(650,-1250);
			}
		}
		
	};
	
	//Starts a jump/flight
	Android18.prototype.jump = function(){
		this.air = true;
	};
	
	//BEGIN SUPER SPEED
	Android18.prototype.speed = function(){
		this.energy -= 8;
		app.main.teleports += 1;
		if(this.left == true && app.main.vegeta.position.x < this.LEFTWALL.x + 50){
			if(app.main.vegeta.aboveBuilding == false){
				this.aboveBuilding = false;
			}
			if(app.main.vegeta.vegeta == true){
				this.position.x = app.main.vegeta.position.x + 50;
			} else if(app.main.vegeta.piccolo == true){
				if(app.main.vegeta.left == true){
					this.position.x = app.main.vegeta.position.x + 75;
				} else {
					this.position.x = app.main.vegeta.position.x + 60;
				}
			} else {
				this.position.x = app.main.vegeta.position.x + 50;
			}
			this.position.y = app.main.vegeta.position.y;
		} else if(this.right == true && app.main.vegeta.position.x > this.RIGHTWALL.x - 50){
			if(app.main.vegeta.aboveBuilding == false){
				this.aboveBuilding = false;
			}
			if(app.main.vegeta.vegeta == true){
				this.position.x = app.main.vegeta.position.x - 50;
			} else if(app.main.vegeta.piccolo == true){
				if(app.main.vegeta.left == true){
					this.position.x = app.main.vegeta.position.x - 60;
				} else {
					this.position.x = app.main.vegeta.position.x - 75;
				}
			} else {
				this.position.x = app.main.vegeta.position.x - 50;
			}
			this.position.y = app.main.vegeta.position.y;
		} else if(myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT] == true && this.reverse == true){
				this.position.x = this.RIGHTWALL.x;
				this.jumpVelocity.y = -2;
		} else if(myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT] == true && this.reverse == true){
				this.position.x = this.LEFTWALL.x;
				this.jumpVelocity.y = -2;
		} else if(this.teleRight == true){
				this.position.x = this.RIGHTWALL.x;
				this.jumpVelocity.y = -2;
		} else if(this.teleLeft == true){
				this.position.x = this.LEFTWALL.x;
				this.jumpVelocity.y = -2;
		} else if(this.teleUp == true){
				this.jumpVelocity.y = -2;
				this.position.y = this.SKYTOP.y;
		} else if(this.teleDown == true){
				this.aboveBuilding = false;
				this.flying = true;
				this.position.y = this.GROUND.y;
		} else if(this.left == true && (this.up == false || this.position.y < this.SKYTOP.y + 20) && (this.down == false || this.position.y > this.GROUND.y - 20)){
			if(app.main.vegeta.aboveBuilding == false){
				this.aboveBuilding = false;
			}
			if(app.main.vegeta.vegeta == true){
				this.position.x = app.main.vegeta.position.x - 50;
			} else if(app.main.vegeta.piccolo == true){
				if(app.main.vegeta.left == true){
					this.position.x = app.main.vegeta.position.x - 60;
				} else {
					this.position.x = app.main.vegeta.position.x - 75;
				}
			} else {
				this.position.x = app.main.vegeta.position.x - 50;
			}
			this.position.y = app.main.vegeta.position.y;
		} else if(this.right == true && (this.up == false || this.position.y < this.SKYTOP.y + 20) && (this.down == false || this.position.y > this.GROUND.y - 20)){
			if(app.main.vegeta.aboveBuilding == false){
				this.aboveBuilding = false;
			}
			if(app.main.vegeta.vegeta == true){
				this.position.x = app.main.vegeta.position.x + 50;
			} else if(app.main.vegeta.piccolo == true){
				if(app.main.vegeta.left == true){
					this.position.x = app.main.vegeta.position.x + 75;
				} else {
					this.position.x = app.main.vegeta.position.x + 60;
				}
			} else {
				this.position.x = app.main.vegeta.position.x + 50;
			}
			this.position.y = app.main.vegeta.position.y;
		} else if(this.up == true){
			this.position.y = this.SKYTOP.y;
			this.jumpVelocity.y = -2;
		} else if(this.down == true){
			this.aboveBuilding = false;
			this.flying = true;
			this.position.y = this.GROUND.y;
		}
	};
	
	//MOVE TO THE RIGHT
	Android18.prototype.moveRight = function(){
		this.movingRight = true;
		this.movingLeft = false;
		this.velocity.addX(this.accel);
		this.velocity.limit(25, .80);
		this.decel = this.velocity.clone();
		this.position.addX(this.velocity);
	};
	
	//MOVE TO THE LEFT
	Android18.prototype.moveLeft = function(){
		this.movingLeft = true;
		this.movingRight = false;
		this.velocity.subtractX(this.accel);
		this.velocity.limit(25, .80);
		//console.log("VELOCITY" + this.velocity);
		this.decel = this.velocity.clone();
		this.position.addX(this.velocity);
	};
	
	//DECEL AFTER MOVING
	Android18.prototype.decelerate = function(){
		if(this.decel.x < 2 && this.decel.x > -2){
			this.decel.zero();
		}
		
		if(this.air == false && this.blasting == false){
			this.velocity = this.decel.clone();
			this.decel.multiplyScalar(.82);
			this.position.addX(this.decel);
		} else if(this.air == true && this.blasting == false) {
			this.velocity = this.decel.clone();
			this.decel.multiplyScalar(.94);
			this.position.addX(this.decel);
		} else {
			this.velocity = this.decel.clone();
			this.decel.multiplyScalar(.8);
			this.position.addX(this.decel);
		}
		
	};
	
	
	//FUNCTION TO DRAW 18 AND CHANGE MANY VARIABLES (MOST IMPORANT)
	Android18.prototype.draw = function(ctx){
		
		this.counter++;
		this.stunCounter++;
		
		
		
		ctx.save();
		
		//FLIPPING
		if(this.left == true){
			ctx.translate(this.position.x - 15, this.position.y + 10);
			this.attackPosition.x = this.position.x - 30;
			this.attackPosition.y = this.position.y + 20;
			this.hardAttackPosition.x = this.position.x - 60;
			this.hardAttackPosition.y = this.position.y + 20;
			ctx.scale(1, 1);
			if(this.movingRight = true && this.movingLeft == false){
				this.reverse = true;
			} else {
				this.reverse = false;
			}
		} else if(this.right == true){
			ctx.translate(this.position.x + 60, this.position.y + 10);
			this.attackPosition.x = this.position.x + 50;
			this.attackPosition.y = this.position.y + 20;
			this.hardAttackPosition.x = this.position.x + 80;
			this.hardAttackPosition.y = this.position.y + 20;
			ctx.scale(-1, 1);
			if(this.movingLeft = true && this.movingRight == false){
				this.reverse = true;
			} else {
				this.reverse = false;
			}
		}
		
		if(this.vanish == false){
		//NON MOVING DRAWS
		if(this.cinematic == true){
			if(this.cine == 0){
				ctx.drawImage(this.blastSky,0,-20);
			} else if(this.cine == 1){
				ctx.drawImage(this.energyDown,-10,0);
			} else if(this.cine == 2){
				ctx.drawImage(this.blastSky,0,-20);
			} else if(this.cine == 3){
				ctx.drawImage(this.block,0,10);
			} else if(this.cine == 4){
				ctx.drawImage(this.blastSky,0,-20);
				if((this.stunCounter % 2) == 0){
					ctx.drawImage(this.blastCharge1,32,-30,10,14);
				} else {
					ctx.drawImage(this.blastCharge1,29,-33,15,21);
				}
			} else if(this.cine == 5){
				ctx.drawImage(this.taunt,20,0);
			} else if(this.cine == 6){
				ctx.drawImage(this.special1,15,-2);
			} else if(this.cine == 7){
				ctx.drawImage(this.special2,10,0);
			} else if(this.cine == 8){
				ctx.drawImage(this.mad1,0,20);
			} else if(this.cine == 9){
				ctx.drawImage(this.stanceUp,0,0);
			} else if(this.cine == 10){
				ctx.drawImage(this.combat1,0,0);
			}
			
		} else if((this.velocity.x == 0 || (this.down == true && this.fast == false)) && this.attacking != true && this.blocking != true && this.taunting != true && this.hit == false && this.hardHit != true && this.end == false) {
			if((this.up == true && this.flying == true) || (this.jumpVelocity.y < 15 && this.air == true)){
				if(this.lookUp == true){
					ctx.drawImage(this.flyUpUp,0,0);
				} else if(this.lookDown == true){
					ctx.drawImage(this.flyUpDown,0,0);
				} else {
					ctx.drawImage(this.flyUp,0,0);
				}
			} else if(this.down == true && this.air == true) {
				ctx.drawImage(this.flyDownFast,0,0);
			} else if(this.down == false && this.air == true && this.up == false) {
				ctx.drawImage(this.flyDownSlow,0,0);
			} else if(this.exhausted == true){
				ctx.drawImage(this.injured,0,10);
			} else {
				if(this.lookUp == true){
					ctx.drawImage(this.stanceUp,0,0);
				} else if(this.lookDown == true){
					ctx.drawImage(this.stanceDown,0,0);
				} else {
					ctx.drawImage(this.stance,0,0);
				}
			}
		//MOVING DRAWS
		} else if(this.velocity.x != 0 && this.attacking != true && this.blocking != true && this.taunting != true && this.hit == false && this.hardHit != true && this.end == false){ //&& (this.fallingKick == false || this.air == false)
			if(this.slow == true && this.reverse == false){
				ctx.drawImage(this.slowFly,0,0);
			} else if(this.fast == true && this.reverse == false){
				ctx.drawImage(this.fastFly,0,10);
			} else if(this.reverse == true && this.landed == false){
				ctx.drawImage(this.moveReverse,0,0);
			} else if(this.air == true && this.up == false){
				ctx.drawImage(this.flyDownSlow,0,0);
			} else if(this.exhausted == true){
				ctx.drawImage(this.injured,0,10);
			} else {
				if(this.lookUp == true){
					ctx.drawImage(this.stanceUp,0,0);
				} else if(this.lookDown == true){
					ctx.drawImage(this.stanceDown,0,0);
				} else {
					ctx.drawImage(this.stance,0,0);
				}
			}
		//BASIC ATTACK
		} else if(this.attacking == true && this.air == false && this.hit == false && this.blasting == false && this.intensify == false){
			this.randomEffect = Math.random();
			//app.main.chance = .2;
			//console.log(this.arms);
			if(this.kicks == false && this.chance <= .3){
				//Kick
			} else if(this.kicks == true){
				app.main.chance = .4;
			}
			
			if(hardAttackHitTest(app.main.android18,app.main.vegeta) == true && hitTest(app.main.android18,app.main.vegeta) != true){
			if(this.left == true){
				this.moveLeft();
			} else {
				this.moveRight();
			}
			}
			if(this.counter < 2 && app.main.chance > .3){
				this.attackPrep = true;
				ctx.drawImage(this.punchPrep,0,10);
			} else if(this.counter < 2 && app.main.chance <= .3){
				this.attackPrep = true;
				ctx.drawImage(this.kickPrep,-5,8);
			} else if(this.counter < 4 && app.main.chance > .3){
				if(this.counter < 3){
					this.stamina += 4;
					this.basic = true;
					if(this.arms == false){
						this.arms = true;
					} else if(this.arms == true){
						this.arms = false;
					}			
				} else {
					this.basic = false;
				}
				if(this.arms == false){
					ctx.drawImage(this.rightPunch,-20,8);
				} else if(this.arms == true){
					ctx.drawImage(this.leftPunch,-35,6);
				}
			} else if(this.counter < 4 && app.main.chance <= .3){
				if(this.counter < 3){
					this.stamina += 4;
					this.basic = true;
				} else {
					this.basic = false;
				}
				ctx.drawImage(this.kick,-25,8);
			} else if(app.main.chance > .3) {
				this.missed = false;
				this.kicks = false;
				this.basic = false;
				ctx.drawImage(this.stance,0,10);
				this.fight = false;
				this.attacking = false;
			} else if(app.main.chance <= .3) {
				this.missed = false;
				this.kicks = true;
				this.basic = false;
				ctx.drawImage(this.kick,-25,8);
				//ctx.drawImage(this.kickPrep,5,10);
				this.fight = false;
				this.attacking = false;
			} 
		//AIR BASIC ATTACK
		} else if(this.attacking == true && this.air == true && this.hit == false && this.intensify == false && this.blasting == false && this.fallingKick == false){
			this.randomEffect = Math.random();
			
			if(this.kicks == false && this.chance <= .3){
				//Kick
			} else if(this.kicks == true){
				app.main.chance = .4;
			}
			
			if(hardAttackHitTest(app.main.android18,app.main.vegeta) == true && hitTest(app.main.android18,app.main.vegeta) != true){
			if(this.left == true){
				this.moveLeft();
			} else {
				this.moveRight();
			}
			}
			if(this.counter < 2 && app.main.chance > .3){
				ctx.drawImage(this.punchPrepAir,0,10);
				this.attackPrep = true;
			} else if(this.counter < 2 && app.main.chance <= .3){
				ctx.drawImage(this.kickPrep,-5,8);
				this.attackPrep = true;
			} else if(this.counter < 4 && app.main.chance > .3){
				if(this.counter < 3){
					this.stamina += 4;
					this.basic = true;
					if(this.arms == false){
						this.arms = true;
					} else if(this.arms == true){
						this.arms = false;
					}
				} else {
					this.basic = false;
				}
				if(this.arms == false){
					ctx.drawImage(this.rightPunchAir,-20,8);
				} else if(this.arms == true){
					ctx.drawImage(this.leftPunchAir,-35,6);
				}
			} else if(this.counter < 4 && app.main.chance <= .3){
				if(this.counter < 3){
					this.stamina += 4;
					this.basic = true;
				} else {
					this.basic = false;
				}
				ctx.drawImage(this.kick,-25,8);
			} else if(app.main.chance > .3) {
				ctx.drawImage(this.flyUp,0,10);
				this.missed = false;
				this.kicks = false;
				this.fight = false;
				this.attacking = false;
				this.basic = false;
			} else if(app.main.chance <= .3) {
				ctx.drawImage(this.kick,-25,8);
				this.missed = false;
				this.kicks = true;
				this.fight = false;
				this.attacking = false;
				this.basic = false;
			} 
		//AIR HARD DROP KICK -- NOT PROPERLY FUCTIONAL
		/*
		} else if(this.attacking == true && this.intensify == true && this.air == true && this.hit == false && this.stun == false && this.down == true){
			this.hard = true;
			//this.attackSize = new Victor(1000,1000);
			if(hardAttackHitTest(app.main.android18, app.main.vegeta) == true && app.main.detectedHard == false){
				app.main.detectedHard = true;
			}
			if(this.counter < 10){
				ctx.drawImage(this.fallKick,0,0);
			} else if(this.counter < 11){
				this.stamina += 10;
				this.punching = true;
				ctx.drawImage(this.fallKick,0,0);
			} else if(this.counter < 12){
				this.punching = false;
				ctx.drawImage(this.fallKick,0,0);
			} else {
				ctx.drawImage(this.stance,0,0);
				this.attacking = false;
				this.fallingKick = false;
				this.hard = false;
				this.fight = false;
				//this.attackSize = new Victor(10, 10);
				this.counter = 0;
			}
		*/
		//HARD PUNCH AND KICK
		} else if(this.attacking == true && this.intensify == true && this.air == false && this.hit == false && this.blasting == false){
			this.randomEffect = Math.random();
			this.punchMove = true;
			this.hard = true;
			//app.main.chance = .2;
			if(app.main.chance > .6){
				if(this.counter < 3){
					this.attackPrep = true;
					this.shortMove = true;
					ctx.drawImage(this.hardPunchPrep,-10,20);
				} else if(this.counter < 4){
					this.stamina += 10;
					this.punching = true;
					ctx.drawImage(this.hardPunch,-42,20);
				} else if(this.counter < 10){
					this.punching = false;
					ctx.drawImage(this.hardPunch,-42,20);
				} else {
					ctx.drawImage(this.hardPunch,-42,20);
					this.punchMove = false;
					this.shortMove = false;
					this.missed = false;
					this.intensify = false;
					this.hard = false;
					this.fight = false;
					this.attacking = false;
					this.counter = 0;
				} 
			} else if(app.main.chance < .61 && app.main.chance > .25){
				if(this.counter < 3){
					this.attackPrep = true;
					this.shortMove = true;
					this.kickMove = true;
					ctx.drawImage(this.launchPrep,-2,5);
				} else if(this.counter < 4){
					this.stamina += 10;
					if(hardAttackHitTest(app.main.android18, app.main.vegeta) == true && app.main.vegeta.blocking == false && app.main.vegeta.superSpeed == false){
						app.main.vegeta.jumpVelocity = new Victor(0,-30);
						app.main.vegeta.air = true;
					}
					this.kicking = true;
					ctx.drawImage(this.launchSwing,-50,-10);
				} else if(this.counter < 10){
					this.kicking = false;
					ctx.drawImage(this.launch,-35,0);
				} else {
					ctx.drawImage(this.launch,-35,0);
					this.kickMove = false;
					this.shortMove = false;
					this.missed = false;
					this.hard = false;
					this.fight = false;
					this.attacking = false;
					this.intensify = false;
					this.counter = 0;
				}
			} else {
				if(this.counter < 3){
					this.kickMove = true;
					this.longMove = true;
					this.attackPrep = true;
					ctx.drawImage(this.hardKickPrep,-2,5);
				} else if(this.counter < 4){
					this.stamina += 10;
					this.kicking = true;
					ctx.drawImage(this.hardKickSwing,-68,0);
				} else if(this.counter < 10){
					this.kicking = false;
					ctx.drawImage(this.hardKick,-68,0);
				} else {
					ctx.drawImage(this.hardKick,-68,0);
					this.kickMove = false;
					this.longMove = false;
					this.missed = false;
					this.hard = false;
					this.fight = false;
					this.attacking = false;
					this.counter = 0;
					this.intensify = false;
				} 
			}
		//AIR HARD PUNCH AND KICK
		} else if(this.attacking == true && this.intensify == true && this.air == true && this.hit == false && this.blasting == false){
			this.randomEffect = Math.random();
			this.hard = true;
			if(app.main.chance > .5){
				if(this.counter < 5){
					this.punchMove = true;
					this.shortMove = true;
					this.attackPrep = true;
					ctx.drawImage(this.hardPunchAirPrep,-2,5);
				} else if(this.counter < 6){
					this.stamina += 10;
					this.punching = true;
					ctx.drawImage(this.hardPunchAirSwing,-2,5);
				} else if(this.counter < 10){
					this.punching = false;
					ctx.drawImage(this.hardPunchAir,-2,25);
				} else {
					ctx.drawImage(this.hardPunchAir,-2,25);
					this.punchMove = false;
					this.shortMove = false;
					this.missed = false;
					this.hard = false;
					this.fight = false;
					this.attacking = false;
					this.counter = 0;
					this.intensify = false;
				} 
			} else {
				if(this.counter < 5){
					this.kickMove = true;
					this.longMove = true;
					this.attackPrep = true;
					ctx.drawImage(this.hardKickPrep,-2,5);
				} else if(this.counter < 6){
					this.stamina += 10;
					this.kicking = true;
					ctx.drawImage(this.hardKickSwing,-68,0);
				} else if(this.counter < 10){
					this.kicking = false;
					ctx.drawImage(this.hardKick,-68,0);
				} else {
					ctx.drawImage(this.hardKick,-68,0);
					this.kickMove = false;
					this.longMove = false;
					this.missed = false;
					this.hard = false;
					this.fight = false;
					this.attacking = false;
					this.counter = 0;
					this.intensify = false;
				} 
			}
		//BLAST ATTACK
		} else if(this.blasting == true && this.attacking == true && this.hit == false && this.intensify == false && this.fallingKick == false){
			if(this.counter < 3){
				ctx.drawImage(this.blastPrep,1,6);
			} else if(this.counter < 6){
				if(this.arms == false){
					if(this.counter < 4){
						app.main.sound.playEnergyAttack(5);
						this.energy -= 4;
						if(this.left == true){
							app.main.blasts.push(new app.Energy(this.position.x,this.position.y + 37,this.left, 0, 0));
						} else {
							app.main.blasts.push(new app.Energy(this.position.x + 60,this.position.y + 37,this.left, 0, 0));
						}
					}
					ctx.drawImage(this.rightBlast,-15,11);
				} else if(this.arms == true){
					if(this.counter < 4){
						app.main.sound.playEnergyAttack(5);
						this.energy -= 4;
						if(this.left == true){
							app.main.blasts.push(new app.Energy(this.position.x,this.position.y + 47,this.left, 0, 0));
						} else {
							app.main.blasts.push(new app.Energy(this.position.x + 60,this.position.y + 47,this.left, 0, 0));
						}
					}
					ctx.drawImage(this.leftBlast,-18,5);
				}
			} else {
				ctx.drawImage(this.blastPrep,1,6);
				if(this.arms == false){
					this.arms = true;
				} else if(this.arms == true){
					this.arms = false;
				}
				this.fight = false;
				this.attacking = false;
				this.blasting = false;
			}
		//POWERFUL BLAST ATTACK
		} else if(this.blasting == true && this.attacking == true && this.hit == false && this.intensify == true && this.fallingKick == false){
			//app.main.chance = .3;
			this.powerMove = true;
			if(app.main.chance > .5){
			if(this.counter < 3){
				//this.jumpVelocity.y = 0;
				//this.jumpAccel.y = 0;
				//this.gravity.zero();
				//this.velocity.y = 0;
				ctx.drawImage(this.blastPrep,1,6);
				if(this.arms == false){
					this.arms = true;
				} else if(this.arms == true){
					this.arms = false;
				}
			} else if(this.counter < 5){
				ctx.drawImage(this.attackE,-30,5);
			} else if(this.counter < 6){
				app.main.sound.playEnergyAttack(23);
				ctx.drawImage(this.attackE,-30,5);
			} else if(this.counter < 7){
				ctx.drawImage(this.attackE,-30,5);
				ctx.drawImage(this.blastCharge1,-37,20,10,14);
			} else if(this.counter < 8){
				ctx.drawImage(this.attackE,-30,5);
				ctx.drawImage(this.blastCharge1,-42,16.5,15,21);
			} else if(this.counter < 9){
				ctx.drawImage(this.attackE,-30,5);
				ctx.drawImage(this.blastCharge1,-47,13,20,28);
			} else if(this.counter < 10){
				ctx.drawImage(this.attackE,-30,5);
				ctx.drawImage(this.blastCharge1,-52,9.5,25,35);
			} else if(this.counter < 11){
				ctx.drawImage(this.attackE,-30,5);
				ctx.drawImage(this.blastCharge1,-57,6,30,42);
			} else if(this.counter < 12){
				ctx.drawImage(this.attackE,-30,5);
				ctx.drawImage(this.blastCharge1,-62,2.5,35,49);
			} else if(this.counter < 13){
				ctx.drawImage(this.attackE,-30,5);
				ctx.drawImage(this.blastCharge1,-62,2.5,35,49);
			} else if(this.counter < 20){
				if(this.counter < 14){
					this.blastRelease = true;
					app.main.sound.playTaunt1(Math.round(getRandom(62,65)));
				}
				if(this.arms == false){
					if(this.counter < 14){
						app.main.sound.playEnergyAttack(24);
						this.energy -= 15;
						if(this.left == true){
							app.main.blasts.push(new app.Energy(this.position.x - 24,this.position.y + 27,this.left, 0, 1));
						} else {
							app.main.blasts.push(new app.Energy(this.position.x + 57,this.position.y + 27,this.left, 0, 1));
						}
					}
					ctx.drawImage(this.attackE,-30,5);
				} else if(this.arms == true){
					if(this.counter == 14){
						app.main.sound.playEnergyAttack(24);
						this.energy -= 15;
						if(this.left == true){
							app.main.blasts.push(new app.Energy(this.position.x - 24,this.position.y + 27,this.left, 0, 1));
						} else {
							app.main.blasts.push(new app.Energy(this.position.x + 57,this.position.y + 27,this.left, 0, 1));
						}
					}
					ctx.drawImage(this.attackE,-30,5);
				}
			} else {
				ctx.drawImage(this.blastPrep,1,6);
				this.intensify = false;
				this.powerMove = false;
				this.fight = false;
				this.attacking = false;
				this.blasting = false;
				this.blastRelease = false;
				//this.jumpAccel.y = -1;
			}
			} else { //FINGER BLAST
				if(this.counter < 3){
				//this.jumpVelocity.y = 0;
				//this.jumpAccel.y = 0;
				//this.gravity.zero();
				//this.velocity.y = 0;
				ctx.drawImage(this.blastPrep,1,6);
				if(this.arms == false){
					this.arms = true;
				} else if(this.arms == true){
					this.arms = false;
				}
			} else if(this.counter < 5){
				ctx.drawImage(this.finger,-30,-5);
			} else if(this.counter < 6){
				app.main.sound.playEnergyAttack(27);
				ctx.drawImage(this.finger,-30,-5);
			} else if(this.counter < 7){
				ctx.drawImage(this.finger,-30,-5);
				ctx.drawImage(this.blastCharge1,-39,10,10,10);
			} else if(this.counter < 8){
				ctx.drawImage(this.finger,-30,-5);
				ctx.drawImage(this.blastCharge1,-44,6.5,15,17);
			} else if(this.counter < 9){
				ctx.drawImage(this.finger,-30,-5);
				ctx.drawImage(this.blastCharge1,-39,10,10,10);
			} else if(this.counter < 10){
				ctx.drawImage(this.finger,-30,-5);
				ctx.drawImage(this.blastCharge1,-44,6.5,15,17);
			} else if(this.counter < 11){
				ctx.drawImage(this.finger,-30,-5);
				ctx.drawImage(this.blastCharge1,-39,10,10,10);
			} else if(this.counter < 12){
				ctx.drawImage(this.finger,-30,-5);
				ctx.drawImage(this.blastCharge1,-44,6.5,15,17);
			} else if(this.counter < 13){
				ctx.drawImage(this.finger,-30,-5);
				ctx.drawImage(this.blastCharge1,-39,10,10,10);
			} else if(this.counter < 20){
				if(this.counter < 14){
					this.blastRelease = true;
					app.main.sound.playTaunt1(Math.round(getRandom(62,65)));
				}
				if(this.arms == false){
					if(this.counter < 14){
						app.main.sound.playEnergyAttack(1);
						this.energy -= 15;
						if(this.left == true){
							app.main.blasts.push(new app.Energy(this.position.x - 24,this.position.y + 17,this.left, 0, 2));
						} else {
							app.main.blasts.push(new app.Energy(this.position.x + 60,this.position.y + 17,this.left, 0, 2));
						}
					}
					ctx.drawImage(this.finger,-30,-5);
				} else if(this.arms == true){
					if(this.counter < 14){
						app.main.sound.playEnergyAttack(1);
						this.energy -= 15;
						if(this.left == true){
							app.main.blasts.push(new app.Energy(this.position.x - 24,this.position.y + 17,this.left, 0, 2));
						} else {
							app.main.blasts.push(new app.Energy(this.position.x + 60,this.position.y + 17,this.left, 0, 2));
						}
					}
					ctx.drawImage(this.finger,-30,-5);
				}
			} else {
				ctx.drawImage(this.blastPrep,1,6);
				this.intensify = false;
				this.powerMove = false;
				this.fight = false;
				this.attacking = false;
				this.blasting = false;
				this.blastRelease = false;
				//this.jumpAccel.y = -1;
			}
			}
		//BLOCK
		} else if(this.blocking == true && this.hit == false && (this.stun == false || this.superSpeed == true) && this.fieldOn == false){
			ctx.drawImage(this.block,0,10);
		//FIELD
		} else if(this.blocking == true && this.fieldOn == true){
			if(this.counter < 50){
				this.fieldTimer++;
				if((this.counter %2) == 0){
					ctx.drawImage(this.useField1,0,0);
				} else {
					ctx.drawImage(this.useField2,0,0);
				}
				
				if(this.counter < 2){
					app.main.sound.playEnergyAttack(51);
				} else if(this.counter < 5 && this.counter > 3){
					app.main.sound.playTaunt1(Math.round(getRandom(55,57)));
				}
				
				ctx.save();
				if(this.counter < 5){
					ctx.globalAlpha = this.counter / 10;
					ctx.scale((.4 + ((this.counter * 2)/10)),(.4 + ((this.counter * 2)/10)));
					if(this.counter < 2){
						ctx.drawImage(this.fieldMain,-19.2,-2);
					} else if(this.counter < 3){
						ctx.drawImage(this.fieldMain,-28.8,-3);
					} else if(this.counter < 4){
						ctx.drawImage(this.fieldMain,-38.4,-4);
					}
				} else {
					ctx.scale(1.2,1.2);
					ctx.globalAlpha = .4;
					ctx.drawImage(this.fieldMain,-48,-5);
				}
				ctx.globalAlpha = .5;
				if(this.counter > 4){
				if(this.fieldTimer < 2){
					ctx.drawImage(this.field1,-48,-5);
				} else if(this.fieldTimer < 3){
					ctx.drawImage(this.field2,-48,-5);
				} else if(this.fieldTimer < 4){
					ctx.drawImage(this.field3,-48,-5);
				} else if(this.fieldTimer < 5){
					ctx.drawImage(this.field4,-48,-5);
				} else if(this.fieldTimer < 6){
					ctx.drawImage(this.field5,-48,-5);
				} else if(this.fieldTimer < 7){
					ctx.drawImage(this.field6,-48,-5);
				} else if(this.fieldTimer < 8){
					ctx.drawImage(this.field7,-48,-5);
				} else if(this.fieldTimer < 9){
					ctx.drawImage(this.field8,-48,-5);
					this.fieldTimer = 0;
				} else {
					this.fieldTimer = 0;
				}
				}
				ctx.restore();
				
			} else {
				if((this.counter %2) == 0){
					ctx.drawImage(this.useField1,0,0);
				} else {
					ctx.drawImage(this.useField2,0,0);
				}
				this.fieldOn = false;
			}
		//TAUNT
		} else if(this.taunting == true && this.hit == false && this.hardHit != true){
			if(this.counter < 25){
				this.stun = true;
				ctx.drawImage(this.taunt,20,0);
				if(this.counter > 5 && this.counter < 7){
					app.main.sound.playTaunt1(Math.round(this.tauntPick));
				}
			} else {
				ctx.drawImage(this.taunt,20,0);
				this.stamina = 28;
				app.main.taunts += 1;
				this.exhausted = false;
				this.stun = false;
				this.taunting = false;
			}
		//BASIC HIT
		} else if(this.hit == true && this.hardHit == false){
			if(this.stunCounter < 3){
				if(app.main.activeSupport == false){
					if(app.main.vegeta.attacking == true){
						app.main.roundScore -= 12;
					}
				} else {
					if(app.main.vegeta.attacking == true || app.main.support[0].attacking == true || app.main.support[1].attacking == true){
						app.main.roundScore -= 12;
					}
				}
				//this.intensify = false;
				this.stun = true;
				ctx.drawImage(this.hit1,5,0);
			} else {
				ctx.drawImage(this.hit1,5,0);
				this.stun = false;
				this.hit = false; 
			}
			/*
		} else if(this.hardHit == true && this.hit == true){
			if(this.stunCounter < 10){
				this.stun = true;
				ctx.drawImage(this.fallSide,5,0);
			} else {
				ctx.drawImage(this.fallSide,5,0);
				this.stun = false;
				this.hit = false;
			}
			*/
		//HARD HIT
		} else if(this.hardHit == true && this.hit == true && this.air == false){
			if(this.stunCounter < 20){
				this.voiceChance = Math.random();
				if(this.stunCounter < 4 && this.stunCounter > 2 && this.voiceChance > .5 && this.end == false){
					app.main.sound.playTaunt1(Math.round(getRandom(59,61)));
				}
				if(app.main.activeSupport == false){
					if(app.main.vegeta.attacking == true){
						app.main.roundScore -= 4;
					}
				} else {
					if(app.main.vegeta.attacking == true || app.main.support[0].attacking == true || app.main.support[1].attacking == true){
						app.main.roundScore -= 4;
					}
				}
				this.stun = true;
				ctx.drawImage(this.hitHard,5,20);
			} else {
				ctx.drawImage(this.hitHard,5,20);
				this.stun = false;
				this.hardHit = false;
				this.hit = false; 
			}
		//HARD HIT AIR
		} else if(this.hardHit == true && this.hit == true && this.air == true && this.end == false){
			if(this.punched == true){
				if(app.main.activeSupport == false){
					if(app.main.vegeta.attacking == true){
						app.main.roundScore -= 4;
					}
				} else {
					if(app.main.vegeta.attacking == true || app.main.support[0].attacking == true || app.main.support[1].attacking == true){
						app.main.roundScore -= 4;
					}
				}
				if(this.stunCounter < 20){
					this.voiceChance = Math.random();
					if(this.stunCounter < 4 && this.stunCounter > 2 && this.voiceChance > .5 && this.end == false){
						app.main.sound.playTaunt1(Math.round(getRandom(59,61)));
					}
					this.stun = true;
					ctx.drawImage(this.fallDown,5,20);		
				} else {
					ctx.drawImage(this.fallDown,5,20);
					this.stun = false;
					this.hardHit = false;
					this.hit = false; 
				}
			} else {
				if(this.stunCounter < 20){
					this.voiceChance = Math.random();
					if(this.stunCounter < 4 && this.stunCounter > 2 && this.voiceChance > .5 && this.end == false){
						app.main.sound.playTaunt1(Math.round(getRandom(59,61)));
					}
				if(app.main.activeSupport == false){
					if(app.main.vegeta.attacking == true){
						app.main.roundScore -= 4;
					}
				} else {
					if(app.main.vegeta.attacking == true || app.main.support[0].attacking == true || app.main.support[1].attacking == true){
						app.main.roundScore -= 4;
					}
				}
					this.stun = true;
					ctx.drawImage(this.fallSide,5,20);
				} else {
					ctx.drawImage(this.fallSide,5,20);
					this.stun = false;
					this.hardHit = false;
					this.hit = false; 
				}
			}
		} else if(this.end == true){
				if(this.air == true){
					this.stun = true;
					ctx.drawImage(this.fallDown,5,20);
					if(app.main.environment.fadeOut == false){
						this.stunCounter = 0;
					}
				} else {
					this.stun = true;
					ctx.drawImage(this.ground18,-15,90);
					if(this.stunCounter < 20){
						app.main.environment.fadeOut = true;
					} else if(this.stunCounter > 38){
						app.main.sound.playIntro(0);
						app.main.sound.playEffectLoud(54);
						this.dead = true;
						this.stunCounter = 0;
					}
					
				}
		}
		
		}//end if
		
		
		//SUPER SPEED (TELEPORT) DRAW 
		if(this.superSpeed == true && this.appear == false){
			this.speedCounter++;
			ctx.save();
			ctx.scale(.9,1.2);
			if(this.counter < 4){
				if(this.counter < 2){
					app.main.sound.playSpecialReaction(19);
				}
				if(this.speedCounter < 2){
					ctx.drawImage(this.teleport,-17,-5);
				} else if(this.speedCounter < 3){
					//blink
				} else {
					this.speedCounter = 0;
				}
			} else if(this.counter < 7){
				this.stun = true;
				this.vanish = true;
				if(this.speedCounter < 2){
					ctx.drawImage(this.teleport,-17,-5);
					ctx.drawImage(this.teleport,-17,-2);
				} else if(this.speedCounter < 3){
					//blink
				} else {
					this.speedCounter = 0;
				}
				
			} else if(this.counter < 8){
				this.speed();
			} else if(this.counter < 12){
				if(this.speedCounter < 2){
					ctx.drawImage(this.teleport,-17,-5);
					ctx.drawImage(this.teleport,-17,-2);
				} else if(this.speedCounter < 3){
					//blink
				} else {
					this.speedCounter = 0;
				}
			} else if(this.counter < 15){
				this.velocity.x = 0;
				this.decel.x = 0;
				//this.jumpVelocity.y = 0;
				this.vanish = false;
				if(this.speedCounter < 2){
					ctx.drawImage(this.teleport,-17,-5);
				} else if(this.speedCounter < 3){
					//blink
				} else {
					this.speedCounter = 0;
				}
			} else {
				app.main.sound.playSpecialReaction(20);
				this.stun = false;
				this.fight = false;
				this.superSpeed = false;
			}
			ctx.restore();
		}
		
		//SPECIAL SCENE VERSION OF SUPER SPEED
		if(this.appear == true && this.superSpeed == true){
			this.speedCounter++;
			ctx.save();
			ctx.scale(1.2,1.2);
			if(this.counter < 5){
				if(this.speedCounter < 2){
					ctx.drawImage(this.teleport,-10,-5);
					ctx.drawImage(this.teleport,-10,-2);
				} else if(this.speedCounter < 3){
					//blink
				} else {
					this.speedCounter = 0;
				}
			} else if(this.counter < 8){
				this.vanish = false;
				if(this.speedCounter < 2){
					ctx.drawImage(this.teleport,-10,-5);
				} else if(this.speedCounter < 3){
					//blink
				} else {
					this.speedCounter = 0;
				}
			} else {
				app.main.sound.playSpecialReaction2(20);
				this.fight = false;
				this.superSpeed = false;
				this.appear = false;
				this.counter = 0;
			}
			ctx.restore();
		}
		
		ctx.restore();
	};
	
	
	return Android18; 
})(); //end IIFE