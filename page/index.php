<?php
 session_start();
 include "../entity/User.php";
 include "../dao/dao.php";
 $user=null;
 $section_count=0;
 $book_count=0;
 if (!isset($_SESSION['user'])){
     exit();
 }else{
     $user=unserialize($_SESSION['user']);
     $section_count=getSecionCount();
     $book_count=getBookCount();
 }
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $user->getName();?>的CLOUD NOTE</title>
    <link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/4.3.1/css/bootstrap.min.css">
    <script src="https://cdn.staticfile.org/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdn.staticfile.org/popper.js/1.15.0/umd/popper.min.js"></script>
    <script src="https://cdn.staticfile.org/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css">
    <link rel="stylesheet" href="../res/css/model.css">
    <link rel="stylesheet" href="../res/css/page_index.css">
</head>

<body>
<nav class="navbar navbar-expand-md bg-dark navbar-dark phone-navbar fixed-top">
    <!-- <a class="navbar-brand" href="#">Navbar</a> -->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar"
            id="info-toggle">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
        </ul>
    </div>
</nav>
<div class="jumbotron text-center header-jumbotron">
    <div class="jumbotron-inner">
        <div id="jumbotron-text">
            <h5 id="poetry-content"></h5><br><span id="poetry-origin"></span>
        </div>
    </div>
</div>
<!-- https://v1.jinrishici.com/all.json -->
<!-- http://www.zzsky.cn/code/mrmy/mrmy.asp -->
<!-- fa fa-map-marker -->
<div class="container">
</div>
<!--close container-->
<!-- Footer a Jum -->
<div class="footer">
    <span style="color: #606262;font-size: 1rem;font-family: "Trebuchet MS", Arial, Helvetica, sans-serif">CopyRight &copy;Cloud Note All Rights Reserved.</span>
</div>
<!-- 用户信息 面板 -->
<div class="info-panel">
    <div class="my-info">
        <div class="my-portrait" id="my-portrait"><img src="<?php echo $user->getPortrait()==""?"../res/image/djxj.jpg":$user->getPortrait();?>"></div>
    </div>
    <div class="my-nick my-info wanner-edit" id="my-nick"><?php echo $user->getName();?></div>
    <div class="info-wrapper">
        <div class="my-personalized my-info wanner-edit"><?php echo $user->getPersonalized()==""?"该用户太懒,什么也没留下!":$user->getPersonalized();?></div>
        <div class="my-statistics my-info">
            <div class="statistics-item"><span><?php echo $book_count;?></span><span><?php echo $section_count;?></span></div>
            <div class="statistics-item"><span>BOOK</span><span>SECTION</span></div>
        </div>
        <div class="my-describe my-info wanner-edit" style="color: gray;"><?php echo $user->getDescribe()==""?"该用户太懒,什么也没留下!":$user->getDescribe();?></div>
        <div class="my-quit my-info"><span class="fa fa-paint-brush caozuo" id="up-meinfo">&nbsp;ME</span></div>
<!--        <div class="my-share my-info"><span class="fa fa-weixin" style="color: #16a085;"></span><span-->
<!--                class="fa fa-qq" style="color:#45aaf2"></span><span class="fa fa-apple"-->
<!--                                                                    style="color: black;"></span><span class="fa fa-twitter" style="color: #45aaf2;"></span></div>-->
        <div class="my-info"><span class="fa fa-book caozuo" id="new-notebook"> &nbsp; &nbsp;New Note Book</span></div>
    </div>
    <!--Cose info-wrapper-->
    <div class="dairy-wrapper" style="display: none;">
        <div class="my-info">
            <h5 id="book-name"></h5>
        </div>
        <div style="width: 100%;" id="section">
<!--        <div class="dairy-item">Python.pdf what can you do?</div>-->
<!--        <div class="dairy-item">Python.pdf How are?</div>-->
<!--        <div class="dairy-item">Python.pdf</div>-->
<!--        <div class="dairy-item">Python.pdf And Me</div>-->
        </div>
        <div class="my-info my-share  dairy-opr">
            <span class="fa fa-plus-square-o" id="add-section"></span>
            <span class="fa fa-trash-o" style="color: #e74c3c"></span>
        </div>
        <div class="my-info"><span class="fa fa-arrow-left" id="back-index" style="color: #2ecc71;font-size: 1.3rem;"></span></div>
    </div>
    <!--close dairy wrapper-->
</div>
<div class="pillar" id="pillar"></div>
<?php include 'model.php'?>
<script src="../res/js/model.js"></script>
<script src="../res/js/page_index.js"></script>
<script>

</script>
</body>

</html>