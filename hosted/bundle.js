"use strict";

var handlePassword = function handlePassword(e) {
  e.preventDefault();
  $("#domoMessage").animate({ width: 'hide' }, 350);

  if ($("#oldPass").val() == '' || $("#pass").val() == '' || $("pass2").val() == '') {
    handleError("All fields required");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("Passwords must match");
    return false;
  }

  sendAjax('POST', $("#passwordForm").attr("action"), $("#passwordForm").serialize(), redirect);

  return false;
};

var PasswordWindow = function PasswordWindow(props) {
  return React.createElement(
    "form",
    { id: "passwordForm",
      name: "passwordForm",
      onSubmit: handlePassword,
      action: "/passwordChange",
      method: "POST",
      className: "mainForm"
    },
    React.createElement(
      "label",
      { htmlFor: "oldPass" },
      "Old Pass: "
    ),
    React.createElement("input", { id: "oldPass", type: "password", name: "oldPass", placeholder: "old passwold" }),
    React.createElement(
      "label",
      { htmlFor: "pass" },
      "New Pass: "
    ),
    React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "password" }),
    React.createElement(
      "label",
      { htmlFor: "pass2" },
      "New Pass: "
    ),
    React.createElement("input", { id: "pass2", type: "password", name: "pass2", placeholder: "retype password" }),
    React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
    React.createElement("input", { className: "formSubmit", type: "submit", value: "Submit" })
  );
};

var createPasswordWindow = function createPasswordWindow(csrf) {
  $("#mainMessage").text("Mod Password");
  $("#errorMessage").text("...Awaiting...");

  $("#container").children().hide();

  $("#visuals").children().show();
  $("#visuals2").children().hide();

  ReactDOM.render(React.createElement("div", null), document.querySelector("#makeDomo"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#domos"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#scores"));

  ReactDOM.render(React.createElement(PasswordWindow, { csrf: csrf }), document.querySelector("#moreContent"));
};

var createDomoWindow = function createDomoWindow(csrf) {
  $("#mainMessage").text("");
  $("#errorMessage").text("");

  $("#container").children().hide();

  $("#visuals").children().hide();
  $("#visuals2").children().show();

  ReactDOM.render(React.createElement("div", null), document.querySelector("#moreContent"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#makeDomo"));

  /* ReactDOM.render(
    <DomoForm domos={[]} />, document.querySelector("#domos")
  ); */

  ReactDOM.render(React.createElement("div", null), document.querySelector("#scores"));

  //document.querySelector("#domoForm").submit();

  loadDomosFromServer();
};

var createScoreWindow = function createScoreWindow(csrf) {
  $("#mainMessage").text("");
  $("#errorMessage").text("");

  $("#container").children().hide();

  $("#visuals").children().hide();
  $("#visuals2").children().show();

  ReactDOM.render(React.createElement("div", null), document.querySelector("#moreContent"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#makeDomo"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#domos"));

  //document.querySelector("#domoForm").submit();

  loadScoresFromServer();
};

var createGameWindow = function createGameWindow(csrf) {
  $("#mainMessage").text("");
  $("#errorMessage").text("");

  $("#container").children().show();

  $("#makeDomo").children().hide();

  $("#visuals").children().hide();
  $("#visuals2").children().hide();

  ReactDOM.render(React.createElement(DomoForm, { csrf: csrf, domos: [] }), document.querySelector("#makeDomo"));

  $("#makeDomo").children().hide();

  //document.querySelector("#statSubmit").click();

  ReactDOM.render(React.createElement("div", null), document.querySelector("#moreContent"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#domos"));

  ReactDOM.render(React.createElement("div", null), document.querySelector("#scores"));
};

var handleDomo = function handleDomo(e) {
  e.preventDefault();

  $("#domoMessage").animate({ width: 'hide' }, 350);

  /* if($("#name").val() == '' || $("#taunts").val() == '' || $("#hs18").val() == '' || $("#hs17").val() == '') {
    handleError("RAWR! All fields are required");
  return false;
  }; */

  sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function () {
    loadDomosFromServer();
  });

  return false;
};

var DomoForm = function DomoForm(props) {
  return React.createElement(
    "form",
    { id: "domoForm",
      onSubmit: handleDomo,
      name: "domoForm",
      action: "/maker",
      method: "POST",
      className: "domoForm"
    },
    React.createElement("input", { id: "name", type: "text", name: "name", placeholder: "name" }),
    React.createElement("input", { id: "hsTotal", type: "text", name: "hsTotal", value: app.main.hsTotal }),
    React.createElement("input", { id: "hs18", type: "text", name: "hs18", value: app.main.hs18 }),
    React.createElement("input", { id: "hs17", type: "text", name: "hs17", value: app.main.hs17 }),
    React.createElement("input", { id: "recentVictory", type: "boolean", name: "recentVictory", value: app.main.recentVictory }),
    React.createElement("input", { id: "victories", type: "text", name: "victories", value: app.main.victories }),
    React.createElement("input", { id: "hsVictory", type: "text", name: "hsVictory", value: app.main.hsVictory }),
    React.createElement("input", { id: "kills", type: "text", name: "kills", value: app.main.kills }),
    React.createElement("input", { id: "recentDomination", type: "boolean", name: "recentDomination", value: app.main.recentDomination }),
    React.createElement("input", { id: "dominations", type: "text", name: "dominations", value: app.main.dominations }),
    React.createElement("input", { id: "recentPerfect", type: "boolean", name: "recentPerfect", value: app.main.recentPerfect }),
    React.createElement("input", { id: "perfects", type: "text", name: "perfects", value: app.main.perfects }),
    React.createElement("input", { id: "destroyed", type: "text", name: "destroyed", value: app.main.destroyed }),
    React.createElement("input", { id: "taunts", type: "text", name: "taunts", value: app.main.taunts }),
    React.createElement("input", { id: "teleports", type: "text", name: "teleports", value: app.main.teleports }),
    React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
    React.createElement("input", { className: "formSubmit", id: "statSubmit", type: "submit", value: "Submit" })
  );
};

var DomoList = function DomoList(props) {
  if (props.domos.length === 0) {
    return React.createElement(
      "div",
      { className: "domoList" },
      React.createElement(
        "h3",
        { className: "emptyDomo" },
        "No Statistics accumulated"
      )
    );
  }

  var domoNodes = props.domos.map(function (domo) {

    //send data to game
    if (app.main.gameState != app.main.GAME_STATE.DEFAULT) {
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
    if (app.main.loaded == true) {
      return React.createElement(
        "div",
        { key: domo._id, className: "domo" },
        React.createElement(
          "h1",
          { className: "labled" },
          "Statistics"
        ),
        React.createElement(
          "h3",
          { className: "name" },
          " ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Indentity:"
          ),
          " ",
          domo.name,
          " "
        ),
        React.createElement(
          "h3",
          { className: "hsTotal" },
          " ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Total High Score:"
          ),
          " ",
          domo.hsTotal,
          " "
        ),
        React.createElement(
          "h3",
          { className: "hs18" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "High Android 18 Score:"
          ),
          " ",
          domo.hs18,
          " "
        ),
        React.createElement(
          "h3",
          { className: "hs17" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "High Android 17 Score:"
          ),
          " ",
          domo.hs17,
          " "
        ),
        React.createElement(
          "h3",
          { className: "victories" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Victories:"
          ),
          " ",
          domo.victories,
          " "
        ),
        React.createElement(
          "h3",
          { className: "hsVictory" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "High Victory Score:"
          ),
          " ",
          domo.hsVictory,
          " "
        ),
        React.createElement(
          "h3",
          { className: "kills" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Total Kills:"
          ),
          " ",
          domo.kills,
          " "
        ),
        React.createElement(
          "h3",
          { className: "dominations" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Dominations:"
          ),
          " ",
          domo.dominations,
          " "
        ),
        React.createElement(
          "h3",
          { className: "perfects" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Perfects:"
          ),
          " ",
          domo.perfects,
          " "
        ),
        React.createElement(
          "h3",
          { className: "destroyed" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Destroyed:"
          ),
          " ",
          domo.destroyed,
          " "
        ),
        React.createElement(
          "h1",
          { className: "labled" },
          " Extra Stats "
        ),
        React.createElement(
          "h3",
          { className: "taunts" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Taunts:"
          ),
          " ",
          domo.taunts,
          " "
        ),
        React.createElement(
          "h3",
          { className: "teleports" },
          "  ",
          React.createElement(
            "span",
            { className: "labled2" },
            "Super Speeds:"
          ),
          " ",
          domo.teleports,
          " "
        )
      );
    } else {
      return React.createElement("div", null);
    }
  });

  return React.createElement(
    "div",
    { className: "domoList" },
    domoNodes
  );
};

var ScoreList = function ScoreList(props) {
  if (props.scores.length === 0) {
    return React.createElement(
      "div",
      { className: "domoList" },
      React.createElement(
        "h3",
        { className: "emptyDomo" },
        "No Scores accumulated"
      )
    );
  }

  var hScores = props.scores;

  console.dir(props.scores);

  console.dir(hScores);

  function compare(a, b) {
    if (a.hsTotal > b.hsTotal) return -1;
    if (a.hsTotal < b.hsTotal) return 1;
    return 0;
  }

  hScores.sort(compare);

  console.log("after");
  console.dir(hScores);

  hScores.splice(5, 1000000000000); //Remove all extra scores

  var number = 0;

  var scoreNodes = hScores.map(function (score) {
    number++;

    return React.createElement(
      "div",
      { className: "score" },
      React.createElement("img", { src: "/assets/images/RedRibbon.png", alt: "domo face", className: "domoFace" }),
      React.createElement(
        "h3",
        { className: "scores" },
        " ",
        React.createElement(
          "span",
          { className: "labled3" },
          number
        ),
        " "
      ),
      React.createElement(
        "h3",
        { className: "scores" },
        " ",
        React.createElement(
          "span",
          { className: "labled2" },
          "Identity:"
        ),
        " ",
        score.name,
        " "
      ),
      React.createElement(
        "h3",
        { className: "scores" },
        " ",
        React.createElement(
          "span",
          { className: "labled2" },
          "Score:"
        ),
        " ",
        score.hsTotal,
        " "
      )
    );
  });

  console.log("NODES");
  console.dir(scoreNodes);

  return React.createElement(
    "div",
    { className: "scoreList" },
    scoreNodes
  );
};

var loadDomosFromServer = function loadDomosFromServer() {
  sendAjax('GET', '/getDomos', null, function (data) {
    ReactDOM.render(React.createElement(DomoList, { domos: data.domos }), document.querySelector("#domos"));
  });
};

var loadScoresFromServer = function loadScoresFromServer() {
  sendAjax('GET', '/getScores', null, function (data) {
    ReactDOM.render(React.createElement(ScoreList, { scores: data.scores }), document.querySelector("#scores"));
  });
};

var setup = function setup(csrf) {

  canvas[0] = document.querySelector('#canvasBack');
  ctx[0] = canvas[0].getContext('2d');

  passwordButton.addEventListener("click", function (e) {
    e.preventDefault();
    app.main.pausedGame();
    createPasswordWindow(csrf);
    app.main.onScreen = false;
    paused = true;
    return false;
  });

  gameButton.addEventListener("click", function (e) {
    e.preventDefault();
    createGameWindow(csrf);
    //app.main.pausedGame();
    app.main.onScreen = true;
    app.main.sound.playEffect(66);
    if (app.main.gameState != app.main.GAME_STATE.DEFAULT && app.main.gameState != app.main.GAME_STATE.TUTORIAL || app.main.introState == true || app.main.endingState == true || app.main.specialScene == true) {
      app.main.resumeGame();
    }
    return false;
  });

  domoButton.addEventListener("click", function (e) {
    e.preventDefault();
    createDomoWindow(csrf);
    app.main.pausedGame();
    app.main.onScreen = false;
    paused = true;
    return false;
  });

  scoreButton.addEventListener("click", function (e) {
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

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});

var passwordButton = document.querySelector("#passwordButton");
var domoButton = document.querySelector("#maker");
var scoreButton = document.querySelector("#scoreButton");
var gameButton = document.querySelector("#gameButton");
"use strict";

var handleError = function handleError(message) {
	$("#errorMessage").text(message);
};

var redirect = function redirect(response) {
	window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
	$.ajax({
		cashe: false,
		type: type,
		url: action,
		data: data,
		dataType: "json",
		success: success,
		error: function error(xhr, status, _error) {
			var messageObj = JSON.parse(xhr.responseText);
			handleError(messageObj.error);
		}
	});
};

var update = function update() {

	//Maintain update loop
	requestAnimationFrame(update);

	//Set current time
	var now = new Date().getTime();

	//Update runs here
	if (now - lastExecution > 1000 / fps) {

		console.log("updateMAIN");

		//Fade effect for outer layer
		/* if(outerIncreasing === true){
    outerIncreasing = false;  
    outerAlpha += .015;
  } else if(outerIncreasing === false){
    outerIncreasing = true;
    outerAlpha -= .015;
  } */

		//Fade effect for inner layer
		if (innerAlpha > .35 && innerIncreasing === true) {
			innerIncreasing = false;
		} else if (innerAlpha < .15 && innerIncreasing === false) {
			innerIncreasing = true;
		}

		//Fade effect for inner layer
		if (innerIncreasing === true) {
			innerAlpha += .01;
		} else if (innerIncreasing === false) {
			innerAlpha -= .01;
		}

		if (paused === true) {
			if (changeFlow === false && flowTimer < 250) {
				flowTimer++;
				flowPosition -= 1;
			} else {
				changeFlow = true;
			}

			if (changeFlow === true && flowTimer > 0) {
				flowTimer--;
				flowPosition += 1;
			} else {
				changeFlow = false;
			}
		}

		for (var i = 0; i < 1; i++) {
			ctx[i].clearRect(0, 0, canvas[i].width, canvas[i].height);
		}

		//Background draws
		ctx[0].fillStyle = "black";
		ctx[0].fillRect(0, 0, canvas[0].width, canvas[0].height);
		ctx[0].save();
		if (paused === true) {
			ctx[0].globalAlpha = .1 - innerAlpha + outerAlpha;
		} else {
			ctx[0].globalAlpha = .25 - innerAlpha + outerAlpha;
		}
		ctx[0].translate(0, flowPosition);
		ctx[0].drawImage(circuitry, 0, 0);
		ctx[0].restore();

		lastExecution = new Date().getTime();
	}
};

//Globals
var image = new Image();
image.src = "images/circuitry.png";
var circuitry = image;

var fps = 20;
var lastExecution = new Date().getTime();

//Animation variables
var outerAlpha = .3;
var innerAlpha = .3;
var outerIncreasing = true;
var innerIncreasing = true;

var flowTimer = 0;
var flowPosition = 0;
var changeFlow = false;

var paused = true;

var canvas = new Array();
var ctx = new Array();

var openSong = document.getElementById("openSong");
