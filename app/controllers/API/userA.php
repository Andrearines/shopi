<?php

namespace controllers\API;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use models\user;

class userA{
 
    public static function user(){
        $key="prE!X2wW^*gH0MQ";
       
        $token = $_COOKIE['access_token'] ?? null;
            if($token){
                $payload = JWT::decode($token, new Key($key, 'HS256'));
                $user=user::find($payload->id);
                if(!$user){
                    http_response_code(401);
                    echo json_encode(["ok"=>false]);
                    exit;
                }else{
                    echo json_encode($user);
                }
            }else{
                http_response_code(401);
                echo json_encode(["ok"=>false]);
                exit;
            }
     
        
      
        exit;
      }   
}