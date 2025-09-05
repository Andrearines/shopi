<?php
namespace controllers;
use MVC\Router;
class storeC{
    public static function storespanel(Router $router){
        $router->view('home/stores/admin/panel.php',['inicio'=> true,"script"=> "pages/stores/panel","stores"=> true]);
    }
    public static function storeGRUD(Router $router){
        $router->view('home/stores/admin/GRUD.php',['inicio'=> true,"script"=> "pages/stores/GRUD","stores"=> true]);
    }
}