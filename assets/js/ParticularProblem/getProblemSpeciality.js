function getProblemSpeciality(specialityID){
     /**************** To get speciality details for particular problem - Start *************/
          $.get(domainAddress + "GetProblemSpecility/" + specialityID, {}, function(resultSpeciality) {
              //console.log(resultSpeciality);
              $(".specialityName").html('');
              for (Speciality in resultSpeciality.SpecialityRecord) {
                  specialityName = resultSpeciality.SpecialityRecord[Speciality].SpecialityName;
                  $(".specialityName").text(specialityName);
                  $(".specialityLists").html("<i class='fa fa-pencil-square-o fa-1x specialityEdit' id='editSpeciality-" + getProblemID + "'></i>");
                  $(".changeSpeciality").html("<button type='button' class='md-btn md-btn-primary saveSpeciality' id='saveSpeciality-" + getProblemID + "' style='height: 32px;margin-top:-30px;margin-left:16px;'> Speciality</button>");
              }
              $(".specialityEdit").on('click', function() {
                  $(".specialityText").hide();
                  $(".specialityHide").toggle('slow');
              });
              $(".saveSpeciality").on('click', function() {
                  var getSaveProblemID = this.id.replace('saveSpeciality-', '');
                  var specialityVal = $("#specialityValue").val();
                  var getSpecialityName = $("#specialityValue option:selected").text();
                  userID = localStorage.getItem("MyRequest_AdminID");
                  var adminUserName = localStorage.getItem("MyRequest_UserName");
                  if (specialityVal == 0) {
                      alert("Select the Speciality Name");
                      return false;
                  } else {
                      UIkit.modal.confirm("Are you sure to change Speciality ?", function(result) {
                          if (result == true) {
                              var dataForm = '{"SpecialityID":"' + specialityVal + '","Content":"' + getSpecialityName + '","AdminUserID":"' + userID + '"}';
                              console.log(dataForm);
                              var sendURL = domainAddress + 'saveSpecialityForProblem/' + getSaveProblemID;
                              console.log(sendURL);
                              $.ajax({
                                  type: "POST",
                                  url: sendURL,
                                  data: dataForm,
                                  success: function(dataCheck) {
                                      console.log(dataCheck);
                                      var dataStartWorkLogForm = '{"Status":"contractorName","Content":"' + getSpecialityName + '","ProblemID":"' + getSaveProblemID + '","WorkAssignedBy":"' + adminUserName + '","workCreatedDate":"' + datetime + '","IsNotifiedForBoth":"1"}';
                                      console.log(dataStartWorkLogForm);
                                      var sendStartWorkLogURL = domainAddress + 'CreateProblemWorkLog';
                                      console.log(sendStartWorkLogURL);
                                      $.ajax({
                                          type: "POST",
                                          url: sendStartWorkLogURL,
                                          data: dataStartWorkLogForm,
                                          success: function(dataCheck) {
                                              console.log(dataCheck);
                                              var message = pushMessageSpecialityUpdate.format(getSpecialityName,requestID);
                                              $.post(domainAddress + "push/messageSendByAdminForWorkStatus.php", {
                                                  ContractorID:contractorValue,
                                                  TenantID:userRegisterID,
                                                  AdminID:adminUserID,
                                                  Title:'Speciality Changed',
                                                  Message:message,
                                                  ForBoth:1,
                                                  CaseID:getSaveProblemID
                                              }, function(e) {
                                                  console.log(e);
                                              });
                                              
                                              getDbReportProblem(getSaveProblemID);
                                              $(".specialityText").show();
                                              $(".specialityHide").toggle('slow');
                                          }
                                      });
                                  }
                              });
                          } else {
                              $(".bootbox").modal("hide");
                              $(".specialityText").hide();
                              $(".specialityHide").toggle('slow');
                              return false;
                          }
                      });
                  }
              }); // saveSpeciality

              if (contractorID == null || contractorID == "null" || contractorID == "" || contractorID == 0) {
                  $(".contractorListData").hide();
              } else {
                  $(".contractorListData").show();
                  getContractorChargeDetails(contractorID);
                  getContractorDetails(contractorID);
              }
              
          }); // GetProblemSpecility
          /**************** To get speciality details for particular problem - End *************/
  } //getProblemSpeciality