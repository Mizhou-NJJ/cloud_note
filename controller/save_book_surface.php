<?php
include "../dao/dao.php";
    if ($_SERVER['REQUEST_METHOD']=="POST"){
        if (isset($_POST['describe'])){
            if (updateBookSurface($_POST['describe'],$_POST['category'],$_POST['book_id'])){
                $arr=array('result'=>true);
                echo json_encode($arr);
            }else{
                $arr=array('result'=>false);
                echo json_encode($arr);
            }
        }
    }else{
        echo "非法访问!";
    }
?>