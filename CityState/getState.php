<?php
/*
$file = fopen("state.csv","r");

while(! feof($file))
  {
   $id = $file[0];
	$state = $file[1];
	//print_r(fgetcsv($file));
	echo $id ." ". $state;
  }
 while (($data = fgetcsv($file, 1000, ",")) !== FALSE) {

 	echo $data[0]." ".$data[1];
 }
fclose($file);*/

$row = 1;
$abc ="[";
if (($handle = fopen("state.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 0, ",")) !== FALSE) {
        $num = count($data);
        
       	//echo $data[0]." ".$data[1]. "<br />";
        echo "<option value='".$data[0]."'>".$data[1]."</option>";
       	/*if (($handles = fopen("city.csv", "r")) !== FALSE) {
   			 while (($datas = fgetcsv($handles, 0, ",")) !== FALSE) {
   			 	 if($data[0] == $datas[1]){
   			 	 //	echo "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".$datas[0]." ".$datas[2]."<br />"; 
   			 	 	$abc .="{ id: ".$row.", cityState: '".str_replace('\'', '`', $datas[2]).", ".$data[1]."' },";

   			 	 	echo "<option value='".str_replace('\'', '`', $datas[2]).", ".$data[1]."'>".str_replace('\'', '`', $datas[2]).", ".$data[1]."</option>";
   			 		 $row++;
   			 	}
   			 }

   		}

        for ($c=0; $c < $num; $c++) {
           // echo $data[$c] . "<br />";
        }*/
    }

    $abc .="]";
    //echo $abc;
    fclose($handle);
}

?>