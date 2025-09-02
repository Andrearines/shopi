<?php
namespace models;

class productos extends main{
    public static $table="productos";
    public static $columnDB=[
        "id", "nombre", "descripcion_larga", "precio", "imagen_url", "tienda_id", "categoria_producto_id", "created_at", "updated_at"   
    ];
    
    public $id;
    public $nombre;
    public $descripcion_larga;
    public $precio;
    public $imagen_url;
    public $tienda_id;
   public $categoria_producto_id;   // 🔹 CORREGIDO; 
    public $created_at;
    public $updated_at;

    public function __construct($data = []){
        $this->id=self::$db->real_escape_string($data['id']) ?? null;
        $this->nombre=self::$db->real_escape_string($data['nombre']) ?? null;
        $this->descripcion_larga=self::$db->real_escape_string($data['descripcion_larga']) ?? null;
        $this->precio=self::$db->real_escape_string($data['precio']) ?? null;
        $this->categoria_producto_id=self::$db->real_escape_string($data['categoria_id']) ?? "";
        $this->created_at=self::$db->real_escape_string($data['created_at']) ?? date("Y-m-d");
        $this->updated_at=self::$db->real_escape_string($data['updated_at']) ?? date("Y-m-d");
    }

    public function validate_c()
    {
        if(empty($this->nombre)){
            self::$errors['error'][]="El nombre es obligatorio";
        }
        if(empty($this->descripcion_larga)){
            self::$errors['error'][]="La descripcion es obligatoria";
        }
        if(empty($this->precio)){
            self::$errors['error'][]="El precio es obligatorio";
        }
        if(empty($this->imagen_url)){
            self::$errors['error'][]="La imagen es obligatoria";
        }
        if(empty($this->tienda_id)){
            self::$errors['error'][]="La tienda es obligatoria";
        }
    
        if(empty($this->categoria_producto_id)){
            self::$errors['error'][]="La categoria es obligatoria";
        }

        if(empty($this->tienda_id)){
            self::$errors['error'][]="La tienda es obligatoria";
        }

        return self::$errors;
    }

    public function validate_u()
    {
        if(empty($this->nombre)){
            self::$errors['error'][]="El nombre es obligatorio";
        }
        if(empty($this->descripcion_larga)){
            self::$errors['error'][]="La descripcion es obligatoria";
        }
        if(empty($this->precio)){
            self::$errors['error'][]="El precio es obligatorio";
        }
       
        if(empty($this->tienda_id)){
            self::$errors['error'][]="La tienda es obligatoria";
        }
    
        return self::$errors;
    }

   

}
