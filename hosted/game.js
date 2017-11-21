
"use strict";

var app = app || {};

app.Android17 = function () {

	function Android17(start, opponent) {

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
		this.hurtBRandom = Math.round(getRandom(250, 400));

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
		this.BUILDING = new Victor(650, 270);
		this.GROUND = new Victor(0, 620);
		this.SKY = new Victor(0, 220);
		this.SKYTOP = new Victor(0, 5);
		this.LEFTWALL = new Victor(0, 0);
		this.RIGHTWALL = new Victor(950, 0);
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
		this.jumpVelocity = new Victor(0, -15);
		this.jumpAccel = new Victor(0, -1);
		this.gravity = new Victor(0, 1.7);
		this.size = new Victor(50, 100);

		// IMAGE SETUP 

		// ---- 17 IMAGES ------------------

		var image = new Image();
		image.src = app.images17.stance;
		this.stance = image;

		image = new Image();
		image.src = app.images17.stanceUp;
		this.stanceUp = image;

		image = new Image();
		image.src = app.images17.stanceDown;
		this.stanceDown = image;

		image = new Image();
		image.src = app.images17.slowFly;
		this.slowFly = image;

		image = new Image();
		image.src = app.images17.fastFly;
		this.fastFly = image;

		image = new Image();
		image.src = app.images17.flyUp;
		this.flyUp = image;

		image = new Image();
		image.src = app.images17.flyUpUp;
		this.flyUpUp = image;

		image = new Image();
		image.src = app.images17.flyUpDown;
		this.flyUpDown = image;

		image = new Image();
		image.src = app.images17.flyDown;
		this.flyDown = image;

		image = new Image();
		image.src = app.images17.reverse;
		this.moveReverse = image;

		image = new Image();
		image.src = app.images17.leftPunch;
		this.leftPunch = image;

		image = new Image();
		image.src = app.images17.rightPunch;
		this.rightPunch = image;

		image = new Image();
		image.src = app.images17.punchPrep;
		this.punchPrep = image;

		image = new Image();
		image.src = app.images17.hit1;
		this.hit1 = image;

		image = new Image();
		image.src = app.images17.attackE;
		this.attackE = image;

		image = new Image();
		image.src = app.images17.hardKick;
		this.hardKick = image;

		image = new Image();
		image.src = app.images17.ground;
		this.ground17 = image;

		image = new Image();
		image.src = app.images17.fallSide;
		this.fallSide = image;

		image = new Image();
		image.src = app.images17.hardKickPrep;
		this.hardKickPrep = image;

		image = new Image();
		image.src = app.images17.hitHard;
		this.hitHard = image;

		image = new Image();
		image.src = app.images17.kick;
		this.kick = image;

		image = new Image();
		image.src = app.images17.kickPrep;
		this.kickPrep = image;

		image = new Image();
		image.src = app.images17.blast;
		this.blast = image;

		image = new Image();
		image.src = app.images17.block;
		this.block = image;

		image = new Image();
		image.src = app.images17.fallKick;
		this.fallKick = image;

		image = new Image();
		image.src = app.images17.fallDown;
		this.fallDown = image;

		image = new Image();
		image.src = app.images17.launch;
		this.launch = image;

		image = new Image();
		image.src = app.images17.finger;
		this.finger = image;

		image = new Image();
		image.src = app.images17.drop;
		this.drop = image;

		image = new Image();
		image.src = app.images17.injured;
		this.injured = image;

		image = new Image();
		image.src = app.images17.injuredUp;
		this.injuredUp = image;

		image = new Image();
		image.src = app.images17.injured2;
		this.injured2 = image;

		image = new Image();
		image.src = app.images17.injuredHit;
		this.injuredHit = image;

		image = new Image();
		image.src = app.images17.injuredBlast;
		this.injuredBlast = image;

		image = new Image();
		image.src = app.images17.field1;
		this.field1 = image;

		image = new Image();
		image.src = app.images17.special1;
		this.special1 = image;

		image = new Image();
		image.src = app.images17.special2;
		this.special2 = image;

		image = new Image();
		image.src = app.images17.field1;
		this.useField1 = image;

		//Attack IMAGES

		image = new Image();
		image.src = app.attack.blastCharge1;
		this.blastCharge1 = image;

		image = new Image();
		image.src = app.attack.tele4;
		this.teleport = image;

		image = new Image();
		image.src = app.attack.nuke1;
		this.nuke1 = image;

		image = new Image();
		image.src = app.attack.nuke2;
		this.nuke2 = image;

		image = new Image();
		image.src = app.attack.nuke3;
		this.nuke3 = image;

		image = new Image();
		image.src = app.attack.nuke4;
		this.nuke4 = image;

		image = new Image();
		image.src = app.attack.nuke5;
		this.nuke5 = image;

		image = new Image();
		image.src = app.attack.nuke6;
		this.nuke6 = image;

		image = new Image();
		image.src = app.attack.field1;
		this.field1 = image;

		image = new Image();
		image.src = app.attack.field2;
		this.field2 = image;

		image = new Image();
		image.src = app.attack.field3;
		this.field3 = image;

		image = new Image();
		image.src = app.attack.field4;
		this.field4 = image;

		image = new Image();
		image.src = app.attack.field5;
		this.field5 = image;

		image = new Image();
		image.src = app.attack.field6;
		this.field6 = image;

		image = new Image();
		image.src = app.attack.field7;
		this.field7 = image;

		image = new Image();
		image.src = app.attack.field8;
		this.field8 = image;

		image = new Image();
		image.src = app.attack.fieldMain;
		this.fieldMain = image;
	}

	//FUNCTION TO UPDATE MANY VALUES
	Android17.prototype.update = function () {

		if (app.main.scene == false && app.main.vegeta.gero == false) {
			//17 State changer
			if (this.decision >= .7) {
				this.evasion = true;
				this.wentEvasion = true;
				this.active = false;
				this.wentCity = false;
				this.wentEncounter = false;
			} else if (this.decision >= .3 && this.decision < .7) {
				this.encounter = true;
				if (this.wentEncounter == false) {
					app.main.sound.playTaunt5(Math.round(getRandom(0, 3)));
					this.wentEncounter = true;
				}
				this.wentCity = false;
				this.wentEvasion = false;
				this.active = true;
			} else if (this.decision >= 0 && this.decision < .3 && app.main.vegeta.piccolo != true && app.main.vegeta.gero != true) {
				this.active = false;
				if (this.wentCity == false) {
					app.main.sound.playTaunt5(Math.round(getRandom(4, 7)));
					app.main.sound.playSpecialReaction2(19);
					this.wentCity = true;
				}
				this.city = true;
				this.wentEncounter = false;
				this.wentEvasion = false;
			} else if (this.decision >= 0 && this.decision < .3 && (app.main.vegeta.piccolo == true || app.main.vegeta.gero == true)) {
				this.evasion = true;
				this.wentEvasion = true;
				this.active = false;
				this.wentCity = false;
				this.wentEncounter = false;
			}
		}

		//console.log("WENT CITY :" + this.wentCity + " WENT EVASION: " + this.wentEvasion + " WENT ENCOUNTER: " + this.wentEncounter);

		//console.log("CITY :" + this.city + " EVASION: " + this.evasion + " ENCOUNTER: " + this.encounter);

		if (this.city == true) {
			this.superSpeed = true;
			if (this.vanish == true) {
				this.gone = true;
			}
		}

		this.hurtBTrigger++;

		if (app.main.vegeta.gohan == true && app.main.vegeta.superForm == true && app.main.scene == false && this.hurtBTrigger > this.hurtBRandom) {
			this.hurtBlasting = true;
			this.hurtBTimer = 0;
			this.hurtBTrigger = 0;
			this.hurtBRandom = Math.round(getRandom(250, 400));
		}

		if (app.main.battle == 3 && app.main.scene == false) {
			this.velocity.x = 0;
			this.decel.x = 0;
			//this.position
		}

		//Look around
		if (this.position.y < app.main.vegeta.position.y - 150) {
			this.lookDown = true;
		} else if (this.position.y > app.main.vegeta.position.y + 150) {
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
		if (this.position.x < this.LEFTWALL.x + 10 && hardAttackHitTest(app.main.android17, app.main.vegeta) == false) {
			this.right = true;
			this.left = false;
		} else if (this.position.x > this.RIGHTWALL.x - 10 && hardAttackHitTest(app.main.android17, app.main.vegeta) == false) {
			this.right = false;
			this.left = true;
		}

		//CREATE BOUNDRIES
		if (this.position.y > this.GROUND.y) {
			this.prevX = this.position.x;
			this.position.copyY(this.GROUND);
			//this.jumpVelocity = new Victor(0,-15);
			this.velocity.divideScalar(3);
			this.ground = true;
			this.air = false;
			this.decend = false;
			if (this.end == true && this.vanish == false || this.jumpVelocity.y > 20 && this.hardHit == true) {
				app.main.environment.shake = true;
				this.fallDust = true;
				if (this.dead == false) {
					app.main.sound.playSpecialReaction2(2);
				}
			} else if (this.vanish == false && this.hover == false && (app.main.scene == false || app.main.sceneNum == 1)) {
				this.landDust = true;
				app.main.sound.playSpecialReaction2(3);
			}
		}
		if (this.position.y > this.BUILDING.y && this.aboveBuilding == true && this.down == false) {
			this.position.copyY(this.BUILDING);
			//this.jumpVelocity = new Victor(0,-15);
			this.velocity.divideScalar(3);
			this.ground = true;
			this.air = false;
			this.decend = false;
			if (this.end == true && this.vanish == false || this.jumpVelocity.y > 20 && this.hardHit == true) {
				app.main.environment.shake = true;
				if (this.dead == false) {
					app.main.sound.playSpecialReaction(2);
				}
			} else if (this.vanish == false && this.hover == false && (app.main.scene == false || app.main.sceneNum == 1)) {
				app.main.sound.playSpecialReaction(3);
			}
		}
		if (this.position.y < this.SKY.y) {
			this.aboveSky = true;
		} else {
			this.aboveSky = false;
		}
		if (this.position.y < this.SKYTOP.y) {
			this.position.copyY(this.SKYTOP);
			if (this.stun == false) {
				this.jumpVelocity = new Victor(0, 0);
			}
		}
		if (this.position.x < this.LEFTWALL.x) {
			this.position.copyX(this.LEFTWALL);
			this.decel = new Victor(0, 0);
			this.velocity = new Victor(0, 0);
		}
		if (this.position.x > this.RIGHTWALL.x) {
			this.position.copyX(this.RIGHTWALL);
			this.decel = new Victor(0, 0);
			this.velocity = new Victor(0, 0);
		}
		if (this.position.y < this.BUILDING.y && this.position.x > this.BUILDING.x && this.down == false) {
			this.aboveBuilding = true;
		}
		if (this.position.x < this.BUILDING.x && this.position.y < this.GROUND.y || this.position.y > this.BUILDING.y && this.position.y < this.GROUND.y) {
			this.air = true;
			this.aboveBuilding = false;
		}
		if (app.main.vegeta.air == true && this.vanish == true) {
			//bug fix
			this.flying = true;
			this.air = true;
			this.jumpVelocity.y = 0;
		}

		//GROUND CHECK
		if (this.ground == true) {
			if (this.stun == false && this.hardhit == false) {
				this.jumpVelocity = new Victor(0, 0);
			}
			if (this.up == true) {
				this.jumpVelocity = new Victor(0, -15);
			}

			if (this.air == true) {
				this.prevX = this.position.x;
				if (this.aboveBuilding == false) {
					this.flyDust = true;
				}
			}
		}

		//Field ON
		if (this.fieldOn == true) {

			this.energy -= .45;

			this.velocity.x = 0;
			this.decel.x = 0;

			if (this.position.y < app.main.vegeta.position.y + 150 && this.position.y > app.main.vegeta.position.y - 150) {
				if (this.position.x < app.main.vegeta.position.x + 150 && this.position.x > app.main.vegeta.position.x - 150) {
					if (app.main.vegeta.left == true) {
						if (this.behind == true && this.position.x > app.main.vegeta.position.x) {
							app.main.vegeta.velocity.x = -30;
						} else {
							app.main.vegeta.velocity.x = 30;
						}
						if (app.main.android17.active == true) {
							app.main.vegeta.focus17 = false;
						} else {
							app.main.aiChoice1 = 0;
							app.main.vegeta.defensive = true;
							app.main.vegeta.aggressive = false;
							app.main.aiReason = 3;
						}
					} else {
						if (this.behind == true && this.position.x < app.main.vegeta.position.x) {
							app.main.vegeta.velocity.x = 30;
						} else {
							app.main.vegeta.velocity.x = -30;
						}
						if (app.main.android17.active == true) {
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
		if (this.endurance < 100 && this.stun == false && this.end == false) {
			this.endurance += .2;
		}
		//Energy recovery (NO RECOVER ENERGY)
		if (this.energy < 100 && this.stun == false && this.end == false) {
			this.energy += .1;
		}
		//Stamina recovery
		if (this.stamina > 28 && this.stun == false && this.end == false && this.blocking == false || this.exhausted == true) {
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
		if (app.main.vegeta.attacking == false && this.blocking == true) {
			this.exhaustedCounter++;
			if (this.exhaustedCounter > 2) {
				this.blocking = false;
				app.main.aiChoice5 = 10;
				this.exhaustedCounter = 0;
			}
		}

		//hover smooth
		if (this.hover == true) {
			this.smoothTimer++;
			if (this.smoothTimer < 4) {
				this.position.y -= 1.5;
			} else if (this.smoothTimer < 8) {
				this.position.y += 1.5;
			} else {
				this.smoothTimer = 0;
			}
		} else {
			this.smoothTimer = 0;
		}

		//blast close push
		if (hardAttackHitTest(app.main.android17, app.main.vegeta) == true && app.main.vegeta.blasting == true && this.behind == false) {
			if (app.main.vegeta.left == true) {
				this.velocity.x -= 2;
			} else {
				this.velocity.x -= 2;
			}
		}

		//HOVER
		if (app.main.scene == false && app.main.gameState != app.main.GAME_STATE.TUTORIAL) {
			if (this.air == true && this.down == false && this.position.y > this.SKYTOP.y && this.up == false && this.hit == false && this.hardHit == false && this.end == false && app.main.vegeta.end == false && (hardAttackHitTest(app.main.android17, app.main.vegeta) && this.hardHit == false || this.blasting == true || this.powerMove == true || this.taunting == true || this.superSpeed == true || this.blocking == true || this.attacking == true)) {
				//Hover
				this.hoverCounter++;
				this.hover = true;
				if (hardAttackHitTest(app.main.android17, app.main.vegeta)) {
					if (this.hoverCounter < 5) {
						this.flying = false;
					} else {
						this.flying = true;
						this.hoverCounter = 0;
					}
				} else {
					if (this.hoverCounter < 6) {
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
		if (app.main.scene == true && app.main.battle == 0 && this.hover == true) {
			this.hoverCounter++;
			if (this.hoverCounter < 6) {
				this.flying = false;
			} else {
				this.flying = true;
				this.hoverCounter = 0;
			}
		}

		if (this.attacking == false && this.stun == false && this.fight == false && this.taunting == false && this.charging == false) {
			if (this.aiCounter > 1) {
				app.main.action = false;
			} else {
				this.aiCounter++;
			}
			//app.main.aiChoice = Math.random();
		}
		if (this.taunting == false) {
			this.tauntPick = getRandom(10, 16);
		}

		if (this.hit == true || this.hardHit == true) {
			this.blasting = false;
			this.powerMove = false;
			app.main.dodgeChance2 = Math.random();

			this.hurtBTrigger = 0; //Special
		}

		//Flight control
		if (this.flying == true && (this.stun == false && this.end == false || this.hover == true)) {
			if ((this.position.y == this.GROUND.y || this.position.y == this.BUILDING.y) && this.stun == false && this.hover == false && (app.main.scene == false || app.main.sceneNum == 5) && this.end == false && this.flySoundDelay > 10) {
				app.main.sound.playSpecialReaction(4);
				this.flySoundDelay = 0;
			}
			if (this.hover == true) {
				this.jumpVelocity = new Victor(0, -4);
			} else if (this.jumpVelocity.y > 0 && this.down == false) {
				this.jumpVelocity = new Victor(0, -8);
			}
			this.jumpVelocity.addY(this.jumpAccel);
			this.gravity.zero();
		} else if (this.decend == true) {
			this.gravity = new Victor(0, 8);
			this.velocity.multiplyScalar(1.3);
		} else {
			this.gravity = new Victor(0, 1.7);
		}

		if (this.air == true) {
			this.ground = false;
			this.jumpVelocity.addY(this.gravity);
			this.position.addY(this.jumpVelocity);
		}

		if (this.hardHit == true && this.air == true) {
			this.taunting = false;
			this.flying = false;
		} else if (this.hardHit == true && this.air == false && this.hit == false) {
			this.stun = false;
			this.hardHit = false;
		}

		if (this.hit == true || this.hardHit == true) {
			app.main.aiTaunting = false;
			app.main.aiCharging = false;
			this.blasting = false;
			this.taunting = false;
			this.charging = false;
			this.intensify = false;
		}

		this.decelerate(); //DECEL


		if (this.velocity.x < .1 && this.velocity.x > -.1 && this.hit == false) {
			this.velocity.zero();
		}

		//PUSH 
		if (app.main.vegeta.vanish == false && app.main.gameState != app.main.GAME_STATE.TUTORIAL && app.main.battle != 3) {
			if (hitTest(app.main.android17, app.main.vegeta) && this.behind == false) {
				if (app.main.vegeta.left == true) {
					this.position.x -= 10;
				} else {
					this.position.x += 10;
				}
			} else if (hitTest(app.main.android17, app.main.vegeta) && this.behind == true) {
				if (app.main.vegeta.left == true) {
					this.position.x += 10;
				} else {
					this.position.x -= 10;
				}
			}
		}

		if (app.main.battle == 3 && this.hardHit == true) {
			this.ouchCounter++;
			if (this.ouchCounter < 2) {
				app.main.sound.playTaunt5(Math.round(getRandom(9, 11)));
			} else if (this.ouchCounter < 20) {} else {
				this.hardHit = false;
				this.ouchCounter = 0;
			}
		}

		if (this.basic == true && attackHitTest(app.main.android17, app.main.vegeta) != true) {
			app.main.sound.playBasicReaction2(Math.round(getRandom(61, 63)));
		}

		//Mute Voice
		/* if(this.hit == true){
  	app.main.sound.pauseVoice5();
  } */

		//Varible resets
		if (this.attacking == false && this.fight == false && this.superSpeed == false && this.blasting == false && this.powerMove == false && this.hit == false && this.hardHit == false && this.charging == false && this.taunting == false && this.stun == false && this.end == false) {
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
		if (this.stun == false) {
			this.stunCounter = 0;
		}

		/*
  if(this.attacking == true && this.superSpeed == true && this.speedCounter > 1) { //AI FIX FOR 17
  	this.superSpeed = false;
  } */

		//Checks for behind
		if (this.left == true && app.main.vegeta.left == true && this.position.x > app.main.vegeta.position.x) {
			this.behind = true;
		} else if (this.left == false && app.main.vegeta.left == false && this.position.x < app.main.vegeta.position.x) {
			this.behind = true;
		} else {
			this.behind = false;
		}

		if (this.position.x > 690) {
			this.byBuilding = true;
		} else {
			this.byBuilding = false;
		}

		if (app.main.gameState == app.main.GAME_STATE.TUTORIAL) {
			this.BUILDING = new Victor(0, 135);
		} else {
			if (app.main.environment.buildingActive == true) {
				this.BUILDING = new Victor(650, 250);
			} else {
				this.BUILDING = new Victor(650, -1250);
			}
		}
	};

	//Starts a jump/flight
	Android17.prototype.jump = function () {
		this.air = true;
	};

	//BEGIN SUPER SPEED
	Android17.prototype.speed = function () {
		this.energy -= 5;
		if (app.main.vegeta.left == true && app.main.gameState == app.main.GAME_STATE.TUTORIAL) {
			if (app.main.vegeta.aboveBuilding == false) {
				this.aboveBuilding = false;
			}
			this.position.x = app.main.vegeta.position.x + 50;
			this.position.y = app.main.vegeta.position.y;
		} else if (app.main.vegeta.right == true && app.main.gameState == app.main.GAME_STATE.TUTORIAL) {
			if (app.main.vegeta.aboveBuilding == false) {
				this.aboveBuilding = false;
			}
			this.position.x = app.main.vegeta.position.x - 50;
			this.position.y = app.main.vegeta.position.y;
		} else if (this.position.x - 120 <= this.LEFTWALL.x && this.evasion == true && app.main.gameState != app.main.GAME_STATE.TUTORIAL) {
			this.position.x = this.RIGHTWALL.x;
		} else if (this.position.x + 120 >= this.RIGHTWALL.x && this.evasion == true && app.main.gameState != app.main.GAME_STATE.TUTORIAL) {
			this.position.x = this.LEFTWALL.x;
		} else if (this.left == true && (app.main.vegeta.position.x < this.LEFTWALL.x + 50 && this.reverse == false || app.main.gameState == app.main.GAME_STATE.TUTORIAL)) {
			if (app.main.vegeta.aboveBuilding == false) {
				this.aboveBuilding = false;
			}
			this.position.x = app.main.vegeta.position.x + 50;
			this.position.y = app.main.vegeta.position.y;
		} else if (this.right == true && (app.main.vegeta.position.x > this.RIGHTWALL.x - 50 && this.reverse == false || app.main.gameState == app.main.GAME_STATE.TUTORIAL)) {
			if (app.main.vegeta.aboveBuilding == false) {
				this.aboveBuilding = false;
			}
			this.position.x = app.main.vegeta.position.x - 50;
			this.position.y = app.main.vegeta.position.y;
		} else if (this.left == true && this.reverse == true) {
			this.position.x = this.RIGHTWALL.x;
		} else if (this.right == true && this.reverse == true) {
			this.position.x = this.LEFTWALL.x;
		} else if (this.left == true) {
			if (app.main.vegeta.aboveBuilding == false) {
				this.aboveBuilding = false;
			}
			this.position.x = app.main.vegeta.position.x - 50;
			this.position.y = app.main.vegeta.position.y;
		} else if (this.right == true) {
			if (app.main.vegeta.aboveBuilding == false) {
				this.aboveBuilding = false;
			}
			this.position.x = app.main.vegeta.position.x + 50;
			this.position.y = app.main.vegeta.position.y;
		}
	};

	//MOVE TO THE RIGHT
	Android17.prototype.moveRight = function () {
		//console.log("17 movingRight");
		this.movingRight = true;
		this.movingLeft = false;
		this.velocity.addX(this.accel);
		this.velocity.limit(25, .80);
		this.decel = this.velocity.clone();
		this.position.addX(this.velocity);
	};

	//MOVE TO THE LEFT
	Android17.prototype.moveLeft = function () {
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
	Android17.prototype.decelerate = function () {
		if (this.decel.x < 2 && this.decel.x > -2) {
			this.decel.zero();
		}

		if (this.air == false && this.blasting == false) {
			this.velocity = this.decel.clone();
			this.decel.multiplyScalar(.82);
			this.position.addX(this.decel);
		} else if (this.air == true && this.blasting == false) {
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
	Android17.prototype.draw = function (ctx) {

		this.counter++;
		this.stunCounter++;

		if (this.movingLeft == true) {
			if (this.velocity.x < 0 && this.velocity.x > -20) {
				this.slow = true;
				this.fast = false;
			} else if (this.velocity.x < -20) {
				this.fast = true;
				this.slow = false;
			} else if (this.velocity.x >= 0) {
				this.fast = false;
				this.slow = false;
			}
		}
		if (this.movingRight == true) {
			if (this.velocity.x > 0 && this.velocity.x < 20) {
				this.slow = true;
				this.fast = false;
			} else if (this.velocity.x > 20) {
				this.fast = true;
				this.slow = false;
			} else if (this.velocity.x <= 0) {
				this.fast = false;
				this.slow = false;
			}
		}

		ctx.save();

		//FLIPPING
		if (this.left == true) {
			ctx.translate(this.position.x + 40, this.position.y + 5);
			this.attackPosition.x = this.position.x - 30;
			this.attackPosition.y = this.position.y + 20;
			this.hardAttackPosition.x = this.position.x - 60;
			this.hardAttackPosition.y = this.position.y + 20;
			ctx.scale(-1.5, 1.5);
			if (this.movingRight = true && this.movingLeft == false) {
				this.reverse = true;
			} else {
				this.reverse = false;
			}
		} else if (this.right == true) {
			ctx.translate(this.position.x + 7, this.position.y + 5);
			this.attackPosition.x = this.position.x + 50;
			this.attackPosition.y = this.position.y + 20;
			this.hardAttackPosition.x = this.position.x + 80;
			this.hardAttackPosition.y = this.position.y + 20;
			ctx.scale(1.5, 1.5);
			if (this.movingLeft = true && this.movingRight == false) {
				this.reverse = true;
			} else {
				this.reverse = false;
			}
		}

		// ------------ DRAWS FOR ANDROID17 ------------------------------------------
		// ------------ DRAWS FOR ANDROID17 ------------------------------------------
		// ------------ DRAWS FOR ANDROID17 ------------------------------------------

		if (this.vanish == false) {
			//NON MOVING DRAWS
			if (this.cinematic == true) {
				if (this.cine == 0) {
					ctx.drawImage(this.drop, -10, -15);
				} else if (this.cine == 1) {
					ctx.drawImage(this.attackE, -12, 10);
				} else if (this.cine == 2) {
					ctx.drawImage(this.fastFly, 0, 10);
				} else if (this.cine == 3) {
					if (this.hit == true || this.hardHit == true) {
						ctx.drawImage(this.injuredHit, -5, 0);
						app.main.environment.powerUp = false;
						this.hurtBlasting = false;
						this.nukeCounter = 0;
						this.hurtBTimer = 0;
						if (this.stunCounter > 20 && this.hardHit == true) {
							this.hardHit = false;
						} else if (this.stunCounter > 10 && this.hardHit == false) {
							this.hit = false;
						}
					} else if (this.hurtBlasting == true && this.hit == false && this.hardHit == false) {
						this.hurtBTimer++;
						//this.nukeCounter = 0;
						if (this.hurtBTimer < 10) {
							if (this.hurtBTimer < 2) {
								app.main.sound.playIntro(8);
							} else if (this.hurtBTimer < 5 && this.hurtBTimer > 3) {
								app.main.sound.playTaunt5(Math.round(getRandom(22, 23)));
							}
						} else if (this.hurtBTimer < 20) {
							if (this.hurtBTimer < 11) {
								app.main.sound.playEffect(27);
							}
							if (this.counter % 2 == 0) {
								ctx.drawImage(this.blastCharge1, 30, 34, 10, 14);
							} else {
								ctx.drawImage(this.blastCharge1, 28, 31, 15, 21);
							}
						} else if (this.hurtBTimer < 21) {
							app.main.roundScore2 += 150 + Math.round(getRandom(0, 100));
							app.main.environment.flash = true;
							app.main.environment.shake = true;
							app.main.environment.powerUp = true;
							app.main.sound.playEffect(64);
							app.main.environment.nuked = true;
							//app.main.environment.decay = true;
						} else if (this.hurtBTimer < 30) {
							this.nukeCounter++;
							ctx.save();
							ctx.globalAlpha = .4;
							ctx.scale(1.5, .8);
							if (this.nukeCounter < 2) {
								if (this.right == true) {
									ctx.drawImage(this.nuke1, 200, -222);
								} else {
									ctx.drawImage(this.nuke1, 137, -222);
								}
							} else if (this.nukeCounter < 4) {
								if (this.right == true) {
									ctx.drawImage(this.nuke2, 200, -222);
								} else {
									ctx.drawImage(this.nuke2, 137, -222);
								}
							} else if (this.nukeCounter < 6) {
								if (this.right == true) {
									ctx.drawImage(this.nuke3, 200, -222);
								} else {
									ctx.drawImage(this.nuke3, 137, -222);
								}
							} else if (this.nukeCounter < 8) {
								if (this.right == true) {
									ctx.drawImage(this.nuke4, 200, -222);
								} else {
									ctx.drawImage(this.nuke4, 137, -222);
								}
							} else if (this.nukeCounter < 10) {
								if (this.right == true) {
									ctx.drawImage(this.nuke5, 200, -222);
								} else {
									ctx.drawImage(this.nuke5, 137, -222);
								}
							} else if (this.nukeCounter < 11) {
								if (this.right == true) {
									ctx.drawImage(this.nuke6, 200, -222);
								} else {
									ctx.drawImage(this.nuke6, 137, -222);
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

						ctx.drawImage(this.injuredBlast, -10, 0);
					} else if (this.lookUp == true) {
						ctx.drawImage(this.injuredUp, -5, 0);
						this.stunCounter = 0;
					} else {
						this.stunCounter = 0;
						ctx.drawImage(this.injured, -5, 0);
					}
				} else if (this.cine == 4) {
					ctx.drawImage(this.injured2, -5, 0);
				} else if (this.cine == 5) {
					ctx.drawImage(this.block, 0, 5);
				} else if (this.cine == 6) {
					ctx.drawImage(this.drop, -10, -15);
					if (this.counter % 2 == 0) {
						ctx.drawImage(this.blastCharge1, -10, -25, 10, 14);
					} else {
						ctx.drawImage(this.blastCharge1, -13, -28, 15, 21);
					}
				} else if (this.cine == 7) {
					ctx.drawImage(this.punchPrep, 0, 10);
				} else if (this.cine == 8) {
					ctx.drawImage(this.special1, -13, 0);
				} else if (this.cine == 9) {
					ctx.drawImage(this.special2, -13, -2);
				} else if (this.cine == 10) {
					ctx.drawImage(this.stanceUp, 0, 0);
				}
			} else if (this.velocity.x == 0 && this.attacking != true && this.blocking != true && this.taunting != true && this.hit == false && this.hardHit != true && this.end == false) {
				if (this.up == true && this.flying == true || this.jumpVelocity.y < 15 && this.air == true) {
					if (this.lookUp == true) {
						ctx.drawImage(this.flyUpUp, -5, 0);
					} else if (this.lookDown == true) {
						ctx.drawImage(this.flyUpDown, -5, 0);
					} else {
						ctx.drawImage(this.flyUp, -5, 0);
					}
				} else if (this.down == true && this.air == true) {
					ctx.drawImage(this.flyDown, 0, -15);
				} else if (this.down == false && this.air == true && this.up == false) {
					ctx.drawImage(this.flyDown, 0, -15);
				} else {
					if (this.lookUp == true) {
						ctx.drawImage(this.stanceUp, 0, 0);
					} else if (this.lookDown == true) {
						ctx.drawImage(this.stanceDown, 0, 0);
					} else {
						ctx.drawImage(this.stance, 0, 0);
					}
				}
				//MOVING DRAWS
			} else if (this.velocity.x != 0 && this.attacking != true && this.blocking != true && this.hit == false && this.hardHit != true && this.end == false) {
				//&& (this.fallingKick == false || this.air == false)
				if (this.slow == true && this.reverse == false) {
					ctx.drawImage(this.slowFly, 0, 0);
				} else if (this.fast == true && this.reverse == false) {
					ctx.drawImage(this.fastFly, 0, 10);
				} else if (this.reverse == true) {
					ctx.drawImage(this.moveReverse, 0, 0);
				} else if (this.air == true && this.up == false) {
					ctx.drawImage(this.flyDown, 0, -15);
				} else {
					if (this.lookUp == true) {
						ctx.drawImage(this.stanceUp, 0, 0);
					} else if (this.lookDown == true) {
						ctx.drawImage(this.stanceDown, 0, 0);
					} else {
						ctx.drawImage(this.stance, 0, 0);
					}
				}
				//BASIC ATTACK
			} else if (this.attacking == true && this.air == false && this.hit == false && this.blasting == false && this.intensify == false) {
				this.randomEffect = Math.random();
				//app.main.chance3 = .2;
				//console.log(this.arms);
				if (this.counter < 3 && app.main.chance3 > .3) {
					ctx.drawImage(this.punchPrep, 0, 10);
				} else if (this.counter < 3 && app.main.chance3 <= .3) {
					ctx.drawImage(this.kickPrep, -25, 5);
				} else if (this.counter < 6 && app.main.chance3 > .3) {
					if (this.counter < 4) {
						this.stamina += 4;
						this.basic = true;
						if (this.arms == false) {
							this.arms = true;
						} else if (this.arms == true) {
							this.arms = false;
						}
					} else {
						this.basic = false;
					}
					if (this.arms == false) {
						ctx.drawImage(this.rightPunch, 0, 10);
					} else if (this.arms == true) {
						ctx.drawImage(this.leftPunch, 0, 8);
					}
				} else if (this.counter < 6 && app.main.chance3 <= .3) {
					if (this.counter < 4) {
						this.stamina += 4;
						this.basic = true;
					} else {
						this.basic = false;
					}
					ctx.drawImage(this.kick, 5, 3);
				} else if (app.main.chance3 > .3) {
					this.fight = false;
					this.attacking = false;
					this.basic = false;
					ctx.drawImage(this.punchPrep, 0, 10);
					app.main.aiChoice4 = Math.random();
					app.main.chance3 = Math.random();
					app.main.detected3 = false;
					this.counter = 0;
				} else if (app.main.chance3 <= .3) {
					this.fight = false;
					this.attacking = false;
					this.basic = false;
					ctx.drawImage(this.kick, 5, 3);
					app.main.aiChoice4 = Math.random();
					app.main.chance3 = Math.random();
					app.main.detected3 = false;
					this.counter = 0;
				}
				//AIR BASIC ATTACK
			} else if (this.attacking == true && this.air == true && this.hit == false && this.down == false && this.intensify == false && this.blasting == false) {
				this.randomEffect = Math.random();
				//app.main.chance3 = .4;
				//console.log(this.arms);
				if (this.counter < 3 && app.main.chance3 > .3) {
					ctx.drawImage(this.punchPrep, 0, 10);
				} else if (this.counter < 3 && app.main.chance3 <= .3) {
					ctx.drawImage(this.kickPrep, -25, 5);
				} else if (this.counter < 6 && app.main.chance3 > .3) {
					if (this.counter < 4) {
						this.stamina += 4;
						this.basic = true;
						if (this.arms == false) {
							this.arms = true;
						} else if (this.arms == true) {
							this.arms = false;
						}
					} else {
						this.basic = false;
					}
					if (this.arms == false) {
						ctx.drawImage(this.rightPunch, 0, 10);
					} else if (this.arms == true) {
						ctx.drawImage(this.leftPunch, 0, 8);
					}
				} else if (this.counter < 6 && app.main.chance3 <= .3) {
					if (this.counter < 4) {
						this.stamina += 4;
						this.basic = true;
					} else {
						this.basic = false;
					}
					ctx.drawImage(this.kick, 5, 3);
				} else if (app.main.chance3 > .3) {
					this.fight = false;
					this.attacking = false;
					this.basic = false;
					ctx.drawImage(this.punchPrep, 0, 10);
					app.main.aiChoice4 = Math.random();
					app.main.chance3 = Math.random();
					app.main.detected3 = false;
					this.counter = 0;
				} else if (app.main.chance3 <= .3) {
					this.fight = false;
					this.attacking = false;
					this.basic = false;
					ctx.drawImage(this.kick, 5, 3);
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
			} else if (this.attacking == true && this.intensify == true && this.air == false && this.hit == false && this.down == false) {
				this.randomEffect = Math.random();
				this.hard = true;
				//app.main.chance3 = .4;
				if (app.main.chance3 > 1) {
					//NO HARD PUNCH CURRENTLY
					if (this.counter < 3) {
						//ctx.drawImage(this.hardPunchPrep,-15,28);
					} else if (this.counter < 4) {
						this.stamina += 10;
						this.punching = true;
						//ctx.drawImage(this.hardPunch,-45,28);
					} else if (this.counter < 10) {
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
				} else if (app.main.chance3 > .5) {
					if (this.counter < 3) {
						ctx.drawImage(this.kickPrep, -25, 5);
					} else if (this.counter < 4) {
						this.stamina += 10;
						if (app.main.vegeta.blocking == false && app.main.vegeta.superSpeed == false) {
							//app.main.vegeta.stun = true;
							app.main.vegeta.jumpVelocity = new Victor(0, -30);
							app.main.vegeta.air = true;
						}
						this.kicking = true;
						ctx.drawImage(this.launch, 10, 0);; //No swing
					} else if (this.counter < 10) {
						this.kicking = false;
						ctx.drawImage(this.launch, 10, 0);
					} else {
						ctx.drawImage(this.launch, 10, 0);
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
					if (this.counter < 3) {
						ctx.drawImage(this.hardKickPrep, -5, 5);
					} else if (this.counter < 4) {
						this.stamina += 10;
						this.kicking = true;
						ctx.drawImage(this.hardKick, -10, 5); //No swing
					} else if (this.counter < 10) {
						this.kicking = false;
						ctx.drawImage(this.hardKick, -10, 5);
					} else {
						ctx.drawImage(this.hardKick, -10, 5);
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
			} else if (this.attacking == true && this.intensify == true && this.air == true && this.hit == false && this.down == false) {
				this.randomEffect = Math.random();
				//app.main.chance3 = .6;
				this.hard = true;
				if (app.main.chance3 > .5) {
					if (this.counter < 3) {
						ctx.drawImage(this.hardKickPrep, 0, 10);
					} else if (this.counter < 4) {
						this.stamina += 10;
						this.punching = true;
						ctx.drawImage(this.fallKick, 0, 0); //No swing (maybe tele lines)
					} else if (this.counter < 10) {
						this.punching = false;
						ctx.drawImage(this.fallKick, 0, 0);
					} else {
						ctx.drawImage(this.fallKick, 0, 0);
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
					if (this.counter < 3) {
						ctx.drawImage(this.hardKickPrep, -5, 5);
					} else if (this.counter < 4) {
						this.stamina += 10;
						this.kicking = true;
						ctx.drawImage(this.hardKick, -10, 5); //No swing
					} else if (this.counter < 10) {
						this.kicking = false;
						ctx.drawImage(this.hardKick, -10, 5);
					} else {
						ctx.drawImage(this.hardKick, -10, 5);
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
			} else if (this.attacking == true && this.hit == false && this.intensify == false && this.powerMove == false) {
				//KEY CHANGE
				if (this.counter < 3) {
					ctx.drawImage(this.flyUp, -4, 0);
					if (this.arms == false) {
						this.arms = true;
					} else if (this.arms == true) {
						this.arms = false;
					}
				} else if (this.counter < 6) {
					if (this.arms == false) {
						if (this.counter < 4) {
							app.main.sound.playEnergyAttack2(5);
							this.energy -= 2;
							if (this.left == true) {
								app.main.blasts.push(new app.Energy(this.position.x, this.position.y + 30, this.left, 6, 0));
							} else {
								app.main.blasts.push(new app.Energy(this.position.x + 60, this.position.y + 30, this.left, 6, 0));
							}
						}
						ctx.drawImage(this.blast, 0, -1);
					} else if (this.arms == true) {
						if (this.counter < 4) {
							app.main.sound.playEnergyAttack2(5);
							this.energy -= 2;
							if (this.left == true) {
								app.main.blasts.push(new app.Energy(this.position.x, this.position.y + 30, this.left, 6, 0));
							} else {
								app.main.blasts.push(new app.Energy(this.position.x + 60, this.position.y + 30, this.left, 6, 0));
							}
						}
						ctx.drawImage(this.blast, 0, -1);
						//console.log("RIGHT");
					}
				} else {
					ctx.drawImage(this.blast, 0, -1);
					//ctx.drawImage(this.flyUp,-5,0);
					this.fight = false;
					this.attacking = false;
					this.blasting = false;
					app.main.aiChoice4 = Math.random();
					app.main.chance3 = Math.random();
					this.counter = 0;
				}
				//POWERFUL BLAST ATTACK
			} else if (this.powerMove == true && this.blasting == true && this.attacking == true && this.hit == false && this.fallingKick == false) {
				//app.main.chance3 = .3;
				this.powerMove = true;
				app.main.chance3 = .4;
				if (app.main.chance3 > .5) {
					if (this.counter < 3) {
						ctx.drawImage(this.punchPrep, 0, 10);
						if (this.arms == false) {
							this.arms = true;
						} else if (this.arms == true) {
							this.arms = false;
						}
					} else if (this.counter < 5) {
						ctx.drawImage(this.attackE, 0, 5);
					} else if (this.counter < 6) {
						app.main.sound.playEnergyAttack(23);
						ctx.drawImage(this.attackE, 0, 5);
					} else if (this.counter < 7) {
						ctx.drawImage(this.attackE, 0, 5);
						ctx.drawImage(this.blastCharge1, -32, 23.5, 5, 7);
					} else if (this.counter < 8) {
						ctx.drawImage(this.attackE, 0, 5);
						ctx.drawImage(this.blastCharge1, -37, 20, 10, 14);
					} else if (this.counter < 9) {
						ctx.drawImage(this.attackE, 0, 5);
						ctx.drawImage(this.blastCharge1, -42, 16.5, 15, 21);
					} else if (this.counter < 10) {
						ctx.drawImage(this.attackE, 0, 5);
						ctx.drawImage(this.blastCharge1, -47, 13, 20, 28);
					} else if (this.counter < 11) {
						ctx.drawImage(this.attackE, 0, 5);
						ctx.drawImage(this.blastCharge1, -52, 9.5, 25, 35);
					} else if (this.counter < 12) {
						ctx.drawImage(this.attackE, 0, 5);
						ctx.drawImage(this.blastCharge1, -52, 9.5, 25, 35);
					} else if (this.counter < 13) {
						ctx.drawImage(this.attackE, 0, 5);
					} else if (this.counter < 20) {
						if (this.counter < 14) {
							//console.log("TALKING");
							this.blastRelease = true;
							app.main.sound.playTaunt5(Math.round(getRandom(15, 18)));
						}
						if (this.arms == false) {
							if (this.counter < 14) {
								app.main.sound.playEnergyAttack(24);
								this.energy -= 5;
								if (this.left == true) {
									app.main.blasts.push(new app.Energy(this.position.x, this.position.y + 27, this.left, 6, 1));
								} else {
									app.main.blasts.push(new app.Energy(this.position.x + 60, this.position.y + 27, this.left, 6, 1));
								}
							}
							ctx.drawImage(this.attackE, 0, 5);
						} else if (this.arms == true) {
							if (this.counter == 14) {
								app.main.sound.playEnergyAttack(24);
								this.energy -= 5;
								if (this.left == true) {
									app.main.blasts.push(new app.Energy(this.position.x, this.position.y + 27, this.left, 6, 1));
								} else {
									app.main.blasts.push(new app.Energy(this.position.x + 60, this.position.y + 27, this.left, 6, 1));
								}
							}
							ctx.drawImage(this.attackE, 0, 5);
						}
					} else {
						ctx.drawImage(this.punchPrep, 0, 10);
						app.main.aiChoice4 = Math.random();
						app.main.chance3 = Math.random();
						this.intensify = false;
						this.powerMove = false;
						this.fight = false;
						this.attacking = false;
						this.blasting = false;
						this.blastRelease = false;
					}
				} else {
					//FINGER BLAST
					if (this.counter < 3) {
						ctx.drawImage(this.finger, 0, 5);
						if (this.arms == false) {
							this.arms = true;
						} else if (this.arms == true) {
							this.arms = false;
						}
					} else if (this.counter < 5) {
						ctx.drawImage(this.finger, 0, 5);
					} else if (this.counter < 6) {
						app.main.sound.playEnergyAttack(27);
						ctx.drawImage(this.finger, 0, 5);
					} else if (this.counter < 7) {
						ctx.drawImage(this.finger, 0, 5);
						ctx.drawImage(this.blastCharge1, 39, 20, 10, 10);
					} else if (this.counter < 8) {
						ctx.drawImage(this.finger, 0, 5);
						ctx.drawImage(this.blastCharge1, 44, 16.5, 15, 17);
					} else if (this.counter < 9) {
						ctx.drawImage(this.finger, 0, 5);
						ctx.drawImage(this.blastCharge1, 39, 20, 10, 10);
					} else if (this.counter < 10) {
						ctx.drawImage(this.finger, 0, 5);
						ctx.drawImage(this.blastCharge1, 44, 16.5, 15, 17);
					} else if (this.counter < 11) {
						ctx.drawImage(this.finger, 0, 5);
						ctx.drawImage(this.blastCharge1, 39, 20, 10, 10);
					} else if (this.counter < 12) {
						ctx.drawImage(this.finger, 0, 5);
						ctx.drawImage(this.blastCharge1, 44, 16.5, 15, 17);
					} else if (this.counter < 13) {
						ctx.drawImage(this.finger, 0, 5);
						ctx.drawImage(this.blastCharge1, 39, 20, 10, 10);
					} else if (this.counter < 20) {
						if (this.counter < 14) {
							//console.log("TALKING");
							this.blastRelease = true;
							app.main.sound.playTaunt5(Math.round(getRandom(15, 18)));
						}
						if (this.arms == false) {
							if (this.counter < 14) {
								app.main.sound.playEnergyAttack(1);
								this.energy -= 5;
								if (this.left == true) {
									app.main.blasts.push(new app.Energy(this.position.x, this.position.y + 27, this.left, 6, 2));
								} else {
									app.main.blasts.push(new app.Energy(this.position.x + 60, this.position.y + 27, this.left, 6, 2));
								}
							}
							ctx.drawImage(this.finger, 0, 5);
						} else if (this.arms == true) {
							if (this.counter < 14) {
								app.main.sound.playEnergyAttack(1);
								this.energy -= 5;
								if (this.left == true) {
									app.main.blasts.push(new app.Energy(this.position.x, this.position.y + 27, this.left, 6, 2));
								} else {
									app.main.blasts.push(new app.Energy(this.position.x + 60, this.position.y + 27, this.left, 6, 2));
								}
							}
							ctx.drawImage(this.finger, 0, 5);
						}
					} else {
						ctx.drawImage(this.finger, 0, 5);
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
			} else if (this.blocking == true && this.hit == false && (this.stun == false || this.superSpeed == true) && this.fieldOn == false) {
				ctx.drawImage(this.block, 0, 5);

				//FIELD
			} else if (this.blocking == true && this.fieldOn == true) {
				if (this.counter < 50) {
					this.fieldTimer++;
					if (this.counter % 2 == 0) {
						ctx.drawImage(this.useField1, -15, 0);
					} else {
						ctx.drawImage(this.useField1, -15, 0);
					}

					if (this.counter < 2) {
						app.main.sound.playEnergyAttack(51);
					} else if (this.counter < 5 && this.counter > 3) {
						app.main.sound.playTaunt5(Math.round(getRandom(19, 21)));
					}

					ctx.save();
					ctx.translate(-12, 5);
					if (this.counter < 5) {
						ctx.globalAlpha = this.counter / 10;
						ctx.scale(this.counter * 2 / 10, this.counter * 2 / 10);
						if (this.counter < 2) {
							ctx.drawImage(this.fieldMain, 35.2, -2);
						} else if (this.counter < 3) {
							ctx.drawImage(this.fieldMain, -28.8, -3);
						} else if (this.counter < 4) {
							ctx.drawImage(this.fieldMain, -38.4, -4);
						}
					} else {
						ctx.scale(.8, .8);
						ctx.globalAlpha = .4;
						ctx.drawImage(this.fieldMain, -48, -5);
					}
					ctx.globalAlpha = .5;
					if (this.counter > 4) {
						if (this.fieldTimer < 2) {
							ctx.drawImage(this.field1, -48, -5);
						} else if (this.fieldTimer < 3) {
							ctx.drawImage(this.field2, -48, -5);
						} else if (this.fieldTimer < 4) {
							ctx.drawImage(this.field3, -48, -5);
						} else if (this.fieldTimer < 5) {
							ctx.drawImage(this.field4, -48, -5);
						} else if (this.fieldTimer < 6) {
							ctx.drawImage(this.field5, -48, -5);
						} else if (this.fieldTimer < 7) {
							ctx.drawImage(this.field6, -48, -5);
						} else if (this.fieldTimer < 8) {
							ctx.drawImage(this.field7, -48, -5);
						} else if (this.fieldTimer < 9) {
							ctx.drawImage(this.field8, -48, -5);
							this.fieldTimer = 0;
						} else {
							this.fieldTimer = 0;
						}
					}
					ctx.restore();
				} else {
					if (this.counter % 2 == 0) {
						ctx.drawImage(this.useField1, -15, 0);
					} else {
						ctx.drawImage(this.useField1, -15, 0);
					}
					this.fieldOn = false;
					this.blocking = false;
					this.stun = false;
					app.main.aiChoice4 = Math.random();
					app.main.chance3 = Math.random();
					this.counter = 0;
				}
				//TAUNT
			} else if (this.taunting == true && this.hit == false && this.hardHit != true) {
				if (this.counter < 25) {
					this.stun = true;
					ctx.drawImage(this.stance, 0, 0);
					if (this.counter > 19 && this.counter < 21) {
						app.main.sound.playTaunt5(Math.round(this.tauntPick));
					}
				} else {
					ctx.drawImage(this.stance, 0, 0);
					//this.counter = 0;
					this.stamina = 28;
					this.stun = false;
					this.intensify = false;
					this.taunting = false;
					this.counter = 0;
				}
				//BASIC HIT
			} else if (this.hit == true && this.hardHit == false) {
				if (this.stunCounter < 3) {
					if (app.main.activeSupport == false) {
						if (app.main.vegeta.attacking == true) {
							app.main.roundScore2 -= 12;
						}
					} else {
						if (app.main.vegeta.attacking == true || app.main.support[0].attacking == true || app.main.support[1].attacking == true) {
							app.main.roundScore2 -= 12;
						}
					}
					this.stun = true;
					ctx.drawImage(this.hit1, -10, 0);
				} else {
					this.decisionTimer += 10;
					this.defBreak++;
					ctx.drawImage(this.hit1, -10, 0);
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
			} else if (this.hardHit == true && this.hit == true && (this.air == false || this.blasted == true)) {
				if (this.stunCounter < 22) {
					this.voiceChance = Math.random();
					if (this.stunCounter < 2 && app.main.battle != 3 && this.voiceChance > .5) {
						app.main.sound.playTaunt5(Math.round(getRandom(12, 14)));
					} else if (this.stunCounter < 2 && app.main.battle == 3) {
						app.main.sound.playTaunt2(Math.round(getRandom(9, 11)));
					}
					if (app.main.activeSupport == false) {
						if (app.main.vegeta.attacking == true) {
							app.main.roundScore2 -= 4;
						}
					} else {
						if (app.main.vegeta.attacking == true || app.main.support[0].attacking == true || app.main.support[1].attacking == true) {
							app.main.roundScore2 -= 4;
						}
					}
					this.stun = true;
					ctx.drawImage(this.hitHard, -15, 2);
				} else {
					ctx.drawImage(this.hitHard, -15, 2);
					this.decisionTimer += 10;
					this.stun = false;
					this.hardHit = false;
					this.hit = false;
					this.blasted = false;
					this.counter = 0;
				}
				//HARD HIT AIR
			} else if (this.hardHit == true && this.hit == true && this.air == true) {
				if (this.punched == true) {
					if (this.stunCounter < 22) {
						this.voiceChance = Math.random();
						if (this.stunCounter < 2 && this.voiceChance > .5) {
							app.main.sound.playTaunt5(Math.round(getRandom(12, 14)));
						}
						if (app.main.activeSupport == false) {
							if (app.main.vegeta.attacking == true) {
								app.main.roundScore2 -= 4;
							}
						} else {
							if (app.main.vegeta.attacking == true || app.main.support[0].attacking == true || app.main.support[1].attacking == true) {
								app.main.roundScore2 -= 4;
							}
						}
						this.stun = true;
						ctx.drawImage(this.fallDown, -5, 20);
					} else {
						this.decisionTimer += 10;
						ctx.drawImage(this.fallDown, -5, 20);
						this.stun = false;
						this.hardHit = false;
						this.hit = false;
						this.counter = 0;
					}
				} else {
					if (this.stunCounter < 22) {
						this.voiceChance = Math.random();
						if (this.stunCounter < 2 && this.voiceChance > .5) {
							app.main.sound.playTaunt5(Math.round(getRandom(12, 14)));
						}
						if (app.main.activeSupport == false) {
							if (app.main.vegeta.attacking == true) {
								app.main.roundScore2 -= 4;
							}
						} else {
							if (app.main.vegeta.attacking == true || app.main.support[0].attacking == true || app.main.support[1].attacking == true) {
								app.main.roundScore2 -= 4;
							}
						}
						this.stun = true;
						ctx.drawImage(this.fallSide, 0, 20);
					} else {
						ctx.drawImage(this.fallSide, 0, 20);
						this.stun = false;
						this.hardHit = false;
						this.hit = false;
						this.counter = 0;
					}
				}
			} else if (this.end == true) {
				if (this.air == true) {
					this.stun = true;
					ctx.drawImage(this.fallDown, -5, 20);
				} else {
					this.stun = true;
					ctx.drawImage(this.ground17, -15, 70);
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
		} //end if

		//SUPER SPEED (TELEPORT) DRAW 
		if (this.superSpeed == true && this.appear == false) {
			this.speedCounter++;
			ctx.save();
			//ctx.scale(1.2,1.2);
			if (this.counter < 4) {
				if (this.counter < 2) {
					app.main.sound.playSpecialReaction2(19);
				}
				if (this.speedCounter < 2) {
					ctx.drawImage(this.teleport, -40, -5);
				} else if (this.speedCounter < 3) {
					//blink
				} else {
					this.speedCounter = 0;
				}
			} else if (this.counter < 7) {
				this.stun = true;
				this.vanish = true;
				if (this.speedCounter < 2) {
					ctx.drawImage(this.teleport, -40, -5);
					ctx.drawImage(this.teleport, -40, -2);
				} else if (this.speedCounter < 3) {
					//blink
				} else {
					this.speedCounter = 0;
				}
			} else if (this.counter < 8) {
				this.speed();
			} else if (this.counter < 12) {
				if (this.speedCounter < 2) {
					ctx.drawImage(this.teleport, -40, -5);
					ctx.drawImage(this.teleport, -40, -2);
				} else if (this.speedCounter < 3) {
					//blink
				} else {
					this.speedCounter = 0;
				}
			} else if (this.counter < 15) {
				this.velocity.x = 0;
				this.decel.x = 0;
				//this.jumpVelocity.y = 0;
				this.vanish = false;
				if (this.speedCounter < 2) {
					ctx.drawImage(this.teleport, -40, -5);
				} else if (this.speedCounter < 3) {
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
		if (this.appear == true && this.superSpeed == true) {
			this.speedCounter++;
			ctx.save();
			//ctx.scale(1.2,1.2);
			if (this.counter < 5) {
				if (this.speedCounter < 2) {
					ctx.drawImage(this.teleport, -40, -5);
					ctx.drawImage(this.teleport, -40, -2);
				} else if (this.speedCounter < 3) {
					//blink
				} else {
					this.speedCounter = 0;
				}
			} else if (this.counter < 8) {
				this.vanish = false;
				if (this.speedCounter < 2) {
					ctx.drawImage(this.teleport, -40, -5);
				} else if (this.speedCounter < 3) {
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
}(); //end IIFE

"use strict";

var app = app || {};

app.Android18 = function () {

	function Android18(start, opponent) {

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
		this.BUILDING = new Victor(650, 270);
		this.GROUND = new Victor(0, 620);
		this.SKY = new Victor(0, 220);
		this.SKYTOP = new Victor(0, 10);
		this.LEFTWALL = new Victor(0, 0);
		this.RIGHTWALL = new Victor(950, 0);
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
		this.jumpVelocity = new Victor(0, -15);
		this.jumpAccel = new Victor(0, -1);
		this.gravity = new Victor(0, 1.7);

		// IMAGE SETUP 
		var image = new Image();
		image.src = app.images18.stance;
		this.stance = image;

		image = new Image();
		image.src = app.images18.stanceUp;
		this.stanceUp = image;

		image = new Image();
		image.src = app.images18.stanceDown;
		this.stanceDown = image;

		image = new Image();
		image.src = app.images18.slowFly;
		this.slowFly = image;

		image = new Image();
		image.src = app.images18.fastFly;
		this.fastFly = image;

		image = new Image();
		image.src = app.images18.flyUp;
		this.flyUp = image;

		image = new Image();
		image.src = app.images18.flyUpUp;
		this.flyUpUp = image;

		image = new Image();
		image.src = app.images18.flyUpDown;
		this.flyUpDown = image;

		image = new Image();
		image.src = app.images18.flyDownSlow;
		this.flyDownSlow = image;

		image = new Image();
		image.src = app.images18.flyDownFast;
		this.flyDownFast = image;

		image = new Image();
		image.src = app.images18.reverse;
		this.moveReverse = image;

		image = new Image();
		image.src = app.images18.leftPunch;
		this.leftPunch = image;

		image = new Image();
		image.src = app.images18.rightPunch;
		this.rightPunch = image;

		image = new Image();
		image.src = app.images18.punchPrep;
		this.punchPrep = image;

		image = new Image();
		image.src = app.images18.punchPrepAir;
		this.punchPrepAir = image;

		image = new Image();
		image.src = app.images18.rightPunchAir;
		this.rightPunchAir = image;

		image = new Image();
		image.src = app.images18.leftPunchAir;
		this.leftPunchAir = image;

		image = new Image();
		image.src = app.images18.hit1;
		this.hit1 = image;

		image = new Image();
		image.src = app.images18.hit2;
		this.hit2 = image;

		image = new Image();
		image.src = app.images18.attackE;
		this.attackE = image;

		image = new Image(); //both
		image.src = app.attack.tele;
		this.teleport = image;

		image = new Image();
		image.src = app.images18.blastPrep;
		this.blastPrep = image;

		image = new Image();
		image.src = app.images18.hardKick;
		this.hardKick = image;

		image = new Image();
		image.src = app.images18.ground;
		this.ground18 = image;

		image = new Image();
		image.src = app.images18.fallSide;
		this.fallSide = image;

		image = new Image();
		image.src = app.images18.hardKickPrep;
		this.hardKickPrep = image;

		image = new Image();
		image.src = app.images18.hardKickSwing;
		this.hardKickSwing = image;

		image = new Image();
		image.src = app.images18.hardPunch;
		this.hardPunch = image;

		image = new Image();
		image.src = app.images18.hardPunchAir;
		this.hardPunchAir = image;

		image = new Image();
		image.src = app.images18.hardPunchAirPrep;
		this.hardPunchAirPrep = image;

		image = new Image();
		image.src = app.images18.hardPunchAirSwing;
		this.hardPunchAirSwing = image;

		image = new Image();
		image.src = app.images18.hardPunchPrep;
		this.hardPunchPrep = image;

		image = new Image();
		image.src = app.images18.hitHard;
		this.hitHard = image;

		image = new Image();
		image.src = app.images18.injured;
		this.injured = image;

		image = new Image();
		image.src = app.images18.kick;
		this.kick = image;

		image = new Image();
		image.src = app.images18.kickPrep;
		this.kickPrep = image;

		image = new Image();
		image.src = app.images18.leftBlast;
		this.leftBlast = image;

		image = new Image();
		image.src = app.images18.rightBlast;
		this.rightBlast = image;

		image = new Image();
		image.src = app.images18.block;
		this.block = image;

		image = new Image();
		image.src = app.images18.fallKick;
		this.fallKick = image;

		image = new Image();
		image.src = app.images18.fallDown;
		this.fallDown = image;

		image = new Image();
		image.src = app.images18.taunt;
		this.taunt = image;

		image = new Image();
		image.src = app.images18.launchPrep;
		this.launchPrep = image;

		image = new Image();
		image.src = app.images18.launchSwing;
		this.launchSwing = image;

		image = new Image();
		image.src = app.images18.launch;
		this.launch = image;

		image = new Image();
		image.src = app.images18.finger;
		this.finger = image;

		image = new Image();
		image.src = app.images18.blastSky;
		this.blastSky = image;

		image = new Image();
		image.src = app.images18.energyDown;
		this.energyDown = image;

		image = new Image();
		image.src = app.images18.special1;
		this.special1 = image;

		image = new Image();
		image.src = app.images18.special2;
		this.special2 = image;

		image = new Image();
		image.src = app.images18.mad1;
		this.mad1 = image;

		image = new Image();
		image.src = app.images18.field1;
		this.useField1 = image;

		image = new Image();
		image.src = app.images18.field2;
		this.useField2 = image;

		image = new Image();
		image.src = app.images18.combat1;
		this.combat1 = image;

		image = new Image();
		image.src = app.attack.blastCharge1;
		this.blastCharge1 = image;

		image = new Image();
		image.src = app.attack.field1;
		this.field1 = image;

		image = new Image();
		image.src = app.attack.field2;
		this.field2 = image;

		image = new Image();
		image.src = app.attack.field3;
		this.field3 = image;

		image = new Image();
		image.src = app.attack.field4;
		this.field4 = image;

		image = new Image();
		image.src = app.attack.field5;
		this.field5 = image;

		image = new Image();
		image.src = app.attack.field6;
		this.field6 = image;

		image = new Image();
		image.src = app.attack.field7;
		this.field7 = image;

		image = new Image();
		image.src = app.attack.field8;
		this.field8 = image;

		image = new Image();
		image.src = app.attack.fieldMain;
		this.fieldMain = image;
	}

	//FUNCTION TO UPDATE MANY VALUES
	Android18.prototype.update = function () {

		this.flySoundDelay++;

		//Look around
		if (this.position.y < app.main.vegeta.position.y - 150) {
			this.lookDown = true;
		} else if (this.position.y > app.main.vegeta.position.y + 150) {
			this.lookUp = true;
		} else {
			this.lookUp = false;
			this.lookDown = false;
		}

		if (this.movingLeft == true && this.landed == false) {
			if (this.velocity.x < 0 && this.velocity.x > -20) {
				this.slow = true;
				this.fast = false;
			} else if (this.velocity.x < -20) {
				this.fast = true;
				this.slow = false;
			} else if (this.velocity.x >= 0) {
				this.fast = false;
				this.slow = false;
			}
		}
		if (this.movingRight == true && this.landed == false) {
			if (this.velocity.x > 0 && this.velocity.x < 20) {
				this.slow = true;
				this.fast = false;
			} else if (this.velocity.x > 20) {
				this.fast = true;
				this.slow = false;
			} else if (this.velocity.x <= 0) {
				this.fast = false;
				this.slow = false;
			}
		}

		//WALL POSITIONING
		if (this.position.x < this.LEFTWALL.x + 10 && hardAttackHitTest(app.main.android18, app.main.vegeta) == false) {
			this.right = true;
			this.left = false;
		} else if (this.position.x > this.RIGHTWALL.x - 10 && hardAttackHitTest(app.main.android18, app.main.vegeta) == false) {
			this.right = false;
			this.left = true;
		}

		//CREATE BOUNDRIES
		if (this.position.y > this.GROUND.y) {
			this.prevX = this.position.x;
			this.position.copyY(this.GROUND);
			//this.jumpVelocity = new Victor(0,-15);
			this.velocity.divideScalar(3);
			this.ground = true;
			this.air = false;
			this.decend = false;
			if (this.end == true || this.jumpVelocity.y > 20 && this.hardHit == true) {
				this.fallDust = true;
				app.main.environment.shake = true;
				if (this.dead == false) {
					app.main.sound.playSpecialReaction(2);
				}
			} else if (app.main.scene == false || app.main.gameState == app.main.GAME_STATE.TUTORIAL || app.main.sceneNum == 1) {
				this.landDust = true;
				if (this.velocity.x < 5 && this.velocity.x > -5 || myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT] != true && myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT] != true) {
					this.landed = true;
					app.main.sound.playSpecialReaction(3);
				} else {
					app.main.sound.playSpecialReaction(74);
				}
			}
		}
		if (this.position.y > this.BUILDING.y && this.aboveBuilding == true && this.down == false) {
			this.position.copyY(this.BUILDING);
			//this.jumpVelocity = new Victor(0,-15);
			//console.log("building");
			this.velocity.divideScalar(3);
			this.ground = true;
			this.air = false;
			this.decend = false;
			if (this.position.y == this.BUILDING.y) {
				if (this.end == true || this.jumpVelocity.y > 20 && this.hardHit == true) {
					app.main.environment.shake = true;
					if (this.dead == false) {
						this.landed = true;
						app.main.sound.playSpecialReaction(2);
					}
				} else if (app.main.scene == false || app.main.gameState == app.main.GAME_STATE.TUTORIAL || app.main.sceneNum == 1) {
					if (this.velocity.x < 5 && this.velocity.x > -5 || myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT] != true && myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT] != true) {
						this.landed = true;
						app.main.sound.playSpecialReaction(3);
					} else {
						app.main.sound.playSpecialReaction(74);
					}
				}
			}
		}
		if (this.position.y < this.SKY.y) {
			this.aboveSky = true;
		} else {
			this.aboveSky = false;
		}
		if (this.position.y < this.SKYTOP.y) {
			this.position.copyY(this.SKYTOP);
			if (this.stun == false) {
				this.jumpVelocity = new Victor(0, 0);
			}
		}
		if (this.position.x < this.LEFTWALL.x) {
			this.position.copyX(this.LEFTWALL);
			this.decel = new Victor(0, 0);
			this.velocity = new Victor(0, 0);
		}
		if (this.position.x > this.RIGHTWALL.x) {
			this.position.copyX(this.RIGHTWALL);
			this.decel = new Victor(0, 0);
			this.velocity = new Victor(0, 0);
		}

		if (app.main.activeSupport == true) {
			for (var x = 0; x < 2; x++) {
				if (hitTest(app.main.android18, app.main.support[x]) == true && app.main.support[x].vanish == false) {
					this.decel.zero();
				}
			}
		}

		if (this.dead == true) {
			this.hit == false;
			this.hardHit == false;
		}

		if (this.landed == true) {
			this.slow = false;
			this.fast = false;
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT] == true || myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT] == true) {
				console.log("LANDFALSE");
				this.landed = false;
			}
		}

		//hover smooth
		if (this.hover == true) {
			this.smoothTimer++;
			if (this.smoothTimer < 4) {
				this.position.y -= 1.5;
			} else if (this.smoothTimer < 8) {
				this.position.y += 1.5;
			} else {
				this.smoothTimer = 0;
			}
		} else {
			this.smoothTimer = 0;
		}

		if (this.exhausted == true && this.alertStart == false) {
			app.main.sound.playEffectLoud(53);
			this.alertStart = true;
		} else if (this.alertStart == true && this.exhausted == false) {
			this.alertStart = false;
		}

		//Checks for behind
		if (this.left == true && app.main.vegeta.left == true && this.position.x > app.main.vegeta.position.x) {
			this.behind = true;
		} else if (this.left == false && app.main.vegeta.left == false && this.position.x < app.main.vegeta.position.x) {
			this.behind = true;
		} else {
			this.behind = false;
		}

		//HOVER
		if (app.main.scene == false || app.main.gameState == app.main.GAME_STATE.TUTORIAL) {
			if (this.air == true && this.down == false && this.position.y > this.SKYTOP.y && this.up == false && this.hit == false && this.hardHit == false && this.end == false && app.main.vegeta.end == false && (hardAttackHitTest(app.main.android18, app.main.vegeta) && this.hardHit == false || this.blasting == true || this.powerMove == true || this.taunting == true || this.superSpeed == true && hardAttackHitTest(app.main.android18, app.main.vegeta) || this.blocking == true || this.attacking == true)) {
				//Hover
				this.hover = true;
				this.hoverTimer = 10;
			} else {
				this.hover = false;
			}
		}

		if (this.down == true) {
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

		if (this.hoverTimer > 6 && this.up == true && this.down == false) {
			this.jumpVelocity.y = -6;
			this.up = false;
			this.hover = false;
		} else if (this.hoverTimer > 6 && this.down == true && this.up == false) {
			this.jumpVelocity.y = 0;
			this.down = false;
			this.hover = false;
			this.hoverTimer = 0;
		}

		if ((this.hover == true || this.hoverTimer > 0) && this.up == false && this.down == false) {
			this.hoverCounter++;
			this.hoverTimer--;
			if (hardAttackHitTest(app.main.android18, app.main.vegeta) && this.down == false) {
				if (this.hoverCounter < 5) {
					this.flying = false;
				} else {
					if (app.main.vegeta.position.y > this.position.y) {
						this.hoverCounter = 5;
					} else {
						this.flying = true;
						this.decend = false;
					}
				}
			} else {
				if (this.hoverCounter < 6) {
					this.flying = false;
				} else {
					this.flying = true;
					this.decend = false;
					this.hoverCounter = 0;
				}
			}
		}

		//console.log("BEHIND HIM HIM HIM HIM HIM HIM HIM HIM: " + this.behind);

		if (this.position.y < this.BUILDING.y && this.position.x > this.BUILDING.x && this.down == false) {
			this.aboveBuilding = true;
		}
		if (this.position.x < this.BUILDING.x && this.position.y < this.GROUND.y || this.position.y > this.BUILDING.y && this.position.y < this.GROUND.y) {
			this.air = true;
			this.aboveBuilding = false;
		}

		if (app.main.vegeta.air == true && this.vanish == true) {
			//bug fix
			this.flying = true;
			this.air = true;
			this.jumpVelocity.y = 0;
		}

		if (this.exhausted == true && this.fieldOn == false) {
			// END BLOCKING
			this.blocking = false;
		}

		//Field ON
		if (this.fieldOn == true) {

			this.energy -= .45;

			this.velocity.x = 0;
			this.decel.x = 0;

			if (this.position.y < app.main.vegeta.position.y + 150 && this.position.y > app.main.vegeta.position.y - 150) {
				if (this.position.x < app.main.vegeta.position.x + 150 && this.position.x > app.main.vegeta.position.x - 150) {
					if (app.main.vegeta.left == true) {
						if (this.behind == true && this.position.x > app.main.vegeta.position.x) {
							app.main.vegeta.velocity.x = -30;
						} else {
							app.main.vegeta.velocity.x = 30;
						}
						if (app.main.android17.active == true) {
							app.main.vegeta.focus17 = true;
						} else {
							app.main.aiChoice1 = 0;
							app.main.vegeta.defensive = true;
							app.main.vegeta.aggressive = false;
							app.main.aiReason = 3;
						}
					} else {
						if (this.behind == true && this.position.x < app.main.vegeta.position.x) {
							app.main.vegeta.velocity.x = 30;
						} else {
							app.main.vegeta.velocity.x = -30;
						}
						if (app.main.android17.active == true) {
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
		if (this.ground == true) {
			if (this.stun == false && this.hardhit == false) {
				this.jumpVelocity = new Victor(0, 0);
			}
			if (this.up == true) {
				this.prevX = this.position.x;
				if (this.aboveBuilding == false) {
					this.flyDust = true;
				}
				this.jumpVelocity = new Victor(0, -15);
			}
		}

		/* if(this.blasting == true){
  	this.decel.x = 0;
  } */

		//PUSH 
		if (app.main.vegeta.vanish == false && app.main.vegeta.dead == false) {
			if (hitTest(app.main.android18, app.main.vegeta) && this.behind == false) {
				if (app.main.vegeta.left == true) {
					this.position.x -= 10;
				} else {
					this.position.x += 10;
				}
			} else if (hitTest(app.main.android18, app.main.vegeta) && this.behind == true) {
				if (app.main.vegeta.left == true) {
					this.position.x += 10;
				} else {
					this.position.x -= 10;
				}
			}
		}

		if (app.main.activeSupport == true) {
			//PUSH 
			for (var x = 0; x < 2; x++) {
				if (app.main.support[x].vanish == false) {
					if (hitTest(app.main.android18, app.main.support[x]) && this.behind == false) {
						if (app.main.support[x].left == true) {
							this.position.x -= 10;
						} else {
							this.position.x += 10;
						}
					} else if (hitTest(app.main.android18, app.main.support[x]) && this.behind == true) {
						if (app.main.support[x].left == true) {
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

		if ((this.hardHit == true || this.hit == true) && this.blastBurn == true) {
			this.blastBurnCounter = 0;
		}

		//Injured talk
		if (this.exhausted == true && this.exhaustTalk == false) {
			this.exhaustTalk = true;
			app.main.sound.playTaunt2(Math.round(getRandom(41, 42)));
		} else if (this.exhausted == false) {
			this.exhaustTalk = false;
		}

		//Death Talk
		if (this.end == true && this.deathTalk == false && app.main.scene == false) {
			this.deathTalk = true;
			if (this.position.y < 350) {
				app.main.sound.playTaunt1(45);
			} else {
				app.main.sound.playTaunt1(46);
			}
		}

		//Endurance recovery
		if (this.blastBurn == true) {
			//Blast burn
			this.blastBurnCounter++;
			if (this.blastBurnCounter > this.blastBurnLength) {
				this.blastBurn = false;
				this.blastBurnCounter = 0;
			}
		} else {
			if (this.endurance < 100 && (this.stun == false || app.main.scene == true) && this.end == false) {
				this.endurance += .25;
			}
		}
		//Energy recovery
		if (this.energy < 100 && (this.stun == false || app.main.scene == true) && this.end == false) {
			this.energy += .18;
		}
		//Stamina recovery
		if (this.stamina > 28 && (this.stun == false && this.end == false && this.blocking == false || app.main.scene == true || this.fieldOn == true) || this.exhausted == true) {
			this.stamina -= .3;
		}

		if ((this.velocity.x > 1 || this.velocity.x < -1) && this.attacking == true && this.intensify == true && this.blasting == false) {
			//console.log("STAGE 1");
			if (this.punchMove == true) {
				//console.log("STAGE 2A");
				if (this.longMove == true && hardAttackHitTest(app.main.android18, app.main.vegeta) && this.attackPrep == false) {
					console.log("STAGE 3");
					this.punching = true;
					this.punchMove = false;
					this.longMove = false;
					app.main.detected = true;
					app.main.detectedHard = true;
				} else if (this.shortMove == true && attackHitTest(app.main.android18, app.main.vegeta) && this.attackPrep == false) {
					console.log("STAGE 3");
					this.punching = true;
					this.punchMove = false;
					this.shortMove = false;
					app.main.detected = true;
					app.main.detectedHard = true;
				}
			}
			if (this.kickMove == true) {
				//console.log("STAGE 2B");
				if (this.longMove == true && hardAttackHitTest(app.main.android18, app.main.vegeta) && this.attackPrep == false) {
					console.log("STAGE 3");
					this.kicking = true;
					this.kickMove = false;
					this.longMove = false;
					app.main.detected = true;
					app.main.detectedHard = true;
				} else if (this.shortMove == true && attackHitTest(app.main.android18, app.main.vegeta) && this.attackPrep == false) {
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
		if (hardAttackHitTest(app.main.android18, app.main.vegeta) == true && app.main.vegeta.blasting == true && this.behind == false) {
			if (app.main.vegeta.left == true) {
				this.velocity.x -= 2;
			} else {
				this.velocity.x -= 2;
			}
		}

		if (app.main.scene == true && app.main.gameState != app.main.GAME_STATE.TUTORIAL) {
			this.stun = true;
		}

		if (this.basic == true && attackHitTest(app.main.android18, app.main.vegeta) != true) {
			app.main.sound.playBasicReaction(Math.round(getRandom(61, 63)));
			this.missed = true;
		}

		//console.log("MISSED " + this.missed);


		if (this.basic == true || this.punching == true || this.kicking == true) {
			this.attackPrep = false;
		}

		//Flight control
		if (this.flying == true && (this.stun == false && this.end == false || this.hover == true) && this.down == false) {
			if ((this.position.y == this.GROUND.y || this.position.y == this.BUILDING.y) && this.stun == false && this.hover == false && (app.main.scene == false || app.main.gameState == app.main.GAME_STATE.TUTORIAL) && this.end == false && this.flySoundDelay > 10) {
				if (myKeys.keydown[myKeys.KEYBOARD.KEY_UP] == true) {
					app.main.sound.playSpecialReaction(4);
					this.flySoundDelay = 0;
				}
			}
			if (this.hover == true) {
				this.jumpVelocity = new Victor(0, -4);
			} else if (this.jumpVelocity.y > 0 && this.down == false) {
				this.jumpVelocity = new Victor(0, -8);
			}
			this.jumpVelocity.addY(this.jumpAccel);
			this.gravity.zero();
		} else if (this.decend == true || this.hover == true && this.down == true) {
			if (this.powerMove == false) {
				this.gravity = new Victor(0, 4.5);
				this.velocity.multiplyScalar(1.3);
			} else {
				this.gravity = new Victor(0, 1.7);
			}
		} else {
			this.gravity = new Victor(0, 1.7);
		}
		if (this.air == true) {
			this.ground = false;
			this.jumpVelocity.addY(this.gravity);
			this.position.addY(this.jumpVelocity);
		}

		if (this.hardHit == true && this.air == true) {
			this.taunting = false;
			this.flying = false;
		} else if (this.hardHit == true && this.air == false && this.hit == false) {
			this.stun = false;
			this.hardHit = false;
		}

		if (this.hit == true || this.hardHit == true) {
			this.taunting = false;
			this.blasting = false;
			this.powerMove = false;
		}

		if (this.taunting == false) {
			this.tauntPick = getRandom(17, 23);
		}

		if (this.position.y == this.BUILDING.y && (this.movingLeft == true || this.movingRight == true || this.stun == true)) {
			this.jumpVelocity = new Victor(0, 0);
		} else if (this.position.y == this.BUILDING.y && (this.movingLeft == false || this.movingRight == false || this.stun == false)) {
			this.jumpVelocity = new Victor(0, -15);
		}

		this.decelerate(); //Decel

		if (this.velocity.x < .1 && this.velocity.x > -.1 && this.hit == false) {
			this.velocity.zero();
		}

		if (this.basic == false && this.punching == false && this.kicking == false) {
			app.main.damageTimer = 0;
		}

		//Mute Voice
		if (this.hit == true && this.voiceStop == false && this.deathTalk == false && this.exhaustTalk == false) {
			app.main.sound.pauseVoice1();
			this.voiceStop = true;
		} else if (this.hit == false) {
			this.voiceStop = false;
		}

		//Varible resets
		if (this.attacking == false && this.fight == false && this.taunting == false) {
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
		if (this.stun == false && this.end == false && this.dead == false) {
			this.stunCounter = 0;
		} else if (this.stunCounter > 30 && this.end == false && this.dead == false) {
			//Stun stuck fix
			this.stun == false;
		}

		if (this.position.x > 690) {
			this.byBuilding = true;
		} else {
			this.byBuilding = false;
		}

		//SPECIAL CASES
		if (app.main.gameState == app.main.GAME_STATE.TUTORIAL) {
			this.BUILDING = new Victor(0, 135);
		} else {
			if (app.main.environment.buildingActive == true) {
				this.BUILDING = new Victor(650, 250);
			} else {
				this.BUILDING = new Victor(650, -1250);
			}
		}
	};

	//Starts a jump/flight
	Android18.prototype.jump = function () {
		this.air = true;
	};

	//BEGIN SUPER SPEED
	Android18.prototype.speed = function () {
		this.energy -= 8;
		app.main.teleports += 1;
		if (this.left == true && app.main.vegeta.position.x < this.LEFTWALL.x + 50) {
			if (app.main.vegeta.aboveBuilding == false) {
				this.aboveBuilding = false;
			}
			if (app.main.vegeta.vegeta == true) {
				this.position.x = app.main.vegeta.position.x + 50;
			} else if (app.main.vegeta.piccolo == true) {
				if (app.main.vegeta.left == true) {
					this.position.x = app.main.vegeta.position.x + 75;
				} else {
					this.position.x = app.main.vegeta.position.x + 60;
				}
			} else {
				this.position.x = app.main.vegeta.position.x + 50;
			}
			this.position.y = app.main.vegeta.position.y;
		} else if (this.right == true && app.main.vegeta.position.x > this.RIGHTWALL.x - 50) {
			if (app.main.vegeta.aboveBuilding == false) {
				this.aboveBuilding = false;
			}
			if (app.main.vegeta.vegeta == true) {
				this.position.x = app.main.vegeta.position.x - 50;
			} else if (app.main.vegeta.piccolo == true) {
				if (app.main.vegeta.left == true) {
					this.position.x = app.main.vegeta.position.x - 60;
				} else {
					this.position.x = app.main.vegeta.position.x - 75;
				}
			} else {
				this.position.x = app.main.vegeta.position.x - 50;
			}
			this.position.y = app.main.vegeta.position.y;
		} else if (myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT] == true && this.reverse == true) {
			this.position.x = this.RIGHTWALL.x;
			this.jumpVelocity.y = -2;
		} else if (myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT] == true && this.reverse == true) {
			this.position.x = this.LEFTWALL.x;
			this.jumpVelocity.y = -2;
		} else if (this.teleRight == true) {
			this.position.x = this.RIGHTWALL.x;
			this.jumpVelocity.y = -2;
		} else if (this.teleLeft == true) {
			this.position.x = this.LEFTWALL.x;
			this.jumpVelocity.y = -2;
		} else if (this.teleUp == true) {
			this.jumpVelocity.y = -2;
			this.position.y = this.SKYTOP.y;
		} else if (this.teleDown == true) {
			this.aboveBuilding = false;
			this.flying = true;
			this.position.y = this.GROUND.y;
		} else if (this.left == true && (this.up == false || this.position.y < this.SKYTOP.y + 20) && (this.down == false || this.position.y > this.GROUND.y - 20)) {
			if (app.main.vegeta.aboveBuilding == false) {
				this.aboveBuilding = false;
			}
			if (app.main.vegeta.vegeta == true) {
				this.position.x = app.main.vegeta.position.x - 50;
			} else if (app.main.vegeta.piccolo == true) {
				if (app.main.vegeta.left == true) {
					this.position.x = app.main.vegeta.position.x - 60;
				} else {
					this.position.x = app.main.vegeta.position.x - 75;
				}
			} else {
				this.position.x = app.main.vegeta.position.x - 50;
			}
			this.position.y = app.main.vegeta.position.y;
		} else if (this.right == true && (this.up == false || this.position.y < this.SKYTOP.y + 20) && (this.down == false || this.position.y > this.GROUND.y - 20)) {
			if (app.main.vegeta.aboveBuilding == false) {
				this.aboveBuilding = false;
			}
			if (app.main.vegeta.vegeta == true) {
				this.position.x = app.main.vegeta.position.x + 50;
			} else if (app.main.vegeta.piccolo == true) {
				if (app.main.vegeta.left == true) {
					this.position.x = app.main.vegeta.position.x + 75;
				} else {
					this.position.x = app.main.vegeta.position.x + 60;
				}
			} else {
				this.position.x = app.main.vegeta.position.x + 50;
			}
			this.position.y = app.main.vegeta.position.y;
		} else if (this.up == true) {
			this.position.y = this.SKYTOP.y;
			this.jumpVelocity.y = -2;
		} else if (this.down == true) {
			this.aboveBuilding = false;
			this.flying = true;
			this.position.y = this.GROUND.y;
		}
	};

	//MOVE TO THE RIGHT
	Android18.prototype.moveRight = function () {
		this.movingRight = true;
		this.movingLeft = false;
		this.velocity.addX(this.accel);
		this.velocity.limit(25, .80);
		this.decel = this.velocity.clone();
		this.position.addX(this.velocity);
	};

	//MOVE TO THE LEFT
	Android18.prototype.moveLeft = function () {
		this.movingLeft = true;
		this.movingRight = false;
		this.velocity.subtractX(this.accel);
		this.velocity.limit(25, .80);
		//console.log("VELOCITY" + this.velocity);
		this.decel = this.velocity.clone();
		this.position.addX(this.velocity);
	};

	//DECEL AFTER MOVING
	Android18.prototype.decelerate = function () {
		if (this.decel.x < 2 && this.decel.x > -2) {
			this.decel.zero();
		}

		if (this.air == false && this.blasting == false) {
			this.velocity = this.decel.clone();
			this.decel.multiplyScalar(.82);
			this.position.addX(this.decel);
		} else if (this.air == true && this.blasting == false) {
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
	Android18.prototype.draw = function (ctx) {

		this.counter++;
		this.stunCounter++;

		ctx.save();

		//FLIPPING
		if (this.left == true) {
			ctx.translate(this.position.x - 15, this.position.y + 10);
			this.attackPosition.x = this.position.x - 30;
			this.attackPosition.y = this.position.y + 20;
			this.hardAttackPosition.x = this.position.x - 60;
			this.hardAttackPosition.y = this.position.y + 20;
			ctx.scale(1, 1);
			if (this.movingRight = true && this.movingLeft == false) {
				this.reverse = true;
			} else {
				this.reverse = false;
			}
		} else if (this.right == true) {
			ctx.translate(this.position.x + 60, this.position.y + 10);
			this.attackPosition.x = this.position.x + 50;
			this.attackPosition.y = this.position.y + 20;
			this.hardAttackPosition.x = this.position.x + 80;
			this.hardAttackPosition.y = this.position.y + 20;
			ctx.scale(-1, 1);
			if (this.movingLeft = true && this.movingRight == false) {
				this.reverse = true;
			} else {
				this.reverse = false;
			}
		}

		if (this.vanish == false) {
			//NON MOVING DRAWS
			if (this.cinematic == true) {
				if (this.cine == 0) {
					ctx.drawImage(this.blastSky, 0, -20);
				} else if (this.cine == 1) {
					ctx.drawImage(this.energyDown, -10, 0);
				} else if (this.cine == 2) {
					ctx.drawImage(this.blastSky, 0, -20);
				} else if (this.cine == 3) {
					ctx.drawImage(this.block, 0, 10);
				} else if (this.cine == 4) {
					ctx.drawImage(this.blastSky, 0, -20);
					if (this.stunCounter % 2 == 0) {
						ctx.drawImage(this.blastCharge1, 32, -30, 10, 14);
					} else {
						ctx.drawImage(this.blastCharge1, 29, -33, 15, 21);
					}
				} else if (this.cine == 5) {
					ctx.drawImage(this.taunt, 20, 0);
				} else if (this.cine == 6) {
					ctx.drawImage(this.special1, 15, -2);
				} else if (this.cine == 7) {
					ctx.drawImage(this.special2, 10, 0);
				} else if (this.cine == 8) {
					ctx.drawImage(this.mad1, 0, 20);
				} else if (this.cine == 9) {
					ctx.drawImage(this.stanceUp, 0, 0);
				} else if (this.cine == 10) {
					ctx.drawImage(this.combat1, 0, 0);
				}
			} else if ((this.velocity.x == 0 || this.down == true && this.fast == false) && this.attacking != true && this.blocking != true && this.taunting != true && this.hit == false && this.hardHit != true && this.end == false) {
				if (this.up == true && this.flying == true || this.jumpVelocity.y < 15 && this.air == true) {
					if (this.lookUp == true) {
						ctx.drawImage(this.flyUpUp, 0, 0);
					} else if (this.lookDown == true) {
						ctx.drawImage(this.flyUpDown, 0, 0);
					} else {
						ctx.drawImage(this.flyUp, 0, 0);
					}
				} else if (this.down == true && this.air == true) {
					ctx.drawImage(this.flyDownFast, 0, 0);
				} else if (this.down == false && this.air == true && this.up == false) {
					ctx.drawImage(this.flyDownSlow, 0, 0);
				} else if (this.exhausted == true) {
					ctx.drawImage(this.injured, 0, 10);
				} else {
					if (this.lookUp == true) {
						ctx.drawImage(this.stanceUp, 0, 0);
					} else if (this.lookDown == true) {
						ctx.drawImage(this.stanceDown, 0, 0);
					} else {
						ctx.drawImage(this.stance, 0, 0);
					}
				}
				//MOVING DRAWS
			} else if (this.velocity.x != 0 && this.attacking != true && this.blocking != true && this.taunting != true && this.hit == false && this.hardHit != true && this.end == false) {
				//&& (this.fallingKick == false || this.air == false)
				if (this.slow == true && this.reverse == false) {
					ctx.drawImage(this.slowFly, 0, 0);
				} else if (this.fast == true && this.reverse == false) {
					ctx.drawImage(this.fastFly, 0, 10);
				} else if (this.reverse == true && this.landed == false) {
					ctx.drawImage(this.moveReverse, 0, 0);
				} else if (this.air == true && this.up == false) {
					ctx.drawImage(this.flyDownSlow, 0, 0);
				} else if (this.exhausted == true) {
					ctx.drawImage(this.injured, 0, 10);
				} else {
					if (this.lookUp == true) {
						ctx.drawImage(this.stanceUp, 0, 0);
					} else if (this.lookDown == true) {
						ctx.drawImage(this.stanceDown, 0, 0);
					} else {
						ctx.drawImage(this.stance, 0, 0);
					}
				}
				//BASIC ATTACK
			} else if (this.attacking == true && this.air == false && this.hit == false && this.blasting == false && this.intensify == false) {
				this.randomEffect = Math.random();
				//app.main.chance = .2;
				//console.log(this.arms);
				if (this.kicks == false && this.chance <= .3) {
					//Kick
				} else if (this.kicks == true) {
					app.main.chance = .4;
				}

				if (hardAttackHitTest(app.main.android18, app.main.vegeta) == true && hitTest(app.main.android18, app.main.vegeta) != true) {
					if (this.left == true) {
						this.moveLeft();
					} else {
						this.moveRight();
					}
				}
				if (this.counter < 2 && app.main.chance > .3) {
					this.attackPrep = true;
					ctx.drawImage(this.punchPrep, 0, 10);
				} else if (this.counter < 2 && app.main.chance <= .3) {
					this.attackPrep = true;
					ctx.drawImage(this.kickPrep, -5, 8);
				} else if (this.counter < 4 && app.main.chance > .3) {
					if (this.counter < 3) {
						this.stamina += 4;
						this.basic = true;
						if (this.arms == false) {
							this.arms = true;
						} else if (this.arms == true) {
							this.arms = false;
						}
					} else {
						this.basic = false;
					}
					if (this.arms == false) {
						ctx.drawImage(this.rightPunch, -20, 8);
					} else if (this.arms == true) {
						ctx.drawImage(this.leftPunch, -35, 6);
					}
				} else if (this.counter < 4 && app.main.chance <= .3) {
					if (this.counter < 3) {
						this.stamina += 4;
						this.basic = true;
					} else {
						this.basic = false;
					}
					ctx.drawImage(this.kick, -25, 8);
				} else if (app.main.chance > .3) {
					this.missed = false;
					this.kicks = false;
					this.basic = false;
					ctx.drawImage(this.stance, 0, 10);
					this.fight = false;
					this.attacking = false;
				} else if (app.main.chance <= .3) {
					this.missed = false;
					this.kicks = true;
					this.basic = false;
					ctx.drawImage(this.kick, -25, 8);
					//ctx.drawImage(this.kickPrep,5,10);
					this.fight = false;
					this.attacking = false;
				}
				//AIR BASIC ATTACK
			} else if (this.attacking == true && this.air == true && this.hit == false && this.intensify == false && this.blasting == false && this.fallingKick == false) {
				this.randomEffect = Math.random();

				if (this.kicks == false && this.chance <= .3) {
					//Kick
				} else if (this.kicks == true) {
					app.main.chance = .4;
				}

				if (hardAttackHitTest(app.main.android18, app.main.vegeta) == true && hitTest(app.main.android18, app.main.vegeta) != true) {
					if (this.left == true) {
						this.moveLeft();
					} else {
						this.moveRight();
					}
				}
				if (this.counter < 2 && app.main.chance > .3) {
					ctx.drawImage(this.punchPrepAir, 0, 10);
					this.attackPrep = true;
				} else if (this.counter < 2 && app.main.chance <= .3) {
					ctx.drawImage(this.kickPrep, -5, 8);
					this.attackPrep = true;
				} else if (this.counter < 4 && app.main.chance > .3) {
					if (this.counter < 3) {
						this.stamina += 4;
						this.basic = true;
						if (this.arms == false) {
							this.arms = true;
						} else if (this.arms == true) {
							this.arms = false;
						}
					} else {
						this.basic = false;
					}
					if (this.arms == false) {
						ctx.drawImage(this.rightPunchAir, -20, 8);
					} else if (this.arms == true) {
						ctx.drawImage(this.leftPunchAir, -35, 6);
					}
				} else if (this.counter < 4 && app.main.chance <= .3) {
					if (this.counter < 3) {
						this.stamina += 4;
						this.basic = true;
					} else {
						this.basic = false;
					}
					ctx.drawImage(this.kick, -25, 8);
				} else if (app.main.chance > .3) {
					ctx.drawImage(this.flyUp, 0, 10);
					this.missed = false;
					this.kicks = false;
					this.fight = false;
					this.attacking = false;
					this.basic = false;
				} else if (app.main.chance <= .3) {
					ctx.drawImage(this.kick, -25, 8);
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
			} else if (this.attacking == true && this.intensify == true && this.air == false && this.hit == false && this.blasting == false) {
				this.randomEffect = Math.random();
				this.punchMove = true;
				this.hard = true;
				//app.main.chance = .2;
				if (app.main.chance > .6) {
					if (this.counter < 3) {
						this.attackPrep = true;
						this.shortMove = true;
						ctx.drawImage(this.hardPunchPrep, -10, 20);
					} else if (this.counter < 4) {
						this.stamina += 10;
						this.punching = true;
						ctx.drawImage(this.hardPunch, -42, 20);
					} else if (this.counter < 10) {
						this.punching = false;
						ctx.drawImage(this.hardPunch, -42, 20);
					} else {
						ctx.drawImage(this.hardPunch, -42, 20);
						this.punchMove = false;
						this.shortMove = false;
						this.missed = false;
						this.intensify = false;
						this.hard = false;
						this.fight = false;
						this.attacking = false;
						this.counter = 0;
					}
				} else if (app.main.chance < .61 && app.main.chance > .25) {
					if (this.counter < 3) {
						this.attackPrep = true;
						this.shortMove = true;
						this.kickMove = true;
						ctx.drawImage(this.launchPrep, -2, 5);
					} else if (this.counter < 4) {
						this.stamina += 10;
						if (hardAttackHitTest(app.main.android18, app.main.vegeta) == true && app.main.vegeta.blocking == false && app.main.vegeta.superSpeed == false) {
							app.main.vegeta.jumpVelocity = new Victor(0, -30);
							app.main.vegeta.air = true;
						}
						this.kicking = true;
						ctx.drawImage(this.launchSwing, -50, -10);
					} else if (this.counter < 10) {
						this.kicking = false;
						ctx.drawImage(this.launch, -35, 0);
					} else {
						ctx.drawImage(this.launch, -35, 0);
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
					if (this.counter < 3) {
						this.kickMove = true;
						this.longMove = true;
						this.attackPrep = true;
						ctx.drawImage(this.hardKickPrep, -2, 5);
					} else if (this.counter < 4) {
						this.stamina += 10;
						this.kicking = true;
						ctx.drawImage(this.hardKickSwing, -68, 0);
					} else if (this.counter < 10) {
						this.kicking = false;
						ctx.drawImage(this.hardKick, -68, 0);
					} else {
						ctx.drawImage(this.hardKick, -68, 0);
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
			} else if (this.attacking == true && this.intensify == true && this.air == true && this.hit == false && this.blasting == false) {
				this.randomEffect = Math.random();
				this.hard = true;
				if (app.main.chance > .5) {
					if (this.counter < 5) {
						this.punchMove = true;
						this.shortMove = true;
						this.attackPrep = true;
						ctx.drawImage(this.hardPunchAirPrep, -2, 5);
					} else if (this.counter < 6) {
						this.stamina += 10;
						this.punching = true;
						ctx.drawImage(this.hardPunchAirSwing, -2, 5);
					} else if (this.counter < 10) {
						this.punching = false;
						ctx.drawImage(this.hardPunchAir, -2, 25);
					} else {
						ctx.drawImage(this.hardPunchAir, -2, 25);
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
					if (this.counter < 5) {
						this.kickMove = true;
						this.longMove = true;
						this.attackPrep = true;
						ctx.drawImage(this.hardKickPrep, -2, 5);
					} else if (this.counter < 6) {
						this.stamina += 10;
						this.kicking = true;
						ctx.drawImage(this.hardKickSwing, -68, 0);
					} else if (this.counter < 10) {
						this.kicking = false;
						ctx.drawImage(this.hardKick, -68, 0);
					} else {
						ctx.drawImage(this.hardKick, -68, 0);
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
			} else if (this.blasting == true && this.attacking == true && this.hit == false && this.intensify == false && this.fallingKick == false) {
				if (this.counter < 3) {
					ctx.drawImage(this.blastPrep, 1, 6);
				} else if (this.counter < 6) {
					if (this.arms == false) {
						if (this.counter < 4) {
							app.main.sound.playEnergyAttack(5);
							this.energy -= 4;
							if (this.left == true) {
								app.main.blasts.push(new app.Energy(this.position.x, this.position.y + 37, this.left, 0, 0));
							} else {
								app.main.blasts.push(new app.Energy(this.position.x + 60, this.position.y + 37, this.left, 0, 0));
							}
						}
						ctx.drawImage(this.rightBlast, -15, 11);
					} else if (this.arms == true) {
						if (this.counter < 4) {
							app.main.sound.playEnergyAttack(5);
							this.energy -= 4;
							if (this.left == true) {
								app.main.blasts.push(new app.Energy(this.position.x, this.position.y + 47, this.left, 0, 0));
							} else {
								app.main.blasts.push(new app.Energy(this.position.x + 60, this.position.y + 47, this.left, 0, 0));
							}
						}
						ctx.drawImage(this.leftBlast, -18, 5);
					}
				} else {
					ctx.drawImage(this.blastPrep, 1, 6);
					if (this.arms == false) {
						this.arms = true;
					} else if (this.arms == true) {
						this.arms = false;
					}
					this.fight = false;
					this.attacking = false;
					this.blasting = false;
				}
				//POWERFUL BLAST ATTACK
			} else if (this.blasting == true && this.attacking == true && this.hit == false && this.intensify == true && this.fallingKick == false) {
				//app.main.chance = .3;
				this.powerMove = true;
				if (app.main.chance > .5) {
					if (this.counter < 3) {
						//this.jumpVelocity.y = 0;
						//this.jumpAccel.y = 0;
						//this.gravity.zero();
						//this.velocity.y = 0;
						ctx.drawImage(this.blastPrep, 1, 6);
						if (this.arms == false) {
							this.arms = true;
						} else if (this.arms == true) {
							this.arms = false;
						}
					} else if (this.counter < 5) {
						ctx.drawImage(this.attackE, -30, 5);
					} else if (this.counter < 6) {
						app.main.sound.playEnergyAttack(23);
						ctx.drawImage(this.attackE, -30, 5);
					} else if (this.counter < 7) {
						ctx.drawImage(this.attackE, -30, 5);
						ctx.drawImage(this.blastCharge1, -37, 20, 10, 14);
					} else if (this.counter < 8) {
						ctx.drawImage(this.attackE, -30, 5);
						ctx.drawImage(this.blastCharge1, -42, 16.5, 15, 21);
					} else if (this.counter < 9) {
						ctx.drawImage(this.attackE, -30, 5);
						ctx.drawImage(this.blastCharge1, -47, 13, 20, 28);
					} else if (this.counter < 10) {
						ctx.drawImage(this.attackE, -30, 5);
						ctx.drawImage(this.blastCharge1, -52, 9.5, 25, 35);
					} else if (this.counter < 11) {
						ctx.drawImage(this.attackE, -30, 5);
						ctx.drawImage(this.blastCharge1, -57, 6, 30, 42);
					} else if (this.counter < 12) {
						ctx.drawImage(this.attackE, -30, 5);
						ctx.drawImage(this.blastCharge1, -62, 2.5, 35, 49);
					} else if (this.counter < 13) {
						ctx.drawImage(this.attackE, -30, 5);
						ctx.drawImage(this.blastCharge1, -62, 2.5, 35, 49);
					} else if (this.counter < 20) {
						if (this.counter < 14) {
							this.blastRelease = true;
							app.main.sound.playTaunt1(Math.round(getRandom(62, 65)));
						}
						if (this.arms == false) {
							if (this.counter < 14) {
								app.main.sound.playEnergyAttack(24);
								this.energy -= 15;
								if (this.left == true) {
									app.main.blasts.push(new app.Energy(this.position.x - 24, this.position.y + 27, this.left, 0, 1));
								} else {
									app.main.blasts.push(new app.Energy(this.position.x + 57, this.position.y + 27, this.left, 0, 1));
								}
							}
							ctx.drawImage(this.attackE, -30, 5);
						} else if (this.arms == true) {
							if (this.counter == 14) {
								app.main.sound.playEnergyAttack(24);
								this.energy -= 15;
								if (this.left == true) {
									app.main.blasts.push(new app.Energy(this.position.x - 24, this.position.y + 27, this.left, 0, 1));
								} else {
									app.main.blasts.push(new app.Energy(this.position.x + 57, this.position.y + 27, this.left, 0, 1));
								}
							}
							ctx.drawImage(this.attackE, -30, 5);
						}
					} else {
						ctx.drawImage(this.blastPrep, 1, 6);
						this.intensify = false;
						this.powerMove = false;
						this.fight = false;
						this.attacking = false;
						this.blasting = false;
						this.blastRelease = false;
						//this.jumpAccel.y = -1;
					}
				} else {
					//FINGER BLAST
					if (this.counter < 3) {
						//this.jumpVelocity.y = 0;
						//this.jumpAccel.y = 0;
						//this.gravity.zero();
						//this.velocity.y = 0;
						ctx.drawImage(this.blastPrep, 1, 6);
						if (this.arms == false) {
							this.arms = true;
						} else if (this.arms == true) {
							this.arms = false;
						}
					} else if (this.counter < 5) {
						ctx.drawImage(this.finger, -30, -5);
					} else if (this.counter < 6) {
						app.main.sound.playEnergyAttack(27);
						ctx.drawImage(this.finger, -30, -5);
					} else if (this.counter < 7) {
						ctx.drawImage(this.finger, -30, -5);
						ctx.drawImage(this.blastCharge1, -39, 10, 10, 10);
					} else if (this.counter < 8) {
						ctx.drawImage(this.finger, -30, -5);
						ctx.drawImage(this.blastCharge1, -44, 6.5, 15, 17);
					} else if (this.counter < 9) {
						ctx.drawImage(this.finger, -30, -5);
						ctx.drawImage(this.blastCharge1, -39, 10, 10, 10);
					} else if (this.counter < 10) {
						ctx.drawImage(this.finger, -30, -5);
						ctx.drawImage(this.blastCharge1, -44, 6.5, 15, 17);
					} else if (this.counter < 11) {
						ctx.drawImage(this.finger, -30, -5);
						ctx.drawImage(this.blastCharge1, -39, 10, 10, 10);
					} else if (this.counter < 12) {
						ctx.drawImage(this.finger, -30, -5);
						ctx.drawImage(this.blastCharge1, -44, 6.5, 15, 17);
					} else if (this.counter < 13) {
						ctx.drawImage(this.finger, -30, -5);
						ctx.drawImage(this.blastCharge1, -39, 10, 10, 10);
					} else if (this.counter < 20) {
						if (this.counter < 14) {
							this.blastRelease = true;
							app.main.sound.playTaunt1(Math.round(getRandom(62, 65)));
						}
						if (this.arms == false) {
							if (this.counter < 14) {
								app.main.sound.playEnergyAttack(1);
								this.energy -= 15;
								if (this.left == true) {
									app.main.blasts.push(new app.Energy(this.position.x - 24, this.position.y + 17, this.left, 0, 2));
								} else {
									app.main.blasts.push(new app.Energy(this.position.x + 60, this.position.y + 17, this.left, 0, 2));
								}
							}
							ctx.drawImage(this.finger, -30, -5);
						} else if (this.arms == true) {
							if (this.counter < 14) {
								app.main.sound.playEnergyAttack(1);
								this.energy -= 15;
								if (this.left == true) {
									app.main.blasts.push(new app.Energy(this.position.x - 24, this.position.y + 17, this.left, 0, 2));
								} else {
									app.main.blasts.push(new app.Energy(this.position.x + 60, this.position.y + 17, this.left, 0, 2));
								}
							}
							ctx.drawImage(this.finger, -30, -5);
						}
					} else {
						ctx.drawImage(this.blastPrep, 1, 6);
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
			} else if (this.blocking == true && this.hit == false && (this.stun == false || this.superSpeed == true) && this.fieldOn == false) {
				ctx.drawImage(this.block, 0, 10);
				//FIELD
			} else if (this.blocking == true && this.fieldOn == true) {
				if (this.counter < 50) {
					this.fieldTimer++;
					if (this.counter % 2 == 0) {
						ctx.drawImage(this.useField1, 0, 0);
					} else {
						ctx.drawImage(this.useField2, 0, 0);
					}

					if (this.counter < 2) {
						app.main.sound.playEnergyAttack(51);
					} else if (this.counter < 5 && this.counter > 3) {
						app.main.sound.playTaunt1(Math.round(getRandom(55, 57)));
					}

					ctx.save();
					if (this.counter < 5) {
						ctx.globalAlpha = this.counter / 10;
						ctx.scale(.4 + this.counter * 2 / 10, .4 + this.counter * 2 / 10);
						if (this.counter < 2) {
							ctx.drawImage(this.fieldMain, -19.2, -2);
						} else if (this.counter < 3) {
							ctx.drawImage(this.fieldMain, -28.8, -3);
						} else if (this.counter < 4) {
							ctx.drawImage(this.fieldMain, -38.4, -4);
						}
					} else {
						ctx.scale(1.2, 1.2);
						ctx.globalAlpha = .4;
						ctx.drawImage(this.fieldMain, -48, -5);
					}
					ctx.globalAlpha = .5;
					if (this.counter > 4) {
						if (this.fieldTimer < 2) {
							ctx.drawImage(this.field1, -48, -5);
						} else if (this.fieldTimer < 3) {
							ctx.drawImage(this.field2, -48, -5);
						} else if (this.fieldTimer < 4) {
							ctx.drawImage(this.field3, -48, -5);
						} else if (this.fieldTimer < 5) {
							ctx.drawImage(this.field4, -48, -5);
						} else if (this.fieldTimer < 6) {
							ctx.drawImage(this.field5, -48, -5);
						} else if (this.fieldTimer < 7) {
							ctx.drawImage(this.field6, -48, -5);
						} else if (this.fieldTimer < 8) {
							ctx.drawImage(this.field7, -48, -5);
						} else if (this.fieldTimer < 9) {
							ctx.drawImage(this.field8, -48, -5);
							this.fieldTimer = 0;
						} else {
							this.fieldTimer = 0;
						}
					}
					ctx.restore();
				} else {
					if (this.counter % 2 == 0) {
						ctx.drawImage(this.useField1, 0, 0);
					} else {
						ctx.drawImage(this.useField2, 0, 0);
					}
					this.fieldOn = false;
				}
				//TAUNT
			} else if (this.taunting == true && this.hit == false && this.hardHit != true) {
				if (this.counter < 25) {
					this.stun = true;
					ctx.drawImage(this.taunt, 20, 0);
					if (this.counter > 5 && this.counter < 7) {
						app.main.sound.playTaunt1(Math.round(this.tauntPick));
					}
				} else {
					ctx.drawImage(this.taunt, 20, 0);
					this.stamina = 28;
					app.main.taunts += 1;
					this.exhausted = false;
					this.stun = false;
					this.taunting = false;
				}
				//BASIC HIT
			} else if (this.hit == true && this.hardHit == false) {
				if (this.stunCounter < 3) {
					if (app.main.activeSupport == false) {
						if (app.main.vegeta.attacking == true) {
							app.main.roundScore -= 12;
						}
					} else {
						if (app.main.vegeta.attacking == true || app.main.support[0].attacking == true || app.main.support[1].attacking == true) {
							app.main.roundScore -= 12;
						}
					}
					//this.intensify = false;
					this.stun = true;
					ctx.drawImage(this.hit1, 5, 0);
				} else {
					ctx.drawImage(this.hit1, 5, 0);
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
			} else if (this.hardHit == true && this.hit == true && this.air == false) {
				if (this.stunCounter < 20) {
					this.voiceChance = Math.random();
					if (this.stunCounter < 4 && this.stunCounter > 2 && this.voiceChance > .5 && this.end == false) {
						app.main.sound.playTaunt1(Math.round(getRandom(59, 61)));
					}
					if (app.main.activeSupport == false) {
						if (app.main.vegeta.attacking == true) {
							app.main.roundScore -= 4;
						}
					} else {
						if (app.main.vegeta.attacking == true || app.main.support[0].attacking == true || app.main.support[1].attacking == true) {
							app.main.roundScore -= 4;
						}
					}
					this.stun = true;
					ctx.drawImage(this.hitHard, 5, 20);
				} else {
					ctx.drawImage(this.hitHard, 5, 20);
					this.stun = false;
					this.hardHit = false;
					this.hit = false;
				}
				//HARD HIT AIR
			} else if (this.hardHit == true && this.hit == true && this.air == true && this.end == false) {
				if (this.punched == true) {
					if (app.main.activeSupport == false) {
						if (app.main.vegeta.attacking == true) {
							app.main.roundScore -= 4;
						}
					} else {
						if (app.main.vegeta.attacking == true || app.main.support[0].attacking == true || app.main.support[1].attacking == true) {
							app.main.roundScore -= 4;
						}
					}
					if (this.stunCounter < 20) {
						this.voiceChance = Math.random();
						if (this.stunCounter < 4 && this.stunCounter > 2 && this.voiceChance > .5 && this.end == false) {
							app.main.sound.playTaunt1(Math.round(getRandom(59, 61)));
						}
						this.stun = true;
						ctx.drawImage(this.fallDown, 5, 20);
					} else {
						ctx.drawImage(this.fallDown, 5, 20);
						this.stun = false;
						this.hardHit = false;
						this.hit = false;
					}
				} else {
					if (this.stunCounter < 20) {
						this.voiceChance = Math.random();
						if (this.stunCounter < 4 && this.stunCounter > 2 && this.voiceChance > .5 && this.end == false) {
							app.main.sound.playTaunt1(Math.round(getRandom(59, 61)));
						}
						if (app.main.activeSupport == false) {
							if (app.main.vegeta.attacking == true) {
								app.main.roundScore -= 4;
							}
						} else {
							if (app.main.vegeta.attacking == true || app.main.support[0].attacking == true || app.main.support[1].attacking == true) {
								app.main.roundScore -= 4;
							}
						}
						this.stun = true;
						ctx.drawImage(this.fallSide, 5, 20);
					} else {
						ctx.drawImage(this.fallSide, 5, 20);
						this.stun = false;
						this.hardHit = false;
						this.hit = false;
					}
				}
			} else if (this.end == true) {
				if (this.air == true) {
					this.stun = true;
					ctx.drawImage(this.fallDown, 5, 20);
					if (app.main.environment.fadeOut == false) {
						this.stunCounter = 0;
					}
				} else {
					this.stun = true;
					ctx.drawImage(this.ground18, -15, 90);
					if (this.stunCounter < 20) {
						app.main.environment.fadeOut = true;
					} else if (this.stunCounter > 38) {
						app.main.sound.playIntro(0);
						app.main.sound.playEffectLoud(54);
						this.dead = true;
						this.stunCounter = 0;
					}
				}
			}
		} //end if


		//SUPER SPEED (TELEPORT) DRAW 
		if (this.superSpeed == true && this.appear == false) {
			this.speedCounter++;
			ctx.save();
			ctx.scale(.9, 1.2);
			if (this.counter < 4) {
				if (this.counter < 2) {
					app.main.sound.playSpecialReaction(19);
				}
				if (this.speedCounter < 2) {
					ctx.drawImage(this.teleport, -17, -5);
				} else if (this.speedCounter < 3) {
					//blink
				} else {
					this.speedCounter = 0;
				}
			} else if (this.counter < 7) {
				this.stun = true;
				this.vanish = true;
				if (this.speedCounter < 2) {
					ctx.drawImage(this.teleport, -17, -5);
					ctx.drawImage(this.teleport, -17, -2);
				} else if (this.speedCounter < 3) {
					//blink
				} else {
					this.speedCounter = 0;
				}
			} else if (this.counter < 8) {
				this.speed();
			} else if (this.counter < 12) {
				if (this.speedCounter < 2) {
					ctx.drawImage(this.teleport, -17, -5);
					ctx.drawImage(this.teleport, -17, -2);
				} else if (this.speedCounter < 3) {
					//blink
				} else {
					this.speedCounter = 0;
				}
			} else if (this.counter < 15) {
				this.velocity.x = 0;
				this.decel.x = 0;
				//this.jumpVelocity.y = 0;
				this.vanish = false;
				if (this.speedCounter < 2) {
					ctx.drawImage(this.teleport, -17, -5);
				} else if (this.speedCounter < 3) {
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
		if (this.appear == true && this.superSpeed == true) {
			this.speedCounter++;
			ctx.save();
			ctx.scale(1.2, 1.2);
			if (this.counter < 5) {
				if (this.speedCounter < 2) {
					ctx.drawImage(this.teleport, -10, -5);
					ctx.drawImage(this.teleport, -10, -2);
				} else if (this.speedCounter < 3) {
					//blink
				} else {
					this.speedCounter = 0;
				}
			} else if (this.counter < 8) {
				this.vanish = false;
				if (this.speedCounter < 2) {
					ctx.drawImage(this.teleport, -10, -5);
				} else if (this.speedCounter < 3) {
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
}(); //end IIFE
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var haveEvents = 'ongamepadconnected' in window;
var controllers = {};

function connecthandler(e) {
  addgamepad(e.gamepad);
}

function addgamepad(gamepad) {
  controllers[gamepad.index] = gamepad;

  var d = document.createElement("div");
  d.setAttribute("id", "controller" + gamepad.index);

  var t = document.createElement("h1");
  t.appendChild(document.createTextNode("gamepad: " + gamepad.id));
  d.appendChild(t);

  var b = document.createElement("div");
  b.className = "buttons";
  for (var i = 0; i < gamepad.buttons.length; i++) {
    var e = document.createElement("span");
    e.className = "button";
    //e.id = "b" + i;
    e.innerHTML = i;
    b.appendChild(e);
  }

  d.appendChild(b);

  var a = document.createElement("div");
  a.className = "axes";

  for (var i = 0; i < gamepad.axes.length; i++) {
    var p = document.createElement("progress");
    p.className = "axis";
    //p.id = "a" + i;
    p.setAttribute("max", "2");
    p.setAttribute("value", "1");
    p.innerHTML = i;
    a.appendChild(p);
  }

  d.appendChild(a);

  // See https://github.com/luser/gamepadtest/blob/master/index.html
  var start = document.getElementById("start");
  if (start) {
    start.style.display = "none";
  }

  document.body.appendChild(d);
  requestAnimationFrame(updateStatus);
}

function disconnecthandler(e) {
  removegamepad(e.gamepad);
}

function removegamepad(gamepad) {
  var d = document.getElementById("controller" + gamepad.index);
  document.body.removeChild(d);
  delete controllers[gamepad.index];
}

function updateStatus() {
  if (!haveEvents) {
    scangamepads();
  }

  var i = 0;
  var j;

  for (j in controllers) {
    var controller = controllers[j];
    var d = document.getElementById("controller" + j);
    var buttons = d.getElementsByClassName("button");

    for (i = 0; i < controller.buttons.length; i++) {
      var b = buttons[i];
      var val = controller.buttons[i];
      var pressed = val == 1.0;
      if ((typeof val === "undefined" ? "undefined" : _typeof(val)) == "object") {
        pressed = val.pressed;
        val = val.value;
      }

      var pct = Math.round(val * 100) + "%";
      b.style.backgroundSize = pct + " " + pct;

      if (pressed) {
        b.className = "button pressed";
      } else {
        b.className = "button";
      }
    }

    var axes = d.getElementsByClassName("axis");
    for (i = 0; i < controller.axes.length; i++) {
      var a = axes[i];
      a.innerHTML = i + ": " + controller.axes[i].toFixed(4);
      a.setAttribute("value", controller.axes[i] + 1);
    }
  }

  requestAnimationFrame(updateStatus);
}

function scangamepads() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : [];
  for (var i = 0; i < gamepads.length; i++) {
    if (gamepads[i]) {
      if (gamepads[i].index in controllers) {
        controllers[gamepads[i].index] = gamepads[i];
      } else {
        addgamepad(gamepads[i]);
      }
    }
  }
}

window.addEventListener("gamepadconnected", connecthandler);
window.addEventListener("gamepaddisconnected", disconnecthandler);

if (!haveEvents) {
  setInterval(scangamepads, 500);
}

"use strict";

var app = app || {};

app.Emitter = function () {

	function Emitter() {
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
	var p = Emitter.prototype;

	p.createParticles = function (emitterPoint) {
		// initialize particle array
		this._particles = [];

		// create exhaust particles
		for (var i = 0; i < this.numParticles; i++) {
			// create a particle object and add to array
			var p = {};
			this._particles.push(_initParticle(this, p, emitterPoint));
		}

		// log the particles
		//console.log(this._particles );
	};

	p.updateAndDraw = function (ctx, emitterPoint) {
		/* move and draw particles */
		// each frame, loop through particles array
		// move each particle down screen, and slightly left or right
		// make it bigger, and fade it out
		// increase its age so we know when to recycle it

		for (var i = 0; i < this._particles.length; i++) {
			var p = this._particles[i];

			p.age += this.decayRate;
			p.r += this.expansionRate;
			p.x += p.xSpeed;
			p.y += p.ySpeed;
			var alpha = 1 - p.age / this.lifetime;

			if (this.useSquares) {
				// fill a rectangle	
				ctx.fillStyle = "rgba(" + this.red + "," + this.green + "," + this.blue + "," + alpha + ")";
				ctx.fillRect(p.x, p.y, p.r, p.r);
				// note: this code is easily modified to draw images
			}

			if (this.useCircles) {
				// fill a circle
				ctx.fillStyle = "rgba(" + this.red + "," + this.green + "," + this.blue + "," + alpha + ")";

				ctx.beginPath();
				ctx.arc(p.x, 0, p.r, Math.PI * 2, false);
				ctx.closePath();
				ctx.fill();
			}

			if (this.useCircles2) {
				// fill a circle
				ctx.fillStyle = "rgba(" + this.red + "," + this.green + "," + this.blue + "," + alpha + ")";

				ctx.beginPath();
				ctx.arc(p.x, p.y, p.r, Math.PI * 2, false);
				ctx.closePath();
				ctx.fill();
			}

			// if the particle is too old, recycle it
			if (p.age >= this.lifetime) {
				_initParticle(this, p, emitterPoint);
			}
		} // end for loop of this._particles
	}; // end updateAndDraw()

	// "private" method
	function _initParticle(obj, p, emitterPoint) {

		// give it a random age when first created
		p.age = getRandom(0, obj.lifetime);

		p.x = emitterPoint.x + getRandom(-obj.xRange, obj.xRange);
		p.y = emitterPoint.y + getRandom(0, obj.yRange);
		p.r = getRandom(obj.startRadius / 2, obj.startRadius); // radius
		p.xSpeed = getRandom(obj.minXspeed, obj.maxXspeed);
		p.ySpeed = getRandom(obj.minYspeed, obj.maxYspeed);
		return p;
	};

	return Emitter;
}();

"use strict";

var app = app || {};

app.Energy = function () {

	function Energy(initX, initY, left, user, attackType) {

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
		this.tracking = new Victor(0, 0);
		this.noTrack = false;

		this.turnDown = false;
		this.firstTurn = false;
		this.turnLocation = 0;

		this.groundTrigger = false;

		this.fix = false;
		this.fix2 = false;

		this.getAngle = getRandom(0, 360);

		//this.position = new Victor(initX,initY);
		this.local = new Victor(initX, initY);
		if (this.type == 0) {
			this.size = new Victor(60, 35);
			this.attackSize = new Victor(60, 35);
			this.position = new Victor(initX, initY);
			this.attackPosition = new Victor(initX, initY);
		} else if (this.type == 1) {
			if (this.dirLeft == true) {
				this.size = new Victor(100, 60);
				this.attackSize = new Victor(100, 60);
				this.position = new Victor(initX - 200, initY + 10);
				this.attackPosition = new Victor(initX - 200, initY + 10);
			} else {
				this.size = new Victor(100, 60);
				this.attackSize = new Victor(100, 60);
				this.position = new Victor(initX, initY + 10);
				this.attackPosition = new Victor(initX, initY + 10);
			}
		} else if (this.type == 2) {
			if (this.dirLeft == true) {
				this.size = new Victor(120, 20);
				this.attackSize = new Victor(120, 20);
				this.position = new Victor(initX - 200, initY + 10);
				this.attackPosition = new Victor(initX - 200, initY + 10);
			} else {
				this.size = new Victor(120, 20);
				this.attackSize = new Victor(120, 20);
				this.position = new Victor(initX, initY + 10);
				this.attackPosition = new Victor(initX, initY + 10);
			}
		} else if (this.type == 3) {
			if (this.dirLeft == true) {
				this.size = new Victor(120, 120);
				this.attackSize = new Victor(120, 120);
				this.position = new Victor(initX, initY - 45);
				this.attackPosition = new Victor(initX, initY - 45);
			} else {
				this.size = new Victor(120, 120);
				this.attackSize = new Victor(120, 120);
				this.position = new Victor(initX, initY - 45);
				this.attackPosition = new Victor(initX, initY - 45);
			}
		} else if (this.type == 5) {
			if (this.dirLeft == true) {
				this.size = new Victor(50, 35);
				this.attackSize = new Victor(50, 35);
				this.position = new Victor(initX - 15, initY - 25);
				this.attackPosition = new Victor(initX - 15, initY - 25);
			} else {
				this.size = new Victor(50, 35);
				this.attackSize = new Victor(50, 35);
				this.position = new Victor(initX + 30, initY - 25);
				this.attackPosition = new Victor(initX + 30, initY - 25);
			}
		} else if (this.type == 6) {
			if (this.dirLeft == true) {
				this.size = new Victor(400, 15);
				this.attackSize = new Victor(400, 15);
				this.position = new Victor(initX - 140, initY + 10);
				this.attackPosition = new Victor(initX - 140, initY + 10);
			} else {
				this.size = new Victor(400, 15);
				this.attackSize = new Victor(400, 15);
				this.position = new Victor(initX - 350, initY + 10);
				this.attackPosition = new Victor(initX - 350, initY + 10);
			}
		} else if (this.type == 7) {
			if (this.dirLeft == true) {
				this.size = new Victor(120, 40);
				this.attackSize = new Victor(120, 40);
				this.position = new Victor(initX - 200, initY + 10);
				this.attackPosition = new Victor(initX - 200, initY + 10);
			} else {
				this.size = new Victor(120, 40);
				this.attackSize = new Victor(120, 40);
				this.position = new Victor(initX, initY + 10);
				this.attackPosition = new Victor(initX, initY + 10);
			}
		} else if (this.type == 9) {
			if (this.dirLeft == true) {
				this.size = new Victor(4024, 210);
				this.attackSize = new Victor(4024, 210);
				this.position = new Victor(initX - 1000, initY - 100);
				this.attackPosition = new Victor(initX - 1000, initY - 100);
			} else {
				this.size = new Victor(4024, 210);
				this.attackSize = new Victor(4024, 210);
				this.position = new Victor(initX - 1000, initY - 100);
				this.attackPosition = new Victor(initX - 1000, initY - 100);
			}
		} else if (this.type == 10) {
			this.size = new Victor(60, 20);
			this.attackSize = new Victor(60, 20);
			this.position = new Victor(initX, initY);
			this.attackPosition = new Victor(initX, initY);
		}

		this.exploding = false;
		this.activated = false;

		//PREP PARTICLE EFFECT
		for (var i = 0; i < 20; i++) {
			this.exhaust[i] = new app.Emitter();
			this.exhaust[i].numParticles = 100;
			this.exhaust[i].red = 248;
			this.exhaust[i].green = 200;
			this.exhaust[i].blue = 24;
			this.exhaust[i].expansionRate = -1;
			this.exhaust[i].lifetime = 20;
			this.exhaust[i].startRadius = 10;
			this.exhaust[i].createParticles({ x: 10, y: 10 });
		}

		//IMAGES
		var image = new Image();
		image.src = app.attack.blast1;
		this.blast1 = image;

		image = new Image();
		image.src = app.attack.beamB1;
		this.beamB1 = image;

		image = new Image();
		image.src = app.attack.beamB2;
		this.beamB2 = image;

		image = new Image();
		image.src = app.attack.beamB3;
		this.beamB3 = image;

		image = new Image();
		image.src = app.attack.beamB4;
		this.beamB4 = image;

		image = new Image();
		image.src = app.attack.beamB5;
		this.beamB5 = image;

		image = new Image();
		image.src = app.attack.beamT1;
		this.beamT1 = image;

		image = new Image();
		image.src = app.attack.beam1;
		this.beam1 = image;

		image = new Image();
		image.src = app.attack.beam2;
		this.beam2 = image;

		image = new Image();
		image.src = app.attack.beam3;
		this.beam3 = image;

		image = new Image();
		image.src = app.attack.beam4;
		this.beam4 = image;

		image = new Image();
		image.src = app.attack.beam5;
		this.beam5 = image;

		image = new Image();
		image.src = app.attack.ball1;
		this.ball1 = image;

		image = new Image();
		image.src = app.attack.triBeam;
		this.triBeam = image;

		image = new Image();
		image.src = app.attack.explosion1;
		this.explosion1 = image;

		image = new Image();
		image.src = app.attack.explosion2;
		this.explosion2 = image;

		image = new Image();
		image.src = app.attack.explosion3;
		this.explosion3 = image;

		image = new Image();
		image.src = app.attack.explosion4;
		this.explosion4 = image;

		image = new Image();
		image.src = app.attack.explosion5;
		this.explosion5 = image;

		image = new Image();
		image.src = app.attack.explosion6;
		this.explosion6 = image;

		image = new Image();
		image.src = app.attack.bigExplosion1;
		this.bigExplosion1 = image;

		image = new Image();
		image.src = app.attack.bigExplosion2;
		this.bigExplosion2 = image;

		image = new Image();
		image.src = app.attack.bigExplosion3;
		this.bigExplosion3 = image;

		image = new Image();
		image.src = app.attack.bigExplosion4;
		this.bigExplosion4 = image;

		image = new Image();
		image.src = app.attack.bigExplosion5;
		this.bigExplosion5 = image;

		image = new Image();
		image.src = app.attack.bigExplosion6;
		this.bigExplosion6 = image;

		image = new Image();
		image.src = app.attack.circleExplosion2;
		this.circleExplosion2 = image;

		image = new Image();
		image.src = app.attack.circleExplosion3;
		this.circleExplosion3 = image;

		image = new Image();
		image.src = app.attack.circleExplosion4;
		this.circleExplosion4 = image;

		image = new Image();
		image.src = app.attack.circleExplosion5;
		this.circleExplosion5 = image;

		image = new Image();
		image.src = app.attack.circleExplosion6;
		this.circleExplosion6 = image;

		image = new Image();
		image.src = app.attack.disk1;
		this.disk1 = image;

		image = new Image();
		image.src = app.attack.disk2;
		this.disk2 = image;
	}

	//DRAW ENERGY ATTACKS
	Energy.prototype.draw = function (ctx) {
		if (this.moving == true) {
			this.lifetime++;
		}

		//console.log("BLAST IS AT: " + this.position);

		//if((hitTest(this,app.main.android18) != true && hitTest(this,app.main.vegeta) != true) || this.type == 1 || this.type == 2 || this.type == 3){
		this.activated = true;
		//console.log("ACTIVATED!");
		//}


		//HIT BOX UPDATES
		if (this.type == 0) {
			if (this.dirLeft == true) {
				this.attackPosition.x = this.position.x - 50;
				this.attackPosition.y = this.position.y;
			} else {
				this.attackPosition.x = this.position.x;
				this.attackPosition.y = this.position.y;
			}
		} else if (this.type == 1) {
			if (this.dirLeft == true) {
				this.attackPosition.x = this.position.x + 20;
				this.attackPosition.y = this.position.y - 30;
			} else {
				this.attackPosition.x = this.position.x + 140;
				this.attackPosition.y = this.position.y - 30;
			}
		} else if (this.type == 2) {
			if (this.dirLeft == true) {
				this.attackPosition.x = this.position.x - 20;
				this.attackPosition.y = this.position.y - 10;
			} else {
				this.attackPosition.x = this.position.x + 145;
				this.attackPosition.y = this.position.y - 10;
			}
		} else if (this.type == 3) {
			if (this.dirLeft == true) {
				this.attackPosition.x = this.position.x - 80;
				this.attackPosition.y = this.position.y - 20;
			} else {
				this.attackPosition.x = this.position.x + 60;
				this.attackPosition.y = this.position.y - 20;
			}
		} else if (this.type == 4) {
			if (this.dirLeft == true) {
				this.attackPosition.x = this.position.x;
				this.attackPosition.y = this.position.y;
			} else {
				this.attackPosition.x = this.position.x;
				this.attackPosition.y = this.position.y;
			}
		} else if (this.type == 5) {
			if (this.dirLeft == true) {
				this.attackPosition.x = this.position.x - 20;
				this.attackPosition.y = this.position.y - 10;
			} else {
				this.attackPosition.x = this.position.x - 30;
				this.attackPosition.y = this.position.y - 10;
			}
		} else if (this.type == 6) {
			if (this.dirLeft == true) {
				this.attackPosition.x = this.position.x;
				this.attackPosition.y = this.position.y - 10;
			} else {
				this.attackPosition.x = this.position.x + 135;
				this.attackPosition.y = this.position.y - 10;
			}
		} else if (this.type == 7) {
			if (this.dirLeft == true) {
				if (this.turnTrigger == true && this.fix == true && this.turnDown == false) {
					this.size = new Victor(65, 80);
					this.attackSize = new Victor(65, 80);
					this.attackPosition.x = this.position.x + 152;
					this.attackPosition.y = this.position.y - 165;
				} else if (this.turnTrigger == true && this.fix == true && this.turnDown == true) {
					this.size = new Victor(65, 80);
					this.attackSize = new Victor(65, 80);
					this.attackPosition.x = this.position.x + 152;
					this.attackPosition.y = this.position.y + 85;
				} else {
					this.size = new Victor(80, 65);
					this.attackSize = new Victor(80, 65);
					this.attackPosition.x = this.position.x;
					this.attackPosition.y = this.position.y - 35;
				}
			} else {
				if (this.turnTrigger == true && this.turnDown == false) {
					this.size = new Victor(65, 80);
					this.attackSize = new Victor(65, 80);
					this.attackPosition.x = this.position.x + 140;
					this.attackPosition.y = this.position.y - 65;
				} else if (this.turnTrigger == true && this.turnDown == true) {
					this.size = new Victor(65, 80);
					this.attackSize = new Victor(65, 80);
					this.attackPosition.x = this.position.x + 140;
					this.attackPosition.y = this.position.y - 15;
				} else {
					this.size = new Victor(80, 65);
					this.attackSize = new Victor(80, 65);
					this.attackPosition.x = this.position.x + 155;
					this.attackPosition.y = this.position.y - 35;
				}
			}
		} else if (this.type == 9) {
			if (this.dirLeft == true) {
				this.attackPosition.x = this.position.x;
				this.attackPosition.y = this.position.y;
			} else {
				this.attackPosition.x = this.position.x;
				this.attackPosition.y = this.position.y;
			}
		} else if (this.type == 10) {
			if (this.dirLeft == true) {
				this.attackPosition.x = this.position.x - 80;
				this.attackPosition.y = this.position.y;
			} else {
				this.attackPosition.x = this.position.x + 20;
				this.attackPosition.y = this.position.y;
			}
		}

		if (this.dirLeft == true && this.exploding == false) {
			if (this.type == 0) {
				this.exhaust[0].minXspeed = 5;
				this.exhaust[0].maxXspeed = 20;
				ctx.save();
				ctx.translate(this.position.x, this.position.y + 10);
				if (this.lifetime > 1) {
					this.exhaust[0].updateAndDraw(ctx, { x: 0, y: 0 });
				}

				ctx.save();
				ctx.scale(-2, 2);
				ctx.drawImage(this.blast1, -10, -8);
				ctx.restore();
				this.position.x = this.position.x - 25;
				if (app.main.vegeta.position.y < this.position.y + 200 && app.main.vegeta.position.y > this.position.y - 200 && this.noTrack == false) {
					if (app.main.vegeta.position.x < this.position.x) {
						if (app.main.vegeta.position.y < this.position.y - 50) {
							this.position.y -= 8;
						}
						if (app.main.vegeta.position.y > this.position.y) {
							this.position.y += 8;
						}
					}
				} else {
					this.noTrack = true;
				}

				if (app.main.vegeta.focus17 == false) {

					if (app.main.android18.position.x < this.position.x) {
						if (app.main.android18.position.y < this.position.y - 50) {
							this.position.y -= 8;
						}
						if (app.main.android18.position.y > this.position.y) {
							this.position.y += 8;
						}
					}
				} else {
					if (app.main.android17.position.x < this.position.x) {
						if (app.main.android17.position.y < this.position.y - 50) {
							this.position.y -= 8;
						}
						if (app.main.android17.position.y > this.position.y) {
							this.position.y += 8;
						}
					}
				}
				this.position.x = this.position.x - 25;
				ctx.restore();
			} else if (this.type == 1) {
				//Standard large beam
				ctx.save();
				ctx.translate(this.position.x + 160, this.position.y);
				ctx.scale(-2, 2);
				ctx.drawImage(this.beamB1, 22, -16.5, 50, 35);
				this.position.x = this.position.x - 50;
				ctx.restore();
				ctx.save();
				this.replace = 0;
				if (this.lifetime > 10) {
					ctx.translate(this.position.x + 660, this.position.y);
				} else {
					this.copy = this.copy + 1;
					ctx.translate(this.local.x - 40, this.local.y + 10);
				}

				for (var i = 0; i < this.copy; i++) {
					this.replace = this.replace - 50;

					if (this.lifetime > 10 && i == 0) {
						ctx.drawImage(this.beamT1, this.replace, -8, 60, 20);
					} else {
						ctx.drawImage(this.beam1, this.replace, -8, 60, 20);
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
				if (this.lifetime > 10) {
					//Nothing
				} else {
					ctx.translate(this.local.x, this.local.y + 10);
					ctx.drawImage(this.beamB1, -84, -28, 65, 60);
				}

				ctx.restore();
				if (this.limetime > 30) {
					this.lifetime = 301;
				}
			} else if (this.type == 2) {
				//Finger beam
				ctx.save();
				ctx.translate(this.position.x + 160, this.position.y);
				ctx.scale(-2, 2);
				ctx.drawImage(this.beamB1, 22, -5.5, 60, 8.75);
				this.position.x = this.position.x - 50;
				ctx.restore();
				ctx.save();
				this.replace = 0;
				if (this.lifetime > 10) {
					ctx.translate(this.position.x + 660, this.position.y);
				} else {
					this.copy = this.copy + 1;
					ctx.translate(this.local.x - 40, this.local.y + 10);
				}

				for (var i = 0; i < this.copy; i++) {
					this.replace = this.replace - 50;

					if (this.lifetime > 10 && i == 0) {
						ctx.drawImage(this.beamT1, this.replace, -5, 60, 5);
					} else {
						ctx.drawImage(this.beam1, this.replace, -5, 60, 5);
					}
				}
				ctx.restore();
				ctx.save();
				if (this.lifetime > 10) {
					//Nothing
				} else {
					ctx.translate(this.local.x, this.local.y + 10);
					ctx.drawImage(this.beamB1, -86, -10.5, 65, 15);
				}

				ctx.restore();
				if (this.limetime > 30) {
					this.lifetime = 301;
				}
			} else if (this.type == 3) {
				ctx.save();
				ctx.translate(this.position.x, this.position.y + 10);
				if (this.lifetime > 1) {
					for (var i = 1; i < 10; i++) {
						this.exhaust[i].minXspeed = 5;
						this.exhaust[i].maxXspeed = 20;
						this.exhaust[i].useCircles = false;
						this.exhaust[i].useCircles2 = true;
						this.exhaust[i].updateAndDraw(ctx, { x: 0, y: i * 6 });
					}
				}

				ctx.save();
				ctx.scale(-2, 2);
				ctx.drawImage(this.ball1, -10, -8);
				ctx.restore();
				this.position.x = this.position.x - 50;
				ctx.restore();
				if (this.limetime > 30) {
					//console.log("DISAPEAR");
					this.lifetime = 301;
				}
			} else if (this.type == 5) {
				//Piccolo ball
				ctx.save();
				ctx.translate(this.position.x, this.position.y + 10);
				ctx.save();
				ctx.scale(-2, 2);
				if (this.moving == false && this.triggerState == 0) {
					this.count++;
					if (this.count < 2) {
						ctx.drawImage(this.ball1, -10, -8, 15, 15);
					} else {
						this.count = 0;
					}
				} else {
					ctx.drawImage(this.ball1, -10, -8, 15, 15);
				}
				if (this.trigger == true && this.triggerState == 0) {
					this.trigger = false;
					//this.moving = true;
					if (app.main.android18.position.x < this.position.x) {
						if (app.main.android18.position.y < this.position.y - 50) {
							this.triggerState = 1;
						}
						if (app.main.android18.position.y > this.position.y) {
							this.triggerState = 2;
						}
					} else if (app.main.android18.position.x > this.position.x) {
						if (app.main.android18.position.y < this.position.y - 50) {
							this.triggerState = 3;
						}
						if (app.main.android18.position.y > this.position.y) {
							this.triggerState = 4;
						}
					}
					this.tracking = new Victor(app.main.android18.position.x, app.main.android18.position.y);
				}
				ctx.restore();
				if (this.moving == true) {
					if (this.triggerState == 0) {
						this.position.x = this.position.x - 50;
					}
				}

				if (this.triggerState == 1 && this.turnTrigger == false) {

					if (this.tracking.x < this.position.x) {
						this.position.x -= 35;
					}
					if (this.tracking.y + 50 < this.position.y) {
						this.position.y -= 35;
					}
					if (this.tracking.x >= this.position.x && this.tracking.y + 50 >= this.position.y) {
						this.turnTrigger = true;
					}
				} else if (this.triggerState == 2 && this.turnTrigger == false) {

					if (this.tracking.x < this.position.x) {
						this.position.x -= 35;
					}
					if (this.tracking.y + 50 > this.position.y) {
						this.position.y += 35;
					}
					if (this.tracking.x >= this.position.x && this.tracking.y + 50 <= this.position.y) {
						this.turnTrigger = true;
					}
				} else if (this.triggerState == 3 && this.turnTrigger == false) {

					if (this.tracking.x > this.position.x) {
						this.position.x += 35;
					}
					if (this.tracking.y + 50 < this.position.y) {
						this.position.y -= 35;
					}
					if (this.tracking.x <= this.position.x && this.tracking.y + 50 >= this.position.y) {
						this.turnTrigger = true;
					}
				} else if (this.triggerState == 4 && this.turnTrigger == false) {

					if (this.tracking.x > this.position.x) {
						this.position.x += 35;
					}
					if (this.tracking.y + 50 > this.position.y) {
						this.position.y += 35;
					}
					if (this.tracking.x <= this.position.x && this.tracking.y + 50 <= this.position.y) {
						this.turnTrigger = true;
					}
				}

				if (this.turnTrigger == true && this.lockedIn == 0) {
					if (this.position.y < app.main.android18.position.y + 125 && this.position.y > app.main.android18.position.y - 75) {
						if (this.tracking.x < app.main.android18.position.x) {
							this.lockedIn = 1;
						} else {
							this.lockedIn = 2;
						}
					} else {
						if (this.tracking.y < app.main.android18.position.y) {
							this.lockedIn = 3;
						} else {
							this.lockedIn = 4;
						}
					}
				}

				if (this.lockedIn != 0) {
					if (this.lockedIn == 1) {
						this.position.x += 35;
					} else if (this.lockedIn == 2) {
						this.position.x -= 35;
					} else if (this.lockedIn == 3) {
						this.position.y += 35;
					} else if (this.lockedIn == 4) {
						this.position.y -= 35;
					}
				}

				if (this.position.y > 725) {
					app.main.sound.playEnergyReaction(6);
					app.main.environment.shake = true;
					this.exploding = true;
				}

				ctx.restore();
				if (this.lifetime > getRandom(2, 40) && this.lockedIn == 0) {
					this.lifetime = 0;
					this.moving = false;
				} else if (this.lifetime > 100) {
					this.exploding = true;
				}
			} else if (this.type == 6) {
				//Special beam
				this.position.x = this.position.x - 50;

				ctx.save();
				this.replace = 0;
				if (this.lifetime > 10) {
					ctx.translate(this.position.x + 600, this.position.y);
				} else {
					this.copy = this.copy + 1;
					ctx.translate(this.local.x - 40, this.local.y + 10);
				}

				for (var i = 0; i < this.copy; i++) {
					this.replace = this.replace - 50;

					if (this.lifetime > 10 && i == 0) {
						ctx.drawImage(this.beamT1, this.replace, -4, 60, 5);
					} else {
						ctx.drawImage(this.beam2, this.replace, -8, 50, 13);
					}
				}
				ctx.restore();
				ctx.save();
				if (this.lifetime > 10) {
					//Nothing
				} else {
					ctx.translate(this.local.x, this.local.y + 10);
					ctx.scale(-1, 1);
					ctx.drawImage(this.beamB2, -35, -40, 120, 100);
				}

				ctx.restore();

				ctx.save();
				ctx.translate(this.position.x + 100, this.position.y);
				ctx.scale(2, 2);
				ctx.drawImage(this.beamB2, -65, -16, 90, 40);
				ctx.restore();

				if (this.limetime > 30) {
					this.lifetime = 301;
				}
			} else if (this.type == 7) {
				//Mesenko


				if (this.trigger == true) {
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
				if (this.fix == false) {
					ctx.scale(-2, 2);
					ctx.drawImage(this.beamB3, 22, -16.5, 50, 32);
					this.position.x = this.position.x - 50;
				} else {
					if (this.turnDown == false) {
						ctx.scale(-2, -2);
						ctx.drawImage(this.beamB4, -28, 33.5, 32, 50);
						this.position.y = this.position.y - 50;
					} else {
						ctx.scale(-2, 2);
						ctx.drawImage(this.beamB4, -28, 33.5, 32, 50);
						this.position.y = this.position.y + 50;
					}
				}
				ctx.restore();
				ctx.save();
				this.replace = 0;
				this.replace2 = 0;
				if (this.lifetime > 30) {
					ctx.translate(this.position.x + 660, this.position.y);
				} else {
					this.copy = this.copy + 1;
					ctx.translate(this.local.x - 40, this.local.y + 10);
				}

				for (var i = 0; i < this.copy; i++) {
					if (this.turnTrigger == false) {
						this.replace = this.replace - 50;
					} else {
						this.replace = this.replace - 50;
					}

					if (this.lifetime > 30 && i == 0) {
						ctx.save();
						ctx.scale(-1, 1);
						ctx.drawImage(this.beamT1, this.replace * -1 - 50, -8, 60, 14);
						ctx.restore();
					} else {
						if (this.turnTrigger == false) {
							ctx.drawImage(this.beam3, this.replace, -8, 60, 14);
						} else {
							if (i < this.triggerState) {
								ctx.drawImage(this.beam3, this.replace, -8, 60, 14);
								this.turnLocation = this.replace;
							} else if (i < this.triggerState + 1) {
								this.fix = true;
								if (this.turnDown == false) {
									ctx.save();
									ctx.scale(-1, -1);
									ctx.drawImage(this.beam4, this.turnLocation * -1, -6, 32, 32);
									ctx.restore();
								} else {
									ctx.save();
									ctx.scale(-1, 1);
									ctx.drawImage(this.beam4, this.turnLocation * -1, -8, 32, 33);
									ctx.restore();
								}
							} else {
								//console.log("DRAW DRAW DRAW %%%%%%%%%%%");
								//console.log(this.turnLocation);
								//console.log(this.replace2);
								if (this.turnDown == false) {
									ctx.save();
									ctx.scale(-1, 1);
									ctx.drawImage(this.beam5, (this.turnLocation - 18) * -1, this.replace2 - 8 - 77, 14, 60);
									this.replace2 = this.replace2 - 50;
									ctx.restore();
								} else {
									ctx.save();
									ctx.scale(-1, 1);
									ctx.drawImage(this.beam5, (this.turnLocation - 18) * -1, this.replace2 - 8 + 27, 14, 60);
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

				if (this.position.y > 725) {
					app.main.sound.playEnergyReaction(6);
					this.groundTrigger = true;
					app.main.environment.shake = true;
					this.exploding = true;
				}

				if (this.lifetime > 30) {
					//Nothing
				} else {
					ctx.translate(this.local.x, this.local.y + 10);
					ctx.scale(1, 1);
					ctx.drawImage(this.beamB5, -84, -24, 65, 46);
				}

				ctx.restore();
				if (this.limetime > 40) {
					this.lifetime = 301;
				}
			} else if (this.type == 9) {
				//TriBeam
				this.counter++;
				ctx.save();
				ctx.translate(this.position.x, this.position.y);
				if (this.counter < 2) {
					ctx.globalAlpha = .7;
					ctx.drawImage(this.triBeam, 0, 0);
				} else {
					//ctx.globalAlpha = .6;
					//ctx.drawImage(this.triBeam,0,0);
					this.counter = 0;
				}
				ctx.restore();

				if (this.lifetime > 20) {
					this.lifetime = 300;
				}
			} else if (this.type == 10) {
				ctx.save();
				ctx.translate(this.position.x, this.position.y + 10);
				ctx.save();
				ctx.scale(-2, 2);
				ctx.drawImage(this.disk2, -10, -8);
				ctx.restore();
				this.position.x = this.position.x - 25;
				if (app.main.vegeta.position.x < this.position.x) {
					if (app.main.vegeta.position.y < this.position.y - 50) {
						this.position.y -= 4;
					}
					if (app.main.vegeta.position.y > this.position.y) {
						this.position.y += 4;
					}
				}
				if (app.main.vegeta.focus17 == false) {

					if (app.main.android18.position.x < this.position.x) {
						if (app.main.android18.position.y < this.position.y - 50) {
							this.position.y -= 4;
						}
						if (app.main.android18.position.y > this.position.y) {
							this.position.y += 4;
						}
					}
				} else {
					if (app.main.android17.position.x < this.position.x) {
						if (app.main.android17.position.y < this.position.y - 50) {
							this.position.y -= 4;
						}
						if (app.main.android17.position.y > this.position.y) {
							this.position.y += 4;
						}
					}
				}
				this.position.x = this.position.x - 25;
				ctx.restore();
			}
		} else if (this.dirLeft == false && this.exploding == false) {
			if (this.type == 0) {
				this.exhaust[0].minXspeed = -5;
				this.exhaust[0].maxXspeed = -20;
				ctx.save();
				ctx.translate(this.position.x, this.position.y + 10);
				if (this.lifetime > 1) {
					this.exhaust[0].updateAndDraw(ctx, { x: 0, y: 0 });
				}
				ctx.save();
				ctx.scale(2, 2);
				ctx.drawImage(this.blast1, -10, -8);
				ctx.restore();
				this.position.x = this.position.x + 25;
				if (app.main.vegeta.position.y < this.position.y + 200 && app.main.vegeta.position.y > this.position.y - 200 && this.noTrack == false) {
					if (app.main.vegeta.position.x > this.position.x) {
						if (app.main.vegeta.position.y < this.position.y - 50) {
							this.position.y -= 8;
						}
						if (app.main.vegeta.position.y > this.position.y) {
							this.position.y += 8;
						}
					}
				} else {
					this.noTrack = true;
				}

				if (app.main.vegeta.focus17 == false) {

					if (app.main.android18.position.x > this.position.x) {
						if (app.main.android18.position.y < this.position.y - 50) {
							this.position.y -= 8;
						}
						if (app.main.android18.position.y > this.position.y) {
							this.position.y += 8;
						}
					}
				} else {
					if (app.main.android17.position.x > this.position.x) {
						if (app.main.android17.position.y < this.position.y - 50) {
							this.position.y -= 8;
						}
						if (app.main.android17.position.y > this.position.y) {
							this.position.y += 8;
						}
					}
				}

				this.position.x = this.position.x + 25;
				ctx.restore();
			} else if (this.type == 1) {
				//Standard large beam
				ctx.save();
				ctx.translate(this.position.x - 360, this.position.y);
				ctx.scale(2, 2);
				ctx.drawImage(this.beamB1, 250, -16.5, 50, 35);
				this.position.x = this.position.x + 50;
				ctx.restore();
				ctx.save();
				this.replace = 0;
				if (this.lifetime > 10) {
					ctx.translate(this.position.x - 460, this.position.y);
				} else {
					this.copy = this.copy + 1;
					ctx.translate(this.local.x + 30, this.local.y + 10);
				}

				for (var i = 0; i < this.copy; i++) {
					this.replace = this.replace + 50;

					if (this.lifetime > 10 && i == 0) {
						ctx.save();
						ctx.scale(-1, 1);
						ctx.drawImage(this.beamT1, this.replace * -1 - 50, -8, 60, 20);
						ctx.restore();
					} else {
						ctx.drawImage(this.beam1, this.replace, -8, 60, 20);
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

				if (this.lifetime > 10) {
					//Nothing
				} else {
					ctx.translate(this.local.x, this.local.y + 10);
					ctx.scale(-1, 1);
					ctx.drawImage(this.beamB1, -97, -28, 65, 60);
				}

				ctx.restore();
				if (this.limetime > 30) {
					this.lifetime = 301;
				}
			} else if (this.type == 2) {
				//Finger beam
				ctx.save();
				ctx.translate(this.position.x - 360, this.position.y);
				ctx.scale(2, 2);
				ctx.drawImage(this.beamB1, 250, -5.5, 50, 8.75);
				this.position.x = this.position.x + 50;
				ctx.restore();
				ctx.save();
				this.replace = 0;
				if (this.lifetime > 10) {
					ctx.translate(this.position.x - 460, this.position.y);
				} else {
					this.copy = this.copy + 1;
					ctx.translate(this.local.x + 30, this.local.y + 10);
				}

				for (var i = 0; i < this.copy; i++) {
					this.replace = this.replace + 50;

					if (this.lifetime > 10 && i == 0) {
						ctx.save();
						ctx.scale(-1, 1);
						ctx.drawImage(this.beamT1, this.replace * -1 - 50, -5, 60, 5);
						ctx.restore();
					} else {
						ctx.drawImage(this.beam1, this.replace, -5, 60, 5);
					}
				}
				ctx.restore();
				ctx.save();

				if (this.lifetime > 10) {
					//Nothing
				} else {
					ctx.translate(this.local.x, this.local.y + 10);
					ctx.scale(-1, 1);
					ctx.drawImage(this.beamB1, -97, -10.5, 65, 15);
				}

				ctx.restore();
				if (this.limetime > 30) {
					this.lifetime = 301;
				}
			}if (this.type == 3) {
				ctx.save();
				ctx.translate(this.position.x, this.position.y + 10);
				if (this.lifetime > 1) {
					for (var i = 1; i < 10; i++) {
						this.exhaust[i].minXspeed = -5;
						this.exhaust[i].maxXspeed = -20;
						this.exhaust[i].useCircles = false;
						this.exhaust[i].useCircles2 = true;
						this.exhaust[i].updateAndDraw(ctx, { x: 100, y: i * 6 });
					}
				}
				ctx.save();
				ctx.scale(2, 2);
				ctx.drawImage(this.ball1, 40, -8);
				ctx.restore();
				this.position.x = this.position.x + 50;
				ctx.restore();
			} else if (this.type == 5) {
				//Piccolo ball
				ctx.save();
				ctx.translate(this.position.x, this.position.y + 10);
				ctx.save();
				ctx.scale(2, 2);
				if (this.moving == false && this.triggerState == 0) {
					this.count++;
					if (this.count < 2) {
						ctx.drawImage(this.ball1, -10, -8, 15, 15);
					} else {
						this.count = 0;
					}
				} else {
					ctx.drawImage(this.ball1, -10, -8, 15, 15);
				}
				ctx.restore();
				if (this.trigger == true && this.triggerState == 0) {
					this.trigger = false;
					//this.moving = true;
					if (app.main.android18.position.x < this.position.x) {
						if (app.main.android18.position.y < this.position.y - 50) {
							this.triggerState = 1;
						}
						if (app.main.android18.position.y > this.position.y) {
							this.triggerState = 2;
						}
					} else if (app.main.android18.position.x > this.position.x) {
						if (app.main.android18.position.y < this.position.y - 50) {
							this.triggerState = 3;
						}
						if (app.main.android18.position.y > this.position.y) {
							this.triggerState = 4;
						}
					}
					this.tracking = new Victor(app.main.android18.position.x, app.main.android18.position.y);
				}
				ctx.restore();
				if (this.moving == true) {
					//console.log("MOVINGBLASTSTSTSTSTS");
					if (this.triggerState == 0) {
						this.position.x = this.position.x + 50;
					}
				}
				if (this.triggerState == 1 && this.turnTrigger == false) {

					if (this.tracking.x < this.position.x) {
						this.position.x -= 35;
					}
					if (this.tracking.y + 50 < this.position.y) {
						this.position.y -= 35;
					}
					if (this.tracking.x >= this.position.x && this.tracking.y + 50 >= this.position.y) {
						this.turnTrigger = true;
					}
				} else if (this.triggerState == 2 && this.turnTrigger == false) {

					if (this.tracking.x < this.position.x) {
						this.position.x -= 35;
					}
					if (this.tracking.y + 50 > this.position.y) {
						this.position.y += 35;
					}
					if (this.tracking.x >= this.position.x && this.tracking.y + 50 <= this.position.y) {
						this.turnTrigger = true;
					}
				} else if (this.triggerState == 3 && this.turnTrigger == false) {

					if (this.tracking.x > this.position.x) {
						this.position.x += 35;
					}
					if (this.tracking.y + 50 < this.position.y) {
						this.position.y -= 35;
					}
					if (this.tracking.x <= this.position.x && this.tracking.y + 50 >= this.position.y) {
						this.turnTrigger = true;
					}
				} else if (this.triggerState == 4 && this.turnTrigger == false) {

					if (this.tracking.x > this.position.x) {
						this.position.x += 35;
					}
					if (this.tracking.y + 50 > this.position.y) {
						this.position.y += 35;
					}
					if (this.tracking.x <= this.position.x && this.tracking.y + 50 <= this.position.y) {
						this.turnTrigger = true;
					}
				}

				if (this.turnTrigger == true && this.lockedIn == 0) {
					if (this.position.y < app.main.android18.position.y + 125 && this.position.y > app.main.android18.position.y - 75) {
						if (this.tracking.x < app.main.android18.position.x) {
							this.lockedIn = 1;
						} else {
							this.lockedIn = 2;
						}
					} else {
						if (this.tracking.y < app.main.android18.position.y) {
							this.lockedIn = 3;
						} else {
							this.lockedIn = 4;
						}
					}
				}

				if (this.lockedIn != 0) {
					if (this.lockedIn == 1) {
						this.position.x += 35;
					} else if (this.lockedIn == 2) {
						this.position.x -= 35;
					} else if (this.lockedIn == 3) {
						this.position.y += 35;
					} else if (this.lockedIn == 4) {
						this.position.y -= 35;
					}
				}

				if (this.position.y > 725) {
					app.main.sound.playEnergyReaction(6);
					app.main.environment.shake = true;
					this.exploding = true;
				}

				ctx.restore();
				if (this.lifetime > getRandom(2, 40) && this.lockedIn == 0) {
					this.lifetime = 0;
					this.moving = false;
				} else if (this.lifetime > 100) {
					this.exploding = true;
				}
			} else if (this.type == 6) {
				//Special beam
				this.position.x = this.position.x + 50;
				ctx.save();
				this.replace = 0;
				if (this.lifetime > 10) {
					ctx.translate(this.position.x - 110, this.position.y);
				} else {
					this.copy = this.copy + 1;
					ctx.translate(this.local.x + 30, this.local.y + 10);
				}

				for (var i = 0; i < this.copy; i++) {
					this.replace = this.replace + 50;

					if (this.lifetime > 10 && i == 0) {
						ctx.save();
						ctx.scale(-1, 1);
						ctx.drawImage(this.beamT1, this.replace * -1 - 50, -4, 60, 5);
						ctx.restore();
					} else {
						ctx.drawImage(this.beam2, this.replace, -8, 50, 13);
					}
				}
				ctx.restore();
				ctx.save();

				if (this.lifetime > 10) {
					//Nothing
				} else {
					ctx.translate(this.local.x, this.local.y + 10);
					ctx.drawImage(this.beamB2, 0, -40, 120, 100);
				}

				ctx.restore();

				ctx.save();
				ctx.translate(this.position.x - 10, this.position.y);
				ctx.scale(-2, 2);
				ctx.drawImage(this.beamB2, -287, -16, 90, 40);
				ctx.restore();

				if (this.limetime > 30) {
					this.lifetime = 301;
				}
			} else if (this.type == 7) {
				//Gohan masenko

				if (this.trigger == true) {
					this.trigger = false;
					this.triggerState = this.copy + 1;
					//this.size = new Victor(30,150);
					//this.attackSize = new Victor(30,150);
					this.turnTrigger = true;
					this.position.x = this.position.x - 67;
					if (this.turnDown == false) {
						this.position.y = this.position.y - 50;
					} else {
						this.position.y = this.position.y + 50;
					}
				}

				ctx.save();
				ctx.translate(this.position.x - 360, this.position.y);
				if (this.turnTrigger == false) {
					ctx.scale(2, 2);
					ctx.drawImage(this.beamB3, 250, -16.5, 50, 32);
					this.position.x = this.position.x + 50;
				} else {
					if (this.turnDown == false) {
						ctx.scale(2, -2);
						ctx.drawImage(this.beamB4, 250, -16.5, 32, 50);
						this.position.y = this.position.y - 50;
					} else {
						ctx.scale(2, 2);
						ctx.drawImage(this.beamB4, 250, -16.5, 32, 50);
						this.position.y = this.position.y + 50;
					}
				}
				ctx.restore();
				ctx.save();
				this.replace = 0;
				this.replace2 = 0;
				if (this.lifetime > 30) {
					ctx.translate(this.position.x - 460, this.position.y);
				} else {
					this.copy = this.copy + 1;
					ctx.translate(this.local.x + 30, this.local.y + 10);
				}

				for (var i = 0; i < this.copy; i++) {
					if (this.turnTrigger == false) {
						this.replace = this.replace + 50;
					} else {
						this.replace = this.replace + 50;
					}

					if (this.lifetime > 30 && i == 0) {
						ctx.save();
						ctx.scale(-1, 1);
						ctx.drawImage(this.beamT1, this.replace * -1 - 50, -8, 60, 14);
						ctx.restore();
					} else {
						if (this.turnTrigger == false) {
							ctx.drawImage(this.beam3, this.replace, -8, 60, 14);
						} else {
							if (i < this.triggerState - 1) {
								ctx.drawImage(this.beam3, this.replace, -8, 60, 14);
								this.turnLocation = this.replace;
							} else if (i < this.triggerState) {
								if (this.turnDown == false) {
									ctx.save();
									ctx.scale(1, -1);
									ctx.drawImage(this.beam4, this.turnLocation + 50, -6, 32, 32);
									ctx.restore();
								} else {
									ctx.drawImage(this.beam4, this.turnLocation + 50, -8, 32, 33);
								}
							} else {
								//console.log("DRAW DRAW DRAW %%%%%%%%%%%");
								//console.log(this.turnLocation);
								//console.log(this.replace2);
								if (this.turnDown == false) {
									ctx.drawImage(this.beam5, this.turnLocation + 68, this.replace2 - 8 - 77, 14, 60);
									this.replace2 = this.replace2 - 50;
								} else {
									ctx.drawImage(this.beam5, this.turnLocation + 68, this.replace2 - 8 + 27, 14, 60);
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

				if (this.position.y > 725) {
					app.main.sound.playEnergyReaction(6);
					app.main.environment.shake = true;
					this.groundTrigger = true;
					this.exploding = true;
				}

				if (this.lifetime > 30) {
					//Nothing
				} else {
					ctx.translate(this.local.x, this.local.y + 10);
					ctx.scale(-1, 1);
					ctx.drawImage(this.beamB5, -97, -24, 65, 46);
				}

				ctx.restore();
				if (this.limetime > 40) {
					this.lifetime = 301;
				}
			} else if (this.type == 9) {
				//TriBeam
				this.counter++;
				ctx.save();
				ctx.translate(this.position.x, this.position.y);
				if (this.counter < 2) {
					ctx.scale(-1, 1);
					ctx.globalAlpha = .7;
					ctx.drawImage(this.triBeam, 0, 0);
				} else {
					ctx.globalAlpha = .6;
					ctx.drawImage(this.triBeam, 0, 0);
					this.counter = 0;
				}
				ctx.restore();

				if (this.lifetime > 20) {
					this.lifetime = 300;
				}
			} else if (this.type == 10) {
				ctx.save();
				ctx.translate(this.position.x, this.position.y + 10);
				ctx.save();
				ctx.scale(2, 2);
				ctx.drawImage(this.disk2, -10, -8);
				ctx.restore();
				this.position.x = this.position.x + 25;
				if (app.main.vegeta.position.x > this.position.x) {
					if (app.main.vegeta.position.y < this.position.y - 50) {
						this.position.y -= 4;
					}
					if (app.main.vegeta.position.y > this.position.y) {
						this.position.y += 4;
					}
				}

				if (app.main.vegeta.focus17 == false) {

					if (app.main.android18.position.x > this.position.x) {
						if (app.main.android18.position.y < this.position.y - 50) {
							this.position.y -= 4;
						}
						if (app.main.android18.position.y > this.position.y) {
							this.position.y += 4;
						}
					}
				} else {
					if (app.main.android17.position.x > this.position.x) {
						if (app.main.android17.position.y < this.position.y - 50) {
							this.position.y -= 4;
						}
						if (app.main.android17.position.y > this.position.y) {
							this.position.y += 4;
						}
					}
				}

				this.position.x = this.position.x + 25;
				ctx.restore();
			}
			//DRAW EXPLOSION
		} else if (this.exploding == true) {
			this.getAngle = getRandom(0, 360);
			this.counter++;
			if (this.type == 0) {
				ctx.save();
				ctx.translate(this.position.x - 5, this.position.y + 10);
				ctx.scale(4, 4);
				if (this.counter < 2) {
					ctx.drawImage(this.explosion1, -10, -17);
				} else if (this.counter < 3) {
					ctx.drawImage(this.explosion2, -10, -17);
				} else if (this.counter < 4) {
					ctx.drawImage(this.explosion3, -10, -17);
				} else if (this.counter < 5) {
					if (attackHitTestSmog(this.attackPosition, this.size) != true) {
						if (this.dirLeft == true) {
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 5, this.attackPosition.y - 75));
						} else {
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 55, this.attackPosition.y - 75));
						}
						app.main.environment.smogSize.push(new Victor(150, 150));
						app.main.environment.smogAlpha.push(.8);
						app.main.environment.smogTimer.push(0);
						app.main.environment.smogAngle.push(this.getAngle);
						app.main.environment.smogCount += 1;
					} else {
						if (app.main.environment.smogSize[app.main.environment.smogTarget].x < 700) {
							app.main.environment.smogSize[app.main.environment.smogTarget].x += 20;
							app.main.environment.smogSize[app.main.environment.smogTarget].y += 20;
							app.main.environment.smogPos[app.main.environment.smogTarget].x -= 10;
							app.main.environment.smogPos[app.main.environment.smogTarget].y -= 10;
						}
						if (app.main.environment.smogAlpha[app.main.environment.smogTarget] < 1.3) {
							if (app.main.environment.smogAlpha[app.main.environment.smogTarget] < .25) {
								if (this.dirLeft == true) {
									app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 5, this.attackPosition.y - 75));
								} else {
									app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 55, this.attackPosition.y - 75));
								}
								app.main.environment.smogSize.push(new Victor(150, 150));
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
					ctx.drawImage(this.explosion4, -10, -17);
				} else if (this.counter < 6) {
					ctx.drawImage(this.explosion5, -10, -17);
				} else if (this.counter < 7) {
					ctx.drawImage(this.explosion6, -10, -17);
				} else {
					this.lifetime = 301;
				}
				ctx.restore();
			} else if (this.type == 1 || this.type == 6 || this.type == 10) {
				ctx.save();
				if (this.dirLeft == true) {
					ctx.translate(this.position.x - 5, this.position.y + 10);
				} else {
					ctx.translate(this.position.x + 125, this.position.y + 10);
				}
				ctx.scale(6, 6);
				if (this.counter < 2) {
					ctx.drawImage(this.explosion1, -10, -17);
				} else if (this.counter < 3) {
					ctx.drawImage(this.explosion2, -10, -17);
				} else if (this.counter < 4) {
					ctx.drawImage(this.explosion3, -10, -17);
				} else if (this.counter < 5) {
					if (attackHitTestSmog(this.attackPosition, this.size) != true) {
						if (this.dirLeft == true) {
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 77.5, this.attackPosition.y - 75));
						} else {
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 77.5, this.attackPosition.y - 75));
						}
						app.main.environment.smogSize.push(new Victor(225, 225));
						app.main.environment.smogAlpha.push(1.1);
						app.main.environment.smogTimer.push(0);
						app.main.environment.smogAngle.push(this.getAngle);
						app.main.environment.smogCount += 1;
					} else {
						if (app.main.environment.smogSize[app.main.environment.smogTarget].x < 700) {
							app.main.environment.smogSize[app.main.environment.smogTarget].x += 100;
							app.main.environment.smogSize[app.main.environment.smogTarget].y += 100;
							app.main.environment.smogPos[app.main.environment.smogTarget].x -= 50;
							app.main.environment.smogPos[app.main.environment.smogTarget].y -= 50;
						}
						if (app.main.environment.smogAlpha[app.main.environment.smogTarget] < 1.3) {
							if (app.main.environment.smogAlpha[app.main.environment.smogTarget] < .25) {
								if (this.dirLeft == true) {
									app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 77.5, this.attackPosition.y - 75));
								} else {
									app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 77.5, this.attackPosition.y - 75));
								}
								app.main.environment.smogSize.push(new Victor(225, 225));
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
					ctx.drawImage(this.explosion4, -10, -17);
				} else if (this.counter < 6) {
					ctx.drawImage(this.explosion5, -10, -17);
				} else if (this.counter < 7) {
					ctx.drawImage(this.explosion6, -10, -17);
				} else {
					this.lifetime = 301;
				}
				ctx.restore();
			} else if (this.type == 2) {
				ctx.save();
				if (this.dirLeft == true) {
					ctx.translate(this.position.x - 5, this.position.y + 10);
				} else {
					ctx.translate(this.position.x + 125, this.position.y + 10);
				}
				ctx.scale(2.5, 2.5);
				if (this.counter < 2) {
					ctx.drawImage(this.bigExplosion1, -10, -37);
				} else if (this.counter < 3) {
					ctx.drawImage(this.bigExplosion2, -10, -37);
				} else if (this.counter < 4) {
					ctx.drawImage(this.bigExplosion3, -10, -37);
				} else if (this.counter < 5) {
					if (attackHitTestSmog(this.attackPosition, this.size) != true) {
						if (this.dirLeft == true) {
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 55, this.attackPosition.y - 90));
						} else {
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 77.5, this.attackPosition.y - 90));
						}
						app.main.environment.smogSize.push(new Victor(225, 225));
						app.main.environment.smogAlpha.push(1.1);
						app.main.environment.smogTimer.push(0);
						app.main.environment.smogAngle.push(this.getAngle);
						app.main.environment.smogCount += 1;
					} else {
						if (app.main.environment.smogSize[app.main.environment.smogTarget].x < 700) {
							app.main.environment.smogSize[app.main.environment.smogTarget].x += 100;
							app.main.environment.smogSize[app.main.environment.smogTarget].y += 100;
							app.main.environment.smogPos[app.main.environment.smogTarget].x -= 50;
							app.main.environment.smogPos[app.main.environment.smogTarget].y -= 50;
						}
						if (app.main.environment.smogAlpha[app.main.environment.smogTarget] < 1.3) {
							if (app.main.environment.smogAlpha[app.main.environment.smogTarget] < .25) {
								if (this.dirLeft == true) {
									app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 55, this.attackPosition.y - 90));
								} else {
									app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 77.5, this.attackPosition.y - 90));
								}
								app.main.environment.smogSize.push(new Victor(225, 225));
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
					ctx.drawImage(this.bigExplosion4, -10, -37);
				} else if (this.counter < 6) {
					ctx.drawImage(this.bigExplosion5, -10, -37);
				} else if (this.counter < 7) {
					ctx.drawImage(this.bigExplosion6, -10, -37);
				} else {
					this.lifetime = 301;
				}
				ctx.restore();
			} else if (this.type == 3) {
				ctx.save();
				if (this.dirLeft == true) {
					ctx.translate(this.position.x - 5, this.position.y + 10);
				} else {
					ctx.translate(this.position.x + 125, this.position.y + 10);
				}
				ctx.scale(4, 4);
				if (this.counter < 2) {
					ctx.drawImage(this.circleExplosion2, -10, -17);
				} else if (this.counter < 3) {
					ctx.drawImage(this.circleExplosion3, -10, -17);
				} else if (this.counter < 4) {
					if (attackHitTestSmog(this.attackPosition, this.size) != true) {
						if (this.dirLeft == true) {
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x + 45, this.attackPosition.y - 40));
						} else {
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x + 45, this.attackPosition.y - 40));
						}
						app.main.environment.smogSize.push(new Victor(250, 250));
						app.main.environment.smogAlpha.push(1.1);
						app.main.environment.smogTimer.push(0);
						app.main.environment.smogAngle.push(this.getAngle);
						app.main.environment.smogCount += 1;
					} else {
						if (app.main.environment.smogSize[app.main.environment.smogTarget].x < 700) {
							app.main.environment.smogSize[app.main.environment.smogTarget].x += 100;
							app.main.environment.smogSize[app.main.environment.smogTarget].y += 100;
							app.main.environment.smogPos[app.main.environment.smogTarget].x -= 50;
							app.main.environment.smogPos[app.main.environment.smogTarget].y -= 50;
						}
						if (app.main.environment.smogAlpha[app.main.environment.smogTarget] < 1.3) {
							if (app.main.environment.smogAlpha[app.main.environment.smogTarget] < .25) {
								if (this.dirLeft == true) {
									app.main.environment.smogPos.push(new Victor(this.attackPosition.x + 45, this.attackPosition.y - 40));
								} else {
									app.main.environment.smogPos.push(new Victor(this.attackPosition.x + 45, this.attackPosition.y - 40));
								}
								app.main.environment.smogSize.push(new Victor(250, 250));
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
					ctx.drawImage(this.circleExplosion4, -10, -17);
				} else if (this.counter < 5) {
					ctx.drawImage(this.circleExplosion5, -10, -17);
				} else if (this.counter < 6) {
					ctx.drawImage(this.circleExplosion6, -10, -17);
				} else {
					this.lifetime = 301;
				}
				ctx.restore();
			} else if (this.type == 5) {
				ctx.save();
				ctx.translate(this.position.x - 5, this.position.y + 10);
				ctx.scale(4, 4);
				if (this.counter < 2) {
					ctx.drawImage(this.explosion1, -10, -17);
				} else if (this.counter < 3) {
					ctx.drawImage(this.explosion2, -10, -17);
				} else if (this.counter < 4) {
					ctx.drawImage(this.explosion3, -10, -17);
				} else if (this.counter < 5) {
					if (attackHitTestSmog(this.attackPosition, this.size) != true) {
						if (this.dirLeft == true) {
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 5, this.attackPosition.y - 75));
						} else {
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 55, this.attackPosition.y - 75));
						}
						app.main.environment.smogSize.push(new Victor(150, 150));
						app.main.environment.smogAlpha.push(.8);
						app.main.environment.smogTimer.push(0);
						app.main.environment.smogAngle.push(this.getAngle);
						app.main.environment.smogCount += 1;
					} else {
						if (app.main.environment.smogSize[app.main.environment.smogTarget].x < 700) {
							app.main.environment.smogSize[app.main.environment.smogTarget].x += 20;
							app.main.environment.smogSize[app.main.environment.smogTarget].y += 20;
							app.main.environment.smogPos[app.main.environment.smogTarget].x -= 10;
							app.main.environment.smogPos[app.main.environment.smogTarget].y -= 10;
						}
						if (app.main.environment.smogAlpha[app.main.environment.smogTarget] < 1.3) {
							if (app.main.environment.smogAlpha[app.main.environment.smogTarget] < .25) {
								if (this.dirLeft == true) {
									app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 5, this.attackPosition.y - 75));
								} else {
									app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 55, this.attackPosition.y - 75));
								}
								app.main.environment.smogSize.push(new Victor(150, 150));
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
					ctx.drawImage(this.explosion4, -10, -17);
				} else if (this.counter < 6) {
					ctx.drawImage(this.explosion5, -10, -17);
				} else if (this.counter < 7) {
					ctx.drawImage(this.explosion6, -10, -17);
				} else {
					this.lifetime = 301;
				}
				ctx.restore();
			} else if (this.type == 7) {
				ctx.save();
				if (this.dirLeft == true) {
					if (this.groundTrigger == false && this.turnTrigger == false) {
						ctx.translate(this.position.x - 5, this.position.y + 10);
					} else {
						ctx.translate(this.position.x + 135, this.position.y + 10);
					}
				} else {
					if (this.groundTrigger == false && this.turnTrigger == false) {
						ctx.translate(this.position.x + 140, this.position.y + 10);
					} else {
						ctx.translate(this.position.x + 125, this.position.y + 10);
					}
				}
				ctx.scale(6, 6);
				if (this.counter < 2) {
					ctx.drawImage(this.explosion1, -10, -17);
				} else if (this.counter < 3) {
					ctx.drawImage(this.explosion2, -10, -17);
				} else if (this.counter < 4) {
					ctx.drawImage(this.explosion3, -10, -17);
				} else if (this.counter < 5) {
					if (attackHitTestSmog(this.attackPosition, this.size) != true) {
						if (this.dirLeft == true) {
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 77.5, this.attackPosition.y - 75));
						} else {
							app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 77.5, this.attackPosition.y - 75));
						}
						app.main.environment.smogSize.push(new Victor(225, 225));
						app.main.environment.smogAlpha.push(1.1);
						app.main.environment.smogTimer.push(0);
						app.main.environment.smogAngle.push(this.getAngle);
						app.main.environment.smogCount += 1;
					} else {
						if (app.main.environment.smogSize[app.main.environment.smogTarget].x < 700) {
							app.main.environment.smogSize[app.main.environment.smogTarget].x += 100;
							app.main.environment.smogSize[app.main.environment.smogTarget].y += 100;
							app.main.environment.smogPos[app.main.environment.smogTarget].x -= 50;
							app.main.environment.smogPos[app.main.environment.smogTarget].y -= 50;
						}
						if (app.main.environment.smogAlpha[app.main.environment.smogTarget] < 1.3) {
							if (app.main.environment.smogAlpha[app.main.environment.smogTarget] < .25) {
								if (this.dirLeft == true) {
									app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 77.5, this.attackPosition.y - 75));
								} else {
									app.main.environment.smogPos.push(new Victor(this.attackPosition.x - 77.5, this.attackPosition.y - 75));
								}
								app.main.environment.smogSize.push(new Victor(225, 225));
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
					ctx.drawImage(this.explosion4, -10, -17);
				} else if (this.counter < 6) {
					ctx.drawImage(this.explosion5, -10, -17);
				} else if (this.counter < 7) {
					ctx.drawImage(this.explosion6, -10, -17);
				} else {
					this.lifetime = 301;
					this.groundTrigger = false;
				}
				ctx.restore();
			}
		}
	};

	return Energy;
}(); //end IIFE

"use strict";

var app = app || {};

//BACKGROUND AND FOREGROUND
app.Environment = function () {

	function Environment() {

		this.movingSmoke = 0;
		this.movingSmoke2 = 0;
		this.movingSmoke3 = 6400;
		this.moreSmoke = false;
		this.alpha = 0;
		this.fade = 80;
		this.fade2 = 100;
		this.fade3 = 100;
		this.fade4 = 0;
		this.fadeInSlow = false;
		this.fadeInFast = false;
		this.fadeOut = false;
		this.superFlash = false;
		this.decay = false;
		this.reverse = false;
		this.reverse2 = false;
		this.flash = false;
		this.reposition = false;
		this.colorSky = false;

		this.supportActive = false;

		this.counter = 0;
		this.currentSmoke = 40;
		this.shake = false;
		this.powerUp = false;
		this.bounce = 0;
		this.bouncing = false;
		this.backDown = false;
		this.bounceCounter = 1;
		this.loseSS = 10;
		this.pCounter = 0;

		this.geroSpy = false;
		this.spyExit = false;
		this.spyChance = 0;
		this.spyLeft = false;
		this.spyRight = false;
		this.spyTimer = 0;
		this.spyMoveVert = 0;
		this.spyReverse = false;
		this.spyLocation = new Victor(0, -100);

		this.remote = false;
		this.remoteTimer = 0;
		this.remotePosition = new Victor(0, 0);
		this.remoteGround = false;

		this.nuked = false;
		this.nukeCounter = 10;

		this.darkStart = false;
		this.dark == false;
		this.darkness = 100;
		this.darkCount = 0;

		this.smogCount = 0;
		this.smogTimer = [];
		this.smogPos = [];
		this.smogSize = [];
		this.smogAlpha = [];
		this.smogAngle = [];
		this.smogTarget = -1;

		this.yajirobe = false;
		this.yajirobeTimer = 0;
		this.yajirobePosition = 400;
		this.yajChance = 0;

		this.chaotzuTimer = 0;
		this.chaotzuMoveVert = 0;
		this.chaotzuReverse = false;

		this.active19 = true;
		this.position19 = new Victor(0, 0);

		this.shadow18 = new Victor(0, 0);
		this.shadow17 = new Victor(0, 0);
		this.shadowVegeta = new Victor(0, 0);
		this.shadowPiccolo = new Victor(0, 0);
		this.shadowGohan = new Victor(0, 0);
		this.shadowTien = new Victor(0, 0);
		this.shadowKrillin = new Victor(0, 0);
		this.shadowGero = new Victor(0, 0);
		this.shadowYamcha = new Victor(0, 0);
		this.shadowChaotzu = new Victor(0, 0);

		this.yamcha = false;
		this.chaotzu = false;
		this.android16 = false;
		this.braced = false;
		this.movementYamcha = new Victor(0, 0);
		this.movementChaotzu = new Victor(0, 0);
		this.movement16 = new Victor(800, 585);
		this.characterCounter = 0;
		this.tele16 = false;

		this.buildingActive = false;
		this.fallingBuilding = 0;

		this.cityAttacked = false;

		this.city17Counter = 0;
		this.blastHold = Math.round(getRandom(10, 20));
		this.miniExplosion = false;
		this.miniTimer = 0;

		this.dustCounter = 0;
		this.dustCounter2 = 0;

		this.deathLocationVegeta = new Victor(0, 0);
		this.deathVegetaDirLeft = false;

		this.deathLocationPiccolo = new Victor(0, 0);
		this.deathPiccoloDirLeft = false;

		/*
  this.deathLocationGohan = new Victor(0, 0);
  this.deathPiccoloDirLeft = false;
  
  this.deathLocationYamcha = new Victor(0, 0);
  this.deathKrillinDirLeft = false;
  */

		this.deathLocationTien = new Victor(0, 0);
		this.deathTienDirLeft = false;

		this.deathLocationKrillin = new Victor(0, 0);
		this.deathKrillinDirLeft = false;

		this.capeLocation = new Victor(0, 0);
		this.capeDirLeft = false;
		this.cape = false;

		this.capeOffset = 0;
		this.piccoloOffset = 0;
		this.vegetaOffset = 0;
		this.tienOffset = 0;
		this.krillinOffset = 0;
		this.yamchaOffset = 0;
		this.chaotzuOffset = 0;

		this.capeChange = 0;
		this.piccoloChange = 0;
		this.vegetaChange = 0;
		this.tienChange = 0;
		this.krillinChange = 0;
		this.yamchaChange = 0;
		this.chaotzuChange = 0;

		this.capeRandom = Math.random();
		this.piccoloRandom = Math.random();
		this.vegetaRandom = Math.random();
		this.tienRandom = Math.random();
		this.krillinRandom = Math.random();
		this.yamchaRandom = Math.random();
		this.chaotzuRandom = Math.random();

		this.offsets = false;
		this.offsetTimer = 0;

		var image = new Image();
		image.src = app.environment.city;
		this.background = image;

		image = new Image();
		image.src = app.environment.cityTop;
		this.backgroundTop = image;

		image = new Image();
		image.src = app.environment.cityDamage1;
		this.cityDamage1 = image;

		image = new Image();
		image.src = app.environment.building1;
		this.building1 = image;

		image = new Image();
		image.src = app.environment.lab1;
		this.lab1 = image;

		image = new Image();
		image.src = app.environment.remote2;
		this.remote2 = image;

		image = new Image();
		image.src = app.environment.a19Head;
		this.a19Head = image;

		image = new Image();
		image.src = app.environment.deadPiccolo;
		this.deadPiccolo = image;

		image = new Image();
		image.src = app.environment.deadPiccolo2;
		this.deadPiccolo2 = image;

		image = new Image();
		image.src = app.imagesVegeta.ground;
		this.deadVegeta = image;

		image = new Image();
		image.src = app.environment.deadVegeta2;
		this.deadVegeta2 = image;

		image = new Image();
		image.src = app.environment.deadVegeta3;
		this.deadVegeta3 = image;

		image = new Image();
		image.src = app.environment.deadVegeta4;
		this.deadVegeta4 = image;

		image = new Image();
		image.src = app.imagesTien.ground;
		this.deadTien = image;

		image = new Image();
		image.src = app.imagesTien.ground2;
		this.deadTien2 = image;

		image = new Image();
		image.src = app.imagesKrillin.ground;
		this.deadKrillin = image;

		image = new Image();
		image.src = app.imagesKrillin.ground2;
		this.deadKrillin2 = image;

		image = new Image();
		image.src = app.environment.smoke1;
		this.smoke1 = image;

		image = new Image();
		image.src = app.environment.smoke2;
		this.smoke2 = image;

		image = new Image();
		image.src = app.environment.smoke3;
		this.smoke3 = image;

		image = new Image();
		image.src = app.environment.cape1;
		this.cape1 = image;

		image = new Image();
		image.src = app.environment.cape2;
		this.cape2 = image;

		image = new Image();
		image.src = app.environment.cape3;
		this.cape3 = image;

		image = new Image();
		image.src = app.environment.cape4;
		this.cape4 = image;

		image = new Image();
		image.src = app.environment.yamcha1;
		this.yamcha1 = image;

		image = new Image();
		image.src = app.environment.yamcha2;
		this.yamcha2 = image;

		image = new Image();
		image.src = app.environment.yamcha3;
		this.yamcha3 = image;

		image = new Image();
		image.src = app.environment.yamcha4;
		this.yamcha4 = image;

		image = new Image();
		image.src = app.environment.yamcha5;
		this.yamcha5 = image;

		image = new Image();
		image.src = app.environment.chaotzu1;
		this.chaotzu1 = image;

		image = new Image();
		image.src = app.environment.chaotzu2;
		this.chaotzu2 = image;

		image = new Image();
		image.src = app.environment.chaotzu3;
		this.chaotzu3 = image;

		image = new Image();
		image.src = app.environment.chaotzu4;
		this.chaotzu4 = image;

		image = new Image();
		image.src = app.environment.yajirobe1;
		this.yajirobe1 = image;

		image = new Image();
		image.src = app.images16.stance;
		this.a16Stance = image;

		image = new Image();
		image.src = app.images16.stance2;
		this.a16Stance2 = image;

		image = new Image();
		image.src = app.environment.groundDustA1;
		this.groundDustA1 = image;

		image = new Image();
		image.src = app.environment.groundDustA2;
		this.groundDustA2 = image;

		image = new Image();
		image.src = app.environment.groundDustA3;
		this.groundDustA3 = image;

		image = new Image();
		image.src = app.environment.groundDustA4;
		this.groundDustA4 = image;

		image = new Image();
		image.src = app.environment.groundDustB1;
		this.groundDustB1 = image;

		image = new Image();
		image.src = app.environment.groundDustB2;
		this.groundDustB2 = image;

		image = new Image();
		image.src = app.environment.groundDustB3;
		this.groundDustB3 = image;

		image = new Image();
		image.src = app.environment.groundDustB4;
		this.groundDustB4 = image;

		image = new Image();
		image.src = app.environment.groundDustC1;
		this.groundDustC1 = image;

		image = new Image();
		image.src = app.environment.groundDustC2;
		this.groundDustC2 = image;

		image = new Image();
		image.src = app.environment.groundDustC3;
		this.groundDustC3 = image;

		image = new Image();
		image.src = app.environment.groundDustC4;
		this.groundDustC4 = image;

		image = new Image();
		image.src = app.environment.gerosSpy1;
		this.gerosSpy1 = image;

		image = new Image();
		image.src = app.environment.smog1;
		this.smog1 = image;

		image = new Image();
		image.src = app.environment.smog2;
		this.smog2 = image;

		image = new Image();
		image.src = app.environment.smog3;
		this.smog3 = image;

		image = new Image();
		image.src = app.environment.smog4;
		this.smog4 = image;

		image = new Image();
		image.src = app.environment.smog5;
		this.smog5 = image;

		image = new Image();
		image.src = app.environment.smog6;
		this.smog6 = image;

		image = new Image();
		image.src = app.environment.smog7;
		this.smog7 = image;

		image = new Image();
		image.src = app.environment.smog8;
		this.smog8 = image;

		image = new Image();
		image.src = app.environment.smog9;
		this.smog9 = image;

		image = new Image();
		image.src = app.environment.smog10;
		this.smog10 = image;

		image = new Image();
		image.src = app.environment.smog11;
		this.smog11 = image;

		image = new Image();
		image.src = app.environment.smog1;
		this.smog1 = image;

		image = new Image();
		image.src = app.environment.smog12;
		this.smog12 = image;

		image = new Image();
		image.src = app.environment.smog13;
		this.smog13 = image;

		image = new Image();
		image.src = app.environment.smog14;
		this.smog14 = image;

		image = new Image();
		image.src = app.environment.smog15;
		this.smog15 = image;

		image = new Image();
		image.src = app.environment.smog16;
		this.smog16 = image;

		image = new Image();
		image.src = app.images17.stance;
		this.stance17 = image;

		image = new Image();
		image.src = app.images17.blast;
		this.blast17 = image;

		image = new Image();
		image.src = app.attack.blast1;
		this.blast1 = image;

		image = new Image();
		image.src = app.attack.tele5;
		this.teleport5 = image;
	}

	//CHANGE ENVIRONMENT
	Environment.prototype.update = function () {
		if (this.bounce == false) {
			if (this.deathLocationPiccolo.y < 620) {
				this.deathLocationPiccolo.y = 620;
			}

			if (this.deathLocationVegeta.y < 620) {
				this.deathLocationVegeta.y = 620;
			}
		}

		//console.log(this.bounce);
		if (this.shake == true) {
			this.offsetTimer++;
			this.bouncing = true;
			//console.log(this.offsetTimer);
			if (this.offsetTimer < 3) {
				this.capeRandom = Math.random();
				this.piccoloRandom = Math.random();
				this.vegetaRandom = Math.random();
				this.tienRandom = Math.random();
				this.krillinRandom = Math.random();
				this.yamchaRandom = Math.random();
				this.chaotzuRandom = Math.random();

				this.offsets = true;
			}
		}
		if (this.bouncing == true) {
			this.bounce = this.bounce + (6 + Math.round(getRandom(0, 6))) / this.bounceCounter;
			if (this.offsets == true) {
				if (this.cape == true) {
					if (this.capeLocation.x < -400) {
						//console.log("FIRST");
						this.capeOffset = Math.round(getRandom(0, 20));
					} else if (this.capeLocation.x > 400) {
						//console.log("SECOND");
						this.capeOffset = Math.round(getRandom(0, 20));
						this.capeOffset = this.capeOffset * -1;
					} else {
						//console.log("THIRD");
						this.capeOffset = Math.round(getRandom(0, 20));
						if (this.capeRandom < .5) {
							this.capeOffset = this.capeOffset * -1;
						}
					}
				}
				if (app.main.piccoloDead == true) {
					if (this.deathLocationPiccolo.x < -400) {
						this.piccoloOffset = Math.round(getRandom(0, 20));
					} else if (this.deathLocationPiccolo.x > 400) {
						this.piccoloOffset = Math.round(getRandom(0, 20));
						this.piccoloOffset = this.piccoloOffset * -1;
					} else {
						this.piccoloOffset = Math.round(getRandom(0, 20));
						if (this.piccoloRandom < .5) {
							this.piccoloOffset = this.piccoloOffset * -1;
						}
					}
				}
				if (app.main.vegetaDead == true) {
					if (this.deathLocationVegeta.x < -400) {
						this.vegetaOffset = Math.round(getRandom(0, 20));
					} else if (this.deathLocationVegeta.x > 400) {
						this.vegetaOffset = Math.round(getRandom(0, 20));
						this.vegetaOffset = this.vegetaOffset * -1;
					} else {
						this.vegetaOffset = Math.round(getRandom(0, 20));
						if (this.vegetaRandom < .5) {
							this.vegetaOffset = this.vegetaOffset * -1;
						}
					}
				}
				if (app.main.tienDead == true) {
					if (this.deathLocationTien.x < -400) {
						this.tienOffset = Math.round(getRandom(0, 20));
					} else if (this.deathLocationTien.x > 400) {
						this.tienOffset = Math.round(getRandom(0, 20));
						this.tienOffset = this.tienOffset * -1;
					} else {
						this.tienOffset = Math.round(getRandom(0, 20));
						if (this.tienRandom < .5) {
							this.tienOffset = this.tienOffset * -1;
						}
					}
				}
				if (app.main.krillinDead == true) {
					if (this.deathLocationKrillin.x < -400) {
						this.krillinOffset = Math.round(getRandom(0, 20));
					} else if (this.deathLocationKrillin.x > 400) {
						this.krillinOffset = Math.round(getRandom(0, 20));
						this.krillinOffset = this.krillinOffset * -1;
					} else {
						this.krillinOffset = Math.round(getRandom(0, 20));
						if (this.krillinRandom < .5) {
							this.krillinOffset = this.krillinOffset * -1;
						}
					}
				}
				if (app.main.yamchaDead == true) {
					if (this.movementYamcha.x < -400) {
						this.yamchaOffset = Math.round(getRandom(0, 20));
					} else if (this.movementYamcha.x > 400) {
						this.yamchaOffset = Math.round(getRandom(0, 20));
						this.yamchaOffset = this.yamchaOffset * -1;
					} else {
						this.yamchaOffset = Math.round(getRandom(0, 20));
						if (this.yamchaRandom < .5) {
							this.yamchaOffset = this.yamchaOffset * -1;
						}
					}
				}
				if (app.main.chaotzuDead == true) {
					if (this.movementChaotzu.x < -400) {
						this.chaotzuOffset = Math.round(getRandom(0, 20));
					} else if (this.movementChaotzu.x > 400) {
						this.chaotzuOffset = Math.round(getRandom(0, 20));
						this.chaotzuOffset = this.chaotzuOffset * -1;
					} else {
						this.chaotzuOffset = Math.round(getRandom(0, 20));
						if (this.chaotzuRandom < .5) {
							this.chaotzuOffset = this.chaotzuOffset * -1;
						}
					}
				}
				this.offsets = false;
			}
			if (this.capeOffset < 0) {
				if (this.capeOffset < this.capeChange) {
					this.capeChange -= 2.5;
					this.capeLocation.x -= 2.5;
				}
			} else if (this.capeOffset > 0) {
				if (this.capeOffset > this.capeChange) {
					this.capeChange += 2.5;
					this.capeLocation.x += 2.5;
				}
			}
			if (this.piccoloOffset < 0) {
				if (this.piccoloOffset < this.piccoloChange) {
					this.piccoloChange -= 2.5;
					this.deathLocationPiccolo.x -= 2.5;
				}
			} else if (this.piccoloOffset > 0) {
				if (this.piccoloOffset > this.piccoloChange) {
					this.piccoloChange += 2.5;
					this.deathLocationPiccolo.x += 2.5;
				}
			}
			if (this.vegetaOffset < 0) {
				if (this.vegetaOffset < this.vegetaChange) {
					this.vegetaChange -= 2.5;
					this.deathLocationVegeta.x -= 2.5;
				}
			} else if (this.vegetaOffset > 0) {
				if (this.vegetaOffset > this.vegetaChange) {
					this.vegetaChange += 2.5;
					this.deathLocationVegeta.x += 2.5;
				}
			}
			if (this.tienOffset < 0) {
				if (this.tienOffset < this.tienChange) {
					this.tienChange -= 2.5;
					this.deathLocationTien.x -= 2.5;
				}
			} else if (this.tienOffset > 0) {
				if (this.tienOffset > this.tienChange) {
					this.tienChange += 2.5;
					this.deathLocationTien.x += 2.5;
				}
			}
			if (this.krillinOffset < 0) {
				if (this.krillinOffset < this.krillinChange) {
					this.krillinChange -= 2.5;
					this.deathLocationKrillin.x -= 2.5;
				}
			} else if (this.krillinOffset > 0) {
				if (this.krillinOffset > this.krillinChange) {
					this.krillinChange += 2.5;
					this.deathLocationKrillin.x += 2.5;
				}
			}
			if (this.yamchaOffset < 0) {
				if (this.yamchaOffset < this.yamchaChange) {
					this.yamchaChange -= 2.5;
					this.movementYamcha.x -= 2.5;
				}
			} else if (this.yamchaOffset > 0) {
				if (this.yamchaOffset > this.yamchaChange) {
					this.yamchaChange += 2.5;
					this.movementYamcha.x += 2.5;
				}
			}
			if (this.chaotzuOffset < 0) {
				if (this.chaotzuOffset < this.chaotzuChange) {
					this.chaotzuChange -= 2.5;
					this.movementChaotzu.x -= 2.5;
				}
			} else if (this.chaotzuOffset > 0) {
				if (this.chaotzuOffset > this.chaotzuChange) {
					this.chaotzuChange += 2.5;
					this.movementChaotzu.x += 2.5;
				}
			}
			if (this.bounce > 9) {
				this.capeChange = 0;
				this.piccoloChange = 0;
				this.vegetaChange = 0;
				this.yamchaChange = 0;
				this.chaotzuChange = 0;
				this.backDown = true;
				this.bouncing = false;
			}
			this.bounceCounter = this.bounceCounter * 2.5;
		}
		if (this.backDown == true) {
			this.bounce = this.bounce - (4 + Math.round(getRandom(0, 6))) / this.bounceCounter;
			if (this.bounce < 0) {
				if (app.main.gameState != app.main.GAME_STATE.TUTORIAL && app.main.scene == false) {
					app.main.sound.playSpecialReaction(2);
				} else if (app.main.gameState == app.main.GAME_STATE.TUTORIAL && app.main.scene == false) {
					app.main.sound.playSpecialReaction(47);
				}
				this.bounce = 0;
				this.bouncing = false;
				this.bounceCounter = 1;
				this.backDown = false;
				this.offsetTimer = 0;
			}
			this.bounceCounter = this.bounceCounter / 2;
		}

		if (app.main.gameState == app.main.GAME_STATE.TUTORIAL) {
			if (this.alpha < 30) {
				this.alpha = this.alpha + 1;
			} else {
				this.alpha = this.alpha - 1;
			}
		} else if (app.main.gameState == app.main.GAME_STATE.DEFAULT) {
			this.movingSmoke = this.movingSmoke - 15;
			this.movingSmoke2 = this.movingSmoke2 - 3;
			this.movingSmoke3 = this.movingSmoke3 - 15;
			if (app.main.android17.city == false) {
				if (this.alpha > 45 && this.reverse == false) {
					this.reverse = true;
				} else if (this.alpha < 25 && this.reverse == true) {
					this.reverse = false;
				}
			} else {
				if (this.alpha > 50 && this.reverse == false) {
					this.reverse = true;
				} else if (this.alpha < 35 && this.reverse == true) {
					this.reverse = false;
				}
			}

			if (this.reverse == false) {
				if (app.main.android17.city == false) {
					this.alpha++;
				} else {
					this.alpha++;
					this.alpha++;
					//this.alpha++;
				}
			} else {
				if (app.main.android17.city == false) {
					this.alpha--;
				} else {
					this.alpha--;
					this.alpha--;
					//this.alpha--;
				}
			}
		} else if (app.main.gameState == app.main.GAME_STATE.BEGIN) {
			//this.movingSmoke = this.movingSmoke - 15;
			//this.movingSmoke3 = this.movingSmoke3 - 15;
			if (this.alpha > 40 && this.reverse == false) {
				this.reverse = true;
			} else if (this.alpha < 10 && this.reverse == true) {
				this.reverse = false;
			}
			if (this.reverse == false) {
				this.alpha = this.alpha + 1.5;
			} else {
				this.alpha = this.alpha - 1.5;
			}

			if (this.darkStart == true) {
				this.darkness -= 5;
				if (this.darkness < 15) {
					this.darkStart = false;
				}
			}
		}

		//Smog update
		if (this.smogCount > 0) {
			for (var i = 0; i < this.smogCount; i++) {
				this.smogAlpha[i] -= .02;
				if (this.smogSize[i].x < 900) {
					this.smogSize[i].x += 5;
					this.smogSize[i].y += 5;
					this.smogPos[i].x -= 2.5;
					this.smogPos[i].y -= 2.5;
				}
				if (this.smogAlpha[i] < .02) {
					this.smogPos.splice(i, 1);
					this.smogSize.splice(i, 1);
					this.smogAlpha.splice(i, 1);
					this.smogTimer.splice(i, 1);
					this.smogAngle.splice(i, 1);
					this.smogCount -= 1;
				}
			}
		}

		//Yajirobe
		if (this.buildingActive == true && this.shake == true && app.main.scene == false && app.main.battle == 1) {
			this.yajChance = Math.random();
			//console.log("SHAKEN@#@#@#@#@#@#@#@");
		}

		if (this.yajChance > .99) {
			this.yajirobe = true;
			this.yajChance = 0;
		}

		if (this.flash == false) {
			this.fade = 80;
		} else {
			this.fade = this.fade - 10;
			if (this.fade <= 0) {
				this.flash = false;
			}
		}

		if (this.superFlash == false) {
			this.fade2 = 100;
			this.reverse2 = false;
		} else if (this.decay == false) {
			if (this.reverse2 == false) {
				this.fade2 = this.fade2 - 5;
				this.reverse2 = true;
			} else if (this.reverse2 == true) {
				this.fade2 = this.fade2 + 5;
				this.reverse2 = false;
			}
		} else if (this.decay == true) {
			this.fade2 = this.fade2 - 2;
			if (this.fade2 <= 0) {
				this.superFlash = false;
				this.decay = false;
			}
		}
	};

	//DRAW THE ENVIRONMENT
	Environment.prototype.draw = function (ctx) {

		if (app.main.gameState == app.main.GAME_STATE.DEFAULT) {
			ctx.save();
			if (this.shake == true) {
				if (this.counter == 0 || this.counter == 2 || this.counter == 4) {
					ctx.translate(0, -15);
				} else if (this.counter == 1 || this.counter == 3 || this.counter == 5) {
					//normal
				} else {
					this.shake = false;
					this.counter = 0;
				}
				this.counter++;
			} else if (this.powerUp == true) {
				this.pCounter++;
				if (this.pCounter < 2) {
					ctx.translate(0, 4);
				} else {
					this.pCounter = 0;
				}
			}
			ctx.save();
			if (this.cityAttacked == true) {
				ctx.drawImage(this.cityDamage1, 0, 0);
				if (this.nuked == true) {
					this.nukeCounter -= .25;
					ctx.save();
					ctx.globalAlpha = this.nukeCounter / 10;
					ctx.drawImage(this.backgroundTop, 0, 0);
					ctx.restore();
					if (this.nukeCounter < .5) {
						this.nuked = false;
						this.nukeCounter = 10;
					}
				}
			} else {
				ctx.drawImage(this.background, 0, 0);
			}

			//Yajirobe
			if (this.yajirobe == true) {

				ctx.save();
				ctx.scale(-1, 1);
				ctx.drawImage(this.yajirobe1, (this.yajirobePosition + 685) * -1, this.yajirobePosition - 45);
				ctx.restore();

				this.yajirobeTimer += 1;
				if (this.yajirobeTimer < 26) {
					if (this.yajirobeTimer == 10) {
						app.main.sound.playTaunt9(Math.round(getRandom(0, 2)));
					}

					if (this.yajirobeTimer < 11) {
						this.yajirobePosition -= 5;
					} else if (this.yajirobeTimer > 20) {
						this.yajirobePosition += 10;
					}
				} else {
					this.yajirobeTimer = 0;
					this.yajChance = 0;
					this.yajirobe = false;
				}
			}

			//17 in the city
			if (app.main.android17.city == true) {
				this.city17Counter++;
				ctx.save();
				if (this.city17Counter % 6 == 0) {
					ctx.translate(180, 428);
				} else if (this.city17Counter % 3 == 0) {
					ctx.translate(180, 430);
				} else {
					ctx.translate(180, 429);
				}
				ctx.scale(.25, .25);
				if (this.city17Counter > this.blastHold) {
					ctx.drawImage(this.blast17, 0, 0);
					if (this.city17Counter > this.blastHold + 9) {
						this.miniExplosion = true;
						app.main.roundScore2 += 20 + Math.round(getRandom(1, 10));
						this.blastHold = Math.round(getRandom(25, 45));
						this.city17Counter = 0;
					} else {
						ctx.drawImage(this.blast1, (this.city17Counter - this.blastHold) * 17, 15);
					}
				} else {
					ctx.drawImage(this.stance17, 0, 0);
				}

				ctx.restore();
			} else {
				this.city17Counter = 0;
			}

			if (this.miniExplosion == true) {
				this.miniTimer++;
				if (this.miniTimer < 6) {
					if (this.miniTimer < 2) {
						this.powerUp = true;
						app.main.sound.playIntro(Math.round(getRandom(69, 71)));
					} else if (this.miniTimer > 4) {
						this.powerUp = false;
						//app.main.sound.playIntro(Math.round(getRandom(69,71)));
					}
					ctx.save();
					if (this.miniTimer % 2 == 0) {
						ctx.translate(228, 430);
						ctx.rotate(38 * Math.PI / 180);
						ctx.scale(.4, 1.2);
						ctx.beginPath();
						ctx.arc(0, 0, 15, 0, 2 * Math.PI, false);
						ctx.globalAlpha = .3;
						ctx.fillStyle = 'yellow';
						ctx.fill();
					}
					ctx.restore();
				} else {
					this.miniExplosion = false;
					this.miniTimer = 0;
				}
			}

			ctx.globalAlpha = this.alpha / 100;
			if (this.colorSky == true) {
				ctx.fillStyle = "#001a33";
				//ctx.fillStyle = "black";
			} else {
				ctx.fillStyle = "darkred";
			}
			ctx.fillRect(0, 0, 1024, 478);
			ctx.save();
			ctx.globalAlpha = this.alpha / 130;
			ctx.fillRect(0, 477.5, 1024, 768);
			ctx.restore();
			ctx.restore();

			ctx.save();
			ctx.globalAlpha = .2;
			ctx.fillStyle = "black";
			ctx.fillRect(0, 478, 1024, 768);
			ctx.restore();

			//BODY SHADOWS
			if (this.buildingActive == true) {
				//Building
				ctx.save();
				ctx.translate(1000, 700);
				ctx.scale(2, .4);
				ctx.save();
				ctx.scale(1, 1);
				ctx.beginPath();
				ctx.arc(0, 0, 200, 0, 2 * Math.PI, false);
				ctx.globalAlpha = .5;
				ctx.fillStyle = '#black';
				ctx.fill();
				ctx.restore();
				ctx.restore();
			}

			if (this.cape == true) {
				//Cape
				ctx.save();
				ctx.translate(this.capeLocation.x + 240, app.main.vegeta.GROUND.y + 132);
				ctx.scale(2, .4);
				ctx.save();
				ctx.scale(1, 1);
				ctx.beginPath();
				ctx.arc(0, 0, 26, 0, 2 * Math.PI, false);
				ctx.globalAlpha = .5;
				ctx.fillStyle = '#black';
				ctx.fill();
				ctx.restore();
				ctx.restore();
			}

			if (app.main.piccoloDead == true) {
				//Piccolo
				ctx.save();
				if (this.deathPiccoloDirLeft == false) {
					ctx.translate(this.deathLocationPiccolo.x, app.main.vegeta.GROUND.y + 125);
				} else {
					ctx.translate(this.deathLocationPiccolo.x + 45, app.main.vegeta.GROUND.y + 125);
				}
				ctx.scale(2, .4);
				ctx.save();
				ctx.scale(1, 1);
				ctx.beginPath();
				ctx.arc(0, 0, 32, 0, 2 * Math.PI, false);
				ctx.globalAlpha = .5;
				ctx.fillStyle = '#black';
				ctx.fill();
				ctx.restore();
				ctx.restore();
			}

			if (app.main.vegetaDead == true) {
				//Vegeta
				ctx.save();
				if (this.deathVegetaDirLeft == false) {
					ctx.translate(this.deathLocationVegeta.x, app.main.vegeta.GROUND.y + 125);
				} else {
					ctx.translate(this.deathLocationVegeta.x + 45, app.main.vegeta.GROUND.y + 125);
				}
				ctx.scale(2, .4);
				ctx.save();
				ctx.scale(1, 1);
				ctx.beginPath();
				ctx.arc(0, 0, 32, 0, 2 * Math.PI, false);
				ctx.globalAlpha = .5;
				ctx.fillStyle = '#black';
				ctx.fill();
				ctx.restore();
				ctx.restore();
			}

			if (app.main.tienDead == true) {
				//Tien
				ctx.save();
				if (this.deathTienDirLeft == false) {
					ctx.translate(this.deathLocationTien.x + 35, app.main.vegeta.GROUND.y + 125);
				} else {
					ctx.translate(this.deathLocationTien.x, app.main.vegeta.GROUND.y + 125);
				}
				ctx.scale(2, .4);
				ctx.save();
				ctx.scale(1, 1);
				ctx.beginPath();
				ctx.arc(0, 0, 32, 0, 2 * Math.PI, false);
				ctx.globalAlpha = .5;
				ctx.fillStyle = '#black';
				ctx.fill();
				ctx.restore();
				ctx.restore();
			}

			if (app.main.krillinDead == true) {
				//Krillin
				ctx.save();
				if (this.deathKrillinDirLeft == false) {
					ctx.translate(this.deathLocationKrillin.x + 25, app.main.vegeta.GROUND.y + 125);
				} else {
					ctx.translate(this.deathLocationKrillin.x + 35, app.main.vegeta.GROUND.y + 125);
				}
				ctx.scale(2, .4);
				ctx.save();
				ctx.scale(1, 1);
				ctx.beginPath();
				ctx.arc(0, 0, 32, 0, 2 * Math.PI, false);
				ctx.globalAlpha = .5;
				ctx.fillStyle = '#black';
				ctx.fill();
				ctx.restore();
				ctx.restore();
			}

			/* if(app.main.yamchaDead == true){
   //Vegeta
   ctx.save();
   ctx.translate(this.movementYamcha.x,app.main.vegeta.GROUND.y + 125);
   ctx.scale(2, .4);
   ctx.save();
   ctx.scale(1,1);
   ctx.beginPath();
   ctx.arc(0, 0, 10, 0, 2 * Math.PI, false);
   ctx.globalAlpha = .5;
   ctx.fillStyle = '#black';
   ctx.fill();
   ctx.restore();
   ctx.restore();
   }
   
   if(app.main.chaotzuDead == true){
   //Vegeta
   ctx.save();
   ctx.translate(this.movementChaotzu.x,app.main.vegeta.GROUND.y + 125);
   ctx.scale(2, .4);
   ctx.save();
   ctx.scale(1,1);
   ctx.beginPath();
   ctx.arc(0, 0, 10, 0, 2 * Math.PI, false);
   ctx.globalAlpha = .5;
   ctx.fillStyle = '#black';
   ctx.fill();
   ctx.restore();
   ctx.restore();
   } */

			//SMOKE
			ctx.save();
			ctx.globalAlpha = .5;
			ctx.scale(1, -1);
			ctx.drawImage(this.smoke1, this.movingSmoke2, -450, 4000, 800);
			ctx.restore();
			ctx.save();
			//ctx.rotate(radian(90));
			if (this.buildingActive == true) {
				if (this.fallingBuilding < 600) {
					this.fallingBuilding += 60;
					if (this.fallingBuilding == 540) {
						this.shake = true;
						app.main.sound.playSpecialReaction(2);
					}
				}
				ctx.drawImage(this.building1, 600, -255 + this.fallingBuilding);
			}
			ctx.restore();

			if (app.main.android18.landDust == true) {
				this.dustCounter++;
				ctx.save();
				ctx.translate(app.main.android18.prevX, app.main.android18.GROUND.y);
				ctx.scale(3, 3);
				ctx.globalAlpha = .4;
				if (this.dustCounter < 2) {
					ctx.drawImage(this.groundDustA1, -40, -10);
				} else if (this.dustCounter < 3) {
					ctx.drawImage(this.groundDustA2, -40, -10);
				} else if (this.dustCounter < 4) {
					ctx.drawImage(this.groundDustA3, -40, -10);
				} else if (this.dustCounter < 5) {
					ctx.drawImage(this.groundDustA4, -40, -10);
				} else {
					this.dustCounter = 0;
					app.main.android18.landDust = false;
				}
				ctx.restore();
			}

			if (app.main.android18.flyDust == true) {
				this.dustCounter++;
				ctx.save();
				ctx.translate(app.main.android18.prevX, app.main.android18.GROUND.y);
				ctx.scale(2, 2);
				ctx.globalAlpha = .4;
				if (this.dustCounter < 2) {
					ctx.drawImage(this.groundDustB1, -55, 10);
				} else if (this.dustCounter < 3) {
					ctx.drawImage(this.groundDustB2, -55, 10);
				} else if (this.dustCounter < 4) {
					ctx.drawImage(this.groundDustB3, -55, 10);
				} else if (this.dustCounter < 5) {
					ctx.drawImage(this.groundDustB4, -55, 10);
				} else {
					this.dustCounter = 0;
					app.main.android18.flyDust = false;
				}
				ctx.restore();
			}

			if (app.main.android18.fallDust == true) {
				this.dustCounter++;
				ctx.save();
				ctx.translate(app.main.android18.prevX, app.main.android18.GROUND.y);
				ctx.scale(2, 2);
				ctx.globalAlpha = .5;
				if (this.dustCounter < 3) {
					ctx.drawImage(this.groundDustC1, -80, 8);
				} else if (this.dustCounter < 5) {
					ctx.drawImage(this.groundDustC2, -80, 8);
				} else if (this.dustCounter < 7) {
					ctx.drawImage(this.groundDustC3, -80, 8);
				} else if (this.dustCounter < 9) {
					ctx.drawImage(this.groundDustC4, -80, 8);
				} else {
					this.dustCounter = 0;
					app.main.android18.fallDust = false;
				}
				ctx.restore();
			}

			if (app.main.android17.landDust == true) {
				this.dustCounter++;
				ctx.save();
				ctx.translate(app.main.android17.prevX, app.main.android17.GROUND.y);
				ctx.scale(3, 3);
				ctx.globalAlpha = .4;
				if (this.dustCounter < 2) {
					ctx.drawImage(this.groundDustA1, -40, -10);
				} else if (this.dustCounter < 3) {
					ctx.drawImage(this.groundDustA2, -40, -10);
				} else if (this.dustCounter < 4) {
					ctx.drawImage(this.groundDustA3, -40, -10);
				} else if (this.dustCounter < 5) {
					ctx.drawImage(this.groundDustA4, -40, -10);
				} else {
					this.dustCounter = 0;
					app.main.android17.landDust = false;
				}
				ctx.restore();
			}

			if (app.main.android17.flyDust == true) {
				this.dustCounter++;
				ctx.save();
				ctx.translate(app.main.android17.prevX, app.main.android17.GROUND.y);
				ctx.scale(2, 2);
				ctx.globalAlpha = .4;
				if (this.dustCounter < 2) {
					ctx.drawImage(this.groundDustB1, -55, 10);
				} else if (this.dustCounter < 3) {
					ctx.drawImage(this.groundDustB2, -55, 10);
				} else if (this.dustCounter < 4) {
					ctx.drawImage(this.groundDustB3, -55, 10);
				} else if (this.dustCounter < 5) {
					ctx.drawImage(this.groundDustB4, -55, 10);
				} else {
					this.dustCounter = 0;
					app.main.android17.flyDust = false;
				}
				ctx.restore();
			}

			if (app.main.android17.fallDust == true) {
				this.dustCounter++;
				ctx.save();
				ctx.translate(app.main.android17.prevX, app.main.android17.GROUND.y);
				ctx.scale(2, 2);
				ctx.globalAlpha = .5;
				if (this.dustCounter < 3) {
					ctx.drawImage(this.groundDustC1, -80, 8);
				} else if (this.dustCounter < 5) {
					ctx.drawImage(this.groundDustC2, -80, 8);
				} else if (this.dustCounter < 7) {
					ctx.drawImage(this.groundDustC3, -80, 8);
				} else if (this.dustCounter < 9) {
					ctx.drawImage(this.groundDustC4, -80, 8);
				} else {
					this.dustCounter = 0;
					app.main.android17.fallDust = false;
				}
				ctx.restore();
			}

			if (app.main.vegeta.landDust == true) {
				this.dustCounter++;
				ctx.save();
				ctx.translate(app.main.vegeta.prevX, app.main.vegeta.GROUND.y);
				ctx.scale(3, 3);
				ctx.globalAlpha = .4;
				if (this.dustCounter < 2) {
					ctx.drawImage(this.groundDustA1, -35, -10);
				} else if (this.dustCounter < 3) {
					ctx.drawImage(this.groundDustA2, -35, -10);
				} else if (this.dustCounter < 4) {
					ctx.drawImage(this.groundDustA3, -35, -10);
				} else if (this.dustCounter < 5) {
					ctx.drawImage(this.groundDustA4, -35, -10);
				} else {
					this.dustCounter = 0;
					app.main.vegeta.landDust = false;
				}
				ctx.restore();
			}

			if (app.main.vegeta.flyDust == true) {
				this.dustCounter++;
				ctx.save();
				ctx.translate(app.main.vegeta.prevX, app.main.vegeta.GROUND.y);
				ctx.scale(2, 2);
				ctx.globalAlpha = .4;
				if (this.dustCounter < 2) {
					ctx.drawImage(this.groundDustB1, -55, 10);
				} else if (this.dustCounter < 3) {
					ctx.drawImage(this.groundDustB2, -55, 10);
				} else if (this.dustCounter < 4) {
					ctx.drawImage(this.groundDustB3, -55, 10);
				} else if (this.dustCounter < 5) {
					ctx.drawImage(this.groundDustB4, -55, 10);
				} else {
					this.dustCounter = 0;
					app.main.vegeta.flyDust = false;
				}
				ctx.restore();
			}

			if (app.main.vegeta.fallDust == true) {
				this.dustCounter++;
				ctx.save();
				ctx.translate(app.main.vegeta.prevX, app.main.vegeta.GROUND.y);
				ctx.scale(2, 2);
				ctx.globalAlpha = .5;
				if (this.dustCounter < 3) {
					ctx.drawImage(this.groundDustC1, -80, 8);
				} else if (this.dustCounter < 5) {
					ctx.drawImage(this.groundDustC2, -80, 8);
				} else if (this.dustCounter < 7) {
					ctx.drawImage(this.groundDustC3, -80, 8);
				} else if (this.dustCounter < 9) {
					ctx.drawImage(this.groundDustC4, -80, 8);
				} else {
					this.dustCounter = 0;
					app.main.vegeta.fallDust = false;
				}
				ctx.restore();
			}

			//SOME SHADOWS
			if (this.yamcha == true && app.main.yamchaDead == true) {
				ctx.save();
				ctx.translate(this.movementYamcha.x + 875 + 210, 750);
				ctx.scale(2, .4);
				ctx.save();
				//ctx.scale((this.movementYamcha.y + 850) / 600,(this.movementYamcha.y + 390) / 600);
				ctx.beginPath();
				ctx.arc(0, 0, 12, 0, 2 * Math.PI, false);
				ctx.globalAlpha = .5;
				ctx.fillStyle = '#black';
				ctx.fill();
				ctx.restore();
				ctx.restore();
			}

			if (this.chaotzu == true && app.main.chaotzuDead == true) {
				//Chaotzu
				ctx.save();
				ctx.translate(this.movementChaotzu.x + 859 + 204, 750);
				ctx.scale(2, .4);
				ctx.save();
				//ctx.scale(this.movementChaotzu.y / 600,this.movementChaotzu.y / 600);
				ctx.beginPath();
				ctx.arc(0, 0, 6, 0, 2 * Math.PI, false);
				ctx.globalAlpha = .5;
				ctx.fillStyle = '#black';
				ctx.fill();
				ctx.restore();
				ctx.restore();
			}

			if (this.cape == true) {

				ctx.save();
				if (this.capeDirLeft == false) {
					ctx.scale(-1, 1);
					ctx.translate((this.capeLocation.x + 300) * -1, this.capeLocation.y + 735 - this.bounce);
					ctx.scale(.8, .8);
					if (this.bouncing == false && this.backDown == false) {
						ctx.drawImage(this.cape3, 0, 0);
					} else {
						ctx.drawImage(this.cape4, 0, 0);
					}
				} else {
					ctx.translate(this.capeLocation.x + 300, this.capeLocation.y + 735 - this.bounce);
					ctx.scale(.8, .8);
					if (this.bouncing == false && this.backDown == false) {
						ctx.drawImage(this.cape3, 0, 0);
					} else {
						ctx.drawImage(this.cape4, 0, 0);
					}
				}
				ctx.restore();
			}

			if (app.main.piccoloDead == true) {

				ctx.save();
				if (this.deathPiccoloDirLeft == false) {
					ctx.scale(-1, 1);
					ctx.translate((this.deathLocationPiccolo.x + 76) * -1, this.deathLocationPiccolo.y + 84 - this.bounce);
					ctx.scale(.8, .8);
					if (this.bouncing == false && this.backDown == false) {
						ctx.drawImage(this.deadPiccolo, 0, 0);
					} else {
						ctx.drawImage(this.deadPiccolo2, 0, 0);
					}
				} else {
					ctx.translate(this.deathLocationPiccolo.x - 27, this.deathLocationPiccolo.y + 84 - this.bounce);
					ctx.scale(.8, .8);
					if (this.bouncing == false && this.backDown == false) {
						ctx.drawImage(this.deadPiccolo, 0, 0);
					} else {
						ctx.drawImage(this.deadPiccolo2, 0, 0);
					}
				}
				ctx.restore();
			}

			if (app.main.vegetaDead == true) {
				if (app.main.vegeta.air == false && this.bouncing == false && this.backDown == false) {
					this.loseSS--;
					if (this.loseSS > 6 && this.loseSS < 8) {
						app.main.sound.playEffect(57);
					}
				}
				if (this.loseSS < 0) {
					this.loseSS = 0;
					app.main.vegeta.superform = false;
				}
				ctx.save();
				if (this.deathVegetaDirLeft == false) {
					ctx.scale(-1, 1);
					ctx.translate((this.deathLocationVegeta.x + 60) * -1, this.deathLocationVegeta.y + 95 - this.bounce);
					if (this.bouncing == false && this.backDown == false) {
						ctx.drawImage(this.deadVegeta2, 0, 0);
						ctx.save();
						ctx.globalAlpha = this.loseSS / 10;
						ctx.drawImage(this.deadVegeta, 0, 0);
						ctx.restore();
					} else {
						if (app.main.vegeta.superForm == false) {
							ctx.drawImage(this.deadVegeta3, 0, 0);
						} else {
							ctx.drawImage(this.deadVegeta4, 0, 0);
						}
					}
				} else {
					ctx.translate(this.deathLocationVegeta.x - 10, this.deathLocationVegeta.y + 95 - this.bounce);
					if (this.bouncing == false && this.backDown == false) {
						ctx.drawImage(this.deadVegeta2, 0, 0);
						ctx.save();
						ctx.globalAlpha = this.loseSS / 10;
						ctx.drawImage(this.deadVegeta, 0, 0);
						ctx.restore();
					} else {
						if (app.main.vegeta.superForm == false) {
							ctx.drawImage(this.deadVegeta3, 0, 0);
						} else {
							ctx.drawImage(this.deadVegeta4, 0, 0);
						}
					}
				}
				ctx.restore();
			}

			if (this.yamcha == true) {
				if (app.main.yamchaDead == true) {

					ctx.save();
					ctx.translate(this.movementYamcha.x + 865, this.movementYamcha.y + 400 - this.bounce);
					ctx.scale(1.4, 1.4);
					if (this.bouncing == false && this.backDown == false) {
						ctx.drawImage(this.yamcha3, 0, 5);
					} else {
						ctx.drawImage(this.yamcha4, 0, 5);
					}
					ctx.restore();
				} else {
					ctx.save();
					ctx.translate(this.movementYamcha.x + 850, this.movementYamcha.y + 390);
					ctx.scale(1.4, 1.4);
					if (this.movementYamcha.x > -400 && this.braced == false) {
						this.movementYamcha.x -= 40;
						this.movementYamcha.y += 10;
						if (this.movementYamcha.x < -360) {
							app.main.sound.playSpecialReaction2(3);
						}
						ctx.drawImage(this.yamcha5, 0, 0);
					} else if (this.braced == false) {
						ctx.drawImage(this.yamcha1, 0, 0);
					} else {
						ctx.drawImage(this.yamcha2, 20, 0);
					}
					ctx.restore();
				}
			}

			if (this.chaotzu == true) {
				if (app.main.chaotzuDead == true) {

					ctx.save();
					ctx.translate(this.movementChaotzu.x + 865, this.movementChaotzu.y + 412 - this.bounce);
					ctx.scale(1.4, 1.4);
					//ctx.scale(.8,.8);
					if (this.bouncing == false && this.backDown == false) {
						ctx.drawImage(this.chaotzu3, 0, 10);
					} else {
						ctx.drawImage(this.chaotzu3, 0, 10);
					}
					ctx.restore();
				} else {
					ctx.save();
					ctx.translate(this.movementChaotzu.x + 800, this.movementChaotzu.y + 410);
					ctx.scale(1.4, 1.4);
					if (this.movementChaotzu.x > -270 && this.braced == false) {
						this.movementChaotzu.x -= 30;
						this.movementChaotzu.y += 10;
						ctx.drawImage(this.chaotzu4, 0, 0);
					} else if (this.braced == false) {
						if (this.chaotzuReverse == false) {
							if (this.chaotzuMoveVert < 3) {
								this.chaotzuMoveVert += .5;
							} else {
								this.chaotzuReverse = true;
							}
						} else if (this.chaotzuReverse == true) {
							if (this.chaotzuMoveVert > 0) {
								this.chaotzuMoveVert -= .5;
							} else {
								this.chaotzuReverse = false;
							}
						}

						ctx.drawImage(this.chaotzu1, 0, 0 - this.chaotzuMoveVert);
					} else {
						ctx.drawImage(this.chaotzu2, 0, 0);
						this.movementChaotzu.x += 1;
					}
					ctx.restore();
				}
			}

			if (app.main.tienDead == true) {

				ctx.save();
				if (this.deathTienDirLeft == false) {
					ctx.scale(-1, 1);
					ctx.translate((this.deathLocationTien.x + 210) * -1, this.deathLocationTien.y - 55 - this.bounce);
					//ctx.scale(.8,.8);
					if (this.bouncing == false && this.backDown == false) {
						ctx.drawImage(this.deadTien, 0, 0);
					} else {
						ctx.drawImage(this.deadTien2, 0, 0);
					}
				} else {
					ctx.translate(this.deathLocationTien.x - 177, this.deathLocationTien.y - 55 - this.bounce);
					//ctx.scale(.8,.8);
					if (this.bouncing == false && this.backDown == false) {
						ctx.drawImage(this.deadTien, 0, 0);
					} else {
						ctx.drawImage(this.deadTien2, 0, 0);
					}
				}
				ctx.restore();
			}

			if (app.main.krillinDead == true) {

				ctx.save();
				if (this.deathKrillinDirLeft == false) {
					ctx.scale(-1, 1);
					ctx.translate((this.deathLocationKrillin.x + 200) * -1, this.deathLocationKrillin.y - 78 - this.bounce);
					//ctx.scale(.8,.8);
					if (this.bouncing == false && this.backDown == false) {
						ctx.drawImage(this.deadKrillin, 0, 5);
					} else {
						ctx.drawImage(this.deadKrillin2, 0, 5);
					}
				} else {
					ctx.translate(this.deathLocationKrillin.x - 150, this.deathLocationKrillin.y - 75 - this.bounce);
					//ctx.scale(.8,.8);
					if (this.bouncing == false && this.backDown == false) {
						ctx.drawImage(this.deadKrillin, 0, 0);
					} else {
						ctx.drawImage(this.deadKrillin2, 0, 0);
					}
				}
				ctx.restore();
			}

			//SHADOWS

			//Android 18
			if (app.main.android18.vanish == false) {
				ctx.save();
				if (app.main.android18.aboveBuilding == true && app.main.android18.byBuilding == true && this.buildingActive == true) {
					ctx.translate(app.main.android18.position.x + 23, app.main.android18.GROUND.y - 245);
				} else {
					ctx.translate(app.main.android18.position.x + 23, app.main.android18.GROUND.y + 125);
				}
				ctx.scale(2, .4);
				ctx.save();
				if (app.main.android18.aboveBuilding == true && app.main.android18.byBuilding == true && this.buildingActive == true) {
					ctx.scale((app.main.android18.position.y + 370) / 600, (app.main.android18.position.y + 370) / 600);
				} else {
					ctx.scale(app.main.android18.position.y / 600, app.main.android18.position.y / 600);
				}
				ctx.beginPath();
				ctx.arc(0, 0, 22, 0, 2 * Math.PI, false);
				ctx.globalAlpha = .5;
				ctx.fillStyle = '#black';
				ctx.fill();
				ctx.restore();
				ctx.restore();
			}

			//Android 17
			if (app.main.android17.vanish == false && app.main.android17.city == false && app.main.android17.gone == false) {
				ctx.save();
				if (app.main.android17.aboveBuilding == true && app.main.android17.byBuilding == true && this.buildingActive == true) {
					ctx.translate(app.main.android17.position.x + 23, app.main.android17.GROUND.y - 245);
				} else {
					ctx.translate(app.main.android17.position.x + 23, app.main.android17.GROUND.y + 125);
				}
				ctx.scale(2, .4);
				ctx.save();
				if (app.main.android17.aboveBuilding == true && app.main.android17.byBuilding == true && this.buildingActive == true) {
					ctx.scale((app.main.android17.position.y + 370) / 600, (app.main.android17.position.y + 370) / 600);
				} else {
					ctx.scale(app.main.android17.position.y / 600, app.main.android17.position.y / 600);
				}
				ctx.beginPath();
				ctx.arc(0, 0, 20, 0, 2 * Math.PI, false);
				ctx.globalAlpha = .5;
				ctx.fillStyle = '#black';
				ctx.fill();
				ctx.restore();
				ctx.restore();
			}

			if (app.main.vegeta.piccolo == true && app.main.vegeta.vanish == false) {
				//Piccolo
				ctx.save();
				if (app.main.vegeta.aboveBuilding == true && app.main.vegeta.byBuilding == true && this.buildingActive == true) {
					ctx.translate(app.main.vegeta.position.x + 23, app.main.vegeta.GROUND.y - 245);
				} else {
					ctx.translate(app.main.vegeta.position.x + 23, app.main.vegeta.GROUND.y + 125);
				}
				ctx.scale(2, .4);
				ctx.save();
				if (app.main.vegeta.aboveBuilding == true && app.main.vegeta.byBuilding == true && this.buildingActive == true) {
					ctx.scale((app.main.vegeta.position.y + 370) / 600, (app.main.vegeta.position.y + 370) / 600);
				} else {
					ctx.scale(app.main.vegeta.position.y / 600, app.main.vegeta.position.y / 600);
				}
				ctx.beginPath();
				ctx.arc(0, 0, 28, 0, 2 * Math.PI, false);
				ctx.globalAlpha = .5;
				ctx.fillStyle = '#black';
				ctx.fill();
				ctx.restore();
				ctx.restore();
			}

			if (app.main.vegeta.vegeta == true && app.main.vegeta.vanish == false) {
				//Vegeta
				ctx.save();
				if (app.main.vegeta.aboveBuilding == true && app.main.vegeta.byBuilding == true && this.buildingActive == true) {
					ctx.translate(app.main.vegeta.position.x + 23, app.main.vegeta.GROUND.y - 245);
				} else {
					ctx.translate(app.main.vegeta.position.x + 23, app.main.vegeta.GROUND.y + 125);
				}
				ctx.scale(2, .4);
				ctx.save();
				if (app.main.vegeta.aboveBuilding == true && app.main.vegeta.byBuilding == true && this.buildingActive == true) {
					ctx.scale((app.main.vegeta.position.y + 370) / 600, (app.main.vegeta.position.y + 370) / 600);
				} else {
					ctx.scale(app.main.vegeta.position.y / 600, app.main.vegeta.position.y / 600);
				}
				ctx.beginPath();
				ctx.arc(0, 0, 22, 0, 2 * Math.PI, false);
				ctx.globalAlpha = .5;
				ctx.fillStyle = '#black';
				ctx.fill();
				ctx.restore();
				ctx.restore();
			}

			if (app.main.vegeta.gohan == true && app.main.vegeta.vanish == false) {
				//Gohan
				ctx.save();
				if (app.main.vegeta.aboveBuilding == true && app.main.vegeta.byBuilding == true && this.buildingActive == true) {
					ctx.translate(app.main.vegeta.position.x + 23, app.main.vegeta.GROUND.y - 245);
				} else {
					ctx.translate(app.main.vegeta.position.x + 23, app.main.vegeta.GROUND.y + 125);
				}
				ctx.scale(2, .4);
				ctx.save();
				if (app.main.vegeta.aboveBuilding == true && app.main.vegeta.byBuilding == true && this.buildingActive == true) {
					ctx.scale((app.main.vegeta.position.y + 370) / 600, (app.main.vegeta.position.y + 370) / 600);
				} else {
					ctx.scale(app.main.vegeta.position.y / 600, app.main.vegeta.position.y / 600);
				}
				ctx.beginPath();
				ctx.arc(0, 0, 22, 0, 2 * Math.PI, false);
				ctx.globalAlpha = .5;
				ctx.fillStyle = '#black';
				ctx.fill();
				ctx.restore();
				ctx.restore();
			}

			if (this.android16 == true) {
				//16
				ctx.save();
				ctx.translate(this.movement16.x - 40, this.movement16.y + 155);
				ctx.scale(2, .4);
				ctx.save();
				/* if(app.main.vegeta.aboveBuilding == true && app.main.vegeta.byBuilding == true && this.buildingActive == true){
    	ctx.scale((app.main.vegeta.position.y + 370) / 600,(app.main.vegeta.position.y + 370) / 600);
    } else {
    	ctx.scale(app.main.vegeta.position.y / 600,app.main.vegeta.position.y / 600);
    } */
				ctx.beginPath();
				ctx.arc(0, 0, 22, 0, 2 * Math.PI, false);
				ctx.globalAlpha = .5;
				ctx.fillStyle = '#black';
				ctx.fill();
				ctx.restore();
				ctx.restore();
			}

			if (this.supportActive == true) {

				if (app.main.support[0].tien == true && app.main.support[0].vanish == false) {
					//Tien
					ctx.save();
					ctx.translate(app.main.support[0].position.x + 23, app.main.support[0].GROUND.y + 125);
					ctx.scale(2, .4);
					ctx.save();
					ctx.scale(app.main.support[0].position.y / 600, app.main.support[0].position.y / 600);
					ctx.beginPath();
					ctx.arc(0, 0, 22, 0, 2 * Math.PI, false);
					ctx.globalAlpha = .5;
					ctx.fillStyle = '#black';
					ctx.fill();
					ctx.restore();
					ctx.restore();
				}

				if (app.main.support[1].krillin == true && app.main.support[1].vanish == false) {
					//Krillin
					ctx.save();
					ctx.translate(app.main.support[1].position.x + 23, app.main.support[1].GROUND.y + 105);
					ctx.scale(2, .4);
					ctx.save();
					ctx.scale(app.main.support[1].position.y / 600, app.main.support[1].position.y / 600);
					ctx.beginPath();
					ctx.arc(0, 0, 22, 0, 2 * Math.PI, false);
					ctx.globalAlpha = .5;
					ctx.fillStyle = '#black';
					ctx.fill();
					ctx.restore();
					ctx.restore();
				}
			}

			if (this.yamcha == true && app.main.yamchaDead == false) {
				//Yamcha
				ctx.save();
				ctx.translate(this.movementYamcha.x + 850 + 210, 745);
				ctx.scale(2, .4);
				ctx.save();
				//ctx.scale((this.movementYamcha.y + 850) / 600,(this.movementYamcha.y + 390) / 600);
				ctx.beginPath();
				ctx.arc(0, 0, 20, 0, 2 * Math.PI, false);
				ctx.globalAlpha = .5;
				ctx.fillStyle = '#black';
				ctx.fill();
				ctx.restore();
				ctx.restore();
			}

			if (this.chaotzu == true && app.main.chaotzuDead == false) {
				//Chaotzu
				ctx.save();
				ctx.translate(this.movementChaotzu.x + 800 + 204, 745);
				ctx.scale(2, .4);
				ctx.save();
				//ctx.scale(this.movementChaotzu.y / 600,this.movementChaotzu.y / 600);
				ctx.beginPath();
				ctx.arc(0, 0, 12, 0, 2 * Math.PI, false);
				ctx.globalAlpha = .5;
				ctx.fillStyle = '#black';
				ctx.fill();
				ctx.restore();
				ctx.restore();
			}

			//console.log("GEROSPY BOT BOT BOT BOT BOT::" + this.geroSpy);

			if (app.main.scene == false) {
				if (this.geroSpy == false) {
					this.spyChance = Math.random();
					if (this.spyChance > .98) {
						this.spyTimer = 0;
						this.spyExit = false;
						this.geroSpy = true;
						if (app.main.vegeta.left == true) {
							this.spyLeft = true;
							this.spyRight = false;
						} else {
							this.spyRight = true;
							this.spyLeft = false;
						}
					}
				} else if (this.geroSpy == true) {
					if (this.spyExit == true) {
						this.spyTimer++;
					}

					if (this.spyReverse == false) {
						this.spyMoveVert += 1;
						if (this.spyMoveVert > 15) {
							this.spyReverse = true;
						}
					} else if (this.spyReverse == true) {
						this.spyMoveVert -= 1;
						if (this.spyMoveVert < -4) {
							this.spyReverse = false;
						}
					}

					if (this.spyRight == true) {
						ctx.save();
						ctx.translate(this.spyLocation.x, this.spyLocation.y + this.spyMoveVert);
						ctx.drawImage(this.gerosSpy1, 0, 0);
						ctx.restore();
					} else if (this.spyLeft == true) {
						ctx.save();
						ctx.translate(this.spyLocation.x, this.spyLocation.y + this.spyMoveVert);
						ctx.scale(-1, 1);
						ctx.drawImage(this.gerosSpy1, 0, 0);
						ctx.restore();
					}

					if (this.spyExit == false && this.spyLocation.y < 160) {
						this.spyLocation.y += 20;
					} else if (this.spyExit == true && this.spyLocation.y > -100) {
						this.spyLocation.y -= 20;
					}

					if (this.spyTimer > 100) {
						this.geroSpy = false;
					}

					if (this.spyLeft == true) {
						this.spyLocation.x = app.main.vegeta.position.x + 150;
						if (app.main.vegeta.right == true || app.main.vegeta.superSpeed == true) {
							this.spyExit = true;
						}
					} else if (this.spyRight == true) {
						this.spyLocation.x = app.main.vegeta.position.x - 150;
						if (app.main.vegeta.left == true || app.main.vegeta.superSpeed == true) {
							this.spyExit = true;
						}
					}
				}
			}

			if (this.supportActive == true) {
				for (var i = 0; i < 2; i++) {
					if (app.main.support[i].air == false) {
						app.main.support[i].draw(ctx); // DRAW SUPPORT
						app.main.support[i].update(); // UPDATE SUPPORT
					}
				}
			}

			if (app.main.android17.air == false) {
				if (app.main.android17.gone == false) {
					app.main.android17.draw(ctx); // DRAW 17
					app.main.android17.update(); // UPDATE 17
				}
			}

			if (app.main.vegeta.air == false) {
				app.main.vegeta.draw(ctx); // DRAW VEGETA
				if (app.main.scene == false || app.main.vegeta.appear == true) {
					app.main.vegeta.update(); // UPDATE VEGETA
				}
			}
			if (app.main.android18.air == false) {
				app.main.android18.draw(ctx); // DRAW 18
			}

			ctx.restore();

			if (this.supportActive == true) {
				for (var i = 0; i < 2; i++) {
					if (app.main.support[i].air == true) {
						app.main.support[i].draw(ctx); // DRAW SUPPORT
						app.main.support[i].update(); // UPDATE SUPPORT
					}
				}
			}

			if (app.main.android17.air == true) {
				if (app.main.android17.gone == false || app.main.scene == true) {
					app.main.android17.draw(ctx); // DRAW 17
					app.main.android17.update(); // UPDATE 17
				}
			}
			if (app.main.vegeta.air == true) {
				app.main.vegeta.draw(ctx); // DRAW VEGETA
				app.main.vegeta.update(); // UPDATE VEGETA
			}
			if (app.main.android18.air == true) {
				app.main.android18.draw(ctx); // DRAW 18
			}

			if (this.android16 == true) {
				ctx.save();
				ctx.translate(this.movement16.x, this.movement16.y);
				ctx.scale(-1.1, 1.1);
				if (this.braced == false) {
					ctx.drawImage(this.a16Stance, 0, 0);
				} else {
					ctx.drawImage(this.a16Stance2, 0, 0);
				}
				if (this.tele16 == true) {
					ctx.drawImage(this.teleport5, 0, 0);
					this.tele16 = false;
				}
				ctx.restore();
			}

			if (app.main.vegeta.gohan == true && app.main.vegeta.superForm == true && app.main.endingState == false && app.main.specialScene == false) {
				var draw = function draw() {

					//ctx.clearRect(0, 0, 1024, 768);
					for (var c = 0; c < particles.length; c++) {
						ctx.save();
						var p = particles[c];
						ctx.beginPath();
						ctx.moveTo(p.x, p.y);
						ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
						ctx.stroke();
						ctx.restore();
					}
					move();
				};

				var move = function move() {
					for (var b = 0; b < particles.length; b++) {
						var p = particles[b];
						p.x += p.xs;
						p.y += p.ys;
						if (p.x > 1024 || p.y > 740) {
							p.x = Math.random() * 1024;
							p.y = -20;
						}
					}
				};

				//app.main.sound.playIntro(56); //rain sound
				ctx.save();
				ctx.strokeStyle = 'rgba(174,194,224,0.5)';
				ctx.lineWidth = 2;
				ctx.lineCap = 'round';

				var init = [];
				var maxParts = 1000;
				for (var a = 0; a < maxParts; a++) {
					init.push({
						x: Math.random() * 1024,
						y: Math.random() * 740,
						l: Math.random() * 1,
						xs: -4 + Math.random() * 4 + 2,
						ys: Math.random() * 10 + 10
					});
				}

				var particles = [];
				for (var b = 0; b < maxParts; b++) {
					particles[b] = init[b];
				}

				draw();
				ctx.restore();
			}
		} else if (app.main.gameState == app.main.GAME_STATE.TUTORIAL) {
			ctx.save();
			if (this.shake == true) {
				if (this.counter == 0 || this.counter == 2 || this.counter == 4) {
					ctx.translate(0, 15);
				} else if (this.counter == 1 || this.counter == 3 || this.counter == 5) {
					//normal
				} else {
					this.shake = false;
					this.counter = 0;
				}
				this.counter++;
			} else if (this.powerUp == true) {
				this.pCounter++;
				if (this.pCounter < 2) {
					ctx.translate(0, 2);
				} else {
					this.pCounter = 0;
				}
			}
			ctx.save();
			ctx.drawImage(this.lab1, 0, 0);
			ctx.globalAlpha = this.alpha / 100;
			ctx.fillStyle = "black";
			ctx.fillRect(0, 0, 1024, 768);
			ctx.restore();

			if (this.active19 == true) {

				ctx.save();
				ctx.translate(this.position19.x + 740, this.position19.y + 435 - this.bounce / 2.5);
				ctx.scale(1, 1);
				if (this.bouncing == false && this.backDown == false) {
					ctx.drawImage(this.a19Head, 0, 0);
				} else {
					ctx.save();
					ctx.translate(20, 20);
					ctx.rotate(30 * Math.PI / 180);
					ctx.drawImage(this.a19Head, -20, -20);
					ctx.restore();
				}

				ctx.restore();
			}

			if (this.cape == true) {

				ctx.save();
				if (this.capeDirLeft == false) {
					ctx.scale(-1, 1);
					ctx.translate((this.capeLocation.x + 200) * -1, this.capeLocation.y + 730 - this.bounce);
					ctx.scale(.8, .8);
					if (this.bouncing == false && this.backDown == false) {
						ctx.drawImage(this.cape3, 0, 0);
					} else {
						ctx.drawImage(this.cape4, 0, 0);
					}
				} else {
					ctx.translate(this.capeLocation.x + 400, this.capeLocation.y + 730 - this.bounce);
					ctx.scale(.8, .8);
					if (this.bouncing == false && this.backDown == false) {
						ctx.drawImage(this.cape3, 0, 0);
					} else {
						ctx.drawImage(this.cape4, 0, 0);
					}
				}
				ctx.restore();
			}

			//Android 18
			if (app.main.android18.vanish == false) {
				ctx.save();
				ctx.translate(app.main.android18.position.x + 23, app.main.android18.GROUND.y + 125);
				ctx.scale(2, .4);
				ctx.save();
				ctx.scale(app.main.android18.position.y / 600, app.main.android18.position.y / 600);
				ctx.beginPath();
				ctx.arc(0, 0, 22, 0, 2 * Math.PI, false);
				ctx.globalAlpha = .5;
				ctx.fillStyle = '#black';
				ctx.fill();
				ctx.restore();
				ctx.restore();
			}

			//Android 17
			if (app.main.android17.vanish == false && app.main.android17.city == false && app.main.android17.gone == false) {
				ctx.save();
				ctx.translate(app.main.android17.position.x + 23, app.main.android17.GROUND.y + 125);
				ctx.scale(2, .4);
				ctx.save();
				ctx.scale(app.main.android17.position.y / 600, app.main.android17.position.y / 600);
				ctx.beginPath();
				ctx.arc(0, 0, 20, 0, 2 * Math.PI, false);
				ctx.globalAlpha = .5;
				ctx.fillStyle = '#black';
				ctx.fill();
				ctx.restore();
				ctx.restore();
			}

			if (app.main.vegeta.gero == true && app.main.vegeta.vanish == false) {
				//Gero
				ctx.save();
				ctx.translate(app.main.vegeta.position.x + 23, app.main.vegeta.GROUND.y + 125);
				ctx.scale(2, .4);
				ctx.save();
				ctx.scale(app.main.vegeta.position.y / 600, app.main.vegeta.position.y / 600);
				ctx.beginPath();
				ctx.arc(0, 0, 20, 0, 2 * Math.PI, false);
				ctx.globalAlpha = .5;
				ctx.fillStyle = '#black';
				ctx.fill();
				ctx.restore();
				ctx.restore();
			}

			if (app.main.android17.air == false) {
				if (app.main.android17.gone == false) {
					app.main.android17.draw(ctx); // DRAW 17
					app.main.android17.update(); // UPDATE 17
				}
			}

			if (app.main.android18.air == false) {
				app.main.android18.draw(ctx); // DRAW 18
			}

			if (app.main.vegeta.air == false) {
				app.main.vegeta.draw(ctx); // DRAW VEGETA
				app.main.vegeta.update(); // UPDATE VEGETA
			}

			if (this.remote == true) {
				this.remoteTimer++;
				if (this.remoteTimer < 2) {
					app.main.sound.playTaunt2(Math.round(getRandom(69, 71)));
					this.remotePosition.y = app.main.vegeta.position.y + 60;
					this.remotePosition.x = app.main.vegeta.position.x;
				}
				if (this.remotePosition.y < 743 && this.remoteGround == false) {
					this.remotePosition.y += 4 * this.remoteTimer;
				}
				if (this.remotePosition.y > 742) {
					this.remoteGround = true;
					app.main.sound.playEffectLoud(55);
					this.remotePosition.y = 740;
				}

				ctx.save();
				ctx.drawImage(this.remote2, this.remotePosition.x, this.remotePosition.y);
				ctx.restore();
			}

			ctx.restore();

			if (app.main.android17.air == true) {
				if (app.main.android17.gone == false) {
					app.main.android17.draw(ctx); // DRAW 17
					app.main.android17.update(); // UPDATE 17
				}
			}

			if (app.main.android18.air == true) {
				app.main.android18.draw(ctx); // DRAW 18
			}

			if (app.main.vegeta.air == true) {
				app.main.vegeta.draw(ctx); // DRAW VEGETA
				app.main.vegeta.update(); // UPDATE VEGETA
			}

			if (app.main.piccoloDead == true) {

				ctx.save();
				if (this.deathPiccoloDirLeft == false) {
					ctx.scale(-1, 1);
					ctx.translate((this.deathLocationPiccolo.x + 66) * -1, this.deathLocationPiccolo.y + 84 - this.bounce);
					ctx.scale(.8, .8);
					if (this.bouncing == false && this.backDown == false) {
						ctx.drawImage(this.deadPiccolo, 0, 0);
					} else {
						ctx.drawImage(this.deadPiccolo2, 0, 0);
					}
				} else {
					ctx.translate(this.deathLocationPiccolo.x + 4, this.deathLocationPiccolo.y + 84 - this.bounce);
					ctx.scale(.8, .8);
					if (this.bouncing == false && this.backDown == false) {
						ctx.drawImage(this.deadPiccolo, 0, 0);
					} else {
						ctx.drawImage(this.deadPiccolo2, 0, 0);
					}
				}
				ctx.restore();
			}
		}
	};

	//DRAW THE ENVIRONMENT -- FOREGROUND
	Environment.prototype.drawForeground = function (ctx) {

		//Smog draw
		if (this.smogCount > 0) {
			for (var i = 0; i < this.smogCount; i++) {

				ctx.save();
				this.smogTimer[i] += 2;
				if (this.smogTimer[i] > 16) {
					this.smogTimer[i] = 2;
				}
				ctx.globalAlpha = this.smogAlpha[i];
				console.log(this.smogAngle[i]);
				ctx.translate(this.smogPos[i].x + this.smogSize[i].x / 2, this.smogPos[i].y + this.smogSize[i].y / 2);
				ctx.rotate(this.smogAngle[i] * (Math.PI / 180));
				ctx.translate(-1 * (this.smogPos[i].x + this.smogSize[i].x / 2), -1 * (this.smogPos[i].y + this.smogSize[i].y / 2));
				//ctx.drawImage(this.smog1,this.smogPos[i].x,this.smogPos[i].y + 17,this.smogSize[i].x,this.smogSize[i].y);
				//ctx.drawImage(this.smog16,this.smogPos[i].x - 2,this.smogPos[i].y + 22,this.smogSize[i].x,this.smogSize[i].y);
				if (this.smogTimer[i] < 2) {
					ctx.drawImage(this.smog1, this.smogPos[i].x, this.smogPos[i].y - 2, this.smogSize[i].x, this.smogSize[i].y);
				} else if (this.smogTimer[i] == 2) {
					ctx.drawImage(this.smog2, this.smogPos[i].x, this.smogPos[i].y - 1.2, this.smogSize[i].x, this.smogSize[i].y);
				} else if (this.smogTimer[i] == 3) {
					ctx.drawImage(this.smog3, this.smogPos[i].x, this.smogPos[i].y - .4, this.smogSize[i].x, this.smogSize[i].y);
				} else if (this.smogTimer[i] == 4) {
					ctx.drawImage(this.smog4, this.smogPos[i].x, this.smogPos[i].y + .4, this.smogSize[i].x, this.smogSize[i].y);
				} else if (this.smogTimer[i] == 5) {
					ctx.drawImage(this.smog5, this.smogPos[i].x, this.smogPos[i].y + 1.2, this.smogSize[i].x, this.smogSize[i].y);
				} else if (this.smogTimer[i] == 6) {
					ctx.drawImage(this.smog6, this.smogPos[i].x, this.smogPos[i].y + 2, this.smogSize[i].x, this.smogSize[i].y);
				} else if (this.smogTimer[i] == 7) {
					ctx.drawImage(this.smog7, this.smogPos[i].x, this.smogPos[i].y + 2.8, this.smogSize[i].x, this.smogSize[i].y);
				} else if (this.smogTimer[i] == 8) {
					ctx.drawImage(this.smog8, this.smogPos[i].x, this.smogPos[i].y + 3.6, this.smogSize[i].x, this.smogSize[i].y);
				} else if (this.smogTimer[i] == 9) {
					ctx.drawImage(this.smog9, this.smogPos[i].x, this.smogPos[i].y + 4.4, this.smogSize[i].x, this.smogSize[i].y);
				} else if (this.smogTimer[i] == 10) {
					ctx.drawImage(this.smog10, this.smogPos[i].x, this.smogPos[i].y + 5.2, this.smogSize[i].x, this.smogSize[i].y);
				} else if (this.smogTimer[i] == 11) {
					ctx.drawImage(this.smog11, this.smogPos[i].x - 1, this.smogPos[i].y + 6, this.smogSize[i].x, this.smogSize[i].y);
				} else if (this.smogTimer[i] == 12) {
					ctx.drawImage(this.smog12, this.smogPos[i].x - 1, this.smogPos[i].y + 6.8, this.smogSize[i].x, this.smogSize[i].y);
				} else if (this.smogTimer[i] == 13) {
					ctx.drawImage(this.smog13, this.smogPos[i].x - 1, this.smogPos[i].y + 7.6, this.smogSize[i].x, this.smogSize[i].y);
				} else if (this.smogTimer[i] == 14) {
					ctx.drawImage(this.smog14, this.smogPos[i].x - 2, this.smogPos[i].y + 8.4, this.smogSize[i].x, this.smogSize[i].y);
				} else if (this.smogTimer[i] == 15) {
					ctx.drawImage(this.smog15, this.smogPos[i].x - 2, this.smogPos[i].y + 9.2, this.smogSize[i].x, this.smogSize[i].y);
				} else if (this.smogTimer[i] > 15) {
					ctx.drawImage(this.smog16, this.smogPos[i].x - 2, this.smogPos[i].y + 10, this.smogSize[i].x, this.smogSize[i].y);
				}

				ctx.restore();
			}
		}

		if (app.main.gameState == app.main.GAME_STATE.BEGIN) {
			/*
   ctx.save();
   if(this.movingSmoke < -6500){
   	this.movingSmoke = 6400;
   }
   
   if(this.movingSmoke3 < -6500){
   	this.movingSmoke3 = 6400;
   }
   ctx.globalAlpha = .5;
   ctx.drawImage(this.smoke3,this.movingSmoke,295, 6550, 300);
   ctx.drawImage(this.smoke3,this.movingSmoke3,295, 6550, 300);
   ctx.restore();
   */
			ctx.save();
			ctx.globalAlpha = this.alpha / 100;
			ctx.fillStyle = "black";
			ctx.fillRect(0, 295, 1024, 300);
			ctx.restore();
			/*
   ctx.save();
   ctx.globalAlpha = .9;
   ctx.fillStyle = "black";
   ctx.fillRect(0,295,1024,300);
   ctx.restore();
   */
		}

		if (app.main.gameState == app.main.GAME_STATE.DEFAULT) {

			ctx.save();
			if (this.movingSmoke < -6800) {
				this.movingSmoke = 6400;
			}
			if (this.movingSmoke2 < -4000) {
				this.movingSmoke2 = 1200;
			}

			if (this.movingSmoke3 < -6800) {
				this.movingSmoke3 = 6400;
			}
			if (app.main.android17.city == false && app.main.scene == false || app.main.vegeta.gohan == false && app.main.vegeta.superForm == false) {
				if (this.currentSmoke > 40) {
					this.currentSmoke--;
				}
				ctx.globalAlpha = this.currentSmoke / 100;
			} else {
				if (this.currentSmoke < 55) {
					this.currentSmoke++;
				}
				ctx.globalAlpha = this.currentSmoke / 100;
			}
			ctx.drawImage(this.smoke3, this.movingSmoke - 150, -850, 6850, 1800);
			ctx.drawImage(this.smoke3, this.movingSmoke3, -850, 6550, 1800);
			ctx.restore();
		}

		/* if(this.flash == true){
  	ctx.save();
  	ctx.globalAlpha = this.fade/100;
  	//ctx.fillStyle = "White";
  	ctx.fillStyle = "#FFFF99";
  	ctx.fillRect(0,0,1024,768);
  	ctx.restore();
  }
  
  if(this.superFlash == true){
  	ctx.save();
  	ctx.globalAlpha = this.fade2/100;
  	ctx.fillStyle = "#FFFF99";
  	ctx.fillRect(0,0,1024,768);
  	ctx.restore();
  }
  
  if(this.fadeInSlow == true){
  	this.fade3 = this.fade3 - 2.5;
  	ctx.save();
  	ctx.globalAlpha = this.fade3/100;
  	ctx.fillStyle = "black";
  	ctx.fillRect(0,0,1024,768);
  	ctx.restore();
  	if(this.fade3 < 1){
  		this.fadeInSlow = false;
  		this.fade3 = 100;
  	}
  }
  
  if(this.fadeInFast == true){
  	this.fade3 = this.fade3 - 5;
  	ctx.save();
  	ctx.globalAlpha = this.fade3/100;
  	ctx.fillStyle = "black";
  	ctx.fillRect(0,0,1024,768);
  	ctx.restore();
  	if(this.fade3 < 1){
  		this.fadeInFast = false;
  		this.fade3 = 100;
  	}
  }
  
  if(this.fadeOut == true){
  	this.fade4 = this.fade4 + 2.5;
  	ctx.save();
  	ctx.globalAlpha = this.fade4/100;
  	ctx.fillStyle = "black";
  	ctx.fillRect(0,0,1024,768);
  	ctx.restore();
  	if(this.fade4 > 99){
  		this.fadeOut = false;
  		this.fade4 = 0;
  	}
  } */
	};

	//DRAW THE TOP LAYER
	Environment.prototype.drawTop = function (ctx3) {

		//ctx3.canvas.width = ctx3.canvas.width
		ctx3.clearRect(0, 0, ctx3.canvas.width, ctx3.canvas.height);

		/* if(this.flash == true){
  	ctx3.save();
  	ctx3.globalAlpha = this.fade/100;
  	//ctx3.fillStyle = "White";
  	ctx3.fillStyle = "#FFFF99";
  	ctx3.fillRect(0,0,1024,768);
  	ctx3.restore();
  }
  
  if(this.superFlash == true){
  	ctx3.save();
  	ctx3.globalAlpha = this.fade2/100;
  	ctx3.fillStyle = "#FFFF99";
  	ctx3.fillRect(0,0,1024,768);
  	ctx3.restore();
  }
  
  if(this.fadeInSlow == true){
  	this.fade3 = this.fade3 - 2.5;
  	ctx3.save();
  	ctx3.globalAlpha = this.fade3/100;
  	ctx3.fillStyle = "black";
  	ctx3.fillRect(0,0,1024,768);
  	ctx3.restore();
  	if(this.fade3 < 1){
  		this.fadeInSlow = false;
  		this.fade3 = 100;
  	}
  }
  
  if(this.fadeInFast == true){
  	this.fade3 = this.fade3 - 5;
  	ctx3.save();
  	ctx3.globalAlpha = this.fade3/100;
  	ctx3.fillStyle = "black";
  	ctx3.fillRect(0,0,1024,768);
  	ctx3.restore();
  	if(this.fade3 < 1){
  		this.fadeInFast = false;
  		this.fade3 = 100;
  	}
  }
  
  if(this.fadeOut == true){
  	this.fade4 = this.fade4 + 2.5;
  	ctx3.save();
  	ctx3.globalAlpha = this.fade4/100;
  	ctx3.fillStyle = "black";
  	ctx3.fillRect(0,0,1024,768);
  	ctx3.restore();
  	if(this.fade4 > 99){
  		this.fadeOut = false;
  		this.fade4 = 0;
  	}
  } */

		ctx3.save();
		ctx3.globalAlpha = this.darkness / 100;
		ctx3.fillStyle = "black";
		ctx3.fillRect(0, 0, 1024, 768);
		ctx3.restore();

		if (this.dark == true) {
			if (this.darkCount < 10) {
				this.darkCount += .1;
				this.darkness += .1;
			} else {
				this.darkCount = 0;
				this.dark = false;
			}
		}
	};

	//DRAW THE OVERLAY
	Environment.prototype.drawOverlay = function (ctx2) {

		//ctx2.canvas.width = ctx2.canvas.width
		ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height);

		if (this.flash == true) {
			ctx2.save();
			ctx2.globalAlpha = this.fade / 100;
			//ctx2.fillStyle = "White";
			ctx2.fillStyle = "#FFFF99";
			ctx2.fillRect(0, 0, 1024, 768);
			ctx2.restore();
		}

		if (this.superFlash == true) {
			ctx2.save();
			ctx2.globalAlpha = this.fade2 / 100;
			ctx2.fillStyle = "#FFFF99";
			ctx2.fillRect(0, 0, 1024, 768);
			ctx2.restore();
		}

		if (this.fadeInSlow == true) {
			this.fade3 = this.fade3 - 2.5;
			ctx2.save();
			ctx2.globalAlpha = this.fade3 / 100;
			ctx2.fillStyle = "black";
			ctx2.fillRect(0, 0, 1024, 768);
			ctx2.restore();
			if (this.fade3 < 1) {
				this.fadeInSlow = false;
				this.fade3 = 100;
			}
		}

		if (this.fadeInFast == true) {
			this.fade3 = this.fade3 - 5;
			ctx2.save();
			ctx2.globalAlpha = this.fade3 / 100;
			ctx2.fillStyle = "black";
			ctx2.fillRect(0, 0, 1024, 768);
			ctx2.restore();
			if (this.fade3 < 1) {
				this.fadeInFast = false;
				this.fade3 = 100;
			}
		}

		if (this.fadeOut == true) {
			this.fade4 = this.fade4 + 2.5;
			ctx2.save();
			ctx2.globalAlpha = this.fade4 / 100;
			ctx2.fillStyle = "black";
			ctx2.fillRect(0, 0, 1024, 768);
			ctx2.restore();
		}

		if (this.fadeOut == false) {
			this.fade4 = 0;
		}
	};

	return Environment;
}(); //end IIFE
'use strict';

//exports = module.exports = Victor;

/**
 * # Victor - A JavaScript 2D vector class with methods for common vector operations
 */

/**
 * Constructor. Will also work without the `new` keyword
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = Victor(42, 1337);
 *
 * @param {Number} x Value of the x axis
 * @param {Number} y Value of the y axis
 * @return {Victor}
 * @api public
 */
function Victor(x, y) {
  if (!(this instanceof Victor)) {
    return new Victor(x, y);
  }

  /**
   * The X axis
   *
   * ### Examples:
   *     var vec = new Victor.fromArray(42, 21);
   *
   *     vec.x;
   *     // => 42
   *
   * @api public
   */
  this.x = x || 0;

  /**
   * The Y axis
   *
   * ### Examples:
   *     var vec = new Victor.fromArray(42, 21);
   *
   *     vec.y;
   *     // => 21
   *
   * @api public
   */
  this.y = y || 0;
};

/**
 * # Static
 */

/**
 * Creates a new instance from an array
 *
 * ### Examples:
 *     var vec = Victor.fromArray([42, 21]);
 *
 *     vec.toString();
 *     // => x:42, y:21
 *
 * @name Victor.fromArray
 * @param {Array} array Array with the x and y values at index 0 and 1 respectively
 * @return {Victor} The new instance
 * @api public
 */
Victor.fromArray = function (arr) {
  return new Victor(arr[0] || 0, arr[1] || 0);
};

/**
 * Creates a new instance from an object
 *
 * ### Examples:
 *     var vec = Victor.fromObject({ x: 42, y: 21 });
 *
 *     vec.toString();
 *     // => x:42, y:21
 *
 * @name Victor.fromObject
 * @param {Object} obj Object with the values for x and y
 * @return {Victor} The new instance
 * @api public
 */
Victor.fromObject = function (obj) {
  return new Victor(obj.x || 0, obj.y || 0);
};

/**
 * # Manipulation
 *
 * These functions are chainable.
 */

/**
 * Adds another vector's X axis to this one
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.addX(vec2);
 *     vec1.toString();
 *     // => x:30, y:10
 *
 * @param {Victor} vector The other vector you want to add to this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.addX = function (vec) {
  this.x += vec.x;
  return this;
};

/**
 * Adds another vector's Y axis to this one
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.addY(vec2);
 *     vec1.toString();
 *     // => x:10, y:40
 *
 * @param {Victor} vector The other vector you want to add to this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.addY = function (vec) {
  this.y += vec.y;
  return this;
};

/**
 * Adds another vector to this one
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.add(vec2);
 *     vec1.toString();
 *     // => x:30, y:40
 *
 * @param {Victor} vector The other vector you want to add to this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.add = function (vec) {
  this.x += vec.x;
  this.y += vec.y;
  return this;
};

/**
 * Adds the given scalar to both vector axis
 *
 * ### Examples:
 *     var vec = new Victor(1, 2);
 *
 *     vec.addScalar(2);
 *     vec.toString();
 *     // => x: 3, y: 4
 *
 * @param {Number} scalar The scalar to add
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.addScalar = function (scalar) {
  this.x += scalar;
  this.y += scalar;
  return this;
};

/**
 * Adds the given scalar to the X axis
 *
 * ### Examples:
 *     var vec = new Victor(1, 2);
 *
 *     vec.addScalarX(2);
 *     vec.toString();
 *     // => x: 3, y: 2
 *
 * @param {Number} scalar The scalar to add
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.addScalarX = function (scalar) {
  this.x += scalar;
  return this;
};

/**
 * Adds the given scalar to the Y axis
 *
 * ### Examples:
 *     var vec = new Victor(1, 2);
 *
 *     vec.addScalarY(2);
 *     vec.toString();
 *     // => x: 1, y: 4
 *
 * @param {Number} scalar The scalar to add
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.addScalarY = function (scalar) {
  this.y += scalar;
  return this;
};

/**
 * Subtracts the X axis of another vector from this one
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.subtractX(vec2);
 *     vec1.toString();
 *     // => x:80, y:50
 *
 * @param {Victor} vector The other vector you want subtract from this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtractX = function (vec) {
  this.x -= vec.x;
  return this;
};

/**
 * Subtracts the Y axis of another vector from this one
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.subtractY(vec2);
 *     vec1.toString();
 *     // => x:100, y:20
 *
 * @param {Victor} vector The other vector you want subtract from this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtractY = function (vec) {
  this.y -= vec.y;
  return this;
};

/**
 * Subtracts another vector from this one
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.subtract(vec2);
 *     vec1.toString();
 *     // => x:80, y:20
 *
 * @param {Victor} vector The other vector you want subtract from this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtract = function (vec) {
  this.x -= vec.x;
  this.y -= vec.y;
  return this;
};

/**
 * Subtracts the given scalar from both axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 200);
 *
 *     vec.subtractScalar(20);
 *     vec.toString();
 *     // => x: 80, y: 180
 *
 * @param {Number} scalar The scalar to subtract
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtractScalar = function (scalar) {
  this.x -= scalar;
  this.y -= scalar;
  return this;
};

/**
 * Subtracts the given scalar from the X axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 200);
 *
 *     vec.subtractScalarX(20);
 *     vec.toString();
 *     // => x: 80, y: 200
 *
 * @param {Number} scalar The scalar to subtract
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtractScalarX = function (scalar) {
  this.x -= scalar;
  return this;
};

/**
 * Subtracts the given scalar from the Y axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 200);
 *
 *     vec.subtractScalarY(20);
 *     vec.toString();
 *     // => x: 100, y: 180
 *
 * @param {Number} scalar The scalar to subtract
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtractScalarY = function (scalar) {
  this.y -= scalar;
  return this;
};

/**
 * Divides the X axis by the x component of given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(2, 0);
 *
 *     vec.divideX(vec2);
 *     vec.toString();
 *     // => x:50, y:50
 *
 * @param {Victor} vector The other vector you want divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divideX = function (vector) {
  this.x /= vector.x;
  return this;
};

/**
 * Divides the Y axis by the y component of given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(0, 2);
 *
 *     vec.divideY(vec2);
 *     vec.toString();
 *     // => x:100, y:25
 *
 * @param {Victor} vector The other vector you want divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divideY = function (vector) {
  this.y /= vector.y;
  return this;
};

/**
 * Divides both vector axis by a axis values of given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(2, 2);
 *
 *     vec.divide(vec2);
 *     vec.toString();
 *     // => x:50, y:25
 *
 * @param {Victor} vector The vector to divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divide = function (vector) {
  this.x /= vector.x;
  this.y /= vector.y;
  return this;
};

/**
 * Divides both vector axis by the given scalar value
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.divideScalar(2);
 *     vec.toString();
 *     // => x:50, y:25
 *
 * @param {Number} The scalar to divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divideScalar = function (scalar) {
  if (scalar !== 0) {
    this.x /= scalar;
    this.y /= scalar;
  } else {
    this.x = 0;
    this.y = 0;
  }

  return this;
};

/**
 * Divides the X axis by the given scalar value
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.divideScalarX(2);
 *     vec.toString();
 *     // => x:50, y:50
 *
 * @param {Number} The scalar to divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divideScalarX = function (scalar) {
  if (scalar !== 0) {
    this.x /= scalar;
  } else {
    this.x = 0;
  }
  return this;
};

/**
 * Divides the Y axis by the given scalar value
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.divideScalarY(2);
 *     vec.toString();
 *     // => x:100, y:25
 *
 * @param {Number} The scalar to divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divideScalarY = function (scalar) {
  if (scalar !== 0) {
    this.y /= scalar;
  } else {
    this.y = 0;
  }
  return this;
};

/**
 * Inverts the X axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.invertX();
 *     vec.toString();
 *     // => x:-100, y:50
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.invertX = function () {
  this.x *= -1;
  return this;
};

/**
 * Inverts the Y axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.invertY();
 *     vec.toString();
 *     // => x:100, y:-50
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.invertY = function () {
  this.y *= -1;
  return this;
};

/**
 * Inverts both axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.invert();
 *     vec.toString();
 *     // => x:-100, y:-50
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.invert = function () {
  this.invertX();
  this.invertY();
  return this;
};

/**
 * Multiplies the X axis by X component of given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(2, 0);
 *
 *     vec.multiplyX(vec2);
 *     vec.toString();
 *     // => x:200, y:50
 *
 * @param {Victor} vector The vector to multiply the axis with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiplyX = function (vector) {
  this.x *= vector.x;
  return this;
};

/**
 * Multiplies the Y axis by Y component of given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(0, 2);
 *
 *     vec.multiplyX(vec2);
 *     vec.toString();
 *     // => x:100, y:100
 *
 * @param {Victor} vector The vector to multiply the axis with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiplyY = function (vector) {
  this.y *= vector.y;
  return this;
};

/**
 * Multiplies both vector axis by values from a given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(2, 2);
 *
 *     vec.multiply(vec2);
 *     vec.toString();
 *     // => x:200, y:100
 *
 * @param {Victor} vector The vector to multiply by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiply = function (vector) {
  this.x *= vector.x;
  this.y *= vector.y;
  return this;
};

/**
 * Multiplies both vector axis by the given scalar value
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.multiplyScalar(2);
 *     vec.toString();
 *     // => x:200, y:100
 *
 * @param {Number} The scalar to multiply by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiplyScalar = function (scalar) {
  this.x *= scalar;
  this.y *= scalar;
  return this;
};

/**
 * Multiplies the X axis by the given scalar
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.multiplyScalarX(2);
 *     vec.toString();
 *     // => x:200, y:50
 *
 * @param {Number} The scalar to multiply the axis with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiplyScalarX = function (scalar) {
  this.x *= scalar;
  return this;
};

/**
 * Multiplies the Y axis by the given scalar
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.multiplyScalarY(2);
 *     vec.toString();
 *     // => x:100, y:100
 *
 * @param {Number} The scalar to multiply the axis with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiplyScalarY = function (scalar) {
  this.y *= scalar;
  return this;
};

/**
 * Normalize
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.normalize = function () {
  var length = this.length();

  if (length === 0) {
    this.x = 1;
    this.y = 0;
  } else {
    this.divide(Victor(length, length));
  }
  return this;
};

Victor.prototype.norm = Victor.prototype.normalize;

/**
 * If the absolute vector axis is greater than `max`, multiplies the axis by `factor`
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.limit(80, 0.9);
 *     vec.toString();
 *     // => x:90, y:50
 *
 * @param {Number} max The maximum value for both x and y axis
 * @param {Number} factor Factor by which the axis are to be multiplied with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.limit = function (max, factor) {
  if (Math.abs(this.x) > max) {
    this.x *= factor;
  }
  if (Math.abs(this.y) > max) {
    this.y *= factor;
  }
  return this;
};

/**
 * Randomizes both vector axis with a value between 2 vectors
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.randomize(new Victor(50, 60), new Victor(70, 80`));
 *     vec.toString();
 *     // => x:67, y:73
 *
 * @param {Victor} topLeft first vector
 * @param {Victor} bottomRight second vector
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.randomize = function (topLeft, bottomRight) {
  this.randomizeX(topLeft, bottomRight);
  this.randomizeY(topLeft, bottomRight);

  return this;
};

/**
 * Randomizes the y axis with a value between 2 vectors
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.randomizeX(new Victor(50, 60), new Victor(70, 80`));
 *     vec.toString();
 *     // => x:55, y:50
 *
 * @param {Victor} topLeft first vector
 * @param {Victor} bottomRight second vector
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.randomizeX = function (topLeft, bottomRight) {
  var min = Math.min(topLeft.x, bottomRight.x);
  var max = Math.max(topLeft.x, bottomRight.x);
  this.x = random(min, max);
  return this;
};

/**
 * Randomizes the y axis with a value between 2 vectors
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.randomizeY(new Victor(50, 60), new Victor(70, 80`));
 *     vec.toString();
 *     // => x:100, y:66
 *
 * @param {Victor} topLeft first vector
 * @param {Victor} bottomRight second vector
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.randomizeY = function (topLeft, bottomRight) {
  var min = Math.min(topLeft.y, bottomRight.y);
  var max = Math.max(topLeft.y, bottomRight.y);
  this.y = random(min, max);
  return this;
};

/**
 * Randomly randomizes either axis between 2 vectors
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.randomizeAny(new Victor(50, 60), new Victor(70, 80));
 *     vec.toString();
 *     // => x:100, y:77
 *
 * @param {Victor} topLeft first vector
 * @param {Victor} bottomRight second vector
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.randomizeAny = function (topLeft, bottomRight) {
  if (!!Math.round(Math.random())) {
    this.randomizeX(topLeft, bottomRight);
  } else {
    this.randomizeY(topLeft, bottomRight);
  }
  return this;
};

/**
 * Rounds both axis to an integer value
 *
 * ### Examples:
 *     var vec = new Victor(100.2, 50.9);
 *
 *     vec.unfloat();
 *     vec.toString();
 *     // => x:100, y:51
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.unfloat = function () {
  this.x = Math.round(this.x);
  this.y = Math.round(this.y);
  return this;
};

/**
 * Rounds both axis to a certain precision
 *
 * ### Examples:
 *     var vec = new Victor(100.2, 50.9);
 *
 *     vec.unfloat();
 *     vec.toString();
 *     // => x:100, y:51
 *
 * @param {Number} Precision (default: 8)
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.toFixed = function (precision) {
  if (typeof precision === 'undefined') {
    precision = 8;
  }
  this.x = this.x.toFixed(precision);
  this.y = this.y.toFixed(precision);
  return this;
};

/**
 * Performs a linear blend / interpolation of the X axis towards another vector
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 100);
 *     var vec2 = new Victor(200, 200);
 *
 *     vec1.mixX(vec2, 0.5);
 *     vec.toString();
 *     // => x:150, y:100
 *
 * @param {Victor} vector The other vector
 * @param {Number} amount The blend amount (optional, default: 0.5)
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.mixX = function (vec, amount) {
  if (typeof amount === 'undefined') {
    amount = 0.5;
  }

  this.x = (1 - amount) * this.x + amount * vec.x;
  return this;
};

/**
 * Performs a linear blend / interpolation of the Y axis towards another vector
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 100);
 *     var vec2 = new Victor(200, 200);
 *
 *     vec1.mixY(vec2, 0.5);
 *     vec.toString();
 *     // => x:100, y:150
 *
 * @param {Victor} vector The other vector
 * @param {Number} amount The blend amount (optional, default: 0.5)
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.mixY = function (vec, amount) {
  if (typeof amount === 'undefined') {
    amount = 0.5;
  }

  this.y = (1 - amount) * this.y + amount * vec.y;
  return this;
};

/**
 * Performs a linear blend / interpolation towards another vector
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 100);
 *     var vec2 = new Victor(200, 200);
 *
 *     vec1.mix(vec2, 0.5);
 *     vec.toString();
 *     // => x:150, y:150
 *
 * @param {Victor} vector The other vector
 * @param {Number} amount The blend amount (optional, default: 0.5)
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.mix = function (vec, amount) {
  this.mixX(vec, amount);
  this.mixY(vec, amount);
  return this;
};

/**
 * # Products
 */

/**
 * Creates a clone of this vector
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = vec1.clone();
 *
 *     vec2.toString();
 *     // => x:10, y:10
 *
 * @return {Victor} A clone of the vector
 * @api public
 */
Victor.prototype.clone = function () {
  return new Victor(this.x, this.y);
};

/**
 * Copies another vector's X component in to its own
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 20);
 *     var vec2 = vec1.copyX(vec1);
 *
 *     vec2.toString();
 *     // => x:20, y:10
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.copyX = function (vec) {
  this.x = vec.x;
  return this;
};

/**
 * Copies another vector's Y component in to its own
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 20);
 *     var vec2 = vec1.copyY(vec1);
 *
 *     vec2.toString();
 *     // => x:10, y:20
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.copyY = function (vec) {
  this.y = vec.y;
  return this;
};

/**
 * Copies another vector's X and Y components in to its own
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 20);
 *     var vec2 = vec1.copy(vec1);
 *
 *     vec2.toString();
 *     // => x:20, y:20
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.copy = function (vec) {
  this.copyX(vec);
  this.copyY(vec);
  return this;
};

/**
 * Sets the vector to zero (0,0)
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *		 var1.zero();
 *     vec1.toString();
 *     // => x:0, y:0
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.zero = function () {
  this.x = this.y = 0;
  return this;
};

/**
 * Calculates the dot product of this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.dot(vec2);
 *     // => 23000
 *
 * @param {Victor} vector The second vector
 * @return {Number} Dot product
 * @api public
 */
Victor.prototype.dot = function (vec2) {
  return this.x * vec2.x + this.y * vec2.y;
};

Victor.prototype.cross = function (vec2) {
  return this.x * vec2.y - this.y * vec2.x;
};

/**
 * Projects a vector onto another vector, setting itself to the result.
 *
 * ### Examples:
 *     var vec = new Victor(100, 0);
 *     var vec2 = new Victor(100, 100);
 *
 *     vec.projectOnto(vec2);
 *     vec.toString();
 *     // => x:50, y:50
 *
 * @param {Victor} vector The other vector you want to project this vector onto
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.projectOnto = function (vec2) {
  var coeff = (this.x * vec2.x + this.y * vec2.y) / (vec2.x * vec2.x + vec2.y * vec2.y);
  this.x = coeff * vec2.x;
  this.y = coeff * vec2.y;
  return this;
};

Victor.prototype.horizontalAngle = function () {
  return Math.atan2(this.y, this.x);
};

Victor.prototype.horizontalAngleDeg = function () {
  return radian2degrees(this.horizontalAngle());
};

Victor.prototype.verticalAngle = function () {
  return Math.atan2(this.x, this.y);
};

Victor.prototype.verticalAngleDeg = function () {
  return radian2degrees(this.verticalAngle());
};

Victor.prototype.angle = Victor.prototype.horizontalAngle;
Victor.prototype.angleDeg = Victor.prototype.horizontalAngleDeg;
Victor.prototype.direction = Victor.prototype.horizontalAngle;

Victor.prototype.rotate = function (angle) {
  var nx = this.x * Math.cos(angle) - this.y * Math.sin(angle);
  var ny = this.x * Math.sin(angle) + this.y * Math.cos(angle);

  this.x = nx;
  this.y = ny;

  return this;
};

Victor.prototype.rotateDeg = function (angle) {
  angle = degrees2radian(angle);
  return this.rotate(angle);
};

Victor.prototype.rotateTo = function (rotation) {
  return this.rotate(rotation - this.angle());
};

Victor.prototype.rotateToDeg = function (rotation) {
  rotation = degrees2radian(rotation);
  return this.rotateTo(rotation);
};

Victor.prototype.rotateBy = function (rotation) {
  var angle = this.angle() + rotation;

  return this.rotate(angle);
};

Victor.prototype.rotateByDeg = function (rotation) {
  rotation = degrees2radian(rotation);
  return this.rotateBy(rotation);
};

/**
 * Calculates the distance of the X axis between this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distanceX(vec2);
 *     // => -100
 *
 * @param {Victor} vector The second vector
 * @return {Number} Distance
 * @api public
 */
Victor.prototype.distanceX = function (vec) {
  return this.x - vec.x;
};

/**
 * Same as `distanceX()` but always returns an absolute number
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.absDistanceX(vec2);
 *     // => 100
 *
 * @param {Victor} vector The second vector
 * @return {Number} Absolute distance
 * @api public
 */
Victor.prototype.absDistanceX = function (vec) {
  return Math.abs(this.distanceX(vec));
};

/**
 * Calculates the distance of the Y axis between this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distanceY(vec2);
 *     // => -10
 *
 * @param {Victor} vector The second vector
 * @return {Number} Distance
 * @api public
 */
Victor.prototype.distanceY = function (vec) {
  return this.y - vec.y;
};

/**
 * Same as `distanceY()` but always returns an absolute number
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distanceY(vec2);
 *     // => 10
 *
 * @param {Victor} vector The second vector
 * @return {Number} Absolute distance
 * @api public
 */
Victor.prototype.absDistanceY = function (vec) {
  return Math.abs(this.distanceY(vec));
};

/**
 * Calculates the euclidean distance between this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distance(vec2);
 *     // => 100.4987562112089
 *
 * @param {Victor} vector The second vector
 * @return {Number} Distance
 * @api public
 */
Victor.prototype.distance = function (vec) {
  return Math.sqrt(this.distanceSq(vec));
};

/**
 * Calculates the squared euclidean distance between this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distanceSq(vec2);
 *     // => 10100
 *
 * @param {Victor} vector The second vector
 * @return {Number} Distance
 * @api public
 */
Victor.prototype.distanceSq = function (vec) {
  var dx = this.distanceX(vec),
      dy = this.distanceY(vec);

  return dx * dx + dy * dy;
};

/**
 * Calculates the length or magnitude of the vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.length();
 *     // => 111.80339887498948
 *
 * @return {Number} Length / Magnitude
 * @api public
 */
Victor.prototype.length = function () {
  return Math.sqrt(this.lengthSq());
};

/**
 * Squared length / magnitude
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.lengthSq();
 *     // => 12500
 *
 * @return {Number} Length / Magnitude
 * @api public
 */
Victor.prototype.lengthSq = function () {
  return this.x * this.x + this.y * this.y;
};

Victor.prototype.magnitude = Victor.prototype.length;

/**
 * Returns a true if vector is (0, 0)
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     vec.zero();
 *
 *     // => true
 *
 * @return {Boolean}
 * @api public
 */
Victor.prototype.isZero = function () {
  return this.x === 0 && this.y === 0;
};

/**
 * Returns a true if this vector is the same as another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(100, 50);
 *     vec1.isEqualTo(vec2);
 *
 *     // => true
 *
 * @return {Boolean}
 * @api public
 */
Victor.prototype.isEqualTo = function (vec2) {
  return this.x === vec2.x && this.y === vec2.y;
};

/**
 * # Utility Methods
 */

/**
 * Returns an string representation of the vector
 *
 * ### Examples:
 *     var vec = new Victor(10, 20);
 *
 *     vec.toString();
 *     // => x:10, y:20
 *
 * @return {String}
 * @api public
 */
Victor.prototype.toString = function () {
  return 'x:' + this.x + ', y:' + this.y;
};

/**
 * Returns an array representation of the vector
 *
 * ### Examples:
 *     var vec = new Victor(10, 20);
 *
 *     vec.toArray();
 *     // => [10, 20]
 *
 * @return {Array}
 * @api public
 */
Victor.prototype.toArray = function () {
  return [this.x, this.y];
};

/**
 * Returns an object representation of the vector
 *
 * ### Examples:
 *     var vec = new Victor(10, 20);
 *
 *     vec.toObject();
 *     // => { x: 10, y: 20 }
 *
 * @return {Object}
 * @api public
 */
Victor.prototype.toObject = function () {
  return { x: this.x, y: this.y };
};

var degrees = 180 / Math.PI;

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function radian2degrees(rad) {
  return rad * degrees;
}

function degrees2radian(deg) {
  return deg / degrees;
}
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
window.addEventListener("keydown", function (e) {
	//console.log("keydown=" + e.keyCode);
	myKeys.keydown[e.keyCode] = true;
});

window.addEventListener("keyup", function (e) {
	//console.log("keyup=" + e.keyCode);
	myKeys.keydown[e.keyCode] = false;

	// pausing and resuming
	var char = String.fromCharCode(e.keyCode);
	if (app.main.onScreen == true && app.main.loaded == true) {
		if (char == "p" || char == "P") {
			if (app.main.paused) {
				app.main.resumeGame();
			} else {
				app.main.pausedGame();
			}
		}
	}
});
/*
loader.js
variable 'app' is in global scope - i.e. a property of window.
app is our single global object literal - all other functions and properties of 
the game will be properties of app.
*/
"use strict";

// if app exists use the existing copy
// else create a new empty object literal

var app = app || {};

//ANDROID 18 IMAGES
app.images18 = Object.freeze({
			stance: "images/18Stance.png",
			stanceUp: "images/18StanceUp.png",
			stanceDown: "images/18StanceDown.png",
			slowFly: "images/18SlowFly.png",
			fastFly: "images/18FastFly.png",
			flyUp: "images/18FlyUp.png",
			flyUpUp: "images/18FlyUpUp.png",
			flyUpDown: "images/18FlyUpDown.png",
			flyDownSlow: "images/18FlyDownSlow.png",
			flyDownFast: "images/18FlyDownFast.png",
			reverse: "images/18Reverse.png",
			leftPunch: "images/18LeftPunch.png",
			rightPunch: "images/18RightPunch.png",
			punchPrep: "images/18PunchPrep.png",
			punchPrepAir: "images/18PunchPrepAir.png",
			rightPunchAir: "images/18RightPunchAir.png",
			leftPunchAir: "images/18LeftPunchAir.png",
			hit1: "images/18Hit1.png",
			hit2: "images/18Hit2.png",
			attackE: "images/18Energy.png",
			blastPrep: "images/18BlastPrep.png",
			hardKick: "images/18HardKick.png",
			ground: "images/18Ground.png",
			fallSide: "images/18FallSide.png",
			hardKickPrep: "images/18HardKickPrep.png",
			hardKickSwing: "images/18HardKickSwing.png",
			hardPunch: "images/18HardPunch.png",
			hardPunchAir: "images/18HardPunchAir.png",
			hardPunchAirPrep: "images/18HardPunchAirPrep.png",
			hardPunchAirSwing: "images/18HardPunchAirSwing.png",
			hardPunchPrep: "images/18HardPunchPrep.png",
			hitHard: "images/18HitHard.png",
			injured: "images/18Injured.png",
			kick: "images/18Kick.png",
			kickPrep: "images/18KickPrep.png",
			leftBlast: "images/18LeftBlast.png",
			rightBlast: "images/18RightBlast.png",
			block: "images/18Block.png",
			fallKick: "images/18FallKick.png",
			fallDown: "images/18FallDown.png",
			taunt: "images/18Taunt.png",
			launchPrep: "images/18LaunchPrep.png",
			launchSwing: "images/18LaunchSwing.png",
			launch: "images/18Launch.png",
			finger: "images/18FingerBeam.png",
			blastSky: "images/18BlastSky.png",
			energyDown: "images/18EnergyDown.png",
			special1: "images/18Special1.png",
			special2: "images/18Special2.png",
			mad1: "images/18Mad1.png",
			field1: "images/18Field1.png",
			field2: "images/18Field2.png",
			combat1: "images/18Combat.png"

});

//VEGETA IMAGES
app.imagesVegeta = Object.freeze({
			stance: "images/VegetaStance.png",
			stanceUp: "images/VegetaStanceUp.png",
			stanceDown: "images/VegetaStanceDown.png",
			slowFly: "images/VegetaSlowFly.png",
			fastFly: "images/VegetaFastFly.png",
			flyUp: "images/VegetaFlyUp.png",
			flyUpUp: "images/VegetaFlyUpUp.png",
			flyUpDown: "images/VegetaFlyUpDown.png",
			flyDownSlow: "images/VegetaFlyDownSlow.png",
			flyDownFast: "images/VegetaFlyDownFast.png",
			reverse: "images/VegetaReverse.png",
			punch: "images/VegetaPunch.png",
			knee: "images/VegetaKnee.png",
			punchPrep: "images/VegetaPunchPrep.png",
			hit1: "images/VegetaHit1.png",
			hardKick: "images/VegetaHardKick.png",
			ground: "images/VegetaGround.png",
			fallSide: "images/VegetaFallSide.png",
			attackE: "images/VegetaEnergy.png",
			hardKickPrep: "images/VegetaHardKickPrep.png",
			hardKickSwing: "images/VegetaHardKickSwing.png",
			hardPunch: "images/VegetaHardPunch.png",
			hardPunchAir: "images/VegetaHardPunchAir.png",
			hardPunchAirPrep: "images/VegetaHardPunchAirPrep.png",
			hardPunchAirSwing: "images/VegetaHardPunchAirSwing.png",
			hardPunchPrep: "images/VegetaHardPunchPrep.png",
			hitHard: "images/VegetaHitHard.png",
			injured: "images/VegetaInjured.png",
			kick: "images/VegetaKick.png",
			kickPrep: "images/VegetaKickPrep.png",
			leftBlast: "images/VegetaLeftBlast.png",
			rightBlast: "images/VegetaRightBlast.png",
			block: "images/VegetaBlock.png",
			fallKick: "images/VegetaFallKick.png",
			fallDown: "images/VegetaFallDown.png",
			taunt: "images/VegetaTaunt.png",
			launchPrep: "images/VegetaLaunchPrep.png",
			launchSwing: "images/VegetaLaunchSwing.png",
			launch: "images/VegetaLaunch.png",
			charge: "images/VegetaCharge.png",
			pose1: "images/VegetaPose1.png",
			pose2: "images/VegetaPose2.png",
			pose3: "images/VegetaPose3.png",
			pose4: "images/VegetaPose4.png",
			special1: "images/VegetaSpecial1.png",
			burst1: "images/VegetaBurst1.png",
			burst2: "images/VegetaBurst2.png",
			struggle1: "images/VegetaStruggle1.png"
});

//ANDROID 17 IMAGES
app.images17 = Object.freeze({
			stance: "images/17Stance.png",
			stanceUp: "images/17StanceUp.png",
			stanceDown: "images/17StanceDown.png",
			slowFly: "images/17SlowFly.png",
			fastFly: "images/17FastFly.png",
			flyUp: "images/17FlyUp.png",
			flyUpUp: "images/17FlyUpUp.png",
			flyUpDown: "images/17FlyUpDown.png",
			flyDown: "images/17FlyDown.png",
			reverse: "images/17Reverse.png",
			leftPunch: "images/17LeftPunch.png",
			rightPunch: "images/17RightPunch.png",
			punchPrep: "images/17PunchPrep.png",
			hit1: "images/17Hit1.png",
			fallDown: "images/17FallDown.png",
			fallKick: "images/17FallKick.png",
			kick: "images/17Kick.png",
			kickPrep: "images/17KickPrep.png",
			hitHard: "images/17HitHard.png",
			fallSide: "images/17FallSide.png",
			attackE: "images/17Energy.png",
			hardKickPrep: "images/17HardKickPrep.png",
			hardKick: "images/17HardKick.png",
			launch: "images/17Launch.png",
			block: "images/17Block.png",
			blast: "images/17Blast.png",
			drop: "images/17Drop.png",
			finger: "images/17Finger.png",
			ground: "images/17Ground.png",
			injured: "images/17Injured.png",
			injuredUp: "images/17InjuredUp.png",
			injured2: "images/17Injured2.png",
			injuredHit: "images/17InjuredHit.png",
			injuredBlast: "images/17InjuredBlast.png",
			field1: "images/17Field1.png",
			special1: "images/17Special1.png",
			special2: "images/17Special2.png"

});

//Dr GERO IMAGES
app.imagesGero = Object.freeze({
			stance: "images/GeroStance.png",
			slowFly: "images/GeroSlowFly.png",
			fastFly: "images/GeroFastFly.png",
			flyUp: "images/GeroFlyUp.png",
			flyDownSlow: "images/GeroFlyDownSlow.png",
			flyDownFast: "images/GeroFlyDownSlow.png",
			reverse: "images/GeroReverse.png",
			leftPunch: "images/GeroLeftPunch.png",
			rightPunch: "images/GeroRightPunch.png",
			punchPrep: "images/GeroPunchPrep.png",
			hit1: "images/GeroHit1.png",
			fallDown: "images/GeroFallDown.png",
			kick: "images/GeroKick.png",
			kickPrep: "images/GeroKickPrep.png",
			hitHard: "images/GeroHitHard.png",
			injured: "images/GeroInjured.png",
			fallSide: "images/GeroFallSide.png"
});

//PICCOLO IMAGES
app.imagesPiccolo = Object.freeze({ //Piccolo
			stance: "images/PiccoloStance.png",
			stanceUp: "images/PiccoloStanceUp.png",
			stanceDown: "images/PiccoloStanceDown.png",
			slowFly: "images/PiccoloSlowFly.png",
			fastFly: "images/PiccoloFastFly.png",
			flyUp: "images/PiccoloFlyUp.png",
			flyUpUp: "images/PiccoloFlyUpUp.png",
			flyUpDown: "images/PiccoloFlyUpDown.png",
			flyDownSlow: "images/PiccoloFlyDownSlow.png",
			flyDownFast: "images/PiccoloFlyDownFast.png",
			reverse: "images/PiccoloReverse.png",
			punch: "images/PiccoloPunch.png",
			kneePrep: "images/PiccoloKneePrep.png",
			knee: "images/PiccoloKnee.png",
			punchPrep: "images/PiccoloPunchPrep.png",
			hit1: "images/PiccoloHit1.png",
			hit2: "images/PiccoloHit2.png",
			hardKick: "images/PiccoloHardKick.png",
			ground: "images/DeadPiccolo.png",
			fallSide: "images/PiccoloFallSide.png",
			hardKickPrep: "images/PiccoloHardKickPrep.png",
			hardKickSwing: "images/PiccoloHardKickPrep.png",
			hardPunch: "images/PiccoloHardPunch.png",
			hardPunchAir: "images/PiccoloHardPunchAir.png",
			hardPunchAirPrep: "images/PiccoloHardPunchAirPrep.png",
			hardPunchAirSwing: "images/PiccoloHardPunchAirSwing.png",
			hardPunchPrep: "images/PiccoloHardPunchPrep.png",
			hitHard: "images/PiccoloHitHard.png",
			injured: "images/PiccoloInjured.png",
			kick: "images/PiccoloKick.png",
			kickPrep: "images/PiccoloKickPrep.png",
			blastPrep: "images/PiccoloBlastPrep.png",
			blast: "images/PiccoloBlast.png",
			blastPrepAir: "images/PiccoloBlastPrepAir.png",
			blastAir: "images/PiccoloBlastAir.png",
			block: "images/PiccoloBlock.png",
			fallDown: "images/PiccoloFallDown.png",
			taunt: "images/PiccoloTaunt.png",
			launchPrep: "images/PiccoloLaunchPrep.png",
			launchSwing: "images/PiccoloLaunchSwing.png",
			launch: "images/PiccoloLaunch.png",
			pose1: "images/PiccoloPose1.png",
			pose2: "images/PiccoloPose2.png",
			pose3: "images/PiccoloPose3.png",
			pose4: "images/PiccoloPose4.png",
			energy1: "images/PiccoloEnergy1.png",
			energy2: "images/PiccoloEnergy2.png",
			energy3: "images/PiccoloEnergy3.png",
			energy4: "images/PiccoloEnergy4.png",
			charge: "images/PiccoloCharge.png",
			beamPrep: "images/PiccoloBeamPrep.png",
			beam: "images/PiccoloBeam.png",
			blast2: "images/PiccoloBlast2.png"
});

//GOHAN IMAGES
app.imagesGohan = Object.freeze({
			stance: "images/GohanStance.png",
			stanceUp: "images/GohanStanceUp.png",
			stanceDown: "images/GohanStanceDown.png",
			slowFly: "images/GohanSlowFly.png",
			fastFly: "images/GohanFastFly.png",
			flyUp: "images/GohanFlyUp.png",
			flyUpUp: "images/GohanFlyUpUp.png",
			flyUpDown: "images/GohanFlyUpDown.png",
			flyDownSlow: "images/GohanFlyDownSlow.png",
			flyDownFast: "images/GohanFlyDownFast.png",
			reverse: "images/GohanReverse.png",
			leftPunch: "images/GohanLeftPunch.png",
			rightPunch: "images/GohanRightPunch.png",
			punchPrep: "images/GohanPunchPrep.png",
			hit1: "images/GohanHit1.png",
			hardKick: "images/GohanHardKick.png",
			ground: "images/GohanGround.png",
			ground2: "images/GohanGround2.png",
			fallSide: "images/GohanFallSide.png",
			beamPrep: "images/GohanBeamPrep.png",
			beam: "images/GohanBeam.png",
			beamUp: "images/GohanBeamUp.png",
			beamDown: "images/GohanBeamDown.png",
			hardKickPrep: "images/GohanHardKickPrep.png",
			hardKickSwing: "images/GohanHardKickSwing.png",
			hardPunchAir: "images/GohanHardPunchAir.png",
			hardPunchAirPrep: "images/GohanHardPunchAirPrep.png",
			hardPunchAirSwing: "images/GohanHardPunchAirSwing.png",
			hardPunchPrep: "images/GohanHardPunchPrep.png",
			hardPunchSwing: "images/GohanHardPunchSwing.png",
			hardPunchSwing2: "images/GohanHardPunchSwing2.png",
			hitHard: "images/GohanHitHard.png",
			injured: "images/GohanInjured.png",
			kick: "images/GohanKick.png",
			kickPrep: "images/GohanKickPrep.png",
			blast: "images/GohanBlast.png",
			blastPrep: "images/GohanBlastPrep.png",
			head: "images/GohanHead.png",
			headPrep: "images/GohanHeadPrep.png",
			block: "images/GohanBlock.png",
			fallDown: "images/GohanFallDown.png",
			taunt: "images/GohanTaunt.png",
			launchPrep: "images/GohanLaunchPrep.png",
			launchSwing: "images/GohanLaunchSwing.png",
			launch: "images/GohanLaunch.png",
			charge: "images/GohanCharge.png",
			gohanSevere: "images/GohanSevere.png",
			gohanSevere2: "images/GohanSevere2.png",
			mad1: "images/GohanMad1.png",
			ss2: "images/GohanSS2.png",
			aura1: "images/GohanAura1.png",
			aura2: "images/GohanAura2.png",
			aura3: "images/GohanAura3.png",
			aura4: "images/GohanAura4.png",
			aura5: "images/GohanAura5.png"
});

//TIEN IMAGES
app.imagesTien = Object.freeze({
			stance: "images/TienStance.png",
			stanceUp: "images/TienStanceUp.png",
			stanceDown: "images/TienStanceDown.png",
			slowFly: "images/TienSlowFly.png",
			fastFly: "images/TienFastFly.png",
			flyUp: "images/TienFlyUp.png",
			flyUpUp: "images/TienFlyUpUp.png",
			flyUpDown: "images/TienFlyUpDown.png",
			flyDownSlow: "images/TienFlyDownSlow.png",
			flyDownFast: "images/TienFlyDownSlow.png",
			reverse: "images/TienReverse.png",
			hit1: "images/TienHit1.png",
			ground: "images/TienGround.png",
			ground2: "images/TienGround2.png",
			fallSide: "images/TienFallSide.png",
			hitHard: "images/TienHitHard.png",
			injured: "images/TienInjured.png",
			fallDown: "images/TienFallDown.png",
			taunt: "images/TienTaunt.png",
			solar: "images/TienSolarFlare.png",
			triBeam1: "images/TienTriBeam1.png",
			triBeam2: "images/TienTriBeam2.png",
			triBeam3: "images/TienTriBeam3.png",
			triBeam4: "images/TienTriBeam4.png",
			triBeam5: "images/TienTriBeam5.png",
			mad1: "images/TienMad1.png"
});

//KRILLIN IMAGES
app.imagesKrillin = Object.freeze({
			stance: "images/KrillinStance.png",
			stanceUp: "images/KrillinStanceUp.png",
			stanceDown: "images/KrillinStanceDown.png",
			slowFly: "images/KrillinSlowFly.png",
			fastFly: "images/KrillinFastFly.png",
			flyUp: "images/KrillinFlyUp.png",
			flyUpUp: "images/KrillinFlyUpUp.png",
			flyUpDown: "images/KrillinFlyUpDown.png",
			flyDownSlow: "images/KrillinFlyDownSlow.png",
			flyDownFast: "images/KrillinFlyDownSlow.png",
			reverse: "images/KrillinReverse.png",
			hit1: "images/KrillinHit1.png",
			ground: "images/KrillinGround.png",
			ground2: "images/KrillinGround2.png",
			fallSide: "images/KrillinFallSide.png",
			hitHard: "images/KrillinHitHard.png",
			injured: "images/KrillinInjured.png",
			fallDown: "images/KrillinFallDown.png",
			taunt: "images/KrillinTaunt.png",
			solar: "images/KrillinSolarFlare.png",
			disk1: "images/KrillinDisk1.png",
			disk2: "images/KrillinDisk2.png",
			disk3: "images/KrillinDisk3.png",
			disk4: "images/KrillinDisk4.png",
			mad1: "images/KrillinMad1.png"
});

app.images16 = Object.freeze({
			stance: "images/16Stance.png",
			stance2: "images/16Stance2.png"
});

//STAGE AND ENVIRONMENT IMAGES
app.environment = Object.freeze({
			city: "images/cityBackground3.png",
			cityTop: "images/cityBackgroundTop.png",
			cityDamage1: "images/cityBackground5.png",
			titleBar: "images/TitleBar.png",
			digitalBackground: "images/DigitalBackground.png",
			deadPiccolo: "images/DeadPiccolo.png",
			deadPiccolo2: "images/DeadPiccolo2.png",
			deadVegeta2: "images/VegetaGround2.png",
			deadVegeta3: "images/VegetaGround3.png",
			deadVegeta4: "images/VegetaGround4.png",
			building1: "images/building.png",
			lab1: "images/LabStage.png",
			remote2: "images/Remote2.png",
			a19Head: "images/19Head1.png",
			smoke1: "images/Smoke1.png",
			smoke2: "images/smoke2.png",
			smoke3: "images/Smoke3.png",
			cape1: "images/PiccoloCape1.png",
			cape2: "images/PiccoloCape2.png",
			cape3: "images/PiccoloCape3.png",
			cape4: "images/PiccoloCape4.png",
			yamcha1: "images/YamchaStance.png",
			yamcha2: "images/YamchaTaunt.png",
			yamcha3: "images/YamchaArm1.png",
			yamcha4: "images/YamchaArm2.png",
			yamcha5: "images/YamchaFly.png",
			chaotzu1: "images/ChaotzuStance.png",
			chaotzu2: "images/ChaotzuTaunt.png",
			chaotzu3: "images/ChaotzuHat.png",
			chaotzu4: "images/ChaotzuFly.png",
			yajirobe1: "images/Yajirobe1.png",
			groundDustA1: "images/GroundDustA1.png",
			groundDustA2: "images/GroundDustA2.png",
			groundDustA3: "images/GroundDustA3.png",
			groundDustA4: "images/GroundDustA4.png",
			groundDustB1: "images/GroundDustB1.png",
			groundDustB2: "images/GroundDustB2.png",
			groundDustB3: "images/GroundDustB3.png",
			groundDustB4: "images/GroundDustB4.png",
			groundDustC1: "images/GroundDustC1.png",
			groundDustC2: "images/GroundDustC2.png",
			groundDustC3: "images/GroundDustC3.png",
			groundDustC4: "images/GroundDustC4.png",
			gerosSpy1: "images/GerosSpy1.png",
			smog1: "images/smog1.png",
			smog2: "images/smog2.png",
			smog3: "images/smog3.png",
			smog4: "images/smog4.png",
			smog5: "images/smog5.png",
			smog6: "images/smog6.png",
			smog7: "images/smog7.png",
			smog8: "images/smog8.png",
			smog9: "images/smog9.png",
			smog10: "images/smog10.png",
			smog11: "images/smog11.png",
			smog12: "images/smog12.png",
			smog13: "images/smog13.png",
			smog14: "images/smog14.png",
			smog15: "images/smog15.png",
			smog16: "images/smog16.png"
});

//UI IMAGES
app.gameUI = Object.freeze({
			iBorder: "images/InterfaceBorder.png",
			iBackground: "images/InterfaceBackground.png",
			iBigBar: "images/InterfaceBigBar.png",
			iSmallBar: "images/InterfaceSmallBar.png",
			redRibbon: "images/RedRibbon.png",
			warning: "images/WarningImage.png"
});

//ATTACK IMAGES
app.attack = Object.freeze({
			tele: "images/Tele.png",
			tele2: "images/Tele2.png",
			tele3: "images/Tele3.png",
			tele4: "images/Tele4.png",
			tele5: "images/Tele5.png",
			tele6: "images/Tele6.png",
			blast1: "images/blast1.png",
			explosion1: "images/explosion1.png",
			explosion2: "images/explosion2.png",
			explosion3: "images/explosion3.png",
			explosion4: "images/explosion4.png",
			explosion5: "images/explosion5.png",
			explosion6: "images/explosion6.png",
			bigExplosion1: "images/BigExplosion1.png",
			bigExplosion2: "images/BigExplosion2.png",
			bigExplosion3: "images/BigExplosion3.png",
			bigExplosion4: "images/BigExplosion4.png",
			bigExplosion5: "images/BigExplosion5.png",
			bigExplosion6: "images/BigExplosion6.png",
			circleExplosion2: "images/CircleExplosion2.png",
			circleExplosion3: "images/CircleExplosion3.png",
			circleExplosion4: "images/CircleExplosion4.png",
			circleExplosion5: "images/CircleExplosion5.png",
			circleExplosion6: "images/CircleExplosion6.png",
			auraWhite1: "images/AuraWhite1.png",
			auraWhite2: "images/AuraWhite2.png",
			auraWhite3: "images/AuraWhite3.png",
			auraWhite4: "images/AuraWhite4.png",
			auraYellow1: "images/AuraYellow1.png",
			auraYellow2: "images/AuraYellow2.png",
			auraYellow3: "images/AuraYellow3.png",
			auraYellow4: "images/AuraYellow4.png",
			beam1: "images/Beam1.png",
			beam2: "images/Beam2.png",
			beam3: "images/Beam3.png",
			beam4: "images/Beam4.png",
			beam5: "images/Beam5.png",
			ball1: "images/Ball1.png",
			beamB1: "images/BeamBlast1.png",
			beamB2: "images/BeamBlast2.png",
			beamB3: "images/BeamBlast3.png",
			beamB4: "images/BeamBlast4.png",
			beamB5: "images/BeamBlast5.png",
			blastCharge1: "images/blastCharge1.png",
			beamT1: "images/BeamTail1.png",
			triBeam: "images/TriBeam.png",
			disk1: "images/Disk1.png",
			disk2: "images/Disk1.png",
			sparks1: "images/sparks1.png",
			sparks2: "images/sparks2.png",
			sparks3: "images/sparks3.png",
			sparks4: "images/sparks4.png",
			burst1: "images/Burst1.png",
			burst2: "images/Burst2.png",
			burst3: "images/Burst3.png",
			burst4: "images/Burst4.png",
			field1: "images/Field1.png",
			field2: "images/Field2.png",
			field3: "images/Field3.png",
			field4: "images/Field4.png",
			field5: "images/Field5.png",
			field6: "images/Field6.png",
			field7: "images/Field7.png",
			field8: "images/Field8.png",
			fieldMain: "images/FieldMain.png",
			nuke1: "images/nuke1.png",
			nuke2: "images/nuke2.png",
			nuke3: "images/nuke3.png",
			nuke4: "images/nuke4.png",
			nuke5: "images/nuke5.png",
			nuke6: "images/nuke6.png"

});

window.onblur = function () {
			//console.log("blur at " + Date());
			app.main.downsized = true;
			if (app.main.loaded == true) {
						app.main.pausedGame();
						paused = true;
			}
};

window.onfocus = function () {
			//console.log("focus at " + Date());
			app.main.downsized = false;
			if ((app.main.gameState == app.main.GAME_STATE.DEFAULT || app.main.gameState == app.main.GAME_STATE.TUTORIAL) && app.main.introState == false && app.main.endingState == false && app.main.specialScene == false) {
						app.main.sound.playBGAudioPause();
			} else {
						//app.main.resumeGame();
			}
};

window.onload = function () {
			//console.log("window.onload called");
			app.main.loaded = false;
			// Preload Images and Sound
			app.main.preInit();
			app.queue = new createjs.LoadQueue(false);
			app.queue.installPlugin(createjs.Sound);
			app.queue.on("complete", function (e) {
						//app.main.loaded = true;
						//console.log("images and sounds loaded!");
						passwordButton.className = "";
						domoButton.className = "";
						scoreButton.className = "";
						app.sound.init();
						app.main.sound = app.sound;
						app.main.init();
			});

			app.queue.loadManifest([
			//Environment LOADING
			{ id: "background", src: app.environment.city }, { id: "backgroundTop", src: app.environment.cityTop }, { id: "cityDamage1", src: app.environment.cityDamage1 }, { id: "titleBar", src: app.environment.titleBar }, { id: "digitalBackground", src: app.environment.digitalBackground }, { id: "deadPiccolo", src: app.environment.deadPiccolo }, { id: "deadPiccolo2", src: app.environment.deadPiccolo2 }, { id: "deadVegeta2", src: app.environment.deadVegeta2 }, { id: "deadVegeta3", src: app.environment.deadVegeta3 }, { id: "deadVegeta4", src: app.environment.deadVegeta4 }, { id: "building1", src: app.environment.building1 }, { id: "lab1", src: app.environment.lab1 }, { id: "remote2", src: app.environment.remote2 }, { id: "a19Head", src: app.environment.a19Head }, { id: "smoke1", src: app.environment.smoke1 }, { id: "smoke2", src: app.environment.smoke2 }, { id: "smoke3", src: app.environment.smoke3 }, { id: "cape1", src: app.environment.cape1 }, { id: "cape2", src: app.environment.cape2 }, { id: "cape3", src: app.environment.cape3 }, { id: "cape4", src: app.environment.cape4 }, { id: "yamcha1", src: app.environment.yamcha1 }, { id: "yamcha2", src: app.environment.yamcha2 }, { id: "yamcha3", src: app.environment.yamcha3 }, { id: "yamcha4", src: app.environment.yamcha4 }, { id: "yamcha5", src: app.environment.yamcha5 }, { id: "chaotzu1", src: app.environment.chaotzu1 }, { id: "chaotzu2", src: app.environment.chaotzu2 }, { id: "chaotzu3", src: app.environment.chaotzu3 }, { id: "chaotzu4", src: app.environment.chaotzu4 }, { id: "yajirobe1", src: app.environment.yajirobe1 }, { id: "groundDustA1", src: app.environment.groundDustA1 }, { id: "groundDustA2", src: app.environment.groundDustA2 }, { id: "groundDustA3", src: app.environment.groundDustA3 }, { id: "groundDustA4", src: app.environment.groundDustA4 }, { id: "groundDustB1", src: app.environment.groundDustB1 }, { id: "groundDustB2", src: app.environment.groundDustB2 }, { id: "groundDustB3", src: app.environment.groundDustB3 }, { id: "groundDustB4", src: app.environment.groundDustB4 }, { id: "groundDustC1", src: app.environment.groundDustC1 }, { id: "groundDustC2", src: app.environment.groundDustC2 }, { id: "groundDustC3", src: app.environment.groundDustC3 }, { id: "groundDustC4", src: app.environment.groundDustC4 }, { id: "gerosSpy1", src: app.environment.gerosSpy1 }, { id: "smog1", src: app.environment.smog1 }, { id: "smog2", src: app.environment.smog2 }, { id: "smog3", src: app.environment.smog3 }, { id: "smog4", src: app.environment.smog4 }, { id: "smog5", src: app.environment.smog5 }, { id: "smog6", src: app.environment.smog6 }, { id: "smog7", src: app.environment.smog7 }, { id: "smog8", src: app.environment.smog8 }, { id: "smog9", src: app.environment.smog9 }, { id: "smog10", src: app.environment.smog10 }, { id: "smog11", src: app.environment.smog11 }, { id: "smog12", src: app.environment.smog12 }, { id: "smog13", src: app.environment.smog13 }, { id: "smog14", src: app.environment.smog14 }, { id: "smog15", src: app.environment.smog15 }, { id: "smog16", src: app.environment.smog16 },

			//Interface LOADING
			{ id: "iBorder", src: app.gameUI.iBorder }, { id: "iBackground", src: app.gameUI.iBackground }, { id: "iBigBar", src: app.gameUI.iBigBar }, { id: "iSmallBar", src: app.gameUI.iSmallBar }, { id: "redRibbon", src: app.gameUI.redRibbon }, { id: "warning", src: app.gameUI.warning },

			//Android 18 LOADING
			{ id: "18Stance", src: app.images18.stance }, { id: "18StanceUp", src: app.images18.stanceUp }, { id: "18StanceDown", src: app.images18.stanceDown }, { id: "18SlowFly", src: app.images18.slowFly }, { id: "18FastFly", src: app.images18.fastFly }, { id: "18FlyUp", src: app.images18.flyUp }, { id: "18FlyUpUp", src: app.images18.flyUpUp }, { id: "18FlyUpDown", src: app.images18.flyUpDown }, { id: "18FlyDownSlow", src: app.images18.flyDownSlow }, { id: "18FlyDownFast", src: app.images18.flyDownFast }, { id: "18Reverse", src: app.images18.reverse }, { id: "18LeftPunch", src: app.images18.leftPunch }, { id: "18RightPunch", src: app.images18.rightPunch }, { id: "18PunchPrep", src: app.images18.punchPrep }, { id: "18PunchPrepAir", src: app.images18.punchPrepAir }, { id: "18RightPunchAir", src: app.images18.rightPunchAir }, { id: "18LeftPunchAir", src: app.images18.leftPunchAir }, { id: "18Hit1", src: app.images18.hit1 }, { id: "18Hit2", src: app.images18.hit2 }, { id: "18AttackE", src: app.images18.attackE }, { id: "18BlastPrep", src: app.images18.blastPrep }, { id: "18HardKick", src: app.images18.hardKick }, { id: "18Ground", src: app.images18.ground }, { id: "18FallSide", src: app.images18.fallSide }, { id: "18HardKickPrep", src: app.images18.hardKickPrep }, { id: "18HardKickSwing", src: app.images18.hardKickSwing }, { id: "18HardPunch", src: app.images18.hardPunch }, { id: "18HardPunchAir", src: app.images18.hardPunchAir }, { id: "18HardPunchAirPrep", src: app.images18.hardPunchAirPrep }, { id: "18HardPunchAirSwing", src: app.images18.hardPunchAirSwing }, { id: "18HardPunchPrep", src: app.images18.hardPunchPrep }, { id: "18HitHard", src: app.images18.hitHard }, { id: "18Injured", src: app.images18.injured }, { id: "18Kick", src: app.images18.kick }, { id: "18KickPrep", src: app.images18.kickPrep }, { id: "18LeftBlast", src: app.images18.leftBlast }, { id: "18RightBlast", src: app.images18.rightBlast }, { id: "18Block", src: app.images18.block }, { id: "18FallKick", src: app.images18.fallKick }, { id: "18FallDown", src: app.images18.fallDown }, { id: "18Taunt", src: app.images18.taunt }, { id: "18launchPrep", src: app.images18.launchPrep }, { id: "18launchSwing", src: app.images18.launchSwing }, { id: "18launch", src: app.images18.launch }, { id: "18finger", src: app.images18.finger }, { id: "18BlastSky", src: app.images18.blastSky }, { id: "18EnergyDown", src: app.images18.energyDown }, { id: "18Special1", src: app.images18.special1 }, { id: "18Special2", src: app.images18.special2 }, { id: "18Mad1", src: app.images18.mad1 }, { id: "18Field1", src: app.images18.field1 }, { id: "18Field2", src: app.images18.field2 }, { id: "18Combat1", src: app.images18.combat1 },

			//Vegeta LOADING
			{ id: "vegetaStance", src: app.imagesVegeta.stance }, { id: "vegetaStanceUp", src: app.imagesVegeta.stanceUp }, { id: "vegetaStanceDown", src: app.imagesVegeta.stanceDown }, { id: "vegetaHit1", src: app.imagesVegeta.hit1 }, { id: "vegetaAttackE", src: app.imagesVegeta.attackE }, { id: "vegetaSlowFly", src: app.imagesVegeta.slowFly }, { id: "vegetaFastFly", src: app.imagesVegeta.fastFly }, { id: "vegetaFlyUp", src: app.imagesVegeta.flyUp }, { id: "vegetaFlyUpUp", src: app.imagesVegeta.flyUpUp }, { id: "vegetaFlyUpDown", src: app.imagesVegeta.flyUpDown }, { id: "vegetaFlyDownSlow", src: app.imagesVegeta.flyDownSlow }, { id: "vegetaFlyDownFast", src: app.imagesVegeta.flyDownFast }, { id: "vegetaReverse", src: app.imagesVegeta.reverse }, { id: "vegetaPunch", src: app.imagesVegeta.punch }, { id: "vegetaKnee", src: app.imagesVegeta.knee }, { id: "vegetaPunchPrep", src: app.imagesVegeta.punchPrep }, { id: "vegetaHardKick", src: app.imagesVegeta.hardKick }, { id: "vegetaGround", src: app.imagesVegeta.ground }, { id: "vegetaFallSide", src: app.imagesVegeta.fallSide }, { id: "vegetaHardKickPrep", src: app.imagesVegeta.hardKickPrep }, { id: "vegetaHardKickSwing", src: app.imagesVegeta.hardKickSwing }, { id: "vegetaHardPunch", src: app.imagesVegeta.hardPunch }, { id: "vegetaHardPunchAir", src: app.imagesVegeta.hardPunchAir }, { id: "vegetaHardPunchAirPrep", src: app.imagesVegeta.hardPunchAirPrep }, { id: "vegetaHardPunchAirSwing", src: app.imagesVegeta.hardPunchAirSwing }, { id: "vegetaHardPunchPrep", src: app.imagesVegeta.hardPunchPrep }, { id: "vegetaHitHard", src: app.imagesVegeta.hitHard }, { id: "vegetaInjured", src: app.imagesVegeta.injured }, { id: "vegetaKick", src: app.imagesVegeta.kick }, { id: "vegetaKickPrep", src: app.imagesVegeta.kickPrep }, { id: "vegetaLeftBlast", src: app.imagesVegeta.leftBlast }, { id: "vegetaRightBlast", src: app.imagesVegeta.rightBlast }, { id: "vegetaBlock", src: app.imagesVegeta.block }, { id: "vegetaFallKick", src: app.imagesVegeta.fallKick }, { id: "vegetaFallDown", src: app.imagesVegeta.fallDown }, { id: "vegetaTaunt", src: app.imagesVegeta.taunt }, { id: "vegetalaunchPrep", src: app.imagesVegeta.launchPrep }, { id: "vegetalaunchSwing", src: app.imagesVegeta.launchSwing }, { id: "vegetalaunch", src: app.imagesVegeta.launch }, { id: "vegetaCharge", src: app.imagesVegeta.charge }, { id: "vegetaPose1", src: app.imagesVegeta.pose1 }, { id: "vegetaPose2", src: app.imagesVegeta.pose2 }, { id: "vegetaPose3", src: app.imagesVegeta.pose3 }, { id: "vegetaPose4", src: app.imagesVegeta.pose4 }, { id: "vegetaSpecial1", src: app.imagesVegeta.special1 }, { id: "vegetaBurst1", src: app.imagesVegeta.burst1 }, { id: "vegetaBurst2", src: app.imagesVegeta.burst2 }, { id: "vegetaStruggle1", src: app.imagesVegeta.struggle1 },

			//Android 17 LOADING
			{ id: "17Stance", src: app.images17.stance }, { id: "17StanceUp", src: app.images17.stanceUp }, { id: "17StanceDown", src: app.images17.stanceDown }, { id: "17Hit1", src: app.images17.hit1 }, { id: "17SlowFly", src: app.images17.slowFly }, { id: "17FastFly", src: app.images17.fastFly }, { id: "17FlyUp", src: app.images17.flyUp }, { id: "17FlyUpUp", src: app.images17.flyUpUp }, { id: "17FlyUpDown", src: app.images17.flyUpDown }, { id: "17FlyDown", src: app.images17.flyDown }, { id: "17Reverse", src: app.images17.reverse }, { id: "17Kick", src: app.images17.kick }, { id: "17KickPrep", src: app.images17.kickPrep }, { id: "17LeftPunch", src: app.images17.leftPunch }, { id: "17RightPunch", src: app.images17.rightPunch }, { id: "17PunchPrep", src: app.images17.punchPrep }, { id: "17FallSide", src: app.images17.fallSide }, { id: "17FallDown", src: app.images17.fallDown }, { id: "17FallKick", src: app.images17.fallKick }, { id: "17HitHard", src: app.images17.hitHard }, { id: "17Launch", src: app.images17.launch }, { id: "17AttackE", src: app.images17.attackE }, { id: "17Blast", src: app.images17.blast }, { id: "17HardKick", src: app.images17.hardKick }, { id: "17HardKickPrep", src: app.images17.hardKick }, { id: "17Block", src: app.images17.block }, { id: "17Drop", src: app.images17.drop }, { id: "17Finger", src: app.images17.finger }, { id: "17Ground", src: app.images17.ground }, { id: "17Injured", src: app.images17.injured }, { id: "17InjuredUp", src: app.images17.injuredUp }, { id: "17Injured2", src: app.images17.injured2 }, { id: "17InjuredHit", src: app.images17.injuredHit }, { id: "17InjuredBlast", src: app.images17.injuredBlast }, { id: "17Field1", src: app.images17.field1 }, { id: "17Special1", src: app.images17.special1 }, { id: "17Special2", src: app.images17.special2 },

			//Dr Gero LOADING
			{ id: "geroStance", src: app.imagesGero.stance }, { id: "geroHit1", src: app.imagesGero.hit1 }, { id: "geroSlowFly", src: app.imagesGero.slowFly }, { id: "geroFastFly", src: app.imagesGero.fastFly }, { id: "geroFlyUp", src: app.imagesGero.flyUp }, { id: "geroFlyDownSlow", src: app.imagesGero.flyDownSlow }, { id: "geroFlyDownFast", src: app.imagesGero.flyDownFast }, { id: "geroReverse", src: app.imagesGero.reverse }, { id: "geroKick", src: app.imagesGero.kick }, { id: "geroKickPrep", src: app.imagesGero.kickPrep }, { id: "geroLeftPunch", src: app.imagesGero.leftPunch }, { id: "geroRightPunch", src: app.imagesGero.rightPunch }, { id: "geroPunchPrep", src: app.imagesGero.punchPrep }, { id: "geroFallSide", src: app.imagesGero.fallSide }, { id: "geroFallDown", src: app.imagesGero.fallDown }, { id: "geroInjured", src: app.imagesGero.injured }, { id: "geroHitHard", src: app.imagesGero.hitHard },

			//Piccolo LOADING
			{ id: "piccoloStance", src: app.imagesPiccolo.stance }, { id: "piccoloStanceUp", src: app.imagesPiccolo.stanceUp }, { id: "piccoloStanceDown", src: app.imagesPiccolo.stanceDown }, { id: "piccoloHit1", src: app.imagesPiccolo.hit1 }, { id: "piccoloHit2", src: app.imagesPiccolo.hit2 }, { id: "piccoloSlowFly", src: app.imagesPiccolo.slowFly }, { id: "piccoloFastFly", src: app.imagesPiccolo.fastFly }, { id: "piccoloFlyUp", src: app.imagesPiccolo.flyUp }, { id: "piccoloFlyUpUp", src: app.imagesPiccolo.flyUpUp }, { id: "piccoloFlyUpDown", src: app.imagesPiccolo.flyUpDown }, { id: "piccoloFlyDownSlow", src: app.imagesPiccolo.flyDownSlow }, { id: "piccoloFlyDownFast", src: app.imagesPiccolo.flyDownFast }, { id: "piccoloReverse", src: app.imagesPiccolo.reverse }, { id: "piccoloPunch", src: app.imagesPiccolo.punch }, { id: "piccoloKneePrep", src: app.imagesPiccolo.kneePrep }, { id: "piccoloKnee", src: app.imagesPiccolo.knee }, { id: "piccoloPunchPrep", src: app.imagesPiccolo.punchPrep }, { id: "piccoloHardKick", src: app.imagesPiccolo.hardKick }, { id: "piccoloGround", src: app.imagesPiccolo.ground }, { id: "piccoloFallSide", src: app.imagesPiccolo.fallSide }, { id: "piccoloHardKickPrep", src: app.imagesPiccolo.hardKickPrep }, { id: "piccoloHardKickSwing", src: app.imagesPiccolo.hardKickSwing }, { id: "piccoloHardPunch", src: app.imagesPiccolo.hardPunch }, { id: "piccoloHardPunchAir", src: app.imagesPiccolo.hardPunchAir }, { id: "piccoloHardPunchAirPrep", src: app.imagesPiccolo.hardPunchAirPrep }, { id: "piccoloHardPunchAirSwing", src: app.imagesPiccolo.hardPunchAirSwing }, { id: "piccoloHardPunchPrep", src: app.imagesPiccolo.hardPunchPrep }, { id: "piccoloHitHard", src: app.imagesPiccolo.hitHard }, { id: "piccoloInjured", src: app.imagesPiccolo.injured }, { id: "piccoloKick", src: app.imagesPiccolo.kick }, { id: "piccoloKickPrep", src: app.imagesPiccolo.kickPrep }, { id: "piccoloBlastPrep", src: app.imagesPiccolo.blastPrep }, { id: "piccoloBlastPrepAir", src: app.imagesPiccolo.blastPrepAir }, { id: "piccoloBlast", src: app.imagesPiccolo.blast }, { id: "piccoloBlastAir", src: app.imagesPiccolo.blastAir }, { id: "piccoloBlock", src: app.imagesPiccolo.block }, { id: "piccoloFallDown", src: app.imagesPiccolo.fallDown }, { id: "piccoloTaunt", src: app.imagesPiccolo.taunt }, { id: "piccololaunchPrep", src: app.imagesPiccolo.launchPrep }, { id: "piccololaunchSwing", src: app.imagesPiccolo.launchSwing }, { id: "piccololaunch", src: app.imagesPiccolo.launch }, { id: "piccoloPose1", src: app.imagesPiccolo.pose1 }, { id: "piccoloPose2", src: app.imagesPiccolo.pose2 }, { id: "piccoloPose3", src: app.imagesPiccolo.pose3 }, { id: "piccoloPose4", src: app.imagesPiccolo.pose4 }, { id: "piccoloEnergy1", src: app.imagesPiccolo.energy1 }, { id: "piccoloEnergy2", src: app.imagesPiccolo.energy2 }, { id: "piccoloEnergy3", src: app.imagesPiccolo.energy3 }, { id: "piccoloEnergy4", src: app.imagesPiccolo.energy4 }, { id: "piccoloCharge", src: app.imagesPiccolo.charge }, { id: "piccoloBeamPrep", src: app.imagesPiccolo.beamPrep }, { id: "piccoloBeam", src: app.imagesPiccolo.beam }, { id: "piccoloBlast2", src: app.imagesPiccolo.blast2 },

			//Gohan LOADING
			{ id: "gohanStance", src: app.imagesGohan.stance }, { id: "gohanStanceUp", src: app.imagesGohan.stanceUp }, { id: "gohanStanceDown", src: app.imagesGohan.stanceDown }, { id: "gohanBeam", src: app.imagesGohan.beam }, { id: "gohanBeamUp", src: app.imagesGohan.beamUp }, { id: "gohanBeamDown", src: app.imagesGohan.beamDown }, { id: "gohanBeamPrep", src: app.imagesGohan.beamPrep }, { id: "gohanHit1", src: app.imagesGohan.hit1 }, { id: "gohanSlowFly", src: app.imagesGohan.slowFly }, { id: "gohanFastFly", src: app.imagesGohan.fastFly }, { id: "gohanFlyUp", src: app.imagesGohan.flyUp }, { id: "gohanFlyUpUp", src: app.imagesGohan.flyUpUp }, { id: "gohanFlyUpDown", src: app.imagesGohan.flyUpDown }, { id: "gohanFlyDownSlow", src: app.imagesGohan.flyDownSlow }, { id: "gohanFlyDownFast", src: app.imagesGohan.flyDownFast }, { id: "gohanReverse", src: app.imagesGohan.reverse }, { id: "gohanLeftPunch", src: app.imagesGohan.leftPunch }, { id: "gohanRightPunch", src: app.imagesGohan.rightPunch }, { id: "gohanPunchPrep", src: app.imagesGohan.punchPrep }, { id: "gohanHardKick", src: app.imagesGohan.hardKick }, { id: "gohanGround", src: app.imagesGohan.ground }, { id: "gohanGround2", src: app.imagesGohan.ground2 }, { id: "gohanFallSide", src: app.imagesGohan.fallSide }, { id: "gohanHardKickPrep", src: app.imagesGohan.hardKickPrep }, { id: "gohanHardKickSwing", src: app.imagesGohan.hardKickSwing }, { id: "gohanHardPunchSwing", src: app.imagesGohan.hardPunchSwing }, { id: "gohanHardPunchSwing2", src: app.imagesGohan.hardPunchSwing2 }, { id: "gohanHardPunchAir", src: app.imagesGohan.hardPunchAir }, { id: "gohanHardPunchAirPrep", src: app.imagesGohan.hardPunchAirPrep }, { id: "gohanHardPunchAirSwing", src: app.imagesGohan.hardPunchAirSwing }, { id: "gohanHardPunchPrep", src: app.imagesGohan.hardPunchPrep }, { id: "gohanHitHard", src: app.imagesGohan.hitHard }, { id: "gohanInjured", src: app.imagesGohan.injured }, { id: "gohanKick", src: app.imagesGohan.kick }, { id: "gohanKickPrep", src: app.imagesGohan.kickPrep }, { id: "gohanBlastPrep", src: app.imagesGohan.blastPrep }, { id: "gohanBlast", src: app.imagesGohan.blast }, { id: "gohanHeadPrep", src: app.imagesGohan.headPrep }, { id: "gohanHead", src: app.imagesGohan.head }, { id: "gohanBlock", src: app.imagesGohan.block }, { id: "gohanFallDown", src: app.imagesGohan.fallDown }, { id: "gohanTaunt", src: app.imagesGohan.taunt }, { id: "gohanlaunchPrep", src: app.imagesGohan.launchPrep }, { id: "gohanlaunchSwing", src: app.imagesGohan.launchSwing }, { id: "gohanlaunch", src: app.imagesGohan.launch }, { id: "gohanCharge", src: app.imagesGohan.charge }, { id: "gohanSevere", src: app.imagesGohan.gohanSevere }, { id: "gohanSevere2", src: app.imagesGohan.gohanSevere2 }, { id: "gohanMad1", src: app.imagesGohan.mad1 }, { id: "gohanSS2", src: app.imagesGohan.ss2 }, { id: "gohanAura1", src: app.imagesGohan.aura1 }, { id: "gohanAura2", src: app.imagesGohan.aura2 }, { id: "gohanAura3", src: app.imagesGohan.aura3 }, { id: "gohanAura4", src: app.imagesGohan.aura4 }, { id: "gohanAura5", src: app.imagesGohan.aura5 },

			//Tien LOADING
			{ id: "tienStance", src: app.imagesTien.stance }, { id: "tienStanceUp", src: app.imagesTien.stanceUp }, { id: "tienStanceDown", src: app.imagesTien.stanceDown }, { id: "tienHit1", src: app.imagesTien.hit1 }, { id: "tienSlowFly", src: app.imagesTien.slowFly }, { id: "tienFastFly", src: app.imagesTien.fastFly }, { id: "tienFlyUp", src: app.imagesTien.flyUp }, { id: "tienFlyUpUp", src: app.imagesTien.flyUpUp }, { id: "tienFlyUpDown", src: app.imagesTien.flyUpDown }, { id: "tienFlyDownSlow", src: app.imagesTien.flyDownSlow }, { id: "tienFlyDownFast", src: app.imagesTien.flyDownFast }, { id: "tienReverse", src: app.imagesTien.reverse }, { id: "tienGround", src: app.imagesTien.ground }, { id: "tienGround2", src: app.imagesTien.ground2 }, { id: "tienFallSide", src: app.imagesTien.fallSide }, { id: "tienHitHard", src: app.imagesTien.hitHard }, { id: "tienInjured", src: app.imagesTien.injured }, { id: "tienFallDown", src: app.imagesTien.fallDown }, { id: "tienTaunt", src: app.imagesTien.taunt }, { id: "tienSolar", src: app.imagesTien.solar }, { id: "tienTriBeam1", src: app.imagesTien.triBeam1 }, { id: "tienTriBeam2", src: app.imagesTien.triBeam2 }, { id: "tienTriBeam3", src: app.imagesTien.triBeam3 }, { id: "tienTriBeam4", src: app.imagesTien.triBeam4 }, { id: "tienTriBeam5", src: app.imagesTien.triBeam5 }, { id: "tienMad1", src: app.imagesTien.mad1 },

			//Krillin LOADING
			{ id: "krillinStance", src: app.imagesKrillin.stance }, { id: "krillinStanceUp", src: app.imagesKrillin.stanceUp }, { id: "krillinStanceDown", src: app.imagesKrillin.stanceDown }, { id: "krillinHit1", src: app.imagesKrillin.hit1 }, { id: "krillinSlowFly", src: app.imagesKrillin.slowFly }, { id: "krillinFastFly", src: app.imagesKrillin.fastFly }, { id: "krillinFlyUp", src: app.imagesKrillin.flyUp }, { id: "krillinFlyUpUp", src: app.imagesKrillin.flyUpUp }, { id: "krillinFlyUpDown", src: app.imagesKrillin.flyUpDown }, { id: "krillinFlyDownSlow", src: app.imagesKrillin.flyDownSlow }, { id: "krillinFlyDownFast", src: app.imagesKrillin.flyDownFast }, { id: "krillinReverse", src: app.imagesKrillin.reverse }, { id: "krillinGround", src: app.imagesKrillin.ground }, { id: "krillinGround2", src: app.imagesKrillin.ground2 }, { id: "krillinFallSide", src: app.imagesKrillin.fallSide }, { id: "krillinHitHard", src: app.imagesKrillin.hitHard }, { id: "krillinInjured", src: app.imagesKrillin.injured }, { id: "krillinFallDown", src: app.imagesKrillin.fallDown }, { id: "krillinTaunt", src: app.imagesKrillin.taunt }, { id: "krillinSolar", src: app.imagesKrillin.solar }, { id: "krillinDisk1", src: app.imagesKrillin.disk1 }, { id: "krillinDisk2", src: app.imagesKrillin.disk2 }, { id: "krillinDisk3", src: app.imagesKrillin.disk3 }, { id: "krillinDisk4", src: app.imagesKrillin.disk4 }, { id: "krillinMad1", src: app.imagesKrillin.mad1 },

			//Android 16 LOADING
			{ id: "16Stance", src: app.images16.stance }, { id: "16Stance2", src: app.images16.stance2 },

			//Attack LOADING
			{ id: "tele", src: app.attack.tele }, { id: "tele2", src: app.attack.tele2 }, { id: "tele3", src: app.attack.tele3 }, { id: "tele4", src: app.attack.tele4 }, { id: "tele5", src: app.attack.tele5 }, { id: "tele6", src: app.attack.tele6 }, { id: "blast1", src: app.attack.blast1 }, { id: "explosion1", src: app.attack.explosion1 }, { id: "explosion2", src: app.attack.explosion2 }, { id: "explosion3", src: app.attack.explosion3 }, { id: "explosion4", src: app.attack.explosion4 }, { id: "explosion5", src: app.attack.explosion5 }, { id: "explosion6", src: app.attack.explosion6 }, { id: "bigExplosion1", src: app.attack.bigExplosion1 }, { id: "bigExplosion2", src: app.attack.bigExplosion2 }, { id: "bigExplosion3", src: app.attack.bigExplosion3 }, { id: "bigExplosion4", src: app.attack.bigExplosion4 }, { id: "bigExplosion5", src: app.attack.bigExplosion5 }, { id: "bigExplosion6", src: app.attack.bigExplosion6 }, { id: "circleExplosion2", src: app.attack.circleExplosion2 }, { id: "circleExplosion3", src: app.attack.circleExplosion3 }, { id: "circleExplosion4", src: app.attack.circleExplosion4 }, { id: "circleExplosion5", src: app.attack.circleExplosion5 }, { id: "circleExplosion6", src: app.attack.circleExplosion6 }, { id: "auraWhite1", src: app.attack.auraWhite1 }, { id: "auraWhite2", src: app.attack.auraWhite2 }, { id: "auraWhite3", src: app.attack.auraWhite3 }, { id: "auraWhite4", src: app.attack.auraWhite4 }, { id: "auraYellow1", src: app.attack.auraYellow1 }, { id: "auraYellow2", src: app.attack.auraYellow2 }, { id: "auraYellow3", src: app.attack.auraYellow3 }, { id: "auraYellow4", src: app.attack.auraYellow4 }, { id: "beam1", src: app.attack.beam1 }, { id: "beam2", src: app.attack.beam2 }, { id: "beam3", src: app.attack.beam3 }, { id: "beam4", src: app.attack.beam4 }, { id: "beam5", src: app.attack.beam5 }, { id: "ball1", src: app.attack.ball1 }, { id: "beamB1", src: app.attack.beamB1 }, { id: "beamB2", src: app.attack.beamB2 }, { id: "beamB3", src: app.attack.beamB3 }, { id: "beamB4", src: app.attack.beamB4 }, { id: "beamB5", src: app.attack.beamB5 }, { id: "blastCharge1", src: app.attack.blastCharge1 }, { id: "beamT1", src: app.attack.beamT1 }, { id: "triBeam", src: app.attack.triBeam }, { id: "disk1", src: app.attack.disk1 }, { id: "disk2", src: app.attack.disk2 }, { id: "sparks1", src: app.attack.sparks1 }, { id: "sparks2", src: app.attack.sparks2 }, { id: "sparks3", src: app.attack.sparks3 }, { id: "sparks4", src: app.attack.sparks4 }, { id: "burst1", src: app.attack.burst1 }, { id: "burst2", src: app.attack.burst2 }, { id: "burst3", src: app.attack.burst3 }, { id: "burst4", src: app.attack.burst4 }, { id: "field1", src: app.attack.field1 }, { id: "field2", src: app.attack.field2 }, { id: "field3", src: app.attack.field3 }, { id: "field4", src: app.attack.field4 }, { id: "field5", src: app.attack.field5 }, { id: "field6", src: app.attack.field6 }, { id: "field7", src: app.attack.field7 }, { id: "field8", src: app.attack.field8 }, { id: "fieldMain", src: app.attack.fieldMain }, { id: "nuke1", src: app.attack.nuke1 }, { id: "nuke2", src: app.attack.nuke2 }, { id: "nuke3", src: app.attack.nuke3 }, { id: "nuke4", src: app.attack.nuke4 }, { id: "nuke5", src: app.attack.nuke5 }, { id: "nuke6", src: app.attack.nuke6 }]);
};
// main.js 

"use strict";

// if app exists use the existing copy
// else create a new object literal

var _app$main;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var app = app || {};

/*
 THIS IS THE MAIN CONTROL CENTER FOR THE GAME!
 */
app.main = (_app$main = {
	//properties
	WIDTH: 1024,
	HEIGHT: 768,
	canvas: undefined,
	ctx: undefined,
	lastTime: 0,
	debug: false,
	GAME_STATE: Object.freeze({
		BEGIN: 0,
		DEFAULT: 1,
		VICTORY: 2,
		DEFEAT: 3,
		END: 4,
		TUTORIAL: 5,
		CREDITS: 6
	}),
	paused: false,
	onScreen: true,
	loaded: false,
	animationID: 0,
	gameState: undefined,
	roundScore: 0,
	roundScore2: 0,
	totalScore: 0,
	totalPoints: 0,

	//Statistics

	hsTotal: 0, //hsTotal
	hs18: 0, //hs18
	hs17: 0, //hs17
	recentVictory: false,
	victories: 0,
	hsVictory: 0, //hsVictory
	kills: 0,
	recentDomination: false,
	dominations: 0,
	recentPerfect: false,
	perfects: 0,
	destroyed: 0,
	taunts: 0,
	teleports: 0,

	calculated: false,
	saved: false,

	creditsScreen: false,

	fps: 20,

	sound: undefined,

	android18: undefined,

	vegeta: undefined,

	environment: undefined,

	lastExecution: undefined,

	downsized: false,

	//Random chance
	chance: undefined,
	chance2: undefined,
	chance3: undefined,
	chance4: undefined,
	chance5: undefined,
	ranScore: undefined,

	//Ai control helpers
	aiChoice1: undefined,
	aiChoice2: undefined,
	aiChoice3: undefined,
	aiChoice4: undefined,
	aiChoice5: undefined,
	aiDefense17: undefined,
	aiDefenseTimer: 0,
	aiChangeTimer: 0,
	aiTaunting: false,
	aiCharging: false,
	aiReason: 0,
	dodgeChance: 0,
	dodgeChance2: 0,
	aiChoiceSupport1: 0,
	aiChoiceSupport2: 0,
	krillinFirst: false,
	discHit: false,
	talkTimer: 0,
	specialScene: false,
	tempPosition: 0,
	tempDirLeft: false,
	finalSaying: false,
	blastExploded: false,
	begin: false,
	beginCounter: 0,
	teleDelay: 0,

	//Key restrictions
	keyHeld: false,
	keyHeldA: false,
	keyHeldS: false,
	keyHeldD: false,
	keyHeldW: false,
	keyHeldQ: false,
	keyHeldE: false,
	keyHeldT: false,
	keyHeldShift: false,
	next: false,
	action: false,
	reseted: false,
	fullAttack: false,
	target: false,
	quickReset: false,

	//Detections
	touching: false,
	detected: false,
	detectedHard: false,
	detected2: false,
	detected3: false,
	detectedHard2: false,
	detectedHard3: false,
	pointBlank: false,

	//Interface elements
	iBorder: undefined,
	iBackground: undefined,
	iBigBar: undefined,
	iSmallBar: undefined,
	redRibbon: undefined,
	iTimer: 0,
	iAlpha: 20,
	increasing: true,
	fade: false,
	moved: false,
	superFade: false,
	superFadeOther: false,
	extraFade: false,
	extraFade2: false,
	fadeCounter: 0,
	spacing: 300,
	creditsRoll: 0,
	toggle1: true,
	toggle2: true,

	//Support CHARACTERS
	support: undefined,
	activeSupport: false,

	//Extra state variables
	intro: undefined,
	introState: false,
	endingState: false,
	scene: false,
	titleScreen: true
}, _defineProperty(_app$main, 'endingState', false), _defineProperty(_app$main, 'changed', false), _defineProperty(_app$main, 'sceneNum', 0), _defineProperty(_app$main, 'battle', 0), _defineProperty(_app$main, 'camX', 1), _defineProperty(_app$main, 'camY', 1), _defineProperty(_app$main, 'trueEnding', false), _defineProperty(_app$main, 'savesGohan', 0), _defineProperty(_app$main, 'blasts', undefined), _defineProperty(_app$main, 'blinking', 0), _defineProperty(_app$main, 'pulsing', 0), _defineProperty(_app$main, 'warnings', 0), _defineProperty(_app$main, 'sceneCounter', 0), _defineProperty(_app$main, 'sceneTimer', 0), _defineProperty(_app$main, 'damageTimer', 0), _defineProperty(_app$main, 'instructions', 0), _defineProperty(_app$main, 'sceneChange', 0), _defineProperty(_app$main, 'modeSwitch', 0), _defineProperty(_app$main, 'modeSwitch17', 0), _defineProperty(_app$main, 'cooldownAI', 0), _defineProperty(_app$main, 'cooldownAI2', 0), _defineProperty(_app$main, 'cooldownAI3', 0), _defineProperty(_app$main, 'cooldownAndroid17', 0), _defineProperty(_app$main, 'cooldownAndroid18', 0), _defineProperty(_app$main, 'changeDelay', 0), _defineProperty(_app$main, 'vegetaDying', false), _defineProperty(_app$main, 'piccoloDying', false), _defineProperty(_app$main, 'gohanDying', false), _defineProperty(_app$main, 'dying18', false), _defineProperty(_app$main, 'vegetaDead', false), _defineProperty(_app$main, 'piccoloDead', false), _defineProperty(_app$main, 'gohanDead', false), _defineProperty(_app$main, 'krillinDead', false), _defineProperty(_app$main, 'tienDead', false), _defineProperty(_app$main, 'yamchaDead', false), _defineProperty(_app$main, 'chaotzuDead', false), _defineProperty(_app$main, 'fpsBack', 20), _defineProperty(_app$main, 'lastExecutionBack', undefined), _defineProperty(_app$main, 'init', function init() {
	//console.log("app.main.init() called");
	// initialize properties
	//this.ctx4.globalAlpha = 0;

	this.canvas = document.querySelector('#canvas1');
	this.canvas.width = this.WIDTH;
	this.canvas.height = this.HEIGHT;
	this.ctx = this.canvas.getContext('2d');
	/* this.ctx.translate(-512,-384);
 this.ctx.scale(2,2); */

	this.canvas2 = document.querySelector('#canvas2');
	this.canvas2.width = this.WIDTH;
	this.canvas2.height = this.HEIGHT;
	this.ctx2 = this.canvas2.getContext('2d');

	this.canvas3 = document.querySelector('#canvas3');
	this.canvas3.width = this.WIDTH;
	this.canvas3.height = this.HEIGHT;
	this.ctx3 = this.canvas3.getContext('2d');

	//requestFullscreen(this.ctx);

	this.blasts = [];

	this.support = [];

	this.videos = new app.Vid();

	this.environment = new app.Environment();

	this.android18 = new app.Android18(600, this.vegeta);

	this.android17 = new app.Android17(180, this.vegeta);

	this.vegeta = new app.Vegeta(300, 0, this.android18);

	this.lastExecution = new Date().getTime();

	//Interface Images
	var image = new Image();
	image.src = app.gameUI.iBorder;
	this.iBorder = image;

	image = new Image();
	image.src = app.gameUI.iBackground;
	this.iBackground = image;

	image = new Image();
	image.src = app.gameUI.iBigBar;
	this.iBigBar = image;

	image = new Image();
	image.src = app.gameUI.iSmallBar;
	this.iSmallBar = image;

	image = new Image();
	image.src = app.gameUI.redRibbon;
	this.redRibbon = image;

	image = new Image();
	image.src = app.environment.titleBar;
	this.titleBar = image;

	image = new Image();
	image.src = app.environment.digitalBackground;
	this.digitalBackground = image;

	image = new Image();
	image.src = app.gameUI.warning;
	this.iWarning = image;

	this.chance = Math.random();
	this.chance2 = Math.random();
	this.chance3 = Math.random();
	this.chance4 = Math.random();
	this.chance5 = Math.random();

	this.aiChoice1 = Math.random();
	this.aiChoice2 = Math.random();
	this.aiChoice3 = 10;
	this.aiChoice4 = Math.random();
	this.aiChoice5 = 10;

	this.aiChoiceSupport1 = Math.random();
	this.aiChoiceSupport2 = Math.random();

	this.aiDefense17 = Math.random();

	this.gameState = this.GAME_STATE.BEGIN;

	this.savesGohan = Math.random();

	this.ranScore = Math.random();

	// start the game loop

	//this.environment.fadeInFast = true;

	this.videos.end();
	this.videos.startO();

	this.environment.darkStart = true;

	//document.querySelector('#fullButton').onclick = doFull;

	function doFull() {
		var style = document.querySelector('#canvas1').getAttribute('style') || '';
		requestFullscreen(document.querySelector('#allContent'));
		//requestFullscreen(document.querySelector('#canvas2'));
		//requestFullscreen(document.querySelector('#canvas3'));
		var scale = { x: 1, y: 1 };
		scale.x = (window.innerWidth - 10) / this.WIDTH;
		scale.y = (window.innerHeight - 10) / this.HEIGHT;

		if (scale.x < 1 || scale.y < 1) {
			scale = '1, 1';
		} else if (scale.x < scale.y) {
			scale = scale.x + ', ' + scale.x;
		} else {
			scale = scale.y + ', ' + scale.y;
		}

		document.querySelector('#main').setAttribute('style', style + ' ' + '-ms-transform-origin: center top; -webkit-transform-origin: center top; -moz-transform-origin: center top; -o-transform-origin: center top; transform-origin: center top; -ms-transform: scale(' + scale + '); -webkit-transform: scale3d(' + scale + ', 1); -moz-transform: scale(' + scale + '); -o-transform: scale(' + scale + '); transform: scale(' + scale + ');');
	}

	loadDomosFromServer();

	//Prepare update loop
	this.lastExecutionBack = new Date().getTime();

	//Begin update loops

	//requestAnimationFrame(this.updateBack.bind(this));

	requestAnimationFrame(this.update.bind(this));
}), _defineProperty(_app$main, 'reInit', function reInit() {
	//console.log("app.main.init() called");
	// initialize properties
	//this.ctx4.globalAlpha = 0;

	this.canvas = document.querySelector('#canvas1');
	this.canvas.width = this.WIDTH;
	this.canvas.height = this.HEIGHT;
	this.ctx = this.canvas.getContext('2d');
	/* this.ctx.translate(-512,-384);
 this.ctx.scale(2,2); */

	this.canvas2 = document.querySelector('#canvas2');
	this.canvas2.width = this.WIDTH;
	this.canvas2.height = this.HEIGHT;
	this.ctx2 = this.canvas2.getContext('2d');

	this.canvas3 = document.querySelector('#canvas3');
	this.canvas3.width = this.WIDTH;
	this.canvas3.height = this.HEIGHT;
	this.ctx3 = this.canvas3.getContext('2d');

	//requestAnimationFrame(this.update.bind(this));
}), _defineProperty(_app$main, 'preInit', function preInit() {
	/* var image = new Image();
 image.src =  "images/circuitry.png";
 this.circuitry = image; */

	// initialize properties
	this.canvas4 = document.querySelector('#canvas4');
	this.canvas4.width = this.WIDTH;
	this.canvas4.height = this.HEIGHT;
	this.ctx4 = this.canvas4.getContext('2d');

	this.ctx4.save();
	this.ctx4.fillStyle = "black";
	this.ctx4.fillRect(0, 0, 1024, 768);
	this.ctx4.textAlign = "center";
	this.ctx4.textBaseline = "middle";
	this.fillText(this.ctx4, "Systems Loading", this.WIDTH / 2, this.HEIGHT / 2 - 60, "82pt heavy_data", "white");
	this.fillText(this.ctx4, "This may take up to a minute", this.WIDTH / 2, this.HEIGHT / 2 + 50, "30pt heavy_data", "white");
	this.fillText(this.ctx4, "Internet speeds may change load time", this.WIDTH / 2, this.HEIGHT / 2 + 90, "14pt heavy_data", "grey");
	this.fillText(this.ctx4, "Created for play in Google Chrome", this.WIDTH / 2, this.HEIGHT / 2 + 200, "20pt heavy_data", "white");
	this.ctx4.restore();
}), _defineProperty(_app$main, 'updateBack', function updateBack() {
	//Maintain update loop
	requestAnimationFrame(this.updateBack.bind(this));

	//Set current time
	var nowBack = new Date().getTime();

	//Update runs here
	if (nowBack - this.lastExecutionBack > 1000 / this.fpsBack) {

		console.log("update");

		this.lastExecutionBack = new Date().getTime();
	}
}), _defineProperty(_app$main, 'update', function update() {

	// 1) LOOP
	requestAnimationFrame(this.update.bind(this));

	var now = new Date().getTime();

	if (now - this.lastExecution > 1000 / this.fps) {
		// 2) PAUSED?
		// if so, bail out of loop
		if (this.paused == true && this.gameState != this.GAME_STATE.BEGIN) {
			this.drawPauseScreen(this.ctx);
			return;
		} else if (this.paused == true) {
			return;
		}

		//this.ctx2.clearRect(0, 0, this.ctx2.width, this.ctx2.height);

		var dt = this.calculateDeltaTime();

		this.barCheckers(); //Checks for game state changes

		//delay of state changes
		if (this.changeDelay < 30) {
			this.changeDelay++;
		}

		if (this.vegeta.piccolo == true && this.vegeta.dead == true) {
			this.piccoloDead = true;
		}
		if (this.vegeta.vegeta == true && this.vegeta.dead == true) {
			this.vegetaDead = true;
		}
		if (this.vegeta.gohan == true && this.vegeta.dead == true) {
			this.gohanDead = true;
		}
		if (this.activeSupport == true) {
			if (this.support[0].dead == true) {
				this.tienDead = true;
			}
			if (this.support[1].dead == true) {
				this.krillinDead = true;
			}
		}

		if (this.tienDead == true && this.krillinDead == true) {
			this.trueEnding = true;
		} else if (this.tienDead == true) {
			this.savesGohan = .4;
		} else if (this.krillinDead == true) {
			this.savesGohan = .6;
		}

		if (this.android18.dead == true && this.specialScene == false) {
			this.sceneCounter = 0;
			//this.sound.stopBGAudioScene();
			this.environment.superFlash = false;
			this.gameState = this.GAME_STATE.DEFEAT;
			//this.sound.playBGAudioScene(10);
		}

		//Next fight
		if (this.piccoloDead == true && this.vegeta.end == true && this.battle < 1 && this.vegetaDead == false && this.sceneNum != 2) {
			this.battle = 1;
			this.changed = false;
			this.scene = true;
		} else if (this.vegetaDead == true && this.vegeta.end == true && this.battle < 2) {
			this.battle = 2;
			this.changed = false;
			this.scene = true;
		} else if (this.vegeta.dead == true && this.battle == 2 && this.sceneNum != 100) {
			this.battle = 2;
			this.sceneNum = 4;
			//this.changed = false;
			this.scene = true;
			/* this.android18.stun = true;
   this.android18.end = true;
   this.vegeta.stun = true;
   this.vegeta.end = true;
   this.gameState = this.GAME_STATE.VICTORY;
   this.sceneCounter = 0;
   this.endingState = true;
   this.sound.stopBGAudio();
   this.sound.stopBGAudioScene();
   this.videos.startE();  */
		} else if (this.vegeta.dead == true && this.battle == 3) {
			this.battle = 3;
			this.sceneNum = 5;
			this.scene = true;
		}

		if (this.gameState == this.GAME_STATE.TUTORIAL && this.changed == false) {
			this.android17 = new app.Android17(900, this.vegeta);
			this.vegeta = new app.Vegeta(200, 1, this.android18);
			this.vegeta.scenePlay = true;
			this.android18 = new app.Android18(800, this.vegeta);
			this.android18.right = false;
			this.android18.left = true;
			/* if(this.activeSupport == true){
   	this.support[0] = new app.Vegeta(200,4,this.android18);
   	this.support[1] = new app.Vegeta(300,5,this.android18);
   	this.support[0].vanish = false;
   	this.support[1].vanish = false;
   } */
			this.vegeta.vanish = false;
			//this.android17.vanish = true;
			//this.android17.end = true;
			this.changed = true;
		} else if (this.gameState == this.GAME_STATE.DEFAULT && this.changed == false) {
			this.changed = true;
			//this.activeSupport = true;
			if (this.sceneNum == 0) {
				this.android17 = new app.Android17(600, this.vegeta);
				this.android18 = new app.Android18(500, this.vegeta);
				this.android17.position.y = 400;
				this.android18.position.y = 400;
				this.android17.hover = true;
				this.android18.hover = true;
			}
			if (this.battle == 0) {
				this.sceneNum = 1;
				//this.android17 = new app.Android17(900,this.vegeta);
				this.vegeta = new app.Vegeta(300, 2, this.android18);
				//this.android18 = new app.Android18(600,this.vegeta);
				//this.activeSupport = true;
				if (this.activeSupport == true) {
					this.environment.supportActive = true;
					this.support[0] = new app.Vegeta(100, 4, this.android18);
					this.support[1] = new app.Vegeta(200, 5, this.android18);
					this.support[0].vanish = false;
					this.support[1].vanish = false;
				}
				//this.vegeta.vanish = false;
			} else if (this.battle == 1) {
				this.sceneNum = 2;
				//this.android17 = new app.Android17(900,this.vegeta);
				this.vegeta = new app.Vegeta(100, 0, this.android18);
				//this.android18 = new app.Android18(600,this.vegeta);
			} else if (this.battle == 2) {
				this.activeSupport = true;
				if (this.sceneNum < 3) {
					this.sceneNum = 3;
				}
				//this.android17 = new app.Android17(900,this.vegeta);
				this.vegeta = new app.Vegeta(200, 3, this.android18);
				//this.android18 = new app.Android18(600,this.vegeta);
				if (this.activeSupport == true) {
					this.environment.supportActive = true;
					this.support[0] = new app.Vegeta(120, 4, this.android18);
					this.support[1] = new app.Vegeta(20, 5, this.android18);
					this.support[0].vanish = true;
					this.support[1].vanish = true;
				}
			}
		}

		//do actual drawing
		this.ctx.save();
		/* this.ctx.translate(-(this.android18.position.x),-(this.android18.position.y + 150));
  this.ctx.scale(2.2 - (Math.abs(this.android18.position.x - this.vegeta.position.x))/1024,2.2 - (Math.abs(this.android18.position.x - this.vegeta.position.x))/1024);
  this.ctx.translate((Math.abs(this.android18.position.x - this.vegeta.position.x) / 3),(Math.abs(this.android18.position.x - this.vegeta.position.x) / 3)); */

		/* if(((Math.abs(this.android18.position.x - this.vegeta.position.x)) > 500) || this.scene == true){
  	
  	this.ctx.scale(1,1);
  	this.camX = 1;
  } else {
  	this.ctx.translate(50-((this.android18.position.x + this.vegeta.position.x)/4), 100 -((this.android18.position.y + this.vegeta.position.y)/4));
  	this.ctx.scale(1.2,1.2);
  	this.camX = 1.2;
  }
  
  //this.ctx.translate((Math.abs(this.android18.position.x - this.vegeta.position.x) / 3),(Math.abs(this.android18.position.x - this.vegeta.position.x) / 3));
  this.ctx.fillStyle = "black";
  this.ctx.fillRect(0,0,this.WIDTH,this.HEIGHT); */

		this.environment.draw(this.ctx); // DRAW Background
		this.environment.update(this.ctx); // UPDATE background/ForeGround


		/*
  if(this.android17.gone == false && this.gameState == this.GAME_STATE.DEFAULT){
  	this.android17.update(); // UPDATE 17
  	this.android17.draw(this.ctx); // DRAW 17
  }
  */

		//this.vegeta.draw(this.ctx); // DRAW VEGETA

		this.android18.update(); // UPDATE 18

		//this.android18.draw(this.ctx); // DRAW 18 


		//ANDROID17 DECISIONS
		if (this.scene == false && this.battle != 3) {
			this.android17.decisionTimer++;
			//console.log("DECISIONS DECISIONS DECISIONS: " + this.android17.decision);
			if (this.android17.decisionTimer > 200 && this.android17.end == false) {
				this.android17.decision = Math.random();

				if (this.android17.city == true && this.android17.decision >= .3) {
					this.android17.superSpeed = true;
					this.android17.gone = false;
					this.android17.city = false;
				}

				if (this.android17.evasion == true && this.android17.decision < .7) {
					this.android17.evasion = false;
				}

				if (this.android17.encounter == true && (this.android17.decision >= .7 || this.android17.decision < .3)) {
					this.android17.encounter = false;
				}

				/* if(this.wentCity == true && this.wentEncounter == true && this.wentEvasion == true){
    	this.wentCity = false;
    	this.wentEvasion = false;
    	this.wentEncounter = false;
    } */
				this.android17.decisionTimer = 0;
			}
		}

		this.cooldownAndroid18++;
		//console.log(this.android18.powerMove + " POWERMOVE");


		//Handle Overlap
		/* if(hitTest(this.android18,this.vegeta) == true){
  	if(this.vegeta.position.y < this.android18.position.y){
  		if(this.vegeta.left == true){
  			this.vegeta.position.x += 1;
  		} else {
  			this.vegeta.position.x -= 1;
  		}
  	} else {
  		if(this.android18.left == true){
  			this.android18.position.x += 1;
  		} else {
  			this.android18.position.x -= 1;
  		}
  	}
  } */

		if (this.roundScore < 1) {
			this.roundScore = 0;
		}
		if (this.roundScore2 < 1) {
			this.roundScore2 = 0;
		}

		if (this.discHit == true && this.android18.health > 0 && this.krillinFirst == false && this.scene == false) {
			this.talkTimer++;
			if (this.talkTimer < 2) {
				this.sound.playTaunt8(Math.round(getRandom(11, 12)));
			} else if (this.talkTimer < 49) {} else if (this.talkTimer < 50) {
				this.sound.playTaunt6(Math.round(getRandom(25, 26)));
			} else {
				this.discHit = false;
				this.krillinFirst = true;
				this.talkTimer = 0;
			}
		} else if (this.discHit == true && this.scene == true) {
			this.krillinFirst = true;
		}

		if (this.endingState == true || this.specialScene == true || this.gameState == this.GAME_STATE.VICTORY) {
			this.scene = false;
		}

		//HANDLE ENERGY BLAST ATTACKS
		for (var i = 0; i < this.blasts.length; i++) {
			//EXPIRE BLASTS
			if (this.blasts[i].lifetime > 40) {
				this.blasts.splice(i, 1);
			} else {
				//HIT BOTH
				if (this.blasts[i].exploding == false && (this.vegeta.blasting == true || this.android18.blasting == true) && attackHitTest(this.android18, this.vegeta) == true && (attackHitTestBlast(this.blasts[i], this.vegeta) == true || attackHitTestBlast(this.blasts[i], this.android18) == true) && this.blasts[i].type == 0) {
					if (this.android18.powerMove == false && this.vegeta.powerMove == false) {
						this.pointBlank = true;
						if (this.android18.left == true) {
							this.vegeta.velocity.x -= 12;
						} else if (this.android18.right == true) {
							this.vegeta.velocity.x += 12;
						}
						this.vegeta.decel = this.vegeta.velocity.clone();
						if (this.vegeta.left == true) {
							this.android18.velocity.x -= 12;
						} else if (this.vegeta.right == true) {
							this.android18.velocity.x += 12;
						}
						this.android18.decel = this.android18.velocity.clone();
						if (this.vegeta.endurance > 14) {
							this.vegeta.endurance = this.vegeta.endurance - (4 + getRandom(0, 2));
						} else if (this.vegeta.endurance < 15) {
							this.vegeta.health = this.vegeta.health - (4 + getRandom(0, 2));
						}
						if (this.android18.endurance > 14) {
							this.android18.endurance = this.android18.endurance - (4 + getRandom(0, 2));
						} else if (this.android18.endurance < 15) {
							this.android18.health = this.android18.health - (4 + getRandom(0, 2));
						}
						if (this.blasts[i].blastUser != 0) {
							this.blasts[i].position.x = this.android18.position.x;
						} else {
							this.blasts[i].position.x = this.vegeta.position.x;
						}
						this.blasts[i].exploding = true;
					}
				}
				//HIT VEGETA
				if (this.blasts[i].exploding == false && (attackHitTestBlast(this.blasts[i], this.vegeta) == true || (hardAttackHitTest(this.android18, this.vegeta) == true && this.vegeta.behind == false && this.blasts[i].blastUser == 0 || hardAttackHitTest(this.android17, this.vegeta) == true && this.blasts[i].blastUser == 6) && this.blasts[i].lifetime < 2 && (this.blasts[i].type != 5 || this.blasts[i].moving == true && this.blasts[i].triggerState == 0)) && this.blasts[i].activated == true && this.vegeta.superSpeed == false && this.vegeta.vanish == false && (this.blasts[i].blastUser != 1 && this.blasts[i].blastUser != 2 && this.blasts[i].blastUser != 3 || this.vegeta.hardHit == true) && this.blasts[i].blastUser != 4 && this.blasts[i].blastUser != 5) {
					if (this.blasts[i].type == 0) {
						this.vegeta.hit = true;
						this.vegeta.stun = true;
						this.vegeta.blastBurnLength = 10;
						this.vegeta.blastBurn = true;
						if (hardAttackHitTest(this.android18, this.vegeta) == true && this.blasts[i].blastUser == 0 && this.vegeta.behind == false) {
							this.pointBlank = true;
							this.blasts[i].position.x = this.vegeta.position.x;
							this.blasts[i].exploding = true;
						} else if (hardAttackHitTest(this.android17, this.vegeta) == true && this.blasts[i].blastUser == 6 && this.vegeta.behind == false) {
							this.pointBlank = true;
							this.blasts[i].position.x = this.vegeta.position.x;
							this.blasts[i].exploding = true;
						} else {
							this.blasts[i].exploding = true;
						}
						this.sound.playEnergyReaction(6);
						if (this.blasts[i].dirLeft == true) {
							this.vegeta.velocity.x -= 8;
						} else if (this.blasts[i].dirLeft == false) {
							this.vegeta.velocity.x += 8;
						}
						this.vegeta.decel = this.vegeta.velocity.clone();
						if (this.vegeta.endurance > 14) {
							this.vegeta.endurance = this.vegeta.endurance - (4 + getRandom(0, 2));
						} else if (this.vegeta.endurance < 15) {
							this.vegeta.health = this.vegeta.health - (4 + getRandom(0, 2));
						}
					} else if (this.blasts[i].type == 1) {
						if (hardAttackHitTest(this.android18, this.vegeta) == true && this.blasts[i].blastUser == 0 || hardAttackHitTest(this.android17, this.vegeta) == true && this.blasts[i].blastUser == 6 && this.vegeta.behind == false) {
							//console.log("HARDHITTESTSETSET");
							this.vegeta.position.x = this.blasts[i].position.x;
						}
						this.vegeta.punched = false;
						this.vegeta.hit = true;
						this.vegeta.stun = true;
						//this.vegeta.hardHit = true;
						this.vegeta.jumpVelocity.y = 0;
						if (this.blasts[i].dirLeft == true) {
							this.vegeta.position.x = this.blasts[i].position.x;
						} else {
							this.vegeta.position.x = this.blasts[i].position.x + 180;
						}
						if (this.vegeta.endurance > 14) {
							this.vegeta.endurance = this.vegeta.endurance - 1;
						} else if (this.vegeta.endurance < 15) {
							this.vegeta.health = this.vegeta.health - 1;
						}
						if (this.vegeta.position.x < this.vegeta.LEFTWALL.x + 10 || this.vegeta.position.x > this.vegeta.RIGHTWALL.x - 10) {
							this.sound.playEnergyReaction(6);
							this.vegeta.blastBurnLength = 20;
							this.vegeta.blastBurn = true;
							this.environment.shake = true;
							this.blasts[i].exploding = true;
							this.environment.flash = true;
							this.vegeta.hit = true;
							this.vegeta.stun = true;
							this.vegeta.hardHit = true;
							if (this.vegeta.endurance > 14) {
								this.vegeta.endurance = this.vegeta.endurance - (7 + getRandom(2, 5));
							} else if (this.vegeta.endurance < 15) {
								this.vegeta.health = this.vegeta.health - (7 + getRandom(2, 5));
							}
						}
					} else if (this.blasts[i].type == 2) {
						this.vegeta.punched = false;
						this.vegeta.hit = true;
						this.vegeta.stun = true;
						this.vegeta.hardHit = true;
						this.vegeta.blasted = true;
						if (this.android18.left == true) {
							this.vegeta.velocity.x -= 15;
						} else if (this.android18.right == true) {
							this.vegeta.velocity.x += 15;
						}
						this.vegeta.jumpVelocity.y = 0;
						this.vegeta.decel = this.vegeta.velocity.clone();
						if (this.vegeta.endurance > 14) {
							this.vegeta.endurance = this.vegeta.endurance - (10 + getRandom(2, 6));
						} else if (this.vegeta.endurance < 15) {
							this.vegeta.health = this.vegeta.health - (10 + getRandom(2, 6));
						}
						this.sound.playEnergyReaction(6);
						this.environment.flash = true;
						this.environment.shake = true;
						this.vegeta.blastBurnLength = 20;
						this.vegeta.blastBurn = true;
						if (hardAttackHitTest(this.android18, this.vegeta) == true && this.blasts[i].blastUser == 0 || hardAttackHitTest(this.android17, this.vegeta) == true && this.blasts[i].blastUser == 6 && this.vegeta.behind == false) {
							this.pointBlank = true;
							if (this.vegeta.left == false) {
								this.blasts[i].position.x = this.vegeta.position.x;
							} else {
								this.blasts[i].position.x = this.vegeta.position.x - 100;
							}
							this.blasts[i].exploding = true;
						} else {
							if (this.vegeta.left == false) {
								this.blasts[i].position.x = this.vegeta.position.x;
							} else {
								this.blasts[i].position.x = this.vegeta.position.x - 100;
							}
							this.blasts[i].exploding = true;
						}
					} else if (this.blasts[i].type == 3) {
						this.vegeta.punched = false;
						this.vegeta.hit = true;
						this.vegeta.stun = true;
						this.vegeta.hardHit = true;

						if (this.vegeta.endurance > 14) {
							this.vegeta.endurance = this.vegeta.endurance - (10 + getRandom(2, 4));
						} else if (this.vegeta.endurance < 15) {
							this.vegeta.health = this.vegeta.health - (10 + getRandom(2, 4));
						}
						if (this.blasts[i].dirLeft == true) {
							this.vegeta.velocity.x = -60;
						} else if (this.blasts[i].dirLeft == false) {
							this.vegeta.velocity.x = 60;
						}
						this.vegeta.decel = this.vegeta.velocity.clone();
						this.sound.playEnergyReaction(6);
						this.vegeta.blastBurnLength = 40;
						this.vegeta.blastBurn = true;
						this.blasts[i].exploding = true;
						this.environment.shake = true;
						this.environment.flash = true;
					} else if (this.blasts[i].type == 5) {
						this.vegeta.punched = false;
						this.vegeta.hit = true;
						this.vegeta.stun = true;
						//this.android18.hardHit = true;
						this.vegeta.blastBurnLength = 20;
						this.vegeta.blastBurn = true;
						if (this.vegeta.endurance > 14) {
							this.vegeta.endurance = this.vegeta.endurance - (5 + getRandom(0, 5));
						} else if (this.vegeta.endurance < 15) {
							this.vegeta.health = this.vegeta.health - (5 + getRandom(0, 5));
						}
						if (this.blasts[i].dirLeft == true) {
							this.vegeta.velocity.x = -8;
						} else if (this.blasts[i].dirLeft == false) {
							this.vegeta.velocity.x = 8;
						}
						this.vegeta.decel = this.vegeta.velocity.clone();
						this.sound.playEnergyReaction(6);
						if (hardAttackHitTest(this.android18, this.vegeta) == true) {
							this.blasts[i].position.x = this.vegeta.position.x;
							this.blasts[i].exploding = true;
						} else {
							this.blasts[i].exploding = true;
						}
						//this.environment.flash = true;
					} else if (this.blasts[i].type == 7 && this.vegeta.behind == false) {
						this.vegeta.punched = false;
						this.vegeta.hit = true;
						this.vegeta.stun = true;
						this.vegeta.hardHit = true;
						this.vegeta.blastBurnLength = 30;
						this.vegeta.blastBurn = true;
						if (this.vegeta.superForm == false) {
							if (this.vegeta.endurance > 14) {
								this.vegeta.endurance = this.vegeta.endurance - (10 + getRandom(0, 4));
							} else if (this.vegeta.endurance < 15) {
								this.vegeta.health = this.vegeta.health - (10 + getRandom(0, 4));
							}
						} else {
							if (this.vegeta.endurance > 14) {
								this.vegeta.endurance = this.vegeta.endurance - (15 + getRandom(0, 6));
							} else if (this.vegeta.endurance < 15) {
								this.vegeta.health = this.vegeta.health - (15 + getRandom(0, 6));
							}
						}
						if (this.blasts[i].dirLeft == true) {
							this.vegeta.velocity.x = -8;
						} else if (this.blasts[i].dirLeft == false) {
							this.vegeta.velocity.x = 8;
						}
						this.vegeta.decel = this.vegeta.velocity.clone();

						this.sound.playEnergyReaction2(6);

						if (hardAttackHitTest(this.android18, this.vegeta) == true && this.blasts[i].lifetime < 2 && (this.android18.behind == false || this.blasts[i].moving == false)) {
							this.pointBlank = true;
							this.blasts[i].position.x = this.vegeta.position.x;
							this.blasts[i].exploding = true;
						} else {
							//this.blasts[i].position.x = this.vegeta.position.x;
							this.blasts[i].exploding = true;
						}
						//this.environment.flash = true;
					}
				}
				//HIT Android18
				if (this.blasts[i].exploding == false && (attackHitTestBlast(this.blasts[i], this.android18) == true || (hardAttackHitTest(this.android18, this.vegeta) == true && this.blasts[i].type != 5 && this.android18.behind == false && this.blasts[i].blastUser != 0 && this.blasts[i].blastUser != 4 && this.blasts[i].blastUser != 5 && this.blasts[i].blastUser != 6 || hardAttackHitTest(this.android17, this.vegeta) == true && this.blasts[i].blastUser == 6) && this.blasts[i].lifetime < 2 && (this.blasts[i].type != 5 || this.blasts[i].moving == true && this.blasts[i].triggerState == 0)) && this.blasts[i].activated == true && this.android18.superSpeed == false && this.blasts[i].blastUser != 0) {
					if (this.blasts[i].type == 0) {
						if (hardAttackHitTest(this.vegeta, this.android18) == true && this.blasts[i].lifetime < 2 && this.blasts[i].blastUser != 0 && this.android18.behind == false) {
							this.pointBlank = true;
							this.blasts[i].position.x = this.android18.position.x;
							this.blasts[i].exploding = true;
						} else {
							this.blasts[i].exploding = true;
						}
						this.sound.playEnergyReaction2(6);
						if (this.android18.fieldOn == false) {

							this.android18.hit = true;
							this.android18.stun = true;
							this.android18.blastBurnLength = 10;
							this.android18.blastBurn = true;
							this.roundScore -= 25;

							if (this.blasts[i].dirLeft == true) {
								this.android18.velocity.x -= 8;
							} else if (this.blasts[i].dirLeft == false) {
								this.android18.velocity.x += 8;
							}
							this.android18.decel = this.android18.velocity.clone();
							if (this.android18.endurance > 14) {
								this.android18.endurance = this.android18.endurance - (4 + getRandom(0, 2));
							} else if (this.android18.endurance < 15) {
								this.android18.health = this.android18.health - (4 + getRandom(0, 2));
							}
						}
					} else if (this.blasts[i].type == 1) {
						if (hardAttackHitTest(this.vegeta, this.android18) == true && this.android18.behind == false) {
							//console.log("HARDHITTESTSETSET");
							this.android18.position.x = this.blasts[i].position.x;
						}
						if (this.android18.fieldOn == false) {
							this.android18.punched = false;
							this.android18.hit = true;
							this.android18.stun = true;
							this.roundScore -= 50;
							//this.android18.hardHit = true;
							this.android18.jumpVelocity.y = 0;
							if (this.blasts[i].dirLeft == true) {
								this.android18.position.x = this.blasts[i].position.x;
							} else {
								this.android18.position.x = this.blasts[i].position.x + 180;
							}
							if (this.android18.endurance > 14) {
								this.android18.endurance = this.android18.endurance - 1;
							} else if (this.android18.endurance < 15) {
								this.android18.health = this.android18.health - 1;
							}
							if (this.android18.position.x < this.android18.LEFTWALL.x + 10 || this.android18.position.x > this.android18.RIGHTWALL.x - 10) {
								this.sound.playEnergyReaction(6);
								this.environment.shake = true;
								this.blasts[i].exploding = true;
								this.environment.flash = true;
								this.android18.hit = true;
								this.android18.stun = true;
								this.android18.hardHit = true;
								this.android18.blastBurnLength = 20;
								this.android18.blastBurn = true;
								if (this.android18.endurance > 14) {
									this.android18.endurance = this.android18.endurance - (7 + getRandom(2, 5));
								} else if (this.android18.endurance < 15) {
									this.android18.health = this.android18.health - (7 + getRandom(2, 5));
								}
							}
						} else {
							this.sound.playEnergyReaction(6);
							this.environment.shake = true;
							this.blasts[i].position.x = this.android18.position.x;
							this.blasts[i].exploding = true;
							this.environment.flash = true;
						}
					} else if (this.blasts[i].type == 2) {
						if (this.android18.fieldOn == false) {
							this.android18.punched = false;
							this.android18.hit = true;
							this.android18.stun = true;
							this.android18.hardHit = true;
							this.android18.blasted = true;
							this.roundScore -= 50;
							if (this.vegeta.left == true) {
								this.android18.velocity.x -= 15;
							} else if (this.vegeta.right == true) {
								this.android18.velocity.x += 15;
							}
							this.android18.jumpVelocity.y = 0;
							this.android18.decel = this.android18.velocity.clone();
							if (this.android18.endurance > 14) {
								this.android18.endurance = this.android18.endurance - (10 + getRandom(2, 6));
							} else if (this.android18.endurance < 15) {
								this.android18.health = this.android18.health - (10 + getRandom(2, 6));
							}
							this.android18.blastBurnLength = 20;
							this.android18.blastBurn = true;
						}
						this.sound.playEnergyReaction(6);
						this.environment.flash = true;
						this.environment.shake = true;
						if (hardAttackHitTest(this.vegeta, this.android18) == true && this.android18.behind == false) {
							this.pointBlank = true;
							if (this.android18.left == false) {
								this.blasts[i].position.x = this.android18.position.x;
							} else {
								this.blasts[i].position.x = this.android18.position.x - 100;
							}
							this.blasts[i].exploding = true;
						} else {
							if (this.android18.left == false) {
								this.blasts[i].position.x = this.android18.position.x;
							} else {
								this.blasts[i].position.x = this.android18.position.x - 100;
							}
							this.blasts[i].exploding = true;
						}
					} else if (this.blasts[i].type == 3) {
						if (this.android18.fieldOn == false) {
							this.android18.punched = false;
							this.android18.hit = true;
							this.android18.stun = true;
							this.android18.hardHit = true;
							this.roundScore -= 50;
							if (this.android18.endurance > 14) {
								this.android18.endurance = this.android18.endurance - (10 + getRandom(2, 4));
							} else if (this.android18.endurance < 15) {
								this.android18.health = this.android18.health - (10 + getRandom(2, 4));
							}
							if (this.blasts[i].dirLeft == true) {
								this.android18.velocity.x = -60;
							} else if (this.blasts[i].dirLeft == false) {
								this.android18.velocity.x = 60;
							}
							this.android18.decel = this.android18.velocity.clone();
							this.android18.blastBurnLength = 40;
							this.android18.blastBurn = true;
						}
						this.environment.shake = true;
						this.sound.playEnergyReaction2(6);
						if (hardAttackHitTest(this.vegeta, this.android18) == true && this.android18.behind == false) {
							if (this.android18.left == false) {
								this.blasts[i].position.x = this.android18.position.x - 100;
							} else {
								this.blasts[i].position.x = this.android18.position.x - 100;
							}
							//this.android18.position.x = this.blasts[i].position.x;
							this.blasts[i].exploding = true;
						} else {
							if (this.android18.left == false) {
								this.blasts[i].position.x = this.android18.position.x - 50;
							} else {
								this.blasts[i].position.x = this.android18.position.x - 100;
							}
							this.blasts[i].exploding = true;
						}
						this.environment.flash = true;
					} else if (this.blasts[i].type == 5) {
						if (this.android18.fieldOn == false) {
							this.android18.punched = false;
							this.android18.hit = true;
							this.android18.stun = true;
							//this.android18.hardHit = true;
							this.android18.blastBurnLength = 20;
							this.android18.blastBurn = true;
							this.roundScore -= 50;
							if (this.android18.endurance > 14) {
								this.android18.endurance = this.android18.endurance - (5 + getRandom(0, 5));
							} else if (this.android18.endurance < 15) {
								this.android18.health = this.android18.health - (5 + getRandom(0, 5));
							}
							if (this.blasts[i].dirLeft == true) {
								this.android18.velocity.x = -8;
							} else if (this.blasts[i].dirLeft == false) {
								this.android18.velocity.x = 8;
							}
							this.android18.decel = this.android18.velocity.clone();
						}
						this.sound.playEnergyReaction2(6);
						if (hardAttackHitTest(this.vegeta, this.android18) == true && (this.android18.behind == false || this.blasts[i].moving == false)) {
							this.pointBlank = true;
							this.blasts[i].position.x = this.android18.position.x;
							this.blasts[i].exploding = true;
						} else {
							this.blasts[i].exploding = true;
						}
						//this.environment.flash = true;
					} else if (this.blasts[i].type == 6 && this.android18.behind == false) {
						if (this.android18.fieldOn == false) {
							this.android18.punched = false;
							this.android18.hit = true;
							this.android18.stun = true;
							this.android18.jumpVelocity.y = 0;
							//this.android18.hardHit = true;
							this.android18.blastBurnLength = 40;
							this.android18.blastBurn = true;
							this.roundScore -= 5;
							if (this.android18.endurance > 14) {
								this.android18.endurance = this.android18.endurance - 2.5;
							} else if (this.android18.endurance < 15) {
								this.android18.health = this.android18.health - 2.5;
							}
							if (this.blasts[i].dirLeft == true) {
								this.android18.velocity.x = -4;
							} else if (this.blasts[i].dirLeft == false) {
								this.android18.velocity.x = 4;
							}
							this.android18.decel = this.android18.velocity.clone();
						} else {
							this.sound.playEnergyReaction(6);
							this.blasts[i].position.x = this.android18.position.x;
							this.blasts[i].exploding = true;
							this.environment.flash = true;
						}
					} else if (this.blasts[i].type == 7 && this.android18.behind == false) {
						if (this.android18.fieldOn == false) {
							this.android18.punched = false;
							this.android18.hit = true;
							this.android18.stun = true;
							this.android18.hardHit = true;
							this.android18.blastBurnLength = 30;
							this.android18.blastBurn = true;
							this.roundScore -= 50;
							if (this.vegeta.superForm == false) {
								if (this.android18.endurance > 14) {
									this.android18.endurance = this.android18.endurance - (10 + getRandom(0, 4));
								} else if (this.android18.endurance < 15) {
									this.android18.health = this.android18.health - (10 + getRandom(0, 4));
								}
							} else {
								if (this.android18.endurance > 14) {
									this.android18.endurance = this.android18.endurance - (15 + getRandom(0, 6));
								} else if (this.android18.endurance < 15) {
									this.android18.health = this.android18.health - (15 + getRandom(0, 6));
								}
							}

							if (this.blasts[i].trigger == false) {
								if (this.blasts[i].dirLeft == true) {
									this.android18.velocity.x = -8;
								} else if (this.blasts[i].dirLeft == false) {
									this.android18.velocity.x = 8;
								}
							} else {
								if (this.blasts[i].turnDown == true) {
									this.android18.jumpVelocity.y = 15;
								} else if (this.blasts[i].turnDown == false) {
									this.android18.jumpVelocity.y = -15;
								}
							}
							this.android18.decel = this.android18.velocity.clone();
						}
						this.sound.playEnergyReaction2(6);

						if (hardAttackHitTest(this.vegeta, this.android18) == true && this.blasts[i].lifetime < 2 && (this.android18.behind == false || this.blasts[i].moving == false)) {
							this.pointBlank = true;
							this.blasts[i].position.x = this.android18.position.x;
							this.blasts[i].exploding = true;
						} else {
							//this.blasts[i].position.x = this.android18.position.x;
							this.blasts[i].exploding = true;
						}
						//this.environment.flash = true;
					} else if (this.blasts[i].type == 9) {
						if (this.android18.fieldOn == false) {
							this.android18.punched = false;
							this.android18.hit = true;
							this.android18.stun = true;
							//this.android18.hardHit = true;
							this.android18.blastBurnLength = 30;
							this.android18.blastBurn = true;
							this.roundScore -= 5;
							if (this.android18.endurance > 14) {
								this.android18.endurance = this.android18.endurance - .25;
							} else if (this.android18.endurance < 15) {
								this.android18.health = this.android18.health - .25;
							}
							if (this.android18.position.x > this.android18.RIGHTWALL.x - 50 || this.android18.position.x < this.android18.LEFTWALL.x + 50 || hitTest(this.android18, this.vegeta)) {
								//Nothing
							} else {
								if (this.blasts[i].dirLeft == true) {
									this.android18.velocity.x = -40;
								} else if (this.blasts[i].dirLeft == false) {
									this.android18.velocity.x = 40;
								}
								this.android18.decel = this.android18.velocity.clone();
							}
						}
					} else if (this.blasts[i].type == 10) {
						if (this.android18.fieldOn == false) {
							this.android18.punched = false;
							this.android18.hit = true;
							this.android18.stun = true;
							this.android18.hardHit = true;
							this.android18.blastBurnLength = 60;
							this.android18.blastBurn = true;
							this.roundScore -= 100;
							if (this.krillinFirst == false) {
								this.discHit = true;
							}
							if (this.android18.endurance > 14) {
								this.android18.endurance = this.android18.endurance - 50;
							} else if (this.android18.endurance < 15) {
								this.android18.health = this.android18.health - 50;
							}
							/* if(this.blasts[i].dirLeft == true){
       	this.android18.velocity.x = -40;
       } else if(this.blasts[i].dirLeft == false){
       	this.android18.velocity.x = 40;
       }
       this.android18.decel = this.android18.velocity.clone(); */
							this.sound.playEnergyReaction2(34);
						} else {
							this.sound.playEnergyReaction(6);
							this.blasts[i].position.x = this.android18.position.x;
							this.blasts[i].exploding = true;
							this.environment.flash = true;
						}
					}
				}
				//HIT Android17
				if (this.blasts[i].exploding == false && (attackHitTestBlast(this.blasts[i], this.android17) == true || (hardAttackHitTest(this.vegeta, this.android17) == true && this.blasts[i].type != 5 && this.android17.behind == false && this.blasts[i].blastUser != 0 || hardAttackHitTest(this.android18, this.android17) == true && this.blasts[i].blastUser == 0) && this.blasts[i].lifetime < 2 && (this.blasts[i].type != 5 || this.blasts[i].moving == true && this.blasts[i].triggerState == 0)) && this.blasts[i].activated == true && this.android17.superSpeed == false && this.blasts[i].blastUser != 6 && this.android17.vanish == false && this.android17.city == false) {
					if (this.blasts[i].type == 0) {
						if (this.android17.fieldOn == false) {
							this.android17.hit = true;
							this.android17.stun = true;
							if (this.battle != 3) {
								this.roundScore2 -= 25;
							}
							this.android17.blastBurnLength = 10;
							this.android17.blastBurn = true;

							if (this.android17.decision != -1) {
								if (this.blasts[i].dirLeft == true) {
									this.android17.velocity.x -= 8;
								} else if (this.blasts[i].dirLeft == false) {
									this.android17.velocity.x += 8;
								}
								this.android17.decel = this.android17.velocity.clone();
							}
							if (this.android17.endurance > 14) {
								this.android17.endurance = this.android17.endurance - (4 + getRandom(0, 2));
							} else if (this.android17.endurance < 15) {
								this.android17.health = this.android17.health - (4 + getRandom(0, 2));
							}
						}
						if (hardAttackHitTest(this.vegeta, this.android17) == true && this.blasts[i].blastUser != 0 && this.blasts[i].blastUser != 6 && this.android17.behind == false) {
							this.blasts[i].position.x = this.android17.position.x;
							this.blasts[i].exploding = true;
						} else {
							this.blasts[i].exploding = true;
						}
						this.sound.playEnergyReaction2(6);
					} else if (this.blasts[i].type == 1) {
						if (hardAttackHitTest(this.vegeta, this.android17) == true && this.android17.behind == false) {
							//console.log("HARDHITTESTSETSET");
							this.android17.position.x = this.blasts[i].position.x;
						}
						if (this.android17.fieldOn == false) {
							this.android17.punched = false;
							this.android17.hit = true;
							this.android17.stun = true;
							if (this.battle != 3) {
								this.roundScore2 -= 50;
							}
							//this.android17.hardHit = true;
							this.android17.jumpVelocity.y = 0;
							if (this.blasts[i].dirLeft == true) {
								this.android17.position.x = this.blasts[i].position.x;
							} else {
								this.android17.position.x = this.blasts[i].position.x + 180;
							}
							if (this.android17.endurance > 14) {
								this.android17.endurance = this.android17.endurance - 1;
							} else if (this.android17.endurance < 15) {
								this.android17.health = this.android17.health - 1;
							}
							if (this.android17.position.x < this.android17.LEFTWALL.x + 10 || this.android17.position.x > this.android17.RIGHTWALL.x - 10) {
								this.sound.playEnergyReaction(6);
								this.environment.shake = true;
								this.blasts[i].exploding = true;
								this.environment.flash = true;
								this.android17.hit = true;
								this.android17.stun = true;
								this.android17.hardHit = true;
								this.android17.blastBurnLength = 10;
								this.android17.blastBurn = true;
								if (this.android17.endurance > 14) {
									this.android17.endurance = this.android17.endurance - (7 + getRandom(2, 5));
								} else if (this.android17.endurance < 15) {
									this.android17.health = this.android17.health - (7 + getRandom(2, 5));
								}
							}
						} else {
							this.sound.playEnergyReaction(6);
							this.environment.shake = true;
							this.blasts[i].position.x = this.android18.position.x;
							this.blasts[i].exploding = true;
							this.environment.flash = true;
						}
					} else if (this.blasts[i].type == 2) {
						if (this.android17.fieldOn == false) {
							this.android17.punched = false;
							this.android17.hit = true;
							this.android17.stun = true;
							this.android17.hardHit = true;
							this.android17.blasted = true;
							if (this.battle != 3) {
								this.roundScore2 -= 50;
							}
							if (this.android17.decision != -1) {
								if (this.vegeta.left == true) {
									this.android17.velocity.x -= 15;
								} else if (this.vegeta.right == true) {
									this.android17.velocity.x += 15;
								}
								this.android17.jumpVelocity.y = 0;
								this.android17.decel = this.android17.velocity.clone();
							}
							if (this.android17.endurance > 14) {
								this.android17.endurance = this.android17.endurance - (10 + getRandom(2, 6));
							} else if (this.android17.endurance < 15) {
								this.android17.health = this.android17.health - (10 + getRandom(2, 6));
							}
							this.sound.playEnergyReaction(6);
							this.environment.flash = true;
							this.environment.shake = true;
							this.android17.blastBurnLength = 20;
							this.android17.blastBurn = true;
						}
						if (hardAttackHitTest(this.vegeta, this.android17) == true && this.android17.behind == false) {
							this.pointBlank = true;
							if (this.android17.left == false) {
								this.blasts[i].position.x = this.android17.position.x;
							} else {
								this.blasts[i].position.x = this.android17.position.x - 100;
							}
							this.blasts[i].exploding = true;
						} else {
							if (this.android17.left == false) {
								this.blasts[i].position.x = this.android17.position.x;
							} else {
								this.blasts[i].position.x = this.android17.position.x;
							}
							this.blasts[i].exploding = true;
						}
					} else if (this.blasts[i].type == 3) {
						if (this.android17.fieldOn == false) {
							this.android17.punched = false;
							this.android17.hit = true;
							this.android17.stun = true;
							this.android17.hardHit = true;
							this.roundScore2 -= 50;
							if (this.android17.endurance > 14) {
								this.android17.endurance = this.android17.endurance - (10 + getRandom(2, 4));
							} else if (this.android17.endurance < 15) {
								this.android17.health = this.android17.health - (10 + getRandom(2, 4));
							}
							if (this.blasts[i].dirLeft == true) {
								this.android17.velocity.x = -60;
							} else if (this.blasts[i].dirLeft == false) {
								this.android17.velocity.x = 60;
							}
							this.android17.decel = this.android17.velocity.clone();
						}
						this.environment.shake = true;
						this.android17.blastBurnLength = 40;
						this.android17.blastBurn = true;
						this.sound.playEnergyReaction2(6);
						if (hardAttackHitTest(this.vegeta, this.android17) == true && this.android17.behind == false) {
							if (this.android17.left == false) {
								this.blasts[i].position.x = this.android17.position.x - 100;
							} else {
								this.blasts[i].position.x = this.android17.position.x - 100;
							}
							//this.android17.position.x = this.blasts[i].position.x;
							this.blasts[i].exploding = true;
						} else {
							if (this.android17.left == false) {
								this.blasts[i].position.x = this.android17.position.x - 50;
							} else {
								this.blasts[i].position.x = this.android17.position.x - 100;
							}
							this.blasts[i].exploding = true;
						}
						this.environment.flash = true;
					} else if (this.blasts[i].type == 5) {
						if (this.android17.fieldOn == false) {
							this.android17.punched = false;
							this.android17.hit = true;
							this.android17.stun = true;
							//this.android17.hardHit = true;
							this.android17.blastBurnLength = 20;
							this.android17.blastBurn = true;
							this.roundScore2 -= 25;
							if (this.android17.endurance > 14) {
								this.android17.endurance = this.android17.endurance - (5 + getRandom(0, 5));
							} else if (this.android17.endurance < 15) {
								this.android17.health = this.android17.health - (5 + getRandom(0, 5));
							}
							if (this.blasts[i].dirLeft == true) {
								this.android17.velocity.x = -8;
							} else if (this.blasts[i].dirLeft == false) {
								this.android17.velocity.x = 8;
							}
							this.android17.decel = this.android17.velocity.clone();
						}
						this.sound.playEnergyReaction2(6);
						if (hardAttackHitTest(this.vegeta, this.android17) == true && (this.android17.behind == false || this.blasts[i].moving == false)) {
							this.pointBlank = true;
							this.blasts[i].position.x = this.android17.position.x;
							this.blasts[i].exploding = true;
						} else {
							this.blasts[i].exploding = true;
						}
						//this.environment.flash = true;
					} else if (this.blasts[i].type == 6 && this.android17.behind == false) {
						if (this.android17.fieldOn == false) {
							this.android17.punched = false;
							this.android17.hit = true;
							this.android17.stun = true;
							this.android17.jumpVelocity.y = 0;
							//this.android17.hardHit = true;
							this.android17.blastBurnLength = 40;
							this.android17.blastBurn = true;
							this.roundScore2 -= 5;
							if (this.android17.endurance > 14) {
								this.android17.endurance = this.android17.endurance - 2.5;
							} else if (this.android17.endurance < 15) {
								this.android17.health = this.android17.health - 2.5;
							}
							if (this.android17.decision != -1) {
								if (this.blasts[i].dirLeft == true) {
									this.android17.velocity.x = -4;
								} else if (this.blasts[i].dirLeft == false) {
									this.android17.velocity.x = 4;
								}
								this.android17.decel = this.android17.velocity.clone();
							}
						} else {
							this.sound.playEnergyReaction(6);
							this.blasts[i].position.x = this.android18.position.x;
							this.blasts[i].exploding = true;
							this.environment.flash = true;
						}
					} else if (this.blasts[i].type == 7 && this.android17.behind == false) {
						if (this.android17.fieldOn == false) {
							this.android17.punched = false;
							this.android17.hit = true;
							this.android17.stun = true;
							this.android17.hardHit = true;
							this.android17.blastBurnLength = 30;
							this.android17.blastBurn = true;
							this.roundScore2 -= 50;
							if (this.android17.endurance > 14) {
								this.android17.endurance = this.android17.endurance - (10 + getRandom(0, 4));
							} else if (this.android17.endurance < 15) {
								this.android17.health = this.android17.health - (10 + getRandom(0, 4));
							}
							if (this.blasts[i].trigger == false) {
								if (this.blasts[i].dirLeft == true) {
									this.android17.velocity.x = -8;
								} else if (this.blasts[i].dirLeft == false) {
									this.android17.velocity.x = 8;
								}
							} else {
								if (this.blasts[i].turnDown == true) {
									this.android17.jumpVelocity.y = 15;
								} else if (this.blasts[i].turnDown == false) {
									this.android17.jumpVelocity.y = -15;
								}
							}
							this.android17.decel = this.android17.velocity.clone();
						}
						this.sound.playEnergyReaction2(6);
						if (hardAttackHitTest(this.vegeta, this.android17) == true && this.blasts[i].lifetime < 2 && (this.android17.behind == false || this.blasts[i].moving == false)) {
							this.pointBlank = true;
							this.blasts[i].position.x = this.android17.position.x;
							this.blasts[i].exploding = true;
						} else {
							//this.blasts[i].position.x = this.android17.position.x;
							this.blasts[i].exploding = true;
						}
						//this.environment.flash = true;
					} else if (this.blasts[i].type == 9) {
						if (this.android17.fieldOn == false) {
							this.android17.punched = false;
							this.android17.hit = true;
							this.android17.stun = true;
							//this.android17.hardHit = true;
							this.android17.blastBurnLength = 30;
							this.android17.blastBurn = true;
							this.roundScore2 -= 5;
							if (this.android17.endurance > 14) {
								this.android17.endurance = this.android17.endurance - .25;
							} else if (this.android17.endurance < 15) {
								this.android17.health = this.android17.health - .25;
							}
							if (this.android17.position.x > this.android17.RIGHTWALL.x - 50 || this.android17.position.x < this.android17.LEFTWALL.x + 50 || hitTest(this.android17, this.vegeta)) {
								//Nothing
							} else {
								if (this.blasts[i].dirLeft == true) {
									this.android17.velocity.x = -40;
								} else if (this.blasts[i].dirLeft == false) {
									this.android17.velocity.x = 40;
								}
								this.android17.decel = this.android17.velocity.clone();
							}
						}
					} else if (this.blasts[i].type == 10) {
						if (this.android17.fieldOn == false) {
							this.android17.superSpeed = true;
							this.roundScore2 -= 100;
							/* this.android17.punched = false;
       this.android17.hit = true;
       this.android17.stun = true;
       this.android17.hardHit = true;
       this.android17.blastBurnLength = 60;
       this.android17.blastBurn = true;
       if(this.android17.endurance > 14){
       	this.android17.endurance = this.android17.endurance - 50;
       } else if(this.android17.endurance < 15){
       	this.android17.health = this.android17.health - 50;
       } */
							/* if(this.blasts[i].dirLeft == true){
       	this.android17.velocity.x = -40;
       } else if(this.blasts[i].dirLeft == false){
       	this.android17.velocity.x = 40;
       }
       this.android17.decel = this.android17.velocity.clone(); */
							this.sound.playEnergyReaction2(34);
						} else {
							this.sound.playEnergyReaction(6);
							this.blasts[i].position.x = this.android18.position.x;
							this.blasts[i].exploding = true;
							this.environment.flash = true;
						}
					}
				}
				//HIT SUPPORTS
				if (this.activeSupport == true) {
					for (var x = 0; x < 2; x++) {
						if (this.blasts[i].exploding == false && (attackHitTestBlast(this.blasts[i], this.support[x]) == true || hardAttackHitTest(this.android18, this.support[x]) == true && this.blasts[i].lifetime < 2 && (this.blasts[i].type != 5 || this.blasts[i].moving == true && this.blasts[i].triggerState == 0)) && this.blasts[i].activated == true && this.support[x].superSpeed == false && this.support[x].vanish == false && this.support[x].end == false && this.support[x].dead == false && (this.blasts[i].blastUser != 1 && this.blasts[i].blastUser != 2 || this.support[x].hardHit == true) && this.blasts[i].blastUser != 4 && this.blasts[i].blastUser != 5) {
							if (this.blasts[i].type == 0) {
								this.support[x].hit = true;
								this.support[x].stun = true;
								this.support[x].blastBurnLength = 10;
								this.support[x].blastBurn = true;
								if (hardAttackHitTest(this.android18, this.support[x]) == true && this.support[x].behind == false) {
									this.pointBlank = true;
									this.blasts[i].position.x = this.support[x].position.x;
									this.blasts[i].exploding = true;
								} else {
									this.blasts[i].exploding = true;
								}
								this.sound.playEnergyReaction(6);
								if (this.blasts[i].dirLeft == true) {
									this.support[x].velocity.x -= 8;
								} else if (this.blasts[i].dirLeft == false) {
									this.support[x].velocity.x += 8;
								}
								this.support[x].decel = this.support[x].velocity.clone();
								if (this.support[x].endurance > 14) {
									this.support[x].endurance = this.support[x].endurance - (4 + getRandom(0, 2));
								} else if (this.support[x].endurance < 15) {
									this.support[x].health = this.support[x].health - (4 + getRandom(0, 2));
								}
							} else if (this.blasts[i].type == 1) {
								if (hardAttackHitTest(this.android18, this.support[x]) == true && this.support[x].behind == false) {
									//console.log("HARDHITTESTSETSET");
									this.support[x].position.x = this.blasts[i].position.x;
								}
								this.support[x].punched = false;
								this.support[x].hit = true;
								this.support[x].stun = true;
								//this.support[x].hardHit = true;
								this.support[x].jumpVelocity.y = 0;
								if (this.blasts[i].dirLeft == true) {
									this.support[x].position.x = this.blasts[i].position.x;
								} else {
									this.support[x].position.x = this.blasts[i].position.x + 180;
								}
								if (this.support[x].endurance > 14) {
									this.support[x].endurance = this.support[x].endurance - 1;
								} else if (this.support[x].endurance < 15) {
									this.support[x].health = this.support[x].health - 1;
								}
								if (this.support[x].position.x < this.support[x].LEFTWALL.x + 10 || this.support[x].position.x > this.support[x].RIGHTWALL.x - 10) {
									this.sound.playEnergyReaction(6);
									this.support[x].blastBurnLength = 20;
									this.support[x].blastBurn = true;
									this.environment.shake = true;
									this.blasts[i].exploding = true;
									this.environment.flash = true;
									this.support[x].hit = true;
									this.support[x].stun = true;
									this.support[x].hardHit = true;
									if (this.support[x].endurance > 14) {
										this.support[x].endurance = this.support[x].endurance - (5 + getRandom(2, 4));
									} else if (this.support[x].endurance < 15) {
										this.support[x].health = this.support[x].health - (5 + getRandom(2, 4));
									}
								}
							} else if (this.blasts[i].type == 2) {
								this.support[x].punched = false;
								this.support[x].hit = true;
								this.support[x].stun = true;
								this.support[x].hardHit = true;
								this.support[x].blasted = true;
								if (this.android18.left == true) {
									this.support[x].velocity.x -= 15;
								} else if (this.android18.right == true) {
									this.support[x].velocity.x += 15;
								}
								this.support[x].jumpVelocity.y = 0;
								this.support[x].decel = this.support[x].velocity.clone();
								if (this.support[x].endurance > 14) {
									this.support[x].endurance = this.support[x].endurance - (10 + getRandom(2, 6));
								} else if (this.support[x].endurance < 15) {
									this.support[x].health = this.support[x].health - (10 + getRandom(2, 6));
								}
								this.sound.playEnergyReaction(6);
								this.environment.flash = true;
								this.environment.shake = true;
								this.support[x].blastBurnLength = 20;
								this.support[x].blastBurn = true;
								if (hardAttackHitTest(this.android18, this.support[x]) == true && this.support[x].behind == false) {
									this.pointBlank = true;
									if (this.support[x].left == false) {
										this.blasts[i].position.x = this.support[x].position.x;
									} else {
										this.blasts[i].position.x = this.support[x].position.x - 100;
									}
									this.blasts[i].exploding = true;
								} else {
									if (this.support[x].left == false) {
										this.blasts[i].position.x = this.support[x].position.x;
									} else {
										this.blasts[i].position.x = this.support[x].position.x - 100;
									}
									this.blasts[i].exploding = true;
								}
							} else if (this.blasts[i].type == 3) {
								this.support[x].punched = false;
								this.support[x].hit = true;
								this.support[x].stun = true;
								this.support[x].hardHit = true;

								if (this.support[x].endurance > 14) {
									this.support[x].endurance = this.support[x].endurance - (10 + getRandom(0, 4));
								} else if (this.support[x].endurance < 15) {
									this.support[x].health = this.support[x].health - (10 + getRandom(0, 4));
								}
								if (this.blasts[i].dirLeft == true) {
									this.support[x].velocity.x = -60;
								} else if (this.blasts[i].dirLeft == false) {
									this.support[x].velocity.x = 60;
								}
								this.support[x].decel = this.support[x].velocity.clone();
								this.sound.playEnergyReaction(6);
								this.support[x].blastBurnLength = 40;
								this.support[x].blastBurn = true;
								this.blasts[i].exploding = true;
								this.environment.shake = true;
								this.environment.flash = true;
							} else if (this.blasts[i].type == 5) {
								this.support[x].punched = false;
								this.support[x].hit = true;
								this.support[x].stun = true;
								//this.android18.hardHit = true;
								this.support[x].blastBurnLength = 20;
								this.support[x].blastBurn = true;
								if (this.support[x].endurance > 14) {
									this.support[x].endurance = this.support[x].endurance - (5 + getRandom(0, 4));
								} else if (this.support[x].endurance < 15) {
									this.support[x].health = this.support[x].health - (5 + getRandom(0, 4));
								}
								if (this.blasts[i].dirLeft == true) {
									this.support[x].velocity.x = -8;
								} else if (this.blasts[i].dirLeft == false) {
									this.support[x].velocity.x = 8;
								}
								this.support[x].decel = this.support[x].velocity.clone();
								this.sound.playEnergyReaction(6);
								if (hardAttackHitTest(this.android18, this.support[x]) == true) {
									this.blasts[i].position.x = this.support[x].position.x;
									this.blasts[i].exploding = true;
								} else {
									this.blasts[i].exploding = true;
								}
								//this.environment.flash = true;
							} else if (this.blasts[i].type == 7 && this.support[x].behind == false) {
								this.support[x].punched = false;
								this.support[x].hit = true;
								this.support[x].stun = true;
								this.support[x].hardHit = true;
								if (this.blasts[i].dirLeft == true) {
									this.support[x].velocity.x = -8;
								} else if (this.blasts[i].dirLeft == false) {
									this.support[x].velocity.x = 8;
								}
								this.support[x].decel = this.support[x].velocity.clone();
								this.sound.playEnergyReaction2(6);

								if (hardAttackHitTest(this.vegeta, this.support[x]) == true && this.blasts[i].lifetime < 2 && (this.support[x].behind == false || this.blasts[i].moving == false)) {
									this.pointBlank = true;
									this.blasts[i].position.x = this.support[x].position.x;
									this.blasts[i].exploding = true;
								} else {
									//this.blasts[i].position.x = this.support[x].position.x;
									this.blasts[i].exploding = true;
								}
								//this.environment.flash = true;
							}
						}
					}
				}

				if (this.vegeta.blastTrigger == true && this.blasts[i].type == 5) {
					this.blasts[i].trigger = true;
				} else if (this.vegeta.end == true && this.blasts[i].type == 5) {
					this.blasts[i].exploding = true;
				}
				if (i + 1 == this.blasts.length) {
					this.vegeta.blastTrigger = false;
				}

				if (this.blasts[i].type == 9 && attackHitTestBlast(this.blasts[i], this.vegeta)) {
					if (this.vegeta.aboveSky == false) {
						this.vegeta.teleUp = true;
						this.vegeta.superSpeed = true;
					} else {
						this.vegeta.teleDown = true;
						this.vegeta.superSpeed = true;
					}
				}

				if (this.blasts[i].type == 10 && attackHitTestBlast(this.blasts[i], this.vegeta)) {
					this.vegeta.teleUp = true;
					this.vegeta.superSpeed = true;
				}

				if (this.blasts[i].type == 7 && this.blasts[i].dirLeft == false && this.blasts[i].triggerState == 0 && this.blasts[i].position.x < this.android18.position.x + 100 && this.blasts[i].position.x > this.android18.position.x - 100 && (this.blasts[i].position.y > this.android18.position.y + 75 || this.blasts[i].position.y < this.android18.position.y - 25)) {
					if (this.blasts[i].position.y > this.android18.position.y) {
						this.blasts[i].turnDown = false;
						this.vegeta.turnsUp = true;
					} else {
						this.blasts[i].turnDown = true;
						this.vegeta.turnsDown = true;
					}

					this.blasts[i].trigger = true;
				} else if (this.blasts[i].type == 7 && this.blasts[i].dirLeft == true && this.blasts[i].triggerState == 0 && this.blasts[i].position.x + 150 < this.android18.position.x + 100 && this.blasts[i].position.x + 150 > this.android18.position.x - 100 && (this.blasts[i].position.y > this.android18.position.y + 75 || this.blasts[i].position.y < this.android18.position.y - 25)) {
					if (this.blasts[i].position.y > this.android18.position.y) {
						this.blasts[i].turnDown = false;
						this.vegeta.turnsUp = true;
					} else {
						this.blasts[i].turnDown = true;
						this.vegeta.turnsDown = true;
					}

					this.blasts[i].trigger = true;
				}

				//GOHAN BLAST EXPLODING
				if (this.blasts[i].type == 7 && this.vegeta.gohan == true && (this.vegeta.hit == true || this.vegeta.hardHit == true)) {
					this.blasts[i].exploding = true;
				}

				if (this.gameState == this.GAME_STATE.TUTORIAL && this.blasts[i].type != 0) {
					if (this.blasts[i].position.x < -200 || this.blasts[i].position.x > 1000) {
						this.blasts[i].exploding = true;
						this.environment.flash = true;
						this.environment.shake = true;
					}
				}

				//if(this.blasts[i].type == 7 && this.blasts[i].lifetime > 5 && this.blasts[i].triggerState == 0){
				//	this.blasts[i].trigger = true;
				//}

				//DRAW BLAST
				this.blasts[i].draw(this.ctx);
			}

			this.pointBlank = false;
		}

		this.environment.drawForeground(this.ctx); // DRAW Foreground

		this.environment.drawOverlay(this.ctx2); // DRAW Overlay

		this.environment.drawTop(this.ctx3); // DRAW TOP

		for (var i = 0; i < this.blasts.length; i++) {
			for (var j = 0; j < this.blasts.length; j++) {
				if (this.blasts[i].exploding == false && blastHitTestBlast(this.blasts[i], this.blasts[j]) == true && (this.blasts[i].blastUser == 0 || this.blasts[i].blastUser == 6) && this.blasts[j].blastUser != 0 && this.blasts[j].blastUser != 6 && this.blasts[j].exploding == false) {
					if (this.blasts[i].type != 0) {
						this.blasts[j].exploding = true;
						if (this.blasts[j].type == 9) {
							this.blastExploded = true;
							this.blasts[j].lifetime = 301;
						}
					} else if (this.blasts[j].type != 0 && this.blasts[j].type != 5) {
						this.blasts[i].exploding = true;
					} else {
						this.blasts[i].exploding = true;
						this.blasts[j].exploding = true;
					}
				}
			}
		}

		this.ctx.restore(); //CAMERA

		// ------ANDROID 17 AI CONTROL------
		if (this.android17.stun == false && this.android17.end == false && this.android17.gone == false && this.android17.vanish == false) {
			if (hardAttackHitTest(this.vegeta, this.android17) == true && (this.vegeta.punching == true || this.vegeta.kicking == true)) {
				this.aiChoice5 = Math.random();
			} else if (attackHitTest(this.vegeta, this.android17) == true && this.vegeta.basic == true) {
				this.aiChoice5 = Math.random();
			}

			if (hardAttackHitTest(this.android17, this.vegeta) != true && app.main.android17.blasting == false && app.main.android17.test == false) {
				//this.aiChoice1 = Math.random();
				this.aiChoice4 = Math.random();
			}

			this.aiDefenseTimer++;
			if (this.aiDefenseTimer > 20) {
				this.aiDefense17 = Math.random();
				this.aiDefenseTimer = 0;
			}

			this.cooldownAndroid17++;
			//ANDROID17 AGGRESSIVE STATE
			if (this.android17.aggressive == true && this.android17.encounter == true && this.android17.evasion == false && this.vegeta.end == false) {
				//console.log("171717171717");
				console.dir(this.android17);
				/*
    this.modeSwitch++;
    //console.log("OFF -- AI2: " + this.aiChoice2);
    //console.log("OFF -- AI3: " + this.aiChoice5);
    if(this.android17.energy < 45 && this.modeSwitch > 40){
    	this.android17.defensive = true;
    	this.android17.aggressive = false;
    	this.aiReason = 1;
    } else if((this.android17.stamina > 90 || this.android17.exhausted == true) && this.modeSwitch > 40){
    	this.android17.defensive = true;
    	this.android17.aggressive = false;
    	this.aiReason = 2;
    } else if(this.aiChoice1 < .03 && this.android17.energy > 45 && this.android17.stamina < 90 && this.android17.exhausted != true && this.modeSwitch > 40){
    	this.aiChoice1 = Math.random();
    	this.android17.defensive = true;
    	this.android17.aggressive = false;
    	this.aiReason = 3;
    } 
    */

				//console.log(this.aiDefense17 + "AIDEFENSE 17");


				if (this.aiDefense17 > .3) {

					//ANDROID17 MOVEMENT
					if (hitTest(this.vegeta, this.android17) != true && this.android17.powerMove == false && this.android17.hard == false && this.android17.taunting == false && app.main.android17.test == false) {
						if (this.android17.right == true) {
							if (attackHitTest(this.android17, this.vegeta) == true && this.android17.position.x > this.vegeta.position.x - 60) {} else {
								this.android17.moveRight();
							}
						} else {
							if (attackHitTest(this.android17, this.vegeta) == true && this.android17.left == true && this.android17.position.x < this.vegeta.position.x + 60) {} else {
								this.android17.moveLeft();
							}
						}
					}
				} else {
					//ANDROID17 REVERSE MOVEMENT
					if (this.android17.hard == false && this.android17.powerMove == false && this.android17.taunting == false) {
						if (this.android17.right == true && this.android17.position.x > this.android17.LEFTWALL.x) {
							this.android17.moveLeft();
						} else if (this.android17.left == true && this.android17.position.x < this.android17.RIGHTWALL.x) {
							this.android17.moveRight();
						}
					}
				}

				if (this.activeSupport == false) {
					if ((this.android17.movingLeft == true || this.android17.movingRight == true) && hitTest(this.vegeta, this.android17) == true) {
						this.android17.decel.x = 0;
					}
				} else {
					if ((this.android17.movingLeft == true || this.android17.movingRight == true) && (hitTest(this.vegeta, this.android17) == true || hitTest(this.support[0], this.android17) == true || hitTest(this.support[1], this.android17) == true)) {
						this.android17.decel.x = 0;
					}
				}

				//ANDROID17 FLIGHT
				if (this.vegeta.position.y < this.android17.position.y && this.android17.hard == false && this.android17.taunting == false && this.android17.hardHit == false && this.android17.stun == false && this.android17.position.y > this.android17.SKYTOP.y + 5 && this.android17.end == false) {
					if (this.android17.attacking == false && this.android17.taunting == false && this.android17.blasting == false && this.android17.blocking == false) {
						this.android17.up = true;
					}
					this.android17.flying = true;
					this.android17.jump();
				} else {
					this.android17.hover = false;
					this.android17.flying = false;
					if (this.vegeta.position.y - 50 > this.android17.position.y) {
						this.android17.aboveBuilding = false;
						//this.android17.air = true;
					}
					//this.android17.down = true;
				}

				//ANDROID17 FLIGHT DODGE -- 18
				if (this.android17.powerMove == false) {
					if (this.android18.blasting == true && this.android18.counter > 0 && this.android18.position.y - 100 < this.android17.position.y && this.android17.hard == false && this.android17.taunting == false && this.android17.stun == false && this.android17.aboveSky == false && this.android17.blasting == false && this.android17.end == false) {
						this.android17.dodge = true;
						this.android17.flying = true;
						this.android17.jump();
					} else if (this.android18.blasting == true && this.android18.counter > 0 && this.android18.position.y + 100 > this.android17.position.y && this.android17.hard == false && this.android17.taunting == false && this.android17.stun == false && this.android17.aboveSky == true && this.android17.end == false) {
						this.android17.hover = false;
						this.android17.dodge = true;
						this.android17.flying = false;
						//this.android17.down = true;
					} else {
						this.android17.dodge = false;
					}
				}

				if (this.dodgeChance2 > .5) {

					//ANDROID17 FLIGHT DODGE
					if (this.android17.powerMove == false) {
						if (this.vegeta.blasting == true && this.vegeta.counter > 0 && this.vegeta.position.y - 100 < this.android17.position.y && this.android17.hard == false && this.android17.taunting == false && this.android17.stun == false && this.android17.aboveSky == false && this.android17.blasting == false && this.android17.end == false) {
							this.android17.dodge = true;
							this.android17.flying = true;
							this.android17.jump();
						} else if (this.vegeta.blasting == true && this.vegeta.counter > 0 && this.vegeta.position.y + 100 > this.android17.position.y && this.android17.hard == false && this.android17.taunting == false && this.android17.stun == false && this.android17.aboveSky == true && this.android17.end == false) {
							this.android17.hover = false;
							this.android17.dodge = true;
							this.android17.flying = false;
							//this.android17.down = true;
						} else {
							this.android17.dodge = false;
						}
					}
				} else if (this.dodgeChance2 <= .5 && this.dodgeChance > 0) {
					if (this.vegeta.blasting == true && this.android17.hard == false && this.android17.taunting == false && this.android17.stun == false && this.android17.dodge == false && this.android17.energy > 33) {
						this.android17.dodge = true;
						this.android17.superSpeed = true;
					}
				} else if (this.dodgeChance2 <= -1) {
					if (this.android17.fight == false && this.android17.taunting == false && this.android17.end == false) {
						this.android17.dodge = true;
						this.android17.stun = true;
						//this.android17.counter = 0;
						this.android17.blocking = true;
						this.android17.fieldOn = true;
						this.dodgeChance2 = 0;
					}
				}

				//ANDROID17 BLOCKING
				if (this.aiChoice5 < .3 && this.aiChoice5 > .1 && this.android17.fight == false && this.android17.taunting == false && this.android17.exhausted == false && this.android17.end == false && hardAttackHitTest(this.vegeta, this.android17) == true) {
					if (this.action == false) {
						this.action = true;
						this.aiChoice5 = 10;
						this.android17.blocking = true;
						if (attackHitTest(this.vegeta, this.android17) == true && (this.vegeta.basic == true || this.vegeta.punching == true || this.vegeta.kicking == true) && this.vegeta.attacking == true) {
							this.android17.stamina += 1;
						}
						if (this.vegeta.attacking == false || hardAttackHitTest(this.vegeta, this.android17) != true) {
							this.android17.blocking = false;
						}
					}
				}
				//ANDROID17 DEFENDING SUPER SPEED (TELEPORT)
				if (this.aiChoice5 < .1 && (this.android17.fight == false && this.attacking == false && this.android17.blasting == false || this.android17.blocking == true) && this.android17.superSpeed == false && this.stun == false && this.android17.end == false && this.android17.energy > 40) {
					if (this.action == false) {
						this.aiChoice5 = 10;
						this.action = true;
						this.android17.superSpeed = true;
						this.android17.fight = true;
					}
				} else if (this.aiChoice5 < .1) {
					this.aiChoice5 = 10;
				}
				//ANDROID17 BASIC ATTACKS
				if ((attackHitTest(this.android17, this.vegeta) == true || app.main.android17.test == true && (app.main.vegeta.punching == true || app.main.vegeta.kicking == true) && app.main.vegeta.blasting == false) && this.android17.hit == false && this.android17.hardHit == false && this.aiChoice4 < 11 && this.aiChoice4 > .25) {
					if (this.action == false) {
						//this.chance2 = Math.random();
						//console.log("BASIC");
						if (this.android17.exhausted == false) {
							this.android17.attacking = true;
							this.android17.fight = true;
							this.action = true;
						}
					}
				}
				//ANDROID17 HARD ATTACKS
				if ((hardAttackHitTest(this.android17, this.vegeta) == true && (this.android17.air == false || this.chance3 <= .5) || attackHitTest(this.android17, this.vegeta) == true && this.android17.air == true && this.chance3 > .5 || app.main.android17.test == true && (app.main.vegeta.punching == true || app.main.vegeta.kicking == true) && app.main.vegeta.blasting == false) && this.aiChoice4 < .25 && this.aiChoice4 > .05 && this.vegeta.behind == false) {
					if (this.action == false) {
						//this.chance2 = Math.random();
						if (this.android17.exhausted == false) {
							this.android17.attacking = true;
							this.android17.fight = true;
							this.android17.hard = true;
							this.android17.intensify = true;
							this.action = true;
						}
					}
				}

				if (this.android17.position.y < this.vegeta.position.y + 100 && this.android17.position.y > this.vegeta.position.y - 100) {

					//ANDROID17 ENERGY BLASTS
					if (attackHitTest(this.android17, this.vegeta) != true && this.aiChoice4 > .83 && this.aiChoice4 < .951 && this.android17.fight == false && this.android17.energy > 30 && this.android17.taunting == false) {
						if (this.action == false) {
							this.action = true;
							app.main.aiChoice4 = 10;
							this.android17.attacking = true;
							this.android17.blasting = true;
							this.android17.fight = true;
						}
					}

					//ANDROID17 POWER ENERGY BLASTS
					if (attackHitTest(this.android17, this.vegeta) != true && this.aiChoice4 > .95 && this.aiChoice4 < 1 && this.android17.blasting == false && this.android17.fight == false && this.android17.energy > 30 && this.android17.taunting == false && this.cooldownAndroid17 > 100) {
						if (this.action == false) {
							this.android17.blastCount = 0;
							this.action = true;
							app.main.aiChoice4 = 10;
							this.cooldownAndroid17 = 0;
							this.android17.powerMove = true;
							this.android17.attacking = true;
							this.android17.blasting = true;
							this.android17.fight = true;
						}
					}
				}

				//ANDROID17 ATTACKING SUPER SPEED (TELEPORT)
				if ((this.aiChoice4 < .05 && attackHitTest(this.android17, this.vegeta) == true || this.aiChoice4 < .01 && attackHitTest(this.android17, this.vegeta) != true) && (this.android17.fight == false && this.android17.blasting == false || this.android17.blocking == true) && this.android17.superSpeed == false && this.android17.stun == false && this.android17.end == false && this.android17.energy > 33) {
					if (this.action == false) {
						this.action = true;
						this.android17.superSpeed = true;
						this.android17.fight = true;
					}
				} else if (this.aiChoice4 < .05) {
					this.aiChoice4 = Math.random();
				}

				//ANDROID17 TAUNTING
				if (this.aiChoice4 < -1 && this.android17.fight == false && this.android17.taunting == false) {
					if (this.action == false) {
						this.action = true;
						this.android17.intensify = true;
						this.android17.taunting = true;
					}
				}
			} else if (this.android17.evasion == true && this.vegeta.end == false) {
				//EVASION EVASION EVASION --------

				//ANDROID17 REVERSE MOVEMENT
				if (this.android17.hard == false && this.android17.powerMove == false && this.android17.taunting == false) {
					if (this.android17.right == true && this.android17.position.x > this.android17.LEFTWALL.x) {
						this.android17.moveLeft();
					} else if (this.android17.left == true && this.android17.position.x < this.android17.RIGHTWALL.x) {
						this.android17.moveRight();
					}
				}

				if (this.android17.position.y < this.vegeta.position.y + 100 && this.android17.position.y > this.vegeta.position.y - 100) {
					if (this.android17.position.x < this.android17.LEFTWALL.x + 100 && this.vegeta.position.x < this.android18.position.x || this.android17.position.x > this.android17.RIGHTWALL.x - 100 && this.vegeta.position.x > this.android18.position.x) {
						//ANDROID17 ENERGY BLASTS
						if (attackHitTest(this.android17, this.vegeta) != true && this.aiChoice4 > .83 && this.aiChoice4 < .951 && this.android17.fight == false && this.android17.energy > 30 && this.android17.taunting == false && this.aiDefense17 > .6) {
							if (this.action == false) {
								this.action = true;
								app.main.aiChoice4 = 10;
								this.android17.attacking = true;
								this.android17.blasting = true;
								this.android17.fight = true;
							}
						}
					}
				}

				//ANDROID17 ATTACKING SUPER SPEED (TELEPORT)
				if (hardAttackHitTest(this.android17, this.vegeta) == true && this.vegeta.hit == false) {
					if (this.action == false) {
						this.action = true;
						this.android17.superSpeed = true;
						this.android17.fight = true;
					}
				}

				//ANDROID17 HARD ATTACKS
				if ((hardAttackHitTest(this.android17, this.vegeta) == true && (this.android17.air == false || this.chance3 <= .5) || attackHitTest(this.android17, this.vegeta) == true && this.android17.air == true && this.chance3 > .5) && this.vegeta.behind == false) {
					if (this.action == false) {
						//this.chance2 = Math.random();
						if (this.android17.exhausted == false) {
							this.android17.attacking = true;
							this.android17.fight = true;
							this.android17.hard = true;
							this.android17.intensify = true;
							this.action = true;
						}
					}
				}

				//ANDROID17 TAUNTING
				if (this.aiChoice4 < -1 && this.android17.fight == false && this.android17.taunting == false) {
					if (this.action == false) {
						this.action = true;
						this.android17.intensify = true;
						this.android17.taunting = true;
					}
				}

				if (this.aiDefense17 > .5) {
					//Sometimes fly
					//ANDROID17 FLIGHT
					if (this.vegeta.position.y < this.android17.position.y && this.android17.hard == false && this.android17.taunting == false && this.android17.hardHit == false && this.android17.stun == false && this.android17.end == false) {
						if (this.android17.attacking == false && this.android17.taunting == false && this.android17.blasting == false && this.android17.blocking == false) {
							this.android17.up = true;
						}
						this.android17.flying = true;
						this.android17.jump();
					} else {
						this.android17.hover = false;
						this.android17.flying = false;
						if (this.vegeta.position.y - 50 > this.android17.position.y) {
							this.android17.aboveBuilding = false;
							//this.android17.air = true;
						}
						//this.android17.down = true;
					}
				} else {
					this.android17.hover = false;
					this.android17.flying = false;
				}
			}
		}

		//console.log(this.aiChoice3 + " = AI CHOICE 33333333333333");
		//console.log("AGG: " + this.vegeta.aggressive);
		//console.log("DEF: " + this.vegeta.defensive);
		//console.log("REASON: " + this.aiReason);
		//console.log("COUNTER: " + this.vegeta.counter);
		console.dir(this.vegeta);
		//console.log("STUN: " + this.vegeta.stun + "Taunt: " + this.vegeta.taunting);

		// ------VEGETA AI CONTROL------
		if (this.vegeta.stun == false && this.vegeta.end == false && this.scene == false) {
			//console.log(this.modeSwitch);
			if (hardAttackHitTest(this.android18, this.vegeta) == true && (this.android18.punching == true || this.android18.kicking == true)) {
				this.aiChoice3 = Math.random();
			} else if (attackHitTest(this.android18, this.vegeta) == true && this.android18.basic == true) {
				this.aiChoice3 = Math.random();
			}

			if (hardAttackHitTest(this.android17, this.vegeta) == true) {
				this.aiChoice3 = Math.random();
			} else if (attackHitTest(this.android17, this.vegeta) == true) {
				this.aiChoice3 = Math.random();
			}
			/*
   if(hitTest(this.vegeta,this.android18)){
   	if(this.android18.left == true){
   		this.vegeta.position.x -=1;
   	} else {
   		this.vegeta.position.x += 1;
   	}
   } else if(hitTest(this.vegeta,this.android17)){
   	if(this.android17.left == true){
   		this.vegeta.position.x -=1;
   	} else {
   		this.vegeta.position.x += 1;
   	}
   }
   */
			if (this.vegeta.gohan == true && this.battle == 3) {
				this.cooldownAI += 2;
			} else {
				this.cooldownAI++;
			}
			//VEGETA AGGRESSIVE STATE
			if (this.vegeta.aggressive == true) {
				this.modeSwitch++;
				//console.log("OFF -- AI2: " + this.aiChoice2);
				//console.log("OFF -- AI3: " + this.aiChoice3);
				if (this.vegeta.energy < 45 && this.vegeta.gero == false && this.modeSwitch > 40) {
					this.vegeta.defensive = true;
					this.vegeta.aggressive = false;
					this.aiReason = 1;
				} else if ((this.vegeta.stamina > 90 || this.vegeta.exhausted == true) && this.modeSwitch > 40 && this.vegeta.gero == false) {
					this.vegeta.defensive = true;
					this.vegeta.aggressive = false;
					this.aiReason = 2;
				} else if (this.aiChoice1 < .03 && this.vegeta.energy > 45 && this.vegeta.stamina < 90 && this.vegeta.exhausted != true && this.modeSwitch > 40 && this.vegeta.gero == false) {
					this.aiChoice1 = Math.random();
					this.vegeta.defensive = true;
					this.vegeta.aggressive = false;
					this.aiReason = 3;
				}

				if (hardAttackHitTest(this.vegeta, this.android18) != true && hardAttackHitTest(this.vegeta, this.android17) != true && this.vegeta.blasting == false && this.vegeta.taunting == false && this.vegeta.charging == false && this.vegeta.superSpeed == false && app.main.vegeta.test == false) {
					this.aiChoice1 = Math.random();
					this.aiChoice2 = Math.random();
				}

				//console.log("AI CHOICE 22222222 : " + this.aiChoice2);

				//Escape Double Trouble
				if (hardAttackHitTest(this.android18, this.vegeta) == true && hardAttackHitTest(this.android17, this.vegeta) == true && this.android17.encounter == true && this.aiChoice3 > .95 && this.vegeta.gero == false) {
					/* if(this.vegeta.air == true && this.vegeta.position.y > this.vegeta.GROUND.y - 300){
     	this.vegeta.hover = false;
     	this.vegeta.flying = false;
     } else {
     	this.vegeta.flying = true;
     	this.vegeta.hover = false;
     } */
					if (this.vegeta.aboveBuilding == false) {
						this.vegeta.teleUp = true;
						this.vegeta.superSpeed = true;
					} else {
						this.vegeta.teleDown = true;
						this.vegeta.superSpeed = true;
					}
				}

				//Escape Corner Camp
				if ((hardAttackHitTest(this.android18, this.vegeta) == true || hardAttackHitTest(this.android17, this.vegeta) == true) && (this.vegeta.position.x < this.vegeta.LEFTWALL + 50 || this.vegeta.position.x > this.vegeta.RIGHTWALL - 50) && this.aiChoice3 > .8 && this.vegeta.gero == false) {
					/* if(this.vegeta.air == true && this.vegeta.position.y > this.vegeta.GROUND.y - 300){
     	this.vegeta.hover = false;
     	this.vegeta.flying = false;
     } else {
     	this.vegeta.flying = true;
     	this.vegeta.hover = false;
     } */
					if (this.vegeta.aboveBuilding == false) {
						this.vegeta.teleUp = true;
						this.vegeta.superSpeed = true;
					} else {
						this.vegeta.teleDown = true;
						this.vegeta.superSpeed = true;
					}
				}

				if (this.vegeta.focus17 == false) {
					//IF FOCUSING 17 == FALSE

					if (this.vegeta.gero == false) {
						//VEGETA MOVEMENT
						if (hitTest(this.android18, this.vegeta) != true && this.vegeta.powerMove == false && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && (this.vegeta.vegeta == false || this.vegeta.specMove == false) && app.main.vegeta.test == false) {
							if (this.vegeta.right == true && this.vegeta.position.x < this.android18.position.x - 60) {
								this.vegeta.moveRight();
							} else if (this.vegeta.left == true && this.vegeta.position.x > this.android18.position.x + 60) {
								this.vegeta.moveLeft();
							}
						}

						//VEGETA FLIGHT
						if ((this.vegeta.powerMove == false && this.vegeta.blasting == false || this.vegeta.vegeta == true) && this.scene == false) {
							if (this.android18.position.y < this.vegeta.position.y && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.dodge == false && this.vegeta.hardHit == false && this.vegeta.stun == false && this.vegeta.end == false) {
								if (this.vegeta.attacking == false && this.vegeta.taunting == false && this.vegeta.charging == false && this.vegeta.blasting == false && this.vegeta.blocking == false) {
									this.vegeta.up = true;
								}
								this.vegeta.flying = true;
								this.vegeta.jump();
							} else {
								this.vegeta.hover = false;
								this.vegeta.flying = false;
								this.vegeta.up = false;
								if (this.android18.position.y - 50 > this.vegeta.position.y) {
									this.vegeta.aboveBuilding = false;
									//this.vegeta.air = true;
								}
								//this.vegeta.down = true;
							}
						}
					} else {
						//IF GERO
						//VEGETA MOVEMENT
						if (hitTest(this.android18, this.vegeta) != true && this.vegeta.powerMove == false && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && (this.vegeta.vegeta == false || this.vegeta.specMove == false) && this.vegeta.exhausted == false && app.main.vegeta.test == false) {
							if (this.vegeta.right == true && this.vegeta.position.x < this.android18.position.x - 60) {
								this.vegeta.moveRight();
							} else if (this.vegeta.left == true && this.vegeta.position.x > this.android18.position.x + 60) {
								this.vegeta.moveLeft();
							}
						}

						//VEGETA FLIGHT
						if ((this.vegeta.powerMove == false && this.vegeta.blasting == false || this.vegeta.vegeta == true) && this.scene == false && this.vegeta.exhausted == false) {
							if (this.android18.position.y < this.vegeta.position.y && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.dodge == false && this.vegeta.hardHit == false && this.vegeta.stun == false && this.vegeta.end == false) {
								if (this.vegeta.attacking == false && this.vegeta.taunting == false && this.vegeta.charging == false && this.vegeta.blasting == false && this.vegeta.blocking == false) {
									this.vegeta.up = true;
								}
								this.vegeta.flying = true;
								this.vegeta.jump();
							} else {
								this.vegeta.hover = false;
								this.vegeta.flying = false;
								this.vegeta.up = false;
								if (this.android18.position.y - 50 > this.vegeta.position.y) {
									this.vegeta.aboveBuilding = false;
									//this.vegeta.air = true;
								}
								//this.vegeta.down = true;
							}
						} else if (this.vegeta.exhausted == true) {
							this.vegeta.flying = false;
						}
					}

					if (this.vegeta.powerMove == false && this.scene == false) {
						if (this.dodgeChance > .5) {

							//VEGETA FLIGHT DODGE

							if (this.android18.blasting == true && this.android18.counter > 0 && this.android18.position.y - 100 < this.vegeta.position.y && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.stun == false && this.vegeta.aboveSky == false && this.vegeta.blasting == false && this.vegeta.end == false) {
								this.vegeta.dodge = true;
								this.vegeta.flying = true;
								this.vegeta.jump();
							} else if (this.android18.blasting == true && this.android18.counter > 0 && this.android18.position.y + 100 > this.vegeta.position.y && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.stun == false && this.vegeta.aboveSky == true && this.vegeta.end == false) {
								this.vegeta.hover = false;
								this.vegeta.dodge = true;
								this.vegeta.flying = false;
								this.vegeta.up = false;
								//this.vegeta.down = true;
							} else {
								this.vegeta.dodge = false;
							}
						} else if (this.dodgeChance < .5 && this.dodgeChance > .2 && this.vegeta.superSpeed == false) {
							if (this.android18.blasting == true && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.stun == false && this.vegeta.dodge == false && this.vegeta.energy > 33) {
								this.dodgeChance = 0;
								this.vegeta.dodge = true;
								this.vegeta.superSpeed = true;
							}
						}
					}

					//VEGETA BLOCKING
					/* if(this.aiChoice3 < .45 && this.aiChoice3 > .15 && this.vegeta.fight == false && this.vegeta.taunting == false && this.vegeta.exhausted == false && this.vegeta.end == false && hardAttackHitTest(this.android18, this.vegeta) == true  && this.vegeta.gero == false){
     	if(this.action == false){
     		this.action = true;
     		this.aiChoice3 = 10;
     		this.vegeta.blocking = true;
     		if(attackHitTest(this.android18, this.vegeta) == true && (this.android18.basic == true || this.android18.punching == true || this.android18.kicking == true) && this.android18.attacking == true){
     			//this.vegeta.stamina += 1;
     		}
     		if(this.android18.attacking == false || hardAttackHitTest(this.android18, this.vegeta) != true){
     			this.vegeta.blocking = false;
     		}
     	}
     } */

					if (this.vegeta.vegeta == true) {
						console.log("working");
						//VEGETA BLOCKING -- FOCUS 17
						if (this.aiChoice3 < .45 && this.aiChoice3 > .25 && this.vegeta.fight == false && this.vegeta.taunting == false && this.vegeta.exhausted == false && this.vegeta.end == false && hardAttackHitTest(this.android17, this.vegeta) == true && this.vegeta.gero == false) {
							if (this.action == false) {
								this.action = true;
								this.aiChoice3 = 10;
								this.vegeta.blocking = true;
								if (attackHitTest(this.android17, this.vegeta) == true && (this.android17.basic == true || this.android17.punching == true || this.android17.kicking == true) && this.android17.attacking == true) {
									//this.vegeta.stamina += 1;
								}
								if (this.android17.attacking == false || hardAttackHitTest(this.android17, this.vegeta) != true) {
									this.vegeta.blocking = false;
								}
							}
						}

						//VEGETA DEFENDING SUPER SPEED (TELEPORT)
						if (this.aiChoice3 < .25 && this.aiChoice3 > .15 && this.vegeta.blasting == false && this.vegeta.superSpeed == false && this.vegeta.end == false && this.vegeta.superSpeedExhaustion == false && this.vegeta.energy > 40) {
							if (this.action == false) {
								if (this.vegeta.vegeta == true) {
									this.vegeta.specChance = Math.random();
									if (this.vegeta.specChance > -1) {
										if (this.android18.position.y < this.vegeta.position.y + 300 && this.android18.position.y > this.vegeta.position.y - 300) {
											if (this.android18.position.x < this.vegeta.position.x + 300 && this.android18.position.x > this.vegeta.position.x - 300) {
												this.vegeta.hits18 = true;
											}
										}
										if (this.android17.active == true) {
											if (this.android17.position.y < this.vegeta.position.y + 300 && this.android17.position.y > this.vegeta.position.y - 300) {
												if (this.android17.position.x < this.vegeta.position.x + 300 && this.android17.position.x > this.vegeta.position.x - 300) {
													this.vegeta.hits17 = true;
												}
											}
										}
										if (this.vegeta.hits18 == true || this.vegeta.hits17 == true) {
											this.vegeta.specMove = true;
											this.vegeta.specChance = 0;
										}
										this.vegeta.attacking = true;
										this.vegeta.blasting = true;
										this.vegeta.fight = true;
										this.aiChoice3 = 10;
										this.action = true;
									}
								}
							}
						}

						//VEGETA DEFENDING SUPER SPEED (TELEPORT)
						if (this.aiChoice3 < .15 && this.vegeta.blasting == false && this.vegeta.superSpeed == false && this.vegeta.end == false && this.vegeta.superSpeedExhaustion == false && this.vegeta.energy > 40) {
							if (this.action == false) {
								this.aiChoice3 = 10;
								this.action = true;
								this.vegeta.superSpeed = true;
								this.vegeta.fight = true;
							}
						} else if (this.aiChoice3 < .15) {
							this.aiChoice3 = 10;
						}
					} else {

						//VEGETA BLOCKING
						if (this.aiChoice3 < .45 && this.aiChoice3 > .15 && this.vegeta.fight == false && this.vegeta.taunting == false && this.vegeta.exhausted == false && this.vegeta.end == false && hardAttackHitTest(this.android17, this.vegeta) == true && this.vegeta.gero == false) {
							if (this.action == false) {
								this.action = true;
								this.aiChoice3 = 10;
								this.vegeta.blocking = true;
								if (attackHitTest(this.android17, this.vegeta) == true && (this.android17.basic == true || this.android17.punching == true || this.android17.kicking == true) && this.android17.attacking == true) {
									//this.vegeta.stamina += 1;
								}
								if (this.android17.attacking == false || hardAttackHitTest(this.android17, this.vegeta) != true) {
									this.vegeta.blocking = false;
								}
							}
						}

						//VEGETA DEFENDING SUPER SPEED (TELEPORT)
						if (this.aiChoice3 < .15 && this.vegeta.blasting == false && this.vegeta.superSpeed == false && this.vegeta.end == false && this.vegeta.superSpeedExhaustion == false && this.vegeta.energy > 40) {
							if (this.action == false) {
								this.aiChoice3 = 10;
								this.action = true;
								this.vegeta.superSpeed = true;
								this.vegeta.fight = true;
							}
						} else if (this.aiChoice3 < .15) {
							this.aiChoice3 = 10;
						}
					}
				} else {
					//IF FOCUSING 17 == TRUE

					//VEGETA FLIGHT -- FOCUS 17
					if ((this.vegeta.powerMove == false && this.vegeta.blasting == false || this.vegeta.vegeta == true) && this.scene == false) {
						if (this.android17.position.y < this.vegeta.position.y && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.dodge == false && this.vegeta.hardHit == false && this.vegeta.stun == false && this.vegeta.end == false) {
							if (this.vegeta.attacking == false && this.vegeta.taunting == false && this.vegeta.charging == false && this.vegeta.blasting == false && this.vegeta.blocking == false) {
								this.vegeta.up = true;
							}
							this.vegeta.flying = true;
							this.vegeta.jump();
						} else {
							this.vegeta.hover = false;
							this.vegeta.up = false;
							this.vegeta.flying = false;
							if (this.android17.position.y - 50 > this.vegeta.position.y) {
								this.vegeta.aboveBuilding = false;
								//this.vegeta.air = true;
							}
							//this.vegeta.down = true;
						}
					}

					//VEGETA MOVEMENT -- FOCUS 17
					if (hitTest(this.android18, this.vegeta) != true && this.vegeta.powerMove == false && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && app.main.vegeta.test == false) {
						if (this.vegeta.right == true && this.vegeta.position.x < this.android17.position.x - 60) {
							this.vegeta.moveRight();
						} else if (this.vegeta.left == true && this.vegeta.position.x < this.android17.position.x - 60) {
							this.vegeta.moveLeft();
						}
					}

					if (this.vegeta.powerMove == false && this.scene == false) {
						if (this.dodgeChance > .5) {

							//VEGETA FLIGHT DODGE -- FOCUS 17

							if (this.android17.blasting == true && this.android17.counter > 0 && this.android17.position.y - 100 < this.vegeta.position.y && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.stun == false && this.vegeta.aboveSky == false && this.vegeta.blasting == false && this.vegeta.end == false) {
								this.vegeta.dodge = true;
								this.vegeta.flying = true;
								this.vegeta.jump();
							} else if (this.android17.blasting == true && this.android17.counter > 0 && this.android17.position.y + 100 > this.vegeta.position.y && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.stun == false && this.vegeta.aboveSky == true && this.vegeta.end == false) {
								this.vegeta.hover = false;
								this.vegeta.up = false;
								this.vegeta.dodge = true;
								this.vegeta.flying = false;
								//this.vegeta.down = true;
							} else {
								this.vegeta.dodge = false;
							}
						} else if (this.dodgeChance < .5 && this.dodgeChance > .2 && this.vegeta.superSpeed == false) {
							if (this.android17.blasting == true && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.stun == false && this.vegeta.dodge == false && this.vegeta.energy > 33) {
								this.dodgeChance = 0;
								this.vegeta.dodge = true;
								this.vegeta.superSpeed = true;
							}
						}
					}

					//console.log("AICHOICE3 " + this.aiChoice3);

					if (this.vegeta.vegeta == true) {
						console.log("working");
						//VEGETA BLOCKING -- FOCUS 17
						if (this.aiChoice3 < .55 && this.aiChoice3 > .3 && this.vegeta.fight == false && this.vegeta.taunting == false && this.vegeta.exhausted == false && this.vegeta.end == false && hardAttackHitTest(this.android17, this.vegeta) == true && this.vegeta.gero == false) {
							if (this.action == false) {
								this.action = true;
								this.aiChoice3 = 10;
								this.vegeta.blocking = true;
								if (attackHitTest(this.android17, this.vegeta) == true && (this.android17.basic == true || this.android17.punching == true || this.android17.kicking == true) && this.android17.attacking == true) {
									//this.vegeta.stamina += 1;
								}
								if (this.android17.attacking == false || hardAttackHitTest(this.android17, this.vegeta) != true) {
									this.vegeta.blocking = false;
								}
							}
						}

						//VEGETA DEFENDING SUPER SPEED (TELEPORT)
						if (this.aiChoice3 < .3 && this.aiChoice3 > .2 && this.vegeta.blasting == false && this.vegeta.superSpeed == false && this.vegeta.end == false && this.vegeta.superSpeedExhaustion == false && this.vegeta.energy > 40) {
							if (this.action == false) {
								if (this.vegeta.vegeta == true) {
									this.vegeta.specChance = Math.random();
									if (this.vegeta.specChance > -1) {
										if (this.android18.position.y < this.vegeta.position.y + 300 && this.android18.position.y > this.vegeta.position.y - 300) {
											if (this.android18.position.x < this.vegeta.position.x + 300 && this.android18.position.x > this.vegeta.position.x - 300) {
												this.vegeta.hits18 = true;
											}
										}
										if (this.android17.active == true) {
											if (this.android17.position.y < this.vegeta.position.y + 300 && this.android17.position.y > this.vegeta.position.y - 300) {
												if (this.android17.position.x < this.vegeta.position.x + 300 && this.android17.position.x > this.vegeta.position.x - 300) {
													this.vegeta.hits17 = true;
												}
											}
										}
										if ((this.vegeta.hits18 == true || this.vegeta.hits17 == true) && this.vegeta.specTimer > 50) {
											this.vegeta.unstoppable = true;
											this.vegeta.specMove = true;
											this.vegeta.specChance = 0;
										}
										this.vegeta.attacking = true;
										this.vegeta.blasting = true;
										this.vegeta.fight = true;
										this.aiChoice3 = 10;
										this.action = true;
									}
								}
							}
						}

						//VEGETA DEFENDING SUPER SPEED (TELEPORT)
						if (this.aiChoice3 < .2 && this.vegeta.blasting == false && this.vegeta.superSpeed == false && this.vegeta.end == false && this.vegeta.superSpeedExhaustion == false && this.vegeta.energy > 40) {
							if (this.action == false) {
								this.aiChoice3 = 10;
								this.action = true;
								this.vegeta.superSpeed = true;
								this.vegeta.fight = true;
							}
						} else if (this.aiChoice3 < .2) {
							this.aiChoice3 = 10;
						}
					} else {

						//VEGETA BLOCKING -- FOCUS 17
						if (this.aiChoice3 < .55 && this.aiChoice3 > .15 && this.vegeta.fight == false && this.vegeta.taunting == false && this.vegeta.exhausted == false && this.vegeta.end == false && hardAttackHitTest(this.android17, this.vegeta) == true && this.vegeta.gero == false) {
							if (this.action == false) {
								this.action = true;
								this.aiChoice3 = 10;
								this.vegeta.blocking = true;
								if (attackHitTest(this.android17, this.vegeta) == true && (this.android17.basic == true || this.android17.punching == true || this.android17.kicking == true) && this.android17.attacking == true) {
									//this.vegeta.stamina += 1;
								}
								if (this.android17.attacking == false || hardAttackHitTest(this.android17, this.vegeta) != true) {
									this.vegeta.blocking = false;
								}
							}
						}

						//VEGETA DEFENDING SUPER SPEED (TELEPORT)
						if (this.aiChoice3 < .15 && this.vegeta.blasting == false && this.vegeta.superSpeed == false && this.vegeta.end == false && this.vegeta.superSpeedExhaustion == false && this.vegeta.energy > 40) {
							if (this.action == false) {
								this.aiChoice3 = 10;
								this.action = true;
								this.vegeta.superSpeed = true;
								this.vegeta.fight = true;
							}
						} else if (this.aiChoice3 < .15) {
							this.aiChoice3 = 10;
						}
					}
				}

				if (this.vegeta.focus17 == false) {

					//VEGETA BASIC ATTACKS
					if ((attackHitTest(this.vegeta, this.android18) == true || app.main.vegeta.test == true && (app.main.android18.punching == true || app.main.android18.kicking == true) && app.main.android18.blasting == false) && this.aiChoice2 < 11 && this.aiChoice2 > .3 && this.vegeta.blocking == false && this.android18.behind == false && this.vegeta.hit == false && this.vegeta.hardHit == false && this.vegeta.test == false) {
						if (this.action == false) {
							//this.chance2 = Math.random();
							//console.log("BASIC");
							if (this.vegeta.exhausted == false) {
								this.vegeta.attacking = true;
								this.vegeta.fight = true;
								this.action = true;
							}
						}
					}
					//VEGETA HARD ATTACKS
					if ((hardAttackHitTest(this.vegeta, this.android18) == true && (this.vegeta.air == false || this.chance2 <= .5) || attackHitTest(this.vegeta, this.android18) == true && this.vegeta.air == true && this.chance2 > .5 || app.main.vegeta.test == true && (app.main.android18.punching == true || app.main.android18.kicking == true) && app.main.android18.blasting == false) && this.aiChoice2 < .3 && this.aiChoice2 > .05 && this.vegeta.blocking == false && this.android18.behind == false) {
						if (this.action == false) {
							//this.chance2 = Math.random();
							if (this.vegeta.exhausted == false) {
								this.vegeta.attacking = true;
								this.vegeta.fight = true;
								this.vegeta.hard = true;
								this.vegeta.intensify = true;
								this.action = true;
							}
						}
					}
				} else {
					//VEGETA BASIC ATTACKS -- FOCUS17
					if ((hardAttackHitTest(this.vegeta, this.android17) == true || app.main.vegeta.test == true && (app.main.android17.punching == true || app.main.android17.kicking == true) && app.main.android17.blasting == false) && this.aiChoice2 < 11 && this.aiChoice2 > .5 && this.vegeta.blocking == false && this.vegeta.hit == false && this.vegeta.hardHit == false && this.android17.behind == false) {
						if (this.action == false) {
							//this.chance2 = Math.random();
							//console.log("BASIC");
							if (this.vegeta.exhausted == false) {
								this.vegeta.attacking = true;
								this.vegeta.fight = true;
								this.action = true;
							}
						}
					}
					//VEGETA HARD ATTACKS -- FOCUS17
					if ((hardAttackHitTest(this.vegeta, this.android17) == true && (this.vegeta.air == false || this.chance2 <= .5) || attackHitTest(this.vegeta, this.android17) == true && this.vegeta.air == true && this.chance2 > .5 || app.main.vegeta.test == true && (app.main.android17.punching == true || app.main.android17.kicking == true) && app.main.android17.blasting == false) && this.aiChoice2 < .5 && this.aiChoice2 > .05 && this.vegeta.blocking == false && this.android17.behind == false) {
						if (this.action == false) {
							//this.chance2 = Math.random();
							if (this.vegeta.exhausted == false) {
								this.vegeta.attacking = true;
								this.vegeta.fight = true;
								this.vegeta.hard = true;
								this.vegeta.intensify = true;
								this.action = true;
							}
						}
					}
				}

				if (this.vegeta.position.y < this.android18.position.y + 100 && this.vegeta.position.y > this.android18.position.y - 100 || this.vegeta.position.y < this.android18.position.y + 100 && this.vegeta.position.y > this.android18.position.y - 100 && this.vegeta.focus17 == true && this.android17.behind == false) {

					//VEGETA ENERGY BLASTS
					if (attackHitTest(this.vegeta, this.android18) != true && attackHitTest(this.vegeta, this.android17) != true && this.aiChoice2 > .83 && this.aiChoice2 < .91 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.gero == false) {
						if (this.action == false) {
							this.action = true;
							if (this.vegeta.vegeta == true) {
								this.vegeta.specChance = Math.random();
								if (this.vegeta.specChance > .75) {
									if (this.android18.position.y < this.vegeta.position.y + 300 && this.android18.position.y > this.vegeta.position.y - 300) {
										if (this.android18.position.x < this.vegeta.position.x + 300 && this.android18.position.x > this.vegeta.position.x - 300) {
											this.vegeta.hits18 = true;
										}
									}
									if (this.android17.active == true) {
										if (this.android17.position.y < this.vegeta.position.y + 300 && this.android17.position.y > this.vegeta.position.y - 300) {
											if (this.android17.position.x < this.vegeta.position.x + 300 && this.android17.position.x > this.vegeta.position.x - 300) {
												this.vegeta.hits17 = true;
											}
										}
									}
									if ((this.vegeta.hits18 == true || this.vegeta.hits17 == true) && this.vegeta.specTimer > 50) {
										this.vegeta.unstoppable = true;
										this.vegeta.specMove = true;
										this.vegeta.specChance = 0;
									}
								} else {
									this.vegeta.specMove = false;
								}
							}
							app.main.aiChoice2 = 10;
							this.vegeta.attacking = true;
							this.vegeta.blasting = true;
							this.vegeta.fight = true;
						}
					}

					//VEGETA POWER ENERGY BLASTS
					if (attackHitTest(this.vegeta, this.android18) != true && attackHitTest(this.vegeta, this.android17) != true && this.aiChoice2 > .9 && this.aiChoice2 < 1 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.gero == false && this.cooldownAI > 100) {
						if (this.action == false && (this.vegeta.piccolo == false || this.vegeta.blastCount > 10)) {
							this.vegeta.blastCount = 0;
							this.action = true;
							app.main.aiChoice2 = 10;
							this.cooldownAI = 0;
							this.vegeta.powerMove = true;
							this.vegeta.attacking = true;
							this.vegeta.blasting = true;
							this.vegeta.fight = true;
						}
					}

					if (this.vegeta.piccolo == true) {
						//VEGETA POWER ENERGY BLASTS
						if (attackHitTest(this.vegeta, this.android18) != true && attackHitTest(this.vegeta, this.android17) != true && this.aiChoice2 > .9 && this.aiChoice2 < 1 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.gero == false && this.cooldownAI > 100) {
							if (this.action == false) {
								app.main.chance2 = .4;
								this.action = true;
								app.main.aiChoice2 = 10;
								this.cooldownAI = 0;
								this.vegeta.powerMove = true;
								this.vegeta.attacking = true;
								this.vegeta.blasting = true;
								this.vegeta.fight = true;
							}
						}
					}
				} else if (this.vegeta.position.y < this.android18.position.y + 100 && this.vegeta.position.y > this.android18.position.y - 100 || this.vegeta.position.y < this.android18.position.y + 100 && this.vegeta.position.y > this.android18.position.y - 100 && this.vegeta.focus17 == false && this.android18.behind == false) {

					//VEGETA ENERGY BLASTS
					if (attackHitTest(this.vegeta, this.android18) != true && attackHitTest(this.vegeta, this.android17) != true && this.aiChoice2 > .83 && this.aiChoice2 < .91 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.gero == false) {
						if (this.action == false) {
							this.action = true;
							if (this.vegeta.vegeta == true) {
								this.vegeta.specChance = Math.random();
								if (this.vegeta.specChance > .65) {
									if (this.android18.position.y < this.vegeta.position.y + 300 && this.android18.position.y > this.vegeta.position.y - 300) {
										if (this.android18.position.x < this.vegeta.position.x + 300 && this.android18.position.x > this.vegeta.position.x - 300) {
											this.vegeta.hits18 = true;
										}
									}
									if (this.android17.active == true) {
										if (this.android17.position.y < this.vegeta.position.y + 300 && this.android17.position.y > this.vegeta.position.y - 300) {
											if (this.android17.position.x < this.vegeta.position.x + 300 && this.android17.position.x > this.vegeta.position.x - 300) {
												this.vegeta.hits17 = true;
											}
										}
									}
									if ((this.vegeta.hits18 == true || this.vegeta.hits17 == true) && this.vegeta.specTimer > 50) {
										this.vegeta.unstoppable = true;
										this.vegeta.specMove = true;
										this.vegeta.specChance = 0;
									}
								} else {
									this.vegeta.specMove = false;
								}
							}
							app.main.aiChoice2 = 10;
							this.vegeta.attacking = true;
							this.vegeta.blasting = true;
							this.vegeta.fight = true;
						}
					}

					//VEGETA POWER ENERGY BLASTS
					if (attackHitTest(this.vegeta, this.android18) != true && attackHitTest(this.vegeta, this.android17) != true && this.aiChoice2 > .90 && this.aiChoice2 < 1 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.gero == false && this.cooldownAI > 100) {
						if (this.action == false && (this.vegeta.piccolo == false || this.vegeta.blastCount > 10)) {
							this.vegeta.blastCount = 0;
							this.action = true;
							app.main.aiChoice2 = 10;
							this.cooldownAI = 0;
							this.vegeta.powerMove = true;
							this.vegeta.attacking = true;
							this.vegeta.blasting = true;
							this.vegeta.fight = true;
						}
					}

					if (this.vegeta.piccolo == true) {
						//VEGETA POWER ENERGY BLASTS
						if (attackHitTest(this.vegeta, this.android18) != true && attackHitTest(this.vegeta, this.android17) != true && this.aiChoice2 > .95 && this.aiChoice2 < 1 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.gero == false && this.cooldownAI > 100) {
							if (this.action == false) {
								app.main.chance2 = .4;
								this.action = true;
								app.main.aiChoice2 = 10;
								this.cooldownAI = 0;
								this.vegeta.powerMove = true;
								this.vegeta.attacking = true;
								this.vegeta.blasting = true;
								this.vegeta.fight = true;
							}
						}
					}
				}

				if (this.vegeta.piccolo == true) {
					//VEGETA POWER ENERGY BLASTS
					if (attackHitTest(this.vegeta, this.android18) != true && attackHitTest(this.vegeta, this.android17) != true && this.aiChoice2 > .9 && this.aiChoice2 < 1 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.blastCount > 10 && this.vegeta.gero == false && this.cooldownAI > 100) {
						if (this.action == false) {
							app.main.chance2 = .6;
							this.vegeta.blastCount = 0;
							this.action = true;
							app.main.aiChoice2 = 10;
							this.cooldownAI = 0;
							this.vegeta.powerMove = true;
							this.vegeta.attacking = true;
							this.vegeta.blasting = true;
							this.vegeta.fight = true;
						}
					}

					//VEGETA ENERGY BLASTS
					if (attackHitTest(this.vegeta, this.android18) != true && attackHitTest(this.vegeta, this.android17) != true && this.aiChoice2 > .7 && this.aiChoice2 < .91 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.gero == false) {
						if (this.action == false) {
							this.action = true;
							this.vegeta.specChance = Math.random();
							if (this.vegeta.specChance > .65) {
								this.vegeta.specMove = true;
							} else {
								this.vegeta.specMove = false;
							}
							app.main.aiChoice2 = 10;
							this.vegeta.attacking = true;
							this.vegeta.blasting = true;
							this.vegeta.fight = true;
						}
					}
				}

				//VEGETA ATTACKING SUPER SPEED (TELEPORT)
				if ((this.aiChoice2 < .05 && (attackHitTest(this.vegeta, this.android18) == true || attackHitTest(this.vegeta, this.android17) == true) || this.aiChoice2 < .01 && attackHitTest(this.vegeta, this.android18) != true) && (this.vegeta.fight == false || this.vegeta.blocking == true) && this.vegeta.superSpeed == false && this.vegeta.stun == false && this.vegeta.end == false && this.vegeta.superSpeedExhaustion == false && this.vegeta.energy > 33) {
					if (this.action == false) {
						this.action = true;
						this.vegeta.superSpeed = true;
						this.vegeta.fight = true;
					}
				} else if (this.aiChoice2 < .05) {
					this.aiChoice2 = Math.random();
				}

				//VEGETA TAUNTING
				if (this.aiChoice2 < -1 && this.vegeta.fight == false && this.vegeta.taunting == false && this.vegeta.gero == false) {
					if (this.action == false) {
						this.action = true;
						this.vegeta.intensify = true;
						this.vegeta.taunting = true;
					}
				}
			}
			//VEGETA DEFENSIVE STATE --------------------------
			if (this.vegeta.defensive == true) {
				this.aiChangeTimer++;
				//console.log("DEF -- CHANGE: " + this.aiChangeTimer);
				//console.log("DEF -- BREAK: " + this.vegeta.defBreak);

				if (this.vegeta.superSpeedExhaustion == true) {
					this.vegeta.superSpeedExhaustion = false;
				}

				if (this.aiReason == 0) {
					this.aiReason = 3;
				}

				if ((this.vegeta.energy > 85 || hitTest(this.vegeta, this.android18)) && this.aiReason == 1) {
					this.aiChangeTimer = 0;
					this.vegeta.defBreak = 0;
					this.aiCharging = false;
					//this.aiReason = 0;
					this.vegeta.taunting = false;
					this.vegeta.charging = false;
					this.aiTaunting = false;
					this.aiCharging = false;
					this.vegeta.defensive = false;
					this.vegeta.aggressive = true;
				}
				if ((this.vegeta.stamina < 50 || hitTest(this.vegeta, this.android18)) && this.aiReason == 2) {
					this.aiChangeTimer = 0;
					this.vegeta.defBreak = 0;
					this.aiTaunting = false;
					//this.aiReason = 0;
					this.vegeta.taunting = false;
					this.vegeta.charging = false;
					this.aiTaunting = false;
					this.aiCharging = false;
					this.vegeta.defensive = false;
					this.vegeta.aggressive = true;
				}
				if ((this.aiChoice1 > .90 || hitTest(this.vegeta, this.android18)) && this.aiReason == 3) {
					this.aiChangeTimer = 0;
					this.vegeta.defBreak = 0;
					//this.aiReason = 0;
					this.vegeta.taunting = false;
					this.vegeta.charging = false;
					this.aiTaunting = false;
					this.aiCharging = false;
					this.aiChoice1 = Math.random();
					this.vegeta.defensive = false;
					this.vegeta.aggressive = true;
				}
				if (this.vegeta.defBreak > 2) {
					this.modeSwitch = 0;
					this.aiChangeTimer = 0;
					//this.aiReason = 0;
					this.vegeta.taunting = false;
					this.vegeta.charging = false;
					//console.log("DEFBREAKING");
					this.aiTaunting = false;
					this.aiCharging = false;
					this.vegeta.defBreak = 0;
					this.vegeta.defensive = false;
					this.vegeta.aggressive = true;
				}
				if (this.aiChangeTimer > 40) {
					this.modeSwitch = 0;
					this.aiChangeTimer = 0;
					//this.aiReason = 0;
					this.aiTaunting = false;
					this.aiCharging = false;
					this.vegeta.defBreak = 0;
					this.vegeta.defensive = false;
					this.vegeta.aggressive = true;
				}

				if (hardAttackHitTest(this.vegeta, this.android18) != true && hardAttackHitTest(this.vegeta, this.android17) != true) {
					this.aiChoice1 = Math.random();
					this.aiChoice2 = Math.random();
				}

				//Escape Double Trouble
				if (hardAttackHitTest(this.android18, this.vegeta) == true && hardAttackHitTest(this.android17, this.vegeta) == true && this.android17.encounter == true && this.aiChoice3 > .9) {
					/* if(this.vegeta.air == true && this.vegeta.position.y > this.vegeta.GROUND.y - 300){
     	this.vegeta.hover = false;
     	this.vegeta.flying = false;
     } else {
     	this.vegeta.flying = true;
     	this.vegeta.hover = false;
     } */
					if (this.vegeta.aboveBuilding == false) {
						this.vegeta.teleUp = true;
						this.vegeta.superSpeed = true;
					} else {
						this.vegeta.teleDown = true;
						this.vegeta.superSpeed = true;
					}
				}

				//Escape Corner Camp
				if ((hardAttackHitTest(this.android18, this.vegeta) == true || hardAttackHitTest(this.android17, this.vegeta) == true) && (this.vegeta.position.x < this.vegeta.LEFTWALL + 50 || this.vegeta.position.x > this.vegeta.RIGHTWALL - 50) && this.aiChoice3 > .7) {
					/* if(this.vegeta.air == true && this.vegeta.position.y > this.vegeta.GROUND.y - 300){
     	this.vegeta.hover = false;
     	this.vegeta.flying = false;
     } else {
     	this.vegeta.flying = true;
     	this.vegeta.hover = false;
     } */
					if (this.vegeta.aboveBuilding == false) {
						this.vegeta.teleUp = true;
						this.vegeta.superSpeed = true;
					} else {
						this.vegeta.teleDown = true;
						this.vegeta.superSpeed = true;
					}
				}

				if (this.aiReason != 3) {

					if (this.vegeta.focus17 == false) {

						if (this.vegeta.powerMove == false && this.scene == false) {
							if ((this.android18.position.x < this.vegeta.position.x - (350 + Math.round(getRandom(-50, 50))) || this.android18.position.x > this.vegeta.position.x + (350 + Math.round(getRandom(-50, 50)))) && this.vegeta.dodge == false) {
								if (this.aiReason == 1) {
									if (this.vegeta.energy < 100 && this.vegeta.stun == false) {
										this.vegeta.hover = false;
										this.aiCharging = true;
										this.vegeta.flying = false;
									} else {
										this.modeSwitch = 0;
										this.aiChangeTimer = 0;
										this.vegeta.defBreak = 0;
										//this.aiReason = 0;
										this.vegeta.taunting = false;
										this.vegeta.charging = false;
										this.aiTaunting = false;
										this.aiCharging = false;
										this.vegeta.defensive = false;
										this.vegeta.aggressive = true;
									}
								}
								if (this.aiReason == 2) {
									if (this.vegeta.stamina > 50 && this.vegeta.stun == false) {
										this.vegeta.hover = false;
										this.aiTaunting = true;
										this.vegeta.flying = false;
									} else {
										this.modeSwitch = 0;
										this.aiChangeTimer = 0;
										this.vegeta.defBreak = 0;
										//this.aiReason = 0;
										this.vegeta.taunting = false;
										this.vegeta.charging = false;
										this.aiTaunting = false;
										this.aiCharging = false;
										this.vegeta.defensive = false;
										this.vegeta.aggressive = true;
									}
								}
							} else {
								if (this.vegeta.position.x <= this.vegeta.LEFTWALL.x + 10 || this.vegeta.position.x >= this.vegeta.RIGHTWALL.x - 10 && this.vegeta.energy > 33 && this.aiChoice1 > .4 && this.vegeta.superSpeed == false) {
									if (this.action == false) {
										this.action = true;
										app.main.aiChoice3 = 10;
										this.vegeta.superSpeed = true;
										this.vegeta.fight = true;
										if (this.aiReason == 2) {
											this.aiTaunting = true;
										} else if (this.aiReason == 1) {
											this.aiCharging = true;
										}
									}
								}
								this.aiTaunting = false;
								this.aiCharging = false;
							}

							//VEGETA FLIGHT
							if ((this.vegeta.powerMove == false && this.vegeta.blasting == false || this.vegeta.vegeta == true) && this.scene == false) {
								if (this.android18.position.y + 10 >= this.vegeta.position.y && this.android18.position.y - 300 < this.vegeta.position.y && this.vegeta.taunting == false && this.vegeta.charging == false && this.vegeta.hard == false && this.vegeta.dodge == false && this.vegeta.hardHit == false && this.vegeta.stun == false && this.vegeta.aboveSky == false && this.aiReason != 3) {
									//console.log("NOT NOT NOT REASON 3");
									if (this.vegeta.attacking == false && this.vegeta.taunting == false && this.vegeta.charging == false && this.vegeta.blasting == false && this.vegeta.blocking == false) {
										this.vegeta.up = true;
									}
									this.vegeta.flying = true;
									this.vegeta.jump();
								} else {
									this.vegeta.hover = false;
									this.vegeta.flying = false;
									this.vegeta.up = false;
									if (this.android18.position.y - 50 > this.vegeta.position.y) {
										this.vegeta.aboveBuilding = false;
										//this.vegeta.air = true;
									}
									//this.vegeta.down = true;
								}
							}
						}
					} else {
						//FOCUS17 version

						if (this.vegeta.powerMove == false && this.scene == false) {
							if ((this.android17.position.x < this.vegeta.position.x - (350 + Math.round(getRandom(-50, 50))) || this.android17.position.x > this.vegeta.position.x + (350 + Math.round(getRandom(-50, 50)))) && this.vegeta.dodge == false) {
								if (this.aiReason == 1) {
									if (this.vegeta.energy < 100 && this.vegeta.stun == false) {
										this.vegeta.hover = false;
										this.aiCharging = true;
										this.vegeta.flying = false;
									} else {
										this.modeSwitch = 0;
										this.aiChangeTimer = 0;
										this.vegeta.defBreak = 0;
										//this.aiReason = 0;
										this.vegeta.taunting = false;
										this.vegeta.charging = false;
										this.aiTaunting = false;
										this.aiCharging = false;
										this.vegeta.defensive = false;
										this.vegeta.aggressive = true;
									}
								}
								if (this.aiReason == 2) {
									if (this.vegeta.stamina > 50 && this.vegeta.stun == false) {
										this.vegeta.hover = false;
										this.aiTaunting = true;
										this.vegeta.flying = false;
									} else {
										this.modeSwitch = 0;
										this.aiChangeTimer = 0;
										this.vegeta.defBreak = 0;
										//this.aiReason = 0;
										this.vegeta.taunting = false;
										this.vegeta.charging = false;
										this.aiTaunting = false;
										this.aiCharging = false;
										this.vegeta.defensive = false;
										this.vegeta.aggressive = true;
									}
								}
							} else {
								if (this.vegeta.position.x <= this.vegeta.LEFTWALL.x + 10 || this.vegeta.position.x >= this.vegeta.RIGHTWALL.x - 10 && this.vegeta.energy > 33 && this.aiChoice1 > .4 && this.vegeta.superSpeed == false) {
									if (this.action == false) {
										this.action = true;
										app.main.aiChoice3 = 10;
										this.vegeta.superSpeed = true;
										this.vegeta.fight = true;
										if (this.aiReason == 2) {
											this.aiTaunting = true;
										} else if (this.aiReason == 1) {
											this.aiCharging = true;
										}
									}
								}
								this.aiTaunting = false;
								this.aiCharging = false;
							}

							//VEGETA FLIGHT -- FOCUS17
							if ((this.vegeta.powerMove == false && this.vegeta.blasting == false || this.vegeta.vegeta == true) && this.scene == false) {
								if (this.android17.position.y + 10 >= this.vegeta.position.y && this.android17.position.y - 300 < this.vegeta.position.y && this.vegeta.taunting == false && this.vegeta.charging == false && this.vegeta.hard == false && this.vegeta.dodge == false && this.vegeta.hardHit == false && this.vegeta.stun == false && this.vegeta.aboveSky == false && this.aiReason != 3) {
									//console.log("NOT NOT NOT REASON 3");
									if (this.vegeta.attacking == false && this.vegeta.taunting == false && this.vegeta.charging == false && this.vegeta.blasting == false && this.vegeta.blocking == false) {
										this.vegeta.up = true;
									}
									this.vegeta.flying = true;
									this.vegeta.jump();
								} else {
									this.vegeta.hover = false;
									this.vegeta.flying = false;
									this.vegeta.up = false;
									if (this.android17.position.y - 50 > this.vegeta.position.y) {
										this.vegeta.aboveBuilding = false;
										//this.vegeta.air = true;
									}
									//this.vegeta.down = true;
								}
							}
						}
					}
				}

				//VEGETA MOVEMENT
				if (this.vegeta.hard == false && this.vegeta.powerMove == false && this.vegeta.taunting == false && (this.vegeta.vegeta == false || this.vegeta.specMove == false) && this.vegeta.charging == false) {
					if (this.vegeta.right == true && this.vegeta.position.x > this.vegeta.LEFTWALL.x) {
						this.vegeta.moveLeft();
					} else if (this.vegeta.left == true && this.vegeta.position.x < this.vegeta.RIGHTWALL.x) {
						this.vegeta.moveRight();
					}
				}

				//VEGETA TAUNTING
				if (this.aiTaunting == true && this.vegeta.fight == false && this.vegeta.taunting == false) {
					if (this.action == false) {
						//this.aiTaunting = false;
						this.action = true;
						this.vegeta.flying = false;
						this.vegeta.decel.x = 0;
						this.vegeta.intensify = true;
						this.vegeta.taunting = true;
					}
				}
				//VEGETA CHARGING
				if (this.aiCharging == true && this.vegeta.fight == false && this.vegeta.charging == false) {
					if (this.action == false) {
						//this.aiCharging = false;
						this.action = true;
						this.vegeta.flying = false;
						this.vegeta.decel.x = 0;
						this.vegeta.intensify = true;
						this.vegeta.charging = true;
					}
				}

				//VEGETA DEFENDING SUPER SPEED (TELEPORT)
				/* if(this.aiChoice3 < .15 && this.vegeta.blasting == false && this.vegeta.superSpeed == false && this.vegeta.end == false && this.vegeta.superSpeedExhaustion == false && this.vegeta.energy > 40){
    	if(this.action == false){
    		this.aiChoice3 = 10;
    		this.action = true;
    		if(this.vegeta.aboveBuilding == false){
    			this.vegeta.teleUp = true;
    		} else {
    			this.vegeta.teleDown = true;
    		}
    		this.vegeta.superSpeed = true;
    		this.vegeta.fight = true;
    	}
    } else if(this.aiChoice3 < .15){
    	this.aiChoice3 = 10;
    } */

				if (this.vegeta.focus17 == false) {

					if (this.aiReason == 3) {
						if (this.vegeta.powerMove == false && this.scene == false) {
							//VEGETA FLIGHT -- Normal
							if (this.android18.position.y <= this.vegeta.position.y && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.dodge == false && this.vegeta.hardHit == false && this.vegeta.stun == false && this.vegeta.end == false && this.vegeta.position.y > this.vegeta.SKYTOP.y + 6) {
								//console.log("REASON 3");
								if (this.vegeta.attacking == false && this.vegeta.taunting == false && this.vegeta.charging == false && this.vegeta.blasting == false && this.vegeta.blocking == false) {
									this.vegeta.up = true;
								}
								this.vegeta.flying = true;
								this.vegeta.jump();
							} else {
								this.vegeta.hover = false;
								this.vegeta.flying = false;
								this.vegeta.up = false;
								if (this.android18.position.y - 50 > this.vegeta.position.y) {
									this.vegeta.aboveBuilding = false;
									//this.vegeta.air = true;
								}
								//this.vegeta.down = true;
							}
						}
					}

					//VEGETA BLOCKING
					/* if(this.aiChoice3 < .5 && this.aiChoice3 > .15 && this.vegeta.fight == false && this.vegeta.taunting == false && this.vegeta.exhausted == false){
     	if(this.action == false){
     		this.action = true;
     		this.aiChoice3 = 10;
     		this.vegeta.blocking = true;
     		if(attackHitTest(this.android18, this.vegeta) == true && (this.android18.basic == true || this.android18.punching == true || this.android18.kicking == true) ){
     			//this.vegeta.stamina += 1;
     		}
     		if(this.android18.attacking == false){
     			this.vegeta.blocking = false;
     		}
     	}
     } */

					if (this.vegeta.vegeta == true) {
						console.log("working");
						//VEGETA BLOCKING -- FOCUS 17
						if (this.aiChoice3 < .5 && this.aiChoice3 > .3 && this.vegeta.fight == false && this.vegeta.taunting == false && this.vegeta.exhausted == false && this.vegeta.end == false && hardAttackHitTest(this.android17, this.vegeta) == true && this.vegeta.gero == false) {
							if (this.action == false) {
								this.action = true;
								this.aiChoice3 = 10;
								this.vegeta.blocking = true;
								if (attackHitTest(this.android17, this.vegeta) == true && (this.android17.basic == true || this.android17.punching == true || this.android17.kicking == true) && this.android17.attacking == true) {
									//this.vegeta.stamina += 1;
								}
								if (this.android17.attacking == false || hardAttackHitTest(this.android17, this.vegeta) != true) {
									this.vegeta.blocking = false;
								}
							}
						}

						//VEGETA DEFENDING SUPER SPEED (TELEPORT)
						if (this.aiChoice3 < .3 && this.aiChoice3 > .2 && this.vegeta.blasting == false && this.vegeta.superSpeed == false && this.vegeta.end == false && this.vegeta.superSpeedExhaustion == false && this.vegeta.energy > 40) {
							if (this.action == false) {
								if (this.vegeta.vegeta == true) {
									this.vegeta.specChance = Math.random();
									if (this.vegeta.specChance > -1) {
										if (this.android18.position.y < this.vegeta.position.y + 300 && this.android18.position.y > this.vegeta.position.y - 300) {
											if (this.android18.position.x < this.vegeta.position.x + 300 && this.android18.position.x > this.vegeta.position.x - 300) {
												this.vegeta.hits18 = true;
											}
										}
										if (this.android17.active == true) {
											if (this.android17.position.y < this.vegeta.position.y + 300 && this.android17.position.y > this.vegeta.position.y - 300) {
												if (this.android17.position.x < this.vegeta.position.x + 300 && this.android17.position.x > this.vegeta.position.x - 300) {
													this.vegeta.hits17 = true;
												}
											}
										}
										if ((this.vegeta.hits18 == true || this.vegeta.hits17 == true) && this.vegeta.specTimer > 50) {
											this.vegeta.unstoppable = true;
											this.vegeta.specMove = true;
											this.vegeta.specChance = 0;
										}
										this.vegeta.attacking = true;
										this.vegeta.blasting = true;
										this.vegeta.fight = true;
										this.aiChoice3 = 10;
										this.action = true;
									}
								}
							}
						}

						//VEGETA DEFENDING SUPER SPEED (TELEPORT)
						if (this.aiChoice3 < .2 && this.vegeta.blasting == false && this.vegeta.superSpeed == false && this.vegeta.end == false && this.vegeta.superSpeedExhaustion == false && this.vegeta.energy > 40) {
							if (this.action == false) {
								this.aiChoice3 = 10;
								this.action = true;
								if (this.vegeta.aboveBuilding == false) {
									this.vegeta.teleUp = true;
								} else {
									this.vegeta.teleDown = true;
								}
								this.vegeta.superSpeed = true;
								this.vegeta.fight = true;
							}
						} else if (this.aiChoice3 < .2) {
							this.aiChoice3 = 10;
						}
					} else {

						//VEGETA BLOCKING
						if (this.aiChoice3 < .5 && this.aiChoice3 > .15 && this.vegeta.fight == false && this.vegeta.taunting == false && this.vegeta.exhausted == false && this.vegeta.end == false && hardAttackHitTest(this.android17, this.vegeta) == true && this.vegeta.gero == false) {
							if (this.action == false) {
								this.action = true;
								this.aiChoice3 = 10;
								this.vegeta.blocking = true;
								if (attackHitTest(this.android17, this.vegeta) == true && (this.android17.basic == true || this.android17.punching == true || this.android17.kicking == true) && this.android17.attacking == true) {
									//this.vegeta.stamina += 1;
								}
								if (this.android17.attacking == false || hardAttackHitTest(this.android17, this.vegeta) != true) {
									this.vegeta.blocking = false;
								}
							}
						}

						//VEGETA DEFENDING SUPER SPEED (TELEPORT)
						if (this.aiChoice3 < .15 && this.vegeta.blasting == false && this.vegeta.superSpeed == false && this.vegeta.end == false && this.vegeta.superSpeedExhaustion == false && this.vegeta.energy > 40) {
							if (this.action == false) {
								this.aiChoice3 = 10;
								this.action = true;
								if (this.vegeta.aboveBuilding == false) {
									this.vegeta.teleUp = true;
								} else {
									this.vegeta.teleDown = true;
								}
								this.vegeta.superSpeed = true;
								this.vegeta.fight = true;
							}
						} else if (this.aiChoice3 < .15) {
							this.aiChoice3 = 10;
						}
					}

					//VEGETA HARD ATTACKS
					if ((hardAttackHitTest(this.vegeta, this.android18) == true && (this.vegeta.air == false || this.chance2 <= .5) || attackHitTest(this.vegeta, this.android18) == true && this.vegeta.air == true && this.chance2 > .5 || app.main.vegeta.test == true && (app.main.android18.punching == true || app.main.android18.kicking == true) && app.main.android18.blasting == false) && this.aiChoice2 < .3 && this.aiChoice2 > 0 && this.vegeta.blocking == false && this.android18.behind == false) {
						if (this.action == false) {
							//this.chance2 = Math.random();
							if (this.vegeta.exhausted == false) {
								this.vegeta.attacking = true;
								this.vegeta.fight = true;
								this.vegeta.hard = true;
								this.vegeta.intensify = true;
								this.action = true;
							}
						}
					}

					//VEGETA BASIC ATTACKS
					if ((attackHitTest(this.vegeta, this.android18) == true || app.main.vegeta.test == true && (app.main.android18.punching == true || app.main.android18.kicking == true) && app.main.android18.blasting == false) && this.aiChoice2 < 11 && this.aiChoice2 > .3 && this.vegeta.blocking == false && this.vegeta.hit == false && this.vegeta.hardHit == false && this.android18.behind == false) {
						if (this.action == false) {
							//this.chance2 = Math.random();
							//console.log("BASIC");
							if (this.vegeta.exhausted == false) {
								this.vegeta.attacking = true;
								this.vegeta.fight = true;
								this.action = true;
							}
						}
					}

					if (this.vegeta.powerMove == false && this.scene == false) {
						if (this.dodgeChance > .4) {

							//VEGETA FLIGHT DODGE

							if ((this.android18.blasting == true && this.android18.counter > 0 && this.android18.position.y - 100 < this.vegeta.position.y || this.android17.blasting == true && this.android17.counter > 0 && this.android17.position.y - 100 < this.vegeta.position.y) && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.stun == false && this.vegeta.aboveSky == false && this.vegeta.blasting == false && this.vegeta.end == false) {
								this.vegeta.dodge = true;
								this.vegeta.flying = true;
								this.vegeta.jump();
							} else if ((this.android18.blasting == true && this.android18.counter > 0 && this.android18.position.y + 100 > this.vegeta.position.y || this.android17.blasting == true && this.android17.counter > 0 && this.android17.position.y + 100 > this.vegeta.position.y) && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.stun == false && this.vegeta.aboveSky == true && this.vegeta.end == false) {
								this.vegeta.hover = false;
								this.vegeta.dodge = true;
								this.vegeta.flying = false;
								this.vegeta.up = false;
								//this.vegeta.down = true;
							} else {
								this.vegeta.dodge = false;
							}
						} else if (this.dodgeChance < .4 && this.dodgeChance > .2 && this.vegeta.superSpeed == false) {
							if ((this.android18.blasting == true || this.android17.blasting == true) && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.stun == false && this.vegeta.dodge == false && this.vegeta.energy > 33) {
								this.dodgeChance = 0;
								this.vegeta.dodge = true;
								this.vegeta.superSpeed = true;
							}
						}
					}
				} else {
					// 17 Version
					if (this.vegeta.powerMove == false && this.scene == false) {
						if (this.aiReason == 3) {
							//VEGETA FLIGHT -- Normal -- FOCUS17
							if (this.android17.position.y <= this.vegeta.position.y && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.dodge == false && this.vegeta.hardHit == false && this.vegeta.stun == false && this.vegeta.end == false && this.vegeta.position.y > this.vegeta.SKYTOP.y + 6) {
								//console.log("REASON 3");
								if (this.vegeta.attacking == false && this.vegeta.taunting == false && this.vegeta.charging == false && this.vegeta.blasting == false && this.vegeta.blocking == false) {
									this.vegeta.up = true;
								}
								this.vegeta.flying = true;
								this.vegeta.jump();
							} else {
								this.vegeta.hover = false;
								this.vegeta.flying = false;
								if (this.android17.position.y - 50 > this.vegeta.position.y) {
									this.vegeta.aboveBuilding = false;
									//this.vegeta.air = true;
								}
								//this.vegeta.down = true;
							}
						}
					}

					//VEGETA BLOCKING -- FOCUS17
					/* if(this.aiChoice3 < .6 && this.aiChoice3 > .15 && this.vegeta.fight == false && this.vegeta.taunting == false && this.vegeta.exhausted == false){
     	if(this.action == false){
     		this.action = true;
     		this.aiChoice3 = 10;
     		this.vegeta.blocking = true;
     		if(attackHitTest(this.android17, this.vegeta) == true && (this.android17.basic == true || this.android17.punching == true || this.android17.kicking == true) ){
     			//this.vegeta.stamina += 1;
     		}
     		if(this.android17.attacking == false){
     			this.vegeta.blocking = false;
     		}
     	}
     } */

					if (this.vegeta.vegeta == true) {
						console.log("working");
						//VEGETA BLOCKING -- FOCUS 17
						if (this.aiChoice3 < .6 && this.aiChoice3 > .3 && this.vegeta.fight == false && this.vegeta.taunting == false && this.vegeta.exhausted == false && this.vegeta.end == false && hardAttackHitTest(this.android17, this.vegeta) == true && this.vegeta.gero == false) {
							if (this.action == false) {
								this.action = true;
								this.aiChoice3 = 10;
								this.vegeta.blocking = true;
								if (attackHitTest(this.android17, this.vegeta) == true && (this.android17.basic == true || this.android17.punching == true || this.android17.kicking == true) && this.android17.attacking == true) {
									//this.vegeta.stamina += 1;
								}
								if (this.android17.attacking == false || hardAttackHitTest(this.android17, this.vegeta) != true) {
									this.vegeta.blocking = false;
								}
							}
						}

						//VEGETA DEFENDING SUPER SPEED (TELEPORT)
						if (this.aiChoice3 < .3 && this.aiChoice3 > .2 && this.vegeta.blasting == false && this.vegeta.superSpeed == false && this.vegeta.end == false && this.vegeta.superSpeedExhaustion == false && this.vegeta.energy > 40) {
							if (this.action == false) {
								if (this.vegeta.vegeta == true) {
									this.vegeta.specChance = Math.random();
									if (this.vegeta.specChance > -1) {
										if (this.android18.position.y < this.vegeta.position.y + 300 && this.android18.position.y > this.vegeta.position.y - 300) {
											if (this.android18.position.x < this.vegeta.position.x + 300 && this.android18.position.x > this.vegeta.position.x - 300) {
												this.vegeta.hits18 = true;
											}
										}
										if (this.android17.active == true) {
											if (this.android17.position.y < this.vegeta.position.y + 300 && this.android17.position.y > this.vegeta.position.y - 300) {
												if (this.android17.position.x < this.vegeta.position.x + 300 && this.android17.position.x > this.vegeta.position.x - 300) {
													this.vegeta.hits17 = true;
												}
											}
										}
										if ((this.vegeta.hits18 == true || this.vegeta.hits17 == true) && this.vegeta.specTimer > 50) {
											this.vegeta.unstoppable = true;
											this.vegeta.specMove = true;
											this.vegeta.specChance = 0;
										}
										this.vegeta.attacking = true;
										this.vegeta.blasting = true;
										this.vegeta.fight = true;
										this.aiChoice3 = 10;
										this.action = true;
									}
								}
							}
						}

						//VEGETA DEFENDING SUPER SPEED (TELEPORT)
						if (this.aiChoice3 < .2 && this.vegeta.blasting == false && this.vegeta.superSpeed == false && this.vegeta.end == false && this.vegeta.superSpeedExhaustion == false && this.vegeta.energy > 40) {
							if (this.action == false) {
								this.aiChoice3 = 10;
								this.action = true;
								if (this.vegeta.aboveBuilding == false) {
									this.vegeta.teleUp = true;
								} else {
									this.vegeta.teleDown = true;
								}
								this.vegeta.superSpeed = true;
								this.vegeta.fight = true;
							}
						} else if (this.aiChoice3 < .2) {
							this.aiChoice3 = 10;
						}
					} else {

						//VEGETA BLOCKING -- FOCUS 17
						if (this.aiChoice3 < .6 && this.aiChoice3 > .15 && this.vegeta.fight == false && this.vegeta.taunting == false && this.vegeta.exhausted == false && this.vegeta.end == false && hardAttackHitTest(this.android17, this.vegeta) == true && this.vegeta.gero == false) {
							if (this.action == false) {
								this.action = true;
								this.aiChoice3 = 10;
								this.vegeta.blocking = true;
								if (attackHitTest(this.android17, this.vegeta) == true && (this.android17.basic == true || this.android17.punching == true || this.android17.kicking == true) && this.android17.attacking == true) {
									//this.vegeta.stamina += 1;
								}
								if (this.android17.attacking == false || hardAttackHitTest(this.android17, this.vegeta) != true) {
									this.vegeta.blocking = false;
								}
							}
						}

						//VEGETA DEFENDING SUPER SPEED (TELEPORT)
						if (this.aiChoice3 < .15 && this.vegeta.blasting == false && this.vegeta.superSpeed == false && this.vegeta.end == false && this.vegeta.superSpeedExhaustion == false && this.vegeta.energy > 40) {
							if (this.action == false) {
								this.aiChoice3 = 10;
								this.action = true;
								if (this.vegeta.aboveBuilding == false) {
									this.vegeta.teleUp = true;
								} else {
									this.vegeta.teleDown = true;
								}
								this.vegeta.superSpeed = true;
								this.vegeta.fight = true;
							}
						} else if (this.aiChoice3 < .15) {
							this.aiChoice3 = 10;
						}
					}

					if (this.vegeta.powerMove == false && this.scene == false) {
						if (this.dodgeChance > .4) {

							//VEGETA FLIGHT DODGE
							if (this.vegeta.powerMove == false) {
								if ((this.android17.blasting == true && this.android17.counter > 0 && this.android17.position.y - 100 < this.vegeta.position.y || this.android17.blasting == true && this.android17.counter > 0 && this.android17.position.y - 100 < this.vegeta.position.y) && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.stun == false && this.vegeta.aboveSky == false && this.vegeta.blasting == false && this.vegeta.end == false) {
									this.vegeta.dodge = true;
									this.vegeta.flying = true;
									this.vegeta.jump();
								} else if ((this.android17.blasting == true && this.android17.counter > 0 && this.android17.position.y + 100 > this.vegeta.position.y || this.android17.blasting == true && this.android17.counter > 0 && this.android17.position.y + 100 > this.vegeta.position.y) && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.stun == false && this.vegeta.aboveSky == true && this.vegeta.end == false) {
									this.vegeta.hover = false;
									this.vegeta.dodge = true;
									this.vegeta.flying = false;
									this.vegeta.up = false;
									//this.vegeta.down = true;
								} else {
									this.vegeta.dodge = false;
								}
							}
						} else if (this.dodgeChance < .4 && this.dodgeChance > .2 && this.vegeta.superSpeed == false) {
							if ((this.android17.blasting == true || this.android17.blasting == true) && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.stun == false && this.vegeta.dodge == false && this.vegeta.energy > 33) {
								this.dodgeChance = 0;
								this.vegeta.dodge = true;
								this.vegeta.superSpeed = true;
							}
						}
					}

					//VEGETA BASIC ATTACKS -- FOCUS17
					if ((hardAttackHitTest(this.vegeta, this.android17) == true || app.main.vegeta.test == true && (app.main.android17.punching == true || app.main.android17.kicking == true) && app.main.android17.blasting == false) && this.aiChoice2 < 11 && this.aiChoice2 > .45 && this.vegeta.blocking == false && this.vegeta.hit == false && this.vegeta.hardHit == false && this.android17.behind == false) {
						if (this.action == false) {
							//this.chance2 = Math.random();
							//console.log("BASIC");
							if (this.vegeta.exhausted == false) {
								this.vegeta.attacking = true;
								this.vegeta.fight = true;
								this.action = true;
							}
						}
					}

					//VEGETA HARD ATTACKS -- FOCUS17
					if ((hardAttackHitTest(this.vegeta, this.android18) == true && (this.vegeta.air == false || this.chance2 <= .5) || attackHitTest(this.vegeta, this.android18) == true && this.vegeta.air == true && this.chance2 > .5 || app.main.vegeta.test == true && (app.main.android17.punching == true || app.main.android17.kicking == true) && app.main.android17.blasting == false) && this.aiChoice2 < .45 && this.aiChoice2 > 0 && this.vegeta.blocking == false && this.android17.behind == false) {
						if (this.action == false) {
							//this.chance2 = Math.random();
							if (this.vegeta.exhausted == false) {
								this.vegeta.attacking = true;
								this.vegeta.fight = true;
								this.vegeta.hard = true;
								this.vegeta.intensify = true;
								this.action = true;
							}
						}
					}
				}

				if (this.vegeta.position.y < this.android18.position.y + 100 && this.vegeta.position.y > this.android18.position.y - 100 || this.vegeta.position.y < this.android18.position.y + 100 && this.vegeta.position.y > this.android18.position.y - 100 && this.vegeta.focus17 == true && this.android17.behind == false) {

					//VEGETA ENERGY BLASTS
					if (attackHitTest(this.vegeta, this.android18) != true && attackHitTest(this.vegeta, this.android17) != true && this.aiChoice2 > .83 && this.aiChoice2 < .91 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.gero == false) {
						if (this.action == false) {
							this.action = true;
							if (this.vegeta.vegeta == true) {
								this.vegeta.specChance = Math.random();
								if (this.vegeta.specChance > .65) {
									if (this.android18.position.y < this.vegeta.position.y + 300 && this.android18.position.y > this.vegeta.position.y - 300) {
										if (this.android18.position.x < this.vegeta.position.x + 300 && this.android18.position.x > this.vegeta.position.x - 300) {
											this.vegeta.hits18 = true;
										}
									}
									if (this.android17.active == true) {
										if (this.android17.position.y < this.vegeta.position.y + 300 && this.android17.position.y > this.vegeta.position.y - 300) {
											if (this.android17.position.x < this.vegeta.position.x + 300 && this.android17.position.x > this.vegeta.position.x - 300) {
												this.vegeta.hits17 = true;
											}
										}
									}
									if ((this.vegeta.hits18 == true || this.vegeta.hits17 == true) && this.vegeta.specTimer > 50) {
										this.vegeta.unstoppable = true;
										this.vegeta.specMove = true;
										this.vegeta.specChance = 0;
									}
								} else {
									this.vegeta.specMove = false;
								}
							}
							app.main.aiChoice2 = 10;
							this.vegeta.attacking = true;
							this.vegeta.blasting = true;
							this.vegeta.fight = true;
						}
					}

					//VEGETA POWER ENERGY BLASTS
					if (attackHitTest(this.vegeta, this.android18) != true && attackHitTest(this.vegeta, this.android17) != true && this.aiChoice2 > .9 && this.aiChoice2 < 1 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.gero == false && this.cooldownAI > 100) {
						if (this.action == false && (this.vegeta.piccolo == false || this.vegeta.blastCount > 10)) {
							this.vegeta.blastCount = 0;
							this.action = true;
							app.main.aiChoice2 = 10;
							this.cooldownAI = 0;
							this.vegeta.powerMove = true;
							this.vegeta.attacking = true;
							this.vegeta.blasting = true;
							this.vegeta.fight = true;
						}
					}

					if (this.vegeta.piccolo == true) {
						//VEGETA POWER ENERGY BLASTS
						if (attackHitTest(this.vegeta, this.android18) != true && attackHitTest(this.vegeta, this.android17) != true && this.aiChoice2 > .95 && this.aiChoice2 < 1 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.gero == false && this.cooldownAI > 100) {
							if (this.action == false) {
								app.main.chance2 = .4;
								this.action = true;
								app.main.aiChoice2 = 10;
								this.cooldownAI = 0;
								this.vegeta.powerMove = true;
								this.vegeta.attacking = true;
								this.vegeta.blasting = true;
								this.vegeta.fight = true;
							}
						}
					}
				} else if (this.vegeta.position.y < this.android18.position.y + 100 && this.vegeta.position.y > this.android18.position.y - 100 || this.vegeta.position.y < this.android18.position.y + 100 && this.vegeta.position.y > this.android18.position.y - 100 && this.vegeta.focus17 == false && this.android18.behind == false) {

					//VEGETA ENERGY BLASTS
					if (attackHitTest(this.vegeta, this.android18) != true && attackHitTest(this.vegeta, this.android17) != true && this.aiChoice2 > .83 && this.aiChoice2 < .91 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.gero == false) {
						if (this.action == false) {
							this.action = true;
							if (this.vegeta.vegeta == true) {
								this.vegeta.specChance = Math.random();
								if (this.vegeta.specChance > .65) {
									if (this.android18.position.y < this.vegeta.position.y + 300 && this.android18.position.y > this.vegeta.position.y - 300) {
										if (this.android18.position.x < this.vegeta.position.x + 300 && this.android18.position.x > this.vegeta.position.x - 300) {
											this.vegeta.hits18 = true;
										}
									}
									if (this.android17.active == true) {
										if (this.android17.position.y < this.vegeta.position.y + 300 && this.android17.position.y > this.vegeta.position.y - 300) {
											if (this.android17.position.x < this.vegeta.position.x + 300 && this.android17.position.x > this.vegeta.position.x - 300) {
												this.vegeta.hits17 = true;
											}
										}
									}
									if ((this.vegeta.hits18 == true || this.vegeta.hits17 == true) && this.vegeta.specTimer > 50) {
										this.vegeta.unstoppable = true;
										this.vegeta.specMove = true;
										this.vegeta.specChance = 0;
									}
								} else {
									this.vegeta.specMove = false;
								}
							}
							app.main.aiChoice2 = 10;
							this.vegeta.attacking = true;
							this.vegeta.blasting = true;
							this.vegeta.fight = true;
						}
					}

					//VEGETA POWER ENERGY BLASTS
					if (attackHitTest(this.vegeta, this.android18) != true && attackHitTest(this.vegeta, this.android17) != true && this.aiChoice2 > .9 && this.aiChoice2 < 1 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.gero == false && this.cooldownAI > 100) {
						if (this.action == false && (this.vegeta.piccolo == false || this.vegeta.blastCount > 10)) {
							this.vegeta.blastCount = 0;
							this.action = true;
							app.main.aiChoice2 = 10;
							this.cooldownAI = 0;
							this.vegeta.powerMove = true;
							this.vegeta.attacking = true;
							this.vegeta.blasting = true;
							this.vegeta.fight = true;
						}
					}

					if (this.vegeta.piccolo == true) {
						//VEGETA POWER ENERGY BLASTS
						if (attackHitTest(this.vegeta, this.android18) != true && attackHitTest(this.vegeta, this.android17) != true && this.aiChoice2 > .95 && this.aiChoice2 < 1 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.gero == false && this.cooldownAI > 100) {
							if (this.action == false) {
								app.main.chance2 = .4;
								this.action = true;
								app.main.aiChoice2 = 10;
								this.cooldownAI = 0;
								this.vegeta.powerMove = true;
								this.vegeta.attacking = true;
								this.vegeta.blasting = true;
								this.vegeta.fight = true;
							}
						}
					}
				}

				if (this.vegeta.piccolo == true) {
					//VEGETA POWER ENERGY BLASTS
					if (attackHitTest(this.vegeta, this.android18) != true && attackHitTest(this.vegeta, this.android17) != true && this.aiChoice2 > .9 && this.aiChoice2 < 1 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.blastCount > 10 && this.vegeta.gero == false && this.cooldownAI > 100) {
						if (this.action == false) {
							app.main.chance2 = .6;
							this.vegeta.blastCount = 0;
							this.action = true;
							app.main.aiChoice2 = 10;
							this.cooldownAI = 0;
							this.vegeta.powerMove = true;
							this.vegeta.attacking = true;
							this.vegeta.blasting = true;
							this.vegeta.fight = true;
						}
					}

					//VEGETA ENERGY BLASTS
					if (attackHitTest(this.vegeta, this.android18) != true && attackHitTest(this.vegeta, this.android17) != true && this.aiChoice2 > .65 && this.aiChoice2 < .91 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.gero == false) {
						if (this.action == false) {
							this.action = true;
							this.vegeta.specChance = Math.random();
							if (this.vegeta.specChance > .65) {
								this.vegeta.specMove = true;
							} else {
								this.vegeta.specMove = false;
							}
							app.main.aiChoice2 = 10;
							this.vegeta.attacking = true;
							this.vegeta.blasting = true;
							this.vegeta.fight = true;
						}
					}
				}

				//VEGETA ATTACKING SUPER SPEED (TELEPORT)
				/*
    if(((this.aiChoice2 < .15 && attackHitTest(this.vegeta,this.android18) == true) || (this.aiChoice2 < .01 && attackHitTest(this.vegeta,this.android18) != true)) && (this.vegeta.fight == false || this.vegeta.blocking == true) && this.vegeta.superSpeed == false && this.vegeta.energy > 33){
    	if(this.action == false){
    		app.main.aiChoice2 = 10;
    		this.action = true;
    		this.vegeta.superSpeed = true;
    		this.vegeta.fight = true;
    	}
    } else if(this.aiChoice2 < .15 && (this.vegeta.fight == false || this.vegeta.blocking == true) && this.vegeta.superSpeed == false && this.vegeta.energy < 34){
    	this.aiChoice2 = 10;
    }
    */
			}
		}
		if (this.activeSupport == true) {
			for (var x = 0; x < 2; x++) {
				// ------SUPPORT AI CONTROL------ 
				if (this.support[x].stun == false && this.support[x].end == false) {
					if (hardAttackHitTest(this.android18, this.support[x]) == true && (this.android18.punching == true || this.android18.kicking == true)) {
						this.aiChoiceSupport2 = Math.random();
					} else if (attackHitTest(this.android18, this.support[x]) == true && this.android18.basic == true) {
						this.aiChoiceSupport2 = Math.random();
					}

					if (hardAttackHitTest(this.android17, this.support[x]) == true && (this.android17.punching == true || this.android17.kicking == true)) {
						this.aiChoiceSupport2 = Math.random();
					} else if (attackHitTest(this.android17, this.support[x]) == true && this.android17.basic == true) {
						this.aiChoiceSupport2 = Math.random();
					}
					/*
     if(hitTest(this.support[x],this.android18)){
     	if(this.android18.left == true){
     		this.support[x].position.x -=1;
     	} else {
     		this.support[x].position.x += 1;
     	}
     } else if(hitTest(this.support[x],this.android17)){
     	if(this.android17.left == true){
     		this.support[x].position.x -=1;
     	} else {
     		this.support[x].position.x += 1;
     	}
     }
     */
					this.cooldownAI2++;
					this.cooldownAI3++;
					//VEGETA AGGRESSIVE STATE
					if (this.support[x].aggressive == true) {
						console.dir(this.support[x]);
						/*
      if(this.support[x].energy < 45 && this.support[x].gero == false && this.modeSwitch > 40){
      	this.support[x].defensive = true;
      	this.support[x].aggressive = false;
      	this.aiReason = 1;
      } else if((this.support[x].stamina > 90 || this.support[x].exhausted == true) && this.modeSwitch > 40 && this.support[x].gero == false){
      	this.support[x].defensive = true;
      	this.support[x].aggressive = false;
      	this.aiReason = 2;
      } else if(this.aiChoice1 < .03 && this.support[x].energy > 45 && this.support[x].stamina < 90 && this.support[x].exhausted != true && this.modeSwitch > 40 && this.support[x].gero == false){
      	this.aiChoice1 = Math.random();
      	this.support[x].defensive = true;
      	this.support[x].aggressive = false;
      	this.aiReason = 3;
      } 
      */
						if (hardAttackHitTest(this.support[x], this.android18) != true && hardAttackHitTest(this.support[x], this.android17) != true && app.main.support[x].test == false) {
							//this.aiChoice1 = Math.random();
							this.aiChoiceSupport1 = Math.random();
						}

						if ((hardAttackHitTest(this.support[x], this.android18) == true || hitTest(this.support[x], this.android18) == true || hardAttackHitTest(this.support[x], this.android17) == true || hitTest(this.support[x], this.android17) == true) && this.support[x].blasting == false && app.main.support[x].test == false) {
							this.support[x].superSpeed = true;
							this.support[x].fight = true;
						}

						if (this.vegeta.focus17 == false) {
							//IF FOCUSING 17 == FALSE

							//VEGETA MOVEMENT
							if (this.support[x].position.x > this.support[x].LEFTWALL.x + 10 && this.support[x].position.x < this.support[x].RIGHTWALL.x - 10 && this.support[x].powerMove == false && this.support[x].hard == false && this.support[x].charging == false && this.support[x].taunting == false && app.main.support[x].test == false) {
								if (this.support[x].right == true) {
									this.support[x].moveLeft();
								} else if (this.support[x].left == true) {
									this.support[x].moveRight();
								}
							}

							//VEGETA FLIGHT
							if (this.support[x].tien == true && this.support[x].blasting == false) {
								if (this.support[x].hard == false && this.support[x].charging == false && this.support[x].taunting == false && this.support[x].dodge == false && this.support[x].hardHit == false && this.support[x].stun == false && this.support[x].end == false && this.support[x].aboveSky == false) {
									if (this.support[x].attacking == false && this.support[x].taunting == false && this.support[x].charging == false && this.support[x].blasting == false && this.support[x].blocking == false) {
										this.support[x].up = true;
									}
									this.support[x].flying = true;
									this.support[x].jump();
								} else {
									this.support[x].hover = false;
									this.support[x].flying = false;
									this.support[x].up = false;
									if (this.android18.position.y - 50 > this.support[x].position.y) {
										this.support[x].aboveBuilding = false;
										//this.support[x].air = true;
									}
									//this.support[x].down = true;
								}
							}
							if (this.support[x].krillin == true && this.support[x].blasting == true) {
								if (this.android18.position.y < this.support[x].position.y && this.support[x].hard == false && this.support[x].charging == false && this.support[x].taunting == false && this.support[x].dodge == false && this.support[x].hardHit == false && this.support[x].stun == false && this.support[x].end == false && this.support[x].position.y > this.support[x].GROUND.y - 100) {
									if (this.support[x].attacking == false && this.support[x].taunting == false && this.support[x].charging == false && this.support[x].blasting == false && this.support[x].blocking == false) {
										this.support[x].up = true;
									}
									this.support[x].flying = true;
									this.support[x].jump();
								} else {
									this.support[x].hover = false;
									this.support[x].flying = false;
									this.support[x].up = false;
									if (this.android18.position.y - 50 > this.support[x].position.y) {
										this.support[x].aboveBuilding = false;
										//this.support[x].air = true;
									}
									//this.support[x].down = true;
								}
							}
							if (this.support[x].tien == true && this.support[x].blasting == true) {
								if (this.android18.position.y < this.support[x].position.y && this.support[x].hard == false && this.support[x].charging == false && this.support[x].taunting == false && this.support[x].dodge == false && this.support[x].hardHit == false && this.support[x].stun == false && this.support[x].end == false && this.support[x].position.y < this.support[x].GROUND.y + 100) {
									if (this.support[x].attacking == false && this.support[x].taunting == false && this.support[x].charging == false && this.support[x].blasting == false && this.support[x].blocking == false) {
										this.support[x].up = true;
									}
									this.support[x].flying = true;
									this.support[x].jump();
								} else {
									this.support[x].hover = false;
									this.support[x].flying = false;
									this.support[x].up = false;
									if (this.android18.position.y - 50 > this.support[x].position.y) {
										this.support[x].aboveBuilding = false;
										//this.support[x].air = true;
									}
									//this.support[x].down = true;
								}
							}
							/*
       if(this.dodgeChance > .5){
       
       //VEGETA FLIGHT DODGE
       if((((this.android18.blasting == true && this.android18.counter > 0 && this.android18.position.y - 100 < this.support[x].position.y ))) && this.support[x].hard == false && this.support[x].charging == false && this.support[x].taunting == false && this.support[x].stun == false  && this.support[x].aboveSky == false && this.support[x].blasting == false && this.support[x].end == false){
       	this.support[x].dodge = true;
       	this.support[x].flying = true;
       	this.support[x].jump();
       } else if((((this.android18.blasting == true && this.android18.counter > 0 && this.android18.position.y + 100 > this.support[x].position.y ))) && this.support[x].hard == false && this.support[x].charging == false && this.support[x].taunting == false && this.support[x].stun == false && this.support[x].aboveSky == true && this.support[x].end == false){
       	this.support[x].dodge = true;
       	this.support[x].flying = false;
       	this.support[x].up = false;
       	//this.support[x].down = true;
       } else {
       	this.support[x].dodge = false;
       }
       				
       } else if(this.dodgeChance < .5 && this.dodgeChance > .2 && this.support[x].superSpeed == false){
       	if(this.android18.blasting == true && this.support[x].hard == false && this.support[x].charging == false && this.support[x].taunting == false && this.support[x].stun == false && this.support[x].dodge == false && this.support[x].energy > 33){
       	this.dodgeChance = 0;
       	this.support[x].dodge = true;
       	this.support[x].superSpeed = true;
       } 
       }
       */
						} else {
							//IF FOCUSING 17 == TRUE

							//VEGETA FLIGHT -- FOCUS 17
							if (this.support[x].tien == true && this.support[x].blasting == false) {
								if (this.support[x].hard == false && this.support[x].charging == false && this.support[x].taunting == false && this.support[x].dodge == false && this.support[x].hardHit == false && this.support[x].stun == false && this.support[x].end == false && this.support[x].aboveSky == false) {
									if (this.support[x].attacking == false && this.support[x].taunting == false && this.support[x].charging == false && this.support[x].blasting == false && this.support[x].blocking == false) {
										this.support[x].up = true;
									}
									this.support[x].flying = true;
									this.support[x].jump();
								} else {
									this.support[x].hover = false;
									this.support[x].flying = false;
									this.support[x].up = false;
									if (this.android17.position.y - 50 > this.support[x].position.y) {
										this.support[x].aboveBuilding = false;
										//this.support[x].air = true;
									}
									//this.support[x].down = true;
								}
							}
							if (this.support[x].krillin == true && this.support[x].blasting == true) {
								if (this.android17.position.y < this.support[x].position.y && this.support[x].hard == false && this.support[x].charging == false && this.support[x].taunting == false && this.support[x].dodge == false && this.support[x].hardHit == false && this.support[x].stun == false && this.support[x].end == false && this.support[x].position.y > this.support[x].GROUND.y - 100) {
									if (this.support[x].attacking == false && this.support[x].taunting == false && this.support[x].charging == false && this.support[x].blasting == false && this.support[x].blocking == false) {
										this.support[x].up = true;
									}
									this.support[x].flying = true;
									this.support[x].jump();
								} else {
									this.support[x].hover = false;
									this.support[x].flying = false;
									this.support[x].up = false;
									if (this.android17.position.y - 50 > this.support[x].position.y) {
										this.support[x].aboveBuilding = false;
										//this.support[x].air = true;
									}
									//this.support[x].down = true;
								}
							}
							if (this.support[x].tien == true && this.support[x].blasting == true) {
								if (this.android17.position.y < this.support[x].position.y && this.support[x].hard == false && this.support[x].charging == false && this.support[x].taunting == false && this.support[x].dodge == false && this.support[x].hardHit == false && this.support[x].stun == false && this.support[x].end == false && this.support[x].position.y < this.support[x].GROUND.y + 100) {
									if (this.support[x].attacking == false && this.support[x].taunting == false && this.support[x].charging == false && this.support[x].blasting == false && this.support[x].blocking == false) {
										this.support[x].up = true;
									}
									this.support[x].flying = true;
									this.support[x].jump();
								} else {
									this.support[x].hover = false;
									this.support[x].flying = false;
									this.support[x].up = false;
									if (this.android17.position.y - 50 > this.support[x].position.y) {
										this.support[x].aboveBuilding = false;
										//this.support[x].air = true;
									}
									//this.support[x].down = true;
								}
							}

							//VEGETA MOVEMENT -- FOCUS 17
							if (this.support[x].position.x > this.support[x].LEFTWALL.x - 10 && this.support[x].position.x < this.support[x].RIGHTWALL.x + 10 && this.support[x].powerMove == false && this.support[x].hard == false && this.support[x].charging == false && this.support[x].taunting == false && app.main.support[x].test == false) {
								if (this.support[x].right == true) {
									this.support[x].moveLeft();
								} else if (this.support[x].left == true) {
									this.support[x].moveRight();
								}
							}

							/*
       if(this.dodgeChance > .5){
       
       //VEGETA FLIGHT DODGE -- FOCUS 17
       if((((this.android17.blasting == true && this.android17.counter > 0 && this.android17.position.y - 100 < this.support[x].position.y ))) && this.support[x].hard == false && this.support[x].charging == false && this.support[x].taunting == false && this.support[x].stun == false  && this.support[x].aboveSky == false && this.support[x].blasting == false && this.support[x].end == false){
       	this.support[x].dodge = true;
       	this.support[x].flying = true;
       	this.support[x].jump();
       } else if((((this.android17.blasting == true && this.android17.counter > 0 && this.android17.position.y + 100 > this.support[x].position.y ))) && this.support[x].hard == false && this.support[x].charging == false && this.support[x].taunting == false && this.support[x].stun == false && this.support[x].aboveSky == true && this.support[x].end == false){
       	this.support[x].up = false;
       	this.support[x].dodge = true;
       	this.support[x].flying = false;
       	//this.support[x].down = true;
       } else {
       	this.support[x].dodge = false;
       }
       				
       } else if(this.dodgeChance < .5 && this.dodgeChance > .2 && this.support[x].superSpeed == false){
       	if(this.android17.blasting == true && this.support[x].hard == false && this.support[x].charging == false && this.support[x].taunting == false && this.support[x].stun == false && this.support[x].dodge == false && this.support[x].energy > 33){
       	this.dodgeChance = 0;
       	this.support[x].dodge = true;
       	this.support[x].superSpeed = true;
       } 
       }
       */
						}

						//VEGETA DEFENDING SUPER SPEED (TELEPORT)
						if (this.aiChoiceSupport2 < .15 && this.support[x].superSpeed == false && this.support[x].end == false && this.support[x].superSpeedExhaustion == false && this.support[x].energy > 40) {
							if (this.action == false) {
								this.aiChoiceSupport2 = 10;
								this.action = true;
								this.support[x].superSpeed = true;
								this.support[x].fight = true;
							}
						} else if (this.aiChoiceSupport2 < .15) {
							this.aiChoiceSupport2 = 10;
						}

						if (this.support[x].position.y < this.android18.position.y + 100 && this.support[x].position.y > this.android18.position.y - 100 || this.support[x].position.y < this.android18.position.y + 100 && this.support[x].position.y > this.android18.position.y - 100 && this.support[x].tien == true && this.support[x].focus17 == true) {

							//VEGETA POWER ENERGY BLASTS
							if (attackHitTest(this.support[x], this.android18) != true && attackHitTest(this.support[x], this.android17) != true && this.aiChoiceSupport1 > .95 && this.aiChoiceSupport1 < 1 && this.support[x].fight == false && this.support[x].energy > 30 && this.support[x].taunting == false && this.support[x].gero == false && this.cooldownAI2 > 100) {
								if (this.action == false) {
									this.action = true;
									app.main.aiChoiceSupport1 = 10;
									this.cooldownAI2 = 0;
									this.support[x].powerMove = true;
									//this.support[x].attacking = true;
									this.support[x].blasting = true;
									this.support[x].fight = true;
								}
							}
						} else if (this.support[x].position.y < this.android18.position.y + 100 && this.support[x].position.y > this.android18.position.y - 100 || this.support[x].position.y < this.android18.position.y + 100 && this.support[x].position.y > this.android18.position.y - 100 && this.support[x].tien == true && this.support[x].focus17 == false) {

							//VEGETA POWER ENERGY BLASTS
							if (attackHitTest(this.support[x], this.android18) != true && attackHitTest(this.support[x], this.android17) != true && this.aiChoiceSupport1 > .95 && this.aiChoiceSupport1 < 1 && this.support[x].fight == false && this.support[x].energy > 30 && this.support[x].taunting == false && this.support[x].gero == false && this.cooldownAI2 > 100) {
								if (this.action == false) {
									this.action = true;
									app.main.aiChoiceSupport1 = 10;
									this.cooldownAI2 = 0;
									this.support[x].powerMove = true;
									//this.support[x].attacking = true;
									this.support[x].blasting = true;
									this.support[x].fight = true;
								}
							}
						}

						//VEGETA POWER ENERGY BLASTS
						if (attackHitTest(this.support[x], this.android18) != true && attackHitTest(this.support[x], this.android17) != true && this.aiChoiceSupport1 > .95 && this.aiChoiceSupport1 < 1 && this.support[x].fight == false && this.support[x].energy > 30 && this.support[x].taunting == false && this.support[x].gero == false && this.cooldownAI3 > 200 && this.support[x].krillin == true) {
							if (this.action == false) {
								this.action = true;
								app.main.aiChoiceSupport1 = 10;
								this.cooldownAI3 = 0;
								this.support[x].powerMove = true;
								//this.support[x].attacking = true;
								this.support[x].blasting = true;
								this.support[x].fight = true;
							}
						}

						if ((this.support[x].position.y < this.android18.position.y + 100 && this.support[x].position.y > this.android18.position.y - 100 || this.support[x].position.y < this.android18.position.y + 100 && this.support[x].position.y > this.android18.position.y - 100 || this.support[x].position.y < this.android17.position.y + 100 && this.support[x].position.y > this.android17.position.y - 100 || this.support[x].position.y < this.android17.position.y + 100 && this.support[x].position.y > this.android17.position.y - 100) && this.support[x].krillin == true) {

							//VEGETA POWER ENERGY BLASTS
							if (this.support[x].blasting == true && this.support[x].triggerBlast == false) {
								this.support[x].triggerBlast = true;
								this.cooldownAI3 = 0;
							}
						}

						if (this.support[x].blasting == false && this.support[x].krillin == true) {
							this.support[x].triggerBlast = false;
							this.support[x].flying = false;
							this.support[x].hover = false;
						}

						//VEGETA TAUNTING
						if (this.aiChoiceSupport1 < -1 && this.support[x].fight == false && this.support[x].taunting == false && this.support[x].gero == false) {
							if (this.action == false) {
								this.action = true;
								this.support[x].intensify = true;
								this.support[x].taunting = true;
							}
						}
					}
				}
			}
		}

		if (this.vegeta.focus17 == false) {
			//VEGETA HIT DETECTION RESOLUTION -- AGAINST 18
			if (this.vegeta.attacking == true && this.vegeta.hard == true && this.detectedHard2 == false && (hardAttackHitTest(this.vegeta, this.android18) == true && (this.vegeta.air == false || this.chance2 <= .5) || attackHitTest(this.vegeta, this.android18) == true && this.vegeta.air == true && this.chance2 > .5)) {
				if (this.vegeta.punching == true && this.android18.superSpeed == false && this.android18.fieldOn == false && this.vegeta.hit == false && this.vegeta.hardHit == false && this.android18.blocking == false && this.android18.dead == false && hardAttackHitTest(this.vegeta, this.android18) == true) {
					this.sound.playSpecialReaction2(16);
					//console.log("DETECTIONPUNCH");
					this.detectedHard2 = true;
					this.android18.hardHit = true;
					this.android18.hit = true;
					this.android18.stun = true;
					if (this.android18.air == true) {
						this.android18.flying = false;
						this.android18.jumpVelocity.y += 80;
						this.android18.punched = true;
					} else {
						this.android18.punched = false;
					}
					if (this.android18.stamina > 64 && this.android18.exhausted == true) {
						this.android18.stamina = this.android18.stamina - 10;
					}
					if (this.android18.endurance > 14) {
						this.android18.endurance = this.android18.endurance - (7 + getRandom(0, 5));
					} else if (this.android18.endurance < 15) {
						this.android18.health = this.android18.health - (7 + getRandom(0, 5));
					}

					if (this.android18.superSpeed == false && this.android18.fieldOn == false) {
						if (this.vegeta.left == true) {
							this.android18.velocity.x = -7;
						} else if (this.vegeta.right == true) {
							this.android18.velocity.x = 7;
						}
						this.android18.decel = this.android18.velocity.clone();
					} else {
						this.sound.playBasicAttack(10);
					}
				}
				if (this.vegeta.kicking == true && this.vegeta.hit == false && this.vegeta.hardHit == false && this.android18.superSpeed == false && this.android18.fieldOn == false && this.android18.blocking == false && hardAttackHitTest(this.vegeta, this.android18) == true) {
					this.sound.playSpecialReaction2(17);
					this.detectedHard2 = true;
					//console.log("DETECTIONKICK");
					this.android18.hardHit = true;
					this.android18.hit = true;
					this.android18.stun = true;
					this.android18.punched = false; //FIX
					if (this.android18.stamina > 64 && this.android18.exhausted == true) {
						this.android18.stamina = this.android18.stamina - 10;
					}
					if (this.android18.endurance > 14) {
						this.android18.endurance = this.android18.endurance - (7 + getRandom(0, 5));
					} else if (this.android18.endurance < 15) {
						this.android18.health = this.android18.health - (7 + getRandom(0, 5));
					}

					if (this.android18.blocking == true && this.android18.fieldOn == false) {
						if (this.vegeta.left == true) {
							this.android18.velocity.x = -20;
						} else if (this.vegeta.right == true) {
							this.android18.velocity.x = 20;
						}
						this.android18.stamina += 1;
						this.android18.decel = this.android18.velocity.clone();
						this.sound.playBasicReaction2(Math.round(getRandom(58, 60)));
					} else if (this.android18.superSpeed == false && this.android18.fieldOn == false) {
						//console.log("pushpushpush");
						if (this.vegeta.left == true) {
							this.android18.velocity.x = -60;
						} else if (this.vegeta.right == true) {
							this.android18.velocity.x = 60;
						}
						this.android18.decel = this.android18.velocity.clone();
					} else {
						this.sound.playBasicAttack(10);
					}
				}
				if (this.android18.blocking == true && this.android18.fieldOn == false && (this.vegeta.kicking == true || this.vegeta.punching == true) && hardAttackHitTest(this.vegeta, this.android18)) {
					if (this.vegeta.kicking == true) {
						if (this.vegeta.left == true) {
							this.android18.velocity.x = -20;
						} else if (this.vegeta.right == true) {
							this.android18.velocity.x = 20;
						}
					} else if (this.vegeta.punching == true && this.vegeta.air == true) {
						if (this.vegeta.left == true) {
							this.android18.jumpVelocity.y = -10;
						} else if (this.vegeta.right == true) {
							this.android18.jumpVelocity.y = 10;
						}
					} else {
						if (this.vegeta.left == true) {
							this.android18.velocity.x = -3;
						} else if (this.vegeta.right == true) {
							this.android18.velocity.x = 3;
						}
					}
					this.android18.stamina += 5;
					this.android18.decel = this.android18.velocity.clone();
					this.sound.playBasicReaction2(Math.round(getRandom(58, 60)));
				}
			}
			if (this.vegeta.attacking == true && this.vegeta.hit == false && this.vegeta.hardHit == false && this.vegeta.hard == false && this.detected2 == false) {
				if (this.vegeta.basic == true && this.android18.superSpeed == false && this.android18.fieldOn == false && this.android18.blocking == false && this.android18.hard == false && attackHitTest(this.vegeta, this.android18) == true) {
					this.detected2 = true;
					if (this.vegeta.randomEffect >= .75) {
						this.sound.playBasicReaction2(12);
					} else if (this.vegeta.randomEffect > .5 && this.vegeta.randomEffect < .75) {
						this.sound.playBasicReaction2(13);
					} else if (this.vegeta.randomEffect > .25 && this.vegeta.randomEffect <= .5) {
						this.sound.playBasicReaction2(14);
					} else {
						this.sound.playBasicReaction2(15);
					}
					this.android18.hit = true;
					this.android18.stun = true;
					if (this.android18.stamina > 64 && this.android18.exhausted == true) {
						this.android18.stamina = this.android18.stamina - 4;
					}
					if (this.android18.endurance > 14) {
						this.android18.endurance = this.android18.endurance - (3 + getRandom(0, 2));
					} else if (this.android18.endurance < 15) {
						this.android18.health = this.android18.health - (3 + getRandom(0, 2));
					}

					if (this.android18.superSpeed == false && this.android18.fieldOn == false) {
						if (this.vegeta.left == true) {
							this.android18.velocity.x -= 3;
						} else if (this.vegeta.right == true) {
							this.android18.velocity.x += 3;
						}
						this.android18.decel = this.android18.velocity.clone();
					}
				}
				if (this.android18.blocking == true && this.android18.fieldOn == false && this.vegeta.basic == true && hardAttackHitTest(this.vegeta, this.android18)) {
					if (this.vegeta.left == true) {
						this.android18.velocity.x -= 3;
					} else if (this.vegeta.right == true) {
						this.android18.velocity.x += 3;
					}
					this.android18.stamina += 4;
					this.android18.decel = this.android18.velocity.clone();
					this.sound.playBasicReaction2(Math.round(getRandom(58, 60)));
				}
			}
		} else {
			//VEGETA HIT DETECTION RESOLUTION -- AGAINST 17
			if (this.vegeta.attacking == true && this.vegeta.hard == true && this.detectedHard2 == false && (hardAttackHitTest(this.vegeta, this.android17) == true && (this.vegeta.air == false || this.chance2 <= .5) || attackHitTest(this.vegeta, this.android17) == true && this.vegeta.air == true && this.chance2 > .5)) {
				if (this.vegeta.punching == true && this.android17.superSpeed == false && this.android17.fieldOn == false && this.android17.blocking == false && hardAttackHitTest(this.vegeta, this.android17) == true) {
					this.sound.playSpecialReaction2(16);
					//console.log("DETECTIONPUNCH");
					this.detectedHard2 = true;
					this.android17.hardHit = true;
					this.android17.hit = true;
					this.android17.stun = true;
					if (this.android17.air == true) {
						this.android17.flying = false;
						this.android17.jumpVelocity.y += 80;
						this.android17.punched = true;
					} else {
						this.android17.punched = false;
					}
					if (this.android17.stamina > 64 && this.android17.exhausted == true) {
						this.android17.stamina = this.android17.stamina - 10;
					}
					if (this.android17.endurance > 14) {
						this.android17.endurance = this.android17.endurance - (7 + getRandom(0, 5));
					} else if (this.android17.endurance < 15) {
						this.android17.health = this.android17.health - (7 + getRandom(0, 5));
					}

					if (this.android17.superSpeed == false && this.android17.fieldOn == false) {
						if (this.vegeta.left == true) {
							this.android17.velocity.x = -7;
						} else if (this.vegeta.right == true) {
							this.android17.velocity.x = 7;
						}
						this.android17.decel = this.android17.velocity.clone();
					} else {
						this.sound.playBasicAttack(10);
					}
				}
				if (this.vegeta.kicking == true && this.android17.superSpeed == false && this.android17.fieldOn == false && this.android17.blocking == false && hardAttackHitTest(this.vegeta, this.android17) == true) {
					this.sound.playSpecialReaction2(17);
					this.detectedHard2 = true;
					//console.log("DETECTIONKICK");
					this.android17.hardHit = true;
					this.android17.hit = true;
					this.android17.stun = true;
					this.android17.punched = false; //FIX
					if (this.android17.stamina > 64 && this.android17.exhausted == true) {
						this.android17.stamina = this.android17.stamina - 10;
					}
					if (this.android17.endurance > 14) {
						this.android17.endurance = this.android17.endurance - (7 + getRandom(0, 5));
					} else if (this.android17.endurance < 15) {
						this.android17.health = this.android17.health - (7 + getRandom(0, 5));
					}

					if (this.android17.blocking == true) {
						if (this.vegeta.left == true) {
							this.android17.velocity.x = -20;
						} else if (this.vegeta.right == true) {
							this.android17.velocity.x = 20;
						}
						this.android17.stamina += 1;
						this.android17.decel = this.android17.velocity.clone();
						this.sound.playBasicReaction2(Math.round(getRandom(58, 60)));
					} else if (this.android17.superSpeed == false && this.android17.fieldOn == false) {
						//console.log("pushpushpush");
						if (this.vegeta.left == true) {
							this.android17.velocity.x = -60;
						} else if (this.vegeta.right == true) {
							this.android17.velocity.x = 60;
						}
						this.android17.decel = this.android17.velocity.clone();
					} else {
						this.sound.playBasicAttack(10);
					}
				}
				if (this.android17.blocking == true && (this.vegeta.kicking == true || this.vegeta.punching == true) && hardAttackHitTest(this.vegeta, this.android17)) {
					if (this.vegeta.kicking == true) {
						if (this.vegeta.left == true) {
							this.android17.velocity.x = -20;
						} else if (this.vegeta.right == true) {
							this.android17.velocity.x = 20;
						}
					} else if (this.vegeta.punching == true && this.vegeta.air == true) {
						if (this.vegeta.left == true) {
							this.android17.jumpVelocity.y = -10;
						} else if (this.vegeta.right == true) {
							this.android17.jumpVelocity.y = 10;
						}
					} else {
						if (this.vegeta.left == true) {
							this.android17.velocity.x = -3;
						} else if (this.vegeta.right == true) {
							this.android17.velocity.x = 3;
						}
					}
					this.android17.stamina += 5;
					this.android17.decel = this.android17.velocity.clone();
					this.sound.playBasicReaction2(Math.round(getRandom(58, 60)));
				}
			}
			if (this.vegeta.attacking == true && this.vegeta.hard == false && this.detected2 == false) {
				if (this.vegeta.basic == true && this.android17.superSpeed == false && this.android17.fieldOn == false && this.android17.blocking == false && this.android17.hard == false && hardAttackHitTest(this.vegeta, this.android17) == true) {
					this.detected2 = true;
					if (this.vegeta.randomEffect >= .75) {
						this.sound.playBasicReaction2(12);
					} else if (this.vegeta.randomEffect > .5 && this.vegeta.randomEffect < .75) {
						this.sound.playBasicReaction2(13);
					} else if (this.vegeta.randomEffect > .25 && this.vegeta.randomEffect <= .5) {
						this.sound.playBasicReaction2(14);
					} else {
						this.sound.playBasicReaction2(15);
					}
					this.android17.hit = true;
					this.android17.stun = true;
					if (this.android17.stamina > 64 && this.android17.exhausted == true) {
						this.android17.stamina = this.android17.stamina - 4;
					}
					if (this.android17.endurance > 14) {
						this.android17.endurance = this.android17.endurance - (3 + getRandom(0, 2));
					} else if (this.android17.endurance < 15) {
						this.android17.health = this.android17.health - (3 + getRandom(0, 2));
					}

					if (this.android17.superSpeed == false && this.android17.fieldOn == false) {
						if (this.vegeta.left == true) {
							this.android17.velocity.x -= 8;
						} else if (this.vegeta.right == true) {
							this.android17.velocity.x += 8;
						}
						this.android17.decel = this.android17.velocity.clone();
					}
				}
				if (this.android17.blocking == true && this.vegeta.basic == true && hardAttackHitTest(this.vegeta, this.android17)) {
					if (this.vegeta.left == true) {
						this.android17.velocity.x -= 3;
					} else if (this.vegeta.right == true) {
						this.android17.velocity.x += 3;
					}
					this.android17.stamina += 4;
					this.android17.decel = this.android17.velocity.clone();
					this.sound.playBasicReaction2(Math.round(getRandom(58, 60)));
				}
			}
		}

		//ANDROID18 HIT DETECTION RESOLUTION
		if ((this.detectedHard == true && this.vegeta.behind == false || this.android18.air == true && this.chance > .5 && this.detected == true) && this.vegeta.unstoppable == false) {
			if (this.android18.kicking == true && this.android18.intensify == true) {
				if (this.vegeta.superSpeed == false && this.vegeta.unable == false && this.vegeta.blocking == false && hardAttackHitTest(this.android18, this.vegeta) == true) {
					this.sound.playSpecialReaction(17);
					//console.log("HARDKICKED");
					this.vegeta.hit = true;
					this.vegeta.hardHit = true;
					this.vegeta.stun = true;
					this.detectedHard = false;
					this.vegeta.punched = false; //FIX
					if (this.vegeta.stamina > 64 && this.vegeta.exhausted == true) {
						this.vegeta.stamina = this.vegeta.stamina - 10;
					}
					if (this.vegeta.endurance > 14) {
						this.vegeta.endurance = this.vegeta.endurance - (7 + getRandom(0, 5));
					} else if (this.vegeta.endurance < 15) {
						this.vegeta.health = this.vegeta.health - (7 + getRandom(0, 5));
					}
				}
				if (this.vegeta.blocking == true && this.android18.kicking == true && hardAttackHitTest(this.android18, this.vegeta)) {
					if (this.android18.left == true) {
						this.vegeta.velocity.x = -20;
					} else if (this.android18.right == true) {
						this.vegeta.velocity.x = 20;
					}
					this.vegeta.decel = this.vegeta.velocity.clone();
					this.vegeta.stamina += 4;
					this.sound.playBasicReaction(Math.round(getRandom(58, 60)));
				} else if (this.vegeta.superSpeed == false) {
					if (this.android18.left == true) {
						this.vegeta.velocity.x = -60;
					} else if (this.android18.right == true) {
						this.vegeta.velocity.x = 60;
					}
					this.vegeta.decel = this.vegeta.velocity.clone();
				}
			}
			if (this.android18.punching == true && this.android18.intensify == true && this.android18.air == true) {
				if (this.vegeta.superSpeed == false && this.vegeta.unable == false && this.vegeta.blocking == false && this.damageTimer < 1 && hardAttackHitTest(this.android18, this.vegeta) == true) {
					this.sound.playSpecialReaction(16);
					//console.log("HARDPUNCHED");
					this.vegeta.hit = true;
					this.vegeta.hardHit = true;
					this.vegeta.stun = true;
					this.detectedHard = false;
					if (this.vegeta.air == true) {
						this.vegeta.flying = false;
						this.vegeta.jumpVelocity.y += 80;
						this.vegeta.punched = true;
					} else {
						this.vegeta.punched = false;
					}
					if (this.vegeta.stamina > 64 && this.vegeta.exhausted == true) {
						this.vegeta.stamina = this.vegeta.stamina - 10;
					}
					if (this.vegeta.endurance > 14) {
						this.vegeta.endurance = this.vegeta.endurance - (7 + getRandom(0, 5));
					} else if (this.vegeta.endurance < 15) {
						this.vegeta.health = this.vegeta.health - (7 + getRandom(0, 5));
					}
				}
				if (this.vegeta.blocking == true && this.android18.punching == true && hardAttackHitTest(this.android18, this.vegeta)) {
					if (this.android18.left == true) {
						this.vegeta.jumpVelocity.y = -10;
					} else if (this.android18.right == true) {
						this.vegeta.jumpVelocity.y = 10;
					}
					this.vegeta.decel = this.vegeta.velocity.clone();
					this.vegeta.stamina += 5;
					this.sound.playBasicReaction(Math.round(getRandom(58, 60)));
				} else if (this.vegeta.superSpeed == false) {
					if (this.android18.left == true) {
						this.vegeta.velocity.x = -7;
					} else if (this.android18.right == true) {
						this.vegeta.velocity.x = 7;
					}
					this.vegeta.decel = this.vegeta.velocity.clone();
				}
				this.damageTimer++;
			}

			if (this.android18.punching == true && this.android18.intensify == true && this.android18.air == false) {
				if (this.vegeta.superSpeed == false && this.vegeta.unable == false && this.vegeta.blocking == false && this.damageTimer < 1 && hardAttackHitTest(this.android18, this.vegeta) == true) {
					this.sound.playSpecialReaction(16);
					//console.log("HARDPUNCHED");
					this.vegeta.hit = true;
					this.vegeta.hardHit = true;
					this.vegeta.stun = true;
					this.detectedHard = false;
					if (this.vegeta.stamina > 64 && this.vegeta.exhausted == true) {
						this.vegeta.stamina = this.vegeta.stamina - 10;
					}
					if (this.vegeta.endurance > 14) {
						this.vegeta.endurance = this.vegeta.endurance - (7 + getRandom(0, 5));
					} else if (this.vegeta.endurance < 15) {
						this.vegeta.health = this.vegeta.health - (7 + getRandom(0, 5));
					}
				}
				if (this.vegeta.blocking == true && this.android18.punching == true && hardAttackHitTest(this.android18, this.vegeta)) {
					if (this.android18.left == true) {
						this.vegeta.velocity.x = -3;
					} else if (this.android18.right == true) {
						this.vegeta.velocity.x = 3;
					}
					this.vegeta.decel = this.vegeta.velocity.clone();
					this.vegeta.stamina += 5;
					this.sound.playBasicReaction(Math.round(getRandom(58, 60)));
				} else if (this.vegeta.superSpeed == false) {
					if (this.android18.left == true) {
						this.vegeta.velocity.x = -7;
					} else if (this.android18.right == true) {
						this.vegeta.velocity.x = 7;
					}
					this.vegeta.decel = this.vegeta.velocity.clone();
				}
				this.damageTimer++;
			}
		}
		if (this.detected == true && this.vegeta.superSpeed == false && this.vegeta.hard == false && this.vegeta.unstoppable == false) {
			if (this.android18.basic == true && (this.vegeta.hit == false || this.vegeta.hardHit == true)) {
				if (this.vegeta.superSpeed == false && this.vegeta.unable == false && this.vegeta.blocking == false && this.damageTimer < 1 && hardAttackHitTest(this.android18, this.vegeta) == true) {
					this.vegeta.hit = true;
					this.vegeta.stun = true;
					if (this.android18.randomEffect >= .75) {
						this.sound.playBasicReaction(12);
					} else if (this.android18.randomEffect > .5 && this.android18.randomEffect < .75) {
						this.sound.playBasicReaction(13);
					} else if (this.android18.randomEffect > .25 && this.android18.randomEffect <= .5) {
						this.sound.playBasicReaction(14);
					} else {
						this.sound.playBasicReaction(15);
					}
					if (this.vegeta.stamina > 64 && this.vegeta.exhausted == true) {
						this.vegeta.stamina = this.vegeta.stamina - 4;
					}
					if (this.vegeta.endurance > 14) {
						this.vegeta.endurance = this.vegeta.endurance - (3 + getRandom(0, 2));
					} else if (this.vegeta.endurance < 15) {
						this.vegeta.health = this.vegeta.health - (3 + getRandom(0, 2));
					}
				}
				if (this.vegeta.blocking == true && this.android18.basic == true && hardAttackHitTest(this.android18, this.vegeta)) {
					if (this.android18.left == true) {
						this.vegeta.velocity.x = -3;
					} else if (this.android18.right == true) {
						this.vegeta.velocity.x = 3;
					}
					this.vegeta.decel = this.vegeta.velocity.clone();
					this.vegeta.stamina += 4;
					this.sound.playBasicReaction(Math.round(getRandom(58, 60)));
				} else if (this.vegeta.superSpeed == false) {
					if (this.android18.left == true) {
						this.vegeta.velocity.x = -8;
					} else if (this.android18.right == true) {
						this.vegeta.velocity.x = 8;
					}
					this.vegeta.decel = this.vegeta.velocity.clone();
				}
				this.damageTimer++;
			}
		}

		//ANDROID 17 HIT DETECTION RESOLUTION
		if (this.android17.attacking == true && this.android17.hard == true && this.detectedHard3 == false && (hardAttackHitTest(this.android17, this.vegeta) == true && (this.android17.air == false || this.chance3 <= .5) || attackHitTest(this.android17, this.vegeta) == true && this.android17.air == true && this.chance3 > .5) && this.vegeta.unstoppable == false) {
			if (this.android17.punching == true && this.vegeta.unable == false && this.vegeta.superSpeed == false && this.vegeta.blocking == false && hardAttackHitTest(this.android17, this.vegeta) == true) {
				this.sound.playSpecialReaction2(16);
				//console.log("DETECTIONPUNCH");
				this.detectedHard3 = true;
				this.vegeta.hardHit = true;
				this.vegeta.hit = true;
				this.vegeta.stun = true;
				if (this.vegeta.air == true) {
					this.vegeta.flying = false;
					this.vegeta.jumpVelocity.y += 80;
					this.vegeta.punched = true;
				} else {
					this.vegeta.punched = false;
				}
				if (this.vegeta.stamina > 64 && this.vegeta.exhausted == true) {
					this.vegeta.stamina = this.vegeta.stamina - 10;
				}
				if (this.vegeta.endurance > 14) {
					this.vegeta.endurance = this.vegeta.endurance - (7 + getRandom(0, 5));
				} else if (this.vegeta.endurance < 15) {
					this.vegeta.health = this.vegeta.health - (7 + getRandom(0, 5));
				}

				if (this.vegeta.superSpeed == false) {
					if (this.android17.left == true) {
						this.vegeta.velocity.x = -7;
					} else if (this.android17.right == true) {
						this.vegeta.velocity.x = 7;
					}
					this.vegeta.decel = this.vegeta.velocity.clone();
				} else {
					this.sound.playBasicAttack(10);
				}
			}
			if (this.android17.kicking == true && this.vegeta.superSpeed == false && this.vegeta.unable == false && this.vegeta.blocking == false && hardAttackHitTest(this.android17, this.vegeta) == true) {
				this.sound.playSpecialReaction2(17);
				this.detectedHard3 = true;
				//console.log("DETECTIONKICK");
				this.vegeta.hardHit = true;
				this.vegeta.hit = true;
				this.vegeta.stun = true;
				this.vegeta.punched = false; //FIX
				if (this.vegeta.stamina > 64 && this.vegeta.exhausted == true) {
					this.vegeta.stamina = this.vegeta.stamina - 10;
				}
				if (this.vegeta.endurance > 14) {
					this.vegeta.endurance = this.vegeta.endurance - (7 + getRandom(0, 5));
				} else if (this.vegeta.endurance < 15) {
					this.vegeta.health = this.vegeta.health - (7 + getRandom(0, 5));
				}

				if (this.vegeta.blocking == true) {
					if (this.android17.left == true) {
						this.vegeta.velocity.x = -20;
					} else if (this.android17.right == true) {
						this.vegeta.velocity.x = 20;
					}
					this.vegeta.stamina += 1;
					this.vegeta.decel = this.vegeta.velocity.clone();
					this.sound.playBasicReaction2(Math.round(getRandom(58, 60)));
				} else if (this.vegeta.superSpeed == false) {
					//console.log("pushpushpush");
					if (this.android17.left == true) {
						this.vegeta.velocity.x = -60;
					} else if (this.android17.right == true) {
						this.vegeta.velocity.x = 60;
					}
					this.vegeta.decel = this.vegeta.velocity.clone();
				} else {
					this.sound.playBasicAttack(10);
				}
			}
			if (this.vegeta.blocking == true && (this.android17.kicking == true || this.android17.punching == true) && hardAttackHitTest(this.android17, this.vegeta)) {
				if (this.android17.kicking == true) {
					if (this.android17.left == true) {
						this.vegeta.velocity.x = -20;
					} else if (this.android17.right == true) {
						this.vegeta.velocity.x = 20;
					}
				} else if (this.android17.punching == true && this.android17.air == true) {
					if (this.android17.left == true) {
						this.vegeta.jumpVelocity.y = -10;
					} else if (this.android17.right == true) {
						this.vegeta.jumpVelocity.y = 10;
					}
				} else {
					if (this.android17.left == true) {
						this.vegeta.velocity.x = -3;
					} else if (this.android17.right == true) {
						this.vegeta.velocity.x = 3;
					}
				}
				this.vegeta.stamina += 5;
				this.vegeta.decel = this.vegeta.velocity.clone();
				this.sound.playBasicReaction2(Math.round(getRandom(58, 60)));
			}
		}
		if (this.android17.attacking == true && this.android17.hard == false && this.detected3 == false && this.vegeta.unstoppable == false) {
			if (this.android17.basic == true && this.vegeta.unable == false && this.vegeta.superSpeed == false && this.vegeta.blocking == false && this.vegeta.hard == false && hardAttackHitTest(this.android17, this.vegeta) == true) {
				this.detected3 = true;
				if (this.android17.randomEffect >= .75) {
					this.sound.playBasicReaction2(12);
				} else if (this.android17.randomEffect > .5 && this.android17.randomEffect < .75) {
					this.sound.playBasicReaction2(13);
				} else if (this.android17.randomEffect > .25 && this.android17.randomEffect <= .5) {
					this.sound.playBasicReaction2(14);
				} else {
					this.sound.playBasicReaction2(15);
				}
				this.vegeta.hit = true;
				this.vegeta.stun = true;
				if (this.vegeta.stamina > 64 && this.vegeta.exhausted == true) {
					this.vegeta.stamina = this.vegeta.stamina - 4;
				}
				if (this.vegeta.endurance > 14) {
					this.vegeta.endurance = this.vegeta.endurance - (3 + getRandom(0, 2));
				} else if (this.vegeta.endurance < 15) {
					this.vegeta.health = this.vegeta.health - (3 + getRandom(0, 2));
				}

				if (this.vegeta.superSpeed == false) {
					if (this.android17.left == true) {
						this.vegeta.velocity.x -= 8;
					} else if (this.android17.right == true) {
						this.vegeta.velocity.x += 8;
					}
					this.vegeta.decel = this.vegeta.velocity.clone();
				}
			}
			if (this.vegeta.blocking == true && this.android17.basic == true && hardAttackHitTest(this.android17, this.vegeta)) {
				if (this.android17.left == true) {
					this.vegeta.velocity.x -= 3;
				} else if (this.android17.right == true) {
					this.vegeta.velocity.x += 3;
				}
				this.vegeta.stamina += 4;
				this.vegeta.decel = this.vegeta.velocity.clone();
				this.sound.playBasicReaction2(Math.round(getRandom(58, 60)));
			}
		} //END HIT DETECTION HANDLING


		this.sceneCounter++;
		//console.log(this.sceneCounter + "SCENECOUNTER");

		//console.log(this.sceneCounter);

		//MOVES ALONG GAME STATES THAT ARE VIDEOS
		if (this.introState == true && this.sceneCounter > 1570 && this.sceneCounter < 1572) {
			this.environment.fadeInFast = true;
			/* this.videos.end(); 
   this.gameState = this.GAME_STATE.DEFAULT;
   this.sound.playBGAudioScene();
   this.scene = true;
   this.introState = false;
   this.changed = false; */
		} else if (this.introState == true && this.sceneCounter > 1573) {
			this.sceneChange = 1;
			/* this.videos.end();
   this.gameState = this.GAME_STATE.DEFAULT;
   this.sound.playBGAudioScene();
   this.scene = true;
   this.introState = false;
   this.changed = false; */
		}
		if (this.endingState == true && this.specialScene == false && (this.sceneCounter > 530 && this.trueEnding == false || this.sceneCounter > 530 && this.trueEnding == true)) {
			//this.environment.fadeInSlow = true;

			this.videos.endE();
			this.endingState = false;
			if (this.trueEnding == true) {
				if (this.quickReset == false) {
					this.sceneCounter = 0;
					this.quickReset = true;
					this.endingState = false;
				}
				this.specialScene = true;
				this.videos.startS();
			} else {
				this.sound.playBGAudioWin();
				if (this.totalScore > 0) {
					if (this.finalSaying == false && this.endingState == false && this.specialScene == false) {
						this.sound.playVoice2(Math.round(getRandom(82, 83)));
						this.finalSaying = true;
					}
				} else {
					if (this.finalSaying == false && this.endingState == false && this.specialScene == false) {
						this.sound.playVoice2(Math.round(getRandom(80, 81)));
						this.finalSaying = true;
					}
				}
				//this.endingState = false;
			}
			//this.sound.playEffect(7);
		}
		if (this.specialScene == true && this.sceneCounter > 600) {
			//this.environment.fadeInSlow = true;
			this.videos.endE();
			this.videos.endS();
			//this.sound.playEffect(7);
			this.specialScene = false;
			this.sound.playBGAudioWin();
			if (this.totalScore > 0) {
				if (this.finalSaying == false && this.endingState == false && this.specialScene == false) {
					this.sound.playVoice2(Math.round(getRandom(82, 83)));
					this.finalSaying = true;
				}
			} else {
				if (this.finalSaying == false && this.endingState == false && this.specialScene == false) {
					this.sound.playVoice2(Math.round(getRandom(80, 81)));
					this.finalSaying = true;
				}
			}
		}

		//GAME STATE CHANGER -- CREDITS
		if ((myKeys.keydown[myKeys.KEYBOARD.KEY_C] == true || this.creditsScreen == true) && myKeys.keydown[myKeys.KEYBOARD.KEY_ENTER] != true && this.changeDelay > 29) {
			if (this.gameState == this.GAME_STATE.BEGIN && this.introState == false && this.reseted == false) {
				this.creditsScreen = true;
				this.sceneChange++;
				this.titleScreen = false;
				this.instructions = 0;
				this.environment.fadeInFast = true;
				if (this.sceneChange > 1) {
					this.videos.endO();
					this.reseted = true;
					this.changed = false;
					this.gameState = this.GAME_STATE.CREDITS;
					this.sound.playBGAudioScene(4);
					this.sceneChange = 0;
					this.changeDelay = 0;
				}
			}
		}

		//GAME STATE CHANGER
		if (myKeys.keydown[myKeys.KEYBOARD.KEY_C] != true && (myKeys.keydown[myKeys.KEYBOARD.KEY_ENTER] == true || this.sceneChange != 0) && this.changeDelay > 29) {
			if (this.gameState == this.GAME_STATE.BEGIN && this.introState == false && this.reseted == false) {
				this.sceneChange++;
				this.titleScreen = false;
				this.instructions = 0;
				this.environment.fadeInSlow = true;
				if (this.sceneChange > 1) {
					this.videos.endO();
					this.reseted = true;
					this.changed = false;
					this.gameState = this.GAME_STATE.TUTORIAL;
					//this.sound.playBGAudioTutorial();
					this.scene = true;
					this.sceneChange = 0;
					this.changeDelay = 0;
				}
			} else if (this.gameState == this.GAME_STATE.CREDITS && this.reseted == false) {
				this.sceneChange++;
				this.instructions = 0;
				this.environment.fadeInSlow = true;
				if (this.sceneChange > 1) {
					this.creditsScreen = false;
					this.reseted = true;
					this.changed = false;
					this.gameState = this.GAME_STATE.TUTORIAL;
					this.sound.stopBGAudioScene();
					//this.sound.playBGAudioTutorial();
					this.scene = true;
					this.sceneChange = 0;
					this.changeDelay = 0;
				}
			} else if (this.gameState == this.GAME_STATE.TUTORIAL && this.introState == false && this.reseted == false) {
				this.sound.stopBGAudioTutorial();
				this.sceneChange++;
				this.scene = false;
				this.environment.remote = true;
				if (this.environment.remoteGround == true) {
					this.beginCounter++;
					if (this.beginCounter < 15) {
						this.vegeta.stun = true;
						this.android18.stun = true;
						this.android17.superSpeed = true;
						this.android17.stun = true;
						this.android17.cinematic = true;
						this.android17.cine = 7;
						//this.begin = true;
					}
					if (this.beginCounter > 5 && this.beginCounter < 21) {
						if (this.vegeta.flying == false) {
							this.android17.flying = false;
						}
						if (this.vegeta.left == true && this.gameState == this.GAME_STATE.TUTORIAL) {
							this.android17.position.x = this.vegeta.position.x + 60;
							this.android17.position.y = this.vegeta.position.y - 5;
						} else if (this.vegeta.right == true && this.gameState == app.main.GAME_STATE.TUTORIAL) {
							this.android17.position.x = this.vegeta.position.x - 60;
							this.android17.position.y = this.vegeta.position.y - 5;
						}
					}
				}
				if (this.beginCounter > 20) {
					this.beginCounter = 0;
					this.environment.remote = false;
					this.environment.remoteGround = false;
					this.introState = true;
					this.changed = false;
					//this.videos.endO();
					this.videos.start();
					this.reseted = true;
					this.sceneCounter = 0;
					this.sceneChange = 0;
					this.sceneTimer = 0;
					this.roundScore = 0;
					this.roundScore2 = 0;
					/* this.android18.endurance = 100;
     this.android18.health = 100;
     this.android18.energy = 100;
     this.android18.stamina = 0; */
					this.android18.end = true;
					this.android17.stun = true;
					this.vegeta = new app.Vegeta(500, 1, this.android18);
					this.vegeta.stun = true;
					this.vegeta.end == true;
					this.changeDelay = 0;
					//// TESTS STUFF
					/* this.sceneNum = 3;
     this.battle = 2;
     this.sceneTimer = 0; */
				}
			} else if (this.gameState == this.GAME_STATE.TUTORIAL && this.introState == true && this.reseted == false) {
				this.sceneChange++;
				//this.sound.playBGAudioScene();
				this.environment.fadeInFast = true;
				if (this.sceneChange > 1) {
					this.videos.end();
					this.introState = false;
					this.reseted = true;
					this.changed = false;
					this.gameState = this.GAME_STATE.DEFAULT;
					this.scene = true;
					this.sceneChange = 0;
					this.changeDelay = 0;
				}
			} else if (this.gameState == this.GAME_STATE.VICTORY && this.endingState == true && this.specialScene == false && this.reseted == false) {
				this.videos.endE();
				//this.sound.playEffect(7);
				this.endingState = false;
				if (this.trueEnding == true) {
					this.endingState = false;
					this.specialScene = true;
					this.sceneCounter = 0;
					this.videos.startS();
				} else {
					if (this.totalScore > 0) {
						if (this.finalSaying == false && this.endingState == false && this.specialScene == false) {
							this.sound.playVoice2(Math.round(getRandom(82, 83)));
							this.finalSaying = true;
						}
					} else {
						if (this.finalSaying == false && this.endingState == false && this.specialScene == false) {
							this.sound.playVoice2(Math.round(getRandom(80, 81)));
							this.finalSaying = true;
						}
					}
					this.sound.playBGAudioWin();
				}
				this.reseted = true;
			} else if (this.gameState == this.GAME_STATE.VICTORY && this.specialScene == true && this.reseted == false) {
				this.videos.endE();
				this.videos.endS();
				//this.sound.playEffect(7);
				this.sound.playBGAudioWin();
				this.specialScene = false;
				if (this.totalScore > 0) {
					if (this.finalSaying == false && this.endingState == false && this.specialScene == false) {
						this.sound.playVoice2(Math.round(getRandom(82, 83)));
						this.finalSaying = true;
					}
				} else {
					if (this.finalSaying == false && this.endingState == false && this.specialScene == false) {
						this.sound.playVoice2(Math.round(getRandom(80, 81)));
						this.finalSaying = true;
					}
				}
				this.reseted = true;
			} else if ((this.gameState == this.GAME_STATE.VICTORY || this.gameState == this.GAME_STATE.DEFEAT) && this.endingState != true && this.reseted == false) {
				this.reset();
				this.videos.endE();
				this.videos.endS();
				this.sound.stopBGAudioWin();
				this.sound.stopBGAudioLoss();
				this.videos.startO();
				this.sound.playEffect(65);
				this.endingState = false;
				this.specialScene = false;
				this.titleScreen = true;
			}
		} else if (myKeys.keydown[myKeys.KEYBOARD.KEY_ENTER] != true) {
			this.reseted = false;
		}

		//IN GAME CUTSCENES
		if (this.scene == true) {

			if (this.sceneNum == 0 && this.gameState == this.GAME_STATE.TUTORIAL) {
				// Tutorial
				this.sceneTimer++;
				//this.sceneTimer = 415;
				if (this.sceneTimer < 2) {
					//this.environment.dark = true;
					//this.android18.stun = true;
					//Nothing
				} else if (this.sceneTimer < 20) {
					this.android18.stun = false;
					//this.android18.stun = true;
					//Nothing
				} else if (this.sceneTimer < 21 && this.sceneTimer > 19) {
					this.sound.playBGAudioTutorial();
				} else if (this.sceneTimer < 30 && this.sceneTimer > 28) {
					this.sound.playVoice2(34);
				} else if (this.sceneTimer < 35 && this.sceneTimer > 33) {
					this.sound.playEffect(65);
					this.toggle2 = false;
				} else if (this.sceneTimer < 45 && this.sceneTimer > 43) {
					this.sound.playEffect(65);
					this.toggle1 = false;
				} else if (this.sceneTimer < 82 && this.sceneTimer > 80) {
					this.sound.playVoice1(35);
				} else if (this.sceneTimer < 110 && this.sceneTimer > 108) {
					this.sound.playVoice2(36);
				} else if (this.sceneTimer < 170 && this.sceneTimer > 168) {
					this.sound.playVoice1(37);
				} else if (this.sceneTimer < 190) {} else {
					this.scene = false;
					this.sceneTimer = 0;
					//this.android18.stun = false;
				}
			} //END SCENE 0

			if (this.sceneNum == 1 && this.battle == 0) {
				// PICCOLO ENCOUNTER
				this.sceneTimer++;
				//this.sceneTimer = 615; //TESTING
				if (this.sceneTimer < 2) {
					this.environment.currentSmoke = 170;
					this.environment.dark = true;
					this.android17.superSpeed = false;
					this.android18.superSpeed = false;
					this.android17.cine = 6;
					this.android17.cinematic = true;
					this.android18.cine = 4;
					this.android18.cinematic = true;
					this.android18.stun = true;
					this.environment.fadeInFast = true;
					this.android18.right = true;
					this.android18.left = false;
					this.sound.playEffectLoud(30);
					this.environment.superFlash = true;
					if (this.ranScore < .3) {
						this.roundScore = 400;
						this.roundScore2 = 400;
					} else if (this.ranScore >= .3 && this.ranScore < .7) {
						this.roundScore = 400;
						this.roundScore2 = 400;
					} else if (this.ranScore >= .7) {
						this.roundScore = 400;
						this.roundScore2 = 400;
					}
					//Nothing
				} else if (this.sceneTimer < 40) {
					//Nothing
				} else if (this.sceneTimer < 41) {
					this.environment.decay = true;
					this.sound.playBGAudioScene(0);
					this.sound.playVoice2(0);
					this.environment.buildingActive = true;
				} else if (this.sceneTimer < 52 && this.sceneTimer > 50) {
					this.sound.playVoice1(1);
				} else if (this.sceneTimer < 90 && this.sceneTimer > 88) {
					this.android17.cine = 0;
					this.android18.cine = 0;
				} else if (this.sceneTimer < 100 && this.sceneTimer > 98) {
					//this.android18.cinematic = false;
					this.sound.playVoice1(2);
				} else if (this.sceneTimer < 120 && this.sceneTimer > 118) {
					//this.android17.cinematic = false;
					this.sound.playVoice2(3);
				} else if (this.sceneTimer < 150 && this.sceneTimer > 148) {
					this.android17.hover = false;
					this.android18.hover = false;
					this.android17.cinematic = false;
					this.android18.cinematic = false;
				} else if (this.sceneTimer < 170 && this.sceneTimer > 168) {
					this.sound.playVoice1(84);
				} else if (this.sceneTimer < 180 && this.sceneTimer > 178) {
					this.sound.playVoice2(85);
				} else if (this.sceneTimer < 195 && this.sceneTimer > 193) {
					this.sound.playVoice1(87);
					this.android18.cine = 10;
					this.android18.cinematic = true;
				} else if (this.sceneTimer < 213 && this.sceneTimer > 211) {
					this.sound.playVoice2(86);
					this.android17.cine = 9;
					this.android17.cinematic = true;
				} else if (this.sceneTimer < 240 && this.sceneTimer > 238) {
					this.vegeta.counter = 0;
					this.vegeta.fight = true;
					this.vegeta.appear = true;
					this.vegeta.superSpeed = true;
				} else if (this.sceneTimer < 260 && this.sceneTimer > 258) {
					this.sound.playVoice1(4);
					this.target = true;
					this.android18.right = false;
					this.android18.left = true;
					this.android18.cinematic = false;
					this.android17.cinematic = false;
				} else if (this.sceneTimer < 280 && this.sceneTimer > 278) {
					this.android18.cinematic = true;
					this.android18.cine = 6;
					this.sound.playVoice2(5);
				} else if (this.sceneTimer < 330 && this.sceneTimer > 328) {
					this.sound.playVoice1(6);
				} else if (this.sceneTimer < 370 && this.sceneTimer > 368) {
					this.sound.playVoice2(7);
				} else if (this.sceneTimer < 430 && this.sceneTimer > 428) {
					this.sound.playVoice1(8);
					this.vegeta.scenePlay = true;
				} else if (this.sceneTimer < 443 && this.sceneTimer > 441) {
					this.android18.cinematic = false;
				} else if (this.sceneTimer < 470 && this.sceneTimer > 468) {
					this.android17.cinematic = true;
					this.android17.cine = 9;
				} else if (this.sceneTimer < 480 && this.sceneTimer > 478) {
					this.sound.playVoice2(9);
				} else if (this.sceneTimer < 520 && this.sceneTimer > 518) {
					this.sound.playVoice1(10);
				} else if (this.sceneTimer < 530) {} else {
					//this.vegeta.scenePlay = true;
					//this.vegeta.appear = true; // REMOVE LATER
					//this.vegeta.superSpeed = true; // REMOVE LATER
					this.android17.cinematic = false;
					this.sound.stopBGAudioScene();
					this.sound.playBGAudioScene(1);
					this.scene = false;
					this.sceneTimer = 0;
					this.android18.stun = false;
					this.android17.stun = false;
					this.vegeta.stun = false;
				}
			} //END SCENE 1

			if (this.sceneNum == 2 && this.battle == 1) {
				//VEGETA ENCOUNTER
				this.sceneTimer++;
				//this.sceneTimer = 415;
				if (this.sceneTimer < 2) {
					this.environment.dark = true;
					this.android17.superSpeed = false;
					this.android18.superSpeed = false;
					if (this.android18.position.x < this.android18.LEFTWALL.x + 200) {
						this.android18.fight = true;
						this.android18.appear = true;
						this.android18.superSpeed = true;
						this.android18.position.y = this.android18.GROUND.y;
						this.android18.position.x = 400;
					}
					this.sound.playBGAudioScene(2);
					this.tempPosition = this.android17.position.y;
					this.tempDirLeft = this.android17.left;
					this.android17 = new app.Android17(this.android17.position.x, this.vegeta);
					this.android17.position.y = this.tempPosition;
					if (this.tempDirLeft == false) {
						this.android17.left = false;
						this.android17.right = true;
					} else {
						this.android17.left = true;
						this.android17.right = false;
					}
					this.android17.decision = 1;
					if (this.android17.city == true) {
						this.android17.gone = false;
						this.android17.city = false;
						this.android17.superSpeed = true;
					}
					this.android17.evasion = true;
					this.android17.wentEvasion = true;
					this.android17.wentCity = false;
					this.android17.wentEncounter = false;
					this.android17.encounter = false;
					if (this.android17.position.y < 620) {
						this.android17.air = true;
						this.android17.flying = false;
						this.android17.hover = false;
					}
					this.android17.stun = true;
					this.android18.stun = true;
					//Nothing
				} else if (this.sceneTimer < 20) {
					//Nothing
				} else if (this.sceneTimer < 70) {
					if (this.sceneTimer < 21) {
						this.sound.playTaunt1(0);
					}
				} else if (this.sceneTimer < 180) {
					if (this.sceneTimer < 71) {
						this.sound.playTaunt2(1);
					} else if (this.sceneTimer > 133 && this.sceneTimer < 135) {
						this.android17.city = true;
						this.android17.fight = true;
						this.android17.superSpeed = true;
					} else if (this.sceneTimer > 153 && this.sceneTimer < 155) {
						this.vegeta = new app.Vegeta(100, 0, this.android18);
						this.vegeta.counter = 0;
						this.vegeta.fight = true;
						this.vegeta.appear = true;
						this.vegeta.superSpeed = true;
						this.android18.right = false;
						this.android18.left = true;
					}
				} else if (this.sceneTimer < 240) {
					if (this.sceneTimer < 181) {
						this.android17.decisionTimer = 0;
						this.sound.playTaunt3(2);
					}
					this.target = true;
				} else if (this.sceneTimer < 280) {
					if (this.sceneTimer < 241) {
						this.android17.decisionTimer = 0;
						this.sound.playTaunt1(3);
						this.android18.cinematic = true;
						this.android18.cine = 5;
					}
				} else if (this.sceneTimer < 340) {
					if (this.sceneTimer < 281) {
						this.android17.decisionTimer = 0;
						this.sound.playTaunt2(4);
					}
				} else if (this.sceneTimer < 350) {
					if (this.sceneTimer < 341) {
						this.android17.decisionTimer = 0;
						this.sound.playTaunt3(5);
					}
				} else if (this.sceneTimer < 385) {
					if (this.sceneTimer < 351) {
						this.android17.decisionTimer = 0;
						if (this.aiChoice1 < .5) {
							this.sound.playTaunt1(6);
						} else {
							this.sound.playTaunt1(7);
						}
					}
				} else if (this.sceneTimer < 625) {
					if (this.sceneTimer < 386) {
						this.sound.stopBGAudioScene();
						this.sound.playBGAudioScene(3);
						this.android17.decisionTimer = 0;
						this.sound.playTaunt2(30);
						this.vegeta.cinematic = true;
						this.vegeta.cine = 1;
					}
					if (this.sceneTimer < 416 && this.sceneTimer > 414) {
						this.vegeta.cinematic = false;
						this.vegeta.scenePlay = true;
						this.sound.playTaunt2(31);
					}
					if (this.sceneTimer < 533 && this.sceneTimer > 415) {
						this.android18.position.x += .6;
						this.environment.deathLocationPiccolo.x += .4;
						this.environment.capeLocation.x += .4;
					}
					if (this.sceneTimer < 535 && this.sceneTimer > 533) {
						this.vegeta.cinematic = true;
						this.vegeta.cine = 0;
					}
					if (this.sceneTimer < 586 && this.sceneTimer > 584) {
						this.android18.cinematic = false;
						this.vegeta.cinematic = false;
						this.android17.decisionTimer = 0;
						if (this.aiChoice1 < .5) {
							this.sound.playTaunt2(9);
						} else {
							this.sound.playTaunt2(9);
						}
						this.sound.stopEffect();
					}
				} else {
					this.android17.decisionTimer = 0;
					//this.vegeta.appear = true; // REMOVE LATER
					//this.vegeta.superSpeed = true; // REMOVE LATER
					this.sound.stopBGAudioScene();
					this.sound.playBGAudio();
					this.scene = false;
					this.sceneTimer = 0;
					this.vegeta.cinematic = false;
					this.android18.stun = false;
					this.android17.stun = false;
					this.vegeta.stun = false;
				}
			} //END SCENE 2

			if (this.sceneNum == 3 && this.battle == 2) {
				// TRIPLE ENCOUNTER
				this.sceneTimer++;
				//this.sceneTimer = 700;
				if (this.sceneTimer < 2) {
					this.android17.superSpeed = false;
					this.android18.superSpeed = false;
					this.environment.dark = true;
					this.sound.playBGAudioScene(5);
					this.tempPosition = this.android17.position.y;
					this.tempDirLeft = this.android17.left;
					this.android17 = new app.Android17(this.android17.position.x, this.vegeta);
					this.android17.position.y = this.tempPosition;
					if (this.tempDirLeft == false) {
						this.android17.left = false;
						this.android17.right = true;
					} else {
						this.android17.left = true;
						this.android17.right = false;
					}
					this.android17.decision = -1;
					//this.android17.flying = false;
					if (this.android17.city == true) {
						this.android17.gone = false;
						this.android17.city = false;
						this.android17.superSpeed = true;
					}
					this.android17.evasion = false;
					this.android17.wentEvasion = false;
					this.android17.wentCity = false;
					this.android17.wentEncounter = false;
					this.android17.encounter = false;
					if (this.android17.position.y < 620) {
						this.android17.air = true;
						this.android17.flying = false;
						this.android17.hover = false;
					}
					this.android17.stun = true;
					this.android18.stun = true;
				} else if (this.sceneTimer < 40) {
					//Nothing
				} else if (this.sceneTimer < 41) {
					this.sound.playVoice1(13);
				} else if (this.sceneTimer < 67 && this.sceneTimer > 65) {
					this.sound.playVoice2(14);
				} else if (this.sceneTimer < 90 && this.sceneTimer > 88) {
					this.android18.fight = true;
					this.android18.appear = true;
					this.android18.superSpeed = true;
					this.android18.aboveBuilding = false;
					this.android18.position.y = 620;
					this.android18.position.x = 400;
					this.android18.right = true;
					this.android18.left = false;
					this.android17.fight = true;
					//this.android17.appear = true;
					this.android17.superSpeed = true;
					this.android17 = new app.Android17(500, this.vegeta);
					this.android18.aboveBuilding = false;
					this.android17.position.y = 620;
					this.android17.position.x = 500;
					this.android17.superSpeed = true;
					this.android17.appear = true;
					this.android17.right = false;
					this.android17.left = true;
					this.android18.cine = 10;
					this.android18.cinematic = true;
					this.android17.cine = 9;
					this.android17.cinematic = true;
				} else if (this.sceneTimer < 110 && this.sceneTimer > 108) {
					this.environment.yamcha = true;
					this.sound.playSpecialReaction(41);
				} else if (this.sceneTimer < 130 && this.sceneTimer > 128) {
					this.sound.playVoice1(15);
					this.environment.chaotzu = true;
					this.android17.right = true;
					this.android17.left = false;
					this.sound.playSpecialReaction(41);
					this.android18.cinematic = false;
					this.android17.cinematic = false;
				} else if (this.sceneTimer < 150 && this.sceneTimer > 148) {
					this.sound.playVoice2(16);
				} else if (this.sceneTimer < 190 && this.sceneTimer > 188) {
					this.sound.playVoice1(17);
				} else if (this.sceneTimer < 210 && this.sceneTimer > 208) {
					this.sound.playVoice2(18);
				} else if (this.sceneTimer < 270 && this.sceneTimer > 268) {
					this.sound.playVoice1(19);
				} else if (this.sceneTimer < 280 && this.sceneTimer > 278) {
					this.android17.cine = 1;
					this.android17.cinematic = true;
					//this.sound.stopBGAudioScene();
					//this.android17.gone = false;
					this.android17.right = true;
					this.android17.left = false;
					this.environment.braced = true;
					this.support[0].fight = true;
					this.support[0].appear = true;
					this.support[0].superSpeed = true;
				} else if (this.sceneTimer < 285 && this.sceneTimer > 283) {
					//this.sound.playVoice2(22);
				} else if (this.sceneTimer < 295 && this.sceneTimer > 293) {
					this.sound.stopBGAudioScene();
					this.sound.playVoice2(20); //take this
					this.sound.playEffect(31);
					this.environment.superFlash = true;
				} else if (this.sceneTimer < 320 && this.sceneTimer > 318) {
					this.roundScore2 += 200;
					this.environment.buildingActive = false;
					this.sound.playBGAudioScene(6);
					this.environment.cityAttacked = true;
					this.yamchaDead = true;
					this.chaotzuDead = true;
				} else if (this.sceneTimer < 330 && this.sceneTimer > 328) {
					this.sound.playVoice2(21);
					this.environment.shake = true;
					this.environment.decay = true;
				} else if (this.sceneTimer < 345 && this.sceneTimer > 343) {
					this.support[0].taunting = true;
					this.sound.playVoice1(23);
				} else if (this.sceneTimer < 365 && this.sceneTimer > 363) {
					this.android17.right = false;
					this.android17.left = true;
					this.android18.right = false;
					this.android18.left = true;
					this.android17.cinematic = false;
					this.support[0].taunting = false;
					this.support[1].fight = true;
					this.support[1].appear = true;
					this.support[1].superSpeed = true;
				} else if (this.sceneTimer < 380 && this.sceneTimer > 378) {
					this.sound.playVoice2(24);
				} else if (this.sceneTimer < 390 && this.sceneTimer > 388) {
					this.sound.playVoice1(25);
					this.support[0].cinematic = true;
					this.support[0].cine = 1;
				} else if (this.sceneTimer < 400 && this.sceneTimer > 398) {
					//this.sound.playVoice2(26);
				} else if (this.sceneTimer < 430 && this.sceneTimer > 428) {
					this.sound.playVoice1(27);
					this.support[1].cinematic = true;
					this.support[1].cine = 1;
				} else if (this.sceneTimer < 455 && this.sceneTimer > 453) {
					this.sound.playVoice2(28);
				} else if (this.sceneTimer < 480 && this.sceneTimer > 478) {
					this.vegeta.fight = true;
					this.vegeta.appear = true;
					this.vegeta.superSpeed = true;
					this.vegeta.vanish = false;
				} else if (this.sceneTimer < 490 && this.sceneTimer > 488) {
					this.support[0].cinematic = false;
					this.support[1].cinematic = false;
					this.sound.playVoice1(29);
					this.sound.stopBGAudioScene();
					this.sound.playBGAudioScene(7);
				} else if (this.sceneTimer < 520 && this.sceneTimer > 518) {
					this.android18.cinematic = true;
					this.android18.cine = 5;
					this.sound.playVoice2(30);
				} else if (this.sceneTimer < 550 && this.sceneTimer > 548) {
					this.sound.playVoice1(31);
				} else if (this.sceneTimer < 590 && this.sceneTimer > 588) {
					this.sound.playVoice2(32);
				} else if (this.sceneTimer < 610 && this.sceneTimer > 608) {
					this.android17.cinematic = true;
					this.android17.cine = 8;
					this.sound.playVoice2(26);
				} else if (this.sceneTimer < 650 && this.sceneTimer > 648) {
					this.android18.cinematic = false;
					this.sound.playVoice1(33);
					this.vegeta.cinematic = true;
					this.vegeta.cine = 2;
				} else if (this.sceneTimer < 680) {} else {
					this.android17.cinematic = false;
					/* this.vegeta.appear = true; // REMOVE LATER
     this.vegeta.superSpeed = true; // REMOVE LATER
     this.support[0].appear = true; // REMOVE LATER
     this.support[0].superSpeed = true; // REMOVE LATER
     this.support[1].appear = true; // REMOVE LATER
     this.support[1].superSpeed = true; // REMOVE LATER
     this.environment.cityAttacked = true; */
					this.sound.stopBGAudioScene();
					this.sound.playBGAudioScene(8);
					this.scene = false;
					this.sceneTimer = 0;
					this.android17.decision = 1;
					this.android17.evasion = true;
					this.android17.wentEvasion = true;
					this.android18.stun = false;
					this.android17.stun = false;
					this.vegeta.stun = false;
					this.vegeta.cinematic = false;
					this.support[0].stun = false;
					this.support[1].stun = false;
				}
			} //END SCENE 3

			if (this.sceneNum == 4 && this.battle == 2 && this.trueEnding == false) {
				// Ending False
				this.sceneTimer++;
				//this.sceneTimer = 415;
				if (this.sceneTimer < 2) {
					this.android17.superSpeed = false;
					this.android18.superSpeed = false;
					this.environment.dark = true;
					this.sound.playBGAudioScene(11);
					this.sound.playVoice1(38);
					this.tempPosition = this.android17.position.y;
					this.tempDirLeft = this.android17.left;
					this.android17 = new app.Android17(this.android17.position.x, this.vegeta);
					this.android17.position.y = this.tempPosition;
					if (this.tempDirLeft == false) {
						this.android17.left = false;
						this.android17.right = true;
					} else {
						this.android17.left = true;
						this.android17.right = false;
					}
					//this.android17.hover = false;
					this.android17.decision = -1;
					if (this.android17.position.y < 620) {
						this.android17.air = true;
						this.android17.flying = false;
						this.android17.hover = false;
					}
					if (this.android17.city == true) {
						this.android17.gone = false;
						this.android17.city = false;
						this.android17.superSpeed = true;
					}
					this.android17.evasion = false;
					this.android17.wentEvasion = false;
					this.android17.wentCity = false;
					this.android17.wentEncounter = false;
					this.android17.encounter = false;
					this.android17.stun = true;
					this.android18.stun = true;
					this.support[0].stun = true;
					this.support[1].stun = true;
					this.support[0].exhausted = true;
					this.support[1].exhausted = true;
					this.support[0].aggressive = false;
					this.support[1].aggressive = false;
					this.support[0].blasting = false;
					this.support[1].blasting = false;
					this.support[0].powerMove = false;
					this.support[1].powerMove = false;
					this.support[0].triggerBlast = false;
					this.support[1].triggerBlast = false;
					if (this.support[0].position.x < 500) {
						this.support[0].right = true;
						this.support[0].left = false;
					} else {
						this.support[0].right = false;
						this.support[0].left = true;
					}
					if (this.support[1].position.x < 500) {
						this.support[1].right = true;
						this.support[1].left = false;
					} else {
						this.support[1].right = false;
						this.support[1].left = true;
					}
				} else if (this.sceneTimer < 40) {
					//Nothing
				} else if (this.sceneTimer < 51) {
					this.sound.playVoice2(39);
				} else if (this.sceneTimer < 67 && this.sceneTimer > 65) {
					this.sound.playVoice1(40);
				} else if (this.sceneTimer < 80 && this.sceneTimer > 78) {
					this.sound.playVoice2(41);
					if (this.vegeta.right == true) {
						this.android17 = new app.Android17(500, this.vegeta);
						this.android17.position.y = this.android17.GROUND.y;
						this.android17.position.x = this.vegeta.position.x + 200;
						this.android17.superSpeed = true;
						this.android17.appear = true;
						this.android17.right = false;
						this.android17.left = true;
					} else if (this.vegeta.left == true) {
						this.android17 = new app.Android17(500, this.vegeta);
						this.android17.position.y = this.android17.GROUND.y;
						this.android17.position.x = this.vegeta.position.x - 200;
						this.android17.superSpeed = true;
						this.android17.appear = true;
						this.android17.right = true;
						this.android17.left = false;
					}
					this.android17.cine = 1;
					this.android17.cinematic = true;
				} else if (this.sceneTimer < 120 && this.sceneTimer > 118) {
					this.sound.playVoice1(42);
					if (this.vegeta.right == true) {
						this.android18.fight = true;
						this.android18.appear = true;
						this.android18.superSpeed = true;
						this.android18.position.y = this.android18.GROUND.y;
						this.android18.position.x = this.vegeta.position.x + 110;
						this.android18.right = true;
						this.android18.left = true;
						this.android17.fight = false;
					} else if (this.vegeta.left == true) {
						this.android18.fight = true;
						this.android18.appear = true;
						this.android18.superSpeed = true;
						this.android18.position.y = this.android18.GROUND.y;
						this.android18.position.x = this.vegeta.position.x - 110;
						this.android18.right = true;
						this.android18.left = false;
						this.android17.fight = true;
					}
				} else if (this.sceneTimer < 140 && this.sceneTimer > 138) {
					this.sound.playVoice2(43);
					this.android17.cinematic = false;
				} else if (this.sceneTimer < 150 && this.sceneTimer > 148) {
					this.android18.cine = 1;
					this.android18.cinematic = true;
					this.sound.playEffect(8);
				} else if (this.sceneTimer < 160 && this.sceneTimer > 158) {
					this.sound.playVoice1(44);
				} else if (this.sceneTimer < 175 && this.sceneTimer > 173) {
					if (this.savesGohan > .5) {
						//Tien
						this.sound.playVoice2(45);
					} else {
						//Krillin
						this.sound.playVoice2(46);
					}
				} else if (this.sceneTimer < 185 && this.sceneTimer > 183) {
					//TELEPORT AND PREPAPE SOLAR FLARE
					if (this.savesGohan > .5) {
						//Tien
						this.support[0].position.y = 250;
						//this.support[0].position.x = this.vegeta.position.x + 200;
						this.support[0].superSpeed = true;
						this.support[0].appear = true;
						this.support[0].cine = 0;
						this.support[0].cinematic = true;
						this.support[0].air = true;
						this.support[0].flying = true;
						/*
      this.support[0].blasting = true;
      this.support[0].attacking = true;
      this.support[0].hover = true; */
					} else {
						//Krillin
						this.support[1].position.y = 250;
						//this.support[0].position.x = this.vegeta.position.x + 200;
						this.support[1].superSpeed = true;
						this.support[1].appear = true;
						this.support[1].cine = 0;
						this.support[1].cinematic = true;
						this.support[1].air = true;
						this.support[1].flying = true;
						/*
      this.support[1].blasting = true;
      this.support[1].attacking = true;
      this.support[1].hover = true; */
					}
				} else if (this.sceneTimer > 184 && this.sceneTimer < 260) {
					//TELEPORT AND PREPAPE SOLAR FLARE
					if (this.sceneTimer < 230) {
						if (this.sceneTimer % 2 == 0) {
							if (this.savesGohan > .5) {
								//Tien
								this.support[0].flying = true;
							} else {
								//Krillin
								this.support[1].flying = true;
							}
						} else {
							if (this.savesGohan > .5) {
								//Tien
								this.support[0].jumpVelocity.y = 0;
								this.support[0].flying = false;
							} else {
								//Krillin
								this.support[1].jumpVelocity.y = 0;
								this.support[1].flying = false;
							}
						}
					}

					if (this.sceneTimer < 190 && this.sceneTimer > 188) {
						if (this.savesGohan > .5) {
							//Tien
							this.sound.playTaunt7(11);
						} else {
							//Krillin
							this.sound.playTaunt8(7);
						}
					} else if (this.sceneTimer < 200 && this.sceneTimer > 198) {
						this.android18.cinematic = false;
						this.sound.playEffect(35);
						this.environment.superFlash = true;
					} else if (this.sceneTimer < 214 && this.sceneTimer > 212) {
						this.environment.decay = true;
						this.android17.cinematic = true;
						this.android17.cine = 5;
						this.android18.cinematic = true;
						this.android18.cine = 3;
						//this.sound.playVoice2(18);
					} else if (this.sceneTimer < 220 && this.sceneTimer > 218) {
						this.sound.playVoice1(48);
						//this.environment.decay = true;
						//this.sound.playVoice2(18);
					} else if (this.sceneTimer < 230 && this.sceneTimer > 228) {
						//GOHAN TELEPORT
						this.vegeta.superSpeed = true;
						this.vegeta.appear = false;
						this.vegeta.vanish = true;
						this.support[0].flying = false;
						this.support[0].blasting = false;
						this.support[0].attacking = false;
						this.support[0].hover = false;
						this.support[0].cinematic = false;
						this.support[1].flying = false;
						this.support[1].blasting = false;
						this.support[1].attacking = false;
						this.support[1].hover = false;
						this.support[1].cinematic = false;
					} else if (this.sceneTimer < 260 && this.sceneTimer > 258) {
						this.android17.cine = 10;
						this.android18.cine = 9;
						if (this.savesGohan > .5) {
							//Tien
							this.sound.playVoice2(49);
						} else {
							//Krillin
							this.sound.playVoice2(50);
						}
					}
				} else if (this.sceneTimer < 290 && this.sceneTimer > 288) {
					this.sound.playVoice2(51);
				} else if (this.sceneTimer < 300 && this.sceneTimer > 298) {
					this.android18.cine = 4;
					this.android18.cinematic = true;
					//this.android17.position.y -= 20;
					//this.android18.position.y -= 20;
					//this.sound.playVoice2(52);
					/* this.sound.playVoice2(20); //take this
     this.sound.playEffect(31);
     this.environment.superFlash = true; */
				} else if (this.sceneTimer < 301 && this.sceneTimer > 299) {
					this.android17.cine = 6;
					this.android17.cinematic = true;
					this.sound.playEnergyAttack(27);
					//this.android17.position.y -= 20;
					//this.android18.position.y -= 20;
					//this.sound.playVoice2(52);
					/* this.sound.playVoice2(20); //take this
     this.sound.playEffect(31);
     this.environment.superFlash = true; */
				} else if (this.sceneTimer < 320 && this.sceneTimer > 318) {
					this.sound.playVoice2(53);
					/* this.roundScore += 200;
     this.environment.buildingActive = false;
     this.sound.playBGAudioScene(6);
     this.yamchaDead = true;
     this.chaotzuDead = true; */
				} else if (this.sceneTimer < 321 && this.sceneTimer > 319) {
					this.sound.playVoice1(52);
					/* this.roundScore += 200;
     this.environment.buildingActive = false;
     this.sound.playBGAudioScene(6);
     this.yamchaDead = true;
     this.chaotzuDead = true; */
				} else if (this.sceneTimer < 330 && this.sceneTimer > 328) {
					/* this.sound.playVoice2(21);
     this.environment.shake = true;
     this.environment.decay = true; */
					this.sound.playEffectLoud(40); //Maybe make louder
					this.environment.superFlash = true;
					this.environment.shake = true;
				} else if (this.sceneTimer < 400 && this.sceneTimer > 398) {
					this.environment.fadeOut = true;
				} else if (this.sceneTimer < 460) {} else {
					//this.vegeta.appear = true; // REMOVE LATER
					//this.vegeta.superSpeed = true; // REMOVE LATER
					this.sound.stopBGAudioScene();
					//this.sound.playBGAudioScene(8);
					this.environment.darkness = 0;
					this.scene = false;
					this.sceneTimer = 0;
					this.sceneNum = 100;
					this.environment.superFlash = false;
					this.environment.fadeOut = false;
					//End Game
					this.android18.stun = true;
					//this.android18.end = true;
					this.vegeta.stun = true;
					this.vegeta.end = true;
					this.gameState = this.GAME_STATE.VICTORY;
					this.sceneCounter = 0;
					this.endingState = true;
					this.sound.stopBGAudio();
					this.sound.stopBGAudioScene();
					this.videos.startE();
				}
			} //END SCENE 4

			if (this.sceneNum == 4 && this.battle == 2 && this.trueEnding == true) {
				// Ending TRUE
				this.sceneTimer++;
				//this.sceneTimer = 415;

				if (this.sceneTimer < 533 && this.sceneTimer > 415) {
					if (this.vegeta.right == true) {
						this.android18.position.x += .8;
						this.android17.position.x += .8;
					} else {
						this.android18.position.x -= .8;
						this.android17.position.x -= .8;
					}
				} else if (this.sceneTimer < 534 && this.sceneTimer > 532) {
					if (this.vegeta.right == true) {
						this.android18.velocity.x += 25;
					} else {
						this.android18.velocity.x -= 25;
					}

					this.android18.decelerate();
				}

				if (this.sceneTimer < 2) {
					this.android17.superSpeed = false;
					this.android18.superSpeed = false;
					this.environment.dark = true;
					this.sound.playBGAudioScene(12);
					this.sound.playVoice1(54);
					this.environment.braced = false;
					this.tempPosition = this.android17.position.y;
					this.tempDirLeft = this.android17.left;
					this.android17 = new app.Android17(this.android17.position.x, this.vegeta);
					this.android17.position.y = this.tempPosition;
					if (this.tempDirLeft == false) {
						this.android17.left = false;
						this.android17.right = true;
					} else {
						this.android17.left = true;
						this.android17.right = false;
					}
					//this.android17.hover = false;
					this.android17.decision = -1;
					if (this.android17.position.y < 620) {
						this.android17.air = true;
						this.android17.flying = false;
						this.android17.hover = false;
					}
					if (this.android17.city == true) {
						this.android17.gone = false;
						this.android17.city = false;
						this.android17.superSpeed = true;
					}
					this.android17.evasion = false;
					this.android17.wentEvasion = false;
					this.android17.wentCity = false;
					this.android17.wentEncounter = false;
					this.android17.encounter = false;
					this.android17.stun = true;
					this.android18.stun = true;
					if (this.vegeta.right == true) {
						this.vegeta = new app.Vegeta(500, 3, this.android18);
						this.vegeta.position.y = this.vegeta.GROUND.y;
						this.vegeta.position.x = this.vegeta.LEFTWALL.x + 50;
						this.vegeta.superSpeed = true;
						this.vegeta.appear = true;
						this.vegeta.right = true;
						this.vegeta.left = false;
					} else {
						this.vegeta = new app.Vegeta(500, 3, this.android18);
						this.vegeta.position.y = this.vegeta.GROUND.y;
						this.vegeta.position.x = this.vegeta.RIGHTWALL.x - 50;
						this.vegeta.superSpeed = true;
						this.vegeta.appear = true;
						this.vegeta.right = false;
						this.vegeta.left = true;
					}
					this.vegeta.cinematic = true;
					this.vegeta.cine = 1;
				} else if (this.sceneTimer < 15 && this.sceneTimer > 13) {
					this.sound.playVoice1(55);
				} else if (this.sceneTimer < 40 && this.sceneTimer > 38) {
					//this.sound.playVoice1(55);
					if (this.vegeta.right == true) {
						this.android17 = new app.Android17(500, this.vegeta);
						this.android17.position.y = this.android17.GROUND.y;
						this.android17.position.x = this.vegeta.position.x + 500;
						this.android17.superSpeed = true;
						this.android17.appear = true;
						this.android17.right = false;
						this.android17.left = true;
						this.android18.fight = true;
						this.android18.appear = true;
						this.android18.superSpeed = true;
						this.android18.position.y = this.android18.GROUND.y;
						this.android18.position.x = this.vegeta.position.x + 600;
						this.android18.right = false;
						this.android18.left = true;
					} else if (this.vegeta.left == true) {
						this.android17 = new app.Android17(500, this.vegeta);
						this.android17.position.y = this.android17.GROUND.y;
						this.android17.position.x = this.vegeta.position.x - 500;
						this.android17.superSpeed = true;
						this.android17.appear = true;
						this.android17.right = true;
						this.android17.left = false;
						this.android18.fight = true;
						this.android18.appear = true;
						this.android18.superSpeed = true;
						this.android18.position.y = this.android18.GROUND.y;
						this.android18.position.x = this.vegeta.position.x - 600;
						this.android18.right = true;
						this.android18.left = false;
					}
				} else if (this.sceneTimer < 45 && this.sceneTimer > 43) {
					this.sound.playVoice2(56);
				} else if (this.sceneTimer < 60 && this.sceneTimer > 58) {
					this.sound.playVoice1(57);
				} else if (this.sceneTimer < 100 && this.sceneTimer > 98) {
					this.sound.playVoice2(58);
					this.vegeta.cine = 0;
				} else if (this.sceneTimer < 110 && this.sceneTimer > 108) {
					this.vegeta.cinematic = false;
					this.vegeta.charging = true;
					this.sound.playEffect(28);
					//app.main.sound.playEffect(28);
					this.environment.powerUp = true;
				} else if (this.sceneTimer < 130 && this.sceneTimer > 128) {
					this.sound.playVoice2(66);
				} else if (this.sceneTimer < 150 && this.sceneTimer > 148) {
					this.android17.cinematic = true;
					this.android17.cine = 9;
				} else if (this.sceneTimer < 155 && this.sceneTimer > 153) {
					this.sound.playVoice1(59);
				} else if (this.sceneTimer < 160 && this.sceneTimer > 158) {
					this.sound.playSpecialReaction(4);
				} else if (this.sceneTimer < 174 && this.sceneTimer > 159) {
					this.android17.cinematic = true;
					this.android17.cine = 2;
					if (this.android17.right == true) {
						this.android17.moveRight();
					} else {
						this.android17.moveLeft();
					}
					this.android17.position.y -= 3;
					if (this.sceneTimer < 170 && this.sceneTimer > 168) {
						this.sound.playVoice2(67);
						app.main.sound.playEffect(43);
						this.vegeta.almostSS = true;
					}
				} else if (this.sceneTimer < 178 && this.sceneTimer > 176) {
					this.sound.playVoice2(69);
					this.environment.superFlash = true;
					this.vegeta.superForm = true;
					this.environment.colorSky = true;
					this.sound.playVoice1(60);
					this.sound.playEffect(44);
					this.sound.playBackground(0);
				} else if (this.sceneTimer < 205 && this.sceneTimer > 203) {
					//this.environment.superFlash = false;
					this.android17.cinematic = false;
					this.sound.playVoice2(68);
					this.environment.decay = true;
				} else if (this.sceneTimer < 206 && this.sceneTimer > 204) {
					this.vegeta.almostSS = true;
				} else if (this.sceneTimer < 210 && this.sceneTimer > 208) {
					//this.environment.decay = true;
					this.android18.cinematic = true;
					this.android18.cine = 3;
					this.sound.playBGAudioScene(13);
					if (this.vegeta.left == true) {
						this.android17.position.x = 600;
						this.android17.position.y = 500;
						this.android17.end = true;
					} else if (this.vegeta.right == true) {
						this.android17.position.x = 300;
						this.android17.position.y = 500;
						this.android17.end = true;
					}
					this.sound.playVoice1(88);
					this.roundScore2 -= 250;
				} else if (this.sceneTimer < 222 && this.sceneTimer > 210) {
					if (this.vegeta.left == true) {
						this.android17.position.x -= 70;
					} else if (this.vegeta.right == true) {
						this.android17.position.x += 70;
					}
					this.vegeta.almostSS = true;
					this.vegeta.lockSS = true;
					//this.android17.position.y += 12;
				} else if (this.sceneTimer < 234 && this.sceneTimer > 232) {
					//this.android17.position.y += 12;
					this.vegeta.lockSS = false;
				} else if (this.sceneTimer < 238 && this.sceneTimer > 236) {
					this.sound.playIntro(57);
				} else if (this.sceneTimer < 240 && this.sceneTimer > 238) {
					this.android18.cinematic = false;
					this.sound.playVoice2(62);
				} else if (this.sceneTimer < 260 && this.sceneTimer > 258) {
					this.sound.playVoice1(61);
					if (this.vegeta.right == true) {
						this.android17 = new app.Android17(500, this.vegeta);
						this.android17.position.y = this.android17.GROUND.y;
						this.android17.position.x = this.vegeta.RIGHTWALL.x;
						this.android17.superSpeed = true;
						this.android17.appear = true;
						this.android17.right = false;
						this.android17.left = true;
					} else if (this.vegeta.left == true) {
						this.android17 = new app.Android17(500, this.vegeta);
						this.android17.position.y = this.android17.GROUND.y;
						this.android17.position.x = this.vegeta.LEFTWALL.x;
						this.android17.superSpeed = true;
						this.android17.appear = true;
						this.android17.right = true;
						this.android17.left = false;
					}
					this.android17.cinematic = true;
					this.android17.cine = 3;
				} else if (this.sceneTimer < 290 && this.sceneTimer > 288) {
					this.sound.playVoice2(63);
				} else if (this.sceneTimer < 340 && this.sceneTimer > 338) {
					this.sound.playVoice1(64);
					this.android18.cinematic = true;
					this.android18.cine = 8;
				} else if (this.sceneTimer < 380 && this.sceneTimer > 378) {
					this.sound.playVoice2(65);
				} else if (this.sceneTimer < 385 && this.sceneTimer > 383) {
					this.environment.superFlash = true;
					this.environment.decay = true;
					this.environment.shake = true;
					this.vegeta.stun = false;
					this.vegeta.cinematic = false;
					this.vegeta.superSpeed = true;
					this.vegeta.position.x = this.android18.position.x - 50;
				} else if (this.sceneTimer < 390) {} else {
					//this.vegeta.appear = true; // REMOVE LATER
					//this.vegeta.superSpeed = true; // REMOVE LATER
					this.sound.stopBGAudioScene();
					this.sound.playBGAudioScene(14);
					this.scene = false;
					this.sceneNum = -1;
					this.environment.powerUp = false;
					this.sceneTimer = 0;
					this.battle = 3;
					this.android17.decision = -1;
					this.android17.evasion = false;
					this.android17.encounter = false;
					this.android18.stun = false;
					this.android18.cinematic = false;
					//this.android17.stun = false;
					//this.vegeta.stun = false;
					//this.vegeta.cinematic = false;
				}
			} //END SCENE 4 ALT

			if (this.sceneNum == 5 && this.battle == 3 && this.trueEnding == true) {
				// Ending TRUE FINAL
				this.sceneTimer++;
				//this.sceneTimer = 415;
				if (this.sceneTimer < 2) {
					this.android17.superSpeed = false;
					this.android18.superSpeed = false;
					this.environment.dark = true;
					this.sound.playBGAudioScene(15);
					if (this.android17.position.y < 620) {
						this.android17.air = true;
						this.android17.flying = false;
						this.android17.hover = false;
					}
					this.android17.stun = true;
					this.android18.stun = true;
				} else if (this.sceneTimer < 20 && this.sceneTimer > 18) {
					this.sound.playVoice1(70);
				} else if (this.sceneTimer < 53 && this.sceneTimer > 51) {
					this.sound.playTaunt6(36);
				} else if (this.sceneTimer < 55 && this.sceneTimer > 53) {
					this.vegeta.trueDead = true;
					//this.sound.playTaunt6(36);
					this.sound.playSpecialReaction(2);
				} else if (this.sceneTimer < 70 && this.sceneTimer > 68) {
					this.target = false;
					this.android18.fight = true;
					this.android18.superSpeed = true;
					this.android18.appear = true;
					if (this.android17.left == true) {
						this.android18.position.x = this.android17.position.x - 100;
						this.android18.right = true;
						this.android18.left = false;
					} else if (this.android17.right == true) {
						this.android18.position.x = this.android17.position.x + 100;
						this.android18.right = false;
						this.android18.left = true;
					}
				} else if (this.sceneTimer < 80 && this.sceneTimer > 78) {
					this.sound.playVoice1(71);
				} else if (this.sceneTimer < 110 && this.sceneTimer > 108) {
					this.sound.playVoice1(72);
					this.android17.cinematic = true;
					this.android17.cine = 4;
				} else if (this.sceneTimer < 145 && this.sceneTimer > 143) {
					this.sound.playVoice2(73);
					this.android18.cinematic = true;
					this.android18.cine = 5;
				} else if (this.sceneTimer < 190 && this.sceneTimer > 188) {
					this.android17.cinematic = false;
				} else if (this.sceneTimer < 200 && this.sceneTimer > 198) {
					this.sound.playVoice1(74);
				} else if (this.sceneTimer < 259 && this.sceneTimer > 248) {
					this.android17.stun = false;
					this.android17.flying = true;
					this.android17.air = true;
					//this.android17.position.y -= 5; FLYING
				} else if (this.sceneTimer < 260 && this.sceneTimer > 258) {
					this.android17.flying = false;
					this.android17.superSpeed = true;
				} else if (this.sceneTimer < 262 && this.sceneTimer > 260) {
					this.android17.gone = true;
					this.android17.vanish = true;
				} else if (this.sceneTimer < 280 && this.sceneTimer > 278) {
					this.sound.playVoice2(75);
					this.android18.cine = 7;
				} else if (this.sceneTimer < 290 && this.sceneTimer > 288) {
					this.android18.fight = true;
					this.android18.superSpeed = true;
					this.android18.appear = true;
				} else if (this.sceneTimer < 394 && this.sceneTimer > 290) {
					this.android18.vanish = true;
					this.environment.currentSmoke += .3;
				} else if (this.sceneTimer < 395 && this.sceneTimer > 393) {
					this.environment.android16 = true;
				} else if (this.sceneTimer < 396 && this.sceneTimer > 394) {
					this.environment.tele16 = true;
					app.main.sound.playSpecialReaction(20);
				} else if (this.sceneTimer < 400 && this.sceneTimer > 398) {
					this.sound.playVoice2(76);
				} else if (this.sceneTimer < 430 && this.sceneTimer > 428) {
					this.sound.playVoice2(77);
				} else if (this.sceneTimer < 470 && this.sceneTimer > 468) {
					this.sound.playEffectLoud(46);
				} else if (this.sceneTimer < 480 && this.sceneTimer > 478) {
					this.sound.playVoice2(78);
				} else if (this.sceneTimer < 525 && this.sceneTimer > 523) {
					this.environment.braced = true;
					this.sound.playEffectLoud(45);
				} else if (this.sceneTimer < 530 && this.sceneTimer > 528) {
					this.sound.playVoice2(79);
				} else if (this.sceneTimer < 540 && this.sceneTimer > 538) {
					app.main.sound.playSpecialReaction(19);
					this.environment.tele16 = true;
					this.environment.fadeOut = true;
				} else if (this.sceneTimer < 541 && this.sceneTimer > 539) {
					this.environment.android16 = false;
				} else if (this.sceneTimer < 600) {} else {
					//this.vegeta.appear = true; // REMOVE LATER
					//this.vegeta.superSpeed = true; // REMOVE LATER
					this.sound.stopBGAudioScene();
					this.sound.stopBackground(0);
					//this.sound.playBGAudioScene(14);
					this.sceneNum = 4;
					this.battle = 2;
					this.scene = false;
					this.environment.darkness = 0;
					//this.sceneTimer = 0;
					//this.sceneNum = 4;
					//this.battle = 2;
					this.environment.fadeOut = false;
					this.environment.powerUp = false;
					//End Game
					this.android18.stun = true;
					//this.android18.end = true;
					this.vegeta.stun = true;
					this.vegeta.end = true;
					this.gameState = this.GAME_STATE.VICTORY;
					this.sceneCounter = 0;
					this.endingState = true;
					this.sound.stopBGAudio();
					this.sound.stopBGAudioScene();
					this.videos.startE();
				}
			} //END SCENE 5
		}

		if (this.gameState == this.GAME_STATE.DEFAULT || this.gameState == this.GAME_STATE.TUTORIAL) {

			//CHECK FOR MOVEMENT (KEY STROKES)
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT] != true && myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT] != true) {
				//standing or flying still
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT] && myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT] != true && this.android18.stun == false && (this.android18.hard == false || this.android18.down == true) && this.android18.taunting == false && this.android18.blocking == false && this.android18.powerMove == false) {
				if (this.activeSupport == false) {
					if (attackHitTest(this.android18, this.vegeta) == true && this.android18.right == true && (this.android18.position.x > this.vegeta.position.x - 60 || this.android18.reverse == true)) {
						// Do Nothing
					} else {
						this.android18.moveRight();
						//this.vegeta.moveRight();
					}
				} else {
					if ((attackHitTest(this.android18, this.vegeta) == true || hitTest(this.android18, this.support[0]) == true && this.support[0].vanish == false || hitTest(this.android18, this.support[1]) == true && this.support[1].vanish == false) && this.android18.right == true) {
						// Do Nothing
					} else {
						this.android18.moveRight();
						//this.vegeta.moveRight();
					}
				}
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT] && myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT] != true && this.android18.stun == false && (this.android18.hard == false || this.android18.down == true) && this.android18.taunting == false && this.android18.blocking == false && this.android18.powerMove == false) {
				if (this.activeSupport == false) {
					if (attackHitTest(this.android18, this.vegeta) == true && this.android18.left == true && (this.android18.position.x < this.vegeta.position.x + 60 || this.android18.reverse == true)) {
						// Do Nothing
					} else {
						this.android18.moveLeft();
						//this.vegeta.moveLeft();
					}
				} else {
					if ((attackHitTest(this.android18, this.vegeta) == true || hitTest(this.android18, this.support[0]) == true && this.support[0].vanish == false || hitTest(this.android18, this.support[1]) == true && this.support[1].vanish == false) && this.android18.left == true) {
						// Do Nothing
					} else {
						this.android18.moveLeft();
						//this.vegeta.moveLeft();
					}
				}
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_UP] && myKeys.keydown[myKeys.KEYBOARD.KEY_DOWN] != true && this.android18.down == false && (this.android18.stun == false && this.android18.fight == false || this.android18.blocking == true || this.android18.taunting == true) && this.android18.hard == false && this.android18.fieldOn == false) {
				this.android18.up = true;
				this.android18.flying = true;
				this.android18.jump();
				this.android18.decend = false;
				this.android18.down = false;
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_DOWN] && this.android18.air == true && this.android18.stun == false && this.android18.hard == false && this.android18.blocking == false && this.android18.taunting == false && this.android18.attacking == false) {
				this.android18.down = true;
				this.android18.decend = true;
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_UP] != true) {

				this.android18.up = false;
				this.android18.flying = false;
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_DOWN] != true) {
				this.android18.down = false;
				this.android18.decent = false;
				if (this.android18.fight == false) {
					this.android18.down = false;
				}
			}

			// TEST FOR ACTIONS (KEY STROKES)
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_A] && this.android18.fight == false && this.android18.stun == false && this.android18.exhausted == false && this.android18.taunting == false && this.keyHeldA == false) {
				this.keyHeldA = true;
				this.chance = Math.random();
				//console.log("Mine");
				/*
    if(myKeys.keydown[myKeys.KEYBOARD.KEY_DOWN]){ //OLD FALLING KICK CODE
    	this.android18.fallingKick = true;
    	this.android18.intensify = true;
    
    */
				//AI TEST CODE

				if (myKeys.keydown[myKeys.KEYBOARD.KEY_D] != true) {
					//this.aiChoice2 = .23;
					//this.aiChoice2 = .5;
					//this.vegeta.fight = true;
					//this.vegeta.stun = true;
					//this.vegeta.powerMove = true;
					//this.vegeta.blasting = true;
				} else {
						//this.vegeta.blocking = false;
						//this.aiChoice2 = .1;
					}

				if (myKeys.keydown[myKeys.KEYBOARD.KEY_D] != true) {
					this.android18.attacking = true;
					this.android18.fight = true;
				} else {
					this.android18.intensify = true;
					this.android18.attacking = true;
					this.android18.fight = true;
				}

				if (attackHitTest(this.android18, this.vegeta) == true && this.detected == false && this.android18.stun == false && this.android18.fallingKick == false) {
					this.detected = true;
				}
				if (hardAttackHitTest(this.android18, this.vegeta) == true && this.detectedHard == false && this.android18.stun == false && (this.android18.air == false || this.chance <= .5) && this.android18.fallingKick == false) {
					this.detectedHard = true;
				} else if ((this.android18.intensify == true || this.android18.hard == true) && this.android18.fallingKick == false) {
					if (this.android18.randomEffect >= .7) {
						this.sound.playBasicAttack(8);
					} else if (this.android18.randomEffect > .3 && this.android18.randomEffect < .7) {
						this.sound.playBasicAttack(9);
					} else {
						this.sound.playBasicAttack(10);
					}
				}
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_S] && this.android18.fight == false && this.android18.stun == false && this.android18.energy > 32 && this.android18.down == false && this.android18.taunting == false && myKeys.keydown[myKeys.KEYBOARD.KEY_DOWN] != true && this.keyHeldS == false) {
				this.chance = Math.random();
				//AI TEST CODE

				if (myKeys.keydown[myKeys.KEYBOARD.KEY_D] != true) {
					//this.aiChoiceSupport2 = .99;
					//this.aiChoice2 = .99;
					//this.vegeta.fight = true;
					//this.vegeta.attacking = true;
					//this.vegeta.stun = true;
					//this.aiChoice3 = 10;
				} else {
						//this.aiChoice2 = .1;
					}

				if (myKeys.keydown[myKeys.KEYBOARD.KEY_D] != true) {
					this.android18.attacking = true;
					this.android18.blasting = true;
					this.android18.fight = true;
				} else {
					if (this.cooldownAndroid18 > 30 && this.android18.energy > 40) {
						this.cooldownAndroid18 = 0;
						this.android18.intensify = true;
						this.android18.attacking = true;
						this.android18.blasting = true;
						this.android18.fight = true;
					} else if (myKeys.keydown[myKeys.KEYBOARD.KEY_D] == true && this.android18.energy < 41) {
						this.sound.playEffectLoud(52);
					}
				}

				this.android18.decel = this.android18.velocity.clone();
				this.keyHeldS = true;
			} else if (myKeys.keydown[myKeys.KEYBOARD.KEY_S] == true && this.android18.energy < 33) {
				this.sound.playEffectLoud(52);
			}

			if (myKeys.keydown[myKeys.KEYBOARD.KEY_Q] == true && this.keyHeldQ == false && (this.android18.fight == false || this.android18.blocking == true) && this.android18.stun == false && this.android18.superSpeed == false && this.android18.fieldOn == false && this.android18.energy > 36 && myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT] != true && myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT] != true) {
				this.android18.appear = false;
				this.android18.superSpeed = true;
				this.keyHeldQ = true;
				this.android18.fight = true;
			} else if (myKeys.keydown[myKeys.KEYBOARD.KEY_Q] == true && this.android18.energy < 37) {
				this.sound.playEffectLoud(52);
			}

			if (myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT] == true && (this.android18.fight == false || this.android18.blocking == true) && this.android18.stun == false && this.android18.superSpeed == false && this.android18.fieldOn == false && this.android18.energy > 36) {
				this.android18.teleLeft = false;
				this.android18.teleUp = false;
				this.android18.teleDown = false;

				if (myKeys.keydown[myKeys.KEYBOARD.KEY_Q] == true && this.android18.reverse == true) {
					this.android18.teleRight = true;
					this.android18.appear = false;
					this.android18.superSpeed = true;
					this.keyHeldQ = true;
					this.android18.fight = true;
				}
			} else if (myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT] == true && (this.android18.fight == false || this.android18.blocking == true) && this.android18.stun == false && this.android18.superSpeed == false && this.android18.fieldOn == false && this.android18.energy > 36) {
				this.android18.teleRight = false;
				this.android18.teleUp = false;
				this.android18.teleDown = false;

				if (myKeys.keydown[myKeys.KEYBOARD.KEY_Q] == true && this.android18.reverse == true) {
					this.android18.teleLeft = true;
					this.android18.appear = false;
					this.android18.superSpeed = true;
					this.keyHeldQ = true;
					this.android18.fight = true;
				}
			} else if (myKeys.keydown[myKeys.KEYBOARD.KEY_UP] == true && (this.android18.fight == false || this.android18.blocking == true) && this.android18.stun == false && this.android18.superSpeed == false && this.android18.fieldOn == false && this.android18.energy > 36) {
				this.android18.teleRight = false;
				this.android18.teleLeft = false;
				this.android18.teleDown = false;

				if (myKeys.keydown[myKeys.KEYBOARD.KEY_Q] == true && this.android18.reverse == true) {
					this.android18.teleUp = true;
					this.android18.appear = false;
					this.android18.superSpeed = true;
					this.keyHeldQ = true;
					this.android18.fight = true;
				}
			} else if (myKeys.keydown[myKeys.KEYBOARD.KEY_DOWN] == true && (this.android18.fight == false || this.android18.blocking == true) && this.android18.stun == false && this.android18.superSpeed == false && this.android18.fieldOn == false && this.android18.energy > 36) {
				this.android18.teleRight = false;
				this.android18.teleLeft = false;
				this.android18.teleUp = false;

				if (myKeys.keydown[myKeys.KEYBOARD.KEY_Q] == true && this.android18.reverse == true) {
					this.android18.teleDown = true;
					this.android18.appear = false;
					this.android18.superSpeed = true;
					this.keyHeldQ = true;
					this.android18.fight = true;
				}
			}

			if (myKeys.keydown[myKeys.KEYBOARD.KEY_Q] == true && this.keyHeldQ == false && (this.android18.fight == false || this.android18.blocking == true) && this.android18.stun == false && this.android18.superSpeed == false && this.android18.fieldOn == false && this.android18.energy > 36) {
				this.android18.teleRight = false;
				this.android18.teleLeft = false;
				this.android18.teleUp = false;
				this.android18.teleDown = false;

				if (myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT] == true && this.android18.reverse == true) {
					this.android18.teleRight = true;
				} else if (myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT] == true && this.android18.reverse == true) {
					this.android18.teleLeft = true;
				}

				if (myKeys.keydown[myKeys.KEYBOARD.KEY_UP] == true) {
					this.android18.teleUp = true;
				} else if (myKeys.keydown[myKeys.KEYBOARD.KEY_DOWN] == true) {
					this.android18.teleDown = true;
				}

				this.android18.appear = false;
				this.android18.superSpeed = true;
				this.keyHeldQ = true;
				this.android18.fight = true;
			} else if (myKeys.keydown[myKeys.KEYBOARD.KEY_Q] == true && this.android18.energy < 37) {
				this.sound.playEffectLoud(52);
			}

			if (myKeys.keydown[myKeys.KEYBOARD.KEY_UP] != true) {
				this.android18.teleUp = false;
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_DOWN] != true) {
				this.android18.teleDown = false;
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT] != true) {
				this.android18.teleLeft = false;
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT] != true) {
				this.android18.teleRight = false;
			}

			if (myKeys.keydown[myKeys.KEYBOARD.KEY_E] == true && this.keyHeldE == false && this.android18.fight == false && this.android18.stun == false && this.android18.taunting == false) {
				this.keyHeldE = true;
				this.android18.intensify = true;
				this.android18.taunting = true;
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_W] && this.android18.fight == false && this.android18.stun == false && this.android18.taunting == false && this.keyHeldW == false) {
				if (myKeys.keydown[myKeys.KEYBOARD.KEY_D] != true && this.android18.exhausted == false) {
					this.android18.blocking = true;
					if (attackHitTest(this.android18, this.vegeta) == true) {
						this.android18.stamina += 3;
					}
				} else if (myKeys.keydown[myKeys.KEYBOARD.KEY_D] == true && this.android18.energy > 50) {
					//field
					this.android18.blocking = true;
					this.android18.fieldOn = true;
					this.android18.energy -= 10;
				} else if (myKeys.keydown[myKeys.KEYBOARD.KEY_D] == true && this.android18.energy < 51) {
					this.sound.playEffectLoud(52);
				}
				this.keyHeldW = true;
				this.android18.fight = true;
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_A] != true) {
				this.keyHeldA = false;
				if (myKeys.keydown[myKeys.KEYBOARD.KEY_DOWN] != true) {
					this.android18.fallingKick = false;
				}
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_T] == true && this.keyHeldT == false) {
				//Toggle (tutorial)
				this.keyHeldT = true;
				if (this.toggle1 == false) {
					this.toggle1 = true;
					this.sound.playEffect(65);
				} else if (this.toggle2 == false) {
					this.toggle2 = true;
					this.sound.playEffect(65);
				} else {
					this.sound.playEffect(65);
					this.toggle1 = false;
					this.toggle2 = false;
				}
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_J] == true) {
				//CHEAT CODE
				this.environment.shake = true;
				//this.environment.remote = true;
				/* this.android17.decision= .5;
    this.android17.evasion = false;
    this.android17.encounter = true;
    this.aiChoice4 = .96; */
				this.vegeta.endurance = 1;
				this.vegeta.health = 1;
				//this.android17.counter = 0;
				//this.dodgeChance2 = .05;
				//this.android17.fight = true;
				//this.android17.blocking = true;
				//this.android17.fieldOn = true;
				//this.android17.stun = true;
				//this.android17.hurtBlasting = true;
				//this.android18.endurance = 1;
				//this.android18.health = 1;
				//this.android17.cinematic = true;
				//this.vegeta.blastTrigger = true;
				//this.vegeta.blasting = true;
				//this.vegeta.attacking = true;
				//this.vegeta.powerMove = true;
				//this.vegeta.intensify = true;
				//this.vegeta.fight = true;
				//this.vegeta.charging = true;
				//this.support[1].triggerBlast = true;
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_J] != true) {//CHEAT CODE
				//this.environment.shake = true;
				//this.vegeta.endurance = 1;
				//this.vegeta.health = 1;
				//this.vegeta.blastTrigger = false;
				//this.support[1].triggerBlast = false;
				//this.android17.hurtBlasting = false;

			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_T] != true) {
				//CHEAT CODE
				this.keyHeldT = false;
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_S] != true) {
				this.keyHeldS = false;
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_Q] != true) {
				this.keyHeldQ = false;
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_E] != true) {
				this.keyHeldE = false;
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_W] != true) {
				if (this.android18.fieldOn == false) {
					if (this.keyHeldW == true && this.android18.superSpeed == false) {
						this.android18.blocking = false;
						this.android18.fight = false;
						this.keyHeldW = false;
					}
					this.keyHeldW = false;
					this.android18.blocking = false;
				}
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_D] != true && this.android18.fight == false) {
				this.android18.intensify = false;
			}
		}

		//CHANGE DIRECTIONS OF CHARACTERS
		if (this.scene == false || this.gameState == this.GAME_STATE.TUTORIAL) {
			if (app.main.vegeta.air == false && app.main.android18.air == true || app.main.vegeta.air == true && app.main.android18.air == false) {
				if (app.main.vegeta.position.x < app.main.android18.position.x - 140) {
					if ((this.android18.stun != true || this.android18.superSpeed == true) && this.vegeta.superSpeed != true && this.android18.hard != true && this.android18.blasting != true && this.android18.fieldOn != true && this.android18.end != true) {
						app.main.android18.left = true;
						app.main.android18.right = false;
					}
					if ((this.vegeta.stun != true || this.vegeta.superSpeed == true) && this.android18.superSpeed != true && this.vegeta.hard != true && this.vegeta.blasting != true && this.vegeta.end != true && this.vegeta.focus17 == false) {
						app.main.vegeta.left = false;
						app.main.vegeta.right = true;
					}
				} else if (app.main.vegeta.position.x > app.main.android18.position.x + 100) {
					if ((this.android18.stun != true || this.android18.superSpeed == true) && this.vegeta.superSpeed != true && this.android18.hard != true && this.android18.blasting != true && this.android18.fieldOn != true && this.android18.end != true) {
						app.main.android18.right = true;
						app.main.android18.left = false;
					}
					if ((this.vegeta.stun != true || this.vegeta.superSpeed == true) && this.android18.superSpeed != true && this.vegeta.hard != true && this.vegeta.blasting != true && this.vegeta.end != true && this.vegeta.focus17 == false) {
						app.main.vegeta.left = true;
						app.main.vegeta.right = false;
					}
				}
			} else {
				if (app.main.vegeta.position.x < app.main.android18.position.x + 20) {
					if ((this.android18.stun != true || this.android18.superSpeed == true) && this.vegeta.superSpeed != true && this.android18.hard != true && this.android18.blasting != true && this.android18.fieldOn != true && this.android18.end != true) {
						app.main.android18.left = true;
						app.main.android18.right = false;
					}
					if ((this.vegeta.stun != true || this.vegeta.superSpeed == true) && this.android18.superSpeed != true && this.vegeta.hard != true && this.vegeta.blasting != true && this.vegeta.end != true && this.vegeta.focus17 == false) {
						app.main.vegeta.left = false;
						app.main.vegeta.right = true;
					}
				} else if (app.main.vegeta.position.x > app.main.android18.position.x - 20) {
					if ((this.android18.stun != true || this.android18.superSpeed == true) && this.vegeta.superSpeed != true && this.android18.hard != true && this.android18.blasting != true && this.android18.fieldOn != true && this.android18.end != true) {
						app.main.android18.right = true;
						app.main.android18.left = false;
					}
					if ((this.vegeta.stun != true || this.vegeta.superSpeed == true) && this.android18.superSpeed != true && this.vegeta.hard != true && this.vegeta.blasting != true && this.vegeta.end != true && this.vegeta.focus17 == false) {
						app.main.vegeta.left = true;
						app.main.vegeta.right = false;
					}
				}
			}

			//17 Version
			if (app.main.vegeta.air == false && app.main.android17.air == true || app.main.vegeta.air == true && app.main.android17.air == false) {
				if (app.main.vegeta.position.x < app.main.android17.position.x - 140) {
					if ((this.android17.stun != true || this.android17.superSpeed == true) && this.vegeta.superSpeed != true && this.android17.hard != true && this.android17.blasting != true && this.android17.fieldOn != true && this.android17.end != true) {
						app.main.android17.left = true;
						app.main.android17.right = false;
					}
					if ((this.vegeta.stun != true || this.vegeta.superSpeed == true) && this.android17.superSpeed != true && this.vegeta.hard != true && this.vegeta.blasting != true && this.vegeta.end != true && this.vegeta.focus17 == true) {
						app.main.vegeta.left = false;
						app.main.vegeta.right = true;
					}
				} else if (app.main.vegeta.position.x > app.main.android17.position.x + 100) {
					if ((this.android17.stun != true || this.android17.superSpeed == true) && this.vegeta.superSpeed != true && this.android17.hard != true && this.android17.blasting != true && this.android17.fieldOn != true && this.android17.end != true) {
						app.main.android17.right = true;
						app.main.android17.left = false;
					}
					if ((this.vegeta.stun != true || this.vegeta.superSpeed == true) && this.android17.superSpeed != true && this.vegeta.hard != true && this.vegeta.blasting != true && this.vegeta.end != true && this.vegeta.focus17 == true) {
						app.main.vegeta.left = true;
						app.main.vegeta.right = false;
					}
				}
			} else {
				if (app.main.vegeta.position.x < app.main.android17.position.x + 20) {
					if ((this.android17.stun != true || this.android17.superSpeed == true) && this.vegeta.superSpeed != true && this.android17.hard != true && this.android17.blasting != true && this.android17.fieldOn != true && this.android17.end != true) {
						app.main.android17.left = true;
						app.main.android17.right = false;
					}
					if ((this.vegeta.stun != true || this.vegeta.superSpeed == true) && this.android17.superSpeed != true && this.vegeta.hard != true && this.vegeta.blasting != true && this.vegeta.end != true && this.vegeta.focus17 == true) {
						app.main.vegeta.left = false;
						app.main.vegeta.right = true;
					}
				} else if (app.main.vegeta.position.x > app.main.android17.position.x - 20) {
					if ((this.android17.stun != true || this.android17.superSpeed == true) && this.vegeta.superSpeed != true && this.android17.hard != true && this.android17.blasting != true && this.android17.fieldOn != true && this.android17.end != true) {
						app.main.android17.right = true;
						app.main.android17.left = false;
					}
					if ((this.vegeta.stun != true || this.vegeta.superSpeed == true) && this.android17.superSpeed != true && this.vegeta.hard != true && this.vegeta.blasting != true && this.vegeta.end != true && this.vegeta.focus17 == true) {
						app.main.vegeta.left = true;
						app.main.vegeta.right = false;
					}
				}
			}

			//CHANGE DIRECTIONS OF CHARACTERS -- SUPPORT
			if (this.activeSupport == true) {
				for (var x = 0; x < 2; x++) {
					if (this.support[x].position.x < this.support[x].LEFTWALL.x + 100) {
						this.support[x].right = true;
						this.support[x].left = false;
					} else if (this.support[x].position.x > this.support[x].RIGHTWALL.x - 100) {
						this.support[x].right = false;
						this.support[x].left = true;
					} else if (app.main.support[x].air == false && app.main.android18.air == true || app.main.support[x].air == true && app.main.android18.air == false) {
						if (app.main.support[x].position.x < app.main.android18.position.x - 140) {
							if ((this.support[x].stun != true || this.support[x].superSpeed == true) && this.android18.superSpeed != true && this.support[x].hard != true && this.support[x].blasting != true && this.support[x].end != true && this.vegeta.focus17 == false) {
								app.main.support[x].left = false;
								app.main.support[x].right = true;
							}
						} else if (app.main.support[x].position.x > app.main.android18.position.x + 100) {
							if ((this.support[x].stun != true || this.support[x].superSpeed == true) && this.android18.superSpeed != true && this.support[x].hard != true && this.support[x].blasting != true && this.support[x].end != true && this.vegeta.focus17 == false) {
								app.main.support[x].left = true;
								app.main.support[x].right = false;
							}
						}
					} else {
						if (app.main.vegeta.position.x < app.main.android18.position.x + 20) {
							if ((this.support[x].stun != true || this.support[x].superSpeed == true) && this.android18.superSpeed != true && this.support[x].hard != true && this.support[x].blasting != true && this.support[x].end != true && this.vegeta.focus17 == false) {
								app.main.support[x].left = false;
								app.main.support[x].right = true;
							}
						} else if (app.main.support[x].position.x > app.main.android18.position.x - 20) {
							if ((this.support[x].stun != true || this.support[x].superSpeed == true) && this.android18.superSpeed != true && this.support[x].hard != true && this.support[x].blasting != true && this.support[x].end != true && this.vegeta.focus17 == false) {
								app.main.support[x].left = true;
								app.main.support[x].right = false;
							}
						}
					}

					//17 Version
					if (this.support[x].position.x < this.support[x].LEFTWALL.x + 100) {
						this.support[x].right = true;
						this.support[x].left = false;
					} else if (this.support[x].position.x > this.support[x].RIGHTWALL.x - 100) {
						this.support[x].right = false;
						this.support[x].left = true;
					} else if (app.main.support[x].air == false && app.main.android17.air == true || app.main.support[x].air == true && app.main.android17.air == false) {
						if (app.main.support[x].position.x < app.main.android17.position.x - 140) {
							if ((this.support[x].stun != true || this.support[x].superSpeed == true) && this.android17.superSpeed != true && this.support[x].hard != true && this.support[x].blasting != true && this.support[x].end != true && this.vegeta.focus17 == true) {
								app.main.support[x].left = false;
								app.main.support[x].right = true;
							}
						} else if (app.main.support[x].position.x > app.main.android17.position.x + 100) {
							if ((this.support[x].stun != true || this.support[x].superSpeed == true) && this.android17.superSpeed != true && this.support[x].hard != true && this.support[x].blasting != true && this.support[x].end != true && this.vegeta.focus17 == true) {
								app.main.support[x].left = true;
								app.main.support[x].right = false;
							}
						}
					} else {
						if (app.main.support[x].position.x < app.main.android17.position.x + 20) {
							if ((this.support[x].stun != true || this.support[x].superSpeed == true) && this.android17.superSpeed != true && this.support[x].hard != true && this.support[x].blasting != true && this.support[x].end != true && this.vegeta.focus17 == true) {
								app.main.support[x].left = false;
								app.main.support[x].right = true;
							}
						} else if (app.main.support[x].position.x > app.main.android17.position.x - 20) {
							if ((this.support[x].stun != true || this.support[x].superSpeed == true) && this.android17.superSpeed != true && this.support[x].hard != true && this.support[x].blasting != true && this.support[x].end != true && this.vegeta.focus17 == true) {
								app.main.support[x].left = true;
								app.main.support[x].right = false;
							}
						}
					}
				}
			}
		}

		//DRAW HUD
		this.ctx.globalAlpha = 1.0;
		this.drawHUD(this.ctx);
		this.itimer++;
		if (this.increasing == true && this.iAlpha < 80) {
			this.iAlpha++;
		} else {
			this.increasing = false;
		}
		if (this.increasing == false && this.iAlpha > 20) {
			this.iAlpha = this.iAlpha - 1;
		} else {
			this.increasing = true;
		}

		if (this.gameState == this.GAME_STATE.DEFAULT || this.gameState == this.GAME_STATE.TUTORIAL) {
			if (hitTest(this.android18, this.vegeta) == true) {
				this.touching = true;
				this.android18.fast = false;
				this.vegeta.fast = false;
				this.android18.slow = true;
				this.vegeta.slow = true;

				if (this.android18.left == true) {
					if (this.android18.decel.x < 0) {
						this.android18.decel.x = 0;
					}
				} else if (this.android18.right == true) {
					if (this.android18.decel.x > 0) {
						this.android18.decel.x = 0;
					}
				}

				if (this.vegeta.left == true) {
					if (this.vegeta.decel.x < 0) {
						this.vegeta.decel.x = 0;
					}
				} else if (this.vegeta.right == true) {
					if (this.vegeta.decel.x > 0) {
						this.vegeta.decel.x = 0;
					}
				}
			} else {
				this.touching = false;
			}
		}

		this.lastExecution = new Date().getTime();
	}

	app.main.loaded = true;

	//SORRY NO CHEAT CODES YET!
	/*
 // 6) CHECK FOR CHEATS
 // if we are on the start screen or a round over screen
 if (this.gameState == this.GAME_STATE.BEGIN || this.gameState == this.GAME_STATE.ROUND_OVER){
 	// if the shift key and up arrow are both down (true)
 
 }
 */
}), _defineProperty(_app$main, 'fillText', function fillText(ctx, string, x, y, css, color) {
	ctx.save();
	ctx.font = css;
	ctx.fillStyle = color;
	ctx.fillText(string, x, y);
	ctx.restore();
}), _defineProperty(_app$main, 'calculateDeltaTime', function calculateDeltaTime() {
	var now, fps;
	now = performance.now();
	fps = 1000 / (now - this.lastTime);
	fps = clamp(fps, 12, 60);
	this.lastTime = now;
	return 1 / fps;
}), _defineProperty(_app$main, 'barCheckers', function barCheckers() {
	if (this.gameState != this.GAME_STATE.TUTORIAL) {
		if (this.android18.health < 50 && this.dying18 == false) {
			this.sound.playTaunt1(Math.round(getRandom(38, 40)));
			this.dying18 = true;
		} else if (this.vegeta.health < 50) {
			if (this.vegeta.piccolo == true && this.piccoloDying == false) {
				this.sound.playTaunt4(Math.round(getRandom(13, 15)));
				this.piccoloDying = true;
			} else if (this.vegeta.vegeta == true && this.vegetaDying == false) {
				this.sound.playTaunt2(Math.round(getRandom(35, 37)));
				this.vegetaDying = true;
			} else if (this.vegeta.gohan == true && this.gohanDying == false) {
				this.sound.playTaunt6(Math.round(getRandom(13, 15)));
				this.gohanDying = true;
			}
		}

		if (this.android18.health < 1 && this.scene == false) {
			this.android18.health = 1;
			this.android18.stun = true;
			this.android18.end = true;
			this.vegeta.stun = true;
			this.sound.stopBGAudio();
			this.sound.stopBGAudioTutorial();
			this.sound.stopBGAudioScene();
			//this.vegeta.end = true;
		} else if (this.vegeta.health < 1 && this.scene == false) {
			this.vegeta.health = 1;
			//this.android18.stun = true;
			//this.android18.end = true;
			this.vegeta.stun = true;
			this.vegeta.end = true;
			//this.gameState = this.GAME_STATE.VICTORY;
			this.sceneCounter = 0;
			//this.endingState = true;
			this.sound.stopBGAudio();
			this.sound.stopBGAudioTutorial();
			this.sound.stopBGAudioScene();
			//this.videos.startE(); 
		}
	} else {
		if (this.android18.health < 30) {
			this.android18.health = 30;
		} else if (this.vegeta.health < 30) {
			this.vegeta.health = 30;
		}
	}
}), _defineProperty(_app$main, 'drawPauseScreen', function drawPauseScreen(ctx) {
	ctx.save();
	ctx.globalAlpha = .02;
	ctx.fillStyle = "rgb(0,34,7)";
	ctx.fillRect(0, 0, 1024, 768);
	ctx.restore();
	ctx.save();
	ctx.globalAlpha = .05;
	/* if(this.gameState == this.GAME_STATE.TUTORIAL && this.toggle2 == false){
 	ctx.fillStyle = "rgb(0,34,7)";
 	ctx.fillRect(800,295,220,320);
 	ctx.strokeStyle = "black";
 	ctx.strokeRect(800,295,220,320);
 } else {
 	ctx.fillStyle = "rgb(0,34,7)";
 	ctx.fillRect(800,335,220,280);
 	ctx.strokeStyle = "black";
 	ctx.strokeRect(800,335,220,280);
 } */
	ctx.restore();
	ctx.save();
	ctx.globalAlpha = .1;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	if (this.gameState == this.GAME_STATE.TUTORIAL && this.toggle1 == false) {
		/* ctx.save();
  ctx.globalAlpha = .05;
  ctx.fillStyle = "rgb(0,34,7)";
  ctx.fillRect(200,300,600,280);
  ctx.strokeStyle = "black";
  ctx.strokeRect(200,300,600,280);
  ctx.restore(); */
		ctx.save();
		ctx.globalAlpha = .1;
		//ctx.drawImage(this.redRibbon,445,57);
		this.fillText(this.ctx, "...SUSPENSION STATE...", this.WIDTH / 2 - 10, this.HEIGHT / 2 - 50, "43pt heavy_data", "#c9be03");
		ctx.restore();
		ctx.save();
		ctx.globalAlpha = .1;
		ctx.drawImage(this.redRibbon, 445, 57);
		this.fillText(this.ctx, "...SUSPENSION STATE...", this.WIDTH / 2 - 10, this.HEIGHT / 2 - 50, "43pt heavy_data", "white");
		ctx.restore();
		this.fillText(this.ctx, "Press P to resume", this.WIDTH / 2, this.HEIGHT / 2 + 175, "20pt heavy_data", "white");
	} else {
		/* ctx.save();
  ctx.globalAlpha = .05;
  ctx.fillStyle = "rgb(0,34,7)";
  ctx.fillRect(200,360,600,220);
  ctx.strokeStyle = "black";
  ctx.strokeRect(200,360,600,220);
  ctx.restore(); */
		this.fillText(this.ctx, "...SUSPENSION STATE...", this.WIDTH / 2 - 10, this.HEIGHT / 2 + 40, "43pt heavy_data", "#c9be03");
		ctx.save();
		ctx.globalAlpha = .1;
		ctx.drawImage(this.redRibbon, 445, 57);
		this.fillText(this.ctx, "...SUSPENSION STATE...", this.WIDTH / 2 - 10, this.HEIGHT / 2 + 40, "43pt heavy_data", "white");
		ctx.restore();
		this.fillText(this.ctx, "Press P to resume", this.WIDTH / 2, this.HEIGHT / 2 + 150, "20pt heavy_data", "white");
	}
	//this.fillText(this.ctx,"...SUSPENSION STATE...", this.WIDTH/2, this.HEIGHT/2 - 37, "43pt heavy_data", "#c9be03");
	//this.fillText(this.ctx,"Press P to resume", this.WIDTH/2, this.HEIGHT/2 + 150, "20pt heavy_data", "white");
	ctx.save();
	//ctx.globalAlpha = .5;
	if (this.gameState == this.GAME_STATE.TUTORIAL && this.toggle2 == false) {
		this.fillText(this.ctx, "Controls", this.WIDTH / 2 + 400, 335, "32pt heavy_data", "#c9be03");
		this.fillText(this.ctx, "Controls", this.WIDTH / 2 + 400, 335, "32pt heavy_data", "white");
	} else {
		this.fillText(this.ctx, "Controls", this.WIDTH / 2 + 400, 375, "32pt heavy_data", "#c9be03");
		this.fillText(this.ctx, "Controls", this.WIDTH / 2 + 400, 375, "32pt heavy_data", "white");
	}
	this.fillText(this.ctx, "'A': Basic Attack", this.WIDTH / 2 + 400, 410, "12pt heavy_data", "#c9be03");
	this.fillText(this.ctx, "'S': Energy Attack", this.WIDTH / 2 + 400, 430, "12pt heavy_data", "#c9be03");
	this.fillText(this.ctx, "'Q': Super Speed", this.WIDTH / 2 + 400, 450, "12pt heavy_data", "#c9be03");
	this.fillText(this.ctx, "'E': Taunt", this.WIDTH / 2 + 400, 470, "12pt heavy_data", "#c9be03");
	this.fillText(this.ctx, "'W': Block", this.WIDTH / 2 + 400, 490, "12pt heavy_data", "#c9be03");
	this.fillText(this.ctx, "'D A': Strong Attack", this.WIDTH / 2 + 400, 510, "12pt heavy_data", "#c9be03");
	this.fillText(this.ctx, "'D S': Powerful Energy", this.WIDTH / 2 + 400, 530, "12pt heavy_data", "#c9be03");
	this.fillText(this.ctx, "'D W': Android Barrier", this.WIDTH / 2 + 400, 550, "12pt heavy_data", "#c9be03");
	this.fillText(this.ctx, "'P': Pause", this.WIDTH / 2 + 400, 570, "12pt heavy_data", "#c9be03");
	this.fillText(this.ctx, "'Arrow Keys': Move Or Fly", this.WIDTH / 2 + 400, 590, "12pt heavy_data", "#c9be03");
	ctx.restore();
	ctx.restore();
}), _defineProperty(_app$main, 'reset', function reset() {
	this.activeSupport = false;

	this.vegeta.vanish = false;
	this.android17.vanish = true;
	this.android17.end = true;
	this.battle = 0;
	this.scene = false;
	this.piccoloDead = false;
	this.vegetaDead = false;
	this.gohanDead = false;
	this.tienDead = false;
	this.krillinDead = false;
	this.chaotzuDead = false;
	this.yamchaDead = false;
	this.dying18 = false;
	this.piccoloDying = false;
	this.vegetaDying = false;
	this.gohanDying = false;

	this.roundScore = 0;
	this.roundScore2 = 0;
	this.sceneTimer = 0;
	this.krillinFirst = false;
	this.discHit = false;
	this.talkTimer = 0;
	this.specialScene = false;
	this.tempPosition = 0;
	this.tempDirLeft = false;
	this.finalSaying = false;

	this.keyHeld = false;
	this.keyHeldA = false;
	this.keyHeldS = false;
	this.keyHeldD = false;
	this.keyHeldW = false;
	this.keyHeldQ = false;
	this.keyHeldE = false;
	this.keyHeldT = false;
	this.keyHeldShift = false;
	this.next = false;
	this.action = false;
	this.reseted = false;
	this.fullAttack = false;
	this.target = false;
	this.quickReset = false;

	this.introState = false;
	this.endingState = false;
	this.titleScreen = false;
	this.endingState = false;
	this.changed = false;
	this.sceneNum = 0;
	this.trueEnding = false;
	this.savesGohan = 0;

	this.instructions = 0;
	this.sceneChange = 0;
	this.changeDelay = 0;
	this.creditsRoll = 0;
	this.toggle1 = true;
	this.toggle2 = true;

	this.calculated = false;
	this.saved = false;

	this.init();

	this.reseted = true;

	this.videos.rewind();

	this.sound.stopBGAudioScene();

	this.gameState = this.GAME_STATE.BEGIN;
}), _defineProperty(_app$main, 'drawHUD', function drawHUD(ctx) {

	if (this.gameState == this.GAME_STATE.DEFAULT || this.gameState == this.GAME_STATE.TUTORIAL) {
		this.pulsing++;
		this.warnings++;
		ctx.save();

		if (this.vegeta.aboveSky == true && (this.android18.aboveSky == true || this.android17.aboveSky == true)) {
			this.superFade = true;
		} else {
			this.superFade = false;
		}

		if ((this.vegeta.aboveSky == true || this.android18.aboveSky == true) && this.superFade == false) {
			this.fade = true;
		} else {
			this.fade = false;
		}

		if (this.android18.position.x > 222 && this.android18.position.x < 802 && this.android18.position.y > 295 && this.android18.position.y < 545) {
			this.extraFade = true;
		} else {
			this.extraFade = false;
		}

		if (this.android18.position.x > 800 && this.android18.position.x < 1000 && this.android18.position.y > 245 && this.android18.position.y < 615) {
			this.extraFade2 = true;
		} else {
			this.extraFade2 = false;
		}
		//Coat of darkness
		ctx.save();
		ctx.globalAlpha = .3;
		ctx.fillStyle = "black";
		ctx.fillRect(0, 200, 1024, 568);
		ctx.restore();

		ctx.save();
		if (this.fade == true) {
			//FADE
			ctx.globalAlpha = .5;
		} else if (this.superFade == true) {
			//FADE
			ctx.globalAlpha = .4;
		} else {
			ctx.globalAlpha = .7;
		}
		ctx.fillStyle = "rgb(0,34,7)";
		ctx.fillRect(0, 0, 1024, 200);
		ctx.strokeStyle = "rgb(0,0,0)";
		ctx.lineWidth = 5;
		ctx.strokeRect(0, 0, 1024, 200);
		ctx.restore();

		if (this.android18.energy < 28) {
			this.android18.energy = 28;
		}
		if (this.android18.stamina > 100) {
			this.android18.exhausted = true;
			this.android18.stamina = 100;
		}
		if (this.android18.stamina < 28) {
			this.android18.stamina = 28;
		} else if (this.android18.stamina < 64) {
			this.android18.exhausted = false;
		}
		if (this.android18.energy > 99) {
			this.android18.energy = 100;
		}
		if (this.android18.endurance > 99) {
			this.android18.endurance = 100;
		}

		if (this.vegeta.energy < 28) {
			this.vegeta.energy = 28;
		}
		if (this.vegeta.stamina > 100) {
			this.vegeta.exhausted = true;
			this.vegeta.stamina = 100;
		}
		if (this.vegeta.stamina < 28) {
			this.vegeta.stamina = 28;
		} else if (this.vegeta.stamina < 64) {
			this.vegeta.exhausted = false;
		}
		if (this.vegeta.energy > 99) {
			this.vegeta.energy = 100;
		}
		if (this.vegeta.endurance > 99) {
			this.vegeta.endurance = 100;
		}
		ctx.save();
		if (this.moved == true) {
			ctx.translate(0, 570);
		} else {
			//Nothing
		}
		ctx.save();
		//ctx.globalAlpha = (this.iAlpha/100);
		//ctx.drawImage(this.iBackground,0,0);
		ctx.restore();

		ctx.save();
		if (this.fade == true) {
			//FADE
			ctx.globalAlpha = .1;
		} else if (this.superFade == true) {
			//SUPERFADE
			//console.log("SUPERFADE");
			ctx.globalAlpha = .05;
		} else {
			ctx.globalAlpha = .6;
		}
		ctx.save();
		if (this.fade == false && this.superFade == false) {
			ctx.globalAlpha = .7;
		}
		ctx.drawImage(this.redRibbon, 445, 57);
		ctx.restore();
		if (this.vegeta.vegeta == true && this.vegeta.vanish == false && this.target == true) {
			this.fillText(this.ctx, "Target: Vegeta", 130, 40, "20pt heavy_data", "#c9be03");
		} else if (this.vegeta.gero == true) {
			this.fillText(this.ctx, "Target: Dr. Gero", 130, 40, "20pt heavy_data", "#c9be03");
		} else if (this.vegeta.piccolo == true && this.target == true) {
			this.fillText(this.ctx, "Target: Piccolo", 130, 40, "20pt heavy_data", "#c9be03");
		} else if (this.vegeta.gohan == true && this.vegeta.vanish == false && this.battle != 3 && this.target == true) {
			this.fillText(this.ctx, "Target: Gohan", 130, 40, "20pt heavy_data", "#c9be03");
		} else if (this.vegeta.gohan == true && this.vegeta.vanish == false && this.target == true) {
			this.fillText(this.ctx, "Target: Gohan!!", 130, 40, "20pt heavy_data", "#c9be03");
		} else if (this.target == false) {
			this.fillText(this.ctx, "Target: All Humans", 130, 40, "20pt heavy_data", "#c9be03");
		} else {
			this.fillText(this.ctx, "Target: Undecided", 130, 40, "20pt heavy_data", "#c9be03");
		}
		this.fillText(this.ctx, "Target:", 130, 40, "20pt heavy_data", "white");

		this.fillText(this.ctx, "Unit: Android 18", 690, 40, "20pt heavy_data", "#c9be03");
		this.fillText(this.ctx, "Unit:", 690, 40, "20pt heavy_data", "white");
		//this.fillText(this.ctx,"Android 18", 690, 40, "20pt heavy_data", "#c9be03");
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		this.fillText(this.ctx, "18..." + this.roundScore + "...18", 509, 40, "20pt heavy_data", "#c9be03");
		this.fillText(this.ctx, " 17..." + this.roundScore2 + "...17", 507, 140, "20pt heavy_data", "#c9be03");

		this.fillText(this.ctx, "18..." + this.roundScore + "...18", 509, 40, "20pt heavy_data", "white");
		this.fillText(this.ctx, " 17..." + this.roundScore2 + "...17", 507, 140, "20pt heavy_data", "white");
		ctx.restore();

		//ctx.drawImage(this.iBorder,0,0);

		ctx.save();
		if (this.fade == true) {
			//FADE
			ctx.globalAlpha = .1;
		} else if (this.superFade == true) {
			//SUPERFADE
			ctx.globalAlpha = .05;
		} else {
			ctx.globalAlpha = .7;
		}
		if (this.vegeta.hit == true && this.vegeta.hardHit == false) {
			ctx.fillStyle = "red";
		} else {
			ctx.fillStyle = "white";
		}
		if (this.vegeta.endurance < 6) {
			ctx.fillRect(50, 55, 6, 35);
		} else {
			ctx.fillRect(50, 55, this.vegeta.endurance * 4 - 30, 35);
		}
		if (this.vegeta.health < 10) {
			ctx.fillRect(50, 90, 0, 25);
		} else {
			ctx.fillRect(50, 90, this.vegeta.health * 4 - 30, 25);
		}
		if (this.vegeta.hardHit == true) {
			ctx.save();
			ctx.scale(.14, .14);
			if (this.warnings < 3) {
				ctx.drawImage(this.iWarning, 1100, 470);
				ctx.drawImage(this.iWarning, 750, 470);
				ctx.drawImage(this.iWarning, 1800, 470);
				ctx.drawImage(this.iWarning, 2150, 470);
				ctx.drawImage(this.iWarning, 1450, 470);
			} else {
				this.warnings = 0;
			}
			ctx.restore();
		}
		ctx.restore();

		ctx.save();
		if (this.fade == true) {
			//FADE
			ctx.globalAlpha = .2;
		} else if (this.superFade == true) {
			//SUPERFADE
			ctx.globalAlpha = .05;
		} else {
			ctx.globalAlpha = .8;
		}
		ctx.drawImage(this.iBigBar, 50, 55);
		ctx.restore();

		ctx.save();
		if (this.fade == true) {
			//FADE
			ctx.globalAlpha = .1;
		} else if (this.superFade == true) {
			//SUPERFADE
			ctx.globalAlpha = .05;
		} else {
			ctx.globalAlpha = .6;
		}
		if (this.vegeta.exhausted == true) {
			if (this.pulsing < 3) {
				ctx.fillStyle = "Red";
			} else if (this.pulsing < 4) {
				ctx.fillStyle = "#a92424";
				//ctx.fillStyle = "#7ec0ee";
			} else {
				this.pulsing = 0;
				ctx.fillStyle = "#a92424";
				//ctx.fillStyle = "#7ec0ee";
			}
		} else {
			ctx.fillStyle = "#a92424";
			//ctx.fillStyle = "#7ec0ee";
		}
		ctx.fillRect(50, 125, this.vegeta.stamina * 3 - 70, 10);
		ctx.fillStyle = "yellow";
		//ctx.fillStyle = "#c9be03";
		ctx.fillRect(50, 140, this.vegeta.energy * 3 - 70, 15);
		ctx.restore();

		ctx.save();
		if (this.fade == true) {
			//FADE
			ctx.globalAlpha = .2;
		} else if (this.superFade == true) {
			//SUPERFADE
			ctx.globalAlpha = .05;
		} else {
			ctx.globalAlpha = .8;
		}
		ctx.drawImage(this.iSmallBar, 50, 110);
		ctx.restore();

		ctx.save();
		ctx.scale(-1, 1);
		ctx.save();
		if (this.fade == true) {
			//FADE
			ctx.globalAlpha = .1;
		} else if (this.superFade == true) {
			//SUPERFADE
			ctx.globalAlpha = .05;
		} else {
			ctx.globalAlpha = .7;
		}
		if (this.android18.hit == true && this.android18.hardHit == false) {
			ctx.fillStyle = "red";
		} else {
			ctx.fillStyle = "white";
		}
		if (this.android18.endurance < 6) {
			ctx.fillRect(-970, 55, 6, 35);
		} else {
			ctx.fillRect(-970, 55, this.android18.endurance * 4 - 30, 35);
		}
		if (this.android18.health < 10) {
			ctx.fillRect(-970, 90, 0, 25);
		} else {
			ctx.fillRect(-970, 90, this.android18.health * 4 - 30, 25);
		}
		if (this.android18.hardHit == true) {
			ctx.save();
			ctx.scale(.14, .14);
			if (this.warnings < 3) {
				ctx.drawImage(this.iWarning, -5800, 470);
				ctx.drawImage(this.iWarning, -5450, 470);
				ctx.drawImage(this.iWarning, -5100, 470);
				ctx.drawImage(this.iWarning, -6150, 470);
				ctx.drawImage(this.iWarning, -6500, 470);
			} else {
				this.warnings = 0;
			}
			ctx.restore();
		}
		ctx.restore();

		ctx.save();
		if (this.fade == true) {
			//FADE
			ctx.globalAlpha = .2;
		} else if (this.superFade == true) {
			//SUPERFADE
			ctx.globalAlpha = .05;
		} else {
			ctx.globalAlpha = .8;
		}
		ctx.drawImage(this.iBigBar, -970, 55);
		ctx.restore();

		ctx.save();
		if (this.fade == true) {
			//FADE
			ctx.globalAlpha = .1;
		} else if (this.superFade == true) {
			//SUPERFADE
			ctx.globalAlpha = .05;
		} else {
			ctx.globalAlpha = .6;
		}
		if (this.android18.exhausted == true) {
			if (this.pulsing < 3) {
				ctx.fillStyle = "Red";
			} else if (this.pulsing < 4) {
				ctx.fillStyle = "#a92424";
				//ctx.fillStyle = "#7ec0ee";
			} else {
				this.pulsing = 0;
				ctx.fillStyle = "#a92424";
				//ctx.fillStyle = "#7ec0ee";
			}
		} else {
			ctx.fillStyle = "#a92424";
			//ctx.fillStyle = "#7ec0ee";
		}
		ctx.fillRect(-970, 125, this.android18.stamina * 3 - 70, 10);
		ctx.fillStyle = "yellow";
		//ctx.fillStyle = "#c9be03";
		ctx.fillRect(-970, 140, this.android18.energy * 3 - 70, 15);
		ctx.restore();
		ctx.save();
		if (this.fade == true) {
			//FADE
			ctx.globalAlpha = .2;
		} else if (this.superFade == true) {
			//SUPERFADE
			ctx.globalAlpha = .05;
		} else {
			ctx.globalAlpha = .8;
		}
		ctx.drawImage(this.iSmallBar, -970, 110);
		ctx.restore();
		ctx.restore(); //TEST

		//TUTORIAL
		if (this.gameState == this.GAME_STATE.TUTORIAL) {
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_SPACE] == true && this.toggle1 == false && this.next == false) {
				this.next = true;
				if (this.instructions < 22) {
					this.vegeta.flying = false;
					this.vegeta.stun = true;
					this.instructions++;
					this.sound.playEffect(68);
				} else {
					this.instructions = 0;
					this.sound.playEffect(68);
				}
			} else if (myKeys.keydown[myKeys.KEYBOARD.KEY_SPACE] != true) {
				this.next = false;
			}

			ctx.textAlign = "center";
			ctx.textBaseline = "middle";

			ctx.save();
			if (this.fade == true) {
				//FADE
				ctx.globalAlpha = .1;
			} else if (this.superFade == true) {
				//SUPERFADE
				ctx.globalAlpha = .05;
			} else {
				ctx.globalAlpha = .7;
			}

			ctx.restore();

			//MOVES LISTED
			if (this.toggle2 == false) {
				this.ctx.save();
				if (this.extraFade2 == true) {
					ctx.globalAlpha = .3;
				} else {
					ctx.globalAlpha = .6;
				}
				ctx.fillStyle = "rgb(0,34,7)";
				ctx.fillRect(800, 295, 220, 320);
				ctx.strokeStyle = "black";
				ctx.strokeRect(800, 295, 220, 320);
				this.ctx.restore();
				ctx.save();
				if (this.extraFade2 == true) {
					ctx.globalAlpha = .1;
				} else {
					ctx.globalAlpha = .6;
				}
				this.fillText(this.ctx, "Enter to end", this.WIDTH / 2 + 400, 367, "16pt heavy_data", "#c9be03");
				this.fillText(this.ctx, "'T': Toggle Tutorials", this.WIDTH / 2 + 400, 390, "12pt heavy_data", "#c9be03");
				this.fillText(this.ctx, "Controls", this.WIDTH / 2 + 400, 335, "32pt heavy_data", "#c9be03");
				this.fillText(this.ctx, "Controls", this.WIDTH / 2 + 400, 335, "32pt heavy_data", "white");
				this.fillText(this.ctx, "'A': Basic Attack", this.WIDTH / 2 + 400, 410, "12pt heavy_data", "#c9be03");
				this.fillText(this.ctx, "'S': Energy Attack", this.WIDTH / 2 + 400, 430, "12pt heavy_data", "#c9be03");
				this.fillText(this.ctx, "'Q': Super Speed", this.WIDTH / 2 + 400, 450, "12pt heavy_data", "#c9be03");
				this.fillText(this.ctx, "'E': Taunt", this.WIDTH / 2 + 400, 470, "12pt heavy_data", "#c9be03");
				this.fillText(this.ctx, "'W': Block", this.WIDTH / 2 + 400, 490, "12pt heavy_data", "#c9be03");
				this.fillText(this.ctx, "'D A': Strong Attack", this.WIDTH / 2 + 400, 510, "12pt heavy_data", "#c9be03");
				this.fillText(this.ctx, "'D S': Powerful Energy", this.WIDTH / 2 + 400, 530, "12pt heavy_data", "#c9be03");
				this.fillText(this.ctx, "'D W': Android Barrier", this.WIDTH / 2 + 400, 550, "12pt heavy_data", "#c9be03");
				this.fillText(this.ctx, "'P': Pause", this.WIDTH / 2 + 400, 570, "12pt heavy_data", "#c9be03");
				this.fillText(this.ctx, "'Arrow Keys': Move Or Fly", this.WIDTH / 2 + 400, 590, "12pt heavy_data", "#c9be03");
			}

			if (this.toggle1 == false) {
				//INSTRUCTIONS
				this.ctx.save();
				if (this.extraFade == true) {
					ctx.globalAlpha = .3;
				} else {
					ctx.globalAlpha = .6;
				}
				ctx.fillStyle = "rgb(0,34,7)";
				ctx.fillRect(222, 345, 580, 200);
				ctx.strokeStyle = "black";
				ctx.strokeRect(222, 345, 580, 200);
				this.ctx.restore();
				this.ctx.save();
				if (this.extraFade == true) {
					ctx.globalAlpha = .1;
				} else {
					ctx.globalAlpha = .6;
				}
				this.fillText(this.ctx, "TUTORIAL MODE", this.WIDTH / 2, 385, "32pt heavy_data", "#c9be03");
				this.fillText(this.ctx, "TUTORIAL MODE", this.WIDTH / 2, 385, "32pt heavy_data", "white");
				this.fillText(this.ctx, "Spacebar to progress", this.WIDTH / 2 - 125 + 5, 515, "11pt heavy_data", "white");
				this.fillText(this.ctx, "Enter to end", this.WIDTH / 2 + 120 + 15, 515, "11pt heavy_data", "white");
				this.fillText(this.ctx, this.instructions + 1 + " OF 23", this.WIDTH / 2 + 15, 515, "16pt heavy_data", "white");
				if (this.instructions == 0) {
					this.fillText(this.ctx, "Lets begin the testing my androids", this.WIDTH / 2, 425, "24pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "Use the space bar for instructions and attack for practice", this.WIDTH / 2, 460, "14pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "Press T to toggle each of the test displays on or off", this.WIDTH / 2, 490, "14pt heavy_data", "#c9be03");
				} else if (this.instructions == 1) {
					this.fillText(this.ctx, "Interface Meters", this.WIDTH / 2, 445, "48pt heavy_data", "#c9be03");
				} else if (this.instructions == 2) {
					this.fillText(this.ctx, "Look above, for you and your target", this.WIDTH / 2, 430, "14pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "There are 4 bars on the battle interface", this.WIDTH / 2, 460, "14pt heavy_data", "#c9be03");
					ctx.save();
					ctx.globalAlpha = .3;
					ctx.fillStyle = "red";
					ctx.fillRect(49, 55, 375, 35);
					ctx.fillRect(595, 55, 375, 35);
					ctx.fillRect(49, 90, 375, 37);
					ctx.fillRect(595, 90, 375, 37);
					ctx.fillRect(49, 127, 246, 30);
					ctx.fillRect(725, 127, 246, 30);
					ctx.restore();
				} else if (this.instructions == 3) {
					this.fillText(this.ctx, "The top white bar is endurance", this.WIDTH / 2, 430, "14pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "This reduces when hit but will regenerate over time", this.WIDTH / 2, 460, "14pt heavy_data", "#c9be03");
					ctx.save();
					ctx.globalAlpha = .3;
					ctx.fillStyle = "red";
					ctx.fillRect(49, 55, 375, 35);
					ctx.fillRect(595, 55, 375, 35);
					ctx.restore();
				} else if (this.instructions == 4) {
					this.fillText(this.ctx, "The lower white bar is health", this.WIDTH / 2, 430, "14pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "This reduces when hit but only when edurance is depleated", this.WIDTH / 2, 460, "14pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "This bar will NOT regenerate", this.WIDTH / 2, 490, "14pt heavy_data", "#c9be03");
					ctx.save();
					ctx.globalAlpha = .3;
					ctx.fillStyle = "red";
					ctx.fillRect(49, 90, 375, 37);
					ctx.fillRect(595, 90, 375, 37);
					ctx.restore();
				} else if (this.instructions == 5) {
					this.fillText(this.ctx, "This sometimes dark red bar is a measure of fatigue", this.WIDTH / 2, 430, "14pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "This will fill a bit with each physical attack", this.WIDTH / 2, 460, "14pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "If this reaches max it will cause exhaustion", this.WIDTH / 2, 490, "14pt heavy_data", "#c9be03");
					ctx.save();
					ctx.globalAlpha = .3;
					ctx.fillStyle = "red";
					ctx.fillRect(49, 110, 246, 30);
					ctx.fillRect(725, 110, 246, 30);
					ctx.restore();
				} else if (this.instructions == 6) {
					this.fillText(this.ctx, "If exhaustion occurs the bar will blink bright red", this.WIDTH / 2, 430, "14pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "This will prevent you from using physical attacks", this.WIDTH / 2, 460, "14pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "Normalize by allowing it to depleat halfway or by taunting", this.WIDTH / 2, 490, "14pt heavy_data", "#c9be03");
					ctx.save();
					ctx.globalAlpha = .3;
					ctx.fillStyle = "red";
					ctx.fillRect(49, 110, 246, 30);
					ctx.fillRect(725, 110, 246, 30);
					ctx.restore();
				} else if (this.instructions == 7) {
					this.fillText(this.ctx, "The yellow bar is your energy meter", this.WIDTH / 2, 430, "14pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "This will be used by energy attacks and activating Super Speed", this.WIDTH / 2, 460, "14pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "I have designed your systems to forever regenerate energy", this.WIDTH / 2, 490, "14pt heavy_data", "#c9be03");
					ctx.save();
					ctx.globalAlpha = .3;
					ctx.fillStyle = "red";
					ctx.fillRect(49, 133, 246, 24);
					ctx.fillRect(725, 133, 246, 24);
					ctx.restore();
				} else if (this.instructions == 8) {
					this.fillText(this.ctx, "Movement", this.WIDTH / 2, 445, "48pt heavy_data", "#c9be03");
				} else if (this.instructions == 9) {
					this.fillText(this.ctx, "Tap the up key to jump or hold it to defy gravity and fly", this.WIDTH / 2, 430, "14pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "Attacking or engaging the enemy in air will allow you to hover", this.WIDTH / 2, 460, "14pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "Attacks may change depending on if your grounded or airborne", this.WIDTH / 2, 490, "14pt heavy_data", "#c9be03");
				} else if (this.instructions == 10) {
					this.fillText(this.ctx, "Left and Right arrows to move in those directions respectively", this.WIDTH / 2, 430, "14pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "Down works if your airborne to accelerate you downward", this.WIDTH / 2, 460, "14pt heavy_data", "#c9be03");
				} else if (this.instructions == 11) {
					this.fillText(this.ctx, "Battle Controls ", this.WIDTH / 2, 445, "48pt heavy_data", "#c9be03");
				} else if (this.instructions == 12) {
					this.fillText(this.ctx, "The only useable keys for combat are W, A, S, D, and Q", this.WIDTH / 2, 430, "14pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "'A': Fast Basic Attacks with low fatigue build up", this.WIDTH / 2, 460, "14pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "'S': Ranged Energy Blast Attacks with a low energy cost", this.WIDTH / 2, 490, "14pt heavy_data", "#c9be03");
				} else if (this.instructions == 13) {
					this.fillText(this.ctx, "'W': Block incoming physical attacks only", this.WIDTH / 2, 430, "14pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "Blocking stops all damage but will increase fatigue when hit", this.WIDTH / 2, 460, "14pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "You cannot block if your exhausted", this.WIDTH / 2, 490, "14pt heavy_data", "#c9be03");
				} else if (this.instructions == 14) {
					this.fillText(this.ctx, "'Q': Move at Super Speed to essentially teleport", this.WIDTH / 2, 430, "14pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "This will use energy and avoid all damage until it ends", this.WIDTH / 2, 460, "14pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "You'll appear behind your enemy or in a direction your moving", this.WIDTH / 2, 490, "14pt heavy_data", "#c9be03");
				} else if (this.instructions == 15) {
					this.fillText(this.ctx, "'D': Holding this key will intensify or alter abilies", this.WIDTH / 2, 430, "14pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "'D' with 'A': strong physical attacks with high fatigue build up", this.WIDTH / 2, 460, "14pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "'D' with 'S': Powerful Energy attacks with high energy cost", this.WIDTH / 2, 490, "14pt heavy_data", "#c9be03");
				} else if (this.instructions == 16) {
					this.fillText(this.ctx, "'D' combined with 'W' will turn block into an android barrier", this.WIDTH / 2, 430, "14pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "This will drain a lot of energy and cant be stopped early", this.WIDTH / 2, 460, "14pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "However nothing can hurt you while within this energy shield", this.WIDTH / 2, 490, "14pt heavy_data", "#c9be03");
				} else if (this.instructions == 17) {
					this.fillText(this.ctx, "'E' will cause you to taunt your opponent", this.WIDTH / 2, 430, "14pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "This will make you vulnerable to attacks and may fail if hit", this.WIDTH / 2, 460, "14pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "A sucessful taunt will lower your fatigue to zero", this.WIDTH / 2, 490, "14pt heavy_data", "#c9be03");
				} else if (this.instructions == 18) {
					this.fillText(this.ctx, "Important Facts", this.WIDTH / 2, 445, "48pt heavy_data", "#c9be03");
				} else if (this.instructions == 19) {
					this.fillText(this.ctx, "You can land on some structures by flying above it first", this.WIDTH / 2, 430, "14pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "To drop below it again just hold the down key while airborne", this.WIDTH / 2, 460, "14pt heavy_data", "#c9be03");
				} else if (this.instructions == 20) {
					this.fillText(this.ctx, "Energy attack hits will cause burns that halt endurance regen", this.WIDTH / 2, 430, "14pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "The length of this halt depends on the intersity of the attack", this.WIDTH / 2, 460, "14pt heavy_data", "#c9be03");
				} else if (this.instructions == 21) {
					this.fillText(this.ctx, "Flying behind the battle interface will cause it to fade", this.WIDTH / 2, 430, "14pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "Keep this in mind when fighting at high altitudes", this.WIDTH / 2, 460, "14pt heavy_data", "#c9be03");
				} else if (this.instructions == 22) {
					this.fillText(this.ctx, "That is all I need for now my androids", this.WIDTH / 2, 425, "18pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "Now prove your worth in a battle examination", this.WIDTH / 2, 455, "18pt heavy_data", "#c9be03");
					this.fillText(this.ctx, "Else I dismantle you both like I did android 19!", this.WIDTH / 2, 485, "18pt heavy_data", "#c9be03");
				}
			}
			ctx.restore();
			ctx.restore();
		}
	}

	if (this.gameState == this.GAME_STATE.BEGIN) {
		/* if(myKeys.keydown[myKeys.KEYBOARD.KEY_C] == true && this.next == false){
  	this.next = true;
  	if(this.instructions < 5){
  		this.instructions++;
  	} else {
  		this.instructions = 0;
  	}
  } else if(myKeys.keydown[myKeys.KEYBOARD.KEY_C] != true){
  	this.next = false;
  } */

		ctx.save();
		ctx.fillStyle = "rgb(0,34,7)";
		ctx.fillRect(0, 0, 1024, 768);
		ctx.save();
		ctx.globalAlpha = this.iAlpha / 100;
		ctx.drawImage(this.digitalBackground, 0, 0);
		ctx.restore();
		ctx.save();
		ctx.globalAlpha = .6;
		ctx.fillStyle = "rgb(0,34,7)";
		ctx.fillRect(0, 0, 1024, 768);
		ctx.restore();
		ctx.drawImage(this.titleBar, -3, 300 + this.iAlpha / 15, 1026, 299);
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		this.environment.drawForeground(this.ctx); // DRAW Foreground
		ctx.globalAlpha = .8;
		//INSTRUCTIONS
		if (this.instructions == 0) {
			//this.fillText(this.ctx,"The Red Ribbon Androids", this.WIDTH/2 - 10, 190, "60pt heavy_data", "#c9be03");
			ctx.save();
			ctx.globalAlpha = .7;
			ctx.fillStyle = "rgb(0,34,7)";
			ctx.fillRect(0, 315, 1024, 280);
			ctx.strokeStyle = "black";
			ctx.strokeRect(0, 315, 1024, 280);

			/* ctx.fillStyle = "rgb(0,34,7)";
   ctx.fillRect(250,27,540,280);
   ctx.strokeStyle = "black";
   ctx.strokeRect(250,27,540,280);
   
   ctx.fillStyle = "rgb(0,34,7)";
   ctx.fillRect(60,600,900,150);
   ctx.strokeStyle = "black";
   ctx.strokeRect(60,600,900,150); */

			ctx.restore();
			ctx.save();
			ctx.globalAlpha = .85;
			ctx.drawImage(this.redRibbon, 295, 92, 220, 120);
			ctx.globalAlpha = .3;
			this.fillText(this.ctx, "e", 290 + 98, 161, "27pt heavy_data", "black");
			this.fillText(this.ctx, "d", 290 + 116, 161, "27pt heavy_data", "black");
			this.fillText(this.ctx, "e", 290 + 93, 164, "27pt heavy_data", "black");
			this.fillText(this.ctx, "d", 290 + 113, 164, "27pt heavy_data", "black");
			ctx.save();
			ctx.globalAlpha = .7;
			this.fillText(this.ctx, "ed", 290 + 105, 163, "25pt heavy_data", "#bac6b3");
			ctx.restore();
			//this.fillText(this.ctx,"e", 290 + 90, 175, "30pt heavy_data", "white");
			//this.fillText(this.ctx,"d", 290 + 113, 185, "30pt heavy_data", "white");
			//this.fillText(this.ctx,"e", 290 + 50, 190, "30pt heavy_data", "white");
			//this.fillText(this.ctx,"d", 290 + 50, 215, "30pt heavy_data", "white");
			//ctx.restore();
			//this.fillText(this.ctx,"R", 220 + 100, 150, "70pt heavy_data", "white");
			//this.fillText(this.ctx,"ed", 290 + 100, 150, "70pt heavy_data", "white");
			//this.fillText(this.ctx,"R", 385 + 100, 150, "70pt heavy_data", "white");
			ctx.save();
			ctx.globalAlpha = .8;
			this.fillText(this.ctx, "ibbon", 530 + 100, 152, "72pt heavy_data", "black");
			this.fillText(this.ctx, "ibbon", 530 + 100, 150, "70pt heavy_data", "#bac6b3");
			ctx.restore();
			ctx.save();
			ctx.globalAlpha = .7;
			this.fillText(this.ctx, "The", this.WIDTH / 2, 60, "70pt heavy_data", "#c9be03");
			this.fillText(this.ctx, "Androids", this.WIDTH / 2 + 8, 240, "85pt heavy_data", "#c9be03");
			this.fillText(this.ctx, "Press Enter to Engage!", this.WIDTH / 2, 650, "42pt heavy_data", "#c9be03");
			this.fillText(this.ctx, "Press Enter to Engage!", this.WIDTH / 2, 650, "42pt heavy_data", "white");
			//this.fillText(this.ctx,"Press C for credits", this.WIDTH/2 + 350, 740, "17pt heavy_data", "white");
			this.fillText(this.ctx, "Press C for credits", this.WIDTH / 2, 730, "17pt heavy_data", "white");
			ctx.restore();
			ctx.restore();
		} else if (this.instructions == 1) {
			this.iAlpha = 20;
			this.fillText(this.ctx, "POWER BARS", this.WIDTH / 2 - 10, 670, "60pt heavy_data", "#c9be03");
			this.fillText(this.ctx, "There are 4 bars on the in battle interface.", this.WIDTH / 2, 50, "15pt heavy_data", "#c9be03");
			this.fillText(this.ctx, "The top green bar is your regenerating endurance to protect the second gree bar of non-regen health.", this.WIDTH / 2, 80, "15pt heavy_data", "white");
			this.fillText(this.ctx, "The yellow bar is your energy. This will be used for ranged blast attacks and moving at Super Speed.", this.WIDTH / 2, 110, "15pt heavy_data", "white");
			this.fillText(this.ctx, "As a superior android energy is infine so it will regenerate over time. Mortals will run out eventually.", this.WIDTH / 2, 140, "15pt heavy_data", "white");
			this.fillText(this.ctx, "The white bar is a measure of fatigue. Dont allow this to reach max or it will turn red due to exhaustion.", this.WIDTH / 2, 170, "15pt heavy_data", "white");
			this.fillText(this.ctx, "If you become exhausted you will not be able to use basic or hard attacks for a litle while.", this.WIDTH / 2, 200, "15pt heavy_data", "white");
			this.fillText(this.ctx, "If the bar falls low enough it will go back to white and you will return to normal.", this.WIDTH / 2, 230, "15pt heavy_data", "white");
			this.fillText(this.ctx, "Attempt a risky taunt to drop fatigue to normal.", this.WIDTH / 2, 260, "15pt heavy_data", "white");
			this.fillText(this.ctx, "Press C for more", this.WIDTH / 2 + 350, 740, "17pt heavy_data", "#c9be03");
		} else if (this.instructions == 2) {
			this.iAlpha = 20;
			this.fillText(this.ctx, "MOVEMENT", this.WIDTH / 2 - 10, 670, "60pt heavy_data", "#c9be03");
			this.fillText(this.ctx, "Use the arrow keys for basic movement.", this.WIDTH / 2, 50, "15pt heavy_data", "#c9be03");
			this.fillText(this.ctx, "Tap the up key to jump or hold it to defy gravity and fly around.", this.WIDTH / 2, 80, "15pt heavy_data", "white");
			this.fillText(this.ctx, "The down key only works if your jumping/flying. It will accelerate you to the ground.", this.WIDTH / 2, 110, "15pt heavy_data", "white");
			this.fillText(this.ctx, "Some moves will change depending on if your grounded or airborne.", this.WIDTH / 2, 170, "15pt heavy_data", "white");
			this.fillText(this.ctx, "Combine the different movement functions to out maneuver your opponents.", this.WIDTH / 2, 200, "15pt heavy_data", "white");
			this.fillText(this.ctx, "Press C for more", this.WIDTH / 2 + 350, 740, "17pt heavy_data", "#c9be03");
		} else if (this.instructions == 3) {
			this.iAlpha = 20;
			this.fillText(this.ctx, "CONTROLS", this.WIDTH / 2 - 10, 670, "60pt heavy_data", "#c9be03");
			this.fillText(this.ctx, "The only useable keys are A, S, D, Q, and W.", this.WIDTH / 2, 50, "15pt heavy_data", "#c9be03");
			this.fillText(this.ctx, "'A': Fast Basic Attacks.", this.WIDTH / 2, 80, "15pt heavy_data", "white");
			this.fillText(this.ctx, "'S': Ranged Energy Blast Attacks.", this.WIDTH / 2, 110, "15pt heavy_data", "white");
			this.fillText(this.ctx, "'W': Block incoming attacks. However avoid doing with with energy blasts.", this.WIDTH / 2, 140, "15pt heavy_data", "white");
			this.fillText(this.ctx, "Note: Getting hit blocking stops all damage but you will still feel some fatigue and impact.", this.WIDTH / 2, 170, "15pt heavy_data", "white");
			this.fillText(this.ctx, "'Q': Super Speed button. Move so far that you will essentially teleport.", this.WIDTH / 2, 200, "15pt heavy_data", "white");
			this.fillText(this.ctx, "Note: Super Speed chooses location based on intended movement direction and enemy proximity.", this.WIDTH / 2, 230, "15pt heavy_data", "white");
			this.fillText(this.ctx, "Press C for more", this.WIDTH / 2 + 350, 740, "17pt heavy_data", "#c9be03");
		} else if (this.instructions == 4) {
			this.iAlpha = 20;
			this.fillText(this.ctx, "CONTROLS", this.WIDTH / 2 - 10, 670, "60pt heavy_data", "#c9be03");
			this.fillText(this.ctx, "'D': The intensify button. But it currently only has 2 functions.", this.WIDTH / 2, 50, "15pt heavy_data", "#c9be03");
			this.fillText(this.ctx, "'D' combined with 'A' will produce high impact attacks that will push and stun.  Warning these attacks will cause more fatigue.", this.WIDTH / 2, 80, "15pt heavy_data", "white");
			this.fillText(this.ctx, "Warning these attacks will cause more fatigue and are easier for your oppenent to avoid.", this.WIDTH / 2, 110, "15pt heavy_data", "white");
			this.fillText(this.ctx, "'D' combined with 'W' will turn block into a vulnerable taunt. successful use will dissipate fatigue.", this.WIDTH / 2, 140, "15pt heavy_data", "white");
			this.fillText(this.ctx, "Other Control hints.", this.WIDTH / 2, 170, "15pt heavy_data", "#c9be03");
			this.fillText(this.ctx, "Some attacks you can move and use it while others are either partially restricted or you must be still.", this.WIDTH / 2, 200, "15pt heavy_data", "white");
			this.fillText(this.ctx, "Your own blast attacks can hurt you so avoid using them at point blank or getting in their paths.", this.WIDTH / 2, 230, "15pt heavy_data", "white");
			this.fillText(this.ctx, "Press C for more", this.WIDTH / 2 + 350, 740, "17pt heavy_data", "#c9be03");
		} else if (this.instructions == 5) {
			this.iAlpha = 20;
			this.fillText(this.ctx, "Primary Directive", this.WIDTH / 2 - 10, 670, "60pt heavy_data", "#c9be03");
			this.fillText(this.ctx, "Dr. GEROS ORDERS...", this.WIDTH / 2, 45, "25pt heavy_data", "#c9be03");
			this.fillText(this.ctx, "DESTROY GOKU!!!.", this.WIDTH / 2, 80, "15pt heavy_data", "white");
			this.fillText(this.ctx, "ANNIHILATE GOKU!!!.", this.WIDTH / 2, 110, "15pt heavy_data", "white");
			this.fillText(this.ctx, "OBLITERATE GOKU!!!.", this.WIDTH / 2, 140, "15pt heavy_data", "white");
			this.fillText(this.ctx, "END GOKU...", this.WIDTH / 2, 170, "15pt heavy_data", "#c9be03");
			this.fillText(this.ctx, "GOKU.......", this.WIDTH / 2, 200, "15pt heavy_data", "white");
			this.fillText(this.ctx, "REVENGE!!....", this.WIDTH / 2, 230, "15pt heavy_data", "white");
			this.fillText(this.ctx, "Press C to return", this.WIDTH / 2 + 350, 740, "17pt heavy_data", "#c9be03");
		}
	} // end if

	if (this.gameState == this.GAME_STATE.CREDITS) {
		if (this.creditsRoll < 240 + (this.spacing * 11 + 3550)) {
			this.creditsRoll += 10;
		}
		ctx.save();
		ctx.fillStyle = "rgb(0,34,7)";
		ctx.fillRect(0, 0, 1024, 768);
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.globalAlpha = .7;
		this.fillText(this.ctx, "Credits", this.WIDTH / 2, 300 - this.creditsRoll, "120pt heavy_data", "#c9be03");
		this.fillText(this.ctx, "Creative Director: Christopher Bennett", this.WIDTH / 2, this.spacing * 1 + 300 - this.creditsRoll, "25pt heavy_data", "#c9be03");
		this.fillText(this.ctx, "Producer: Christopher Bennett", this.WIDTH / 2, this.spacing * 2 + 300 - this.creditsRoll, "25pt heavy_data", "#c9be03");
		this.fillText(this.ctx, "Game Designer: Christopher Bennett", this.WIDTH / 2, this.spacing * 3 + 300 - this.creditsRoll, "25pt heavy_data", "#c9be03");
		this.fillText(this.ctx, "Game Programmer: Christopher Bennett", this.WIDTH / 2, this.spacing * 4 + 300 - this.creditsRoll, "25pt heavy_data", "#c9be03");
		this.fillText(this.ctx, "Animator: Christopher Bennett", this.WIDTH / 2, this.spacing * 5 + 300 - this.creditsRoll, "25pt heavy_data", "#c9be03");
		this.fillText(this.ctx, "Audio Engineer: Christopher Bennett", this.WIDTH / 2, this.spacing * 6 + 300 - this.creditsRoll, "25pt heavy_data", "#c9be03");
		this.fillText(this.ctx, "Artist: Christopher Bennett", this.WIDTH / 2, this.spacing * 7 + 300 - this.creditsRoll, "25pt heavy_data", "#c9be03");
		this.fillText(this.ctx, "Level Editor: Christopher Bennett", this.WIDTH / 2, this.spacing * 8 + 300 - this.creditsRoll, "25pt heavy_data", "#c9be03");
		this.fillText(this.ctx, "QA Tester: Christopher Bennett", this.WIDTH / 2, this.spacing * 9 + 300 - this.creditsRoll, "25pt heavy_data", "#c9be03");
		this.fillText(this.ctx, "Credited Assets/Resources", this.WIDTH / 2, this.spacing * 10 + 300 - this.creditsRoll, "50pt heavy_data", "#c9be03");
		this.fillText(this.ctx, "Used and modified for creative educational purposes", this.WIDTH / 2, this.spacing * 10 + 360 - this.creditsRoll, "25pt heavy_data", "#c9be03");
		this.fillText(this.ctx, "Many energy attack sprites: http://www.spriters-resource.com/game_boy_advance/dbzsuperwar/sheet/26657/", this.WIDTH / 2, this.spacing * 11 + 300 - this.creditsRoll, "12pt arial", "#c9be03");
		this.fillText(this.ctx, "Android 18 sprites: http://www.spriters-resource.com/3ds/dragonballzextremebutoden/sheet/67257/", this.WIDTH / 2, this.spacing * 11 + 400 - this.creditsRoll, "12pt arial", "#c9be03");
		this.fillText(this.ctx, "Vegeta sprites: https://www.spriters-resource.com/3ds/dragonballzextremebutoden/sheet/67278/", this.WIDTH / 2, this.spacing * 11 + 500 - this.creditsRoll, "12pt arial", "#c9be03");
		this.fillText(this.ctx, "Android 17 sprites: http://www.geocities.ws/mega_gohans_battleground/dbz17sheet.gif", this.WIDTH / 2, this.spacing * 11 + 600 - this.creditsRoll, "12pt arial", "#c9be03");
		this.fillText(this.ctx, "Vectors JS code: https://evanw.github.io/lightgl.js/docs/vector.html", this.WIDTH / 2, this.spacing * 11 + 700 - this.creditsRoll, "12pt arial", "#c9be03");
		this.fillText(this.ctx, "Voice and sound data: https://www.sounds-resource.com/wii/dbzbt3/sound/", this.WIDTH / 2, this.spacing * 11 + 800 - this.creditsRoll, "12pt arial", "#c9be03");
		this.fillText(this.ctx, "Interface border: http://smg.photobucket.com/user/dutchguy1984/media/step6.gif.html", this.WIDTH / 2, this.spacing * 11 + 900 - this.creditsRoll, "12pt arial", "#c9be03");
		this.fillText(this.ctx, "Inner interface borders: http://bin.smwcentral.net/u/24654/techborder7rs.png", this.WIDTH / 2, this.spacing * 11 + 1000 - this.creditsRoll, "12pt arial", "#c9be03");
		this.fillText(this.ctx, "Digital green: http://st2.depositphotos.com/3205183/6019/i/950/depositphotos_60195665-Binary-code-backgroundwith-computer.jpg", this.WIDTH / 2, this.spacing * 11 + 1100 - this.creditsRoll, "12pt arial", "#c9be03");
		this.fillText(this.ctx, "Tien sprites: http://spritedatabase.net/files/ps1/2393/Sprite/UB22_Tien.PNG", this.WIDTH / 2, this.spacing * 11 + 1200 - this.creditsRoll, "12pt arial", "#c9be03");
		this.fillText(this.ctx, "Gohan sprites: https://www.spriters-resource.com/3ds/dragonballzextremebutoden/sheet/67252/", this.WIDTH / 2, this.spacing * 11 + 1300 - this.creditsRoll, "12pt arial", "#c9be03");
		this.fillText(this.ctx, "Krillin Sprites: https://www.spriters-resource.com/3ds/dragonballzextremebutoden/sheet/67269/", this.WIDTH / 2, this.spacing * 11 + 1400 - this.creditsRoll, "12pt arial", "#c9be03");
		this.fillText(this.ctx, "Piccolo sprites: https://www.spriters-resource.com/3ds/dragonballzextremebutoden/sheet/67249/", this.WIDTH / 2, this.spacing * 11 + 1500 - this.creditsRoll, "12pt arial", "#c9be03");
		this.fillText(this.ctx, "Yamcha sprites: http://i.imgur.com/Khwr9.png", this.WIDTH / 2, this.spacing * 11 + 1600 - this.creditsRoll, "12pt arial", "#c9be03");
		this.fillText(this.ctx, "Chaozu sprites: http://zitlezoan.deviantart.com/art/Chaozu-n2-348824931", this.WIDTH / 2, this.spacing * 11 + 1700 - this.creditsRoll, "12pt arial", "#c9be03");
		this.fillText(this.ctx, "Dr Gero sprites: https://www.spriters-resource.com/fullview/47872/", this.WIDTH / 2, this.spacing * 11 + 1800 - this.creditsRoll, "12pt arial", "#c9be03");
		this.fillText(this.ctx, "Warehouse: http://ukfilmlocation.com/Locations/LON1820/LON1820_6-800.jpg", this.WIDTH / 2, this.spacing * 11 + 1900 - this.creditsRoll, "12pt arial", "#c9be03");
		this.fillText(this.ctx, "Smoke cloud: http://pgsecurity.co.uk/wp-content/uploads/2013/11/smoke-cloak-security-fog.jpg", this.WIDTH / 2, this.spacing * 11 + 2000 - this.creditsRoll, "12pt arial", "#c9be03");
		this.fillText(this.ctx, "Special Effects like dust: http://xypter.deviantart.com/art/Ultimate-Effects-Sheet-6-212140764", this.WIDTH / 2, this.spacing * 11 + 2100 - this.creditsRoll, "12pt arial", "#c9be03");
		this.fillText(this.ctx, "Power up auras: http://3.bp.blogspot.com/_2n_u_69YOUA/TUXszCfrbDI/AAAAAAAAAH0/EARaj_EAxLs/s1600/conjuntos%2Bde%2Bauras.png", this.WIDTH / 2, this.spacing * 11 + 2200 - this.creditsRoll, "12pt arial", "#c9be03");
		this.fillText(this.ctx, "Various effects: http://www.deviantart.com/art/Some-Effects-107393192", this.WIDTH / 2, this.spacing * 11 + 2300 - this.creditsRoll, "12pt arial", "#c9be03");
		this.fillText(this.ctx, "Rain Tutorial: https://codepen.io/ruigewaard/pen/JHDdF/", this.WIDTH / 2, this.spacing * 11 + 2400 - this.creditsRoll, "12pt arial", "#c9be03");
		this.fillText(this.ctx, "Song for some clips: Dream Theater's Home", this.WIDTH / 2, this.spacing * 11 + 2500 - this.creditsRoll, "12pt arial", "#c9be03");
		this.fillText(this.ctx, "All other background music: Faulconer Productions", this.WIDTH / 2, this.spacing * 11 + 2600 - this.creditsRoll, "12pt arial", "#c9be03");
		this.fillText(this.ctx, "Dragon Ball Z is the property of Toei Entertainment and Funimation", this.WIDTH / 2, this.spacing * 11 + 3000 - this.creditsRoll, "20pt heavy_data", "#c9be03");
		this.fillText(this.ctx, "A Christopher Bennett Game", this.WIDTH / 2, this.spacing * 11 + 3500 - this.creditsRoll, "50pt heavy_data", "#c9be03");

		ctx.save();
		ctx.globalAlpha = .85;
		ctx.drawImage(this.redRibbon, 295, 92 + (this.spacing * 11 + 4000) - this.creditsRoll, 220, 120);
		ctx.globalAlpha = .7;
		this.fillText(this.ctx, "ed", 290 + 105, 163 + (this.spacing * 11 + 4000) - this.creditsRoll, "25pt heavy_data", "#bac6b3");
		ctx.restore();
		/* ctx.save();
  ctx.globalAlpha = .4;
  this.fillText(this.ctx,"e", 290 + 96, 164 + ((this.spacing * 11) + 4000) - this.creditsRoll, "32pt heavy_data", "black");
  this.fillText(this.ctx,"d", 290 + 117.5, 164 + ((this.spacing * 11) + 4000) - this.creditsRoll, "32pt heavy_data", "black");
  this.fillText(this.ctx,"e", 290 + 93, 166 + ((this.spacing * 11) + 4000) - this.creditsRoll, "32pt heavy_data", "black");
  this.fillText(this.ctx,"d", 290 + 114.5, 166 + ((this.spacing * 11) + 4000) - this.creditsRoll, "32pt heavy_data", "black");
  ctx.restore(); */
		ctx.save();
		ctx.globalAlpha = .65;
		this.fillText(this.ctx, "ibbon", 530 + 100, 152 + (this.spacing * 11 + 4000) - this.creditsRoll, "72pt heavy_data", "black");
		this.fillText(this.ctx, "ibbon", 530 + 100, 150 + (this.spacing * 11 + 4000) - this.creditsRoll, "70pt heavy_data", "#bac6b3");
		ctx.restore();
		ctx.save();
		ctx.globalAlpha = .7;
		this.fillText(this.ctx, "The", this.WIDTH / 2, 60 + (this.spacing * 11 + 4000) - this.creditsRoll, "70pt heavy_data", "#c9be03");
		this.fillText(this.ctx, "Androids", this.WIDTH / 2 + 8, 240 + (this.spacing * 11 + 4000) - this.creditsRoll, "85pt heavy_data", "#c9be03");
		ctx.restore();

		ctx.restore();
	} // end if

	if (this.gameState == this.GAME_STATE.VICTORY) {
		ctx.save();
		ctx.fillStyle = "rgb(0,34,7)";
		ctx.fillRect(0, 0, 1024, 768);
		ctx.save();
		ctx.globalAlpha = this.iAlpha / 100;
		ctx.drawImage(this.digitalBackground, 0, 0);
		ctx.restore();
		ctx.save();
		ctx.globalAlpha = .6;
		ctx.fillStyle = "rgb(0,34,7)";
		ctx.fillRect(0, 0, 1024, 768);
		ctx.restore();
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.globalAlpha = .7;
		ctx.save();
		ctx.translate(this.WIDTH / 2 - 65, this.HEIGHT / 2 - 65);
		//ctx.scale(3,3);
		ctx.drawImage(this.redRibbon, 0, 0);
		ctx.restore();

		if (this.calculated != true) {

			this.totalScore = this.roundScore - this.roundScore2;
			this.totalPoints = this.roundScore + this.roundScore2;

			if (this.roundScore > this.hs18) {
				this.hs18 = this.roundScore;
			}
			if (this.roundScore2 > this.hs17) {
				this.hs17 = this.roundScore2;
			}
			if (this.totalPoints > this.hsTotal) {
				this.hsTotal = this.totalPoints;
			}
			if (this.totalScore > 0) {
				this.victories += 1;
				this.recentVictory = true;
			} else {
				this.recentVictory = false;
			}
			if (this.trueEnding == true) {
				this.trueDomination += 1;
			} else {
				this.classicDomination += 1;
			}
			if (this.android18.health > 99) {
				this.perfects += 1;
				this.recentPerfect = true;
			} else {
				this.recentPerfect = false;
			}

			this.recentDomination = true;

			this.dominations += 1;

			this.calculated = true;
		}

		if (this.saved != true) {
			document.querySelector("#gameButton").click();
			document.querySelector("#statSubmit").click();
			this.saved = true;
		}

		if (this.trueEnding == true) {
			this.fillText(this.ctx, "The Beginning?", this.WIDTH / 2, this.HEIGHT / 2 - 110, "50pt heavy_data", "#c9be03");
			this.fillText(this.ctx, "The Beginning?", this.WIDTH / 2, this.HEIGHT / 2 - 110, "50pt heavy_data", "white");
		} else {
			this.fillText(this.ctx, "The End?", this.WIDTH / 2, this.HEIGHT / 2 - 110, "50pt heavy_data", "#c9be03");
			this.fillText(this.ctx, "The End?", this.WIDTH / 2, this.HEIGHT / 2 - 110, "50pt heavy_data", "white");
		}
		//this.fillText(this.ctx,"Press Enter the earth is yours.......", this.WIDTH/2, this.HEIGHT/2 + 130, "20pt heavy_data", "#c9be03");
		this.fillText(this.ctx, "18 Points Detected:... " + this.roundScore, this.WIDTH / 2, this.HEIGHT / 2 + 30, "25pt heavy_data", "#c9be03");
		this.fillText(this.ctx, "17 Points Detected:... " + this.roundScore2, this.WIDTH / 2, this.HEIGHT / 2 + 68, "25pt heavy_data", "#c9be03");
		if (this.totalScore > 0) {
			this.fillText(this.ctx, "Winner 18... Score: " + this.totalScore, this.WIDTH / 2, this.HEIGHT / 2 + 120, "40pt heavy_data", "green");
		} else {
			this.fillText(this.ctx, "Winner 17... Score: " + this.totalScore * -1, this.WIDTH / 2, this.HEIGHT / 2 + 120, "40pt heavy_data", "DarkRed");
		}
		this.fillText(this.ctx, "Points Total:... " + this.totalPoints, this.WIDTH / 2, this.HEIGHT / 2 + 180, "32pt heavy_data", "yellow");
		this.fillText(this.ctx, "A Christopher Bennett Game", this.WIDTH / 2, this.HEIGHT / 2 - 300, "15pt heavy_data", "white");
	} // end if

	if (this.gameState == this.GAME_STATE.DEFEAT) {
		this.environment.fadeOut = false;
		ctx.save();
		ctx.fillStyle = "rgb(0,34,7)";
		ctx.fillRect(0, 0, 1024, 768);
		ctx.save();
		ctx.globalAlpha = this.iAlpha / 100;
		ctx.drawImage(this.digitalBackground, 0, 0);
		ctx.restore();
		ctx.save();
		ctx.globalAlpha = .6;
		ctx.fillStyle = "rgb(0,34,7)";
		ctx.fillRect(0, 0, 1024, 768);
		ctx.restore();
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.globalAlpha = .7;
		ctx.save();
		ctx.translate(this.WIDTH / 2 - 65, this.HEIGHT / 2 - 75);
		//ctx.scale(3,3);
		ctx.drawImage(this.redRibbon, 0, 0);
		ctx.restore();

		if (this.calculated != true) {

			this.totalScore = this.roundScore - this.roundScore2;
			this.totalPoints = this.roundScore + this.roundScore2;

			if (this.roundScore > this.hs18) {
				this.hs18 = this.roundScore;
			}
			if (this.roundScore2 > this.hs17) {
				this.hs17 = this.roundScore2;
			}
			if (this.totalPoints > this.hsTotal) {
				this.hsTotal = this.totalPoints;
			}

			this.destroyed += 1;

			this.recentPerfect = false;
			this.recentVictory = false;
			this.recentDomination = false;

			this.calculated = true;
		}

		if (this.saved != true) {
			document.querySelector("#gameButton").click();
			document.querySelector("#statSubmit").click();
			this.saved = true;
		}

		this.fillText(this.ctx, "System Failure", this.WIDTH / 2, this.HEIGHT / 2 - 120, "50pt heavy_data", "DarkRed");
		this.fillText(this.ctx, "Press Enter to reboot.......", this.WIDTH / 2, this.HEIGHT / 2 + 170, "20pt heavy_data", "#c9be03");
		this.fillText(this.ctx, "Press Enter to reboot.......", this.WIDTH / 2, this.HEIGHT / 2 + 170, "20pt heavy_data", "white");
		this.fillText(this.ctx, "Android 18 Points Detected:... " + this.roundScore, this.WIDTH / 2, this.HEIGHT / 2 + 30, "30pt heavy_data", "#c9be03");
		this.fillText(this.ctx, "Android 17 Points Detected:... " + this.roundScore2, this.WIDTH / 2, this.HEIGHT / 2 + 68, "30pt heavy_data", "#c9be03");
		this.fillText(this.ctx, "Points Total:... " + this.totalPoints, this.WIDTH / 2, this.HEIGHT / 2 + 120, "30pt heavy_data", "yellow");
		this.fillText(this.ctx, "A Christopher Bennett Game", this.WIDTH / 2, this.HEIGHT / 2 - 300, "15pt heavy_data", "white");
	} // end if
	ctx.restore();
}), _defineProperty(_app$main, 'pausedGame', function pausedGame() {
	this.paused = true;
	paused = true; //Site
	this.sound.playEffect(66);

	if (this.gameState == this.GAME_STATE.DEFAULT && this.scene == false && this.battle != 1) {
		this.sound.pauseBGAudioScene();
		//this.sound.playBGAudioScene(0);
	} else if (this.gameState == this.GAME_STATE.DEFAULT && this.scene == false && this.battle == 1) {
		this.sound.pauseBGAudio();
		//this.sound.playBGAudioScene(0);
	}

	if (this.scene == true) {
		this.sound.pauseBGAudioScene();
	}

	if (this.introState == true) {
		this.videos.pause();
	}
	if (this.endingState == true && this.specialScene == false) {
		this.videos.pauseE();
	}
	if (this.specialScene == true) {
		this.videos.pauseS();
	}
	if (this.titleScreen == true) {
		this.videos.pauseO();
	}
	if (this.scene == true) {
		this.sound.pauseBackground();
		this.sound.pauseBGAudioScene();
	}
	if (this.gameState == this.GAME_STATE.VICTORY && this.endingState == false) {
		this.sound.pauseBGAudioWin();
	}
	if (this.gameState == this.GAME_STATE.CREDITS) {
		this.sound.pauseBGAudioScene();
	}
	if (this.gameState == this.GAME_STATE.TUTORIAL) {
		this.sound.pauseBGAudioTutorial();
	}

	if (this.downsized == false) {
		this.sound.playBGAudioPause();
		this.sound.pauseBackground();
	} else if (this.downsized == true) {
		this.sound.pauseBGAudioPause();
		this.sound.pauseBackground();
	}

	// stop the animation loop
	cancelAnimationFrame(this.animationID);

	// call update() once so that our paused screen gets drawn
	this.update();
}), _defineProperty(_app$main, 'resumeGame', function resumeGame() {

	this.sound.pauseBGAudioPause();

	// stop the animation loop, just in case it's running
	cancelAnimationFrame(this.animationID);

	this.paused = false;

	paused = false; //Site

	this.sound.playEffect(67);

	if (this.introState == true) {
		this.videos.start();
	}
	if (this.endingState == true && this.specialScene == false) {
		this.videos.startE();
	}
	if (this.titleScreen == true) {
		this.videos.startO();
	}
	if (this.specialScene == true) {
		this.videos.startS();
	}

	if (this.gameState == this.GAME_STATE.DEFAULT && this.scene == false && this.battle != 1) {
		this.sound.resumeBGAudioScene();
		this.sound.resumeBackground();
		//this.sound.playBGAudioScene(0);
	} else if (this.gameState == this.GAME_STATE.DEFAULT && this.scene == false && this.battle == 1) {
		this.sound.playBGAudio();
		this.sound.resumeBackground();
		//this.sound.playBGAudioScene(0);
	}

	if (this.gameState == this.GAME_STATE.DEFAULT || this.gameState == this.GAME_STATE.TUTORIAL) {
		this.sound.pauseBGAudioPause();
	}

	if (this.scene == true && this.gameState != this.GAME_STATE.TUTORIAL) {
		this.sound.resumeBGAudioScene();
		this.sound.resumeBackground();
	}

	if (this.gameState == this.GAME_STATE.VICTORY && this.endingState == false && this.specialScene == false) {
		this.sound.playBGAudioWin();
	}

	if (this.gameState == this.GAME_STATE.CREDITS) {
		this.sound.resumeBGAudioScene();
	}

	if (this.gameState == this.GAME_STATE.TUTORIAL && this.introState == false) {
		this.sound.playBGAudioTutorial();
	}

	// restart the loop
	this.update();
}), _defineProperty(_app$main, 'stopBGAudio', function stopBGAudio() {
	this.sound.stopBGAudio();
}), _defineProperty(_app$main, 'playEffect', function playEffect() {
	this.effectAudio.src = "media/" + this.effectSounds[this.currentEffect];
	this.effectAudio.play();
}), _app$main); // end app.main
// sound.js
"use strict";
// if app exists use the existing copy
// else create a new object literal

var app = app || {};

// define the .sound module and immediately invoke it in an IIFE
app.sound = function () {
	//console.log("sound.js module loaded");
	var bgAudio = undefined;
	var bgAudioPause = undefined;
	var bgAudioWin = undefined;
	var bgAudioLoss = undefined;
	var bgAudioScene = undefined;
	var bgAudioTutorial = undefined;
	var effectAudio = [];
	var currentEffect = 0;
	var effectSounds = ["error.mp3", //0
	"fingerlaser.wav", //1
	"groundhit2.wav", //2
	"groundrecover.wav", //3
	"jump.wav", //4
	"kiblast.wav", //5
	"kiplosion.mp3", //6
	"machine_01.mp3", //7
	"meleemiss1.wav", //8
	"meleemiss2.wav", //9
	"meleemiss3.wav", //10
	"scouter.wav", //11
	"weakpunch.wav", //12
	"weakkick.wav", //13
	"mediumpunch.wav", //14
	"mediumkick.wav", //15
	"strongpunch.wav", //16
	"strongkick.wav", //17
	"meleestruggleinit.wav", //18
	"teleportStart.wav", //19
	"teleportEnd.wav", //20
	"swordkill.wav", //21
	"explosion1.wav", //22
	"basicbeam_charge1.wav", //23
	"basicbeam_fire1.wav", //24
	"bigbang_charge.mp3", //25
	"bigbang_fire2.wav", //26
	"fingerBeamCharge.wav", //27
	"energyCharge2.mp3", //28
	"kamehameha_fire.wav", //29
	"NewExplosion3.mp3", //30
	"buster_fire.wav", //31
	"disc_charge.wav", //32
	"disc_fire.wav", //33
	"disc_kill.wav", //34
	"solarflare.wav", //35
	"burning_fire.wav", //36
	"sbc_charge.wav", //37
	"sbc_fire.wav", //38
	"block1.wav", //39
	"NewExplosion.wav", //40
	"recoverjump.wav", //41
	"sparks.mp3", //42
	"struggle.wav", //43
	"sparks2.mp3", //44
	"sheathe.wav", //45
	"scouter.wav", //46
	"groundhit3.mp3", //47
	"sparks3.mp3", //48
	"meleestruggleinit.wav", //49
	"energyBurst1.wav", //50
	"fieldOn.wav", //51
	"errorShort.wav", //52
	"alertStam.wav", //53
	"powerShutDown.wav", //54
	"dropped.wav", //55
	"rain.wav", //56
	"revert.wav", //57
	"block1.wav", //58
	"block2.wav", //59
	"block3.wav", //60
	"swing1.wav", //61
	"swing2.wav", //62
	"swing3.wav", //63
	"QBlast3.wav", //64
	"beep1.wav", //65
	"beep2.wav", //66
	"beep3.wav", //67
	"beep4.wav", //68
	"explosionFar1.wav", //69
	"explosionFar2.wav", //70
	"explosionFar3.wav", //71
	"scanning.wav", //72
	"DataStream.mp3", //73
	"airrecover.wav"];
	var voiceSounds = [//Vegeta and Android 18
	"I1.wav", //0
	"I2.wav", //1
	"I3.wav", //2
	"I4.wav", //3
	"I5.wav", //4
	"I6.wav", //5
	"I7A.wav", //6
	"I7B.wav", //7
	"I8A.wav", //8
	"I8B.wav", //9
	"V1.wav", //10
	"V2.wav", //11
	"V3.wav", //12
	"V4.wav", //13
	"V5.wav", //14
	"V6.wav", //15
	"V7.wav", //16
	"E1.wav", //17
	"E2.wav", //18
	"E3.wav", //19
	"E4.wav", //20
	"E5.wav", //21
	"E6.wav", //22
	"E7.wav", //23
	"V8.wav", //24
	"V9.wav", //25
	"VAT1.wav", //26
	"VAT2.wav", //27
	"V10.wav", //28
	"V11.wav", //29
	"I9.wav", //30
	"I10.wav", //31
	"I11.wav", //32
	"VAT3.wav", //33
	"VAT4.wav", //34
	"VH1.wav", //35
	"VH2.wav", //36
	"VH3.wav", //37
	"EH1.wav", //38
	"EH2.wav", //39
	"EH3.wav", //40
	"EE1.wav", //41
	"EE2.wav", //42
	"VE1.wav", //43
	"VE2.wav", //44
	"ED1.wav", //45
	"ED2.wav", //46
	"VD1.wav", //47
	"VD2.wav", //48
	"GE1.wav", //49
	"GE2.wav", //50
	"VAT5.wav", //51
	"VAT6.wav", //52
	"VAT7.wav", //53
	"VAT8.wav", //54
	"EF1.wav", //55
	"EF2.wav", //56
	"EF3.wav", //57
	"GED1.wav", //58 //gero
	"EHI1.wav", //59
	"EHI2.wav", //60
	"EHI3.wav", //61
	"EAT1.wav", //62
	"EAT2.wav", //63
	"EAT3.wav", //64
	"EAT4.wav", //65
	"VHI1.wav", //66
	"VHI2.wav", //67
	"VHI3.wav", //68
	"GER1.wav", //69
	"GER2.wav", //70
	"GER3.wav"];

	var voiceSoundsPiccolo = [//Piccolo
	"P1.wav", //0
	"P2.wav", //1
	"P3.wav", //2
	"P4.wav", //3
	"P5.wav", //4
	"P6.wav", //5
	"P7.wav", //6
	"PAT1.wav", //7
	"PAT2.wav", //8
	"PAT3.wav", //9
	"P8.wav", //10
	"P9.wav", //11
	"PAT4.wav", //12
	"PH1.wav", //13
	"PH2.wav", //14
	"PH3.wav", //15
	"PE1.wav", //16
	"PE2.wav", //17
	"PD1.wav", //18
	"PD2.wav", //19
	"PHI1.wav", //20
	"PHI2.wav", //21
	"PHI3.wav"];

	var voiceSounds17 = [//Android 17
	"S1.wav", //0
	"S2.wav", //1
	"S3.wav", //2
	"S4.wav", //3
	"S5.mp3", //4
	"S6.mp3", //5
	"S7.mp3", //6
	"S8.wav", //7
	"S9.wav", //8
	"17H1.wav", //9
	"17H2.wav", //10
	"17H3.wav", //11
	"SHI1.wav", //12
	"SHI2.wav", //13
	"SHI3.wav", //14
	"SAT1.wav", //15
	"SAT2.wav", //16
	"SAT3.wav", //17
	"SAT4.wav", //18
	"SAF1.wav", //19
	"SAF2.wav", //20
	"SAF3.wav", //21
	"SI1.wav", //22
	"SI2.wav"];

	var voiceSoundsGohan = [//Gohan
	"G1.wav", //0
	"G2.wav", //1
	"G3.wav", //2
	"G4.wav", //3
	"G5.wav", //4
	"G6.wav", //5
	"G7.wav", //6
	"G8.wav", //7
	"G9.wav", //8
	"GAT1.wav", //9
	"GAT2.wav", //10
	"GAT3.wav", //11
	"GAT4.wav", //12
	"GH1.wav", //13
	"GH2.wav", //14
	"GH3.wav", //15
	"GS1.wav", //16
	"GS2.wav", //17
	"GS3.wav", //18
	"GS4.wav", //19
	"GS5.wav", //20
	"GS6.wav", //21
	"GS7.wav", //22
	"GAT5.wav", //23
	"GAT6.wav", //24
	"KH3.wav", //25
	"KH4.wav", //26
	"GSH1.wav", //27
	"GSH2.wav", //28
	"GSH3.wav", //29
	"GHE1.wav", //30
	"GHE2.wav", //31
	"GSE1.wav", //32
	"GSE2.wav", //33
	"GD1.wav", //34
	"GD2.wav", //35
	"GD3.wav", //36
	"GT1.wav", //37
	"GT2.wav", //38
	"GT3.wav", //39
	"GHI1.wav", //40
	"GHI2.wav", //41
	"GHI3.wav"];

	var voiceSoundsTien = [//Tien
	"TAT1.wav", //0
	"TAT2.wav", //1
	"TAT3.wav", //2
	"TAT5.wav", //3
	"T1.wav", //4
	"T2.wav", //5
	"T3.wav", //6
	"TE1.wav", //7
	"TE2.wav", //8
	"TS10.wav", //9
	"TS10B.wav", //10
	"TAT4.wav"];

	var voiceSoundsKrillin = [//Krillin
	"KAT1.wav", //0
	"KAT2.wav", //1
	"KAT3.wav", //2
	"KAT4.wav", //3
	"KAT5.wav", //4
	"KAT6.wav", //5
	"KAT7.wav", //6
	"KAT8.wav", //7
	"K1.wav", //8
	"K2.wav", //9
	"K3.wav", //10
	"KH1.wav", //11
	"KH2.wav", //12
	"KE1.wav", //13
	"KE2.wav"];

	var voiceSoundsOthers = [//Other characters
	"YAJ1.wav", //0
	"YAJ2.wav", //1
	"YAJ3.wav"];

	var backgroundSounds = [//Background Sounds
	"rain.wav"];

	var voiceSoundsScenes = [//Scenes
	"17Laugh.mp3", //0
	"18Laugh.wav", //1
	"BS1.wav", //2
	"BS2.wav", //3
	"PS1.wav", //4
	"PS2.wav", //5
	"PS3.wav", //6
	"PS4.wav", //7
	"PS5.mp3", //8
	"PS6.wav", //9
	"PS7.wav", //10
	"PS8.wav", //11
	"PS8.wav", //12
	"TS1.wav", //13
	"TS2.wav", //14
	"TS3.wav", //15
	"TS4.wav", //16
	"TS5.wav", //17
	"TS6.wav", //18
	"TS7.wav", //19
	"TS8.wav", //20
	"TS9.wav", //21
	"TS10.wav", //22 //Tien What
	"TS11.wav", //23
	"TS12.wav", //24
	"TS13.wav", //25
	"TS14.wav", //26
	"TS15.wav", //27
	"TS16.wav", //28
	"TS17.wav", //29
	"TS18.wav", //30
	"TS19.wav", //31
	"TS20.wav", //32
	"TS21.wav", //33
	"TT1.mp3", //34
	"TT2.wav", //35
	"TT3.wav", //36
	"TT4.wav", //37
	"SF1.wav", //38 //start
	"SF2.wav", //39
	"SF3.wav", //40
	"SF4.mp3", //41
	"SF5.wav", //42
	"SF6.wav", //43
	"SF7.wav", //44
	"SF8A.wav", //45
	"SF8B.wav", //46
	"SF9.wav", //47
	"SF10.wav", //48
	"SF11A.wav", //49
	"SF11B.wav", //50
	"SF12.wav", //51
	"SF13A.wav", //52
	"SF13B.wav", //53
	"TF1.wav", //54 //start
	"TF2.wav", //55
	"TF3.wav", //56
	"TF4.wav", //57
	"TF5.wav", //58
	"TF6.wav", //59
	"TF7.wav", //60
	"TF8.wav", //61
	"TF9.wav", //62
	"TF10.wav", //63
	"TF11.wav", //64
	"TF12.wav", //65
	"TFA.wav", //66
	"TFB.wav", //67
	"TFC.wav", //68
	"TFD.wav", //69
	"EN1.wav", //70 //start
	"EN2.wav", //71
	"EN3.wav", //72
	"EN4.wav", //73
	"EN5.wav", //74
	"EN6.wav", //75
	"EN7.wav", //76
	"EN8.wav", //77
	"EN9.wav", //78
	"EN10.wav", //79
	"17win1.wav", //80
	"17win2.wav", //81
	"18win1.wav", //82
	"18win2.wav", //83
	"EX1.wav", //84
	"EX2.wav", //85
	"EX3.wav", //86
	"EX4.wav", //87
	"TFE.wav" //88
	];

	var sceneSongs = [//Music
	"SceneSongP.wav", //0
	"PiccoloFight.mp3", //1
	"Devastation.wav", //2
	"Vegeta_theme.mp3", //3
	"Credits.mp3", //4
	"YamchaSong.mp3", //5
	"FaceOff.mp3", //6
	"BeforeBrawl.mp3", //7
	"Dragon.mp3", //8
	"Finale.mp3", //9
	"End.mp3", //10
	"preludeEnd2.mp3", //11
	"TEnd.mp3", //12
	"Ascend.mp3", //13
	"TrueFinal.mp3", //14
	"Finale2.mp3"];

	//INITALIZE ALL SOUND CHANNELS
	function init() {
		bgAudio = document.querySelector("#bgAudio");
		bgAudio.volume = 0.20;
		bgAudioTutorial = document.querySelector("#bgAudioTutorial");
		bgAudioTutorial.volume = 0.20;
		bgAudioWin = document.querySelector("#bgAudio2");
		bgAudioWin.volume = 0.30;
		bgAudioLoss = document.querySelector("#bgAudio3");
		bgAudioLoss.volume = 0.30;
		bgAudioScene = document.querySelector("#bgAudio4");
		bgAudioScene.volume = 0.30;
		bgAudioPause = document.querySelector("#bgAudio5");
		bgAudioPause.volume = 0.30;
		effectAudio[0] = document.querySelector("#effectAudio0");
		effectAudio[0].volume = 0.3;
		effectAudio[1] = document.querySelector("#effectAudio1");
		effectAudio[1].volume = 0.3;
		effectAudio[2] = document.querySelector("#effectAudio2");
		effectAudio[2].volume = 0.2;
		effectAudio[3] = document.querySelector("#effectAudio3");
		effectAudio[3].volume = 0.2;
		effectAudio[4] = document.querySelector("#effectAudio4");
		effectAudio[4].volume = 0.2;
		effectAudio[5] = document.querySelector("#effectAudio5");
		effectAudio[5].volume = 0.2;
		effectAudio[6] = document.querySelector("#effectAudio6");
		effectAudio[6].volume = 0.2;
		effectAudio[7] = document.querySelector("#effectAudio7");
		effectAudio[7].volume = 0.2;
		effectAudio[8] = document.querySelector("#effectAudio8");
		effectAudio[8].volume = 0.2;
		effectAudio[9] = document.querySelector("#effectAudio9");
		effectAudio[9].volume = 0.2;
		effectAudio[10] = document.querySelector("#effectAudio10");
		effectAudio[10].volume = 0.2;
		effectAudio[11] = document.querySelector("#effectAudio11");
		effectAudio[11].volume = 0.2;
		effectAudio[12] = document.querySelector("#effectAudio12");
		effectAudio[12].volume = 0.7;
		effectAudio[13] = document.querySelector("#effectAudio13");
		effectAudio[13].volume = 0.7;
		effectAudio[14] = document.querySelector("#effectAudio14");
		effectAudio[14].volume = 0.7;
		effectAudio[15] = document.querySelector("#effectAudio15");
		effectAudio[15].volume = 0.7;
		effectAudio[16] = document.querySelector("#effectAudio16");
		effectAudio[16].volume = 0.7;
		effectAudio[17] = document.querySelector("#effectAudio17");
		effectAudio[17].volume = 0.7;
		effectAudio[18] = document.querySelector("#effectAudio18");
		effectAudio[18].volume = 0.7;
		effectAudio[19] = document.querySelector("#effectAudio19");
		effectAudio[19].volume = 0.7;
		effectAudio[20] = document.querySelector("#effectAudio20");
		effectAudio[20].volume = 0.7;
		effectAudio[21] = document.querySelector("#effectAudio21");
		effectAudio[21].volume = 0.7;
		effectAudio[22] = document.querySelector("#effectAudio22");
		effectAudio[22].volume = 0.7;
		effectAudio[23] = document.querySelector("#effectAudio23");
		effectAudio[23].volume = 0.8;
	}

	// A LONG LIST OF MANY CONTROL FUNCTIONS FOR EACH SOUND CHANNEL (PLAY, PAUSE, STOP, REWIND)


	function playIntro(num) {
		effectAudio[0].pause();
		effectAudio[0].currentTime = 0;
		effectAudio[0].src = "media/" + effectSounds[num];
		effectAudio[0].play();
	}

	function playEffect(num) {
		effectAudio[1].pause();
		effectAudio[1].currentTime = 0;
		effectAudio[1].src = "media/" + effectSounds[num];
		effectAudio[1].play();
	}

	function playEffectLoud(num) {
		effectAudio[1].pause();
		effectAudio[1].currentTime = 0;
		effectAudio[1].volume = 0.4;
		effectAudio[1].src = "media/" + effectSounds[num];
		effectAudio[1].play();
	}

	function playBackground(num) {
		effectAudio[23].pause();
		effectAudio[23].src = "media/" + backgroundSounds[num];
		effectAudio[23].play();
	}

	function stopEffect() {
		effectAudio[1].pause();
		effectAudio[1].currentTime = 0;
	}

	function pauseBackground() {
		effectAudio[23].pause();
	}

	function stopBackground() {
		effectAudio[23].pause();
		effectAudio[23].currentTime = 0;
	}

	function playBasicAttack(num) {
		effectAudio[2].pause();
		effectAudio[2].currentTime = 0;
		effectAudio[2].src = "media/" + effectSounds[num];
		effectAudio[2].play();
	}

	function playBasicAttack2(num) {
		effectAudio[3].pause();
		effectAudio[3].currentTime = 0;
		effectAudio[3].src = "media/" + effectSounds[num];
		effectAudio[3].play();
	}

	function playEnergyAttack(num) {
		effectAudio[4].pause();
		effectAudio[4].currentTime = 0;
		effectAudio[4].src = "media/" + effectSounds[num];
		effectAudio[4].play();
	}

	function playEnergyAttack2(num) {
		effectAudio[5].pause();
		effectAudio[5].currentTime = 0;
		effectAudio[5].src = "media/" + effectSounds[num];
		effectAudio[5].play();
	}

	function playEnergyReaction(num) {
		effectAudio[6].pause();
		effectAudio[6].currentTime = 0;
		effectAudio[6].src = "media/" + effectSounds[num];
		effectAudio[6].play();
	}

	function playEnergyReaction2(num) {
		effectAudio[7].pause();
		effectAudio[7].currentTime = 0;
		effectAudio[7].src = "media/" + effectSounds[num];
		effectAudio[7].play();
	}

	function playBasicReaction(num) {
		effectAudio[8].pause();
		effectAudio[8].currentTime = 0;
		effectAudio[8].src = "media/" + effectSounds[num];
		effectAudio[8].play();
	}

	function playBasicReaction2(num) {
		effectAudio[9].pause();
		effectAudio[9].currentTime = 0;
		effectAudio[9].src = "media/" + effectSounds[num];
		effectAudio[9].play();
	}

	function playSpecialReaction(num) {
		effectAudio[10].pause();
		effectAudio[10].currentTime = 0;
		effectAudio[10].src = "media/" + effectSounds[num];
		effectAudio[10].play();
	}

	function playSpecialReaction2(num) {
		effectAudio[11].pause();
		effectAudio[11].currentTime = 0;
		effectAudio[11].src = "media/" + effectSounds[num];
		effectAudio[11].play();
	}

	function playTaunt1(num) {
		effectAudio[12].pause();
		effectAudio[12].currentTime = 0;
		effectAudio[12].src = "media/" + voiceSounds[num];
		effectAudio[12].play();
	}

	function playTaunt2(num) {
		effectAudio[13].pause();
		effectAudio[13].currentTime = 0;
		effectAudio[13].src = "media/" + voiceSounds[num];
		effectAudio[13].play();
	}

	function playTaunt3(num) {
		effectAudio[14].pause();
		effectAudio[14].currentTime = 0;
		effectAudio[14].src = "media/" + voiceSounds[num];
		effectAudio[14].play();
	}

	function playTaunt4(num) {
		effectAudio[15].pause();
		effectAudio[15].currentTime = 0;
		effectAudio[15].src = "media/" + voiceSoundsPiccolo[num];
		effectAudio[15].play();
	}

	function playTaunt5(num) {
		effectAudio[16].pause();
		effectAudio[16].currentTime = 0;
		effectAudio[16].src = "media/" + voiceSounds17[num];
		effectAudio[16].play();
	}

	function playTaunt6(num) {
		effectAudio[17].pause();
		effectAudio[17].currentTime = 0;
		effectAudio[17].src = "media/" + voiceSoundsGohan[num];
		effectAudio[17].play();
	}

	function playVoice1(num) {
		effectAudio[18].pause();
		effectAudio[18].currentTime = 0;
		effectAudio[18].src = "media/" + voiceSoundsScenes[num];
		effectAudio[18].play();
	}

	function playVoice2(num) {
		effectAudio[19].pause();
		effectAudio[19].currentTime = 0;
		effectAudio[19].src = "media/" + voiceSoundsScenes[num];
		effectAudio[19].play();
	}

	function playTaunt7(num) {
		effectAudio[20].pause();
		effectAudio[20].currentTime = 0;
		effectAudio[20].src = "media/" + voiceSoundsTien[num];
		effectAudio[20].play();
	}

	function playTaunt8(num) {
		effectAudio[21].pause();
		effectAudio[21].currentTime = 0;
		effectAudio[21].src = "media/" + voiceSoundsKrillin[num];
		effectAudio[21].play();
	}

	function playTaunt9(num) {
		effectAudio[22].pause();
		effectAudio[22].currentTime = 0;
		effectAudio[22].src = "media/" + voiceSoundsOthers[num];
		effectAudio[22].play();
	}

	function playBGAudio() {
		bgAudio.play();
	}

	function playBGAudioTutorial() {
		bgAudioTutorial.play();
	}

	function playBGAudioWin() {
		bgAudioWin.play();
	}

	function playBGAudioPause() {
		bgAudioPause.play();
	}

	function playBGAudioLoss() {
		bgAudioLoss.play();
	}

	function playBGAudioScene(num) {
		bgAudioScene.pause();
		//bgAudioScene.currentTime = 0;
		bgAudioScene.src = "media/" + sceneSongs[num];
		bgAudioScene.play();
	}

	function resumeBGAudioScene() {
		//bgAudioScene.src = "media/" + sceneSongs[0];
		bgAudioScene.play();
	}

	function resumeBackground() {
		effectAudio[23].play();
	}

	function stopBGAudio() {
		bgAudio.pause();
		bgAudio.currentTime = 0;
	}

	function stopBGAudioTutorial() {
		bgAudioTutorial.pause();
		bgAudioTutorial.currentTime = 0;
	}

	function stopBGAudioWin() {
		bgAudioWin.pause();
		bgAudioWin.currentTime = 0;
	}

	function stopBGAudioPause() {
		bgAudioPause.pause();
		bgAudioPause.currentTime = 0;
	}

	function stopBGAudioLoss() {
		bgAudioLoss.pause();
		bgAudioLoss.currentTime = 0;
	}

	function stopBGAudioScene() {
		bgAudioScene.pause();
		bgAudioScene.currentTime = 0;
	}

	function pauseBGAudio() {
		bgAudio.pause();
	}

	function pauseBGAudioPause() {
		bgAudioPause.pause();
	}

	function pauseBGAudioTutorial() {
		bgAudioTutorial.pause();
	}

	function pauseBGAudioWin() {
		bgAudioWin.pause();
	}

	function pauseBGAudioLoss() {
		bgAudioLoss.pause();
	}

	function pauseBGAudioScene() {
		bgAudioScene.pause();
	}

	function pauseVoice() {
		effectAudio[12].pause();
		effectAudio[12].currentTime = 0;
		effectAudio[13].pause();
		effectAudio[13].currentTime = 0;
		effectAudio[14].pause();
		effectAudio[14].currentTime = 0;
		effectAudio[15].pause();
		effectAudio[15].currentTime = 0;
		effectAudio[16].pause();
		effectAudio[16].currentTime = 0;
		effectAudio[17].pause();
		effectAudio[17].currentTime = 0;
		effectAudio[20].pause();
		effectAudio[20].currentTime = 0;
		effectAudio[21].pause();
		effectAudio[21].currentTime = 0;
	}
	function pauseVoice1() {
		effectAudio[12].pause();
		effectAudio[12].currentTime = 0;
	}

	function pauseVoice2() {
		effectAudio[13].pause();
		effectAudio[13].currentTime = 0;
	}

	function pauseVoice3() {
		effectAudio[14].pause();
		effectAudio[14].currentTime = 0;
	}

	function pauseVoice4() {
		effectAudio[15].pause();
		effectAudio[15].currentTime = 0;
	}

	function pauseVoice5() {
		effectAudio[16].pause();
		effectAudio[16].currentTime = 0;
	}

	function pauseVoice6() {
		effectAudio[17].pause();
		effectAudio[17].currentTime = 0;
	}

	function pauseVoice7() {
		effectAudio[20].pause();
		effectAudio[20].currentTime = 0;
	}

	function pauseVoice8() {
		effectAudio[21].pause();
		effectAudio[21].currentTime = 0;
	}

	// export a public interface to this module
	return {
		init: init,
		stopBGAudio: stopBGAudio,
		playIntro: playIntro,
		playEffect: playEffect,
		playEffectLoud: playEffectLoud,
		stopEffect: stopEffect,
		playBasicAttack: playBasicAttack,
		playBasicAttack2: playBasicAttack2,
		playEnergyAttack: playEnergyAttack,
		playEnergyAttack2: playEnergyAttack2,
		playEnergyReaction: playEnergyReaction,
		playEnergyReaction2: playEnergyReaction2,
		playBasicReaction: playBasicReaction,
		playBasicReaction2: playBasicReaction2,
		playSpecialReaction: playSpecialReaction,
		playSpecialReaction2: playSpecialReaction2,
		playBackground: playBackground,
		resumeBackground: resumeBackground,
		pauseBackground: pauseBackground,
		stopBackground: stopBackground,
		playTaunt1: playTaunt1,
		playTaunt2: playTaunt2,
		playTaunt3: playTaunt3,
		playTaunt4: playTaunt4,
		playTaunt5: playTaunt5,
		playTaunt6: playTaunt6,
		playTaunt7: playTaunt7,
		playTaunt8: playTaunt8,
		playTaunt9: playTaunt9,
		pauseVoice1: pauseVoice1,
		pauseVoice2: pauseVoice2,
		pauseVoice3: pauseVoice3,
		pauseVoice4: pauseVoice4,
		pauseVoice5: pauseVoice5,
		pauseVoice6: pauseVoice6,
		pauseVoice7: pauseVoice7,
		pauseVoice8: pauseVoice8,
		pauseVoice: pauseVoice,
		playVoice1: playVoice1,
		playVoice2: playVoice2,
		playBGAudio: playBGAudio,
		pauseBGAudio: pauseBGAudio,
		playBGAudioTutorial: playBGAudioTutorial,
		pauseBGAudioTutorial: pauseBGAudioTutorial,
		stopBGAudioTutorial: stopBGAudioTutorial,
		playBGAudioWin: playBGAudioWin,
		playBGAudioPause: playBGAudioPause,
		playBGAudioLoss: playBGAudioLoss,
		playBGAudioScene: playBGAudioScene,
		resumeBGAudioScene: resumeBGAudioScene,
		stopBGAudioWin: stopBGAudioWin,
		stopBGAudioPause: stopBGAudioPause,
		stopBGAudioLoss: stopBGAudioLoss,
		stopBGAudioScene: stopBGAudioScene,
		pauseBGAudioPause: pauseBGAudioPause,
		pauseBGAudioWin: pauseBGAudioWin,
		pauseBGAudioLoss: pauseBGAudioLoss,
		pauseBGAudioScene: pauseBGAudioScene
	};
}();
// All of these functions are in the global scope

"use strict";

function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}

function simplePreload(imageArray) {
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
		imageObjects[i].onload = function () {
			numLoadedImages++;
			//console.log("loaded image at '" + this.src + "'")
			if (numLoadedImages >= numImages) {
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
function clamp(val, min, max) {
	return Math.max(min, Math.min(max, val));
}

// FULL SCREEN MODE
function requestFullscreen(element) {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.mozRequestFullscreen) {
		element.mozRequestFullscreen();
	} else if (element.mozRequestFullScreen) {
		// camel-cased 'S' was changed to 's' in spec
		element.mozRequestFullScreen();
	} else if (element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	}
	// .. and do nothing if the method is not supported
};

//STANDARD HIT CHECK
function hitTest(obj1, obj2) {
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
	if (obj1.position.x < obj2.position.x + obj2.size.x && obj1.position.x + obj1.size.x > obj2.position.x && obj1.position.y < obj2.position.y + obj2.size.y && obj1.size.y + obj1.position.y > obj2.position.y) {
		return true;
	}
}

//ATTACK RANGE HIT CHECK
function attackHitTest(obj1, obj2) {
	/* app.main.ctx.save();
 app.main.ctx.translate(obj1.attackPosition.x,obj1.attackPosition.y);
 app.main.ctx.fillStyle = "green";
 app.main.ctx.fillRect(0,0,obj1.attackSize.x, obj1.attackSize.y);
 app.main.ctx.restore();  */
	if (obj1.attackPosition.x < obj2.position.x + obj2.size.x && obj1.attackPosition.x + obj1.attackSize.x > obj2.position.x && obj1.attackPosition.y < obj2.position.y + obj2.size.y && obj1.attackSize.y + obj1.attackPosition.y > obj2.position.y) {
		return true;
	}
}

//LONGER ATTACK RANGE HIT CHECK
function hardAttackHitTest(obj1, obj2) {
	/* app.main.ctx.save();
 app.main.ctx.translate(obj1.hardAttackPosition.x,obj1.hardAttackPosition.y);
 app.main.ctx.fillStyle = "blue";
 app.main.ctx.fillRect(0,0,obj1.attackSize.x, obj1.attackSize.y);
 app.main.ctx.restore(); */
	if (obj1.attackPosition.x < obj2.position.x + obj2.size.x && obj1.attackPosition.x + obj1.attackSize.x > obj2.position.x && obj1.attackPosition.y < obj2.position.y + obj2.size.y && obj1.attackSize.y + obj1.attackPosition.y > obj2.position.y) {
		return true;
	} else if (obj1.hardAttackPosition.x < obj2.position.x + obj2.size.x && obj1.hardAttackPosition.x + obj1.attackSize.x > obj2.position.x && obj1.hardAttackPosition.y < obj2.position.y + obj2.size.y && obj1.attackSize.y + obj1.hardAttackPosition.y > obj2.position.y) {
		return true;
	}
}

//BLAST ATTACK HIT CHECK
function attackHitTestBlast(obj1, obj2) {
	/* app.main.ctx.save();
 app.main.ctx.translate(obj1.attackPosition.x,obj1.attackPosition.y);
 app.main.ctx.fillStyle = "Red";
 app.main.ctx.fillRect(0,0,obj1.attackSize.x, obj1.attackSize.y);
 app.main.ctx.restore();   */
	if (obj1.attackPosition.x < obj2.position.x + obj2.size.x && obj1.attackPosition.x + obj1.attackSize.x > obj2.position.x && obj1.attackPosition.y < obj2.position.y + obj2.size.y && obj1.attackSize.y + obj1.attackPosition.y > obj2.position.y) {
		return true;
	}
}

//BLAST ATTACK HIT CHECK
function blastHitTestBlast(obj1, obj2) {
	/* app.main.ctx.save();
 app.main.ctx.translate(obj1.attackPosition.x,obj1.attackPosition.y);
 app.main.ctx.fillStyle = "Red";
 app.main.ctx.fillRect(0,0,obj1.attackSize.x, obj1.attackSize.y);
 app.main.ctx.restore(); */
	if (obj1.attackPosition.x < obj2.attackPosition.x + obj2.attackSize.x && obj1.attackPosition.x + obj1.attackSize.x > obj2.attackPosition.x && obj1.attackPosition.y < obj2.attackPosition.y + obj2.attackSize.y && obj1.attackSize.y + obj1.attackPosition.y > obj2.attackPosition.y) {
		return true;
	}
}

//BLAST ATTACK SMOG EFFECT
function attackHitTestSmog(attackPosition, attackSize) {
	/* app.main.ctx.save();
 app.main.ctx.translate(obj1.attackPosition.x,obj1.attackPosition.y);
 app.main.ctx.fillStyle = "Red";
 app.main.ctx.fillRect(0,0,obj1.attackSize.x, obj1.attackSize.y);
 app.main.ctx.restore();   */
	for (var i = 0; i < app.main.environment.smogCount; i++) {
		if (attackPosition.x + 35 < app.main.environment.smogPos[i].x + app.main.environment.smogSize[i].x && attackPosition.x + 35 + attackSize.x - 70 > app.main.environment.smogPos[i].x && attackPosition.y + 35 < app.main.environment.smogPos[i].y + app.main.environment.smogSize[i].y && attackSize.y - 70 + attackPosition.y + 35 > app.main.environment.smogPos[i].y) {
			app.main.environment.smogTarget = i;
			return true;
		}
	}
}

"use strict";

var app = app || {};

app.Vegeta = function () {

	function Vegeta(start, type, opponent) {

		//Core Stats
		this.health = 100;
		this.endurance = 100;
		this.energy = 100;
		this.stamina = 28;

		//Special Stats
		this.specialHealth = 10;

		this.specialDamage = false;
		this.spSaying = false;

		//STATE VARIABLES dodge
		this.vegeta = false;

		this.gero = false;
		this.piccolo = false;
		this.gohan = false;
		this.tien = false;
		this.krillin = false;
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
		this.charging = false;
		this.basic = false;
		this.hard = false;
		this.hover = false;
		this.blocking = false;
		this.blasting = false;
		this.powerMove = false;
		this.blastRelease = false;
		this.blastTrigger = false;
		this.blasted = false;
		this.exhausted = false;
		this.blastBurn = false;
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
		this.superForm = false;
		this.superSpeed = false;
		this.superSpeedExhaustion = false;
		this.vanish = true; //change back
		this.byBuilding = false;
		this.aboveBuilding = false;
		this.aboveSky = false;
		this.appear = false;
		this.stun = true; //change back
		this.end = false;
		this.dead = false;
		this.trueDead = false;
		this.unable = false;
		this.test = false;
		this.tutor = false;
		this.unstoppable = false;

		this.unstopTimer = 0;

		this.voiceStop = false;
		this.voiceChance = 0;

		this.sparkCounter = 0;

		this.lookUp = false;
		this.lookDown = false;

		this.teleUp = false;
		this.teleDown = false;
		this.teleFace = false;

		this.specMove = false;
		this.specChance = 0;
		this.specTimer = 0;

		this.effortTimer = 0;
		this.lastEffort = false;

		this.hits17 = false;
		this.hits18 = false;

		this.turnsUp = false;
		this.turnsDown = false;
		this.turnTalk = false;
		this.justTurned = false;

		this.cinematic = false;
		this.cine = 0;

		this.almostSS = false;
		this.almostCounter = 0;
		this.almostFade = 100;
		this.lockSS = false;

		this.sceneOpen = true;
		this.scenePlay = false;

		this.focus17 = false;

		this.deadCount = false;

		//Extras
		this.flyDust = false;
		this.landDust = false;
		this.fallDust = false;
		this.prevX = null;
		this.lastKnown = new Victor(0, 0);
		this.flySoundDelay = 0;

		//AI
		this.aggressive = true;
		this.defensive = false;
		this.dodge = false;
		this.defBreak = 0;
		this.aiCounter = 0;
		this.blastCount = 0;
		this.prepBlast = true;
		this.triggerBlast = false;
		this.striking = false;
		this.energyUse = 0;

		//Timers
		this.counter = 0;
		this.stunCounter = 0;
		this.speedCounter = 0;
		this.hoverCounter = 0;
		this.chargeCounter = 0;
		this.sceneCounter = 0;
		this.exhaustedCounter = 0;
		this.blastBurnCounter = 0;
		this.speedExhaust = 0;
		this.randomEffect = 0;
		this.extraCounter = 0;
		this.smoothTimer = 0;
		this.tauntPick = getRandom(10, 16);

		this.auraTimer = 0;
		this.auraTrigger = false;

		this.exhaustTalk = false;
		this.deathTalk = false;

		//Value holders
		this.blastBurnLength = 20;

		// CONSTANTS
		this.BUILDING = new Victor(650, 270);
		this.GROUND = new Victor(0, 620);
		this.SKY = new Victor(0, 220);
		this.SKYTOP = new Victor(0, 5);
		this.MAX_STAMINA = 100;

		//VECTORS (Victors)
		this.attackSize = new Victor(30, 60);
		this.position = new Victor(start, this.GROUND.y);
		this.attackPosition = new Victor(0, 0);
		this.hardAttackPosition = new Victor(0, 0);
		this.velocity = new Victor(0, 0);
		this.direction = new Victor(1, 0);
		this.accel = new Victor(2, 0);
		this.decel = new Victor(0, 0);
		this.jumpVelocity = new Victor(0, -15);
		this.jumpAccel = new Victor(0, -1);
		this.gravity = new Victor(0, 1.7);

		if (type == 0) {
			this.vegeta = true;
		} else if (type == 1) {
			this.energy = 40;
			this.gero = true;
		} else if (type == 2) {
			this.piccolo = true;
		} else if (type == 3) {
			this.gohan = true;
		} else if (type == 4) {
			this.tien = true;
			this.endurance = 0;
			this.energy = 1000;
		} else if (type == 5) {
			this.krillin = true;
			this.endurance = 0;
			this.energy = 1000;
			this.GROUND = new Victor(0, 640);
		}

		if (this.vegeta == true) {
			this.size = new Victor(50, 100);
			this.LEFTWALL = new Victor(0, 0);
			this.RIGHTWALL = new Victor(950, 0);
		} else if (this.piccolo == true) {
			this.size = new Victor(60, 100);
			this.LEFTWALL = new Victor(25, 0);
			this.RIGHTWALL = new Victor(925, 0);
		} else if (this.gohan == true) {
			this.size = new Victor(50, 100);
			this.LEFTWALL = new Victor(0, 0);
			this.RIGHTWALL = new Victor(950, 0);
		} else if (this.gero == true) {
			this.size = new Victor(50, 100);
			this.LEFTWALL = new Victor(0, 0);
			this.RIGHTWALL = new Victor(950, 0);
		} else if (this.tien == true) {
			this.size = new Victor(50, 100);
			this.LEFTWALL = new Victor(0, 0);
			this.RIGHTWALL = new Victor(950, 0);
		} else if (this.krillin == true) {
			this.size = new Victor(50, 80);
			this.LEFTWALL = new Victor(0, 0);
			this.RIGHTWALL = new Victor(950, 0);
		}

		// IMAGE SETUP 

		// ---- VEGETA IMAGES ------------------
		if (this.vegeta == true) {
			var image = new Image();
			image.src = app.imagesVegeta.stance;
			this.stance = image;

			image = new Image();
			image.src = app.imagesVegeta.stanceUp;
			this.stanceUp = image;

			image = new Image();
			image.src = app.imagesVegeta.stanceDown;
			this.stanceDown = image;

			image = new Image();
			image.src = app.imagesVegeta.slowFly;
			this.slowFly = image;

			image = new Image();
			image.src = app.imagesVegeta.fastFly;
			this.fastFly = image;

			image = new Image();
			image.src = app.imagesVegeta.flyUp;
			this.flyUp = image;

			image = new Image();
			image.src = app.imagesVegeta.flyUpUp;
			this.flyUpUp = image;

			image = new Image();
			image.src = app.imagesVegeta.flyUpDown;
			this.flyUpDown = image;

			image = new Image();
			image.src = app.imagesVegeta.flyDownSlow;
			this.flyDownSlow = image;

			image = new Image();
			image.src = app.imagesVegeta.flyDownFast;
			this.flyDownFast = image;

			image = new Image();
			image.src = app.imagesVegeta.reverse;
			this.moveReverse = image;

			image = new Image();
			image.src = app.imagesVegeta.punch;
			this.punch = image;

			image = new Image();
			image.src = app.imagesVegeta.knee;
			this.knee = image;

			image = new Image();
			image.src = app.imagesVegeta.punchPrep;
			this.punchPrep = image;

			image = new Image();
			image.src = app.imagesVegeta.hit1;
			this.hit1 = image;

			image = new Image();
			image.src = app.imagesVegeta.attackE;
			this.attackE = image;

			image = new Image();
			image.src = app.imagesVegeta.hardKick;
			this.hardKick = image;

			image = new Image();
			image.src = app.imagesVegeta.ground;
			this.groundVegeta = image;

			image = new Image();
			image.src = app.imagesVegeta.fallSide;
			this.fallSide = image;

			image = new Image();
			image.src = app.imagesVegeta.hardKickPrep;
			this.hardKickPrep = image;

			image = new Image();
			image.src = app.imagesVegeta.hardKickSwing;
			this.hardKickSwing = image;

			image = new Image();
			image.src = app.imagesVegeta.hardPunch;
			this.hardPunch = image;

			image = new Image();
			image.src = app.imagesVegeta.hardPunchAir;
			this.hardPunchAir = image;

			image = new Image();
			image.src = app.imagesVegeta.hardPunchAirPrep;
			this.hardPunchAirPrep = image;

			image = new Image();
			image.src = app.imagesVegeta.hardPunchAirSwing;
			this.hardPunchAirSwing = image;

			image = new Image();
			image.src = app.imagesVegeta.hardPunchPrep;
			this.hardPunchPrep = image;

			image = new Image();
			image.src = app.imagesVegeta.hitHard;
			this.hitHard = image;

			image = new Image();
			image.src = app.imagesVegeta.injured;
			this.injured = image;

			image = new Image();
			image.src = app.imagesVegeta.kick;
			this.kick = image;

			image = new Image();
			image.src = app.imagesVegeta.kickPrep;
			this.kickPrep = image;

			image = new Image();
			image.src = app.imagesVegeta.leftBlast;
			this.leftBlast = image;

			image = new Image();
			image.src = app.imagesVegeta.rightBlast;
			this.rightBlast = image;

			image = new Image();
			image.src = app.imagesVegeta.block;
			this.block = image;

			image = new Image();
			image.src = app.imagesVegeta.fallKick;
			this.fallKick = image;

			image = new Image();
			image.src = app.imagesVegeta.fallDown;
			this.fallDown = image;

			image = new Image();
			image.src = app.imagesVegeta.launchPrep;
			this.launchPrep = image;

			image = new Image();
			image.src = app.imagesVegeta.launchSwing;
			this.launchSwing = image;

			image = new Image();
			image.src = app.imagesVegeta.launch;
			this.launch = image;

			image = new Image();
			image.src = app.imagesVegeta.taunt;
			this.taunt = image;

			image = new Image();
			image.src = app.imagesVegeta.charge;
			this.charge = image;

			image = new Image();
			image.src = app.imagesVegeta.pose1;
			this.pose1Vegeta = image;

			image = new Image();
			image.src = app.imagesVegeta.pose2;
			this.pose2Vegeta = image;

			image = new Image();
			image.src = app.imagesVegeta.pose3;
			this.pose3Vegeta = image;

			image = new Image();
			image.src = app.imagesVegeta.pose4;
			this.pose4Vegeta = image;

			image = new Image();
			image.src = app.imagesVegeta.special1;
			this.special1Vegeta = image;

			image = new Image();
			image.src = app.imagesVegeta.burst1;
			this.burst1Vegeta = image;

			image = new Image();
			image.src = app.imagesVegeta.burst2;
			this.burst2Vegeta = image;

			image = new Image();
			image.src = app.imagesVegeta.struggle1;
			this.struggle1Vegeta = image;
		}

		// ---- PICCOLO IMAGES ------------------
		if (this.piccolo == true) {

			var image = new Image();
			image.src = app.imagesPiccolo.stance;
			this.stancePiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.stanceUp;
			this.stanceUpPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.stanceDown;
			this.stanceDownPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.slowFly;
			this.slowFlyPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.fastFly;
			this.fastFlyPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.flyUp;
			this.flyUpPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.flyUpUp;
			this.flyUpUpPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.flyUpDown;
			this.flyUpDownPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.flyDownSlow;
			this.flyDownSlowPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.flyDownFast;
			this.flyDownFastPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.reverse;
			this.moveReversePiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.punch;
			this.punchPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.kneePrep;
			this.kneePrepPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.knee;
			this.kneePiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.punchPrep;
			this.punchPrepPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.hit1;
			this.hit1Piccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.hit2;
			this.hit2Piccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.hardKick;
			this.hardKickPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.ground;
			this.groundPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.fallSide;
			this.fallSidePiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.hardKickPrep;
			this.hardKickPrepPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.hardKickSwing;
			this.hardKickSwingPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.hardPunch;
			this.hardPunchPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.hardPunchAir;
			this.hardPunchAirPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.hardPunchAirPrep;
			this.hardPunchAirPrepPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.hardPunchAirSwing;
			this.hardPunchAirSwingPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.hardPunchPrep;
			this.hardPunchPrepPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.hitHard;
			this.hitHardPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.injured;
			this.injuredPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.kick;
			this.kickPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.kickPrep;
			this.kickPrepPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.blastPrep;
			this.blastPrepPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.blastPrepAir;
			this.blastPrepAirPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.blast;
			this.blastPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.blast2;
			this.blast2Piccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.blastAir;
			this.blastAirPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.block;
			this.blockPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.fallDown;
			this.fallDownPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.launchPrep;
			this.launchPrepPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.launchSwing;
			this.launchSwingPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.launch;
			this.launchPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.taunt;
			this.tauntPiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.pose1;
			this.pose1Piccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.pose2;
			this.pose2Piccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.pose3;
			this.pose3Piccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.pose4;
			this.pose4Piccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.energy1;
			this.energy1Piccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.energy2;
			this.energy2Piccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.energy3;
			this.energy3Piccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.energy4;
			this.energy4Piccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.charge;
			this.chargePiccolo = image;

			image = new Image();
			image.src = app.imagesPiccolo.beamPrep;
			this.beamPrep = image;

			image = new Image();
			image.src = app.imagesPiccolo.beam;
			this.beam = image;
		}

		// ---- GOHAN IMAGES ------------------

		if (this.gohan == true) {

			var image = new Image();
			image.src = app.imagesGohan.stance;
			this.stanceGohan = image;

			image = new Image();
			image.src = app.imagesGohan.stanceUp;
			this.stanceUpGohan = image;

			image = new Image();
			image.src = app.imagesGohan.stanceDown;
			this.stanceDownGohan = image;

			image = new Image();
			image.src = app.imagesGohan.slowFly;
			this.slowFlyGohan = image;

			image = new Image();
			image.src = app.imagesGohan.fastFly;
			this.fastFlyGohan = image;

			image = new Image();
			image.src = app.imagesGohan.flyUp;
			this.flyUpGohan = image;

			image = new Image();
			image.src = app.imagesGohan.flyUpUp;
			this.flyUpUpGohan = image;

			image = new Image();
			image.src = app.imagesGohan.flyUpDown;
			this.flyUpDownGohan = image;

			image = new Image();
			image.src = app.imagesGohan.flyDownSlow;
			this.flyDownSlowGohan = image;

			image = new Image();
			image.src = app.imagesGohan.flyDownFast;
			this.flyDownFastGohan = image;

			image = new Image();
			image.src = app.imagesGohan.reverse;
			this.moveReverseGohan = image;

			image = new Image();
			image.src = app.imagesGohan.leftPunch;
			this.leftPunchGohan = image;

			image = new Image();
			image.src = app.imagesGohan.rightPunch;
			this.rightPunchGohan = image;

			image = new Image();
			image.src = app.imagesGohan.punchPrep;
			this.punchPrepGohan = image;

			image = new Image();
			image.src = app.imagesGohan.hit1;
			this.hit1Gohan = image;

			image = new Image();
			image.src = app.imagesGohan.beam;
			this.beamGohan = image;

			image = new Image();
			image.src = app.imagesGohan.beamUp;
			this.beamUpGohan = image;

			image = new Image();
			image.src = app.imagesGohan.beamDown;
			this.beamDownGohan = image;

			image = new Image();
			image.src = app.imagesGohan.beamPrep;
			this.beamPrepGohan = image;

			image = new Image();
			image.src = app.imagesGohan.hardKick;
			this.hardKickGohan = image;

			image = new Image();
			image.src = app.imagesGohan.ground;
			this.groundGohan = image;

			image = new Image();
			image.src = app.imagesGohan.fallSide;
			this.fallSideGohan = image;

			image = new Image();
			image.src = app.imagesGohan.hardKickPrep;
			this.hardKickPrepGohan = image;

			image = new Image();
			image.src = app.imagesGohan.hardKickSwing;
			this.hardKickSwingGohan = image;

			image = new Image();
			image.src = app.imagesGohan.hardPunchAir;
			this.hardPunchAirGohan = image;

			image = new Image();
			image.src = app.imagesGohan.hardPunchAirPrep;
			this.hardPunchAirPrepGohan = image;

			image = new Image();
			image.src = app.imagesGohan.hardPunchAirSwing;
			this.hardPunchAirSwingGohan = image;

			image = new Image();
			image.src = app.imagesGohan.hardPunchSwing;
			this.hardPunchSwingGohan = image;

			image = new Image();
			image.src = app.imagesGohan.hardPunchSwing2;
			this.hardPunchSwing2Gohan = image;

			image = new Image();
			image.src = app.imagesGohan.hardPunchPrep;
			this.hardPunchPrepGohan = image;

			image = new Image();
			image.src = app.imagesGohan.hitHard;
			this.hitHardGohan = image;

			image = new Image();
			image.src = app.imagesGohan.injured;
			this.injuredGohan = image;

			image = new Image();
			image.src = app.imagesGohan.kick;
			this.kickGohan = image;

			image = new Image();
			image.src = app.imagesGohan.kickPrep;
			this.kickPrepGohan = image;

			image = new Image();
			image.src = app.imagesGohan.blast;
			this.blastGohan = image;

			image = new Image();
			image.src = app.imagesGohan.blastPrep;
			this.blastPrepGohan = image;

			image = new Image();
			image.src = app.imagesGohan.head;
			this.headGohan = image;

			image = new Image();
			image.src = app.imagesGohan.headPrep;
			this.headPrepGohan = image;

			image = new Image();
			image.src = app.imagesGohan.block;
			this.blockGohan = image;

			image = new Image();
			image.src = app.imagesGohan.fallDown;
			this.fallDownGohan = image;

			image = new Image();
			image.src = app.imagesGohan.launchPrep;
			this.launchPrepGohan = image;

			image = new Image();
			image.src = app.imagesGohan.launchSwing;
			this.launchSwingGohan = image;

			image = new Image();
			image.src = app.imagesGohan.launch;
			this.launchGohan = image;

			image = new Image();
			image.src = app.imagesGohan.taunt;
			this.tauntGohan = image;

			image = new Image();
			image.src = app.imagesGohan.charge;
			this.chargeGohan = image;

			image = new Image();
			image.src = app.imagesGohan.gohanSevere;
			this.gohanSevere = image;

			image = new Image();
			image.src = app.imagesGohan.gohanSevere2;
			this.gohanSevere2 = image;

			image = new Image();
			image.src = app.imagesGohan.mad1;
			this.mad1Gohan = image;

			image = new Image();
			image.src = app.imagesGohan.ss2;
			this.SS2Gohan = image;

			image = new Image();
			image.src = app.imagesGohan.aura1;
			this.aura1Gohan = image;

			image = new Image();
			image.src = app.imagesGohan.aura2;
			this.aura2Gohan = image;

			image = new Image();
			image.src = app.imagesGohan.aura3;
			this.aura3Gohan = image;

			image = new Image();
			image.src = app.imagesGohan.aura4;
			this.aura4Gohan = image;

			image = new Image();
			image.src = app.imagesGohan.aura5;
			this.aura5Gohan = image;
		}

		// ---- TIEN IMAGES ------------------

		if (this.tien == true) {

			var image = new Image();
			image.src = app.imagesTien.stance;
			this.stanceTien = image;

			image = new Image();
			image.src = app.imagesTien.stanceUp;
			this.stanceUpTien = image;

			image = new Image();
			image.src = app.imagesTien.stanceDown;
			this.stanceDownTien = image;

			image = new Image();
			image.src = app.imagesTien.slowFly;
			this.slowFlyTien = image;

			image = new Image();
			image.src = app.imagesTien.fastFly;
			this.fastFlyTien = image;

			image = new Image();
			image.src = app.imagesTien.flyUp;
			this.flyUpTien = image;

			image = new Image();
			image.src = app.imagesTien.flyUpUp;
			this.flyUpUpTien = image;

			image = new Image();
			image.src = app.imagesTien.flyUpDown;
			this.flyUpDownTien = image;

			image = new Image();
			image.src = app.imagesTien.flyDownSlow;
			this.flyDownSlowTien = image;

			image = new Image();
			image.src = app.imagesTien.flyDownFast;
			this.flyDownFastTien = image;

			image = new Image();
			image.src = app.imagesTien.reverse;
			this.moveReverseTien = image;

			image = new Image();
			image.src = app.imagesTien.hit1;
			this.hit1Tien = image;

			image = new Image();
			image.src = app.imagesTien.ground;
			this.groundTien = image;

			image = new Image();
			image.src = app.imagesTien.fallSide;
			this.fallSideTien = image;

			image = new Image();
			image.src = app.imagesTien.hitHard;
			this.hitHardTien = image;

			image = new Image();
			image.src = app.imagesTien.injured;
			this.injuredTien = image;

			image = new Image();
			image.src = app.imagesTien.fallDown;
			this.fallDownTien = image;

			image = new Image();
			image.src = app.imagesTien.taunt;
			this.tauntTien = image;

			image = new Image();
			image.src = app.imagesTien.solar;
			this.solarTien = image;

			image = new Image();
			image.src = app.imagesTien.triBeam1;
			this.triBeam1 = image;

			image = new Image();
			image.src = app.imagesTien.triBeam2;
			this.triBeam2 = image;

			image = new Image();
			image.src = app.imagesTien.triBeam3;
			this.triBeam3 = image;

			image = new Image();
			image.src = app.imagesTien.triBeam4;
			this.triBeam4 = image;

			image = new Image();
			image.src = app.imagesTien.triBeam5;
			this.triBeam5 = image;

			image = new Image();
			image.src = app.imagesTien.mad1;
			this.mad1Tien = image;
		}

		// ---- KRILLIN IMAGES ------------------

		if (this.krillin == true) {

			var image = new Image();
			image.src = app.imagesKrillin.stance;
			this.stanceKrillin = image;

			image = new Image();
			image.src = app.imagesKrillin.stanceUp;
			this.stanceUpKrillin = image;

			image = new Image();
			image.src = app.imagesKrillin.stanceDown;
			this.stanceDownKrillin = image;

			image = new Image();
			image.src = app.imagesKrillin.slowFly;
			this.slowFlyKrillin = image;

			image = new Image();
			image.src = app.imagesKrillin.fastFly;
			this.fastFlyKrillin = image;

			image = new Image();
			image.src = app.imagesKrillin.flyUp;
			this.flyUpKrillin = image;

			image = new Image();
			image.src = app.imagesKrillin.flyUpUp;
			this.flyUpUpKrillin = image;

			image = new Image();
			image.src = app.imagesKrillin.flyUpDown;
			this.flyUpDownKrillin = image;

			image = new Image();
			image.src = app.imagesKrillin.flyDownSlow;
			this.flyDownSlowKrillin = image;

			image = new Image();
			image.src = app.imagesKrillin.flyDownFast;
			this.flyDownFastKrillin = image;

			image = new Image();
			image.src = app.imagesKrillin.reverse;
			this.moveReverseKrillin = image;

			image = new Image();
			image.src = app.imagesKrillin.hit1;
			this.hit1Krillin = image;

			image = new Image();
			image.src = app.imagesKrillin.ground;
			this.groundKrillin = image;

			image = new Image();
			image.src = app.imagesKrillin.fallSide;
			this.fallSideKrillin = image;

			image = new Image();
			image.src = app.imagesKrillin.hitHard;
			this.hitHardKrillin = image;

			image = new Image();
			image.src = app.imagesKrillin.injured;
			this.injuredKrillin = image;

			image = new Image();
			image.src = app.imagesKrillin.fallDown;
			this.fallDownKrillin = image;

			image = new Image();
			image.src = app.imagesKrillin.taunt;
			this.tauntKrillin = image;

			image = new Image();
			image.src = app.imagesKrillin.solar;
			this.solarKrillin = image;

			image = new Image();
			image.src = app.imagesKrillin.disk1;
			this.disk1 = image;

			image = new Image();
			image.src = app.imagesKrillin.disk2;
			this.disk2 = image;

			image = new Image();
			image.src = app.imagesKrillin.disk3;
			this.disk3 = image;

			image = new Image();
			image.src = app.imagesKrillin.disk4;
			this.disk4 = image;

			image = new Image();
			image.src = app.imagesKrillin.mad1;
			this.mad1Krillin = image;
		}

		// ---- GERO IMAGES ------------------

		if (this.gero == true) {

			image = new Image();
			image.src = app.imagesGero.stance;
			this.stanceGero = image;

			image = new Image();
			image.src = app.imagesGero.slowFly;
			this.slowFlyGero = image;

			image = new Image();
			image.src = app.imagesGero.fastFly;
			this.fastFlyGero = image;

			image = new Image();
			image.src = app.imagesGero.flyUp;
			this.flyUpGero = image;

			image = new Image();
			image.src = app.imagesGero.flyDownSlow;
			this.flyDownSlowGero = image;

			image = new Image();
			image.src = app.imagesGero.flyDownFast;
			this.flyDownFastGero = image;

			image = new Image();
			image.src = app.imagesGero.reverse;
			this.moveReverseGero = image;

			image = new Image();
			image.src = app.imagesGero.leftPunch;
			this.leftPunchGero = image;

			image = new Image();
			image.src = app.imagesGero.rightPunch;
			this.rightPunchGero = image;

			image = new Image();
			image.src = app.imagesGero.punchPrep;
			this.punchPrepGero = image;

			image = new Image();
			image.src = app.imagesGero.hit1;
			this.hit1Gero = image;

			image = new Image();
			image.src = app.imagesGero.kick;
			this.kickGero = image;

			image = new Image();
			image.src = app.imagesGero.kickPrep;
			this.kickPrepGero = image;

			image = new Image();
			image.src = app.imagesGero.hitHard;
			this.hitHardGero = image;

			image = new Image();
			image.src = app.imagesGero.fallSide;
			this.fallSideGero = image;

			image = new Image();
			image.src = app.imagesGero.injured;
			this.injuredGero = image;

			image = new Image();
			image.src = app.imagesGero.fallDown;
			this.fallDownGero = image;
		}

		//Attack IMAGES

		image = new Image();
		image.src = app.attack.blastCharge1;
		this.blastCharge1 = image;

		image = new Image();
		image.src = app.attack.tele;
		this.teleport = image;

		image = new Image();
		image.src = app.attack.tele2;
		this.teleport2 = image;

		image = new Image();
		image.src = app.attack.tele3;
		this.teleport3 = image;

		image = new Image();
		image.src = app.attack.tele5;
		this.teleport5 = image;

		image = new Image();
		image.src = app.attack.tele6;
		this.teleport6 = image;

		image = new Image();
		image.src = app.attack.auraWhite1;
		this.auraWhite1 = image;

		image = new Image();
		image.src = app.attack.auraWhite2;
		this.auraWhite2 = image;

		image = new Image();
		image.src = app.attack.auraWhite3;
		this.auraWhite3 = image;

		image = new Image();
		image.src = app.attack.auraWhite4;
		this.auraWhite4 = image;

		image = new Image();
		image.src = app.attack.auraYellow1;
		this.auraYellow1 = image;

		image = new Image();
		image.src = app.attack.auraYellow2;
		this.auraYellow2 = image;

		image = new Image();
		image.src = app.attack.auraYellow3;
		this.auraYellow3 = image;

		image = new Image();
		image.src = app.attack.auraYellow4;
		this.auraYellow4 = image;

		image = new Image();
		image.src = app.attack.sparks1;
		this.sparks1 = image;

		image = new Image();
		image.src = app.attack.sparks2;
		this.sparks2 = image;

		image = new Image();
		image.src = app.attack.sparks3;
		this.sparks3 = image;

		image = new Image();
		image.src = app.attack.sparks4;
		this.sparks4 = image;

		image = new Image();
		image.src = app.attack.disk1;
		this.energyDisk1 = image;

		image = new Image();
		image.src = app.attack.burst1;
		this.burst1 = image;

		image = new Image();
		image.src = app.attack.burst2;
		this.burst2 = image;

		image = new Image();
		image.src = app.attack.burst3;
		this.burst3 = image;

		image = new Image();
		image.src = app.attack.burst4;
		this.burst4 = image;
	}

	//FUNCTION TO UPDATE MANY VALUES
	Vegeta.prototype.update = function () {

		//Hit detection adjustment
		/*
  if(this.vegeta == true) {
  	if(this.left == false){
  		this.size = new Victor(20, 100);
  	} else {
  		this.size = new Victor(35, 100);
  	}
  } else if(this.piccolo == true) {
  	if(this.left == false){
  		this.size = new Victor(20, 100);
  	} else {
  		this.size = new Victor(40, 100);
  	}
  } else if(this.gohan == true) {
  	this.size = new Victor(20, 100);
  } else if(this.gero == true) {
  	this.size = new Victor(20, 100);
  }
  */

		this.flySoundDelay++;

		//Handling 17
		if (app.main.android17.active == true) {
			//console.log("FOCUS FOCUS FOCUS 17 17 17 @@@@: " + this.focus17);
			if (hardAttackHitTest(app.main.vegeta, app.main.android18) == true) {
				//console.log("TOUCHING 18");
				this.focus17 = false;
			} else if (hardAttackHitTest(app.main.vegeta, app.main.android17) == true) {
				//console.log("TOUCHING 17");
				this.focus17 = true;
			}
		} else {
			//console.log("FOCUS FOCUS FOCUS 17 17 17 @@@@: " + this.focus17);
			this.focus17 = false;
		}

		if (app.main.android17.encounter != true) {
			this.focus17 = false;
		}

		//Looking around
		if (this.focus17 == false) {
			if (this.position.y < app.main.android18.position.y - 150) {
				this.lookDown = true;
			} else if (this.position.y > app.main.android18.position.y + 150) {
				this.lookUp = true;
			} else {
				this.lookUp = false;
				this.lookDown = false;
			}
		} else {
			if (this.position.y < app.main.android17.position.y - 100) {
				this.lookDown = true;
			} else if (this.position.y > app.main.android17.position.y + 100) {
				this.lookUp = true;
			} else {
				this.lookUp = false;
				this.lookDown = false;
			}
		}

		//WALL POSITIONING
		if (this.position.x < this.LEFTWALL.x + 10 && (hardAttackHitTest(app.main.vegeta, app.main.android18) == false || hardAttackHitTest(app.main.vegeta, app.main.android17) == false)) {
			this.right = true;
			this.left = false;
		} else if (this.position.x > this.RIGHTWALL.x - 10 && (hardAttackHitTest(app.main.vegeta, app.main.android18) == false || hardAttackHitTest(app.main.vegeta, app.main.android17) == false)) {
			this.right = false;
			this.left = true;
		}

		//CREATE BOUNDRIES
		if (this.position.y > this.GROUND.y) {
			this.prevX = this.position.x;
			this.position.copyY(this.GROUND);
			//this.jumpVelocity = new Victor(0,-15);
			this.velocity.divideScalar(3);
			this.ground = true;
			this.air = false;
			this.decend = false;
			if (this.end == true && this.vanish == false || this.jumpVelocity.y > 20 && this.hardHit == true) {
				app.main.environment.shake = true;
				this.fallDust = true;
				if (this.dead == false) {
					app.main.sound.playSpecialReaction2(2);
				}
			} else if (this.end == false && this.hover == false && (app.main.scene == false || app.main.sceneNum == 3)) {
				this.landDust = true;
				app.main.sound.playSpecialReaction2(3);
			}
		}
		if (this.position.y > this.BUILDING.y && this.aboveBuilding == true && this.down == false && this.end == false) {
			this.position.copyY(this.BUILDING);
			//this.jumpVelocity = new Victor(0,-15);
			this.velocity.divideScalar(3);
			this.ground = true;
			this.air = false;
			this.decend = false;
			if (this.end == true && this.vanish == false || this.jumpVelocity.y > 20 && this.hardHit == true) {
				app.main.environment.shake = true;
				if (this.dead == false) {
					app.main.sound.playSpecialReaction(2);
				}
			} else if (this.end == false && this.hover == false && (app.main.scene == false || app.main.sceneNum == 3)) {
				app.main.sound.playSpecialReaction(3);
			}
		}
		if (this.position.y < this.SKY.y) {
			this.aboveSky = true;
		} else {
			this.aboveSky = false;
		}
		if (this.position.y < this.SKYTOP.y) {
			this.position.copyY(this.SKYTOP);
			if (this.stun == false) {
				this.jumpVelocity = new Victor(0, 0);
			}
		}
		if (this.position.x < this.LEFTWALL.x) {
			this.position.copyX(this.LEFTWALL);
			this.decel = new Victor(0, 0);
			this.velocity = new Victor(0, 0);
		}
		if (this.position.x > this.RIGHTWALL.x) {
			this.position.copyX(this.RIGHTWALL);
			this.decel = new Victor(0, 0);
			this.velocity = new Victor(0, 0);
		}
		if (this.position.y < this.BUILDING.y && this.position.x > this.BUILDING.x && this.down == false) {
			this.aboveBuilding = true;
		}
		if (this.position.x < this.BUILDING.x && this.position.y < this.GROUND.y || this.position.y > this.BUILDING.y && this.position.y < this.GROUND.y) {
			this.air = true;
			this.aboveBuilding = false;
		}
		if (app.main.android18.air == true && this.vanish == true) {
			//bug fix
			this.flying = true;
			this.air = true;
			this.jumpVelocity.y = 0;
		}

		//GROUND CHECK
		if (this.ground == true && this.end == false) {
			if (this.stun == false && this.hardhit == false) {
				this.jumpVelocity = new Victor(0, 0);
			}
			if (this.up == true) {
				this.jumpVelocity = new Victor(0, -15);
			}

			if (this.air == true) {
				this.prevX = this.position.x;
				if (this.aboveBuilding == false) {
					this.flyDust = true;
				}
			}
		}

		if (this.blocking == true) {
			if (this.revese == false) {
				this.velocity.x = 0;
			}
		}

		if (this.powerMove == true) {
			this.hover = true;
		}

		//UNSTOPPABLE
		if (this.unstoppable == true) {
			this.unstopTimer++;

			if (this.unstopTimer > 5) {
				this.unstoppable = false;
				this.unstopTimer = 0;
			}
		}

		if (this.vegeta != true) {
			this.unstoppable = false;
		}

		//hover smooth
		if (this.hover == true) {
			this.smoothTimer++;
			if (this.smoothTimer < 4) {
				this.position.y -= 1.5;
			} else if (this.smoothTimer < 8) {
				this.position.y += 1.5;
			} else {
				this.smoothTimer = 0;
			}
		} else {
			this.smoothTimer = 0;
		}

		//Blast Close Push
		if (hardAttackHitTest(app.main.vegeta, app.main.android18) == true && app.main.android18.blasting == true && this.behind == false) {
			if (app.main.android18.left == true) {
				this.velocity.x -= 2;
			} else {
				this.velocity.x += 2;
			}
			this.decel = this.velocity.clone();
		}
		if (hardAttackHitTest(app.main.vegeta, app.main.android17) == true && app.main.android17.blasting == true && this.behind == false) {
			if (app.main.android17.left == true) {
				this.velocity.x -= 2;
			} else {
				this.velocity.x += 2;
			}
			this.decel = this.velocity.clone();
		}

		if (this.basic == true && attackHitTest(app.main.vegeta, app.main.android18) != true && attackHitTest(app.main.vegeta, app.main.android17) != true) {
			app.main.sound.playBasicReaction(Math.round(getRandom(61, 63)));
		}

		if (this.charging == true) {
			if (this.hit == true || this.hardHit == true || this.superSpeed == true || this.stun == true || this.end == true) {
				app.main.sound.stopEffect();
			}
		}

		if ((this.hardHit == true || this.hit == true) && this.blastBurn == true) {
			this.blastBurnCounter = 0;
		}

		if (app.main.scene == true) {
			this.flying = false;
		}

		if (this.superSpeedExhaustion == true) {
			//console.log(this.speedExhaust + "SPEED EXHAUST");
			this.speedExhaust++;
			if (this.speedExhaust > 20) {
				this.superSpeedExhaustion = false;
				this.speedExhaust = 0;
			}
		}

		//Endurance recovery
		if (this.blastBurn == true) {
			//Blast burn
			this.blastBurnCounter++;
			if (this.blastBurnCounter > this.blastBurnLength) {
				this.blastBurn = false;
				this.blastBurnCounter = 0;
			}
		} else {
			if (this.endurance < 100 && this.stun == false && this.end == false && this.tien == false && this.krillin == false) {
				this.endurance += .2;
			}
		}
		//Energy recovery (NO RECOVER ENERGY)
		/*
  if(this.energy < 100 && this.stun == false && this.end == false){
  	this.energy += .1;
  }*/
		//Stamina recovery
		if (this.stamina > 28 && this.stun == false && this.end == false && this.blocking == false || this.exhausted == true) {
			this.stamina -= .2;
		}
		//console.log("attacking = " + this.attacking);
		//console.log("fighting = " + this.fight);
		//console.log("stunned = " + this.stun); //reverse
		//console.log("AI = " + app.main.aiChoice2);
		//console.log(app.main.detectedHard2);

		//Exhaustion 
		/*
  if(this.exhausted == true){
  	this.exhaustedCounter++;
  	if(this.exhaustedCounter > 2000){ //aiChoice2
  		this.exhausted = false;
  	}
  }
  if(this.exhausted == false){
  	//this.exhaustedCounter = 0;
  }*/

		//Death location
		/* if(this.end != true){
  	app.main.environment.deathLocationVegeta.x = this.position.x;
  	app.main.environment.deathLocationVegeta.y = this.position.y;
  } */

		//AI FIXES
		if (app.main.android18.attacking == false && this.blocking == true) {
			this.exhaustedCounter++;
			if (this.exhaustedCounter > 2) {
				this.blocking = false;
				app.main.aiChoice3 = 10;
				this.exhaustedCounter = 0;
			}
		}

		if (this.end == true) {
			this.flying = false;
			this.hover = false;
		}

		if (this.stun == false && this.attacking == false && this.powerMove == false) {
			this.blasting == false;
		}

		/* if(this.vegeta == true && this.specMove == true){
  	this.hit = false;
  	this.stun = false;
  } */

		if (this.vegeta == true) {
			this.specTimer++;
		}

		//HOVER
		if (app.main.scene == false || app.main.sceneNum == 4 && app.main.scene == true) {
			if (this.air == true && this.down == false && this.position.y > this.SKYTOP.y && this.up == false && this.hit == false && this.hardHit == false && this.end == false && (app.main.android18.air == true || app.main.android17.air == true && this.focus17 == true || this.charging == true || this.taunting == true) || ((hardAttackHitTest(app.main.vegeta, app.main.android18) || hardAttackHitTest(app.main.vegeta, app.main.android17)) && this.hardHit == false || this.blasting == true || this.powerMove == true || this.charging == true || this.taunting == true || this.superSpeed == true || this.blocking == true || this.attacking == true) && this.position.y > this.SKYTOP.y && this.up == false && this.hit == false && this.hardHit == false && this.end == false) {
				//Hover
				this.hoverCounter++;
				this.hover = true;
				if (this.tien == false && this.krillin == false || this.blasting == true) {
					if (this.blasting == true || this.taunting == true || this.charging == true || this.powerMove == true || this.superSpeed == true || this.focus17 == false && app.main.android18.position.y < this.position.y || this.focus17 == true && app.main.android17.position.y < this.position.y) {
						if (this.hoverCounter < 6) {
							this.flying = false;
						} else {
							this.flying = true;
							//this.decend = false;
							this.hoverCounter = 0;
						}
					} else {
						this.hover = false;
					}
				} else {
					this.hover = false;
				}
			} else {
				this.hover = false;
			}
		} else {
			this.hover = false;
		}

		if (this.attacking == false && this.stun == false && this.fight == false && this.taunting == false && this.charging == false) {
			if (this.aiCounter > 1) {
				app.main.action = false;
			} else {
				this.aiCounter++;
			}
			//app.main.aiChoice = Math.random();
		}
		if (this.taunting == false && this.vegeta.vegeta == true) {
			this.tauntPick = getRandom(10, 16);
		}
		/*
  if(this.taunting == false && this.vegeta.piccolo == true){
  	this.tauntPick = getRandom(0, 6);
  }*/

		if (this.exhausted == true) {
			// END BLOCKING
			this.blocking = false;
		}

		if (this.hardHit == true || this.blasted == true) {
			this.fight = false;
			this.blasting = false;
			this.powerMove = false;
		}

		if (this.hit == true || this.hardHit == true) {
			app.main.dodgeChance = Math.random();
		}

		if (this.hit == false && this.hardHit == false) {
			this.punched = false;
		}

		if (this.fight == false) {
			this.blasting = false;
			this.powerMove = false;
		}

		/* if(this.blasting == true){
  	this.decel.x = 0;
  } */

		//Flight control
		if (this.flying == true && (this.stun == false && this.end == false || this.hover == true) || app.main.sceneNum == 4 && this.attacking == true && this.hover == true) {
			if ((this.position.y == this.GROUND.y || this.position.y == this.BUILDING.y) && this.hover == false && (app.main.scene == false || this.sceneNum == 5) && this.stun == false && this.end == false && this.flySoundDelay > 10) {
				app.main.sound.playSpecialReaction(4);
				this.flySoundDelay = 0;
			}
			if (this.hover == true) {
				this.jumpVelocity = new Victor(0, -4);
			} else if (this.jumpVelocity.y > 0 && this.down == false) {
				this.jumpVelocity = new Victor(0, -8);
			}
			this.jumpVelocity.addY(this.jumpAccel);
			this.gravity.zero();
		} else if (this.decend == true) {
			this.gravity = new Victor(0, 8);
			this.velocity.multiplyScalar(1.3);
		} else {
			this.gravity = new Victor(0, 1.7);
		}

		if (this.air == true) {
			this.ground = false;
			this.jumpVelocity.addY(this.gravity);
			this.position.addY(this.jumpVelocity);
		}

		if (this.hardHit == true && this.air == true) {
			this.taunting = false;
			this.flying = false;
		} else if (this.hardHit == true && this.air == false && this.hit == false) {
			this.stun = false;
			this.hardHit = false;
		}

		if (this.hit == true || this.hardHit == true || this.blasted == true) {
			app.main.aiTaunting = false;
			app.main.aiCharging = false;
			this.attacking = false;
			this.blasting = false;
			this.blocking = false;
			this.powerMove = false;
			this.taunting = false;
			this.charging = false;
			this.intensify = false;
			this.blastRelease = false;
			//this.unstoppable = false;
			//this.specMove = false;
		}

		this.decelerate(); //DECEL


		if (this.velocity.x < .1 && this.velocity.x > -.1 && this.hit == false) {
			this.velocity.zero();
		}

		if (this.dead == true) {
			this.flying = false;
			this.hover = false;
			this.blasting = false;
			this.fight = false;
		}

		if (app.main.scene == true && app.main.gameState != app.main.GAME_STATE.TUTORIAL || app.main.introState == true) {
			this.stun = true;
		}

		if (this.gero == true && this.aboveBuilding == true && app.main.android18.aboveBuilding == false && this.position.y < app.main.android18.position.y + 50 && this.air == false && this.stun == false) {
			//this.position.y -= 4;
			this.air = true;
			this.aboveBuilding = false;
		}

		//PUSH 
		if (app.main.android17.vanish == false && app.main.android17.gone == false) {
			if (hitTest(app.main.vegeta, app.main.android17) && this.behind == false && app.main.android17.moving == false) {
				if (app.main.android17.left == true) {
					this.position.x -= 10;
				} else {
					this.position.x += 10;
				}
			} else if (hitTest(app.main.android17, app.main.vegeta) && this.behind == true && app.main.android17.moving == false) {
				if (app.main.android17.left == true) {
					this.position.x += 10;
				} else {
					this.position.x -= 10;
				}
			}
		}

		//Mute Voice
		if (this.hit == true && this.tien == false && this.krillin == false && app.main.discHit == false && this.deathTalk == false && this.exhaustTalk == false && this.exhausted == false && this.end == false && this.specMove == false && this.voiceStop == false) {
			app.main.sound.pauseVoice2();
			app.main.sound.pauseVoice4();
			app.main.sound.pauseVoice6();
			app.main.environment.powerUp = false;
			this.voiceStop = true;
		} else if (this.hit == false) {
			this.voiceStop = false;
		}

		//Mute Voice Support
		if (this.hit == true && this.blasting == true && (this.tien == true || this.krillin == true && app.main.discHit == false)) {
			app.main.sound.pauseVoice7();
			app.main.sound.pauseVoice8();
		}

		//Varible resets
		if (this.attacking == false && this.blasting == false && this.taunting == false && this.charging == false && this.superSpeed == false && this.end == false) {
			//app.main.detected = false;
			//app.main.detectedHard = false;
			//console.log("RESET");
			this.fight = false;
			this.hard = false;
			this.turnsDown = false;
			this.turnsUp = false;
			this.counter = 0;
			this.dodge = false;
			this.basic = false;
			this.kicking = false;
			this.punching = false;
			//this.unstoppable = false;
			//this.specMove = false;
		}
		if (this.stun == false) {
			this.stunCounter = 0;
		}

		if (this.gohan == true && this.end == true && this.dead == false) {
			//Gohan adjust
			if (this.right == true) {
				this.position.x -= 10;
			} else {
				this.position.x += 10;
			}
		}

		//Checks for behind
		if (this.focus17 == false) {
			if (this.left == true && app.main.android18.left == true && this.position.x > app.main.android18.position.x) {
				this.behind = true;
			} else if (this.left == false && app.main.android18.left == false && this.position.x < app.main.android18.position.x) {
				this.behind = true;
			} else {
				this.behind = false;
			}
		} else {
			if (this.left == true && app.main.android17.left == true && this.position.x > app.main.android17.position.x) {
				this.behind = true;
			} else if (this.left == false && app.main.android17.left == false && this.position.x < app.main.android17.position.x) {
				this.behind = true;
			} else {
				this.behind = false;
			}
		}

		if (this.position.x > 690) {
			this.byBuilding = true;
		} else {
			this.byBuilding = false;
		}

		//Support Characters
		if (this.tien == true || this.krillin == true) {
			//console.log("SPECIAL HEALTH HEALTH: " + this.specialHealth);
			if (this.hardHit == true && this.specialDamage == false) {
				this.specialHealth -= 2;
				this.specialDamage = true;
				this.spSaying = false;
			} else if (this.hit == true && this.specialDamage == false) {
				this.specialHealth -= 1;
				this.specialDamage = true;
				this.spSaying = false;
			}

			if (this.hit == false && this.hardHit == false) {
				this.specialDamage = false;
			}

			if (this.tien == true) {

				if (this.exhausted == true && app.main.scene == false) {
					if (this.extraCounter < 50) {
						this.extraCounter++;
					} else {
						this.exhausted = false;
						this.extraCounter = 0;
						this.energyUse = 0;
						app.main.chance4 = Math.random();
					}
				}

				if (this.spSaying == false) {
					if (this.specialHealth == 0) {
						app.main.sound.playTaunt7(6);
						this.spSaying = true;
					} else if (this.specialHealth == 4) {
						app.main.sound.playTaunt7(5);
						this.spSaying = true;
					} else if (this.specialHealth == 8) {
						app.main.sound.playTaunt7(4);
						this.spSaying = true;
					}
				}
			}

			if (this.krillin == true) {

				if (this.exhausted == true && app.main.scene == false) {
					if (this.extraCounter < 50) {
						this.extraCounter++;
					} else {
						this.exhausted = false;
						this.extraCounter = 0;
						this.energyUse = 0;
						app.main.chance4 = Math.random();
					}
				}

				if (this.spSaying == false) {
					if (this.specialHealth == 0) {
						app.main.sound.playTaunt8(10);
						this.spSaying = true;
					} else if (this.specialHealth == 4) {
						app.main.sound.playTaunt8(9);
						this.spSaying = true;
					} else if (this.specialHealth == 8) {
						app.main.sound.playTaunt8(8);
						this.spSaying = true;
					}
				}
			}

			if (this.specialHealth < 1) {
				this.end = true;
				//this.dead = true;
			}
		}

		//Injured talk
		if (this.exhausted == true && this.exhaustTalk == false) {
			this.exhaustTalk = true;
			if (this.vegeta == true) {
				app.main.sound.playTaunt2(Math.round(getRandom(43, 44)));
			} else if (this.gero == true) {
				app.main.sound.playIntro(72);
				app.main.sound.playTaunt2(Math.round(getRandom(49, 50)));
			} else if (this.piccolo == true) {
				app.main.sound.playTaunt4(Math.round(getRandom(16, 17)));
			} else if (this.gohan == true && this.superForm == false) {
				app.main.sound.playTaunt6(Math.round(getRandom(30, 31)));
			} else if (this.gohan == true && this.superForm == true) {
				app.main.sound.playTaunt6(Math.round(getRandom(32, 33)));
			} else if (this.tien == true) {
				app.main.sound.playTaunt7(Math.round(getRandom(7, 8)));
			} else if (this.krillin == true) {
				app.main.sound.playTaunt8(Math.round(getRandom(13, 14)));
			}
		} else if (this.exhausted == false) {
			this.exhaustTalk = false;
		}

		//Death Talk
		if (this.end == true && this.deathTalk == false) {
			this.deathTalk = true;
			if (this.vegeta == true) {
				if (this.position.y < 350) {
					app.main.sound.playTaunt2(47);
				} else {
					app.main.sound.playTaunt2(48);
				}
			} else if (this.piccolo == true) {
				if (this.position.y < 350) {
					app.main.sound.playTaunt4(18);
				} else {
					app.main.sound.playTaunt4(19);
				}
			} else if (this.gohan == true && this.superForm == false) {
				if (this.position.y < 350) {
					app.main.sound.playTaunt6(34);
				} else {
					app.main.sound.playTaunt6(35);
				}
			}
		}

		//SPECIAL CASES
		if (this.gero == true) {
			app.main.aiChoice2 = .4;
		}

		if (app.main.gameState == app.main.GAME_STATE.TUTORIAL) {
			this.BUILDING = new Victor(0, 135);
		} else {
			if (app.main.environment.buildingActive == true && this.end == false) {
				this.BUILDING = new Victor(650, 250);
			} else {
				this.BUILDING = new Victor(650, -1250);
			}
		}
	};

	//Starts a jump/flight
	Vegeta.prototype.jump = function () {
		this.air = true;
	};

	//BEGIN SUPER SPEED
	Vegeta.prototype.speed = function () {
		if (this.focus17 == false) {
			if (this.gero == false) {
				this.energy -= 5;
			}
			if (this.teleUp == true) {
				this.position.y = this.SKYTOP.y;
				this.teleUp = false;
			} else if (this.teleDown == true) {
				this.position.y = this.GROUND.y;
				this.aboveBuilding = false;
				this.teleDown = false;
			} else if (this.left == true && this.teleFace == true) {
				this.position.x = this.lastKnown.x + 25;
				this.position.y = this.lastKnown.y;
				this.teleFace = false;
			} else if (this.right == true && this.teleFace == true) {
				this.position.x = this.lastKnown.x - 25;
				this.position.y = this.lastKnown.y;
				this.teleFace = false;
			} else if (this.left == true && app.main.android18.position.x < this.LEFTWALL.x + 50) {
				if (app.main.android18.aboveBuilding == false) {
					this.aboveBuilding = false;
				}
				this.position.x = app.main.android18.position.x + 50;
				this.position.y = app.main.android18.position.y;
			} else if (this.right == true && app.main.android18.position.x > this.RIGHTWALL.x - 50) {
				if (app.main.android18.aboveBuilding == false) {
					this.aboveBuilding = false;
				}
				this.position.x = app.main.android18.position.x - 50;
				this.position.y = app.main.android18.position.y;
			} else if (this.position.x - 100 <= this.LEFTWALL.x) {
				this.position.x = this.RIGHTWALL.x;
			} else if (this.position.x + 100 >= this.RIGHTWALL.x) {
				this.position.x = this.LEFTWALL.x;
			} else if (this.left == true && this.reverse == true) {
				this.position.x = this.RIGHTWALL.x;
			} else if (this.right == true && this.reverse == true) {
				this.position.x = this.LEFTWALL.x;
			} else if (this.left == true) {
				if (app.main.android18.aboveBuilding == false) {
					this.aboveBuilding = false;
				}
				this.position.x = app.main.android18.position.x - 50;
				this.position.y = app.main.android18.position.y;
			} else if (this.right == true) {
				if (app.main.android18.aboveBuilding == false) {
					this.aboveBuilding = false;
				}
				this.position.x = app.main.android18.position.x + 50;
				this.position.y = app.main.android18.position.y;
			}
		} else {
			//17 Version
			this.energy -= 5;
			if (this.teleUp == true) {
				this.position.y = this.SKYTOP.y;
				this.teleUp = false;
			} else if (this.teleDown == true) {
				this.position.y = this.GROUND.y;
				this.aboveBuilding = false;
				this.teleDown = false;
			} else if (this.left == true && this.teleFace == true) {
				this.position.x = this.lastKnown.x + 25;
				this.position.y = this.lastKnown.y;
				this.teleFace = false;
			} else if (this.right == true && this.teleFace == true) {
				this.position.x = this.lastKnown.x - 25;
				this.position.y = this.lastKnown.y;
				this.teleFace = false;
			} else if (this.left == true && app.main.android17.position.x < this.LEFTWALL.x + 50) {
				if (app.main.android17.aboveBuilding == false) {
					this.aboveBuilding = false;
				}
				this.position.x = app.main.android17.position.x + 50;
				this.position.y = app.main.android17.position.y;
			} else if (this.right == true && app.main.android17.position.x > this.RIGHTWALL.x - 50) {
				if (app.main.android17.aboveBuilding == false) {
					this.aboveBuilding = false;
				}
				this.position.x = app.main.android17.position.x - 50;
				this.position.y = app.main.android17.position.y;
			} else if (this.position.x - 100 <= this.LEFTWALL.x) {
				this.position.x = this.RIGHTWALL.x;
			} else if (this.position.x + 100 >= this.RIGHTWALL.x) {
				this.position.x = this.LEFTWALL.x;
			} else if (this.left == true && this.reverse == true) {
				this.position.x = this.RIGHTWALL.x;
			} else if (this.right == true && this.reverse == true) {
				this.position.x = this.LEFTWALL.x;
			} else if (this.left == true) {
				if (app.main.android17.aboveBuilding == false) {
					this.aboveBuilding = false;
				}
				this.position.x = app.main.android17.position.x - 50;
				this.position.y = app.main.android17.position.y;
			} else if (this.right == true) {
				if (app.main.android17.aboveBuilding == false) {
					this.aboveBuilding = false;
				}
				this.position.x = app.main.android17.position.x + 50;
				this.position.y = app.main.android17.position.y;
			}
		}
	};

	//MOVE TO THE RIGHT
	Vegeta.prototype.moveRight = function () {
		this.movingRight = true;
		this.movingLeft = false;
		this.velocity.addX(this.accel);
		this.velocity.limit(24, .80);
		this.decel = this.velocity.clone();
		this.position.addX(this.velocity);
	};

	//MOVE TO THE LEFT
	Vegeta.prototype.moveLeft = function () {
		this.movingLeft = true;
		this.movingRight = false;
		this.velocity.subtractX(this.accel);
		this.velocity.limit(24, .80);
		//console.log("VELOCITY" + this.velocity);
		this.decel = this.velocity.clone();
		this.position.addX(this.velocity);
	};

	//DECEL AFTER MOVING
	Vegeta.prototype.decelerate = function () {
		if (this.decel.x < 2 && this.decel.x > -2) {
			this.decel.zero();
		}

		if (this.air == false && this.blasting == false) {
			this.velocity = this.decel.clone();
			this.decel.multiplyScalar(.82);
			this.position.addX(this.decel);
		} else if (this.air == true && this.blasting == false) {
			this.velocity = this.decel.clone();
			this.decel.multiplyScalar(.94);
			this.position.addX(this.decel);
		} else {
			this.velocity = this.decel.clone();
			this.decel.multiplyScalar(.8);
			this.position.addX(this.decel);
		}
	};

	//FUNCTION TO DRAW VEGETA AND CHANGE MANY VARIABLES (MOST IMPORANT)
	Vegeta.prototype.draw = function (ctx) {

		this.counter++;
		this.stunCounter++;

		if (this.movingLeft == true) {
			if (this.velocity.x < 0 && this.velocity.x > -20) {
				this.slow = true;
				this.fast = false;
			} else if (this.velocity.x < -20) {
				this.fast = true;
				this.slow = false;
			} else if (this.velocity.x >= 0) {
				this.fast = false;
				this.slow = false;
			}
		}
		if (this.movingRight == true) {
			if (this.velocity.x > 0 && this.velocity.x < 20) {
				this.slow = true;
				this.fast = false;
			} else if (this.velocity.x > 20) {
				this.fast = true;
				this.slow = false;
			} else if (this.velocity.x <= 0) {
				this.fast = false;
				this.slow = false;
			}
		}

		ctx.save();

		//FLIPPING
		if (this.left == true) {
			if (this.piccolo == true) {
				ctx.translate(this.position.x - 30, this.position.y + 20);
				this.attackPosition.x = this.position.x - 30;
				this.attackPosition.y = this.position.y + 20;
				this.hardAttackPosition.x = this.position.x - 60;
				this.hardAttackPosition.y = this.position.y + 20;
			} else if (this.gohan == true) {
				ctx.translate(this.position.x - 50, this.position.y - 20);
				this.attackPosition.x = this.position.x - 30;
				this.attackPosition.y = this.position.y + 20;
				this.hardAttackPosition.x = this.position.x - 60;
				this.hardAttackPosition.y = this.position.y + 20;
			} else if (this.vegeta == true) {
				ctx.translate(this.position.x - 15, this.position.y + 12);
				this.attackPosition.x = this.position.x - 30;
				this.attackPosition.y = this.position.y + 20;
				this.hardAttackPosition.x = this.position.x - 60;
				this.hardAttackPosition.y = this.position.y + 20;
			} else if (this.tien == true) {
				ctx.translate(this.position.x - 175, this.position.y - 80);
				this.attackPosition.x = this.position.x - 30;
				this.attackPosition.y = this.position.y + 20;
				this.hardAttackPosition.x = this.position.x - 60;
				this.hardAttackPosition.y = this.position.y + 20;
			} else if (this.krillin == true) {
				ctx.translate(this.position.x - 150, this.position.y - 75);
				this.attackPosition.x = this.position.x - 30;
				this.attackPosition.y = this.position.y + 20;
				this.hardAttackPosition.x = this.position.x - 60;
				this.hardAttackPosition.y = this.position.y + 20;
			} else if (this.gero == true) {
				ctx.translate(this.position.x + 5, this.position.y);
				this.attackPosition.x = this.position.x - 30;
				this.attackPosition.y = this.position.y + 20;
				this.hardAttackPosition.x = this.position.x - 60;
				this.hardAttackPosition.y = this.position.y + 20;
			} else {
				ctx.translate(this.position.x - 15, this.position.y);
				this.attackPosition.x = this.position.x - 30;
				this.attackPosition.y = this.position.y + 20;
				this.hardAttackPosition.x = this.position.x - 60;
				this.hardAttackPosition.y = this.position.y + 20;
			}
			ctx.scale(1, 1);
			if (this.movingRight = true && this.movingLeft == false) {
				this.reverse = true;
			} else {
				this.reverse = false;
			}
		} else if (this.right == true) {
			if (this.piccolo == true) {
				ctx.translate(this.position.x + 80, this.position.y + 20);
				this.attackPosition.x = this.position.x + 50;
				this.attackPosition.y = this.position.y + 20;
				this.hardAttackPosition.x = this.position.x + 80;
				this.hardAttackPosition.y = this.position.y + 20;
			} else if (this.gohan == true) {
				ctx.translate(this.position.x + 100, this.position.y - 20);
				this.attackPosition.x = this.position.x + 50;
				this.attackPosition.y = this.position.y + 20;
				this.hardAttackPosition.x = this.position.x + 80;
				this.hardAttackPosition.y = this.position.y + 20;
			} else if (this.vegeta == true) {
				ctx.translate(this.position.x + 65, this.position.y + 12);
				this.attackPosition.x = this.position.x + 50;
				this.attackPosition.y = this.position.y + 20;
				this.hardAttackPosition.x = this.position.x + 80;
				this.hardAttackPosition.y = this.position.y + 20;
			} else if (this.tien == true) {
				ctx.translate(this.position.x + 225, this.position.y - 80);
				this.attackPosition.x = this.position.x + 50;
				this.attackPosition.y = this.position.y + 20;
				this.hardAttackPosition.x = this.position.x + 80;
				this.hardAttackPosition.y = this.position.y + 20;
			} else if (this.krillin == true) {
				ctx.translate(this.position.x + 200, this.position.y - 75);
				this.attackPosition.x = this.position.x + 50;
				this.attackPosition.y = this.position.y + 20;
				this.hardAttackPosition.x = this.position.x + 80;
				this.hardAttackPosition.y = this.position.y + 20;
			} else if (this.gero == true) {
				ctx.translate(this.position.x + 40, this.position.y);
				this.attackPosition.x = this.position.x + 50;
				this.attackPosition.y = this.position.y + 20;
				this.hardAttackPosition.x = this.position.x + 80;
				this.hardAttackPosition.y = this.position.y + 20;
			} else {
				ctx.translate(this.position.x + 65, this.position.y);
				this.attackPosition.x = this.position.x + 50;
				this.attackPosition.y = this.position.y + 20;
				this.hardAttackPosition.x = this.position.x + 80;
				this.hardAttackPosition.y = this.position.y + 20;
			}
			ctx.scale(-1, 1);
			if (this.movingLeft = true && this.movingRight == false) {
				this.reverse = true;
			} else {
				this.reverse = false;
			}
		}

		// ------------ DRAWS FOR VEGETA HIMSELF ------------------------------------------
		// ------------ DRAWS FOR VEGETA HIMSELF ------------------------------------------
		// ------------ DRAWS FOR VEGETA HIMSELF ------------------------------------------

		if (this.vanish == false && this.vegeta == true) {
			//NON MOVING DRAWS
			ctx.save();
			ctx.scale(1, .9);
			if (this.cinematic == true) {
				if (this.cine == 0) {
					ctx.drawImage(this.taunt, 20, -13);
				} else if (this.cine == 1) {
					ctx.drawImage(this.special1Vegeta, 0, -10);
				}
			} else if (this.velocity.x == 0 && this.attacking != true && this.blocking != true && this.taunting != true && this.hit == false && this.hardHit != true && this.charging != true && this.sceneOpen == false && this.end == false) {
				if (this.up == true && this.flying == true || this.jumpVelocity.y < 15 && this.air == true) {
					if (this.lookUp == true) {
						ctx.drawImage(this.flyUpUp, 0, 0);
					} else if (this.lookDown == true) {
						ctx.drawImage(this.flyUpDown, 0, 0);
					} else {
						ctx.drawImage(this.flyUp, 0, 0);
					}
				} else if (this.down == true && this.air == true) {
					ctx.drawImage(this.flyDownFast, 0, 0);
				} else if (this.down == false && this.air == true && this.up == false) {
					ctx.drawImage(this.flyDownSlow, 0, 0);
				} else if (this.exhausted == true) {
					ctx.drawImage(this.injured, 0, 0);
				} else {
					if (this.lookUp == true) {
						ctx.drawImage(this.stanceUp, 0, 0);
					} else if (this.lookDown == true) {
						ctx.drawImage(this.stanceDown, 0, 0);
					} else {
						ctx.drawImage(this.stance, 0, 0);
					}
				}
				//MOVING DRAWS
			} else if (this.velocity.x != 0 && this.attacking != true && this.blocking != true && this.taunting != true && this.hit == false && this.hardHit != true && this.charging == false && this.end == false) {
				//&& (this.fallingKick == false || this.air == false)
				if (this.slow == true && this.reverse == false) {
					ctx.drawImage(this.slowFly, 0, 0);
				} else if (this.fast == true && this.reverse == false) {
					ctx.drawImage(this.fastFly, 0, 10);
				} else if (this.reverse == true) {
					ctx.drawImage(this.moveReverse, 0, 0);
				} else if (this.air == true && this.up == false) {
					ctx.drawImage(this.flyDownSlow, 0, 0);
				} else if (this.exhausted == true) {
					ctx.drawImage(this.injured, 0, 0);
				} else {
					if (this.lookUp == true) {
						ctx.drawImage(this.stanceUp, 0, 0);
					} else if (this.lookDown == true) {
						ctx.drawImage(this.stanceDown, 0, 0);
					} else {
						ctx.drawImage(this.stance, 0, 0);
					}
				}
				//BASIC ATTACK
			} else if (this.attacking == true && this.air == false && this.hit == false && this.blasting == false && this.intensify == false) {
				this.randomEffect = Math.random();
				//this.chance2 = Math.random();
				if (this.counter < 3 && app.main.chance2 > .3) {
					ctx.drawImage(this.punchPrep, 0, 10);
				} else if (this.counter < 3 && app.main.chance2 <= .3) {
					ctx.drawImage(this.kickPrep, 0, 10);
				} else if (this.counter < 5 && app.main.chance2 > .3) {
					if (this.counter < 4) {
						this.stamina += 4;
						this.basic = true;
						//console.log("attack");//action
					} else {
						this.basic = false;
					}
					ctx.drawImage(this.punch, -20, 8);
				} else if (this.counter < 5 && app.main.chance2 <= .3) {
					if (this.counter < 4) {
						this.stamina += 4;
						this.basic = true;
					} else {
						this.basic = false;
					}
					if (this.arms == false) {
						ctx.drawImage(this.kick, -25, 8);
					} else if (this.arms == true) {
						ctx.drawImage(this.knee, -25, 8);
					}
				} else if (app.main.chance2 > .3) {
					this.fight = false;
					this.attacking = false;
					this.basic = false;
					ctx.drawImage(this.stance, 0, 0);
					app.main.aiChoice2 = Math.random();
					app.main.chance2 = Math.random();
					app.main.detected2 = false;
					this.counter = 0;
				} else if (app.main.chance2 <= .3) {
					this.fight = false;
					this.attacking = false;
					this.basic = false;
					if (this.arms == false) {
						ctx.drawImage(this.stance, 0, 0);
						this.arms = true;
					} else if (this.arms == true) {
						ctx.drawImage(this.stance, 0, 0);
						this.arms = false;
					}
					//ctx.drawImage(this.kickPrep,0,10);
					app.main.aiChoice2 = Math.random();
					app.main.chance2 = Math.random();
					app.main.detected2 = false;
					this.counter = 0;
				}
				//AIR BASIC ATTACK
			} else if (this.attacking == true && this.air == true && this.hit == false && this.down == false && this.intensify == false && this.blasting == false) {
				this.randomEffect = Math.random();
				//this.chance2 = Math.random();
				if (this.counter < 3 && app.main.chance2 > .3) {
					ctx.drawImage(this.punchPrep, 0, 10);
				} else if (this.counter < 3 && app.main.chance2 <= .3) {
					ctx.drawImage(this.kickPrep, 0, 10);
				} else if (this.counter < 5 && app.main.chance2 > .3) {
					if (this.counter < 4) {
						this.stamina += 4;
						this.basic = true;
					} else {
						this.basic = false;
					}
					ctx.drawImage(this.punch, -20, 8);
				} else if (this.counter < 5 && app.main.chance2 <= .3) {
					if (this.counter < 4) {
						this.stamina += 4;
						this.basic = true;
					} else {
						this.basic = false;
					}
					if (this.arms == false) {
						ctx.drawImage(this.kick, -25, 8);
					} else if (this.arms == true) {
						ctx.drawImage(this.knee, -25, 8);
					}
				} else if (app.main.chance2 > .3) {
					this.basic = false;
					ctx.drawImage(this.flyUp, 0, 0);
					this.fight = false;
					this.attacking = false;
					app.main.aiChoice2 = Math.random();
					app.main.chance2 = Math.random();
					app.main.detected2 = false;
					this.counter = 0;
				} else if (app.main.chance2 <= .3) {
					if (this.arms == false) {
						ctx.drawImage(this.flyUp, 0, 0);
						this.arms = true;
					} else if (this.arms == true) {
						ctx.drawImage(this.flyUp, 0, 0);
						this.arms = false;
					}
					this.basic = false;
					//ctx.drawImage(this.kickPrep,0,10);
					this.fight = false;
					this.attacking = false;
					app.main.aiChoice2 = Math.random();
					app.main.chance2 = Math.random();
					app.main.detected2 = false;
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
			} else if (this.attacking == true && this.intensify == true && this.air == false && this.hit == false && this.down == false) {
				this.randomEffect = Math.random();
				this.hard = true;
				//app.main.chance2 = .3;
				if (app.main.chance2 > .6) {
					if (this.counter < 3) {
						ctx.drawImage(this.hardPunchPrep, -15, 28);
					} else if (this.counter < 4) {
						this.stamina += 10;
						this.punching = true;
						ctx.drawImage(this.hardPunch, -45, 28);
					} else if (this.counter < 10) {
						this.punching = false;
						ctx.drawImage(this.hardPunch, -45, 28);
					} else {
						ctx.drawImage(this.stance, 0, 0);
						this.hard = false;
						this.fight = false;
						this.attacking = false;
						this.intensify = false;
						app.main.aiChoice2 = Math.random();
						app.main.chance2 = Math.random();
						this.counter = 0;
						app.main.detectedHard2 = false;
					}
				} else if (app.main.chance2 < .61 && app.main.chance2 > .25) {
					if (this.counter < 3) {
						ctx.drawImage(this.launchPrep, -16, 5);
					} else if (this.counter < 4) {
						this.stamina += 10;
						if (this.focus17 == false) {
							if (app.main.android18.blocking == false && app.main.android18.superSpeed == false) {
								//app.main.android18.stun = true;
								app.main.android18.jumpVelocity = new Victor(0, -30);
								app.main.android18.air = true;
							}
						} else {
							if (app.main.android17.blocking == false && app.main.android17.superSpeed == false) {
								//app.main.android18.stun = true;
								app.main.android17.jumpVelocity = new Victor(0, -30);
								app.main.android17.air = true;
							}
						}
						this.kicking = true;
						ctx.drawImage(this.launchSwing, -60, 10);
					} else if (this.counter < 10) {
						this.kicking = false;
						ctx.drawImage(this.launch, -60, 0);
					} else {
						ctx.drawImage(this.stance, 0, 0);
						this.hard = false;
						this.fight = false;
						this.attacking = false;
						this.intensify = false;
						app.main.aiChoice2 = Math.random();
						app.main.chance2 = Math.random();
						this.counter = 0;
						app.main.detectedHard2 = false;
					}
				} else {
					if (this.counter < 3) {
						ctx.drawImage(this.hardKickPrep, 15, 15);
					} else if (this.counter < 4) {
						this.stamina += 10;
						this.kicking = true;
						ctx.drawImage(this.hardKickSwing, -38, 22);
					} else if (this.counter < 10) {
						this.kicking = false;
						ctx.drawImage(this.hardKick, -38, 22);
					} else {
						ctx.drawImage(this.stance, 0, 0);
						this.hard = false;
						this.fight = false;
						this.attacking = false;
						this.intensify = false;
						app.main.aiChoice2 = Math.random();
						app.main.chance2 = Math.random();
						this.counter = 0;
						app.main.detectedHard2 = false;
					}
				}
				//AIR HARD PUNCH
			} else if (this.attacking == true && this.intensify == true && this.air == true && this.hit == false && this.down == false) {
				this.randomEffect = Math.random();
				this.hard = true;
				if (app.main.chance2 > .5) {
					if (this.counter < 3) {
						ctx.drawImage(this.hardPunchAirPrep, -2, 5);
					} else if (this.counter < 4) {
						this.stamina += 10;
						this.punching = true;
						ctx.drawImage(this.hardPunchAirSwing, -2, 5);
					} else if (this.counter < 10) {
						this.punching = false;
						ctx.drawImage(this.hardPunchAir, -2, 25);
					} else {
						ctx.drawImage(this.flyUp, 0, 0);
						this.hard = false;
						this.fight = false;
						this.attacking = false;
						this.intensify = false;
						app.main.aiChoice2 = Math.random();
						app.main.chance2 = Math.random();
						this.counter = 0;
						app.main.detectedHard2 = false;
					}
				} else {
					if (this.counter < 3) {
						ctx.drawImage(this.hardKickPrep, 20, 15);
					} else if (this.counter < 4) {
						this.stamina += 10;
						this.kicking = true;
						ctx.drawImage(this.hardKick, -38, 20);
					} else if (this.counter < 10) {
						this.kicking = false;
						ctx.drawImage(this.hardKick, -38, 20);
					} else {
						ctx.drawImage(this.flyUp, -38, 20);
						this.hard = false;
						this.fight = false;
						this.attacking = false;
						this.intensify = false;
						app.main.aiChoice2 = Math.random();
						app.main.chance2 = Math.random();
						this.counter = 0;
						app.main.detectedHard2 = false;
					}
				}
				//BURST ATTACK
			} else if (this.attacking == true && this.hit == false && this.intensify == false && this.powerMove == false && this.charging == false) {
				//KEY CHANGE
				if (this.specMove == true && this.specTimer > 50) {
					this.unstoppable = true;
					if (this.counter < 4) {
						ctx.drawImage(this.burst1Vegeta, -20, 0);
						if (this.counter < 2) {
							app.main.sound.playEnergyAttack2(50);
							app.main.sound.playTaunt2(Math.round(getRandom(51, 54)));
						}
					} else if (this.counter < 5) {
						ctx.drawImage(this.burst2Vegeta, -20, 0);
						ctx.save();
						ctx.globalAlpha = .7;
						ctx.drawImage(this.burst1, -105, -80);
						ctx.restore();
					} else if (this.counter < 6) {
						ctx.drawImage(this.burst2Vegeta, -20, 0);
						ctx.save();
						ctx.globalAlpha = .7;
						ctx.drawImage(this.burst2, -105, -80);
						ctx.restore();
						app.main.environment.flash = true;
					} else if (this.counter < 7) {
						ctx.drawImage(this.burst2Vegeta, -20, 0);
						ctx.save();
						ctx.globalAlpha = .7;
						ctx.drawImage(this.burst3, -105, -80);
						ctx.restore();
					} else if (this.counter < 8) {
						ctx.drawImage(this.burst2Vegeta, -20, 0);
						ctx.save();
						ctx.globalAlpha = .7;
						ctx.drawImage(this.burst4, -105, -80);
						ctx.restore();
						//HIT BLAST
						this.energy -= 2;
						if (this.hits17 == true) {
							if (app.main.android17.left == true) {
								if (this.behind == true && this.position.x > app.main.android17.position.x) {
									app.main.android17.velocity.x = -70;
								} else {
									app.main.android17.velocity.x = -70;
								}
							} else {
								if (this.behind == true && this.position.x < app.main.android17.position.x) {
									app.main.android17.velocity.x = 70;
								} else {
									app.main.android17.velocity.x = -70;
								}
							}
							app.main.android17.decel = app.main.android17.velocity.clone();
							this.hits17 = false;
						}
						if (this.hits18 == true) {
							if (app.main.android18.left == true) {
								if (this.behind == true && this.position.x > app.main.android18.position.x) {
									app.main.android18.velocity.x = -70;
								} else {
									app.main.android18.velocity.x = 70;
								}
							} else {
								if (this.behind == true && this.position.x < app.main.android18.position.x) {
									app.main.android18.velocity.x = 70;
								} else {
									app.main.android18.velocity.x = -70;
								}
							}
							app.main.android18.decel = app.main.android18.velocity.clone();
							this.hits18 = false;
						}
					} else if (this.counter < 9) {
						ctx.drawImage(this.burst2Vegeta, -20, 0);
					} else {
						ctx.drawImage(this.burst2Vegeta, -20, 0);
						this.specTimer = 0;
						this.unstoppable = false;
						this.specMove = false;
						this.fight = false;
						this.attacking = false;
						this.blasting = false;
						app.main.aiChoice2 = Math.random();
						app.main.chance2 = Math.random();
						this.counter = 0;
					}
				} else {
					if (this.counter < 3) {
						ctx.drawImage(this.punchPrep, 1, 6);
					} else if (this.counter < 6) {
						if (this.arms == false) {
							if (this.counter < 4) {
								app.main.sound.playEnergyAttack2(5);
								this.energy -= 2;
								if (this.left == true) {
									app.main.blasts.push(new app.Energy(this.position.x, this.position.y + 40, this.left, 1, 0));
								} else {
									app.main.blasts.push(new app.Energy(this.position.x + 70, this.position.y + 40, this.left, 1, 0));
								}
							}
							//console.log("RIGHT");
							ctx.drawImage(this.rightBlast, -28, 5);
						} else if (this.arms == true) {
							if (this.counter < 4) {
								app.main.sound.playEnergyAttack2(5);
								this.energy -= 2;
								if (this.left == true) {
									app.main.blasts.push(new app.Energy(this.position.x, this.position.y + 37, this.left, 1, 0));
								} else {
									app.main.blasts.push(new app.Energy(this.position.x + 60, this.position.y + 37, this.left, 1, 0));
								}
							}
							ctx.drawImage(this.leftBlast, -10, 5);
							//console.log("RIGHT");
						}
					} else {
						if (this.arms == false) {
							this.arms = true;
						} else if (this.arms == true) {
							this.arms = false;
						}
						ctx.drawImage(this.punchPrep, 1, 6);
						this.fight = false;
						this.attacking = false;
						this.blasting = false;
						app.main.aiChoice2 = Math.random();
						app.main.chance2 = Math.random();
						this.counter = 0;
					}
				}
				//POWERFUL BLAST ATTACK
			} else if (this.powerMove == true && this.blasting == true && this.attacking == true && this.hit == false && this.fallingKick == false) {
				//console.log("POWERMOVEEEEE");
				//app.main.chance2 = .4;
				if (app.main.chance2 > .5) {
					if (this.counter < 3) {
						ctx.drawImage(this.attackE, -15, -5);
					} else if (this.counter < 5) {
						ctx.drawImage(this.attackE, -15, -5);
					} else if (this.counter < 6) {
						app.main.sound.playEnergyAttack(25);
						ctx.drawImage(this.attackE, -15, -5);
					} else if (this.counter < 7) {
						ctx.drawImage(this.attackE, -15, -5);
						ctx.drawImage(this.blastCharge1, -27, 20, 10, 14);
					} else if (this.counter < 8) {
						ctx.drawImage(this.attackE, -15, -5);
						ctx.drawImage(this.blastCharge1, -32, 16.5, 15, 21);
					} else if (this.counter < 9) {
						ctx.drawImage(this.attackE, -15, -5);
						ctx.drawImage(this.blastCharge1, -37, 13, 20, 28);
					} else if (this.counter < 10) {
						ctx.drawImage(this.attackE, -15, -5);
						ctx.drawImage(this.blastCharge1, -42, 9.5, 25, 35);
					} else if (this.counter < 11) {
						ctx.drawImage(this.attackE, -15, -5);
						ctx.drawImage(this.blastCharge1, -47, 6, 30, 42);
					} else if (this.counter < 12) {
						ctx.drawImage(this.attackE, -15, -5);
						ctx.drawImage(this.blastCharge1, -52, 2.5, 35, 49);
					} else if (this.counter < 13) {
						ctx.drawImage(this.attackE, -15, -5);
						ctx.drawImage(this.blastCharge1, -52, 2.5, 35, 49);
					} else if (this.counter < 20) {
						this.blastRelease = true;
						if (this.arms == false) {
							if (this.counter < 14) {
								app.main.sound.playEnergyAttack(26);
								this.energy -= 15;
								if (this.left == true) {
									app.main.sound.playTaunt2(26);
									app.main.blasts.push(new app.Energy(this.position.x - 32, this.position.y + 27, this.left, 1, 3));
								} else {
									app.main.sound.playTaunt2(27);
									app.main.blasts.push(new app.Energy(this.position.x + 60, this.position.y + 27, this.left, 1, 3));
								}
							}
							ctx.drawImage(this.attackE, -15, -5);
						} else if (this.arms == true) {
							if (this.counter < 14) {
								app.main.sound.playEnergyAttack(26);
								this.energy -= 15;
								if (this.left == true) {
									app.main.sound.playTaunt2(26);
									app.main.blasts.push(new app.Energy(this.position.x - 32, this.position.y + 27, this.left, 1, 3));
								} else {
									app.main.sound.playTaunt2(27);
									app.main.blasts.push(new app.Energy(this.position.x + 60, this.position.y + 27, this.left, 1, 3));
								}
							}
							ctx.drawImage(this.attackE, -15, -5);
						}
					} else {
						if (this.arms == false) {
							this.arms = true;
						} else if (this.arms == true) {
							this.arms = false;
						}
						app.main.chance2 = Math.random();
						ctx.drawImage(this.attackE, -15, -5);
						this.intensify = false;
						this.powerMove = false;
						this.fight = false;
						this.attacking = false;
						this.blasting = false;
						this.blastRelease = false;
					}
				} else {
					//Blast Barrage
					if (this.counter < 4) {
						ctx.drawImage(this.punchPrep, 1, 6);
					} else if (this.counter < 5) {
						ctx.drawImage(this.punchPrep, 1, 6);
						app.main.sound.playTaunt2(Math.round(getRandom(33, 34)));
					} else if (this.counter < 6) {
						app.main.sound.playEnergyAttack2(5);
						this.energy -= 2;
						if (this.left == true) {
							app.main.blasts.push(new app.Energy(this.position.x, this.position.y + 37, this.left, 1, 0));
						} else {
							app.main.blasts.push(new app.Energy(this.position.x + 60, this.position.y + 37, this.left, 1, 0));
						}
						ctx.drawImage(this.leftBlast, -10, 5);
					} else if (this.counter < 8) {
						ctx.drawImage(this.punchPrep, 1, 6);
					} else if (this.counter < 9) {
						app.main.sound.playEnergyAttack2(5);
						this.energy -= 2;
						if (this.left == true) {
							app.main.blasts.push(new app.Energy(this.position.x, this.position.y + 37, this.left, 1, 0));
						} else {
							app.main.blasts.push(new app.Energy(this.position.x + 60, this.position.y + 37, this.left, 1, 0));
						}
						ctx.drawImage(this.rightBlast, -28, 5);
					} else if (this.counter < 11) {
						ctx.drawImage(this.punchPrep, 1, 6);
					} else if (this.counter < 12) {
						app.main.sound.playEnergyAttack2(5);
						this.energy -= 2;
						if (this.left == true) {
							app.main.blasts.push(new app.Energy(this.position.x, this.position.y + 37, this.left, 1, 0));
						} else {
							app.main.blasts.push(new app.Energy(this.position.x + 60, this.position.y + 37, this.left, 1, 0));
						}
						ctx.drawImage(this.leftBlast, -10, 5);
					} else if (this.counter < 14) {
						ctx.drawImage(this.punchPrep, 1, 6);
					} else if (this.counter < 15) {
						app.main.sound.playEnergyAttack2(5);
						this.energy -= 2;
						if (this.left == true) {
							app.main.blasts.push(new app.Energy(this.position.x, this.position.y + 37, this.left, 1, 0));
						} else {
							app.main.blasts.push(new app.Energy(this.position.x + 60, this.position.y + 37, this.left, 1, 0));
						}
						ctx.drawImage(this.rightBlast, -28, 5);
					} else if (this.counter < 17) {
						ctx.drawImage(this.punchPrep, 1, 6);
					} else if (this.counter < 18) {
						app.main.sound.playEnergyAttack2(5);
						this.energy -= 2;
						if (this.left == true) {
							app.main.blasts.push(new app.Energy(this.position.x, this.position.y + 37, this.left, 1, 0));
						} else {
							app.main.blasts.push(new app.Energy(this.position.x + 60, this.position.y + 37, this.left, 1, 0));
						}
						ctx.drawImage(this.leftBlast, -10, 5);
					} else if (this.counter < 20) {
						ctx.drawImage(this.punchPrep, 1, 6);
					} else if (this.counter < 21) {
						app.main.sound.playEnergyAttack2(5);
						this.energy -= 2;
						if (this.left == true) {
							app.main.blasts.push(new app.Energy(this.position.x, this.position.y + 37, this.left, 1, 0));
						} else {
							app.main.blasts.push(new app.Energy(this.position.x + 60, this.position.y + 37, this.left, 1, 0));
						}
						ctx.drawImage(this.rightBlast, -28, 5);
					} else if (this.counter < 25) {
						ctx.drawImage(this.punchPrep, 1, 6);
					} else {
						if (this.arms == false) {
							this.arms = true;
						} else if (this.arms == true) {
							this.arms = false;
						}
						ctx.drawImage(this.punchPrep, 1, 6);
						app.main.chance2 = Math.random();
						this.intensify = false;
						this.powerMove = false;
						this.fight = false;
						this.attacking = false;
						this.blasting = false;
					}
				}
				//BLOCK
			} else if (this.blocking == true && this.hit == false && (this.stun == false || this.superSpeed == true)) {
				ctx.drawImage(this.block, 0, 10);
				//TAUNT
			} else if (this.taunting == true && this.hit == false && this.hardHit != true) {
				if (this.counter < 25) {
					//this.stun = true;
					ctx.drawImage(this.taunt, 20, 0);
					if (this.counter > 5 && this.counter < 7) {
						app.main.sound.playTaunt2(Math.round(this.tauntPick));
					}
					if (this.hit == true || this.hardHit == true || this.taunting == false) {
						this.aiTaunting = false;
						this.intensify = false;
						this.taunting = false;
						//this.stun = false;
					}
				} else {
					ctx.drawImage(this.taunt, 20, 0);
					//this.counter = 0;
					this.stamina = 28;
					this.exhausted = false;
					//this.stun = false;
					this.intensify = false;
					this.taunting = false;
				}
				//Energy Charge
			} else if (this.charging == true && this.hit == false && this.hardHit != true) {
				if (this.counter < 100) {
					if (this.counter == 5) {
						app.main.sound.playTaunt2(Math.round(getRandom(28, 29)));
					}
					//this.stun = true;
					if (this.counter > 8) {
						this.energy += 2;
					}
					ctx.drawImage(this.charge, 0, 14);
					if (this.counter > 6) {
						if (this.counter < 8) {
							app.main.sound.playEffect(28);
						}
						this.chargeCounter++;
						ctx.save();
						ctx.globalAlpha = .006 * this.energy;
						if (this.chargeCounter < 2) {
							if (this.superForm == false) {
								ctx.drawImage(this.auraWhite1, -73, -100);
							} else {
								ctx.drawImage(this.auraYellow1, -73, -100);
							}
						} else if (this.chargeCounter < 3) {
							if (this.superForm == false) {
								ctx.drawImage(this.auraWhite2, -73, -100);
							} else {
								ctx.drawImage(this.auraYellow2, -73, -100);
							}
						} else if (this.chargeCounter < 4) {
							if (this.superForm == false) {
								ctx.drawImage(this.auraWhite3, -73, -100);
							} else {
								ctx.drawImage(this.auraYellow3, -73, -100);
							}
						} else if (this.chargeCounter < 5) {
							if (this.superForm == false) {
								ctx.drawImage(this.auraWhite4, -73, -100);
							} else {
								ctx.drawImage(this.auraYellow4, -73, -100);
							}
							this.chargeCounter = 0;
						}
						ctx.restore();
					}
					if (this.energy > 99) {
						app.main.sound.stopEffect();
						//Play voice
						//this.stun = false;
						this.intensify = false;
						this.charging = false;
					}
					if (this.hit == true || this.hardHit == true || this.charging == false) {
						app.main.sound.stopEffect();
						this.aiCharging = false;
						this.intensify = false;
						this.charging = false;
						//this.stun = false;
					}

					/*
     if(this.counter > 19 && this.counter < 21){
     	app.main.sound.playTaunt2(Math.round(this.tauntPick));
     }
     */
				} else {
					ctx.drawImage(this.charge, 0, 14);
					//this.stun = false;
					this.intensify = false;
					this.charging = false;
				}
				//Scene
			} else if (this.sceneOpen == true) {
				this.stun = true;
				if (this.scenePlay == true) {
					this.chargeCounter++;
					this.sceneCounter++;
				}
				if (this.sceneCounter > 2) {
					ctx.save();
					ctx.globalAlpha = .006 * this.energy;
					if (this.chargeCounter < 2) {
						if (this.superForm == false) {
							ctx.drawImage(this.auraWhite1, -73, -100);
						} else {
							ctx.drawImage(this.auraYellow1, -73, -100);
						}
					} else if (this.chargeCounter < 3) {
						if (this.superForm == false) {
							ctx.drawImage(this.auraWhite2, -73, -100);
						} else {
							ctx.drawImage(this.auraYellow2, -73, -100);
						}
					} else if (this.chargeCounter < 4) {
						if (this.superForm == false) {
							ctx.drawImage(this.auraWhite3, -73, -100);
						} else {
							ctx.drawImage(this.auraYellow3, -73, -100);
						}
					} else if (this.chargeCounter < 5) {
						if (this.superForm == false) {
							ctx.drawImage(this.auraWhite4, -73, -100);
						} else {
							ctx.drawImage(this.auraYellow4, -73, -100);
						}
						this.chargeCounter = 0;
					}
					ctx.restore();
				}

				if (this.sceneCounter < 1) {
					ctx.drawImage(this.pose1Vegeta, 0, -10);
				} else if (this.sceneCounter < 2) {
					ctx.drawImage(this.special1Vegeta, 0, -10);
				} else if (this.sceneCounter < 3) {
					ctx.drawImage(this.special1Vegeta, 0, -10);
					//ctx.drawImage(this.pose2Vegeta,5,20);
				} else if (this.sceneCounter < 70) {
					app.main.environment.powerUp = true;
					ctx.drawImage(this.pose3Vegeta, 5, 17);
				} else if (this.sceneCounter < 120) {
					this.superForm = true;
					app.main.environment.superFlash = true;
					app.main.environment.decay = true;
					app.main.android18.velocity.x += 10;
					app.main.android18.decelerate();
					if (this.sceneCounter < 71) {
						app.main.sound.playEffect(28);
					}
					if (this.sceneCounter < 120 && this.sceneCounter > 118) {
						app.main.sound.playTaunt2(32);
					}
					ctx.drawImage(this.pose4Vegeta, 5, 20);
				} else {
					ctx.drawImage(this.pose4Vegeta, 5, 20);
					app.main.environment.powerUp = false;
					this.scenePlay = false;
					this.sceneOpen = false;
					this.sceneCounter = 0;
				}
				//BASIC HIT
			} else if (this.hit == true && this.hardHit == false && this.end == false) {
				if (this.stunCounter < 3) {
					if (this.focus17 == false) {
						if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
							app.main.roundScore += 21;
						} else if (app.main.android17.attacking == true) {
							app.main.roundScore2 += 21;
						}
					} else if (this.focus17 == true) {
						if (app.main.android17.attacking == true) {
							app.main.roundScore2 += 21;
						} else if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
							app.main.roundScore += 21;
						}
					}
					this.stun = true;
					ctx.drawImage(this.hit1, 5, 0);
				} else {
					this.defBreak++;
					ctx.drawImage(this.hit1, 5, 0);
					this.stun = false;
					this.hit = false;
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
			} else if (this.hardHit == true && this.hit == true && (this.air == false || this.blasted == true) && this.end == false) {
				if (this.stunCounter < 22) {
					this.voiceChance = Math.random();
					if (this.stunCounter < 4 && this.stunCounter > 2 && this.voiceChance > .5 && this.end == false) {
						app.main.sound.playTaunt2(Math.round(getRandom(66, 68)));
					}
					if (this.focus17 == false) {
						if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
							app.main.roundScore += 7;
						} else if (app.main.android17.attacking == true) {
							app.main.roundScore2 += 7;
						}
					} else if (this.focus17 == true) {
						if (app.main.android17.attacking == true) {
							app.main.roundScore2 += 7;
						} else if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
							app.main.roundScore += 7;
						}
					}
					this.stun = true;
					ctx.drawImage(this.hitHard, 5, 20);
				} else {
					ctx.drawImage(this.hitHard, 5, 20);
					this.stun = false;
					this.hardHit = false;
					this.hit = false;
					this.blasted = false;
				}
				//HARD HIT AIR
			} else if (this.hardHit == true && this.hit == true && this.air == true && this.end == false) {
				if (this.punched == true) {
					if (this.stunCounter < 22) {
						this.voiceChance = Math.random();
						if (this.stunCounter < 4 && this.stunCounter > 2 && this.voiceChance > .5 && this.end == false) {
							app.main.sound.playTaunt2(Math.round(getRandom(66, 68)));
						}
						if (this.focus17 == false) {
							if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
								app.main.roundScore += 7;
							} else if (app.main.android17.attacking == true) {
								app.main.roundScore2 += 7;
							}
						} else if (this.focus17 == true) {
							if (app.main.android17.attacking == true) {
								app.main.roundScore2 += 7;
							} else if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
								app.main.roundScore += 7;
							}
						}
						this.stun = true;
						ctx.drawImage(this.fallDown, 5, 20);
					} else {
						ctx.drawImage(this.fallDown, 5, 20);
						this.stun = false;
						this.hardHit = false;
						this.hit = false;
					}
				} else {
					if (this.stunCounter < 22) {
						this.voiceChance = Math.random();
						if (this.stunCounter < 4 && this.stunCounter > 2 && this.voiceChance > .5 && this.end == false) {
							app.main.sound.playTaunt2(Math.round(getRandom(66, 68)));
						}
						if (this.focus17 == false) {
							if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
								app.main.roundScore += 7;
							} else if (app.main.android17.attacking == true) {
								app.main.roundScore2 += 7;
							}
						} else if (this.focus17 == true) {
							if (app.main.android17.attacking == true) {
								app.main.roundScore2 += 7;
							} else if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
								app.main.roundScore += 7;
							}
						}
						this.stun = true;
						ctx.drawImage(this.fallSide, 5, 20);
					} else {
						ctx.drawImage(this.fallSide, 5, 20);
						this.stun = false;
						this.hardHit = false;
						this.hit = false;
					}
				}
			} else if (this.end == true) {
				this.effortTimer++;
				if (this.lastEffort == false) {
					this.hits17 = true;
					this.hits18 = true;
					if (this.effortTimer < 4) {
						ctx.drawImage(this.struggle1Vegeta, -20, 0);
						if (this.counter < 2) {
							app.main.sound.playEnergyAttack2(50);
							//app.main.sound.playTaunt2(Math.round(getRandom(51,54)));
						}
					} else if (this.effortTimer < 5) {
						ctx.drawImage(this.struggle1Vegeta, -20, 0);
						ctx.save();
						ctx.globalAlpha = .7;
						ctx.drawImage(this.burst1, -105, -80);
						ctx.restore();
					} else if (this.effortTimer < 6) {
						ctx.drawImage(this.struggle1Vegeta, -20, 0);
						ctx.save();
						ctx.globalAlpha = .7;
						ctx.drawImage(this.burst2, -105, -80);
						ctx.restore();
						app.main.environment.flash = true;
					} else if (this.effortTimer < 7) {
						ctx.drawImage(this.struggle1Vegeta, -20, 0);
						ctx.save();
						ctx.globalAlpha = .7;
						ctx.drawImage(this.burst3, -105, -80);
						ctx.restore();
					} else if (this.effortTimer < 8) {
						ctx.drawImage(this.struggle1Vegeta, -20, 0);
						ctx.save();
						ctx.globalAlpha = .7;
						ctx.drawImage(this.burst4, -105, -80);
						ctx.restore();
						//HIT BLAST
						this.energy -= 2;
						if (this.hits17 == true) {
							if (app.main.android17.left == true) {
								if (this.behind == true && this.position.x > app.main.android17.position.x) {
									app.main.android17.velocity.x = -70;
								} else {
									app.main.android17.velocity.x = -70;
								}
							} else {
								if (this.behind == true && this.position.x < app.main.android17.position.x) {
									app.main.android17.velocity.x = 70;
								} else {
									app.main.android17.velocity.x = -70;
								}
							}
							app.main.android17.decel = app.main.android17.velocity.clone();
							this.hits17 = false;
						}
						if (this.hits18 == true) {
							if (app.main.android18.left == true) {
								if (this.behind == true && this.position.x > app.main.android18.position.x) {
									app.main.android18.velocity.x = -70;
								} else {
									app.main.android18.velocity.x = 70;
								}
							} else {
								if (this.behind == true && this.position.x < app.main.android18.position.x) {
									app.main.android18.velocity.x = 70;
								} else {
									app.main.android18.velocity.x = -70;
								}
							}
							app.main.android18.decel = app.main.android18.velocity.clone();
							this.hits18 = false;
						}
					} else if (this.effortTimer < 9) {
						ctx.drawImage(this.burst2Vegeta, -20, 0);
					} else {
						ctx.drawImage(this.burst2Vegeta, -20, 0);
						this.lastEffort = true;
						//this.counter = 0;
					}
				}
				if (this.air == true && this.lastEffort == true) {
					this.stun = true;
					ctx.drawImage(this.fallDown, 5, 20);
				} else if (this.air == false && this.lastEffort == true) {
					this.unable = true;
					this.stun = true;
					if (this.stunCounter < 2) {
						ctx.drawImage(this.hitHard, 5, 20);
					} else {
						ctx.drawImage(this.groundVegeta, 5, 95);
					}
					if (this.deadCount == false) {
						app.main.kills += 1;
						this.deadCount = true;
					}
					if (this.stunCounter > 40) {
						//app.main.sound.playEffect(57);
						this.vanish = true;
						app.main.environment.deathVegetaDirLeft = this.left;
						app.main.environment.deathLocationVegeta = new Victor(this.position.x, this.position.y);
						this.dead = true;
					}
				}
			}
			ctx.restore();
		} //end if

		// ------------ DRAWS FOR GERO ---------------------------------------------
		// ------------ DRAWS FOR GERO ---------------------------------------------
		// ------------ DRAWS FOR GERO ---------------------------------------------

		if (this.vanish == false && this.gero == true) {
			ctx.save();
			ctx.scale(2, 2);
			//NON MOVING DRAWS
			if (this.velocity.x == 0 && this.attacking != true && this.blocking != true && this.taunting != true && this.hit == false && this.hardHit != true) {
				if (this.up == true && this.flying == true || this.jumpVelocity.y < 15 && this.air == true) {
					ctx.drawImage(this.flyUpGero, 0, 0);
				} else if (this.down == true && this.air == true) {
					ctx.drawImage(this.flyDownFastGero, 0, 0);
				} else if (this.down == false && this.air == true && this.up == false) {
					ctx.drawImage(this.flyDownSlowGero, 0, 0);
				} else if (this.exhausted == true) {
					ctx.drawImage(this.injuredGero, -13, 0);
				} else {
					ctx.drawImage(this.stanceGero, 0, 0);
				}
				//MOVING DRAWS
			} else if (this.velocity.x != 0 && this.attacking != true && this.blocking != true && this.hit == false && this.hardHit != true) {
				//&& (this.fallingKick == false || this.air == false)
				if (this.slow == true && this.reverse == false) {
					ctx.drawImage(this.slowFlyGero, 0, 0);
				} else if (this.fast == true && this.reverse == false) {
					ctx.drawImage(this.fastFlyGero, 0, 0);
				} else if (this.reverse == true) {
					ctx.drawImage(this.moveReverseGero, 0, 0);
				} else if (this.air == true && this.up == false) {
					ctx.drawImage(this.flyDownSlowGero, 0, 0);
				} else if (this.exhausted == true) {
					ctx.drawImage(this.injuredGero, -13, 0);
				} else {
					ctx.drawImage(this.stanceGero, 0, 0);
				}
				//BASIC ATTACK
			} else if (this.attacking == true && this.air == false && this.hit == false && this.blasting == false && this.intensify == false) {
				this.randomEffect = Math.random();
				//this.chance2 = Math.random();
				if (this.counter < 3 && app.main.chance2 > .3) {
					ctx.drawImage(this.punchPrepGero, -10, 10);
				} else if (this.counter < 3 && app.main.chance2 <= .3) {
					ctx.drawImage(this.kickPrepGero, -10, 10);
				} else if (this.counter < 5 && app.main.chance2 > .3) {
					if (this.counter < 4) {
						this.stamina += 4;
						this.basic = true;
						//console.log("attack");//action
					} else {
						this.basic = false;
					}
					if (this.arms == false) {
						ctx.drawImage(this.leftPunchGero, -20, 8);
					} else if (this.arms == true) {
						ctx.drawImage(this.rightPunchGero, -20, 8);
					}
				} else if (this.counter < 5 && app.main.chance2 <= .3) {
					if (this.counter < 4) {
						this.stamina += 4;
						this.basic = true;
					} else {
						this.basic = false;
					}
					ctx.drawImage(this.kickGero, -25, 8);
				} else if (app.main.chance2 > .3) {
					if (this.arms == false) {
						this.arms = true;
					} else if (this.arms == true) {
						this.arms = false;
					}
					this.fight = false;
					this.attacking = false;
					this.basic = false;
					ctx.drawImage(this.punchPrepGero, -10, 10);
					app.main.aiChoice2 = Math.random();
					app.main.chance2 = Math.random();
					app.main.detected2 = false;
					this.counter = 0;
				} else if (app.main.chance2 <= .3) {
					this.fight = false;
					this.attacking = false;
					this.basic = false;
					ctx.drawImage(this.kickGero, -25, 8);
					app.main.aiChoice2 = Math.random();
					app.main.chance2 = Math.random();
					app.main.detected2 = false;
					this.counter = 0;
				}
				//AIR BASIC ATTACK
			} else if (this.attacking == true && this.air == true && this.hit == false && this.down == false && this.intensify == false && this.blasting == false) {
				this.randomEffect = Math.random();
				//this.chance2 = Math.random();
				if (this.counter < 3 && app.main.chance2 > .3) {
					ctx.drawImage(this.punchPrepGero, 0, 10);
				} else if (this.counter < 3 && app.main.chance2 <= .3) {
					ctx.drawImage(this.kickPrepGero, 0, 10);
				} else if (this.counter < 5 && app.main.chance2 > .3) {
					if (this.counter < 4) {
						this.stamina += 4;
						this.basic = true;
						//console.log("attack");//action
					} else {
						this.basic = false;
					}
					if (this.arms == false) {
						ctx.drawImage(this.leftPunchGero, -20, 8);
					} else if (this.arms == true) {
						ctx.drawImage(this.rightPunchGero, -20, 8);
					}
				} else if (this.counter < 5 && app.main.chance2 <= .3) {
					if (this.counter < 4) {
						this.stamina += 4;
						this.basic = true;
					} else {
						this.basic = false;
					}
					ctx.drawImage(this.kickGero, -25, 8);
				} else if (app.main.chance2 > .3) {
					if (this.arms == false) {
						this.arms = true;
					} else if (this.arms == true) {
						this.arms = false;
					}
					this.fight = false;
					this.attacking = false;
					this.basic = false;
					ctx.drawImage(this.punchPrepGero, 0, 10);
					app.main.aiChoice2 = Math.random();
					app.main.chance2 = Math.random();
					app.main.detected2 = false;
					this.counter = 0;
				} else if (app.main.chance2 <= .3) {
					this.fight = false;
					this.attacking = false;
					this.basic = false;
					ctx.drawImage(this.kickPrepGero, 0, 10);
					app.main.aiChoice2 = Math.random();
					app.main.chance2 = Math.random();
					app.main.detected2 = false;
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
			} else if (this.attacking == true && this.intensify == true && this.air == false && this.hit == false && this.down == false) {
				this.randomEffect = Math.random();
				this.hard = true;
				//app.main.chance2 = .3;
				if (app.main.chance2 > .6) {
					if (this.counter < 5) {
						ctx.drawImage(this.hardPunchPrep, -15, 28);
					} else if (this.counter < 6) {
						this.stamina += 10;
						this.punching = true;
						ctx.drawImage(this.hardPunch, -45, 28);
					} else if (this.counter < 10) {
						this.punching = false;
						ctx.drawImage(this.hardPunch, -45, 28);
					} else {
						ctx.drawImage(this.hardPunchPrep, -15, 28);
						this.hard = false;
						this.fight = false;
						this.attacking = false;
						this.intensify = false;
						app.main.aiChoice2 = Math.random();
						app.main.chance2 = Math.random();
						this.counter = 0;
						app.main.detectedHard2 = false;
					}
				} else if (app.main.chance2 < .61 && app.main.chance2 > .25) {
					if (this.counter < 5) {
						ctx.drawImage(this.launchPrep, -16, 5);
					} else if (this.counter < 6) {
						this.stamina += 10;
						if (app.main.android18.blocking == false && app.main.android18.superSpeed == false) {
							app.main.android18.stun = true;
							app.main.android18.jumpVelocity = new Victor(0, -30);
							app.main.android18.air = true;
						}
						this.kicking = true;
						ctx.drawImage(this.launchSwing, -60, 10);
					} else if (this.counter < 10) {
						this.kicking = false;
						ctx.drawImage(this.launch, -60, 0);
					} else {
						ctx.drawImage(this.launchPrep, -16, 5);
						this.hard = false;
						this.fight = false;
						this.attacking = false;
						this.intensify = false;
						app.main.aiChoice2 = Math.random();
						app.main.chance2 = Math.random();
						this.counter = 0;
						app.main.detectedHard2 = false;
					}
				} else {
					if (this.counter < 5) {
						ctx.drawImage(this.hardKickPrep, 15, 15);
					} else if (this.counter < 6) {
						this.stamina += 10;
						this.kicking = true;
						ctx.drawImage(this.hardKickSwing, -38, 22);
					} else if (this.counter < 10) {
						this.kicking = false;
						ctx.drawImage(this.hardKick, -38, 22);
					} else {
						ctx.drawImage(this.hardKickPrep, 15, 15);
						this.hard = false;
						this.fight = false;
						this.attacking = false;
						this.intensify = false;
						app.main.aiChoice2 = Math.random();
						app.main.chance2 = Math.random();
						this.counter = 0;
						app.main.detectedHard2 = false;
					}
				}
				//AIR HARD PUNCH
			} else if (this.attacking == true && this.intensify == true && this.air == true && this.hit == false && this.down == false) {
				this.randomEffect = Math.random();
				this.hard = true;
				if (app.main.chance2 > .5) {
					if (this.counter < 5) {
						ctx.drawImage(this.hardPunchAirPrep, -2, 5);
					} else if (this.counter < 6) {
						this.stamina += 10;
						this.punching = true;
						ctx.drawImage(this.hardPunchAirSwing, -2, 5);
					} else if (this.counter < 10) {
						this.punching = false;
						ctx.drawImage(this.hardPunchAir, -2, 25);
					} else {
						ctx.drawImage(this.hardPunchAir, -2, 25);
						this.hard = false;
						this.fight = false;
						this.attacking = false;
						this.intensify = false;
						app.main.aiChoice2 = Math.random();
						app.main.chance2 = Math.random();
						this.counter = 0;
						app.main.detectedHard2 = false;
					}
				} else {
					if (this.counter < 5) {
						ctx.drawImage(this.hardKickPrep, 20, 15);
					} else if (this.counter < 6) {
						this.stamina += 10;
						this.kicking = true;
						ctx.drawImage(this.hardKick, -38, 20);
					} else if (this.counter < 10) {
						this.kicking = false;
						ctx.drawImage(this.hardKick, -38, 20);
					} else {
						ctx.drawImage(this.hardKickPrep, 20, 15);
						this.hard = false;
						this.fight = false;
						this.attacking = false;
						this.intensify = false;
						app.main.aiChoice2 = Math.random();
						app.main.chance2 = Math.random();
						this.counter = 0;
						app.main.detectedHard2 = false;
					}
				}
				//BLAST ATTACK
			} else if (this.attacking == true && this.hit == false && this.intensify == false) {
				if (this.counter < 3) {
					ctx.drawImage(this.punchPrep, 1, 6);
					if (this.arms == false) {
						this.arms = true;
					} else if (this.arms == true) {
						this.arms = false;
					}
				} else if (this.counter < 6) {
					if (this.arms == false) {
						if (this.counter < 4) {
							app.main.sound.playEnergyAttack2(5);
							this.energy -= 2;
							if (this.left == true) {
								app.main.blasts.push(new app.Energy(this.position.x, this.position.y + 37, this.left, 0));
							} else {
								app.main.blasts.push(new app.Energy(this.position.x + 60, this.position.y + 37, this.left, 0));
							}
						}
						//console.log("RIGHT");
						ctx.drawImage(this.rightBlast, -15, 11);
					} else if (this.arms == true) {
						if (this.counter < 4) {
							app.main.sound.playEnergyAttack2(5);
							this.energy -= 2;
							if (this.left == true) {
								app.main.blasts.push(new app.Energy(this.position.x, this.position.y + 47, this.left, 0));
							} else {
								app.main.blasts.push(new app.Energy(this.position.x + 60, this.position.y + 47, this.left, 0));
							}
						}
						ctx.drawImage(this.leftBlast, -18, 5);
						//console.log("RIGHT");
					}
				} else {
					ctx.drawImage(this.punchPrep, 1, 6);
					this.fight = false;
					this.attacking = false;
					this.blasting = false;
					app.main.aiChoice2 = Math.random();
					app.main.chance2 = Math.random();
					this.counter = 0;
				}
				//BLOCK
			} else if (this.blocking == true && this.hit == false && (this.stun == false || this.superSpeed == true)) {
				ctx.drawImage(this.block, 0, 10);
				//TAUNT
			} else if (this.taunting == true && this.hit == false && this.hardHit != true) {
				if (this.counter < 25) {
					this.stun = true;
					ctx.drawImage(this.taunt, 20, 0);
					if (this.counter > 5 && this.counter < 7) {
						app.main.sound.playTaunt2(Math.round(this.tauntPick));
					}
				} else {
					ctx.drawImage(this.taunt, 20, 0);
					//this.counter = 0;
					this.stamina = 28;
					this.exhausted = false;
					this.stun = false;
					this.intensify = false;
					this.taunting = false;
				}
				//BASIC HIT
			} else if (this.hit == true && this.hardHit == false && this.end == false) {
				if (this.stunCounter < 3) {
					if (this.focus17 == false) {
						if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
							app.main.roundScore += 21;
						} else if (app.main.android17.attacking == true) {
							app.main.roundScore2 += 21;
						}
					} else if (this.focus17 == true) {
						if (app.main.android17.attacking == true) {
							app.main.roundScore2 += 21;
						} else if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
							app.main.roundScore += 21;
						}
					}
					this.stun = true;
					ctx.drawImage(this.hit1Gero, -5, 0);
				} else {
					this.defBreak++;
					ctx.drawImage(this.hit1Gero, -5, 0);
					this.stun = false;
					this.hit = false;
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
			} else if (this.hardHit == true && this.hit == true && (this.air == false || this.blasted == true) && this.end == false) {
				if (this.stunCounter < 22) {
					if (this.focus17 == false) {
						if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
							app.main.roundScore += 7;
						} else if (app.main.android17.attacking == true) {
							app.main.roundScore2 += 7;
						}
					} else if (this.focus17 == true) {
						if (app.main.android17.attacking == true) {
							app.main.roundScore2 += 7;
						} else if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
							app.main.roundScore += 7;
						}
					}
					this.stun = true;
					ctx.drawImage(this.hitHardGero, -5, 0);
				} else {
					ctx.drawImage(this.hitHardGero, -5, 0);
					this.stun = false;
					this.hardHit = false;
					this.hit = false;
					this.blasted = false;
				}
				//HARD HIT AIR
			} else if (this.hardHit == true && this.hit == true && this.air == true && this.end == false) {
				if (this.punched == true) {
					if (this.stunCounter < 22) {
						if (this.focus17 == false) {
							if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
								app.main.roundScore += 7;
							} else if (app.main.android17.attacking == true) {
								app.main.roundScore2 += 7;
							}
						} else if (this.focus17 == true) {
							if (app.main.android17.attacking == true) {
								app.main.roundScore2 += 7;
							} else if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
								app.main.roundScore += 7;
							}
						}
						this.stun = true;
						ctx.drawImage(this.fallDownGero, -5, 20);
					} else {
						ctx.drawImage(this.fallDownGero, -5, 20);
						this.stun = false;
						this.hardHit = false;
						this.hit = false;
					}
				} else {
					if (this.stunCounter < 22) {
						if (this.focus17 == false) {
							if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
								app.main.roundScore += 7;
							} else if (app.main.android17.attacking == true) {
								app.main.roundScore2 += 7;
							}
						} else if (this.focus17 == true) {
							if (app.main.android17.attacking == true) {
								app.main.roundScore2 += 7;
							} else if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
								app.main.roundScore += 7;
							}
						}
						this.stun = true;
						ctx.drawImage(this.fallSideGero, -5, 20);
					} else {
						ctx.drawImage(this.fallSideGero, -5, 20);
						this.stun = false;
						this.hardHit = false;
						this.hit = false;
					}
				}
			}
			ctx.restore();
		} //end if


		// ------------ DRAWS FOR PICCOLO ---------------------------------------------
		// ------------ DRAWS FOR PICCOLO ---------------------------------------------
		// ------------ DRAWS FOR PICCOLO ---------------------------------------------

		if (this.vanish == false && this.piccolo == true) {
			ctx.save();
			ctx.scale(.8, .8);
			//NON MOVING DRAWS
			if (this.velocity.x == 0 && this.attacking != true && this.blocking != true && this.taunting != true && this.charging != true && this.hit == false && this.hardHit != true && this.sceneOpen == false && this.end == false) {
				if (this.up == true && this.flying == true || this.jumpVelocity.y < 15 && this.air == true) {
					if (this.lookUp == true) {
						ctx.drawImage(this.flyUpUpPiccolo, 10, -20);
					} else if (this.lookDown == true) {
						ctx.drawImage(this.flyUpDownPiccolo, 10, -20);
					} else {
						ctx.drawImage(this.flyUpPiccolo, 10, -20);
					}
				} else if (this.down == true && this.air == true) {
					ctx.drawImage(this.flyDownFastPiccolo, 10, -40);
				} else if (this.down == false && this.air == true && this.up == false) {
					ctx.drawImage(this.flyDownSlowPiccolo, 10, -40);
				} else if (this.exhausted == true) {
					ctx.drawImage(this.injuredPiccolo, 0, 0);
				} else {
					if (this.lookUp == true) {
						ctx.drawImage(this.stanceUpPiccolo, 0, 0);
					} else if (this.lookDown == true) {
						ctx.drawImage(this.stanceDownPiccolo, 0, 0);
					} else {
						ctx.drawImage(this.stancePiccolo, 0, 0);
					}
				}
				//MOVING DRAWS
			} else if (this.velocity.x != 0 && this.attacking != true && this.blocking != true && this.hit == false && this.hardHit != true && this.taunting != true && this.charging != true && this.end == false) {
				//&& (this.fallingKick == false || this.air == false)
				if (this.slow == true && this.reverse == false) {
					ctx.drawImage(this.slowFlyPiccolo, 0, 0);
				} else if (this.fast == true && this.reverse == false) {
					ctx.drawImage(this.fastFlyPiccolo, 0, 10);
				} else if (this.reverse == true) {
					ctx.drawImage(this.moveReversePiccolo, 0, 0);
				} else if (this.air == true && this.up == false) {
					ctx.drawImage(this.flyDownSlowPiccolo, 0, 0);
				} else if (this.exhausted == true) {
					ctx.drawImage(this.injuredPiccolo, 0, 0);
				} else {
					if (this.lookUp == true) {
						ctx.drawImage(this.stanceUpPiccolo, 0, 0);
					} else if (this.lookDown == true) {
						ctx.drawImage(this.stanceDownPiccolo, 0, 0);
					} else {
						ctx.drawImage(this.stancePiccolo, 0, 0);
					}
				}
				//BASIC ATTACK
			} else if (this.attacking == true && this.air == false && this.hit == false && this.blasting == false && this.intensify == false) {
				this.randomEffect = Math.random();
				//this.chance2 = Math.random();
				//app.main.chance2 = .2;
				if (this.counter < 3 && app.main.chance2 < .3) {
					ctx.drawImage(this.punchPrepPiccolo, 20, -10);
				} else if (this.counter < 3 && app.main.chance2 >= .3) {
					if (this.arms == false) {
						ctx.drawImage(this.kickPrepPiccolo, -10, -5);
					} else if (this.arms == true) {
						ctx.drawImage(this.kneePrepPiccolo, 0, -5);
					}
				} else if (this.counter < 5 && app.main.chance2 < .3) {
					if (this.counter < 4) {
						this.stamina += 4;
						this.basic = true;
						//console.log("attack");//action
					} else {
						this.basic = false;
					}
					ctx.drawImage(this.punchPiccolo, 0, -8);
				} else if (this.counter < 5 && app.main.chance2 >= .3) {
					if (this.counter < 4) {
						this.stamina += 4;
						this.basic = true;
					} else {
						this.basic = false;
					}
					if (this.arms == false) {
						ctx.drawImage(this.kickPiccolo, -35, -8);
					} else if (this.arms == true) {
						ctx.drawImage(this.kneePiccolo, -25, -8);
					}
				} else if (app.main.chance2 < .3) {
					this.fight = false;
					this.attacking = false;
					this.basic = false;
					ctx.drawImage(this.stancePiccolo, 0, 0);
					app.main.aiChoice2 = Math.random();
					app.main.chance2 = Math.random();
					app.main.detected2 = false;
					this.counter = 0;
				} else if (app.main.chance2 >= .3) {
					this.fight = false;
					this.attacking = false;
					this.basic = false;
					if (this.arms == false) {
						ctx.drawImage(this.stancePiccolo, 0, 0);
						this.arms = true;
					} else if (this.arms == true) {
						ctx.drawImage(this.stancePiccolo, 0, 0);
						this.arms = false;
					}
					app.main.aiChoice2 = Math.random();
					app.main.chance2 = Math.random();
					app.main.detected2 = false;
					this.counter = 0;
				}
				//AIR BASIC ATTACK
			} else if (this.attacking == true && this.air == true && this.hit == false && this.down == false && this.intensify == false && this.blasting == false) {
				this.randomEffect = Math.random();
				//this.chance2 = Math.random();
				//app.main.chance2 = .2;
				if (this.counter < 3 && app.main.chance2 < .3) {
					ctx.drawImage(this.punchPrepPiccolo, 20, -10);
				} else if (this.counter < 3 && app.main.chance2 >= .3) {
					if (this.arms == false) {
						ctx.drawImage(this.kickPrepPiccolo, -10, -5);
					} else if (this.arms == true) {
						ctx.drawImage(this.kneePrepPiccolo, 0, -5);
					}
				} else if (this.counter < 5 && app.main.chance2 < .3) {
					if (this.counter < 4) {
						this.stamina += 4;
						this.basic = true;
						//console.log("attack");//action
					} else {
						this.basic = false;
					}
					ctx.drawImage(this.punchPiccolo, 0, -8);
				} else if (this.counter < 5 && app.main.chance2 >= .3) {
					if (this.counter < 4) {
						this.stamina += 4;
						this.basic = true;
					} else {
						this.basic = false;
					}
					if (this.arms == false) {
						ctx.drawImage(this.kickPiccolo, -35, -8);
					} else if (this.arms == true) {
						ctx.drawImage(this.kneePiccolo, -25, -8);
					}
				} else if (app.main.chance2 < .3) {
					this.fight = false;
					this.attacking = false;
					this.basic = false;
					ctx.drawImage(this.flyUpPiccolo, 0, -20);
					app.main.aiChoice2 = Math.random();
					app.main.chance2 = Math.random();
					app.main.detected2 = false;
					this.counter = 0;
				} else if (app.main.chance2 >= .3) {
					this.fight = false;
					this.attacking = false;
					this.basic = false;
					if (this.arms == false) {
						ctx.drawImage(this.flyUpPiccolo, 0, -20);
						this.arms = true;
					} else if (this.arms == true) {
						ctx.drawImage(this.flyUpPiccolo, 0, -20);
						this.arms = false;
					}
					app.main.aiChoice2 = Math.random();
					app.main.chance2 = Math.random();
					app.main.detected2 = false;
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
			} else if (this.attacking == true && this.intensify == true && this.air == false && this.hit == false && this.down == false) {
				this.randomEffect = Math.random();
				this.hard = true;
				//app.main.chance2 = .7;
				if (app.main.chance2 > .6) {
					if (this.counter < 3) {
						ctx.drawImage(this.hardPunchPrepPiccolo, -10, -5);
					} else if (this.counter < 4) {
						this.stamina += 10;
						this.punching = true;
						ctx.drawImage(this.hardPunchPiccolo, -35, 15);
					} else if (this.counter < 10) {
						this.punching = false;
						ctx.drawImage(this.hardPunchPiccolo, -35, 15);
					} else {
						ctx.drawImage(this.stancePiccolo, 0, 0);
						this.hard = false;
						this.fight = false;
						this.attacking = false;
						this.intensify = false;
						app.main.aiChoice2 = Math.random();
						app.main.chance2 = Math.random();
						this.counter = 0;
						app.main.detectedHard2 = false;
					}
				} else if (app.main.chance2 < .61 && app.main.chance2 > .25) {
					if (this.counter < 3) {
						ctx.drawImage(this.launchPrepPiccolo, 36, -15);
					} else if (this.counter < 4) {
						this.stamina += 10;
						if (this.focus17 == false) {
							if (app.main.android18.blocking == false && app.main.android18.superSpeed == false) {
								//app.main.android18.stun = true;
								app.main.android18.jumpVelocity = new Victor(0, -30);
								app.main.android18.air = true;
							}
						} else {
							if (app.main.android17.blocking == false && app.main.android17.superSpeed == false) {
								//app.main.android18.stun = true;
								app.main.android17.jumpVelocity = new Victor(0, -30);
								app.main.android17.air = true;
							}
						}
						this.kicking = true;
						ctx.drawImage(this.launchSwingPiccolo, -60, -25);
					} else if (this.counter < 10) {
						this.kicking = false;
						ctx.drawImage(this.launchPiccolo, -60, -15);
					} else {
						ctx.drawImage(this.stancePiccolo, 0, 0);
						this.hard = false;
						this.fight = false;
						this.attacking = false;
						this.intensify = false;
						app.main.aiChoice2 = Math.random();
						app.main.chance2 = Math.random();
						this.counter = 0;
						app.main.detectedHard2 = false;
					}
				} else {
					if (this.counter < 3) {
						ctx.drawImage(this.hardKickPrepPiccolo, 28, -25);
					} else if (this.counter < 4) {
						this.stamina += 10;
						this.kicking = true;
						ctx.drawImage(this.hardKickPiccolo, -18, -30);
					} else if (this.counter < 10) {
						this.kicking = false;
						ctx.drawImage(this.hardKickPiccolo, -18, -30);
					} else {
						ctx.drawImage(this.stancePiccolo, 0, 0);
						this.hard = false;
						this.fight = false;
						this.attacking = false;
						this.intensify = false;
						app.main.aiChoice2 = Math.random();
						app.main.chance2 = Math.random();
						this.counter = 0;
						app.main.detectedHard2 = false;
					}
				}
				//AIR HARD PUNCH
			} else if (this.attacking == true && this.intensify == true && this.air == true && this.hit == false && this.down == false) {
				this.randomEffect = Math.random();
				this.hard = true;
				//app.main.chance2 = .7;
				if (app.main.chance2 > .5) {
					if (this.counter < 5) {
						ctx.drawImage(this.hardPunchAirPrepPiccolo, -12, -20);
					} else if (this.counter < 6) {
						this.stamina += 10;
						this.punching = true;
						ctx.drawImage(this.hardPunchAirSwingPiccolo, -12, -20);
					} else if (this.counter < 10) {
						this.punching = false;
						ctx.drawImage(this.hardPunchAirPiccolo, -12, 20);
					} else {
						ctx.drawImage(this.flyUpPiccolo, 0, -20);
						this.hard = false;
						this.fight = false;
						this.attacking = false;
						this.intensify = false;
						app.main.aiChoice2 = Math.random();
						app.main.chance2 = Math.random();
						this.counter = 0;
						app.main.detectedHard2 = false;
					}
				} else {
					if (this.counter < 3) {
						ctx.drawImage(this.hardKickPrepPiccolo, 28, -25);
					} else if (this.counter < 4) {
						this.stamina += 10;
						this.kicking = true;
						ctx.drawImage(this.hardKickPiccolo, -18, -30);
					} else if (this.counter < 10) {
						this.kicking = false;
						ctx.drawImage(this.hardKickPiccolo, -18, -30);
					} else {
						ctx.drawImage(this.flyUpPiccolo, 0, -20);
						this.hard = false;
						this.fight = false;
						this.attacking = false;
						this.intensify = false;
						app.main.aiChoice2 = Math.random();
						app.main.chance2 = Math.random();
						this.counter = 0;
						app.main.detectedHard2 = false;
					}
				}
				//BLAST ATTACK
			} else if (this.attacking == true && this.hit == false && this.intensify == false && this.powerMove == false && this.charging == false) {
				if (this.counter < 3) {
					if (this.air == false) {
						ctx.drawImage(this.blastPrepPiccolo, 1, -15);
					} else {
						ctx.drawImage(this.blastPrepAirPiccolo, -8, -15);
					}
				} else if (this.counter < 6) {
					if (this.specMove == true) {
						if (this.counter < 4) {
							app.main.sound.playEnergyAttack2(5);
							this.energy -= 2;
							this.blastCount += 1;
							if (this.left == true) {
								app.main.blasts.push(new app.Energy(this.position.x / app.main.camX, (this.position.y + 37) / app.main.camX, true, 2, 5));
								app.main.blasts.push(new app.Energy((this.position.x + 48) / app.main.camX, (this.position.y + 45) / app.main.camX, false, 2, 5));
							} else {
								app.main.blasts.push(new app.Energy((this.position.x + 60) / app.main.camX, (this.position.y + 37) / app.main.camX, false, 2, 5));
								app.main.blasts.push(new app.Energy((this.position.x - 13) / app.main.camX, (this.position.y + 45) / app.main.camX, true, 2, 5));
							}
						}
						ctx.drawImage(this.blast2Piccolo, -15, -23);
					} else if (this.air == false) {
						if (this.counter < 4) {
							app.main.sound.playEnergyAttack2(5);
							this.energy -= 1;
							this.blastCount += 1;
							if (this.left == true) {
								app.main.blasts.push(new app.Energy(this.position.x / app.main.camX, (this.position.y + 37) / app.main.camX, this.left, 2, 5));
							} else {
								app.main.blasts.push(new app.Energy((this.position.x + 60) / app.main.camX, (this.position.y + 37) / app.main.camX, this.left, 2, 5));
							}
						}
						ctx.drawImage(this.blastPiccolo, -15, -23);
					} else if (this.air == true) {
						if (this.counter < 4) {
							app.main.sound.playEnergyAttack2(5);
							this.energy -= 1;
							this.blastCount += 1;
							if (this.left == true) {
								app.main.blasts.push(new app.Energy(this.position.x / app.main.camX, (this.position.y + 60) / app.main.camX, this.left, 2, 5));
							} else {
								app.main.blasts.push(new app.Energy((this.position.x + 60) / app.main.camX, (this.position.y + 60) / app.main.camX, this.left, 2, 5));
							}
						}
						ctx.drawImage(this.blastAirPiccolo, -8, -15);
					}
				} else {
					if (this.air == false) {
						ctx.drawImage(this.blastPiccolo, -15, -23);
					} else {
						ctx.drawImage(this.blastAirPiccolo, -8, -15);
					}
					this.fight = false;
					this.attacking = false;
					this.blasting = false;
					app.main.aiChoice2 = Math.random();
					app.main.chance2 = Math.random();
					this.counter = 0;
				}
				//POWERFUL BLAST ATTACK
			} else if (this.powerMove == true && this.blasting == true && this.attacking == true && this.hit == false && this.fallingKick == false) {
				//console.log("POWERMOVEEEEE");
				//app.main.chance = .4;
				if (app.main.chance2 > .5) {
					if (this.counter < 3) {
						ctx.drawImage(this.energy1Piccolo, 5, -32);
						if (this.arms == false) {
							this.arms = true;
						} else if (this.arms == true) {
							this.arms = false;
						}
					} else if (this.counter < 5) {
						ctx.drawImage(this.energy1Piccolo, 5, -32);
					} else if (this.counter < 6) {
						ctx.drawImage(this.energy2Piccolo, 5, -15);
					} else if (this.counter < 7) {
						app.main.sound.playEffect(Math.round(getRandom(8, 10)));
						ctx.drawImage(this.energy3Piccolo, 5, 17);
					} else if (this.counter < 8) {
						ctx.drawImage(this.energy4Piccolo, 5, 32);
					} else if (this.counter < 15) {
						if (this.arms == false) {
							if (this.counter < 9) {
								//app.main.sound.playEnergyAttack(26);
								this.energy -= 5;
								if (this.left == true) {
									app.main.sound.playTaunt4(7);
									this.blastTrigger = true;
								} else {
									app.main.sound.playTaunt4(8);
									this.blastTrigger = true;
								}
							}
							ctx.drawImage(this.energy4Piccolo, 5, 32);
						} else if (this.arms == true) {
							if (this.counter < 9) {
								//app.main.sound.playEnergyAttack(26);
								this.energy -= 5;
								if (this.left == true) {
									app.main.sound.playTaunt4(9);
									this.blastTrigger = true;
								} else {
									app.main.sound.playTaunt4(7);
									this.blastTrigger = true;
								}
							}
							ctx.drawImage(this.energy4Piccolo, 5, 32);
						}
					} else {
						ctx.drawImage(this.energy4Piccolo, 5, 32);
						app.main.chance2 = Math.random();
						this.intensify = false;
						this.powerMove = false;
						this.fight = false;
						this.attacking = false;
						this.blasting = false;
					}
				} else {
					//SPECIAL BEAM CANNON
					if (this.counter < 3) {
						ctx.drawImage(this.beamPrep, 6, 16);
						if (this.arms == false) {
							this.arms = true;
						} else if (this.arms == true) {
							this.arms = false;
						}
					} else if (this.counter < 5) {
						app.main.sound.playEnergyAttack(37);
						ctx.drawImage(this.beamPrep, 6, 16);
					} else if (this.counter < 6) {
						ctx.drawImage(this.beamPrep, 6, 16);
					} else if (this.counter < 7) {
						ctx.drawImage(this.beamPrep, 6, 16);
						//ctx.drawImage(this.blastCharge1,-39,20,10,10);
					} else if (this.counter < 8) {
						ctx.drawImage(this.beamPrep, 6, 16);
						//ctx.drawImage(this.blastCharge1,-44,16.5,15,17);
					} else if (this.counter < 12) {
						ctx.drawImage(this.beamPrep, 6, 16);
						//ctx.drawImage(this.blastCharge1,-39,20,10,10);
					} else if (this.counter < 13) {
						app.main.sound.playTaunt4(12);
						ctx.drawImage(this.beamPrep, 6, 16);
						//ctx.drawImage(this.blastCharge1,-44,16.5,15,17);
					} else if (this.counter < 16) {
						ctx.drawImage(this.beamPrep, 6, 16);
						//ctx.drawImage(this.blastCharge1,-39,20,10,10);
					} else if (this.counter < 25) {
						this.blastRelease = true;
						if (this.arms == false) {
							if (this.counter < 17) {
								app.main.sound.playEnergyAttack(38);
								this.energy -= 5;
								if (this.left == true) {
									app.main.blasts.push(new app.Energy(this.position.x + 5, this.position.y + 17, this.left, 2, 6));
								} else {
									app.main.blasts.push(new app.Energy(this.position.x + 8, this.position.y + 17, this.left, 2, 6));
								}
							}
							ctx.drawImage(this.beam, -4, 3);
						} else if (this.arms == true) {
							if (this.counter < 17) {
								app.main.sound.playEnergyAttack(38);
								this.energy -= 5;
								if (this.left == true) {
									app.main.blasts.push(new app.Energy(this.position.x + 5, this.position.y + 17, this.left, 2, 6));
								} else {
									app.main.blasts.push(new app.Energy(this.position.x + 8, this.position.y + 17, this.left, 2, 6));
								}
							}
							ctx.drawImage(this.beam, -4, 3);
						}
					} else {
						ctx.drawImage(this.beam, -4, 3);
						app.main.chance2 = Math.random();
						this.intensify = false;
						this.powerMove = false;
						this.fight = false;
						this.attacking = false;
						this.blasting = false;
						this.blastRelease = false;
					}
				}
				//BLOCK
			} else if (this.blocking == true && this.hit == false && (this.stun == false || this.superSpeed == true)) {
				ctx.drawImage(this.blockPiccolo, 0, 10);
				//TAUNT
			} else if (this.taunting == true && this.hit == false && this.hardHit != true) {
				if (this.counter < 25) {
					//this.stun = true;
					ctx.drawImage(this.tauntPiccolo, 20, -25);
					if (this.counter > 5 && this.counter < 7) {
						app.main.sound.playTaunt4(Math.round(getRandom(0, 6)));
					}
					if (this.hit == true || this.hardHit == true || this.taunting == false) {
						this.aiTaunting = false;
						this.intensify = false;
						this.taunting = false;
						//this.stun = false;
					}
				} else {
					ctx.drawImage(this.tauntPiccolo, 20, -25);
					//this.counter = 0;
					this.stamina = 28;
					this.exhausted = false;
					//this.stun = false;
					this.intensify = false;
					this.taunting = false;
				}
				//Energy Charge
			} else if (this.charging == true && this.hit == false && this.hardHit != true) {
				if (this.counter < 100) {
					if (this.counter == 5) {
						app.main.sound.playTaunt4(Math.round(getRandom(10, 11)));
					}
					//this.stun = true;
					if (this.counter > 8) {
						this.energy += 1.5;
					}
					ctx.drawImage(this.chargePiccolo, 5, 22);
					if (this.counter > 6) {
						if (this.counter < 8) {
							app.main.sound.playEffect(28);
						}
						this.chargeCounter++;
						ctx.save();
						ctx.globalAlpha = .006 * this.energy;
						if (this.chargeCounter < 2) {
							ctx.drawImage(this.auraWhite1, -55, -100);
						} else if (this.chargeCounter < 3) {
							ctx.drawImage(this.auraWhite2, -55, -100);
						} else if (this.chargeCounter < 4) {
							ctx.drawImage(this.auraWhite3, -55, -100);
						} else if (this.chargeCounter < 5) {
							ctx.drawImage(this.auraWhite4, -55, -100);
							this.chargeCounter = 0;
						}
						ctx.restore();
					}
					if (this.energy > 99) {
						app.main.sound.stopEffect();
						//Play voice
						//this.stun = false;
						this.intensify = false;
						this.charging = false;
					}
					if (this.hit == true || this.hardHit == true || this.charging == false) {
						app.main.sound.stopEffect();
						this.aiCharging = false;
						this.intensify = false;
						this.charging = false;
						//this.stun = false;
					}

					/*
     if(this.counter > 19 && this.counter < 21){
     	app.main.sound.playTaunt2(Math.round(this.tauntPick));
     }
     */
				} else {
					ctx.drawImage(this.chargePiccolo, 5, 22);
					//this.stun = false;
					this.intensify = false;
					this.charging = false;
				}
				//Piccolo Scene
			} else if (this.sceneOpen == true) {
				this.stun = true;
				if (this.scenePlay == true) {
					this.chargeCounter++;
				}

				if (this.chargeCounter < 1) {
					ctx.drawImage(this.pose1Piccolo, 20, -26);
				} else if (this.chargeCounter < 3) {
					ctx.drawImage(this.pose1Piccolo, 20, -26);
				} else if (this.chargeCounter < 5) {
					ctx.drawImage(this.pose2Piccolo, 20, -26);
				} else if (this.chargeCounter < 7) {
					ctx.drawImage(this.pose3Piccolo, 20, -26);
				} else if (this.chargeCounter < 8) {
					ctx.drawImage(this.pose4Piccolo, 20, -26);
				} else {
					ctx.drawImage(this.stancePiccolo, 0, 0);
					app.main.environment.shake = true;
					app.main.sound.playSpecialReaction2(2);
					app.main.environment.cape = true;
					this.scenePlay = false;
					this.sceneOpen = false;
					this.chargeCounter = 0;
				}
				//BASIC HIT
			} else if (this.hit == true && this.hardHit == false && this.end == false) {
				if (this.stunCounter < 3) {
					if (this.focus17 == false) {
						if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
							app.main.roundScore += 21;
						} else if (app.main.android17.attacking == true) {
							app.main.roundScore2 += 21;
						}
					} else if (this.focus17 == true) {
						if (app.main.android17.attacking == true) {
							app.main.roundScore2 += 21;
						} else if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
							app.main.roundScore += 21;
						}
					}
					this.stun = true;
					ctx.drawImage(this.hit1Piccolo, 15, -20);
				} else {
					this.defBreak++;
					ctx.drawImage(this.hit1Piccolo, 15, -20);
					this.stun = false;
					this.hit = false;
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
			} else if (this.hardHit == true && this.hit == true && (this.air == false || this.blasted == true) && this.end == false) {
				if (this.stunCounter < 22) {
					this.voiceChance = Math.random();
					if (this.stunCounter < 4 && this.stunCounter > 2 && this.voiceChance > .5 && this.end == false) {
						app.main.sound.playTaunt4(Math.round(getRandom(20, 22)));
					}
					if (this.focus17 == false) {
						if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
							app.main.roundScore += 7;
						} else if (app.main.android17.attacking == true) {
							app.main.roundScore2 += 7;
						}
					} else if (this.focus17 == true) {
						if (app.main.android17.attacking == true) {
							app.main.roundScore2 += 7;
						} else if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
							app.main.roundScore += 7;
						}
					}
					this.stun = true;
					ctx.drawImage(this.hitHardPiccolo, 5, 20);
				} else {
					ctx.drawImage(this.hitHardPiccolo, 5, 20);
					this.stun = false;
					this.hardHit = false;
					this.hit = false;
					this.blasted = false;
				}
				//HARD HIT AIR
			} else if (this.hardHit == true && this.hit == true && this.air == true && this.end == false) {
				if (this.punched == true) {
					if (this.stunCounter < 22) {
						this.voiceChance = Math.random();
						if (this.stunCounter < 4 && this.stunCounter > 2 && this.voiceChance > .5 && this.end == false) {
							app.main.sound.playTaunt4(Math.round(getRandom(20, 22)));
						}
						if (this.focus17 == false) {
							if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
								app.main.roundScore += 7;
							} else if (app.main.android17.attacking == true) {
								app.main.roundScore2 += 7;
							}
						} else if (this.focus17 == true) {
							if (app.main.android17.attacking == true) {
								app.main.roundScore2 += 7;
							} else if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
								app.main.roundScore += 7;
							}
						}
						this.stun = true;
						ctx.drawImage(this.fallDownPiccolo, 5, 20);
					} else {
						ctx.drawImage(this.fallDownPiccolo, 5, 20);
						this.stun = false;
						this.hardHit = false;
						this.hit = false;
					}
				} else {
					if (this.stunCounter < 22) {
						this.voiceChance = Math.random();
						if (this.stunCounter < 4 && this.stunCounter > 2 && this.voiceChance > .5 && this.end == false) {
							app.main.sound.playTaunt4(Math.round(getRandom(20, 22)));
						}
						if (this.focus17 == false) {
							if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
								app.main.roundScore += 7;
							} else if (app.main.android17.attacking == true) {
								app.main.roundScore2 += 7;
							}
						} else if (this.focus17 == true) {
							if (app.main.android17.attacking == true) {
								app.main.roundScore2 += 7;
							} else if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
								app.main.roundScore += 7;
							}
						}
						this.stun = true;
						ctx.drawImage(this.fallSidePiccolo, 5, 20);
					} else {
						ctx.drawImage(this.fallSidePiccolo, 5, 20);
						this.stun = false;
						this.hardHit = false;
						this.hit = false;
					}
				}
			} else if (this.end == true) {
				if (this.air == true) {
					this.stun = true;
					ctx.drawImage(this.fallDownPiccolo, 5, 20);
				} else {
					this.unable = true;
					this.stun = true;
					ctx.drawImage(this.groundPiccolo, 5, 80);
					if (this.deadCount == false) {
						app.main.kills += 1;
						this.deadCount = true;
					}
					if (this.stunCounter > 10) {
						this.vanish = true;
						app.main.environment.deathPiccoloDirLeft = this.left;
						app.main.environment.deathLocationPiccolo = new Victor(this.position.x, this.position.y);
						this.dead = true;
					}
				}
			}
			ctx.restore();
		} //end if

		// ------------ DRAWS FOR GOHAN ---------------------------------------------
		// ------------ DRAWS FOR GOHAN ---------------------------------------------
		// ------------ DRAWS FOR GOHAN ---------------------------------------------

		if (this.vanish == false && this.gohan == true) {
			//NON MOVING DRAWS
			if (this.cinematic == true) {
				if (this.cine == 0) {
					ctx.drawImage(this.mad1Gohan, -5, 0);
				} else if (this.cine == 1) {
					ctx.drawImage(this.injuredGohan, 0, 0);
				} else if (this.cine == 2) {
					ctx.drawImage(this.chargeGohan, 0, 0);
				}
			} else if (this.velocity.x == 0 && this.attacking != true && this.blocking != true && this.taunting != true && this.hit == false && this.hardHit != true && this.charging != true && this.end == false) {
				if (this.up == true && this.flying == true || this.jumpVelocity.y < 15 && this.air == true) {
					if (this.lookUp == true) {
						ctx.drawImage(this.flyUpUpGohan, 0, 0);
					} else if (this.lookDown == true) {
						ctx.drawImage(this.flyUpDownGohan, 0, 0);
					} else {
						ctx.drawImage(this.flyUpGohan, 0, 0);
					}
				} else if (this.down == true && this.air == true) {
					ctx.drawImage(this.flyDownFastGohan, 0, 0);
				} else if (this.down == false && this.air == true && this.up == false) {
					ctx.drawImage(this.flyDownSlowGohan, 0, 0);
				} else if (this.exhausted == true) {
					ctx.drawImage(this.injuredGohan, 0, 0);
				} else {
					if (this.lookUp == true) {
						ctx.drawImage(this.stanceUpGohan, 0, 0);
					} else if (this.lookDown == true) {
						ctx.drawImage(this.stanceDownGohan, 0, 0);
					} else {
						ctx.drawImage(this.stanceGohan, 0, 0);
					}
				}
				//MOVING DRAWS
			} else if (this.velocity.x != 0 && this.attacking != true && this.blocking != true && this.hit == false && this.hardHit != true && this.taunting != true && this.charging == false && this.end == false) {
				//&& (this.fallingKick == false || this.air == false)
				if (this.slow == true && this.reverse == false) {
					ctx.drawImage(this.slowFlyGohan, 0, 0);
				} else if (this.fast == true && this.reverse == false) {
					ctx.drawImage(this.fastFlyGohan, 0, 0);
				} else if (this.reverse == true) {
					ctx.drawImage(this.moveReverseGohan, 0, 0);
				} else if (this.air == true && this.up == false) {
					ctx.drawImage(this.flyDownSlowGohan, 0, 0);
				} else if (this.exhausted == true) {
					ctx.drawImage(this.injuredGohan, 0, 0);
				} else {
					if (this.lookUp == true) {
						ctx.drawImage(this.stanceUpGohan, 0, 0);
					} else if (this.lookDown == true) {
						ctx.drawImage(this.stanceDownGohan, 0, 0);
					} else {
						ctx.drawImage(this.stanceGohan, 0, 0);
					}
				}
				//BASIC ATTACK
			} else if (this.attacking == true && this.air == false && this.hit == false && this.blasting == false && this.intensify == false) {
				this.randomEffect = Math.random();
				//this.chance2 = Math.random();
				//console.log(this.arms + "ARMS");
				if (this.counter < 3 && app.main.chance2 > .3) {
					ctx.drawImage(this.punchPrepGohan, 0, 0);
				} else if (this.counter < 3 && app.main.chance2 <= .3) {
					ctx.drawImage(this.kickPrepGohan, 0, 0);
				} else if (this.counter < 5 && app.main.chance2 > .3) {
					if (this.counter < 4) {
						this.stamina += 4;
						this.basic = true;
						//console.log("attack");//action
					} else {
						this.basic = false;
					}
					if (this.arms == false) {
						ctx.drawImage(this.leftPunchGohan, 0, 0);
					} else if (this.arms == true) {
						ctx.drawImage(this.rightPunchGohan, 0, 0);
					}
				} else if (this.counter < 5 && app.main.chance2 <= .3) {
					if (this.counter < 4) {
						this.stamina += 4;
						this.basic = true;
					} else {
						this.basic = false;
					}
					ctx.drawImage(this.kickGohan, 0, 0);
				} else if (app.main.chance2 > .3) {
					this.fight = false;
					this.attacking = false;
					this.basic = false;
					if (this.arms == false) {
						ctx.drawImage(this.stanceGohan, 0, 0);
						this.arms = true;
					} else if (this.arms == true) {
						ctx.drawImage(this.stanceGohan, 0, 0);
						this.arms = false;
					}
					app.main.aiChoice2 = Math.random();
					app.main.chance2 = Math.random();
					app.main.detected2 = false;
					this.counter = 0;
				} else if (app.main.chance2 <= .3) {
					this.fight = false;
					this.attacking = false;
					this.basic = false;
					ctx.drawImage(this.stanceGohan, 0, 0);
					//ctx.drawImage(this.kickPrep,0,10);
					app.main.aiChoice2 = Math.random();
					app.main.chance2 = Math.random();
					app.main.detected2 = false;
					this.counter = 0;
				}
				//AIR BASIC ATTACK
			} else if (this.attacking == true && this.air == true && this.hit == false && this.down == false && this.intensify == false && this.blasting == false) {
				this.randomEffect = Math.random();
				//this.chance2 = Math.random();
				if (this.counter < 3 && app.main.chance2 > .3) {
					ctx.drawImage(this.punchPrepGohan, 0, 0);
				} else if (this.counter < 3 && app.main.chance2 <= .3) {
					ctx.drawImage(this.kickPrepGohan, 0, 0);
				} else if (this.counter < 5 && app.main.chance2 > .3) {
					if (this.counter < 4) {
						this.stamina += 4;
						this.basic = true;
						//console.log("attack");//action
					} else {
						this.basic = false;
					}
					if (this.arms == false) {
						ctx.drawImage(this.leftPunchGohan, 0, 0);
					} else if (this.arms == true) {
						ctx.drawImage(this.rightPunchGohan, 0, 0);
					}
				} else if (this.counter < 5 && app.main.chance2 <= .3) {
					if (this.counter < 4) {
						this.stamina += 4;
						this.basic = true;
					} else {
						this.basic = false;
					}
					ctx.drawImage(this.kickGohan, 0, 0);
				} else if (app.main.chance2 > .3) {
					this.fight = false;
					this.attacking = false;
					this.basic = false;
					if (this.arms == false) {
						ctx.drawImage(this.flyUpGohan, 0, 0);
						this.arms = true;
					} else if (this.arms == true) {
						ctx.drawImage(this.flyUpGohan, 0, 0);
						this.arms = false;
					}
					app.main.aiChoice2 = Math.random();
					app.main.chance2 = Math.random();
					app.main.detected2 = false;
					this.counter = 0;
				} else if (app.main.chance2 <= .3) {
					this.fight = false;
					this.attacking = false;
					this.basic = false;
					ctx.drawImage(this.flyUpGohan, 0, 0);
					//ctx.drawImage(this.kickPrep,0,10);
					app.main.aiChoice2 = Math.random();
					app.main.chance2 = Math.random();
					app.main.detected2 = false;
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
			} else if (this.attacking == true && this.intensify == true && this.air == false && this.hit == false && this.down == false) {
				this.randomEffect = Math.random();
				this.hard = true;
				//app.main.chance2 = .3;
				if (app.main.chance2 > .6) {
					if (this.counter < 3) {
						ctx.drawImage(this.hardPunchPrepGohan, 0, 0);
					} else if (this.counter < 4) {
						this.stamina += 10;
						this.punching = true;
						ctx.drawImage(this.hardPunchSwingGohan, 0, 0);
					} else if (this.counter < 5) {
						ctx.drawImage(this.hardPunchSwing2Gohan, 0, 0);
					} else if (this.counter < 10) {
						this.punching = false;
						ctx.drawImage(this.hardPunchPrepGohan, 0, 0);
					} else {
						ctx.drawImage(this.stanceGohan, 0, 0);
						this.hard = false;
						this.fight = false;
						this.attacking = false;
						this.intensify = false;
						app.main.aiChoice2 = Math.random();
						app.main.chance2 = Math.random();
						this.counter = 0;
						app.main.detectedHard2 = false;
					}
				} else if (app.main.chance2 < .61 && app.main.chance2 > .25) {
					if (this.counter < 3) {
						ctx.drawImage(this.launchPrepGohan, 0, 0);
					} else if (this.counter < 4) {
						this.stamina += 10;
						if (this.focus17 == false) {
							if (app.main.android18.blocking == false && app.main.android18.superSpeed == false) {
								//app.main.android18.stun = true;
								app.main.android18.jumpVelocity = new Victor(0, -30);
								app.main.android18.air = true;
							}
						} else {
							if (app.main.android17.blocking == false && app.main.android17.superSpeed == false) {
								//app.main.android18.stun = true;
								app.main.android17.jumpVelocity = new Victor(0, -30);
								app.main.android17.air = true;
							}
						}
						this.kicking = true;
						ctx.drawImage(this.launchSwingGohan, 0, 0);
					} else if (this.counter < 10) {
						this.kicking = false;
						ctx.drawImage(this.launchGohan, 0, 0);
					} else {
						ctx.drawImage(this.stanceGohan, 0, 0);
						this.hard = false;
						this.fight = false;
						this.attacking = false;
						this.intensify = false;
						app.main.aiChoice2 = Math.random();
						app.main.chance2 = Math.random();
						this.counter = 0;
						app.main.detectedHard2 = false;
					}
				} else {
					if (this.counter < 3) {
						ctx.drawImage(this.hardKickPrepGohan, 0, 0);
					} else if (this.counter < 4) {
						this.stamina += 10;
						this.kicking = true;
						ctx.drawImage(this.hardKickSwingGohan, 0, 0);
					} else if (this.counter < 10) {
						this.kicking = false;
						ctx.drawImage(this.hardKickGohan, 0, 0);
					} else {
						ctx.drawImage(this.stanceGohan, 0, 0);
						this.hard = false;
						this.fight = false;
						this.attacking = false;
						this.intensify = false;
						app.main.aiChoice2 = Math.random();
						app.main.chance2 = Math.random();
						this.counter = 0;
						app.main.detectedHard2 = false;
					}
				}
				//AIR HARD PUNCH
			} else if (this.attacking == true && this.intensify == true && this.air == true && this.hit == false && this.down == false) {
				this.randomEffect = Math.random();
				this.hard = true;
				if (app.main.chance2 > .5) {
					if (this.counter < 3) {
						ctx.drawImage(this.hardPunchAirPrepGohan, 0, 0);
					} else if (this.counter < 4) {
						this.stamina += 10;
						this.punching = true;
						ctx.drawImage(this.hardPunchAirSwingGohan, 0, 0);
					} else if (this.counter < 10) {
						this.punching = false;
						ctx.drawImage(this.hardPunchAirGohan, 0, 0);
					} else {
						ctx.drawImage(this.flyUpGohan, 0, 0);
						this.hard = false;
						this.fight = false;
						this.attacking = false;
						this.intensify = false;
						app.main.aiChoice2 = Math.random();
						app.main.chance2 = Math.random();
						this.counter = 0;
						app.main.detectedHard2 = false;
					}
				} else {
					if (this.counter < 3) {
						ctx.drawImage(this.hardKickPrepGohan, 0, 0);
					} else if (this.counter < 4) {
						this.stamina += 10;
						this.kicking = true;
						ctx.drawImage(this.hardKickGohan, 0, 0);
					} else if (this.counter < 10) {
						this.kicking = false;
						ctx.drawImage(this.hardKickGohan, 0, 0);
					} else {
						ctx.drawImage(this.flyUpGohan, 0, 0);
						this.hard = false;
						this.fight = false;
						this.attacking = false;
						this.intensify = false;
						app.main.aiChoice2 = Math.random();
						app.main.chance2 = Math.random();
						this.counter = 0;
						app.main.detectedHard2 = false;
					}
				}
				//BLAST ATTACK
			} else if (this.attacking == true && this.hit == false && this.intensify == false && this.powerMove == false && this.charging == false) {
				//KEY CHANGE
				if (this.counter < 3) {
					ctx.drawImage(this.blastPrepGohan, 0, 0);
				} else if (this.counter < 6) {
					if (this.arms == false) {
						if (this.counter < 4) {
							app.main.sound.playEnergyAttack2(5);
							this.energy -= 2;
							if (this.left == true) {
								app.main.blasts.push(new app.Energy(this.position.x, this.position.y + 37, this.left, 1, 0));
							} else {
								app.main.blasts.push(new app.Energy(this.position.x + 60, this.position.y + 37, this.left, 1, 0));
							}
						}
						//console.log("RIGHT");
						ctx.drawImage(this.blastGohan, 0, 0);
					} else if (this.arms == true) {
						if (this.counter < 4) {
							app.main.sound.playEnergyAttack2(5);
							this.energy -= 2;
							if (this.left == true) {
								app.main.blasts.push(new app.Energy(this.position.x, this.position.y + 37, this.left, 1, 0));
							} else {
								app.main.blasts.push(new app.Energy(this.position.x + 60, this.position.y + 37, this.left, 1, 0));
							}
						}
						ctx.drawImage(this.blastGohan, 0, 0);
						//console.log("RIGHT");
					}
				} else {
					if (this.arms == false) {
						this.arms = true;
					} else if (this.arms == true) {
						this.arms = false;
					}
					ctx.drawImage(this.blastPrepGohan, 0, 0);
					this.turnsDown = false;
					this.turnsUp = false;
					this.fight = false;
					this.attacking = false;
					this.blasting = false;
					app.main.aiChoice2 = Math.random();
					app.main.chance2 = Math.random();
					this.counter = 0;
				}
				//POWERFUL BLAST ATTACK
			} else if (this.powerMove == true && this.blasting == true && this.attacking == true && this.hit == false && this.fallingKick == false) {
				//console.log("POWERMOVEEEEE");
				if (this.superForm == false) {
					app.main.chance2 = .6;
				}

				if (app.main.chance2 > .5) {
					if (this.counter < 2) {
						this.flying = false;
						this.jumpVelocity.y = 0;
						this.velocity.y = 0;
						this.hover = true;
						if (this.superForm == false) {
							app.main.sound.playTaunt6(Math.round(getRandom(9, 10)));
						} else {
							app.main.sound.playEnergyAttack(23);
						}
						ctx.drawImage(this.beamPrepGohan, 0, 0);
					} else if (this.counter < 3) {
						ctx.drawImage(this.beamPrepGohan, 0, 0);
					} else if (this.counter < 5) {
						ctx.drawImage(this.beamPrepGohan, 0, 0);
					} else if (this.counter < 6) {
						if (this.superForm == false) {
							app.main.sound.playEnergyAttack(23);
						} else {
							this.counter = 16;
						}
						ctx.drawImage(this.beamPrepGohan, 0, 0);
					} else if (this.counter < 7) {
						ctx.drawImage(this.beamPrepGohan, 0, 0);
						//ctx.drawImage(this.blastCharge1,-27,20,10,14);
					} else if (this.counter < 8) {
						ctx.drawImage(this.beamPrepGohan, 0, 0);
						//ctx.drawImage(this.blastCharge1,-32,16.5,15,21);
					} else if (this.counter < 9) {
						ctx.drawImage(this.beamPrepGohan, 0, 0);
						//ctx.drawImage(this.blastCharge1,-37,13,20,28);
					} else if (this.counter < 10) {
						ctx.drawImage(this.beamPrepGohan, 0, 0);
						//ctx.drawImage(this.blastCharge1,-42,9.5,25,35);
					} else if (this.counter < 11) {
						ctx.drawImage(this.beamPrepGohan, 0, 0);
						//ctx.drawImage(this.blastCharge1,-47,6,30,42);
					} else if (this.counter < 12) {
						ctx.drawImage(this.beamPrepGohan, 0, 0);
						//ctx.drawImage(this.blastCharge1,-52,2.5,35,49);
					} else if (this.counter < 17) {
						//app.main.sound.playTaunt6(Math.round(getRandom(11,12)));
						ctx.drawImage(this.beamPrepGohan, 0, 0);
						//ctx.drawImage(this.blastCharge1,-52,2.5,35,49);
					} else if (this.counter < 45) {
						this.blastRelease = true;
						if (this.arms == false) {
							if (this.counter < 18) {
								app.main.sound.playEnergyAttack(29);
								this.energy -= 15;
								app.main.sound.playTaunt6(Math.round(getRandom(11, 12)));
								if (this.left == true) {
									//app.main.sound.playTaunt2(26);
									app.main.blasts.push(new app.Energy(this.position.x + 10, this.position.y + 55, this.left, 2, 7));
								} else {
									//app.main.sound.playTaunt2(27);
									app.main.blasts.push(new app.Energy(this.position.x + 30, this.position.y + 55, this.left, 2, 7));
								}
							}
							if (this.turnsUp == true) {
								ctx.drawImage(this.beamUpGohan, 0, 0);
								if (this.turnTalk == false && this.justTurned == false && this.counter > 24) {
									app.main.sound.playTaunt6(Math.round(getRandom(37, 39)));
									this.turnTalk = true;
								}
								this.justTurned = true;
							} else if (this.turnsDown == true) {
								ctx.drawImage(this.beamDownGohan, 0, 0);
								if (this.turnTalk == false && this.justTurned == false && this.counter > 24) {
									app.main.sound.playTaunt6(Math.round(getRandom(37, 39)));
									this.turnTalk = true;
								}
								this.justTurned = true;
							} else {
								this.justTurned = false;
								this.turnTalk = false;
								ctx.drawImage(this.beamGohan, 0, 0);
							}
						} else if (this.arms == true) {
							if (this.counter < 18) {
								app.main.sound.playEnergyAttack(29);
								this.energy -= 15;
								app.main.sound.playTaunt6(Math.round(getRandom(11, 12)));
								if (this.left == true) {
									//app.main.sound.playTaunt2(26);
									app.main.blasts.push(new app.Energy(this.position.x + 10, this.position.y + 55, this.left, 2, 7));
								} else {
									//app.main.sound.playTaunt2(27);
									app.main.blasts.push(new app.Energy(this.position.x + 30, this.position.y + 55, this.left, 2, 7));
								}
							}
							if (this.turnsUp == true) {
								ctx.drawImage(this.beamUpGohan, 0, 0);
								if (this.turnTalk == false && this.justTurned == false && this.counter > 24) {
									app.main.sound.playTaunt6(Math.round(getRandom(37, 39)));
									this.turnTalk = true;
								}
								this.justTurned = true;
							} else if (this.turnsDown == true) {
								ctx.drawImage(this.beamDownGohan, 0, 0);
								if (this.turnTalk == false && this.justTurned == false && this.counter > 24) {
									app.main.sound.playTaunt6(Math.round(getRandom(37, 39)));
									this.turnTalk = true;
								}
								this.justTurned = true;
							} else {
								this.justTurned = false;
								this.turnTalk = false;
								ctx.drawImage(this.beamGohan, 0, 0);
							}
						}
					} else {
						if (this.arms == false) {
							this.arms = true;
						} else if (this.arms == true) {
							this.arms = false;
						}
						app.main.chance2 = Math.random();
						ctx.drawImage(this.beamGohan, 0, 0);
						this.intensify = false;
						this.powerMove = false;
						this.fight = false;
						this.attacking = false;
						this.blasting = false;
						this.blastRelease = false;
					}
				} else {
					//HEAD SMASH

					if (hardAttackHitTest(app.main.vegeta, app.main.android18) && app.main.android18.superSpeed == false && app.main.android18.fieldOn == false && this.striking == true) {
						if (this.left == true) {
							app.main.android18.velocity.x -= 40;
						} else {
							app.main.android18.velocity.x += 40;
						}
						app.main.android18.decel = app.main.android18.velocity.clone();
						app.main.sound.playSpecialReaction2(49);
						app.main.sound.playEnergyReaction2(16);
						app.main.android18.punched = false;
						app.main.android18.hit = true;
						app.main.android18.stun = true;
						app.main.android18.hardHit = true;
						if (app.main.android18.endurance > 14) {
							app.main.android18.endurance = app.main.android18.endurance - (10 + getRandom(2, 8));
						} else if (app.main.android18.endurance < 15) {
							app.main.android18.health = app.main.android18.health - (10 + getRandom(2, 8));
						}
						this.striking = false;
					} else if (hardAttackHitTest(app.main.vegeta, app.main.android17) && app.main.android17.superSpeed == false && app.main.android18.fieldOn == false && this.striking == true) {
						if (this.left == true) {
							app.main.android17.velocity.x -= 40;
						} else {
							app.main.android17.velocity.x += 40;
						}
						app.main.android17.decel = app.main.android17.velocity.clone();
						app.main.sound.playSpecialReaction2(49);
						app.main.sound.playEnergyReaction2(16);
						app.main.android17.punched = false;
						app.main.android17.hit = true;
						app.main.android17.stun = true;
						app.main.android17.hardHit = true;
						if (app.main.android17.endurance > 14) {
							app.main.android17.endurance = app.main.android17.endurance - (10 + getRandom(2, 8));
						} else if (app.main.android17.endurance < 15) {
							app.main.android17.health = app.main.android17.health - (10 + getRandom(2, 8));
						}
						this.striking = false;
					}

					if (this.focus17 == false && app.main.android18.superSpeed == true && app.main.android18.fieldOn == true) {
						this.intensify = false;
						this.powerMove = false;
						this.fight = false;
						this.attacking = false;
						this.blasting = false;
						this.striking = false;
					} else if (this.focus17 == true && app.main.android17.superSpeed == true && app.main.android17.fieldOn == true) {
						this.intensify = false;
						this.powerMove = false;
						this.fight = false;
						this.attacking = false;
						this.blasting = false;
						this.striking = false;
					}

					if (this.counter < 2) {
						/* this.lastKnown.x = app.main.android18.position.x;
      this.lastKnown.y = app.main.android18.position.y; */
						this.flying = false;
						this.jumpVelocity.y = 0;
						this.velocity.y = 0;
						this.hover = true;
						ctx.drawImage(this.headPrepGohan, 0, 0);
					} else if (this.counter < 3) {
						app.main.sound.playTaunt6(Math.round(getRandom(23, 24)));
						ctx.drawImage(this.headPrepGohan, 0, 0);
					} else if (this.counter < 6) {
						ctx.drawImage(this.headPrepGohan, 0, 0);
					} else if (this.counter < 7) {
						ctx.drawImage(this.headPrepGohan, 0, 0);
						this.lastKnown.x = app.main.android18.position.x;
						this.lastKnown.y = app.main.android18.position.y;
					} else if (this.counter < 8) {
						this.teleFace = true;
						this.superSpeed = true;
						ctx.drawImage(this.headGohan, 0, 0);
					} else if (this.counter < 9) {
						this.striking = true;
						ctx.drawImage(this.headGohan, 0, 0);
					} else if (this.counter < 14) {
						ctx.drawImage(this.headGohan, 0, 0);
					} else if (this.counter < 15) {
						ctx.drawImage(this.headGohan, 0, 0);
					} else if (this.counter < 30) {} else {
						ctx.drawImage(this.headGohan, 0, 0);
						app.main.chance2 = Math.random();
						this.intensify = false;
						this.powerMove = false;
						this.fight = false;
						this.attacking = false;
						this.blasting = false;
						this.striking = false;
					}
				}
				//BLOCK
			} else if (this.blocking == true && this.hit == false && (this.stun == false || this.superSpeed == true)) {
				ctx.drawImage(this.blockGohan, 0, 0);
				//TAUNT
			} else if (this.taunting == true && this.hit == false && this.hardHit != true) {
				if (this.counter < 25) {
					//this.stun = true;
					ctx.drawImage(this.tauntGohan, 0, 0);
					if (this.counter > 1 && this.counter < 3 && this.superForm == true) {
						app.main.sound.playEffect(48);
					}
					if (this.counter > 5 && this.counter < 7) {
						if (this.superForm == false) {
							app.main.sound.playTaunt6(Math.round(getRandom(0, 6)));
						} else {
							app.main.sound.playTaunt6(Math.round(getRandom(16, 22)));
						}
					}
					if (this.hit == true || this.hardHit == true || this.taunting == false) {
						this.aiTaunting = false;
						this.intensify = false;
						this.taunting = false;
						//this.stun = false;
					}

					this.chargeCounter++;
					ctx.save();
					ctx.globalAlpha = .006 * this.energy;
					if (this.chargeCounter < 2) {
						if (this.superForm == false) {
							//ctx.drawImage(this.auraWhite1,-35,-90);
						} else {
							//ctx.drawImage(this.auraYellow1,-35,-90);
							ctx.save();
							ctx.scale(2, 2);
							ctx.globalAlpha = .9;
							if (this.sparkCounter == 0) {
								ctx.drawImage(this.sparks1, 5, 0);
							} else if (this.sparkCounter == 3) {
								ctx.drawImage(this.sparks2, 10, 0);
							} else if (this.sparkCounter == 6) {
								ctx.drawImage(this.sparks3, 10, 0);
							} else if (this.sparkCounter == 9) {
								ctx.drawImage(this.sparks4, 10, 0);
							}
							ctx.restore();
						}
						if (this.sparkCounter < 9) {
							this.sparkCounter++;
						} else {
							this.sparkCounter = 0;
						}
					} else if (this.chargeCounter < 3) {
						if (this.superForm == false) {
							//ctx.drawImage(this.auraWhite2,-35,-90);
						} else {
								//ctx.drawImage(this.auraYellow2,-35,-90);
							}
					} else if (this.chargeCounter < 4) {
						if (this.superForm == false) {
							//ctx.drawImage(this.auraWhite3,-35,-90);
						} else {
								//ctx.drawImage(this.auraYellow3,-35,-90);
							}
					} else if (this.chargeCounter < 5) {
						if (this.superForm == false) {
							//ctx.drawImage(this.auraWhite4,-35,-90);
						} else {
								//ctx.drawImage(this.auraYellow4,-35,-90);
							}
						this.chargeCounter = 0;
					}
					ctx.restore();
				} else {
					ctx.drawImage(this.tauntGohan, 0, 0);
					//this.counter = 0;
					this.stamina = 28;
					this.exhausted = false;
					//this.stun = false;
					this.intensify = false;
					this.taunting = false;
				}
				//Energy Charge
			} else if (this.charging == true && this.hit == false && this.hardHit != true) {
				if (this.counter < 100 || app.main.scene == true) {
					if (this.counter == 5 && app.main.scene == false) {
						app.main.sound.playTaunt6(Math.round(getRandom(7, 8)));
					}
					//this.stun = true;

					if (this.counter < 2 && this.superForm == true && app.main.scene == false) {
						this.almostSS = true;
						app.main.environment.powerUp = true;
					}

					if (this.counter > 8) {
						if (this.superForm == false) {
							this.energy += 1.5;
						} else {
							this.energy += 2.7;
						}
					}
					if ((this.superForm == false || app.main.scene == false) && this.almostSS == false) {
						ctx.drawImage(this.chargeGohan, 0, 0);
					} else if (this.almostSS == true) {
						ctx.drawImage(this.chargeGohan, 0, 0);
						ctx.save();
						ctx.globalAlpha = this.almostFade / 100;
						ctx.drawImage(this.SS2Gohan, 0, 0);
						ctx.restore();
						if (this.lockSS == true) {
							//KEEP FORM
						} else if (this.almostCounter < 20) {
							this.almostCounter++;
							this.almostFade -= 5;
						} else {
							this.almostCounter = 0;
							this.almostFade = 100;
							this.almostSS = false;
						}
					} else {
						ctx.drawImage(this.tauntGohan, 5, 0);
					}
					if (this.counter > 6) {
						if (this.counter < 8) {
							if (this.superForm == false) {
								app.main.sound.playEffect(28);
							} else {
								app.main.sound.playEffect(42);
							}
						}
						this.chargeCounter++;
						ctx.save();
						ctx.globalAlpha = .006 * this.energy;
						if (this.chargeCounter < 2) {
							if (this.superForm == false) {
								ctx.drawImage(this.auraWhite1, -35, -90);
							} else {
								ctx.drawImage(this.auraYellow1, -35, -90);
								ctx.save();
								ctx.scale(2, 2);
								ctx.globalAlpha = .9;
								if (this.sparkCounter == 0) {
									ctx.drawImage(this.sparks1, 5, 0);
								} else if (this.sparkCounter == 3) {
									ctx.drawImage(this.sparks2, 10, 0);
								} else if (this.sparkCounter == 6) {
									ctx.drawImage(this.sparks3, 10, 0);
								} else if (this.sparkCounter == 9) {
									ctx.drawImage(this.sparks4, 10, 0);
								}
								ctx.restore();
							}
							if (this.sparkCounter < 9) {
								this.sparkCounter++;
							} else {
								this.sparkCounter = 0;
							}
						} else if (this.chargeCounter < 3) {
							if (this.superForm == false) {
								ctx.drawImage(this.auraWhite2, -35, -90);
							} else {
								ctx.drawImage(this.auraYellow2, -35, -90);
							}
						} else if (this.chargeCounter < 4) {
							if (this.superForm == false) {
								ctx.drawImage(this.auraWhite3, -35, -90);
							} else {
								ctx.drawImage(this.auraYellow3, -35, -90);
							}
						} else if (this.chargeCounter < 5) {
							if (this.superForm == false) {
								ctx.drawImage(this.auraWhite4, -35, -90);
							} else {
								ctx.drawImage(this.auraYellow4, -35, -90);
							}
							this.chargeCounter = 0;
						}
						ctx.restore();
					}
					if (this.energy > 99 && app.main.scene == false) {
						app.main.sound.stopEffect();
						//Play voice
						//this.stun = false;
						this.intensify = false;
						this.charging = false;
						app.main.environment.powerUp = false;
					}
					if (this.hit == true || this.hardHit == true || this.charging == false) {
						app.main.sound.stopEffect();
						this.aiCharging = false;
						this.intensify = false;
						this.charging = false;
						app.main.environment.powerUp = false;
						//this.stun = false;
					}

					/*
     if(this.counter > 19 && this.counter < 21){
     	app.main.sound.playTaunt2(Math.round(this.tauntPick));
     }
     */
				} else {
					ctx.drawImage(this.chargeGohan, 0, 0);
					//this.stun = false;
					this.intensify = false;
					this.charging = false;
					app.main.environment.powerUp = false;
				}
				//BASIC HIT
			} else if (this.hit == true && this.hardHit == false && this.end == false) {
				if (this.stunCounter < 3) {
					if (this.focus17 == false) {
						if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
							app.main.roundScore += 21;
						} else if (app.main.android17.attacking == true) {
							app.main.roundScore2 += 21;
						}
					} else if (this.focus17 == true) {
						if (app.main.android17.attacking == true) {
							app.main.roundScore2 += 21;
						} else if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
							app.main.roundScore += 21;
						}
					}
					this.stun = true;
					ctx.drawImage(this.hit1Gohan, 0, 10);
				} else {
					this.defBreak++;
					ctx.drawImage(this.hit1Gohan, 0, 10);
					this.stun = false;
					this.hit = false;
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
			} else if (this.hardHit == true && this.hit == true && (this.air == false || this.blasted == true) && this.end == false) {
				if (this.stunCounter < 22) {
					this.voiceChance = Math.random();
					if (this.stunCounter < 4 && this.stunCounter > 2 && this.voiceChance > .5 && this.end == false) {
						app.main.sound.playTaunt6(Math.round(getRandom(40, 42)));
					}
					if (this.focus17 == false) {
						if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
							app.main.roundScore += 7;
						} else if (app.main.android17.attacking == true) {
							app.main.roundScore2 += 7;
						}
					} else if (this.focus17 == true) {
						if (app.main.android17.attacking == true) {
							app.main.roundScore2 += 7;
						} else if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
							app.main.roundScore += 7;
						}
					}
					this.stun = true;
					ctx.drawImage(this.hitHardGohan, 0, 0);
				} else {
					ctx.drawImage(this.hitHardGohan, 0, 0);
					this.stun = false;
					this.hardHit = false;
					this.hit = false;
					this.blasted = false;
				}
				//HARD HIT AIR
			} else if (this.hardHit == true && this.hit == true && this.air == true && this.end == false) {
				if (this.punched == true) {
					if (this.stunCounter < 22) {
						this.voiceChance = Math.random();
						if (this.stunCounter < 4 && this.stunCounter > 2 && this.voiceChance > .5 && this.end == false) {
							app.main.sound.playTaunt6(Math.round(getRandom(40, 42)));
						}
						if (this.focus17 == false) {
							if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
								app.main.roundScore += 7;
							} else if (app.main.android17.attacking == true) {
								app.main.roundScore2 += 7;
							}
						} else if (this.focus17 == true) {
							if (app.main.android17.attacking == true) {
								app.main.roundScore2 += 7;
							} else if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
								app.main.roundScore += 7;
							}
						}
						this.stun = true;
						ctx.drawImage(this.fallDownGohan, 0, 0);
					} else {
						ctx.drawImage(this.fallDownGohan, 0, 0);
						this.stun = false;
						this.hardHit = false;
						this.hit = false;
					}
				} else {
					if (this.stunCounter < 22) {
						this.voiceChance = Math.random();
						if (this.stunCounter < 4 && this.stunCounter > 2 && this.voiceChance > .5 && this.end == false) {
							app.main.sound.playTaunt6(Math.round(getRandom(40, 42)));
						}
						if (this.focus17 == false) {
							if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
								app.main.roundScore += 7;
							} else if (app.main.android17.attacking == true) {
								app.main.roundScore2 += 7;
							}
						} else if (this.focus17 == true) {
							if (app.main.android17.attacking == true) {
								app.main.roundScore2 += 7;
							} else if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
								app.main.roundScore += 7;
							}
						}
						this.stun = true;
						ctx.drawImage(this.fallSideGohan, 0, 0);
					} else {
						ctx.drawImage(this.fallSideGohan, 0, 0);
						this.stun = false;
						this.hardHit = false;
						this.hit = false;
					}
				}
			} else if (this.end == true) {
				//this.stunCounter++;
				if (this.air == true) {
					this.stun = true;
					ctx.drawImage(this.fallDownGohan, 0, 0);
				} else {
					this.unable = true;
					this.stun = true;
					if (this.superForm == false) {
						ctx.drawImage(this.gohanSevere, 30, 90);
					} else {
						if (this.trueDead == false) {
							ctx.drawImage(this.gohanSevere2, 0, 0);
						} else {
							if (this.deadCount == false) {
								app.main.kills += 1;
								this.deadCount = true;
							}
							ctx.drawImage(this.groundGohan, 0, 10);
						}
					}
					this.dead = true;
					/* if(this.stunCounter > 10){
     	this.vanish = true;
     	app.main.environment.deathVegetaDirLeft = this.left;
     	app.main.environment.deathLocationVegeta = new Victor(this.position.x, this.position.y);
     	this.dead = true;
     } */
				}
			}

			if (this.superForm == true && this.charging == false && this.taunting == false && this.attacking == false && this.blasting == false && this.hardHit == false && this.hit == false && this.end == false) {
				this.auraTimer++;
				ctx.save();
				ctx.globalAlpha = .6;
				if (this.auraTimer < 2) {
					ctx.drawImage(this.aura1Gohan, 0, 0);
				} else if (this.auraTimer < 3) {
					ctx.drawImage(this.aura2Gohan, 0, 0);
				} else if (this.auraTimer < 4) {
					ctx.drawImage(this.aura3Gohan, 0, 0);
				} else if (this.auraTimer < 5) {
					ctx.drawImage(this.aura4Gohan, 0, 0);
				} else if (this.auraTimer < 6) {
					ctx.drawImage(this.aura5Gohan, 0, 0);
					//this.auraTrigger = true;
					//this.auraTimer = 0;
				} else if (this.auraTimer > 80) {
					this.auraTimer = 0;
				}
				ctx.restore();
			} /*  else if(this.velocity.x > .5 || this.velocity.x < -.5 && this.auraTrigger == true){
     this.auraTimer = 0;
     this.auraTrigger = false;
     } */
			if (this.hit == true && this.auraTimer < 6) {
				this.auraTimer = 0;
			}
		} //end if


		// ------------ DRAWS FOR TIEN ---------------------------------------------
		// ------------ DRAWS FOR TIEN ---------------------------------------------
		// ------------ DRAWS FOR TIEN ---------------------------------------------
		if (this.vanish == false && this.tien == true) {
			ctx.save();
			ctx.scale(1.15, 1.15);
			//NON MOVING DRAWS
			if (this.cinematic == true) {
				if (this.cine == 0) {
					ctx.drawImage(this.solarTien, 0, 0);
				} else if (this.cine == 1) {
					ctx.drawImage(this.mad1Tien, 0, 0);
				}
			} else if (this.velocity.x == 0 && this.attacking != true && this.blocking != true && this.taunting != true && this.hit == false && this.hardHit != true && this.charging != true && this.blasting == false && this.end == false) {
				if (this.exhausted == true) {
					ctx.drawImage(this.injuredTien, 0, 0);
				} else if (this.up == true && this.flying == true || this.jumpVelocity.y < 15 && this.air == true) {
					if (this.lookUp == true) {
						ctx.drawImage(this.flyUpUpTien, 0, 0);
					} else if (this.lookDown == true) {
						ctx.drawImage(this.flyUpDownTien, 0, 0);
					} else {
						ctx.drawImage(this.flyUpTien, 0, 0);
					}
				} else if (this.down == true && this.air == true) {
					ctx.drawImage(this.flyDownFastTien, 0, 0);
				} else if (this.down == false && this.air == true && this.up == false) {
					ctx.drawImage(this.flyDownSlowTien, 0, 0);
				} else {
					if (this.lookUp == true) {
						ctx.drawImage(this.stanceUpTien, 0, 0);
					} else if (this.lookDown == true) {
						ctx.drawImage(this.stanceDownTien, 0, 0);
					} else {
						ctx.drawImage(this.stanceTien, 0, 0);
					}
				}
				//MOVING DRAWS
			} else if (this.velocity.x != 0 && this.attacking != true && this.blocking != true && this.hit == false && this.hardHit != true && this.blasting == false && this.taunting != true && this.charging == false && this.end == false) {
				//&& (this.fallingKick == false || this.air == false)
				if (this.exhausted == true) {
					ctx.drawImage(this.injuredTien, 0, 0);
				} else if (this.slow == true && this.reverse == false) {
					ctx.drawImage(this.slowFlyTien, 0, 0);
				} else if (this.fast == true && this.reverse == false) {
					ctx.drawImage(this.fastFlyTien, 0, 0);
				} else if (this.reverse == true) {
					ctx.drawImage(this.moveReverseTien, 0, 0);
				} else if (this.air == true && this.up == false) {
					ctx.drawImage(this.flyDownSlowTien, 0, 0);
				} else {
					if (this.lookUp == true) {
						ctx.drawImage(this.stanceUpTien, 0, 0);
					} else if (this.lookDown == true) {
						ctx.drawImage(this.stanceDownTien, 0, 0);
					} else {
						ctx.drawImage(this.stanceTien, 0, 0);
					}
				}
				//POWERFUL BLAST
			} else if (this.powerMove == true && this.blasting == true && this.hit == false && this.fallingKick == false) {
				//console.log("POWERMOVEEEEE");

				app.main.chance4 = .6;
				if (app.main.chance4 > .5) {
					if (this.counter < 3) {
						app.main.blastExploded = false;
						ctx.drawImage(this.triBeam1, 0, 0);
					} else if (this.counter < 5) {
						ctx.drawImage(this.triBeam1, 0, 0);
					} else if (this.counter < 6) {
						if (this.energyUse > 3) {
							this.intensify = false;
							this.powerMove = false;
							this.fight = false;
							this.attacking = false;
							this.blasting = false;
							this.exhausted = true;
						} else {
							this.energyUse++;
							app.main.sound.playEnergyAttack(25);
						}
						ctx.drawImage(this.triBeam1, 0, 0);
					} else if (this.counter < 7) {
						ctx.drawImage(this.triBeam2, 0, 0);
						//ctx.drawImage(this.blastCharge1,-27,20,10,14);
					} else if (this.counter < 8) {
						ctx.drawImage(this.triBeam3, 0, 0);
						//ctx.drawImage(this.blastCharge1,-32,16.5,15,21);
					} else if (this.counter < 9) {
						ctx.drawImage(this.triBeam4, 0, 0);
						//ctx.drawImage(this.blastCharge1,-37,13,20,28);
					} else if (this.counter < 10) {
						ctx.drawImage(this.triBeam4, 0, 0);
						//ctx.drawImage(this.blastCharge1,-42,9.5,25,35);
					} else if (this.counter < 11) {
						ctx.drawImage(this.triBeam4, 0, 0);
						//ctx.drawImage(this.blastCharge1,-47,6,30,42);
					} else if (this.counter < 12) {
						ctx.drawImage(this.triBeam4, 0, 0);
						//ctx.drawImage(this.blastCharge1,-52,2.5,35,49);
					} else if (this.counter < 20) {
						ctx.drawImage(this.triBeam4, 0, 0);
						//ctx.drawImage(this.blastCharge1,-52,2.5,35,49);
					} else if (this.counter < 42) {
						this.blastRelease = true;
						if (this.counter < 22 && this.counter > 20) {
							if (app.main.blastExploded == true) {
								app.main.sound.playTaunt7(Math.round(getRandom(9, 10)));
							} else {
								app.main.sound.playTaunt7(Math.round(getRandom(0, 3)));
							}
						}
						if (this.arms == false) {
							if (this.counter < 21) {
								app.main.environment.flash = true;
								app.main.sound.playEnergyAttack(36);
								this.energy -= 15;
								if (this.left == true) {
									/* if(app.main.blastExploded == true){
         	app.main.sound.playTaunt7(9);
         	app.main.blastExploded = false;
         } else {
         	app.main.sound.playTaunt7(0);
         } */
									app.main.blasts.push(new app.Energy(this.position.x, this.position.y + 27, this.left, 4, 9));
								} else {
									/* if(app.main.blastExploded == true){
         	app.main.sound.playTaunt7(9);
         	app.main.blastExploded = false;
         } else {
         	app.main.sound.playTaunt7(1);
         } */
									app.main.blasts.push(new app.Energy(this.position.x + 60, this.position.y + 27, this.left, 4, 9));
								}
							}
							if (app.main.blastExploded == true) {
								ctx.drawImage(this.tauntTien, 0, 0);
							} else {
								ctx.drawImage(this.triBeam5, 0, 0);
							}
						} else if (this.arms == true) {
							if (this.counter < 21) {
								app.main.environment.flash = true;
								app.main.sound.playEnergyAttack(36);
								this.energy -= 15;
								if (this.left == true) {
									/* if(app.main.blastExploded == true){
         	app.main.sound.playTaunt7(9);
         	app.main.blastExploded = false;
         } else {
         	app.main.sound.playTaunt7(0);
         } */
									app.main.blasts.push(new app.Energy(this.position.x, this.position.y + 27, this.left, 4, 9));
								} else {
									/* if(app.main.blastExploded == true){
         	app.main.sound.playTaunt7(9);
         	app.main.blastExploded = false;
         } else {
         	app.main.sound.playTaunt7(2);
         } */
									app.main.blasts.push(new app.Energy(this.position.x + 60, this.position.y + 27, this.left, 4, 9));
								}
							}
							if (app.main.blastExploded == true) {
								ctx.drawImage(this.tauntTien, 0, 0);
							} else {
								ctx.drawImage(this.triBeam5, 0, 0);
							}
						}
					} else {
						if (this.arms == false) {
							this.arms = true;
						} else if (this.arms == true) {
							this.arms = false;
						}
						app.main.chance4 = Math.random();
						if (app.main.blastExploded == true) {
							ctx.drawImage(this.mad1Tien, 0, 0);
						} else {
							ctx.drawImage(this.triBeam5, 0, 0);
						}
						app.main.blastExploded = false;
						this.intensify = false;
						this.powerMove = false;
						this.fight = false;
						this.attacking = false;
						this.blasting = false;
						this.blastRelease = false;
					}
				} else {
					//FINGER BLAST
					if (this.counter < 3) {
						ctx.drawImage(this.blastPrep, 1, 6);
					} else if (this.counter < 5) {
						//ctx.drawImage(this.finger,-30,5);
					} else if (this.counter < 6) {
						app.main.sound.playEnergyAttack(27);
						//ctx.drawImage(this.finger,-30,5);
					} else if (this.counter < 7) {
						//ctx.drawImage(this.finger,-30,5);
						ctx.drawImage(this.blastCharge1, -39, 20, 10, 10);
					} else if (this.counter < 8) {
						//ctx.drawImage(this.finger,-30,5);
						ctx.drawImage(this.blastCharge1, -44, 16.5, 15, 17);
					} else if (this.counter < 9) {
						//ctx.drawImage(this.finger,-30,5);
						ctx.drawImage(this.blastCharge1, -39, 20, 10, 10);
					} else if (this.counter < 10) {
						//ctx.drawImage(this.finger,-30,5);
						ctx.drawImage(this.blastCharge1, -44, 16.5, 15, 17);
					} else if (this.counter < 11) {
						//ctx.drawImage(this.finger,-30,5);
						ctx.drawImage(this.blastCharge1, -39, 20, 10, 10);
					} else if (this.counter < 20) {
						if (this.arms == false) {
							if (this.counter < 12) {
								app.main.sound.playEnergyAttack(1);
								this.energy -= 5;
								if (this.left == true) {
									app.main.blasts.push(new app.Energy(this.position.x, this.position.y + 27, this.left, 4, 9));
								} else {
									app.main.blasts.push(new app.Energy(this.position.x + 60, this.position.y + 27, this.left, 4, 9));
								}
							}
							ctx.drawImage(this.finger, -30, 5);
						} else if (this.arms == true) {
							if (this.counter < 12) {
								app.main.sound.playEnergyAttack(1);
								this.energy -= 5;
								if (this.left == true) {
									app.main.blasts.push(new app.Energy(this.position.x, this.position.y + 27, this.left, 4, 9));
								} else {
									app.main.blasts.push(new app.Energy(this.position.x + 60, this.position.y + 27, this.left, 4, 9));
								}
							}
							ctx.drawImage(this.finger, -30, 5);
						}
					} else {
						if (this.arms == false) {
							this.arms = true;
						} else if (this.arms == true) {
							this.arms = false;
						}
						ctx.drawImage(this.blastPrep, 1, 6);
						app.main.chance4 = Math.random();
						this.intensify = false;
						this.powerMove = false;
						this.fight = false;
						this.attacking = false;
						this.blasting = false;
					}
				}
				//TAUNT
			} else if (this.taunting == true && this.hit == false && this.hardHit != true) {
				if (this.counter < 50) {
					//this.stun = true;
					ctx.drawImage(this.tauntTien, 0, 0);
					if (this.counter > 5 && this.counter < 7) {
						//app.main.sound.playTaunt2(Math.round(this.tauntPick));
					}
					if (this.hit == true || this.hardHit == true || this.taunting == false) {
						this.aiTaunting = false;
						this.intensify = false;
						this.taunting = false;
						//this.stun = false;
					}
				} else {
					ctx.drawImage(this.tauntTien, 0, 0);
					//this.counter = 0;
					this.stamina = 28;
					this.exhausted = false;
					//this.stun = false;
					this.intensify = false;
					this.taunting = false;
				}
				//Energy Charge
			} else if (this.charging == true && this.hit == false && this.hardHit != true) {
				if (this.counter < 100) {
					if (this.counter == 5) {
						app.main.sound.playTaunt2(Math.round(getRandom(28, 29)));
					}
					//this.stun = true;
					if (this.counter > 8) {
						this.energy += 1.5;
					}
					ctx.drawImage(this.charge, 0, 14);
					if (this.counter > 6) {
						if (this.counter < 8) {
							app.main.sound.playEffect(28);
						}
						this.chargeCounter++;
						ctx.save();
						ctx.globalAlpha = .006 * this.energy;
						if (this.chargeCounter < 2) {
							if (this.superForm == false) {
								ctx.drawImage(this.auraWhite1, -73, -100);
							} else {
								ctx.drawImage(this.auraYellow1, -73, -100);
							}
						} else if (this.chargeCounter < 3) {
							if (this.superForm == false) {
								ctx.drawImage(this.auraWhite2, -73, -100);
							} else {
								ctx.drawImage(this.auraYellow2, -73, -100);
							}
						} else if (this.chargeCounter < 4) {
							if (this.superForm == false) {
								ctx.drawImage(this.auraWhite3, -73, -100);
							} else {
								ctx.drawImage(this.auraYellow3, -73, -100);
							}
						} else if (this.chargeCounter < 5) {
							if (this.superForm == false) {
								ctx.drawImage(this.auraWhite4, -73, -100);
							} else {
								ctx.drawImage(this.auraYellow4, -73, -100);
							}
							this.chargeCounter = 0;
						}
						ctx.restore();
					}
					if (this.energy > 99) {
						app.main.sound.stopEffect();
						//Play voice
						//this.stun = false;
						this.intensify = false;
						this.charging = false;
					}
					if (this.hit == true || this.hardHit == true || this.charging == false) {
						app.main.sound.stopEffect();
						this.aiCharging = false;
						this.intensify = false;
						this.charging = false;
						//this.stun = false;
					}

					/*
     if(this.counter > 19 && this.counter < 21){
     	app.main.sound.playTaunt2(Math.round(this.tauntPick));
     }
     */
				} else {
					ctx.drawImage(this.charge, 0, 14);
					//this.stun = false;
					this.intensify = false;
					this.charging = false;
				}
				//BASIC HIT
			} else if (this.hit == true && this.hardHit == false && this.end == false) {
				if (this.stunCounter < 3) {
					if (this.focus17 == false) {
						if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
							app.main.roundScore += 21;
						} else if (app.main.android17.attacking == true) {
							app.main.roundScore2 += 21;
						}
					} else if (this.focus17 == true) {
						if (app.main.android17.attacking == true) {
							app.main.roundScore2 += 21;
						} else if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
							app.main.roundScore += 21;
						}
					}
					this.stun = true;
					ctx.drawImage(this.hit1Tien, 0, 0);
				} else {
					this.defBreak++;
					ctx.drawImage(this.hit1Tien, 0, 0);
					this.stun = false;
					this.hit = false;
				}
				//HARD HIT
			} else if (this.hardHit == true && this.hit == true && (this.air == false || this.blasted == true) && this.end == false) {
				if (this.stunCounter < 22) {
					if (this.focus17 == false) {
						if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
							app.main.roundScore += 7;
						} else if (app.main.android17.attacking == true) {
							app.main.roundScore2 += 7;
						}
					} else if (this.focus17 == true) {
						if (app.main.android17.attacking == true) {
							app.main.roundScore2 += 7;
						} else if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
							app.main.roundScore += 7;
						}
					}
					this.stun = true;
					ctx.drawImage(this.hitHardTien, 0, 0);
				} else {
					ctx.drawImage(this.hitHardTien, 0, 0);
					this.stun = false;
					this.hardHit = false;
					this.hit = false;
					this.blasted = false;
					this.prepBlast = false;
				}
				//HARD HIT AIR
			} else if (this.hardHit == true && this.hit == true && this.air == true && this.end == false) {
				if (this.punched == true) {
					if (this.stunCounter < 22) {
						if (this.focus17 == false) {
							if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
								app.main.roundScore += 7;
							} else if (app.main.android17.attacking == true) {
								app.main.roundScore2 += 7;
							}
						} else if (this.focus17 == true) {
							if (app.main.android17.attacking == true) {
								app.main.roundScore2 += 7;
							} else if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
								app.main.roundScore += 7;
							}
						}
						this.stun = true;
						ctx.drawImage(this.fallDownTien, 0, 0);
					} else {
						ctx.drawImage(this.fallDownTien, 0, 0);
						this.stun = false;
						this.hardHit = false;
						this.hit = false;
						this.prepBlast = false;
					}
				} else {
					this.punched == true;
					if (this.stunCounter < 22) {
						if (this.focus17 == false) {
							if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
								app.main.roundScore += 7;
							} else if (app.main.android17.attacking == true) {
								app.main.roundScore2 += 7;
							}
						} else if (this.focus17 == true) {
							if (app.main.android17.attacking == true) {
								app.main.roundScore2 += 7;
							} else if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
								app.main.roundScore += 7;
							}
						}
						this.stun = true;
						ctx.drawImage(this.fallSideTien, 0, 0);
					} else {
						ctx.drawImage(this.fallSideTien, 0, 0);
						this.stun = false;
						this.hardHit = false;
						this.hit = false;
						this.prepBlast = false;
					}
				}
			} else if (this.end == true) {
				if (this.air == true) {
					this.stun = true;
					ctx.drawImage(this.fallDownTien, 0, 0);
				} else {
					this.unable = true;
					this.prepBlast = false;
					this.stun = true;
					ctx.drawImage(this.groundTien, 0, 0);
					if (this.deadCount == false) {
						app.main.kills += 1;
						this.deadCount = true;
					}
					if (this.stunCounter > 10) {
						this.vanish = true;
						app.main.environment.deathTienDirLeft = this.left;
						app.main.environment.deathLocationTien = new Victor(this.position.x, this.position.y);
						this.dead = true;
					}
				}
			}
			ctx.restore();
		} //end if


		// ------------ DRAWS FOR KRILLIN ---------------------------------------------
		// ------------ DRAWS FOR KRILLIN ---------------------------------------------
		// ------------ DRAWS FOR KRILLIN ---------------------------------------------
		if (this.vanish == false && this.krillin == true) {
			//NON MOVING DRAWS
			if (this.cinematic == true) {
				if (this.cine == 0) {
					ctx.drawImage(this.solarKrillin, 0, 0);
				} else if (this.cine == 1) {
					ctx.drawImage(this.mad1Krillin, 0, 0);
				}
			} else if (this.velocity.x == 0 && this.attacking != true && this.blocking != true && this.taunting != true && this.hit == false && this.hardHit != true && this.blasting == false && this.charging != true && this.end == false) {
				if (this.up == true && this.flying == true || this.jumpVelocity.y < 15 && this.air == true) {
					if (this.lookUp == true) {
						ctx.drawImage(this.flyUpUpKrillin, 0, 0);
					} else if (this.lookDown == true) {
						ctx.drawImage(this.flyUpDownKrillin, 0, 0);
					} else {
						ctx.drawImage(this.flyUpKrillin, 0, 0);
					}
				} else if (this.exhausted == true) {
					ctx.drawImage(this.injuredKrillin, 0, 0);
				} else if (this.down == true && this.air == true) {
					ctx.drawImage(this.flyDownFastKrillin, 0, 0);
				} else if (this.down == false && this.air == true && this.up == false) {
					ctx.drawImage(this.flyDownSlowKrillin, 0, 0);
				} else {
					if (this.lookUp == true) {
						ctx.drawImage(this.stanceUpKrillin, 0, 0);
					} else if (this.lookDown == true) {
						ctx.drawImage(this.stanceDownKrillin, 0, 0);
					} else {
						ctx.drawImage(this.stanceKrillin, 0, 0);
					}
				}
				//MOVING DRAWS
			} else if (this.velocity.x != 0 && this.attacking != true && this.blocking != true && this.hit == false && this.hardHit != true && this.blasting == false && this.taunting != true && this.charging == false && this.end == false) {
				//&& (this.fallingKick == false || this.air == false)
				if (this.slow == true && this.reverse == false) {
					ctx.drawImage(this.slowFlyKrillin, 0, 0);
				} else if (this.fast == true && this.reverse == false) {
					ctx.drawImage(this.fastFlyKrillin, 0, 0);
				} else if (this.exhausted == true) {
					ctx.drawImage(this.injuredKrillin, 0, 0);
				} else if (this.reverse == true) {
					ctx.drawImage(this.moveReverseKrillin, 0, 0);
				} else if (this.air == true && this.up == false) {
					ctx.drawImage(this.flyDownSlowKrillin, 0, 0);
				} else {
					if (this.lookUp == true) {
						ctx.drawImage(this.stanceUpKrillin, 0, 0);
					} else if (this.lookDown == true) {
						ctx.drawImage(this.stanceDownKrillin, 0, 0);
					} else {
						ctx.drawImage(this.stanceKrillin, 0, 0);
					}
				}
				//POWERFUL BLAST
			} else if (this.powerMove == true && this.blasting == true && this.hit == false && this.fallingKick == false) {
				//console.log("POWERMOVEEEEE");
				app.main.chance5 = .6;
				if (app.main.chance5 > .5) {
					if (this.counter < 4) {
						ctx.drawImage(this.disk1, 0, 0);
					} else if (this.counter < 5) {
						if (this.energyUse > 3) {
							this.intensify = false;
							this.powerMove = false;
							this.fight = false;
							this.attacking = false;
							this.blasting = false;
							this.exhausted = true;
						} else {
							this.energyUse++;
						}
						ctx.drawImage(this.disk1, 0, 0);
						app.main.sound.playTaunt8(Math.round(getRandom(0, 2)));
					} else if (this.counter < 6) {
						//app.main.sound.playEnergyAttack(25);
						app.main.sound.playEnergyAttack(32);
						ctx.drawImage(this.disk1, 0, 0);
					} else if (this.counter < 7) {
						ctx.drawImage(this.disk1, 0, 0);
						ctx.drawImage(this.energyDisk1, 150, 65, 39, 12);
					} else if (this.counter < 8) {
						ctx.drawImage(this.disk1, 0, 0);
						ctx.drawImage(this.energyDisk1, 146, 63, 45, 14);
					} else if (this.counter < 9) {
						ctx.drawImage(this.disk1, 0, 0);
						ctx.drawImage(this.energyDisk1, 150, 65, 39, 12);
					} else if (this.counter < 10) {
						ctx.drawImage(this.disk1, 0, 0);
						ctx.drawImage(this.energyDisk1, 146, 63, 45, 14);
					} else if (this.counter < 11) {
						ctx.drawImage(this.disk1, 0, 0);
						if (this.triggerBlast == false) {
							this.counter = 6;
						}
					} else if (this.counter < 12) {
						ctx.drawImage(this.disk2, 0, 0);
					} else if (this.counter < 13) {
						ctx.drawImage(this.disk3, 0, 0);
					} else if (this.counter < 40) {
						if (this.arms == false) {
							if (this.counter < 14) {
								app.main.sound.playEnergyAttack(33);
								this.energy -= 15;
								if (this.left == true) {
									app.main.sound.playTaunt8(3);
									app.main.blasts.push(new app.Energy(this.position.x - 20, this.position.y + 67, this.left, 5, 10));
								} else {
									app.main.sound.playTaunt8(4);
									app.main.blasts.push(new app.Energy(this.position.x + 80, this.position.y + 67, this.left, 5, 10));
								}
							}
							ctx.drawImage(this.disk4, 0, 0);
						} else if (this.arms == true) {
							if (this.counter < 14) {
								app.main.sound.playEnergyAttack(33);
								this.energy -= 15;
								if (this.left == true) {
									app.main.sound.playTaunt8(3);
									app.main.blasts.push(new app.Energy(this.position.x - 20, this.position.y + 67, this.left, 5, 10));
								} else {
									app.main.sound.playTaunt8(4);
									app.main.blasts.push(new app.Energy(this.position.x + 80, this.position.y + 67, this.left, 5, 10));
								}
							}
							ctx.drawImage(this.disk4, 0, 0);
						}
					} else {
						if (this.arms == false) {
							this.arms = true;
						} else if (this.arms == true) {
							this.arms = false;
						}
						app.main.chance5 = Math.random();
						ctx.drawImage(this.stanceKrillin, 0, 0);
						this.intensify = false;
						this.powerMove = false;
						this.fight = false;
						this.attacking = false;
						this.blasting = false;
					}
				} else {
					//FINGER BLAST
					if (this.counter < 3) {
						ctx.drawImage(this.blastPrep, 1, 6);
					} else if (this.counter < 5) {
						//ctx.drawImage(this.finger,-30,5);
					} else if (this.counter < 6) {
						app.main.sound.playEnergyAttack(27);
						//ctx.drawImage(this.finger,-30,5);
					} else if (this.counter < 7) {
						//ctx.drawImage(this.finger,-30,5);
						ctx.drawImage(this.blastCharge1, -39, 20, 10, 10);
					} else if (this.counter < 8) {
						//ctx.drawImage(this.finger,-30,5);
						ctx.drawImage(this.blastCharge1, -44, 16.5, 15, 17);
					} else if (this.counter < 9) {
						//ctx.drawImage(this.finger,-30,5);
						ctx.drawImage(this.blastCharge1, -39, 20, 10, 10);
					} else if (this.counter < 10) {
						//ctx.drawImage(this.finger,-30,5);
						ctx.drawImage(this.blastCharge1, -44, 16.5, 15, 17);
					} else if (this.counter < 11) {
						//ctx.drawImage(this.finger,-30,5);
						ctx.drawImage(this.blastCharge1, -39, 20, 10, 10);
					} else if (this.counter < 20) {
						if (this.arms == false) {
							if (this.counter < 12) {
								app.main.sound.playEnergyAttack(1);
								this.energy -= 5;
								if (this.left == true) {
									app.main.blasts.push(new app.Energy(this.position.x, this.position.y + 27, this.left, 1, 2));
								} else {
									app.main.blasts.push(new app.Energy(this.position.x + 60, this.position.y + 27, this.left, 1, 2));
								}
							}
							ctx.drawImage(this.finger, -30, 5);
						} else if (this.arms == true) {
							if (this.counter < 12) {
								app.main.sound.playEnergyAttack(1);
								this.energy -= 5;
								if (this.left == true) {
									app.main.blasts.push(new app.Energy(this.position.x, this.position.y + 27, this.left, 1, 2));
								} else {
									app.main.blasts.push(new app.Energy(this.position.x + 60, this.position.y + 27, this.left, 2));
								}
							}
							ctx.drawImage(this.finger, -30, 5);
						}
					} else {
						if (this.arms == false) {
							this.arms = true;
						} else if (this.arms == true) {
							this.arms = false;
						}
						ctx.drawImage(this.blastPrep, 1, 6);
						app.main.chance5 = Math.random();
						this.intensify = false;
						this.powerMove = false;
						this.fight = false;
						this.attacking = false;
						this.blasting = false;
					}
				}
				//TAUNT
			} else if (this.taunting == true && this.hit == false && this.hardHit != true) {
				if (this.counter < 25) {
					//this.stun = true;
					ctx.drawImage(this.tauntKrillin, 0, 0);
					if (this.counter > 5 && this.counter < 7) {
						app.main.sound.playTaunt2(Math.round(this.tauntPick));
					}
					if (this.hit == true || this.hardHit == true || this.taunting == false) {
						this.aiTaunting = false;
						this.intensify = false;
						this.taunting = false;
						//this.stun = false;
					}
				} else {
					ctx.drawImage(this.tauntKrillin, 0, 0);
					//this.counter = 0;
					this.stamina = 28;
					this.exhausted = false;
					//this.stun = false;
					this.intensify = false;
					this.taunting = false;
				}
				//Energy Charge
			} else if (this.charging == true && this.hit == false && this.hardHit != true) {
				if (this.counter < 100) {
					if (this.counter == 5) {
						app.main.sound.playTaunt2(Math.round(getRandom(28, 29)));
					}
					//this.stun = true;
					if (this.counter > 8) {
						this.energy += 1.5;
					}
					ctx.drawImage(this.charge, 0, 14);
					if (this.counter > 6) {
						if (this.counter < 8) {
							app.main.sound.playEffect(28);
						}
						this.chargeCounter++;
						ctx.save();
						ctx.globalAlpha = .006 * this.energy;
						if (this.chargeCounter < 2) {
							if (this.superForm == false) {
								ctx.drawImage(this.auraWhite1, -73, -100);
							} else {
								ctx.drawImage(this.auraYellow1, -73, -100);
							}
						} else if (this.chargeCounter < 3) {
							if (this.superForm == false) {
								ctx.drawImage(this.auraWhite2, -73, -100);
							} else {
								ctx.drawImage(this.auraYellow2, -73, -100);
							}
						} else if (this.chargeCounter < 4) {
							if (this.superForm == false) {
								ctx.drawImage(this.auraWhite3, -73, -100);
							} else {
								ctx.drawImage(this.auraYellow3, -73, -100);
							}
						} else if (this.chargeCounter < 5) {
							if (this.superForm == false) {
								ctx.drawImage(this.auraWhite4, -73, -100);
							} else {
								ctx.drawImage(this.auraYellow4, -73, -100);
							}
							this.chargeCounter = 0;
						}
						ctx.restore();
					}
					if (this.energy > 99) {
						app.main.sound.stopEffect();
						//Play voice
						//this.stun = false;
						this.intensify = false;
						this.charging = false;
					}
					if (this.hit == true || this.hardHit == true || this.charging == false) {
						app.main.sound.stopEffect();
						this.aiCharging = false;
						this.intensify = false;
						this.charging = false;
						//this.stun = false;
					}

					/*
     if(this.counter > 19 && this.counter < 21){
     	app.main.sound.playTaunt2(Math.round(this.tauntPick));
     }
     */
				} else {
					ctx.drawImage(this.charge, 0, 14);
					//this.stun = false;
					this.intensify = false;
					this.charging = false;
				}
				//BASIC HIT
			} else if (this.hit == true && this.hardHit == false && this.end == false) {
				if (this.stunCounter < 3) {
					if (this.focus17 == false) {
						if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
							app.main.roundScore += 21;
						} else if (app.main.android17.attacking == true) {
							app.main.roundScore2 += 21;
						}
					} else if (this.focus17 == true) {
						if (app.main.android17.attacking == true) {
							app.main.roundScore2 += 21;
						} else if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
							app.main.roundScore += 21;
						}
					}
					this.stun = true;
					ctx.drawImage(this.hit1Krillin, 0, 0);
				} else {
					this.defBreak++;
					ctx.drawImage(this.hit1Krillin, 0, 0);
					this.stun = false;
					this.hit = false;
				}
				//HARD HIT
			} else if (this.hardHit == true && this.hit == true && (this.air == false || this.blasted == true) && this.end == false) {
				if (this.stunCounter < 22) {
					if (this.focus17 == false) {
						if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
							app.main.roundScore += 7;
						} else if (app.main.android17.attacking == true) {
							app.main.roundScore2 += 7;
						}
					} else if (this.focus17 == true) {
						if (app.main.android17.attacking == true) {
							app.main.roundScore2 += 7;
						} else if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
							app.main.roundScore += 7;
						}
					}
					this.stun = true;
					ctx.drawImage(this.hitHardKrillin, 0, 0);
				} else {
					ctx.drawImage(this.hitHardKrillin, 0, 0);
					this.stun = false;
					this.hardHit = false;
					this.hit = false;
					this.blasted = false;
					this.prepBlast = false;
				}
				//HARD HIT AIR
			} else if (this.hardHit == true && this.hit == true && this.air == true && this.end == false) {
				if (this.punched == true) {
					if (this.stunCounter < 22) {
						if (this.focus17 == false) {
							if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
								app.main.roundScore += 7;
							} else if (app.main.android17.attacking == true) {
								app.main.roundScore2 += 7;
							}
						} else if (this.focus17 == true) {
							if (app.main.android17.attacking == true) {
								app.main.roundScore2 += 7;
							} else if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
								app.main.roundScore += 7;
							}
						}
						this.stun = true;
						ctx.drawImage(this.fallDownKrillin, 0, 0);
					} else {
						ctx.drawImage(this.fallDownKrillin, 0, 0);
						this.stun = false;
						this.hardHit = false;
						this.hit = false;
						this.prepBlast = false;
					}
				} else {
					if (this.stunCounter < 22) {
						if (this.focus17 == false) {
							if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
								app.main.roundScore += 7;
							} else if (app.main.android17.attacking == true) {
								app.main.roundScore2 += 7;
							}
						} else if (this.focus17 == true) {
							if (app.main.android17.attacking == true) {
								app.main.roundScore2 += 7;
							} else if (app.main.android18.attacking == true && app.main.android18.missed == false && app.main.android18.attackPrep == false) {
								app.main.roundScore += 7;
							}
						}
						this.stun = true;
						ctx.drawImage(this.fallSideKrillin, 0, 0);
					} else {
						ctx.drawImage(this.fallSideKrillin, 0, 0);
						this.stun = false;
						this.hardHit = false;
						this.hit = false;
						this.prepBlast = false;
					}
				}
			} else if (this.end == true) {
				if (this.air == true) {
					this.stun = true;
					ctx.drawImage(this.fallDownKrillin, 0, 0);
				} else {
					this.unable = true;
					this.prepBlast = false;
					this.stun = true;
					ctx.drawImage(this.groundKrillin, 0, 0);
					if (this.deadCount == false) {
						app.main.kills += 1;
						this.deadCount = true;
					}
					if (this.stunCounter > 10) {
						this.vanish = true;
						app.main.environment.deathKrillinDirLeft = this.left;
						app.main.environment.deathLocationKrillin = new Victor(this.position.x, this.position.y);
						this.dead = true;
					}
				}
			}
		} //end if


		//SUPER SPEED (TELEPORT) DRAW 
		if (this.superSpeed == true && this.appear == false && this.superSpeedExhaustion == false) {
			this.speedCounter++;
			ctx.save();
			ctx.scale(1.2, 1.2);
			//console.log("Counter" + this.counter);
			//console.log("S-Counter" + this.speedCounter);
			if (this.counter < 4) {
				if (this.counter < 2) {
					//console.log("STAGE 2");
					app.main.sound.playSpecialReaction2(19);
				}
				if (this.speedCounter < 2) {
					if (this.piccolo == true) {
						ctx.drawImage(this.teleport2, -10, -5);
					} else if (this.gero == true) {
						ctx.drawImage(this.teleport3, -10, -5);
					} else if (this.vegeta == true) {
						ctx.drawImage(this.teleport, -10, -5);
					} else if (this.gohan == true) {
						ctx.drawImage(this.teleport2, 10, 30);
					} else if (this.tien == true) {
						ctx.drawImage(this.teleport5, 110, 70);
					} else if (this.krillin == true) {
						ctx.drawImage(this.teleport6, 100, 70);
					} else {
						ctx.drawImage(this.teleport, -10, -5);
					}
				} else if (this.speedCounter < 3) {
					//blink
				} else {
					//console.log("Speed reset");
					this.speedCounter = 0;
				}
			} else if (this.counter < 7) {
				//console.log("STAGE 3");
				this.stun = true;
				this.vanish = true;
				if (this.speedCounter < 2) {
					if (this.piccolo == true) {
						ctx.drawImage(this.teleport2, -10, -5);
						ctx.drawImage(this.teleport2, -10, -2);
					} else if (this.gero == true) {
						ctx.drawImage(this.teleport3, -10, -5);
						ctx.drawImage(this.teleport3, -10, -2);
					} else if (this.vegeta == true) {
						ctx.drawImage(this.teleport, -10, -5);
						ctx.drawImage(this.teleport, -10, -2);
					} else if (this.gohan == true) {
						ctx.drawImage(this.teleport2, 10, 30);
						ctx.drawImage(this.teleport2, 10, 33);
					} else if (this.tien == true) {
						ctx.drawImage(this.teleport5, 110, 70);
						ctx.drawImage(this.teleport5, 110, 73);
					} else if (this.krillin == true) {
						ctx.drawImage(this.teleport6, 100, 70);
						ctx.drawImage(this.teleport6, 100, 73);
					} else {
						ctx.drawImage(this.teleport, -10, -5);
						ctx.drawImage(this.teleport, -10, -2);
					}
				} else if (this.speedCounter < 3) {
					//blink
				} else {
					this.speedCounter = 0;
				}
			} else if (this.counter < 8) {
				//console.log("STAGE 4");
				this.speed();
			} else if (this.counter < 12) {
				if (this.speedCounter < 2) {
					if (this.piccolo == true) {
						ctx.drawImage(this.teleport2, -10, -5);
						ctx.drawImage(this.teleport2, -10, -2);
					} else if (this.gero == true) {
						ctx.drawImage(this.teleport3, -10, -5);
						ctx.drawImage(this.teleport3, -10, -2);
					} else if (this.vegeta == true) {
						ctx.drawImage(this.teleport, -10, -5);
						ctx.drawImage(this.teleport, -10, -2);
					} else if (this.gohan == true) {
						ctx.drawImage(this.teleport2, 10, 30);
						ctx.drawImage(this.teleport2, 10, 33);
					} else if (this.tien == true) {
						ctx.drawImage(this.teleport5, 110, 70);
						ctx.drawImage(this.teleport5, 110, 73);
					} else if (this.krillin == true) {
						ctx.drawImage(this.teleport6, 100, 70);
						ctx.drawImage(this.teleport6, 100, 73);
					} else {
						ctx.drawImage(this.teleport, -10, -5);
						ctx.drawImage(this.teleport, -10, -2);
					}
				} else if (this.speedCounter < 3) {
					//blink
				} else {
					this.speedCounter = 0;
				}
			} else if (this.counter < 15) {
				this.velocity.x = 0;
				this.decel.x = 0;
				//this.jumpVelocity.y = 0;
				this.vanish = false;
				if (this.speedCounter < 2) {
					if (this.piccolo == true) {
						ctx.drawImage(this.teleport2, -10, -5);
					} else if (this.gero == true) {
						ctx.drawImage(this.teleport3, -10, -5);
					} else if (this.vegeta == true) {
						ctx.drawImage(this.teleport, -10, -5);
					} else if (this.gohan == true) {
						ctx.drawImage(this.teleport2, -10, 30);
					} else if (this.tien == true) {
						ctx.drawImage(this.teleport5, 110, 70);
					} else if (this.krillin == true) {
						ctx.drawImage(this.teleport6, 100, 70);
					} else {
						ctx.drawImage(this.teleport, -10, -5);
					}
				} else if (this.speedCounter < 3) {
					//blink
				} else {
					this.speedCounter = 0;
				}
			} else {
				app.main.sound.playSpecialReaction2(20);
				this.stun = false;
				this.fight = false;
				app.main.aiChoice2 = Math.random();
				this.counter = 0;
				this.superSpeed = false;
				this.superSpeedExhaustion = true;
				this.speedExhaust = 0;
			}
			ctx.restore();
		}

		//SPECIAL SCENE VERSION OF SUPER SPEED
		if (this.appear == true && this.superSpeed == true) {
			this.speedCounter++;
			ctx.save();
			ctx.scale(1.2, 1.2);
			if (this.counter < 5) {
				if (this.speedCounter < 2) {
					if (this.piccolo == true) {
						ctx.drawImage(this.teleport2, -10, -5);
						ctx.drawImage(this.teleport2, -10, -2);
					} else if (this.gero == true) {
						ctx.drawImage(this.teleport3, -10, -5);
						ctx.drawImage(this.teleport3, -10, -2);
					} else if (this.vegeta == true) {
						ctx.drawImage(this.teleport, -10, -5);
						ctx.drawImage(this.teleport, -10, -2);
					} else if (this.gohan == true) {
						ctx.drawImage(this.teleport2, 10, 30);
						ctx.drawImage(this.teleport2, 10, 33);
					} else if (this.tien == true) {
						ctx.drawImage(this.teleport5, 110, 70);
						ctx.drawImage(this.teleport5, 110, 73);
					} else if (this.krillin == true) {
						ctx.drawImage(this.teleport6, 100, 70);
						ctx.drawImage(this.teleport6, 100, 73);
					} else {
						ctx.drawImage(this.teleport, -10, -5);
						ctx.drawImage(this.teleport, -10, -2);
					}
				} else if (this.speedCounter < 3) {
					//blink
				} else {
					this.speedCounter = 0;
				}
			} else if (this.counter < 8) {
				this.vanish = false;
				if (this.speedCounter < 2) {
					if (this.piccolo == true) {
						ctx.drawImage(this.teleport2, -10, -5);
					} else if (this.gero == true) {
						ctx.drawImage(this.teleport3, -10, -5);
					} else if (this.vegeta == true) {
						ctx.drawImage(this.teleport, -10, -5);
					} else if (this.gohan == true) {
						ctx.drawImage(this.teleport, 10, 30);
					} else if (this.tien == true) {
						ctx.drawImage(this.teleport5, 110, 70);
					} else if (this.krillin == true) {
						ctx.drawImage(this.teleport6, 100, 70);
					} else {
						ctx.drawImage(this.teleport, -10, -5);
					}
				} else if (this.speedCounter < 3) {
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

	return Vegeta;
}(); //end IIFE

"use strict";

var app = app || {};

//HANDLES VIDEO CONTENT
app.Vid = function () {

	function Vid() {

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

	Vid.prototype.start = function () {
		this.bar.style.zIndex = 3;
		this.videoPos.style.zIndex = 2;
		this.vid.play();
	};

	Vid.prototype.end = function () {
		this.bar.style.zIndex = -3;
		this.videoPos.style.zIndex = -1;
		this.vid.pause();
	};

	Vid.prototype.rewind = function () {
		this.vid.currentTime = 0;
		this.vid2.currentTime = 0;
		this.vid3.currentTime = 0;
		this.vid4.currentTime = 0;
	};

	Vid.prototype.startE = function () {
		this.videoPos2.style.zIndex = 3;
		this.vid2.play();
	};

	Vid.prototype.endE = function () {
		this.videoPos2.style.zIndex = -2;
		this.vid2.pause();
	};

	Vid.prototype.startO = function () {
		this.canvasEX.style.zIndex = -3;
		this.bar2.style.zIndex = 3;
		this.bar3.style.zIndex = 3;
		this.border.style.zIndex = 4;
		this.videoPos3.style.zIndex = 3;
		this.vid3.play();
	};

	Vid.prototype.pauseS = function () {
		this.vid4.pause();
	};

	Vid.prototype.pauseO = function () {
		this.vid3.pause();
	};

	Vid.prototype.pauseE = function () {
		this.vid2.pause();
	};

	Vid.prototype.pause = function () {
		this.vid.pause();
	};

	Vid.prototype.endO = function () {
		this.bar2.style.zIndex = -3;
		this.bar3.style.zIndex = -3;
		this.videoPos3.style.zIndex = -2;
		this.border.style.zIndex = -3;
		this.vid3.pause();
	};

	Vid.prototype.startS = function () {
		this.videoPos4.style.zIndex = 5;
		this.vid4.play();
	};

	Vid.prototype.endS = function () {
		this.videoPos4.style.zIndex = -2;
		this.vid4.pause();
	};

	return Vid;
}(); //end IIFE
