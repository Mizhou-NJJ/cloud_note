<?php
function getRandomFontIcon(){
    $arr=array("leaf","map","hourglass-half","graduation-cap","gears",'fire','dashboard','camera','beer','code','windows',
        'pie-chart','quote-left','legal','image','frown-o','gamepad');
    return $arr[rand(0,count($arr))];
}
function getPrefix(){
    return "fa-";
}
?>
