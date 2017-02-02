<?php

$getStateID = $_GET["stateID"];

$row = 0;

if (($handle = fopen("city.csv", "r")) !== FALSE) {
	while (($data = fgetcsv($handle, 0, ",")) !== FALSE) {
		$num = count($data);

		if($data[1] == $getStateID){
			$resultArr[$row]['CityName'] = $data[2];

			$row++;
			
		}
		

		
	}

}

echo json_encode(array("status"=>"success","record_count"=>$row,"records"=>$resultArr),JSON_UNESCAPED_SLASHES);



fclose($handle);


?>