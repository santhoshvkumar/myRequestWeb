function getContractorDetails(contractorID){
    /**************** To get contractor details for particular problem - Start *************/
              $.get(domainAddress + "GetProblemContractor/" + contractorID, {}, function(resultContractor) {
                  //console.log(resultContractor);
                  $(".contractorName").html('');
                  var getIsApproved = "";
                  var contractorName = "";
                  for (Contractor in resultContractor.ContractorRecord) {
                      contractorName = resultContractor.ContractorRecord[Contractor].contractorName;
                      getIsApproved = resultContractor.ContractorRecord[Contractor].IsApproved;
                      
                      var contractCount = 0;
                      for (contractorCount in resultContractor.ContractorRecord[Contractor].Count) {
                          contractCount = resultContractor.ContractorRecord[Contractor].Count[contractorCount].CountContractor;
                      }
                      $(".contractorName").text(contractorName);
                      $(".changeContractor").html("<button type='button' class='md-btn md-btn-primary md-btn-success saveContractor' id='saveContractor-" + getProblemID + "'>Assign Contractor</ button>");
                       
                  }
                 
                  if (getIsApproved == 1) {
                      $(".contractorAcceptTxt").css("display", "block");
                      $(".contractorAcceptTxt").css("color", "green");
                      $(".contractorAcceptTxt").text("Contractor "+contractorName+" has been approved for Request # "+getProblemID);

                  } else {
                      $(".contractorAcceptTxt").css("display", "none");
                      $(".contractorAcceptTxt").text("");

                  }

                  $(".saveContractor").on('click', function() {
                      var getSaveProblemID = this.id.replace('saveContractor-', '');
                      var contractorValue = $("#contractorValue").val();
                      var contractor_ID = parseInt(contractorValue);
                      var getContractorName = $("#contractorValue option:selected").text();
                      userID = localStorage.getItem("MyRequest_AdminID");
                      var adminUserName = localStorage.getItem("MyRequest_UserName");
                      var problemStatus = "Approved";
                      var status = "Assigned";
                      if (contractorValue == 0) {
                          alert("Select the Contractor Name");
                          return false;
                      } else {
                          UIkit.modal.confirm("Are you sure to Assign Contractor ?", function(e) {

                              problemStatus2 = localStorage.getItem("MyRequestStatus");
                              userRegisterID = localStorage.getItem("MyRequestUserRegisterID");
                              var dataForm = '{"ContractorID":"' + contractorValue + '","Content":"' + getContractorName + '","AdminUserID":"' + adminUserID + '"}';
                              console.log(dataForm);
                              var sendURL = domainAddress + 'saveContractorForProblem/' + getSaveProblemID;
                              console.log(sendURL);
                              $.ajax({
                                  type: "POST",
                                  url: sendURL,
                                  data: dataForm,
                                  success: function(dataCheck) {
                                      console.log(dataCheck);
                                      var dataWorkLogForm = '{"Status":"contractorName","Content":"' + getContractorName + '","ProblemID":"' + getSaveProblemID + '","WorkAssignedBy":"' + adminUserName + '","workCreatedDate":"' + datetime + '","IsNotifiedForBoth":"1"}';
                                      console.log(dataWorkLogForm);
                                      var sendWorkLogURL = domainAddress + 'CreateProblemWorkLog';
                                      console.log(sendWorkLogURL);
                                      $.ajax({
                                          type: "POST",
                                          url: sendWorkLogURL,
                                          data: dataWorkLogForm,
                                          success: function(dataCheck) {
                                              console.log(dataCheck);
                                              $.post(domainAddress + "/push/messageSendByAdminForWorkStatus.php", {
                                                  ContractorID:contractorValue,
                                                  TenantID:userRegisterID,
                                                  AdminID:adminUserID,
                                                  Message:pushMessageContractorAssigned.format(getContractorName,requestID),
                                                  ForBoth:1,
                                                  CaseID:getProblemID
                                              }, function(e) {
                                                  console.log(e);
                                              });
                                              // $.get(domainAddress + "/push/AdminToTenant.php", {
                                              //     getUserTenantID: userRegisterID,
                                              //     AdminID: adminUserID,
                                              //     Message: "Contractor "+getContractorName+" has been assigned for Request # ",
                                              //     CaseID: getSaveProblemID
                                              // }, function(e) {
                                              //     console.log(e);
                                              // });
                                              // $.get(domainAddress + "/push/AdminToContractor.php", {
                                              //     getContractorID: contractorValue,
                                              //     AdminID: adminUserID,
                                              //     Message: "Approved by Admin for Request # ",
                                              //     CaseID: getSaveProblemID
                                              // }, function(e) {
                                              //     console.log(e);
                                              // });
                                              // $.get(domainAddress + "/push/AdminToSubAdmin.php", {
                                              //     AdminID: adminUserID,
                                              //     Message: "Approved by Admin for Request # ",
                                              //     CaseID: getSaveProblemID
                                              // }, function(e) {
                                              //     console.log(e);
                                              // });
                                              getParticularProblemInfo(getSaveProblemID);
                                          }
                                      }); // CreateProblemWorkLog
                                      $(".contractorText").show();
                                  }
                              }); // saveContractorForProblem

                          });
                      }
                  }); // saveContractor
              }); // GetProblemContractor
              /**************** To get contractor details for particular problem - End *************/
  } //getContractorDetails(contractorID)