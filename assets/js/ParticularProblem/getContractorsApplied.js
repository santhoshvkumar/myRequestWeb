function getContractorsApplied(getProblemID) {
  var getCountry = localStorage.getItem('MyRequest_countryCode');
  var costSymbol = '';
  var ApprovedContractorID = '';
  var IsAlreadyApproved = '';
  if(getCountry == "US"){
    costSymbol = '<i class="fa fa-usd fa-2x"></i>';
  } else {
    costSymbol = '<i class="fa fa-gbp fa-2x"></i>';
  }
      $.get(domainAddress + "GetContractorAcceptListForProblem/" + getProblemID, {}, function(resultProblem) {
          //console.log(resultProblem);
          $("#contractorsApprovedContent").html("");
          if (resultProblem.record_count == 0) {
               $(".contractorsApplied").hide();
          } else {
            $(".contractorsApplied").show();
              for (var getInfo in resultProblem.records) {
                $("#contractorsApprovedContent").append('<div class="item"> <div class="md-card">  <div class="md-card-head md-bg-yellow" id="md-bg-'+resultProblem.records[getInfo].ContractorID+'"> <div class="contractorApproved" id="contractorApproved-'+resultProblem.records[getInfo].ContractorID+'" style="display:none;padding-left:20px;color:#fff;"> <b> <i class="fa fa-check-circle fa-2x"></i> </b> </div><div class="contractorRejected" id="contractorRejected-'+resultProblem.records[getInfo].ContractorID+'" style="display:none;padding-left:20px;color:#fff;"> <b> <i class="fa fa-ban fa-2x"></i> </b> </div> <div class="md-card-head-menu" data-uk-dropdown="{pos:"bottom-right"}" aria-haspopup="true" aria-expanded="false"> <i class="md-icon material-icons md-icon-light contractorApprovedIcon" id="contractorApprovedIcon-'+resultProblem.records[getInfo].ContractorID+'"></i>  <div class="uk-dropdown uk-dropdown-small uk-dropdown-bottom" style="min-width: 160px; top: 32px; left: -128px;"> <ul class="uk-nav">  <li class="approveContractor" id="approveContractor-'+resultProblem.records[getInfo].ContractorID+'" name="'+resultProblem.records[getInfo].ContractorName+'"> <a>Approve</a></li><li class="rejectContractor" id="rejectContractor-'+resultProblem.records[getInfo].ContractorID+'" name="'+resultProblem.records[getInfo].ContractorName+'"> <a>Reject</a></li></ul>  </div> </div> <div class="uk-text-center" id="contractorAvatar-'+resultProblem.records[getInfo].ContractorID+'">  <img class="md-card-head-avatar" src="'+domainAddress+resultProblem.records[getInfo].ContractorImage+'" alt="">  </div> <h3 class="md-card-head-text uk-text-center md-color-black">'+resultProblem.records[getInfo].ContractorName+'<span>'+resultProblem.records[getInfo].ContractorEmailID+'</span> </h3> </div> <div class="md-card-content">  <ul class="md-list md-list-addon">  <li>  <div class="md-list-addon-element">  <b> <i class="fa fa-pencil-square-o fa-2x"></i> </b>  </div> <div class="md-list-content">  <span class="md-list-heading" id="proposalNotes-'+resultProblem.records[getInfo].ContractorID+'">'+resultProblem.records[getInfo].ProposalNotes+'</span>  <span class="uk-text-small uk-text-muted">Estimated Notes</span> </div>  </li>  <li> <div class="md-list-addon-element"> <b> '+costSymbol+' </b> </div> <div class="md-list-content">  <span class="md-list-heading" id="proposalAmount-'+resultProblem.records[getInfo].ContractorID+'">'+resultProblem.records[getInfo].ProposalAmount+'</span>  <span class="uk-text-small uk-text-muted">Estimated Cost</span>  </div>  </li> </ul> </div>  </div>  </div>');

                if(resultProblem.records[getInfo].IsApproved==1){
                  ApprovedContractorID = resultProblem.records[getInfo].ContractorID;
                  IsAlreadyApproved = resultProblem.records[getInfo].IsApproved;
                  $('#contractorApproved-'+resultProblem.records[getInfo].ContractorID).show();
                  $('#contractorRejected-'+resultProblem.records[getInfo].ContractorID).hide();
                  $('#contractorAvatar-'+resultProblem.records[getInfo].ContractorID).css("margin-top","-35px");
                  $('#md-bg-'+resultProblem.records[getInfo].ContractorID).removeClass("md-bg-yellow");
                  $('#md-bg-'+resultProblem.records[getInfo].ContractorID).addClass("md-bg-green");
                  $('#contractorApprovedIcon-'+resultProblem.records[getInfo].ContractorID).hide();
                } else {
                  $('#contractorApproved-'+resultProblem.records[getInfo].ContractorID).hide();
                }

                if(resultProblem.records[getInfo].IsRejected == 1){
                  $('#contractorApproved-'+resultProblem.records[getInfo].ContractorID).hide();
                  $('#contractorRejected-'+resultProblem.records[getInfo].ContractorID).show();
                  $('#contractorAvatar-'+resultProblem.records[getInfo].ContractorID).css("margin-top","-35px");
                  $('#md-bg-'+resultProblem.records[getInfo].ContractorID).removeClass("md-bg-yellow");
                  $('#md-bg-'+resultProblem.records[getInfo].ContractorID).addClass("md-bg-red");
                }

                if(problemStatus2=="Awaiting Info"){
                  $('.contractorApprovedIcon').show();
                } else {
                  $('.contractorApprovedIcon').hide();
                }
              }

              $("#contractorsApprovedContent").owlCarousel({
                autoPlay: 5000, //Set AutoPlay to 5 seconds
                items : 4,
                itemsDesktop : [1199,3],
                itemsDesktopSmall : [979,3]
              });

              $(".approveContractor").on('click',function(){
                contractorID = this.id.replace('approveContractor-','');
                UIkit.modal.confirm("Are you sure want to Approve ?", function(e) {
                  getContractorName = $("#approveContractor-"+contractorID).attr('name');
                  var proposalNotes = $("#proposalNotes-"+contractorID).text();
                  var proposalAmount = $("#proposalAmount-"+contractorID).text();
                  var problemStatus = "Approved";
                  var dataForm = '{"ProblemStatus":"' + problemStatus + '","ContractorID":"'+contractorID+'","ContractorName":"'+getContractorName+'","ProposalNotes":"'+proposalNotes+'","ProposalAmount":"'+proposalAmount+'","IsApproved":"1", "IsRejected":"0", "IsAlreadyApproved":"'+IsAlreadyApproved+'", "ApprovedContractorID":"'+ApprovedContractorID+'"}';
                  var sendURL = domainAddress + 'updateProblemStatus/' + getProblemID;
                console.log(dataForm);
                console.log(sendURL);
                $.ajax({
                      type: "POST",
                      url: sendURL,
                      data: dataForm,
                      success: function(dataCheck) {
                              console.log(dataCheck);
                              UIkit.modal.alert('Problem Status Updated Successfully');
                              $(".statusColor").html("");
                              $(".statusColor").html('<button type="button" class="md-btn md-btn-success" id="btnApproved">Approved</button>');
                              $("#btnApproved").show();
                              $("#btnApprove").hide();
                              var dataWorkLogForm = '{"Status":"Approved","Content":"Admin has assigned '+getContractorName+' to Request # ' + requestID + ' ","ProblemID":"' + getProblemID + '","WorkAssignedBy":"' + adminUserName + '","workCreatedDate":"' + datetime + '","IsNotifiedForBoth":"1"}';
                              console.log(dataWorkLogForm);
                              var sendWorkLogURL = domainAddress + 'CreateProblemWorkLog';
                              console.log(sendWorkLogURL);
                              $.ajax({
                                  type: "POST",
                                  url: sendWorkLogURL,
                                  data: dataWorkLogForm,
                                  success: function(dataCheck) {
                                      console.log(dataCheck);
                                      getDbReportProblem(getProblemID);
                                      getContractorsApplied(getProblemID);
                                      /* Push Notification for both Tenant & Contractor - Start */
                                      $.post(domainAddress + "push/messageSendByAdminForNotes.php", {
                                        ContractorID:contractorID,
                                        TenantID: userRegisterID,
                                        AdminID: adminUserID,
                                        ToContractor: pushMessageTenantAdminApproved.format(requestID),
                                        ToTenant: pushMessageContractorAdminApproved.format(getContractorName,requestID),
                                        CaseID: getProblemID,
                                        ForBoth:1,
                                        Title:pushMessageAdminApprovedTitle
                                    }, function(e) {
                                        console.log(e);
                                    }); // /push/AdminToTenant.php
                                    /* Push Notification for both Tenant & Contractor - End */
                                  }
                              }); // CreateProblemWorkLog
                          } // success
                  }); // ajax 
                }); // approveContractor
              });

              $(".rejectContractor").on('click',function(){
                contractorID = this.id.replace('rejectContractor-','');
                UIkit.modal.confirm("Are you sure want to Reject ?", function(e) {
                  getContractorName = $("#rejectContractor-"+contractorID).attr('name');
                  var proposalNotes = $("#proposalNotes-"+contractorID).text();
                  var proposalAmount = $("#proposalAmount-"+contractorID).text();
                  var problemStatus = "Approved";
                  var dataForm = '{"ProblemStatus":"' + problemStatus + '","ContractorID":"'+contractorID+'","ContractorName":"'+getContractorName+'","ProposalNotes":"'+proposalNotes+'","ProposalAmount":"'+proposalAmount+'","IsApproved":"0", "IsRejected":"1", "IsAlreadyApproved":"0", "ApprovedContractorID":"'+ApprovedContractorID+'"}';
                  var sendURL = domainAddress + 'updateProblemStatus/' + getProblemID;
                console.log(dataForm);
                console.log(sendURL);
                $.ajax({
                      type: "POST",
                      url: sendURL,
                      data: dataForm,
                      success: function(dataCheck) {
                              console.log(dataCheck);
                              UIkit.modal.alert('Problem Status Updated Successfully');
                              $(".statusColor").html("");
                              $(".statusColor").html('<button type="button" class="md-btn md-btn-success" id="btnApproved">Approved</button>');
                              $("#btnApproved").show();
                              $("#btnApprove").hide();
                              var dataWorkLogForm = '{"Status":"Rejected","Content":"Admin has Rejected '+getContractorName+' to Request # ' + requestID + ' ","ProblemID":"' + getProblemID + '","WorkAssignedBy":"' + adminUserName + '","workCreatedDate":"' + datetime + '","IsNotifiedForBoth":"1"}';
                              console.log(dataWorkLogForm);
                              var sendWorkLogURL = domainAddress + 'CreateProblemWorkLog';
                              console.log(sendWorkLogURL);
                              $.ajax({
                                  type: "POST",
                                  url: sendWorkLogURL,
                                  data: dataWorkLogForm,
                                  success: function(dataCheck) {
                                      console.log(dataCheck);
                                      getDbReportProblem(getProblemID);
                                      getContractorsApplied(getProblemID);
                                      /* Push Notification for both Tenant & Contractor - Start */
                                      $.post(domainAddress + "push/messageSendByAdminForNotes.php", {
                                        ContractorID:contractorID,
                                        TenantID: userRegisterID,
                                        AdminID: adminUserID,
                                        ToContractor: pushMessageTenantAdminApproved.format(requestID),
                                        ToTenant: pushMessageContractorAdminApproved.format(getContractorName,requestID),
                                        CaseID: getProblemID,
                                        ForBoth:1,
                                        Title:pushMessageAdminApprovedTitle
                                    }, function(e) {
                                        console.log(e);
                                    }); // /push/AdminToTenant.php
                                    /* Push Notification for both Tenant & Contractor - End */
                                  }
                              }); // CreateProblemWorkLog
                          } // success
                  }); // ajax 
                }); // rejectContractor
              });
          }
      });
  } // getContractorChargeDetails