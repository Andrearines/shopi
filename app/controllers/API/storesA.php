<?php
namespace controllers\API;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use models\user;
use models\stores;
class storesA{
  public static function storesSeach(){
    $user=user::desifrartoken();
    if($user){
      $stores=stores::search($_GET['search']);
      if($stores){
        echo json_encode($stores);
      }else{
        echo json_encode(["stores"=>[]]);
      }
    }else{
        echo json_encode(["ok"=>false]);
    }
  }
    public static function storesCreate(){
      
      $user=user::desifrartoken();
      if($user){
        $stores=new stores($_POST,$_FILES);
        $r=$stores->validate();
        if(empty($r)){
        $stores->img=$stores->processImage($_FILES["img"],"stores",".png");
        $stores->banner=$stores->processImage($_FILES["banner"],"stores",".png");
        
       
        
        if($stores->save()){
          $user_id= new user();
         $user_id->sicronizar(user::find($user->id));
         $user_id->tienda_id=$stores->id;
         $user_id->update($user_id->id);
          
        
          echo json_encode(["ok"=>true]);
        }else{
          echo json_encode(["error"=>"No se pudo guardar la tienda"]);
        }
        }else{
          echo json_encode($r);
        }
      }else{
          echo json_encode(["ok"=>false]);
      }
    }

    public static function find(){
      $user=user::desifrartoken();
      if($user){
        $stores=stores::find($_GET['id']);
        if($stores){
          echo json_encode($stores);
        }else{
          echo json_encode(["stores"=>[]]);
        }
      }else{
          echo json_encode(["ok"=>false]);
      }
    }

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