<?php 
namespace models;

class categoria_producto extends main{
    public static $table="categorias_producto";
    public static $columnDB = ["id", "nombre"];
    public $id;
    public $nombre;
    public function __construct($data = []){
        $this->id = $data["id"] ?? null;
        $this->nombre = $data["nombre"] ?? "";
    }
    public function validate(){
        if(empty($this->nombre)){
            self::$errors["error"][]="El nombre es obligatorio";
        }
        return self::$errors;
    }
    public static function search($search){
        // Cache para búsquedas frecuentes
        if (self::$cacheEnabled) {
            $cacheKey = static::$table . '_search_' . md5($search);
            
            if (isset(self::$cache[$cacheKey])) {
                return self::$cache[$cacheKey];
            }
        }
        
        // Escapar el término de búsqueda
        $search = self::$db->real_escape_string($search);
        
        // Usar la tabla correcta (tiendas) y buscar en múltiples campos
        $query = "SELECT * FROM " . static::$table . " WHERE nombre LIKE '%$search%'";
        $result = self::$db->query($query);
        
        $categorias = [];
        while ($row = $result->fetch_assoc()) {
            $categorias[] = static::create($row,$row);
        }
        
        // Guardar en cache
        if (self::$cacheEnabled) {
            self::$cache[$cacheKey] = $categorias;
        }
        
        return $categorias;
    }
}