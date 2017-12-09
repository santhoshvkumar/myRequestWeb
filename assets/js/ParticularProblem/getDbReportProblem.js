function getDbReportProblem(getProblemID) {
      /********** To get Particular Problem Details - Start ********/
      $.get(domainAddress + "GetParticularProblem/" + getProblemID, {}, function(resultProblem) {
          console.log(domainAddress + "GetParticularProblem/" + getProblemID);
          $(".problemNotes").html('');
          $(".userNotes").html('');
          $(".noteHide").html('');
          $(".NotesContent").html('');

            var getcountryCode = localStorage.getItem("MyRequest_countryCode");

            if(getcountryCode == "US" || getcountryCode == "India" || getcountryCode == "Canada"){
                $(".dollarpounds").html("<i class='fa fa-usd fa-2x'></i>");
            } else {
                $(".dollarpounds").html("<i class='fa fa-gbp fa-2x'></i>");
            }

          for (Problem in resultProblem.ProblemRecord) {
              $("#getRequestID").text("Request # "+resultProblem.ProblemRecord[Problem].RequestID);
              requestID = resultProblem.ProblemRecord[Problem].RequestID;
              problemID = resultProblem.ProblemRecord[Problem].ProblemID;
              var Notes = resultProblem.ProblemRecord[Problem].Notes;
              userRegisterID = resultProblem.ProblemRecord[Problem].UserRegisterID;
              var FirstName = resultProblem.ProblemRecord[Problem].Name;
              var LastName = resultProblem.ProblemRecord[Problem].LastName;
              var EmailID = resultProblem.ProblemRecord[Problem].EmailID;
              var PhoneNumber = resultProblem.ProblemRecord[Problem].PhoneNumber;
              var UserImage = resultProblem.ProblemRecord[Problem].UserImage;
              var Latitude = resultProblem.ProblemRecord[Problem].Latitude;
              var Longitude = resultProblem.ProblemRecord[Problem].Longitude;
              var ProblemDateTime = resultProblem.ProblemRecord[Problem].ProblemDateTime;
              var problemStatus = resultProblem.ProblemRecord[Problem].ProblemStatus;
              var status = resultProblem.ProblemRecord[Problem].Status;
              var whenToRespond = resultProblem.ProblemRecord[Problem].WhenToRespond;
              var EstimatedNotes = resultProblem.ProblemRecord[Problem].EstimatedNotes;
              var EstimatedCost = resultProblem.ProblemRecord[Problem].EstimatedCost;
              var ProblemStartDate = resultProblem.ProblemRecord[Problem].ProblemStartDate;
              var ProblemEndDate = resultProblem.ProblemRecord[Problem].ProblemEndDate;
              var ProblemStartTime = resultProblem.ProblemRecord[Problem].ProblemStartTime;
              var ProblemEndTime = resultProblem.ProblemRecord[Problem].ProblemEndTime;
              var IsContractorAccept = resultProblem.ProblemRecord[Problem].IsContractorAccept;
              problemStatus2 = resultProblem.ProblemRecord[Problem].ProblemStatus;
              var getContractorRating = resultProblem.ProblemRecord[Problem].ContractorRating;
              getContractorName = resultProblem.ProblemRecord[Problem].ContractorName;
              var getLastName = resultProblem.ProblemRecord[Problem].LastName;
              var getContractorImage = resultProblem.ProblemRecord[Problem].ContractorImage;
              var getFixedAmount = parseFloat(resultProblem.ProblemRecord[Problem].FixedAmount).toFixed(2);
              getSpecialityID = resultProblem.ProblemRecord[Problem].SpecialityID;
              var getAddress = resultProblem.ProblemRecord[Problem].GetAddress;
              
              if(getSpecialityID!=""){
                getProblemSpeciality(getSpecialityID);
              }

              if (getFixedAmount == "" || getFixedAmount == null) {
                  $("#btnFixedAmount").show();
                  $("#btnFixedAmount").html("No Final Cost found");
              } else {
                  $("#btnFixedAmount").show();
                  $("#btnFixedAmount").html(getFixedAmount + " ( Final Cost )");
              }
              if (getContractorName == undefined || getContractorName == "") {
                  $(".setContractorName").hide();
                  $(".contractorHide").show();
              } else {
                  $(".setContractorName").show();
                  $(".setContractorName").html("<h4>" + getContractorName + " <i class='fa fa-pencil-square-o contractorEdit'></i></h4> ");
                  $(".contractorHide").hide();
              }

              if (getContractorRating == undefined || getContractorRating == "") {
                  $(".contractorRatingTxt").text("");
                  $(".contractorRatingTxt").hide();
                  $(".contractorRatingTxt").css("color", "#727272");
              } else {
                  $(".contractorRatingTxt").text("Contractor Rating: " + getContractorRating + " / 5");
                  $(".contractorRatingTxt").show();
                  $(".contractorRatingTxt").css("color", "#727272");
              }
              if (getContractorImage == undefined || getContractorImage == null || getContractorImage == "") {
                  $(".getContractorImg").hide();
              } else {
                  $(".getContractorImg").show();
                  $(".getContractorImage").attr("src", domainAddress + getContractorImage);
              }
              localStorage.setItem("MyRequestStatus", problemStatus2);
              localStorage.setItem("MyRequestUserRegisterID", userRegisterID);

              if (problemStatus2 == "Awaiting Info") {

                  $(".statusColor").html("");
                  var str = "Awaiting Info";
                  var result = str.fontcolor("lightblue");
                  $(".statusColor").html('<div class="md-card md-card-hover widthCardGal"> <div class="gallery_grid_item md-card-content" style="text-align:center;padding: 10px;border-left: 5px solid lightblue;text-align:center;">Awaiting Info</div> </div>');
                  $(".rescheduleshowbtn").show();
                  $(".assignshowbtn").hide();
                  $(".btnStartWork").show();
                  $(".btnEndWork").show();
                  $("#inputStartDate").attr("disabled",false);
                  $("#inputStartTime").attr("disabled",false);
                  $("#inputEndDate").attr("disabled",false);
                  $("#inputEndTime").attr("disabled",false);
                  $("#amountListData").hide();
                  $(".assignRescheduleBtn").removeClass("btn-success");
                  $(".assignRescheduleBtn").addClass("btn-warning");
                  $(".assignRescheduleBtn").text("Send Notification to Contractor");
                  $("#btnClosedd").show();
                  $("#btnApprove").hide();
                  $("#noteNewText").attr("disabled",false);
                  $(".btnAddNotes").attr("disabled",false);
                  $(".contractorRating").hide();
                  $(".specialityLists").show();
              } else if (problemStatus2 == "Assigned") {

                  $(".statusColor").html("");
                  var str = "Assigned";
                  var result = str.fontcolor("lightgrey");
                  $(".statusColor").html('<div class="md-card md-card-hover widthCardGal"> <div class="gallery_grid_item md-card-content" style="text-align:center;padding: 10px;border-left: 5px solid lightgrey;">Assigned</div> </div>');
                  $(".rescheduleshowbtn").show();
                  $(".assignshowbtn").hide();
                  $(".assignRescheduleBtn").removeClass("btn-success");
                  $(".assignRescheduleBtn").addClass("btn-warning");
                  $(".assignRescheduleBtn").text("Re-Scheduled");
                  $("#btnClosedd").show();
                  $(".btnStartWork").show();
                  $(".btnEndWork").show();
                  $("#inputStartDate").attr("disabled",false);
                  $("#inputStartTime").attr("disabled",false);
                  $("#inputEndDate").attr("disabled",false);
                  $("#inputEndTime").attr("disabled",false);
                  $("#btnApprove").show();
                  $("#amountListData").hide();
                  $("#noteNewText").attr("disabled",false);
                  $(".btnAddNotes").attr("disabled",false);
                  $(".contractorRating").hide();
                  $(".specialityLists").hide();
              } else if (problemStatus2 == "Awaiting Approval") {

                  $(".statusColor").html("");
                  var str = "Assigned";
                  var result = str.fontcolor("#0097a7");
                  $(".statusColor").html('<div class="md-card md-card-hover widthCardGal"> <div class="gallery_grid_item md-card-content" style="text-align:center;padding: 10px;border-left: 5px solid #0097a7;">Awaiting Approval</div> </div>');
                  $(".rescheduleshowbtn").show();
                  $(".assignshowbtn").hide();
                  $(".assignRescheduleBtn").removeClass("btn-success");
                  $(".assignRescheduleBtn").addClass("btn-warning");
                  $(".assignRescheduleBtn").text("Approve");
                  $("#btnClosedd").show();
                  $("#btnApprove").show();
                  $(".btnStartWork").show();
                  $(".btnEndWork").show();
                  $("#inputStartDate").attr("disabled",false);
                  $("#inputStartTime").attr("disabled",false);
                  $("#inputEndDate").attr("disabled",false);
                  $("#inputEndTime").attr("disabled",false);
                  $("#amountListData").show();
                  $("#btnApprove").show();
                  $("#noteNewText").attr("disabled",false);
                  $(".btnAddNotes").attr("disabled",false);
                  $(".contractorRating").hide();
                  $(".specialityLists").hide();
              } else if (problemStatus2 == "Approved") {
                  //console.log("problem status Approved");
                  $(".statusColor").html("");
                  var str = "Approved";
                  var result = str.fontcolor("blue");
                  $(".statusColor").html('<div class="md-card md-card-hover widthCardGal"> <div class="gallery_grid_item md-card-content" style="text-align:center;padding: 10px;border-left: 5px solid blue;">Approved</div> </div>');
                  $(".rescheduleshowbtn").show();
                  $(".assignshowbtn").hide();
                  $(".assignRescheduleBtn").addClass("btn-success");
                  $(".assignRescheduleBtn").removeClass("btn-warning");
                  $(".assignRescheduleBtn").text("Re-Scheduled");
                  $("#btnClosedd").show();
                  $(".btnStartWork").show();
                  $(".btnEndWork").show();
                  $("#inputStartDate").attr("disabled",false);
                  $("#inputStartTime").attr("disabled",false);
                  $("#inputEndDate").attr("disabled",false);
                  $("#inputEndTime").attr("disabled",false);
                  $("#amountListData").hide();
                  $("#btnApprove").hide();
                  $("#noteNewText").attr("disabled",false);
                  $(".btnAddNotes").attr("disabled",false);
                  $(".contractorRating").hide();
                  $(".specialityLists").hide();
              } else if (problemStatus2 == "Started") {
                  //console.log("problem status Started");
                  $(".statusColor").html("");
                  var str = "Started";
                  var result = str.fontcolor("brown");
                  $(".statusColor").html('<div class="md-card md-card-hover widthCardGal"> <div class="gallery_grid_item md-card-content" style="text-align:center;padding: 10px;border-left: 5px solid brown;">Started</div> </div>');
                  $(".rescheduleshowbtn").show();
                  $(".assignshowbtn").hide();
                  $(".assignRescheduleBtn").addClass("btn-success");
                  $(".assignRescheduleBtn").removeClass("btn-warning");
                  $(".assignRescheduleBtn").text("Re-Scheduled");
                  $("#btnClosedd").show();
                  $(".btnStartWork").hide();
                  $(".btnEndWork").show();
                  $("#inputStartDate").attr("disabled",true);
                  $("#inputStartTime").attr("disabled",true);
                  $("#inputEndDate").attr("disabled",false);
                  $("#inputEndTime").attr("disabled",false);
                  $("#btnApprove").hide();
                  $("#amountListData").hide();
                  $("#noteNewText").attr("disabled",false);
                  $(".btnAddNotes").attr("disabled",false);
                  $(".contractorRating").hide();
                  $(".specialityLists").hide();
              } else if (problemStatus2 == "Completed") {

                  $(".statusColor").html("");
                  var str = "Completed";
                  var result = str.fontcolor("green");
                  $(".statusColor").html('<div class="md-card md-card-hover widthCardGal"> <div class="gallery_grid_item md-card-content" style="text-align:center;padding: 10px;border-left: 5px solid green;">Completed</div> </div>');
                  $(".rescheduleshowbtn").hide();
                  $(".assignshowbtn").hide();
                  $(".assignRescheduleBtn").addClass("btn-success");
                  $(".assignRescheduleBtn").removeClass("btn-warning");
                  $(".assignRescheduleBtn").text("Re-Open");
                  $("#btnClosedd").show();
                  $(".btnStartWork").hide();
                  $(".btnEndWork").hide();
                  $("#inputStartDate").attr("disabled",true);
                  $("#inputStartTime").attr("disabled",true);
                  $("#inputEndDate").attr("disabled",true);
                  $("#inputEndTime").attr("disabled",true);
                  $("#btnApprove").hide();
                  $("#amountListData").show();
                  $("#noteNewText").attr("disabled",true);
                  $(".btnAddNotes").attr("disabled",true);
                  $(".specialityLists").hide();
                  if(resultProblem.ProblemRecord[Problem].QualityRating==null){
                    $(".contractorRating").hide();
                  }
                  else{
                    $("#qualityRating").attr("src","assets/img/Rating/select_"+resultProblem.ProblemRecord[Problem].QualityRating+".png");
                    $("#punctualityRating").attr("src","assets/img/Rating/select_"+resultProblem.ProblemRecord[Problem].PunctualityRating+".png");
                    $("#staffBehaviorRating").attr("src","assets/img/Rating/select_"+resultProblem.ProblemRecord[Problem].StaffBehaviorRating+".png");
                    $("#overAllRating").attr("src","assets/img/Rating/select_"+resultProblem.ProblemRecord[Problem].ContractorRating+".png");
                    $("#notesRating").text(resultProblem.ProblemRecord[Problem].NotesRating);
                    $(".contractorRating").show();
                  }
                  
              } else if (problemStatus2 == "Closed") {

                  $(".statusColor").html("");
                  var str = "Closed";
                  var result = str.fontcolor("purple");
                  $(".statusColor").html('<div class="md-card md-card-hover widthCardGal"> <div class="gallery_grid_item md-card-content" style="text-align:center;padding: 10px;border-left: 5px solid purple;">Closed</div> </div>');
                  $(".rescheduleshowbtn").hide();
                  $(".assignshowbtn").show();
                  $(".assignRescheduleBtn").addClass("btn-success");
                  $(".assignRescheduleBtn").removeClass("btn-warning");
                  $(".assignRescheduleBtn").text("Assign");
                  $(".btnStartWork").hide();
                  $(".btnEndWork").hide();
                  $("#inputStartDate").attr("disabled",true);
                  $("#inputStartTime").attr("disabled",true);
                  $("#inputEndDate").attr("disabled",true);
                  $("#inputEndTime").attr("disabled",true);
                  $("#btnClosedd").hide();
                  $("#btnApprove").hide();
                  $("#amountListData").hide();
                  $("#noteNewText").attr("disabled",true);
                  $(".btnAddNotes").attr("disabled",true);
                  $(".contractorRating").hide();
                  $(".specialityLists").hide();
              }
              if (localProblemStatus == "Closed") {
                  $("#btnClosedd-" + resultProblem.ProblemRecord[Problem].ProblemID).hide();
              } else {
                  $("#btnClosedd-" + resultProblem.ProblemRecord[Problem].ProblemID).show();
              }
              var clientName = FirstName;
              specialityID = resultProblem.ProblemRecord[Problem].SpecialityID;
              contractorID = resultProblem.ProblemRecord[Problem].ContractorID;
              localStorage.setItem("MyRequestContractorID", contractorID);
              for (getContractorVal in getAllContractorArr) {
                  if (getAllContractorArr[getContractorVal].SpecialityID == specialityID) {
                      $("#contractorValue").append("<option value='" + getAllContractorArr[getContractorVal].ContractorID + "'>" + getAllContractorArr[getContractorVal].ContractorName + "</option>");
                      if (getAllContractorArr[getContractorVal].ContractorID == contractorID) {
                          localStorage.setItem("MyRequest_ContractorName", getAllContractorArr[getContractorVal].ContractorName);
                      }
                  }
              }

              $("#getLoadingModalContent").removeClass('md-show');

              $("#contractorValue").select2();

              if (EmailID == null || EmailID == undefined) {
                  EmailID = "No EmailID found";
              }
              $(".emailID").text(EmailID);
              if (PhoneNumber == null || PhoneNumber == undefined) {
                  PhoneNumber = "No Phone Number Found";
              }
              $(".phoneNumber").text(PhoneNumber);
              if (EstimatedNotes == null || EstimatedNotes == undefined || EstimatedNotes == "") {
                  EstimatedNotes = "No Estimated Notes found";
              }
              $(".estimatedNotes").text(EstimatedNotes);
              if (EstimatedCost == null || EstimatedCost == undefined || EstimatedCost == "") {
                  EstimatedCost = "No Estimated Cost found";
                  $(".estimatedCost").text(EstimatedCost);
              } else {
                  $(".estimatedCost").text(EstimatedCost + " ( Estimated Cost )");
              }
              if (ProblemStartDate == "0000-00-00" || ProblemStartDate == null) {

              } else {
                  var getProbStartDate = ProblemStartDate.split("-");
                  var year = getProbStartDate[0];
                  var month = getProbStartDate[1];
                  var date = getProbStartDate[2];
                  var newStartDate = date + "." + month + "." + year;
                  $("#inputStartDate").val(newStartDate);

              }
              if (ProblemEndDate == "0000-00-00" || ProblemEndDate == null) {

              } else {
                  var getProbEndDate = ProblemEndDate.split("-");
                  var endYear = getProbEndDate[0];
                  var endMonth = getProbEndDate[1];
                  var endDate = getProbEndDate[2];
                  var newEndDate = endDate + "." + endMonth + "." + endYear;
                  $("#inputEndDate").val(newEndDate);

              }
              if (ProblemStartTime == null || ProblemStartTime == "") {

              } else {
                  $("#inputStartTime").val(ProblemStartTime);
              }
              if (ProblemEndTime == null || ProblemEndTime == "") {

              } else {
                  $("#inputEndTime").val(ProblemEndTime);
              }
              $(".md-input-wrapper").addClass("md-input-filled");
              
              for (getSpecialityVal in getAllSpecialityArr) {
                  if (getAllSpecialityArr[getSpecialityVal].SpecialityID == specialityID) {
                      $('#select2-specialityValue-container').html(getAllSpecialityArr[getSpecialityVal].SpecialityName);
                  }
              }
              if (FirstName == null || FirstName == undefined) {
                  FirstName = "No Tenant Name found";
              }
              if (whenToRespond == null || whenToRespond == undefined || whenToRespond == "") {
                  whenToRespond = "When Needed Not Found";
              }
              var getProblemCreateArr = ProblemDateTime.split(" ");
              var getCreateDate = getProblemCreateArr[0].split("-");
              if (UserImage == null || UserImage == "") {
                $(".getUserImage").attr('src','assets/img/sign-in.jpg');
              } else {
                if(userRegisterID == null || userRegisterID == 0){
                  $(".getUserImage").attr("src", domainAddress + UserImage);
                }
                else{
                  $(".getUserImage").attr("src", domainAddress + UserImage);
                }
                
              }
              $(".userRegisterName").text(FirstName);
              var getCreateMomentDate = getCreateDate[0] + getCreateDate[1] + getCreateDate[2];
              var createDate = getCreateDate[2] + "/" + getCreateDate[1] + "/" + getCreateDate[0];
              
              var getDate = moment(ProblemDateTime, "YYYY-MM-DD HH:mm:ss +00:00  [UTC]").local().format("YYYY-MM-DD HH:mm:ss +00:00 [UTC]");
              var timezone = jstz.determine();
              var getLocalZone = timezone.name();

              var getMoment = moment(getDate).tz(getLocalZone).format('YYYY-MM-DD HH:mm:ss [UTC]');
              getMoment = moment(getMoment).fromNow();
              if (getMoment == "Invalid date")
                  getMoment = moment(data.ProblemRecord[Problem].DateTime, "YYYY-MM-DD HH:mm:ss +00:00  [UTC]").local().fromNow();


              $(".whenDuration").text(getMoment);
              $(".getWhen").text(createDate); // + " ( raised " + getMoment + " )" is not needed

              $(".getWhenNeeded").text("( Available on "+moment(whenToRespond).format('DD/MM/YYYY,  h:mm A')+" )");
              $(".getAddress").text(getAddress);
              $(".problemNotes").html(Notes);
              $(".userNotes").html("<span><i class='fa fa-pencil-square-o userNotesEdits' id='editUserNotes-" + getProblemID + "'></i></span>");
              $(".NotesContent").html("");
              $(".contractorEdit").on('click', function() {
                  //console.log("contractor toggle click");
                  $(".showContractor").toggle();
                  $(".changeContractor").toggle();
              });
              var getStatusTxt = "";
              var adminUserName = localStorage.getItem("MyRequest_UserName");
              for (NotesDetails in resultProblem.ProblemRecord[Problem].ProblemNotes) {
                  var workLogID = resultProblem.ProblemRecord[Problem].ProblemNotes[NotesDetails].WorkLogID;
                  var status = resultProblem.ProblemRecord[Problem].ProblemNotes[NotesDetails].Status;
                  var content = resultProblem.ProblemRecord[Problem].ProblemNotes[NotesDetails].Content;
                  var createdDate = resultProblem.ProblemRecord[Problem].ProblemNotes[NotesDetails].CreatedDate;
                  var assignedBy = resultProblem.ProblemRecord[Problem].ProblemNotes[NotesDetails].AssignedBy;
                  var assignedByText = resultProblem.ProblemRecord[Problem].ProblemNotes[NotesDetails].AssignedBy;
                  var getProblemCreateArr = createdDate.split(" ");
                  var getCreateDate = getProblemCreateArr[0].split("-");
                  var getUserImage = resultProblem.ProblemRecord[Problem].ProblemNotes[NotesDetails].GetImage;
                  if (status == "contractorName") {
                      getStatusTxt = "Assigned Contractor Name : " + content;
                  } else if (status == "specialityName") {
                      getStatusTxt = "Assigned Speciality Name : " + content;
                  } else if (status == "Notes") {
                      getStatusTxt = "Notes - " + content;
                  } else if (status == "WorkStartDate") {
                      getStatusTxt = content;
                  } else if (status == "WorkEndDate") {
                      getStatusTxt = content;
                  } else if (status == "Approved") {
                      getStatusTxt = content;
                  } else if (status == "Rejected") {
                      getStatusTxt = content;
                  } else if (status == "Completed") {
                      getStatusTxt = content + "<span class='fixedCaseModal'><a id='clickimageview'> Click here to view the fixed image</a>&nbsp;<i class='fa fa-external-link' style='color:green; font-size:14px;' aria-hidden='true'></i></span>";
                  } else if (status == "Accepted") {
                      getStatusTxt = content;
                  } else if (status == "Rating") {
                      getStatusTxt = content;
                  } else if (status == "TNotes") {
                      getStatusTxt = "Tenant Notes - " + content;
                  } else if (status == "CNotes") {
                      getStatusTxt = "Contractor Notes - " + content;
                  } else if (status == "CheckIn") {
                      getStatusTxt = content;
                  } else if (status == "Assigned") {
                      getStatusTxt = content;
                  }
                  $(".fixedCaseModal").on('click', function() {
                      var modal = UIkit.modal("#fixedCaseModal");
                      $.get(domainAddress + "GetFixedImage/" + getProblemID, {}, function(resultFixedImage) {
                          $("#fixedImage").attr("src", "");
                          if (resultFixedImage.record_count == 0) {} else {
                              for (Problem in resultFixedImage.records) {
                                  problemID = resultFixedImage.records[Problem].ProblemID;
                                  var fixedImage = resultFixedImage.records[Problem].FixedImage;
                                  var getDate = resultFixedImage.records[Problem].FixedDate.split(" ");
                                  var fixedDateVal = getDate[0].split("-");
                                  $(".fixedNotes").text(resultFixedImage.records[Problem].FixedNotes);
                                  $(".fixedDate").text(fixedDateVal[2] + "." + fixedDateVal[1] + "." + fixedDateVal[0]);
                                  if (fixedImage == null || fixedImage == "") {
                                      $("#fixedImage").attr("src", "assets/img/no_image.jpg");
                                      $("#linkFixedImage").prop("href", "assets/img/no_image.jpg");
                                  } else {
                                      $("#fixedImage").attr("src", domainAddress + fixedImage);
                                      $("#linkFixedImage").prop("href", domainAddress + fixedImage);
                                  }
                              }
                          }
                          modal.show();
                      });
                  });



                  if (assignedBy == adminUserName) {
                      if (logo == "" || logo == null || logo == "null") {
                          getImgValue = "assets/img/sign-in.jpg";
                      } else {

                        var getLogoImagePath = logo.slice(0,4);
                        if(getLogoImagePath=="api/"){
                           getLogoImagePath = logo.slice(4);
                           getImgValue = domainAddress + getLogoImagePath;
                        }
                        else{
                           getImgValue = domainAddress + logo;
                        }

                          
                      }

                      $(".NotesContent").append("<li id='notesID-" + workLogID + "'  > <div class='uk-grid gridBox' data-uk-grid-margin> <div class='uk-width-medium-1-10'> <div class='parsley-row'>  <img class='avatar img-responsive gridAvatar' alt='' src='" + getImgValue + "' /> </div> </div> <div class='uk-width-medium-1-2'>  <div class='parsley-row'> <h5 class='userHeadText'>" + assignedByText + "</h5> </div>   <div class='parsley-row overflowContent'>  " + getStatusTxt + "  </div> </div>  <div class='uk-width-medium-1-3 dateTimePad'>  <div class='parsley-row lblDateTime'>" + moment(resultProblem.ProblemRecord[Problem].ProblemNotes[NotesDetails].CreatedDate).format('Do MMM YYYY,  h:mm a') + " </div> </div> </div>      <div class='uk-grid' data-uk-grid-margin style='margin-top: 0px;'>  <div class='uk-width-medium-1-1'>   </div> </div>  </li>");
                  } else {
                      if (getUserImage == "" || getUserImage == null || getUserImage == "null") {
                          getImgValue = "assets/img/sign-in.jpg";
                      } else {
                          getImgValue = domainAddress + getUserImage;
                      }
                      $(".NotesContent").append("<li id='notesID-" + workLogID + "'  > <div class='uk-grid gridBox' data-uk-grid-margin>  <div class='uk-width-medium-1-2'>  <div class='parsley-row'> <h5 class='userHeadText'>" + assignedByText + "</h5> </div>   <div class='parsley-row overflowContent' style='white-space: normal !important;'>  " + getStatusTxt + "  </div> </div>  <div class='uk-width-medium-1-3 dateTimePad'>  <div class='parsley-row lblDateTime'>" + moment(resultProblem.ProblemRecord[Problem].ProblemNotes[NotesDetails].CreatedDate).format('Do MMM YYYY,  h:mm a') + " </div> </div>  <div class='uk-width-medium-1-10'> <div class='parsley-row'>  <img class='avatar img-responsive gridUserAvatar' alt='' src='" + getImgValue + "' /> </div> </div> </div>        </li>");
                  }
              }

              if (UserImage == "" || UserImage == null || UserImage == "null") {
                  getImgValue = "assets/img/sign-in.jpg";
              } else {
                if(userRegisterID== null || userRegisterID == ""){
                  getImgValue = domainAddress + UserImage;
                }
                else{
                  getImgValue = domainAddress + UserImage;
                }
              }

              $(".NotesContent").append("<li id='notesID-0'> <div class='uk-grid gridBox'  data-uk-grid-margin>  <div class='uk-width-medium-1-2'>  <div class='parsley-row'> <h5 class='userHeadText'>" + clientName + "</h5> </div>   <div class='parsley-row'>  <div class='overflowContent'> " + Notes + " </div>  </div> </div>  <div class='uk-width-medium-1-3 dateTimePad'>  <div class='parsley-row lblDateTime'>" + moment(ProblemDateTime).format('Do MMM YYYY,  h:mm a') + " </div> </div>  <div class='uk-width-medium-1-10'> <div class='parsley-row'>  <img class='avatar img-responsive gridUserAvatar' alt='' src='" + getImgValue + "' /> </div> </div> </div>        </li>");

              var caseProperty = $("#select2-caseProperty-container").html();
              var wholeAddress = caseProperty + ", United Kingdom";
              // $(".googleMap").googleMap({
              //   zoom: 10,
              //   coords: [Latitude, Longitude],  
              //   type: "ROADMAP"  
              // });

              // $(".googleMap").html("<iframe src='https://maps.google.com/?q=" + Latitude + "," + Longitude + "&output=embed' width='100%' height='100%' frameborder='0' style='border:0'></iframe>");


              // $(".googleMap").googleMap({
              //      zoom: 10, // Initial zoom level (optional)
              //      type: "ROADMAP" // Map type (optional)
              //  });

              // $(".googleMap").addMarker({
              //     address: wholeAddress, // Postal address
              //     zoom: 10,
              //     draggable: true,
              //     success: function(e) {
              //         getLatitude = e.lat;
              //         getLongitude = e.lon;
              //     }
              // });

              console.log("Lat_Lon : " + Latitude + " || " + Longitude)


              if (Latitude != "" && Longitude != "" && Latitude != null && Longitude != null) {

                  var map = new GMaps({
                      div: 'googleMap',
                      lat: Latitude,
                      lng: Longitude,
                      zoom: 10,
                      type: "ROADMAP"
                  });

                  map.addMarker({
                      lat: Latitude,
                      lng: Longitude,
                      click: function(e) {
                          console.log('You clicked in this marker with location : ' + Latitude + " || " + Longitude);
                      },
                      dragend: function(e) {
                          console.log('dragend');
                      }
                  });

              } else {
                  $(".googleMap").html("<p style='text-align:center;color:red;'>No Location Found</p>")
              }


          }
         
          $("#btnClosedd").off('click').on('click', function(event) {
              UIkit.modal.confirm('Are you sure want to close the case?', function(e) {
                  console.log(e);
                  isArchiveStatus = 1;
                  var dataForm = '{"IsArchive":"' + isArchiveStatus + '"}';
                  var sendURL = domainAddress + 'UpdateProblemIsArchive/' + getProblemID;
                  console.log(sendURL);
                  $.ajax({
                      type: "POST",
                      url: sendURL,
                      data: dataForm,
                      success: function(dataCheck) {
                          console.log(dataCheck);
                          UIkit.modal.alert('Problem Closed Successfully');
                          window.location.href = "ListAllCase.html";
                      }
                  });
              });
          });
          /*********** To add new notes for particular Problem **********/
          $(".btnAddNotes").on('click', function() {
              
              var notesVal = $("#noteNewText").val();
              userID = localStorage.getItem("MyRequest_AdminID");
              var adminUserName = localStorage.getItem("MyRequest_UserName");
              if (notesVal == "") {
                  alert("Enter the Meesage");
                  return false;
              } else if (notesVal != "") {
                  $("#getLoadingModalContent").addClass('md-show');
                  var dataForm = '{"Status":"Notes","Content":"' + notesVal + '","ProblemID":"' + getProblemID + '","AssignedBy":"' + adminUserName + '","ProblemStatus":"' + problemStatus2 + '","Approved":"","Rating":"", "WorkStatusDateTime":"'+moment().format('YYYY-MM-DD HH:mm:ss')+'"}';
                  console.log(dataForm);
                  problemStatus2 = localStorage.getItem("MyRequestStatus");
                  userRegisterID = localStorage.getItem("MyRequestUserRegisterID");
                  console.log("User ID for token : " + userRegisterID + " Status : " + problemStatus2);
                  var sendURL = domainAddress + 'addNotesForProblem';
                  console.log(sendURL);
                  $.ajax({
                      type: "POST",
                      url: sendURL,
                      data: dataForm,
                      success: function(dataCheck) {
                              console.log(dataCheck);
                              $.post(domainAddress + "/push/messageSendByAdminForNotes.php", {
                                  ContractorID:contractorID,
                                  TenantID:userRegisterID,
                                  AdminID:adminUserID,
                                  Title:'Message From Letting Agent',
                                  ToContractor:pushMessageAdminNotes.format(requestID,notesVal),
                                  ToTenant:pushMessageAdminNotes.format(requestID,notesVal),
                                  ForBoth:1,
                                  CaseID:getProblemID
                              }, function(e) {
                                  console.log(e);
                              });

                              // $.get(domainAddress + "/push/AdminToTenant.php", {
                              //     getUserTenantID: userRegisterID,
                              //     AdminID: adminUserID,
                              //     Message: notesVal + " by Admin, for Request # ",
                              //     CaseID: getProblemID
                              // }, function(e) {
                              //     console.log(e);
                              // });
                              // $.get(domainAddress + "/push/AdminToContractor.php", {
                              //     getContractorID: contractorID,
                              //     AdminID: adminUserID,
                              //     Message: notesVal + " by Admin, for Request # ",
                              //     CaseID: getProblemID
                              // }, function(e) {
                              //     console.log(e);
                              // });
                              // $.get(domainAddress + "/push/AdminToSubAdmin.php", {
                              //     AdminID: adminUserID,
                              //     Message: notesVal + " by Admin, for Request # ",
                              //     CaseID: getProblemID
                              // }, function(e) {
                              //     console.log(e);
                              // });

                              $("#noteNewText").val('');
                              $("#getLoadingModalContent").removeClass('md-show');
                              // $(".addNewNotesText").show();
                              // $(".noteHide").hide();
                              // $(".addNewNotes").hide();
                              getDbReportProblem(getProblemID);
                              UIkit.modal.alert('Message Posted Successfully');
                          } // success
                  }); // ajax     
              } // else if(notesVal != "")
          }); // btnAddNotes
          /*********** End - To add new notes for particular Problem **********/
          getContractorsApplied(getProblemID);
      }); // GetParticularProblem
      /********** To get Particular Problem Details - End ********/
      
  } // getDbReportProblem