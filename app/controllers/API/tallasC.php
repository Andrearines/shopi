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

}
