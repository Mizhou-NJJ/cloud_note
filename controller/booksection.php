<?php
include "../entity/Section.php";
include "../dao/dao.php";
if (true){
    if (isset($_GET['bookid'])){
       $sections=getSectionsById($_GET['bookid']);
       $contents=array();
       $ids=array();
       for ($i=0;$i<count($sections);$i++){
           $contents[$i]=$sections[$i]->getSectionName();
           $ids[$i]=$sections[$i]->getSectionId();
       }
       $arr=array('result'=>true,'content'=>$contents,'id'=>$ids);
       echo json_encode($arr);
    }else{
        $arr=array("result"=>"ERROR!");
    }
}else{
    $arr=array("result"=>"非法访问!");
    echo json_encode($arr);
}
?>
