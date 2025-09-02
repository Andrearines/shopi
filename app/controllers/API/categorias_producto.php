<?php
namespace controllers\API;
use models\categoria_producto;
use models\user;
class categorias_producto{
    public static function search(){
        $user=user::desifrartoken();
        if($user){
            $categorias=categoria_producto::search($_GET['search']);
            echo json_encode($categorias);
        }else{
            echo json_encode(["ok"=>false]);
        }
    }

    public static function all(){
        $user=user::desifrartoken();
        if($user){
            $categorias=categoria_producto::all();
            echo json_encode($categorias);
        }else{
            echo json_encode(["ok"=>false]);
        }
    }
}
