<?php

$hostname = 'localhost';       
$dbname   = 'myrequest';
$username = 'vsk';            
$password = 'vsk'; 
$connect_var = mysqli_connect($hostname, $username, $password , $dbname) or DIE('Connection to host is failed, perhaps the service is down!') or die(mysql_error());
?>