// sound.js
"use strict";
// if app exists use the existing copy
// else create a new object literal
var app = app || {};

// define the .sound module and immediately invoke it in an IIFE
app.sound = (function(){
	//console.log("sound.js module loaded");
	var bgAudio = undefined;
	var bgAudioPause = undefined;
	var bgAudioWin = undefined;
	var bgAudioLoss = undefined;
	var bgAudioScene = undefined;
	var bgAudioTutorial = undefined;
	var effectAudio = [];
	var currentEffect = 0;
	var effectSounds = [
	"error.mp3", 		//0
	"fingerlaser.wav", 	//1
	"groundhit2.wav", 	//2
	"groundrecover.wav",//3
	"jump.wav",			//4
	"kiblast.wav",		//5
	"kiplosion.mp3",	//6
	"machine_01.mp3",	//7
	"meleemiss1.wav",	//8
	"meleemiss2.wav",	//9
	"meleemiss3.wav",	//10
	"scouter.wav",		//11
	"weakpunch.wav",	//12
	"weakkick.wav",		//13
	"mediumpunch.wav",	//14
	"mediumkick.wav",	//15
	"strongpunch.wav",	//16
	"strongkick.wav",	//17
	"meleestruggleinit.wav",//18
	"teleportStart.wav",	//19
	"teleportEnd.wav",		//20
	"swordkill.wav",		//21
	"explosion1.wav",		//22
	"basicbeam_charge1.wav", //23
	"basicbeam_fire1.wav",	//24
	"bigbang_charge.mp3",	//25
	"bigbang_fire2.wav",	//26
	"fingerBeamCharge.wav",	//27
	"energyCharge2.mp3",	//28
	"kamehameha_fire.wav",	//29
	"NewExplosion3.mp3",	//30
	"buster_fire.wav",		//31
	"disc_charge.wav",		//32
	"disc_fire.wav",		//33
	"disc_kill.wav",		//34
	"solarflare.wav",		//35
	"burning_fire.wav", 	//36
	"sbc_charge.wav",       //37
	"sbc_fire.wav",         //38
	"block1.wav",			//39
	"NewExplosion.wav",		//40
	"recoverjump.wav",		//41
	"sparks.mp3",			//42
	"struggle.wav",			//43
	"sparks2.mp3",			//44
	"sheathe.wav",			//45
	"scouter.wav",			//46
	"groundhit3.mp3",		//47
	"sparks3.mp3",			//48
	"meleestruggleinit.wav",//49
	"energyBurst1.wav",		//50
	"fieldOn.wav",			//51
	"errorShort.wav",		//52
	"alertStam.wav",		//53
	"powerShutDown.wav",	//54
	"dropped.wav",			//55
	"rain.wav",				//56
	"revert.wav",			//57
	"block1.wav",			//58
	"block2.wav",			//59
	"block3.wav",			//60
	"swing1.wav",			//61
	"swing2.wav",			//62
	"swing3.wav",			//63
	"QBlast3.wav",			//64
	"beep1.wav",			//65
	"beep2.wav",			//66
	"beep3.wav",			//67
	"beep4.wav",			//68
	"explosionFar1.wav",	//69
	"explosionFar2.wav",	//70
	"explosionFar3.wav",	//71
	"scanning.wav",			//72
	"DataStream.mp3",		//73
	"airrecover.wav",		//74
	];
	var voiceSounds = [ //Vegeta and Android 18
	"I1.wav", 			//0
	"I2.wav", 			//1
	"I3.wav", 			//2
	"I4.wav",			//3
	"I5.wav",			//4
	"I6.wav",			//5
	"I7A.wav",			//6
	"I7B.wav",			//7
	"I8A.wav",			//8
	"I8B.wav",			//9
	"V1.wav",			//10
	"V2.wav",			//11
	"V3.wav",			//12
	"V4.wav",			//13
	"V5.wav",			//14
	"V6.wav",			//15
	"V7.wav",			//16
	"E1.wav",			//17
	"E2.wav", 			//18
	"E3.wav",			//19
	"E4.wav",			//20
	"E5.wav",			//21
	"E6.wav",			//22
	"E7.wav",			//23
	"V8.wav",			//24
	"V9.wav",			//25
	"VAT1.wav",			//26
	"VAT2.wav",			//27
	"V10.wav",			//28
	"V11.wav",  		//29
	"I9.wav", 			//30
	"I10.wav", 			//31
	"I11.wav", 			//32
	"VAT3.wav",			//33
	"VAT4.wav",			//34
	"VH1.wav",			//35
	"VH2.wav",			//36
	"VH3.wav",  		//37
	"EH1.wav", 			//38
	"EH2.wav", 			//39
	"EH3.wav", 			//40
	"EE1.wav",  		//41
	"EE2.wav", 			//42
	"VE1.wav", 			//43
	"VE2.wav", 			//44
	"ED1.wav",  		//45
	"ED2.wav", 			//46
	"VD1.wav", 			//47
	"VD2.wav", 			//48
	"GE1.wav", 			//49
	"GE2.wav", 			//50
	"VAT5.wav",			//51
	"VAT6.wav",  		//52
	"VAT7.wav",			//53
	"VAT8.wav",			//54
	"EF1.wav", 			//55
	"EF2.wav", 			//56
	"EF3.wav", 			//57
	"GED1.wav", 		//58 //gero
	"EHI1.wav", 		//59
	"EHI2.wav", 		//60
	"EHI3.wav", 		//61
	"EAT1.wav", 		//62
	"EAT2.wav", 		//63
	"EAT3.wav", 		//64
	"EAT4.wav", 		//65
	"VHI1.wav", 		//66
	"VHI2.wav", 		//67
	"VHI3.wav", 		//68
	"GER1.wav", 		//69
	"GER2.wav", 		//70
	"GER3.wav", 		//71
	
	];
	
	var voiceSoundsPiccolo = [ //Piccolo
	"P1.wav", 			//0
	"P2.wav", 			//1
	"P3.wav", 			//2
	"P4.wav",			//3
	"P5.wav",			//4
	"P6.wav",			//5
	"P7.wav",			//6
	"PAT1.wav",			//7
	"PAT2.wav",			//8
	"PAT3.wav",			//9
	"P8.wav",			//10
	"P9.wav",			//11
	"PAT4.wav",			//12
	"PH1.wav",			//13
	"PH2.wav",			//14
	"PH3.wav",			//15
	"PE1.wav",			//16
	"PE2.wav",			//17
	"PD1.wav",			//18
	"PD2.wav",			//19
	"PHI1.wav",			//20
	"PHI2.wav",			//21
	"PHI3.wav",			//22
	];
	
	var voiceSounds17 = [ //Android 17
	"S1.wav", 			//0
	"S2.wav", 			//1
	"S3.wav", 			//2
	"S4.wav",			//3
	"S5.mp3",			//4
	"S6.mp3",			//5
	"S7.mp3",			//6
	"S8.wav",			//7
	"S9.wav",			//8
	"17H1.wav", 		//9
	"17H2.wav", 		//10
	"17H3.wav", 		//11
	"SHI1.wav", 		//12
	"SHI2.wav", 		//13
	"SHI3.wav", 		//14
	"SAT1.wav", 		//15
	"SAT2.wav", 		//16
	"SAT3.wav", 		//17
	"SAT4.wav", 		//18
	"SAF1.wav", 		//19
	"SAF2.wav", 		//20
	"SAF3.wav", 		//21
	"SI1.wav", 			//22
	"SI2.wav", 			//23
	];
	
	var voiceSoundsGohan = [ //Gohan
	"G1.wav", 			//0
	"G2.wav", 			//1
	"G3.wav", 			//2
	"G4.wav",			//3
	"G5.wav",			//4
	"G6.wav",			//5
	"G7.wav",			//6
	"G8.wav",			//7
	"G9.wav",			//8
	"GAT1.wav",			//9
	"GAT2.wav",			//10
	"GAT3.wav",			//11
	"GAT4.wav",			//12
	"GH1.wav",			//13
	"GH2.wav",			//14
	"GH3.wav",			//15
	"GS1.wav", 			//16
	"GS2.wav", 			//17
	"GS3.wav", 			//18
	"GS4.wav",			//19
	"GS5.wav",			//20
	"GS6.wav",			//21
	"GS7.wav",			//22
	"GAT5.wav",			//23
	"GAT6.wav",			//24
	"KH3.wav",			//25
	"KH4.wav",			//26
	"GSH1.wav", 		//27
	"GSH2.wav", 		//28
	"GSH3.wav", 		//29
	"GHE1.wav", 		//30
	"GHE2.wav", 		//31
	"GSE1.wav", 		//32
	"GSE2.wav", 		//33
	"GD1.wav", 			//34
	"GD2.wav", 			//35
	"GD3.wav", 			//36
	"GT1.wav", 			//37
	"GT2.wav", 			//38
	"GT3.wav", 			//39
	"GHI1.wav", 		//40
	"GHI2.wav", 		//41
	"GHI3.wav", 		//42
	];
	
	var voiceSoundsTien = [ //Tien
	"TAT1.wav", 			//0
	"TAT2.wav", 			//1
	"TAT3.wav", 			//2
	"TAT5.wav",				//3
	"T1.wav", 				//4
	"T2.wav", 				//5
	"T3.wav",	 			//6
	"TE1.wav", 				//7
	"TE2.wav", 				//8
	"TS10.wav",				//9
	"TS10B.wav",			//10
	"TAT4.wav",				//11
	];
	
	var voiceSoundsKrillin = [ //Krillin
	"KAT1.wav", 			//0
	"KAT2.wav", 			//1
	"KAT3.wav", 			//2
	"KAT4.wav",				//3
	"KAT5.wav",				//4
	"KAT6.wav",				//5
	"KAT7.wav",				//6
	"KAT8.wav",				//7
	"K1.wav", 				//8
	"K2.wav", 				//9
	"K3.wav", 				//10
	"KH1.wav", 				//11
	"KH2.wav", 				//12
	"KE1.wav", 				//13
	"KE2.wav", 				//14
	];
	
	var voiceSoundsOthers = [ //Other characters
	"YAJ1.wav",				//0
	"YAJ2.wav",				//1
	"YAJ3.wav",				//2
	];
	
	var backgroundSounds = [ //Background Sounds
	"rain.wav",				//0
	];
	
	var voiceSoundsScenes = [ //Scenes
	"17Laugh.mp3", 		//0
	"18Laugh.wav", 		//1
	"BS1.wav",  		//2
	"BS2.wav",			//3
	"PS1.wav",			//4
	"PS2.wav",			//5
	"PS3.wav",			//6
	"PS4.wav",			//7
	"PS5.mp3",			//8
	"PS6.wav",			//9
	"PS7.wav",			//10
	"PS8.wav",			//11
	"PS8.wav",			//12
	"TS1.wav", 			//13
	"TS2.wav", 			//14
	"TS3.wav",  		//15
	"TS4.wav",			//16
	"TS5.wav",			//17
	"TS6.wav",			//18
	"TS7.wav",			//19
	"TS8.wav",			//20
	"TS9.wav",			//21
	"TS10.wav",			//22 //Tien What
	"TS11.wav",			//23
	"TS12.wav",			//24
	"TS13.wav",			//25
	"TS14.wav", 		//26
	"TS15.wav", 		//27
	"TS16.wav",  		//28
	"TS17.wav",			//29
	"TS18.wav",			//30
	"TS19.wav",			//31
	"TS20.wav",			//32
	"TS21.wav",			//33
	"TT1.mp3",			//34
	"TT2.wav",			//35
	"TT3.wav",			//36
	"TT4.wav",			//37
	"SF1.wav", 			//38 //start
	"SF2.wav", 			//39
	"SF3.wav",  		//40
	"SF4.mp3",			//41
	"SF5.wav",			//42
	"SF6.wav",			//43
	"SF7.wav",			//44
	"SF8A.wav",			//45
	"SF8B.wav",			//46
	"SF9.wav",			//47
	"SF10.wav",			//48
	"SF11A.wav",		//49
	"SF11B.wav",		//50
	"SF12.wav", 		//51
	"SF13A.wav", 		//52
	"SF13B.wav",  		//53
	"TF1.wav", 			//54 //start
	"TF2.wav", 			//55
	"TF3.wav",  		//56
	"TF4.wav",			//57
	"TF5.wav",			//58
	"TF6.wav",			//59
	"TF7.wav",			//60
	"TF8.wav",			//61
	"TF9.wav",			//62
	"TF10.wav",			//63
	"TF11.wav",			//64
	"TF12.wav", 		//65
	"TFA.wav", 			//66
	"TFB.wav",  		//67
	"TFC.wav",  		//68
	"TFD.wav",	  		//69
	"EN1.wav", 			//70 //start
	"EN2.wav", 			//71
	"EN3.wav",  		//72
	"EN4.wav",			//73
	"EN5.wav",			//74
	"EN6.wav",			//75
	"EN7.wav",			//76
	"EN8.wav",			//77
	"EN9.wav",			//78
	"EN10.wav",			//79
	"17win1.wav", 		//80
	"17win2.wav", 		//81
	"18win1.wav",  		//82
	"18win2.wav",		//83
	"EX1.wav", 			//84
	"EX2.wav", 			//85
	"EX3.wav",  		//86
	"EX4.wav",			//87
	"TFE.wav"			//88
	];
	
	var sceneSongs = [ //Music
	"SceneSongP.wav", 	//0
	"PiccoloFight.mp3", //1
	"Devastation.wav",  //2
	"Vegeta_theme.mp3", //3
	"Credits.mp3",		//4
	"YamchaSong.mp3", 	//5
	"FaceOff.mp3",  	//6
	"BeforeBrawl.mp3", 	//7
	"Dragon.mp3",		//8
	"Finale.mp3", 		//9
	"End.mp3",			//10
	"preludeEnd2.mp3",  //11
	"TEnd.mp3", 		//12
	"Ascend.mp3",		//13
	"TrueFinal.mp3",   	//14
	"Finale2.mp3",   	//15
	//"PauseTheme.mp3"   	//16
	];
	

	//INITALIZE ALL SOUND CHANNELS
	function init(){
		bgAudio = document.querySelector("#bgAudio");
		bgAudio.volume=0.20;
		bgAudioTutorial = document.querySelector("#bgAudioTutorial");
		bgAudioTutorial.volume=0.20;
		bgAudioWin = document.querySelector("#bgAudio2");
		bgAudioWin.volume=0.30;
		bgAudioLoss = document.querySelector("#bgAudio3");
		bgAudioLoss.volume=0.30;
		bgAudioScene = document.querySelector("#bgAudio4");
		bgAudioScene.volume=0.30;
		bgAudioPause = document.querySelector("#bgAudio5");
		bgAudioPause.volume=0.30;
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
	
	
	function playIntro(num){
		effectAudio[0].pause();
		effectAudio[0].currentTime = 0;
		effectAudio[0].src = "media/" + effectSounds[num];
		effectAudio[0].play();
	}
	
	function playEffect(num){
		effectAudio[1].pause();
		effectAudio[1].currentTime = 0;
		effectAudio[1].src = "media/" + effectSounds[num];
		effectAudio[1].play();
	}
	
	function playEffectLoud(num){
		effectAudio[1].pause();
		effectAudio[1].currentTime = 0;
		effectAudio[1].volume = 0.4;
		effectAudio[1].src = "media/" + effectSounds[num];
		effectAudio[1].play();
	}
	
	function playBackground(num){
		effectAudio[23].pause();
		effectAudio[23].src = "media/" + backgroundSounds[num];
		effectAudio[23].play();
	}
	
	function stopEffect(){
		effectAudio[1].pause();
		effectAudio[1].currentTime = 0;
	}
	
	function pauseBackground(){
		effectAudio[23].pause();
	}
	
	function stopBackground(){
		effectAudio[23].pause();
		effectAudio[23].currentTime = 0;
	}
	
	function playBasicAttack(num){
		effectAudio[2].pause();
		effectAudio[2].currentTime = 0;
		effectAudio[2].src = "media/" + effectSounds[num];
		effectAudio[2].play();
	}
	
	function playBasicAttack2(num){
		effectAudio[3].pause();
		effectAudio[3].currentTime = 0;
		effectAudio[3].src = "media/" + effectSounds[num];
		effectAudio[3].play();
	}
	
	function playEnergyAttack(num){
		effectAudio[4].pause();
		effectAudio[4].currentTime = 0;
		effectAudio[4].src = "media/" + effectSounds[num];
		effectAudio[4].play();
	}
	
	function playEnergyAttack2(num){
		effectAudio[5].pause();
		effectAudio[5].currentTime = 0;
		effectAudio[5].src = "media/" + effectSounds[num];
		effectAudio[5].play();
	}
	
	function playEnergyReaction(num){
		effectAudio[6].pause();
		effectAudio[6].currentTime = 0;
		effectAudio[6].src = "media/" + effectSounds[num];
		effectAudio[6].play();
	}
	
	function playEnergyReaction2(num){
		effectAudio[7].pause();
		effectAudio[7].currentTime = 0;
		effectAudio[7].src = "media/" + effectSounds[num];
		effectAudio[7].play();
	}
	
	function playBasicReaction(num){
		effectAudio[8].pause();
		effectAudio[8].currentTime = 0;
		effectAudio[8].src = "media/" + effectSounds[num];
		effectAudio[8].play();
	}
	
	function playBasicReaction2(num){
		effectAudio[9].pause();
		effectAudio[9].currentTime = 0;
		effectAudio[9].src = "media/" + effectSounds[num];
		effectAudio[9].play();
	}
	
	function playSpecialReaction(num){
		effectAudio[10].pause();
		effectAudio[10].currentTime = 0;
		effectAudio[10].src = "media/" + effectSounds[num];
		effectAudio[10].play();
	}
	
	function playSpecialReaction2(num){
		effectAudio[11].pause();
		effectAudio[11].currentTime = 0;
		effectAudio[11].src = "media/" + effectSounds[num];
		effectAudio[11].play();
	}
	
	function playTaunt1(num){
		effectAudio[12].pause();
		effectAudio[12].currentTime = 0;
		effectAudio[12].src = "media/" + voiceSounds[num];
		effectAudio[12].play();
	}
	
	function playTaunt2(num){
		effectAudio[13].pause();
		effectAudio[13].currentTime = 0;
		effectAudio[13].src = "media/" + voiceSounds[num];
		effectAudio[13].play();
	}
	
	function playTaunt3(num){
		effectAudio[14].pause();
		effectAudio[14].currentTime = 0;
		effectAudio[14].src = "media/" + voiceSounds[num];
		effectAudio[14].play();
	}
	
	function playTaunt4(num){
		effectAudio[15].pause();
		effectAudio[15].currentTime = 0;
		effectAudio[15].src = "media/" + voiceSoundsPiccolo[num];
		effectAudio[15].play();
	}
	
	function playTaunt5(num){
		effectAudio[16].pause();
		effectAudio[16].currentTime = 0;
		effectAudio[16].src = "media/" + voiceSounds17[num];
		effectAudio[16].play();
	}
	
	function playTaunt6(num){
		effectAudio[17].pause();
		effectAudio[17].currentTime = 0;
		effectAudio[17].src = "media/" + voiceSoundsGohan[num];
		effectAudio[17].play();
	}
	
	function playVoice1(num){
		effectAudio[18].pause();
		effectAudio[18].currentTime = 0;
		effectAudio[18].src = "media/" + voiceSoundsScenes[num];
		effectAudio[18].play();
	}
	
	function playVoice2(num){
		effectAudio[19].pause();
		effectAudio[19].currentTime = 0;
		effectAudio[19].src = "media/" + voiceSoundsScenes[num];
		effectAudio[19].play();
	}
	
	function playTaunt7(num){
		effectAudio[20].pause();
		effectAudio[20].currentTime = 0;
		effectAudio[20].src = "media/" + voiceSoundsTien[num];
		effectAudio[20].play();
	}
	
	function playTaunt8(num){
		effectAudio[21].pause();
		effectAudio[21].currentTime = 0;
		effectAudio[21].src = "media/" + voiceSoundsKrillin[num];
		effectAudio[21].play();
	}
	
	function playTaunt9(num){
		effectAudio[22].pause();
		effectAudio[22].currentTime = 0;
		effectAudio[22].src = "media/" + voiceSoundsOthers[num];
		effectAudio[22].play();
	}
	
	
	function playBGAudio(){
		bgAudio.play();
	}
	
	function playBGAudioTutorial(){
		bgAudioTutorial.play();
	}
	
	function playBGAudioWin(){
		bgAudioWin.play();
	}
	
	function playBGAudioPause(){
		bgAudioPause.play();
	}
	
	function playBGAudioLoss(){
		bgAudioLoss.play();
	}
	
	function playBGAudioScene(num){
		bgAudioScene.pause();
		//bgAudioScene.currentTime = 0;
		bgAudioScene.src = "media/" + sceneSongs[num];
		bgAudioScene.play();
	}
	
	function resumeBGAudioScene(){
		//bgAudioScene.src = "media/" + sceneSongs[0];
		bgAudioScene.play();
	}
	
	function resumeBackground(){
		effectAudio[23].play();
	}
	
	function stopBGAudio(){
		bgAudio.pause();
		bgAudio.currentTime = 0;
	}
	
	function stopBGAudioTutorial(){
		bgAudioTutorial.pause();
		bgAudioTutorial.currentTime = 0;
	}
	
	function stopBGAudioWin(){
		bgAudioWin.pause();
		bgAudioWin.currentTime = 0;
	}
	
	function stopBGAudioPause(){
		bgAudioPause.pause();
		bgAudioPause.currentTime = 0;
	}
	
	function stopBGAudioLoss(){
		bgAudioLoss.pause();
		bgAudioLoss.currentTime = 0;
	}
	
	function stopBGAudioScene(){
		bgAudioScene.pause();
		bgAudioScene.currentTime = 0;
	}
	
	function pauseBGAudio(){
		bgAudio.pause();
	}
	
	function pauseBGAudioPause(){
		bgAudioPause.pause();
	}
	
	function pauseBGAudioTutorial(){
		bgAudioTutorial.pause();
	}
	
	function pauseBGAudioWin(){
		bgAudioWin.pause();
	}
	
	function pauseBGAudioLoss(){
		bgAudioLoss.pause();
	}
	
	function pauseBGAudioScene(){
		bgAudioScene.pause();
	}
	
	function pauseVoice(){
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
	function pauseVoice1(){
		effectAudio[12].pause();
		effectAudio[12].currentTime = 0;
	}
	
	function pauseVoice2(){
		effectAudio[13].pause();
		effectAudio[13].currentTime = 0;
	}
	
	function pauseVoice3(){
		effectAudio[14].pause();
		effectAudio[14].currentTime = 0;
	}
	
	function pauseVoice4(){
		effectAudio[15].pause();
		effectAudio[15].currentTime = 0;
	}
	
	function pauseVoice5(){
		effectAudio[16].pause();
		effectAudio[16].currentTime = 0;
	}
	
	function pauseVoice6(){
		effectAudio[17].pause();
		effectAudio[17].currentTime = 0;
	}
	
	function pauseVoice7(){
		effectAudio[20].pause();
		effectAudio[20].currentTime = 0;
	}
	
	function pauseVoice8(){
		effectAudio[21].pause();
		effectAudio[21].currentTime = 0;
	}
		
	// export a public interface to this module
	return{
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
}());