<?php
namespace controllers\API;

use models\email;
use models\user;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class loginA{

    public static function reset(){
        $r=[];
        $user = new user($_POST);
        $r=$user->validate_c();
        if(empty($r)){
           $user->reset();
            echo  json_encode(true);

        }else{
            echo  json_encode($r);
        }
    }

    public static function forget(){
        $r=[];
        $user = new user($_POST);
        
        $r=$user->validate_f();
        if(empty($r)){

           $user->resetEmail();
            echo  json_encode(["ok"=>true]);

        }else{
            echo  json_encode($r);
        }
    }


    public static function Isauth(){
        $key="prE!X2wW^*gH0MQ";
       
    $token = $_COOKIE['access_token'] ?? null;
        if($token){
            $payload = JWT::decode($token, new Key($key, 'HS256'));
            echo json_encode(['ok'=>$payload->id]);
            
         
            exit;
        }else{
            http_response_code(401);
            echo json_encode(["ok"=>false]);
            exit;
        }
    }

    public static function login(){
        $use= new user($_POST);
        $r= $use->validate_l();
        if(empty($r)){
            $r =$use->login();
            if(empty($r)){
                echo json_encode(["ok" => true]);
            }else{
                echo json_encode($r);
            }
            
        }else{
            echo json_encode($r);
            exit;
        }
    }
    public static function confirm(){
        $user=new user($_GET);
        $r=$user->varificar();
        echo json_encode($r);
        exit;
        
      }
    public static function register(){  
            $e = [];
            $user = new user($_POST, $_FILES);
            $user->create_token();
            $e = $user->validate_r();
            if(empty($e)){
                $user->password_hash();
                $user->img=$user->processImage($_FILES["img"],"users",".png");
                $r = $user->save();
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