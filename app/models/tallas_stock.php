<?php
namespace models;

class tallas_stock extends main{
    public static $table="talla_stocks";
    public static $columnDB=[
        "id", "producto_id", "talla_id", "cantidad", "precio_unitario"];
    
        public $id;
        public $producto_id;
        public $talla_id;
        public $cantidad;
        public $precio_unitario;

        public function __construct($data = [])
        {
            $this->id = self::$db->real_escape_string($data['id']) ?? null;
            $this->producto_id = self::$db->real_escape_string($data['producto_id']) ?? null;
            $this->talla_id = self::$db->real_escape_string($data['talla_id']) ?? null;
            $this->cantidad = self::$db->real_escape_string($data['cantidad']) ?? null;
            $this->precio_unitario = self::$db->real_escape_string($data['precio_unitario']) ?? null;
        }

        public static function SQL($query){
            $result = self::$db->query($query);
            $array = [];
            while ($row = $result->fetch_assoc()) {
                $array[] = $row; // aquí incluyes todas las columnas, incluyendo talla_nombre
            }
            return $array;   
        }
        
}
