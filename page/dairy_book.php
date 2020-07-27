<?php
session_start();
include "../entity/Book.php";
include "../dao/dao.php";
include "../util/util.php";
$books=null;
$whatRow=0;
$info="info";
if (!isset($_SESSION['user'])){
    exit();
}else{
        if (isset($_GET['info'])){
            $books=getSearch($_GET['info']);
        }else{
            $books=getAllBook();
        }
}

?>


<nav class="navbar navbar-expand-sm  navbar-dark justify-content-center sub-navbar">
    <ul class="navbar-nav">
        <li class="nav-item active">
            <a class="nav-link" href="#">BOOKS</a>
        </li>
    </ul>
</nav>
<div class="row">
    <div class="search-div">
        <div><input type="text" id="search-info" placeholder="" autocomplete="false"><button id="search"><span class="fa fa-search"></span></button></div>
    </div>
</div>
<?php
 $col=1;
 $flag=true;
 if (count($books)<=0){
     echo "<div style='text-align: center;margin-top: 100px;font-weight: 700;font-size: 1.4rem;color: gray;font-family: Microsoft JhengHei'>未搜索到任何结果!</div>";
     exit();
 }
 while ($flag){
?>
<div class="row book-row">
        <?php for (;$col<=count($books);$col++){
            if ($col==count($books)) $flag=false;
            ?>
    <div class="col-sm-4 book-row-item" data-id="<?php echo $books[$col-1]->getBookId();?>">
        <div class="dairy-book-item" data-id="<?php echo $books[$col-1]->getBookId();?>" data-up="false" data-first-load="true">
            <div class="dairy-book-item-icon" data-id="<?php echo $books[$col-1]->getBookId();?>">
                <div class="icon-circle"><span class="fa <?php echo getPrefix().getRandomFontIcon(); ?>"></span></div>
            </div>
            <div class="dairy-book-item-des" data-id="<?php echo $books[$col-1]->getBookId();?>"><span><?php echo $books[$col-1]->getBookDescribe();?></span></div>
            <div class="dairy-book-item-createtime">
                <div class="book-category"><?php echo $books[$col-1]->getBookCategory();?></div>
                <div class="book-delete"><span class="fa fa-trash-o delete-book" data-id="<?php echo $books[$col-1]->getBookId();?>"></span></div>
                <div class="book-date"><?php echo $books[$col-1]->getBookDate();?></div>
            </div>
        </div>
    </div>
    <?php
            if ($col%3==0){
                $col++;
                break;
            }
        } ?>
</div>
    <?php }?>