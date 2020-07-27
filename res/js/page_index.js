$(document).ready(function () {
    var isOpenInfoPanel = false;
    var is_connect = false;
    const REQUEST_TIMEOUT = 3000; // 请求时长大于 REQUEST_TIMEOUT时 请求失败
    const PHONE_WIDTH = 650;
    const COLORS=["#00a8ff","#4cd137","#55efc4","#74b9ff","#a29bfe","#00b894","#00cec9","#0984e3","#6c5ce7","#ffeaa7","#fab1a0","#ff7675"];
    // 点击新建笔记本时
    $("#new-notebook").click(()=>{
        addBook();
    });
    // 点击修改个人信息
    var originName=$("#my-nick").text();
    var isClickUp=false;
    // 点击修改个人信息时
    $("#up-meinfo").click(()=>{
        isClickUp=!isClickUp;
        let meinfo=document.getElementById("up-meinfo");
        // 可以修改的信息
        let wannerEdits = document.getElementsByClassName('wanner-edit');
        if (isClickUp){ // can edite
            for (let i = 0; i < wannerEdits.length; i++) {
                wannerEdits[i].contentEditable = true;
                $(wannerEdits[i]).css({
                    "color":"#2ecc71"
                });
            }
            meinfo.classList.remove("fa-paint-brush");
            meinfo.classList.add("fa-check");
            let myPortrait=document.getElementById('my-portrait');
            // myPortrait.addEventListener("click",function () {
            //
            // })
        }else {// submit 更改
            meinfo.classList.remove("fa-check");
            meinfo.classList.add("fa-paint-brush");
            for (let i = 0; i < wannerEdits.length; i++) {
                wannerEdits[i].contentEditable = false;
                if (i==0){
                    $(wannerEdits[i]).css({
                        "color":"black"
                    });
                }else{
                    $(wannerEdits[i]).css({
                        "color":"gray"
                    });
                }
            }
            //get
            let my_name=$(wannerEdits[0]).text();
            let sin=$(wannerEdits[1]).text();
            let des=$(wannerEdits[2]).text();
            saveInfoMe(originName,my_name,sin,des);
        }

    });
    var is_add_sectioning=false;
    $("#add-section").click(function () {
        is_add_sectioning=!is_add_sectioning;

        let dairyItems=document.getElementsByClassName("dairy-item");
        if (is_add_sectioning){
            let root=document.getElementById("section");
            let dairyItem=document.createElement("div");
            dairyItem.contentEditable=true;
            dairyItem.classList.add("dairy-item");
            this.classList.remove("fa-plus-square-o");
            this.classList.add("fa-check");
            root.appendChild(dairyItem);
            dairyItem.focus();
        }else {
            this.classList.remove("fa-check");
            this.classList.add("fa-plus-square-o");
            for (let i=0;i<dairyItems.length;i++){
                dairyItems[i].contentEditable=false;
            }
            // 保存addSection
            addSection(now_book_id,$(dairyItems[dairyItems.length-1]).text());

        }
    });
    function addSection(bookid,setciontName){
        $.ajax({
            url:"../controller/add_section.php",
            method:"post",
            dataType:'json',
            data:{
                book_id:bookid,
                section:setciontName,
            },
            success:data=>{
                if (!data.result){
                    openModel("添加失败!",true);
                }else {
                    loadSection(now_book_id);
                }
            },
            error:()=>{
                openModel("添加失败!",false);
            }

        })
    }
    // 进入页面
    $(".container").load("dairy_book.php", () => {
        //为book添加事件
        addDairyBookEvent();
        // random color
        randomColor(COLORS,document.getElementsByClassName("dairy-book-item-icon"));

    });
    // 模态框
    $("#model-content-close").click(()=>{
        closeModel();
    });
    // 加载名言
    loadVerse(10000);
    // 如果加载失败
    setTimeout($ => {
        let content="世界上最遥远的距离就是没有网络,请检查你的网络连接...";
        if (!is_connect){ danceStr(content, document.getElementById(
            "poetry-content"), "span", 50);
            setTimeout($=>{
                danceStr("--鲁迅",document.getElementById("poetry-origin"),"span",50);
            },50*content.length);
        }
    }, 3000);
    // 点击返回时
    $("#back-index").click(function () {
        // 编辑器部分
        $(".container").slideUp(500, () => {
            $(".container").load("dairy_book.php", () => {
                $(".container").slideDown(500, () => {
                    addDairyBookEvent();
                    randomColor(COLORS,document.getElementsByClassName("dairy-book-item-icon"));
                });
            });
        });
        $(".dairy-wrapper").slideUp(500, () => {
            $(".info-wrapper").slideDown(500, () => {

            });
        })
    });
    // 点击 quit时
    $(".my-quit").click($ => {

    });
    let dom = document.getElementsByClassName("container")[0];
    let body = document.getElementsByTagName("body")[0];
    var jumb = document.getElementsByClassName("jumbotron")[0];
    // 自定义pc端滑动事件
    let startPointX;
    let startPointY;
    const SWIPE_RIGHT_DISTANCE = 120;
    const SWIPE_LEFT_DISTANCE = 120;

    body.onmousedown = function () {
        startPointX = event.clientX;
        startPointY = event.clientY;
    }
    body.onmouseup = function () {
        let container_width = $(dom).width();
        if (container_width <= PHONE_WIDTH) {
            if (event.clientX - startPointX > SWIPE_RIGHT_DISTANCE) { //右滑动
                $(".info-panel").css({
                    "left": "0px",
                })
            } else if (event.clientX - startPointX <= -SWIPE_LEFT_DISTANCE) { // 向左滑动
                $(".info-panel").css({
                    "left": "-100vw"
                })
            }
        }
    }


    var startX, startY, moveEndX, moveEndY, X, Y;


    $("body").on("touchstart", function (e) {

        // e.preventDefault();

        startX = e.originalEvent.changedTouches[0].pageX,
            startY = e.originalEvent.changedTouches[0].pageY;

    });

    $("body").on("touchmove", function (e) {

        // e.preventDefault();

        moveEndX = e.originalEvent.changedTouches[0].pageX,

            moveEndY = e.originalEvent.changedTouches[0].pageY,

            X = moveEndX - startX,

            Y = moveEndY - startY;

        if (X >= SWIPE_RIGHT_DISTANCE) { // 移动端向右滑动
            $(".info-panel").css({
                "left": "0px",
            })
            // 拉起导航栏
            slideUpNavBar(500);
        } else if (X <= -SWIPE_LEFT_DISTANCE) { // 向左滑动
            $(".info-panel").css({
                "left": "-100vw"
            })
            slideDownNavBar(500);
        }
        // } else if (Math.abs(X) > Math.abs(Y) && X < 200) {
        //
        //     alert("像左滑动");
        //
        // } else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
        //
        //     alert("下滑动");
        //
        // } else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
        //
        //     alert("上滑动");
        //
        // } else {
        //
        //     alert("触摸");
        // }
    });

    // 框架改变大小是
    body.onresize = function () {
        let container_width = $("body").width();
        if (container_width > PHONE_WIDTH || !isPhone) { // 如果是pc
            $(".info-panel").css({
                "left": "15vw"
            })
        } else {
            $(".info-panel").css({
                "left": "-100vw"
            })
        }
    }

    $("#info-toggle").click(function () {
        isOpenInfoPanel = !isOpenInfoPanel;
        let container_width = $(".container").width();
        if (isOpenInfoPanel && (container_width <= PHONE_WIDTH || isPhone())) { // 打开面板
            let panel = document.getElementsByClassName("container")[0];
            $(".info-panel").css({
                "left": "0px",
            })
            // 拉起 导航栏
            slideUpNavBar(500);
        } else { // 关闭面板
            $(".info-panel").css({
                "left": "-100vw"
            })
            slideDownNavBar(500);
        }
    });
    // 编辑器内容保存按钮
    var saveBtn=null;

    function isPhone() {
        let mobile = navigator.userAgent.match(
            /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        )
        return mobile != null
    }

    function containerSlideDown(dom, time = 1000) {
        $(dom).slideDown(time);
    }

    function slideUp(dom, time = 500) {
        $(dom).slideUp(time);
    }

    function slideUpNavBar(time = 500) {
        $(".phone-navbar").slideUp(time);
    }

    function slideDownNavBar(time = 500) {
        $(".phone-navbar").slideDown(time);
    }
    var now_book_id=-1;
    function addDairyBookEvent() {
        $(".container").slideDown(500, () => {
            var colsm4s=document.getElementsByClassName("dairy-book-item");
            var books = document.getElementsByClassName("dairy-book-item-icon");
            var dess=document.getElementsByClassName("dairy-book-item-des");
            var categorys=document.getElementsByClassName("book-category");
            var deletes=document.getElementsByClassName("book-delete");
            var delebooks=document.getElementsByClassName("delete-book");
            // add event for search button
            let searchBtn=document.getElementById("search");
            searchBtn.addEventListener("click",function () {
                let search_input=document.getElementById("search-info");
                let info=search_input.value;
                if (info==="") return;
                reloadContainer("dairy_book.php?info="+info);
            });
            for (let i = 0; i < books.length; i++) {
                books[i].addEventListener("click",function () {
                    // 加载 笔记本信息
                    now_book_id=this.getAttribute('data-id');
                    loadBookInfo(this.getAttribute('data-id'));
                    loadSection(this.getAttribute('data-id'));
                    loadEditor();
                    // $(".container").slideUp(500, () => {
                    //     $(".container").load('editor.php', () => {
                    //         saveBtn=document.getElementById("save");
                    //         saveBtn.addEventListener('click',()=>{
                    //             //保存
                    //            saveContent();
                    //         });
                    //         $(".container").slideDown(500);
                    //     });
                    // })
                    // $(".info-wrapper").slideUp(500, () => {
                    //     $(".dairy-wrapper").slideDown(500);
                    // });

                }) ;//close
                dess[i].addEventListener("dblclick",function () {
                    delebooks[i].addEventListener("click",function () {
                        deleteBook(colsm4s[i].getAttribute('data-id'));
                        reloadContainer("dairy_book.php");
                    });
                    colsm4s[i].setAttribute('data-up',colsm4s[i].getAttribute('data-up')=='false'?'true':'false');
                    // colsm4s[i].setAttribute('data-first-load','false');
                    if (colsm4s[i].getAttribute('data-up')==='false'){
                        // 提交更改
                        let describeT=$(dess[i]).text();
                        let categoryT=$(categorys[i]).text();
                        // let book_id=colsm4s[i].getAttribute('book-id');
                        let book_id=colsm4s[i].getAttribute('data-id');
                        saveBookSurfaceInfo(describeT,categoryT,book_id);
                        $(colsm4s[i]).css({
                            "border":"none"
                        });
                        $(deletes[i]).css({
                            "display":'none'
                        })

                        dess[i].contentEditable=false;
                        categorys[i].contentEditable=false;
                    }
                    else {
                        $(colsm4s[i]).css({
                            "border":"2px dashed #74b9ff"
                        });
                        $(deletes[i]).css({
                            "display":'flex'
                        })
                        dess[i].contentEditable=true;
                        categorys[i].contentEditable=true;
                    }
                });
            }// close for
        });
    }
    function  deleteBook(bookid) {
        $.ajax({
            url:"../controller/delete_book.php",
            method:'get',
            dataType:'json',
            data:{
                book_id:bookid
            },
            success:data=>{
                if (!data.result){
                    openModel('删除失败!',true);
                }
            },
            error:()=>{
                openModel('删除失败!',true);
            }
        })
    }
    function saveInfoMe(old,name,sin,des) {
        console.log(old+"---"+name+"---"+sin+"---"+des);
        $.ajax({
            url:"../controller/update_me.php",
            method:"post",
            dataType:"json",
            data:{
                name:name,
                sin:sin,
                des:des,
                old:old
            },
            success:data=>{
                if (!data.result){
                    openModel('更新失败!',true);
                }
            },
            error:()=>{
                openModel('跟新失败!',true);
            }
        })
    }
    function reloadContainer(loadDestination) {
        console.log(loadDestination);
        $('.container').slideUp(500,()=>{
            $('.container').load(loadDestination,()=>{
                randomColor(COLORS,document.getElementsByClassName("dairy-book-item-icon"));
                addDairyBookEvent();
                $('.container').slideDown(500,()=>{
                });
            })
        });
    }
    // 加载编辑器
    function loadEditor() {
        $(".container").slideUp(500, () => {
            $(".container").load('editor.php', () => {
                let saveBtn=document.getElementById("save");
                saveBtn.addEventListener('click',()=>{
                    //保存
                    saveContent();
                });
                $(".container").slideDown(500);
            });
        })
        $(".info-wrapper").slideUp(500, () => {
            $(".dairy-wrapper").slideDown(500);
        });
    }
    function popShow(x,y){
        $("#pop").css({
            "left":x+"px",
            "top":y+"px",
            "z-index":"200",
            "display":"block"
        })
    }
    function popClose(){
        isPopShow=false;
        $("#pop").css({
            "display":"none",
            "z-index":"-99"
        })
    }
    function saveBookSurfaceInfo(describe,category,book_id) {
        $.ajax({
            url:"../controller/save_book_surface.php",
            method:"post",
            dataType:"json",
            data:{
                describe:describe,
                category:category,
                book_id:book_id
            },
            success:data=>{
                if (!data.result){
                    openModel("保存失败!",true);
                }
            },
            error:()=>{
                openModel('保存失败!',true);
            }
        })
    }
    // 记载笔记本的章节
    function loadBookInfo(bookID) {

        $.ajax({
            url:"../controller/bookinfo.php",
            method:"get",
            dataType:"json",
            data:{
                bookid:bookID
            },
            success:data=>{
                if (data.result){
                    let bn=document.getElementById("book-name");
                    bn.innerHTML=data.book_name;
                }else {
                    openModel("加载失败!",true);
                }
            },
            error:()=>{
                // window.alert("error");
            }
        })
    }
    var now_section_id=-1;

    function  loadSection(bookID) {
        $.ajax({
            url:"../controller/booksection.php",
            method:"get",
            dataType:"json",
            data:{
                bookid:bookID
            },
            success:data=>{
                if (data.result){
                    let root=document.getElementById("section");
                    root.innerHTML="";
                    // 先移除所有节点
                    for (let i=0;i<root.childNodes.length;i++){
                        root.removeChild(root.childNodes[i]);
                    }
                    for (let i=0;i<data.content.length;i++){
                        let dairyItem=document.createElement('div');
                        dairyItem.addEventListener('click',function () {
                            // 为section添加 点击事件
                            now_section_id=this.getAttribute('section-id');
                            loadContent(this.getAttribute('section-id'));
                            $(".dairy-item").css({
                                "background-color":"aliceblue",
                                "color":"#718093"
                            })
                            $(this).css({
                                "background-color":"#16a085",
                                "color":"#ffffff"
                            })
                        });
                        // background-color: #16a085;
                        // color: #ffffff;
                        dairyItem.classList.add('dairy-item');
                        dairyItem.setAttribute("section-id",data.id[i]);
                        let dairyItemText=document.createTextNode(data.content[i]);
                        dairyItem.appendChild(dairyItemText);
                        root.appendChild(dairyItem);
                    }
                }else {
                    window.alert("success error");
                }
            },
            error:()=>{
                // window.alert("error");
            }
        })
    }
    function loadContent(sectionID) {
        $.ajax({
            url:"../controller/sectioncontent.php",
            method:"post",
            dataType:'json',
            data:{
                section_id:sectionID
            },
            success:data=>{
                let edit = document.getElementById('edit-scope');
                if (data.result) {

                    edit.innerHTML="";
                    edit.innerHTML =data.content;
                }else {
                    edit.innerHTML="";
                    console.log("加载 ID = "+sectionID+"的内容时失败!");
                }
            },
            error:()=>{
                console.log('LOAD SECTION CONTENT ERROR');
            }
        })
    }

    function saveContent() {
        let contentDom=document.getElementById("edit-scope");
        let content=$(contentDom).html();
        console.log(content+"---"+now_section_id);
        $.ajax({
            url:"../controller/save_content.php",
            dataType:'json',
            method:'post',
            data:{
                content:content,
                section_id:now_section_id
            },
            success:data=>{
                if (data.result){
                    openModel("保存成功!",false);
                }else {
                    openModel("保存失败",true);
                }
            },
            error:()=>{
                openModel('保存失败!',true);
            }
        })
    }// 文字显示特效
    function danceStr(str = "LET THE WORD DANCE" /*需要特效显示的字符串*/ , root /*DOM object*/ ,
                      child_name, delay =
                          50 /*打出下一个字符时间间隔*/ , classes = ["block-span"] /*要添加的css类*/ ) {
        let index = 0;
        let delay_func = setInterval(() => {
            let span = document.createElement(child_name);
            // span.classList.add(class_str);
            for (let i = 0; i < classes.length; i++) {
                span.classList.add(classes[i]);
            }
            /*
             为什么要这么写呢?
                因为创建" "的TextNode节点是无法在页面显示出空格的,而如果创建 s+" "+ s的的节点却可以显示空格
            */
            let text = document.createTextNode(str[index + 1] === " " ? str[index++] + " " +
                str[++index] :
                str[index]);
            span.appendChild(text);
            root.appendChild(span);
            index++;
            if (index >= str.length) clearInterval(delay_func);
        }, delay);
    }

    function smokeAndAshes(str, root, delay = 50, classes = ["smoke-and-ashes"], move_classes = [
        "block-span"
    ]) {
        var spans = root.childNodes;
        var des_index = spans.length - 1;
        if (spans.length > 0) {
            let delay_func = setInterval(() => {
                spans[des_index].classList.remove('block-span');
                spans[des_index].classList.add('smoke-and-ashes');
                des_index--;
                if (des_index < 0) {
                    clearInterval(delay_func);
                    // 应该移除 节点
                    // pass:
                    setTimeout($ => {
                        for (let i = 0; i < spans.length; i++) {
                            root.removeChild(spans[i]);
                        }
                    }, 1000); // 这个1000要和 smoke-and-ashes中的delay==
                }
            }, delay);
        }
    }

    function isConnect() {
        setTimeout($ => {
            return is_connect;
        }, 3000);
    }

    function changeVerse(interval = 30000) {

    }

    function destroyVerse(content = "", origin = "", contentRoot, authorRoot) {
        smokeAndAshes(content, contentRoot, 50);
        smokeAndAshes(origin, authorRoot, 50);
    }

    function loadVerse(interval = 10000) {
        $.getJSON("https://v1.jinrishici.com/all.jso"
            , json => {
                is_connect = true;
                let content = json['content'];
                var contentRoot = document.getElementById("poetry-content");
                var originRoot = document.getElementById("poetry-origin");
                danceStr(content, contentRoot, "span", 50);
                var origin = json['origin'] + "--" + json['author'];
                setTimeout(() => {
                    danceStr(origin, originRoot, "span", 50);
                }, content.length*50);
                setTimeout($ => {
                    smokeAndAshes(content, contentRoot, 50);
                    // let setTimeout()?
                    smokeAndAshes(origin, originRoot, 50);
                    setTimeout($=>{
                        loadVerse(interval);
                    },1500)
                }, interval);
            });
    }

    function randomColor(colors,elements){
        let rgbas=new Array();
        let d=document.getElementById("s");
        for (let i=0;i<elements.length;i++){
            let color=colors[parseInt(Math.random()*colors.length)];
            elements[i].style.backgroundColor=color;
            rgbas[i]=color;
        }
        return rgbas;
    }
    function addBook() {
        $.ajax({
            url:"../controller/add_book.php",
            method:"get",
            dataType:'json',
            data:{
                par:'a',
            },
            success:data=>{
                if (data.result){
                    $('.container').slideUp(500,()=>{
                        $('.container').load('dairy_book.php',()=>{
                            randomColor(COLORS,document.getElementsByClassName("dairy-book-item-icon"));
                            addDairyBookEvent();
                            $('.container').slideDown(500,()=>{
                            });
                        })
                    });
                }else {
                    openModel('添加失败!',true);
                }
            },
            error:()=>{
                openModel('添加失败!',true);
            }
        })
    }
    function newRow() {
        // 获取所有bookrow
        /*
        *  选取最后一个row
        *  获取它的所有book-row-item
        *  如果>= 3 新建一个row,插入boook-row-item
        * */

    }
    function newColSM4() {

    }

});