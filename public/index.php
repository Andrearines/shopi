<?php
require_once __DIR__. '/../config/app.php';
use controllers\paginas;
use controllers\login;
use controllers\storeC;
use controllers\API\loginA;
use controllers\API\userA;
use controllers\API\storesA;
use controllers\API\productosC;
use controllers\API\categoriasA;
use controllers\API\storeA;
use controllers\API\categorias_producto;
use controllers\API\tallasC;
use controllers\API\tallas_stockC;
use MVC\Router;
$r=new Router;
//login

$r->get("/",[login::class,'login']);
$r->post("/",[login::class,'login']);
$r->get("/register",[login::class,'register']);
$r->post("/register",[login::class,'register']);
$r->get("/forget",[login::class,'forget']);
$r->post("/forget",[login::class,'forget']);
$r->post("/register/confirm",[login::class,'confirm']);
$r->get("/register/confirm",[login::class,'confirm']);
$r->get("/reset-password",[login::class,'reset']);
$r->post("/reset-password",[login::class,'reset']);

// API Routes(login)

$r->post("/api/register",[loginA::class,'register']);
$r->get("/api/register/confirm",[loginA::class,'confirm']);
$r->post("/api/register/login",[loginA::class,'login']);
$r->post("/api/register/forget",[loginA::class,'forget']);
$r->post("/api/register/forget/reset",[loginA::class,'reset']);
$r->get("/api/Isauth",[loginA::class,'Isauth']);
$r->get("/api/user",[userA::class,'user']);
//client
$r->get("/home",[paginas::class,'index']);
$r->get("/user",[paginas::class,'user']);
$r->post("/user",[paginas::class,'user']);
$r->get("/tineda/crear",[paginas::class,'storesCreate']);
$r->post("/tineda/crear",[paginas::class,'storesCreate']);

//client store admin
$r->get("/tienda/view",[storeC::class,'storespanel']);
$r->post("/tienda/view",[storeC::class,'storespanel']);
$r->get("/tienda/view/productos",[storeC::class,'storeGRUD']);


// API Routes(store)
$r->get("/api/stores/IsTienda",[storeA::class,'IsTienda']);
$r->get("/api/stores",[storesA::class,'stores']);
$r->get("/api/stores/search",[storesA::class,'storesSeach']);
$r->get("/api/stores/categories",[categoriasA::class,'all']);
$r->get("/api/stores/create",[storesA::class,'storesCreate']);
$r->post("/api/stores/create",[storesA::class,'storesCreate']);
$r->get("/api/stores/find",[storesA::class,'find']);


//API Routers(productos)
$r->get("/api/stores/productos",[productosC::class,'all']);
$r->get("/api/stores/productos/search",[productosC::class,'search']);
$r->get("/api/stores/productos/find",[productosC::class,'find']);
$r->post("/api/stores/productos/update",[productosC::class,'update']);
$r->get("/api/stores/productos/delete",[productosC::class,'delete']);
$r->get("/api/stores/productos/categories",[categorias_producto::class,'all']);
$r->get("/api/stores/tallas",[tallasC::class,'all']);
$r->get("/api/stores/tallasP",[tallas_stockC::class,'allP']);
$r->post("/api/stores/guardarTallas",[tallas_stockC::class,'guardarTallasStock']);

//API Routes(GRUD)
$r->post("/api/stores/productos/create",[productosC::class,'create']);
$r->post("/api/stores/productos/delete",[productosC::class,'delete']);
$r->post("/api/stores/productos/edit",[productosC::class,'edit']);

// API Routes(categorias)
$r->get("/api/stores/categories",[categoriasA::class,'all']);
$r->get("/api/stores/categories/search",[categoriasA::class,'search']);
$r->Rutas();