<?php
namespace controllers\API;
use models\productos;
use models\user;
class productosC{

   public static function all(){
    $user=user::desifrartoken();
    if(empty($_GET['id'])){
        echo json_encode(["ok"=>false]);
        exit;
    }
    if($user){
        if($user->tienda_id != $_GET['id']){
            echo json_encode(["ok"=>false]);
            exit;
        }
        $productos=productos::findAllBy("tienda_id", $_GET['id']);
        echo json_encode($productos);
        }else{
            echo json_encode(["ok"=>false]);
        }
    }
    public static function find(){
        $user=user::desifrartoken();
        if(empty($_GET['id'])){
            echo json_encode(["ok"=>false]);
            exit;
        }
        if($user){
            $productos=productos::find($_GET['id']);
            if($productos && $productos->tienda_id == $user->tienda_id){
                echo json_encode($productos);
            }else{
                echo json_encode(["ok"=>false, "message"=>"Producto no encontrado o no autorizado"]);
            }
        }else{
            echo json_encode(["ok"=>false, "message"=>"No autenticado"]);
        }
    }
    public static function create(){
        $user=user::desifrartoken();
        if($user){
            $admin = user::find($user->id);
            if($admin->tienda_id){
                $productos=new productos($_POST);
                $productos->created_at=date("Y-m-d H:i:s");
                $productos->updated_at=date("Y-m-d H:i:s");
                $productos->tienda_id = $admin->tienda_id; 
               
                // Validar y procesar imagen si existe
                if(isset($_FILES['img']) && $_FILES['img']['error'] === UPLOAD_ERR_OK){
                    $imagen_procesada = $productos->processImage($_FILES['img'],"productos",".png");
                    if($imagen_procesada){
                        $productos->imagen_url = $imagen_procesada;
                        
                    }else{
                        echo json_encode(["ok"=>false, "error"=>"Error procesando imagen"]);
                        return;
                    }
                }
                
                $r=$productos->validate_c();
                if(empty($r)){
                    if($productos->save()){
                        echo json_encode(["ok"=>true, "error"=>"Producto creado exitosamente"]);
                    }else{
                        echo json_encode(["ok"=>false, "error"=>"Error guardando producto"]);
                    }
                }else{
                    echo json_encode($r);
                }
            }else{
                echo json_encode(["ok"=>false, "error"=>"Usuario sin tienda asignada"]);
            }
        }else{
            echo json_encode(["ok"=>false, "error"=>"No autenticado"]);
        }
    }
    public static function update(){
        $user=user::desifrartoken();
        if($user){
            $admin = user::find($user->id);
            if($admin->tienda_id){
                if(empty($_POST['id'])){
                    echo json_encode(["ok"=>false, "message"=>"ID de producto requerido"]);
                    return;
                }
              
                
                $producto_existente = productos::find($_POST['id']);
                if($producto_existente && $producto_existente->tienda_id == $admin->tienda_id){
                    $productos = new productos($_POST);
                    $productos->tienda_id = $admin->tienda_id;
                    
                    // Mantener imagen actual si no se sube nueva
                    $productos->imagen_url = $producto_existente->imagen_url;
                    
                    // Procesar nueva imagen si existe
                    if(isset($_FILES['img']) && $_FILES['img']['error'] === UPLOAD_ERR_OK){
                        $imagen_procesada = $productos->processImage($_FILES['img'],"productos",".png");
                        if($imagen_procesada){
                            $productos->imagen_url = $imagen_procesada;
                        }else{
                            echo json_encode(["ok"=>false, "message"=>"Error procesando imagen"]);
                            return;
                        }
                    }
                    
                    if(empty($productos->validate_u())){
                        if($productos->update($_POST['id'])){
                            echo json_encode(["ok"=>true, "message"=>"Producto actualizado exitosamente"]);
                        }else{
                            echo json_encode(["ok"=>false, "message"=>"Error actualizando producto"]);
                        }
                    }else{
                        echo json_encode(["ok"=>false, "errors"=>$productos->getErrors()]);
                    }
                }else{
                    echo json_encode(["ok"=>false, "message"=>"Producto no encontrado o no autorizado"]);
                }
            }else{
                echo json_encode(["ok"=>false, "message"=>"Usuario sin tienda asignada"]);
            }
        }else{
            echo json_encode(["ok"=>false, "message"=>"No autenticado"]);
        }
    }
    public static function delete(){
        $user=user::desifrartoken();
        if($user){
            if(empty($_GET['id'])){
                echo json_encode(["ok"=>false, "message"=>"ID de producto requerido"]);
                return;
            }
            
            $productos=productos::find($_GET['id']);
            if($productos && $productos->tienda_id == $user->tienda_id){
                if($productos->delete()){
                    echo json_encode(["ok"=>true, "message"=>"Producto eliminado exitosamente"]);
                }else{
                    echo json_encode(["ok"=>false, "message"=>"Error eliminando producto"]);
                }
            }else{
                echo json_encode(["ok"=>false, "message"=>"Producto no encontrado o no autorizado"]);
            }
        }else{
            echo json_encode(["ok"=>false, "message"=>"No autenticado"]);
        }
    }
}
