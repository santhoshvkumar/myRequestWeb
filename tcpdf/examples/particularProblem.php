<?php
include('config.inc');
require_once('tcpdf_include.php');
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('myRequest');
$pdf->SetTitle('Problem Details');
$pdf->SetSubject('Particular Problem Details');
$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);
$pdf->SetKeywords('TCPDF, PDF, example, test, guide');
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
$pdf->SetCellPaddings(TRUE ,0);
$pdf->SetAutoPageBreak(TRUE ,0);
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
$pdf->SetFont('helvetica', '', 10);
$pdf->AddPage();

if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
    require_once(dirname(__FILE__).'/lang/eng.php');
    $pdf->setLanguageArray($l);
}

$problemID = $_GET['problemID'];
$adminID = $_GET['adminID'];

//$domainAddress = "http://localhost:8888/myrequestadmin/api/";
$domainAddress = "http://api.myrequest.co.uk/";

$query = "SELECT tblGAP.problemID, tblGAP.problemImage, tblUR.name,tblUR.emailID, tblUR.phoneNumber, tblS.SpecialityName as SpecialityName, tblGAP.notes as ProblemNotes, tblGAP.problemStatus, tblGAP.startDate, tblGAP.endDate, tblGAP.startTime, tblGAP.endTime, tblGAP.latitude, tblGAP.longitude, tblGAP.contractorID, tblGAP.fixedAmount, tblGAP.DateTime, tblGAP.whenToRespond, tblC.contractorName  FROM  tblGetAllProblem tblGAP left join tblSpeciality tblS on tblGAP.specialityID = tblS.specialityID left join tblUserRegister tblUR on tblGAP.userRegisterID = tblUR.userRegID left join tblContractor tblC on tblGAP.contractorID = tblC.contractorID WHERE tblGAP.problemID='$problemID'  AND tblGAP.adminID='$adminID'";
$rsd = mysqli_query($connect_var,$query);
$count = 0;
	if (! $rsd){
		echo 'Database error: ' . mysqli_error(); 
	} else {
		$fixedAmount = "";
		while($rs = mysqli_fetch_assoc($rsd)){
			
			if($rs['fixedAmount']==null || $rs['fixedAmount']=="null"){
				$fixedAmount .= '';
			} else {
				$fixedAmount .= $rs['fixedAmount'];
			}

	   		$statusrow = $rs['problemStatus'];

			$img = file_get_contents($domainAddress.$rs['problemImage']);
			$pdf->Image('@' . $img, 17, 87, 57, 68,  'JPG', '', '', false, 150, '', false, false, 0, false, false, false);
			
			$row = '<tr>
						<td colspan="2" rowspan="7"></td>
						<td><b>Name</b></td>
						<td colspan="3">'.$rs['name'].'</td>
					</tr>';

			$row1 = '<tr>
						<td><b>EmailID</b></td>
						<td colspan="3">'.$rs['emailID'].'</td>
					</tr>
					<tr>
						<td><b>Mobile #</b></td>
						<td colspan="3">'.$rs['phoneNumber'].'</td>
					</tr>
					<tr>
						<td><b>When Created</b></td>
						<td colspan="3">'.$rs['DateTime'].'</td>
					</tr>
					<tr>
						<td><b>When Needed</b></td>
						<td colspan="3">'.$rs['whenToRespond'].'</td>
					</tr>
					<tr>
						<td><b>Fixed Amount</b></td>
						<td colspan="3">'.$fixedAmount.'</td>
					</tr>
					<tr>
						<td><b>Message</b></td>
						<td colspan="3">'.$rs['ProblemNotes'].'</td>
					</tr>';

					$arrStartDate = explode('-', $rs['startDate']);
					$newStartDate = $arrStartDate[2].'.'.$arrStartDate[1].'.'.$arrStartDate[0];

					$arrEndDate = explode('-', $rs['endDate']);
					$newEndDate = $arrEndDate[2].'.'.$arrEndDate[1].'.'.$arrEndDate[0];

					$row2 = '<tr>
								<td colspan="1"><b>Contractor Name</b></td>
								<td colspan="2">'.$rs['contractorName'].'</td>
								<td colspan="1"><b>Speciality Name</b></td>
								<td colspan="2">'.$rs['SpecialityName'].'</td>
							</tr>

							<tr>
								<td colspan="1"><b>Start Date</b></td>
								<td colspan="2">'.$newStartDate.'</td>
								<td colspan="1"><b>Start Time</b></td>
								<td colspan="2">'.$rs['startTime'].'</td>
							</tr>

							<tr>
								<td colspan="1"><b>End Date</b></td>
								<td colspan="2">'.$newEndDate.'</td>
								<td colspan="1"><b>End Time</b></td>
								<td colspan="2">'.$rs['endTime'].'</td>
							</tr>';

							$queryNotes = "SELECT workLog.workLogID, workLog.content, workLog.status, workLog.workCreatedDate, workLog.problemID, workLog.workAssignedBy, tblC.image1 FROM tblWorkLog workLog left join tblGetAllProblem prob on workLog.problemID=prob.problemID left join tblContractor tblC on tblC.contractorID=prob.contractorID WHERE workLog.problemID='$problemID' order by workLog.workLogID desc";
		    				$rsdNotes = mysqli_query($connect_var,$queryNotes);
    						$countNotes=0;
    						while($res = mysqli_fetch_assoc($rsdNotes)){
								$row5 .= '<tr><td colspan="6"><p><b>'.$res['workAssignedBy'].'</b> '.$res['workCreatedDate'].'</p><p>'.$res['status'].'-'.$res['content'].'</p></td></tr>';
    							$countNotes++;
    						}
							$count++; 
	}
}

$html = '<div>
			<table border="1" cellpadding="10">
        		<tr>
            		<th colspan="6" style="text-align: center;"><center><img src="images/myRequestLogo.png" style="width: 150px;"></center></th>
        		</tr>

				<tr style="text-align:center; background-color:#fcdb34; color: #000000;">
					<td colspan="6"><h2 style="margin-top: 1%;">Problem Details</h2></td>
				</tr>

				<tr>
					<td colspan="6" style="text-align:center;"><h3>'.$statusrow.'</h3></td>
				</tr>

				<tr>
					<th colspan="2" style="text-align:center; font-weight: bold;">Problem Image</th>
					<th colspan="4" style="text-align:center; font-weight: bold;">Problem Raised By</th>
				</tr>

				'.$row.'

				'.$row1.'

				<tr style="text-align:center; background-color:#fcdb34; color: #000000;">
					<td colspan="6"><center><h4>Contractor Details</h4></center></td>
				</tr>

				'.$row2.'

				<tr style="text-align:center; background-color:#fcdb34; color: #000000;">
					<td colspan="6"><center><h4>Work Logs</h4></center></td>
				</tr>
				'.$row5.'		
    		</table>
		</div>';

$pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);
$pdf->lastPage();
ob_clean();
$pdf->Output('ParticularProblem.pdf', 'I');