<?php
namespace controllers;
use MVC\Router;
class login{
    public static function login(Router $r){
        $r->view("/login/login.php",[]);
    }
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    public static function register(Router $r){
        $r->view("/login/register.php",["script"=>"pages/register"]);
    }
    public static function confirm(Router $r){
        $r->view("/login/confrim.php",["script"=>"pages/verificar"]);

    }
    public static function forget(Router $r){

        $r->view("/login/forget.php",[]);
    }
}