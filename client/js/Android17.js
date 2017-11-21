
"use strict";

var app = app || {};


app.Android17 = (function(){
	
	function Android17(start,opponent){
		
		//Core Stats
		this.health = 100000;
		this.endurance = 100000;
		this.energy = 100000;
		this.stamina = -28000;
		
		//STATE VARIABLES
		this.right = false;
		this.left = true;
		this.movingLeft = false;
		this.movingRight = false;
		this.reverse = true;
		this.changeDir = false;
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
		this.blocking = false;
		this.blasting = false;
		this.powerMove = false;
		this.blastRelease = false;
		this.blasted = false;
		this.exhausted = false;
		this.hit = false;
		this.hardHit = false;
		this.punching = false;
		this.punched = false;
		this.fallingKick = false;
		this.arms = false;
		this.kicking = false;
		this.slow = false;
		this.fast = false;
		this.up = false;
		this.down = false;
		this.superSpeed = false;
		this.vanish = false; //change back
		this.aboveBuilding = false;
		this.byBuilding = false;
		this.aboveSky = false;
		this.appear = false;
		this.stun = true; //change back
		this.end = false;
		this.dead = false;
		this.test = false;
		this.tutor = false;
		this.gone = false;
		
		this.voiceStop = false;
		this.voiceChance = 0;
		
		this.lookUp = false;
		this.lookDown = false;
		
		this.fieldOn = false;
		this.fieldTimer = 0;
		
		this.cinematic = false;
		this.cine = 0;
		
		this.hurtBlasting = false;
		this.hurtBTimer = 0;
		this.nukeCounter = 0;
		this.hurtBTrigger = 0;
		this.hurtBRandom = Math.round(getRandom(250,400));
		
		//AI
		this.active = false;
		this.city = false;
		this.wentCity = false;
		this.evasion = false;
		this.wentEvasion = false;
		this.encounter = false;
		this.wentEncounter = false;
		this.combo = false;
		this.decision = .9;
		this.decisionTimer = 0;
		this.ouchCounter = 0;
		
		this.aggressive = true;
		this.defensive = false;
		this.dodge = false;
		this.defBreak = 0;
		this.aiCounter = 0;
		
		//Timers
		this.counter = 0;
		this.stunCounter = 0;
		this.speedCounter = 0;
		this.exhaustedCounter = 0;
		this.randomEffect = 0;
		this.flySoundDelay = 0;
		this.smoothTimer = 0;
		this.tauntPick = getRandom(10, 16);
		
		
		// CONSTANTS
		this.BUILDING = new Victor(650,270);
		this.GROUND = new Victor(0,620);
		this.SKY = new Victor(0,220);
		this.SKYTOP = new Victor(0,5);
		this.LEFTWALL = new Victor(0,0);
		this.RIGHTWALL = new Victor(950,0);
		this.MAX_STAMINA = 100;
		
		
		//VECTORS (Victors)
		this.attackSize = new Victor(30, 60);
		this.position = new Victor(start, this.GROUND.y);
		//this.position = new Victor(start, 400);
		this.attackPosition = new Victor(0, 0);
		this.hardAttackPosition = new Victor(0, 0);
		this.velocity = new Victor(0, 0);
		this.direction = new Victor(1, 0);
		this.accel = new Victor(2, 0);
		this.decel = new Victor(0, 0);
		this.jumpVelocity = new Victor(0,-15);
		this.jumpAccel = new Victor(0,-1);
		this.gravity = new Victor(0,1.7);
		this.size = new Victor(50, 100);
		
		
		// IMAGE SETUP 
		
		// ---- 17 IMAGES ------------------
		
		var image = new Image();
		image.src =  app.images17.stance;
		this.stance = image;
		
		image = new Image();
		image.src =  app.images17.stanceUp;
		this.stanceUp = image;
		
		image = new Image();
		image.src =  app.images17.stanceDown;
		this.stanceDown = image;
		
		image = new Image();
		image.src =  app.images17.slowFly;
		this.slowFly = image;
		
		image = new Image();
		image.src =  app.images17.fastFly;
		this.fastFly = image;
		
		image = new Image();
		image.src =  app.images17.flyUp;
		this.flyUp = image;
		
		image = new Image();
		image.src =  app.images17.flyUpUp;
		this.flyUpUp = image;
		
		image = new Image();
		image.src =  app.images17.flyUpDown;
		this.flyUpDown = image;
		
		image = new Image();
		image.src =  app.images17.flyDown;
		this.flyDown = image;
		
		image = new Image();
		image.src =  app.images17.reverse;
		this.moveReverse = image;
		
		image = new Image();
		image.src =  app.images17.leftPunch;
		this.leftPunch = image;
		
		image = new Image();
		image.src =  app.images17.rightPunch;
		this.rightPunch = image;
		
		image = new Image();
		image.src =  app.images17.punchPrep;
		this.punchPrep = image;
		
		image = new Image();
		image.src =  app.images17.hit1;
		this.hit1 = image;
		
		image = new Image();
		image.src =  app.images17.attackE;
		this.attackE = image;
		
		image = new Image();
		image.src =  app.images17.hardKick;
		this.hardKick = image;
		
		image = new Image();
		image.src =  app.images17.ground;
		this.ground17 = image;
		
		image = new Image();
		image.src =  app.images17.fallSide;
		this.fallSide = image;
		
		image = new Image();
		image.src =  app.images17.hardKickPrep;
		this.hardKickPrep = image;
		
		image = new Image();
		image.src =  app.images17.hitHard;
		this.hitHard = image;
		
		image = new Image();
		image.src =  app.images17.kick;
		this.kick = image;
		
		image = new Image();
		image.src =  app.images17.kickPrep;
		this.kickPrep = image;
		
		image = new Image();
		image.src =  app.images17.blast;
		this.blast = image;
		
		image = new Image();
		image.src =  app.images17.block;
		this.block = image;
		
		image = new Image();
		image.src =  app.images17.fallKick;
		this.fallKick = image;
		
		image = new Image();
		image.src =  app.images17.fallDown;
		this.fallDown = image;
		
		image = new Image();
		image.src =  app.images17.launch;
		this.launch = image;
		
		image = new Image();
		image.src =  app.images17.finger;
		this.finger = image;
		
		image = new Image();
		image.src =  app.images17.drop;
		this.drop = image;
		
		image = new Image();
		image.src =  app.images17.injured;
		this.injured = image;
		
		image = new Image();
		image.src =  app.images17.injuredUp;
		this.injuredUp = image;
		
		image = new Image();
		image.src =  app.images17.injured2;
		this.injured2 = image;
		
		image = new Image();
		image.src =  app.images17.injuredHit;
		this.injuredHit = image;

		image = new Image();
		image.src =  app.images17.injuredBlast;
		this.injuredBlast = image;
		
		image = new Image();
		image.src =  app.images17.field1;
		this.field1 = image;
		
		image = new Image();
		image.src =  app.images17.special1;
		this.special1 = image;
		
		image = new Image();
		image.src =  app.images17.special2;
		this.special2 = image;
		
		image = new Image();
		image.src =  app.images17.field1;
		this.useField1 = image;
		
		
		//Attack IMAGES
		
		image = new Image();
		image.src =  app.attack.blastCharge1;
		this.blastCharge1 = image;
		
		image = new Image();
		image.src =  app.attack.tele4;
		this.teleport = image;
		
		image = new Image();
		image.src =  app.attack.nuke1;
		this.nuke1 = image;
		
		image = new Image();
		image.src =  app.attack.nuke2;
		this.nuke2 = image;
		
		image = new Image();
		image.src =  app.attack.nuke3;
		this.nuke3 = image;
		
		image = new Image();
		image.src =  app.attack.nuke4;
		this.nuke4 = image;
		
		image = new Image();
		image.src =  app.attack.nuke5;
		this.nuke5 = image;
		
		image = new Image();
		image.src =  app.attack.nuke6;
		this.nuke6 = image;
		
		
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
	Android17.prototype.update = function(){
		
		if(app.main.scene == false && app.main.vegeta.gero == false){
		//17 State changer
		if(this.decision >= .7){
			this.evasion = true;
			this.wentEvasion = true;
			this.active = false;
			this.wentCity = false;
			this.wentEncounter = false;
		} else if(this.decision >= .3 && this.decision < .7){
			this.encounter = true;
			if(this.wentEncounter == false){
				app.main.sound.playTaunt5(Math.round(getRandom(0,3)));
				this.wentEncounter = true;
			}
			this.wentCity = false;
			this.wentEvasion = false;
			this.active = true;
		} else if(this.decision >= 0 && this.decision < .3 && app.main.vegeta.piccolo != true && app.main.vegeta.gero != true){
			this.active = false;
			if(this.wentCity == false){
				app.main.sound.playTaunt5(Math.round(getRandom(4,7)));
				app.main.sound.playSpecialReaction2(19);
				this.wentCity = true;
			}
			this.city = true;
			this.wentEncounter = false;
			this.wentEvasion = false;

		} else if(this.decision >= 0 && this.decision < .3 && (app.main.vegeta.piccolo == true || app.main.vegeta.gero == true)){
			this.evasion = true;
			this.wentEvasion = true;
			this.active = false;
			this.wentCity = false;
			this.wentEncounter = false;

		}
		}
		
		//console.log("WENT CITY :" + this.wentCity + " WENT EVASION: " + this.wentEvasion + " WENT ENCOUNTER: " + this.wentEncounter);
		
		//console.log("CITY :" + this.city + " EVASION: " + this.evasion + " ENCOUNTER: " + this.encounter);
		
		if(this.city == true){
			this.superSpeed = true;
			if(this.vanish == true){
				this.gone = true;
			}
		}
	
		this.hurtBTrigger++;
		
		if(app.main.vegeta.gohan == true && app.main.vegeta.superForm == true && app.main.scene == false && this.hurtBTrigger > this.hurtBRandom){
			this.hurtBlasting = true;
			this.hurtBTimer = 0;
			this.hurtBTrigger = 0;
			this.hurtBRandom = Math.round(getRandom(250,400));
		}
		
		if(app.main.battle == 3 && app.main.scene == false){
			this.velocity.x = 0;
			this.decel.x = 0;
			//this.position
		}
		
		//Look around
		if(this.position.y < app.main.vegeta.position.y - 150){
			this.lookDown = true;
		} else if(this.position.y > app.main.vegeta.position.y + 150){
			this.lookUp = true;
		} else {
			this.lookUp = false;
			this.lookDown = false;
		}
		
		/* this.decisionTimer++;
		console.log("DECISIONS DECISIONS DECISIONS: " + this.decision);
		if((this.decisionTimer > 100 && this.city == false) || (this.decisionTimer > 200 && this.city == true)){
			this.decision = Math.random();
			
			if(this.city == true && this.decision >= .3) {
				this.superSpeed = true;
				this.gone = false;
				this.city = false;
			}
			
			if(this.evasion == true && this.decision < .6){
				this.evasion = false;
			}
			
			if(this.encounter == true && (this.decision >= .6 || this.decision < .3)){
				this.encounter = false;
			}
			
			/* if(this.wentCity == true && this.wentEncounter == true && this.wentEvasion == true){
				this.wentCity = false;
				this.wentEvasion = false;
				this.wentEncounter = false;
			}
			this.decisionTimer = 0;
		} */
		
		
		this.flySoundDelay++;
		
		
		//WALL POSITIONING
		if(this.position.x < this.LEFTWALL.x + 10 && (hardAttackHitTest(app.main.android17, app.main.vegeta) == false)){
			this.right = true;
			this.left = false;
		} else if(this.position.x > this.RIGHTWALL.x - 10 && (hardAttackHitTest(app.main.android17, app.main.vegeta) == false)){
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
			if((this.end == true && this.vanish == false) || (this.jumpVelocity.y > 20 && this.hardHit == true)){
				app.main.environment.shake = true;
				this.fallDust = true;
				if(this.dead == false){
					app.main.sound.playSpecialReaction2(2);
				}
			} else if(this.vanish == false && this.hover == false && (app.main.scene == false || app.main.sceneNum == 1)){
				this.landDust = true;
				app.main.sound.playSpecialReaction2(3);
			}
		} 
		if(this.position.y > this.BUILDING.y && this.aboveBuilding == true && this.down == false){
			this.position.copyY(this.BUILDING);
			//this.jumpVelocity = new Victor(0,-15);
			this.velocity.divideScalar(3);
			this.ground = true;
			this.air = false;
			this.decend = false;
			if((this.end == true && this.vanish == false) || (this.jumpVelocity.y > 20 && this.hardHit == true)){
				app.main.environment.shake = true;
				if(this.dead == false){
					app.main.sound.playSpecialReaction(2);
				}
			} else if(this.vanish == false && this.hover == false && (app.main.scene == false || app.main.sceneNum == 1)){
				app.main.sound.playSpecialReaction(3);
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
		
		//GROUND CHECK
		if(this.ground == true) {
			if(this.stun == false && this.hardhit == false){
				this.jumpVelocity = new Victor(0,0);
			}
			if(this.up == true){
				this.jumpVelocity = new Victor(0,-15);
			}
			
			if(this.air == true){
				this.prevX = this.position.x;
				if(this.aboveBuilding == false){
					this.flyDust = true;
				}
			}
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
					app.main.vegeta.focus17 = false;
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
					app.main.vegeta.focus17 = false;
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
		
		//Endurance recovery
		if(this.endurance < 100 && this.stun == false && this.end == false){
			this.endurance += .2;
		}
		//Energy recovery (NO RECOVER ENERGY)
		if(this.energy < 100 && this.stun == false && this.end == false){
			this.energy += .1;
		}
		//Stamina recovery
		if(this.stamina > 28 && (this.stun == false && this.end == false && this.blocking == false) || this.exhausted == true){
			this.stamina -= .2;
		}
		//console.log("attacking = " + this.attacking);
		//console.log("fighting = " + this.fight);
		//console.log("stunned = " + this.stun); //reverse
		//console.log("AI = " + app.main.aiChoice4);
		//console.log(app.main.detectedHard3);
		
		//Exhaustion 
		/*
		if(this.exhausted == true){
			this.exhaustedCounter++;
			if(this.exhaustedCounter > 2000){ //aiChoice4
				this.exhausted = false;
			}
		}
		if(this.exhausted == false){
			//this.exhaustedCounter = 0;
		}*/
		/*
		//Death location
		if(this.end != true){
			app.main.environment.deathLocationVegeta.x = this.position.x;
			app.main.environment.deathLocationVegeta.y = this.position.y;
		}
		*/
		//AI FIXES
		if(app.main.vegeta.attacking == false && this.blocking == true){
			this.exhaustedCounter++;
			if(this.exhaustedCounter > 2){
				this.blocking = false;
				app.main.aiChoice5 = 10;
				this.exhaustedCounter = 0;
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
		
		//blast close push
		if(hardAttackHitTest(app.main.android17, app.main.vegeta) == true && app.main.vegeta.blasting == true && this.behind == false) {
			if(app.main.vegeta.left == true){
				this.velocity.x -= 2;
			} else {
			    this.velocity.x -= 2;
			}
		}
		
		//HOVER
		if(app.main.scene == false && app.main.gameState != app.main.GAME_STATE.TUTORIAL){
		if(this.air == true && this.down == false && this.position.y > this.SKYTOP.y && this.up == false && this.hit == false && this.hardHit == false && this.end == false && app.main.vegeta.end == false && ((hardAttackHitTest(app.main.android17,app.main.vegeta) && this.hardHit == false) || this.blasting == true || this.powerMove == true || this.taunting == true || this.superSpeed == true || this.blocking == true || this.attacking == true)){ //Hover
			this.hoverCounter++;
			this.hover = true;
			if(hardAttackHitTest(app.main.android17,app.main.vegeta)){
				if(this.hoverCounter < 5){
					this.flying = false;
				} else {
					this.flying = true;
					this.hoverCounter = 0;
				}
			} else {
				if(this.hoverCounter < 6){
					this.flying = false;
				} else {
					this.flying = true;
					this.hoverCounter = 0;
				}
			}
		} else {
			this.hover = false;
		}
		}
		if(app.main.scene == true && app.main.battle == 0 && this.hover == true){
			this.hoverCounter++;
				if(this.hoverCounter < 6){
					this.flying = false;
				} else {
					this.flying = true;
					this.hoverCounter = 0;
				}
		}
		
		
		
		if(this.attacking == false && this.stun == false && this.fight == false && this.taunting == false  && this.charging == false){
			if(this.aiCounter > 1){
				app.main.action = false;
			} else {
				this.aiCounter++;
			}
			//app.main.aiChoice = Math.random();
		}
		if(this.taunting == false){
			this.tauntPick = getRandom(10, 16);
		}
		
		if(this.hit == true || this.hardHit == true){
			this.blasting = false;
			this.powerMove = false;
			app.main.dodgeChance2 = Math.random();
			
			this.hurtBTrigger = 0; //Special
		}

		//Flight control
		if(this.flying == true && (this.stun == false && this.end == false || this.hover == true)){
			if((this.position.y == this.GROUND.y || this.position.y == this.BUILDING.y) && this.stun == false && this.hover == false && (app.main.scene == false || app.main.sceneNum == 5) && this.end == false && this.flySoundDelay > 10){
				app.main.sound.playSpecialReaction(4);
				this.flySoundDelay = 0;
			}
			if(this.hover == true){
				this.jumpVelocity = new Victor(0,-4);
			} else if(this.jumpVelocity.y > 0 && this.down == false){
				this.jumpVelocity = new Victor(0,-8);
			}
			this.jumpVelocity.addY(this.jumpAccel);
			this.gravity.zero();
		} else if(this.decend == true){
			this.gravity = new Victor(0,8);
			this.velocity.multiplyScalar(1.3);
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
			app.main.aiTaunting = false;
			app.main.aiCharging = false;
			this.blasting = false;
			this.taunting = false;
			this.charging = false;
			this.intensify = false;
		}
		
		this.decelerate(); //DECEL
		
		
		if(this.velocity.x < .1 && this.velocity.x > -.1 && this.hit == false){
			this.velocity.zero();
		}
		
		
		//PUSH 
		if(app.main.vegeta.vanish == false && app.main.gameState != app.main.GAME_STATE.TUTORIAL && app.main.battle != 3){
		if(hitTest(app.main.android17,app.main.vegeta) && this.behind == false){
			if(app.main.vegeta.left == true){
				this.position.x -= 10;
			} else {
				this.position.x += 10;
			}
		} else if(hitTest(app.main.android17,app.main.vegeta) && this.behind == true){
			if(app.main.vegeta.left == true){
				this.position.x += 10;
			} else {
				this.position.x -= 10;
			}
		}
		}
		
		if(app.main.battle == 3 && this.hardHit == true){
			this.ouchCounter++;
			if(this.ouchCounter < 2){
				app.main.sound.playTaunt5(Math.round(getRandom(9,11)));
			} else if(this.ouchCounter < 20){
				
			} else {
				this.hardHit = false;
				this.ouchCounter = 0;
			}
		}
		
		if(this.basic == true && attackHitTest(app.main.android17, app.main.vegeta) != true){
			app.main.sound.playBasicReaction2(Math.round(getRandom(61,63)));
		}
		
		//Mute Voice
		/* if(this.hit == true){
			app.main.sound.pauseVoice5();
		} */
		
		//Varible resets
		if(this.attacking == false && this.fight == false && this.superSpeed == false && this.blasting == false && this.powerMove == false && this.hit == false && this.hardHit == false && this.charging == false && this.taunting == false && this.stun == false && this.end == false){
			//app.main.detected = false;
			//app.main.detectedHard = false;
			//console.log("RESET");
			this.hard = false;
			this.counter = 0;
			this.dodge = false;
			this.basic = false;
			this.kicking = false;
			this.punching = false;
			this.fieldOn = false;
			this.blastRelease = false;
		}
		if(this.stun == false){
			this.stunCounter = 0;
		}
		
		/*
		if(this.attacking == true && this.superSpeed == true && this.speedCounter > 1) { //AI FIX FOR 17
			this.superSpeed = false;
		} */
		
		//Checks for behind
		if(this.left == true && app.main.vegeta.left == true && this.position.x > app.main.vegeta.position.x){
			this.behind = true;
		} else if(this.left == false && app.main.vegeta.left == false && this.position.x < app.main.vegeta.position.x){
			this.behind = true;
		} else {
			this.behind = false;
		}
		
		if(this.position.x > 690){
			this.byBuilding = true;
		} else {
			this.byBuilding = false;
		}
		
		
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
	Android17.prototype.jump = function(){
		this.air = true;
	};
	
	//BEGIN SUPER SPEED
	Android17.prototype.speed = function(){
		this.energy -= 5;
		if(app.main.vegeta.left == true && app.main.gameState == app.main.GAME_STATE.TUTORIAL){
			if(app.main.vegeta.aboveBuilding == false){
				this.aboveBuilding = false;
			}
			this.position.x = app.main.vegeta.position.x + 50;
			this.position.y = app.main.vegeta.position.y;
		} else if(app.main.vegeta.right == true && app.main.gameState == app.main.GAME_STATE.TUTORIAL){
			if(app.main.vegeta.aboveBuilding == false){
				this.aboveBuilding = false;
			}
			this.position.x = app.main.vegeta.position.x - 50;
			this.position.y = app.main.vegeta.position.y;
		} else if(this.position.x - 120 <= this.LEFTWALL.x && this.evasion == true &&  app.main.gameState != app.main.GAME_STATE.TUTORIAL){
			this.position.x = this.RIGHTWALL.x;			
		} else if(this.position.x + 120 >= this.RIGHTWALL.x && this.evasion == true &&  app.main.gameState != app.main.GAME_STATE.TUTORIAL){
			this.position.x = this.LEFTWALL.x;
		} else if(this.left == true && ((app.main.vegeta.position.x < this.LEFTWALL.x + 50 && this.reverse == false) || app.main.gameState == app.main.GAME_STATE.TUTORIAL)){
			if(app.main.vegeta.aboveBuilding == false){
				this.aboveBuilding = false;
			}
			this.position.x = app.main.vegeta.position.x + 50;
			this.position.y = app.main.vegeta.position.y;
		} else if(this.right == true && ((app.main.vegeta.position.x > this.RIGHTWALL.x - 50 && this.reverse == false) || app.main.gameState == app.main.GAME_STATE.TUTORIAL)){
			if(app.main.vegeta.aboveBuilding == false){
				this.aboveBuilding = false;
			}
			this.position.x = app.main.vegeta.position.x - 50;
			this.position.y = app.main.vegeta.position.y;
		} else if(this.left == true && this.reverse == true){
			this.position.x = this.RIGHTWALL.x;
		} else if(this.right == true && this.reverse == true){
			this.position.x = this.LEFTWALL.x;
		} else if(this.left == true){
			if(app.main.vegeta.aboveBuilding == false){
				this.aboveBuilding = false;
			}
			this.position.x = app.main.vegeta.position.x - 50;
			this.position.y = app.main.vegeta.position.y;
		} else if(this.right == true){
			if(app.main.vegeta.aboveBuilding == false){
				this.aboveBuilding = false;
			}
			this.position.x = app.main.vegeta.position.x + 50;
			this.position.y = app.main.vegeta.position.y;
		}
	};
	
	//MOVE TO THE RIGHT
	Android17.prototype.moveRight = function(){
		//console.log("17 movingRight");
		this.movingRight = true;
		this.movingLeft = false;
		this.velocity.addX(this.accel);
		this.velocity.limit(25, .80);
		this.decel = this.velocity.clone();
		this.position.addX(this.velocity);
	};
	
	//MOVE TO THE LEFT
	Android17.prototype.moveLeft = function(){
		//console.log("17 movingLeft");
		this.movingLeft = true;
		this.movingRight = false;
		this.velocity.subtractX(this.accel);
		this.velocity.limit(25, .80);
		//console.log("VELOCITY" + this.velocity);
		this.decel = this.velocity.clone();
		this.position.addX(this.velocity);
	};
	
	//DECEL AFTER MOVING
	Android17.prototype.decelerate = function(){
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
	
	
	//FUNCTION TO DRAW ANDROID17 AND CHANGE MANY VARIABLES (MOST IMPORANT)
	Android17.prototype.draw = function(ctx){
		
		this.counter++;
		this.stunCounter++;
		
		if(this.movingLeft == true){
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
		if(this.movingRight == true){
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
		
		ctx.save();
		
		//FLIPPING
		if(this.left == true){
			ctx.translate(this.position.x + 40, this.position.y + 5);
			this.attackPosition.x = this.position.x - 30;
			this.attackPosition.y = this.position.y + 20;
			this.hardAttackPosition.x = this.position.x - 60;
			this.hardAttackPosition.y = this.position.y + 20;
			ctx.scale(-1.5, 1.5);
			if(this.movingRight = true && this.movingLeft == false){
				this.reverse = true;
			} else {
				this.reverse = false;
			}
		} else if(this.right == true){
			ctx.translate(this.position.x + 7, this.position.y + 5);
			this.attackPosition.x = this.position.x + 50;
			this.attackPosition.y = this.position.y + 20;
			this.hardAttackPosition.x = this.position.x + 80;
			this.hardAttackPosition.y = this.position.y + 20;
			ctx.scale(1.5, 1.5);
			if(this.movingLeft = true && this.movingRight == false){
				this.reverse = true;
			} else {
				this.reverse = false;
			}
		}
		
		// ------------ DRAWS FOR ANDROID17 ------------------------------------------
		// ------------ DRAWS FOR ANDROID17 ------------------------------------------
		// ------------ DRAWS FOR ANDROID17 ------------------------------------------
		
		if(this.vanish == false){
		//NON MOVING DRAWS
		if(this.cinematic == true){
			if(this.cine == 0){
				ctx.drawImage(this.drop,-10,-15);
			} else if(this.cine == 1){
				ctx.drawImage(this.attackE,-12,10);
			} else if(this.cine == 2){
				ctx.drawImage(this.fastFly,0,10);
			} else if(this.cine == 3){
				if(this.hit == true || this.hardHit == true){
					ctx.drawImage(this.injuredHit,-5,0);
					app.main.environment.powerUp = false;
					this.hurtBlasting = false;
					this.nukeCounter = 0;
					this.hurtBTimer = 0;
					if(this.stunCounter > 20 && this.hardHit == true){
						this.hardHit = false;
					} else if(this.stunCounter > 10 && this.hardHit == false){
						this.hit = false;
					}
				} else if(this.hurtBlasting == true && (this.hit == false && this.hardHit == false)){
					this.hurtBTimer++;
					//this.nukeCounter = 0;
					if(this.hurtBTimer < 10){
						if(this.hurtBTimer < 2){
							app.main.sound.playIntro(8);
						} else if(this.hurtBTimer < 5 && this.hurtBTimer > 3){
							app.main.sound.playTaunt5(Math.round(getRandom(22,23)));
						}
					} else if(this.hurtBTimer < 20){
						if(this.hurtBTimer < 11){
							app.main.sound.playEffect(27);
						}
						if((this.counter % 2) == 0){
							ctx.drawImage(this.blastCharge1,30,34,10,14);
						} else {
							ctx.drawImage(this.blastCharge1,28,31,15,21);
						}
					} else if(this.hurtBTimer < 21){
						app.main.roundScore2 += (150 + Math.round(getRandom(0,100)));
						app.main.environment.flash = true;
						app.main.environment.shake = true;
						app.main.environment.powerUp = true;
						app.main.sound.playEffect(64);
						app.main.environment.nuked = true;
						//app.main.environment.decay = true;
					} else if(this.hurtBTimer < 30){
						this.nukeCounter++;
						ctx.save();
						ctx.globalAlpha = .4;
						ctx.scale(1.5,.8);
						if(this.nukeCounter < 2){
							if(this.right == true){
								ctx.drawImage(this.nuke1,200,-222);
							} else {
								ctx.drawImage(this.nuke1,137,-222);
							}
						} else if(this.nukeCounter < 4){
							if(this.right == true){
								ctx.drawImage(this.nuke2,200,-222);
							} else {
								ctx.drawImage(this.nuke2,137,-222);
							}
						} else if(this.nukeCounter < 6){
							if(this.right == true){
								ctx.drawImage(this.nuke3,200,-222);
							} else {
								ctx.drawImage(this.nuke3,137,-222);
							}
						} else if(this.nukeCounter < 8){
							if(this.right == true){
								ctx.drawImage(this.nuke4,200,-222);
							} else {
								ctx.drawImage(this.nuke4,137,-222);
							}
						} else if(this.nukeCounter < 10){
							if(this.right == true){
								ctx.drawImage(this.nuke5,200,-222);
							} else {
								ctx.drawImage(this.nuke5,137,-222);
							}
						} else if(this.nukeCounter < 11){
							if(this.right == true){
								ctx.drawImage(this.nuke6,200,-222);
							} else {
								ctx.drawImage(this.nuke6,137,-222);
							}
							//console.log("NUKE");
						}
						ctx.restore();
					} else {
						app.main.environment.powerUp = false;
						this.hurtBlasting = false;
						this.nukeCounter = 0;
						this.hurtBTimer = 0;
					}
					
					ctx.drawImage(this.injuredBlast,-10,0);
				} else if(this.lookUp == true){
					ctx.drawImage(this.injuredUp,-5,0);
					this.stunCounter = 0;
				} else {
					this.stunCounter = 0;
					ctx.drawImage(this.injured,-5,0);
				}
			} else if(this.cine == 4){
				ctx.drawImage(this.injured2,-5,0);
			} else if(this.cine == 5){
				ctx.drawImage(this.block,0,5);
			} else if(this.cine == 6){
				ctx.drawImage(this.drop,-10,-15);
				if((this.counter % 2) == 0){
					ctx.drawImage(this.blastCharge1,-10,-25,10,14);
				} else {
					ctx.drawImage(this.blastCharge1,-13,-28,15,21);
				}
			} else if(this.cine == 7){
				ctx.drawImage(this.punchPrep,0,10);
			} else if(this.cine == 8){
				ctx.drawImage(this.special1,-13,0);
			} else if(this.cine == 9){
				ctx.drawImage(this.special2,-13,-2);
			} else if(this.cine == 10){
				ctx.drawImage(this.stanceUp,0,0);
			}
			
		} else if(this.velocity.x == 0 && this.attacking != true && this.blocking != true && this.taunting != true && this.hit == false && this.hardHit != true && this.end == false) {
			if((this.up == true && this.flying == true) || (this.jumpVelocity.y < 15 && this.air == true)){
				if(this.lookUp == true){
					ctx.drawImage(this.flyUpUp,-5,0);
				} else if(this.lookDown == true){
					ctx.drawImage(this.flyUpDown,-5,0);
				} else {
					ctx.drawImage(this.flyUp,-5,0);
				}
			} else if(this.down == true && this.air == true) {
				ctx.drawImage(this.flyDown,0,-15);
			} else if(this.down == false && this.air == true && this.up == false) {
				ctx.drawImage(this.flyDown,0,-15);
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
		} else if(this.velocity.x != 0 && this.attacking != true && this.blocking != true && this.hit == false && this.hardHit != true && this.end == false){ //&& (this.fallingKick == false || this.air == false)
			if(this.slow == true && this.reverse == false){
				ctx.drawImage(this.slowFly,0,0);
			} else if(this.fast == true && this.reverse == false){
				ctx.drawImage(this.fastFly,0,10);
			} else if(this.reverse == true){
				ctx.drawImage(this.moveReverse,0,0);
			} else if(this.air == true && this.up == false){
				ctx.drawImage(this.flyDown,0,-15);
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
			//app.main.chance3 = .2;
			//console.log(this.arms);
			if(this.counter < 3 && app.main.chance3 > .3){
				ctx.drawImage(this.punchPrep,0,10);
			} else if(this.counter < 3 && app.main.chance3 <= .3){
				ctx.drawImage(this.kickPrep,-25,5);
			} else if(this.counter < 6 && app.main.chance3 > .3){
				if(this.counter < 4){
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
					ctx.drawImage(this.rightPunch,0,10);
				} else if(this.arms == true){
					ctx.drawImage(this.leftPunch,0,8);
				}
			} else if(this.counter < 6 && app.main.chance3 <= .3){
				if(this.counter < 4){
					this.stamina += 4;
					this.basic = true;
				} else {
					this.basic = false;
				}
				ctx.drawImage(this.kick,5,3);
			} else if(app.main.chance3 > .3) {
				this.fight = false;
				this.attacking = false;
				this.basic = false;
				ctx.drawImage(this.punchPrep,0,10);
				app.main.aiChoice4 = Math.random();
				app.main.chance3 = Math.random();
				app.main.detected3 = false;
				this.counter = 0;
			} else if(app.main.chance3 <= .3) {
				this.fight = false;
				this.attacking = false;
				this.basic = false;
				ctx.drawImage(this.kick,5,3);
				app.main.aiChoice4 = Math.random();
				app.main.chance3 = Math.random();
				app.main.detected3 = false;
				this.counter = 0;
			} 
		//AIR BASIC ATTACK
		} else if(this.attacking == true && this.air == true && this.hit == false && this.down == false && this.intensify == false && this.blasting == false){
			this.randomEffect = Math.random();
			//app.main.chance3 = .4;
			//console.log(this.arms);
			if(this.counter < 3 && app.main.chance3 > .3){
				ctx.drawImage(this.punchPrep,0,10);
			} else if(this.counter < 3 && app.main.chance3 <= .3){
				ctx.drawImage(this.kickPrep,-25,5);
			} else if(this.counter < 6 && app.main.chance3 > .3){
				if(this.counter < 4){
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
					ctx.drawImage(this.rightPunch,0,10);
				} else if(this.arms == true){
					ctx.drawImage(this.leftPunch,0,8);
				}
			} else if(this.counter < 6 && app.main.chance3 <= .3){
				if(this.counter < 4){
					this.stamina += 4;
					this.basic = true;
				} else {
					this.basic = false;
				}
				ctx.drawImage(this.kick,5,3);
			} else if(app.main.chance3 > .3) {
				this.fight = false;
				this.attacking = false;
				this.basic = false;
				ctx.drawImage(this.punchPrep,0,10);
				app.main.aiChoice4 = Math.random();
				app.main.chance3 = Math.random();
				app.main.detected3 = false;
				this.counter = 0;
			} else if(app.main.chance3 <= .3) {
				this.fight = false;
				this.attacking = false;
				this.basic = false;
				ctx.drawImage(this.kick,5,3);
				app.main.aiChoice4 = Math.random();
				app.main.chance3 = Math.random();
				app.main.detected3 = false;
				this.counter = 0;
			} 
		//AIR HARD DROP KICK
		/*
		} else if(this.fallingKick == true && this.air == true && this.hit == false && this.stun == false){
			if(this.air == true){
				ctx.drawImage(this.fallKick,0,0);
			} else {
				ctx.drawImage(this.stance,0,0);
				this.fight = false;
				this.attacking = false;
			} */
		//HARD PUNCH AND KICK
		} else if(this.attacking == true && this.intensify == true && this.air == false && this.hit == false && this.down == false){
			this.randomEffect = Math.random();
			this.hard = true;
			//app.main.chance3 = .4;
			if(app.main.chance3 > 1){ //NO HARD PUNCH CURRENTLY
				if(this.counter < 3){
					//ctx.drawImage(this.hardPunchPrep,-15,28);
				} else if(this.counter < 4){
					this.stamina += 10;
					this.punching = true;
					//ctx.drawImage(this.hardPunch,-45,28);
				} else if(this.counter < 10){
					this.punching = false;
					//ctx.drawImage(this.hardPunch,-45,28);
				} else {
					//ctx.drawImage(this.hardPunch,-45,28);
					this.hard = false;
					this.fight = false;
					this.attacking = false;
					this.intensify = false;
					app.main.aiChoice4 = Math.random();
					app.main.chance3 = Math.random();
					this.counter = 0;
					app.main.detectedHard3 = false;
				} 
			} else if(app.main.chance3 > .5){
				if(this.counter < 3){
					ctx.drawImage(this.kickPrep,-25,5);
				} else if(this.counter < 4){
					this.stamina += 10;
					if(app.main.vegeta.blocking == false && app.main.vegeta.superSpeed == false){
						//app.main.vegeta.stun = true;
						app.main.vegeta.jumpVelocity = new Victor(0,-30);
						app.main.vegeta.air = true;
					}
					this.kicking = true;
					ctx.drawImage(this.launch,10,0);; //No swing
				} else if(this.counter < 10){
					this.kicking = false;
					ctx.drawImage(this.launch,10,0);
				} else {
					ctx.drawImage(this.launch,10,0);
					this.hard = false;
					this.fight = false;
					this.attacking = false;
					this.intensify = false;
					app.main.aiChoice4 = Math.random();
					app.main.chance3 = Math.random();
					this.counter = 0;
					app.main.detectedHard3 = false;
				}
			} else {
				if(this.counter < 3){
					ctx.drawImage(this.hardKickPrep,-5,5);
				} else if(this.counter < 4){
					this.stamina += 10;
					this.kicking = true;
					ctx.drawImage(this.hardKick,-10,5); //No swing
				} else if(this.counter < 10){
					this.kicking = false;
					ctx.drawImage(this.hardKick,-10,5);
				} else {
					ctx.drawImage(this.hardKick,-10,5);
					this.hard = false;
					this.fight = false;
					this.attacking = false;
					this.intensify = false;
					app.main.aiChoice4 = Math.random();
					app.main.chance3 = Math.random();
					this.counter = 0;
					app.main.detectedHard3 = false;
				} 
			}
		//AIR HARD PUNCH
		} else if(this.attacking == true && this.intensify == true && this.air == true && this.hit == false && this.down == false){
			this.randomEffect = Math.random();
			//app.main.chance3 = .6;
			this.hard = true;
			if(app.main.chance3 > .5){
				if(this.counter < 3){
					ctx.drawImage(this.hardKickPrep,0,10);
				} else if(this.counter < 4){
					this.stamina += 10;
					this.punching = true;
					ctx.drawImage(this.fallKick,0,0); //No swing (maybe tele lines)
				} else if(this.counter < 10){
					this.punching = false;
					ctx.drawImage(this.fallKick,0,0);
				} else {
					ctx.drawImage(this.fallKick,0,0);
					this.hard = false;
					this.fight = false;
					this.attacking = false;
					this.intensify = false;
					app.main.aiChoice4 = Math.random();
					app.main.chance3 = Math.random();
					this.counter = 0;
					app.main.detectedHard3 = false;
				} 
			} else {
				if(this.counter < 3){
					ctx.drawImage(this.hardKickPrep,-5,5);
				} else if(this.counter < 4){
					this.stamina += 10;
					this.kicking = true;
					ctx.drawImage(this.hardKick,-10,5); //No swing
				} else if(this.counter < 10){
					this.kicking = false;
					ctx.drawImage(this.hardKick,-10,5);
				} else {
					ctx.drawImage(this.hardKick,-10,5);
					this.hard = false;
					this.fight = false;
					this.attacking = false;
					this.intensify = false;
					app.main.aiChoice4 = Math.random();
					app.main.chance3 = Math.random();
					this.counter = 0;
					app.main.detectedHard3 = false;
				} 
			}	
		//BLAST ATTACK
		} else if(this.attacking == true && this.hit == false && this.intensify == false && this.powerMove == false){ //KEY CHANGE
			if(this.counter < 3){
				ctx.drawImage(this.flyUp,-4,0);
				if(this.arms == false){
					this.arms = true;
				} else if(this.arms == true){
					this.arms = false;
				}
			} else if(this.counter < 6){
				if(this.arms == false){
					if(this.counter < 4){
						app.main.sound.playEnergyAttack2(5);
						this.energy -= 2;
						if(this.left == true){
							app.main.blasts.push(new app.Energy(this.position.x,this.position.y + 30,this.left, 6, 0));
						} else {
							app.main.blasts.push(new app.Energy(this.position.x + 60,this.position.y + 30,this.left, 6, 0));
						}
					}
					ctx.drawImage(this.blast,0,-1);
				} else if(this.arms == true){
					if(this.counter < 4){
						app.main.sound.playEnergyAttack2(5);
						this.energy -= 2;
						if(this.left == true){
							app.main.blasts.push(new app.Energy(this.position.x,this.position.y + 30,this.left, 6, 0));
						} else {
							app.main.blasts.push(new app.Energy(this.position.x + 60,this.position.y + 30,this.left, 6, 0));
						}
					}
					ctx.drawImage(this.blast,0,-1);
					//console.log("RIGHT");
				}
			} else {
				ctx.drawImage(this.blast,0,-1);
				//ctx.drawImage(this.flyUp,-5,0);
				this.fight = false;
				this.attacking = false;
				this.blasting = false;
				app.main.aiChoice4 = Math.random();
				app.main.chance3 = Math.random();
				this.counter = 0;
			}
		//POWERFUL BLAST ATTACK
		} else if(this.powerMove == true && this.blasting == true && this.attacking == true && this.hit == false && this.fallingKick == false){
			//app.main.chance3 = .3;
			this.powerMove = true;
			app.main.chance3 = .4;
			if(app.main.chance3 > .5){
			if(this.counter < 3){
				ctx.drawImage(this.punchPrep,0,10);
				if(this.arms == false){
					this.arms = true;
				} else if(this.arms == true){
					this.arms = false;
				}
			} else if(this.counter < 5){
				ctx.drawImage(this.attackE,0,5);
			} else if(this.counter < 6){
				app.main.sound.playEnergyAttack(23);
				ctx.drawImage(this.attackE,0,5);
			} else if(this.counter < 7){
				ctx.drawImage(this.attackE,0,5);
				ctx.drawImage(this.blastCharge1,-32,23.5,5,7);
			} else if(this.counter < 8){
				ctx.drawImage(this.attackE,0,5);
				ctx.drawImage(this.blastCharge1,-37,20,10,14);
			} else if(this.counter < 9){
				ctx.drawImage(this.attackE,0,5);
				ctx.drawImage(this.blastCharge1,-42,16.5,15,21);
			} else if(this.counter < 10){
				ctx.drawImage(this.attackE,0,5);
				ctx.drawImage(this.blastCharge1,-47,13,20,28);
			} else if(this.counter < 11){
				ctx.drawImage(this.attackE,0,5);
				ctx.drawImage(this.blastCharge1,-52,9.5,25,35);
			} else if(this.counter < 12){
				ctx.drawImage(this.attackE,0,5);
				ctx.drawImage(this.blastCharge1,-52,9.5,25,35);
			} else if(this.counter < 13){
				ctx.drawImage(this.attackE,0,5);
			} else if(this.counter < 20){
				if(this.counter < 14){
					//console.log("TALKING");
					this.blastRelease = true;
					app.main.sound.playTaunt5(Math.round(getRandom(15,18)));
				}
				if(this.arms == false){
					if(this.counter < 14){
						app.main.sound.playEnergyAttack(24);
						this.energy -= 5;
						if(this.left == true){
							app.main.blasts.push(new app.Energy(this.position.x,this.position.y + 27,this.left, 6, 1));
						} else {
							app.main.blasts.push(new app.Energy(this.position.x + 60,this.position.y + 27,this.left, 6, 1));
						}
					}
					ctx.drawImage(this.attackE,0,5);
				} else if(this.arms == true){
					if(this.counter == 14){
						app.main.sound.playEnergyAttack(24);
						this.energy -= 5;
						if(this.left == true){
							app.main.blasts.push(new app.Energy(this.position.x,this.position.y + 27,this.left, 6, 1));
						} else {
							app.main.blasts.push(new app.Energy(this.position.x + 60,this.position.y + 27,this.left, 6, 1));
						}
					}
					ctx.drawImage(this.attackE,0,5);
				}
			} else {
				ctx.drawImage(this.punchPrep,0,10);
				app.main.aiChoice4 = Math.random();
				app.main.chance3 = Math.random();
				this.intensify = false;
				this.powerMove = false;
				this.fight = false;
				this.attacking = false;
				this.blasting = false;
				this.blastRelease = false;
			}
			} else { //FINGER BLAST
				if(this.counter < 3){
				ctx.drawImage(this.finger,0,5);
				if(this.arms == false){
					this.arms = true;
				} else if(this.arms == true){
					this.arms = false;
				}
			} else if(this.counter < 5){
				ctx.drawImage(this.finger,0,5);
			} else if(this.counter < 6){
				app.main.sound.playEnergyAttack(27);
				ctx.drawImage(this.finger,0,5);
			} else if(this.counter < 7){
				ctx.drawImage(this.finger,0,5);
				ctx.drawImage(this.blastCharge1,39,20,10,10);
			} else if(this.counter < 8){
				ctx.drawImage(this.finger,0,5);
				ctx.drawImage(this.blastCharge1,44,16.5,15,17);
			} else if(this.counter < 9){
				ctx.drawImage(this.finger,0,5);
				ctx.drawImage(this.blastCharge1,39,20,10,10);
			} else if(this.counter < 10){
				ctx.drawImage(this.finger,0,5);
				ctx.drawImage(this.blastCharge1,44,16.5,15,17);
			} else if(this.counter < 11){
				ctx.drawImage(this.finger,0,5);
				ctx.drawImage(this.blastCharge1,39,20,10,10);
			} else if(this.counter < 12){
				ctx.drawImage(this.finger,0,5);
				ctx.drawImage(this.blastCharge1,44,16.5,15,17);
			} else if(this.counter < 13){
				ctx.drawImage(this.finger,0,5);
				ctx.drawImage(this.blastCharge1,39,20,10,10);
			} else if(this.counter < 20){
				if(this.counter < 14){
					//console.log("TALKING");
					this.blastRelease = true;
					app.main.sound.playTaunt5(Math.round(getRandom(15,18)));
				}
				if(this.arms == false){
					if(this.counter < 14){
						app.main.sound.playEnergyAttack(1);
						this.energy -= 5;
						if(this.left == true){
							app.main.blasts.push(new app.Energy(this.position.x,this.position.y + 27,this.left, 6, 2));
						} else {
							app.main.blasts.push(new app.Energy(this.position.x + 60,this.position.y + 27,this.left, 6, 2));
						}
					}
					ctx.drawImage(this.finger,0,5);
				} else if(this.arms == true){
					if(this.counter < 14){
						app.main.sound.playEnergyAttack(1);
						this.energy -= 5;
						if(this.left == true){
							app.main.blasts.push(new app.Energy(this.position.x,this.position.y + 27,this.left, 6, 2));
						} else {
							app.main.blasts.push(new app.Energy(this.position.x + 60,this.position.y + 27,this.left, 6, 2));
						}
					}
					ctx.drawImage(this.finger,0,5);
				}
			} else {
				ctx.drawImage(this.finger,0,5);
				app.main.aiChoice4 = Math.random();
				app.main.chance3 = Math.random();
				this.intensify = false;
				this.powerMove = false;
				this.fight = false;
				this.attacking = false;
				this.blasting = false;
				this.counter = 0;
				this.blastRelease = false;
			}
			}
		//BLOCK
		} else if(this.blocking == true && this.hit == false && (this.stun == false || this.superSpeed == true) && this.fieldOn == false){
			ctx.drawImage(this.block,0,5);

		//FIELD
		} else if(this.blocking == true && this.fieldOn == true){
			if(this.counter < 50){
				this.fieldTimer++;
				if((this.counter %2) == 0){
					ctx.drawImage(this.useField1,-15,0);
				} else {
					ctx.drawImage(this.useField1,-15,0);
				}
				
				if(this.counter < 2){
					app.main.sound.playEnergyAttack(51);
				} else if(this.counter < 5 && this.counter > 3){
					app.main.sound.playTaunt5(Math.round(getRandom(19,21)));
				}
				
				ctx.save();
				ctx.translate(-12,5);
				if(this.counter < 5){
					ctx.globalAlpha = this.counter / 10;
					ctx.scale((((this.counter * 2)/10)),(((this.counter * 2)/10)));
					if(this.counter < 2){
						ctx.drawImage(this.fieldMain,35.2,-2);
					} else if(this.counter < 3){
						ctx.drawImage(this.fieldMain,-28.8,-3);
					} else if(this.counter < 4){
						ctx.drawImage(this.fieldMain,-38.4,-4);
					}
				} else {
					ctx.scale(.8,.8);
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
					ctx.drawImage(this.useField1,-15,0);
				} else {
					ctx.drawImage(this.useField1,-15,0);
				}
				this.fieldOn = false;
				this.blocking = false;
				this.stun = false;
				app.main.aiChoice4 = Math.random();
				app.main.chance3 = Math.random();
				this.counter = 0;
			}
		//TAUNT
		} else if(this.taunting == true && this.hit == false && this.hardHit != true){
			if(this.counter < 25){
				this.stun = true;
				ctx.drawImage(this.stance,0,0);
				if(this.counter > 19 && this.counter < 21){
					app.main.sound.playTaunt5(Math.round(this.tauntPick));
				}
			} else {
				ctx.drawImage(this.stance,0,0);
				//this.counter = 0;
				this.stamina = 28;
				this.stun = false;
				this.intensify = false;
				this.taunting = false;
				this.counter = 0;
			}
		//BASIC HIT
		} else if(this.hit == true && this.hardHit == false){
			if(this.stunCounter < 3){
				if(app.main.activeSupport == false){
					if(app.main.vegeta.attacking == true){
						app.main.roundScore2 -= 12;
					}
				} else {
					if(app.main.vegeta.attacking == true || app.main.support[0].attacking == true || app.main.support[1].attacking == true){
						app.main.roundScore2 -= 12;
					}
				}
				this.stun = true;
				ctx.drawImage(this.hit1,-10,0);
			} else {
				this.decisionTimer += 10;
				this.defBreak++;
				ctx.drawImage(this.hit1,-10,0);
				this.stun = false;
				this.hit = false; 
				this.counter = 0;
			}
		/*
		} else if(this.hardHit == true && this.hit == true){
			console.log("HITHITHITHITHITHTI");
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
		} else if(this.hardHit == true && this.hit == true && (this.air == false || this.blasted == true)){
			if(this.stunCounter < 22){
				this.voiceChance = Math.random();
				if(this.stunCounter < 2 && app.main.battle != 3 && this.voiceChance > .5){
					app.main.sound.playTaunt5(Math.round(getRandom(12,14)));
				} else if(this.stunCounter < 2 && app.main.battle == 3){
					app.main.sound.playTaunt2(Math.round(getRandom(9,11)));
				}
				if(app.main.activeSupport == false){
					if(app.main.vegeta.attacking == true){
						app.main.roundScore2 -= 4;
					}
				} else {
					if(app.main.vegeta.attacking == true || app.main.support[0].attacking == true || app.main.support[1].attacking == true){
						app.main.roundScore2 -= 4;
					}
				}
				this.stun = true;
				ctx.drawImage(this.hitHard,-15,2);
			} else {
				ctx.drawImage(this.hitHard,-15,2);
				this.decisionTimer += 10;
				this.stun = false;
				this.hardHit = false;
				this.hit = false; 
				this.blasted = false;
				this.counter = 0;
			}
		//HARD HIT AIR
		} else if(this.hardHit == true && this.hit == true && this.air == true){
			if(this.punched == true){
				if(this.stunCounter < 22){
				this.voiceChance = Math.random();
				if(this.stunCounter < 2 && this.voiceChance > .5){
					app.main.sound.playTaunt5(Math.round(getRandom(12,14)));
				}
				if(app.main.activeSupport == false){
					if(app.main.vegeta.attacking == true){
						app.main.roundScore2 -= 4;
					}
				} else {
					if(app.main.vegeta.attacking == true || app.main.support[0].attacking == true || app.main.support[1].attacking == true){
						app.main.roundScore2 -= 4;
					}
				}
					this.stun = true;
					ctx.drawImage(this.fallDown,-5,20);		
				} else {
					this.decisionTimer += 10;
					ctx.drawImage(this.fallDown,-5,20);
					this.stun = false;
					this.hardHit = false;
					this.hit = false; 
					this.counter = 0;
				}
			} else {
				if(this.stunCounter < 22){
				this.voiceChance = Math.random();
				if(this.stunCounter < 2 && this.voiceChance > .5){
					app.main.sound.playTaunt5(Math.round(getRandom(12,14)));
				}
				if(app.main.activeSupport == false){
					if(app.main.vegeta.attacking == true){
						app.main.roundScore2 -= 4;
					}
				} else {
					if(app.main.vegeta.attacking == true || app.main.support[0].attacking == true || app.main.support[1].attacking == true){
						app.main.roundScore2 -= 4;
					}
				}
					this.stun = true;
					ctx.drawImage(this.fallSide,0,20);
				} else {
					ctx.drawImage(this.fallSide,0,20);
					this.stun = false;
					this.hardHit = false;
					this.hit = false; 
					this.counter = 0;
				}
			}
		} else if(this.end == true){
				if(this.air == true){
					this.stun = true;
					ctx.drawImage(this.fallDown,-5,20);		
				} else {
					this.stun = true;
					ctx.drawImage(this.ground17,-15,70);
					/*
					if(this.stunCounter > 10){
						this.vanish = true;
						
						app.main.environment.deathVegetaDirLeft = this.left;
						app.main.environment.deathLocationVegeta = new Victor(this.position.x, this.position.y);
						
						this.dead = true;
					}
					*/
				}
		}
		
		}//end if
				
		//SUPER SPEED (TELEPORT) DRAW 
		if(this.superSpeed == true && this.appear == false){
			this.speedCounter++;
			ctx.save();
			//ctx.scale(1.2,1.2);
			if(this.counter < 4){
				if(this.counter < 2){
					app.main.sound.playSpecialReaction2(19);
				}
				if(this.speedCounter < 2){
					ctx.drawImage(this.teleport,-40,-5);
				} else if(this.speedCounter < 3){
					//blink
				} else {
					this.speedCounter = 0;
				}
			} else if(this.counter < 7){
				this.stun = true;
				this.vanish = true;
				if(this.speedCounter < 2){
					ctx.drawImage(this.teleport,-40,-5);
					ctx.drawImage(this.teleport,-40,-2);
				} else if(this.speedCounter < 3){
					//blink
				} else {
					this.speedCounter = 0;
				}
				
			} else if(this.counter < 8){
				this.speed();
			} else if(this.counter < 12){
				if(this.speedCounter < 2){
					ctx.drawImage(this.teleport,-40,-5);
					ctx.drawImage(this.teleport,-40,-2);
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
					ctx.drawImage(this.teleport,-40,-5);
				} else if(this.speedCounter < 3){
					//blink
				} else {
					this.speedCounter = 0;
				}
			} else {
				app.main.sound.playSpecialReaction2(20);
				this.stun = false;
				this.fight = false;
				app.main.aiChoice4 = Math.random();
				this.counter = 0;
				this.superSpeed = false;
			}
			ctx.restore();
		} 
		
		
		//SPECIAL SCENE VERSION OF SUPER SPEED
		if(this.appear == true && this.superSpeed == true){
				this.speedCounter++;
				ctx.save();
				//ctx.scale(1.2,1.2);
			if(this.counter < 5){
				if(this.speedCounter < 2){
					ctx.drawImage(this.teleport,-40,-5);
					ctx.drawImage(this.teleport,-40,-2);
				} else if(this.speedCounter < 3){
					//blink
				} else {
					this.speedCounter = 0;
				}
			} else if(this.counter < 8){
				this.vanish = false;
				if(this.speedCounter < 2){
					ctx.drawImage(this.teleport,-40,-5);
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
	
	
	return Android17; 
})(); //end IIFE