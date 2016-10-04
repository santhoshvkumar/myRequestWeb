<?php
$hostname = 'localhost';       
$dbname   = 'myRequest';
$username = 'root';            
$password = 'Password#1';                
$connect_var = mysqli_connect($hostname, $username, $password , $dbname) or DIE('Connection to host is failed, perhaps the service is down!') or die(mysql_error());
?>