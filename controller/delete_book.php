<?php
    session_start();
    include "../dao/dao.php";
    if (isset($_SESSION['user'])){
        if ($_SERVER["REQUEST_METHOD"]=="GET"){
            if (isset($_GET['book_id'])){
                $book_id=$_GET['book_id'];
                $sections=getSectionsById($book_id);
                for ($i=0;$i<count($sections);$i++){
                    deleteContentBySectionId($sections[$i]->getSectionId());
                }
                deleteSectionByBookId($book_id);
                if (deleteBook($book_id)){
                    $arr=array('result'=>true);
                    echo json_encode($arr);
                }else{
                    $arr=array('result'=>false);
                    echo json_encode($arr);
                }
            }
        }
    }else{
        echo "非法访问";
        exit();
    }
?>
