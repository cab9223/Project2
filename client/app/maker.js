const handlePassword = (e) => {
  e.preventDefault();
  $("#domoMessage").animate({width:'hide'},350);
  
  if($("#oldPass").val() == '' || $("#pass").val() == '' || $("pass2").val() == '') {
    handleError("All fields required");
	return false;
  }
  
  if($("#pass").val() !== $("#pass2").val()) {
    handleError("Passwords must match");
	return false;
  } 

  sendAjax('POST', $("#passwordForm").attr("action"), $("#passwordForm").serialize(), redirect);

  return false;
};  



const PasswordWindow = (props) => {
  return (
  
    <form id="passwordForm"
	  name="passwordForm"
	  onSubmit={handlePassword}
	  action="/passwordChange"
	  method="POST"
	  className="mainForm"
	>
	  <label htmlFor="oldPass">Old Pass: </label>
	  <input id="oldPass" type="password" name="oldPass" placeholder="old passwold"/>
	  <label htmlFor="pass">New Pass: </label>
	  <input id="pass" type="password" name="pass" placeholder="password"/>
	  <label htmlFor="pass2">New Pass: </label>
	  <input id="pass2" type="password" name="pass2" placeholder="retype password"/>
	  <input type="hidden" name="_csrf" value={props.csrf} />
	  <input className="formSubmit" type="submit" value="Submit" />
	
	</form>
  );
};


const createPasswordWindow = (csrf) => {
  $("#mainMessage").text("Mod Password");
  $("#errorMessage").text("...Awaiting...");
	
  $("#container").children().hide();
  
  $("#visuals").children().show();
  $("#visuals2").children().hide();
	
  ReactDOM.render(
    <div />, document.querySelector("#makeDomo")
  );
  
  ReactDOM.render(
    <div />, document.querySelector("#domos")
  );
  
  ReactDOM.render(
    <div />, document.querySelector("#scores")
  );
	
  ReactDOM.render(
    <PasswordWindow csrf={csrf} />,
	document.querySelector("#moreContent")
  );
};

const createDomoWindow = (csrf) => {
  $("#mainMessage").text("");
  $("#errorMessage").text("");
	
  $("#container").children().hide();
  
  $("#visuals").children().hide();
  $("#visuals2").children().show();
	
  ReactDOM.render(
    <div />, document.querySelector("#moreContent")
  );
  
  ReactDOM.render(
    <div />, document.querySelector("#makeDomo")
  );
  
  /* ReactDOM.render(
    <DomoForm domos={[]} />, document.querySelector("#domos")
  ); */
  
  ReactDOM.render(
    <div />, document.querySelector("#scores")
  );
  
  
  //document.querySelector("#domoForm").submit();
  
  loadDomosFromServer();
};

const createScoreWindow = (csrf) => {
  $("#mainMessage").text("");
  $("#errorMessage").text("");
	
  $("#container").children().hide();
  
  $("#visuals").children().hide();
  $("#visuals2").children().show();
	
  ReactDOM.render(
    <div />, document.querySelector("#moreContent")
  );
  
  ReactDOM.render(
    <div />, document.querySelector("#makeDomo")
  );
  
  ReactDOM.render(
    <div />, document.querySelector("#domos")
  );
  
  
  //document.querySelector("#domoForm").submit();
  
  loadScoresFromServer();
};

const createGameWindow = (csrf) => {
  $("#mainMessage").text("");
  $("#errorMessage").text("");
	
  $("#container").children().show();
	
  $("#makeDomo").children().hide();
  
  $("#visuals").children().hide();
  $("#visuals2").children().hide();
	
  ReactDOM.render(
    <DomoForm csrf={csrf} domos={[]}/>, document.querySelector("#makeDomo")
  );
  
  $("#makeDomo").children().hide();
  
  
  //document.querySelector("#statSubmit").click();
  
  ReactDOM.render(
    <div />, document.querySelector("#moreContent")
  );
  
  ReactDOM.render(
    <div />, document.querySelector("#domos")
  );
  
  ReactDOM.render(
    <div />, document.querySelector("#scores")
  );

};

const handleDomo = (e) => {
  e.preventDefault();
  
  $("#domoMessage").animate({width:'hide'},350);
  
  /* if($("#name").val() == '' || $("#taunts").val() == '' || $("#hs18").val() == '' || $("#hs17").val() == '') {
    handleError("RAWR! All fields are required");
	return false;
  }; */
  
  sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function() {
	loadDomosFromServer();
  });
  
  return false;
};

const DomoForm = (props) => {
    return (
	<form id="domoForm"
	  onSubmit={handleDomo}
	  name="domoForm"
	  action="/maker"
	  method="POST"
	  className="domoForm"
	>
	  <input id="name" type="text" name="name" placeholder="name"/>
	  <input id="hsTotal" type="text" name="hsTotal" value={app.main.hsTotal}/>
	  <input id="hs18" type="text" name="hs18" value={app.main.hs18}/>
	  <input id="hs17" type="text" name="hs17" value={app.main.hs17}/>
	  <input id="recentVictory" type="boolean" name="recentVictory" value={app.main.recentVictory}/>
	  <input id="victories" type="text" name="victories" value={app.main.victories}/>
	  <input id="hsVictory" type="text" name="hsVictory" value={app.main.hsVictory}/>
	  <input id="kills" type="text" name="kills" value={app.main.kills}/>
	  <input id="recentDomination" type="boolean" name="recentDomination" value={app.main.recentDomination}/>
	  <input id="dominations" type="text" name="dominations" value={app.main.dominations}/>
	  <input id="recentPerfect" type="boolean" name="recentPerfect" value={app.main.recentPerfect}/>
	  <input id="perfects" type="text" name="perfects" value={app.main.perfects}/>
	  <input id="destroyed" type="text" name="destroyed" value={app.main.destroyed}/>
	  <input id="taunts" type="text" name="taunts" value={app.main.taunts}/>
	  <input id="teleports" type="text" name="teleports" value={app.main.teleports}/>
	  <input type="hidden" name="_csrf" value={props.csrf} />
	  <input className="formSubmit" id="statSubmit" type="submit" value="Submit" />
	</form>
  );
};


const DomoList = function(props) {
  if(props.domos.length === 0) {
    return (
	  <div className="domoList">
	    <h3 className="emptyDomo">No Statistics accumulated</h3>
      </div>
	);
  }
  
  const domoNodes = props.domos.map(function(domo) {
    
	//send data to game
	if(app.main.gameState != app.main.GAME_STATE.DEFAULT){
	  app.main.hsTotal = domo.hsTotal;
	  app.main.hs18 = domo.hs18;
	  app.main.hs17 = domo.hs17;
	  app.main.victories = domo.victories;
	  app.main.hsVictory = domo.hsVictory;
	  app.main.kills = domo.kills;
	  app.main.dominations = domo.dominations;
	  app.main.perfects = domo.perfects;
	  app.main.destroyed = domo.destroyed;
	  app.main.taunts = domo.taunts;
	  app.main.teleports = domo.teleports;
	}
	if(app.main.loaded == true){
	return (
	  <div key={domo._id} className="domo">
	    <h1 className="labled">Statistics</h1>
		<h3 className="name"> <span className="labled2">Indentity:</span> {domo.name} </h3>
		<h3 className="hsTotal"> <span className="labled2">Total High Score:</span> {domo.hsTotal} </h3>
		<h3 className="hs18">  <span className="labled2">High Android 18 Score:</span> {domo.hs18} </h3>
		<h3 className="hs17">  <span className="labled2">High Android 17 Score:</span> {domo.hs17} </h3>
		<h3 className="victories">  <span className="labled2">Victories:</span> {domo.victories} </h3>
		<h3 className="hsVictory">  <span className="labled2">High Victory Score:</span> {domo.hsVictory} </h3>
		<h3 className="kills">  <span className="labled2">Total Kills:</span> {domo.kills} </h3>
		<h3 className="dominations">  <span className="labled2">Dominations:</span> {domo.dominations} </h3>
		<h3 className="perfects">  <span className="labled2">Perfects:</span> {domo.perfects} </h3>
		<h3 className="destroyed">  <span className="labled2">Destroyed:</span> {domo.destroyed} </h3>
		<h1 className="labled"> Extra Stats </h1>
		<h3 className="taunts">  <span className="labled2">Taunts:</span> {domo.taunts} </h3>
		<h3 className="teleports">  <span className="labled2">Super Speeds:</span> {domo.teleports} </h3>
	  </div>
    );
	} else {
	  return (<div />);
	}
  });
  
  return (
    <div className="domoList">
	  {domoNodes}
	</div>
  );
};

const ScoreList = function(props) {
  if(props.scores.length === 0) {
    return (
	  <div className="domoList">
	    <h3 className="emptyDomo">No Scores accumulated</h3>
      </div>
	);
  }
  
  let hScores = props.scores;
  
  console.dir(props.scores);
  
  console.dir(hScores);
  
  function compare(a,b) {
    if (a.hsTotal > b.hsTotal)
      return -1;
    if (a.hsTotal < b.hsTotal)
      return 1;
    return 0;
  }
  
  hScores.sort(compare);
  
  console.log("after");
  console.dir(hScores);
  
  hScores.splice(5,1000000000000); //Remove all extra scores
  
  let number = 0;
  
  const scoreNodes = hScores.map(function(score) {
	number++;
	
	return (
	  <div className="score">
	    <img src="/assets/images/RedRibbon.png" alt="domo face" className="domoFace" />
		<h3 className="scores"> <span className="labled3">{number}</span> </h3>
		<h3 className="scores"> <span className="labled2">Identity:</span> {score.name} </h3>
		<h3 className="scores"> <span className="labled2">Score:</span> {score.hsTotal} </h3>
	  </div>
      );
    
  });
  
  console.log("NODES");
  console.dir(scoreNodes);
  
  return (
    <div className="scoreList">
	  {scoreNodes}
	</div>
  );
};

const loadDomosFromServer = () => {
  sendAjax('GET', '/getDomos', null, (data) => {
    ReactDOM.render(
      <DomoList domos={data.domos} />, document.querySelector("#domos")
    );
  });
};

const loadScoresFromServer = () => {
  sendAjax('GET', '/getScores', null, (data) => {
    ReactDOM.render(
      <ScoreList scores={data.scores} />, document.querySelector("#scores")
    );
  });
};

const setup = function(csrf) {
	
  canvas[0] = document.querySelector('#canvasBack');
  ctx[0] = canvas[0].getContext('2d');
  
  passwordButton.addEventListener("click", (e) => {
    e.preventDefault();
	app.main.pausedGame();
	createPasswordWindow(csrf);
	app.main.onScreen = false;
	paused = true;
	return false;
  });
  
  gameButton.addEventListener("click", (e) => {
    e.preventDefault();
	createGameWindow(csrf);
	//app.main.pausedGame();
	app.main.onScreen = true;
	app.main.sound.playEffect(66);
	if(app.main.gameState == app.main.GAME_STATE.BEGIN){
	  app.main.resumeGame();
	}
	return false;
  });
  
  domoButton.addEventListener("click", (e) => {
    e.preventDefault();
	createDomoWindow(csrf);
	app.main.pausedGame();
	app.main.onScreen = false;
	paused = true;
	return false;
  });
  
  scoreButton.addEventListener("click", (e) => {
    e.preventDefault();
	createScoreWindow(csrf);
	app.main.pausedGame();
	app.main.onScreen = false;
	paused = true;
	return false;
  });
  
  passwordButton.className = "disabledLink";
  domoButton.className = "disabledLink";
  scoreButton.className = "disabledLink";
  gameButton.focus();
	  
  //Begin update loop
  requestAnimationFrame(update);
  
  paused = false;
  
  createGameWindow(csrf); //default view
  
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
  });
};

$(document).ready(function() {
  getToken();
});

const passwordButton = document.querySelector("#passwordButton");
const domoButton = document.querySelector("#maker");
const scoreButton = document.querySelector("#scoreButton");
const gameButton = document.querySelector("#gameButton");
