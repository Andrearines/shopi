<?php 
namespace controllers\API;

use models\user;
use models\stores;
use models\ganancias;

class storeA{
    public static function IsTienda(){
        $user=user::desifrartoken();
        if($user){
            $stores=stores::findBy("id",$user->tienda_id);
            if($stores){
                echo json_encode($stores);
            }else{
                echo json_encode(["ok"=>false]);
            }
        }else{
            echo json_encode(["ok"=>false]);
        }
    }

  
    public static function getEarnings(){
        $user = user::desifrartoken();
        if(!$user){
            echo json_encode(["ok" => false, "message" => "No autorizado"]);
            return;
        }

        $days = $_GET['days'] ?? 30;
        $days = max(1, min(90, (int)$days)); // Limitar entre 1 día y 3 meses
        
        $tienda_id = $user->tienda_id;
        
        // Obtener datos de ganancias por día
        $earningsData = ganancias::getEarningsByStore($tienda_id, $days);
        
        // Obtener total de ganancias
        $totalEarnings = ganancias::getTotalEarnings($tienda_id, $days);
        
        echo json_encode([
            "ok" => true,
            "data" => $earningsData,
            "total" => $totalEarnings,
            "period" => $days
        ]);
    }
}