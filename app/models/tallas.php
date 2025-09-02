<?php

namespace models;

class tallas extends main{
    public static $table="talla";
    public static $columnDB=[
        "id", "nombre"];
    
    public $id;
    public $nombre;
   

    public function __construct($data = []){
        $this->id=self::$db->real_escape_string($data['id']) ?? null;
        $this->nombre=self::$db->real_escape_string($data['nombre']) ?? null;
    }
}