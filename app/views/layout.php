<?php

if(!isset($_SESSION)){
session_start();
}
$auth = $_SESSION['admin'] ?? null;
if(!isset($barra_frotante)){
    $barra_frotante=false;
}
if(!isset($inicio)){

    $inicio=false;

}
?>

<!DOCTYPE html>
<html lang="en">
<head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital,wght@0,300..800;1,300..800&family=Jua&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../build/css/app.css">
    <title></title>
</head>
<body>

    <header class="header 
    <?php echo $inicio ?"inicio":"" ?>
    <?php echo $barra_frotante ?"barra-frotante":"" ?>
    ">
        <div class="contenido-header">

            <div class="barra">
            <?php if($inicio){ ?>
                <div id="logo"></div>
            <?php }else{ ?>
                <div class="logo_shop">
                    <img src="/build/imagenes/logo.png" alt="" srcset="">
                    <h1>shopico</h1>
                </div>
            <?php }?>
           </div> <!--barra-->
          
        </div>
    </header>

    <?php echo $contenedor?>
   
    
<footer class="footer">
        <?php 
        
        $fecha =date("y");

        ?>
        <p class="copyright">todos los derechos resevados <?php echo(date("Y"))?> &copy;</p>
    </footer>
          <?php
    if($script){
        echo "<script src='/build/js/{$script}.js'></script>";
    }
    ?>
    <script src="/build/js/modernizr.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="/build/js/sweetalert-config.js"></script>
    </body>
    </html>


    