extends layout

block content
    div(id="title")
        h1= title
    form#formResetPasswordForm(name="resetpassword",method="post",action="/resetpassword")
        div(id="forgotPasswordUsername")
            p Please enter your username:
            input#inputUsername(type="text", placeholder="username", name="username", , required="", autocomplete="off")
        div(id="secretQuestion")
            p Please select a security question:
                select(name="securityQuestion")
                    option(value="What is your favorite movie?") "What is your favorite movie?"
                    option(value="What is your mother's maiden name?") "What is your mother's maiden name?"
                    option(value="What was your first pet's name?") "What was your first pet's name?"
                br
                br
	




 input#inputUserQuestion(type="password", placeholder="password", name="password", required="", autocomplete="off")
        div(id="secretAnswer")
                input#inputUserQuestion(type="password", placeholder="password", name="password", required="", autocomplete="off")