$(document).ready(function () {
    var loginWrapper = document.getElementsByClassName("login-wrapper")[0];

    // 模态框
    // 当点击关闭模态框时
    closeModel();
    $("#go-sign-up").click(() => {
        $(".login-wrapper").slideUp(600, () => {
            $(".signup-wrapper").slideDown(600);
        });
    });
    $('#go-login').click(() => {
        $(".signup-wrapper").slideUp(600, () => {
            $(".login-wrapper").slideDown(600);
        });
    });
    // 表单输入事件
    var loginNameInput = document.getElementById("login-name");
    var loginNameInputTip = document.getElementById("login-name-tip");
    var loginPwdInput = document.getElementById("login-password");
    var loginPwdInputTip = document.getElementById("login-password-tip");
    var signupNameInput = document.getElementById("signup-name");
    var signupPwdInput = document.getElementById("signup-password");
    var signupConfirmPwdInput = document.getElementById("signup-confirm-password");
    var signupNameInputTip = document.getElementById("signup-name-tip");
    var signupPwdInputTip = document.getElementById("signup-password-tip");
    var signupConfirmPwdTip = document.getElementById("signup-confirm-password-tip");

    var isLoginName=false;
    var isLoginPwd=false;
    // 用户名 dddd
    loginNameInput.onkeyup=function(){
        let name=loginNameInput.value;
        if (name==="") return;
        $.ajax({
            url:"controller/get_user_portrait.php",
            dataType:"json",
            method:"get",
            data:{
                name:name
            },
            success:data=>{
                let img=document.getElementById("portrait");
                let welcometip=document.getElementById("welcom-tip");
                if (data.result){
                    img.src=data.imgurl;
                    $(img).css({
                        "display":"block"
                    });
                    $(welcometip).html("WELCOME ! "+name);
                }else {
                    $(img).css({
                        "display":"none"
                    });
                    $(welcometip).html("WELCOME !");
                }
            }
        })
    }
    var portrait_type=['a1','b1','c1','c2','c3'];// 头像类型
    // 改变头像
    $("#portrait-change").click(function () {
        let randomType=portrait_type[parseInt(Math.random()*portrait_type.length)];
        // let url="http://api.btstu.cn/sjtx/api.php?lx="+randomType+"&format=images";
        let jsonURL="http://api.btstu.cn/sjtx/api.php?lx="+randomType+"&format=json";
        // console.log(url);
        $.getJSON(jsonURL,json=>{
            this.src=json.imgurl;
        });
    });
    // function changePortrait(img){
    //     let randomType=portrait_type[parseInt(Math.random()*portrait_type.length)];
    //     let url="http://api.btstu.cn/sjtx/api.php?lx="+randomType+"&format=images";
    //     console.log(url);
    //     img.src=url;
    // }
    // 点击登陆时
    $("#login-sub").click(() => {
        let name=loginNameInput.value;
        if (name===""){
            removeTipClass(loginNameInputTip);
            addError(loginNameInputTip);
            return;
        }else {
            removeTipClass(loginNameInputTip);
            isLoginName=true;
        }
        let pwd=loginPwdInput.value;
        if (pwd===""||pwd.length<6){
            removeTipClass(loginPwdInputTip);
            addError(loginPwdInputTip);
        }else{
            isLoginPwd=true;
            removeTipClass(loginPwdInputTip);
        }
        if (isLoginPwd&&isLoginName){
            // 提交登陆
            login();
        }
    });
    // 注册 查询用户名是否可用
    var isSignUserName = false;
    var isSignPwd = false;
    var isSignConfirmPwd = false;
    signupNameInput.onblur = () => {
        let v = signupNameInput.value;
        if (v === "") {
            removeTipClass(signupNameInputTip);
            addError(signupNameInputTip);
            return;
        }
        // 显示加载中
        removeTipClass(signupNameInputTip);
        signupNameInputTip.classList.add("fa-spinner");
        $.ajax({
            url: "controller/signup_check.php",
            method: "post",
            data: {
                signup_name: v
            },
            dataType: "json",
            success: data => {
                if (data.result) {
                    isSignUserName = true;
                    removeTipClass(signupNameInputTip);
                    addSuccess(signupNameInputTip);
                } else {
                    removeTipClass(signupNameInputTip);
                    addError(signupNameInputTip);
                }
            },
            error: () => {
                alert("ERROR");
            }
        });
    }
    // 密码
    signupPwdInput.onblur = () => {
        let v = signupPwdInput.value;
        if (v === "" || v.length < 6) {
            removeTipClass(signupPwdInputTip);
            addError(signupPwdInputTip);
            return;
        } else {
            removeTipClass(signupPwdInputTip);
            addSuccess(signupPwdInputTip);
            isSignPwd = true;
        }
    }
    signupConfirmPwdInput.onblur = () => {
        let v = signupPwdInput.value;
        let cv = signupConfirmPwdInput.value;
        if (v !== cv) {
            removeTipClass(signupConfirmPwdTip);
            addError(signupConfirmPwdTip);
            // signupConfirmPwdInput.focus(); // TMD 触发了一个bug 不改了
            return;
        } else {
            removeTipClass(signupConfirmPwdTip);
            addSuccess(signupConfirmPwdTip);
            isSignConfirmPwd = true;
        }
    }
    // 点击注册时
    $("#sign-sub").click(() => {
        if (isSignUserName) {
            if (isSignPwd) {
                if (isSignConfirmPwd) {
                    // 可注册
                    signup();
                } else signupPwdInput.focus();
            } else signupPwdInput.focus();
        } else signupNameInput.focus();
    });


    function removeTipClass(tipdom) {
        tipdom.classList.remove("fa-check-circle-o");
        tipdom.classList.remove("fa-times-circle-o");
        tipdom.classList.remove("fa-spinner");
        tipdom.classList.remove("error");
        tipdom.classList.remove("success");
    }

    function addError(tipdom) {
        tipdom.classList.add("fa-times-circle-o");
        tipdom.classList.add("error");
    }

    function addSuccess(tipdom) {
        tipdom.classList.add("fa-check-circle-o");
        tipdom.classList.add("success");
    }

    function addLoading(tipdom) {
        tipdom.classList.add("fa-spinner");
    }

    function signup() {
        let imgd=document.getElementById("portrait-change");
        let por=imgd.src;
        $.ajax({
            url: "controller/signup.php",
            method: "post",
            dataType: "json",
            data: {
                signup_name: signupNameInput.value,
                signup_password: signupPwdInput.value,
                portrait:por
            },
            success: data => {
                if (data.result){
                    openModel("注册成功!",false);
                }else {
                    openModel("注册失败!",true);
                }
            },
            error: () => {
                openModel("注册失败!",true);
            }
        })
    }

    function login() {
        $.ajax({
            method:"post",
            url:"controller/login_check.php",
            data:{
                login_name:loginNameInput.value,
                login_password:loginPwdInput.value
            },
            dataType:"json",
            success:data=>{
                if (data.result){
                    openModel("登陆成功",false);
                    setTimeout(()=>{
                        window.location="page/index.php";
                    },2000); // 2s 后跳转
                }else {
                    openModel("用户名或密错误!",true);
                }
            },
            error:()=>{
                openModel("登陆失败!",true);
            }
        });
    }
});
// 打开模态框