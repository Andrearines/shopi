<?php
namespace controllers\API;

use models\email;
use models\user;
class loginA{

    public static function confirm(){
        $user=new user($_GET);
        $r=$user->varificar();
        echo json_encode($r);
        
      }
    public static function register(){  
            $e = [];
            $user = new user($_POST, $_FILES["img"] ?? []);
            $user->create_token();
            $e = $user->validate_r();
            if(empty($e)){
                $user->password_hash();
                $r = $user->save(isset($_FILES['img']) ? true : false);
                $email= new email;
                $email->enviarBienvenida($user->email,$user->nombre,$user->token);
                $json=true;
                echo json_encode($json);
                exit;
            }else{
                echo json_encode($e);
                exit;
            }
            
              
            
    }
    
}