<?php
namespace controllers;
use MVC\Router;
class login{
    public static function login(Router $r){
        $r->view("/login/login.php",["script"=>"pages/login/login"]);
    }
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    public static function register(Router $r){
        $r->view("/login/register.php",["script"=>"pages/login/register"]);
    }
    public static function confirm(Router $r){
        $r->view("/login/confrim.php",["script"=>"pages/login/verificar"]);

    }
    public static function forget(Router $r){
        
        $r->view("/login/forget.php",["script"=>"pages/login/forget"]);
    }
    public static function reset(Router $r){
        
        $r->view("/login/reset.php",["script"=>"pages/login/reset"]);
    }
}