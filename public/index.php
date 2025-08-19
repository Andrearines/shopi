<?php
require_once __DIR__. '/../config/app.php';
use controllers\paginas;
use controllers\login;
use controllers\API\loginA;
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

//home
$r->get("/home",[paginas::class,'index']);
// API Routes(login)

$r->Rutas();