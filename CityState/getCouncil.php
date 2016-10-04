<?php

$cityName = $_GET["cityName"];

$row = 0;

if (($handle = fopen("council.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 0, ",")) !== FALSE) {
        $num = count($data);

        if($data[5] == $cityName){
            $resultArr[$row]['CouncilName'] = $data[0];
            
         $row++;
          
        }
         

   			
   	}

}

echo json_encode(array("status"=>"success","record_count"=>$row,"records"=>$resultArr),JSON_UNESCAPED_SLASHES);


   
    fclose($handle);


?>