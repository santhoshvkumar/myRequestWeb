<?php
include('config.inc');
/**
 * Creates an example PDF TEST document using TCPDF
 * @package com.tecnick.tcpdf
 * @abstract TCPDF - Example: WriteHTML text flow.
 * @author Nicola Asuni
 * @since 2008-03-04
 */

// Include the main TCPDF library (search for installation path).
require_once('tcpdf_include.php');

// create new PDF document
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Nicola Asuni');
$pdf->SetTitle('TCPDF Example 021');
$pdf->SetSubject('TCPDF Tutorial');
$pdf->SetKeywords('TCPDF, PDF, example, test, guide');

// set default header data
//$pdf->(setHeaderData('',0,'','',array(0,0,0), array(255,255,255) ););

// set header and footer fonts
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
//$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
//$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);
$pdf->SetCellPaddings(TRUE ,0);
$pdf->SetAutoPageBreak(TRUE ,0);

// set auto page breaks
//$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

// set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// set some language-dependent strings (optional)
if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
    require_once(dirname(__FILE__).'/lang/eng.php');
    $pdf->setLanguageArray($l);
}

// ---------------------------------------------------------

// set font
$pdf->SetFont('helvetica', '', 7);

// add a page
$pdf->AddPage();

$getAdminID = $_GET['agencyID'];
$startDate = $_GET['startDate'];
$endDate = $_GET['endDate'];

$query = "SELECT tblGAP.problemID, tblUR.name, tblUR.emailID, tblUR.phoneNumber, tblS.SpecialityName, tblGAP.notes, tblGAP.problemStatus, tblGAP.startDate, tblGAP.endDate, tblGAP.startTime, tblGAP.endTime, tblGAP.latitude, tblGAP.longitude, tblGAP.contractorID, tblGAP.fixedDate, tblGAP.fixedNotes, tblGAP.fixedAmount FROM  tblGetAllProblem tblGAP left join tblSpeciality tblS on tblGAP.specialityID = tblS.specialityID left join tblUserRegister tblUR on tblGAP.userRegisterID = tblUR.userRegID where tblGAP.adminID='$getAdminID' AND tblGAP.DateTime BETWEEN '$startDate' AND '$endDate' order by tblGAP.problemID desc LIMIT 0,50";


$rsd = mysqli_query($connect_var,$query);
//echo 'hai';
$count = 0;
if (! $rsd){
   echo 'Database error: ' . mysqli_error(); 
}
else{

	$tbl_header = '<table cellpadding="3" cellspacing="3" style="width:100%;font-size:12px;">';
	$tbl_footer = '</table>';
	$tbl = '';
	$contractorHead ='';
	$contractorContent = '';
	$fixedWorkHead = '';
	$fixedContent = '';

	while($rs = mysqli_fetch_assoc($rsd)){
		$contractorID = $rs['contractorID'];
		
		if($contractorID==null || $contractorID ==""){
			$contractorContent = "";
			$contractorHead = "";
		}
		else{
			$queryContractor = "SELECT contractorName, address1, city, state, zip, country, phoneNo1, emailID FROM tblContractor where contractorID='$contractorID'";
			$rsdContractor = mysqli_query($connect_var,$queryContractor);

			while($rsContractor = mysqli_fetch_assoc($rsdContractor)){
				$contractorHead = "<h3 style='text-decoration:underline;color:#ECCE18;'>CONTRACTOR DETAILS: </h3>";
				$contractorContent ="<tr> <td><b> Name </b></td> <td>".$rsContractor['contractorName']."</td> <td><b> EmailID </b></td> <td>".$rsContractor['emailID']."</td> <td><b> Mobile Number </b></td> <td>".$rsContractor['phoneNo1']."</td> </tr> <tr> <td><b> Address </b></td> <td>".$rsContractor['address1']."</td> <td><b> City </b></td> <td>".$rsContractor['city']."</td> <td><b> County </b></td> <td>".$rsContractor['state']."</td> </tr> <tr> <td><b> Postal Code </b></td> <td>".$rsContractor['zip']."</td> <td><b> Country </b></td> <td>".$rsContractor['country']."</td> <td> </td> </tr>";
			}
		}
		 


		if($rs['fixedAmount']==null || $rs['fixedAmount']==""){
			$fixedContent ="";
			$fixedWorkHead = "";
		}
		else{
			$fixedWorkHead = "<p></p><h3 style='text-decoration:underline;color:#ECCE18;'>FIXED WORK DETAILS: </h3>";
			$fixedContent ="<tr> <td><b>Date </b></td> <td>".$rs['fixedDate']."</td> <td><b>Message </b></td> <td>".$rs['fixedNotes']."</td> <td><b>Amount </b></td> <td>".$rs['fixedAmount']." pound</td> </tr>";
		}


		$tbl .="<tr> <td><b> Case # </b></td> <td>".$rs['problemID']."</td> <td><b>Speciality </b></td> <td>".$rs['SpecialityName']."</td> <td><b> Status </b></td> <td>".$rs['problemStatus']."</td> </tr> <tr> <td><b> Name </b></td> <td>".$rs['name']."</td> <td><b> EmailID </b></td> <td>".$rs['emailID']."</td> <td><b> Mobile Number </b></td> <td>".$rs['phoneNumber']."</td> </tr>  <tr> <td><b>Message </b> </td> <td>".$rs['notes']."</td> </tr> ".$contractorHead." ".$contractorContent." ".$fixedWorkHead." ".$fixedContent."  <tr> <hr> </tr>";
		$count++;
	}//while
	
}//else


// create some HTML content
$html = '<div style="text-align: center;"> <img src="images/myrequestlogo.png" style="width:140px;height:100px;" /> </div> <p>'.$tbl_header . $tbl . $tbl_footer.'</p> <p style="text-align: center;">* 50 *</p>';

// output the HTML content
$pdf->writeHTML($html, true, 0, true, 0);

// reset pointer to the last page
$pdf->lastPage();

// ---------------------------------------------------------
ob_clean();
//Close and output PDF document
$pdf->Output('allCases.pdf', 'FD');

//============================================================+
// END OF FILE
//============================================================+