getProblemID = localStorage.getItem("ParticularProblemID");
$("#btnGetExcel").click(function() {
    getUserType = localStorage.getItem("MyRequest_UserType");
    getAllUserTypeID = localStorage.getItem('MyRequest_AllUserID');
    window.location.href = domainAddress+"excelParticularProblems.php?problemID=" + getProblemID + "&adminID=" + adminUserID + "&UserType=" + getUserType + "&AllUserTypeID=" + getAllUserTypeID;
    console.log(domainAddress+"excelParticularProblems.php?problemID=" + getProblemID + "&adminID=" + adminUserID + "&UserType=" + getUserType + "&AllUserTypeID=" + getAllUserTypeID);
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

    if (getStartDate == "" || getStartDate == "Start Date") {
        alert("Select Start Date");
        return false;
    }

    if (getStartTime == "" || getStartTime == "Start Time") {
        alert("Select Start Time");
        return false;
    } else {
        UIkit.modal.confirm("Do you want to Start Work ?", function() {
            var dataStartWorkForm = '{"StartDate":"' + sendStartDate + '","StartTime":"' + getStartTime + '"}';
            var sendStartWorkURL = domainAddress + 'updateProblemWorkStart/' + getProblemID;
            $.ajax({
                type: "POST",
                url: sendStartWorkURL,
                data: dataStartWorkForm,
                success: function(dataCheck) {
                    var dataStartWorkLogForm = '{"Status":"WorkStartDate","Content":"Work Started @ '+moment(sendStartDate+" "+getStartTime).format('Do MMM, h:mm a')+'","ProblemID":"' + getProblemID + '","AssignedBy":"' + adminUserName + '","ProblemStatus":"' + problemStatus2 + '","IsNotifiedForBoth":"1"}';
                    var sendStartWorkLogURL = domainAddress + 'UpdateExistProblemStatus';
                      $.ajax({
                          type: "POST",
                          url: sendStartWorkLogURL,
                          data: dataStartWorkLogForm,
                          success: function(response) {
                            $.post(domainAddress + "push/messageSendByAdminForWorkStatus.php", {
                                ContractorID:contractorID,
                                TenantID:userRegisterID,
                                AdminID:adminUserID,
                                Title:'Work Start',
                                Message:pushMessageWorkStart.format(requestID,getStartTime),
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

    if (getEndDate == "" || getEndDate == "End Date") {
        alert("Select End Date");
        return false;
    }

    if (getEndTime == "" || getEndTime == "End Time") {
        alert("Select End Time");
        return false;
    } else {
        UIkit.modal.confirm("Do you want to End the Work ?", function(result) {
            var dataEndWorkForm = '{"EndDate":"' + sendEndDate + '","EndTime":"' + getEndTime + '"}';
            var sendEndWorkURL = domainAddress + 'updateProblemWorkEnd/' + getProblemID;
            $.ajax({
                type: "POST",
                url: sendEndWorkURL,
                data: dataEndWorkForm,
                success: function(dataCheck) {
                    var dataStartWorkLogForm = '{"Status":"WorkEndDate","Content":"Work Completed @ '+moment(sendEndDate+" "+getEndTime).format('Do MMM, h:mm a')+'","ProblemID":"' + getProblemID + '","AssignedBy":"' + adminUserName + '","ProblemStatus":"' + problemStatus2 + '","IsNotifiedForBoth":"1"}';
                    var sendStartWorkLogURL = domainAddress + 'UpdateExistProblemStatus';
                    $.ajax({
                        type: "POST",
                        url: sendStartWorkLogURL,
                        data: dataStartWorkLogForm,
                        success: function(response) {
                            $.post(domainAddress + "push/messageSendByAdminForWorkStatus.php", {
                                ContractorID:contractorID,
                                TenantID:userRegisterID,
                                AdminID:adminUserID,
                                Title:'Work Complete',
                                Message:pushMessageWorkEnd.format(requestID,getEndTime),
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