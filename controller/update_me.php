<?php
    include "../dao/dao.php";
    include "../entity/User.php";
    session_start();
    if (isset($_SESSION['user'])){
        if ($_SERVER["REQUEST_METHOD"]=="POST"){
            if (isset($_POST['name'])){
                if (updateUser($_POST['old'],$_POST['name'],$_POST['sin'],$_POST['des'])){
                    $u=new \entity\User();
                    $_SESSION['user']=serialize(getUserByName($_POST['name']));
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
