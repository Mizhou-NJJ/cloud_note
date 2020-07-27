<?php


namespace entity;


class Book
{
    private $bookId;
    private $bookName;
    private $bookDate;
    private $bookCategory;
    private $bookDescribe;

    /**
     * @return mixed
     */
    public function getBookDescribe()
    {
        return $this->bookDescribe;
    }

    /**
     * @param mixed $bookDescribe
     */
    public function setBookDescribe($bookDescribe)
    {
        $this->bookDescribe = $bookDescribe;
    }

    /**
     * @return mixed
     */
    public function getBookId()
    {
        return $this->bookId;
    }

    /**
     * @param mixed $bookId
     */
    public function setBookId($bookId)
    {
        $this->bookId = $bookId;
    }

    /**
     * @return mixed
     */
    public function getBookName()
    {
        return $this->bookName;
    }

    /**
     * @param mixed $bookName
     */
    public function setBookName($bookName)
    {
        $this->bookName = $bookName;
    }

    /**
     * @return mixed
     */
    public function getBookDate()
    {
        return $this->bookDate;
    }

    /**
     * @param mixed $bookDate
     */
    public function setBookDate($bookDate)
    {
        $this->bookDate = $bookDate;
    }

    /**
     * @return mixed
     */
    public function getBookCategory()
    {
        return $this->bookCategory;
    }

    /**
     * @param mixed $bookCategory
     */
    public function setBookCategory($bookCategory)
    {
        $this->bookCategory = $bookCategory;
    }

}