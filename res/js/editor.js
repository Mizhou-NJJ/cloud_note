var height_light_color = "#16a085";
var dis_height_light_color = "#ffffff";
var height_light_fontc = dis_height_light_color;
var dis_height_light_fontc = height_light_color;
var isBold = false;
var isItalic = false;
var isUnderline = false; // 下划线
var isStrikeThrough = false; // 删除线
var isJustifyCenter = false;
var isJustifyLeft = false;
var isJustifyRight = false;
var isOutdent = false; // 左缩进
var isIndent = false; // 右缩进
var isorderList = false;
var isUnorderListt = false; // 无序列表
var isSelectAll = false;
var isCopy = false;
var isCut = false;
var isUndo = false;
var isInsertImage = false;
var isTranslate=true;
// let d=document.getElementById("ds");
// d.style.backgroundColor;
// d.style.color
var isSuperScript = false;
var isSubScript = false;
var isEmotion = false;
// 绘制表情面板
createWeiboEmotion();
createTieBaEmotion();
var editDom=document.getElementsByClassName('edit-scope')[0];
editDom.onfocus=function(eventDom){
    $(this).css({
        "border":"2px dashed #16a085"
    });
}
editDom.onblur=function(){
    $(this).css({
        "border":"2px solid #16a085"
    });
}
// translate
var isPopShow=false;
editDom.onmouseup=function () {
    var rangObj = window.getSelection?window.getSelection():document.selection.createRange().text;
    if(rangObj!=null && rangObj!=undefined&&rangObj!=""&&isTranslate){
        // console.log(txt.anchorNode.data.substring(txt.anchorOffset,txt.extentOffset));
        let word=rangObj.anchorNode.data.substring(rangObj.anchorOffset,rangObj.extentOffset);
        let x=getMP().x;
        let y=getMP().y;
        $("#pop-translate-content").html("");
        $("#to").html("");
        $("#from").html("");
        $("pop-translate-content").html("<img src='../res/image/translate_loading.gif'>");
        if(!isPopShow){
            isPopShow=true;
            popShow(x,y);
        }
        $.ajax({
            url:"../controller/translate.php?f=auto&t=auto&w="+word,
            type:"get",
            dataType:"json",
            success:data=>{
                translate(JSON.parse(data));
            },
            error:()=>{
                console.log("error");
            }
        });
        // if(!isPopShow){
        //     isPopShow=true;
        //     popShow(x,y);
        // }
    }
}

$("#close-pop-icon").click(function(){
    popClose();
});

function popShow(x,y){
    x+=10;
    y+=10;
    $("#pop-translate-content").html("<img src='../res/image/translate_loading.gif'>");
    $("#pop").css({
        "left":x+"px",
        "top":y+"px",
        "z-index":"200",
        "display":"block"
    })
}
function translate(json) {
    let f=json.content.from;
    let t=json['content']['to'];
    let out=json['content']['out'];
    // <div id="pop-from-to">zh-->en-US</div>
    //         <div id="pop-translate-content">你好世界</div>
    $("#from").text(" "+f+" ");
    $("#to").text(" "+t+" ");
    $("#pop-translate-content").html("");
    $("#pop-translate-content").html(out);
}
function popClose(){
    isPopShow=false;
    $("#pop").css({
        "display":"none",
        "z-index":"-99"
    })
}
function getMP () {
    var e = e || window.event;
    return {
        x : e.pageX || e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft),
        y : e.pageY || e.clientY + (document.documentElement.scrollTop || document.body.scrollTop)
    }
}
function emotionPanelToggle() {
    isEmotion = !isEmotion;
    if (isEmotion) {
        $('.emotion-panel').slideDown(400);
    } else {
        $('.emotion-panel').slideUp(200);
    }
}
// 创建微博表情
function createWeiboEmotion() {
    let root = document.getElementsByClassName('emotion-panel')[0];
    for (let i = 0; i < weibo.length; i++) {
        let img = document.createElement('img');
        img.src = weibo[i]['icon'];
        img.addEventListener('click', function (obj) {
            document.execCommand('insertImage', false, img.src);
        });
        root.appendChild(img);
    }
}
// 传教贴吧表情
function createTieBaEmotion() {
    let root = document.getElementsByClassName('emotion-panel')[0];
    for (let i = 0; i < tieba.length; i++) {
        let img = document.createElement('img');
        img.src = tieba[i];
        img.addEventListener('click', function (obj) {
            document.execCommand('insertImage', false, img.src);
        });
        root.appendChild(img);
    }
}

function changeStyle(data) {
    data.value ? document.execCommand(data.command, false, data.value) : document.execCommand(data
            .command,
        false, null)
}
// select 选择器
function select(widget,data){
    let index=widget.selectedIndex;
    let value=widget.options[index].value;
    if (data.command==="fontSize"){ // 设置字号
        document.execCommand('fontSize', false, value);
    }else if(data.command==="fontName"){ // 设置字体
        document.execCommand('fontName',false,value);
    }
}
// font color
function color(widget){
    document.execCommand('foreColor',false,widget.value);
}


function widgetHeightLight(widget, data) {
    switch (data.command) {
        case 'bold':
            isBold = !isBold;
            go_go_go(widget, isBold);
            break;
        case 'italic':
            isItalic = !isItalic;
            go_go_go(widget, isItalic);
            break;
        case 'underline':
            isUnderline = !isUnderline;
            go_go_go(widget, isUnderline);
            break;
        case 'strikeThrough':
            isStrikeThrough = !isStrikeThrough;
            go_go_go(widget, isStrikeThrough);
            break;
        case "justifyCenter":
            isJustifyCenter = !isJustifyCenter;
            var rightDom = document.getElementById('justifyRight');
            var leftDom = document.getElementById('justifyLeft');
            isJustifyRight = false;
            isJustifyLeft = false;
            go_go_go(rightDom, isJustifyRight);
            go_go_go(leftDom, isJustifyLeft);
            go_go_go(widget, isJustifyCenter);
            break;
        case "justifyRight":
            isJustifyRight = !isJustifyRight;
            var centerDom = document.getElementById('justifyCenter');
            var leftDom = document.getElementById('justifyLeft');
            isJustifyCenter = false;
            isJustifyLeft = false;
            go_go_go(centerDom, isJustifyCenter);
            go_go_go(leftDom, isJustifyLeft);
            go_go_go(widget, isJustifyRight);
            break;
        case "justifyLeft":
            isJustifyLeft = !isJustifyLeft;
            var centerDom = document.getElementById('justifyCenter');
            var rightDom = document.getElementById('justifyRight');
            isJustifyRight = false;
            isJustifyCenter = false;
            go_go_go(centerDom, isJustifyCenter);
            go_go_go(rightDom, isJustifyRight);
            go_go_go(widget, isJustifyLeft);
            break;
        case "indent":
            // isIndent = !isIndent;
            // go_go_go(widget, isIndent);
            // isIndent=false;
            // setTimeout(()=>{go_go_go(widget,isIndent),100});
            break;
        case "outdent":
            // isOutdent = !isOutdent;
            // let indent=document.getElementById('indent');
            // isIndent=false;
            // go_go_go(indent,isIndent);
            // go_go_go(widget, isOutdent);
            break;
        case "insertOrderedList":
            isorderList = !isorderList;
            let unorder = document.getElementById('insertUnorderedList');
            isUnorderListt = false;
            go_go_go(unorder, isUnorderListt);
            go_go_go(widget, isorderList);
            break;
        case "insertUnorderedList":
            isUnorderListt = !isUnorderListt;
            let order = document.getElementById('insertOrderedList');
            isorderList = false;
            go_go_go(order, isorderList);
            go_go_go(widget, isUnorderListt);
            break;
        case "selectAll":
            // isSelectAll = !isSelectAll;
            // go_go_go(widget, isSelectAll);
            break;
        case "copy":
            // isCopy = !isCopy;
            // go_go_go(widget, isCopy);
            break;
        case "cut":
            // isCut = !isCut;
            // go_go_go(widget, isCut);
            break;
        case "undo":
            // isUndo = !isUndo;
            // go_go_go(widget, isUndo);
            break;
        case "insertImage":
            isInsertImage = !isInsertImage;
            go_go_go(widget, isInsertImage);
            break;
        case "superscript":
            isSuperScript = !isSuperScript;
            let subscript = document.getElementById('subscript');
            isSubScript = false;
            go_go_go(subscript, isSubScript);
            go_go_go(widget, isSuperScript);
            break;
        case "subscript":
            isSubScript = !isSubScript;
            let superscript = document.getElementById('superscript');
            isSuperScript = false;
            go_go_go(superscript, isSuperScript);
            go_go_go(widget,isSubScript);
            break;
        case "translate":
            isTranslate=!isTranslate;
            go_go_go(widget,isTranslate);
            break;

    }
}


function go_go_go(widget, emm) {
    if (emm) {
        widget.style.backgroundColor = height_light_color;
        widget.style.color = height_light_fontc;
    } else {
        widget.style.backgroundColor = dis_height_light_color;
        widget.style.color = dis_height_light_fontc;
    }
}