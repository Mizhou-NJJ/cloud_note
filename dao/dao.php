<?php
    include "../connect/connect.php";
function getUserByName($name){
    $c=getConn();
    $sql="select * from user where u_name='$name'";
    $result=mysqli_query($c,$sql);
    $u=null;
    if (mysqli_num_rows($result)>0){
        $u=new \entity\User();
        while ($row=mysqli_fetch_assoc($result)) {
            $u->setName($row['u_name']);
            $u->setPwd($row['pwd']);
            $u->setDescribe($row['udescribe']);
            $u->setPersonalized($row['personalized']);
            $u->setPortrait($row['portrait']);
        }
    }
    mysqli_close($c);
    return $u;
}
function addUser(\entity\User $user){
    $name=$user->getName();
    $pwd=$user->getPwd();
    $por=$user->getPortrait();
    $c=getConn();
    $sql="insert into user (u_name,pwd,portrait) values ('$name','$pwd','$por')";
    $flag=$c->query($sql);
    mysqli_close($c);
    return $flag>0;
}
function getUser(\entity\User $user){
    $c=getConn();
    $name=$user->getName();
    $pwd=$user->getPwd();
    $sql="select * from user where u_name='$name' and pwd='$pwd'";
    $result=mysqli_query($c,$sql);
    $b=null;
    if (mysqli_num_rows($result)>0){
        $b=new \entity\User();
        while ($row=mysqli_fetch_assoc($result)){
            $b->setName($row['u_name']);
            $b->setPwd($row['pwd']);
            $b->setDescribe($row['udescribe']);
            $b->setPersonalized($row['personalized']);
            $b->setPortrait($row['portrait']);
        }
    }
    mysqli_close($c);
    return $b;
}
function getBookCount(){
    $sql="select count(*) as a from book";
    $conn=getConn();
    $result=mysqli_query($conn,$sql);
    $c=0;
    if (mysqli_num_rows($result)>0){
        while ($row=mysqli_fetch_assoc($result)){
            $c=$row['a'];
        }
    }
    mysqli_close($conn);
    return $c;
}
function getSecionCount(){
    $sql="select count(*) as a from bsection ";
    $conn=getConn();
    $result=mysqli_query($conn,$sql);
    $c=0;
    if (mysqli_num_rows($result)>0){
        while ($row=mysqli_fetch_assoc($result)){
            $c=$row['a'];
        }
    }
    mysqli_close($conn);
    return $c;
}
function getAllBook(){
    $conn=getConn();
    $sql="select * from  book";
    $result=mysqli_query($conn,$sql);
    $books=array();
    if (mysqli_num_rows($result)>0){
        $count=0;
        while ($row=mysqli_fetch_assoc($result)){
            $book=new \entity\Book();
            $book->setBookId($row['book_id']);
            $book->setBookName($row['book_name']);
            $book->setBookCategory($row['book_category']);
            $book->setBookDate($row['book_create_date']);
            $book->setBookDescribe($row['book_describe']);
            $books[$count]=$book;
            $count+=1;
        }
    }
    mysqli_close($conn);
    return $books;
}
function getSearch($info){
    $conn=getConn();
    $sql="select * from book where book_name like '%$info%' or book_category like '%$info%' or book_describe like '%$info%' or book_create_date like '%$info%'";
    $result=mysqli_query($conn,$sql);
    $books=array();
    if (mysqli_num_rows($result)>0){
        $count=0;
        while ($row=mysqli_fetch_assoc($result)){
            $book=new \entity\Book();
            $book->setBookId($row['book_id']);
            $book->setBookName($row['book_name']);
            $book->setBookCategory($row['book_category']);
            $book->setBookDate($row['book_create_date']);
            $book->setBookDescribe($row['book_describe']);
            $books[$count]=$book;
            $count+=1;
        }
    }
    mysqli_close($conn);
    return $books;
}
function getBookById($bookid){
    $c=getConn();
    $sql="select * from book where book_id='$bookid'";
    $result=mysqli_query($c,$sql);
    $book=null;
    if (mysqli_num_rows($result)>0){
       $book=new \entity\Book();
        while ($row=mysqli_fetch_assoc($result)){
            $book->setBookId($row['book_id']);
            $book->setBookName($row['book_name']);
            $book->setBookCategory($row['book_category']);
            $book->setBookDate($row['book_create_date']);
            $book->setBookDescribe($row['book_describe']);
        }
    }
    mysqli_close($c);
    return $book;
}
function getSectionsById($bookid){
    $conn=getConn();
    $sql="select * from  bsection where book_id='$bookid'";
    $result=mysqli_query($conn,$sql);
    $sections=array();
    if (mysqli_num_rows($result)>0){
        $count=0;
        while ($row=mysqli_fetch_assoc($result)){
            $section=new \entity\Section();
            $section->setBookId($row['book_id']);
            $section->setSectionName($row['section_name']);
            $section->setSectionId($row['section_id']);
            $sections[$count]=$section;
            $count+=1;
        }
    }
    mysqli_close($conn);
    return $sections;
}
function getContentBySectionId($sectionId){
    $conn=getConn();
    $sql="select * from  content where section_id='$sectionId'";
    $result=mysqli_query($conn,$sql);
    $content=null;
    if (mysqli_num_rows($result)>0){
        $content=new \entity\Content();
        while ($row=mysqli_fetch_assoc($result)){
            $content->setSectionId($row['section_id']);
            $content->setContent($row['content']);
        }
    }
    mysqli_close($conn);
    return $content;
}
function updateContent(\entity\Content $content){
    $contentText=$content->getContent();
    $section_id=$content->getSectionId();
    $c=getConn();
    $sql="update content set content='$contentText' where section_id='$section_id'";
    $flag=$c->query($sql);
    mysqli_close($c);
    return $flag>0;
}
function updateBookSurface($describe,$category,$book_id){
    $c=getConn();
    $sql="update book set book_category='$category',book_describe='$describe' where book_id='$book_id'";
    $flag=$c->query($sql);
    mysqli_close($c);
    return $flag>0;
}
function addBook(\entity\Book $book){
    $bn=$book->getBookName();
    $bc=$book->getBookCategory();
    $bd=$book->getBookDescribe();
    $bdate=$book->getBookDate();
    $c=getConn();
    $sql="insert into book (book_name,book_create_date,book_category,book_describe) values ('$bn','$bdate','$bc','$bd')";
    $flag=$c->query($sql);
    mysqli_close($c);
    return $flag>0;
}
function deleteBook($bookId){
    $c=getConn();
    $sql="delete from book where book_id='$bookId'";
    $flag=$c->query($sql);
    mysqli_close($c);
    return $flag>0;
}
function deleteSectionByBookId($bookId){
    $c=getConn();
    $sql="delete from bsection where book_id='$bookId'";
    $flag=$c->query($sql);
    mysqli_close($c);
    return $flag>0;
}
function deleteContentBySectionId($sectionid){
    $c=getConn();
    $sql="delete from content where section_id='$sectionid'";
    $flag=$c->query($sql);
    mysqli_close($c);
    return $flag>0;
}
function updateUser($old,$name,$sin,$des){
    $c=getConn();
    $sql="update user set u_name='$name',personalized='$sin',udescribe='$des' where u_name='$old'";
    $flag=$c->query($sql);
    mysqli_close($c);
    return $flag>0;
}
function addSection($book_id,$setName){
    $c=getConn();
    $sql="insert into bsection (book_id,section_name) values ('$book_id','$setName')";
    $flag=$c->query($sql);
    $allsql="select * from bsection";
    $result=mysqli_query($c,$allsql);
    $id=-1;
    if (mysqli_num_rows($result)>0){
        while ($row=mysqli_fetch_assoc($result)){
            $id=$row['section_id'];
        }
    }
    mysqli_close($c);
    return $id;
}
function addContent($section_id){
    $c=getConn();
    $sql="insert into content (section_id) values ('$section_id')";
    $flag=$c->query($sql);
    mysqli_close($c);
    return $flag>0;
}
?>
