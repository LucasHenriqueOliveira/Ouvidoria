<?php

$locais = array();

try{
	$con = new PDO('mysql:host=localhost;dbname=gexcon','root','031285');
	$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$con->exec("SET CHARACTER SET utf8");
} catch(PDOException $e){
	die();
}

$sql = 'SELECT * FROM `wp_ouvidoria_ol` ORDER BY `nome_ol` ASC';
$query = $con->prepare($sql);
$query->execute();

while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
	$local["id"] = $row["id_ol"];
	$local["local"] = $row["nome_ol"];
	$locais[] = $local;
}

echo json_encode($locais);
