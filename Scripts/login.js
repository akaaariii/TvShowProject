onload = function() {
    const username = document.querySelector("#recipient-name");
    const email = document.querySelector("#recipient-email");
    const password = document.querySelector("#recipient-password");
    const login = document.querySelector("#login");
    const loginbtn = document.querySelector("#loginbtn");
    const emailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    login.addEventListener('click', function(){
        document.querySelectorAll(".validation-error").forEach(element => {
            element.remove();
        });
        if(username.value === ''){
            const usernameError = document.createTextNode("username is required");
            const usernameErrorDiv = document.createElement("div");
            usernameErrorDiv.classList.add("validation-error");
            usernameErrorDiv.appendChild(usernameError);
            usernameErrorDiv.style.color = "red";
            username.after(usernameErrorDiv);
            return
        }else if(email.value === ''){
            const emailError = document.createTextNode("email is required");
            const emailErrorDiv = document.createElement("div");
            emailErrorDiv.classList.add("validation-error");
            emailErrorDiv.appendChild(emailError);
            emailErrorDiv.style.color = "red";
            email.after(emailErrorDiv);
            return
        }else if(!emailformat.test(email.value)){
            const emailError = document.createTextNode("email is not valid");
            const emailErrorDiv = document.createElement("div");
            emailErrorDiv.classList.add("validation-error");
            emailErrorDiv.appendChild(emailError);
            emailErrorDiv.style.color = "red";
            email.after(emailErrorDiv);
            return
        }else if(password.value === ''){
            const passwordError = document.createTextNode("password is required");
            const passwordErrorDiv = document.createElement("div");
            passwordErrorDiv.classList.add("validation-error");
            passwordErrorDiv.appendChild(passwordError);
            passwordErrorDiv.style.color = "red";
            password.after(passwordErrorDiv);
            return
        }

        document.cookie = `name=${username.value}`
        loginbtn.innerHTML = getCookie("name");
        loginbtn.style.pointerEvents = "none"
        $('#exampleModal').modal('hide');
    });

    console.log(getCookie("name"));
    if(getCookie("name")){
        loginbtn.innerHTML = getCookie("name");
        loginbtn.style.pointerEvents = "none"
    }
}

function getCookie(name)
  {
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
  }