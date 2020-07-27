<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/4.3.1/css/bootstrap.min.css">
    <script src="https://cdn.staticfile.org/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdn.staticfile.org/popper.js/1.15.0/umd/popper.min.js"></script>
    <script src="https://cdn.staticfile.org/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css">
    <title>Document</title>
    <link rel="stylesheet" href="../res/css/editor.css">
</head>

<body>
<!-- <div class="container"> -->
<div class="row">
    <div class="header-tool">
        <select id="font-select" data-command="fontName" onclick="select(this,dataset);">
            <option value="Microsoft JhengHei" selected>微软正黑体</option>
            <option value="Microsoft Yahei">微软雅黑</option>
            <option value="Trebuchet MS">TrebuchetMS</option>
            <option value="Segoe Script">Segoe Script</option>
            <option value="SimSun">宋体</option>
            <option value="SimHei">黑体</option>
            <option value="KaiTi">楷体</option>
            <option value="NSimSun">新宋体</option>
            <option value="FangSong">仿宋</option>
        </select>
        <select id="size-select" data-command="fontSize" onclick="select(this,dataset);" title="字号">
            <option value="1">1号</option>
            <option value="2">2号</option>
            <option value="3">3号</option>
            <option value="4" selected>4号</option>
            <option value="5">5号</option>
            <option value="6">6号</option>
            <option value="7">7号</option>
        </select>
        <input type="color" id="color" onchange="color(this);" title="颜色">
        <button class="equ-item" data-command="bold"
                onclick="changeStyle(this.dataset),widgetHeightLight(this,this.dataset)" title="加粗"><span class="fa fa-bold" ></span></button>
        <button class="equ-item" data-command='italic'
                onclick="changeStyle(this.dataset),widgetHeightLight(this,this.dataset)" id="斜体"><span class="fa fa-italic"></span></button>
        <button class="equ-item" data-command='underline'
                onclick="changeStyle(this.dataset),widgetHeightLight(this,this.dataset)" title="下划线"><span class="fa fa-underline"></span></button>
        <button class="equ-item" data-command="strikeThrough"
                onclick="changeStyle(this.dataset),widgetHeightLight(this,this.dataset)" title="中划线"><span class="fa fa-strikethrough"></span></button>
        <!-- 对齐方式 -->
        <button class="equ-item" data-command="justifyCenter"
                onclick="changeStyle(this.dataset),widgetHeightLight(this,this.dataset)" id="justifyCenter" title="居中"><span
                class="fa fa-align-center"></span></button>
        <button class="equ-item" data-command="justifyRight"
                onclick="changeStyle(this.dataset),widgetHeightLight(this,this.dataset)" id="justifyRight" title="右对齐"><span
                class="fa fa-align-right"></span></button>
        <button class="equ-item" data-command="justifyLeft"
                onclick="changeStyle(this.dataset),widgetHeightLight(this,this.dataset)" id="justifyLeft" title="左对齐"><span
                class="fa fa-align-left"></span></button>
        <!-- 缩进方式 -->
        <button class="equ-item one-click" data-command="outdent"
                onclick="changeStyle(this.dataset),widgetHeightLight(this,this.dataset)" id="outdent" title="左缩进"><span
                class="fa fa-outdent"></span></button>
        <button class="equ-item one-click" data-command="indent"
                onclick="changeStyle(this.dataset),widgetHeightLight(this,this.dataset)" id="indent" title="右缩进"><span
                class="fa fa-indent"></span></button>
        <!--  列表 -->
        <button class="equ-item" data-command="insertOrderedList"
                onclick="changeStyle(this.dataset),widgetHeightLight(this,this.dataset)"
                id="insertOrderedList" title="有序列表"><span class="fa fa-list-ol"></span></button>
        <button class="equ-item" data-command="insertUnorderedList"
                onclick="changeStyle(this.dataset),widgetHeightLight(this,this.dataset)"
                id="insertUnorderedList" title="无需列表"><span class="fa fa-list-ul"></span></button>
        <!-- 上下标 -->
        <button class="equ-item" data-command="superscript"
                onclick="changeStyle(this.dataset),widgetHeightLight(this,this.dataset)" id="superscript" title="上标"><span
                class="fa fa-angle-up" ></span></button>
        <button class="equ-item" data-command="subscript"
                onclick="changeStyle(this.dataset),widgetHeightLight(this,this.dataset)" id="subscript" title="下标"><span
                class="fa fa-angle-down" ></span></button>


    </div>
</div>
<div class="row " style="margin-top: 10px;padding-right: 5px;">
    <div class="edit-scope" contenteditable="true" id="edit-scope"></div>
</div>
<div class="row footer-tool">
    <div class="footer-tool-right">
        <!-- 撤销  -->
        <button class="equ-item" data-command="undo"
                onclick="changeStyle(this.dataset),widgetHeightLight(this,this.dataset)" title="撤销"><span
                class="fa fa-undo" ></span></button>
        <!-- 全选 复制 粘贴 -->
        <button class="equ-item one-click" data-command="selectAll"
                onclick="changeStyle(this.dataset),widgetHeightLight(this,this.dataset)" title="全选"><span
                class="fa fa-file-text-o"></span></button>
        <button class="equ-item one-click" data-command="copy"
                onclick="changeStyle(this.dataset),widgetHeightLight(this,this.dataset)" title="复制"><span
                class="fa fa-copy"></span></button>
        <button class="equ-item one-click" data-command="cut"
                onclick="changeStyle(this.dataset),widgetHeightLight(this,this.dataset)"><span
                class="fa fa-cut" title="剪切"></span></button>
    </div>
    <div class="footer-tool-left">
<!-- 翻译-->
        <button class="equ-item one-click" style="background-color: #16a085; color: white;" data-command="translate"
                onclick="widgetHeightLight(this,this.dataset)" title="复制翻译"><span
                    class="fa fa-retweet"></span></button>
        <!-- 表情 -->
        <button class="equ-item" data-command="insertImage"
                onclick="widgetHeightLight(this,this.dataset),emotionPanelToggle()"><span
                class="fa fa-smile-o" style="font-size: 1.2rem;" title="表情"></span></button>
        <button id="save"><span>SAVE</span></button>
    </div>
</div>
<div class="row " style="margin-bottom: 200px;">
    <div class="emotion-panel">

    </div>
</div>
<!--翻译弹框-->
<div class="pop" id="pop">
    <div id="close-pop"><span id="close-pop-icon" class="fa fa-times"></span></div>
    <div id="pop-from-to"><span id="from"></span><span class="fa fa-long-arrow-right" style="color: #2ecc71;"></span><span id="to"></span></div>
    <div id="pop-translate-content"><img src="../res/image/translate_loading.gif"></div>
</div>
<!-- </div> -->
<script src="../res/js/emotions.js"></script>
<script src="../res/js/editor.js"></script>

</body>

</html>