<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$demandId = $request->demandID;

try{
	$con = new PDO('mysql:host=localhost;dbname=gexcon','root','031285');
	$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$con->exec("SET CHARACTER SET utf8");
	
} catch(PDOException $e){
	
	$resposta["message"] = "Não foi possível excluir o registro.";
	$resposta["type"] = "danger";
	
	echo json_encode($resposta);
	die();
}

$sql = 'DELETE FROM `wp_ouvidoria_qtd` WHERE `id_qtd` = :id_qtd';
$query = $con->prepare($sql);
$query->execute(array(':id_qtd' => $demandId));

if ($query->rowCount() > 0) {
	
	$resposta["message"] = "Excluído com sucesso.";
	$resposta["type"] = "success";
	
} else{
	
	$resposta["message"] = "Não foi possível excluir o registro.";
	$resposta["type"] = "danger";
	
}

echo json_encode($resposta);
