<?php
namespace controllers\API;
use models\categorias;
use models\user;
class categoriasA{
    public static function all(){
        $user=user::desifrartoken();
        if($user){
            $categorias=categorias::all();
            echo json_encode($categorias);
        }else{
            echo json_encode(["ok"=>false]);
        }
    }
}
