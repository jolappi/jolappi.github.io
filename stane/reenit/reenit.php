<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fi" lang="fi">
<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
<head>
<style type="text/css">
textarea.database { 
visibility: hidden; 
} 
</style>
<script language="Javascript" type="text/javascript">
<!--
function saveField(nimi,arvo)
{
var xmlhttp;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    alert("Talletettu");
    }
  }
xmlhttp.open("GET","savefield.php?nimi="+nimi+"&arvo="+arvo,true);
xmlhttp.send();
}
-->
</script>

</head>
<body>

<form action="" name="textit" onsubmit="" method=GET onkeypress="if (event.keyCode=='13'){document.textit.subbit.focus();return false;}">

<?php

mysql_connect ('localhost', 'int12904_12904', 'jontte1973') or die ("cannot connect to database");
mysql_select_db("int12904_db12904");

$result = mysql_query ("SELECT * FROM members ORDER BY _prikey ASC");

if ($row = mysql_fetch_array($result)) {
do {
	echo ($row[1] . " " . $row[3] . "<br>");
	echo ("<textarea name=" . $row[1] . " onchange=saveField('".$row[1]."',form.".$row[1].".value) rows=8 cols=40>");
	echo $row[2];
	echo "</textarea>";
	echo ("<p>");

	} while($row = mysql_fetch_array($result));
} else print "Sorry, no records were found!";

?>
<input type=button name=subbit value="refresh" onClick="window.location.reload()">
</form>
</body>
</html>