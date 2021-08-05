<?php 

$db = mysqli_connect('localhost', 'root', 'root', 'appsalon');

if(!$db) {
    echo "Error de conexión";
    exit;
} 
// echo "Conexión correcta";