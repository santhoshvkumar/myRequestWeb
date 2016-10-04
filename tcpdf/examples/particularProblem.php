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
$pdf->SetFont('helvetica', '', 10);

$problemID = $_GET['problemID'];
$adminID = $_GET['adminID'];

// add a page
$pdf->AddPage();

//$domainAddress = "http://localhost:8888/myrequestadmin/api/";
$domainAddress = "http://myrequest.co.uk/myRequestAdmin/api/";

$query = "SELECT tblGAP.problemID, tblGAP.problemImage, tblUR.name,tblUR.emailID, tblUR.phoneNumber, tblS.SpecialityName as SpecialityName, tblGAP.notes as ProblemNotes, tblGAP.problemStatus, tblGAP.startDate, tblGAP.endDate, tblGAP.startTime, tblGAP.endTime, tblGAP.latitude, tblGAP.longitude, tblGAP.contractorID, tblGAP.fixedAmount, tblGAP.DateTime, tblGAP.whenToRespond, tblC.contractorName  FROM  tblGetAllProblem tblGAP left join tblSpeciality tblS on tblGAP.specialityID = tblS.specialityID left join tblUserRegister tblUR on tblGAP.userRegisterID = tblUR.userRegID left join tblContractor tblC on tblGAP.contractorID = tblC.contractorID WHERE tblGAP.problemID='$problemID'  AND tblGAP.adminID='$adminID'";
$rsd = mysqli_query($connect_var,$query);
//echo 'hai';
$count = 0;
if (! $rsd){
   echo 'Database error: ' . mysqli_error(); 
}
else{

	$fixedAmount = "";

	while($rs = mysqli_fetch_assoc($rsd)){

		if($rs['fixedAmount']==null || $rs['fixedAmount']=="null"){
			$fixedAmount .= '';
		}
		else{
			$fixedAmount .= '<b>Fixed Amount : </b> '.$rs['fixedAmount'].' pound';
		}

	   	$row1 ='<table> <tr> <td>  <b>Status : </b> '.$rs['problemStatus'].'</td> <td></td> <td>'.$fixedAmount.' </td> </tr> </table> <p></p>';

	   	$img = file_get_contents($domainAddress.$rs['problemImage']);
		$pdf->Image('@' . $img, 17, 60, 50, 55,  'JPG', '', '', false, 150, '', false, false, 1, false, false, false);

		$row2 ='<table> <tr> <td> </td> <td> <table> <tr> <td><b>Name : </b> '.$rs['name'].'</td> </tr> <tr> <td><b>EmailID : </b> '.$rs['emailID'].'</td> </tr> <tr> <td><b>Mobile Number : </b> '.$rs['phoneNumber'].' </td> </tr> <tr> <td><b>When Created : </b> '.$rs['DateTime'].' </td> </tr> <tr> <td><b>When Needed : </b> '.$rs['whenToRespond'].' </td> </tr> <tr> <td><b>Speciality Name :</b>'.$rs['SpecialityName'].' </td> </tr> </table> </td> </tr> </table>';

		$row3 ='<p></p><p></p><p></p><b>Contractor : </b>'.$rs['contractorName'];

		$arrStartDate = explode('-', $rs['startDate']);
		$newStartDate = $arrStartDate[2].'.'.$arrStartDate[1].'.'.$arrStartDate[0];

		$arrEndDate = explode('-', $rs['endDate']);
		$newEndDate = $arrEndDate[2].'.'.$arrEndDate[1].'.'.$arrEndDate[0];

		$row4 ='<table> <tr> <td><b>Start Date</b></td> <td><b>Start Time</b> </td>  <td><b>Message</b></td> <td> </td> </tr> <tr> <td>'.$newStartDate.'</td> <td>'.$rs['startTime'].'</td> <td>'.$rs['ProblemNotes'].' </td> <td> </td> </tr>  <tr><br/></tr> <tr> <td><b>End Date</b></td> <td><b>End Time</b> </td> </tr>  <tr> <td>'.$newEndDate.'</td> <td>'.$rs['endTime'].'</td> </tr>  </table>';
		
		$tbl_header = ' <b>Work Logs : </b><br/><table cellpadding="3" cellspacing="3" style="width:100%;font-size:12px;">';
		$tbl_footer = '</table>';
		$row5 = '';

		$queryNotes = "SELECT workLog.workLogID, workLog.content, workLog.status, workLog.workCreatedDate, workLog.problemID, workLog.workAssignedBy, tblC.image1 FROM tblWorkLog workLog left join tblGetAllProblem prob on workLog.problemID=prob.problemID left join tblContractor tblC on tblC.contractorID=prob.contractorID WHERE workLog.problemID='$problemID' order by workLog.workLogID desc";
		    $rsdNotes = mysqli_query($connect_var,$queryNotes);
    		$countNotes=0;

    		while($res = mysqli_fetch_assoc($rsdNotes)){
    			
    			$row5 .='<tr> <td><b>'.$res['workAssignedBy'].'</b> '.$res['workCreatedDate'].'</td> </tr> <tr> <td>'.$res['status'].'-'.$res['content'].'</td></tr>';
		 
    			$countNotes++;
    		} 

		$count++; 

	}//while

}//else

$html = '<div style="text-align: center;"> <img src="images/myRequestLogo.png" style="width:140px;height:100px;" /> </div> <p>'.$row1.'</p> <p>'.$row2.'</p> <p>'.$row3.' </p> <p>'.$row4.' </p> <p>'.$tbl_header.''.$row5.''.$tbl_footer.'</p> ';

// output the HTML content
$pdf->writeHTML($html, true, 0, true, 0);

// reset pointer to the last page
$pdf->lastPage();

// ---------------------------------------------------------
ob_clean();
//Close and output PDF document
$pdf->Output('particularProblem.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+