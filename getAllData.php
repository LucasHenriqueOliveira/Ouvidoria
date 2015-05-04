<?php

$demandas = array();

try{
	$con = new PDO('mysql:host=localhost;dbname=gexcon','root','031285');
	$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$con->exec("SET CHARACTER SET utf8");
} catch(PDOException $e){
	die();
}

$sql = 'SELECT * FROM `wp_ouvidoria_qtd` AS q INNER JOIN `wp_ouvidoria_ol` AS o ON  q.id_ol = o. id_ol
		ORDER BY q.mes ASC, q.ano DESC, o.nome_ol ASC';
$query = $con->prepare($sql);
$query->execute();

while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
	$demanda["id"] = $row["id_qtd"];
	$demanda["local"] = $row["nome_ol"];
	$demanda["mes"] = $row["mes"];
	$demanda["ano"] = $row["ano"];
	$demanda["qtd"] = $row["qtd"];
	$demandas[] = $demanda;
}

echo json_encode($demandas);
