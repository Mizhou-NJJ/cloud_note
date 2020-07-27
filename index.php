<?php ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.staticfile.org/jquery/3.2.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css">
    <title>LOGIN|SINGUP CLOUD NOT</title>
    <link rel="stylesheet" href="res/css/index.css">
    <link rel="stylesheet" href="res/css/model.css">
</head>

<body>
<div class="container">
    <div class="wrapper">

        <div class="login-wrapper">
<!--            http://api.btstu.cn/sjtx/api.php?lx=c1&format=images-->
            <form>
                <div class="portrait">
                    <div><img src="" id="portrait" style="display: none;"></div>
                </div>
                <div class="search-div">
                    <span style="color: white;font-size: 1.3rem" id="welcom-tip">WELCOME</span>
                </div>
                <div class="search-div">
                    <div><input type="text" class="in-input" placeholder="用户名" id="login-name">
                        <button><span class="fa" id="login-name-tip"></span></button>
                    </div>
                </div>
                <div class="search-div">
                    <div><input type="password" class="in-input" placeholder="密码" id="login-password">
                        <button><span class="fa" id="login-password-tip"></span></button>
                    </div>
                </div>
                <div class="login-item item">
                    <input type="button" name="user-name" class="in-input sub" id="login-sub" value="登&nbsp;&nbsp;陆">
                </div>
                <div class="go-register"><span id="go-sign-up">立即注册</span></div>
            </form>
        </div> <!--close login wrapper-->

        <div class="signup-wrapper">
            <!--            <form id="signup-form" method="post" action="controller/signup.php" >-->
            <div class="portrait">
                <div><img src="https://tva2.sinaimg.cn/large/9bd9b167ly1g1p9pk1v7zj20b40b4mxj.jpg" id="portrait-change"></div>
            </div>
            <div class="login-item item">
                <span style="font-size: 1.2rem;font-family: 'Trebuchet MS';">点击头像来选择你喜欢的头像!</span>
            </div>
            <div class="search-div">
                <div><input type="text" class="in-input" placeholder="用户名" name="signup_name" id="signup-name">
                    <button><span class="fa " id="signup-name-tip"></span></button>
                </div>
            </div>
            <div class="search-div">
                <div><input type="password" class="in-input" placeholder="密码" id="signup-password" name="signup_password">
                    <button><span class="fa " id="signup-password-tip"></span></button>
                </div>
            </div>
            <div class="search-div">
                <div><input type="password" class="in-input" placeholder="确认密码" id="signup-confirm-password">
                    <button><span class="fa fa-search" id="signup-confirm-password-tip"></span></button>
                </div>
            </div>
            <div class="login-item item">
                <input type="button" name="user-name" class="in-input sub" id="sign-sub" value="注&nbsp;&nbsp;册">
            </div>
            <div class="go-register"><span id="go-login">去登陆</span></div>
            <!--            </form>-->
        </div>
    </div>
</div>
<!--Model-->
<?php include "page/model.php"?>
<script src="res/js/model.js"></script>
<script src="res/js/index.js"></script>
</body>

</html>