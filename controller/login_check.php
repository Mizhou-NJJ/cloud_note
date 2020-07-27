<?php
include "../dao/dao.php";
include "../entity/User.php";
session_start();
    if ($_SERVER["REQUEST_METHOD"]=="POST"){
        $user=new \entity\User();
        $user->setName($_POST['login_name']);
        $user->setPwd($_POST['login_password']);
        $u=getUser($user);
        if ($u!=null){
            $_SESSION['user']=serialize($u);
            $arr=array('result'=>true);
            echo json_encode($arr);
        }else{
            $arr=array('result'=>false);
            echo json_encode($arr);
        }
    }else{
        $arr=array("result"=>"非法访问");
    }
?>
