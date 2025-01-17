$(document).ready(function () {
    document.getElementById("username").value="";
    document.getElementById("password").value = "";
});

function OnShowPass() {
    if (document.getElementById('showpass').checked) {
         document.getElementById('password').type = 'text';
    } else {
        document.getElementById('password').type = 'password';
    }
}


function Login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var result = Validation(username, password); //check null
    if (result == true) {
        CheckLogin(username, password);
    } else {
        sweetAlert("Error : " + result);
    }
}

function CheckLogin(username, password) {
    var strData = {
        rptType: "login",
        strUserName: username,
        strPassword: password,
    };

    $.ajax({
        url: "Class/Ajax/AjaxLogin.ashx",
        data: strData,
        type: "POST",
        dataType: "json",
        success: function (responseJson) {
            AfterCheckLogin(responseJson, username);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            sweetAlert("Error Function CheckLogin : " + XMLHttpRequest.error);
        }
    });
}

function AfterCheckLogin(responseJson, UserID) {
    if (responseJson != "") {
        if (IsResponseJsonSuccess(responseJson)) {

            //create session
            const name = responseJson.ResultTable[0]['@pSqlErr'];
            if (name) {
                sessionStorage.setItem("username", name);
                sessionStorage.setItem("userId", UserID);

                AfterHaveSession();
            }
            else {
                sweetAlert("Error function : AfterCheckLogin not found username!");
            }
        }
        else {
            sweetAlert("Error function : " + GetResponseJSonDesc(responseJson));
        }
    }
    else {
        sweetAlert("Error function :AfterCheckLogin no data.");
    }
}


function AfterHaveSession() {
    let username = sessionStorage.getItem("username");
    let userId = sessionStorage.getItem("userId");

    if (username && userId) {
        window.location.href = 'Home.aspx';
    }
}

document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("btnLogin").click();
    }
});

function Validation(username,password) {
    var txtErr = "";
    if (!username) {
        txtErr = "Invalid username";
        return txtErr;
    }
    if (!password) {
        txtErr = "Invalid password";
        return txtErr;
    }
    else {
        return true;
    }

}

