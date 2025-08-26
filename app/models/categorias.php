<?php
namespace models;
class categorias extends main{
    public static $table="categorias_tienda";
    public static $columnDB = ["id", "nombre"];
    public $id;
    public $nombre;
    public function __construct($data = []) {
        $this->id = $data["id"] ?? null;
        $this->nombre = $data["nombre"] ?? "";
    }
  
}
