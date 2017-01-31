<?php

$getCountryId = $_GET["countryID"];

$row = 0;

if (($handle = fopen("usa-states.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 0, ",")) !== FALSE) {
        $num = count($data);

        if($data[1] == $getCountryId){
            $resultArr[$row]['StateName'] = $data[2];

         $row++;
          
        }
         

        
    }

}

echo json_encode(array("status"=>"success","record_count"=>$row,"records"=>$resultArr),JSON_UNESCAPED_SLASHES);


   
    fclose($handle);


?>