<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$local = $request->local;
$mes = $request->mes;
$ano = $request->ano;
$quantidade = $request->quantidade;

try{
	$con = new PDO('mysql:host=localhost;dbname=gexcon','root','031285');
	$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$con->exec("SET CHARACTER SET utf8");
} catch(PDOException $e){
	$resposta["message"] = "Erro ao conectar ao banco de dados.";
	$resposta["type"] = "danger";
	echo json_encode($resposta);
	die();
}

$sql = 'SELECT * FROM `wp_ouvidoria_qtd` WHERE `id_ol` = :local AND `mes` = :mes AND ano = :ano';
$query = $con->prepare($sql);
$query->execute(array(':local' => $local, ':mes' => $mes, ':ano' => $ano));
$rows = $query->fetch(PDO::FETCH_NUM);
$num_rows = $rows[0];

if($num_rows > 0){
	
	$resposta["message"] = "Já possui quantidade definida para este local no mês e ano informados.";
	$resposta["type"] = "danger";
	
} else {

	$sql = 'INSERT INTO `wp_ouvidoria_qtd` (`id_ol`,`mes`,`ano`,`qtd`) VALUES (:local, :mes, :ano, :quantidade)';
	$query = $con->prepare($sql);
	$query->execute(array(':local' => $local, ':mes' => $mes, ':ano' => $ano, ':quantidade' => $quantidade));
	
	$resposta["message"] = "Inserido com sucesso.";
	$resposta["type"] = "success";
	
}
echo json_encode($resposta);
