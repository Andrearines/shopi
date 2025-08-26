<?php
require_once __DIR__. '/../config/app.php';
use controllers\paginas;
use controllers\login;
use controllers\API\loginA;
use controllers\API\userA;
use controllers\API\storesA;
use controllers\API\categoriasA;
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
// API Routes(cliente)

$r->get("/api/stores",[storesA::class,'stores']);
$r->get("/api/stores/search",[storesA::class,'storesSeach']);
$r->get("/api/stores/categories",[categoriasA::class,'all']);
$r->get("/api/stores/create",[storesA::class,'storesCreate']);
$r->post("/api/stores/create",[storesA::class,'storesCreate']);

$r->Rutas();