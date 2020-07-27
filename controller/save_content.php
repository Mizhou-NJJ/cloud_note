<?php
include "../entity/Content.php";
include "../dao/dao.php";
 if ($_SERVER["REQUEST_METHOD"]=="POST"){
     if (isset($_POST['section_id'])){
         $c=new \entity\Content();
         $c->setContent($_POST['content']);
         $c->setSectionId($_POST['section_id']);
         if (updateContent($c)){
             $arr=array('result'=>true);
             echo json_encode($arr);
         }else{
             $arr=array('result'=>false);
             echo json_encode($arr);
         }
     }else{
         exit();
     }
 }else{
     exit();
 }
?>
