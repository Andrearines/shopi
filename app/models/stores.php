<?php
namespace models;

class stores extends main{
    public static $table="tiendas";
    //Tabla: tiendas  estado ENUM('Activa', 'Suspendida', 'Cerrada') DEFAULT 'Activa',
    public static $columnDB =["id", "nombre", "descripcion", "categoria_id", "estado", "fecha_creacion"];
    public $id;
    public $nombre;
    public $descripcion;
    public $categoria_id;
    public $estado;
    public $fecha_creacion;
    public function __construct($data=[]){
        $this->id = self::$db->real_escape_string($data["id"]);
        $this->nombre = self::$db->real_escape_string($data["nombre"]);
        $this->descripcion = self::$db->real_escape_string($data["descripcion"]);
        $this->categoria_id = self::$db->real_escape_string($data["categoria_id"]);
        $this->estado = self::$db->real_escape_string($data["estado"]);
        $this->fecha_creacion = self::$db->real_escape_string($data["fecha_creacion"]);
    }
}