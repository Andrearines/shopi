<?php

namespace controllers\API;

use models\tallas;
use models\user;

class tallasC{


    public static function all(){
        $user = user::desifrartoken();
        if($user){
            $tallas = tallas::all();
            echo json_encode($tallas);
        }else{
            echo json_encode([
                "ok" => false,
            ]);
        }
    }

    public static function allP(){
        $user = user::desifrartoken();
        if($user && isset($_GET['id']) && is_numeric($_GET['id'])){
            $tallas = tallas::SQL("SELECT 
            ts.id AS stock_id,
            ts.producto_id,
            t.nombre AS talla,
            ts.cantidad,
            ts.precio_unitario
        FROM talla_stocks ts
        INNER JOIN talla t ON ts.talla_id = t.id
        WHERE ts.producto_id = ".$_GET['id']."");
            echo json_encode($tallas);
        }else{
            echo json_encode([
                "ok" => false,
            ]);
        }

    }

}
