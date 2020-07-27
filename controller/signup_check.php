<?php
include "../entity/User.php";
include "../dao/dao.php";
if ($_SERVER["REQUEST_METHOD"]=="POST"){
    $name=$_POST['signup_name'];
    if (getUserByName($name)!=null){
        $arr=array('result'=>false);
        echo json_encode($arr);
    }else{
        $arr=array('result'=>true);
        echo json_encode($arr);
    }
}
else{
    $arr=array("result"=>"非法访问!");
    echo json_encode($arr);
}
?>


