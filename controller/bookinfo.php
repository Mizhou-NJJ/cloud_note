<?php
include "../dao/dao.php";
include "../entity/Book.php";
    if ($_SERVER['REQUEST_METHOD']=="GET"){
        if (isset($_GET['bookid'])){
            $book=getBookById($_GET['bookid']);
            if ($book!=null){
                $arr=array('result'=>true,'book_name'=>$book->getBookName());
                echo json_encode($arr);
            }
            else{
                $arr=array('result'=>false);
                echo json_encode($arr);
            }
        }else{
            $arr=array("result"=>"ERROR!");
        }
    }else{
        $arr=array("result"=>"非法访问!");
        echo json_encode($arr);
    }
?>