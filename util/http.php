<?php
/*
 * 进行有关http的处理
 * 例如第三方 接口的代理请求
 * */
function translate($w,$from='auto',$to='auto'){
    /*
     *  w 要翻译的内容
     *  from 要翻译的语言
     *  to 要翻译成的语言
     * */
    $url = 'http://fy.iciba.com/ajax.php?a=fy&f='.$from.'&t='.$to.'&w='.$w;
    return file_get_contents($url);
}
function ancientPoetry(){

}
function saying(){

}

?>
