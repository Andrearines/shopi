<?php
namespace controllers;
use MVC\Router;

class paginas{

    public static function storesCreate(Router $router){
        $router->view('home/stores/create.php',['inicio'=> true,"script"=> "pages/stores/create"]);
    }
    public static function user(Router $router){
        
        $router->view('home/user.php',['inicio'=> true,"script"=> "pages/user"]);
    }
    public static function index(Router $router){
        $router->view('home/index.php',['inicio'=> true,"script"=> "pages/home"]);
    }
     //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
}