<%@ Page Title="Home Page" Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="mis._Default" %>
<%@Import Namespace="mis.Class.Model"%>

<!DOCTYPE html>
<html>
<head>
    <title></title>
     <link href="bootstrap-5.3.3-dist/css/bootstrap.min.css<%= GlobalBean.VERSION_CONTROL %>"" rel="stylesheet" >
     <link href="css/cssLogin.css<%= GlobalBean.VERSION_CONTROL %>" rel="stylesheet" />
     <link href="css/sweetalert2.min.css<%= GlobalBean.VERSION_CONTROL %>" rel="stylesheet" />


     <script type="text/javascript" src="js/jquery-1.11.1.min.js<%= GlobalBean.VERSION_CONTROL %>" ></script>
     <script type="text/javascript" src="jquery-ui-1.12.1/jquery-ui.min.js<%= GlobalBean.VERSION_CONTROL %>" ></script> 
     <script type="text/javascript" src="js/jUtil.js<%= GlobalBean.VERSION_CONTROL %>" ></script>
     <script src="bootstrap-5.3.3-dist/js/bootstrap.bundle.min.js<%= GlobalBean.VERSION_CONTROL %>"" ></script>
     <script type="text/javascript" src="js/sweetalert2.min.js<%= GlobalBean.VERSION_CONTROL %>" ></script>
     <script type="text/javascript" src="js/jLogin.js<%= GlobalBean.VERSION_CONTROL %>" ></script>
    

</head>
<body>
    <main class="container d-flex area">
        <div class="col-5">
            <img class="iot-logo" src="imgs/logo.png" alt="iot-logo"/>
        </div>
        <div class="form-signin w-100 m-auto">
            <form>
                <h1 class="h3 mb-3 fw-normal">IoT Library</h1>

                <div class="form-floating block-data">
                    <input type="text" class="form-control" autocomplete="off" id="username" name="username" autofocus placeholder="name@example.com">
                    <label for="username">UserName</label>
                </div>
                <div class="form-floating block-data">
                    <input type="password" class="form-control" autocomplete="off" name="password" id="password" placeholder="Password">
                    <label for="password">Password</label>
                </div>

                <div class="form-check text-start my-3">
                    <input class="form-check-input" type="checkbox" value="remember-me" name="showpass" id="showpass" onchange="OnShowPass();">
                    <label class="form-check-label" for="showpass">
                        Show password!
                    </label>
                </div>
                <btn class="btn btn-primary w-25 py-2 float-end" type="submit" id="btnLogin" onclick="Login();">Login</btn>
                <p class="mt-5 mb-3 text-body-secondary" style="padding: 50px 0px;">© 2024 | Developed By Internet Of Things Office Department.</p>
            </form>
        </div>

    </main>

</body>
</html>



