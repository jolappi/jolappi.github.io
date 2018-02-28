<?php
$nimi = $_GET["nimi"];
$arvo = $_GET["arvo"];

mysql_query("SET names 'utf8'");

mysql_connect ('localhost', 'int12904_12904', 'jontte1973')
or die ("cannot connect to database");
mysql_select_db("int12904_db12904");


$tulos = mysql_query("UPDATE members SET comments='".$arvo."' WHERE name='".$nimi."'") or die(mysql_error());

?>