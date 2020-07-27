<?php
function getConn(){
    $ip="localhost";
    $name="root";
    $password="123456";
    $data_base="cloudnote";
    $conn=new mysqli($ip,$name,$password,$data_base);
    if ($conn->error) die("Connection failed: " . mysqli_connect_error());
    else return $conn;
}
?>
