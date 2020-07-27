<?php
    include "../entity/User.php";
    include "../dao/dao.php";
    if ($_SERVER["REQUEST_METHOD"]=="POST"){
        $name=$_POST['signup_name'];
        $pwd=$_POST['signup_password'];
        $por=$_POST['portrait'];
        $user=new \entity\User();
        $user->setName($name);
        $user->setPwd($pwd);
        $user->setPortrait($por);
        if (addUser($user)){
            $arr=array('result'=>true);
            echo json_encode($arr);
        }else{
            $arr=array('result'=>false);
            echo json_encode($arr);
        }
    }else{
        $arr=array('result'=>'非法访问!');
        echo json_encode($arr);
    }
?>
