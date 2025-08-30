<?php
namespace controllers;
use MVC\Router;
class storeC{
    public static function storespanel(Router $router){
        $router->view('home/stores/admin/panel.php',['inicio'=> true,"script"=> "pages/stores/panel","stores"=> true]);
    }
    public static function storesCreateP(Router $router){
        $router->view('home/stores/admin/crear.php',['inicio'=> true,"script"=> "pages/stores/create","stores"=> true]);
    }
    public static function storesEditP(Router $router){
        $router->view('home/stores/admin/editar.php',['inicio'=> true,"script"=> "pages/stores/editar","stores"=> true]);
    }
    public static function storesDeleteP(Router $router){
        $router->view('home/stores/admin/eliminar.php',['inicio'=> true,"script"=> "pages/stores/eliminar","stores"=> true]);
    }
}