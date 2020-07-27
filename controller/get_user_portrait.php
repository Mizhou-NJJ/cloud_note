<?php
include "../entity/User.php";
include "../dao/dao.php";
if ($_SERVER["REQUEST_METHOD"]=="GET"){
    $name=$_GET['name'];
    $user=getUserByName($name);
    if ($user==null){
        $arr=array('result'=>false);
        echo json_encode($arr);
    }else{
        $arr=array('result'=>true,'imgurl'=>$user->getPortrait());
        echo json_encode($arr);
    }
}
else{
    $arr=array("result"=>"非法访问!");
    echo json_encode($arr);
}
?>


