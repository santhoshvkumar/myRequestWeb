$("#btnGetExcel").click(function() {
  window.location.href = "api/excelParticularProblems.php?problemID=" + getProblemID + "&adminID=" + adminUserID;
});

$("#btnPrintPartProblems").click(function() {
  window.open("tcpdf/examples/particularProblem.php?problemID=" + getProblemID + "&adminID=" + adminUserID);
});

/********** To Start Work - Start ********/
$(".btnStartWork").click(function() {
  var getStartDate = $("#inputStartDate").val();
  var getStartTime = $("#inputStartTime").val();

  var newStartDateFormat = getStartDate.split(".");
  var startDate = newStartDateFormat[0];
  var startMonth = newStartDateFormat[1];
  var startYear = newStartDateFormat[2];
  var sendStartDate = startYear + "-" + startMonth + "-" + startDate;
  var adminUserName = localStorage.getItem("MyRequest_UserName");
  problemStatus2 = "Started";
  userRegisterID = localStorage.getItem("MyRequestUserRegisterID");
  console.log(sendStartDate + " || " + getStartTime);
  if (getStartDate == "" || getStartDate == "Start Date") {
      alert("Select Start Date");
      return false;
  }
  if (getStartTime == "" || getStartTime == "Start Time") {
      alert("Select Start Time");
      return false;
  } else {
      UIkit.modal.confirm("Are you sure want to Start Work ?", function() {
       
              var dataStartWorkForm = '{"StartDate":"' + sendStartDate + '","StartTime":"' + getStartTime + '"}';
              console.log(dataStartWorkForm);
              var sendStartWorkURL = domainAddress + 'updateProblemWorkStart/' + getProblemID;
              console.log(sendStartWorkURL);
              $.ajax({
                  type: "POST",
                  url: sendStartWorkURL,
                  data: dataStartWorkForm,
                  success: function(dataCheck) {
                      console.log(dataCheck);
                      var dataStartWorkLogForm = '{"Status":"WorkStartDate","Content":"Work Started @ '+moment(sendStartDate+" "+getStartTime).format('Do MMM, h:mm a')+'","ProblemID":"' + getProblemID + '","AssignedBy":"' + adminUserName + '","ProblemStatus":"' + problemStatus2 + '","IsNotifiedForBoth":"1"}';
                      console.log(dataStartWorkLogForm);
                      var sendStartWorkLogURL = domainAddress + 'UpdateExistProblemStatus';
                      console.log(sendStartWorkLogURL);
                      $.ajax({
                          type: "POST",
                          url: sendStartWorkLogURL,
                          data: dataStartWorkLogForm,
                          success: function(response) {
                              console.log(response);
                              $.post(domainAddress + "/push/messageSendByAdminForWorkStatus.php", {
                                  ContractorID:contractorID,
                                  TenantID:userRegisterID,
                                  AdminID:adminUserID,
                                  Message:"Request # "+getProblemID+", Work has been started at "+getStartTime,
                                  ForBoth:1,
                                  CaseID:getProblemID
                              }, function(e) {
                                  console.log(e);
                              });
                              // $.get(domainAddress + "/push/AdminToTenant.php", {
                              //     getUserTenantID: userRegisterID,
                              //     AdminID: adminUserID,
                              //     Message: "Work has been started, for Request # ",
                              //     CaseID: getProblemID
                              // }, function(e) {
                              //     console.log(e);
                              // });
                              // $.get(domainAddress + "/push/AdminToContractor.php", {
                              //     getContractorID: contractorID,
                              //     AdminID: adminUserID,
                              //     Message: "Work has been started, for Request # ",
                              //     CaseID: getProblemID
                              // }, function(e) {
                              //     console.log(e);
                              // });
                              // $.get(domainAddress + "/push/AdminToSubAdmin.php", {
                              //     AdminID: adminUserID,
                              //     Message: "Work has been started, for Request # ",
                              //     CaseID: getProblemID
                              // }, function(e) {
                              //     console.log(e);
                              // });
                              getDbReportProblem(getProblemID);
                              UIkit.modal.alert('Work has been started');
                          }
                      }); // CreateProblemWorkLog
                      $(".btnStartWork").hide();
                  }
              }); // updateProblemWorkStart 
      }); // UIkit.modal.confirm
  }
  
}); // btnStartWork
/********** To Start Work - End ********/
/********** To End Work - Start ********/
$(".btnEndWork").click(function() {
  var getEndDate = $("#inputEndDate").val();
  var getEndTime = $("#inputEndTime").val();
  var newEndDateFormat = getEndDate.split(".");
  var endDate = newEndDateFormat[0];
  var endMonth = newEndDateFormat[1];
  var endYear = newEndDateFormat[2];
  var sendEndDate = endYear + "-" + endMonth + "-" + endDate;
  var adminUserName = localStorage.getItem("MyRequest_UserName");
  problemStatus2 = "Completed";
  userRegisterID = localStorage.getItem("MyRequestUserRegisterID");
  console.log(sendEndDate + " || " + getEndTime);

  if (getEndDate == "" || getEndDate == "End Date") {
      alert("Select End Date");
      return false;
  }
  if (getEndTime == "" || getEndTime == "End Time") {
      alert("Select End Time");
      return false;
  } else {
      UIkit.modal.confirm("Are you sure want to End Work ?", function(result) {

              var dataEndWorkForm = '{"EndDate":"' + sendEndDate + '","EndTime":"' + getEndTime + '"}';
              console.log(dataEndWorkForm);
              var sendEndWorkURL = domainAddress + 'updateProblemWorkEnd/' + getProblemID;
              console.log(sendEndWorkURL);
              $.ajax({
                  type: "POST",
                  url: sendEndWorkURL,
                  data: dataEndWorkForm,
                  success: function(dataCheck) {
                      console.log(dataCheck);
                      var dataStartWorkLogForm = '{"Status":"WorkEndDate","Content":"Work Completed @ '+moment(sendEndDate+" "+getEndTime).format('Do MMM, h:mm a')+'","ProblemID":"' + getProblemID + '","AssignedBy":"' + adminUserName + '","ProblemStatus":"' + problemStatus2 + '","IsNotifiedForBoth":"1"}';
                      console.log(dataStartWorkLogForm);
                      var sendStartWorkLogURL = domainAddress + 'UpdateExistProblemStatus';
                      console.log(sendStartWorkLogURL);
                      $.ajax({
                          type: "POST",
                          url: sendStartWorkLogURL,
                          data: dataStartWorkLogForm,
                          success: function(response) {
                              console.log(response);
                              $.post(domainAddress + "/push/messageSendByAdminForWorkStatus.php", {
                                  ContractorID:contractorID,
                                  TenantID:userRegisterID,
                                  AdminID:adminUserID,
                                  Message:"Request # "+getProblemID+", Work successfully completed at "+getEndTime,
                                  ForBoth:1,
                                  CaseID:getProblemID
                              }, function(e) {
                                  console.log(e);
                              });
                              // $.get(domainAddress + "/push/AdminToTenant.php", {
                              //     getUserTenantID: userRegisterID,
                              //     AdminID: adminUserID,
                              //     Message: "Work has been completed Successfully, for Request # ",
                              //     CaseID: getProblemID
                              // }, function(e) {
                              //     console.log(e);
                              // });
                              // $.get(domainAddress + "/push/AdminToContractor.php", {
                              //     getContractorID: contractorID,
                              //     AdminID: adminUserID,
                              //     Message: "Work has been completed Successfully, for Request # ",
                              //     CaseID: getProblemID
                              // }, function(e) {
                              //     console.log(e);
                              // });
                              // $.get(domainAddress + "/push/AdminToSubAdmin.php", {
                              //     AdminID: adminUserID,
                              //     Message: "Work has been completed Successfully, for Request # ",
                              //     CaseID: getProblemID
                              // }, function(e) {
                              //     console.log(e);
                              // });
                              getDbReportProblem(getProblemID);
                              UIkit.modal.alert('Work has been completed Successfully');

                          }
                      }); //CreateProblemWorkLog
                      $(".btnEndWork").hide();
                  }
              }); // updateProblemWorkEnd
           
      }); // UIkit.modal.confirm
  }
  
}); // btnEndWork
/********** To End Work - End ********/