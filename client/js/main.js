 // main.js 

"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

/*
 THIS IS THE MAIN CONTROL CENTER FOR THE GAME!
 */
app.main = {
	//properties
    WIDTH : 1024, 
    HEIGHT: 768,
    canvas: undefined,
    ctx: undefined,
   	lastTime: 0,
    debug: false,
	GAME_STATE: Object.freeze({ 
		BEGIN : 0,
		DEFAULT : 1,
		VICTORY : 2,
		DEFEAT : 3,
		END : 4,
		TUTORIAL : 5,
		CREDITS : 6
	}),
	paused: false,
	onScreen: true,
	loaded: false,
	animationID: 0,
	gameState : undefined,
	roundScore : 0,
	roundScore2 : 0,
	totalScore : 0,
	totalPoints: 0,
	
	//Statistics
	
	hsTotal : 0,//hsTotal
	hs18 : 0, //hs18
	hs17 : 0, //hs17
	recentVictory: false,
	victories: 0,
	hsVictory : 0,//hsVictory
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
	
	sound : undefined,
	
	android18 : undefined,
	
	vegeta : undefined,
	
	environment : undefined,
	
	lastExecution : undefined,
	
	downsized : false,
	
	//Random chance
	chance : undefined,
	chance2 : undefined,
	chance3 : undefined,
	chance4 : undefined,
	chance5 : undefined,
	ranScore : undefined,
	
	//Ai control helpers
	aiChoice1 : undefined,
	aiChoice2 : undefined,
	aiChoice3 : undefined,
	aiChoice4 : undefined,
	aiChoice5 : undefined,
	aiDefense17 : undefined,
	aiDefenseTimer : 0,
	aiChangeTimer : 0,
	aiTaunting : false,
	aiCharging : false,
	aiReason : 0,
	dodgeChance : 0,
	dodgeChance2 : 0,
	aiChoiceSupport1 : 0,
	aiChoiceSupport2 : 0,
	krillinFirst : false,
	discHit : false,
	talkTimer : 0,
	specialScene : false,
	tempPosition : 0,
	tempDirLeft : false,
	finalSaying : false,
	blastExploded : false,
	begin : false,
	beginCounter : 0,
	teleDelay : 0,
	
	
	
	//Key restrictions
	keyHeld : false,
	keyHeldA : false,
	keyHeldS : false,
	keyHeldD : false,
	keyHeldW : false,
	keyHeldQ : false,
	keyHeldE : false,
	keyHeldT : false,
	keyHeldShift : false,
	next : false,
	action : false,
	reseted : false,
	fullAttack : false,
	target : false,
	quickReset : false,
	
	//Detections
	touching : false,
	detected : false,
	detectedHard : false,
	detected2 : false,
	detected3 : false,
	detectedHard2 : false,
	detectedHard3 : false,
	pointBlank : false,
	
	//Interface elements
	iBorder : undefined,
	iBackground : undefined,
	iBigBar : undefined,
	iSmallBar : undefined,
	redRibbon : undefined,
	iTimer : 0,
	iAlpha : 20,
	increasing : true,
	fade : false,
	moved : false,
	superFade : false,
	superFadeOther : false,
	extraFade : false,
	extraFade2 : false,
	fadeCounter : 0,
	spacing : 300,
	creditsRoll : 0,
	toggle1 : true,
	toggle2 : true,
	
	//Support CHARACTERS
	support : undefined,
	activeSupport : false,
	
	
	//Extra state variables
	intro : undefined,
	introState : false,
	endingState : false,
	scene : false,
	titleScreen : true,
	endingState : false,
	changed : false,
	sceneNum : 0,
	battle : 0,
	camX : 1,
	camY : 1,
	
	trueEnding : false,
	savesGohan : 0,
	
	blasts : undefined,
	
	//Timers
	blinking : 0,
	pulsing : 0,
	warnings : 0,
	sceneCounter : 0,
	sceneTimer : 0,
	damageTimer : 0,
	instructions : 0,
	sceneChange : 0,
	
	//Cooldowns
	modeSwitch: 0,
	modeSwitch17: 0,
	cooldownAI: 0,
	cooldownAI2: 0,
	cooldownAI3: 0,
	cooldownAndroid17: 0,
	cooldownAndroid18: 0,
	changeDelay: 0,
	
	//Dying
	vegetaDying: false,
	piccoloDying: false,
	gohanDying: false,
	dying18: false,
	
	//Deaths
	vegetaDead: false,
	piccoloDead: false,
	gohanDead: false,
	krillinDead: false,
	tienDead: false,
	yamchaDead: false,
	chaotzuDead: false,
	
	//background
	fpsBack: 20,
	lastExecutionBack: undefined,
	
	

    // methods
	init : function() {
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
		
		this.android18 = new app.Android18(600,this.vegeta);
		
		this.android17 = new app.Android17(180,this.vegeta);
		
		this.vegeta = new app.Vegeta(300,0,this.android18);
		
		this.lastExecution = new Date().getTime();

		
		//Interface Images
		var image = new Image();
		image.src =  app.gameUI.iBorder;
		this.iBorder = image;
		
		image = new Image();
		image.src =  app.gameUI.iBackground;
		this.iBackground = image;
		
		image = new Image();
		image.src =  app.gameUI.iBigBar;
		this.iBigBar = image;
		
		image = new Image();
		image.src =  app.gameUI.iSmallBar;
		this.iSmallBar = image;
		
		image = new Image();
		image.src =  app.gameUI.redRibbon;
		this.redRibbon = image;
		
		image = new Image();
		image.src =  app.environment.titleBar;
		this.titleBar = image;
		
		image = new Image();
		image.src =  app.environment.digitalBackground;
		this.digitalBackground = image;
		
		image = new Image();
		image.src =  app.gameUI.warning;
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
		
		function doFull(){
			var style = document.querySelector('#canvas1').getAttribute('style') || '';
			requestFullscreen(document.querySelector('#allContent'));
			//requestFullscreen(document.querySelector('#canvas2'));
			//requestFullscreen(document.querySelector('#canvas3'));
			var scale = {x: 1, y: 1};
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
	},
	
	// methods
	reInit : function() {
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
	},
	
	preInit : function() {
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
		this.ctx4.fillRect(0,0,1024,768);
		this.ctx4.textAlign = "center";
		this.ctx4.textBaseline = "middle";
		this.fillText(this.ctx4,"Systems Loading", this.WIDTH/2, this.HEIGHT/2 - 60, "82pt heavy_data", "white");
		this.fillText(this.ctx4,"This may take up to a minute", this.WIDTH/2, this.HEIGHT/2 + 50, "30pt heavy_data", "white");
		this.fillText(this.ctx4,"Internet speeds may change load time", this.WIDTH/2, this.HEIGHT/2 + 90, "14pt heavy_data", "grey");
		this.fillText(this.ctx4,"Created for play in Google Chrome", this.WIDTH/2, this.HEIGHT/2 + 200, "20pt heavy_data", "white");
		this.ctx4.restore();
	},
	
	updateBack: function(){
	  //Maintain update loop
	  requestAnimationFrame(this.updateBack.bind(this));
	 	
      //Set current time
	  var nowBack = new Date().getTime();

	  //Update runs here
      if ((nowBack - this.lastExecutionBack) > (1000 / this.fpsBack)){
	  
	    console.log("update");
		
		
		this.lastExecutionBack = new Date().getTime();
	  }
	},
	
	update: function(){
		
		// 1) LOOP
		requestAnimationFrame(this.update.bind(this));
	 	
		var now = new Date().getTime();

		if ((now - this.lastExecution) > (1000 / this.fps)){
			// 2) PAUSED?
			// if so, bail out of loop
			if (this.paused == true && this.gameState != this.GAME_STATE.BEGIN){
				this.drawPauseScreen(this.ctx);
				return;
			} else if(this.paused == true) {
				return;
			}
	 	
			//this.ctx2.clearRect(0, 0, this.ctx2.width, this.ctx2.height);
		
			var dt = this.calculateDeltaTime();
		 
			
			this.barCheckers(); //Checks for game state changes
			
			//delay of state changes
			if(this.changeDelay < 30){
				this.changeDelay++;
			}

			
			if(this.vegeta.piccolo == true && this.vegeta.dead == true){
				this.piccoloDead = true;
			}
			if(this.vegeta.vegeta == true && this.vegeta.dead == true){
				this.vegetaDead = true;
			}
			if(this.vegeta.gohan == true && this.vegeta.dead == true){
				this.gohanDead = true;
			}
			if(this.activeSupport == true){
			if(this.support[0].dead == true){
				this.tienDead = true;
			}
			if(this.support[1].dead == true){
				this.krillinDead = true;
			}
			}
			
			if(this.tienDead == true && this.krillinDead == true){
				this.trueEnding = true;
			} else if(this.tienDead == true){
				this.savesGohan = .4;
			} else if(this.krillinDead == true){
				this.savesGohan = .6;
			}
			
			if(this.android18.dead == true && this.specialScene == false){
				this.sceneCounter = 0;
				//this.sound.stopBGAudioScene();
				this.environment.superFlash = false;
				this.gameState = this.GAME_STATE.DEFEAT;
				//this.sound.playBGAudioScene(10);
			}
			
			//Next fight
			if(this.piccoloDead == true && this.vegeta.end == true && this.battle < 1 && this.vegetaDead == false && this.sceneNum != 2){
				this.battle = 1;
				this.changed = false;
				this.scene = true;
			} else if(this.vegetaDead == true && this.vegeta.end == true && this.battle < 2){
				this.battle = 2;
				this.changed = false;
				this.scene = true;
			} else if(this.vegeta.dead == true && this.battle == 2 && this.sceneNum != 100){
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
			} else if(this.vegeta.dead == true && this.battle == 3){
				this.battle = 3;
				this.sceneNum = 5;
				this.scene = true;
			}
			
			if(this.gameState == this.GAME_STATE.TUTORIAL && this.changed == false) {
				this.android17 = new app.Android17(900,this.vegeta);
				this.vegeta = new app.Vegeta(200,1,this.android18);
				this.vegeta.scenePlay = true;
				this.android18 = new app.Android18(800,this.vegeta);
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
			} else if(this.gameState == this.GAME_STATE.DEFAULT && this.changed == false) {
				this.changed = true;
				//this.activeSupport = true;
				if(this.sceneNum == 0){
					this.android17 = new app.Android17(600,this.vegeta);
					this.android18 = new app.Android18(500,this.vegeta);
					this.android17.position.y = 400;
					this.android18.position.y = 400;
					this.android17.hover = true;
					this.android18.hover = true;
				}
				if(this.battle == 0){
					this.sceneNum = 1;
					//this.android17 = new app.Android17(900,this.vegeta);
					this.vegeta = new app.Vegeta(300,2,this.android18);
					//this.android18 = new app.Android18(600,this.vegeta);
					//this.activeSupport = true;
					if(this.activeSupport == true){
						this.environment.supportActive = true;
						this.support[0] = new app.Vegeta(100,4,this.android18);
						this.support[1] = new app.Vegeta(200,5,this.android18);
						this.support[0].vanish = false;
						this.support[1].vanish = false;
					}
					//this.vegeta.vanish = false;
				} else if(this.battle == 1){
					this.sceneNum = 2;
					//this.android17 = new app.Android17(900,this.vegeta);
					this.vegeta = new app.Vegeta(100,0,this.android18);
					//this.android18 = new app.Android18(600,this.vegeta);
				} else if(this.battle == 2){
					this.activeSupport = true;
					if(this.sceneNum < 3){
						this.sceneNum = 3;
					}
					//this.android17 = new app.Android17(900,this.vegeta);
					this.vegeta = new app.Vegeta(200,3,this.android18);
					//this.android18 = new app.Android18(600,this.vegeta);
					if(this.activeSupport == true){
						this.environment.supportActive = true;
						this.support[0] = new app.Vegeta(120,4,this.android18);
						this.support[1] = new app.Vegeta(20,5,this.android18);
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
			if(this.scene == false && this.battle != 3){
			this.android17.decisionTimer++;
			//console.log("DECISIONS DECISIONS DECISIONS: " + this.android17.decision);
			if((this.android17.decisionTimer > 200 && this.android17.end == false)){
				this.android17.decision = Math.random();
			
				if(this.android17.city == true && this.android17.decision >= .3) {
					this.android17.superSpeed = true;
					this.android17.gone = false;
					this.android17.city = false;
				}
			
				if(this.android17.evasion == true && this.android17.decision < .7){
					this.android17.evasion = false;
				}
			
				if(this.android17.encounter == true && (this.android17.decision >= .7 || this.android17.decision < .3)){
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
			
			if(this.roundScore < 1){
				this.roundScore = 0;
			}
			if(this.roundScore2 < 1){
				this.roundScore2 = 0;
			}
			
			if(this.discHit == true && this.android18.health > 0 && this.krillinFirst == false && this.scene == false){
				this.talkTimer++;
				if(this.talkTimer < 2){
					this.sound.playTaunt8(Math.round(getRandom(11,12)));
				} else if(this.talkTimer < 49){
					
				} else if(this.talkTimer < 50){
					this.sound.playTaunt6(Math.round(getRandom(25,26)));
				} else {
					this.discHit = false;
					this.krillinFirst = true;
					this.talkTimer = 0;
				}
			} else if(this.discHit == true && this.scene == true){
				this.krillinFirst = true;
			}
			
			if(this.endingState == true || this.specialScene == true || this.gameState == this.GAME_STATE.VICTORY){
				this.scene = false;
			}
			
			
			//HANDLE ENERGY BLAST ATTACKS
			for (var i = 0; i < this.blasts.length; i++){
				//EXPIRE BLASTS
				if(this.blasts[i].lifetime > 40){
					this.blasts.splice(i, 1);
				} else {
					//HIT BOTH
					if(this.blasts[i].exploding == false && (this.vegeta.blasting == true || this.android18.blasting == true) && attackHitTest(this.android18, this.vegeta) == true && (attackHitTestBlast(this.blasts[i], this.vegeta) == true || attackHitTestBlast(this.blasts[i], this.android18) == true) && this.blasts[i].type == 0){
						if(this.android18.powerMove == false && this.vegeta.powerMove == false){
							this.pointBlank = true;
							if(this.android18.left == true){
								this.vegeta.velocity.x -= 12;
							} else if(this.android18.right == true){
								this.vegeta.velocity.x += 12;
							}
							this.vegeta.decel = this.vegeta.velocity.clone();
							if(this.vegeta.left == true){
								this.android18.velocity.x -= 12;
							} else if(this.vegeta.right == true){
								this.android18.velocity.x += 12;
							}
							this.android18.decel = this.android18.velocity.clone();
							if(this.vegeta.endurance > 14){
								this.vegeta.endurance = this.vegeta.endurance - (4 + getRandom(0, 2));
							} else if(this.vegeta.endurance < 15){
								this.vegeta.health = this.vegeta.health - (4 + getRandom(0, 2));
							}
							if(this.android18.endurance > 14){
								this.android18.endurance = this.android18.endurance - (4 + getRandom(0, 2));
							} else if(this.android18.endurance < 15){
								this.android18.health = this.android18.health - (4 + getRandom(0, 2));
							}
							if(this.blasts[i].blastUser != 0){
								this.blasts[i].position.x = this.android18.position.x;
							} else {
								this.blasts[i].position.x = this.vegeta.position.x;
							}
							this.blasts[i].exploding = true;
						}
						
						
					}
					//HIT VEGETA
					if(this.blasts[i].exploding == false && (attackHitTestBlast(this.blasts[i], this.vegeta) == true || ((((hardAttackHitTest(this.android18, this.vegeta) == true && this.vegeta.behind == false) && this.blasts[i].blastUser == 0) || (hardAttackHitTest(this.android17, this.vegeta) == true && this.blasts[i].blastUser == 6)) && this.blasts[i].lifetime < 2 && (this.blasts[i].type != 5 || (this.blasts[i].moving == true && this.blasts[i].triggerState == 0)))) && this.blasts[i].activated == true && this.vegeta.superSpeed == false && this.vegeta.vanish == false && ((this.blasts[i].blastUser != 1 && this.blasts[i].blastUser != 2 && this.blasts[i].blastUser != 3) || this.vegeta.hardHit == true) && this.blasts[i].blastUser != 4 && this.blasts[i].blastUser != 5){
						if(this.blasts[i].type == 0){
							this.vegeta.hit = true;
							this.vegeta.stun = true;
							this.vegeta.blastBurnLength = 10;
							this.vegeta.blastBurn = true;
							if((hardAttackHitTest(this.android18, this.vegeta) == true && this.blasts[i].blastUser == 0)&& this.vegeta.behind == false){
								this.pointBlank = true;
								this.blasts[i].position.x = this.vegeta.position.x;
								this.blasts[i].exploding = true;
							} else if((hardAttackHitTest(this.android17, this.vegeta) == true && this.blasts[i].blastUser == 6) && this.vegeta.behind == false){
								this.pointBlank = true;
								this.blasts[i].position.x = this.vegeta.position.x;
								this.blasts[i].exploding = true;
							} else {
								this.blasts[i].exploding = true;
							}
							this.sound.playEnergyReaction(6);
							if(this.blasts[i].dirLeft == true){
								this.vegeta.velocity.x -= 8;
							} else if(this.blasts[i].dirLeft == false){
								this.vegeta.velocity.x += 8;
							}
							this.vegeta.decel = this.vegeta.velocity.clone();
							if(this.vegeta.endurance > 14){
								this.vegeta.endurance = this.vegeta.endurance - (4 + getRandom(0, 2));
							} else if(this.vegeta.endurance < 15){
								this.vegeta.health = this.vegeta.health - (4 + getRandom(0, 2));
							}
						} else if(this.blasts[i].type == 1){
							if((hardAttackHitTest(this.android18, this.vegeta) == true && this.blasts[i].blastUser == 0) || (hardAttackHitTest(this.android17, this.vegeta) == true && this.blasts[i].blastUser == 6) && this.vegeta.behind == false){
								//console.log("HARDHITTESTSETSET");
								this.vegeta.position.x = this.blasts[i].position.x;
							}
							this.vegeta.punched = false;
							this.vegeta.hit = true;
							this.vegeta.stun = true;
							//this.vegeta.hardHit = true;
							this.vegeta.jumpVelocity.y = 0;
							if(this.blasts[i].dirLeft == true){
								this.vegeta.position.x = this.blasts[i].position.x;
							} else {
								this.vegeta.position.x = this.blasts[i].position.x + 180;
							}
							if(this.vegeta.endurance > 14){
								this.vegeta.endurance = this.vegeta.endurance - 1;
							} else if(this.vegeta.endurance < 15){
								this.vegeta.health = this.vegeta.health - 1;
							}
							if(this.vegeta.position.x < this.vegeta.LEFTWALL.x + 10 || this.vegeta.position.x > this.vegeta.RIGHTWALL.x - 10){
								this.sound.playEnergyReaction(6);
								this.vegeta.blastBurnLength = 20;
								this.vegeta.blastBurn = true;
								this.environment.shake = true;
								this.blasts[i].exploding = true;
								this.environment.flash = true;
								this.vegeta.hit = true;
								this.vegeta.stun = true;
								this.vegeta.hardHit = true;
								if(this.vegeta.endurance > 14){
									this.vegeta.endurance = this.vegeta.endurance - (7 + getRandom(2, 5));
								} else if(this.vegeta.endurance < 15){
									this.vegeta.health = this.vegeta.health - (7 + getRandom(2, 5));
								}
							}
						} else if(this.blasts[i].type == 2){
							this.vegeta.punched = false;
							this.vegeta.hit = true;
							this.vegeta.stun = true;
							this.vegeta.hardHit = true;
							this.vegeta.blasted = true;
							if(this.android18.left == true){
								this.vegeta.velocity.x -= 15;
							} else if(this.android18.right == true){
								this.vegeta.velocity.x += 15;
							}
							this.vegeta.jumpVelocity.y = 0;
							this.vegeta.decel = this.vegeta.velocity.clone();
							if(this.vegeta.endurance > 14){
								this.vegeta.endurance = this.vegeta.endurance - (10 + getRandom(2, 6));
							} else if(this.vegeta.endurance < 15){
								this.vegeta.health = this.vegeta.health - (10 + getRandom(2, 6));
							}
							this.sound.playEnergyReaction(6);
							this.environment.flash = true;
							this.environment.shake = true;
							this.vegeta.blastBurnLength = 20;
							this.vegeta.blastBurn = true;
							if((hardAttackHitTest(this.android18, this.vegeta) == true && this.blasts[i].blastUser == 0) || (hardAttackHitTest(this.android17, this.vegeta) == true && this.blasts[i].blastUser == 6) && this.vegeta.behind == false){
								this.pointBlank = true;
								if(this.vegeta.left == false){
									this.blasts[i].position.x = this.vegeta.position.x;
								} else {
									this.blasts[i].position.x = this.vegeta.position.x - 100;
								}
								this.blasts[i].exploding = true;
							} else {
								if(this.vegeta.left == false){
									this.blasts[i].position.x = this.vegeta.position.x;
								} else {
									this.blasts[i].position.x = this.vegeta.position.x - 100;
								}
								this.blasts[i].exploding = true;
							}
						} else if(this.blasts[i].type == 3){
							this.vegeta.punched = false;
							this.vegeta.hit = true;
							this.vegeta.stun = true;
							this.vegeta.hardHit = true;
							
							if(this.vegeta.endurance > 14){
								this.vegeta.endurance = this.vegeta.endurance - (10 + getRandom(2, 4));
							} else if(this.vegeta.endurance < 15){
								this.vegeta.health = this.vegeta.health - (10 + getRandom(2, 4));
							}
							if(this.blasts[i].dirLeft == true){
								this.vegeta.velocity.x = -60;
							} else if(this.blasts[i].dirLeft == false){
								this.vegeta.velocity.x = 60;
							}
							this.vegeta.decel = this.vegeta.velocity.clone();
							this.sound.playEnergyReaction(6);
							this.vegeta.blastBurnLength = 40;
							this.vegeta.blastBurn = true;
							this.blasts[i].exploding = true;
							this.environment.shake = true;
							this.environment.flash = true;
						}  else if(this.blasts[i].type == 5){
							this.vegeta.punched = false;
							this.vegeta.hit = true;
							this.vegeta.stun = true;
							//this.android18.hardHit = true;
							this.vegeta.blastBurnLength = 20;
							this.vegeta.blastBurn = true;
							if(this.vegeta.endurance > 14){
								this.vegeta.endurance = this.vegeta.endurance - (5 + getRandom(0, 5));
							} else if(this.vegeta.endurance < 15){
								this.vegeta.health = this.vegeta.health - (5 + getRandom(0, 5));
							}
							if(this.blasts[i].dirLeft == true){
								this.vegeta.velocity.x = -8;
							} else if(this.blasts[i].dirLeft == false){
								this.vegeta.velocity.x = 8;
							}
							this.vegeta.decel = this.vegeta.velocity.clone();
							this.sound.playEnergyReaction(6);
							if(hardAttackHitTest(this.android18, this.vegeta) == true){
								this.blasts[i].position.x = this.vegeta.position.x;
								this.blasts[i].exploding = true;
							} else {
								this.blasts[i].exploding = true;
							}
							//this.environment.flash = true;
						} else if(this.blasts[i].type == 7 && this.vegeta.behind == false){
							this.vegeta.punched = false;
							this.vegeta.hit = true;
							this.vegeta.stun = true;
							this.vegeta.hardHit = true;
							this.vegeta.blastBurnLength = 30;
							this.vegeta.blastBurn = true;
							if(this.vegeta.superForm == false){
							if(this.vegeta.endurance > 14){
								this.vegeta.endurance = this.vegeta.endurance - (10 + getRandom(0, 4));
							} else if(this.vegeta.endurance < 15){
								this.vegeta.health = this.vegeta.health - (10 + getRandom(0, 4));
							}
							} else {
								if(this.vegeta.endurance > 14){
									this.vegeta.endurance = this.vegeta.endurance - (15 + getRandom(0, 6));
								} else if(this.vegeta.endurance < 15){
									this.vegeta.health = this.vegeta.health - (15 + getRandom(0, 6));
								}
							}
							if(this.blasts[i].dirLeft == true){
								this.vegeta.velocity.x = -8;
							} else if(this.blasts[i].dirLeft == false){
								this.vegeta.velocity.x = 8;
							}
							this.vegeta.decel = this.vegeta.velocity.clone();
							
							this.sound.playEnergyReaction2(6);

							if(hardAttackHitTest(this.android18, this.vegeta) == true && this.blasts[i].lifetime < 2 && (this.android18.behind == false || this.blasts[i].moving == false)){
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
					if(this.blasts[i].exploding == false && (attackHitTestBlast(this.blasts[i], this.android18) == true || (((((hardAttackHitTest(this.android18, this.vegeta) == true  && this.blasts[i].type != 5)&& this.android18.behind == false) && this.blasts[i].blastUser != 0 && this.blasts[i].blastUser != 4 && this.blasts[i].blastUser != 5 && this.blasts[i].blastUser != 6) || (hardAttackHitTest(this.android17, this.vegeta) == true && this.blasts[i].blastUser == 6)) && this.blasts[i].lifetime < 2 && (this.blasts[i].type != 5 || (this.blasts[i].moving == true && this.blasts[i].triggerState == 0)))) && this.blasts[i].activated == true && this.android18.superSpeed == false && this.blasts[i].blastUser != 0){
						if(this.blasts[i].type == 0){
							if((hardAttackHitTest(this.vegeta, this.android18) == true && this.blasts[i].lifetime < 2 && this.blasts[i].blastUser != 0) && this.android18.behind == false){
								this.pointBlank = true;
								this.blasts[i].position.x = this.android18.position.x;
								this.blasts[i].exploding = true;
							} else {
								this.blasts[i].exploding = true;
							}
							this.sound.playEnergyReaction2(6);
							if(this.android18.fieldOn == false){
								
							this.android18.hit = true;
							this.android18.stun = true;
							this.android18.blastBurnLength = 10;
							this.android18.blastBurn = true;
							this.roundScore -= 25;
								
							if(this.blasts[i].dirLeft == true){
								this.android18.velocity.x -= 8;
							} else if(this.blasts[i].dirLeft == false){
								this.android18.velocity.x += 8;
							}
							this.android18.decel = this.android18.velocity.clone();
							if(this.android18.endurance > 14){
								this.android18.endurance = this.android18.endurance - (4 + getRandom(0, 2));
							} else if(this.android18.endurance < 15){
								this.android18.health = this.android18.health - (4 + getRandom(0, 2));
							}
							}
						} else if(this.blasts[i].type == 1){
							if(hardAttackHitTest(this.vegeta, this.android18) == true && this.android18.behind == false){
								//console.log("HARDHITTESTSETSET");
								this.android18.position.x = this.blasts[i].position.x;
							}
							if(this.android18.fieldOn == false){
							this.android18.punched = false;
							this.android18.hit = true;
							this.android18.stun = true;
							this.roundScore -= 50;
							//this.android18.hardHit = true;
							this.android18.jumpVelocity.y = 0;
							if(this.blasts[i].dirLeft == true){
								this.android18.position.x = this.blasts[i].position.x;
							} else {
								this.android18.position.x = this.blasts[i].position.x + 180;
							}
							if(this.android18.endurance > 14){
								this.android18.endurance = this.android18.endurance - 1;
							} else if(this.android18.endurance < 15){
								this.android18.health = this.android18.health - 1;
							}
							if(this.android18.position.x < this.android18.LEFTWALL.x + 10 || this.android18.position.x > this.android18.RIGHTWALL.x - 10){
								this.sound.playEnergyReaction(6);
								this.environment.shake = true;
								this.blasts[i].exploding = true;
								this.environment.flash = true;
								this.android18.hit = true;
								this.android18.stun = true;
								this.android18.hardHit = true;
								this.android18.blastBurnLength = 20;
								this.android18.blastBurn = true;
								if(this.android18.endurance > 14){
									this.android18.endurance = this.android18.endurance - (7 + getRandom(2, 5));
								} else if(this.android18.endurance < 15){
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
						} else if(this.blasts[i].type == 2){
							if(this.android18.fieldOn == false){
							this.android18.punched = false;
							this.android18.hit = true;
							this.android18.stun = true;
							this.android18.hardHit = true;
							this.android18.blasted = true;
							this.roundScore -= 50;
							if(this.vegeta.left == true){
								this.android18.velocity.x -= 15;
							} else if(this.vegeta.right == true){
								this.android18.velocity.x += 15;
							}
							this.android18.jumpVelocity.y = 0;
							this.android18.decel = this.android18.velocity.clone();
							if(this.android18.endurance > 14){
								this.android18.endurance = this.android18.endurance - (10 + getRandom(2, 6));
							} else if(this.android18.endurance < 15){
								this.android18.health = this.android18.health - (10 + getRandom(2, 6));
							}
							this.android18.blastBurnLength = 20;
							this.android18.blastBurn = true;
							}
							this.sound.playEnergyReaction(6);
							this.environment.flash = true;
							this.environment.shake = true;
							if(hardAttackHitTest(this.vegeta, this.android18) == true && this.android18.behind == false){
								this.pointBlank = true;
								if(this.android18.left == false){
									this.blasts[i].position.x = this.android18.position.x;
								} else {
									this.blasts[i].position.x = this.android18.position.x - 100;
								}
								this.blasts[i].exploding = true;
							} else {
								if(this.android18.left == false){
									this.blasts[i].position.x = this.android18.position.x;
								} else {
									this.blasts[i].position.x = this.android18.position.x - 100;
								}
								this.blasts[i].exploding = true;
							}
						} else if(this.blasts[i].type == 3){
							if(this.android18.fieldOn == false){
							this.android18.punched = false;
							this.android18.hit = true;
							this.android18.stun = true;
							this.android18.hardHit = true;
							this.roundScore -= 50;
							if(this.android18.endurance > 14){
								this.android18.endurance = this.android18.endurance - (10 + getRandom(2, 4));
							} else if(this.android18.endurance < 15){
								this.android18.health = this.android18.health - (10 + getRandom(2, 4));
							}
							if(this.blasts[i].dirLeft == true){
								this.android18.velocity.x = -60;
							} else if(this.blasts[i].dirLeft == false){
								this.android18.velocity.x = 60;
							}
							this.android18.decel = this.android18.velocity.clone();
							this.android18.blastBurnLength = 40;
							this.android18.blastBurn = true;
							}
							this.environment.shake = true;
							this.sound.playEnergyReaction2(6);
							if(hardAttackHitTest(this.vegeta, this.android18) == true && this.android18.behind == false){
								if(this.android18.left == false){
									this.blasts[i].position.x = this.android18.position.x - 100;
								} else {
									this.blasts[i].position.x = this.android18.position.x - 100;
								}
								//this.android18.position.x = this.blasts[i].position.x;
								this.blasts[i].exploding = true;
							} else {
								if(this.android18.left == false){
									this.blasts[i].position.x = this.android18.position.x - 50;
								} else {
									this.blasts[i].position.x = this.android18.position.x - 100;
								}
								this.blasts[i].exploding = true;
							}
							this.environment.flash = true;
						} else if(this.blasts[i].type == 5){
							if(this.android18.fieldOn == false){
							this.android18.punched = false;
							this.android18.hit = true;
							this.android18.stun = true;
							//this.android18.hardHit = true;
							this.android18.blastBurnLength = 20;
							this.android18.blastBurn = true;
							this.roundScore -= 50;
							if(this.android18.endurance > 14){
								this.android18.endurance = this.android18.endurance - (5 + getRandom(0, 5));
							} else if(this.android18.endurance < 15){
								this.android18.health = this.android18.health - (5 + getRandom(0, 5));
							}
							if(this.blasts[i].dirLeft == true){
								this.android18.velocity.x = -8;
							} else if(this.blasts[i].dirLeft == false){
								this.android18.velocity.x = 8;
							}
							this.android18.decel = this.android18.velocity.clone();
							}
							this.sound.playEnergyReaction2(6);
							if(hardAttackHitTest(this.vegeta, this.android18) == true && (this.android18.behind == false || this.blasts[i].moving == false)){
								this.pointBlank = true;
								this.blasts[i].position.x = this.android18.position.x;
								this.blasts[i].exploding = true;
							} else {
								this.blasts[i].exploding = true;
							}
							//this.environment.flash = true;
						} else if(this.blasts[i].type == 6 && this.android18.behind == false){
							if(this.android18.fieldOn == false){
							this.android18.punched = false;
							this.android18.hit = true;
							this.android18.stun = true;
							this.android18.jumpVelocity.y = 0;
							//this.android18.hardHit = true;
							this.android18.blastBurnLength = 40;
							this.android18.blastBurn = true;
							this.roundScore -= 5;
							if(this.android18.endurance > 14){
								this.android18.endurance = this.android18.endurance - 2.5;
							} else if(this.android18.endurance < 15){
								this.android18.health = this.android18.health - 2.5;
							}
							if(this.blasts[i].dirLeft == true){
								this.android18.velocity.x = -4;
							} else if(this.blasts[i].dirLeft == false){
								this.android18.velocity.x = 4;
							}
							this.android18.decel = this.android18.velocity.clone();
							} else {
								this.sound.playEnergyReaction(6);
								this.blasts[i].position.x = this.android18.position.x;
								this.blasts[i].exploding = true;
								this.environment.flash = true;
							}
						} else if(this.blasts[i].type == 7 && this.android18.behind == false){
							if(this.android18.fieldOn == false){
							this.android18.punched = false;
							this.android18.hit = true;
							this.android18.stun = true;
							this.android18.hardHit = true;
							this.android18.blastBurnLength = 30;
							this.android18.blastBurn = true;
							this.roundScore -= 50;
							if(this.vegeta.superForm == false){
							if(this.android18.endurance > 14){
								this.android18.endurance = this.android18.endurance - (10 + getRandom(0, 4));
							} else if(this.android18.endurance < 15){
								this.android18.health = this.android18.health - (10 + getRandom(0, 4));
							}
							} else {
								if(this.android18.endurance > 14){
									this.android18.endurance = this.android18.endurance - (15 + getRandom(0, 6));
								} else if(this.android18.endurance < 15){
									this.android18.health = this.android18.health - (15 + getRandom(0, 6));
								}
							}
						
							if(this.blasts[i].trigger == false){
								if(this.blasts[i].dirLeft == true){
									this.android18.velocity.x = -8;
								} else if(this.blasts[i].dirLeft == false){
									this.android18.velocity.x = 8;
								}
							} else {
								if(this.blasts[i].turnDown == true){
									this.android18.jumpVelocity.y = 15;
								} else if(this.blasts[i].turnDown == false){
									this.android18.jumpVelocity.y = -15;
								}
							}
							this.android18.decel = this.android18.velocity.clone();
							}
							this.sound.playEnergyReaction2(6);

							if(hardAttackHitTest(this.vegeta, this.android18) == true && this.blasts[i].lifetime < 2 && (this.android18.behind == false || this.blasts[i].moving == false)){
								this.pointBlank = true;
								this.blasts[i].position.x = this.android18.position.x;
								this.blasts[i].exploding = true;
							} else {
								//this.blasts[i].position.x = this.android18.position.x;
								this.blasts[i].exploding = true;
							}
							//this.environment.flash = true;
						} else if(this.blasts[i].type == 9){
							if(this.android18.fieldOn == false){
							this.android18.punched = false;
							this.android18.hit = true;
							this.android18.stun = true;
							//this.android18.hardHit = true;
							this.android18.blastBurnLength = 30;
							this.android18.blastBurn = true;
							this.roundScore -= 5;
							if(this.android18.endurance > 14){
								this.android18.endurance = this.android18.endurance - .25;
							} else if(this.android18.endurance < 15){
								this.android18.health = this.android18.health - .25;
							}
							if((this.android18.position.x > this.android18.RIGHTWALL.x - 50) || (this.android18.position.x < this.android18.LEFTWALL.x + 50) || hitTest(this.android18,this.vegeta)){
							//Nothing
							} else {
								if(this.blasts[i].dirLeft == true){
									this.android18.velocity.x = -40;
								} else if(this.blasts[i].dirLeft == false){
									this.android18.velocity.x = 40;
								}
								this.android18.decel = this.android18.velocity.clone();
							}
							}
						} else if(this.blasts[i].type == 10){
							if(this.android18.fieldOn == false){
							this.android18.punched = false;
							this.android18.hit = true;
							this.android18.stun = true;
							this.android18.hardHit = true;
							this.android18.blastBurnLength = 60;
							this.android18.blastBurn = true;
							this.roundScore -= 100;
							if(this.krillinFirst == false){
								this.discHit = true;
							}
							if(this.android18.endurance > 14){
								this.android18.endurance = this.android18.endurance - 50;
							} else if(this.android18.endurance < 15){
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
					if(this.blasts[i].exploding == false && (attackHitTestBlast(this.blasts[i], this.android17) == true || (((((hardAttackHitTest(this.vegeta, this.android17) == true && this.blasts[i].type != 5)&& this.android17.behind == false) && this.blasts[i].blastUser != 0) || (hardAttackHitTest(this.android18, this.android17) == true && this.blasts[i].blastUser == 0) ) && this.blasts[i].lifetime < 2 && (this.blasts[i].type != 5 || (this.blasts[i].moving == true && this.blasts[i].triggerState == 0)))) && this.blasts[i].activated == true && this.android17.superSpeed == false && this.blasts[i].blastUser != 6 && this.android17.vanish == false && this.android17.city == false){
						if(this.blasts[i].type == 0){
							if(this.android17.fieldOn == false){
							this.android17.hit = true;
							this.android17.stun = true;
							if(this.battle != 3){
								this.roundScore2 -= 25;
							}
							this.android17.blastBurnLength = 10;
							this.android17.blastBurn = true;
							
							if(this.android17.decision != -1){
							if(this.blasts[i].dirLeft == true){
								this.android17.velocity.x -= 8;
							} else if(this.blasts[i].dirLeft == false){
								this.android17.velocity.x += 8;
							}
							this.android17.decel = this.android17.velocity.clone();
							}
							if(this.android17.endurance > 14){
								this.android17.endurance = this.android17.endurance - (4 + getRandom(0, 2));
							} else if(this.android17.endurance < 15){
								this.android17.health = this.android17.health - (4 + getRandom(0, 2));
							}
							}
							if(hardAttackHitTest(this.vegeta, this.android17) == true && this.blasts[i].blastUser != 0 && this.blasts[i].blastUser != 6 && this.android17.behind == false){
								this.blasts[i].position.x = this.android17.position.x;
								this.blasts[i].exploding = true;
							} else {
								this.blasts[i].exploding = true;
							}
							this.sound.playEnergyReaction2(6);
						} else if(this.blasts[i].type == 1){
							if(hardAttackHitTest(this.vegeta, this.android17) == true && this.android17.behind == false){
								//console.log("HARDHITTESTSETSET");
								this.android17.position.x = this.blasts[i].position.x;
							}
							if(this.android17.fieldOn == false){
							this.android17.punched = false;
							this.android17.hit = true;
							this.android17.stun = true;
							if(this.battle != 3){
								this.roundScore2 -= 50;
							}
							//this.android17.hardHit = true;
							this.android17.jumpVelocity.y = 0;
							if(this.blasts[i].dirLeft == true){
								this.android17.position.x = this.blasts[i].position.x;
							} else {
								this.android17.position.x = this.blasts[i].position.x + 180;
							}
							if(this.android17.endurance > 14){
								this.android17.endurance = this.android17.endurance - 1;
							} else if(this.android17.endurance < 15){
								this.android17.health = this.android17.health - 1;
							}
							if(this.android17.position.x < this.android17.LEFTWALL.x + 10 || this.android17.position.x > this.android17.RIGHTWALL.x - 10){
								this.sound.playEnergyReaction(6);
								this.environment.shake = true;
								this.blasts[i].exploding = true;
								this.environment.flash = true;
								this.android17.hit = true;
								this.android17.stun = true;
								this.android17.hardHit = true;
								this.android17.blastBurnLength = 10;
								this.android17.blastBurn = true;
								if(this.android17.endurance > 14){
									this.android17.endurance = this.android17.endurance - (7 + getRandom(2, 5));
								} else if(this.android17.endurance < 15){
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
						} else if(this.blasts[i].type == 2){
							if(this.android17.fieldOn == false){
							this.android17.punched = false;
							this.android17.hit = true;
							this.android17.stun = true;
							this.android17.hardHit = true;
							this.android17.blasted = true;
							if(this.battle != 3){
								this.roundScore2 -= 50;
							}
							if(this.android17.decision != -1){
							if(this.vegeta.left == true){
								this.android17.velocity.x -= 15;
							} else if(this.vegeta.right == true){
								this.android17.velocity.x += 15;
							}
							this.android17.jumpVelocity.y = 0;
							this.android17.decel = this.android17.velocity.clone();
							}
							if(this.android17.endurance > 14){
								this.android17.endurance = this.android17.endurance - (10 + getRandom(2, 6));
							} else if(this.android17.endurance < 15){
								this.android17.health = this.android17.health - (10 + getRandom(2, 6));
							}
							this.sound.playEnergyReaction(6);
							this.environment.flash = true;
							this.environment.shake = true;
							this.android17.blastBurnLength = 20;
							this.android17.blastBurn = true;
							}
							if(hardAttackHitTest(this.vegeta, this.android17) == true && this.android17.behind == false){
								this.pointBlank = true;
								if(this.android17.left == false){
									this.blasts[i].position.x = this.android17.position.x;
								} else {
									this.blasts[i].position.x = this.android17.position.x - 100;
								}
								this.blasts[i].exploding = true;
							} else {
								if(this.android17.left == false){
									this.blasts[i].position.x = this.android17.position.x;
								} else {
									this.blasts[i].position.x = this.android17.position.x;
								}
								this.blasts[i].exploding = true;
							}
						} else if(this.blasts[i].type == 3){
							if(this.android17.fieldOn == false){
							this.android17.punched = false;
							this.android17.hit = true;
							this.android17.stun = true;
							this.android17.hardHit = true;
							this.roundScore2 -= 50;
							if(this.android17.endurance > 14){
								this.android17.endurance = this.android17.endurance - (10 + getRandom(2, 4));
							} else if(this.android17.endurance < 15){
								this.android17.health = this.android17.health - (10 + getRandom(2, 4));
							}
							if(this.blasts[i].dirLeft == true){
								this.android17.velocity.x = -60;
							} else if(this.blasts[i].dirLeft == false){
								this.android17.velocity.x = 60;
							}
							this.android17.decel = this.android17.velocity.clone();
							}
							this.environment.shake = true;
							this.android17.blastBurnLength = 40;
							this.android17.blastBurn = true;
							this.sound.playEnergyReaction2(6);
							if(hardAttackHitTest(this.vegeta, this.android17) == true && this.android17.behind == false){
								if(this.android17.left == false){
									this.blasts[i].position.x = this.android17.position.x - 100;
								} else {
									this.blasts[i].position.x = this.android17.position.x - 100;
								}
								//this.android17.position.x = this.blasts[i].position.x;
								this.blasts[i].exploding = true;
							} else {
								if(this.android17.left == false){
									this.blasts[i].position.x = this.android17.position.x - 50;
								} else {
									this.blasts[i].position.x = this.android17.position.x - 100;
								}
								this.blasts[i].exploding = true;
							}
							this.environment.flash = true;
						} else if(this.blasts[i].type == 5){
							if(this.android17.fieldOn == false){
							this.android17.punched = false;
							this.android17.hit = true;
							this.android17.stun = true;
							//this.android17.hardHit = true;
							this.android17.blastBurnLength = 20;
							this.android17.blastBurn = true;
							this.roundScore2 -= 25;
							if(this.android17.endurance > 14){
								this.android17.endurance = this.android17.endurance - (5 + getRandom(0, 5));
							} else if(this.android17.endurance < 15){
								this.android17.health = this.android17.health - (5 + getRandom(0, 5));
							}
							if(this.blasts[i].dirLeft == true){
								this.android17.velocity.x = -8;
							} else if(this.blasts[i].dirLeft == false){
								this.android17.velocity.x = 8;
							}
							this.android17.decel = this.android17.velocity.clone();
							}
							this.sound.playEnergyReaction2(6);
							if(hardAttackHitTest(this.vegeta, this.android17) == true && (this.android17.behind == false || this.blasts[i].moving == false)){
								this.pointBlank = true;
								this.blasts[i].position.x = this.android17.position.x;
								this.blasts[i].exploding = true;
							} else {
								this.blasts[i].exploding = true;
							}
							//this.environment.flash = true;
						} else if(this.blasts[i].type == 6 && this.android17.behind == false){
							if(this.android17.fieldOn == false){
							this.android17.punched = false;
							this.android17.hit = true;
							this.android17.stun = true;
							this.android17.jumpVelocity.y = 0;
							//this.android17.hardHit = true;
							this.android17.blastBurnLength = 40;
							this.android17.blastBurn = true;
							this.roundScore2 -= 5;
							if(this.android17.endurance > 14){
								this.android17.endurance = this.android17.endurance - 2.5;
							} else if(this.android17.endurance < 15){
								this.android17.health = this.android17.health - 2.5;
							}
							if(this.android17.decision != -1){
							if(this.blasts[i].dirLeft == true){
								this.android17.velocity.x = -4;
							} else if(this.blasts[i].dirLeft == false){
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
						} else if(this.blasts[i].type == 7 && this.android17.behind == false){
							if(this.android17.fieldOn == false){
							this.android17.punched = false;
							this.android17.hit = true;
							this.android17.stun = true;
							this.android17.hardHit = true;
							this.android17.blastBurnLength = 30;
							this.android17.blastBurn = true;
							this.roundScore2 -= 50;
							if(this.android17.endurance > 14){
								this.android17.endurance = this.android17.endurance - (10 + getRandom(0, 4));
							} else if(this.android17.endurance < 15){
								this.android17.health = this.android17.health - (10 + getRandom(0, 4));
							}
							if(this.blasts[i].trigger == false){
								if(this.blasts[i].dirLeft == true){
									this.android17.velocity.x = -8;
								} else if(this.blasts[i].dirLeft == false){
									this.android17.velocity.x = 8;
								}
							} else {
								if(this.blasts[i].turnDown == true){
									this.android17.jumpVelocity.y = 15;
								} else if(this.blasts[i].turnDown == false){
									this.android17.jumpVelocity.y = -15;
								}
							}
							this.android17.decel = this.android17.velocity.clone();
							}
							this.sound.playEnergyReaction2(6);
							if(hardAttackHitTest(this.vegeta, this.android17) == true && this.blasts[i].lifetime < 2 && (this.android17.behind == false || this.blasts[i].moving == false)){
								this.pointBlank = true;
								this.blasts[i].position.x = this.android17.position.x;
								this.blasts[i].exploding = true;
							} else {
								//this.blasts[i].position.x = this.android17.position.x;
								this.blasts[i].exploding = true;
							}
							//this.environment.flash = true;
						} else if(this.blasts[i].type == 9){
							if(this.android17.fieldOn == false){
							this.android17.punched = false;
							this.android17.hit = true;
							this.android17.stun = true;
							//this.android17.hardHit = true;
							this.android17.blastBurnLength = 30;
							this.android17.blastBurn = true;
							this.roundScore2 -= 5;
							if(this.android17.endurance > 14){
								this.android17.endurance = this.android17.endurance - .25;
							} else if(this.android17.endurance < 15){
								this.android17.health = this.android17.health - .25;
							}
							if((this.android17.position.x > this.android17.RIGHTWALL.x - 50) || (this.android17.position.x < this.android17.LEFTWALL.x + 50) || hitTest(this.android17,this.vegeta)){
							//Nothing
							} else {
								if(this.blasts[i].dirLeft == true){
									this.android17.velocity.x = -40;
								} else if(this.blasts[i].dirLeft == false){
									this.android17.velocity.x = 40;
								}
								this.android17.decel = this.android17.velocity.clone();
							}
							}
						} else if(this.blasts[i].type == 10){
							if(this.android17.fieldOn == false){
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
					if(this.activeSupport == true){
					for(var x = 0; x < 2; x++){
					if(this.blasts[i].exploding == false && (attackHitTestBlast(this.blasts[i], this.support[x]) == true || (hardAttackHitTest(this.android18, this.support[x]) == true && this.blasts[i].lifetime < 2 && (this.blasts[i].type != 5 || (this.blasts[i].moving == true && this.blasts[i].triggerState == 0)))) && this.blasts[i].activated == true && this.support[x].superSpeed == false && this.support[x].vanish == false && this.support[x].end == false && this.support[x].dead == false && ((this.blasts[i].blastUser != 1 && this.blasts[i].blastUser != 2) || this.support[x].hardHit == true) && this.blasts[i].blastUser != 4 && this.blasts[i].blastUser != 5){
						if(this.blasts[i].type == 0){
							this.support[x].hit = true;
							this.support[x].stun = true;
							this.support[x].blastBurnLength = 10;
							this.support[x].blastBurn = true;
							if(hardAttackHitTest(this.android18, this.support[x]) == true && this.support[x].behind == false){
								this.pointBlank = true;
								this.blasts[i].position.x = this.support[x].position.x;
								this.blasts[i].exploding = true;
							} else {
								this.blasts[i].exploding = true;
							}
							this.sound.playEnergyReaction(6);
							if(this.blasts[i].dirLeft == true){
								this.support[x].velocity.x -= 8;
							} else if(this.blasts[i].dirLeft == false){
								this.support[x].velocity.x += 8;
							}
							this.support[x].decel = this.support[x].velocity.clone();
							if(this.support[x].endurance > 14){
								this.support[x].endurance = this.support[x].endurance - (4 + getRandom(0, 2));
							} else if(this.support[x].endurance < 15){
								this.support[x].health = this.support[x].health - (4 + getRandom(0, 2));
							}
						} else if(this.blasts[i].type == 1){
							if(hardAttackHitTest(this.android18, this.support[x]) == true && this.support[x].behind == false){
								//console.log("HARDHITTESTSETSET");
								this.support[x].position.x = this.blasts[i].position.x;
							}
							this.support[x].punched = false;
							this.support[x].hit = true;
							this.support[x].stun = true;
							//this.support[x].hardHit = true;
							this.support[x].jumpVelocity.y = 0;
							if(this.blasts[i].dirLeft == true){
								this.support[x].position.x = this.blasts[i].position.x;
							} else {
								this.support[x].position.x = this.blasts[i].position.x + 180;
							}
							if(this.support[x].endurance > 14){
								this.support[x].endurance = this.support[x].endurance - 1;
							} else if(this.support[x].endurance < 15){
								this.support[x].health = this.support[x].health - 1;
							}
							if(this.support[x].position.x < this.support[x].LEFTWALL.x + 10 || this.support[x].position.x > this.support[x].RIGHTWALL.x - 10){
								this.sound.playEnergyReaction(6);
								this.support[x].blastBurnLength = 20;
								this.support[x].blastBurn = true;
								this.environment.shake = true;
								this.blasts[i].exploding = true;
								this.environment.flash = true;
								this.support[x].hit = true;
								this.support[x].stun = true;
								this.support[x].hardHit = true;
								if(this.support[x].endurance > 14){
									this.support[x].endurance = this.support[x].endurance - (5 + getRandom(2, 4));
								} else if(this.support[x].endurance < 15){
									this.support[x].health = this.support[x].health - (5 + getRandom(2, 4));
								}
							}
						} else if(this.blasts[i].type == 2){
							this.support[x].punched = false;
							this.support[x].hit = true;
							this.support[x].stun = true;
							this.support[x].hardHit = true;
							this.support[x].blasted = true;
							if(this.android18.left == true){
								this.support[x].velocity.x -= 15;
							} else if(this.android18.right == true){
								this.support[x].velocity.x += 15;
							}
							this.support[x].jumpVelocity.y = 0;
							this.support[x].decel = this.support[x].velocity.clone();
							if(this.support[x].endurance > 14){
								this.support[x].endurance = this.support[x].endurance - (10 + getRandom(2, 6));
							} else if(this.support[x].endurance < 15){
								this.support[x].health = this.support[x].health - (10 + getRandom(2, 6));
							}
							this.sound.playEnergyReaction(6);
							this.environment.flash = true;
							this.environment.shake = true;
							this.support[x].blastBurnLength = 20;
							this.support[x].blastBurn = true;
							if(hardAttackHitTest(this.android18, this.support[x]) == true && this.support[x].behind == false){
								this.pointBlank = true;
								if(this.support[x].left == false){
									this.blasts[i].position.x = this.support[x].position.x;
								} else {
									this.blasts[i].position.x = this.support[x].position.x - 100;
								}
								this.blasts[i].exploding = true;
							} else {
								if(this.support[x].left == false){
									this.blasts[i].position.x = this.support[x].position.x;
								} else {
									this.blasts[i].position.x = this.support[x].position.x - 100;
								}
								this.blasts[i].exploding = true;
							}
						} else if(this.blasts[i].type == 3){
							this.support[x].punched = false;
							this.support[x].hit = true;
							this.support[x].stun = true;
							this.support[x].hardHit = true;
							
							if(this.support[x].endurance > 14){
								this.support[x].endurance = this.support[x].endurance - (10 + getRandom(0, 4));
							} else if(this.support[x].endurance < 15){
								this.support[x].health = this.support[x].health - (10 + getRandom(0, 4));
							}
							if(this.blasts[i].dirLeft == true){
								this.support[x].velocity.x = -60;
							} else if(this.blasts[i].dirLeft == false){
								this.support[x].velocity.x = 60;
							}
							this.support[x].decel = this.support[x].velocity.clone();
							this.sound.playEnergyReaction(6);
							this.support[x].blastBurnLength = 40;
							this.support[x].blastBurn = true;
							this.blasts[i].exploding = true;
							this.environment.shake = true;
							this.environment.flash = true;
						}  else if(this.blasts[i].type == 5){
							this.support[x].punched = false;
							this.support[x].hit = true;
							this.support[x].stun = true;
							//this.android18.hardHit = true;
							this.support[x].blastBurnLength = 20;
							this.support[x].blastBurn = true;
							if(this.support[x].endurance > 14){
								this.support[x].endurance = this.support[x].endurance - (5 + getRandom(0, 4));
							} else if(this.support[x].endurance < 15){
								this.support[x].health = this.support[x].health - (5 + getRandom(0, 4));
							}
							if(this.blasts[i].dirLeft == true){
								this.support[x].velocity.x = -8;
							} else if(this.blasts[i].dirLeft == false){
								this.support[x].velocity.x = 8;
							}
							this.support[x].decel = this.support[x].velocity.clone();
							this.sound.playEnergyReaction(6);
							if(hardAttackHitTest(this.android18, this.support[x]) == true){
								this.blasts[i].position.x = this.support[x].position.x;
								this.blasts[i].exploding = true;
							} else {
								this.blasts[i].exploding = true;
							}
							//this.environment.flash = true;
						} else if(this.blasts[i].type == 7 && this.support[x].behind == false){
							this.support[x].punched = false;
							this.support[x].hit = true;
							this.support[x].stun = true;
							this.support[x].hardHit = true;
							if(this.blasts[i].dirLeft == true){
								this.support[x].velocity.x = -8;
							} else if(this.blasts[i].dirLeft == false){
								this.support[x].velocity.x = 8;
							}
							this.support[x].decel = this.support[x].velocity.clone();
							this.sound.playEnergyReaction2(6);

							if(hardAttackHitTest(this.vegeta, this.support[x]) == true && this.blasts[i].lifetime < 2 && (this.support[x].behind == false || this.blasts[i].moving == false)){
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
					
					if(this.vegeta.blastTrigger == true && this.blasts[i].type == 5) {
						this.blasts[i].trigger = true;
					} else if(this.vegeta.end == true && this.blasts[i].type == 5) {
						this.blasts[i].exploding = true;
					}
					if((i + 1) == this.blasts.length){
						this.vegeta.blastTrigger = false;
					} 
					
					if(this.blasts[i].type == 9 && attackHitTestBlast(this.blasts[i], this.vegeta)){
						if(this.vegeta.aboveSky == false){
							this.vegeta.teleUp = true;
							this.vegeta.superSpeed = true;
						} else {
							this.vegeta.teleDown = true;
							this.vegeta.superSpeed = true;
						}
					}
					
					if(this.blasts[i].type == 10 && attackHitTestBlast(this.blasts[i], this.vegeta)){
						this.vegeta.teleUp = true;
						this.vegeta.superSpeed = true;
					}
					
					if(this.blasts[i].type == 7 && this.blasts[i].dirLeft == false && this.blasts[i].triggerState == 0 && ((this.blasts[i].position.x < this.android18.position.x + 100) && (this.blasts[i].position.x > this.android18.position.x - 100)) && ((this.blasts[i].position.y > this.android18.position.y + 75) || (this.blasts[i].position.y < this.android18.position.y - 25))){
						if(this.blasts[i].position.y > this.android18.position.y) {
							this.blasts[i].turnDown = false;
							this.vegeta.turnsUp = true;
						} else {
							this.blasts[i].turnDown = true;
							this.vegeta.turnsDown = true;
						}
						
						this.blasts[i].trigger = true;
					} else if(this.blasts[i].type == 7 && this.blasts[i].dirLeft == true && this.blasts[i].triggerState == 0 && ((this.blasts[i].position.x + 150 < this.android18.position.x + 100) && (this.blasts[i].position.x + 150 > this.android18.position.x - 100)) && ((this.blasts[i].position.y > this.android18.position.y + 75) || (this.blasts[i].position.y < this.android18.position.y - 25))){
						if(this.blasts[i].position.y > this.android18.position.y) {
							this.blasts[i].turnDown = false;
							this.vegeta.turnsUp = true;
						} else {
							this.blasts[i].turnDown = true;
							this.vegeta.turnsDown = true;
						}
						
						this.blasts[i].trigger = true;
					}

					
					//GOHAN BLAST EXPLODING
					if(this.blasts[i].type == 7 && this.vegeta.gohan == true && (this.vegeta.hit == true || this.vegeta.hardHit == true)){
						this.blasts[i].exploding = true;
					}
					
					if(this.gameState == this.GAME_STATE.TUTORIAL && this.blasts[i].type != 0){
						if(this.blasts[i].position.x < -200 || this.blasts[i].position.x > 1000){
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
			
			for (var i = 0; i < this.blasts.length; i++){
				for (var j = 0; j < this.blasts.length; j++){
					if(this.blasts[i].exploding == false && blastHitTestBlast(this.blasts[i], this.blasts[j]) == true && (this.blasts[i].blastUser == 0 || this.blasts[i].blastUser == 6) && (this.blasts[j].blastUser != 0 && this.blasts[j].blastUser != 6 ) && this.blasts[j].exploding == false){
						if(this.blasts[i].type != 0){
							this.blasts[j].exploding = true;
							if(this.blasts[j].type == 9){
								this.blastExploded = true;
								this.blasts[j].lifetime = 301;
							}
						} else if(this.blasts[j].type != 0 && this.blasts[j].type != 5){
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
			if(this.android17.stun == false && this.android17.end == false && this.android17.gone == false && this.android17.vanish == false){
				if(hardAttackHitTest(this.vegeta, this.android17) == true && (this.vegeta.punching == true || this.vegeta.kicking == true) ){
					this.aiChoice5 = (Math.random());
				} else if(attackHitTest(this.vegeta, this.android17) == true && this.vegeta.basic == true){
					this.aiChoice5 = (Math.random());
				}
				
				if(hardAttackHitTest(this.android17,this.vegeta) != true && app.main.android17.blasting == false && app.main.android17.test == false){
						//this.aiChoice1 = Math.random();
					this.aiChoice4 = Math.random();
				}
				
				this.aiDefenseTimer++;
				if(this.aiDefenseTimer > 20) {
					this.aiDefense17 = Math.random();
					this.aiDefenseTimer = 0;
				}
				
				this.cooldownAndroid17++;
				//ANDROID17 AGGRESSIVE STATE
				if(this.android17.aggressive == true && this.android17.encounter == true && this.android17.evasion == false && this.vegeta.end == false){
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
				
					
					if(this.aiDefense17 > .3) {
					
					//ANDROID17 MOVEMENT
					if(hitTest(this.vegeta,this.android17) != true && this.android17.powerMove == false && this.android17.hard == false && this.android17.taunting == false && app.main.android17.test == false){
						if(this.android17.right == true){
							if(attackHitTest(this.android17,this.vegeta) == true && this.android17.position.x > this.vegeta.position.x - 60){
							
							} else {
								this.android17.moveRight();
							}
						} else {
							if(attackHitTest(this.android17,this.vegeta) == true && this.android17.left == true && this.android17.position.x < this.vegeta.position.x + 60){
							
							} else {
								this.android17.moveLeft();
							}
						}
		
					}
					
					} else {
					//ANDROID17 REVERSE MOVEMENT
					if(this.android17.hard == false && this.android17.powerMove == false && this.android17.taunting == false){
						if(this.android17.right == true && this.android17.position.x > this.android17.LEFTWALL.x){
							this.android17.moveLeft();
						} else if(this.android17.left == true && this.android17.position.x < this.android17.RIGHTWALL.x){
							this.android17.moveRight();
						}
					}
					
					}
					
					if(this.activeSupport == false){
						if((this.android17.movingLeft == true || this.android17.movingRight == true) && hitTest(this.vegeta,this.android17) == true){
							this.android17.decel.x = 0;
						}
					} else {
						if((this.android17.movingLeft == true || this.android17.movingRight == true) && (hitTest(this.vegeta,this.android17) == true || hitTest(this.support[0],this.android17) == true || hitTest(this.support[1],this.android17) == true)){
							this.android17.decel.x = 0;
						}
					}
					
					//ANDROID17 FLIGHT
					if((this.vegeta.position.y < this.android17.position.y) && this.android17.hard == false && this.android17.taunting == false && this.android17.hardHit == false && this.android17.stun == false && (this.android17.position.y > this.android17.SKYTOP.y + 5) && this.android17.end == false){
						if(this.android17.attacking == false && this.android17.taunting == false && this.android17.blasting == false && this.android17.blocking == false){
							this.android17.up = true;
						}
						this.android17.flying = true;
						this.android17.jump();
					} else {
						this.android17.hover = false;
						this.android17.flying = false;
						if((this.vegeta.position.y - 50 > this.android17.position.y)){
							this.android17.aboveBuilding = false;
							//this.android17.air = true;
						}
						//this.android17.down = true;
					}
					
					
					//ANDROID17 FLIGHT DODGE -- 18
					if(this.android17.powerMove == false){
					if(((this.android18.blasting == true && this.android18.counter > 0 && this.android18.position.y - 100 < this.android17.position.y )) && this.android17.hard == false && this.android17.taunting == false && this.android17.stun == false  && this.android17.aboveSky == false && this.android17.blasting == false && this.android17.end == false){
						this.android17.dodge = true;
						this.android17.flying = true;
						this.android17.jump();
					} else if(((this.android18.blasting == true && this.android18.counter > 0 && this.android18.position.y + 100 > this.android17.position.y )) && this.android17.hard == false && this.android17.taunting == false && this.android17.stun == false && this.android17.aboveSky == true && this.android17.end == false){
						this.android17.hover = false;
						this.android17.dodge = true;
						this.android17.flying = false;
						//this.android17.down = true;
					} else {
						this.android17.dodge = false;
					}
					}
					
					if(this.dodgeChance2 > .5){
					
					//ANDROID17 FLIGHT DODGE
					if(this.android17.powerMove == false){
					if(((this.vegeta.blasting == true && this.vegeta.counter > 0 && this.vegeta.position.y - 100 < this.android17.position.y )) && this.android17.hard == false && this.android17.taunting == false && this.android17.stun == false  && this.android17.aboveSky == false && this.android17.blasting == false && this.android17.end == false){
						this.android17.dodge = true;
						this.android17.flying = true;
						this.android17.jump();
					} else if(((this.vegeta.blasting == true && this.vegeta.counter > 0 && this.vegeta.position.y + 100 > this.android17.position.y )) && this.android17.hard == false && this.android17.taunting == false && this.android17.stun == false && this.android17.aboveSky == true && this.android17.end == false){
						this.android17.hover = false;
						this.android17.dodge = true;
						this.android17.flying = false;
						//this.android17.down = true;
					} else {
						this.android17.dodge = false;
					}
					}
			
					
					} else if(this.dodgeChance2 <= .5 && this.dodgeChance > 0){
						if(this.vegeta.blasting == true && this.android17.hard == false && this.android17.taunting == false && this.android17.stun == false && this.android17.dodge == false && this.android17.energy > 33){
						this.android17.dodge = true;
						this.android17.superSpeed = true;
					} 
					} else if(this.dodgeChance2 <= -1){
						if(this.android17.fight == false && this.android17.taunting == false && this.android17.end == false){
							this.android17.dodge = true;
							this.android17.stun = true;
							//this.android17.counter = 0;
							this.android17.blocking = true;
							this.android17.fieldOn = true;
							this.dodgeChance2 = 0;
						}
					}
					
					
					
					//ANDROID17 BLOCKING
					if(this.aiChoice5 < .3 && this.aiChoice5 > .1 && this.android17.fight == false && this.android17.taunting == false && this.android17.exhausted == false && this.android17.end == false && hardAttackHitTest(this.vegeta, this.android17) == true){
						if(this.action == false){
							this.action = true;
							this.aiChoice5 = 10;
							this.android17.blocking = true;
							if(attackHitTest(this.vegeta, this.android17) == true && (this.vegeta.basic == true || this.vegeta.punching == true || this.vegeta.kicking == true) && this.vegeta.attacking == true){
								this.android17.stamina += 1;
							}
							if(this.vegeta.attacking == false || hardAttackHitTest(this.vegeta, this.android17) != true){
								this.android17.blocking = false;
							}
						}
					}
					//ANDROID17 DEFENDING SUPER SPEED (TELEPORT)
					if(this.aiChoice5 < .1 && ((this.android17.fight == false && this.attacking == false && this.android17.blasting == false) || this.android17.blocking == true) && this.android17.superSpeed == false && this.stun == false && this.android17.end == false && this.android17.energy > 40){
						if(this.action == false){
							this.aiChoice5 = 10;
							this.action = true;
							this.android17.superSpeed = true;
							this.android17.fight = true;
						}
					} else if(this.aiChoice5 < .1){
						this.aiChoice5 = 10;
					}
					//ANDROID17 BASIC ATTACKS
					if((attackHitTest(this.android17,this.vegeta) == true || (app.main.android17.test == true && (app.main.vegeta.punching == true || app.main.vegeta.kicking == true) && app.main.vegeta.blasting == false)) && this.android17.hit == false && this.android17.hardHit == false && this.aiChoice4 < 11 && this.aiChoice4 > .25){
						if(this.action == false){
							//this.chance2 = Math.random();
							//console.log("BASIC");
							if(this.android17.exhausted == false){
								this.android17.attacking = true;
								this.android17.fight = true;
								this.action = true;
							}
						}
					}
					//ANDROID17 HARD ATTACKS
					if((((hardAttackHitTest(this.android17,this.vegeta) == true && (this.android17.air == false || this.chance3 <= .5)) || (attackHitTest(this.android17,this.vegeta) == true && this.android17.air == true && this.chance3 > .5)) || (app.main.android17.test == true && (app.main.vegeta.punching == true || app.main.vegeta.kicking == true) && app.main.vegeta.blasting == false)) && this.aiChoice4 < .25 && this.aiChoice4 > .05 && this.vegeta.behind == false){
						if(this.action == false){
							//this.chance2 = Math.random();
							if(this.android17.exhausted == false){
								this.android17.attacking = true;
								this.android17.fight = true;
								this.android17.hard = true;
								this.android17.intensify = true;
								this.action = true;
							}
						}
					}
					
					if(this.android17.position.y < this.vegeta.position.y + 100 && this.android17.position.y > this.vegeta.position.y - 100){
					
					//ANDROID17 ENERGY BLASTS
					if(attackHitTest(this.android17,this.vegeta) != true && this.aiChoice4 > .83 && this.aiChoice4 < .951 && this.android17.fight == false && this.android17.energy > 30 && this.android17.taunting == false){
						if(this.action == false){
							this.action = true;
							app.main.aiChoice4 = 10;
							this.android17.attacking = true;
							this.android17.blasting = true;
							this.android17.fight = true;
						}
					}
					
					//ANDROID17 POWER ENERGY BLASTS
					if(attackHitTest(this.android17,this.vegeta) != true && this.aiChoice4 > .95 && this.aiChoice4 < 1 && this.android17.blasting == false && this.android17.fight == false && this.android17.energy > 30 && this.android17.taunting == false && this.cooldownAndroid17 > 100){
						if(this.action == false){
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
					if(((this.aiChoice4 < .05 && attackHitTest(this.android17,this.vegeta) == true) || (this.aiChoice4 < .01 && attackHitTest(this.android17,this.vegeta) != true)) && (this.android17.fight == false && this.android17.blasting == false || this.android17.blocking == true) && this.android17.superSpeed == false && this.android17.stun == false && this.android17.end == false && this.android17.energy > 33){
						if(this.action == false){
							this.action = true;
							this.android17.superSpeed = true;
							this.android17.fight = true;
						}
					} else if(this.aiChoice4 < .05){
						this.aiChoice4 = Math.random();
					}
					
					//ANDROID17 TAUNTING
					if(this.aiChoice4 < -1 && this.android17.fight == false && this.android17.taunting == false){
						if(this.action == false){
							this.action = true;
							this.android17.intensify = true;
							this.android17.taunting = true;
						}
					}
				} else if(this.android17.evasion == true && this.vegeta.end == false){ //EVASION EVASION EVASION --------
					
					//ANDROID17 REVERSE MOVEMENT
					if(this.android17.hard == false && this.android17.powerMove == false && this.android17.taunting == false){
						if(this.android17.right == true && this.android17.position.x > this.android17.LEFTWALL.x){
							this.android17.moveLeft();
						} else if(this.android17.left == true && this.android17.position.x < this.android17.RIGHTWALL.x){
							this.android17.moveRight();
						}
					}
					
					if((this.android17.position.y < this.vegeta.position.y + 100 && this.android17.position.y > this.vegeta.position.y - 100)){
					if((this.android17.position.x < this.android17.LEFTWALL.x + 100 && this.vegeta.position.x < this.android18.position.x) || (this.android17.position.x > this.android17.RIGHTWALL.x - 100 && this.vegeta.position.x > this.android18.position.x)){
					//ANDROID17 ENERGY BLASTS
					if(attackHitTest(this.android17,this.vegeta) != true && this.aiChoice4 > .83 && this.aiChoice4 < .951 && this.android17.fight == false && this.android17.energy > 30 && this.android17.taunting == false && this.aiDefense17 > .6){
						if(this.action == false){
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
					if((hardAttackHitTest(this.android17,this.vegeta) == true  && this.vegeta.hit == false)){
						if(this.action == false){
							this.action = true;
							this.android17.superSpeed = true;
							this.android17.fight = true;
						}
					}
					
					//ANDROID17 HARD ATTACKS
					if(((hardAttackHitTest(this.android17,this.vegeta) == true && (this.android17.air == false || this.chance3 <= .5)) || (attackHitTest(this.android17,this.vegeta) == true && this.android17.air == true && this.chance3 > .5)) && this.vegeta.behind == false){
						if(this.action == false){
							//this.chance2 = Math.random();
							if(this.android17.exhausted == false){
								this.android17.attacking = true;
								this.android17.fight = true;
								this.android17.hard = true;
								this.android17.intensify = true;
								this.action = true;
							}
						}
					}
					
					//ANDROID17 TAUNTING
					if(this.aiChoice4 < -1 && this.android17.fight == false && this.android17.taunting == false){
						if(this.action == false){
							this.action = true;
							this.android17.intensify = true;
							this.android17.taunting = true;
						}
					}
					
					if(this.aiDefense17 > .5){ //Sometimes fly
					//ANDROID17 FLIGHT
					if((this.vegeta.position.y < this.android17.position.y) && this.android17.hard == false && this.android17.taunting == false && this.android17.hardHit == false && this.android17.stun == false && this.android17.end == false){
						if(this.android17.attacking == false && this.android17.taunting == false && this.android17.blasting == false && this.android17.blocking == false){
							this.android17.up = true;
						}
						this.android17.flying = true;
						this.android17.jump();
					} else {
						this.android17.hover = false;
						this.android17.flying = false;
						if((this.vegeta.position.y - 50 > this.android17.position.y)){
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
			if(this.vegeta.stun == false && this.vegeta.end == false && this.scene == false){
				//console.log(this.modeSwitch);
				if((hardAttackHitTest(this.android18, this.vegeta) == true && (this.android18.punching == true || this.android18.kicking == true))){
					this.aiChoice3 = (Math.random());
				} else if((attackHitTest(this.android18, this.vegeta) == true && this.android18.basic == true)){
					this.aiChoice3 = (Math.random());
				}
				
				if((hardAttackHitTest(this.android17, this.vegeta) == true)){
					this.aiChoice3 = (Math.random());
				} else if((attackHitTest(this.android17, this.vegeta) == true)){
					this.aiChoice3 = (Math.random());
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
				if(this.vegeta.gohan == true && this.battle == 3){
					this.cooldownAI += 2;
				} else {
					this.cooldownAI++;
				}
				//VEGETA AGGRESSIVE STATE
				if(this.vegeta.aggressive == true){
					this.modeSwitch++;
					//console.log("OFF -- AI2: " + this.aiChoice2);
					//console.log("OFF -- AI3: " + this.aiChoice3);
					if(this.vegeta.energy < 45 && this.vegeta.gero == false && this.modeSwitch > 40){
						this.vegeta.defensive = true;
						this.vegeta.aggressive = false;
						this.aiReason = 1;
					} else if((this.vegeta.stamina > 90 || this.vegeta.exhausted == true) && this.modeSwitch > 40 && this.vegeta.gero == false){
						this.vegeta.defensive = true;
						this.vegeta.aggressive = false;
						this.aiReason = 2;
					} else if(this.aiChoice1 < .03 && this.vegeta.energy > 45 && this.vegeta.stamina < 90 && this.vegeta.exhausted != true && this.modeSwitch > 40 && this.vegeta.gero == false){
						this.aiChoice1 = Math.random();
						this.vegeta.defensive = true;
						this.vegeta.aggressive = false;
						this.aiReason = 3;
					} 
					
					if((hardAttackHitTest(this.vegeta,this.android18) != true && hardAttackHitTest(this.vegeta,this.android17) != true) && this.vegeta.blasting == false && this.vegeta.taunting == false && this.vegeta.charging == false && this.vegeta.superSpeed == false  && app.main.vegeta.test == false){
						this.aiChoice1 = Math.random();
						this.aiChoice2 = Math.random();
					}
					
					//console.log("AI CHOICE 22222222 : " + this.aiChoice2);
					
					//Escape Double Trouble
					if(hardAttackHitTest(this.android18,this.vegeta) ==  true && hardAttackHitTest(this.android17,this.vegeta) ==  true && this.android17.encounter == true && this.aiChoice3 > .95 && this.vegeta.gero == false){
						/* if(this.vegeta.air == true && this.vegeta.position.y > this.vegeta.GROUND.y - 300){
							this.vegeta.hover = false;
							this.vegeta.flying = false;
						} else {
							this.vegeta.flying = true;
							this.vegeta.hover = false;
						} */
						if(this.vegeta.aboveBuilding == false){
							this.vegeta.teleUp = true;
							this.vegeta.superSpeed = true;
						} else {
							this.vegeta.teleDown = true;
							this.vegeta.superSpeed = true;
						}
					}
					
					
					//Escape Corner Camp
					if((hardAttackHitTest(this.android18,this.vegeta) ==  true || hardAttackHitTest(this.android17,this.vegeta) ==  true) && (this.vegeta.position.x < this.vegeta.LEFTWALL + 50 || this.vegeta.position.x > this.vegeta.RIGHTWALL - 50) && this.aiChoice3 > .8 && this.vegeta.gero == false){
						/* if(this.vegeta.air == true && this.vegeta.position.y > this.vegeta.GROUND.y - 300){
							this.vegeta.hover = false;
							this.vegeta.flying = false;
						} else {
							this.vegeta.flying = true;
							this.vegeta.hover = false;
						} */
						if(this.vegeta.aboveBuilding == false){
							this.vegeta.teleUp = true;
							this.vegeta.superSpeed = true;
						} else {
							this.vegeta.teleDown = true;
							this.vegeta.superSpeed = true;
						}
					}
					
					
					if(this.vegeta.focus17 == false){ //IF FOCUSING 17 == FALSE
						
					if(this.vegeta.gero == false){
					//VEGETA MOVEMENT
					if((hitTest(this.android18,this.vegeta) != true) && this.vegeta.powerMove == false && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && (this.vegeta.vegeta == false || this.vegeta.specMove == false) && app.main.vegeta.test == false){
						if(this.vegeta.right == true && this.vegeta.position.x < this.android18.position.x - 60){
							this.vegeta.moveRight();
						} else if(this.vegeta.left == true && this.vegeta.position.x > this.android18.position.x + 60){
							this.vegeta.moveLeft();
						}
					}
					
					//VEGETA FLIGHT
					if(((this.vegeta.powerMove == false && this.vegeta.blasting == false) || this.vegeta.vegeta == true) && this.scene == false){
					if((this.android18.position.y < this.vegeta.position.y) && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.dodge == false && this.vegeta.hardHit == false && this.vegeta.stun == false && this.vegeta.end == false){
						if(this.vegeta.attacking == false && this.vegeta.taunting == false && this.vegeta.charging == false && this.vegeta.blasting == false && this.vegeta.blocking == false){
							this.vegeta.up = true;
						}
						this.vegeta.flying = true;
						this.vegeta.jump();
					} else {
						this.vegeta.hover = false;
						this.vegeta.flying = false;
						this.vegeta.up = false;
						if((this.android18.position.y - 50 > this.vegeta.position.y)){
							this.vegeta.aboveBuilding = false;
							//this.vegeta.air = true;
						}
						//this.vegeta.down = true;
					}
					}
					
					} else { //IF GERO
						//VEGETA MOVEMENT
					if((hitTest(this.android18,this.vegeta) != true) && this.vegeta.powerMove == false && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && (this.vegeta.vegeta == false || this.vegeta.specMove == false) && this.vegeta.exhausted == false && app.main.vegeta.test == false){
						if(this.vegeta.right == true && this.vegeta.position.x < this.android18.position.x - 60){
							this.vegeta.moveRight();
						} else if(this.vegeta.left == true && this.vegeta.position.x > this.android18.position.x + 60){
							this.vegeta.moveLeft();
						}
					}
					
					//VEGETA FLIGHT
					if(((this.vegeta.powerMove == false && this.vegeta.blasting == false) || this.vegeta.vegeta == true) && this.scene == false && this.vegeta.exhausted == false){
					if((this.android18.position.y < this.vegeta.position.y) && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.dodge == false && this.vegeta.hardHit == false && this.vegeta.stun == false && this.vegeta.end == false){
						if(this.vegeta.attacking == false && this.vegeta.taunting == false && this.vegeta.charging == false && this.vegeta.blasting == false && this.vegeta.blocking == false){
							this.vegeta.up = true;
						}
						this.vegeta.flying = true;
						this.vegeta.jump();
					} else {
						this.vegeta.hover = false;
						this.vegeta.flying = false;
						this.vegeta.up = false;
						if((this.android18.position.y - 50 > this.vegeta.position.y)){
							this.vegeta.aboveBuilding = false;
							//this.vegeta.air = true;
						}
						//this.vegeta.down = true;
					}
					} else if(this.vegeta.exhausted == true){
						this.vegeta.flying = false;
					}
					
					}
					
					
					
					if(this.vegeta.powerMove == false && this.scene == false){
					if(this.dodgeChance > .5){
					
					//VEGETA FLIGHT DODGE

					if((((this.android18.blasting == true && this.android18.counter > 0 && this.android18.position.y - 100 < this.vegeta.position.y ))) && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.stun == false  && this.vegeta.aboveSky == false && this.vegeta.blasting == false && this.vegeta.end == false){
						this.vegeta.dodge = true;
						this.vegeta.flying = true;
						this.vegeta.jump();
					} else if((((this.android18.blasting == true && this.android18.counter > 0 && this.android18.position.y + 100 > this.vegeta.position.y ))) && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.stun == false && this.vegeta.aboveSky == true && this.vegeta.end == false){
						this.vegeta.hover = false;
						this.vegeta.dodge = true;
						this.vegeta.flying = false;
						this.vegeta.up = false;
						//this.vegeta.down = true;
					} else {
						this.vegeta.dodge = false;
					}
					
			
					
					} else if(this.dodgeChance < .5 && this.dodgeChance > .2 && this.vegeta.superSpeed == false){
						if(this.android18.blasting == true && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.stun == false && this.vegeta.dodge == false && this.vegeta.energy > 33){
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
					
					
					if(this.vegeta.vegeta == true){
						console.log("working");
					//VEGETA BLOCKING -- FOCUS 17
					if(this.aiChoice3 < .45 && this.aiChoice3 > .25 && this.vegeta.fight == false && this.vegeta.taunting == false && this.vegeta.exhausted == false && this.vegeta.end == false && hardAttackHitTest(this.android17, this.vegeta) == true  && this.vegeta.gero == false){
						if(this.action == false){
							this.action = true;
							this.aiChoice3 = 10;
							this.vegeta.blocking = true;
							if(attackHitTest(this.android17, this.vegeta) == true && (this.android17.basic == true || this.android17.punching == true || this.android17.kicking == true) && this.android17.attacking == true){
								//this.vegeta.stamina += 1;
							}
							if(this.android17.attacking == false || hardAttackHitTest(this.android17, this.vegeta) != true){
								this.vegeta.blocking = false;
							}
						}
					}
						
					//VEGETA DEFENDING SUPER SPEED (TELEPORT)
					if(this.aiChoice3 < .25 && this.aiChoice3 > .15 && this.vegeta.blasting == false && this.vegeta.superSpeed == false && this.vegeta.end == false && this.vegeta.superSpeedExhaustion == false && this.vegeta.energy > 40){
						if(this.action == false){
							if(this.vegeta.vegeta == true){
								this.vegeta.specChance = Math.random();
								if(this.vegeta.specChance > -1){
								if(this.android18.position.y < this.vegeta.position.y + 300 && this.android18.position.y > this.vegeta.position.y - 300){
								if(this.android18.position.x < this.vegeta.position.x + 300 && this.android18.position.x > this.vegeta.position.x - 300){
									this.vegeta.hits18 = true;
								}
								}
								if(this.android17.active == true){
								if(this.android17.position.y < this.vegeta.position.y + 300 && this.android17.position.y > this.vegeta.position.y - 300){
								if(this.android17.position.x < this.vegeta.position.x + 300 && this.android17.position.x > this.vegeta.position.x - 300){
									this.vegeta.hits17 = true;
								}
								}
								}
								if(this.vegeta.hits18 == true || this.vegeta.hits17 == true){
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
					if(this.aiChoice3 < .15 && this.vegeta.blasting == false && this.vegeta.superSpeed == false && this.vegeta.end == false && this.vegeta.superSpeedExhaustion == false && this.vegeta.energy > 40){
						if(this.action == false){
							this.aiChoice3 = 10;
							this.action = true;
							this.vegeta.superSpeed = true;
							this.vegeta.fight = true;
						}
					} else if(this.aiChoice3 < .15){
						this.aiChoice3 = 10;
					}
					
					
					} else {
						
					//VEGETA BLOCKING
					if(this.aiChoice3 < .45 && this.aiChoice3 > .15 && this.vegeta.fight == false && this.vegeta.taunting == false && this.vegeta.exhausted == false && this.vegeta.end == false && hardAttackHitTest(this.android17, this.vegeta) == true  && this.vegeta.gero == false){
						if(this.action == false){
							this.action = true;
							this.aiChoice3 = 10;
							this.vegeta.blocking = true;
							if(attackHitTest(this.android17, this.vegeta) == true && (this.android17.basic == true || this.android17.punching == true || this.android17.kicking == true) && this.android17.attacking == true){
								//this.vegeta.stamina += 1;
							}
							if(this.android17.attacking == false || hardAttackHitTest(this.android17, this.vegeta) != true){
								this.vegeta.blocking = false;
							}
						}
					}
						
					//VEGETA DEFENDING SUPER SPEED (TELEPORT)
					if(this.aiChoice3 < .15 && this.vegeta.blasting == false && this.vegeta.superSpeed == false && this.vegeta.end == false && this.vegeta.superSpeedExhaustion == false && this.vegeta.energy > 40){
						if(this.action == false){
							this.aiChoice3 = 10;
							this.action = true;
							this.vegeta.superSpeed = true;
							this.vegeta.fight = true;
						}
					} else if(this.aiChoice3 < .15){
						this.aiChoice3 = 10;
					}
					}
					
					} else { //IF FOCUSING 17 == TRUE
						
					//VEGETA FLIGHT -- FOCUS 17
					if(((this.vegeta.powerMove == false && this.vegeta.blasting == false) || this.vegeta.vegeta == true) && this.scene == false){
					if((this.android17.position.y < this.vegeta.position.y) && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.dodge == false && this.vegeta.hardHit == false && this.vegeta.stun == false && this.vegeta.end == false){
						if(this.vegeta.attacking == false && this.vegeta.taunting == false && this.vegeta.charging == false && this.vegeta.blasting == false && this.vegeta.blocking == false){
							this.vegeta.up = true;
						}
						this.vegeta.flying = true;
						this.vegeta.jump();
					} else {
						this.vegeta.hover = false;
						this.vegeta.up = false;
						this.vegeta.flying = false;
						if((this.android17.position.y - 50 > this.vegeta.position.y)){
							this.vegeta.aboveBuilding = false;
							//this.vegeta.air = true;
						}
						//this.vegeta.down = true;
					}
					}
					
					//VEGETA MOVEMENT -- FOCUS 17
					if((hitTest(this.android18,this.vegeta) != true) && this.vegeta.powerMove == false && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && app.main.vegeta.test == false){
						if(this.vegeta.right == true && this.vegeta.position.x < this.android17.position.x - 60){
							this.vegeta.moveRight();
						} else if(this.vegeta.left == true && this.vegeta.position.x < this.android17.position.x - 60){
							this.vegeta.moveLeft();
						}
					}
					
					if(this.vegeta.powerMove == false && this.scene == false){
					if(this.dodgeChance > .5){
					
					//VEGETA FLIGHT DODGE -- FOCUS 17
					
					if((((this.android17.blasting == true && this.android17.counter > 0 && this.android17.position.y - 100 < this.vegeta.position.y ))) && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.stun == false  && this.vegeta.aboveSky == false && this.vegeta.blasting == false && this.vegeta.end == false){
						this.vegeta.dodge = true;
						this.vegeta.flying = true;
						this.vegeta.jump();
					} else if((((this.android17.blasting == true && this.android17.counter > 0 && this.android17.position.y + 100 > this.vegeta.position.y ))) && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.stun == false && this.vegeta.aboveSky == true && this.vegeta.end == false){
						this.vegeta.hover = false;
						this.vegeta.up = false;
						this.vegeta.dodge = true;
						this.vegeta.flying = false;
						//this.vegeta.down = true;
					} else {
						this.vegeta.dodge = false;
					}
					
					
					} else if(this.dodgeChance < .5 && this.dodgeChance > .2 && this.vegeta.superSpeed == false){
						if(this.android17.blasting == true && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.stun == false && this.vegeta.dodge == false && this.vegeta.energy > 33){
						this.dodgeChance = 0;
						this.vegeta.dodge = true;
						this.vegeta.superSpeed = true;
					} 
					}
					}
					
					//console.log("AICHOICE3 " + this.aiChoice3);
					
					if(this.vegeta.vegeta == true){
						console.log("working");
					//VEGETA BLOCKING -- FOCUS 17
					if(this.aiChoice3 < .55 && this.aiChoice3 > .3 && this.vegeta.fight == false && this.vegeta.taunting == false && this.vegeta.exhausted == false && this.vegeta.end == false && hardAttackHitTest(this.android17, this.vegeta) == true  && this.vegeta.gero == false){
						if(this.action == false){
							this.action = true;
							this.aiChoice3 = 10;
							this.vegeta.blocking = true;
							if(attackHitTest(this.android17, this.vegeta) == true && (this.android17.basic == true || this.android17.punching == true || this.android17.kicking == true) && this.android17.attacking == true){
								//this.vegeta.stamina += 1;
							}
							if(this.android17.attacking == false || hardAttackHitTest(this.android17, this.vegeta) != true){
								this.vegeta.blocking = false;
							}
						}
					}
						
					//VEGETA DEFENDING SUPER SPEED (TELEPORT)
					if(this.aiChoice3 < .3 && this.aiChoice3 > .2 && this.vegeta.blasting == false && this.vegeta.superSpeed == false && this.vegeta.end == false && this.vegeta.superSpeedExhaustion == false && this.vegeta.energy > 40){
						if(this.action == false){
							if(this.vegeta.vegeta == true){
								this.vegeta.specChance = Math.random();
								if(this.vegeta.specChance > -1){
								if(this.android18.position.y < this.vegeta.position.y + 300 && this.android18.position.y > this.vegeta.position.y - 300){
								if(this.android18.position.x < this.vegeta.position.x + 300 && this.android18.position.x > this.vegeta.position.x - 300){
									this.vegeta.hits18 = true;
								}
								}
								if(this.android17.active == true){
								if(this.android17.position.y < this.vegeta.position.y + 300 && this.android17.position.y > this.vegeta.position.y - 300){
								if(this.android17.position.x < this.vegeta.position.x + 300 && this.android17.position.x > this.vegeta.position.x - 300){
									this.vegeta.hits17 = true;
								}
								}
								}
								if((this.vegeta.hits18 == true || this.vegeta.hits17 == true) && this.vegeta.specTimer > 50){
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
					if(this.aiChoice3 < .2 && this.vegeta.blasting == false && this.vegeta.superSpeed == false && this.vegeta.end == false && this.vegeta.superSpeedExhaustion == false && this.vegeta.energy > 40){
						if(this.action == false){
							this.aiChoice3 = 10;
							this.action = true;
							this.vegeta.superSpeed = true;
							this.vegeta.fight = true;
						}
					} else if(this.aiChoice3 < .2){
						this.aiChoice3 = 10;
					}
					
					
					} else {
						
					//VEGETA BLOCKING -- FOCUS 17
					if(this.aiChoice3 < .55 && this.aiChoice3 > .15 && this.vegeta.fight == false && this.vegeta.taunting == false && this.vegeta.exhausted == false && this.vegeta.end == false && hardAttackHitTest(this.android17, this.vegeta) == true  && this.vegeta.gero == false){
						if(this.action == false){
							this.action = true;
							this.aiChoice3 = 10;
							this.vegeta.blocking = true;
							if(attackHitTest(this.android17, this.vegeta) == true && (this.android17.basic == true || this.android17.punching == true || this.android17.kicking == true) && this.android17.attacking == true){
								//this.vegeta.stamina += 1;
							}
							if(this.android17.attacking == false || hardAttackHitTest(this.android17, this.vegeta) != true){
								this.vegeta.blocking = false;
							}
						}
					}
						
					//VEGETA DEFENDING SUPER SPEED (TELEPORT)
					if(this.aiChoice3 < .15 && this.vegeta.blasting == false && this.vegeta.superSpeed == false && this.vegeta.end == false && this.vegeta.superSpeedExhaustion == false && this.vegeta.energy > 40){
						if(this.action == false){
							this.aiChoice3 = 10;
							this.action = true;
							this.vegeta.superSpeed = true;
							this.vegeta.fight = true;
						}
					} else if(this.aiChoice3 < .15){
						this.aiChoice3 = 10;
					}
					}
					
					
					
					}
					
					
					
					
					
					
					if(this.vegeta.focus17 == false){
					
					//VEGETA BASIC ATTACKS
					if((attackHitTest(this.vegeta,this.android18) == true || (app.main.vegeta.test == true && (app.main.android18.punching == true || app.main.android18.kicking == true) && app.main.android18.blasting == false)) && this.aiChoice2 < 11 && this.aiChoice2 > .3 && this.vegeta.blocking == false && this.android18.behind == false && this.vegeta.hit == false && this.vegeta.hardHit == false && this.vegeta.test == false){
						if(this.action == false){
							//this.chance2 = Math.random();
							//console.log("BASIC");
							if(this.vegeta.exhausted == false){
								this.vegeta.attacking = true;
								this.vegeta.fight = true;
								this.action = true;
							}
						}
					}
					//VEGETA HARD ATTACKS
					if((((hardAttackHitTest(this.vegeta,this.android18) == true && (this.vegeta.air == false || this.chance2 <= .5)) || (attackHitTest(this.vegeta,this.android18) == true && this.vegeta.air == true && this.chance2 > .5)) || (app.main.vegeta.test == true && (app.main.android18.punching == true || app.main.android18.kicking == true) && app.main.android18.blasting == false)) && this.aiChoice2 < .3 && this.aiChoice2 > .05 && this.vegeta.blocking == false && this.android18.behind == false){
						if(this.action == false){
							//this.chance2 = Math.random();
							if(this.vegeta.exhausted == false){
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
					if((hardAttackHitTest(this.vegeta,this.android17) == true || (app.main.vegeta.test == true && (app.main.android17.punching == true || app.main.android17.kicking == true) && app.main.android17.blasting == false)) && this.aiChoice2 < 11 && this.aiChoice2 > .5 && this.vegeta.blocking == false && this.vegeta.hit == false && this.vegeta.hardHit == false && this.android17.behind == false){
						if(this.action == false){
							//this.chance2 = Math.random();
							//console.log("BASIC");
							if(this.vegeta.exhausted == false){
								this.vegeta.attacking = true;
								this.vegeta.fight = true;
								this.action = true;
							}
						}
					}
					//VEGETA HARD ATTACKS -- FOCUS17
					if((((hardAttackHitTest(this.vegeta,this.android17) == true && (this.vegeta.air == false || this.chance2 <= .5)) || (attackHitTest(this.vegeta,this.android17) == true && this.vegeta.air == true && this.chance2 > .5)) || (app.main.vegeta.test == true && (app.main.android17.punching == true || app.main.android17.kicking == true) && app.main.android17.blasting == false)) && this.aiChoice2 < .5 && this.aiChoice2 > .05 && this.vegeta.blocking == false && this.android17.behind == false){
						if(this.action == false){
							//this.chance2 = Math.random();
							if(this.vegeta.exhausted == false){
								this.vegeta.attacking = true;
								this.vegeta.fight = true;
								this.vegeta.hard = true;
								this.vegeta.intensify = true;
								this.action = true;
							}
						}
					}
					}
					
					
					
					
					
					if((this.vegeta.position.y < this.android18.position.y + 100 && this.vegeta.position.y > this.android18.position.y - 100) || (this.vegeta.position.y < this.android18.position.y + 100 && this.vegeta.position.y > this.android18.position.y - 100 && this.vegeta.focus17 == true && this.android17.behind == false)){
					
					//VEGETA ENERGY BLASTS
					if((attackHitTest(this.vegeta,this.android18) != true && attackHitTest(this.vegeta,this.android17) != true) && this.aiChoice2 > .83 && this.aiChoice2 < .91 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.gero == false){
						if(this.action == false){
							this.action = true;
							if(this.vegeta.vegeta == true){
								this.vegeta.specChance = Math.random();
								if(this.vegeta.specChance > .75){
								if(this.android18.position.y < this.vegeta.position.y + 300 && this.android18.position.y > this.vegeta.position.y - 300){
								if(this.android18.position.x < this.vegeta.position.x + 300 && this.android18.position.x > this.vegeta.position.x - 300){
									this.vegeta.hits18 = true;
								}
								}
								if(this.android17.active == true){
								if(this.android17.position.y < this.vegeta.position.y + 300 && this.android17.position.y > this.vegeta.position.y - 300){
								if(this.android17.position.x < this.vegeta.position.x + 300 && this.android17.position.x > this.vegeta.position.x - 300){
									this.vegeta.hits17 = true;
								}
								}
								}
								if((this.vegeta.hits18 == true || this.vegeta.hits17 == true) && this.vegeta.specTimer > 50){
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
					if((attackHitTest(this.vegeta,this.android18) != true && attackHitTest(this.vegeta,this.android17) != true) && this.aiChoice2 > .9 && this.aiChoice2 < 1 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.gero == false && this.cooldownAI > 100){
						if(this.action == false && (this.vegeta.piccolo == false || this.vegeta.blastCount > 10)){
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
					
					if(this.vegeta.piccolo == true) {
					//VEGETA POWER ENERGY BLASTS
					if((attackHitTest(this.vegeta,this.android18) != true && attackHitTest(this.vegeta,this.android17) != true) && this.aiChoice2 > .9 && this.aiChoice2 < 1 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.gero == false && this.cooldownAI > 100){
						if(this.action == false){
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
					
					} else if((this.vegeta.position.y < this.android18.position.y + 100 && this.vegeta.position.y > this.android18.position.y - 100) || (this.vegeta.position.y < this.android18.position.y + 100 && this.vegeta.position.y > this.android18.position.y - 100 && this.vegeta.focus17 == false && this.android18.behind == false)){
					
					//VEGETA ENERGY BLASTS
					if((attackHitTest(this.vegeta,this.android18) != true && attackHitTest(this.vegeta,this.android17) != true) && this.aiChoice2 > .83 && this.aiChoice2 < .91 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.gero == false){
						if(this.action == false){
							this.action = true;
							if(this.vegeta.vegeta == true){
								this.vegeta.specChance = Math.random();
								if(this.vegeta.specChance > .65){
								if(this.android18.position.y < this.vegeta.position.y + 300 && this.android18.position.y > this.vegeta.position.y - 300){
								if(this.android18.position.x < this.vegeta.position.x + 300 && this.android18.position.x > this.vegeta.position.x - 300){
									this.vegeta.hits18 = true;
								}
								}
								if(this.android17.active == true){
								if(this.android17.position.y < this.vegeta.position.y + 300 && this.android17.position.y > this.vegeta.position.y - 300){
								if(this.android17.position.x < this.vegeta.position.x + 300 && this.android17.position.x > this.vegeta.position.x - 300){
									this.vegeta.hits17 = true;
								}
								}
								}
								if((this.vegeta.hits18 == true || this.vegeta.hits17 == true) && this.vegeta.specTimer > 50){
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
					if((attackHitTest(this.vegeta,this.android18) != true && attackHitTest(this.vegeta,this.android17) != true) && this.aiChoice2 > .90 && this.aiChoice2 < 1 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.gero == false && this.cooldownAI > 100){
						if(this.action == false && (this.vegeta.piccolo == false || this.vegeta.blastCount > 10)){
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
					
					if(this.vegeta.piccolo == true) {
					//VEGETA POWER ENERGY BLASTS
					if((attackHitTest(this.vegeta,this.android18) != true && attackHitTest(this.vegeta,this.android17) != true) && this.aiChoice2 > .95 && this.aiChoice2 < 1 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.gero == false && this.cooldownAI > 100){
						if(this.action == false){
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
					
					if(this.vegeta.piccolo == true) {
					//VEGETA POWER ENERGY BLASTS
					if((attackHitTest(this.vegeta,this.android18) != true && attackHitTest(this.vegeta,this.android17) != true) && this.aiChoice2 > .9 && this.aiChoice2 < 1 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.blastCount > 10 && this.vegeta.gero == false && this.cooldownAI > 100){
						if(this.action == false){
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
					if((attackHitTest(this.vegeta,this.android18) != true && attackHitTest(this.vegeta,this.android17) != true) && this.aiChoice2 > .7 && this.aiChoice2 < .91 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.gero == false){
						if(this.action == false){
							this.action = true;
							this.vegeta.specChance = Math.random();
							if(this.vegeta.specChance > .65){
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
					if(((this.aiChoice2 < .05 && (attackHitTest(this.vegeta,this.android18) == true || attackHitTest(this.vegeta,this.android17) == true)) || (this.aiChoice2 < .01 && attackHitTest(this.vegeta,this.android18) != true)) && (this.vegeta.fight == false || this.vegeta.blocking == true) && this.vegeta.superSpeed == false && this.vegeta.stun == false && this.vegeta.end == false && this.vegeta.superSpeedExhaustion == false && this.vegeta.energy > 33){
						if(this.action == false){
							this.action = true;
							this.vegeta.superSpeed = true;
							this.vegeta.fight = true;
						}
					} else if(this.aiChoice2 < .05){
						this.aiChoice2 = Math.random();
					}
					
					//VEGETA TAUNTING
					if(this.aiChoice2 < -1 && this.vegeta.fight == false && this.vegeta.taunting == false && this.vegeta.gero == false){
						if(this.action == false){
							this.action = true;
							this.vegeta.intensify = true;
							this.vegeta.taunting = true;
						}
					}
				}
				//VEGETA DEFENSIVE STATE --------------------------
				if(this.vegeta.defensive == true){
					this.aiChangeTimer++;
					//console.log("DEF -- CHANGE: " + this.aiChangeTimer);
					//console.log("DEF -- BREAK: " + this.vegeta.defBreak);
					
					if(this.vegeta.superSpeedExhaustion == true){
						this.vegeta.superSpeedExhaustion = false;
					}
					
					if(this.aiReason == 0){
						this.aiReason = 3;
					}
					
					if((this.vegeta.energy > 85 || hitTest(this.vegeta,this.android18)) && this.aiReason == 1){
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
					if((this.vegeta.stamina < 50 || hitTest(this.vegeta,this.android18)) && this.aiReason == 2){
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
					if((this.aiChoice1 > .90 || hitTest(this.vegeta,this.android18)) && this.aiReason == 3){
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
					if(this.vegeta.defBreak > 2){
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
					if(this.aiChangeTimer > 40){
						this.modeSwitch = 0;
						this.aiChangeTimer = 0;
						//this.aiReason = 0;
						this.aiTaunting = false;
						this.aiCharging = false;
						this.vegeta.defBreak = 0;
						this.vegeta.defensive = false;
						this.vegeta.aggressive = true;
					}
					
					if((hardAttackHitTest(this.vegeta,this.android18) != true && hardAttackHitTest(this.vegeta,this.android17) != true)){
						this.aiChoice1 = Math.random();
						this.aiChoice2 = Math.random();
					}
					
					
					//Escape Double Trouble
					if(hardAttackHitTest(this.android18,this.vegeta) ==  true && hardAttackHitTest(this.android17,this.vegeta) ==  true && this.android17.encounter == true && this.aiChoice3 > .9){
						/* if(this.vegeta.air == true && this.vegeta.position.y > this.vegeta.GROUND.y - 300){
							this.vegeta.hover = false;
							this.vegeta.flying = false;
						} else {
							this.vegeta.flying = true;
							this.vegeta.hover = false;
						} */
						if(this.vegeta.aboveBuilding == false){
							this.vegeta.teleUp = true;
							this.vegeta.superSpeed = true;
						} else {
							this.vegeta.teleDown = true;
							this.vegeta.superSpeed = true;
						}
					}
					
					
					//Escape Corner Camp
					if((hardAttackHitTest(this.android18,this.vegeta) ==  true || hardAttackHitTest(this.android17,this.vegeta) ==  true) && (this.vegeta.position.x < this.vegeta.LEFTWALL + 50 || this.vegeta.position.x > this.vegeta.RIGHTWALL - 50)  && this.aiChoice3 > .7){
						/* if(this.vegeta.air == true && this.vegeta.position.y > this.vegeta.GROUND.y - 300){
							this.vegeta.hover = false;
							this.vegeta.flying = false;
						} else {
							this.vegeta.flying = true;
							this.vegeta.hover = false;
						} */
						if(this.vegeta.aboveBuilding == false){
							this.vegeta.teleUp = true;
							this.vegeta.superSpeed = true;
						} else {
							this.vegeta.teleDown = true;
							this.vegeta.superSpeed = true;
						}
					}
					
					
					if(this.aiReason != 3){
						
					if(this.vegeta.focus17 == false) {
					
					if(this.vegeta.powerMove == false && this.scene == false){
					if((this.android18.position.x < this.vegeta.position.x - (350 + Math.round(getRandom(-50,50))) || this.android18.position.x > this.vegeta.position.x + (350 + Math.round(getRandom(-50,50)))) && this.vegeta.dodge == false){
						if(this.aiReason == 1){
							if(this.vegeta.energy < 100 && this.vegeta.stun == false){
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
						if(this.aiReason == 2){
							if(this.vegeta.stamina > 50 && this.vegeta.stun == false){
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
						if(this.vegeta.position.x <= this.vegeta.LEFTWALL.x + 10 || this.vegeta.position.x >= this.vegeta.RIGHTWALL.x - 10 && this.vegeta.energy > 33 && this.aiChoice1 > .4 && this.vegeta.superSpeed == false){
							if(this.action == false){
								this.action = true;
								app.main.aiChoice3 = 10;
								this.vegeta.superSpeed = true;
								this.vegeta.fight = true;
								if(this.aiReason == 2){
									this.aiTaunting = true;
								} else if (this.aiReason == 1){
									this.aiCharging = true;
								}
							}
						}
						this.aiTaunting = false;
						this.aiCharging = false;
					}
					
					//VEGETA FLIGHT
					if(((this.vegeta.powerMove == false && this.vegeta.blasting == false) || this.vegeta.vegeta == true) && this.scene == false){
					if((this.android18.position.y + 10 >= this.vegeta.position.y && this.android18.position.y - 300 < this.vegeta.position.y) && this.vegeta.taunting == false && this.vegeta.charging == false && this.vegeta.hard == false && this.vegeta.dodge == false && this.vegeta.hardHit == false && this.vegeta.stun == false && this.vegeta.aboveSky == false && this.aiReason != 3){
						//console.log("NOT NOT NOT REASON 3");
						if(this.vegeta.attacking == false && this.vegeta.taunting == false && this.vegeta.charging == false && this.vegeta.blasting == false && this.vegeta.blocking == false){
							this.vegeta.up = true;
						}
						this.vegeta.flying = true;
						this.vegeta.jump();
					} else {
						this.vegeta.hover = false;
						this.vegeta.flying = false;
						this.vegeta.up = false;
						if((this.android18.position.y - 50 > this.vegeta.position.y)){
							this.vegeta.aboveBuilding = false;
							//this.vegeta.air = true;
						}
						//this.vegeta.down = true;
					}
					}
					}
					} else {
						//FOCUS17 version
						
						if(this.vegeta.powerMove == false && this.scene == false){
						if((this.android17.position.x < this.vegeta.position.x - (350 + Math.round(getRandom(-50,50))) || this.android17.position.x > this.vegeta.position.x + (350 + Math.round(getRandom(-50,50)))) && this.vegeta.dodge == false){
						if(this.aiReason == 1){
							if(this.vegeta.energy < 100 && this.vegeta.stun == false){
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
						if(this.aiReason == 2){
							if(this.vegeta.stamina > 50 && this.vegeta.stun == false){
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
						if(this.vegeta.position.x <= this.vegeta.LEFTWALL.x + 10 || this.vegeta.position.x >= this.vegeta.RIGHTWALL.x - 10 && this.vegeta.energy > 33 && this.aiChoice1 > .4  && this.vegeta.superSpeed == false){
							if(this.action == false){
								this.action = true;
								app.main.aiChoice3 = 10;
								this.vegeta.superSpeed = true;
								this.vegeta.fight = true;
								if(this.aiReason == 2){
									this.aiTaunting = true;
								} else if (this.aiReason == 1){
									this.aiCharging = true;
								}
							}
						}
						this.aiTaunting = false;
						this.aiCharging = false;
					}
					
					//VEGETA FLIGHT -- FOCUS17
					if(((this.vegeta.powerMove == false && this.vegeta.blasting == false) || this.vegeta.vegeta == true) && this.scene == false){
					if((this.android17.position.y + 10 >= this.vegeta.position.y && this.android17.position.y - 300 < this.vegeta.position.y) && this.vegeta.taunting == false && this.vegeta.charging == false && this.vegeta.hard == false && this.vegeta.dodge == false && this.vegeta.hardHit == false && this.vegeta.stun == false && this.vegeta.aboveSky == false && this.aiReason != 3){
						//console.log("NOT NOT NOT REASON 3");
						if(this.vegeta.attacking == false && this.vegeta.taunting == false && this.vegeta.charging == false && this.vegeta.blasting == false && this.vegeta.blocking == false){
							this.vegeta.up = true;
						}
						this.vegeta.flying = true;
						this.vegeta.jump();
					} else {
						this.vegeta.hover = false;
						this.vegeta.flying = false;
						this.vegeta.up = false;
						if((this.android17.position.y - 50 > this.vegeta.position.y)){
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
					if(this.vegeta.hard == false && this.vegeta.powerMove == false && this.vegeta.taunting == false && (this.vegeta.vegeta == false || this.vegeta.specMove == false) && this.vegeta.charging == false){
						if(this.vegeta.right == true && this.vegeta.position.x > this.vegeta.LEFTWALL.x){
							this.vegeta.moveLeft();
						} else if(this.vegeta.left == true && this.vegeta.position.x < this.vegeta.RIGHTWALL.x){
							this.vegeta.moveRight();
						}
					}
					
					
					//VEGETA TAUNTING
					if(this.aiTaunting == true && this.vegeta.fight == false && this.vegeta.taunting == false){
						if(this.action == false){
							//this.aiTaunting = false;
							this.action = true;
							this.vegeta.flying = false;
							this.vegeta.decel.x = 0;
							this.vegeta.intensify = true;
							this.vegeta.taunting = true;
						}
					}
					//VEGETA CHARGING
					if(this.aiCharging == true && this.vegeta.fight == false && this.vegeta.charging == false){
						if(this.action == false){
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
					
					
					
					
					
					if(this.vegeta.focus17 == false) {
					
					if(this.aiReason == 3){
					if(this.vegeta.powerMove == false && this.scene == false){
					//VEGETA FLIGHT -- Normal
					if((this.android18.position.y <= this.vegeta.position.y) && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.dodge == false && this.vegeta.hardHit == false && this.vegeta.stun == false && this.vegeta.end == false && this.vegeta.position.y > this.vegeta.SKYTOP.y + 6){
						//console.log("REASON 3");
						if(this.vegeta.attacking == false && this.vegeta.taunting == false && this.vegeta.charging == false && this.vegeta.blasting == false && this.vegeta.blocking == false){
							this.vegeta.up = true;
						}
						this.vegeta.flying = true;
						this.vegeta.jump();
					} else {
						this.vegeta.hover = false;
						this.vegeta.flying = false;
						this.vegeta.up = false;
						if((this.android18.position.y - 50 > this.vegeta.position.y)){
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
					
					
					if(this.vegeta.vegeta == true){
						console.log("working");
					//VEGETA BLOCKING -- FOCUS 17
					if(this.aiChoice3 < .5 && this.aiChoice3 > .3 && this.vegeta.fight == false && this.vegeta.taunting == false && this.vegeta.exhausted == false && this.vegeta.end == false && hardAttackHitTest(this.android17, this.vegeta) == true  && this.vegeta.gero == false){
						if(this.action == false){
							this.action = true;
							this.aiChoice3 = 10;
							this.vegeta.blocking = true;
							if(attackHitTest(this.android17, this.vegeta) == true && (this.android17.basic == true || this.android17.punching == true || this.android17.kicking == true) && this.android17.attacking == true){
								//this.vegeta.stamina += 1;
							}
							if(this.android17.attacking == false || hardAttackHitTest(this.android17, this.vegeta) != true){
								this.vegeta.blocking = false;
							}
						}
					}
						
					//VEGETA DEFENDING SUPER SPEED (TELEPORT)
					if(this.aiChoice3 < .3 && this.aiChoice3 > .2 && this.vegeta.blasting == false && this.vegeta.superSpeed == false && this.vegeta.end == false && this.vegeta.superSpeedExhaustion == false && this.vegeta.energy > 40){
						if(this.action == false){
							if(this.vegeta.vegeta == true){
								this.vegeta.specChance = Math.random();
								if(this.vegeta.specChance > -1){
								if(this.android18.position.y < this.vegeta.position.y + 300 && this.android18.position.y > this.vegeta.position.y - 300){
								if(this.android18.position.x < this.vegeta.position.x + 300 && this.android18.position.x > this.vegeta.position.x - 300){
									this.vegeta.hits18 = true;
								}
								}
								if(this.android17.active == true){
								if(this.android17.position.y < this.vegeta.position.y + 300 && this.android17.position.y > this.vegeta.position.y - 300){
								if(this.android17.position.x < this.vegeta.position.x + 300 && this.android17.position.x > this.vegeta.position.x - 300){
									this.vegeta.hits17 = true;
								}
								}
								}
								if((this.vegeta.hits18 == true || this.vegeta.hits17 == true) && this.vegeta.specTimer > 50){
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
					if(this.aiChoice3 < .2 && this.vegeta.blasting == false && this.vegeta.superSpeed == false && this.vegeta.end == false && this.vegeta.superSpeedExhaustion == false && this.vegeta.energy > 40){
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
					} else if(this.aiChoice3 < .2){
						this.aiChoice3 = 10;
					}
					
					
					} else {
						
					//VEGETA BLOCKING
					if(this.aiChoice3 < .5 && this.aiChoice3 > .15 && this.vegeta.fight == false && this.vegeta.taunting == false && this.vegeta.exhausted == false && this.vegeta.end == false && hardAttackHitTest(this.android17, this.vegeta) == true  && this.vegeta.gero == false){
						if(this.action == false){
							this.action = true;
							this.aiChoice3 = 10;
							this.vegeta.blocking = true;
							if(attackHitTest(this.android17, this.vegeta) == true && (this.android17.basic == true || this.android17.punching == true || this.android17.kicking == true) && this.android17.attacking == true){
								//this.vegeta.stamina += 1;
							}
							if(this.android17.attacking == false || hardAttackHitTest(this.android17, this.vegeta) != true){
								this.vegeta.blocking = false;
							}
						}
					}
						
					//VEGETA DEFENDING SUPER SPEED (TELEPORT)
					if(this.aiChoice3 < .15 && this.vegeta.blasting == false && this.vegeta.superSpeed == false && this.vegeta.end == false && this.vegeta.superSpeedExhaustion == false && this.vegeta.energy > 40){
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
					}
					}
				
					
					//VEGETA HARD ATTACKS
					if((((hardAttackHitTest(this.vegeta,this.android18) == true && (this.vegeta.air == false || this.chance2 <= .5)) || (attackHitTest(this.vegeta,this.android18) == true && this.vegeta.air == true && this.chance2 > .5)) || (app.main.vegeta.test == true && (app.main.android18.punching == true || app.main.android18.kicking == true) && app.main.android18.blasting == false)) && this.aiChoice2 < .3 && this.aiChoice2 > 0 && this.vegeta.blocking == false && this.android18.behind == false){
						if(this.action == false){
							//this.chance2 = Math.random();
							if(this.vegeta.exhausted == false){
								this.vegeta.attacking = true;
								this.vegeta.fight = true;
								this.vegeta.hard = true;
								this.vegeta.intensify = true;
								this.action = true;
							}
						}
					}
					
					//VEGETA BASIC ATTACKS
					if((attackHitTest(this.vegeta,this.android18) == true || (app.main.vegeta.test == true && (app.main.android18.punching == true || app.main.android18.kicking == true) && app.main.android18.blasting == false)) && this.aiChoice2 < 11 && this.aiChoice2 > .3 && this.vegeta.blocking == false && this.vegeta.hit == false && this.vegeta.hardHit == false && this.android18.behind == false){
						if(this.action == false){
							//this.chance2 = Math.random();
							//console.log("BASIC");
							if(this.vegeta.exhausted == false){
								this.vegeta.attacking = true;
								this.vegeta.fight = true;
								this.action = true;
							}
						}
					}
					
					if(this.vegeta.powerMove == false && this.scene == false){
					if(this.dodgeChance > .4){
					
					//VEGETA FLIGHT DODGE

					if((((this.android18.blasting == true && this.android18.counter > 0 && this.android18.position.y - 100 < this.vegeta.position.y )) || ((this.android17.blasting == true && this.android17.counter > 0 && this.android17.position.y - 100 < this.vegeta.position.y ))) && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.stun == false  && this.vegeta.aboveSky == false && this.vegeta.blasting == false && this.vegeta.end == false){
						this.vegeta.dodge = true;
						this.vegeta.flying = true;
						this.vegeta.jump();
					} else if((((this.android18.blasting == true && this.android18.counter > 0 && this.android18.position.y + 100 > this.vegeta.position.y )) || ((this.android17.blasting == true && this.android17.counter > 0 && this.android17.position.y + 100 > this.vegeta.position.y ))) && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.stun == false && this.vegeta.aboveSky == true && this.vegeta.end == false){
						this.vegeta.hover = false;
						this.vegeta.dodge = true;
						this.vegeta.flying = false;
						this.vegeta.up = false;
						//this.vegeta.down = true;
					} else {
						this.vegeta.dodge = false;
					}
					
			
					
					} else if(this.dodgeChance < .4 && this.dodgeChance > .2 && this.vegeta.superSpeed == false){
						if((this.android18.blasting == true || this.android17.blasting == true) && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.stun == false && this.vegeta.dodge == false && this.vegeta.energy > 33){
						this.dodgeChance = 0;
						this.vegeta.dodge = true;
						this.vegeta.superSpeed = true;
					} 
					}
					}
					} else {
					// 17 Version
					if(this.vegeta.powerMove == false && this.scene == false){
					if(this.aiReason == 3){
					//VEGETA FLIGHT -- Normal -- FOCUS17
					if((this.android17.position.y <= this.vegeta.position.y) && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.dodge == false && this.vegeta.hardHit == false && this.vegeta.stun == false && this.vegeta.end == false && this.vegeta.position.y > this.vegeta.SKYTOP.y + 6){
						//console.log("REASON 3");
						if(this.vegeta.attacking == false && this.vegeta.taunting == false && this.vegeta.charging == false && this.vegeta.blasting == false && this.vegeta.blocking == false){
							this.vegeta.up = true;
						}
						this.vegeta.flying = true;
						this.vegeta.jump();
					} else {
						this.vegeta.hover = false;
						this.vegeta.flying = false;
						if((this.android17.position.y - 50 > this.vegeta.position.y)){
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
					
					if(this.vegeta.vegeta == true){
						console.log("working");
					//VEGETA BLOCKING -- FOCUS 17
					if(this.aiChoice3 < .6 && this.aiChoice3 > .3 && this.vegeta.fight == false && this.vegeta.taunting == false && this.vegeta.exhausted == false && this.vegeta.end == false && hardAttackHitTest(this.android17, this.vegeta) == true  && this.vegeta.gero == false){
						if(this.action == false){
							this.action = true;
							this.aiChoice3 = 10;
							this.vegeta.blocking = true;
							if(attackHitTest(this.android17, this.vegeta) == true && (this.android17.basic == true || this.android17.punching == true || this.android17.kicking == true) && this.android17.attacking == true){
								//this.vegeta.stamina += 1;
							}
							if(this.android17.attacking == false || hardAttackHitTest(this.android17, this.vegeta) != true){
								this.vegeta.blocking = false;
							}
						}
					}
						
					//VEGETA DEFENDING SUPER SPEED (TELEPORT)
					if(this.aiChoice3 < .3 && this.aiChoice3 > .2 && this.vegeta.blasting == false && this.vegeta.superSpeed == false && this.vegeta.end == false && this.vegeta.superSpeedExhaustion == false && this.vegeta.energy > 40){
						if(this.action == false){
							if(this.vegeta.vegeta == true){
								this.vegeta.specChance = Math.random();
								if(this.vegeta.specChance > -1){
								if(this.android18.position.y < this.vegeta.position.y + 300 && this.android18.position.y > this.vegeta.position.y - 300){
								if(this.android18.position.x < this.vegeta.position.x + 300 && this.android18.position.x > this.vegeta.position.x - 300){
									this.vegeta.hits18 = true;
								}
								}
								if(this.android17.active == true){
								if(this.android17.position.y < this.vegeta.position.y + 300 && this.android17.position.y > this.vegeta.position.y - 300){
								if(this.android17.position.x < this.vegeta.position.x + 300 && this.android17.position.x > this.vegeta.position.x - 300){
									this.vegeta.hits17 = true;
								}
								}
								}
								if((this.vegeta.hits18 == true || this.vegeta.hits17 == true) && this.vegeta.specTimer > 50){
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
					if(this.aiChoice3 < .2 && this.vegeta.blasting == false && this.vegeta.superSpeed == false && this.vegeta.end == false && this.vegeta.superSpeedExhaustion == false && this.vegeta.energy > 40){
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
					} else if(this.aiChoice3 < .2){
						this.aiChoice3 = 10;
					}
					
					
					} else {
						
					//VEGETA BLOCKING -- FOCUS 17
					if(this.aiChoice3 < .6 && this.aiChoice3 > .15 && this.vegeta.fight == false && this.vegeta.taunting == false && this.vegeta.exhausted == false && this.vegeta.end == false && hardAttackHitTest(this.android17, this.vegeta) == true  && this.vegeta.gero == false){
						if(this.action == false){
							this.action = true;
							this.aiChoice3 = 10;
							this.vegeta.blocking = true;
							if(attackHitTest(this.android17, this.vegeta) == true && (this.android17.basic == true || this.android17.punching == true || this.android17.kicking == true) && this.android17.attacking == true){
								//this.vegeta.stamina += 1;
							}
							if(this.android17.attacking == false || hardAttackHitTest(this.android17, this.vegeta) != true){
								this.vegeta.blocking = false;
							}
						}
					}
						
					//VEGETA DEFENDING SUPER SPEED (TELEPORT)
					if(this.aiChoice3 < .15 && this.vegeta.blasting == false && this.vegeta.superSpeed == false && this.vegeta.end == false && this.vegeta.superSpeedExhaustion == false && this.vegeta.energy > 40){
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
					}
					}
					
					if(this.vegeta.powerMove == false && this.scene == false){
					if(this.dodgeChance > .4){
					
					//VEGETA FLIGHT DODGE
					if(this.vegeta.powerMove == false){
					if((((this.android17.blasting == true && this.android17.counter > 0 && this.android17.position.y - 100 < this.vegeta.position.y )) || ((this.android17.blasting == true && this.android17.counter > 0 && this.android17.position.y - 100 < this.vegeta.position.y ))) && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.stun == false  && this.vegeta.aboveSky == false && this.vegeta.blasting == false && this.vegeta.end == false){
						this.vegeta.dodge = true;
						this.vegeta.flying = true;
						this.vegeta.jump();
					} else if((((this.android17.blasting == true && this.android17.counter > 0 && this.android17.position.y + 100 > this.vegeta.position.y )) || ((this.android17.blasting == true && this.android17.counter > 0 && this.android17.position.y + 100 > this.vegeta.position.y ))) && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.stun == false && this.vegeta.aboveSky == true && this.vegeta.end == false){
						this.vegeta.hover = false;
						this.vegeta.dodge = true;
						this.vegeta.flying = false;
						this.vegeta.up = false;
						//this.vegeta.down = true;
					} else {
						this.vegeta.dodge = false;
					}
					}
			
					
					} else if(this.dodgeChance < .4 && this.dodgeChance > .2 && this.vegeta.superSpeed == false){
						if((this.android17.blasting == true || this.android17.blasting == true) && this.vegeta.hard == false && this.vegeta.charging == false && this.vegeta.taunting == false && this.vegeta.stun == false && this.vegeta.dodge == false && this.vegeta.energy > 33){
						this.dodgeChance = 0;
						this.vegeta.dodge = true;
						this.vegeta.superSpeed = true;
					} 
					}	
					}
					
					//VEGETA BASIC ATTACKS -- FOCUS17
					if((hardAttackHitTest(this.vegeta,this.android17) == true || (app.main.vegeta.test == true && (app.main.android17.punching == true || app.main.android17.kicking == true) && app.main.android17.blasting == false)) && this.aiChoice2 < 11 && this.aiChoice2 > .45 && this.vegeta.blocking == false && this.vegeta.hit == false && this.vegeta.hardHit == false && this.android17.behind == false){
						if(this.action == false){
							//this.chance2 = Math.random();
							//console.log("BASIC");
							if(this.vegeta.exhausted == false){
								this.vegeta.attacking = true;
								this.vegeta.fight = true;
								this.action = true;
							}
						}
					}
				
					//VEGETA HARD ATTACKS -- FOCUS17
					if((((hardAttackHitTest(this.vegeta,this.android18) == true && (this.vegeta.air == false || this.chance2 <= .5)) || (attackHitTest(this.vegeta,this.android18) == true && this.vegeta.air == true && this.chance2 > .5)) || (app.main.vegeta.test == true && (app.main.android17.punching == true || app.main.android17.kicking == true) && app.main.android17.blasting == false)) && this.aiChoice2 < .45 && this.aiChoice2 > 0 && this.vegeta.blocking == false && this.android17.behind == false){
						if(this.action == false){
							//this.chance2 = Math.random();
							if(this.vegeta.exhausted == false){
								this.vegeta.attacking = true;
								this.vegeta.fight = true;
								this.vegeta.hard = true;
								this.vegeta.intensify = true;
								this.action = true;
							}
						}
					}
					}
					
					
					if((this.vegeta.position.y < this.android18.position.y + 100 && this.vegeta.position.y > this.android18.position.y - 100) || (this.vegeta.position.y < this.android18.position.y + 100 && this.vegeta.position.y > this.android18.position.y - 100 && this.vegeta.focus17 == true && this.android17.behind == false)){
					
					//VEGETA ENERGY BLASTS
					if((attackHitTest(this.vegeta,this.android18) != true && attackHitTest(this.vegeta,this.android17) != true) && this.aiChoice2 > .83 && this.aiChoice2 < .91 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.gero == false){
						if(this.action == false){
							this.action = true;
							if(this.vegeta.vegeta == true){
								this.vegeta.specChance = Math.random();
								if(this.vegeta.specChance > .65){
								if(this.android18.position.y < this.vegeta.position.y + 300 && this.android18.position.y > this.vegeta.position.y - 300){
								if(this.android18.position.x < this.vegeta.position.x + 300 && this.android18.position.x > this.vegeta.position.x - 300){
									this.vegeta.hits18 = true;
								}
								}
								if(this.android17.active == true){
								if(this.android17.position.y < this.vegeta.position.y + 300 && this.android17.position.y > this.vegeta.position.y - 300){
								if(this.android17.position.x < this.vegeta.position.x + 300 && this.android17.position.x > this.vegeta.position.x - 300){
									this.vegeta.hits17 = true;
								}
								}
								}
								if((this.vegeta.hits18 == true || this.vegeta.hits17 == true) && this.vegeta.specTimer > 50){
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
					if((attackHitTest(this.vegeta,this.android18) != true && attackHitTest(this.vegeta,this.android17) != true) && this.aiChoice2 > .9 && this.aiChoice2 < 1 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.gero == false && this.cooldownAI > 100){
						if(this.action == false && (this.vegeta.piccolo == false || this.vegeta.blastCount > 10)){
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
					
					if(this.vegeta.piccolo == true) {
					//VEGETA POWER ENERGY BLASTS
					if((attackHitTest(this.vegeta,this.android18) != true && attackHitTest(this.vegeta,this.android17) != true) && this.aiChoice2 > .95 && this.aiChoice2 < 1 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.gero == false && this.cooldownAI > 100){
						if(this.action == false){
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
					
					} else if((this.vegeta.position.y < this.android18.position.y + 100 && this.vegeta.position.y > this.android18.position.y - 100) || (this.vegeta.position.y < this.android18.position.y + 100 && this.vegeta.position.y > this.android18.position.y - 100 && this.vegeta.focus17 == false && this.android18.behind == false)){
					
					//VEGETA ENERGY BLASTS
					if((attackHitTest(this.vegeta,this.android18) != true && attackHitTest(this.vegeta,this.android17) != true) && this.aiChoice2 > .83 && this.aiChoice2 < .91 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.gero == false){
						if(this.action == false){
							this.action = true;
							if(this.vegeta.vegeta == true){
								this.vegeta.specChance = Math.random();
								if(this.vegeta.specChance > .65){
								if(this.android18.position.y < this.vegeta.position.y + 300 && this.android18.position.y > this.vegeta.position.y - 300){
								if(this.android18.position.x < this.vegeta.position.x + 300 && this.android18.position.x > this.vegeta.position.x - 300){
									this.vegeta.hits18 = true;
								}
								}
								if(this.android17.active == true){	
								if(this.android17.position.y < this.vegeta.position.y + 300 && this.android17.position.y > this.vegeta.position.y - 300){
								if(this.android17.position.x < this.vegeta.position.x + 300 && this.android17.position.x > this.vegeta.position.x - 300){
									this.vegeta.hits17 = true;
								}
								}
								}
								if((this.vegeta.hits18 == true || this.vegeta.hits17 == true) && this.vegeta.specTimer > 50){
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
					if((attackHitTest(this.vegeta,this.android18) != true && attackHitTest(this.vegeta,this.android17) != true) && this.aiChoice2 > .9 && this.aiChoice2 < 1 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.gero == false && this.cooldownAI > 100){
						if(this.action == false && (this.vegeta.piccolo == false || this.vegeta.blastCount > 10)){
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
					
					if(this.vegeta.piccolo == true) {
					//VEGETA POWER ENERGY BLASTS
					if((attackHitTest(this.vegeta,this.android18) != true && attackHitTest(this.vegeta,this.android17) != true) && this.aiChoice2 > .95 && this.aiChoice2 < 1 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.gero == false && this.cooldownAI > 100){
						if(this.action == false){
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
					
					
					if(this.vegeta.piccolo == true){
					//VEGETA POWER ENERGY BLASTS
					if((attackHitTest(this.vegeta,this.android18) != true && attackHitTest(this.vegeta,this.android17) != true) && this.aiChoice2 > .9 && this.aiChoice2 < 1 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.blastCount > 10 && this.vegeta.gero == false && this.cooldownAI > 100){
						if(this.action == false){
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
					if((attackHitTest(this.vegeta,this.android18) != true && attackHitTest(this.vegeta,this.android17) != true) && this.aiChoice2 > .65 && this.aiChoice2 < .91 && this.vegeta.blasting == false && this.vegeta.fight == false && this.vegeta.energy > 30 && this.vegeta.taunting == false && this.vegeta.gero == false){
						if(this.action == false){
							this.action = true;
							this.vegeta.specChance = Math.random();
							if(this.vegeta.specChance > .65){
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
			if(this.activeSupport == true){
			for(var x = 0; x < 2; x++){
			// ------SUPPORT AI CONTROL------ 
			if(this.support[x].stun == false && this.support[x].end == false){
				if((hardAttackHitTest(this.android18, this.support[x]) == true && (this.android18.punching == true || this.android18.kicking == true))){
					this.aiChoiceSupport2 = (Math.random());
				} else if((attackHitTest(this.android18, this.support[x]) == true && this.android18.basic == true)){
					this.aiChoiceSupport2 = (Math.random());
				}
				
				if((hardAttackHitTest(this.android17, this.support[x]) == true && (this.android17.punching == true || this.android17.kicking == true))){
					this.aiChoiceSupport2 = (Math.random());
				} else if((attackHitTest(this.android17, this.support[x]) == true && this.android17.basic == true)){
					this.aiChoiceSupport2 = (Math.random());
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
				if(this.support[x].aggressive == true){
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
					if((hardAttackHitTest(this.support[x],this.android18) != true && hardAttackHitTest(this.support[x],this.android17) != true) && app.main.support[x].test == false){
						//this.aiChoice1 = Math.random();
						this.aiChoiceSupport1 = Math.random();
					}
					
					if((hardAttackHitTest(this.support[x],this.android18) == true || hitTest(this.support[x],this.android18) == true || hardAttackHitTest(this.support[x],this.android17) == true || hitTest(this.support[x],this.android17) == true) && this.support[x].blasting == false && app.main.support[x].test == false){
						this.support[x].superSpeed = true;
						this.support[x].fight = true;
					}
					
					
					if(this.vegeta.focus17 == false){ //IF FOCUSING 17 == FALSE
						
					//VEGETA MOVEMENT
					if((this.support[x].position.x > this.support[x].LEFTWALL.x + 10 && this.support[x].position.x < this.support[x].RIGHTWALL.x - 10) && this.support[x].powerMove == false && this.support[x].hard == false && this.support[x].charging == false && this.support[x].taunting == false && app.main.support[x].test == false){
						if(this.support[x].right == true){
							this.support[x].moveLeft();
						} else if(this.support[x].left == true){
							this.support[x].moveRight();
						}
					}
					
					
					
					//VEGETA FLIGHT
					if(this.support[x].tien == true && this.support[x].blasting == false){
					if(this.support[x].hard == false && this.support[x].charging == false && this.support[x].taunting == false && this.support[x].dodge == false && this.support[x].hardHit == false && this.support[x].stun == false && this.support[x].end == false && this.support[x].aboveSky == false){
						if(this.support[x].attacking == false && this.support[x].taunting == false && this.support[x].charging == false && this.support[x].blasting == false && this.support[x].blocking == false){
							this.support[x].up = true;
						}
						this.support[x].flying = true;
						this.support[x].jump();
					} else {
						this.support[x].hover = false;
						this.support[x].flying = false;
						this.support[x].up = false;
						if((this.android18.position.y - 50 > this.support[x].position.y)){
							this.support[x].aboveBuilding = false;
							//this.support[x].air = true;
						}
						//this.support[x].down = true;
					}
					}
					if(this.support[x].krillin == true && this.support[x].blasting == true){
					if((this.android18.position.y < this.support[x].position.y) && this.support[x].hard == false && this.support[x].charging == false && this.support[x].taunting == false && this.support[x].dodge == false && this.support[x].hardHit == false && this.support[x].stun == false && this.support[x].end == false && this.support[x].position.y > (this.support[x].GROUND.y - 100)){
						if(this.support[x].attacking == false && this.support[x].taunting == false && this.support[x].charging == false && this.support[x].blasting == false && this.support[x].blocking == false){
							this.support[x].up = true;
						}
						this.support[x].flying = true;
						this.support[x].jump();
					} else {
						this.support[x].hover = false;
						this.support[x].flying = false;
						this.support[x].up = false;
						if((this.android18.position.y - 50 > this.support[x].position.y)){
							this.support[x].aboveBuilding = false;
							//this.support[x].air = true;
						}
						//this.support[x].down = true;
					}
					}
					if(this.support[x].tien == true && this.support[x].blasting == true){
					if((this.android18.position.y < this.support[x].position.y) && this.support[x].hard == false && this.support[x].charging == false && this.support[x].taunting == false && this.support[x].dodge == false && this.support[x].hardHit == false && this.support[x].stun == false && this.support[x].end == false && this.support[x].position.y < (this.support[x].GROUND.y + 100)){
						if(this.support[x].attacking == false && this.support[x].taunting == false && this.support[x].charging == false && this.support[x].blasting == false && this.support[x].blocking == false){
							this.support[x].up = true;
						}
						this.support[x].flying = true;
						this.support[x].jump();
					} else {
						this.support[x].hover = false;
						this.support[x].flying = false;
						this.support[x].up = false;
						if((this.android18.position.y - 50 > this.support[x].position.y)){
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
					
					} else { //IF FOCUSING 17 == TRUE
						
					//VEGETA FLIGHT -- FOCUS 17
					if(this.support[x].tien == true && this.support[x].blasting == false){
					if(this.support[x].hard == false && this.support[x].charging == false && this.support[x].taunting == false && this.support[x].dodge == false && this.support[x].hardHit == false && this.support[x].stun == false && this.support[x].end == false && this.support[x].aboveSky == false){
						if(this.support[x].attacking == false && this.support[x].taunting == false && this.support[x].charging == false && this.support[x].blasting == false && this.support[x].blocking == false){
							this.support[x].up = true;
						}
						this.support[x].flying = true;
						this.support[x].jump();
					} else {
						this.support[x].hover = false;
						this.support[x].flying = false;
						this.support[x].up = false;
						if((this.android17.position.y - 50 > this.support[x].position.y)){
							this.support[x].aboveBuilding = false;
							//this.support[x].air = true;
						}
						//this.support[x].down = true;
					}
					}
					if(this.support[x].krillin == true && this.support[x].blasting == true){
					if((this.android17.position.y < this.support[x].position.y) && this.support[x].hard == false && this.support[x].charging == false && this.support[x].taunting == false && this.support[x].dodge == false && this.support[x].hardHit == false && this.support[x].stun == false && this.support[x].end == false && this.support[x].position.y > (this.support[x].GROUND.y - 100)){
						if(this.support[x].attacking == false && this.support[x].taunting == false && this.support[x].charging == false && this.support[x].blasting == false && this.support[x].blocking == false){
							this.support[x].up = true;
						}
						this.support[x].flying = true;
						this.support[x].jump();
					} else {
						this.support[x].hover = false;
						this.support[x].flying = false;
						this.support[x].up = false;
						if((this.android17.position.y - 50 > this.support[x].position.y)){
							this.support[x].aboveBuilding = false;
							//this.support[x].air = true;
						}
						//this.support[x].down = true;
					}
					}
					if(this.support[x].tien == true && this.support[x].blasting == true){
					if((this.android17.position.y < this.support[x].position.y) && this.support[x].hard == false && this.support[x].charging == false && this.support[x].taunting == false && this.support[x].dodge == false && this.support[x].hardHit == false && this.support[x].stun == false && this.support[x].end == false && this.support[x].position.y < (this.support[x].GROUND.y + 100)){
						if(this.support[x].attacking == false && this.support[x].taunting == false && this.support[x].charging == false && this.support[x].blasting == false && this.support[x].blocking == false){
							this.support[x].up = true;
						}
						this.support[x].flying = true;
						this.support[x].jump();
					} else {
						this.support[x].hover = false;
						this.support[x].flying = false;
						this.support[x].up = false;
						if((this.android17.position.y - 50 > this.support[x].position.y)){
							this.support[x].aboveBuilding = false;
							//this.support[x].air = true;
						}
						//this.support[x].down = true;
					}
					}
					
					//VEGETA MOVEMENT -- FOCUS 17
					if((this.support[x].position.x > this.support[x].LEFTWALL.x - 10 && this.support[x].position.x < this.support[x].RIGHTWALL.x + 10) && this.support[x].powerMove == false && this.support[x].hard == false && this.support[x].charging == false && this.support[x].taunting == false && app.main.support[x].test == false){
						if(this.support[x].right == true){
							this.support[x].moveLeft();
						} else if(this.support[x].left == true){
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
					if(this.aiChoiceSupport2 < .15 && this.support[x].superSpeed == false && this.support[x].end == false && this.support[x].superSpeedExhaustion == false && this.support[x].energy > 40){
						if(this.action == false){
							this.aiChoiceSupport2 = 10;
							this.action = true;
							this.support[x].superSpeed = true;
							this.support[x].fight = true;
						}
					} else if(this.aiChoiceSupport2 < .15){
						this.aiChoiceSupport2 = 10;
					}
					
					
					
					if((this.support[x].position.y < this.android18.position.y + 100 && this.support[x].position.y > this.android18.position.y - 100) || (this.support[x].position.y < this.android18.position.y + 100 && this.support[x].position.y > this.android18.position.y - 100 && this.support[x].tien == true && this.support[x].focus17 == true)){
					
					//VEGETA POWER ENERGY BLASTS
					if((attackHitTest(this.support[x],this.android18) != true && attackHitTest(this.support[x],this.android17) != true) && this.aiChoiceSupport1 > .95 && this.aiChoiceSupport1 < 1 && this.support[x].fight == false && this.support[x].energy > 30 && this.support[x].taunting == false && this.support[x].gero == false && this.cooldownAI2 > 100){
						if(this.action == false){
							this.action = true;
							app.main.aiChoiceSupport1 = 10;
							this.cooldownAI2 = 0;
							this.support[x].powerMove = true;
							//this.support[x].attacking = true;
							this.support[x].blasting = true;
							this.support[x].fight = true;
						}
					}
					
					} else if((this.support[x].position.y < this.android18.position.y + 100 && this.support[x].position.y > this.android18.position.y - 100) || (this.support[x].position.y < this.android18.position.y + 100 && this.support[x].position.y > this.android18.position.y - 100 && this.support[x].tien == true && this.support[x].focus17 == false)){
					
					//VEGETA POWER ENERGY BLASTS
					if((attackHitTest(this.support[x],this.android18) != true && attackHitTest(this.support[x],this.android17) != true) && this.aiChoiceSupport1 > .95 && this.aiChoiceSupport1 < 1 && this.support[x].fight == false && this.support[x].energy > 30 && this.support[x].taunting == false && this.support[x].gero == false && this.cooldownAI2 > 100){
						if(this.action == false){
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
					if((attackHitTest(this.support[x],this.android18) != true && attackHitTest(this.support[x],this.android17) != true) && this.aiChoiceSupport1 > .95 && this.aiChoiceSupport1 < 1 && this.support[x].fight == false && this.support[x].energy > 30 && this.support[x].taunting == false && this.support[x].gero == false && this.cooldownAI3 > 200 && this.support[x].krillin == true){
						if(this.action == false){
							this.action = true;
							app.main.aiChoiceSupport1 = 10;
							this.cooldownAI3 = 0;
							this.support[x].powerMove = true;
							//this.support[x].attacking = true;
							this.support[x].blasting = true;
							this.support[x].fight = true;
						}
					}
					
					if((((this.support[x].position.y < this.android18.position.y + 100 && this.support[x].position.y > this.android18.position.y - 100) || (this.support[x].position.y < this.android18.position.y + 100 && this.support[x].position.y > this.android18.position.y - 100) || (this.support[x].position.y < this.android17.position.y + 100 && this.support[x].position.y > this.android17.position.y - 100) || (this.support[x].position.y < this.android17.position.y + 100 && this.support[x].position.y > this.android17.position.y - 100)) && this.support[x].krillin == true)){
					
					//VEGETA POWER ENERGY BLASTS
					if(this.support[x].blasting == true && this.support[x].triggerBlast == false){
						this.support[x].triggerBlast = true;
						this.cooldownAI3 = 0;
					}
					
					}
					
					if(this.support[x].blasting == false && this.support[x].krillin == true){
						this.support[x].triggerBlast = false;
						this.support[x].flying = false;
						this.support[x].hover = false;
					}
					
					//VEGETA TAUNTING
					if(this.aiChoiceSupport1 < -1 && this.support[x].fight == false && this.support[x].taunting == false && this.support[x].gero == false){
						if(this.action == false){
							this.action = true;
							this.support[x].intensify = true;
							this.support[x].taunting = true;
						}
					}
				}
			}
			}
			}
			
			
			if(this.vegeta.focus17 == false){
			//VEGETA HIT DETECTION RESOLUTION -- AGAINST 18
			if(this.vegeta.attacking == true && this.vegeta.hard == true && this.detectedHard2 == false && ((hardAttackHitTest(this.vegeta,this.android18) == true && (this.vegeta.air == false || this.chance2 <= .5)) || (attackHitTest(this.vegeta,this.android18) == true && this.vegeta.air == true && this.chance2 > .5))){
				if(this.vegeta.punching == true && this.android18.superSpeed == false && this.android18.fieldOn == false && this.vegeta.hit == false && this.vegeta.hardHit == false && this.android18.blocking == false && this.android18.dead == false && hardAttackHitTest(this.vegeta,this.android18) == true){
					this.sound.playSpecialReaction2(16);
					//console.log("DETECTIONPUNCH");
					this.detectedHard2 = true;
					this.android18.hardHit = true;
					this.android18.hit = true;
					this.android18.stun = true;
					if(this.android18.air == true) {
						this.android18.flying = false;
						this.android18.jumpVelocity.y += 80;
						this.android18.punched = true;
					} else {
						this.android18.punched = false;
					}
					if(this.android18.stamina > 64 && this.android18.exhausted == true){
						this.android18.stamina = this.android18.stamina - 10;
					}
					if(this.android18.endurance > 14){
						this.android18.endurance = this.android18.endurance - (7 + getRandom(0, 5));
					} else if(this.android18.endurance < 15){
						this.android18.health = this.android18.health - (7 + getRandom(0, 5));
					}
								
					if(this.android18.superSpeed == false && this.android18.fieldOn == false){
						if(this.vegeta.left == true){
							this.android18.velocity.x = -7;
						} else if(this.vegeta.right == true){
							this.android18.velocity.x = 7;
						}
						this.android18.decel = this.android18.velocity.clone();
					} else {
						this.sound.playBasicAttack(10);
					}
				}
				if(this.vegeta.kicking == true && this.vegeta.hit == false && this.vegeta.hardHit == false && this.android18.superSpeed == false && this.android18.fieldOn == false && this.android18.blocking == false && hardAttackHitTest(this.vegeta,this.android18) == true){
					this.sound.playSpecialReaction2(17);
					this.detectedHard2 = true;
					//console.log("DETECTIONKICK");
					this.android18.hardHit = true;
					this.android18.hit = true;
					this.android18.stun = true;
					this.android18.punched = false; //FIX
					if(this.android18.stamina > 64 && this.android18.exhausted == true){
						this.android18.stamina = this.android18.stamina - 10;
					}
					if(this.android18.endurance > 14){
						this.android18.endurance = this.android18.endurance - (7 + getRandom(0, 5));
					} else if(this.android18.endurance < 15){
						this.android18.health = this.android18.health - (7 + getRandom(0, 5));
					}
								
					if(this.android18.blocking == true && this.android18.fieldOn == false){
						if(this.vegeta.left == true){
							this.android18.velocity.x = -20;
						} else if(this.vegeta.right == true){
							this.android18.velocity.x = 20;
						}
						this.android18.stamina += 1;
						this.android18.decel = this.android18.velocity.clone();
						this.sound.playBasicReaction2(Math.round(getRandom(58,60)));
					} else if(this.android18.superSpeed == false && this.android18.fieldOn == false){
						//console.log("pushpushpush");
						if(this.vegeta.left == true){
							this.android18.velocity.x = -60;
						} else if(this.vegeta.right == true){
							this.android18.velocity.x = 60;
						}
						this.android18.decel = this.android18.velocity.clone();
					} else {
						this.sound.playBasicAttack(10);
					}
				}
				if(this.android18.blocking == true && this.android18.fieldOn == false && (this.vegeta.kicking == true || this.vegeta.punching == true) && hardAttackHitTest(this.vegeta, this.android18)){
					if(this.vegeta.kicking == true){
						if(this.vegeta.left == true){
							this.android18.velocity.x = -20;
						} else if(this.vegeta.right == true){
							this.android18.velocity.x = 20;
						}
					} else if(this.vegeta.punching == true && this.vegeta.air == true){
						if(this.vegeta.left == true){
							this.android18.jumpVelocity.y = -10;
						} else if(this.vegeta.right == true){
							this.android18.jumpVelocity.y = 10;
						}
					} else {
						if(this.vegeta.left == true){
							this.android18.velocity.x = -3;
						} else if(this.vegeta.right == true){
							this.android18.velocity.x = 3;
						}
					}
					this.android18.stamina += 5;
					this.android18.decel = this.android18.velocity.clone();
					this.sound.playBasicReaction2(Math.round(getRandom(58,60)));
				} 
			}
			if(this.vegeta.attacking == true && this.vegeta.hit == false && this.vegeta.hardHit == false && this.vegeta.hard == false && this.detected2 == false){
				if(this.vegeta.basic == true && this.android18.superSpeed == false && this.android18.fieldOn == false && this.android18.blocking == false && this.android18.hard == false && attackHitTest(this.vegeta,this.android18) == true){
					this.detected2 = true;
					if(this.vegeta.randomEffect >= .75){
						this.sound.playBasicReaction2(12);
					} else if(this.vegeta.randomEffect > .5 && this.vegeta.randomEffect < .75){
						this.sound.playBasicReaction2(13);
					} else if(this.vegeta.randomEffect > .25 && this.vegeta.randomEffect <= .5){
						this.sound.playBasicReaction2(14);
					} else {
						this.sound.playBasicReaction2(15);
					}
					this.android18.hit = true;
					this.android18.stun = true;
					if(this.android18.stamina > 64 && this.android18.exhausted == true){
						this.android18.stamina = this.android18.stamina - 4;
					}
					if(this.android18.endurance > 14){
						this.android18.endurance = this.android18.endurance - (3 + getRandom(0, 2));
					} else if(this.android18.endurance < 15){
						this.android18.health = this.android18.health - (3 + getRandom(0, 2));
					}
								
					if(this.android18.superSpeed == false && this.android18.fieldOn == false){
						if(this.vegeta.left == true){
							this.android18.velocity.x -= 3;
						} else if(this.vegeta.right == true){
							this.android18.velocity.x += 3;
						}
						this.android18.decel = this.android18.velocity.clone();
					}
				}
				if(this.android18.blocking == true && this.android18.fieldOn == false && this.vegeta.basic == true && hardAttackHitTest(this.vegeta, this.android18)){
					if(this.vegeta.left == true){
						this.android18.velocity.x -= 3;
					} else if(this.vegeta.right == true){
						this.android18.velocity.x += 3;
					}
					this.android18.stamina += 4;
					this.android18.decel = this.android18.velocity.clone();
					this.sound.playBasicReaction2(Math.round(getRandom(58,60)));
				}
			}	
			
			} else {
			//VEGETA HIT DETECTION RESOLUTION -- AGAINST 17
			if(this.vegeta.attacking == true && this.vegeta.hard == true && this.detectedHard2 == false && ((hardAttackHitTest(this.vegeta,this.android17) == true && (this.vegeta.air == false || this.chance2 <= .5)) || (attackHitTest(this.vegeta,this.android17) == true && this.vegeta.air == true && this.chance2 > .5))){
				if(this.vegeta.punching == true && this.android17.superSpeed == false && this.android17.fieldOn == false && this.android17.blocking == false && hardAttackHitTest(this.vegeta,this.android17) == true){
					this.sound.playSpecialReaction2(16);
					//console.log("DETECTIONPUNCH");
					this.detectedHard2 = true;
					this.android17.hardHit = true;
					this.android17.hit = true;
					this.android17.stun = true;
					if(this.android17.air == true) {
						this.android17.flying = false;
						this.android17.jumpVelocity.y += 80;
						this.android17.punched = true;
					} else {
						this.android17.punched = false;
					}
					if(this.android17.stamina > 64 && this.android17.exhausted == true){
						this.android17.stamina = this.android17.stamina - 10;
					}
					if(this.android17.endurance > 14){
						this.android17.endurance = this.android17.endurance - (7 + getRandom(0, 5));
					} else if(this.android17.endurance < 15){
						this.android17.health = this.android17.health - (7 + getRandom(0, 5));
					}
								
					if(this.android17.superSpeed == false && this.android17.fieldOn == false){
						if(this.vegeta.left == true){
							this.android17.velocity.x = -7;
						} else if(this.vegeta.right == true){
							this.android17.velocity.x = 7;
						}
						this.android17.decel = this.android17.velocity.clone();
					} else {
						this.sound.playBasicAttack(10);
					}
				}
				if(this.vegeta.kicking == true && this.android17.superSpeed == false && this.android17.fieldOn == false && this.android17.blocking == false && hardAttackHitTest(this.vegeta,this.android17) == true){
					this.sound.playSpecialReaction2(17);
					this.detectedHard2 = true;
					//console.log("DETECTIONKICK");
					this.android17.hardHit = true;
					this.android17.hit = true;
					this.android17.stun = true;
					this.android17.punched = false; //FIX
					if(this.android17.stamina > 64 && this.android17.exhausted == true){
						this.android17.stamina = this.android17.stamina - 10;
					}
					if(this.android17.endurance > 14){
						this.android17.endurance = this.android17.endurance - (7 + getRandom(0, 5));
					} else if(this.android17.endurance < 15){
						this.android17.health = this.android17.health - (7 + getRandom(0, 5));
					}
								
					if(this.android17.blocking == true){
						if(this.vegeta.left == true){
							this.android17.velocity.x = -20;
						} else if(this.vegeta.right == true){
							this.android17.velocity.x = 20;
						}
						this.android17.stamina += 1;
						this.android17.decel = this.android17.velocity.clone();
						this.sound.playBasicReaction2(Math.round(getRandom(58,60)));
					} else if(this.android17.superSpeed == false && this.android17.fieldOn == false){
						//console.log("pushpushpush");
						if(this.vegeta.left == true){
							this.android17.velocity.x = -60;
						} else if(this.vegeta.right == true){
							this.android17.velocity.x = 60;
						}
						this.android17.decel = this.android17.velocity.clone();
					} else {
						this.sound.playBasicAttack(10);
					}
				}
				if(this.android17.blocking == true && (this.vegeta.kicking == true || this.vegeta.punching == true) && hardAttackHitTest(this.vegeta, this.android17)){
					if(this.vegeta.kicking == true){
						if(this.vegeta.left == true){
							this.android17.velocity.x = -20;
						} else if(this.vegeta.right == true){
							this.android17.velocity.x = 20;
						}
					} else if(this.vegeta.punching == true && this.vegeta.air == true){
						if(this.vegeta.left == true){
							this.android17.jumpVelocity.y = -10;
						} else if(this.vegeta.right == true){
							this.android17.jumpVelocity.y = 10;
						}
					} else {
						if(this.vegeta.left == true){
							this.android17.velocity.x = -3;
						} else if(this.vegeta.right == true){
							this.android17.velocity.x = 3;
						}
					}
					this.android17.stamina += 5;
					this.android17.decel = this.android17.velocity.clone();
					this.sound.playBasicReaction2(Math.round(getRandom(58,60)));
				} 
			}
			if(this.vegeta.attacking == true && this.vegeta.hard == false && this.detected2 == false){
				if(this.vegeta.basic == true && this.android17.superSpeed == false && this.android17.fieldOn == false && this.android17.blocking == false && this.android17.hard == false && hardAttackHitTest(this.vegeta,this.android17) == true){
					this.detected2 = true;
					if(this.vegeta.randomEffect >= .75){
						this.sound.playBasicReaction2(12);
					} else if(this.vegeta.randomEffect > .5 && this.vegeta.randomEffect < .75){
						this.sound.playBasicReaction2(13);
					} else if(this.vegeta.randomEffect > .25 && this.vegeta.randomEffect <= .5){
						this.sound.playBasicReaction2(14);
					} else {
						this.sound.playBasicReaction2(15);
					}
					this.android17.hit = true;
					this.android17.stun = true;
					if(this.android17.stamina > 64 && this.android17.exhausted == true){
						this.android17.stamina = this.android17.stamina - 4;
					}
					if(this.android17.endurance > 14){
						this.android17.endurance = this.android17.endurance - (3 + getRandom(0, 2));
					} else if(this.android17.endurance < 15){
						this.android17.health = this.android17.health - (3 + getRandom(0, 2));
					}
								
					if(this.android17.superSpeed == false && this.android17.fieldOn == false){
						if(this.vegeta.left == true){
							this.android17.velocity.x -= 8;
						} else if(this.vegeta.right == true){
							this.android17.velocity.x += 8;
						}
						this.android17.decel = this.android17.velocity.clone();
					}
				}
				if(this.android17.blocking == true && this.vegeta.basic == true && hardAttackHitTest(this.vegeta, this.android17)){
					if(this.vegeta.left == true){
						this.android17.velocity.x -= 3;
					} else if(this.vegeta.right == true){
						this.android17.velocity.x += 3;
					}
					this.android17.stamina += 4;
					this.android17.decel = this.android17.velocity.clone();
					this.sound.playBasicReaction2(Math.round(getRandom(58,60)));
				}
			}
			}
			
			//ANDROID18 HIT DETECTION RESOLUTION
			if((this.detectedHard == true && this.vegeta.behind == false || (this.android18.air == true && this.chance > .5 && this.detected == true)) && this.vegeta.unstoppable == false){
				if(this.android18.kicking == true && this.android18.intensify == true){
						if(this.vegeta.superSpeed == false && this.vegeta.unable == false && this.vegeta.blocking == false && hardAttackHitTest(this.android18,this.vegeta) == true){
							this.sound.playSpecialReaction(17);
							//console.log("HARDKICKED");
							this.vegeta.hit = true;
							this.vegeta.hardHit = true;
							this.vegeta.stun = true;
							this.detectedHard = false;
							this.vegeta.punched = false; //FIX
							if(this.vegeta.stamina > 64 && this.vegeta.exhausted == true){
								this.vegeta.stamina = this.vegeta.stamina - 10;
							}
							if(this.vegeta.endurance > 14){
								this.vegeta.endurance = this.vegeta.endurance - (7 + getRandom(0, 5));
							} else if(this.vegeta.endurance < 15){
								this.vegeta.health = this.vegeta.health - (7 + getRandom(0, 5));
							}
						}
						if(this.vegeta.blocking == true && (this.android18.kicking == true && hardAttackHitTest(this.android18, this.vegeta))){
							if(this.android18.left == true){
								this.vegeta.velocity.x = -20;
							} else if(this.android18.right == true){
								this.vegeta.velocity.x = 20;
							}
							this.vegeta.decel = this.vegeta.velocity.clone();
							this.vegeta.stamina += 4;
							this.sound.playBasicReaction(Math.round(getRandom(58,60)));
						} else if(this.vegeta.superSpeed == false){
							if(this.android18.left == true){
								this.vegeta.velocity.x = -60;
							} else if(this.android18.right == true){
								this.vegeta.velocity.x = 60;
							}
							this.vegeta.decel = this.vegeta.velocity.clone();
						}
					}
					if(this.android18.punching == true && this.android18.intensify == true && this.android18.air == true){
						if(this.vegeta.superSpeed == false && this.vegeta.unable == false && this.vegeta.blocking == false && this.damageTimer < 1 && hardAttackHitTest(this.android18,this.vegeta) == true){
							this.sound.playSpecialReaction(16);
							//console.log("HARDPUNCHED");
							this.vegeta.hit = true;
							this.vegeta.hardHit = true;
							this.vegeta.stun = true;
							this.detectedHard = false;
							if(this.vegeta.air == true) {
								this.vegeta.flying = false;
								this.vegeta.jumpVelocity.y += 80;
								this.vegeta.punched = true;
							} else {
								this.vegeta.punched = false;
							}
							if(this.vegeta.stamina > 64 && this.vegeta.exhausted == true){
								this.vegeta.stamina = this.vegeta.stamina - 10;
							}
							if(this.vegeta.endurance > 14){
								this.vegeta.endurance = this.vegeta.endurance - (7 + getRandom(0, 5));
							} else if(this.vegeta.endurance < 15){
								this.vegeta.health = this.vegeta.health - (7 + getRandom(0, 5));
							}
						}
						if(this.vegeta.blocking == true && (this.android18.punching == true && hardAttackHitTest(this.android18, this.vegeta))){
							if(this.android18.left == true){
								this.vegeta.jumpVelocity.y = -10;
							} else if(this.android18.right == true){
								this.vegeta.jumpVelocity.y = 10;
							}
							this.vegeta.decel = this.vegeta.velocity.clone();
							this.vegeta.stamina += 5;
							this.sound.playBasicReaction(Math.round(getRandom(58,60)));
						} else if(this.vegeta.superSpeed == false){
							if(this.android18.left == true){
								this.vegeta.velocity.x = -7;
							} else if(this.android18.right == true){
								this.vegeta.velocity.x = 7;
							}
							this.vegeta.decel = this.vegeta.velocity.clone();
						}
						this.damageTimer++;
					}
					
					if(this.android18.punching == true && this.android18.intensify == true && this.android18.air == false){
						if(this.vegeta.superSpeed == false && this.vegeta.unable == false && this.vegeta.blocking == false && this.damageTimer < 1 && hardAttackHitTest(this.android18,this.vegeta) == true){
							this.sound.playSpecialReaction(16);
							//console.log("HARDPUNCHED");
							this.vegeta.hit = true;
							this.vegeta.hardHit = true;
							this.vegeta.stun = true;
							this.detectedHard = false;
							if(this.vegeta.stamina > 64 && this.vegeta.exhausted == true){
								this.vegeta.stamina = this.vegeta.stamina - 10;
							}
							if(this.vegeta.endurance > 14){
								this.vegeta.endurance = this.vegeta.endurance - (7 + getRandom(0, 5));
							} else if(this.vegeta.endurance < 15){
								this.vegeta.health = this.vegeta.health - (7 + getRandom(0, 5));
							}
						}
						if(this.vegeta.blocking == true && (this.android18.punching == true && hardAttackHitTest(this.android18, this.vegeta))){
							if(this.android18.left == true){
								this.vegeta.velocity.x = -3;
							} else if(this.android18.right == true){
								this.vegeta.velocity.x = 3;
							}
							this.vegeta.decel = this.vegeta.velocity.clone();
							this.vegeta.stamina += 5;
							this.sound.playBasicReaction(Math.round(getRandom(58,60)));
						} else if(this.vegeta.superSpeed == false){
							if(this.android18.left == true){
								this.vegeta.velocity.x = -7;
							} else if(this.android18.right == true){
								this.vegeta.velocity.x = 7;
							}
							this.vegeta.decel = this.vegeta.velocity.clone();
						}
						this.damageTimer++;
					}
			}
			if(this.detected == true && this.vegeta.superSpeed == false && this.vegeta.hard == false && this.vegeta.unstoppable == false) {
				if(this.android18.basic == true && (this.vegeta.hit == false || this.vegeta.hardHit == true)){
						if(this.vegeta.superSpeed == false && this.vegeta.unable == false && this.vegeta.blocking == false && this.damageTimer < 1 && hardAttackHitTest(this.android18,this.vegeta) == true){
							this.vegeta.hit = true;
							this.vegeta.stun = true;
							if(this.android18.randomEffect >= .75){
								this.sound.playBasicReaction(12);
							} else if(this.android18.randomEffect > .5 && this.android18.randomEffect < .75){
								this.sound.playBasicReaction(13);
							} else if(this.android18.randomEffect > .25 && this.android18.randomEffect <= .5){
								this.sound.playBasicReaction(14);
							} else {
								this.sound.playBasicReaction(15);
							}
							if(this.vegeta.stamina > 64 && this.vegeta.exhausted == true){
								this.vegeta.stamina = this.vegeta.stamina - 4;
							}
							if(this.vegeta.endurance > 14){
								this.vegeta.endurance = this.vegeta.endurance - (3 + getRandom(0, 2));
							} else if(this.vegeta.endurance < 15){
								this.vegeta.health = this.vegeta.health - (3 + getRandom(0, 2));
							}
						}
						if(this.vegeta.blocking == true && (this.android18.basic == true && hardAttackHitTest(this.android18, this.vegeta))){
							if(this.android18.left == true){
								this.vegeta.velocity.x = -3;
							} else if(this.android18.right == true){
								this.vegeta.velocity.x = 3;
							}
							this.vegeta.decel = this.vegeta.velocity.clone();
							this.vegeta.stamina += 4;
							this.sound.playBasicReaction(Math.round(getRandom(58,60)));
						} else if(this.vegeta.superSpeed == false){
							if(this.android18.left == true){
								this.vegeta.velocity.x = -8;
							} else if(this.android18.right == true){
								this.vegeta.velocity.x = 8;
							}
							this.vegeta.decel = this.vegeta.velocity.clone();
						}
						this.damageTimer++;
				}
			} 
			
			//ANDROID 17 HIT DETECTION RESOLUTION
			if(this.android17.attacking == true && this.android17.hard == true && this.detectedHard3 == false  && ((hardAttackHitTest(this.android17,this.vegeta) == true && (this.android17.air == false || this.chance3 <= .5)) || (attackHitTest(this.android17,this.vegeta) == true && this.android17.air == true && this.chance3 > .5)) && this.vegeta.unstoppable == false){
				if(this.android17.punching == true && this.vegeta.unable == false && this.vegeta.superSpeed == false && this.vegeta.blocking == false && hardAttackHitTest(this.android17,this.vegeta) == true){
					this.sound.playSpecialReaction2(16);
					//console.log("DETECTIONPUNCH");
					this.detectedHard3 = true;
					this.vegeta.hardHit = true;
					this.vegeta.hit = true;
					this.vegeta.stun = true;
					if(this.vegeta.air == true) {
						this.vegeta.flying = false;
						this.vegeta.jumpVelocity.y += 80;
						this.vegeta.punched = true;
					} else {
						this.vegeta.punched = false;
					}
					if(this.vegeta.stamina > 64 && this.vegeta.exhausted == true){
						this.vegeta.stamina = this.vegeta.stamina - 10;
					}
					if(this.vegeta.endurance > 14){
						this.vegeta.endurance = this.vegeta.endurance - (7 + getRandom(0, 5));
					} else if(this.vegeta.endurance < 15){
						this.vegeta.health = this.vegeta.health - (7 + getRandom(0, 5));
					}
								
					if(this.vegeta.superSpeed == false){
						if(this.android17.left == true){
							this.vegeta.velocity.x = -7;
						} else if(this.android17.right == true){
							this.vegeta.velocity.x = 7;
						}
						this.vegeta.decel = this.vegeta.velocity.clone();
					} else {
						this.sound.playBasicAttack(10);
					}
				}
				if(this.android17.kicking == true && this.vegeta.superSpeed == false && this.vegeta.unable == false && this.vegeta.blocking == false && hardAttackHitTest(this.android17,this.vegeta) == true){
					this.sound.playSpecialReaction2(17);
					this.detectedHard3 = true;
					//console.log("DETECTIONKICK");
					this.vegeta.hardHit = true;
					this.vegeta.hit = true;
					this.vegeta.stun = true;
					this.vegeta.punched = false; //FIX
					if(this.vegeta.stamina > 64 && this.vegeta.exhausted == true){
						this.vegeta.stamina = this.vegeta.stamina - 10;
					}
					if(this.vegeta.endurance > 14){
						this.vegeta.endurance = this.vegeta.endurance - (7 + getRandom(0, 5));
					} else if(this.vegeta.endurance < 15){
						this.vegeta.health = this.vegeta.health - (7 + getRandom(0, 5));
					}
								
					if(this.vegeta.blocking == true){
						if(this.android17.left == true){
							this.vegeta.velocity.x = -20;
						} else if(this.android17.right == true){
							this.vegeta.velocity.x = 20;
						}
						this.vegeta.stamina += 1;
						this.vegeta.decel = this.vegeta.velocity.clone();
						this.sound.playBasicReaction2(Math.round(getRandom(58,60)));
					} else if(this.vegeta.superSpeed == false){
						//console.log("pushpushpush");
						if(this.android17.left == true){
							this.vegeta.velocity.x = -60;
						} else if(this.android17.right == true){
							this.vegeta.velocity.x = 60;
						}
						this.vegeta.decel = this.vegeta.velocity.clone();
					} else {
						this.sound.playBasicAttack(10);
					}
				}
				if(this.vegeta.blocking == true && ((this.android17.kicking == true || this.android17.punching == true) && hardAttackHitTest(this.android17, this.vegeta))){
					if(this.android17.kicking == true){
						if(this.android17.left == true){
							this.vegeta.velocity.x = -20;
						} else if(this.android17.right == true){
							this.vegeta.velocity.x = 20;
						}
					} else if(this.android17.punching == true && this.android17.air == true){
						if(this.android17.left == true){
							this.vegeta.jumpVelocity.y = -10;
						} else if(this.android17.right == true){
							this.vegeta.jumpVelocity.y = 10;
						}
					} else {
						if(this.android17.left == true){
							this.vegeta.velocity.x = -3;
						} else if(this.android17.right == true){
							this.vegeta.velocity.x = 3;
						}
					}
					this.vegeta.stamina += 5;
					this.vegeta.decel = this.vegeta.velocity.clone();
					this.sound.playBasicReaction2(Math.round(getRandom(58,60)));
				} 
			}
			if(this.android17.attacking == true && this.android17.hard == false && this.detected3 == false && this.vegeta.unstoppable == false){
				if(this.android17.basic == true && this.vegeta.unable == false && this.vegeta.superSpeed == false && this.vegeta.blocking == false && this.vegeta.hard == false && hardAttackHitTest(this.android17,this.vegeta) == true){
					this.detected3 = true;
					if(this.android17.randomEffect >= .75){
						this.sound.playBasicReaction2(12);
					} else if(this.android17.randomEffect > .5 && this.android17.randomEffect < .75){
						this.sound.playBasicReaction2(13);
					} else if(this.android17.randomEffect > .25 && this.android17.randomEffect <= .5){
						this.sound.playBasicReaction2(14);
					} else {
						this.sound.playBasicReaction2(15);
					}
					this.vegeta.hit = true;
					this.vegeta.stun = true;
					if(this.vegeta.stamina > 64 && this.vegeta.exhausted == true){
						this.vegeta.stamina = this.vegeta.stamina - 4;
					}
					if(this.vegeta.endurance > 14){
						this.vegeta.endurance = this.vegeta.endurance - (3 + getRandom(0, 2));
					} else if(this.vegeta.endurance < 15){
						this.vegeta.health = this.vegeta.health - (3 + getRandom(0, 2));
					}
								
					if(this.vegeta.superSpeed == false){
						if(this.android17.left == true){
							this.vegeta.velocity.x -= 8;
						} else if(this.android17.right == true){
							this.vegeta.velocity.x += 8;
						}
						this.vegeta.decel = this.vegeta.velocity.clone();
					}
				}
				if(this.vegeta.blocking == true && (this.android17.basic == true && hardAttackHitTest(this.android17, this.vegeta))){
					if(this.android17.left == true){
						this.vegeta.velocity.x -= 3;
					} else if(this.android17.right == true){
						this.vegeta.velocity.x += 3;
					}
					this.vegeta.stamina += 4;
					this.vegeta.decel = this.vegeta.velocity.clone();
					this.sound.playBasicReaction2(Math.round(getRandom(58,60)));
				}
			}//END HIT DETECTION HANDLING
			
			
			
			
			this.sceneCounter++;
			//console.log(this.sceneCounter + "SCENECOUNTER");
			
			//console.log(this.sceneCounter);
			
			//MOVES ALONG GAME STATES THAT ARE VIDEOS
			if(this.introState == true && this.sceneCounter > 1570 && this.sceneCounter < 1572){
				this.environment.fadeInFast = true;
				/* this.videos.end(); 
				this.gameState = this.GAME_STATE.DEFAULT;
				this.sound.playBGAudioScene();
				this.scene = true;
				this.introState = false;
				this.changed = false; */
			} else if(this.introState == true && this.sceneCounter > 1573){
				this.sceneChange = 1;
				/* this.videos.end();
				this.gameState = this.GAME_STATE.DEFAULT;
				this.sound.playBGAudioScene();
				this.scene = true;
				this.introState = false;
				this.changed = false; */
			}
			if(this.endingState == true && this.specialScene == false && ((this.sceneCounter > 530 && this.trueEnding == false) || (this.sceneCounter > 530 && this.trueEnding == true))){
				//this.environment.fadeInSlow = true;
				
				this.videos.endE();
				this.endingState = false;
				if(this.trueEnding == true){
					if(this.quickReset == false){
						this.sceneCounter = 0;
						this.quickReset = true;
						this.endingState = false;
					}
					this.specialScene = true;
					this.videos.startS();
				} else {
					this.sound.playBGAudioWin();
						if(this.totalScore > 0){
							if(this.finalSaying == false && this.endingState == false && this.specialScene == false){
								this.sound.playVoice2(Math.round(getRandom(82,83)));
								this.finalSaying = true;
							}
						} else {
							if(this.finalSaying == false && this.endingState == false && this.specialScene == false){
								this.sound.playVoice2(Math.round(getRandom(80,81)));
								this.finalSaying = true;
							}
						}
						//this.endingState = false;
				}
				//this.sound.playEffect(7);
				
			}
			if(this.specialScene == true && this.sceneCounter > 600){
				//this.environment.fadeInSlow = true;
				this.videos.endE();
				this.videos.endS();
				//this.sound.playEffect(7);
				this.specialScene = false;
				this.sound.playBGAudioWin();
						if(this.totalScore > 0){
							if(this.finalSaying == false && this.endingState == false && this.specialScene == false){
								this.sound.playVoice2(Math.round(getRandom(82,83)));
								this.finalSaying = true;
							}
						} else {
							if(this.finalSaying == false && this.endingState == false && this.specialScene == false){
								this.sound.playVoice2(Math.round(getRandom(80,81)));
								this.finalSaying = true;
							}
						}
			}
			
			
			//GAME STATE CHANGER -- CREDITS
			if ((myKeys.keydown[myKeys.KEYBOARD.KEY_C] == true || this.creditsScreen == true) && myKeys.keydown[myKeys.KEYBOARD.KEY_ENTER] != true && this.changeDelay > 29){
				if(this.gameState == this.GAME_STATE.BEGIN && this.introState == false && this.reseted == false){
					this.creditsScreen = true;
					this.sceneChange++;
					this.titleScreen = false;
					this.instructions = 0;
					this.environment.fadeInFast = true;
					if(this.sceneChange > 1){
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
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_C] != true && (myKeys.keydown[myKeys.KEYBOARD.KEY_ENTER] == true || this.sceneChange != 0) && this.changeDelay > 29){
				if(this.gameState == this.GAME_STATE.BEGIN && this.introState == false && this.reseted == false){
					this.sceneChange++;
					this.titleScreen = false;
					this.instructions = 0;
					this.environment.fadeInSlow = true;
					if(this.sceneChange > 1){
						this.videos.endO();
						this.reseted = true;
						this.changed = false;
						this.gameState = this.GAME_STATE.TUTORIAL;
						//this.sound.playBGAudioTutorial();
						this.scene = true;
						this.sceneChange = 0;
						this.changeDelay = 0;
					}
				} else if(this.gameState == this.GAME_STATE.CREDITS && this.reseted == false){
					this.sceneChange++;
					this.instructions = 0;
					this.environment.fadeInSlow = true;
					if(this.sceneChange > 1){
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
				} else if(this.gameState == this.GAME_STATE.TUTORIAL && this.introState == false && this.reseted == false){
					this.sound.stopBGAudioTutorial();
					this.sceneChange++;
					this.scene = false;
					this.environment.remote = true;
					if(this.environment.remoteGround == true){
							this.beginCounter++;
							if(this.beginCounter < 15){
								this.vegeta.stun = true;
								this.android18.stun = true;
								this.android17.superSpeed = true;
								this.android17.stun = true;	
								this.android17.cinematic = true;
								this.android17.cine = 7;
								//this.begin = true;
							}
							if(this.beginCounter > 5 && this.beginCounter < 21){
								if(this.vegeta.flying == false){
									this.android17.flying = false;
							    }
								if(this.vegeta.left == true && this.gameState == this.GAME_STATE.TUTORIAL){
			                      this.android17.position.x = this.vegeta.position.x + 60;
			                      this.android17.position.y = this.vegeta.position.y - 5;
		                        } else if(this.vegeta.right == true && this.gameState == app.main.GAME_STATE.TUTORIAL){
			                      this.android17.position.x = this.vegeta.position.x - 60;
			                      this.android17.position.y = this.vegeta.position.y - 5;
		                        }
								}
					}
					if(this.beginCounter > 20){
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
						this.vegeta = new app.Vegeta(500,1,this.android18);
						this.vegeta.stun = true;
						this.vegeta.end == true;
						this.changeDelay = 0;
						//// TESTS STUFF
						/* this.sceneNum = 3;
						this.battle = 2;
						this.sceneTimer = 0; */
					}
				} else if(this.gameState == this.GAME_STATE.TUTORIAL && this.introState == true && this.reseted == false){
					this.sceneChange++;
					//this.sound.playBGAudioScene();
					this.environment.fadeInFast = true;
					if(this.sceneChange > 1){
						this.videos.end(); 
						this.introState = false;
						this.reseted = true;
						this.changed = false;
						this.gameState = this.GAME_STATE.DEFAULT;
						this.scene = true;
						this.sceneChange = 0;
						this.changeDelay = 0;
					}
				} else if((this.gameState == this.GAME_STATE.VICTORY) && this.endingState == true && this.specialScene == false && this.reseted == false){
					this.videos.endE();
					//this.sound.playEffect(7);
					this.endingState = false;
					if(this.trueEnding == true){
						this.endingState = false;
						this.specialScene = true;
						this.sceneCounter = 0;
						this.videos.startS();
					} else {
						if(this.totalScore > 0){
							if(this.finalSaying == false && this.endingState == false && this.specialScene == false){
								this.sound.playVoice2(Math.round(getRandom(82,83)));
								this.finalSaying = true;
							}
						} else {
							if(this.finalSaying == false && this.endingState == false && this.specialScene == false){
								this.sound.playVoice2(Math.round(getRandom(80,81)));
								this.finalSaying = true;
							}
						}
						this.sound.playBGAudioWin();
					}
					this.reseted = true;
				} else if((this.gameState == this.GAME_STATE.VICTORY) && this.specialScene == true && this.reseted == false){
					this.videos.endE();
					this.videos.endS();
					//this.sound.playEffect(7);
					this.sound.playBGAudioWin();
					this.specialScene = false;
						if(this.totalScore > 0){
							if(this.finalSaying == false && this.endingState == false && this.specialScene == false){
								this.sound.playVoice2(Math.round(getRandom(82,83)));
								this.finalSaying = true;
							}
						} else {
							if(this.finalSaying == false && this.endingState == false && this.specialScene == false){
								this.sound.playVoice2(Math.round(getRandom(80,81)));
								this.finalSaying = true;
							}
						}
					this.reseted = true;
				} else if((this.gameState == this.GAME_STATE.VICTORY || this.gameState == this.GAME_STATE.DEFEAT) && this.endingState != true && this.reseted == false){
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
			} else if (myKeys.keydown[myKeys.KEYBOARD.KEY_ENTER] != true){
				this.reseted = false;
			}
			
			
			
			
			//IN GAME CUTSCENES
			if(this.scene == true){
				
				if(this.sceneNum == 0 && this.gameState == this.GAME_STATE.TUTORIAL){ // Tutorial
				this.sceneTimer++;
				//this.sceneTimer = 415;
				if(this.sceneTimer < 2){
					//this.environment.dark = true;
					//this.android18.stun = true;
					//Nothing
				} else if(this.sceneTimer < 20){
					this.android18.stun = false;
					//this.android18.stun = true;
					//Nothing
				} else if(this.sceneTimer < 21 && this.sceneTimer > 19){
					this.sound.playBGAudioTutorial();
				} else if(this.sceneTimer < 30 && this.sceneTimer > 28){
					this.sound.playVoice2(34);
				} else if(this.sceneTimer < 35 && this.sceneTimer > 33){
					this.sound.playEffect(65);
					this.toggle2 = false;
				} else if(this.sceneTimer < 45 && this.sceneTimer > 43){
					this.sound.playEffect(65);
					this.toggle1 = false;
				} else if(this.sceneTimer < 82 && this.sceneTimer > 80){
					this.sound.playVoice1(35);
				} else if(this.sceneTimer < 110 && this.sceneTimer > 108){
					this.sound.playVoice2(36);
				} else if(this.sceneTimer < 170 && this.sceneTimer > 168){
					this.sound.playVoice1(37);
				} else if(this.sceneTimer < 190){
					
				} else {
					this.scene = false;
					this.sceneTimer = 0;
					//this.android18.stun = false;
				}
				} //END SCENE 0
				
				if(this.sceneNum == 1 && this.battle == 0){ // PICCOLO ENCOUNTER
				this.sceneTimer++;
				//this.sceneTimer = 615; //TESTING
				if(this.sceneTimer < 2){
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
					if(this.ranScore < .3){
						this.roundScore = 400;
						this.roundScore2 = 400;
					} else if(this.ranScore >= .3 && this.ranScore < .7){
						this.roundScore = 400;
						this.roundScore2 = 400;
					} else if(this.ranScore >= .7){
						this.roundScore = 400;
						this.roundScore2 = 400;
					}
					//Nothing
				}
				else if(this.sceneTimer < 40){
					//Nothing
				} else if(this.sceneTimer < 41){
					this.environment.decay = true;
					this.sound.playBGAudioScene(0);
					this.sound.playVoice2(0);
					this.environment.buildingActive = true;
				} else if(this.sceneTimer < 52 && this.sceneTimer > 50){
					this.sound.playVoice1(1);
				} else if(this.sceneTimer < 90 && this.sceneTimer > 88){
					this.android17.cine = 0;
					this.android18.cine = 0;
				} else if(this.sceneTimer < 100 && this.sceneTimer > 98){
					//this.android18.cinematic = false;
					this.sound.playVoice1(2);
				} else if(this.sceneTimer < 120 && this.sceneTimer > 118){
					//this.android17.cinematic = false;
					this.sound.playVoice2(3);
				} else if(this.sceneTimer < 150 && this.sceneTimer > 148){
					this.android17.hover = false;
					this.android18.hover = false;
					this.android17.cinematic = false;
					this.android18.cinematic = false;
				} else if(this.sceneTimer < 170 && this.sceneTimer > 168){
					this.sound.playVoice1(84);
				} else if(this.sceneTimer < 180 && this.sceneTimer > 178){
					this.sound.playVoice2(85);
				} else if(this.sceneTimer < 195 && this.sceneTimer > 193){
					this.sound.playVoice1(87);
					this.android18.cine = 10;
					this.android18.cinematic = true;
				} else if(this.sceneTimer < 213 && this.sceneTimer > 211){
					this.sound.playVoice2(86);
					this.android17.cine = 9;
					this.android17.cinematic = true;
				} else if(this.sceneTimer < 240 && this.sceneTimer > 238){
					this.vegeta.counter = 0;
					this.vegeta.fight = true;
					this.vegeta.appear = true;
					this.vegeta.superSpeed = true;
				} else if(this.sceneTimer < 260 && this.sceneTimer > 258){
					this.sound.playVoice1(4);
					this.target = true;
					this.android18.right = false;
					this.android18.left = true;
					this.android18.cinematic = false;
					this.android17.cinematic = false;
				} else if(this.sceneTimer < 280 && this.sceneTimer > 278){
					this.android18.cinematic = true;
					this.android18.cine = 6;
					this.sound.playVoice2(5);
				} else if(this.sceneTimer < 330 && this.sceneTimer > 328){
					this.sound.playVoice1(6);
				} else if(this.sceneTimer < 370 && this.sceneTimer > 368){
					this.sound.playVoice2(7);
				} else if(this.sceneTimer < 430 && this.sceneTimer > 428){
					this.sound.playVoice1(8);
					this.vegeta.scenePlay = true;
				} else if(this.sceneTimer < 443 && this.sceneTimer > 441){
					this.android18.cinematic = false;
				} else if(this.sceneTimer < 470 && this.sceneTimer > 468){
					this.android17.cinematic = true;
					this.android17.cine = 9;
				} else if(this.sceneTimer < 480 && this.sceneTimer > 478){
					this.sound.playVoice2(9);
				} else if(this.sceneTimer < 520 && this.sceneTimer > 518){
					this.sound.playVoice1(10);
				} else if(this.sceneTimer < 530){
					
				} else {
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
				
				if(this.sceneNum == 2 && this.battle == 1){ //VEGETA ENCOUNTER
				this.sceneTimer++;
				//this.sceneTimer = 415;
				if(this.sceneTimer < 2){
					this.environment.dark = true;
					this.android17.superSpeed = false;
					this.android18.superSpeed = false;
					if(this.android18.position.x < this.android18.LEFTWALL.x + 200){
						this.android18.fight = true;
						this.android18.appear = true;
						this.android18.superSpeed = true;
						this.android18.position.y = this.android18.GROUND.y;
						this.android18.position.x = 400;
					}
					this.sound.playBGAudioScene(2);
					this.tempPosition = this.android17.position.y;
					this.tempDirLeft = this.android17.left;
					this.android17 = new app.Android17(this.android17.position.x,this.vegeta);
					this.android17.position.y = this.tempPosition;
					if(this.tempDirLeft == false){
						this.android17.left = false;
						this.android17.right = true;
					} else {
						this.android17.left = true;
						this.android17.right = false;
					}
					this.android17.decision = 1;
					if(this.android17.city == true){
						this.android17.gone = false;
						this.android17.city = false;
						this.android17.superSpeed = true;
					}
					this.android17.evasion = true;
					this.android17.wentEvasion = true;
					this.android17.wentCity = false;
					this.android17.wentEncounter = false;
					this.android17.encounter = false;
					if(this.android17.position.y < 620){
						this.android17.air = true;
						this.android17.flying = false;
						this.android17.hover = false;
					}
					this.android17.stun = true;
					this.android18.stun = true;
					//Nothing
				} else if(this.sceneTimer < 20){
					//Nothing
				} else if(this.sceneTimer < 70){
					if(this.sceneTimer < 21){
						this.sound.playTaunt1(0);
					}
				} else if(this.sceneTimer < 180){
					if(this.sceneTimer < 71){
						this.sound.playTaunt2(1);
					} else if(this.sceneTimer > 133 && this.sceneTimer < 135){
						this.android17.city = true;
						this.android17.fight = true;
						this.android17.superSpeed = true;
					} else if(this.sceneTimer > 153 && this.sceneTimer < 155){
						this.vegeta = new app.Vegeta(100,0,this.android18);
						this.vegeta.counter = 0;
						this.vegeta.fight = true;
						this.vegeta.appear = true;
						this.vegeta.superSpeed = true;
						this.android18.right = false;
						this.android18.left = true;
						
					}
				} else if(this.sceneTimer < 240){
					if(this.sceneTimer < 181){
						this.android17.decisionTimer = 0;
						this.sound.playTaunt3(2);
					}
					this.target = true;
				} else if(this.sceneTimer < 280){
					if(this.sceneTimer < 241){
						this.android17.decisionTimer = 0;
						this.sound.playTaunt1(3);
						this.android18.cinematic = true;
						this.android18.cine = 5;
					}
				} else if(this.sceneTimer < 340){
					if(this.sceneTimer < 281){
						this.android17.decisionTimer = 0;
						this.sound.playTaunt2(4);
					}
				} else if(this.sceneTimer < 350){
					if(this.sceneTimer < 341){
						this.android17.decisionTimer = 0;
						this.sound.playTaunt3(5);
					}
				} else if(this.sceneTimer < 385){
					if(this.sceneTimer < 351){
						this.android17.decisionTimer = 0;
						if(this.aiChoice1 < .5){
							this.sound.playTaunt1(6);
						} else {
							this.sound.playTaunt1(7);
						}
					}
				} else if(this.sceneTimer < 625){
					if(this.sceneTimer < 386){
						this.sound.stopBGAudioScene();
						this.sound.playBGAudioScene(3);
						this.android17.decisionTimer = 0;
						this.sound.playTaunt2(30);
						this.vegeta.cinematic = true;
						this.vegeta.cine = 1;
					}
					if(this.sceneTimer < 416 && this.sceneTimer > 414){
						this.vegeta.cinematic = false;
						this.vegeta.scenePlay = true;
						this.sound.playTaunt2(31);
					}
					if(this.sceneTimer < 533 && this.sceneTimer > 415){
						this.android18.position.x += .6;
						this.environment.deathLocationPiccolo.x += .4;
						this.environment.capeLocation.x += .4;
					}
					if(this.sceneTimer < 535 && this.sceneTimer > 533){
						this.vegeta.cinematic = true;
						this.vegeta.cine = 0;
					}
					if(this.sceneTimer < 586 && this.sceneTimer > 584){
						this.android18.cinematic = false;
						this.vegeta.cinematic = false;
						this.android17.decisionTimer = 0;
						if(this.aiChoice1 < .5){
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
				
				if(this.sceneNum == 3 && this.battle == 2){ // TRIPLE ENCOUNTER
				this.sceneTimer++;
				//this.sceneTimer = 700;
				if(this.sceneTimer < 2){
					this.android17.superSpeed = false;
					this.android18.superSpeed = false;
					this.environment.dark = true;
					this.sound.playBGAudioScene(5);
					this.tempPosition = this.android17.position.y;
					this.tempDirLeft = this.android17.left;
					this.android17 = new app.Android17(this.android17.position.x,this.vegeta);
					this.android17.position.y = this.tempPosition;
					if(this.tempDirLeft == false){
						this.android17.left = false;
						this.android17.right = true;
					} else {
						this.android17.left = true;
						this.android17.right = false;
					}
					this.android17.decision = -1;
					//this.android17.flying = false;
					if(this.android17.city == true){
						this.android17.gone = false;
						this.android17.city = false;
						this.android17.superSpeed = true;
					}
					this.android17.evasion = false;
					this.android17.wentEvasion = false;
					this.android17.wentCity = false;
					this.android17.wentEncounter = false;
					this.android17.encounter = false;
					if(this.android17.position.y < 620){
						this.android17.air = true;
						this.android17.flying = false;
						this.android17.hover = false;
					}
					this.android17.stun = true;
					this.android18.stun = true;
				}
				else if(this.sceneTimer < 40){
					//Nothing
				} else if(this.sceneTimer < 41){
					this.sound.playVoice1(13);
				} else if(this.sceneTimer < 67 && this.sceneTimer > 65){
					this.sound.playVoice2(14);
				} else if(this.sceneTimer < 90 && this.sceneTimer > 88){
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
					this.android17 = new app.Android17(500,this.vegeta);
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
				} else if(this.sceneTimer < 110 && this.sceneTimer > 108){
					this.environment.yamcha = true;
					this.sound.playSpecialReaction(41);
				} else if(this.sceneTimer < 130 && this.sceneTimer > 128){
					this.sound.playVoice1(15);
					this.environment.chaotzu = true;
					this.android17.right = true;
					this.android17.left = false;
					this.sound.playSpecialReaction(41);
					this.android18.cinematic = false;
					this.android17.cinematic = false;
				} else if(this.sceneTimer < 150 && this.sceneTimer > 148){
					this.sound.playVoice2(16);
				} else if(this.sceneTimer < 190 && this.sceneTimer > 188){
					this.sound.playVoice1(17);
				} else if(this.sceneTimer < 210 && this.sceneTimer > 208){
					this.sound.playVoice2(18);
				} else if(this.sceneTimer < 270 && this.sceneTimer > 268){
					this.sound.playVoice1(19);
				} else if(this.sceneTimer < 280 && this.sceneTimer > 278){
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
				} else if(this.sceneTimer < 285 && this.sceneTimer > 283){
					//this.sound.playVoice2(22);
				} else if(this.sceneTimer < 295 && this.sceneTimer > 293){
					this.sound.stopBGAudioScene();
					this.sound.playVoice2(20); //take this
					this.sound.playEffect(31);
					this.environment.superFlash = true;
				} else if(this.sceneTimer < 320 && this.sceneTimer > 318){
					this.roundScore2 += 200;
					this.environment.buildingActive = false;
					this.sound.playBGAudioScene(6);
					this.environment.cityAttacked = true;
					this.yamchaDead = true;
					this.chaotzuDead = true;
				} else if(this.sceneTimer < 330 && this.sceneTimer > 328){
					this.sound.playVoice2(21);
					this.environment.shake = true;
					this.environment.decay = true;
				} else if(this.sceneTimer < 345 && this.sceneTimer > 343){
					this.support[0].taunting = true;
					this.sound.playVoice1(23);
				} else if(this.sceneTimer < 365 && this.sceneTimer > 363){
					this.android17.right = false;
					this.android17.left = true;
					this.android18.right = false;
					this.android18.left = true;
					this.android17.cinematic = false;
					this.support[0].taunting = false;
					this.support[1].fight = true;
					this.support[1].appear = true;
					this.support[1].superSpeed = true;
				} else if(this.sceneTimer < 380 && this.sceneTimer > 378){
					this.sound.playVoice2(24);
				} else if(this.sceneTimer < 390 && this.sceneTimer > 388){
					this.sound.playVoice1(25);
					this.support[0].cinematic = true;
					this.support[0].cine = 1;
				} else if(this.sceneTimer < 400 && this.sceneTimer > 398){
					//this.sound.playVoice2(26);
				} else if(this.sceneTimer < 430 && this.sceneTimer > 428){
					this.sound.playVoice1(27);
					this.support[1].cinematic = true;
					this.support[1].cine = 1;
				} else if(this.sceneTimer < 455 && this.sceneTimer > 453){
					this.sound.playVoice2(28);
				} else if(this.sceneTimer < 480 && this.sceneTimer > 478){
					this.vegeta.fight = true;
					this.vegeta.appear = true;
					this.vegeta.superSpeed = true;
					this.vegeta.vanish = false;
				} else if(this.sceneTimer < 490 && this.sceneTimer > 488){
					this.support[0].cinematic = false;
					this.support[1].cinematic = false;
					this.sound.playVoice1(29);
					this.sound.stopBGAudioScene();
					this.sound.playBGAudioScene(7);
				} else if(this.sceneTimer < 520 && this.sceneTimer > 518){
					this.android18.cinematic = true;
					this.android18.cine = 5;
					this.sound.playVoice2(30);
				} else if(this.sceneTimer < 550 && this.sceneTimer > 548){
					this.sound.playVoice1(31);
				} else if(this.sceneTimer < 590 && this.sceneTimer > 588){
					this.sound.playVoice2(32);
				} else if(this.sceneTimer < 610 && this.sceneTimer > 608){
					this.android17.cinematic = true;
					this.android17.cine = 8;
					this.sound.playVoice2(26);
				} else if(this.sceneTimer < 650 && this.sceneTimer > 648){
					this.android18.cinematic = false;
					this.sound.playVoice1(33);
					this.vegeta.cinematic = true;
					this.vegeta.cine = 2;
				} else if(this.sceneTimer < 680){
					
				} else {
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
				
				if(this.sceneNum == 4 && this.battle == 2 && this.trueEnding == false){ // Ending False
				this.sceneTimer++;
				//this.sceneTimer = 415;
				if(this.sceneTimer < 2){
					this.android17.superSpeed = false;
					this.android18.superSpeed = false;
					this.environment.dark = true;
					this.sound.playBGAudioScene(11);
					this.sound.playVoice1(38);
					this.tempPosition = this.android17.position.y;
					this.tempDirLeft = this.android17.left;
					this.android17 = new app.Android17(this.android17.position.x,this.vegeta);
					this.android17.position.y = this.tempPosition;
					if(this.tempDirLeft == false){
						this.android17.left = false;
						this.android17.right = true;
					} else {
						this.android17.left = true;
						this.android17.right = false;
					}
					//this.android17.hover = false;
					this.android17.decision = -1;
					if(this.android17.position.y < 620){
						this.android17.air = true;
						this.android17.flying = false;
						this.android17.hover = false;
					}
					if(this.android17.city == true){
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
					if(this.support[0].position.x < 500){
						this.support[0].right = true;
						this.support[0].left = false;
					} else {
						this.support[0].right = false;
						this.support[0].left = true;
					}
					if(this.support[1].position.x < 500){
						this.support[1].right = true;
						this.support[1].left = false;
					} else {
						this.support[1].right = false;
						this.support[1].left = true;
					}
				}
				else if(this.sceneTimer < 40){
					//Nothing
				} else if(this.sceneTimer < 51){
					this.sound.playVoice2(39);
				} else if(this.sceneTimer < 67 && this.sceneTimer > 65){
					this.sound.playVoice1(40);
				} else if(this.sceneTimer < 80 && this.sceneTimer > 78){
					this.sound.playVoice2(41);
					if(this.vegeta.right == true){
						this.android17 = new app.Android17(500,this.vegeta);
						this.android17.position.y = this.android17.GROUND.y;
						this.android17.position.x = this.vegeta.position.x + 200;
						this.android17.superSpeed = true;
						this.android17.appear = true;
						this.android17.right = false;
						this.android17.left = true;
					} else if(this.vegeta.left == true){
						this.android17 = new app.Android17(500,this.vegeta);
						this.android17.position.y = this.android17.GROUND.y;
						this.android17.position.x = this.vegeta.position.x - 200;
						this.android17.superSpeed = true;
						this.android17.appear = true;
						this.android17.right = true;
						this.android17.left = false;
					}
					this.android17.cine = 1;
					this.android17.cinematic = true;
				} else if(this.sceneTimer < 120 && this.sceneTimer > 118){
					this.sound.playVoice1(42);
					if(this.vegeta.right == true){
						this.android18.fight = true;
						this.android18.appear = true;
						this.android18.superSpeed = true;
						this.android18.position.y = this.android18.GROUND.y;
						this.android18.position.x = this.vegeta.position.x + 110;
						this.android18.right = true;
						this.android18.left = true;
						this.android17.fight = false;
					} else if(this.vegeta.left == true){
						this.android18.fight = true;
						this.android18.appear = true;
						this.android18.superSpeed = true;
						this.android18.position.y = this.android18.GROUND.y;
						this.android18.position.x = this.vegeta.position.x - 110;
						this.android18.right = true;
						this.android18.left = false;
						this.android17.fight = true;
					}
					
				} else if(this.sceneTimer < 140 && this.sceneTimer > 138){
					this.sound.playVoice2(43);
					this.android17.cinematic = false;
				} else if(this.sceneTimer < 150 && this.sceneTimer > 148){
					this.android18.cine = 1;
					this.android18.cinematic = true;
					this.sound.playEffect(8);
				} else if(this.sceneTimer < 160 && this.sceneTimer > 158){
					this.sound.playVoice1(44);
				} else if(this.sceneTimer < 175 && this.sceneTimer > 173){
					if(this.savesGohan > .5){ //Tien
						this.sound.playVoice2(45);
					} else { //Krillin
						this.sound.playVoice2(46);
					}
				} else if(this.sceneTimer < 185 && this.sceneTimer > 183){
					//TELEPORT AND PREPAPE SOLAR FLARE
					if(this.savesGohan > .5){ //Tien
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
					} else { //Krillin
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
				} else if(this.sceneTimer > 184 && this.sceneTimer < 260){
					//TELEPORT AND PREPAPE SOLAR FLARE
					if(this.sceneTimer < 230){
					if((this.sceneTimer % 2) == 0){
						if(this.savesGohan > .5){ //Tien
							this.support[0].flying = true;
						} else { //Krillin
							this.support[1].flying = true;
						}
					} else {
						if(this.savesGohan > .5){ //Tien
							this.support[0].jumpVelocity.y = 0;
							this.support[0].flying = false;
						} else { //Krillin
							this.support[1].jumpVelocity.y = 0;
							this.support[1].flying = false;
						}
					}
					}
					
					if(this.sceneTimer < 190 && this.sceneTimer > 188){
					if(this.savesGohan > .5){ //Tien
						this.sound.playTaunt7(11);
					} else { //Krillin
						this.sound.playTaunt8(7);
					}
				} else if(this.sceneTimer < 200 && this.sceneTimer > 198){
					this.android18.cinematic = false;
					this.sound.playEffect(35);
					this.environment.superFlash = true;
				} else if(this.sceneTimer < 214 && this.sceneTimer > 212){
					this.environment.decay = true;
					this.android17.cinematic = true;
					this.android17.cine = 5;
					this.android18.cinematic = true;
					this.android18.cine = 3;
					//this.sound.playVoice2(18);
				} else if(this.sceneTimer < 220 && this.sceneTimer > 218){
					this.sound.playVoice1(48);
					//this.environment.decay = true;
					//this.sound.playVoice2(18);
				} else if(this.sceneTimer < 230 && this.sceneTimer > 228){
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
				} else if(this.sceneTimer < 260 && this.sceneTimer > 258){
					this.android17.cine = 10;
					this.android18.cine = 9;
					if(this.savesGohan > .5){ //Tien
						this.sound.playVoice2(49);
					} else { //Krillin
						this.sound.playVoice2(50);
					}
				} 
				} else if(this.sceneTimer < 290 && this.sceneTimer > 288){
					this.sound.playVoice2(51);
				} else if(this.sceneTimer < 300 && this.sceneTimer > 298){
					this.android18.cine = 4;
					this.android18.cinematic = true;
					//this.android17.position.y -= 20;
					//this.android18.position.y -= 20;
					//this.sound.playVoice2(52);
					/* this.sound.playVoice2(20); //take this
					this.sound.playEffect(31);
					this.environment.superFlash = true; */
				}  else if(this.sceneTimer < 301 && this.sceneTimer > 299){
					this.android17.cine = 6;
					this.android17.cinematic = true;
					this.sound.playEnergyAttack(27);
					//this.android17.position.y -= 20;
					//this.android18.position.y -= 20;
					//this.sound.playVoice2(52);
					/* this.sound.playVoice2(20); //take this
					this.sound.playEffect(31);
					this.environment.superFlash = true; */
				}else if(this.sceneTimer < 320 && this.sceneTimer > 318){
					this.sound.playVoice2(53);
					/* this.roundScore += 200;
					this.environment.buildingActive = false;
					this.sound.playBGAudioScene(6);
					this.yamchaDead = true;
					this.chaotzuDead = true; */
				} else if(this.sceneTimer < 321 && this.sceneTimer > 319){
					this.sound.playVoice1(52);
					/* this.roundScore += 200;
					this.environment.buildingActive = false;
					this.sound.playBGAudioScene(6);
					this.yamchaDead = true;
					this.chaotzuDead = true; */
				} else if(this.sceneTimer < 330 && this.sceneTimer > 328){
					/* this.sound.playVoice2(21);
					this.environment.shake = true;
					this.environment.decay = true; */
					this.sound.playEffectLoud(40); //Maybe make louder
					this.environment.superFlash = true;
					this.environment.shake = true;
				} else if(this.sceneTimer < 400 && this.sceneTimer > 398){
					this.environment.fadeOut = true;
				} else if(this.sceneTimer < 460){
					
				} else {
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
				
				if(this.sceneNum == 4 && this.battle == 2 && this.trueEnding == true){ // Ending TRUE
				this.sceneTimer++;
				//this.sceneTimer = 415;
				
				if(this.sceneTimer < 533 && this.sceneTimer > 415){
				    if(this.vegeta.right == true){
					  this.android18.position.x += .8;
					  this.android17.position.x += .8;
					} else {
					  this.android18.position.x -= .8;
					  this.android17.position.x -= .8;
					}
			    } else if(this.sceneTimer < 534 && this.sceneTimer > 532){
				    if(this.vegeta.right == true){
					  this.android18.velocity.x += 25;
					} else {
					  this.android18.velocity.x -= 25;
					}

					this.android18.decelerate();
			    }
				
				if(this.sceneTimer < 2){
					this.android17.superSpeed = false;
					this.android18.superSpeed = false;
					this.environment.dark = true;
					this.sound.playBGAudioScene(12);
					this.sound.playVoice1(54);
					this.environment.braced = false;
					this.tempPosition = this.android17.position.y;
					this.tempDirLeft = this.android17.left;
					this.android17 = new app.Android17(this.android17.position.x,this.vegeta);
					this.android17.position.y = this.tempPosition;
					if(this.tempDirLeft == false){
						this.android17.left = false;
						this.android17.right = true;
					} else {
						this.android17.left = true;
						this.android17.right = false;
					}
					//this.android17.hover = false;
					this.android17.decision = -1;
					if(this.android17.position.y < 620){
						this.android17.air = true;
						this.android17.flying = false;
						this.android17.hover = false;
					}
					if(this.android17.city == true){
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
					if(this.vegeta.right == true){
						this.vegeta = new app.Vegeta(500,3,this.android18);
						this.vegeta.position.y = this.vegeta.GROUND.y;
						this.vegeta.position.x = this.vegeta.LEFTWALL.x + 50;
						this.vegeta.superSpeed = true;
						this.vegeta.appear = true;
						this.vegeta.right = true;
						this.vegeta.left = false;
					} else {
						this.vegeta = new app.Vegeta(500,3,this.android18);
						this.vegeta.position.y = this.vegeta.GROUND.y;
						this.vegeta.position.x = this.vegeta.RIGHTWALL.x - 50;
						this.vegeta.superSpeed = true;
						this.vegeta.appear = true;
						this.vegeta.right = false;
						this.vegeta.left = true;
					}
					this.vegeta.cinematic = true;
					this.vegeta.cine = 1;
					
				}
				else if(this.sceneTimer < 15 && this.sceneTimer > 13){
					this.sound.playVoice1(55);
				}
				else if(this.sceneTimer < 40 && this.sceneTimer > 38){
					//this.sound.playVoice1(55);
					if(this.vegeta.right == true){
						this.android17 = new app.Android17(500,this.vegeta);
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
					} else if(this.vegeta.left == true){
						this.android17 = new app.Android17(500,this.vegeta);
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
				} else if(this.sceneTimer < 45 && this.sceneTimer > 43){
					this.sound.playVoice2(56);
				} else if(this.sceneTimer < 60 && this.sceneTimer > 58){
					this.sound.playVoice1(57);
				} else if(this.sceneTimer < 100 && this.sceneTimer > 98){
					this.sound.playVoice2(58);
					this.vegeta.cine = 0;
				} else if(this.sceneTimer < 110 && this.sceneTimer > 108){
					this.vegeta.cinematic = false;
					this.vegeta.charging = true;
					this.sound.playEffect(28);
					//app.main.sound.playEffect(28);
					this.environment.powerUp = true;
				} else if(this.sceneTimer < 130 && this.sceneTimer > 128){
					this.sound.playVoice2(66);
				} else if(this.sceneTimer < 150 && this.sceneTimer > 148){
					this.android17.cinematic = true;
					this.android17.cine = 9;
				} else if(this.sceneTimer < 155 && this.sceneTimer > 153){
					this.sound.playVoice1(59);
				} else if(this.sceneTimer < 160 && this.sceneTimer > 158){
					this.sound.playSpecialReaction(4);
				} else if(this.sceneTimer < 174 && this.sceneTimer > 159){
					this.android17.cinematic = true;
					this.android17.cine = 2;
					if(this.android17.right == true){
						this.android17.moveRight();
					} else {
						this.android17.moveLeft();
					}
					this.android17.position.y -= 3;
					if(this.sceneTimer < 170 && this.sceneTimer > 168){
						this.sound.playVoice2(67);
						app.main.sound.playEffect(43);
						this.vegeta.almostSS = true;
					}
				} else if(this.sceneTimer < 178 && this.sceneTimer > 176){
					this.sound.playVoice2(69);
					this.environment.superFlash = true;
					this.vegeta.superForm = true;
					this.environment.colorSky = true;
					this.sound.playVoice1(60);
					this.sound.playEffect(44);
					this.sound.playBackground(0);
				} else if(this.sceneTimer < 205 && this.sceneTimer > 203){
					//this.environment.superFlash = false;
					this.android17.cinematic = false;
					this.sound.playVoice2(68);
					this.environment.decay = true;
				} else if(this.sceneTimer < 206 && this.sceneTimer > 204){
					this.vegeta.almostSS = true;
				} else if(this.sceneTimer < 210 && this.sceneTimer > 208){
					//this.environment.decay = true;
					this.android18.cinematic = true;
					this.android18.cine = 3;
					this.sound.playBGAudioScene(13);
					if(this.vegeta.left == true){
						this.android17.position.x = 600;
						this.android17.position.y = 500;
						this.android17.end = true;
					} else if(this.vegeta.right == true){
						this.android17.position.x = 300;
						this.android17.position.y = 500;
						this.android17.end = true;
					}
					this.sound.playVoice1(88);
					this.roundScore2 -= 250;
				} else if(this.sceneTimer < 222 && this.sceneTimer > 210){
					if(this.vegeta.left == true){
						this.android17.position.x -= 70;
					} else if(this.vegeta.right == true){
						this.android17.position.x += 70;
					}
					this.vegeta.almostSS = true;
					this.vegeta.lockSS = true;
					//this.android17.position.y += 12;
				} else if(this.sceneTimer < 234 && this.sceneTimer > 232){
					//this.android17.position.y += 12;
					this.vegeta.lockSS = false;
				} else if(this.sceneTimer < 238 && this.sceneTimer > 236){
					this.sound.playIntro(57);
				} else if(this.sceneTimer < 240 && this.sceneTimer > 238){
					this.android18.cinematic = false;
					this.sound.playVoice2(62);
				} else if(this.sceneTimer < 260 && this.sceneTimer > 258){
					this.sound.playVoice1(61);
					if(this.vegeta.right == true){
						this.android17 = new app.Android17(500,this.vegeta);
						this.android17.position.y = this.android17.GROUND.y;
						this.android17.position.x = this.vegeta.RIGHTWALL.x;
						this.android17.superSpeed = true;
						this.android17.appear = true;
						this.android17.right = false;
						this.android17.left = true;
					} else if(this.vegeta.left == true){
						this.android17 = new app.Android17(500,this.vegeta);
						this.android17.position.y = this.android17.GROUND.y;
						this.android17.position.x = this.vegeta.LEFTWALL.x;
						this.android17.superSpeed = true;
						this.android17.appear = true;
						this.android17.right = true;
						this.android17.left = false;
					}
					this.android17.cinematic = true;
					this.android17.cine = 3;
				} else if(this.sceneTimer < 290 && this.sceneTimer > 288){
					this.sound.playVoice2(63);
				} else if(this.sceneTimer < 340 && this.sceneTimer > 338){
					this.sound.playVoice1(64);
					this.android18.cinematic = true;
					this.android18.cine = 8;
				} else if(this.sceneTimer < 380 && this.sceneTimer > 378){
					this.sound.playVoice2(65);
				} else if(this.sceneTimer < 385 && this.sceneTimer > 383){
					this.environment.superFlash = true;
					this.environment.decay = true;
					this.environment.shake = true;
					this.vegeta.stun = false;
					this.vegeta.cinematic = false;
					this.vegeta.superSpeed = true;
					this.vegeta.position.x = this.android18.position.x - 50;
				} else if(this.sceneTimer < 390){
					
				} else {
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
				
				if(this.sceneNum == 5 && this.battle == 3 && this.trueEnding == true){ // Ending TRUE FINAL
				this.sceneTimer++;
				//this.sceneTimer = 415;
				if(this.sceneTimer < 2){
					this.android17.superSpeed = false;
					this.android18.superSpeed = false;
					this.environment.dark = true;
					this.sound.playBGAudioScene(15);
					if(this.android17.position.y < 620){
						this.android17.air = true;
						this.android17.flying = false;
						this.android17.hover = false;
					}
					this.android17.stun = true;
					this.android18.stun = true;
				} else if(this.sceneTimer < 20 && this.sceneTimer > 18){
					this.sound.playVoice1(70);
				} else if(this.sceneTimer < 53 && this.sceneTimer > 51){
					this.sound.playTaunt6(36);
				} else if(this.sceneTimer < 55 && this.sceneTimer > 53){
					this.vegeta.trueDead = true;
					//this.sound.playTaunt6(36);
					this.sound.playSpecialReaction(2);
				} else if(this.sceneTimer < 70 && this.sceneTimer > 68){
					this.target = false;
					this.android18.fight = true;
					this.android18.superSpeed = true;
					this.android18.appear = true;
					if(this.android17.left == true){
						this.android18.position.x = this.android17.position.x - 100;
						this.android18.right = true;
						this.android18.left = false;
					} else if(this.android17.right == true){
						this.android18.position.x = this.android17.position.x + 100;
						this.android18.right = false;
						this.android18.left = true;
					}
					
				} else if(this.sceneTimer < 80 && this.sceneTimer > 78){
					this.sound.playVoice1(71);
				} else if(this.sceneTimer < 110 && this.sceneTimer > 108){
					this.sound.playVoice1(72);
					this.android17.cinematic = true;
					this.android17.cine = 4;
				} else if(this.sceneTimer < 145 && this.sceneTimer > 143){
					this.sound.playVoice2(73);
					this.android18.cinematic = true;
					this.android18.cine = 5;
				} else if(this.sceneTimer < 190 && this.sceneTimer > 188){
					this.android17.cinematic = false;
				} else if(this.sceneTimer < 200 && this.sceneTimer > 198){
					this.sound.playVoice1(74);
				} else if(this.sceneTimer < 259 && this.sceneTimer > 248){
					this.android17.stun = false;
					this.android17.flying = true;
					this.android17.air = true;
					//this.android17.position.y -= 5; FLYING
				} else if(this.sceneTimer < 260 && this.sceneTimer > 258){
					this.android17.flying = false;
					this.android17.superSpeed = true;
				} else if(this.sceneTimer < 262 && this.sceneTimer > 260){
					this.android17.gone = true;
					this.android17.vanish = true;
				} else if(this.sceneTimer < 280 && this.sceneTimer > 278){
					this.sound.playVoice2(75);
					this.android18.cine = 7;
				} else if(this.sceneTimer < 290 && this.sceneTimer > 288){
					this.android18.fight = true;
					this.android18.superSpeed = true;
					this.android18.appear = true;
				} else if(this.sceneTimer < 394 && this.sceneTimer > 290){
					this.android18.vanish = true;
					this.environment.currentSmoke += .3;
				} else if(this.sceneTimer < 395 && this.sceneTimer > 393){
					this.environment.android16 = true;
				} else if(this.sceneTimer < 396 && this.sceneTimer > 394){
					this.environment.tele16 = true;
					app.main.sound.playSpecialReaction(20);
				} else if(this.sceneTimer < 400 && this.sceneTimer > 398){
					this.sound.playVoice2(76);
				} else if(this.sceneTimer < 430 && this.sceneTimer > 428){
					this.sound.playVoice2(77);
				} else if(this.sceneTimer < 470 && this.sceneTimer > 468){
					this.sound.playEffectLoud(46);
				} else if(this.sceneTimer < 480 && this.sceneTimer > 478){
					this.sound.playVoice2(78);
				} else if(this.sceneTimer < 525 && this.sceneTimer > 523){
					this.environment.braced = true;
					this.sound.playEffectLoud(45);
				} else if(this.sceneTimer < 530 && this.sceneTimer > 528){
					this.sound.playVoice2(79);
				} else if(this.sceneTimer < 540 && this.sceneTimer > 538){
					app.main.sound.playSpecialReaction(19);
					this.environment.tele16 = true;
					this.environment.fadeOut = true;
				} else if(this.sceneTimer < 541 && this.sceneTimer > 539){
					this.environment.android16 = false;
				} else if(this.sceneTimer < 600){
					
				} else {
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
			
			
			if((this.gameState == this.GAME_STATE.DEFAULT || this.gameState == this.GAME_STATE.TUTORIAL)){
			
			//CHECK FOR MOVEMENT (KEY STROKES)
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT] != true && myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT] != true){
				//standing or flying still
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT] && myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT] != true && this.android18.stun == false && (this.android18.hard == false || this.android18.down == true) && this.android18.taunting == false && this.android18.blocking == false && this.android18.powerMove == false){
				if(this.activeSupport == false){
				if(attackHitTest(this.android18,this.vegeta) == true && (this.android18.right == true) && (this.android18.position.x > this.vegeta.position.x - 60 || this.android18.reverse == true)){
					// Do Nothing
				} else {
					this.android18.moveRight();
					//this.vegeta.moveRight();
				}
				} else {
					if((attackHitTest(this.android18,this.vegeta) == true || (hitTest(this.android18,this.support[0]) == true && this.support[0].vanish == false) || (hitTest(this.android18,this.support[1]) == true && this.support[1].vanish == false)) && (this.android18.right == true)){
					// Do Nothing
					} else {
						this.android18.moveRight();
						//this.vegeta.moveRight();
					}
				}
				
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT] && myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT] != true && this.android18.stun == false && (this.android18.hard == false || this.android18.down == true) && this.android18.taunting == false && this.android18.blocking == false && this.android18.powerMove == false){
				if(this.activeSupport == false){
				if(attackHitTest(this.android18,this.vegeta) == true && (this.android18.left == true) && (this.android18.position.x < this.vegeta.position.x + 60 || this.android18.reverse == true)){
					// Do Nothing
				} else {
					this.android18.moveLeft();
					//this.vegeta.moveLeft();
				}
				} else {
					if((attackHitTest(this.android18,this.vegeta) == true || (hitTest(this.android18,this.support[0]) == true && this.support[0].vanish == false) || (hitTest(this.android18,this.support[1]) == true && this.support[1].vanish == false)) && (this.android18.left == true)){
					// Do Nothing
					} else {
						this.android18.moveLeft();
						//this.vegeta.moveLeft();
					}
				}
				
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_UP] && myKeys.keydown[myKeys.KEYBOARD.KEY_DOWN] != true && this.android18.down == false && (this.android18.stun == false && this.android18.fight == false || (this.android18.blocking == true || this.android18.taunting == true)) && this.android18.hard == false && this.android18.fieldOn == false){
				this.android18.up = true;
				this.android18.flying = true;
				this.android18.jump();
				this.android18.decend = false;
				this.android18.down = false;
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_DOWN] && this.android18.air == true && this.android18.stun == false && this.android18.hard == false && this.android18.blocking == false && this.android18.taunting == false && this.android18.attacking == false){
				this.android18.down = true;
				this.android18.decend = true;
			}		
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_UP] != true){
			
				this.android18.up = false;
				this.android18.flying = false;
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_DOWN] != true){
				this.android18.down = false;
				this.android18.decent = false;
				if(this.android18.fight == false){
					this.android18.down = false;
				}
			}
			
			
			// TEST FOR ACTIONS (KEY STROKES)
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_A] && this.android18.fight == false && this.android18.stun == false && this.android18.exhausted == false && this.android18.taunting == false && this.keyHeldA == false){
				this.keyHeldA = true;
				this.chance = Math.random();
				//console.log("Mine");
				/*
				if(myKeys.keydown[myKeys.KEYBOARD.KEY_DOWN]){ //OLD FALLING KICK CODE
					this.android18.fallingKick = true;
					this.android18.intensify = true;
				
				*/
				//AI TEST CODE
				
				if(myKeys.keydown[myKeys.KEYBOARD.KEY_D] != true){
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
				
				if(myKeys.keydown[myKeys.KEYBOARD.KEY_D] != true){
					this.android18.attacking = true;
					this.android18.fight = true;
				} else {
					this.android18.intensify = true;
					this.android18.attacking = true;
					this.android18.fight = true;
				}
				
				if(attackHitTest(this.android18, this.vegeta) == true && this.detected == false && this.android18.stun == false && this.android18.fallingKick == false){
					this.detected = true;
				}
				if(hardAttackHitTest(this.android18, this.vegeta) == true && this.detectedHard == false && this.android18.stun == false && (this.android18.air == false || this.chance <= .5) && this.android18.fallingKick == false){
					this.detectedHard = true;
				} else if((this.android18.intensify == true || this.android18.hard == true) && this.android18.fallingKick == false){
					if(this.android18.randomEffect >= .7){
						this.sound.playBasicAttack(8);
					} else if(this.android18.randomEffect > .3 && this.android18.randomEffect < .7){
						this.sound.playBasicAttack(9);
					} else {
						this.sound.playBasicAttack(10);
					}
		
				}
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_S] && this.android18.fight == false && this.android18.stun == false && this.android18.energy > 32 && this.android18.down == false && this.android18.taunting == false && myKeys.keydown[myKeys.KEYBOARD.KEY_DOWN] != true && this.keyHeldS == false){
				this.chance = Math.random();
				//AI TEST CODE
				
				if(myKeys.keydown[myKeys.KEYBOARD.KEY_D] != true){
					//this.aiChoiceSupport2 = .99;
					//this.aiChoice2 = .99;
					//this.vegeta.fight = true;
					//this.vegeta.attacking = true;
					//this.vegeta.stun = true;
					//this.aiChoice3 = 10;
				} else {
					//this.aiChoice2 = .1;
				}
				
				if(myKeys.keydown[myKeys.KEYBOARD.KEY_D] != true){
					this.android18.attacking = true;
					this.android18.blasting = true;
					this.android18.fight = true;
				} else {
					if(this.cooldownAndroid18 > 30 && this.android18.energy > 40) {
						this.cooldownAndroid18 = 0;
						this.android18.intensify = true;
						this.android18.attacking = true;
						this.android18.blasting = true;
						this.android18.fight = true;
					} else if(myKeys.keydown[myKeys.KEYBOARD.KEY_D] == true && this.android18.energy < 41){
						this.sound.playEffectLoud(52);
					}
				}
				
				this.android18.decel = this.android18.velocity.clone();
				this.keyHeldS = true;
				
			} else if(myKeys.keydown[myKeys.KEYBOARD.KEY_S] == true && this.android18.energy < 33){
				this.sound.playEffectLoud(52);
			}
			
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_Q] == true && this.keyHeldQ == false && (this.android18.fight == false || this.android18.blocking == true) && this.android18.stun == false && this.android18.superSpeed == false && this.android18.fieldOn == false && this.android18.energy > 36 && myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT] != true && myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT] != true){
				this.android18.appear = false;
				this.android18.superSpeed = true;
				this.keyHeldQ = true;
				this.android18.fight = true;
			} else if(myKeys.keydown[myKeys.KEYBOARD.KEY_Q] == true && this.android18.energy < 37){
				this.sound.playEffectLoud(52);
			}
			
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT] == true && (this.android18.fight == false || this.android18.blocking == true) && this.android18.stun == false && this.android18.superSpeed == false && this.android18.fieldOn == false && this.android18.energy > 36){
				this.android18.teleLeft = false;
				this.android18.teleUp = false;
				this.android18.teleDown = false;
				
				if(myKeys.keydown[myKeys.KEYBOARD.KEY_Q] == true && this.android18.reverse == true){
					this.android18.teleRight = true;
					this.android18.appear = false;
					this.android18.superSpeed = true;
					this.keyHeldQ = true;
					this.android18.fight = true;
				}
			} else if (myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT] == true && (this.android18.fight == false || this.android18.blocking == true) && this.android18.stun == false && this.android18.superSpeed == false && this.android18.fieldOn == false && this.android18.energy > 36){
				this.android18.teleRight = false;
				this.android18.teleUp = false;
				this.android18.teleDown = false;
				
				if(myKeys.keydown[myKeys.KEYBOARD.KEY_Q] == true && this.android18.reverse == true){
					this.android18.teleLeft = true;
					this.android18.appear = false;
					this.android18.superSpeed = true;
					this.keyHeldQ = true;
					this.android18.fight = true;
				}
			} else if (myKeys.keydown[myKeys.KEYBOARD.KEY_UP] == true && (this.android18.fight == false || this.android18.blocking == true) && this.android18.stun == false && this.android18.superSpeed == false && this.android18.fieldOn == false && this.android18.energy > 36){
				this.android18.teleRight = false;
				this.android18.teleLeft = false;
				this.android18.teleDown = false;
				
				
				if(myKeys.keydown[myKeys.KEYBOARD.KEY_Q] == true && this.android18.reverse == true){
					this.android18.teleUp = true;
					this.android18.appear = false;
					this.android18.superSpeed = true;
					this.keyHeldQ = true;
					this.android18.fight = true;
				}
			} else if (myKeys.keydown[myKeys.KEYBOARD.KEY_DOWN] == true && (this.android18.fight == false || this.android18.blocking == true) && this.android18.stun == false && this.android18.superSpeed == false && this.android18.fieldOn == false && this.android18.energy > 36){
				this.android18.teleRight = false;
				this.android18.teleLeft = false;
				this.android18.teleUp = false;
				
				if(myKeys.keydown[myKeys.KEYBOARD.KEY_Q] == true && this.android18.reverse == true){
					this.android18.teleDown = true;
					this.android18.appear = false;
					this.android18.superSpeed = true;
					this.keyHeldQ = true;
					this.android18.fight = true;
				}
			}
			
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_Q] == true && this.keyHeldQ == false && (this.android18.fight == false || this.android18.blocking == true) && this.android18.stun == false && this.android18.superSpeed == false && this.android18.fieldOn == false && this.android18.energy > 36){
				this.android18.teleRight = false;
				this.android18.teleLeft = false;
				this.android18.teleUp = false;
				this.android18.teleDown = false;
				
				if(myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT] == true && this.android18.reverse == true){
					this.android18.teleRight = true;
				} else if(myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT] == true && this.android18.reverse == true){
					this.android18.teleLeft = true;
				}
				
				if(myKeys.keydown[myKeys.KEYBOARD.KEY_UP] == true){
					this.android18.teleUp = true;
				} else if(myKeys.keydown[myKeys.KEYBOARD.KEY_DOWN] == true){
					this.android18.teleDown = true;
				}
				
				this.android18.appear = false;
				this.android18.superSpeed = true;
				this.keyHeldQ = true;
				this.android18.fight = true;
			} else if(myKeys.keydown[myKeys.KEYBOARD.KEY_Q] == true && this.android18.energy < 37){
				this.sound.playEffectLoud(52);
			}
			
			
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_UP] != true){
				this.android18.teleUp = false;
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_DOWN] != true){
				this.android18.teleDown = false;
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT] != true){
				this.android18.teleLeft = false;
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT] != true){
				this.android18.teleRight = false;
			}
			
			
			
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_E] == true && this.keyHeldE == false && this.android18.fight == false && this.android18.stun == false && this.android18.taunting == false){
				this.keyHeldE = true;
				this.android18.intensify = true;
				this.android18.taunting = true;
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_W] && this.android18.fight == false && this.android18.stun == false && this.android18.taunting == false && this.keyHeldW == false){
				if(myKeys.keydown[myKeys.KEYBOARD.KEY_D] != true && this.android18.exhausted == false){
					this.android18.blocking = true;
					if(attackHitTest(this.android18, this.vegeta) == true){
						this.android18.stamina += 3;
					}
				} else if(myKeys.keydown[myKeys.KEYBOARD.KEY_D] == true && this.android18.energy > 50){ //field
					this.android18.blocking = true;
					this.android18.fieldOn = true;
					this.android18.energy -= 10;
				} else if(myKeys.keydown[myKeys.KEYBOARD.KEY_D] == true && this.android18.energy < 51){
					this.sound.playEffectLoud(52);
				}
				this.keyHeldW = true;
				this.android18.fight = true;
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_A] != true){
				this.keyHeldA = false;
				if(myKeys.keydown[myKeys.KEYBOARD.KEY_DOWN] != true) {
					this.android18.fallingKick = false;
				}
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_T] == true && this.keyHeldT == false){ //Toggle (tutorial)
				this.keyHeldT = true;
				if(this.toggle1 == false){
					this.toggle1 = true;
					this.sound.playEffect(65);
				} else if(this.toggle2 == false){
					this.toggle2 = true;
					this.sound.playEffect(65);
				} else {
					this.sound.playEffect(65);
					this.toggle1 = false;
					this.toggle2 = false;
				}
				
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_J] == true){ //CHEAT CODE
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
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_J] != true){ //CHEAT CODE
				//this.environment.shake = true;
				//this.vegeta.endurance = 1;
				//this.vegeta.health = 1;
				//this.vegeta.blastTrigger = false;
				//this.support[1].triggerBlast = false;
				//this.android17.hurtBlasting = false;
				
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_T] != true){ //CHEAT CODE
				this.keyHeldT = false;
				
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_S] != true){
				this.keyHeldS = false;
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_Q] != true){
				this.keyHeldQ = false;
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_E] != true){
				this.keyHeldE = false;
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_W] != true){
				if(this.android18.fieldOn == false){
				if(this.keyHeldW == true && this.android18.superSpeed == false){
					this.android18.blocking = false;
					this.android18.fight = false;
					this.keyHeldW = false;
				}
				this.keyHeldW = false;
				this.android18.blocking = false;
				}
			}
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_D] != true && this.android18.fight == false){
				this.android18.intensify = false;
			}
			
			}
			
			//CHANGE DIRECTIONS OF CHARACTERS
			if(this.scene == false || this.gameState == this.GAME_STATE.TUTORIAL){
			if((app.main.vegeta.air == false && app.main.android18.air == true) ||
				(app.main.vegeta.air == true && app.main.android18.air == false)) {
				if(app.main.vegeta.position.x < app.main.android18.position.x - 140){
					if((this.android18.stun != true || this.android18.superSpeed == true) && this.vegeta.superSpeed != true && this.android18.hard != true && this.android18.blasting != true && this.android18.fieldOn != true && this.android18.end != true){
						app.main.android18.left = true;
						app.main.android18.right = false;
					}
					if((this.vegeta.stun != true || this.vegeta.superSpeed == true) && this.android18.superSpeed != true && this.vegeta.hard != true && this.vegeta.blasting != true && this.vegeta.end != true && this.vegeta.focus17 == false){
						app.main.vegeta.left = false;
						app.main.vegeta.right = true;	
						
					}
				} else if(app.main.vegeta.position.x > app.main.android18.position.x + 100){
					if((this.android18.stun != true || this.android18.superSpeed == true) && this.vegeta.superSpeed != true && this.android18.hard != true && this.android18.blasting != true && this.android18.fieldOn != true && this.android18.end != true){
						app.main.android18.right = true;
						app.main.android18.left = false;
					}
					if((this.vegeta.stun != true || this.vegeta.superSpeed == true) && this.android18.superSpeed != true && this.vegeta.hard != true && this.vegeta.blasting != true && this.vegeta.end != true && this.vegeta.focus17 == false){
						app.main.vegeta.left = true;
						app.main.vegeta.right = false;
					}
				}
			} else {
				if(app.main.vegeta.position.x < app.main.android18.position.x + 20){
					if((this.android18.stun != true || this.android18.superSpeed == true) && this.vegeta.superSpeed != true && this.android18.hard != true && this.android18.blasting != true && this.android18.fieldOn != true && this.android18.end != true){
						app.main.android18.left = true;
						app.main.android18.right = false;
					}
					if((this.vegeta.stun != true || this.vegeta.superSpeed == true) && this.android18.superSpeed != true && this.vegeta.hard != true && this.vegeta.blasting != true && this.vegeta.end != true && this.vegeta.focus17 == false){
						app.main.vegeta.left = false;
						app.main.vegeta.right = true;
					}
				} else if(app.main.vegeta.position.x > app.main.android18.position.x - 20){
					if((this.android18.stun != true || this.android18.superSpeed == true) && this.vegeta.superSpeed != true && this.android18.hard != true && this.android18.blasting != true && this.android18.fieldOn != true && this.android18.end != true){
						app.main.android18.right = true;
						app.main.android18.left = false;
					}
					if((this.vegeta.stun != true || this.vegeta.superSpeed == true) && this.android18.superSpeed != true && this.vegeta.hard != true && this.vegeta.blasting != true && this.vegeta.end != true && this.vegeta.focus17 == false){
						app.main.vegeta.left = true;
						app.main.vegeta.right = false;
					}
				}
			}
			
			
			//17 Version
			if((app.main.vegeta.air == false && app.main.android17.air == true) ||
				(app.main.vegeta.air == true && app.main.android17.air == false)) {
				if(app.main.vegeta.position.x < app.main.android17.position.x - 140){
					if((this.android17.stun != true || this.android17.superSpeed == true) && this.vegeta.superSpeed != true && this.android17.hard != true && this.android17.blasting != true && this.android17.fieldOn != true && this.android17.end != true){
						app.main.android17.left = true;
						app.main.android17.right = false;
					}
					if((this.vegeta.stun != true || this.vegeta.superSpeed == true) && this.android17.superSpeed != true && this.vegeta.hard != true && this.vegeta.blasting != true && this.vegeta.end != true && this.vegeta.focus17 == true){
						app.main.vegeta.left = false;
						app.main.vegeta.right = true;
					}
				} else if(app.main.vegeta.position.x > app.main.android17.position.x + 100){
					if((this.android17.stun != true || this.android17.superSpeed == true) && this.vegeta.superSpeed != true && this.android17.hard != true && this.android17.blasting != true && this.android17.fieldOn != true && this.android17.end != true){
						app.main.android17.right = true;
						app.main.android17.left = false;
					}
					if((this.vegeta.stun != true || this.vegeta.superSpeed == true) && this.android17.superSpeed != true && this.vegeta.hard != true && this.vegeta.blasting != true && this.vegeta.end != true && this.vegeta.focus17 == true){
						app.main.vegeta.left = true;
						app.main.vegeta.right = false;
					}
				}
			} else {
				if(app.main.vegeta.position.x < app.main.android17.position.x + 20){
					if((this.android17.stun != true || this.android17.superSpeed == true) && this.vegeta.superSpeed != true && this.android17.hard != true && this.android17.blasting != true && this.android17.fieldOn != true && this.android17.end != true){
						app.main.android17.left = true;
						app.main.android17.right = false;
					}
					if((this.vegeta.stun != true || this.vegeta.superSpeed == true) && this.android17.superSpeed != true && this.vegeta.hard != true && this.vegeta.blasting != true && this.vegeta.end != true && this.vegeta.focus17 == true){
						app.main.vegeta.left = false;
						app.main.vegeta.right = true;
					}
				} else if(app.main.vegeta.position.x > app.main.android17.position.x - 20){
					if((this.android17.stun != true || this.android17.superSpeed == true) && this.vegeta.superSpeed != true && this.android17.hard != true && this.android17.blasting != true && this.android17.fieldOn != true && this.android17.end != true){
						app.main.android17.right = true;
						app.main.android17.left = false;
					}
					if((this.vegeta.stun != true || this.vegeta.superSpeed == true) && this.android17.superSpeed != true && this.vegeta.hard != true && this.vegeta.blasting != true && this.vegeta.end != true && this.vegeta.focus17 == true){
						app.main.vegeta.left = true;
						app.main.vegeta.right = false;
					}
				}
			}
			
			
			//CHANGE DIRECTIONS OF CHARACTERS -- SUPPORT
			if(this.activeSupport == true){
			for(var x = 0; x < 2; x++){
			if(this.support[x].position.x < this.support[x].LEFTWALL.x + 100){
				this.support[x].right = true;
				this.support[x].left = false;
			} else if(this.support[x].position.x > this.support[x].RIGHTWALL.x - 100){
				this.support[x].right = false;
				this.support[x].left = true;
			}
			else if((app.main.support[x].air == false && app.main.android18.air == true) ||
				(app.main.support[x].air == true && app.main.android18.air == false)) {
				if(app.main.support[x].position.x < app.main.android18.position.x - 140){
						if((this.support[x].stun != true || this.support[x].superSpeed == true) && this.android18.superSpeed != true && this.support[x].hard != true && this.support[x].blasting != true && this.support[x].end != true && this.vegeta.focus17 == false){
							app.main.support[x].left = false;
							app.main.support[x].right = true;
						
						}
				} else if(app.main.support[x].position.x > app.main.android18.position.x + 100){
						if((this.support[x].stun != true || this.support[x].superSpeed == true) && this.android18.superSpeed != true && this.support[x].hard != true && this.support[x].blasting != true && this.support[x].end != true && this.vegeta.focus17 == false){
							app.main.support[x].left = true;
							app.main.support[x].right = false;
						}
				}
			} else {
				if(app.main.vegeta.position.x < app.main.android18.position.x + 20){
						if((this.support[x].stun != true || this.support[x].superSpeed == true) && this.android18.superSpeed != true && this.support[x].hard != true && this.support[x].blasting != true && this.support[x].end != true && this.vegeta.focus17 == false){
							app.main.support[x].left = false;
							app.main.support[x].right = true;
						}
				} else if(app.main.support[x].position.x > app.main.android18.position.x - 20){
						if((this.support[x].stun != true || this.support[x].superSpeed == true) && this.android18.superSpeed != true && this.support[x].hard != true && this.support[x].blasting != true && this.support[x].end != true && this.vegeta.focus17 == false){
							app.main.support[x].left = true;
							app.main.support[x].right = false;
						}
				}
			}
			
			
			//17 Version
			if(this.support[x].position.x < this.support[x].LEFTWALL.x + 100){
				this.support[x].right = true;
				this.support[x].left = false;
			} else if(this.support[x].position.x > this.support[x].RIGHTWALL.x - 100){
				this.support[x].right = false;
				this.support[x].left = true;
			} else if((app.main.support[x].air == false && app.main.android17.air == true) ||
				(app.main.support[x].air == true && app.main.android17.air == false)) {
				if(app.main.support[x].position.x < app.main.android17.position.x - 140){
						if((this.support[x].stun != true || this.support[x].superSpeed == true) && this.android17.superSpeed != true && this.support[x].hard != true && this.support[x].blasting != true && this.support[x].end != true && this.vegeta.focus17 == true){
							app.main.support[x].left = false;
							app.main.support[x].right = true;
						}
				} else if(app.main.support[x].position.x > app.main.android17.position.x + 100){
						if((this.support[x].stun != true || this.support[x].superSpeed == true) && this.android17.superSpeed != true && this.support[x].hard != true && this.support[x].blasting != true && this.support[x].end != true && this.vegeta.focus17 == true){
							app.main.support[x].left = true;
							app.main.support[x].right = false;
						}
				}
			} else {
				if(app.main.support[x].position.x < app.main.android17.position.x + 20){
						if((this.support[x].stun != true || this.support[x].superSpeed == true) && this.android17.superSpeed != true && this.support[x].hard != true && this.support[x].blasting != true && this.support[x].end != true && this.vegeta.focus17 == true){
							app.main.support[x].left = false;
							app.main.support[x].right = true;
						}
				} else if(app.main.support[x].position.x > app.main.android17.position.x - 20){
						if((this.support[x].stun != true || this.support[x].superSpeed == true) && this.android17.superSpeed != true && this.support[x].hard != true && this.support[x].blasting != true && this.support[x].end != true && this.vegeta.focus17 == true){
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
			if(this.increasing == true && this.iAlpha < 80) {
				this.iAlpha++;
			} else {
				this.increasing = false;
			}
			if(this.increasing == false && this.iAlpha > 20){
				this.iAlpha = this.iAlpha - 1;
			} else {
				this.increasing = true;
			}
			
			if((this.gameState == this.GAME_STATE.DEFAULT || this.gameState == this.GAME_STATE.TUTORIAL)){
			if(hitTest(this.android18, this.vegeta) == true){
				this.touching = true;
				this.android18.fast = false;
				this.vegeta.fast = false;
				this.android18.slow = true;
				this.vegeta.slow = true;
				
				
				if(this.android18.left == true){
					if(this.android18.decel.x < 0){
						this.android18.decel.x = 0;
					}
				} else if(this.android18.right == true){
					if(this.android18.decel.x > 0){
						this.android18.decel.x = 0;
					}
				}
				
				if(this.vegeta.left == true){
					if(this.vegeta.decel.x < 0){
						this.vegeta.decel.x = 0;
					}
				} else if(this.vegeta.right == true){
					if(this.vegeta.decel.x > 0){
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
	},
	
	//Function for making canvas text
	fillText: function(ctx,string, x, y, css, color) {
		ctx.save();
		ctx.font = css;
		ctx.fillStyle = color;
		ctx.fillText(string, x, y);
		ctx.restore();
	},
	
	//Function to calculate change in time
	calculateDeltaTime: function(){
		var now,fps;
		now = performance.now(); 
		fps = 1000 / (now - this.lastTime);
		fps = clamp(fps, 12, 60);
		this.lastTime = now; 
		return 1/fps;
	},
	
	//FUNCTION TO DECIDE THE WINNER AND CHANGE STATES
	barCheckers: function(){
		if(this.gameState != this.GAME_STATE.TUTORIAL){
		if(this.android18.health < 50 && this.dying18 == false){
			this.sound.playTaunt1(Math.round(getRandom(38,40)));
			this.dying18 = true;
		} else if(this.vegeta.health < 50){
			if(this.vegeta.piccolo == true && this.piccoloDying == false){
				this.sound.playTaunt4(Math.round(getRandom(13,15)));
				this.piccoloDying = true;
			} else if(this.vegeta.vegeta == true && this.vegetaDying == false){
				this.sound.playTaunt2(Math.round(getRandom(35,37)));
				this.vegetaDying = true;
			} else if(this.vegeta.gohan == true && this.gohanDying == false){
				this.sound.playTaunt6(Math.round(getRandom(13,15)));
				this.gohanDying = true;
			}
		}
			
		if(this.android18.health < 1 && this.scene == false){
			this.android18.health = 1;
			this.android18.stun = true;
			this.android18.end = true;
			this.vegeta.stun = true;
			this.sound.stopBGAudio();
			this.sound.stopBGAudioTutorial();
			this.sound.stopBGAudioScene();
			//this.vegeta.end = true;
		} else if(this.vegeta.health < 1 && this.scene == false){
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
			if(this.android18.health < 30){
				this.android18.health = 30;
			} else if(this.vegeta.health < 30){
				this.vegeta.health = 30;
			}
		}
	},
	
	//FUNCTION TO DRAW PAUSE
	drawPauseScreen: function(ctx){
		ctx.save();
		ctx.globalAlpha = .02;
		ctx.fillStyle = "rgb(0,34,7)";
		ctx.fillRect(0,0, 1024, 768);
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
		if(this.gameState == this.GAME_STATE.TUTORIAL && this.toggle1 == false){
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
			this.fillText(this.ctx,"...SUSPENSION STATE...", this.WIDTH/2 - 10, this.HEIGHT/2 - 50, "43pt heavy_data", "#c9be03");
			ctx.restore();
			ctx.save();
			ctx.globalAlpha = .1;
			ctx.drawImage(this.redRibbon,445,57);
			this.fillText(this.ctx,"...SUSPENSION STATE...", this.WIDTH/2 - 10, this.HEIGHT/2 - 50, "43pt heavy_data", "white");
			ctx.restore();
			this.fillText(this.ctx,"Press P to resume", this.WIDTH/2, this.HEIGHT/2 + 175, "20pt heavy_data", "white");
		} else {
			/* ctx.save();
			ctx.globalAlpha = .05;
			ctx.fillStyle = "rgb(0,34,7)";
			ctx.fillRect(200,360,600,220);
			ctx.strokeStyle = "black";
			ctx.strokeRect(200,360,600,220);
			ctx.restore(); */
			this.fillText(this.ctx,"...SUSPENSION STATE...", this.WIDTH/2 - 10, this.HEIGHT/2 + 40, "43pt heavy_data", "#c9be03");
			ctx.save();
			ctx.globalAlpha = .1;
			ctx.drawImage(this.redRibbon,445,57);
			this.fillText(this.ctx,"...SUSPENSION STATE...", this.WIDTH/2 - 10, this.HEIGHT/2 + 40, "43pt heavy_data", "white");
			ctx.restore();
			this.fillText(this.ctx,"Press P to resume", this.WIDTH/2, this.HEIGHT/2 + 150, "20pt heavy_data", "white");
		}
		//this.fillText(this.ctx,"...SUSPENSION STATE...", this.WIDTH/2, this.HEIGHT/2 - 37, "43pt heavy_data", "#c9be03");
		//this.fillText(this.ctx,"Press P to resume", this.WIDTH/2, this.HEIGHT/2 + 150, "20pt heavy_data", "white");
		ctx.save();
			//ctx.globalAlpha = .5;
			if(this.gameState == this.GAME_STATE.TUTORIAL && this.toggle2 == false){
				this.fillText(this.ctx,"Controls", this.WIDTH/2 + 400, 335, "32pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"Controls", this.WIDTH/2 + 400, 335, "32pt heavy_data", "white");
			} else {
				this.fillText(this.ctx,"Controls", this.WIDTH/2 + 400, 375, "32pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"Controls", this.WIDTH/2 + 400, 375, "32pt heavy_data", "white");
			}
			this.fillText(this.ctx,"'A': Basic Attack", this.WIDTH/2 + 400, 410, "12pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"'S': Energy Attack", this.WIDTH/2 + 400, 430, "12pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"'Q': Super Speed", this.WIDTH/2 + 400, 450, "12pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"'E': Taunt", this.WIDTH/2 + 400, 470, "12pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"'W': Block", this.WIDTH/2 + 400, 490, "12pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"'D A': Strong Attack", this.WIDTH/2 + 400, 510, "12pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"'D S': Powerful Energy", this.WIDTH/2 + 400, 530, "12pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"'D W': Android Barrier", this.WIDTH/2 + 400, 550, "12pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"'P': Pause", this.WIDTH/2 + 400, 570, "12pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"'Arrow Keys': Move Or Fly", this.WIDTH/2 + 400, 590, "12pt heavy_data", "#c9be03");
		ctx.restore();
		ctx.restore();
	},
	
	// RESETS THE GAME
	reset: function(){
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
	},
	
	//FUNCTION TO DRAW ALL STATES OF THE HUD AND CONTROL MIX/MAX VALUES
	drawHUD: function(ctx){
	
		if(this.gameState == this.GAME_STATE.DEFAULT || this.gameState == this.GAME_STATE.TUTORIAL){
			this.pulsing++;
			this.warnings++;
			ctx.save();
			
			if(this.vegeta.aboveSky == true && (this.android18.aboveSky == true || this.android17.aboveSky == true)) {
				this.superFade = true;
			} else {
				this.superFade = false;
			}
			
			if((this.vegeta.aboveSky == true || this.android18.aboveSky == true) && this.superFade == false) {
				this.fade = true;
			} else {
				this.fade = false;
			}
			
			if(this.android18.position.x > 222 && this.android18.position.x < 802 && this.android18.position.y > 295 && this.android18.position.y < 545) {
				this.extraFade = true;
			} else {
				this.extraFade = false;
			}
			
			if(this.android18.position.x > 800 && this.android18.position.x < 1000 && this.android18.position.y > 245 && this.android18.position.y < 615) {
				this.extraFade2 = true;
			} else {
				this.extraFade2 = false;
			}
			//Coat of darkness
			ctx.save();
			ctx.globalAlpha = .3;
			ctx.fillStyle = "black";
			ctx.fillRect(0,200, 1024, 568);
			ctx.restore();
			
			ctx.save();
			if(this.fade == true){ //FADE
				ctx.globalAlpha = .5;
			} else if(this.superFade == true){ //FADE
				ctx.globalAlpha = .4;
			} else {
				ctx.globalAlpha = .7;
			}
			ctx.fillStyle = "rgb(0,34,7)";
			ctx.fillRect(0,0, 1024, 200);
			ctx.strokeStyle = "rgb(0,0,0)";
			ctx.lineWidth = 5;
			ctx.strokeRect(0,0, 1024, 200);
			ctx.restore();
			
			if(this.android18.energy < 28){
				this.android18.energy = 28;
			}
			if(this.android18.stamina > 100){
				this.android18.exhausted = true;
				this.android18.stamina = 100;
			} 
			if(this.android18.stamina < 28) {
				this.android18.stamina = 28;
			} else if(this.android18.stamina < 64){
				this.android18.exhausted = false;
			}
			if(this.android18.energy > 99){
				this.android18.energy = 100;
			}
			if(this.android18.endurance > 99){
				this.android18.endurance = 100;
			}
		
			if(this.vegeta.energy < 28){
				this.vegeta.energy = 28;
			}
			if(this.vegeta.stamina > 100){
				this.vegeta.exhausted = true;
				this.vegeta.stamina = 100;
			} 
			if(this.vegeta.stamina < 28) {
				this.vegeta.stamina = 28;
			} else if(this.vegeta.stamina < 64){
				this.vegeta.exhausted = false;
			}
			if(this.vegeta.energy > 99){
				this.vegeta.energy = 100;
			}
			if(this.vegeta.endurance > 99){
				this.vegeta.endurance = 100;
			}
			ctx.save();
			if(this.moved == true) {
				ctx.translate(0,570);
			} else {
				//Nothing
			}
			ctx.save();
			//ctx.globalAlpha = (this.iAlpha/100);
			//ctx.drawImage(this.iBackground,0,0);
			ctx.restore();
			
			ctx.save();
			if(this.fade == true){ //FADE
				ctx.globalAlpha = .1;
			} else if(this.superFade == true){ //SUPERFADE
				//console.log("SUPERFADE");
				ctx.globalAlpha = .05;
			} else {
				ctx.globalAlpha = .6;
			}
			ctx.save();
			if(this.fade == false && this.superFade == false){
				ctx.globalAlpha = .7;
			}
			ctx.drawImage(this.redRibbon,445,57);
			ctx.restore();
			if(this.vegeta.vegeta == true && this.vegeta.vanish == false && this.target == true){
				this.fillText(this.ctx,"Target: Vegeta", 130, 40, "20pt heavy_data", "#c9be03");
			} else if(this.vegeta.gero == true){
				this.fillText(this.ctx,"Target: Dr. Gero", 130, 40, "20pt heavy_data", "#c9be03");
			} else  if(this.vegeta.piccolo == true && this.target == true){
				this.fillText(this.ctx,"Target: Piccolo", 130, 40, "20pt heavy_data", "#c9be03");
			} else  if(this.vegeta.gohan == true && this.vegeta.vanish == false && this.battle != 3 && this.target == true){
				this.fillText(this.ctx,"Target: Gohan", 130, 40, "20pt heavy_data", "#c9be03");
			} else  if(this.vegeta.gohan == true && this.vegeta.vanish == false && this.target == true){
				this.fillText(this.ctx,"Target: Gohan!!", 130, 40, "20pt heavy_data", "#c9be03");
			} else if(this.target == false){
				this.fillText(this.ctx,"Target: All Humans", 130, 40, "20pt heavy_data", "#c9be03");
			} else {
				this.fillText(this.ctx,"Target: Undecided", 130, 40, "20pt heavy_data", "#c9be03");
			}
			this.fillText(this.ctx,"Target:", 130, 40, "20pt heavy_data", "white");
			
			this.fillText(this.ctx,"Unit: Android 18", 690, 40, "20pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"Unit:", 690, 40, "20pt heavy_data", "white");
			//this.fillText(this.ctx,"Android 18", 690, 40, "20pt heavy_data", "#c9be03");
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			this.fillText(this.ctx,"18..." + (this.roundScore) + "...18", 509, 40, "20pt heavy_data", "#c9be03");
			this.fillText(this.ctx," 17..." + (this.roundScore2) + "...17", 507, 140, "20pt heavy_data", "#c9be03");
		
			this.fillText(this.ctx,"18..." + (this.roundScore) + "...18", 509, 40, "20pt heavy_data", "white");
			this.fillText(this.ctx," 17..." + (this.roundScore2) + "...17", 507, 140, "20pt heavy_data", "white");
			ctx.restore();
			
			//ctx.drawImage(this.iBorder,0,0);
			
			ctx.save(); 
			if(this.fade == true){ //FADE
				ctx.globalAlpha = .1;
			} else if(this.superFade == true){ //SUPERFADE
				ctx.globalAlpha = .05;
			} else {
				ctx.globalAlpha = .7;
			}
			if(this.vegeta.hit == true &&
		this.vegeta.hardHit == false) {
				ctx.fillStyle = "red";
			} else {
				ctx.fillStyle = "white";
			}
			if (this.vegeta.endurance < 6){
				ctx.fillRect(50,55,6,35);
			}
			else {
				ctx.fillRect(50,55, (this.vegeta.endurance * 4) - 30, 35);
			}
			if(this.vegeta.health < 10){
				ctx.fillRect(50,90,0,25);
			} else {
				ctx.fillRect(50,90, (this.vegeta.health * 4) - 30, 25);
			}
			if(this.vegeta.hardHit == true) {
				ctx.save();
				ctx.scale(.14,.14);
				if(this.warnings < 3){
					ctx.drawImage(this.iWarning,1100,470);
					ctx.drawImage(this.iWarning,750,470);
					ctx.drawImage(this.iWarning,1800,470);
					ctx.drawImage(this.iWarning,2150,470);
					ctx.drawImage(this.iWarning,1450,470);
				} else {
					this.warnings = 0;
				}
				ctx.restore();
			}
			ctx.restore();
			
			ctx.save();
			if(this.fade == true){ //FADE
				ctx.globalAlpha = .2;
			} else if(this.superFade == true){ //SUPERFADE
				ctx.globalAlpha = .05;
			} else {
				ctx.globalAlpha = .8;
			}
			ctx.drawImage(this.iBigBar,50,55);
			ctx.restore();
		
			ctx.save();
			if(this.fade == true){ //FADE
				ctx.globalAlpha = .1;
			} else if(this.superFade == true){ //SUPERFADE
				ctx.globalAlpha = .05;
			} else {
				ctx.globalAlpha = .6;
			}
			if(this.vegeta.exhausted == true){
				if(this.pulsing < 3){
					ctx.fillStyle = "Red";
				} else if(this.pulsing < 4){
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
			ctx.fillRect(50,125, (this.vegeta.stamina * 3) - 70, 10);
			ctx.fillStyle = "yellow";
			//ctx.fillStyle = "#c9be03";
			ctx.fillRect(50,140, (this.vegeta.energy * 3) - 70, 15);
			ctx.restore();
			
			ctx.save();
			if(this.fade == true){ //FADE
				ctx.globalAlpha = .2;
			} else if(this.superFade == true){ //SUPERFADE
				ctx.globalAlpha = .05;
			} else {
				ctx.globalAlpha = .8;
			}
			ctx.drawImage(this.iSmallBar,50,110);
			ctx.restore();
			
			ctx.save();
			ctx.scale(-1, 1);
			ctx.save();
			if(this.fade == true){ //FADE
				ctx.globalAlpha = .1;
			} else if(this.superFade == true){ //SUPERFADE
				ctx.globalAlpha = .05;
			} else {
				ctx.globalAlpha = .7;
			}
			if(this.android18.hit == true && this.android18.hardHit == false) {
				ctx.fillStyle = "red";
			} else {
				ctx.fillStyle = "white";
			}
			if (this.android18.endurance < 6){
				ctx.fillRect(-970,55,6,35);
			}
			else {
				ctx.fillRect(-970,55, (this.android18.endurance * 4) - 30, 35);
			}
			if (this.android18.health < 10){
				ctx.fillRect(-970,90,0,25);
			}
			else {
				ctx.fillRect(-970,90, (this.android18.health * 4) - 30, 25);
			}
			if(this.android18.hardHit == true) {
				ctx.save();
				ctx.scale(.14,.14);
				if(this.warnings < 3){
					ctx.drawImage(this.iWarning,-5800,470);
					ctx.drawImage(this.iWarning,-5450,470);
					ctx.drawImage(this.iWarning,-5100,470);
					ctx.drawImage(this.iWarning,-6150,470);
					ctx.drawImage(this.iWarning,-6500,470);
				} else {
					this.warnings = 0;
				}
				ctx.restore();
			}
			ctx.restore();
			
			ctx.save();
			if(this.fade == true){ //FADE
				ctx.globalAlpha = .2;
			} else if(this.superFade == true){ //SUPERFADE
				ctx.globalAlpha = .05;
			} else {
				ctx.globalAlpha = .8;
			}
			ctx.drawImage(this.iBigBar,-970,55);
			ctx.restore();
			
			ctx.save();
			if(this.fade == true){ //FADE
				ctx.globalAlpha = .1;
			} else if(this.superFade == true){ //SUPERFADE
				ctx.globalAlpha = .05;
			} else {
				ctx.globalAlpha = .6;
			}
			if(this.android18.exhausted == true){
				if(this.pulsing < 3){
					ctx.fillStyle = "Red";
				} else if(this.pulsing < 4){
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
			ctx.fillRect(-970,125, (this.android18.stamina * 3) - 70, 10);
			ctx.fillStyle = "yellow";
			//ctx.fillStyle = "#c9be03";
			ctx.fillRect(-970,140, (this.android18.energy * 3) - 70, 15);
			ctx.restore();
			ctx.save();
			if(this.fade == true){ //FADE
				ctx.globalAlpha = .2;
			} else if(this.superFade == true){ //SUPERFADE
				ctx.globalAlpha = .05;
			} else {
				ctx.globalAlpha = .8;
			}
			ctx.drawImage(this.iSmallBar,-970,110);
			ctx.restore();
			ctx.restore(); //TEST
			
			//TUTORIAL
			if(this.gameState == this.GAME_STATE.TUTORIAL){
			if(myKeys.keydown[myKeys.KEYBOARD.KEY_SPACE] == true && this.toggle1 == false && this.next == false){
				this.next = true;
				if(this.instructions < 22){
					this.vegeta.flying = false;
					this.vegeta.stun = true;
					this.instructions++;
					this.sound.playEffect(68);
				} else {
					this.instructions = 0;
					this.sound.playEffect(68);
				}
			} else if(myKeys.keydown[myKeys.KEYBOARD.KEY_SPACE] != true){
				this.next = false;
			}
			
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			
			ctx.save();
			if(this.fade == true){ //FADE
				ctx.globalAlpha = .1;
			} else if(this.superFade == true){ //SUPERFADE
				ctx.globalAlpha = .05;
			} else {
				ctx.globalAlpha = .7;
			}
			
			ctx.restore();
			
			//MOVES LISTED
			if(this.toggle2 == false){
			this.ctx.save();
			if(this.extraFade2 == true){
				ctx.globalAlpha = .3;
			} else {
				ctx.globalAlpha = .6;
			}
			ctx.fillStyle = "rgb(0,34,7)";
			ctx.fillRect(800,295,220,320);
			ctx.strokeStyle = "black";
			ctx.strokeRect(800,295,220,320);
			this.ctx.restore();
			ctx.save();
			if(this.extraFade2 == true){
				ctx.globalAlpha = .1;
			} else {
				ctx.globalAlpha = .6;
			}
			this.fillText(this.ctx,"Enter to end", this.WIDTH/2 + 400, 367, "16pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"'T': Toggle Tutorials", this.WIDTH/2 + 400, 390, "12pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"Controls", this.WIDTH/2 + 400, 335, "32pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"Controls", this.WIDTH/2 + 400, 335, "32pt heavy_data", "white");
			this.fillText(this.ctx,"'A': Basic Attack", this.WIDTH/2 + 400, 410, "12pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"'S': Energy Attack", this.WIDTH/2 + 400, 430, "12pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"'Q': Super Speed", this.WIDTH/2 + 400, 450, "12pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"'E': Taunt", this.WIDTH/2 + 400, 470, "12pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"'W': Block", this.WIDTH/2 + 400, 490, "12pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"'D A': Strong Attack", this.WIDTH/2 + 400, 510, "12pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"'D S': Powerful Energy", this.WIDTH/2 + 400, 530, "12pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"'D W': Android Barrier", this.WIDTH/2 + 400, 550, "12pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"'P': Pause", this.WIDTH/2 + 400, 570, "12pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"'Arrow Keys': Move Or Fly", this.WIDTH/2 + 400, 590, "12pt heavy_data", "#c9be03");
			}
			
			if(this.toggle1 == false){
			//INSTRUCTIONS
			this.ctx.save();
			if(this.extraFade == true){
				ctx.globalAlpha = .3;
			} else {
				ctx.globalAlpha = .6;
			}
			ctx.fillStyle = "rgb(0,34,7)";
			ctx.fillRect(222,345,580,200);
			ctx.strokeStyle = "black";
			ctx.strokeRect(222,345,580,200);
			this.ctx.restore();
			this.ctx.save();
			if(this.extraFade == true){
				ctx.globalAlpha = .1;
			} else {
				ctx.globalAlpha = .6;
			}
			this.fillText(this.ctx,"TUTORIAL MODE", this.WIDTH/2, 385, "32pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"TUTORIAL MODE", this.WIDTH/2, 385, "32pt heavy_data", "white");
			this.fillText(this.ctx,"Spacebar to progress", this.WIDTH/2 - 125 + 5, 515, "11pt heavy_data", "white");
			this.fillText(this.ctx,"Enter to end", this.WIDTH/2 + 120 + 15, 515, "11pt heavy_data", "white");
			this.fillText(this.ctx,(this.instructions + 1) + " OF 23", this.WIDTH/2 + 15, 515, "16pt heavy_data", "white");
			if(this.instructions == 0){
				this.fillText(this.ctx,"Lets begin the testing my androids", this.WIDTH/2, 425, "24pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"Use the space bar for instructions and attack for practice", this.WIDTH/2, 460, "14pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"Press T to toggle each of the test displays on or off", this.WIDTH/2, 490, "14pt heavy_data", "#c9be03");
			} else if(this.instructions == 1){
				this.fillText(this.ctx,"Interface Meters", this.WIDTH/2, 445, "48pt heavy_data", "#c9be03");
			} else if(this.instructions == 2){
				this.fillText(this.ctx,"Look above, for you and your target", this.WIDTH/2, 430, "14pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"There are 4 bars on the battle interface", this.WIDTH/2, 460, "14pt heavy_data", "#c9be03");
				ctx.save();
				ctx.globalAlpha = .3;
				ctx.fillStyle = "red";
				ctx.fillRect(49,55, 375, 35);
				ctx.fillRect(595,55, 375, 35);
				ctx.fillRect(49,90, 375, 37);
				ctx.fillRect(595,90, 375, 37);
				ctx.fillRect(49,127, 246, 30);
				ctx.fillRect(725,127, 246, 30);
				ctx.restore();
			} else if(this.instructions == 3){
				this.fillText(this.ctx,"The top white bar is endurance", this.WIDTH/2, 430, "14pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"This reduces when hit but will regenerate over time", this.WIDTH/2, 460, "14pt heavy_data", "#c9be03");
				ctx.save();
				ctx.globalAlpha = .3;
				ctx.fillStyle = "red";
				ctx.fillRect(49,55, 375, 35);
				ctx.fillRect(595,55, 375, 35);
				ctx.restore();
			} else if(this.instructions == 4){
				this.fillText(this.ctx,"The lower white bar is health", this.WIDTH/2, 430, "14pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"This reduces when hit but only when edurance is depleated", this.WIDTH/2, 460, "14pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"This bar will NOT regenerate", this.WIDTH/2, 490, "14pt heavy_data", "#c9be03");
				ctx.save();
				ctx.globalAlpha = .3;
				ctx.fillStyle = "red";
				ctx.fillRect(49,90, 375, 37);
				ctx.fillRect(595,90, 375, 37);
				ctx.restore();
			} else if(this.instructions == 5){
				this.fillText(this.ctx,"This sometimes dark red bar is a measure of fatigue", this.WIDTH/2, 430, "14pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"This will fill a bit with each physical attack", this.WIDTH/2, 460, "14pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"If this reaches max it will cause exhaustion", this.WIDTH/2, 490, "14pt heavy_data", "#c9be03");
				ctx.save();
				ctx.globalAlpha = .3;
				ctx.fillStyle = "red";
				ctx.fillRect(49,110, 246, 30);
				ctx.fillRect(725,110, 246, 30);
				ctx.restore();
			} else if(this.instructions == 6){
				this.fillText(this.ctx,"If exhaustion occurs the bar will blink bright red", this.WIDTH/2, 430, "14pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"This will prevent you from using physical attacks", this.WIDTH/2, 460, "14pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"Normalize by allowing it to depleat halfway or by taunting", this.WIDTH/2, 490, "14pt heavy_data", "#c9be03");
				ctx.save();
				ctx.globalAlpha = .3;
				ctx.fillStyle = "red";
				ctx.fillRect(49,110, 246, 30);
				ctx.fillRect(725,110, 246, 30);
				ctx.restore();
			} else if(this.instructions == 7){
				this.fillText(this.ctx,"The yellow bar is your energy meter", this.WIDTH/2, 430, "14pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"This will be used by energy attacks and activating Super Speed", this.WIDTH/2, 460, "14pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"I have designed your systems to forever regenerate energy", this.WIDTH/2, 490, "14pt heavy_data", "#c9be03");
				ctx.save();
				ctx.globalAlpha = .3;
				ctx.fillStyle = "red";
				ctx.fillRect(49,133, 246, 24);
				ctx.fillRect(725,133, 246, 24);
				ctx.restore();
			} else if(this.instructions == 8){
				this.fillText(this.ctx,"Movement", this.WIDTH/2, 445, "48pt heavy_data", "#c9be03");
			} else if(this.instructions == 9){
				this.fillText(this.ctx,"Tap the up key to jump or hold it to defy gravity and fly", this.WIDTH/2, 430, "14pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"Attacking or engaging the enemy in air will allow you to hover", this.WIDTH/2, 460, "14pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"Attacks may change depending on if your grounded or airborne", this.WIDTH/2, 490, "14pt heavy_data", "#c9be03");
			} else if(this.instructions == 10){
				this.fillText(this.ctx,"Left and Right arrows to move in those directions respectively", this.WIDTH/2, 430, "14pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"Down works if your airborne to accelerate you downward", this.WIDTH/2, 460, "14pt heavy_data", "#c9be03");
			} else if(this.instructions == 11){
				this.fillText(this.ctx,"Battle Controls ", this.WIDTH/2, 445, "48pt heavy_data", "#c9be03");
			} else if(this.instructions == 12){
				this.fillText(this.ctx,"The only useable keys for combat are W, A, S, D, and Q", this.WIDTH/2, 430, "14pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"'A': Fast Basic Attacks with low fatigue build up", this.WIDTH/2, 460, "14pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"'S': Ranged Energy Blast Attacks with a low energy cost", this.WIDTH/2, 490, "14pt heavy_data", "#c9be03");
			} else if(this.instructions == 13){
				this.fillText(this.ctx,"'W': Block incoming physical attacks only", this.WIDTH/2, 430, "14pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"Blocking stops all damage but will increase fatigue when hit", this.WIDTH/2, 460, "14pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"You cannot block if your exhausted", this.WIDTH/2, 490, "14pt heavy_data", "#c9be03");
			} else if(this.instructions == 14){
				this.fillText(this.ctx,"'Q': Move at Super Speed to essentially teleport", this.WIDTH/2, 430, "14pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"This will use energy and avoid all damage until it ends", this.WIDTH/2, 460, "14pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"You'll appear behind your enemy or in a direction your moving", this.WIDTH/2, 490, "14pt heavy_data", "#c9be03");
			} else if(this.instructions == 15){
				this.fillText(this.ctx,"'D': Holding this key will intensify or alter abilies", this.WIDTH/2, 430, "14pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"'D' with 'A': strong physical attacks with high fatigue build up", this.WIDTH/2, 460, "14pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"'D' with 'S': Powerful Energy attacks with high energy cost", this.WIDTH/2, 490, "14pt heavy_data", "#c9be03");
			} else if(this.instructions == 16){
				this.fillText(this.ctx,"'D' combined with 'W' will turn block into an android barrier", this.WIDTH/2, 430, "14pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"This will drain a lot of energy and cant be stopped early", this.WIDTH/2, 460, "14pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"However nothing can hurt you while within this energy shield", this.WIDTH/2, 490, "14pt heavy_data", "#c9be03");
			} else if(this.instructions == 17){
				this.fillText(this.ctx,"'E' will cause you to taunt your opponent", this.WIDTH/2, 430, "14pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"This will make you vulnerable to attacks and may fail if hit", this.WIDTH/2, 460, "14pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"A sucessful taunt will lower your fatigue to zero", this.WIDTH/2, 490, "14pt heavy_data", "#c9be03");
			} else if(this.instructions == 18){
				this.fillText(this.ctx,"Important Facts", this.WIDTH/2, 445, "48pt heavy_data", "#c9be03");
			} else if(this.instructions == 19){
				this.fillText(this.ctx,"You can land on some structures by flying above it first", this.WIDTH/2, 430, "14pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"To drop below it again just hold the down key while airborne", this.WIDTH/2, 460, "14pt heavy_data", "#c9be03");
			} else if(this.instructions == 20){
				this.fillText(this.ctx,"Energy attack hits will cause burns that halt endurance regen", this.WIDTH/2, 430, "14pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"The length of this halt depends on the intersity of the attack", this.WIDTH/2, 460, "14pt heavy_data", "#c9be03");
			} else if(this.instructions == 21){
				this.fillText(this.ctx,"Flying behind the battle interface will cause it to fade", this.WIDTH/2, 430, "14pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"Keep this in mind when fighting at high altitudes", this.WIDTH/2, 460, "14pt heavy_data", "#c9be03");
			} else if(this.instructions == 22){
				this.fillText(this.ctx,"That is all I need for now my androids", this.WIDTH/2, 425, "18pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"Now prove your worth in a battle examination", this.WIDTH/2, 455, "18pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"Else I dismantle you both like I did android 19!", this.WIDTH/2, 485, "18pt heavy_data", "#c9be03");
			}
			}
			ctx.restore();
			ctx.restore();
			}
		}
		

		if(this.gameState == this.GAME_STATE.BEGIN){
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
			ctx.fillRect(0,0, 1024, 768);
			ctx.save();
			ctx.globalAlpha = (this.iAlpha/100);
			ctx.drawImage(this.digitalBackground,0,0);
			ctx.restore();
			ctx.save();
			ctx.globalAlpha = .6;
			ctx.fillStyle = "rgb(0,34,7)";
			ctx.fillRect(0,0, 1024, 768);
			ctx.restore();
			ctx.drawImage(this.titleBar,-3,300 + (this.iAlpha/15), 1026, 299);
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			this.environment.drawForeground(this.ctx); // DRAW Foreground
			ctx.globalAlpha = .8;
			//INSTRUCTIONS
			if(this.instructions == 0){
				//this.fillText(this.ctx,"The Red Ribbon Androids", this.WIDTH/2 - 10, 190, "60pt heavy_data", "#c9be03");
				ctx.save();
				ctx.globalAlpha = .7;
				ctx.fillStyle = "rgb(0,34,7)";
				ctx.fillRect(0,315,1024,280);
				ctx.strokeStyle = "black";
				ctx.strokeRect(0,315,1024,280);
				
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
				ctx.drawImage(this.redRibbon,295,92, 220, 120);
				ctx.globalAlpha = .3;
				this.fillText(this.ctx,"e", 290 + 98, 161, "27pt heavy_data", "black");
				this.fillText(this.ctx,"d", 290 + 116, 161, "27pt heavy_data", "black");
				this.fillText(this.ctx,"e", 290 + 93, 164, "27pt heavy_data", "black");
				this.fillText(this.ctx,"d", 290 + 113, 164, "27pt heavy_data", "black");
				ctx.save();
				ctx.globalAlpha = .7;
				this.fillText(this.ctx,"ed", 290 + 105, 163, "25pt heavy_data", "#bac6b3");
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
				this.fillText(this.ctx,"ibbon", 530 + 100, 152, "72pt heavy_data", "black");
				this.fillText(this.ctx,"ibbon", 530 + 100, 150, "70pt heavy_data", "#bac6b3");
				ctx.restore();
				ctx.save();
				ctx.globalAlpha= .7;
				this.fillText(this.ctx,"The", this.WIDTH/2, 60, "70pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"Androids", this.WIDTH/2 + 8, 240, "85pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"Press Enter to Engage!", this.WIDTH/2, 650, "42pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"Press Enter to Engage!", this.WIDTH/2, 650, "42pt heavy_data", "white");
				//this.fillText(this.ctx,"Press C for credits", this.WIDTH/2 + 350, 740, "17pt heavy_data", "white");
				this.fillText(this.ctx,"Press C for credits", this.WIDTH/2, 730, "17pt heavy_data", "white");
				ctx.restore();
				ctx.restore();
			} else if(this.instructions == 1){
				this.iAlpha = 20;
				this.fillText(this.ctx,"POWER BARS", this.WIDTH/2 - 10, 670, "60pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"There are 4 bars on the in battle interface.", this.WIDTH/2, 50, "15pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"The top green bar is your regenerating endurance to protect the second gree bar of non-regen health.", this.WIDTH/2, 80, "15pt heavy_data", "white");
				this.fillText(this.ctx,"The yellow bar is your energy. This will be used for ranged blast attacks and moving at Super Speed.", this.WIDTH/2, 110, "15pt heavy_data", "white");
				this.fillText(this.ctx,"As a superior android energy is infine so it will regenerate over time. Mortals will run out eventually.", this.WIDTH/2, 140, "15pt heavy_data", "white");
				this.fillText(this.ctx,"The white bar is a measure of fatigue. Dont allow this to reach max or it will turn red due to exhaustion.", this.WIDTH/2, 170, "15pt heavy_data", "white");
				this.fillText(this.ctx,"If you become exhausted you will not be able to use basic or hard attacks for a litle while.", this.WIDTH/2, 200, "15pt heavy_data", "white");
				this.fillText(this.ctx,"If the bar falls low enough it will go back to white and you will return to normal.", this.WIDTH/2,230, "15pt heavy_data", "white");
				this.fillText(this.ctx,"Attempt a risky taunt to drop fatigue to normal.", this.WIDTH/2, 260, "15pt heavy_data", "white");
				this.fillText(this.ctx,"Press C for more", this.WIDTH/2 + 350, 740, "17pt heavy_data", "#c9be03");
			} else if(this.instructions == 2){
				this.iAlpha = 20;
				this.fillText(this.ctx,"MOVEMENT", this.WIDTH/2 - 10, 670, "60pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"Use the arrow keys for basic movement.", this.WIDTH/2, 50, "15pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"Tap the up key to jump or hold it to defy gravity and fly around.", this.WIDTH/2, 80, "15pt heavy_data", "white");
				this.fillText(this.ctx,"The down key only works if your jumping/flying. It will accelerate you to the ground.", this.WIDTH/2, 110, "15pt heavy_data", "white");
				this.fillText(this.ctx,"Some moves will change depending on if your grounded or airborne.", this.WIDTH/2, 170, "15pt heavy_data", "white");
				this.fillText(this.ctx,"Combine the different movement functions to out maneuver your opponents.", this.WIDTH/2, 200, "15pt heavy_data", "white");
				this.fillText(this.ctx,"Press C for more", this.WIDTH/2 + 350, 740, "17pt heavy_data", "#c9be03");
			} else if(this.instructions == 3){
				this.iAlpha = 20;
				this.fillText(this.ctx,"CONTROLS", this.WIDTH/2 - 10, 670, "60pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"The only useable keys are A, S, D, Q, and W.", this.WIDTH/2, 50, "15pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"'A': Fast Basic Attacks.", this.WIDTH/2, 80, "15pt heavy_data", "white");
				this.fillText(this.ctx,"'S': Ranged Energy Blast Attacks.", this.WIDTH/2, 110, "15pt heavy_data", "white");
				this.fillText(this.ctx,"'W': Block incoming attacks. However avoid doing with with energy blasts.", this.WIDTH/2, 140, "15pt heavy_data", "white");
				this.fillText(this.ctx,"Note: Getting hit blocking stops all damage but you will still feel some fatigue and impact.", this.WIDTH/2,170, "15pt heavy_data", "white");
				this.fillText(this.ctx,"'Q': Super Speed button. Move so far that you will essentially teleport.", this.WIDTH/2, 200, "15pt heavy_data", "white");
				this.fillText(this.ctx,"Note: Super Speed chooses location based on intended movement direction and enemy proximity.", this.WIDTH/2, 230, "15pt heavy_data", "white");
				this.fillText(this.ctx,"Press C for more", this.WIDTH/2 + 350, 740, "17pt heavy_data", "#c9be03");
			} else if(this.instructions == 4){
				this.iAlpha = 20;
				this.fillText(this.ctx,"CONTROLS", this.WIDTH/2 - 10, 670, "60pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"'D': The intensify button. But it currently only has 2 functions.", this.WIDTH/2, 50, "15pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"'D' combined with 'A' will produce high impact attacks that will push and stun.  Warning these attacks will cause more fatigue.", this.WIDTH/2, 80, "15pt heavy_data", "white");
				this.fillText(this.ctx,"Warning these attacks will cause more fatigue and are easier for your oppenent to avoid.", this.WIDTH/2, 110, "15pt heavy_data", "white");
				this.fillText(this.ctx,"'D' combined with 'W' will turn block into a vulnerable taunt. successful use will dissipate fatigue.", this.WIDTH/2, 140, "15pt heavy_data", "white");
				this.fillText(this.ctx,"Other Control hints.", this.WIDTH/2, 170, "15pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"Some attacks you can move and use it while others are either partially restricted or you must be still.", this.WIDTH/2, 200, "15pt heavy_data", "white");
				this.fillText(this.ctx,"Your own blast attacks can hurt you so avoid using them at point blank or getting in their paths.", this.WIDTH/2,230, "15pt heavy_data", "white");
				this.fillText(this.ctx,"Press C for more", this.WIDTH/2 + 350, 740, "17pt heavy_data", "#c9be03");
			}  else if(this.instructions == 5){
				this.iAlpha = 20;
				this.fillText(this.ctx,"Primary Directive", this.WIDTH/2 - 10, 670, "60pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"Dr. GEROS ORDERS...", this.WIDTH/2, 45, "25pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"DESTROY GOKU!!!.", this.WIDTH/2, 80, "15pt heavy_data", "white");
				this.fillText(this.ctx,"ANNIHILATE GOKU!!!.", this.WIDTH/2, 110, "15pt heavy_data", "white");
				this.fillText(this.ctx,"OBLITERATE GOKU!!!.", this.WIDTH/2, 140, "15pt heavy_data", "white");
				this.fillText(this.ctx,"END GOKU...", this.WIDTH/2, 170, "15pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"GOKU.......", this.WIDTH/2, 200, "15pt heavy_data", "white");
				this.fillText(this.ctx,"REVENGE!!....", this.WIDTH/2,230, "15pt heavy_data", "white");
				this.fillText(this.ctx,"Press C to return", this.WIDTH/2 + 350, 740, "17pt heavy_data", "#c9be03");
			}
			
			
		} // end if
	
		if(this.gameState == this.GAME_STATE.CREDITS){
			if(this.creditsRoll < (240 + ((this.spacing * 11) + 3550)))
			{
				this.creditsRoll += 10;
			}
			ctx.save();
			ctx.fillStyle = "rgb(0,34,7)";
			ctx.fillRect(0,0, 1024, 768);
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.globalAlpha = .7;
			this.fillText(this.ctx,"Credits", this.WIDTH/2, 300 - this.creditsRoll, "120pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"Creative Director: Christopher Bennett", this.WIDTH/2, ((this.spacing * 1) + 300) - this.creditsRoll, "25pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"Producer: Christopher Bennett", this.WIDTH/2, ((this.spacing * 2) + 300) - this.creditsRoll, "25pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"Game Designer: Christopher Bennett", this.WIDTH/2, ((this.spacing * 3) + 300) - this.creditsRoll, "25pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"Game Programmer: Christopher Bennett", this.WIDTH/2, ((this.spacing * 4) + 300) - this.creditsRoll, "25pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"Animator: Christopher Bennett", this.WIDTH/2, ((this.spacing * 5) + 300) - this.creditsRoll, "25pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"Audio Engineer: Christopher Bennett", this.WIDTH/2, ((this.spacing * 6) + 300) - this.creditsRoll, "25pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"Artist: Christopher Bennett", this.WIDTH/2, ((this.spacing * 7) + 300) - this.creditsRoll, "25pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"Level Editor: Christopher Bennett", this.WIDTH/2, ((this.spacing * 8) + 300) - this.creditsRoll, "25pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"QA Tester: Christopher Bennett", this.WIDTH/2, ((this.spacing * 9) + 300) - this.creditsRoll, "25pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"Credited Assets/Resources", this.WIDTH/2, ((this.spacing * 10) + 300) - this.creditsRoll, "50pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"Used and modified for creative educational purposes", this.WIDTH/2, ((this.spacing * 10) + 360) - this.creditsRoll, "25pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"Many energy attack sprites: http://www.spriters-resource.com/game_boy_advance/dbzsuperwar/sheet/26657/", this.WIDTH/2, ((this.spacing * 11) + 300) - this.creditsRoll, "12pt arial", "#c9be03");
			this.fillText(this.ctx,"Android 18 sprites: http://www.spriters-resource.com/3ds/dragonballzextremebutoden/sheet/67257/", this.WIDTH/2, ((this.spacing * 11) + 400) - this.creditsRoll, "12pt arial", "#c9be03");
			this.fillText(this.ctx,"Vegeta sprites: https://www.spriters-resource.com/3ds/dragonballzextremebutoden/sheet/67278/", this.WIDTH/2, ((this.spacing * 11) + 500) - this.creditsRoll, "12pt arial", "#c9be03");
			this.fillText(this.ctx,"Android 17 sprites: http://www.geocities.ws/mega_gohans_battleground/dbz17sheet.gif", this.WIDTH/2, ((this.spacing * 11) + 600) - this.creditsRoll, "12pt arial", "#c9be03");
			this.fillText(this.ctx,"Vectors JS code: https://evanw.github.io/lightgl.js/docs/vector.html", this.WIDTH/2, ((this.spacing * 11) + 700) - this.creditsRoll, "12pt arial", "#c9be03");
			this.fillText(this.ctx,"Voice and sound data: https://www.sounds-resource.com/wii/dbzbt3/sound/", this.WIDTH/2, ((this.spacing * 11) + 800) - this.creditsRoll, "12pt arial", "#c9be03");
			this.fillText(this.ctx,"Interface border: http://smg.photobucket.com/user/dutchguy1984/media/step6.gif.html", this.WIDTH/2, ((this.spacing * 11) + 900) - this.creditsRoll, "12pt arial", "#c9be03");
			this.fillText(this.ctx,"Inner interface borders: http://bin.smwcentral.net/u/24654/techborder7rs.png", this.WIDTH/2, ((this.spacing * 11) + 1000) - this.creditsRoll, "12pt arial", "#c9be03");
			this.fillText(this.ctx,"Digital green: http://st2.depositphotos.com/3205183/6019/i/950/depositphotos_60195665-Binary-code-backgroundwith-computer.jpg", this.WIDTH/2, ((this.spacing * 11) + 1100) - this.creditsRoll, "12pt arial", "#c9be03");
			this.fillText(this.ctx,"Tien sprites: http://spritedatabase.net/files/ps1/2393/Sprite/UB22_Tien.PNG", this.WIDTH/2, ((this.spacing * 11) + 1200) - this.creditsRoll, "12pt arial", "#c9be03");
			this.fillText(this.ctx,"Gohan sprites: https://www.spriters-resource.com/3ds/dragonballzextremebutoden/sheet/67252/", this.WIDTH/2, ((this.spacing * 11) + 1300) - this.creditsRoll, "12pt arial", "#c9be03");
			this.fillText(this.ctx,"Krillin Sprites: https://www.spriters-resource.com/3ds/dragonballzextremebutoden/sheet/67269/", this.WIDTH/2, ((this.spacing * 11) + 1400) - this.creditsRoll, "12pt arial", "#c9be03");
			this.fillText(this.ctx,"Piccolo sprites: https://www.spriters-resource.com/3ds/dragonballzextremebutoden/sheet/67249/", this.WIDTH/2, ((this.spacing * 11) + 1500) - this.creditsRoll, "12pt arial", "#c9be03");
			this.fillText(this.ctx,"Yamcha sprites: http://i.imgur.com/Khwr9.png", this.WIDTH/2, ((this.spacing * 11) + 1600) - this.creditsRoll, "12pt arial", "#c9be03");
			this.fillText(this.ctx,"Chaozu sprites: http://zitlezoan.deviantart.com/art/Chaozu-n2-348824931", this.WIDTH/2, ((this.spacing * 11) + 1700) - this.creditsRoll, "12pt arial", "#c9be03");
			this.fillText(this.ctx,"Dr Gero sprites: https://www.spriters-resource.com/fullview/47872/", this.WIDTH/2, ((this.spacing * 11) + 1800) - this.creditsRoll, "12pt arial", "#c9be03");
			this.fillText(this.ctx,"Warehouse: http://ukfilmlocation.com/Locations/LON1820/LON1820_6-800.jpg", this.WIDTH/2, ((this.spacing * 11) + 1900) - this.creditsRoll, "12pt arial", "#c9be03");
			this.fillText(this.ctx,"Smoke cloud: http://pgsecurity.co.uk/wp-content/uploads/2013/11/smoke-cloak-security-fog.jpg", this.WIDTH/2, ((this.spacing * 11) + 2000) - this.creditsRoll, "12pt arial", "#c9be03");
			this.fillText(this.ctx,"Special Effects like dust: http://xypter.deviantart.com/art/Ultimate-Effects-Sheet-6-212140764", this.WIDTH/2, ((this.spacing * 11) + 2100) - this.creditsRoll, "12pt arial", "#c9be03");
			this.fillText(this.ctx,"Power up auras: http://3.bp.blogspot.com/_2n_u_69YOUA/TUXszCfrbDI/AAAAAAAAAH0/EARaj_EAxLs/s1600/conjuntos%2Bde%2Bauras.png", this.WIDTH/2, ((this.spacing * 11) + 2200) - this.creditsRoll, "12pt arial", "#c9be03");
			this.fillText(this.ctx,"Various effects: http://www.deviantart.com/art/Some-Effects-107393192", this.WIDTH/2, ((this.spacing * 11) + 2300) - this.creditsRoll, "12pt arial", "#c9be03");
			this.fillText(this.ctx,"Rain Tutorial: https://codepen.io/ruigewaard/pen/JHDdF/", this.WIDTH/2, ((this.spacing * 11) + 2400) - this.creditsRoll, "12pt arial", "#c9be03");
			this.fillText(this.ctx,"Song for some clips: Dream Theater's Home", this.WIDTH/2, ((this.spacing * 11) + 2500) - this.creditsRoll, "12pt arial", "#c9be03");
			this.fillText(this.ctx,"All other background music: Faulconer Productions", this.WIDTH/2, ((this.spacing * 11) + 2600) - this.creditsRoll, "12pt arial", "#c9be03");
			this.fillText(this.ctx,"Dragon Ball Z is the property of Toei Entertainment and Funimation", this.WIDTH/2, ((this.spacing * 11) + 3000) - this.creditsRoll, "20pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"A Christopher Bennett Game", this.WIDTH/2, ((this.spacing * 11) + 3500) - this.creditsRoll, "50pt heavy_data", "#c9be03");
			
				ctx.save();
				ctx.globalAlpha = .85;
				ctx.drawImage(this.redRibbon,295,92 + ((this.spacing * 11) + 4000) - this.creditsRoll, 220, 120);
				ctx.globalAlpha = .7;
				this.fillText(this.ctx,"ed", 290 + 105, 163 + ((this.spacing * 11) + 4000) - this.creditsRoll, "25pt heavy_data", "#bac6b3");
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
				this.fillText(this.ctx,"ibbon", 530 + 100, 152 + ((this.spacing * 11) + 4000) - this.creditsRoll, "72pt heavy_data", "black");
				this.fillText(this.ctx,"ibbon", 530 + 100, 150 + ((this.spacing * 11) + 4000) - this.creditsRoll, "70pt heavy_data", "#bac6b3");
				ctx.restore();
				ctx.save();
				ctx.globalAlpha= .7;
				this.fillText(this.ctx,"The", this.WIDTH/2, 60 + ((this.spacing * 11) + 4000) - this.creditsRoll, "70pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"Androids", this.WIDTH/2 + 8, 240 + ((this.spacing * 11) + 4000) - this.creditsRoll, "85pt heavy_data", "#c9be03");
				ctx.restore();
				
				ctx.restore();

		} // end if
		
		if(this.gameState == this.GAME_STATE.VICTORY){
			ctx.save();
			ctx.fillStyle = "rgb(0,34,7)";
			ctx.fillRect(0,0, 1024, 768);
			ctx.save();
			ctx.globalAlpha = (this.iAlpha/100);
			ctx.drawImage(this.digitalBackground,0,0);
			ctx.restore();
			ctx.save();
			ctx.globalAlpha = .6;
			ctx.fillStyle = "rgb(0,34,7)";
			ctx.fillRect(0,0, 1024, 768);
			ctx.restore();
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.globalAlpha = .7;
			ctx.save();
			ctx.translate(this.WIDTH/2 - 65, this.HEIGHT/2 - 65);
			//ctx.scale(3,3);
			ctx.drawImage(this.redRibbon,0,0);
			ctx.restore();
			
			if(this.calculated != true){
			
			this.totalScore = (this.roundScore - this.roundScore2);
			this.totalPoints = (this.roundScore + this.roundScore2);
			
			if(this.roundScore > this.hs18){
				this.hs18 = this.roundScore;
			}
			if(this.roundScore2 > this.hs17){
				this.hs17 = this.roundScore2;
			}
			if(this.totalPoints > this.hsTotal){
				this.hsTotal = this.totalPoints;
			}
			if(this.totalPoints > 0){
				this.victories += 1;
				this.recentVictory = true;
			} else {
				this.recentVictory = false;
			}
			if(this.trueEnding == true){
				this.trueDomination += 1;
			} else {
				this.classicDomination += 1;
			}
			if(this.android18.health > 99){
				this.perfects += 1;
				this.recentPerfect = true;
			} else {
				this.recentPerfect = false;
			}
			
			this.recentDomination = true;
			
			this.dominations += 1;
			
			this.calculated = true;
			
			}
			
			if(this.saved != true){
				document.querySelector("#gameButton").click();
				document.querySelector("#statSubmit").click();
				this.saved = true;
			}
			
			
			if(this.trueEnding == true){
				this.fillText(this.ctx,"The Beginning?", this.WIDTH/2, this.HEIGHT/2 - 110, "50pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"The Beginning?", this.WIDTH/2, this.HEIGHT/2 - 110, "50pt heavy_data", "white");
			} else {
				this.fillText(this.ctx,"The End?", this.WIDTH/2, this.HEIGHT/2 - 110, "50pt heavy_data", "#c9be03");
				this.fillText(this.ctx,"The End?", this.WIDTH/2, this.HEIGHT/2 - 110, "50pt heavy_data", "white");
			}
			//this.fillText(this.ctx,"Press Enter the earth is yours.......", this.WIDTH/2, this.HEIGHT/2 + 130, "20pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"18 Points Detected:... " + (this.roundScore), this.WIDTH/2, this.HEIGHT/2 + 30, "25pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"17 Points Detected:... " + (this.roundScore2), this.WIDTH/2, this.HEIGHT/2 + 68, "25pt heavy_data", "#c9be03");
			if(this.totalScore > 0){
				this.fillText(this.ctx,"Winner 18... Score: " + (this.totalScore), this.WIDTH/2, this.HEIGHT/2 + 120, "40pt heavy_data", "green");
			} else {
				this.fillText(this.ctx,"Winner 17... Score: " + (this.totalScore * -1), this.WIDTH/2, this.HEIGHT/2 + 120, "40pt heavy_data", "DarkRed");
			}
			this.fillText(this.ctx,"Points Total:... " + (this.totalPoints), this.WIDTH/2, this.HEIGHT/2 + 180, "32pt heavy_data", "yellow");
			this.fillText(this.ctx,"A Christopher Bennett Game", this.WIDTH/2, this.HEIGHT/2 - 300, "15pt heavy_data", "white");
		} // end if
		
		if(this.gameState == this.GAME_STATE.DEFEAT){
			this.environment.fadeOut = false;
			ctx.save();
			ctx.fillStyle = "rgb(0,34,7)";
			ctx.fillRect(0,0, 1024, 768);
			ctx.save();
			ctx.globalAlpha = (this.iAlpha/100);
			ctx.drawImage(this.digitalBackground,0,0);
			ctx.restore();
			ctx.save();
			ctx.globalAlpha = .6;
			ctx.fillStyle = "rgb(0,34,7)";
			ctx.fillRect(0,0, 1024, 768);
			ctx.restore();
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.globalAlpha = .7;
			ctx.save();
			ctx.translate(this.WIDTH/2 - 65, this.HEIGHT/2 - 75);
			//ctx.scale(3,3);
			ctx.drawImage(this.redRibbon,0,0);
			ctx.restore();
			
			if(this.calculated != true){
			
			this.totalScore = (this.roundScore - this.roundScore2);
			this.totalPoints = (this.roundScore + this.roundScore2);
			
			if(this.roundScore > this.hs18){
				this.hs18 = this.roundScore;
			}
			if(this.roundScore2 > this.hs17){
				this.hs17 = this.roundScore2;
			}
			/* if(this.totalPoints > this.hsTotal){
				this.hsTotal = this.totalPoints;
			} */
			
			this.destroyed += 1;
			
			this.recentPerfect = false;
			this.recentVictory = false;
			this.recentDomination = false;
			
			this.calculated = true;
			
			}
			
			if(this.saved != true){
				document.querySelector("#gameButton").click();
				document.querySelector("#statSubmit").click();
				this.saved = true;
			}
			
			this.fillText(this.ctx,"System Failure", this.WIDTH/2, this.HEIGHT/2 - 120, "50pt heavy_data", "DarkRed");
			this.fillText(this.ctx,"Press Enter to reboot.......", this.WIDTH/2, this.HEIGHT/2 + 170, "20pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"Press Enter to reboot.......", this.WIDTH/2, this.HEIGHT/2 + 170, "20pt heavy_data", "white");
			this.fillText(this.ctx,"Android 18 Points Detected:... " + (this.roundScore), this.WIDTH/2, this.HEIGHT/2 + 30, "30pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"Android 17 Points Detected:... " + (this.roundScore2), this.WIDTH/2, this.HEIGHT/2 + 68, "30pt heavy_data", "#c9be03");
			this.fillText(this.ctx,"Points Total:... " + (this.totalPoints), this.WIDTH/2, this.HEIGHT/2 + 120, "30pt heavy_data", "yellow");
			this.fillText(this.ctx,"A Christopher Bennett Game", this.WIDTH/2, this.HEIGHT/2 - 300, "15pt heavy_data", "white");
		} // end if
		ctx.restore();
	},
	
	//FUNCTION TO PAUSE THE GAME
	pausedGame: function(){
		this.paused = true;
		paused = true; //Site
		this.sound.playEffect(66);
		
		if(this.gameState == this.GAME_STATE.DEFAULT && this.scene == false && this.battle != 1){
			this.sound.pauseBGAudioScene();
			//this.sound.playBGAudioScene(0);
		} else if(this.gameState == this.GAME_STATE.DEFAULT && this.scene == false && this.battle == 1){
			this.sound.pauseBGAudio();
			//this.sound.playBGAudioScene(0);
		}
		
		if(this.scene == true){
			this.sound.pauseBGAudioScene();
		}
		
		if(this.introState == true){
			this.videos.pause();
		}
		if(this.endingState == true && this.specialScene == false){
			this.videos.pauseE();
		}
		if(this.specialScene == true){
			this.videos.pauseS();
		}
		if(this.titleScreen == true){
			this.videos.pauseO();
		}
		if(this.scene == true){
			this.sound.pauseBackground();
			this.sound.pauseBGAudioScene();
		}
		if(this.gameState == this.GAME_STATE.VICTORY && this.endingState == false){
			this.sound.pauseBGAudioWin();
		}
		if(this.gameState == this.GAME_STATE.CREDITS){
			this.sound.pauseBGAudioScene();
		}
		if(this.gameState == this.GAME_STATE.TUTORIAL){
			this.sound.pauseBGAudioTutorial();
		}
		
		if(this.downsized == false){
			this.sound.playBGAudioPause();
			this.sound.pauseBackground();
		} else if(this.downsized == true){
			this.sound.pauseBGAudioPause();
			this.sound.pauseBackground();
		}
		
		// stop the animation loop
		cancelAnimationFrame(this.animationID);
		
		// call update() once so that our paused screen gets drawn
		this.update();
	},
	
	//FUNCTION TO RESUME THE GAME FROM PAUSE
	resumeGame: function(){
		
		this.sound.pauseBGAudioPause();
		
		// stop the animation loop, just in case it's running
		cancelAnimationFrame(this.animationID);
		
		this.paused = false;
		
		paused = false; //Site
		
		this.sound.playEffect(67);
		
		if(this.introState == true){
			this.videos.start();
		}
		if(this.endingState == true && this.specialScene == false){
			this.videos.startE();
		}
		if(this.titleScreen == true){
			this.videos.startO();
		}
		if(this.specialScene == true){
			this.videos.startS();
		}
		
		if(this.gameState == this.GAME_STATE.DEFAULT && this.scene == false && this.battle != 1){
			this.sound.resumeBGAudioScene();
			this.sound.resumeBackground();
			//this.sound.playBGAudioScene(0);
		} else if(this.gameState == this.GAME_STATE.DEFAULT && this.scene == false && this.battle == 1){
			this.sound.playBGAudio();
			this.sound.resumeBackground();
			//this.sound.playBGAudioScene(0);
		}
		
		if((this.gameState == this.GAME_STATE.DEFAULT || this.gameState == this.GAME_STATE.TUTORIAL)){
			this.sound.pauseBGAudioPause();
		}
		
		if(this.scene == true && this.gameState != this.GAME_STATE.TUTORIAL){
			this.sound.resumeBGAudioScene();
			this.sound.resumeBackground();
		}
		
		if(this.gameState == this.GAME_STATE.VICTORY && this.endingState == false && this.specialScene == false){
			this.sound.playBGAudioWin();
		}
		
		if(this.gameState == this.GAME_STATE.CREDITS){
			this.sound.resumeBGAudioScene();
		}
		
		if(this.gameState == this.GAME_STATE.TUTORIAL && this.introState == false){
			this.sound.playBGAudioTutorial();
		}
		
		// restart the loop
		this.update();
	},
	
	//RELIC AUDIO CONTROL
	stopBGAudio: function(){
		this.sound.stopBGAudio();
	},
	//RELIC AUDIO CONTROL2
	playEffect: function (){
		this.effectAudio.src = "media/" + this.effectSounds[this.currentEffect];
		this.effectAudio.play();
	}
	
    
}; // end app.main