<?php
include "../entity/Content.php";
include "../dao/dao.php";
    if ($_SERVER["REQUEST_METHOD"]=="POST"){
        if (isset($_POST['section_id'])){
            $content=getContentBySectionId($_POST['section_id']);
            if ($content!=null){
                $arr=array('result'=>true,'sectionid'=>$content->getSectionId(),'content'=>$content->getContent());
                echo json_encode($arr);
            }else{
                $arr=array('result'=>false);
                echo json_encode($arr);
            }
        }
        else{
            exit();
        }
    }else{
        exit();
    }
?>
