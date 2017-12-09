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

$domainAddress = "http://localhost:8888/myRequestHome/myrequestapi/";
// $domainAddress = "http://api.myrequest.co.uk/";

$query = "SELECT tblGAP.problemID, tblGAP.problemImage, tblUR.name, tblUR.emailID, tblUR.phoneNumber, tblUR.userRegID, tblS.SpecialityName AS SpecialityName, tblGAP.notes AS ProblemNotes, tblGAP.problemStatus, tblGAP.startDate, tblGAP.endDate, tblGAP.startTime, tblGAP.endTime, tblGAP.latitude, tblGAP.longitude, tblGAP.contractorID, tblGAP.fixedAmount, tblGAP.DateTime, tblGAP.whenToRespond, tblGAP.subAdminID AS subAdminID, tblC.contractorName, tblAd.firstName,tblAd.lastName,tblAd.businessEmail,tblAd.phoneNumber AS adminPhone, tblAd.logo  FROM  tblGetAllProblem tblGAP LEFT JOIN tblSpeciality tblS ON tblGAP.specialityID = tblS.specialityID LEFT JOIN tblUserRegister tblUR ON tblGAP.userRegisterID = tblUR.userRegID LEFT JOIN tblContractor tblC ON tblGAP.contractorID = tblC.contractorID LEFT JOIN tblAdmin tblAd ON tblGAP.adminID = tblAd.adminID WHERE tblGAP.problemID='$problemID'  AND tblGAP.adminID='$adminID'";
$rsd = mysqli_query($connect_var,$query);

$count = 0;
if (! $rsd){
	echo 'Database error: ' . mysqli_error(); 
} else {
	$FixedAmount = "";
	while($rs = mysqli_fetch_assoc($rsd)){

		$StatusRow = $rs['problemStatus'];

		$img = file_get_contents($domainAddress.$rs['problemImage']);
		$pdf->Image('@' . $img, 17, 87, 57, 68,  'PNG', '', '', false, 150, '', false, false, 0, false, false, false);

		if($rs['name']==null || $rs['name']=="" || $rs['emailID'] == null || $rs['emailID']== "" || $rs['phoneNumber'] == null || $rs['phoneNumber'] == ""){
			$Name = $rs['firstName'] ." " .$rs['lastName'];
			$FullName =  $Name." (Admin)";
			$EmailID = $rs['businessEmail'];
			$PhoneNumber = $rs['adminPhone'];
		} else {
			$FullName = $rs['name'];
			$EmailID = $rs['emailID'];
			$PhoneNumber = $rs['phoneNumber'];
		}

		if($rs['subAdminID'] != null && $rs['userRegID'] == null) {
			$getSubAdminID = $rs['subAdminID'];
			$querygetSubAdmin = "SELECT subAdminID, firstName, lastName, phoneNumber, emailID, logo FROM tblSubAdmin WHERE subAdminID='$getSubAdminID'";
			$rsdSub = mysqli_query($connect_var,$querygetSubAdmin);
			while($rsSub = mysqli_fetch_assoc($rsdSub)){
				$FullName = $rsSub['firstName'] ." " .$rsSub['lastName']." (Sub-Admin)";
				$EmailID = $rsSub['emailID'];
				$PhoneNumber = $rsSub['phoneNumber'];
			}
		}

		if($rs['fixedAmount']==null || $rs['fixedAmount']=="null"){
			$FixedAmount .= '-';
		} else {
			$FixedAmount .= $rs['fixedAmount'];
		}

		if($FullName == null || $FullName == ''){
			$FullName = '-';
		} else {
			$FullName = $FullName;
		}

		if($EmailID == null || $EmailID == ''){
			$EmailID = '-';
		} else {
			$EmailID = $EmailID;
		}

		if($PhoneNumber == null || $PhoneNumber == ''){
			$PhoneNumber = '-';
		} else {
			$PhoneNumber = $PhoneNumber;
		}

		if($rs['DateTime'] == null || $rs['DateTime'] == ''){
			$WhenCreated = '-';
		} else {
			$WhenCreated = $rs['DateTime'];
		}

		if($rs['whenToRespond'] == null || $rs['whenToRespond'] == ''){
			$WhenToTespond = '-';
		} else {
			$WhenToTespond = $rs['whenToRespond'];
		}

		if($rs['ProblemNotes'] == null || $rs['ProblemNotes'] == ''){
			$ProblemNotes = '-';
		} else {
			$ProblemNotes = $rs['ProblemNotes'];
		}		
		
		$row = '<tr>
					<td colspan="2" rowspan="7"></td>
					<td><b>Name</b></td>
					<td colspan="3">'.$FullName.'</td>
				</tr>';

		$row1 = '<tr>
					<td><b>EmailID</b></td>
					<td colspan="3">'.$EmailID.'</td>
				</tr>
				<tr>
					<td><b>Mobile #</b></td>
					<td colspan="3">'.$PhoneNumber.'</td>
				</tr>
				<tr>
					<td><b>When Created</b></td>
					<td colspan="3">'.$WhenCreated.'</td>
				</tr>
				<tr>
					<td><b>When Needed</b></td>
					<td colspan="3">'.$WhenToTespond.'</td>
				</tr>
				<tr>
					<td><b>Fixed Amount</b></td>
					<td colspan="3">'.$FixedAmount.'</td>
				</tr>
				<tr>
					<td><b>Message</b></td>
					<td colspan="3">'.$ProblemNotes.'</td>
				</tr>';

		$arrStartDate = explode('-', $rs['startDate']);
		$NewStartDate = $arrStartDate[2].'.'.$arrStartDate[1].'.'.$arrStartDate[0];

		$arrEndDate = explode('-', $rs['endDate']);
		$NewEndDate = $arrEndDate[2].'.'.$arrEndDate[1].'.'.$arrEndDate[0];

		if($NewStartDate == '' || $NewStartDate == '..'){
			$NewStartDate = '-';
		} else {
			$NewStartDate = $NewStartDate;
		}

		if($NewEndDate == '' || $NewEndDate == '..'){
			$NewEndDate = '-';
		} else {
			$NewEndDate = $NewEndDate;
		}

		if($rs['startTime'] == '' || $rs['startTime'] == ':'){
			$NewStartTime = '-';
		} else {
			$NewStartTime = $rs['startTime'];
		}

		if($rs['endTime'] == '' || $rs['endTime'] == ':'){
			$NewEndTime = '-';
		} else {
			$NewEndTime = $rs['endTime'];
		}

		if($rs['contractorName'] == '' || $rs['contractorName'] == NULL){
			$ContractorName = '-';
		} else {
			$ContractorName = $rs['contractorName'];
		}

		if($rs['SpecialityName'] == '' || $rs['SpecialityName'] == NULL){
			$SpecialityName = '-';
		} else {
			$SpecialityName = $rs['SpecialityName'];
		}

		$row2 = '<tr>
					<td colspan="1"><b>Contractor Name</b></td>
					<td colspan="2">'.$ContractorName.'</td>
					<td colspan="1"><b>Speciality Name</b></td>
					<td colspan="2">'.$SpecialityName.'</td>
				</tr>

				<tr>
					<td colspan="1"><b>Start Date</b></td>
					<td colspan="2">'.$NewStartDate.'</td>
					<td colspan="1"><b>Start Time</b></td>
					<td colspan="2">'.$NewStartTime.'</td>
				</tr>

				<tr>
					<td colspan="1"><b>End Date</b></td>
					<td colspan="2">'.$NewEndDate.'</td>
					<td colspan="1"><b>End Time</b></td>
					<td colspan="2">'.$NewEndTime.'</td>
				</tr>';

				$queryNotes = "SELECT workLog.workLogID, workLog.content, workLog.status, workLog.workCreatedDate, workLog.problemID, workLog.workAssignedBy, tblC.image1 FROM tblWorkLog workLog LEFT JOIN tblGetAllProblem prob ON workLog.problemID=prob.problemID LEFT JOIN tblContractor tblC ON tblC.contractorID=prob.contractorID WHERE workLog.problemID='$problemID' ORDER BY workLog.workLogID DESC";
				$rsdNotes = mysqli_query($connect_var,$queryNotes);
				$countNotes=0;

						if($rsdNotes === FALSE) {
							die(mysql_error());
						}
				$emptyRow = '<tr><td colspan="6"><p>No Work log Notes Found</p></td></tr>'; 
				while($res = mysqli_fetch_assoc($rsdNotes)){
					$row3 .= '<tr><td colspan="6"><p><b>'.$res['workAssignedBy'].'</b> '.$res['workCreatedDate'].'</p><p>'.$res['status'].'-'.$res['content'].'</p></td></tr>';
					$emptyRow = '';
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
				<td colspan="6" style="text-align:center;"><h3>'.$StatusRow.'</h3></td>
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
			'.$emptyRow.'
			'.$row3.'
		</table>
	</div>';

$pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);
$pdf->lastPage();
ob_clean();
$pdf->Output('ParticularProblem.pdf', 'I');