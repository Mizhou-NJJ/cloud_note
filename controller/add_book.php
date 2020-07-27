<?php
   include "../dao/dao.php";
   include "../entity/Book.php";
    session_start();
    if (isset($_SESSION['user'])){
        if ($_SERVER['REQUEST_METHOD']=="GET"){
            if (isset($_GET['par'])){
                // ok
                $book=new \entity\Book();
                $book->setBookName("cloud notebook");
                $book->setBookDescribe('Double-click here to modify');
                $book->setBookCategory('category');
                $book->setBookDate(date('y-m-d'));
                if (addBook($book)){
                    $arr=array('result'=>true);
                    echo json_encode($arr);
                }else{
                    $arr=array('result'=>false);
                    echo json_encode($arr);
                }
            }
        }
    }else{
        echo "非法访问!";
        exit();
    }
?>
