<?php

$graphic = array();
$categories = array();

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
	switch ($row["mes"]) {
		case 1:
			array_push($categories, 'Jan');
			break;
		case 2:
			array_push($categories, 'Fev');
			break;
		case 3:
			array_push($categories, 'Mar');
			break;
		case 4:
			array_push($categories, 'Abr');
			break;
		case 5:
			array_push($categories, 'Mai');
			break;
		case 6:
			array_push($categories, 'Jun');
			break;
		case 7:
			array_push($categories, 'Jul');
			break;
		case 8:
			array_push($categories, 'Ago');
			break;
		case 9:
			array_push($categories, 'Set');
			break;
		case 10:
			array_push($categories, 'Out');
			break;
		case 11:
			array_push($categories, 'Nov');
			break;
		case 12:
			array_push($categories, 'Dez');
			break;
	}
	
	$local["id"] = $row["id_ol"];
	$local["local"] = $row["nome_ol"];
	$locais[] = $local;
}

echo json_encode($graphic);
