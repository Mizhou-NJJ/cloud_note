<?php
 include "../dao/dao.php";
 if (isset($_POST['book_id'])){
     $end_section_id=addSection($_POST['book_id'],$_POST['section']);
     if ($end_section_id!=-1){
         addContent($end_section_id);
         $arr=array('result'=>true);
         echo json_encode($arr);
     }else{
         $arr=array('result'=>false);
         echo json_encode($arr);
     }
 }else{
     echo "非法访问";
     exit();
 }
?>
