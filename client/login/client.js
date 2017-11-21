const handleLogin = (e) => {
  e.preventDefault();
  
  if($("#user").val() == '' || $("#pass").val() == '') {
    handleError("Username or password is empty");
	return false;
  }
  
  sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
  
  return false;
};

const handleSignup = (e) => {
  e.preventDefault();
  $("#domoMessage").animate({width:'hide'},350);
  
  if($("#user").val() == '' || $("#pass").val() == '' || $("pass2").val() == '') {
    handleError("All fields required");
	return false;
  }
  
  if($("#pass").val() !== $("#pass2").val()) {
    handleError("Passwords must match");
	return false;
  } 

  sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

  return false;
};  


const LoginWindow = (props) => {
  return (
  <form id="loginForm" name="loginForm"
    onSubmit={handleLogin}
    action="/login"
    method="POST"
    className="mainForm"
   >
   <label htmlFor="username">Username: </label>
   <input id="user" type="text" name="username" placeholder="username"/>
   <label htmlFor="pass">Password: </label>
   <input id="pass" type="password" name="pass" placeholder="password"/>
   <input type="hidden" name="_csrf" value={props.csrf}/>
   <input className="formSubmit" type="submit" value="Access" />
  
  </form>
  );
};

const SignupWindow = (props) => {
  return (
    <form id="signupForm"
	  name="signupForm"
	  onSubmit={handleSignup}
	  action="/signup"
	  method="POST"
	  className="mainForm"
	>
	  <label htmlFor="username">Username: </label>
	  <input id="user" type="text" name="username" placeholder="username"/>
	  <label htmlFor="pass">Password: </label>
	  <input id="pass" type="password" name="pass" placeholder="password"/>
	  <label htmlFor="pass2">Password: </label>
	  <input id="pass2" type="password" name="pass2" placeholder="retype password"/>
	  <input type="hidden" name="_csrf" value={props.csrf} />
	  <input className="formSubmit" type="submit" value="Create" />
	
	</form>
  );
};


const createLoginWindow = (csrf) => {
  $("#mainMessage").text("Log in");
  ReactDOM.render(
    <LoginWindow csrf={csrf} />,
	document.querySelector("#content")
  );
};

const createSignupWindow = (csrf) => {
  $("#mainMessage").text("Regester");
  ReactDOM.render(
    <SignupWindow csrf={csrf} />,
	document.querySelector("#content")
  );
};


const setup = (csrf) => {
  canvas[0] = document.querySelector('#canvasBack');
  ctx[0] = canvas[0].getContext('2d'); 
  
  openSong.volume = 0.3;
	
  const loginButton = document.querySelector("#loginButton");
  const signupButton = document.querySelector("#signupButton");
  
  signupButton.addEventListener("click", (e) => {
    e.preventDefault();
	createSignupWindow(csrf);
	return false;
  });
  
  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
	createLoginWindow(csrf);
	return false;
  });
  
  loginButton.focus();
  
  //Begin update loop
  requestAnimationFrame(update);
  
  createLoginWindow(csrf); //default view
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
  });
};

$(document).ready(function() {
  getToken();
});


window.onblur = function(){
	openSong.pause(); 
};

window.onfocus = function(){
	openSong.play(); 
};
  