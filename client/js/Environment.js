
"use strict";

var app = app || {};

//BACKGROUND AND FOREGROUND
app.Environment = (function(){
	
	function Environment(){
		
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
		this.spyLocation = new Victor(0,-100);
		
		this.remote = false;
		this.remoteTimer = 0;
		this.remotePosition = new Victor(0,0);
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
		this.position19 = new Victor(0,0);
		
		this.shadow18 = new Victor(0,0);
		this.shadow17 = new Victor(0,0);
		this.shadowVegeta = new Victor(0,0);
		this.shadowPiccolo = new Victor(0,0);
		this.shadowGohan = new Victor(0,0);
		this.shadowTien = new Victor(0,0);
		this.shadowKrillin = new Victor(0,0);
		this.shadowGero = new Victor(0,0);
		this.shadowYamcha = new Victor(0,0);
		this.shadowChaotzu = new Victor(0,0);
		
		this.yamcha = false;
		this.chaotzu = false;
		this.android16 = false;
		this.braced = false;
		this.movementYamcha = new Victor(0,0);
		this.movementChaotzu = new Victor(0,0);
		this.movement16 = new Victor(800,585);
		this.characterCounter = 0;
		this.tele16 = false;
		
		this.buildingActive = false;
		this.fallingBuilding = 0;
		
		this.cityAttacked = false;
		
		this.city17Counter = 0;
		this.blastHold = Math.round(getRandom(10,20));
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
		image.src =  app.environment.city;
		this.background = image;
		
		image = new Image();
		image.src =  app.environment.cityTop;
		this.backgroundTop = image;
		
		image = new Image();
		image.src =  app.environment.cityDamage1;
		this.cityDamage1 = image;
		
		image = new Image();
		image.src =  app.environment.building1;
		this.building1 = image;
		
		image = new Image();
		image.src =  app.environment.lab1;
		this.lab1 = image;
		
		image = new Image();
		image.src =  app.environment.remote2;
		this.remote2 = image;
		
		image = new Image();
		image.src =  app.environment.a19Head;
		this.a19Head = image;
		
		image = new Image();
		image.src =  app.environment.deadPiccolo;
		this.deadPiccolo = image;
		
		image = new Image();
		image.src =  app.environment.deadPiccolo2;
		this.deadPiccolo2 = image;
		
		image = new Image();
		image.src =  app.imagesVegeta.ground;
		this.deadVegeta = image;
		
		image = new Image();
		image.src =  app.environment.deadVegeta2;
		this.deadVegeta2 = image;
		
		image = new Image();
		image.src =  app.environment.deadVegeta3;
		this.deadVegeta3 = image;
		
		image = new Image();
		image.src =  app.environment.deadVegeta4;
		this.deadVegeta4 = image;
		
		image = new Image();
		image.src =  app.imagesTien.ground;
		this.deadTien = image;
		
		image = new Image();
		image.src =  app.imagesTien.ground2;
		this.deadTien2 = image;
		
		image = new Image();
		image.src =  app.imagesKrillin.ground;
		this.deadKrillin = image;
		
		image = new Image();
		image.src =  app.imagesKrillin.ground2;
		this.deadKrillin2 = image;
		
		image = new Image();
		image.src =  app.environment.smoke1;
		this.smoke1 = image;
		
		image = new Image();
		image.src =  app.environment.smoke2;
		this.smoke2 = image;
		
		image = new Image();
		image.src =  app.environment.smoke3;
		this.smoke3 = image;
		
		image = new Image();
		image.src =  app.environment.cape1;
		this.cape1 = image;
		
		image = new Image();
		image.src =  app.environment.cape2;
		this.cape2 = image;
		
		image = new Image();
		image.src =  app.environment.cape3;
		this.cape3 = image;
		
		image = new Image();
		image.src =  app.environment.cape4;
		this.cape4 = image;
		
		image = new Image();
		image.src =  app.environment.yamcha1;
		this.yamcha1 = image;
		
		image = new Image();
		image.src =  app.environment.yamcha2;
		this.yamcha2 = image;
		
		image = new Image();
		image.src =  app.environment.yamcha3;
		this.yamcha3 = image;
		
		image = new Image();
		image.src =  app.environment.yamcha4;
		this.yamcha4 = image;
		
		image = new Image();
		image.src =  app.environment.yamcha5;
		this.yamcha5 = image;
		
		image = new Image();
		image.src =  app.environment.chaotzu1;
		this.chaotzu1 = image;
		
		image = new Image();
		image.src =  app.environment.chaotzu2;
		this.chaotzu2 = image;
		
		image = new Image();
		image.src =  app.environment.chaotzu3;
		this.chaotzu3 = image;
		
		image = new Image();
		image.src =  app.environment.chaotzu4;
		this.chaotzu4 = image;
		
		image = new Image();
		image.src =  app.environment.yajirobe1;
		this.yajirobe1 = image;
		
		image = new Image();
		image.src =  app.images16.stance;
		this.a16Stance = image;
		
		image = new Image();
		image.src =  app.images16.stance2;
		this.a16Stance2 = image;
		
		image = new Image();
		image.src =  app.environment.groundDustA1;
		this.groundDustA1 = image;
		
		image = new Image();
		image.src =  app.environment.groundDustA2;
		this.groundDustA2 = image;
		
		image = new Image();
		image.src =  app.environment.groundDustA3;
		this.groundDustA3 = image;
		
		image = new Image();
		image.src =  app.environment.groundDustA4;
		this.groundDustA4 = image;
		
		image = new Image();
		image.src =  app.environment.groundDustB1;
		this.groundDustB1 = image;
		
		image = new Image();
		image.src =  app.environment.groundDustB2;
		this.groundDustB2 = image;
		
		image = new Image();
		image.src =  app.environment.groundDustB3;
		this.groundDustB3 = image;
		
		image = new Image();
		image.src =  app.environment.groundDustB4;
		this.groundDustB4 = image;
		
		image = new Image();
		image.src =  app.environment.groundDustC1;
		this.groundDustC1 = image;
		
		image = new Image();
		image.src =  app.environment.groundDustC2;
		this.groundDustC2 = image;
		
		image = new Image();
		image.src =  app.environment.groundDustC3;
		this.groundDustC3 = image;
		
		image = new Image();
		image.src =  app.environment.groundDustC4;
		this.groundDustC4 = image;
		
		image = new Image();
		image.src =  app.environment.gerosSpy1;
		this.gerosSpy1 = image;
		
		image = new Image();
		image.src =  app.environment.smog1;
		this.smog1 = image;
		
		image = new Image();
		image.src =  app.environment.smog2;
		this.smog2 = image;
		
		image = new Image();
		image.src =  app.environment.smog3;
		this.smog3 = image;
		
		image = new Image();
		image.src =  app.environment.smog4;
		this.smog4 = image;
		
		image = new Image();
		image.src =  app.environment.smog5;
		this.smog5 = image;
		
		image = new Image();
		image.src =  app.environment.smog6;
		this.smog6 = image;
		
		image = new Image();
		image.src =  app.environment.smog7;
		this.smog7 = image;
		
		image = new Image();
		image.src =  app.environment.smog8;
		this.smog8 = image;
		
		image = new Image();
		image.src =  app.environment.smog9;
		this.smog9 = image;
		
		image = new Image();
		image.src =  app.environment.smog10;
		this.smog10 = image;
		
		image = new Image();
		image.src =  app.environment.smog11;
		this.smog11 = image;
		
		image = new Image();
		image.src =  app.environment.smog1;
		this.smog1 = image;
		
		image = new Image();
		image.src =  app.environment.smog12;
		this.smog12 = image;
		
		image = new Image();
		image.src =  app.environment.smog13;
		this.smog13 = image;
		
		image = new Image();
		image.src =  app.environment.smog14;
		this.smog14 = image;
		
		image = new Image();
		image.src =  app.environment.smog15;
		this.smog15 = image;
		
		image = new Image();
		image.src =  app.environment.smog16;
		this.smog16 = image;
		
		image = new Image();
		image.src =  app.images17.stance;
		this.stance17 = image;
		
		image = new Image();
		image.src =  app.images17.blast;
		this.blast17 = image;
		
		image = new Image();
		image.src =  app.attack.blast1;
		this.blast1 = image;
		
		image = new Image();
		image.src =  app.attack.tele5;
		this.teleport5 = image;
	}
	
	//CHANGE ENVIRONMENT
	Environment.prototype.update = function(){
		if(this.bounce == false){
			if(this.deathLocationPiccolo.y < 620){
				this.deathLocationPiccolo.y = 620;
			}
			
			if(this.deathLocationVegeta.y < 620){
				this.deathLocationVegeta.y = 620;
			}
		}
		
		//console.log(this.bounce);
		if(this.shake == true){
			this.offsetTimer++;
			this.bouncing = true;
			//console.log(this.offsetTimer);
			if(this.offsetTimer < 3){
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
		if(this.bouncing == true){
			this.bounce = this.bounce + ((6 + Math.round(getRandom(0,6)))/this.bounceCounter);
			if(this.offsets == true){
				if(this.cape == true){
				if(this.capeLocation.x < -400){
					//console.log("FIRST");
					this.capeOffset = Math.round(getRandom(0,20));
				} else if(this.capeLocation.x > 400){
					//console.log("SECOND");
					this.capeOffset = Math.round(getRandom(0,20));
					this.capeOffset = this.capeOffset * -1;
				} else {
					//console.log("THIRD");
					this.capeOffset = Math.round(getRandom(0,20));
					if(this.capeRandom < .5){
						this.capeOffset = this.capeOffset * -1;
					}
				}
				}
				if(app.main.piccoloDead == true){
				if(this.deathLocationPiccolo.x < -400){
					this.piccoloOffset = Math.round(getRandom(0,20));
				} else if(this.deathLocationPiccolo.x > 400){
					this.piccoloOffset = Math.round(getRandom(0,20));
					this.piccoloOffset = this.piccoloOffset * -1;
				} else {
					this.piccoloOffset = Math.round(getRandom(0,20));
					if(this.piccoloRandom < .5){
						this.piccoloOffset = this.piccoloOffset * -1;
					}
				}
				}
				if(app.main.vegetaDead == true){
				if(this.deathLocationVegeta.x < -400){
					this.vegetaOffset = Math.round(getRandom(0,20));
				} else if(this.deathLocationVegeta.x > 400){
					this.vegetaOffset = Math.round(getRandom(0,20));
					this.vegetaOffset = this.vegetaOffset * -1;
				} else {
					this.vegetaOffset = Math.round(getRandom(0,20));
					if(this.vegetaRandom < .5){
						this.vegetaOffset = this.vegetaOffset * -1;
					}
				}
				}
				if(app.main.tienDead == true){
				if(this.deathLocationTien.x < -400){
					this.tienOffset = Math.round(getRandom(0,20));
				} else if(this.deathLocationTien.x > 400){
					this.tienOffset = Math.round(getRandom(0,20));
					this.tienOffset = this.tienOffset * -1;
				} else {
					this.tienOffset = Math.round(getRandom(0,20));
					if(this.tienRandom < .5){
						this.tienOffset = this.tienOffset * -1;
					}
				}
				}
				if(app.main.krillinDead == true){
				if(this.deathLocationKrillin.x < -400){
					this.krillinOffset = Math.round(getRandom(0,20));
				} else if(this.deathLocationKrillin.x > 400){
					this.krillinOffset = Math.round(getRandom(0,20));
					this.krillinOffset = this.krillinOffset * -1;
				} else {
					this.krillinOffset = Math.round(getRandom(0,20));
					if(this.krillinRandom < .5){
						this.krillinOffset = this.krillinOffset * -1;
					}
				}
				}
				if(app.main.yamchaDead == true){
				if(this.movementYamcha.x < -400){
					this.yamchaOffset = Math.round(getRandom(0,20));
				} else if(this.movementYamcha.x > 400){
					this.yamchaOffset = Math.round(getRandom(0,20));
					this.yamchaOffset = this.yamchaOffset * -1;
				} else {
					this.yamchaOffset = Math.round(getRandom(0,20));
					if(this.yamchaRandom < .5){
						this.yamchaOffset = this.yamchaOffset * -1;
					}
				}
				}
				if(app.main.chaotzuDead == true){
				if(this.movementChaotzu.x < -400){
					this.chaotzuOffset = Math.round(getRandom(0,20));
				} else if(this.movementChaotzu.x > 400){
					this.chaotzuOffset = Math.round(getRandom(0,20));
					this.chaotzuOffset = this.chaotzuOffset * -1;
				} else {
					this.chaotzuOffset = Math.round(getRandom(0,20));
					if(this.chaotzuRandom < .5){
						this.chaotzuOffset = this.chaotzuOffset * -1;
					}
				}
				}
				this.offsets = false;
			}
				if(this.capeOffset < 0){
					if(this.capeOffset < this.capeChange){
						this.capeChange -= 2.5;
						this.capeLocation.x -= 2.5;
					}
				} else if(this.capeOffset > 0){
					if(this.capeOffset > this.capeChange){
						this.capeChange += 2.5;
						this.capeLocation.x += 2.5;
					}
				}
				if(this.piccoloOffset < 0){
					if(this.piccoloOffset < this.piccoloChange){
						this.piccoloChange -= 2.5;
						this.deathLocationPiccolo.x -= 2.5;
					}
				} else if(this.piccoloOffset > 0){
					if(this.piccoloOffset > this.piccoloChange){
						this.piccoloChange += 2.5;
						this.deathLocationPiccolo.x += 2.5;
					}
				}
				if(this.vegetaOffset < 0){
					if(this.vegetaOffset < this.vegetaChange){
						this.vegetaChange -= 2.5;
						this.deathLocationVegeta.x -= 2.5;
					}
				} else if(this.vegetaOffset > 0){
					if(this.vegetaOffset > this.vegetaChange){
						this.vegetaChange += 2.5;
						this.deathLocationVegeta.x += 2.5;
					}
				}
				if(this.tienOffset < 0){
					if(this.tienOffset < this.tienChange){
						this.tienChange -= 2.5;
						this.deathLocationTien.x -= 2.5;
					}
				} else if(this.tienOffset > 0){
					if(this.tienOffset > this.tienChange){
						this.tienChange += 2.5;
						this.deathLocationTien.x += 2.5;
					}
				}
				if(this.krillinOffset < 0){
					if(this.krillinOffset < this.krillinChange){
						this.krillinChange -= 2.5;
						this.deathLocationKrillin.x -= 2.5;
					}
				} else if(this.krillinOffset > 0){
					if(this.krillinOffset > this.krillinChange){
						this.krillinChange += 2.5;
						this.deathLocationKrillin.x += 2.5;
					}
				}
				if(this.yamchaOffset < 0){
					if(this.yamchaOffset < this.yamchaChange){
						this.yamchaChange -= 2.5;
						this.movementYamcha.x -= 2.5;
					}
				} else if(this.yamchaOffset > 0){
					if(this.yamchaOffset > this.yamchaChange){
						this.yamchaChange += 2.5;
						this.movementYamcha.x += 2.5;
					}
				}
				if(this.chaotzuOffset < 0){
					if(this.chaotzuOffset < this.chaotzuChange){
						this.chaotzuChange -= 2.5;
						this.movementChaotzu.x -= 2.5;
					}
				} else if(this.chaotzuOffset > 0){
					if(this.chaotzuOffset > this.chaotzuChange){
						this.chaotzuChange += 2.5;
						this.movementChaotzu.x += 2.5;
					}
				}
			if(this.bounce > 9){
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
		if(this.backDown == true){
			this.bounce = this.bounce - ((4 + Math.round(getRandom(0,6)))/this.bounceCounter);
			if(this.bounce < 0){
				if(app.main.gameState != app.main.GAME_STATE.TUTORIAL && app.main.scene == false){
					app.main.sound.playSpecialReaction(2);
				} else if(app.main.gameState == app.main.GAME_STATE.TUTORIAL && app.main.scene == false) {
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
		
		if(app.main.gameState == app.main.GAME_STATE.TUTORIAL){
			if(this.alpha < 30){
				this.alpha = this.alpha + 1;
			} else {
				this.alpha = this.alpha - 1;
			}
		} else if(app.main.gameState == app.main.GAME_STATE.DEFAULT){
			this.movingSmoke = this.movingSmoke - 15;
			this.movingSmoke2 = this.movingSmoke2 - 3;
			this.movingSmoke3 = this.movingSmoke3 - 15;
			if(app.main.android17.city == false){
				if(this.alpha > 45 && this.reverse == false){
					this.reverse = true;
				} else if(this.alpha < 25 && this.reverse == true){
					this.reverse = false;
				}
			} else {
				if(this.alpha > 50 && this.reverse == false){
					this.reverse = true;
				} else if(this.alpha < 35 && this.reverse == true){
					this.reverse = false;
				}
			}
			
			if(this.reverse == false){
				if(app.main.android17.city == false){
					this.alpha++;
				} else {
					this.alpha++;
					this.alpha++;
					//this.alpha++;
				}
			} else {
				if(app.main.android17.city == false){
					this.alpha--;
				} else {
					this.alpha--;
					this.alpha--;
					//this.alpha--;
				}
			}
		}  else if(app.main.gameState == app.main.GAME_STATE.BEGIN){
			//this.movingSmoke = this.movingSmoke - 15;
			//this.movingSmoke3 = this.movingSmoke3 - 15;
			if(this.alpha > 40 && this.reverse == false){
				this.reverse = true;
			} else if(this.alpha < 10 && this.reverse == true){
				this.reverse = false;
			}
			if(this.reverse == false){
				this.alpha = this.alpha + 1.5;
			} else {
				this.alpha = this.alpha - 1.5;
			}
			
			if(this.darkStart == true){
				this.darkness -= 5;
				if(this.darkness < 15){
					this.darkStart = false;
				}
			}
		}
		
		
		//Smog update
		if(this.smogCount > 0){
			for(var i = 0; i < this.smogCount; i++){
				this.smogAlpha[i] -= .02;
				if(this.smogSize[i].x < 900){
					this.smogSize[i].x += 5;
					this.smogSize[i].y += 5;
					this.smogPos[i].x -= 2.5;
					this.smogPos[i].y -= 2.5;
				}
				if(this.smogAlpha[i] < .02){
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
		if(this.buildingActive == true && this.shake == true && app.main.scene == false && app.main.battle == 1){
			this.yajChance = Math.random();
			//console.log("SHAKEN@#@#@#@#@#@#@#@");
		}
		
		if(this.yajChance > .99){
			this.yajirobe = true;
			this.yajChance = 0;
		}
		
		
		if(this.flash == false) {
			this.fade = 80;
		} else {
			this.fade = this.fade - 10;
			if(this.fade <= 0){
				this.flash = false;
			}
		}
		
		
		if(this.superFlash == false) {
			this.fade2 = 100;
			this.reverse2 = false;
		} else if(this.decay == false){
			if(this.reverse2 == false){
				this.fade2 = this.fade2 - 5;
				this.reverse2 = true;
			} else if(this.reverse2 == true){
				this.fade2 = this.fade2 + 5;
				this.reverse2 = false
			}
		} else if(this.decay == true){
			this.fade2 = this.fade2 - 2;
			if(this.fade2 <= 0){
				this.superFlash = false;
				this.decay = false;
			}
		}
		
	};

	//DRAW THE ENVIRONMENT
	Environment.prototype.draw = function(ctx){		
		
		if(app.main.gameState == app.main.GAME_STATE.DEFAULT){
			ctx.save();
			if(this.shake == true){
				if(this.counter == 0 || this.counter == 2 || this.counter == 4){
					ctx.translate(0,-15);
				} else if(this.counter == 1 || this.counter == 3 || this.counter == 5){
					//normal
				} else {
					this.shake = false;
					this.counter = 0;
				}
				this.counter++;
			} else if(this.powerUp == true){
				this.pCounter++;
				if(this.pCounter < 2){
					ctx.translate(0,4);
				} else {
					this.pCounter = 0;
				}
			}
			ctx.save();
			if(this.cityAttacked == true){
				ctx.drawImage(this.cityDamage1,0,0);
				if(this.nuked == true){
					this.nukeCounter -= .25;
					ctx.save();
					ctx.globalAlpha = (this.nukeCounter / 10);
					ctx.drawImage(this.backgroundTop,0,0);
					ctx.restore();
					if(this.nukeCounter < .5){
						this.nuked = false;
						this.nukeCounter = 10;
					}
				}
			} else {
				ctx.drawImage(this.background,0,0);
			}
			
			
			//Yajirobe
			if(this.yajirobe == true){
				
				ctx.save();
				ctx.scale(-1,1);
				ctx.drawImage(this.yajirobe1,(this.yajirobePosition + 685) * -1,this.yajirobePosition - 45);
				ctx.restore();
				
				this.yajirobeTimer += 1;
				if(this.yajirobeTimer < 26){
					if(this.yajirobeTimer == 10){
						app.main.sound.playTaunt9(Math.round(getRandom(0,2)));
					}
					
					if(this.yajirobeTimer < 11){
						this.yajirobePosition -= 5;
					} else if(this.yajirobeTimer > 20){
						this.yajirobePosition += 10;
					}
				} else {
					this.yajirobeTimer = 0;
					this.yajChance = 0;
					this.yajirobe = false;
				}
				
			}
			
			
			//17 in the city
			if(app.main.android17.city == true){
			this.city17Counter++;
			ctx.save();
			if(this.city17Counter % 6 == 0){
				ctx.translate(180,428);
			} else if(this.city17Counter % 3 == 0){
				ctx.translate(180,430);
			} else {
				ctx.translate(180,429);
			}
			ctx.scale(.25,.25);
			if(this.city17Counter > this.blastHold){
				ctx.drawImage(this.blast17,0,0);
				if(this.city17Counter > this.blastHold + 9){
					this.miniExplosion = true;
					app.main.roundScore2 += (20 + Math.round(getRandom(1,10)));
					this.blastHold = Math.round(getRandom(25,45));
					this.city17Counter = 0;
				} else {
					ctx.drawImage(this.blast1,(this.city17Counter - this.blastHold) * 17,15);
				}
			} else {
				ctx.drawImage(this.stance17,0,0);
			}
			
			ctx.restore();
			} else {
				this.city17Counter = 0;
			}
			
			if(this.miniExplosion == true){
				this.miniTimer++;
				if(this.miniTimer < 6){
				if(this.miniTimer < 2){
					this.powerUp = true;
					app.main.sound.playIntro(Math.round(getRandom(69,71)));
				} else if(this.miniTimer > 4){
					this.powerUp = false;
					//app.main.sound.playIntro(Math.round(getRandom(69,71)));
				}
				ctx.save();
				if(this.miniTimer % 2 == 0){
				ctx.translate(228,430);
				ctx.rotate(38*Math.PI/180);
				ctx.scale(.4,1.2);
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
			
			
			
			ctx.globalAlpha = this.alpha/100;
			if(this.colorSky == true){ 
				ctx.fillStyle = "#001a33";
				//ctx.fillStyle = "black";
			} else {
				ctx.fillStyle = "darkred";
			}
			ctx.fillRect(0,0,1024,478);
			ctx.save();
			ctx.globalAlpha = this.alpha/130;
			ctx.fillRect(0,477.5,1024,768);
			ctx.restore();
			ctx.restore();
			
			ctx.save();
			ctx.globalAlpha = .2;
			ctx.fillStyle = "black";
			ctx.fillRect(0,478,1024,768);
			ctx.restore();
			
			
			//BODY SHADOWS
			if(this.buildingActive == true){
			//Building
			ctx.save();
			ctx.translate(1000,700);
			ctx.scale(2, .4);
			ctx.save();
			ctx.scale(1,1);
			ctx.beginPath();
			ctx.arc(0, 0, 200, 0, 2 * Math.PI, false);
			ctx.globalAlpha = .5;
			ctx.fillStyle = '#black';
			ctx.fill();
			ctx.restore();
			ctx.restore();
			}
			
			if(this.cape == true){
			//Cape
			ctx.save();
			ctx.translate(this.capeLocation.x + 240,app.main.vegeta.GROUND.y + 132);
			ctx.scale(2, .4);
			ctx.save();
			ctx.scale(1,1);
			ctx.beginPath();
			ctx.arc(0, 0, 26, 0, 2 * Math.PI, false);
			ctx.globalAlpha = .5;
			ctx.fillStyle = '#black';
			ctx.fill();
			ctx.restore();
			ctx.restore();
			}
			
			if(app.main.piccoloDead == true){
			//Piccolo
			ctx.save();
			if(this.deathPiccoloDirLeft == false){
				ctx.translate(this.deathLocationPiccolo.x,app.main.vegeta.GROUND.y + 125);
			} else {
				ctx.translate(this.deathLocationPiccolo.x + 45,app.main.vegeta.GROUND.y + 125);
			}
			ctx.scale(2, .4);
			ctx.save();
			ctx.scale(1,1);
			ctx.beginPath();
			ctx.arc(0, 0, 32, 0, 2 * Math.PI, false);
			ctx.globalAlpha = .5;
			ctx.fillStyle = '#black';
			ctx.fill();
			ctx.restore();
			ctx.restore();
			}
			
			if(app.main.vegetaDead == true){
			//Vegeta
			ctx.save();
			if(this.deathVegetaDirLeft == false){
				ctx.translate(this.deathLocationVegeta.x,app.main.vegeta.GROUND.y + 125);
			} else {
				ctx.translate(this.deathLocationVegeta.x + 45,app.main.vegeta.GROUND.y + 125);
			}
			ctx.scale(2, .4);
			ctx.save();
			ctx.scale(1,1);
			ctx.beginPath();
			ctx.arc(0, 0, 32, 0, 2 * Math.PI, false);
			ctx.globalAlpha = .5;
			ctx.fillStyle = '#black';
			ctx.fill();
			ctx.restore();
			ctx.restore();
			}
			
			if(app.main.tienDead == true){
			//Tien
			ctx.save();
			if(this.deathTienDirLeft == false){
				ctx.translate(this.deathLocationTien.x + 35,app.main.vegeta.GROUND.y + 125);
			} else {
				ctx.translate(this.deathLocationTien.x,app.main.vegeta.GROUND.y + 125);
			}
			ctx.scale(2, .4);
			ctx.save();
			ctx.scale(1,1);
			ctx.beginPath();
			ctx.arc(0, 0, 32, 0, 2 * Math.PI, false);
			ctx.globalAlpha = .5;
			ctx.fillStyle = '#black';
			ctx.fill();
			ctx.restore();
			ctx.restore();
			}
			
			if(app.main.krillinDead == true){
			//Krillin
			ctx.save();
			if(this.deathKrillinDirLeft == false){
				ctx.translate(this.deathLocationKrillin.x + 25,app.main.vegeta.GROUND.y + 125);
			} else {
				ctx.translate(this.deathLocationKrillin.x + 35,app.main.vegeta.GROUND.y + 125);
			}
			ctx.scale(2, .4);
			ctx.save();
			ctx.scale(1,1);
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
			ctx.scale(1,-1);
			ctx.drawImage(this.smoke1,this.movingSmoke2,-450,4000,800);
			ctx.restore();
			ctx.save();
			//ctx.rotate(radian(90));
			if(this.buildingActive == true){
				if(this.fallingBuilding < 600){
					this.fallingBuilding += 60;
					if(this.fallingBuilding == 540){
						this.shake = true;
						app.main.sound.playSpecialReaction(2);
					}
				}
				ctx.drawImage(this.building1,600,(-255 + this.fallingBuilding));
			}
			ctx.restore();
			
			
			
			
			if(app.main.android18.landDust == true){
				this.dustCounter++;
				ctx.save();
				ctx.translate(app.main.android18.prevX, app.main.android18.GROUND.y);
				ctx.scale(3,3);
				ctx.globalAlpha = .4;
				if(this.dustCounter < 2){
					ctx.drawImage(this.groundDustA1,-40,-10);
				} else if(this.dustCounter < 3){
					ctx.drawImage(this.groundDustA2,-40,-10);
				} else if(this.dustCounter < 4){
					ctx.drawImage(this.groundDustA3,-40,-10);
				} else if(this.dustCounter < 5){
					ctx.drawImage(this.groundDustA4,-40,-10);
				} else {
					this.dustCounter = 0;
					app.main.android18.landDust = false;
				}
				ctx.restore();
			}
			
			if(app.main.android18.flyDust == true){
				this.dustCounter++;
				ctx.save();
				ctx.translate(app.main.android18.prevX, app.main.android18.GROUND.y);
				ctx.scale(2,2);
				ctx.globalAlpha = .4;
				if(this.dustCounter < 2){
					ctx.drawImage(this.groundDustB1,-55,10);
				} else if(this.dustCounter < 3){
					ctx.drawImage(this.groundDustB2,-55,10);
				} else if(this.dustCounter < 4){
					ctx.drawImage(this.groundDustB3,-55,10);
				} else if(this.dustCounter < 5){
					ctx.drawImage(this.groundDustB4,-55,10);
				} else {
					this.dustCounter = 0;
					app.main.android18.flyDust = false;
				}
				ctx.restore();
			}
			
			if(app.main.android18.fallDust == true){
				this.dustCounter++;
				ctx.save();
				ctx.translate(app.main.android18.prevX, app.main.android18.GROUND.y);
				ctx.scale(2,2);
				ctx.globalAlpha = .5;
				if(this.dustCounter < 3){
					ctx.drawImage(this.groundDustC1,-80,8);
				} else if(this.dustCounter < 5){
					ctx.drawImage(this.groundDustC2,-80,8);
				} else if(this.dustCounter < 7){
					ctx.drawImage(this.groundDustC3,-80,8);
				} else if(this.dustCounter < 9){
					ctx.drawImage(this.groundDustC4,-80,8);
				} else {
					this.dustCounter = 0;
					app.main.android18.fallDust = false;
				}
				ctx.restore();
			}
			
			if(app.main.android17.landDust == true){
				this.dustCounter++;
				ctx.save();
				ctx.translate(app.main.android17.prevX, app.main.android17.GROUND.y);
				ctx.scale(3,3);
				ctx.globalAlpha = .4;
				if(this.dustCounter < 2){
					ctx.drawImage(this.groundDustA1,-40,-10);
				} else if(this.dustCounter < 3){
					ctx.drawImage(this.groundDustA2,-40,-10);
				} else if(this.dustCounter < 4){
					ctx.drawImage(this.groundDustA3,-40,-10);
				} else if(this.dustCounter < 5){
					ctx.drawImage(this.groundDustA4,-40,-10);
				} else {
					this.dustCounter = 0;
					app.main.android17.landDust = false;
				}
				ctx.restore();
			}
			
			if(app.main.android17.flyDust == true){
				this.dustCounter++;
				ctx.save();
				ctx.translate(app.main.android17.prevX, app.main.android17.GROUND.y);
				ctx.scale(2,2);
				ctx.globalAlpha = .4;
				if(this.dustCounter < 2){
					ctx.drawImage(this.groundDustB1,-55,10);
				} else if(this.dustCounter < 3){
					ctx.drawImage(this.groundDustB2,-55,10);
				} else if(this.dustCounter < 4){
					ctx.drawImage(this.groundDustB3,-55,10);
				} else if(this.dustCounter < 5){
					ctx.drawImage(this.groundDustB4,-55,10);
				} else {
					this.dustCounter = 0;
					app.main.android17.flyDust = false;
				}
				ctx.restore();
			}
			
			if(app.main.android17.fallDust == true){
				this.dustCounter++;
				ctx.save();
				ctx.translate(app.main.android17.prevX, app.main.android17.GROUND.y);
				ctx.scale(2,2);
				ctx.globalAlpha = .5;
				if(this.dustCounter < 3){
					ctx.drawImage(this.groundDustC1,-80,8);
				} else if(this.dustCounter < 5){
					ctx.drawImage(this.groundDustC2,-80,8);
				} else if(this.dustCounter < 7){
					ctx.drawImage(this.groundDustC3,-80,8);
				} else if(this.dustCounter < 9){
					ctx.drawImage(this.groundDustC4,-80,8);
				} else {
					this.dustCounter = 0;
					app.main.android17.fallDust = false;
				}
				ctx.restore();
			}
			
			if(app.main.vegeta.landDust == true){
				this.dustCounter++;
				ctx.save();
				ctx.translate(app.main.vegeta.prevX, app.main.vegeta.GROUND.y);
				ctx.scale(3,3);
				ctx.globalAlpha = .4;
				if(this.dustCounter < 2){
					ctx.drawImage(this.groundDustA1,-35,-10);
				} else if(this.dustCounter < 3){
					ctx.drawImage(this.groundDustA2,-35,-10);
				} else if(this.dustCounter < 4){
					ctx.drawImage(this.groundDustA3,-35,-10);
				} else if(this.dustCounter < 5){
					ctx.drawImage(this.groundDustA4,-35,-10);
				} else {
					this.dustCounter = 0;
					app.main.vegeta.landDust = false;
				}
				ctx.restore();
			}
			
			if(app.main.vegeta.flyDust == true){
				this.dustCounter++;
				ctx.save();
				ctx.translate(app.main.vegeta.prevX, app.main.vegeta.GROUND.y);
				ctx.scale(2,2);
				ctx.globalAlpha = .4;
				if(this.dustCounter < 2){
					ctx.drawImage(this.groundDustB1,-55,10);
				} else if(this.dustCounter < 3){
					ctx.drawImage(this.groundDustB2,-55,10);
				} else if(this.dustCounter < 4){
					ctx.drawImage(this.groundDustB3,-55,10);
				} else if(this.dustCounter < 5){
					ctx.drawImage(this.groundDustB4,-55,10);
				} else {
					this.dustCounter = 0;
					app.main.vegeta.flyDust = false;
				}
				ctx.restore();
			}
			
			if(app.main.vegeta.fallDust == true){
				this.dustCounter++;
				ctx.save();
				ctx.translate(app.main.vegeta.prevX, app.main.vegeta.GROUND.y);
				ctx.scale(2,2);
				ctx.globalAlpha = .5;
				if(this.dustCounter < 3){
					ctx.drawImage(this.groundDustC1,-80,8);
				} else if(this.dustCounter < 5){
					ctx.drawImage(this.groundDustC2,-80,8);
				} else if(this.dustCounter < 7){
					ctx.drawImage(this.groundDustC3,-80,8);
				} else if(this.dustCounter < 9){
					ctx.drawImage(this.groundDustC4,-80,8);
				} else {
					this.dustCounter = 0;
					app.main.vegeta.fallDust = false;
				}
				ctx.restore();
			}
			
			
			//SOME SHADOWS
			if(this.yamcha == true && app.main.yamchaDead == true){
				ctx.save();
			ctx.translate(this.movementYamcha.x + 875 + 210,750);
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
			
			if(this.chaotzu == true && app.main.chaotzuDead == true){
			//Chaotzu
			ctx.save();
			ctx.translate(this.movementChaotzu.x + 859 + 204,750);
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
			
			if(this.cape == true){
				
				ctx.save();
				if(this.capeDirLeft == false){
					ctx.scale(-1,1);
					ctx.translate((this.capeLocation.x + 300) * -1,this.capeLocation.y + 735 - this.bounce);
					ctx.scale(.8,.8);
					if(this.bouncing == false && this.backDown == false){
						ctx.drawImage(this.cape3,0,0);
					} else {
						ctx.drawImage(this.cape4,0,0);
					}
				} else {
					ctx.translate(this.capeLocation.x + 300,this.capeLocation.y + 735 - this.bounce);
					ctx.scale(.8,.8);
					if(this.bouncing == false && this.backDown == false){
						ctx.drawImage(this.cape3,0,0);
					} else {
						ctx.drawImage(this.cape4,0,0);
					}
				}
				ctx.restore();
			}
			
			
			if(app.main.piccoloDead == true){
				
				ctx.save();
				if(this.deathPiccoloDirLeft == false){
					ctx.scale(-1,1);
					ctx.translate((this.deathLocationPiccolo.x + 76) * -1,this.deathLocationPiccolo.y + 84 - this.bounce);
					ctx.scale(.8,.8);
					if(this.bouncing == false && this.backDown == false){
						ctx.drawImage(this.deadPiccolo,0,0);
					} else {
						ctx.drawImage(this.deadPiccolo2,0,0);
					}
				} else {
					ctx.translate(this.deathLocationPiccolo.x - 27,this.deathLocationPiccolo.y + 84 - this.bounce);
					ctx.scale(.8,.8);
					if(this.bouncing == false && this.backDown == false){
						ctx.drawImage(this.deadPiccolo,0,0);
					} else {
						ctx.drawImage(this.deadPiccolo2,0,0);
					}
				}
				ctx.restore();
			}
			
			
			if(app.main.vegetaDead == true){
				if(app.main.vegeta.air == false && this.bouncing == false && this.backDown == false){
					this.loseSS--;
					if(this.loseSS > 6 && this.loseSS < 8){
						app.main.sound.playEffect(57);
					}
				}
				if(this.loseSS < 0){
					this.loseSS = 0;
					app.main.vegeta.superform = false;
				}
				ctx.save();
				if(this.deathVegetaDirLeft == false){
					ctx.scale(-1,1);
					ctx.translate((this.deathLocationVegeta.x + 60) * -1,this.deathLocationVegeta.y + 95 - this.bounce);
					if(this.bouncing == false && this.backDown == false){
						ctx.drawImage(this.deadVegeta2,0,0);
						ctx.save();
						ctx.globalAlpha = (this.loseSS / 10);
						ctx.drawImage(this.deadVegeta,0,0);
						ctx.restore();
					} else {
						if(app.main.vegeta.superForm == false){
							ctx.drawImage(this.deadVegeta3,0,0);
						} else {
							ctx.drawImage(this.deadVegeta4,0,0);
						}
					}
				} else {
					ctx.translate(this.deathLocationVegeta.x - 10,this.deathLocationVegeta.y + 95 - this.bounce);
					if(this.bouncing == false && this.backDown == false){
						ctx.drawImage(this.deadVegeta2,0,0);
						ctx.save();
						ctx.globalAlpha = (this.loseSS / 10);
						ctx.drawImage(this.deadVegeta,0,0);
						ctx.restore();
					} else {
						if(app.main.vegeta.superForm == false){
							ctx.drawImage(this.deadVegeta3,0,0);
						} else {
							ctx.drawImage(this.deadVegeta4,0,0);
						}
					}
				}
				ctx.restore();
			}
			
			if(this.yamcha == true){
			if(app.main.yamchaDead == true){
				
				ctx.save();
					ctx.translate(this.movementYamcha.x + 865,this.movementYamcha.y + 400 - this.bounce);
					ctx.scale(1.4,1.4);
					if(this.bouncing == false && this.backDown == false){
						ctx.drawImage(this.yamcha3,0,5);
					} else {
						ctx.drawImage(this.yamcha4,0,5);
					}
				ctx.restore();
			} else {
				ctx.save();
					ctx.translate(this.movementYamcha.x + 850,this.movementYamcha.y + 390);
					ctx.scale(1.4,1.4);
					if(this.movementYamcha.x > -400 && this.braced == false){
						this.movementYamcha.x -= 40;
						this.movementYamcha.y += 10;
						if(this.movementYamcha.x < -360){
							app.main.sound.playSpecialReaction2(3);
						}
						ctx.drawImage(this.yamcha5,0,0);
					} else if(this.braced == false){
						ctx.drawImage(this.yamcha1,0,0);
					}  else {
						ctx.drawImage(this.yamcha2,20,0);
					}
				ctx.restore();
			}
			
			}
			
			if(this.chaotzu == true){
			if(app.main.chaotzuDead == true){
				
				ctx.save();
					ctx.translate(this.movementChaotzu.x + 865,this.movementChaotzu.y + 412 - this.bounce);
					ctx.scale(1.4,1.4);
					//ctx.scale(.8,.8);
					if(this.bouncing == false && this.backDown == false){
						ctx.drawImage(this.chaotzu3,0,10);
					} else {
						ctx.drawImage(this.chaotzu3,0,10);
					}
				ctx.restore();
			} else {
				ctx.save();
					ctx.translate(this.movementChaotzu.x + 800,this.movementChaotzu.y + 410);
					ctx.scale(1.4,1.4);
					if(this.movementChaotzu.x > -270 && this.braced == false){
						this.movementChaotzu.x -= 30;
						this.movementChaotzu.y += 10;
						ctx.drawImage(this.chaotzu4,0,0);
					} else if(this.braced == false){
						if(this.chaotzuReverse == false){
							if(this.chaotzuMoveVert < 3){
								this.chaotzuMoveVert += .5;
							} else {
								this.chaotzuReverse = true;
							}
						} else if(this.chaotzuReverse == true){
							if(this.chaotzuMoveVert > 0){
								this.chaotzuMoveVert -= .5;
							} else {
								this.chaotzuReverse = false;
							}
						}
						
						ctx.drawImage(this.chaotzu1,0,(0 - this.chaotzuMoveVert));
					}  else {
						ctx.drawImage(this.chaotzu2,0,0);
						this.movementChaotzu.x += 1;
					}
				ctx.restore();
			}
			
			}
			
			if(app.main.tienDead == true){
				
				ctx.save();
				if(this.deathTienDirLeft == false){
					ctx.scale(-1,1);
					ctx.translate((this.deathLocationTien.x + 210) * -1,this.deathLocationTien.y - 55 - this.bounce);
					//ctx.scale(.8,.8);
					if(this.bouncing == false && this.backDown == false){
						ctx.drawImage(this.deadTien,0,0);
					} else {
						ctx.drawImage(this.deadTien2,0,0);
					}
				} else {
					ctx.translate(this.deathLocationTien.x - 177,this.deathLocationTien.y - 55 - this.bounce);
					//ctx.scale(.8,.8);
					if(this.bouncing == false && this.backDown == false){
						ctx.drawImage(this.deadTien,0,0);
					} else {
						ctx.drawImage(this.deadTien2,0,0);
					}
				}
				ctx.restore();
			}
			
			if(app.main.krillinDead == true){
				
				ctx.save();
				if(this.deathKrillinDirLeft == false){
					ctx.scale(-1,1);
					ctx.translate((this.deathLocationKrillin.x + 200) * -1,this.deathLocationKrillin.y - 78 - this.bounce);
					//ctx.scale(.8,.8);
					if(this.bouncing == false && this.backDown == false){
						ctx.drawImage(this.deadKrillin,0,5);
					} else {
						ctx.drawImage(this.deadKrillin2,0,5);
					}
				} else {
					ctx.translate(this.deathLocationKrillin.x - 150,this.deathLocationKrillin.y - 75 - this.bounce);
					//ctx.scale(.8,.8);
					if(this.bouncing == false && this.backDown == false){
						ctx.drawImage(this.deadKrillin,0,0);
					} else {
						ctx.drawImage(this.deadKrillin2,0,0);
					}
				}
				ctx.restore();
			}
			
			
			
			//SHADOWS
			
			//Android 18
			if(app.main.android18.vanish == false){
			ctx.save();
			if(app.main.android18.aboveBuilding == true && app.main.android18.byBuilding == true && this.buildingActive == true){
				ctx.translate(app.main.android18.position.x + 23,app.main.android18.GROUND.y - 245);
			} else {
				ctx.translate(app.main.android18.position.x + 23,app.main.android18.GROUND.y + 125);
			}
			ctx.scale(2, .4);
			ctx.save();
			if(app.main.android18.aboveBuilding == true && app.main.android18.byBuilding == true && this.buildingActive == true){
				ctx.scale((app.main.android18.position.y + 370) / 600,(app.main.android18.position.y + 370) / 600);
			} else {
				ctx.scale(app.main.android18.position.y / 600,app.main.android18.position.y / 600);
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
			if(app.main.android17.vanish == false && app.main.android17.city == false && app.main.android17.gone == false){
			ctx.save();
			if(app.main.android17.aboveBuilding == true && app.main.android17.byBuilding == true && this.buildingActive == true){
				ctx.translate(app.main.android17.position.x + 23,app.main.android17.GROUND.y - 245);
			} else {
				ctx.translate(app.main.android17.position.x + 23,app.main.android17.GROUND.y + 125);
			}
			ctx.scale(2, .4);
			ctx.save();
			if(app.main.android17.aboveBuilding == true && app.main.android17.byBuilding == true && this.buildingActive == true){
				ctx.scale((app.main.android17.position.y + 370) / 600,(app.main.android17.position.y + 370) / 600);
			} else {
				ctx.scale(app.main.android17.position.y / 600,app.main.android17.position.y / 600);
			}
			ctx.beginPath();
			ctx.arc(0, 0, 20, 0, 2 * Math.PI, false);
			ctx.globalAlpha = .5;
			ctx.fillStyle = '#black';
			ctx.fill();
			ctx.restore();
			ctx.restore();
			}
			
			if(app.main.vegeta.piccolo == true && app.main.vegeta.vanish == false){
			//Piccolo
			ctx.save();
			if(app.main.vegeta.aboveBuilding == true && app.main.vegeta.byBuilding == true && this.buildingActive == true){
				ctx.translate(app.main.vegeta.position.x + 23,app.main.vegeta.GROUND.y - 245);
			} else {
				ctx.translate(app.main.vegeta.position.x + 23,app.main.vegeta.GROUND.y + 125);
			}
			ctx.scale(2, .4);
			ctx.save();
			if(app.main.vegeta.aboveBuilding == true && app.main.vegeta.byBuilding == true && this.buildingActive == true){
				ctx.scale((app.main.vegeta.position.y + 370) / 600,(app.main.vegeta.position.y + 370) / 600);
			} else {
				ctx.scale(app.main.vegeta.position.y / 600,app.main.vegeta.position.y / 600);
			}
			ctx.beginPath();
			ctx.arc(0, 0, 28, 0, 2 * Math.PI, false);
			ctx.globalAlpha = .5;
			ctx.fillStyle = '#black';
			ctx.fill();
			ctx.restore();
			ctx.restore();
			}
			
			
			
			if(app.main.vegeta.vegeta == true && app.main.vegeta.vanish == false){
			//Vegeta
			ctx.save();
			if(app.main.vegeta.aboveBuilding == true && app.main.vegeta.byBuilding == true && this.buildingActive == true){
				ctx.translate(app.main.vegeta.position.x + 23,app.main.vegeta.GROUND.y - 245);
			} else {
				ctx.translate(app.main.vegeta.position.x + 23,app.main.vegeta.GROUND.y + 125);
			}
			ctx.scale(2, .4);
			ctx.save();
			if(app.main.vegeta.aboveBuilding == true && app.main.vegeta.byBuilding == true && this.buildingActive == true){
				ctx.scale((app.main.vegeta.position.y + 370) / 600,(app.main.vegeta.position.y + 370) / 600);
			} else {
				ctx.scale(app.main.vegeta.position.y / 600,app.main.vegeta.position.y / 600);
			}
			ctx.beginPath();
			ctx.arc(0, 0, 22, 0, 2 * Math.PI, false);
			ctx.globalAlpha = .5;
			ctx.fillStyle = '#black';
			ctx.fill();
			ctx.restore();
			ctx.restore();
			}
			
			if(app.main.vegeta.gohan == true && app.main.vegeta.vanish == false){
			//Gohan
			ctx.save();
			if(app.main.vegeta.aboveBuilding == true && app.main.vegeta.byBuilding == true && this.buildingActive == true){
				ctx.translate(app.main.vegeta.position.x + 23,app.main.vegeta.GROUND.y - 245);
			} else {
				ctx.translate(app.main.vegeta.position.x + 23,app.main.vegeta.GROUND.y + 125);
			}
			ctx.scale(2, .4);
			ctx.save();
			if(app.main.vegeta.aboveBuilding == true && app.main.vegeta.byBuilding == true && this.buildingActive == true){
				ctx.scale((app.main.vegeta.position.y + 370) / 600,(app.main.vegeta.position.y + 370) / 600);
			} else {
				ctx.scale(app.main.vegeta.position.y / 600,app.main.vegeta.position.y / 600);
			}
			ctx.beginPath();
			ctx.arc(0, 0, 22, 0, 2 * Math.PI, false);
			ctx.globalAlpha = .5;
			ctx.fillStyle = '#black';
			ctx.fill();
			ctx.restore();
			ctx.restore();
			}
			
			if(this.android16 == true){
			//16
			ctx.save();
			ctx.translate(this.movement16.x - 40,this.movement16.y + 155);
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
			
			if(this.supportActive == true){
				
			if(app.main.support[0].tien == true && app.main.support[0].vanish == false){
			//Tien
			ctx.save();
			ctx.translate(app.main.support[0].position.x + 23,app.main.support[0].GROUND.y + 125);
			ctx.scale(2, .4);
			ctx.save();
			ctx.scale(app.main.support[0].position.y / 600,app.main.support[0].position.y / 600);
			ctx.beginPath();
			ctx.arc(0, 0, 22, 0, 2 * Math.PI, false);
			ctx.globalAlpha = .5;
			ctx.fillStyle = '#black';
			ctx.fill();
			ctx.restore();
			ctx.restore();
			}
			
			if(app.main.support[1].krillin == true && app.main.support[1].vanish == false){
			//Krillin
			ctx.save();
			ctx.translate(app.main.support[1].position.x + 23,app.main.support[1].GROUND.y + 105);
			ctx.scale(2, .4);
			ctx.save();
			ctx.scale(app.main.support[1].position.y / 600,app.main.support[1].position.y / 600);
			ctx.beginPath();
			ctx.arc(0, 0, 22, 0, 2 * Math.PI, false);
			ctx.globalAlpha = .5;
			ctx.fillStyle = '#black';
			ctx.fill();
			ctx.restore();
			ctx.restore();
			}
				
			}
			
			if(this.yamcha == true && app.main.yamchaDead == false){
			//Yamcha
			ctx.save();
			ctx.translate(this.movementYamcha.x + 850 + 210,745);
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
			
			if(this.chaotzu == true && app.main.chaotzuDead == false){
			//Chaotzu
			ctx.save();
			ctx.translate(this.movementChaotzu.x + 800 + 204,745);
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
			
			if(app.main.scene == false){
			if(this.geroSpy == false){
				this.spyChance = Math.random();
				if(this.spyChance > .98){
					this.spyTimer = 0;
					this.spyExit = false;
					this.geroSpy = true;
					if(app.main.vegeta.left == true){
						this.spyLeft = true;
						this.spyRight = false;
					} else {
						this.spyRight = true;
						this.spyLeft = false;
					}
				}
			} else if(this.geroSpy == true){
				if(this.spyExit == true){
					this.spyTimer++;
				}
				
				if(this.spyReverse == false){
					this.spyMoveVert += 1;
					if(this.spyMoveVert > 15){
						this.spyReverse = true;
					}
				} else if(this.spyReverse == true){
					this.spyMoveVert -= 1;
					if(this.spyMoveVert < -4){
						this.spyReverse = false;
					}
				}
				
				if(this.spyRight == true){
					ctx.save();
					ctx.translate(this.spyLocation.x,this.spyLocation.y + this.spyMoveVert);
					ctx.drawImage(this.gerosSpy1,0,0);
					ctx.restore();
				} else if(this.spyLeft == true){
					ctx.save();
					ctx.translate(this.spyLocation.x,this.spyLocation.y + this.spyMoveVert);
					ctx.scale(-1,1);
					ctx.drawImage(this.gerosSpy1,0,0);
					ctx.restore();
				}
				
				if(this.spyExit == false && this.spyLocation.y < 160){
					this.spyLocation.y += 20;
				} else if(this.spyExit == true && this.spyLocation.y > -100){
					this.spyLocation.y -= 20;
				}
					
				if(this.spyTimer > 100){
					this.geroSpy = false;
				}
				
				if(this.spyLeft == true){
					this.spyLocation.x = (app.main.vegeta.position.x + 150);
					if(app.main.vegeta.right == true || app.main.vegeta.superSpeed == true){
						this.spyExit = true;
					}
				} else if(this.spyRight == true){
					this.spyLocation.x = (app.main.vegeta.position.x - 150);
					if(app.main.vegeta.left == true || app.main.vegeta.superSpeed == true){
						this.spyExit = true;
					}
				}
				
			}
			}
			
			if(this.supportActive == true){
				for(var i = 0; i < 2; i++){
					if(app.main.support[i].air == false){
						app.main.support[i].draw(ctx); // DRAW SUPPORT
						app.main.support[i].update(); // UPDATE SUPPORT
					}
				}
			}
			
			if(app.main.android17.air == false){
				if(app.main.android17.gone == false){
					app.main.android17.draw(ctx); // DRAW 17
					app.main.android17.update(); // UPDATE 17
				}
			}

			if(app.main.vegeta.air == false){
				app.main.vegeta.draw(ctx); // DRAW VEGETA
				if(app.main.scene == false || app.main.vegeta.appear == true){
					app.main.vegeta.update(); // UPDATE VEGETA
				}
			}
			if(app.main.android18.air == false){
				app.main.android18.draw(ctx); // DRAW 18
			}
			
			
			ctx.restore();
			
			if(this.supportActive == true){
				for(var i = 0; i < 2; i++){
					if(app.main.support[i].air == true){
						app.main.support[i].draw(ctx); // DRAW SUPPORT
						app.main.support[i].update(); // UPDATE SUPPORT
					}
				}
			}
			
			if(app.main.android17.air == true){
				if(app.main.android17.gone == false || app.main.scene == true){
					app.main.android17.draw(ctx); // DRAW 17
					app.main.android17.update(); // UPDATE 17
				}
			}
			if(app.main.vegeta.air == true){
				app.main.vegeta.draw(ctx); // DRAW VEGETA
				app.main.vegeta.update(); // UPDATE VEGETA
			}
			if(app.main.android18.air == true){
				app.main.android18.draw(ctx); // DRAW 18
			}
			
			if(this.android16 == true){
				ctx.save();
					ctx.translate(this.movement16.x,this.movement16.y);
					ctx.scale(-1.1,1.1);
					if(this.braced == false){
						ctx.drawImage(this.a16Stance,0,0);
					} else {
						ctx.drawImage(this.a16Stance2,0,0);
					}
					if(this.tele16 == true){
						ctx.drawImage(this.teleport5,0,0);
						this.tele16 = false;
					}
				ctx.restore();
			}
		
	if(app.main.vegeta.gohan == true && app.main.vegeta.superForm == true && app.main.endingState == false && app.main.specialScene == false){
	//app.main.sound.playIntro(56); //rain sound
	ctx.save();	
	ctx.strokeStyle = 'rgba(174,194,224,0.5)';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    
    
    var init = [];
    var maxParts = 1000;
    for(var a = 0; a < maxParts; a++) {
      init.push({
        x: Math.random() * 1024,
        y: Math.random() * 740,
        l: Math.random() * 1,
        xs: -4 + Math.random() * 4 + 2,
        ys: Math.random() * 10 + 10
      })
    }
    
    var particles = [];
    for(var b = 0; b < maxParts; b++) {
      particles[b] = init[b];
    }
    
    function draw() {
	
      //ctx.clearRect(0, 0, 1024, 768);
      for(var c = 0; c < particles.length; c++) {
		ctx.save();
        var p = particles[c];
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
        ctx.stroke();
		ctx.restore();
      }
      move();
    }
    
    function move() {
      for(var b = 0; b < particles.length; b++) {
        var p = particles[b];
        p.x += p.xs;
        p.y += p.ys;
        if(p.x > 1024 || p.y > 740) {
          p.x = Math.random() * 1024;
          p.y = -20;
        }
      }
    }
    
    draw();
	ctx.restore();
	}
			
			
			
		} else if(app.main.gameState == app.main.GAME_STATE.TUTORIAL){
			ctx.save();
			if(this.shake == true){
				if(this.counter == 0 || this.counter == 2 || this.counter == 4){
					ctx.translate(0,15);
				} else if(this.counter == 1 || this.counter == 3 || this.counter == 5){
					//normal
				} else {
					this.shake = false;
					this.counter = 0;
				}
				this.counter++;
			}  else if(this.powerUp == true){
				this.pCounter++;
				if(this.pCounter < 2){
					ctx.translate(0,2);
				} else {
					this.pCounter = 0;
				}
			}
			ctx.save();
			ctx.drawImage(this.lab1,0,0);
			ctx.globalAlpha = this.alpha/100;
			ctx.fillStyle = "black";
			ctx.fillRect(0,0,1024,768);
			ctx.restore();
			
			
			
			if(this.active19 == true){
				
				ctx.save();
				ctx.translate(this.position19.x + 740,this.position19.y + 435 - (this.bounce/2.5));
				ctx.scale(1,1);
				if(this.bouncing == false && this.backDown == false){
					ctx.drawImage(this.a19Head,0,0);
				} else {
					ctx.save();
					ctx.translate(20,20);
					ctx.rotate(30 * Math.PI/180);
					ctx.drawImage(this.a19Head,-20,-20);
					ctx.restore();
				}
	
				ctx.restore();
			}
			
			if(this.cape == true){
				
				ctx.save();
				if(this.capeDirLeft == false){
					ctx.scale(-1,1);
					ctx.translate((this.capeLocation.x + 200) * -1,this.capeLocation.y + 730 - this.bounce);
					ctx.scale(.8,.8);
					if(this.bouncing == false && this.backDown == false){
						ctx.drawImage(this.cape3,0,0);
					} else {
						ctx.drawImage(this.cape4,0,0);
					}
				} else {
					ctx.translate(this.capeLocation.x + 400,this.capeLocation.y + 730 - this.bounce);
					ctx.scale(.8,.8);
					if(this.bouncing == false && this.backDown == false){
						ctx.drawImage(this.cape3,0,0);
					} else {
						ctx.drawImage(this.cape4,0,0);
					}
				}
				ctx.restore();
			}
			
			
			//Android 18
			if(app.main.android18.vanish == false){
			ctx.save();
			ctx.translate(app.main.android18.position.x + 23,app.main.android18.GROUND.y + 125);
			ctx.scale(2, .4);
			ctx.save();
			ctx.scale(app.main.android18.position.y / 600,app.main.android18.position.y / 600);
			ctx.beginPath();
			ctx.arc(0, 0, 22, 0, 2 * Math.PI, false);
			ctx.globalAlpha = .5;
			ctx.fillStyle = '#black';
			ctx.fill();
			ctx.restore();
			ctx.restore();
			}
			
			//Android 17
			if(app.main.android17.vanish == false && app.main.android17.city == false && app.main.android17.gone == false){
			ctx.save();
			ctx.translate(app.main.android17.position.x + 23,app.main.android17.GROUND.y + 125);
			ctx.scale(2, .4);
			ctx.save();
			ctx.scale(app.main.android17.position.y / 600,app.main.android17.position.y / 600);
			ctx.beginPath();
			ctx.arc(0, 0, 20, 0, 2 * Math.PI, false);
			ctx.globalAlpha = .5;
			ctx.fillStyle = '#black';
			ctx.fill();
			ctx.restore();
			ctx.restore();
			}
			
			if(app.main.vegeta.gero == true && app.main.vegeta.vanish == false){
			//Gero
			ctx.save();
			ctx.translate(app.main.vegeta.position.x + 23,app.main.vegeta.GROUND.y + 125);
			ctx.scale(2, .4);
			ctx.save();
			ctx.scale(app.main.vegeta.position.y / 600,app.main.vegeta.position.y / 600);
			ctx.beginPath();
			ctx.arc(0, 0, 20, 0, 2 * Math.PI, false);
			ctx.globalAlpha = .5;
			ctx.fillStyle = '#black';
			ctx.fill();
			ctx.restore();
			ctx.restore();
			}
			
			
			if(app.main.android17.air == false){
				if(app.main.android17.gone == false){
					app.main.android17.draw(ctx); // DRAW 17
					app.main.android17.update(); // UPDATE 17
				}
			}
	
			if(app.main.android18.air == false){
				app.main.android18.draw(ctx); // DRAW 18
			}
			
			if(app.main.vegeta.air == false){
				app.main.vegeta.draw(ctx); // DRAW VEGETA
				app.main.vegeta.update(); // UPDATE VEGETA
			}
			
			if(this.remote == true){
				this.remoteTimer++;
				if(this.remoteTimer < 2){
					app.main.sound.playTaunt2(Math.round(getRandom(69,71)));
					this.remotePosition.y = app.main.vegeta.position.y + 60;
					this.remotePosition.x = app.main.vegeta.position.x;
				}
				if(this.remotePosition.y < 743 && this.remoteGround == false){
					this.remotePosition.y += (4 * this.remoteTimer);
				}
				if(this.remotePosition.y > 742){
					this.remoteGround = true;
					app.main.sound.playEffectLoud(55);
					this.remotePosition.y = 740;
				}
				
				ctx.save();
				ctx.drawImage(this.remote2,this.remotePosition.x,this.remotePosition.y);
				ctx.restore();
			}
			
			ctx.restore();
			
			if(app.main.android17.air == true){
				if(app.main.android17.gone == false){
					app.main.android17.draw(ctx); // DRAW 17
					app.main.android17.update(); // UPDATE 17
				}
			}
			
			if(app.main.android18.air == true){
				app.main.android18.draw(ctx); // DRAW 18
			}
			
			if(app.main.vegeta.air == true){
				app.main.vegeta.draw(ctx); // DRAW VEGETA
				app.main.vegeta.update(); // UPDATE VEGETA
			}
			
			if(app.main.piccoloDead == true){
				
				ctx.save();
				if(this.deathPiccoloDirLeft == false){
					ctx.scale(-1,1);
					ctx.translate((this.deathLocationPiccolo.x + 66) * -1,this.deathLocationPiccolo.y + 84 - this.bounce);
					ctx.scale(.8,.8);
					if(this.bouncing == false && this.backDown == false){
						ctx.drawImage(this.deadPiccolo,0,0);
					} else {
						ctx.drawImage(this.deadPiccolo2,0,0);
					}
				} else {
					ctx.translate(this.deathLocationPiccolo.x + 4,this.deathLocationPiccolo.y + 84 - this.bounce);
					ctx.scale(.8,.8);
					if(this.bouncing == false && this.backDown == false){
						ctx.drawImage(this.deadPiccolo,0,0);
					} else {
						ctx.drawImage(this.deadPiccolo2,0,0);
					}
				}
				ctx.restore();
			}
			
			
			
			
			
		}
	};
	
	//DRAW THE ENVIRONMENT -- FOREGROUND
	Environment.prototype.drawForeground = function(ctx){
		
		//Smog draw
		if(this.smogCount > 0){
			for(var i = 0; i < this.smogCount; i++){
				
				ctx.save();
				this.smogTimer[i] += 2;
				if(this.smogTimer[i] > 16){
					this.smogTimer[i] = 2;
				}
				ctx.globalAlpha = this.smogAlpha[i];
				console.log(this.smogAngle[i]);
				ctx.translate(this.smogPos[i].x + (this.smogSize[i].x/2),this.smogPos[i].y + (this.smogSize[i].y/2));
				ctx.rotate(this.smogAngle[i]*(Math.PI/180));
				ctx.translate(-1 * (this.smogPos[i].x + (this.smogSize[i].x/2)),-1 * (this.smogPos[i].y + (this.smogSize[i].y/2)));
				//ctx.drawImage(this.smog1,this.smogPos[i].x,this.smogPos[i].y + 17,this.smogSize[i].x,this.smogSize[i].y);
				//ctx.drawImage(this.smog16,this.smogPos[i].x - 2,this.smogPos[i].y + 22,this.smogSize[i].x,this.smogSize[i].y);
				if(this.smogTimer[i] < 2){
					ctx.drawImage(this.smog1,this.smogPos[i].x,this.smogPos[i].y - 2,this.smogSize[i].x,this.smogSize[i].y);
				} else if(this.smogTimer[i] == 2){
					ctx.drawImage(this.smog2,this.smogPos[i].x,this.smogPos[i].y - 1.2,this.smogSize[i].x,this.smogSize[i].y);
				} else if(this.smogTimer[i] == 3){
					ctx.drawImage(this.smog3,this.smogPos[i].x,this.smogPos[i].y - .4,this.smogSize[i].x,this.smogSize[i].y);
				} else if(this.smogTimer[i] == 4){
					ctx.drawImage(this.smog4,this.smogPos[i].x,this.smogPos[i].y + .4,this.smogSize[i].x,this.smogSize[i].y);
				} else if(this.smogTimer[i] == 5){
					ctx.drawImage(this.smog5,this.smogPos[i].x,this.smogPos[i].y + 1.2,this.smogSize[i].x,this.smogSize[i].y);
				} else if(this.smogTimer[i] == 6){
					ctx.drawImage(this.smog6,this.smogPos[i].x,this.smogPos[i].y + 2,this.smogSize[i].x,this.smogSize[i].y);
				} else if(this.smogTimer[i] == 7){
					ctx.drawImage(this.smog7,this.smogPos[i].x,this.smogPos[i].y + 2.8,this.smogSize[i].x,this.smogSize[i].y);
				} else if(this.smogTimer[i] == 8){
					ctx.drawImage(this.smog8,this.smogPos[i].x,this.smogPos[i].y + 3.6,this.smogSize[i].x,this.smogSize[i].y);
				} else if(this.smogTimer[i] == 9){
					ctx.drawImage(this.smog9,this.smogPos[i].x,this.smogPos[i].y + 4.4,this.smogSize[i].x,this.smogSize[i].y);
				} else if(this.smogTimer[i] == 10){
					ctx.drawImage(this.smog10,this.smogPos[i].x,this.smogPos[i].y + 5.2,this.smogSize[i].x,this.smogSize[i].y);
				} else if(this.smogTimer[i] == 11){
					ctx.drawImage(this.smog11,this.smogPos[i].x - 1,this.smogPos[i].y + 6,this.smogSize[i].x,this.smogSize[i].y);
				} else if(this.smogTimer[i] == 12){
					ctx.drawImage(this.smog12,this.smogPos[i].x - 1,this.smogPos[i].y + 6.8,this.smogSize[i].x,this.smogSize[i].y);
				} else if(this.smogTimer[i] == 13){
					ctx.drawImage(this.smog13,this.smogPos[i].x - 1,this.smogPos[i].y + 7.6,this.smogSize[i].x,this.smogSize[i].y);
				} else if(this.smogTimer[i] == 14){
					ctx.drawImage(this.smog14,this.smogPos[i].x - 2,this.smogPos[i].y + 8.4,this.smogSize[i].x,this.smogSize[i].y);
				} else if(this.smogTimer[i] == 15){
					ctx.drawImage(this.smog15,this.smogPos[i].x - 2,this.smogPos[i].y + 9.2,this.smogSize[i].x,this.smogSize[i].y);
				} else if(this.smogTimer[i] > 15){
					ctx.drawImage(this.smog16,this.smogPos[i].x - 2,this.smogPos[i].y + 10,this.smogSize[i].x,this.smogSize[i].y);
				}
				
				ctx.restore();
			}
		}
		
		if(app.main.gameState == app.main.GAME_STATE.BEGIN){
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
			ctx.globalAlpha = this.alpha/100;
			ctx.fillStyle = "black";
			ctx.fillRect(0,295,1024,300);
			ctx.restore();
			/*
			ctx.save();
			ctx.globalAlpha = .9;
			ctx.fillStyle = "black";
			ctx.fillRect(0,295,1024,300);
			ctx.restore();
			*/
		}
		
		if(app.main.gameState == app.main.GAME_STATE.DEFAULT){
			
			ctx.save();
			if(this.movingSmoke < -6800){
				this.movingSmoke = 6400;
			}
			if(this.movingSmoke2 < -4000){
				this.movingSmoke2 = 1200;
			}
			
			if(this.movingSmoke3 < -6800){
				this.movingSmoke3 = 6400;
			}
			if((app.main.android17.city == false && app.main.scene == false) || (app.main.vegeta.gohan == false && app.main.vegeta.superForm == false)){
				if(this.currentSmoke > 40){
					this.currentSmoke--;
				}
				ctx.globalAlpha = (this.currentSmoke / 100);
			} else {
				if(this.currentSmoke < 55){
					this.currentSmoke++;
				}
				ctx.globalAlpha = (this.currentSmoke / 100);
			}
			ctx.drawImage(this.smoke3,this.movingSmoke -150,-850, 6850, 1800);
			ctx.drawImage(this.smoke3,this.movingSmoke3,-850, 6550, 1800);
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
	Environment.prototype.drawTop = function(ctx3){
		
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
		ctx3.globalAlpha = this.darkness/100;
		ctx3.fillStyle = "black";
		ctx3.fillRect(0,0,1024,768);
		ctx3.restore();
		
		if(this.dark == true){
			if(this.darkCount < 10){
				this.darkCount += .1;
				this.darkness += .1;
			} else {
				this.darkCount = 0;
				this.dark = false;
			}
		}
		
		
	};
	
	//DRAW THE OVERLAY
	Environment.prototype.drawOverlay = function(ctx2){
		
		//ctx2.canvas.width = ctx2.canvas.width
		ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height);
		
		if(this.flash == true){
			ctx2.save();
			ctx2.globalAlpha = this.fade/100;
			//ctx2.fillStyle = "White";
			ctx2.fillStyle = "#FFFF99";
			ctx2.fillRect(0,0,1024,768);
			ctx2.restore();
		}
		
		if(this.superFlash == true){
			ctx2.save();
			ctx2.globalAlpha = this.fade2/100;
			ctx2.fillStyle = "#FFFF99";
			ctx2.fillRect(0,0,1024,768);
			ctx2.restore();
		}
		
		if(this.fadeInSlow == true){
			this.fade3 = this.fade3 - 2.5;
			ctx2.save();
			ctx2.globalAlpha = this.fade3/100;
			ctx2.fillStyle = "black";
			ctx2.fillRect(0,0,1024,768);
			ctx2.restore();
			if(this.fade3 < 1){
				this.fadeInSlow = false;
				this.fade3 = 100;
			}
		}
		
		if(this.fadeInFast == true){
			this.fade3 = this.fade3 - 5;
			ctx2.save();
			ctx2.globalAlpha = this.fade3/100;
			ctx2.fillStyle = "black";
			ctx2.fillRect(0,0,1024,768);
			ctx2.restore();
			if(this.fade3 < 1){
				this.fadeInFast = false;
				this.fade3 = 100;
			}
		}
		
		if(this.fadeOut == true){
			this.fade4 = this.fade4 + 2.5;
			ctx2.save();
			ctx2.globalAlpha = this.fade4/100;
			ctx2.fillStyle = "black";
			ctx2.fillRect(0,0,1024,768);
			ctx2.restore();
		}
		
		if(this.fadeOut == false){
			this.fade4 = 0;
		}
	};
	
	return Environment; 
})(); //end IIFE