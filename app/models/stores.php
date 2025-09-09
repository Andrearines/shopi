<?php
namespace models;

class stores extends main{
    public static $table="tiendas";
    //Tabla: tiendas  estado ENUM('Activa', 'Suspendida', 'Cerrada') DEFAULT 'Activa',
    public static $columnDB =["id", "nombre", "descripcion", "categoria_id", "estado", "fecha_creacion","img","banner"];
    public $id;
    public $nombre;
    public $descripcion;
    public $categoria_id;
    public $estado;
    public $fecha_creacion;
    public $img;
    public $banner;
    public function __construct($data=[],$img=[]){
        $this->id = self::$db->real_escape_string($data["id"]??null);
        $this->nombre = self::$db->real_escape_string($data["nombre"]??"");
        $this->descripcion = self::$db->real_escape_string($data["descripcion"]??"");
        $this->categoria_id = self::$db->real_escape_string($data["categoria_id"]??"");
        $this->estado = self::$db->real_escape_string($data["estado"]??"Activa");
        $this->fecha_creacion = self::$db->real_escape_string($data["fecha_creacion"] ?? date('Y-m-d'));
        $this->img = $img["img"] ?? [];
        $this->banner = $img["banner"] ?? [];
    }
    
    public static function existTienda($id){
        $id=self::$db->real_escape_string($id);
        $query="SELECT * FROM " . static::$table . " WHERE id = $id";
        $result = self::$db->query($query);
        if($result->num_rows == 0){
           return false;
        }else{
            $data = $result->fetch_assoc();
            return $data;
        }
    }

    public function validate()
    {
        if(empty($this->nombre)){
            self::$errors["error"][]="El nombre es obligatorio";
          }
          if(empty($this->descripcion)){
              self::$errors["error"][]="La descripcion es obligatoria";
          }
          if(empty($this->categoria_id)){
              self::$errors["error"][]="La categoria es obligatoria";
          }

        if(empty($this->img["name"]) || $this->img["error"] !== UPLOAD_ERR_OK){
            self::$errors["error"][]="La imagen es obligatoria";
        }
        if(empty($this->banner["name"]) || $this->banner["error"] !== UPLOAD_ERR_OK){
            self::$errors["error"][]="El banner es obligatorio";
        }
        return self::$errors;
    }

    public static function search($search){
        $search=self::$db->real_escape_string($search);
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
        $query = "SELECT * FROM " . static::$table . " WHERE nombre LIKE '%$search%' OR descripcion LIKE '%$search%'";
        $result = self::$db->query($query);
        
        $stores = [];
        while ($row = $result->fetch_assoc()) {
            $stores[] = static::create($row,$row);
        }
        
        // Guardar en cache
        if (self::$cacheEnabled) {
            self::$cache[$cacheKey] = $stores;
        }
        
        return $stores;
    }
}