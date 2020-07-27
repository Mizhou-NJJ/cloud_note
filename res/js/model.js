 function openModel(str,isError=false) {
    let model=document.getElementById("model");
    let model_icon=document.getElementById("model-icon");
    let modelTip=document.getElementById(("model-tip"));
    let c=document.getElementsByClassName("model-div")[0];
    c.classList.remove("model-transition");
    model_icon.classList.remove("fa-check");
    model_icon.classList.remove("fa-times");
    modelTip.classList.remove("error");
    modelTip.classList.remove("success");
    modelTip.innerText=str;
    if (isError){ // 如果是失败
        modelTip.classList.add("error");
        model_icon.classList.add("fa-times");
        model_icon.classList.add("error");
    }else {
        modelTip.classList.add("success");
        model_icon.classList.add("fa-check");
        model_icon.classList.add("success");
    }
    $(model).css({
        "z-index":"101",
        "display":"flex"
    })
}
// 关闭模态框
 function closeModel() {
    $("#model-content-close").click(()=>{
        let c=document.getElementsByClassName("model-div")[0];
        c.classList.add("model-transition");
        setTimeout(()=>{
            $("#model").css({
                "z-index":"-101",
                "display":"none"
            });
        },500)
    });
}

