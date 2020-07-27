<?php
    include "../util/http.php";
    if ($_SERVER['REQUEST_METHOD']=="GET"){
        if (isset($_GET['w'])){
            //需要翻译的内容
            $w=$_GET['w'];
            if (isset($_GET['f'])&&isset($_GET['t'])){
                $f=$_GET['f'];
                $t=$_GET['t'];
               echo json_encode(translate($w,$f,$t));
            }else{
                // f =auto  t =auto
                $f='auto';
                $t='auto';
                echo json_encode(translate($w));
            }
        }else{
            $arr=array("result"=>'非法访问');
        }
    }
?>
