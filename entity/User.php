<?php

namespace entity;
class User
{
    var $name;
    var $pwd;
    var $personalized;
    var $describe;
    var $portrait;

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getPwd()
    {
        return $this->pwd;
    }

    /**
     * @param mixed $pwd
     */
    public function setPwd($pwd)
    {
        $this->pwd = $pwd;
    }

    /**
     * @return mixed
     */
    public function getPersonalized()
    {
        return $this->personalized;
    }

    /**
     * @param mixed $personalized
     */
    public function setPersonalized($personalized)
    {
        $this->personalized = $personalized;
    }

    /**
     * @return mixed
     */
    public function getDescribe()
    {
        return $this->describe;
    }

    /**
     * @param mixed $describe
     */
    public function setDescribe($describe)
    {
        $this->describe = $describe;
    }

    /**
     * @return mixed
     */
    public function getPortrait()
    {
        return $this->portrait;
    }

    /**
     * @param mixed $portrait
     */
    public function setPortrait($portrait)
    {
        $this->portrait = $portrait;
    }

}