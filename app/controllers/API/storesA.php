<?php
namespace controllers\API;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use models\user;
use models\stores;
class storesA{
    public static function stores(){
       $user=user::desifrartoken();
       if($user){
          $stores=stores::all();
          if($stores){
            echo json_encode($stores);
          }else{
            echo json_encode(["stores"=>[]]);
          }
       }else{
           echo json_encode(["ok"=>false]);
       }
      }   
}