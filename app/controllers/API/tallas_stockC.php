<?php

namespace controllers\API;

use models\tallas_stock;
use models\user;

class tallas_stockC {

    public static function allP() {
        $user = user::desifrartoken();
    
        if (!$user || !isset($_GET['id']) || !is_numeric($_GET['id'])) {
            echo json_encode(["ok" => false, "error" => "Usuario no autorizado o ID inválido"]);
            return;
        }
    
        $productoId = intval($_GET['id']);
    
      
        $tallas = tallas_stock::SQL("
        SELECT 
            talla_stocks.id AS stock_id,
            talla_stocks.producto_id,
            talla_stocks.talla_id,
            talla_stocks.cantidad,
            talla_stocks.precio_unitario,
            talla.nombre AS talla_nombre
        FROM talla_stocks
        JOIN talla ON talla_stocks.talla_id = talla.id
        WHERE talla_stocks.producto_id = {$productoId}");
    
        echo json_encode($tallas);
    }

    public static function guardarTallasStock() {
        $json = file_get_contents("php://input");
        $data = json_decode($json, true);
    
        if (json_last_error() !== JSON_ERROR_NONE) {
            http_response_code(400);
            echo json_encode(["ok" => false, "error" => "JSON inválido"]);
            return;
        }
    
        $user = user::desifrartoken();
        if (!$user || !$user->tienda_id) {
            echo json_encode(["ok" => false, "error" => "Usuario no autorizado"]);
            return;
        }
    
        $productoId = intval($data['producto_id'] ?? 0);
        $tallasInput = $data['tallas'] ?? [];
    
        if ($productoId <= 0 || empty($tallasInput)) {
            echo json_encode(["ok" => false, "error" => "Datos incompletos"]);
            echo var_dump($data);
            return;
        }
    
        // Iterar tallas enviadas
        foreach ($tallasInput as $talla) {
            $tallaId  = intval($talla['talla_id']);
            $cantidad = intval($talla['cantidad']);
            $precio_unitario   = floatval($talla['precio_unitario']);
        
            $existe = tallas_stock::SQL("
                SELECT id 
                FROM talla_stocks 
                WHERE producto_id = {$productoId} 
                  AND talla_id = {$tallaId}
                LIMIT 1
            ");
        
            $ts = new tallas_stock();
            $ts->producto_id     = $productoId;
            $ts->talla_id        = $tallaId;
            $ts->cantidad        = $cantidad;
            $ts->precio_unitario = $precio_unitario;
        
            if ($existe) {
               
                $ts->update($existe[0]["id"]); // actualiza registro existente
            } else {
                $ts->save(); // inserta nuevo
            }
        }
        
        echo json_encode([
            "ok" => true,
            
        ]);
    }
}

