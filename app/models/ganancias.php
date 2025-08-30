<?php
namespace models;

class ganancias extends main{
    public static $table = "ganancias";
    public static $columnDB = ["id", "tienda_id", "envio_id", "created_at"];
    
    public $id;
    public $tienda_id;
    public $envio_id;
    public $created_at;
    
    public function __construct($data = []) {
        $this->id = self::$db->real_escape_string($data["id"] ?? null);
        $this->tienda_id = self::$db->real_escape_string($data["tienda_id"] ?? "");
        $this->envio_id = self::$db->real_escape_string($data["envio_id"] ?? "");
        $this->created_at = self::$db->real_escape_string($data["created_at"] ?? date('Y-m-d H:i:s'));
    }
    
    /**
     * Obtiene ganancias de una tienda específica en un rango de fechas
     */
    public static function getEarningsByStore($tienda_id, $days = 30) {
        $tienda_id = self::$db->real_escape_string($tienda_id);
        $days = (int)$days;
        
        $query = "SELECT 
                    DATE(created_at) as fecha,
                    COUNT(*) as total_ganancias,
                    SUM(1) as cantidad
                  FROM " . static::$table . " 
                  WHERE tienda_id = '$tienda_id' 
                    AND created_at >= DATE_SUB(NOW(), INTERVAL $days DAY)
                  GROUP BY DATE(created_at)
                  ORDER BY fecha ASC";
        
        $result = self::$db->query($query);
        $earnings = [];
        
        while ($row = $result->fetch_assoc()) {
            $earnings[] = $row;
        }
        
        return $earnings;
    }
    
    /**
     * Obtiene el total de ganancias de una tienda en un período
     */
    public static function getTotalEarnings($tienda_id, $days = 30) {
        $tienda_id = self::$db->real_escape_string($tienda_id);
        $days = (int)$days;
        
        $query = "SELECT COUNT(*) as total 
                  FROM " . static::$table . " 
                  WHERE tienda_id = '$tienda_id' 
                    AND created_at >= DATE_SUB(NOW(), INTERVAL $days DAY)";
        
        $result = self::$db->query($query);
        $row = $result->fetch_assoc();
        
        return $row['total'] ?? 0;
    }
}
