  $(function() {
            var getCountry = localStorage.getItem("MyRequest_countryCode");
            switch(getCountry){
                case "UK":
                    $("#dashTotalIcon").removeClass();
                    $("#dashTotalIcon").addClass("fa fa-gbp");
                    $("#repairChargeIcon").removeClass();
                    $("#repairChargeIcon").addClass("fa fa-gbp");
                    $("#commissionEarnedIcon").removeClass();
                    $("#commissionEarnedIcon").addClass("fa fa-gbp");
                    break;
                case "US":
                    $("#dashTotalIcon").removeClass();
                    $("#dashTotalIcon").addClass("fa fa-usd");
                    $("#repairChargeIcon").removeClass();
                    $("#repairChargeIcon").addClass("fa fa-usd");
                    $("#commissionEarnedIcon").removeClass();
                    $("#commissionEarnedIcon").addClass("fa fa-usd");
                    break;
                case "India":
                    $("#dashTotalIcon").removeClass();
                    $("#dashTotalIcon").addClass("fa fa-inr");
                    $("#repairChargeIcon").removeClass();
                    $("#repairChargeIcon").addClass("fa fa-inr");
                    $("#commissionEarnedIcon").removeClass();
                    $("#commissionEarnedIcon").addClass("fa fa-inr");
                    break;
                case "Canada":
                    $("#dashTotalIcon").removeClass();
                    $("#dashTotalIcon").addClass("fa fa-usd");
                    $("#repairChargeIcon").removeClass();
                    $("#repairChargeIcon").addClass("fa fa-usd");
                    $("#commissionEarnedIcon").removeClass();
                    $("#commissionEarnedIcon").addClass("fa fa-usd");
                    break;
            }


            $('#full_screen_toggle').on('click',function(e) {
                e.preventDefault();
                screenfull.toggle();
                $window.resize();
            })
            var $switcher = $('#style_switcher'),
                $switcher_toggle = $('#style_switcher_toggle'),
                $theme_switcher = $('#theme_switcher'),
                $mini_sidebar_toggle = $('#style_sidebar_mini');
            $switcher_toggle.click(function(e) {
                e.preventDefault();
                $switcher.toggleClass('switcher_active');
            });
            $theme_switcher.children('li').click(function(e) {
                e.preventDefault();
                var $this = $(this),
                    this_theme = $this.attr('data-app-theme');
                $theme_switcher.children('li').removeClass('active_theme');
                $(this).addClass('active_theme');
                $('body')
                    .removeClass('app_theme_a app_theme_b app_theme_c app_theme_d app_theme_e app_theme_f app_theme_g')
                    .addClass(this_theme);
                if (this_theme == '') {
                    localStorage.removeItem('altair_theme');
                } else {
                    localStorage.setItem("altair_theme", this_theme);
                }
            });
            // change input's state to checked if mini sidebar is active
            if ((localStorage.getItem("altair_sidebar_mini") !== null && localStorage.getItem("altair_sidebar_mini") == '1') || $('body').hasClass('sidebar_mini')) {
                $mini_sidebar_toggle.iCheck('check');
            }
            // toggle mini sidebar
            $mini_sidebar_toggle
                .on('ifChecked', function(event) {
                    $switcher.removeClass('switcher_active');
                    localStorage.setItem("altair_sidebar_mini", '1');
                    location.reload(true);
                })
                .on('ifUnchecked', function(event) {
                    $switcher.removeClass('switcher_active');
                    localStorage.removeItem('altair_sidebar_mini');
                    location.reload(true);
                });
            // hide style switcher
            $document.on('click keyup', function(e) {
                if ($switcher.hasClass('switcher_active')) {
                    if (
                        (!$(e.target).closest($switcher).length) ||
                        (e.keyCode == 27)
                    ) {
                        $switcher.removeClass('switcher_active');
                    }
                }
            });
            if (localStorage.getItem("altair_theme") !== null) {
                $theme_switcher.children('li[data-app-theme=' + localStorage.getItem("altair_theme") + ']').click();
            }
        });
        var getBlockDates = new Array();
        var newItem = {};
        var getContractorBlockDates = new Array();
        var newContractorItem = {};
        var getProblemID = 0;
        var getCaseID = "";
        var getContractorName = "";
        var getProblemNotes = "";
        var getStartDate = "";
        var getEndDate = "";
        var getProblemStatus = "";
        var getAssignStatus = "";
        var getColor = "";
        var getTitle = "";
        var getMessages = "";
        var pieChartData = new Array();
        var statusCount = {};
        var getColor = "";
        var adminUserID = 0;
        var getTotalAmount = 0;
        var adminUserName = "";
        var imageUrl1 = "";
        var inputWhenDate = "";
        var inputWhenTime = "";
        var getDate = "";
        var countDateTime = 0;

        $(window).load(function () {
            $("#getLoadingModalContent").removeClass('md-show');
        });
        $(document).ready(function() {
            console.log("ready call");
            adminUserID = localStorage.getItem("MyRequest_AdminID");
            adminUserName = localStorage.getItem("MyRequest_UserName");
            var adminType = localStorage.getItem("MyRequest_AdminType");
            var businessName = localStorage.getItem("MyRequest_BusinessName");
           
            var logo = localStorage.getItem("MyRequest_Logo");
            if (adminType == "SuperAdmin") {
                $(".myRequestAdminLogo").addClass("requestAdminLogo");
                $(".requestAdminLogo").removeClass("myRequestAdminLogo");
                $(".createCaseButton").hide();
                $("#lettingAgentMenu").hide();
                $("#superAdminMenu").show();
            }
            else{
                $(".myRequestAdminLogo").removeClass("requestAdminLogo");
                $("#lettingAgentMenu").show();
                $("#superAdminMenu").hide();
            }

             $(".md-overlay").css("background","rgba(0,0,0,0.5)");
             $("#getLoadingModalContent").addClass('md-show');
            
            var isFilled = localStorage.getItem("MyRequest_profileFill");
            if (isFilled == "true") {

                window.location.href = domainAgentAddress+'MyProfile.html';
            }

             
            var getNumberOfDays = (parseInt(localStorage.getItem("MyRequest_myDiffDate")) / 30) * 100;
            $(".noOfDays").prop("data-percent", getNumberOfDays);
            $(".noOfDays").attr("data-percent", getNumberOfDays);

            localStorage.setItem("MyRequest_RepairStatus", "");
            if (adminUserID == "" || adminUserID == null) {
                window.location.href = "index.html";
            } else {
                $(".getUserName").text(adminUserName);
            }   
            if (adminType == "SuperAdmin") {
                $(".forAdmin").hide();
                $(".forSuperAdmin").show();
                $("#pieChartLoc").show();
                $(".getLettingAgencyBusinessName").text("Dashboard");
                $.get(domainAddress + "GetDashboardDetailsForSuperAdmin", {}, function(result) {
                    for (var getDashBoardValuesForSuperadmin in result.records) {
                        $("#dashComplaints").text(result.records[getDashBoardValuesForSuperadmin].TotalComplaints);
                        $("#dashOpen1").text(result.records[getDashBoardValuesForSuperadmin].NoOpen);
                        $("#dashClose").text(result.records[getDashBoardValuesForSuperadmin].NoCompleted);
                         
                        if(result.records[getDashBoardValuesForSuperadmin].TotalAmount.length > 7){
                            $("#dashAmount").css("font-size","20px");
                        }
                        else{
                            $("#dashAmount").css("font-size","24px");
                        }
                        $("#dashAmount").text(result.records[getDashBoardValuesForSuperadmin].TotalAmount);

                        getTotalAmount = result.records[getDashBoardValuesForSuperadmin].TotalAmount;
                        $(".dashTotalAmount").text(getTotalAmount);
                        var totPerComplaints = parseInt(result.records[getDashBoardValuesForSuperadmin].NoOpen) / parseInt(result.records[getDashBoardValuesForSuperadmin].TotalAmount);
                        totPerComplaints = totPerComplaints * 100;
                    }
                });


                 $.get(domainAddress + 'GetTotalTenantsForSuperAdmin', {}, function(result) {
                    if(result.record_count == 0){
                        $("#dashTenants").text(result.record_count);
                    }else{
                        $("#dashPproperties").text(result.record_count);
                        $("#dashTenants").text(result.records[0].TenantCount);
                        $(".noOfAppInstalled").text(result.records[0].TenantCountInstalledApp);
                        $(".noOfTenants").text(result.records[0].TenantCount);
                        var totalCount = parseInt(result.records[0].TenantCountInstalledApps) / parseInt(result.records[0].TenantCount);
                        totalCount = parseInt(totalCount * 100);
                        $(".noOfApps").prop("data-percent", totalCount);
                        $(".noOfApps").attr("data-percent", totalCount);
                    }
                });


                 $.get(domainAddress + 'GetTotalTenantContractorsForSuperAdmin', {}, function(result) {
                    //console.log(result);
                    if (result.record_count == 0) {
                       
                    } else {
                          
                        if(result.records[1].TotalAppContractors==null){
                            result.records[1].TotalAppContractors = 0;
                        }
                        $(".noOfAppContractors").text(result.records[1].TotalAppContractors);
                        $(".noOfContractors").text(result.records[1].TotalContractors);
                        var totalContrtorCount = parseInt(result.records[1].TotalAppContractors) / parseInt(result.records[1].TotalContractors);
                        totalContrtorCount = parseInt(totalContrtorCount * 100);
                        $(".noOfContractorApps").prop("data-percent", totalContrtorCount);
                        $(".noOfContractorApps").attr("data-percent", totalContrtorCount);
                    }   
                });

                $.get(domainAddress + "GetAllProblemWorkStatusCount", {}, function(result) {
                    //console.log(result);

                    for (var problemStatusCount in result.records) {
                        if (result.records[problemStatusCount].ProblemStatus == "Awaiting Info") {
                            getColor = "lightblue";
                            $(".awaitingInfoCount").text("(" + result.records[problemStatusCount].CountTotal + ")");
                        } else if (result.records[problemStatusCount].ProblemStatus == "Assigned") {
                            getColor = "lightgrey";
                            $(".assignedCount").text("(" + result.records[problemStatusCount].CountTotal + ")");
                        } else if (result.records[problemStatusCount].ProblemStatus == "Awaiting Approval") {
                            getColor = "#0097a7";
                            $(".awaitingApprovalCount").text("(" + result.records[problemStatusCount].CountTotal + ")");
                        } else if (result.records[problemStatusCount].ProblemStatus == "Approved") {
                            getColor = "blue";
                            $(".approvedCount").text("(" + result.records[problemStatusCount].CountTotal + ")");
                        } else if (result.records[problemStatusCount].ProblemStatus == "Completed") {
                            getColor = "green";
                            $(".completedCount").text("(" + result.records[problemStatusCount].CountTotal + ")");
                        } else if (result.records[problemStatusCount].ProblemStatus == "Closed") {
                            getColor = "purple";
                            $(".closedCount").text("(" + result.records[problemStatusCount].CountTotal + ")");
                        } else if (result.records[problemStatusCount].ProblemStatus == "CheckIn") {
                            getColor = "orange";
                            $(".closedCountAdmin").text("(" + result.records[problemStatusCount].CountTotal + ")");
                        } else if (result.records[problemStatusCount].ProblemStatus == "Started") {
                            getColor = "brown";
                            $(".closedCountAdmin").text("(" + result.records[problemStatusCount].CountTotal + ")");
                        }

                        statusCount = {
                            value: result.records[problemStatusCount].CountTotal,
                            color: getColor,
                            label: result.records[problemStatusCount].ProblemStatus,
                        };

                        pieChartData.push(statusCount);
                        //console.log(pieChartData);
                    }
                   
                    var myLine = new Chart(document.getElementById("smallPieChartLocAdmin").getContext("2d")).Pie(pieChartData);
                }); // GetAllProblemWorkStatusCount


                $.get(domainAddress + "GetUtilityStatusCountForSuperAdmin", {}, function(result) {
                    console.log(result.countMoveIn+ "++++" + result.countMoveOut);
                        $(".countUpMoveIn").html(result.countMoveIn);
                        $(".countUpMoveOut").text(result.countMoveOut);
                      
                 });//GetAllUtilityStatusCountAdmin


                $.get(domainAddress + "GetAllApprovalListRequestForSuperAdmin", {}, function(result) {
                    //console.log(result);
                    $(".noOfApprovalRequired").text(result.record_count);
                });

                getLastTwoDaysMessages(0);

                getPropertyExpiryInfo(0);

                getTenantUtilityStatus(0);

            } else {
                getDateDiff(adminUserID);
                $(".forAdmin").show();
                $(".forSuperAdmin").hide();
                $("#pieChartLoc").hide();

                $(".getLettingAgencyBusinessName").text("Dashboard - " + businessName);
                if(logo==undefined || logo==null || logo=="undefined" || logo=="Fail upload folder with read access."){
                    $(".myRequestAdminLogo").attr("src", "assets/img/myRequestLogo.png").show();
                 }
                 else{
                    $(".myRequestAdminLogo").attr("src", domainAddress + logo).show();
                    var getLogoImagePath = logo.slice(0,4);
                    if(getLogoImagePath=="api/"){
                        getLogoImagePath = logo.slice(4);
                        $(".myRequestAdminLogo").attr("src", domainAddress + getLogoImagePath).show();
                    }
                    else{
                        $(".myRequestAdminLogo").attr("src", domainAddress + logo).show();
                    }
                 }
                
                $.get(domainAddress + 'getDashboardDetails/' + adminUserID, {}, function(result) {
                    for (var getDashBoardValues in result.records) {
                        if(result.records[getDashBoardValues].TotalAmount==null){
                            result.records[getDashBoardValues].TotalAmount=0;
                        }
                        if(result.records[getDashBoardValues].NoCompleted==null){
                            result.records[getDashBoardValues].NoCompleted=0;
                        }
                        if(result.records[getDashBoardValues].NoOpen==null){
                            result.records[getDashBoardValues].NoOpen=0;
                        }
                        $("#dashCompleted").text(result.records[getDashBoardValues].NoCompleted);
                        $("#dashOpen1").text(result.records[getDashBoardValues].NoOpen);
                        $("#dashAmount").text(result.records[getDashBoardValues].TotalAmount);
                        $(".dashComplaints").text(result.records[getDashBoardValues].TotalComplaints);
                        //$("#dashPproperties").text(result.records[getDashBoardValues].TotalProperty);
                        $("#dashTenants").text(result.records[getDashBoardValues].TotalTenants);
                        $(".dashTenants").text(result.records[getDashBoardValues].TotalProperty);
                        var Daysleft = result.records[getDashBoardValues].DateDiff;
                        if(Daysleft == 0){
                             $(".dashTotalDaysLeft").text(Daysleft);
                        }
                        else if (Daysleft<0){
                            $(".dashTotalDaysLeft").text(Daysleft+ " Days Behind");
                        }
                        else {
                            $(".dashTotalDaysLeft").text(Daysleft+ " Days To Go");
                        }
                        

                        if (result.records[getDashBoardValues].TotalProperty != null)
                            getTotalAmount = parseFloat(result.records[getDashBoardValues].TotalProperty) * parseFloat(0.75);
                        else
                            getTotalAmount = 0;
                        $(".dashTotalAmount").text(getTotalAmount);
                        var totPerComplaints = parseInt(result.records[getDashBoardValues].NoOpen) / parseInt(result.records[getDashBoardValues].TotalAmount);
                        totPerComplaints = totPerComplaints * 100;
                    }
                }); 
                

                $.get(domainAddress + "GetAllUtilityStatusCountAdmin1/" + adminUserID, {}, function(result) {
                    //console.log(result);
                    console.log(result.countMoveIn+ "+" + result.countMoveOut);
                    console.log(domainAddress + "GetAllUtilityStatusCountAdmin1/" + adminUserID);
                        $(".countUpMoveIn").html(result.countMoveIn);
                        $(".countUpMoveOut").text(result.countMoveOut);
                      
                 });//GetAllUtilityStatusCountAdmin

                $.get(domainAddress + 'GetTotalTenants/' + adminUserID, {}, function(result) {
                    if(result.record_count == 0){
                        $("#dashTenants").text(result.record_count);
                       
                    }else{
                        $("#dashPproperties").text(result.record_count);
                        $(".noOfAppInstalled").text(result.records[0].TenantCountInstalledApp);
                        $(".noOfTenants").text(result.records[0].TenantCount);
                        var totalCount = parseInt(result.records[0].TenantCountInstalledApp) / parseInt(result.records[0].TenantCount);
                        totalCount = parseInt(totalCount * 100);
                        $(".countTenantAppInstalled").prop("data-percent", totalCount);
                        $(".countTenantAppInstalled").attr("data-percent", totalCount);
                    }
                });
                $.get(domainAddress + 'GetAdminTenantContractorListCount/' + adminUserID, {}, function(result) {
                    //console.log(result);
                    if (result.record_count == 0) {
                       
                    } else {
                          
                        if(result.records[1].TotalAppContractors==null){
                            result.records[1].TotalAppContractors = 0;
                        }
                        $(".noOfAppContractors").text(result.records[1].TotalAppContractors);
                        $(".noOfContractors").text(result.records[1].TotalContractors);
                        var totalContrtorCount = parseInt(result.records[1].TotalAppContractors) / parseInt(result.records[1].TotalContractors);
                        totalContrtorCount = parseInt(totalContrtorCount * 100);
                        $(".countContractorAppInstalled").prop("data-percent", totalContrtorCount);
                        $(".countContractorAppInstalled").attr("data-percent", totalContrtorCount);
                    }   
                });
                    
                getLastTwoDaysMessages(adminUserID);         
    
                $.get(domainAddress + 'GetWorkNotesDetails/' + adminUserID, {}, function(result) {
                    //console.log(result);
                    $(".notesContent").html('');
                    if (result.record_count == 0) {
                        $(".notesContent").html("<p>No records found</p>");
                    } else {
                        for (workLogNotes in result.records) {
                            var getDateTime = result.records[workLogNotes].WorkCreatedDate.split(" ");
                            var getCreateDate = getDateTime[0];
                            var getDate = getCreateDate.split("-");
                            var getStatus = result.records[workLogNotes].Status;
                            var logo = result.records[workLogNotes].GetImage;

                            if (logo == "assets/img/sign-in.jpg") {
                                logo = "assets/img/sign-in.jpg";
                            } else {
                                
                                if(result.records[workLogNotes].WorkAssignedBy==adminUserName){
                                    logo = domainAddress + logo;
                                }
                                else{
                                    logo = domainAddress + logo;
                                }
                            }

                            if (getStatus == "Notes") {
                                $(".notesContent").append("<li id='notesID-" + result.records[workLogNotes].WorkLogID + "' style='border-bottom: 1px solid #A9A4A4;'> <div class='uk-grid' data-uk-grid-margin> <div class='uk-width-medium-1-10'> <div class='parsley-row'>  <img class='avatar img-responsive' alt='' src='" + logo + "' style='height: 40px;min-width: 40px;'/> </div> </div> <div class='uk-width-medium-1-2'>  <div class='parsley-row'> <h3>" + result.records[workLogNotes].WorkAssignedBy + "</h3> </div> </div>  <div class='uk-width-medium-1-3'>  <div class='parsley-row' style='float: right;font-size: 11px;'>"+moment(result.records[workLogNotes].WorkCreatedDate).format('Do MMM YYYY,  h:mm a')+" </div> </div> </div>      <div class='uk-grid' data-uk-grid-margin style='margin-top: 0px;'> <div class='uk-width-medium-1-10'> <div class='parsley-row'>   </div> </div> <div class='uk-width-medium-1-2'>  <div class='parsley-row'>  " + result.records[workLogNotes].Content + "  </div> </div>    </div>   <br/>  <div class='uk-grid' data-uk-grid-margin style='margin-top: 0px;'> <div class='uk-width-medium-1-10'> <div class='parsley-row'>   </div> </div> <div class='uk-width-medium-1-2'>  <div class='parsley-row'>  ( Case #" + result.records[workLogNotes].ProblemID + " )  </div> </div>    </div>  </li>");
                            }

                            if (getStatus == "TNotes") {
                                $(".notesContent").append("<li id='notesID-" + result.records[workLogNotes].WorkLogID + "' style='border-bottom: 1px solid #A9A4A4;'> <div class='uk-grid' data-uk-grid-margin> <div class='uk-width-medium-1-10'> <div class='parsley-row'>  <img class='avatar img-responsive' alt='' src='" + logo + "' style='height: 40px;min-width: 40px;'/> </div> </div> <div class='uk-width-medium-1-2'>  <div class='parsley-row'> <h3>" + result.records[workLogNotes].WorkAssignedBy + "</h3> </div> </div>  <div class='uk-width-medium-1-3'>  <div class='parsley-row' style='float: right;font-size: 11px;'>"+moment(result.records[workLogNotes].WorkCreatedDate).format('Do MMM YYYY,  h:mm a')+" </div> </div> </div>      <div class='uk-grid' data-uk-grid-margin style='margin-top: 0px;'> <div class='uk-width-medium-1-10'> <div class='parsley-row'>   </div> </div> <div class='uk-width-medium-1-2'>  <div class='parsley-row'>  " + result.records[workLogNotes].Content + "  </div> </div>  </div>   <br/>  <div class='uk-grid' data-uk-grid-margin style='margin-top: 0px;'> <div class='uk-width-medium-1-10'> <div class='parsley-row'>   </div> </div> <div class='uk-width-medium-1-2'>  <div class='parsley-row'>  ( Case #" + result.records[workLogNotes].ProblemID + " )  </div> </div>    </div> </li>");

                            }

                            if (getStatus == "CNotes") {
                                $(".notesContent").append("<li id='notesID-" + result.records[workLogNotes].WorkLogID + "' style='border-bottom: 1px solid #A9A4A4;'> <div class='uk-grid' data-uk-grid-margin> <div class='uk-width-medium-1-10'> <div class='parsley-row'>  <img class='avatar img-responsive' alt='' src='" + logo + "' style='height: 40px;min-width: 40px;'/> </div> </div> <div class='uk-width-medium-1-2'>  <div class='parsley-row'> <h3>" + result.records[workLogNotes].WorkAssignedBy + "</h3> </div> </div>  <div class='uk-width-medium-1-3'>  <div class='parsley-row' style='float: right;font-size: 11px;'>"+moment(result.records[workLogNotes].WorkCreatedDate).format('Do MMM YYYY,  h:mm a')+" </div> </div> </div>      <div class='uk-grid' data-uk-grid-margin style='margin-top: 0px;'> <div class='uk-width-medium-1-10'> <div class='parsley-row'>   </div> </div> <div class='uk-width-medium-1-2'>  <div class='parsley-row'>  " + result.records[workLogNotes].Content + "  </div> </div>  </div>   <br/>  <div class='uk-grid' data-uk-grid-margin style='margin-top: 0px;'> <div class='uk-width-medium-1-10'> <div class='parsley-row'>   </div> </div> <div class='uk-width-medium-1-2'>  <div class='parsley-row'>  ( Case #" + result.records[workLogNotes].ProblemID + " )  </div> </div>    </div> </li>");
                            }   

                            $(".notesContent").append("<input type='hidden' id='hiddenProblemID-" + result.records[workLogNotes].WorkLogID + "' value='" + result.records[workLogNotes].ProblemID + "' /> ");

                        }


                    }   
                }); 



                $.get(domainAddress + "GetAllApprovalList/" + adminUserID, {}, function(result) {
                    //console.log(result);
                    $(".getAllApprovalList").html('');
                    if (result.record_count == 0) {
                        $(".getAllApprovalList").html('<tr class="uk-table-middle"> <td class="uk-width-3-10 uk-text-nowrap">No records found</td>  <td></td> <td></td> </tr> ');
                    } else {
                        $(".noOfApprovalRequired").text(result.record_count);
                        for (var getApprovalList in result.records) {
                            var getDateArr = result.records[getApprovalList].DateTime.split(" ");
                            var receivedDate = getDateArr[0].split("-");
                            var getReceivedDate = receivedDate[2] + "." + receivedDate[1] + "." + receivedDate[0];
                            $(".getAllApprovalList").append('<tr class="uk-table-middle"> <td class="uk-width-3-10 uk-text-nowrap"><a href="particularProblem.php?ProblemID=' + result.records[getApprovalList].ProblemID + '">' + result.records[getApprovalList].ProblemID + ' - ' + result.records[getApprovalList].SpecialityName + '</a></td>  <td class="uk-width-3-10 uk-text-nowrap">' + getReceivedDate + '</td> <td class="uk-width-3-10 uk-text-nowrap"> <input type="checkbox" class="isApprove" id="isApprove-' + result.records[getApprovalList].ProblemID + '"  data-on-label="Approve"></td></tr> <input type="hidden" id="hiddenContractorID-' + result.records[getApprovalList].ProblemID + '" value="' + result.records[getApprovalList].ContractorID + '" /> <input type="hidden" id="hiddenUserRegisterID-' + result.records[getApprovalList].ProblemID + '" value="' + result.records[getApprovalList].UserRegisterID + '" />');
 
                        }
                        /********* To Change IsApprove User Review - Start **********/
                        $('.isApprove').on('switch-change', function(e, data) {
                            var getProblemID = this.id.replace('isApprove-', '');
                            var $element = $(data.el),
                                value = data.value;
                            var contractorID = $("#hiddenContractorID-" + getProblemID).val();
                            var userRegisterID = $("#hiddenUserRegisterID-" + getProblemID).val();
                            var isApproveStatus = "";

                            if (value == true) {    
                                UIkit.modal.confirm('Are you sure?', function(e) {
                                    console.log(e);
                                    var problemStatus = "Approved";
                                    //var getprobId = "<?php echo $problemID; ?>";

                                    var dataForm = '{"ProblemStatus":"' + problemStatus + '","Status":""}';
                                    console.log(dataForm);

                                    var sendURL = domainAddress + 'updateProblemStatus/' + getProblemID;
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
                                                $.get(domainAddress + "/push/AdminToContractor.php", {
                                                    getContractorID: contractorID,
                                                    AdminID: adminUserID,
                                                    Message: "Approved by Admin , for Case # ",
                                                    CaseID: getProblemID
                                                }, function(e) {
                                                    console.log(e);
                                                    $.get(domainAddress + "/push/AdminToTenant.php", {
                                                        getUserTenantID: userRegisterID,
                                                        AdminID: adminUserID,
                                                        Message: "Approved by Admin , for Case # ",
                                                        CaseID: getProblemID
                                                    }, function(e) {
                                                        console.log(e);
                                                    }); // /push/AdminToTenant.php
                                                }); // /push/AdminToContractor.php
                                            } // success
                                    }); // ajax
    
                                });
            
        
                            } else {
                                UIkit.modal.confirm('Are you sure?', function() {
                                    var problemStatus = "Awaiting Approval";
                                    //var getprobId = "<?php echo $problemID; ?>";

                                    var dataForm = '{"ProblemStatus":"' + problemStatus + '","Status":""}';
                                    console.log(dataForm);

                                    var sendURL = domainAddress + 'updateProblemStatus/' + getProblemID;
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
                                                $.get(domainAddress + "/push/AdminToContractor.php", {
                                                    getContractorID: contractorID,
                                                    AdminID: adminUserID,
                                                    Message: "Approved by Admin , for Case # ",
                                                    CaseID: getProblemID
                                                }, function(e) {
                                                    console.log(e);
                                                    $.get(domainAddress + "/push/AdminToTenant.php", {
                                                        getUserTenantID: userRegisterID,
                                                        AdminID: adminUserID,
                                                        Message: "Approved by Admin , for Case # ",
                                                        CaseID: getProblemID
                                                    }, function(e) {
                                                        console.log(e);
                                                    }); // /push/AdminToTenant.php
                                                }); // /push/AdminToContractor.php
                                            } // success
                                    }); // ajax

                                });




                            }
                        });
                        /********* End To Change IsApprove User Review - Start **********/
                    }
                });

    
                $.get(domainAddress + "GetAllProblemWorkStatusCountAdmin/" + adminUserID, {}, function(result) {
                    //console.log(result);
                    if(result.record_count==0){
                        $(".getRepairStatus").show();
                        $("#repairStatus").text("No status found");
                    }
                    else{
                        $(".getRepairStatus").show();
                        for (var problemStatusCount in result.records) {
                           if (result.records[problemStatusCount].ProblemStatus == "Awaiting Info") {
                               getColor = "#FFA500 ";
                               $(".awaitingInfoCountAdmin").html("(" + result.records[problemStatusCount].CountTotal + ")");
                           } else if (result.records[problemStatusCount].ProblemStatus == "Assigned") {
                               getColor = "#FFD605 ";
                               $(".assignedCountAdmin").text("(" + result.records[problemStatusCount].CountTotal + ")");
                           } else if (result.records[problemStatusCount].ProblemStatus == "Awaiting Approval") {
                               getColor = "#C8C8C8 ";
                               $(".awaitingApprovalCountAdmin").text("(" + result.records[problemStatusCount].CountTotal + ")");
                           } else if (result.records[problemStatusCount].ProblemStatus == "Approved") {
                               getColor = "#00FB82 ";
                               $(".approvedCountAdmin").text("(" + result.records[problemStatusCount].CountTotal + ")");
                           } else if (result.records[problemStatusCount].ProblemStatus == "Completed") {
                               getColor = "#D1A172 ";
                               $(".completedCountAdmin").text("(" + result.records[problemStatusCount].CountTotal + ")");
                           } else if (result.records[problemStatusCount].ProblemStatus == "Closed") {
                               getColor = "#434343 ";
                               $(".closedCountAdmin").text("(" + result.records[problemStatusCount].CountTotal + ")");
                           } else if (result.records[problemStatusCount].ProblemStatus == "CheckIn") {
                               getColor = "#009ADF ";
                               $(".checkInCountAdmin").text("(" + result.records[problemStatusCount].CountTotal + ")");
                           } else if (result.records[problemStatusCount].ProblemStatus == "Started") {
                               getColor = "#EF66BE ";
                               $(".startedCountAdmin").text("(" + result.records[problemStatusCount].CountTotal + ")");
                           }

                           statusCount = {
                               value: result.records[problemStatusCount].CountTotal,
                               color: getColor,
                               label: result.records[problemStatusCount].ProblemStatus,
                           };

                           pieChartData.push(statusCount);
                           //console.log(pieChartData);
                       }
                        //var myLine = new Chart(document.getElementById("pieChartLocAdmin").getContext("2d")).Pie(pieChartData);
                        var myLine = new Chart(document.getElementById("smallPieChartLocAdmin").getContext("2d")).Pie(pieChartData);
                    }
                    
                }); // GetAllProblemWorkStatusCount 

                


                $.get(domainAddress + "GetAllSpecialityList/"+adminUserID, {}, function(result) {
                    //console.log(result);
                    $("#caseSpecialisation").html('');
                    $("#calSpecialisation").html('');
                    if(result.record_count==0){
                        $("#caseSpecialisation").html("<option value='0'>Select the Speciality</option>");
                        $("#calSpecialisation").html("<option value='0'>Select the Speciality</option>");
                        $("#caseSpecialisation").html("<option value='0'>No Speciality Found</option>");
                        $("#calSpecialisation").html("<option value='0'>No Speciality Found</option>");
                    }
                    else{
                        $("#caseSpecialisation").html("<option value='0'>Select the Speciality</option>");
                        $("#calSpecialisation").html("<option value='0'>Select the Speciality</option>");
                        for (var Speciality in result.records) {
                            $("#caseSpecialisation").append("<option value='" + result.records[Speciality].SpecialityID + "'>" + result.records[Speciality].SpecialityName + "</option>");
                            $("#calSpecialisation").append("<option value='" + result.records[Speciality].SpecialityID + "'>" + result.records[Speciality].SpecialityName + "</option>");
                        }
                        $("#caseContractor").html("");
                        $("#caseContractor").html("<option value='0'>Select the Speciality to view Contractor</option>");
                    }
                    $("#caseSpecialisation").select2();
                    $("#caseContractor").select2();
                }); // GetAllEventList

                $.get(domainAddress + "GetPropertyName/" + adminUserID, {}, function(result) {
                    //console.log(result);
                    $("#caseProperty").html('');
                    if(result.record_count==0){
                        $("#caseProperty").html("<option value='0' ref='0'>Select the Property</option>");
                        $("#caseProperty").html("<option value='0' ref='0'>No Property Found</option>");
                    }
                    else{
                        $("#caseProperty").html("<option value='0' ref='0'>Select the Property</option>");
                        for (var Property in result.records) {
                            if(result.records[Property].PropertyRegister != undefined && result.records[Property].PropOwnerName != undefined && result.records[Property].PropAddress != undefined &&result.records[Property].PropCity != undefined && result.records[Property].PropState != undefined && result.records[Property].PropCountry != undefined && result.records[Property].PropPostalCode != undefined)
                            {
                            $("#caseProperty").append("<option value='" + result.records[Property].PropertyRegister + "' ref='"+ result.records[Property].PropAddress + "-" + result.records[Property].PropCity + "-" + result.records[Property].PropState + "-" + result.records[Property].PropCountry + "-" + result.records[Property].PropPostalCode +"'>" + result.records[Property].PropOwnerName + "-" + result.records[Property].PropAddress + "-" + result.records[Property].PropCity + "-" + result.records[Property].PropState + "-" + result.records[Property].PropCountry + "-" + result.records[Property].PropPostalCode + "</option>");
                            }
                        }
                    }
                    $("#caseProperty").select2();
                }); // GetPropertyName

                getTenantUtilityStatus(adminUserID);
            
                getPropertyExpiryInfo(adminUserID);

                getCaseCalendar();
            }

             


            
            
            $.get(domainAddress + "GetAllCity", function(result) {
                //console.log(result);
                $("#city").html('');
                $("#city").html("<option value='0'>Select City</option>");
                if (result.record_count == 0) {
                    $("#city").append("<option value='0'>No City Found</option>");
                } else {
                    for (city in result.records) {
                        $("#city").append("<option value='" + result.records[city].CityName + "'>" + result.records[city].CityName + "</option>");
                    }
                }
                // $("#city").select2();

            });
             

            

        }); // ready





        $("#inputWhenDate").on('change', function() {
            inputWhenDate = $("#inputWhenDate").val();
            var setDate = inputWhenDate.split('.');
            getDate = new Date(setDate[2]+"-"+setDate[1]+"-"+setDate[0]);
            console.log(getDate);
            getDate = getDate.toString().slice(0,15);
            $("#inputWhenDate").css("border-color", "");
            $("#inputWhenDate").hide();
            $("#inputWhenTime").show();
            $(".help-block").text('').hide();
        });

        $("#inputWhenTime").on('change', function() {
            inputWhenTime = $("#inputWhenTime").val();
            if(inputWhenTime!=""){
                countDateTime++;
                if(countDateTime==2){
                    callDateTime();
                }
            }
        });

        function callDateTime(){
            $("#inputWhenDate").hide();
            $("#inputWhenTime").hide();
            $("#inputWhenToRespond").show();
            $("#inputWhenToRespond").val(getDate+" "+inputWhenTime+":00");
            $(".help-block").text('').hide();
            $("#inputWhenToRespond").css("border-color","");
        }

        $("#inputWhenToRespond").click(function(){
            countDateTime=0;
            $("#inputWhenToRespond").css("border-color", "");
            $("#inputWhenToRespond").val('');
            $("#inputWhenDate").val('');
            $("#inputWhenTime").val('');
            $("#inputWhenToRespond").hide();
            $("#inputWhenDate").show();
        });
        
        $("#getClosedRepairs").click(function() {
            localStorage.setItem("MyRequest_RepairStatus", "Completed");
            window.location.href = "ListAllCase.html";
        });
        $("#getOutStandingAmountRepairs").click(function() {
            localStorage.setItem("MyRequest_RepairStatus", "Completed");
            window.location.href = "ListAllCase.html";
        });
        $(".getOpenRequest").click(function() {
            localStorage.setItem("MyRequest_RepairStatus", "");
            window.location.href = "ListAllCase.html";
        });
        $("#getCountRepairs").click(function() {
            localStorage.setItem("MyRequest_RepairStatus", "");
            window.location.href = "ListAllCase.html";
        });
        $("#getAwaitingApprovalCases").click(function() {
            localStorage.setItem("MyRequest_RepairStatus", "Awaiting Approval");
            window.location.href = "ListAllCase.html";
        });
                
        $("#getTenants").click(function() {
            window.location.href = "ListTenants.html";
        });
        $("#getOutStandingPropery").click(function() {
            window.location.href = "ListProperty.html";
        });
        $(".btnSubmitPayment").click(function() {
            if (getTotalAmount == 0) {} else {
                UIkit.modal.alert('Payment done Successfully');
            }
        }); 

        function getCaseCalendar() {
            $.get(domainAddress + "GetParticularAdminProblemSchedule/" + adminUserID, {}, function(resultProblemList) {
                //console.log(resultProblemList);

                if (resultProblemList.record_count == 0) {
                    //console.log("No Problem Found");
                    $('#calendar').fullCalendar({
                        defaultDate: '2015-02-12',
                        disableDragging: true,
                        editable: true,
                        eventLimit: true, // allow "more" link when too many events
                        events: getBlockDates
                    });
                } else {
                    for (Problem in resultProblemList.ProblemRecord) {
                        getProblemID = resultProblemList.ProblemRecord[Problem].ProblemID;
                        getContractorName = resultProblemList.ProblemRecord[Problem].ContractorName;
                        getProblemNotes = resultProblemList.ProblemRecord[Problem].ProblemNotes;
                        getStartDate = resultProblemList.ProblemRecord[Problem].StartDate;
                        getEndDate = resultProblemList.ProblemRecord[Problem].EndDate;
                        getProblemStatus = resultProblemList.ProblemRecord[Problem].ProblemStatus;
                        getAssignStatus = resultProblemList.ProblemRecord[Problem].AssignStatus;
                        getSpecialityName = resultProblemList.ProblemRecord[Problem].SpecialityName;
                        //console.log(getProblemStatus);
                        if (getStartDate != null) {

                            if (getProblemStatus == "Awaiting Info") {
                                getColor = 'lightblue';
                            } else if (getProblemStatus == "Awaiting Approval") {
                                getColor = '#0097a7';
                            } else if (getProblemStatus == "Approved") {
                                getColor = 'blue';
                            } else if (getProblemStatus == "Assigned") {
                                getColor = 'lightgrey';
                            } else if (getProblemStatus == "CheckIn") {
                                getColor = 'orange';
                            } else if (getProblemStatus == "Started") {
                                getColor = 'brown';
                            } else if (getProblemStatus == "Completed") {
                                getColor = 'green';
                            } else if (getProblemStatus == "Closed") {
                                getColor = 'purple';
                            }
                            if (getContractorName != null) {
                                getTitle = "Case # " + getProblemID + " " + getContractorName;
                            } else {
                                getTitle = "Case # " + getProblemID + " CTOR Yet to Assign";
                            }
                            
                            newItem = {
                                'title': getTitle,
                                'start': getStartDate,
                                'end': getEndDate,
                                'backgroundColor': getColor
                            };
                            getBlockDates.push(newItem);
                            
                        }
                    } // for loop
                    $('#calendar').fullCalendar({
                        defaultDate: '2015-02-12',
                        disableDragging: true,
                        editable: true,
                        eventLimit: true, // allow "more" link when too many events
                        events: getBlockDates,
                        eventClick: function(calEvent, jsEvent, view) {

                            //console.log('Event: ' + calEvent.title);
                            var getCaseInfo = calEvent.title.split(' ');
                            var getCaseID = getCaseInfo[2];
                            //console.log(getCaseID);
                            $.get(domainAddress + "GetParticularProblemImage/" + getCaseID, {}, function(resultProblem) {
                                //console.log(resultProblem);
                                for (var problem in resultProblem.ProblemImageRecord) {
                                    var getProblemImage = resultProblem.ProblemImageRecord[problem].ProblemImage;
                                    var getImg = getProblemImage.slice(0, 6);

                                    if (getImg == "upload") {
                                        getProblemImage = domainAddress + getProblemImage;
                                    } else {
                                        getProblemImage = "data:image/png;base64," + getProblemImage;
                                    }
                                    $("#caseProblemImage").prop("src", getProblemImage);
                                }

                            });

                            $.get(domainAddress + "GetParticularProblem/" + getCaseID, {}, function(resultProblemInfo) {
                                //console.log(resultProblemInfo);
                                for (var problem in resultProblemInfo.ProblemRecord) {
                                    var getCaseID = resultProblemInfo.ProblemRecord[problem].ProblemID;
                                    var firstName = resultProblemInfo.ProblemRecord[problem].Name;
                                    var emailID = resultProblemInfo.ProblemRecord[problem].EmailID;
                                    var phoneNumber = resultProblemInfo.ProblemRecord[problem].PhoneNumber;
                                    var createdDate = resultProblemInfo.ProblemRecord[problem].ProblemDateTime;
                                    var userNotes = resultProblemInfo.ProblemRecord[problem].Notes;
                                    var specialityName = resultProblemInfo.ProblemRecord[problem].SpecialityName;
                                    var status = resultProblemInfo.ProblemRecord[problem].Status;
                                    var problemStatus = resultProblemInfo.ProblemRecord[problem].ProblemStatus;
                                    var startDate = resultProblemInfo.ProblemRecord[problem].ProblemStartDate;
                                    var endDate = resultProblemInfo.ProblemRecord[problem].ProblemEndDate;
                                    var startTime = resultProblemInfo.ProblemRecord[problem].ProblemStartTime;
                                    var endTime = resultProblemInfo.ProblemRecord[problem].ProblemEndTime;
                                    var getCity = resultProblemInfo.ProblemRecord[problem].City;
                                    // var getState = resultProblemInfo.ProblemRecord[problem].State;
                                    var getAddress = resultProblemInfo.ProblemRecord[problem].Address;
                                    var getCountry = resultProblemInfo.ProblemRecord[problem].Country;
                                    // var getLocation = resultProblemInfo.ProblemRecord[problem].Location;
                                    var Latitude = resultProblemInfo.ProblemRecord[problem].Latitude;
                                    var Longitude = resultProblemInfo.ProblemRecord[problem].Longitude;
                                    var getZip = resultProblemInfo.ProblemRecord[problem].PostalCode;

                                    var clientName = firstName;
                                    var getProblemCreateArr = createdDate.split(" ");
                                    var getCreateDate = getProblemCreateArr[0].split("-");
                                    var getStartDate = startDate.split("-");
                                    var getSYear = getStartDate[0];
                                    var getSMonth = getStartDate[1];
                                    var getSDate = getStartDate[2];
                                    //console.log(getSMonth+"/"+getSDate+"/"+getSYear);
                                    if (endDate == "" || endDate == null) {
                                        var getEYear = 00;
                                        var getEMonth = 00;
                                        var getEDate = 0000;
                                        //console.log(getEMonth+"/"+getEDate+"/"+getEYear);
                                    } else {
                                        var getEndDate = endDate.split("-");
                                        var getEYear = getEndDate[0];
                                        var getEMonth = getEndDate[1];
                                        var getEDate = getEndDate[2];
                                        //console.log(getEMonth+"/"+getEDate+"/"+getEYear);
                                    }

                                    var getCreateDate = createdDate.slice(0, 10).split("-");
                                    var getCYear = getCreateDate[0];
                                    var getCMonth = getCreateDate[1];
                                    var getCDate = getCreateDate[2];
                                    //console.log(getCMonth+"/"+getCDate+"/"+getCYear);
                                    var getCreateTime = createdDate.slice(11);
                                    var specialityID = resultProblemInfo.ProblemRecord[problem].SpecialityID;
                                    if (problemStatus == "Approved") {
                                        //console.log("problem status approved");
                                        $(".statusColor").html("");
                                        var str = "Assigned";
                                        var result = str.fontcolor("green");
                                        $(".statusColor").html(result);
                                    } else if (problemStatus == "Processing") {
                                        //console.log("problem status Processing");
                                        $(".statusColor").html("");
                                        var str = "In Processing";
                                        var result = str.fontcolor("#2F96B4");
                                        $(".statusColor").html(result);
                                    } else if (problemStatus == "Re-Scheduled") {
                                        //console.log("problem status Re-Scheduled");
                                        $(".statusColor").html("");
                                        var str = "Re Scheduled";
                                        var result = str.fontcolor("#F99C17");
                                        $(".statusColor").html(result);
                                    } else if (problemStatus == "Completed") {
                                        //console.log("problem status Completed");
                                        $(".statusColor").html("");
                                        var str = "Completed";
                                        var result = str.fontcolor("#007BCC");
                                        $(".statusColor").html(result);
                                    } else if (problemStatus == "Yet-to-Assign") {
                                        //console.log("problem status Yet-to-Assign");
                                        $(".statusColor").html("");
                                        var str = "Yet to Assign";
                                        var result = str.fontcolor("#DD514C");
                                        $(".statusColor").html(result);
                                    }   
                                    $("#caseName").html("<a href='particularProblem.php?ProblemID=" + getCaseID + "'>Case # " + getCaseID + " Information</a>");

                                    $(".NotesContent").html("<li class='out'><img class='avatar img-responsive' alt='assets/img/sign-in.jpg' src='assets/img/sign-in.jpg'/><div class=''><a href='#' class='name'>" + clientName + "</a><span class='datetime'> at " + getCreateDate[2] + "/" + getCreateDate[1] + "/" + getCreateDate[0] + " " + getProblemCreateArr[1] + "</span><span class='body'>" + userNotes + "</span></div></li>");
                                    var getStatusTxt = "";
                                    var getUserImage = "";
                                    var adminUserName = localStorage.getItem("ReportUserName");
                                    for (NotesDetails in resultProblemInfo.ProblemRecord[problem].ProblemNotes) {
                                        var workLogID = resultProblemInfo.ProblemRecord[problem].ProblemNotes[NotesDetails].WorkLogID;
                                        var status = resultProblemInfo.ProblemRecord[problem].ProblemNotes[NotesDetails].Status;
                                        var content = resultProblemInfo.ProblemRecord[problem].ProblemNotes[NotesDetails].Content;
                                        var createdDate = resultProblemInfo.ProblemRecord[problem].ProblemNotes[NotesDetails].CreatedDate;
                                        var assignedBy = resultProblemInfo.ProblemRecord[problem].ProblemNotes[NotesDetails].AssignedBy;
                                        var getProblemCreateArr = createdDate.split(" ");
                                        var getCreateDate = getProblemCreateArr[0].split("-");
                                        var contractorImage = resultProblemInfo.ProblemRecord[problem].ProblemNotes[NotesDetails].GetImage;

                                        if (status == "contractorName") {
                                            getStatusTxt = "Assigned Contractor Name : " + content;
                                        } else if (status == "specialityName") {
                                            getStatusTxt = "Assigned Speciality Name : " + content;
                                        } else if (status == "Notes") {
                                            getStatusTxt = "Notes - " + content;
                                        } else if (status == "WorkStartDate") {
                                            var getStartDateArr = content.split(",");
                                            var getSDate = getStartDateArr[0].split("-");
                                            var getFinalSDate = getSDate[2] + "/" + getSDate[1] + "/" + getSDate[0];
                                            getStatusTxt = "Work Start Date : " + getFinalSDate + ", " + getStartDateArr[1];
                                        } else if (status == "WorkEndDate") {
                                            var getEndDateArr = content.split(",");
                                            var getEDate = getEndDateArr[0].split("-");
                                            var getFinalEDate = getEDate[2] + "/" + getEDate[1] + "/" + getEDate[0];
                                            getStatusTxt = "Work End Date : " + getFinalEDate + ", " + getEndDateArr[1];
                                        } else if (status == "Assigned") {
                                            getStatusTxt = "Problem has been " + content;
                                        } else {
                                            getStatusTxt = "Problem has been " + content;
                                        }


                                        if (assignedBy == adminUserName) {
                                            $(".NotesContent").append("<li class='in' id='notesID-" + workLogID + "'><img class='avatar img-responsive' alt='assets/img/sign-in.jpg' src='assets/img/sign-in.jpg'/><div class=''><a href='#' class='name'>" + assignedBy + "</a><span class='datetime' id='datetime-" + workLogID + "'> at " + getCreateDate[2] + "/" + getCreateDate[1] + "/" + getCreateDate[0] + " " + getProblemCreateArr[1] + "</span><span class='body' id='notes-" + workLogID + "'>" + getStatusTxt + "</span></div></li>");
                                        } else {

                                            if (contractorImage == "" || contractorImage == null) {
                                                getUserImage = "assets/img/sign-in.jpg";
                                            } else {
                                                getUserImage = domainAddress + contractorImage;
                                            }

                                            $(".NotesContent").append("<li class='out'><img class='avatar img-responsive' alt='' src='" + getUserImage + "'/><div class=''><a href='#' class='name'>" + assignedBy + "</a><span class='datetime'> at " + getCreateDate[2] + "/" + getCreateDate[1] + "/" + getCreateDate[0] + " " + getProblemCreateArr[1] + "</span><span class='body'>" + getStatusTxt + "</span></div></li>");
                                        }
                                    }

                                    for (var getContractor in resultProblemInfo.ProblemRecord[problem].Contractor) {
                                        var contractorFirstName = resultProblemInfo.ProblemRecord[problem].Contractor[getContractor].ContractorFirstName;
                                        var contractorLastName = resultProblemInfo.ProblemRecord[problem].Contractor[getContractor].ContractorLastName;
                                        var contractorEmailID = resultProblemInfo.ProblemRecord[problem].Contractor[getContractor].ContractorEmailID;
                                        var contractorPhone = resultProblemInfo.ProblemRecord[problem].Contractor[getContractor].ContractorPhoneNumber;
                                        var contractorCity = resultProblemInfo.ProblemRecord[problem].Contractor[getContractor].ContractorCity;
                                        var contractorState = resultProblemInfo.ProblemRecord[problem].Contractor[getContractor].ContractorState;
                                        var contractorZip = resultProblemInfo.ProblemRecord[problem].Contractor[getContractor].ContractorZip;

                                        $("#contractorName").text(contractorFirstName + " " + contractorLastName);
                                        $("#contractorPhone").text(contractorPhone);
                                        $("#contractorEmail").html("<a href='mailto:" + contractorEmailID + "' target='_top'>" + contractorEmailID + "</a>");
                                        $("#contractorCity").text(contractorCity);
                                        $("#contractorState").text(contractorState);
                                        $("#contractorZip").text(contractorZip);
                                        $("#getContractorName").text(contractorFirstName + " " + contractorLastName + "'s Calendar");
                                    }
                                    $("#contractorStartDate").text(getSMonth + "/" + getSDate + "/" + getSYear);
                                    $("#contractorEndDate").text(getEMonth + "/" + getEDate + "/" + getEYear);
                                    $("#contractorStartTime").text(startTime);
                                    $("#contractorEndTime").text(endTime);
                                    $(".googleMap").html("<iframe src='http://maps.google.com/?q=" + Latitude + "," + Longitude + "&output=embed' width='300' height='300' frameborder='0' style='border:0'></iframe>");
                                    var getContractorID = resultProblemInfo.ProblemRecord[problem].ContractorID;
                                    $.get(domainAddress + "getContractorWork/" + getContractorID, {}, function(resultProblemList) {
                                        //  console.log(resultProblemList);

                                        if (resultProblemList.record_count == 0) {
                                            //console.log("No Problem Found");
                                            $('#contractorCalendar').fullCalendar({
                                                defaultDate: '2015-02-12',
                                                disableDragging: true,
                                                editable: true,
                                                eventLimit: true, // allow "more" link when too many events
                                                events: getContractorBlockDates
                                            });
                                        } else {
                                            $('#contractorCalendar').html('');

                                            getContractorBlockDates = new Array();
                                            for (Problem in resultProblemList.ProblemCONTRACTORRecord) {
                                                getProblemID = resultProblemList.ProblemCONTRACTORRecord[Problem].ProblemID;
                                                getProblemNotes = resultProblemList.ProblemCONTRACTORRecord[Problem].Notes;
                                                getStartDate = resultProblemList.ProblemCONTRACTORRecord[Problem].StartDate;
                                                getEndDate = resultProblemList.ProblemCONTRACTORRecord[Problem].EndDate;
                                                getProblemStatus = resultProblemList.ProblemCONTRACTORRecord[Problem].ProblemStatus;
                                                if (getStartDate != null && getEndDate != null) {

                                                    if (getProblemStatus == "Awaiting Info") {
                                                        getColor = 'lightblue';
                                                    } else if (getProblemStatus == "Awaiting Approval") {
                                                        getColor = '#0097a7';
                                                    } else if (getProblemStatus == "Approved") {
                                                        getColor = 'blue';
                                                    } else if (getProblemStatus == "Assigned") {
                                                        getColor = 'lightgrey';
                                                    } else if (getProblemStatus == "CheckIn") {
                                                        getColor = 'orange';
                                                    } else if (getProblemStatus == "Started") {
                                                        getColor = 'brown';
                                                    } else if (getProblemStatus == "Completed") {
                                                        getColor = 'green';
                                                    } else if (getProblemStatus == "Closed") {
                                                        getColor = 'purple';
                                                    }
                                                    if (getContractorName != null) {
                                                        getTitle = "Case # " + getProblemID;
                                                    } else {
                                                        getTitle = "Case # " + getProblemID + " CTOR Yet to Assign";
                                                    }
                                                    //console.log("Case # "+getProblemID+" | ProblemStatus : "+getProblemStatus+" | Color :"+getColor+" | StartDate : "+getStartDate+" | EndDate : "+getEndDate);
                                                    newContractorItem = {
                                                        'title': getTitle,
                                                        'start': getStartDate,
                                                        'end': getEndDate,
                                                        'backgroundColor': getColor
                                                    };
                                                    getContractorBlockDates.push(newContractorItem);
                                                    //console.log(getBlockDates);
                                                }
                                            } // for loop

                                            $('#contractorCalendar').fullCalendar({
                                                defaultDate: '2015-02-12',
                                                editable: true,
                                                disableDragging: true,
                                                eventLimit: true, // allow "more" link when too many events
                                                events: getContractorBlockDates
                                            });

                                            $(".fc-button-today").hide();
                                        }
                                    }); // $.get(domainAddress+"getContractorWork/"+getContractorID
                                }
                                var modal = UIkit.modal("#calenderCaseModal");
                                modal.show();

                                $(".md-input-wrapper").addClass("md-input-filled");
                                //$("#getfirstName").val(firstName);
                                //$("#calNotes").val(userNotes);
                                $("#calEmail").val(emailID);
                                $("#calPhone").val(phoneNumber);
                                $("#calcity").val(getCity);
                                //$("#calstate").val(getState);
                                $("#calZip").val(getZip);
                                $("#inputAddress").val(getAddress);
                                $("#inputCountry").val(getCountry);
                                //$("#inputLocation").val(getLocation);
                                $('#calSpecialisation').val(specialityName);
                                //$('#contractorImage').val(contractorImage);
                            });
                        }
                    });
                }
            }); // $.get(domainAddress+"GetAllAdminProblemList
        } // getCaseCalendar
        

        function getTenantUtilityStatus(adminUserID){
            var getUtilityStatusUrl = "";
            if(adminUserID==0){
                getUtilityStatusUrl = "GetTenantUtilityStatusForSuperAdmin";
            }
            else{
                getUtilityStatusUrl = "GetTenantUtilityStatus/"+adminUserID;
            }

            $.get(domainAddress+getUtilityStatusUrl,{},function(resultTenantUtility){
                $(".tenantUtility").html('');
                if(resultTenantUtility.record_count==0){
                    $(".tenantUtility").append("<tr><td id='propName--0'>No records found</td> <td id='propAddress-0'></td> <td id='tenancyEndDate-0'></td> <td id='action-0'></td> </tr>");
                }
                else{
                    for(tenant in resultTenantUtility.records){
                        $("#utilityInfo-"+resultTenantUtility.records[tenant].TenantID).html("");
                        $(".tenantUtility").append("<tr id='getTenantRowID-" + resultTenantUtility.records[tenant].TenantID + "'><td id='propName-" + resultTenantUtility.records[tenant].TenantID + "' style='vertical-align: middle;'>" + resultTenantUtility.records[tenant].TenantName + "</td> <td id='propAddress-" + resultTenantUtility.records[tenant].TenantID + "' style='vertical-align: middle;'>"+resultTenantUtility.records[tenant].PropAddress+"</td><td id='tenancyEndDate-" + resultTenantUtility.records[tenant].TenantID + "' style='vertical-align: middle;'>"+moment(resultTenantUtility.records[tenant].TenancyEnd).format('Do MMM YYYY') +"</td> <td> <i class='fa fa-refresh fa-2x reneval' style='color:green;cursor:pointer;' id='reneval-"+resultTenantUtility.records[tenant].TenantID+"'></i> <i class='fa fa fa-sign-out fa-2x moveOut' style='color:red;cursor:pointer;' id='moveOut-"+resultTenantUtility.records[tenant].TenantID+"'></i> <input type='hidden' id='hiddenPropertyID-"+resultTenantUtility.records[tenant].TenantID+"' value='"+resultTenantUtility.records[tenant].PropertyRegister+"' /> <input type='hidden' id='hiddenTenantName-"+resultTenantUtility.records[tenant].TenantID+"' value='"+resultTenantUtility.records[tenant].TenantName+"' /> <input type='hidden' id='hiddenTenantEmailID-"+resultTenantUtility.records[tenant].TenantID+"' value='"+resultTenantUtility.records[tenant].TenantEmailID+"' /> <input type='hidden' id='hiddenTenantPhoneNumber-"+resultTenantUtility.records[tenant].TenantID+"' value='"+resultTenantUtility.records[tenant].TenantPhoneNumber+"' /> <input type='hidden' id='hiddenTenantEndDate-"+resultTenantUtility.records[tenant].TenantID+"' value='"+resultTenantUtility.records[tenant].TenancyEnd+"' /> <span id='utilityInfo-"+resultTenantUtility.records[tenant].TenantID+"'></span> </td> </tr> ");

                        for(getUtility in resultTenantUtility.records[tenant].Utility){
                            $("#utilityInfo-"+resultTenantUtility.records[tenant].TenantID).append("<input type='hidden' id='hiddenIsElectricity-"+resultTenantUtility.records[tenant].TenantID+"' value='"+resultTenantUtility.records[tenant].Utility[getUtility].ElectricityStatus+"' />  <input type='hidden' id='hiddenIsGas-"+resultTenantUtility.records[tenant].TenantID+"' value='"+resultTenantUtility.records[tenant].Utility[getUtility].GasStatus+"' /> <input type='hidden' id='hiddenIsWater-"+resultTenantUtility.records[tenant].TenantID+"' value='"+resultTenantUtility.records[tenant].Utility[getUtility].WaterStatus+"' /> <input type='hidden' id='hiddenIsCouncil-"+resultTenantUtility.records[tenant].TenantID+"' value='"+resultTenantUtility.records[tenant].Utility[getUtility].CouncilStatus+"' /> <input type='hidden' id='hiddenAvailTenantInsurance-"+resultTenantUtility.records[tenant].TenantID+"' value='"+resultTenantUtility.records[tenant].Utility[getUtility].IsTenantInsurance+"' />");
                        }
                    }

                    $(".reneval").on('click',function(){
                        var tenantID = this.id.replace('reneval-','');
                        var tenantName = $("#propName-"+tenantID).text();
                        var tenantPropertyAddress = $("#propAddress-"+tenantID).text();
                        var tenantNewStartDate = $("#hiddenTenantEndDate-"+tenantID).val();
                        var finalTenantNewStartDate = tenantNewStartDate;
                        var tenantNewStartDate = moment(tenantNewStartDate).format('DD.MM.YYYY');

                        // Getting Tenant New End Date Sarts Here
                        var getNewEndDate = new Date();
                        var getNewEndYear = getNewEndDate.getFullYear() + 1;
                        var getNextYear = new Date();
                            getNextYear.setFullYear(getNewEndYear);
                        var TenantNewEndDate = moment(getNextYear).format('DD.MM.YYYY');
                        var getDate = TenantNewEndDate.split('.');
                        var finalTenantEndStartDate = getDate[2]+"-"+getDate[1]+"-"+getDate[0];
                        // Getting Tenant New End Date Ends Here

                        UIkit.modal.confirm('Do you want to renew the tenancy ?', function() {
                            console.log("yes renew tenant");
                            var modal = UIkit.modal("#getTenancyRenew");
                            modal.show();
                            
                            $(".md-input-wrapper").addClass("md-input-filled");
                            $("#inputTenantName").val(tenantName);
                            $("#inputTenantAddress").val(tenantPropertyAddress);
                            $("#inputNewStartDate").val(tenantNewStartDate);
                            $("#inputNewEndDate").val(TenantNewEndDate);
                            
                            $("#btnTenancyRenewal").click(function(){
                                var dataForm = '{"TenantID":"' + tenantID + '","AdminID":"'+adminUserID+'","StartDate":"'+finalTenantNewStartDate+'","EndDate":"'+finalTenantEndStartDate+'"}';
                                console.log(dataForm);
                                var sendURL = domainAddress + 'updateTenantDue';

                                $.ajax({
                                      type: "POST",
                                      url: sendURL,
                                      data: dataForm,
                                      success: function(dataCheck) {
                                          console.log(dataCheck);
                                          if(dataCheck.status=="success"){
                                            getTenantUtilityStatus(adminUserID);
                                            UIkit.modal.alert('Renewal date updated Successfully');
                                          }
                                          else{
                                            UIkit.modal.alert(dataCheck.message_text);
                                          }
                                          
                                      }
                                });
                            });

                        }); // confirm prompt
                    });

                    $(".moveOut").on('click',function(){
                        var tenantID = this.id.replace('moveOut-','');
                        var hiddenPropertyID = $("#hiddenPropertyID-"+tenantID).val();
                        var hiddenPropertyAddress = $("#propAddress-"+tenantID).text();
                        var hiddenTenantName = $("#hiddenTenantName-"+tenantID).val();
                        var hiddenTenantEmailID = $("#hiddenTenantEmailID-"+tenantID).val();
                        var hiddenTenantPhoneNumber = $("#hiddenTenantPhoneNumber-"+tenantID).val();
                       
                       
                        var hiddenIsElectricity = $("#hiddenIsElectricity-"+tenantID).val();
                        var hiddenIsGas = $("#hiddenIsGas-"+tenantID).val();
                        var hiddenIsWater = $("#hiddenIsWater-"+tenantID).val();
                        var hiddenIsCouncil = $("#hiddenIsCouncil-"+tenantID).val();
                        var hiddenAvailTenantInsurance = $("#hiddenAvailTenantInsurance-"+tenantID).val();

                        UIkit.modal.confirm('Are you sure to move-out tenant?', function() {
                            console.log("yes move-out tenant");

                            // Need to check this LettingAgencyCode not sure why it's been USED

                            var getAddTenantArr = new Array();
                            var newTenantsDataForm = "{'UserRegID':'" + tenantID + "','Name':'" + hiddenTenantName + "','Email':'" + hiddenTenantEmailID + "','Mobile':'" + hiddenTenantPhoneNumber + "','LettingAgencyCode':'0','IsElectricity':'" + hiddenIsElectricity + "','IsGas':'" + hiddenIsGas + "','IsWater':'" + hiddenIsWater + "','IsCouncil':'" + hiddenIsCouncil + "','IsAvailTenantInsurance':'"+hiddenAvailTenantInsurance+"'}";

                            getAddTenantArr.push(newTenantsDataForm);

                            var dataForm = '{"TenantsArr":"' + getAddTenantArr + '","PropAddress":"' + hiddenPropertyAddress + '","AdminID":"' + adminUserID + '"}';
                            var sendURL = domainAddress + 'SendTenantPropertyUtilityMoveOut/' + hiddenPropertyID;
                            console.log(dataForm);
                            console.log(sendURL);
                            $.ajax({
                                type: "POST",
                                url: sendURL,
                                data: dataForm,
                                success: function(dataCheck) {
                                    console.log(dataCheck);
                                    getAddTenantArr = new Array();
                                    getTenantUtilityStatus(adminUserID);
                                    UIkit.modal.alert('Tenant Moved-out & Property Utility Updated Successfully');
                                }
                            }); // SendPropertyUtilityMoveOut
                        });
                    }); // .moveOut
                }
            });

            // Contractor Status Starts Here
            var getUtilityStatusUrl = "";
            if(adminUserID==0){
                getUtilityStatusUrl = "GetTenantUtilityStatusForSuperAdmin";
            }
            else{
                getUtilityStatusUrl = "GetContractorUtilityStatus/"+adminUserID;
            }

            $.get(domainAddress+getUtilityStatusUrl,{},function(resultContractorUtility){
                console.log(domainAddress+getUtilityStatusUrl);
                $(".contractorUtility").html('');
                if(resultContractorUtility.record_count==0){
                    $(".contractorUtility").append("<tr><td id='ContractorName--0'>No records found</td> <td id='ContractorSpeciality-0'></td> <td id='ContractorEndDate-0'></td> <td id='action-0'></td> </tr>");
                }
                else{
                    for(contractor in resultContractorUtility.records){
                        $(".contractorUtility").append("<tr id='getContractorRowID-" + resultContractorUtility.records[contractor].contractorID + "'><td id='ContractorName-" + resultContractorUtility.records[contractor].ContractorID + "' style='vertical-align: middle;'>" + resultContractorUtility.records[contractor].ContractorName + "</td> <td id='ContractorSpeciality-" + resultContractorUtility.records[contractor].ContractorID + "' style='vertical-align: middle;'>"+resultContractorUtility.records[contractor].SpecialityName+"</td><td id='ContractorEndDate-" + resultContractorUtility.records[contractor].ContractorID + "' style='vertical-align: middle;'>"+moment(resultContractorUtility.records[contractor].ContractValidTill).format('Do MMM YYYY') +"</td> <td> <i class='fa fa-refresh fa-2x contractorreneval' style='color:green;cursor:pointer;' id='contractorreneval-"+resultContractorUtility.records[contractor].ContractorID+"'></i>  <input type='hidden' id='hiddenContractorEndDate-"+resultContractorUtility.records[contractor].ContractorID+"' value='"+resultContractorUtility.records[contractor].ContractValidTill+"' /></td> </tr> ");
                    }

                    $(".contractorreneval").on('click',function(){
                        var contractorID = this.id.replace('contractorreneval-','');
                        var ContractorName = $("#ContractorName-"+contractorID).text();
                        var ContractorSpeciality = $("#ContractorSpeciality-"+contractorID).text();
                        var contractorNewStartDate = $("#hiddenContractorEndDate-"+contractorID).val();
                        var finalContractorNewStartDate = contractorNewStartDate;
                        var contractorNewStartDate = moment(contractorNewStartDate).format('DD.MM.YYYY');

                        // Getting Contractor New End Date Sarts Here
                        var getNewEndDate = new Date();
                        var getNewEndYear = getNewEndDate.getFullYear() + 1;
                        var getNextYear = new Date();
                            getNextYear.setFullYear(getNewEndYear);
                        var ContractorNewEndDate = moment(getNextYear).format('DD.MM.YYYY');
                        var getContractorDate = ContractorNewEndDate.split('.');
                        var finalContractorEndStartDate = getContractorDate[2]+"-"+getContractorDate[1]+"-"+getContractorDate[0];
                        // Getting Contractor New End Date Ends Here

                        UIkit.modal.confirm('Do you want to renew the Contract ?', function() {
                            var modal = UIkit.modal("#getContractRenewal");
                            modal.show();
                            
                            $(".md-input-wrapper").addClass("md-input-filled");
                            $("#inputContractorName").val(ContractorName);
                            $("#inputContractorSpeciality").val(ContractorSpeciality);
                            $("#inputContractorNewStartDate").val(contractorNewStartDate);
                            $("#inputContractorNewEndDate").val(ContractorNewEndDate);

                            $("#btnContractRenewal").click(function(){
                                var dataForm = '{"ContractorID":"' + contractorID + '","AdminID":"'+adminUserID+'","CurrentValidDate":"'+finalContractorNewStartDate+'","NewValidDate":"'+finalContractorEndStartDate+'"}';
                                console.log(dataForm);
                                var sendURL = domainAddress + 'updateContractorValidTill';
                                console.log(sendURL);
                                $.ajax({
                                      type: "POST",
                                      url: sendURL,
                                      data: dataForm,
                                      success: function(dataCheck) {
                                          console.log(dataCheck);
                                          if(dataCheck.status=="success"){
                                            getTenantUtilityStatus(adminUserID);
                                            UIkit.modal.alert('Renewal date updated Successfully');
                                          }
                                          else{
                                            UIkit.modal.alert(dataCheck.message_text);
                                          }
                                          
                                      }
                                });
                            });

                        }); // confirm prompt
                    });
                }
            });
            //Contractor Status Ends Here
        }

        $(".logOut").click(function() {
            logOutClearCatch();
        });
        
        $(".user_action_icon").click(function(){
            createCaseReset();
        });

        $(".reset").click(function() {
            createCaseReset();
        });

        function createCaseReset(){
            $("#imgRequestImage").attr('src','assets/img/noImage.gif');
            $("#caseNotes").val('');
            $("#caseSpecialisation").val(0);
            $("#select2-caseSpecialisation-container").html('Select the Speciality');
            $("#caseContractor").val(0);
            $("#select2-caseContractor-container").html('Select the Speciality to view Contractor');
            $("#caseProperty").val(0);
            $("#select2-caseProperty-container").html('Select the Property');
            $("#inputWhenDate").val('');
            $("#inputWhenTime").val('');
            $("#inputWhenTime").hide();
            $("#inputWhenDate").show();
            $("#inputWhenToRespond").val('');
            $("#inputWhenToRespond").hide();
        }

        function isValidEmailAddress(emailAddress) {
            var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
            return pattern.test(emailAddress);
        };

       
        $("#caseSpecialisation").on('change', function() {
            var inputCaseSpecialisation = $("#caseSpecialisation").val();
            if (inputCaseSpecialisation == 0) {
                $(".help-block").css("border-color", "red");
                $(".help-block").css('color', 'red');
                $(".help-block").show();
                $(".help-block").text("* Select the Speciality");
                $("#select2-caseSpecialisation-container").css("border", "1px solid red");
                $("#addCase").attr("disabled", true);
            } else {
                $(".help-block").hide();
                $(".help-block").text("");
                $("#select2-caseSpecialisation-container").css("border", "1px solid transparent");
                $("#addCase").attr("disabled", false);

                $.get(domainAddress + "GetAllContractorDetails/" + inputCaseSpecialisation, {}, function (result) {
                    console.log(result);
                    $("#caseContractor").html('');

                    if (result.record_count == 0) {
                        $("#caseContractor").html("<option value='0'>Select the Contractor</option>");
                        $("#caseContractor").html("<option value='0'>No Contractor Found</option>");
                    }
                    else {
                        $("#caseContractor").html("<option value='0'>Select the Contractor</option>");
                        for (var Contractor in result.records) {
                            $("#caseContractor").append("<option value='" + result.records[Contractor].ContractorID + "'>" + result.records[Contractor].ContractorName + "</option>");
                        }
                        $("#caseContractor").select2();
                    }


                }); // GetAllEventList

            }
        });

        $("#caseNotes").keyup(function() {
            var inputCaseNotes = $("#caseNotes").val();
            if (inputCaseNotes == "") {
                $(".help-block").css("border-color", "red");
                $(".help-block").css('color', 'red');
                $(".help-block").show();
                $(".help-block").text("* Enter the Notes");
                $("#addCase").attr("disabled", true);
            } else {
                $(".help-block").hide();
                $(".help-block").text("");
                $("#caseNotes").css("border-color", "rgba(0,0,0,.12)");
                $("#addCase").attr("disabled", false);
            }
        });


        $("#caseProperty").on('change', function() {
            var inputCaseProperty = $("#caseProperty").val();
            if (inputCaseProperty == 0) {
                $(".help-block").css("border-color", "red");
                $(".help-block").css('color', 'red');
                $(".help-block").show();
                $(".help-block").text("* Select the Property");
                $("#addCase").attr("disabled", true);
            } else {
                $(".help-block").hide();
                $(".help-block").text("");
                $("#caseProperty").css("border-color", "rgba(0,0,0,.12)");
                $("#addCase").attr("disabled", false);
            }
        });




        $("#requestImageUrl1").off('click').on('change', function () {
            $("#getLoadingModalContent").addClass('md-show');
            console.log("image 1 upload click");
            var progressbox = $('#progressbox1');
            var progressbar = $('#progressbar1');
            var statustxt = $('#statustxt1');

            $("#preview1").html('');

            $("#FileURLUploadRequestImage1").ajaxForm({
                target: '#preview1',
                beforeSubmit: function () {
                    console.log('v');

                },
                uploadProgress: function (event, position, total, percentComplete) {
                    console.log("on  progress");
                    progressbar.width(percentComplete + '%') //update progressbar percent complete
                    console.log(percentComplete);
                    statustxt.html(percentComplete + '%'); //update status text
                    $('#progressbar1').css("width", percentComplete + "%");
                    $('#progressbox1').css("margin", "10px 10px 10px 20px");
                    $('#progressbox1').show();
                    $('#progressbar1').show();

                    if (percentComplete > 50) {
                        console.log("if : " + percentComplete);
                        statustxt.css('color', '#fff');
                        statustxt.html(percentComplete + '%'); //change status text to white after 50%
                        $('#progressbar1').css("width", percentComplete + "%");
                        $('#progressbox1').css("margin", "10px 10px 10px 20px");
                        $('#progressbox1').show();
                        $('#progressbar1').show();
                    }
                    $(".addCase").attr("disabled", true);
                },
                success: function (result, percentComplete) {
                    if (result == "Please select image..!") {
                        $("#progressbox1").hide();
                        alert("Please select image..!");
                        return false;
                    } else {
                        if (percentComplete == "success") {
                            percentComplete = 100;
                            statustxt.html(percentComplete + ' %');
                        }

                        $('#progressbar1').css("width", percentComplete + "%");
                        $('#progressbox1').css("margin", "10px 10px 10px 20px");
                        $('#progressbox1').show();
                        $('#progressbar1').show();
                        var getUrl = "url(" + result + ")";
                        console.log('z ' + getUrl);
                        imageUrl1 = result.slice(4);
                        $(".help-block").hide();
                        $(".help-block").text("");
                        $(".addCase").attr("disabled", false);
                        $("#getLoadingModalContent").removeClass('md-show');
                        $('#progressbox1').hide();
                        $("#imgRequestImage").attr('src', domainAddress + imageUrl1);
                        $("#imgRequestImage").css("border", "");
                        $(".fileupload-preview1").text(domainAddress + imageUrl1);

                    }

                },
                error: function () {
                    console.log('d');


                }
            }).submit();
        });



        $("#addCase").click(function() {
            adminUserID = localStorage.getItem("MyRequest_AdminID");
            var inputCaseSpecialisation = $("#caseSpecialisation").val();
            var inputCaseNotes = $("#caseNotes").val();
            var inputCaseProperty = $("#caseProperty :selected").attr('ref');
            var inputcaseContractor = $("#caseContractor").val();
            var getUploadedImgPath = imageUrl1;
            var inputWhenDate = $("#inputWhenDate").val();
            var inputWhenToRespond = $("#inputWhenToRespond").val();

            if (getUploadedImgPath == "") {
                $(".help-block").css('color', 'red');
                $(".help-block").show();
                $(".help-block").text("* Select the Image");
                $("#imgRequestImage").css("border", "1px solid red");
                $(".addCase").attr("disabled", true);
                return false;
            }
 
            if (inputCaseNotes == "") {
                $(".help-block").css("border-color", "red");
                $(".help-block").css('color', 'red');
                $(".help-block").show();
                $("#caseNotes").css("border-color", "red");
                $(".help-block").text("* Enter the Request Description");
                $(".addCase").attr("disabled", true);
                return false;
            }

            if (inputCaseSpecialisation == 0) {
                $(".help-block").css("border-color", "red");
                $(".help-block").css('color', 'red');
                $(".help-block").show();
                $(".help-block").text("* Select the Specialiy");
                $("#select2-caseSpecialisation-container").css("border", "1px solid red");
                $(".addCase").attr("disabled", true);
                return false;
            }
 
            
            if (inputcaseContractor == 0) {
                $(".help-block").css("border-color", "red");
                $(".help-block").css('color', 'red');
                $(".help-block").show();
                $("#caseContractor").css("border-color", "red");
                $(".help-block").text("* Select the Contractor");
                $(".addCase").attr("disabled", true);
                return false;
            }

            if (inputCaseProperty == 0) {
                $(".help-block").css("border-color", "red");
                $(".help-block").css('color', 'red');
                $(".help-block").show();
                $("#caseProperty").css("border-color", "red");
                $(".help-block").text("* Select the Property");
                $(".addCase").attr("disabled", true);
                return false;
            }

            if(inputWhenDate==""){
                $(".help-block").css("border-color", "red");
                $(".help-block").css('color', 'red');
                $(".help-block").show();
                $("#inputWhenToRespond").css("border-color", "red");
                $("#inputWhenDate").css("border-color", "red");
                $(".help-block").text("* Select the Date");
                $(".addCase").attr("disabled", true);
                return false;
            }

            if(inputWhenTime==""){
                $(".help-block").css("border-color", "red");
                $(".help-block").css('color', 'red');
                $(".help-block").show();
                $("#inputWhenToRespond").css("border-color", "red");
                $("#inputWhenDate").css("border-color", "red");
                $("#inputWhenTime").css("border-color", "red");
                $(".help-block").text("* Select the Time");
                $(".addCase").attr("disabled", true);
                return false;
            }

            if(inputWhenToRespond==""){
                $(".help-block").css("border-color", "red");
                $(".help-block").css('color', 'red');
                $(".help-block").show();
                $("#inputWhenToRespond").css("border-color", "red");
                $("#inputWhenDate").css("border-color", "red");
                $("#inputWhenTime").css("border-color", "red");
                $(".help-block").text("* What to Respond ?");
                $(".addCase").attr("disabled", true);
                return false;
            }

            else {
                var dataForm = '{"SpecialityID":"' + inputCaseSpecialisation + '","Notes":"' + inputCaseNotes + '","PropertyAddress":"' + inputCaseProperty + '","ContractorID":"' + inputcaseContractor + '","problemImage":"' + getUploadedImgPath + '","AdminID":"' + adminUserID + '","WhenToRespond":"'+inputWhenToRespond+'"}';
                console.log(dataForm);


                var sendURL = domainAddress + 'CreateCaseComplaint';
                console.log(sendURL);


                $.ajax({
                    type: "POST",
                    url: sendURL,
                    data: dataForm,
                    success: function(dataCheck) {
                        console.log(dataCheck);
                        if(dataCheck.status=="success"){
                            createCaseReset();
                            $.post(domainAddress + "/push/messageSendByAdminForNewCase.php", {
                              ContractorID: inputcaseContractor,
                              AdminID: adminUserID,
                              Title:'New Request registered',
                              MessageForContractor: "A new request has been registered by the Letting Agency "+businessName,
                              MessageForSubAdmin:"A new request has been registered by the Letting Agency "+businessName,
                              RequestID:dataCheck.RequestID
                            }, function(e) {
                              console.log(e);
                            }); // push/messageSendByAdminForNewCase.php
 
                            $(".uk-modal").removeClass("uk-open").addClass("uk-close");
                            UIkit.modal.alert(dataCheck.message_text);
                        }
                        else{
                            UIkit.modal.alert(dataCheck.message_text);
                        }

                    }
                });

            }

        }); // #addCase


  $(".btnSubmitTenantMail").click(function(){
    console.log("click tmail");
    UIkit.modal.confirm('Are you sure to send mail to Tenants who are yet to install the app?', function() {
        var dataForm = '{"AdminID":"'+adminUserID+'"}';
        console.log(dataForm);
        var sendURL = domainAddress + 'SendTenantReminderMail';
        console.log(sendURL);
        $.ajax({
            type: "POST",
            url: sendURL,
            data: dataForm,
            success: function(dataCheck) {
                console.log(dataCheck);
            }
        });
    });
  });

  $(".btnSubmitContractorMail").click(function(){
    console.log("click cmail");
    UIkit.modal.confirm('Are you sure to send mail to Contractors who are yet to install the app?', function() {
        var dataForm = '{"AdminID":"'+adminUserID+'"}';
        console.log(dataForm);
        var sendURL = domainAddress + 'SendContractorReminderMail';
        console.log(sendURL);
        $.ajax({
            type: "POST",
            url: sendURL,
            data: dataForm,
            success: function(dataCheck) {
                console.log(dataCheck);
            }
        });
    });
  });


  function getPropertyExpiryInfo(adminUserID){
    var getUrl = "";
    if(adminUserID==0){
        getUrl = "GetPropertyExpiryInfoForSuperAdmin";
    }
    else{
        getUrl = "GetPropertyExpiryInfo/"+adminUserID;
    }

    $.get(domainAddress+getUrl,{},function(result){
        //console.log(result);
        var getEpcColor="";
        var getPatColor="";
        var getGasCertColor="";
        var getLegionColor="";

        var getEPC = "-";
        var getPAT = "-";
        var getGasExp = "-";
        var getLegCert = "-";

        $(".getPropertyExpiryInfo").html('');
        if(result.record_count==0){
            $(".getPropertyExpiryInfo").append("<tr id='rowID-0'> <td>No records found </td> <td> </td> <td> </td> <td> </td> <td> </td> </tr> ");
        }
        else{
            
            for(propertyExpInfo in result.records){
                // if(result.records[propertyExpInfo].EpcValidTill=="-" && result.records[propertyExpInfo].ElectricCertValidTill=="-" && result.records[propertyExpInfo].GasCertValidTill=="-" && result.records[propertyExpInfo].LegCertValidTill=="-"){
                //     //No expiry found for PropertyAddress
                //     $(".getPropertyExpiryInfo").html("<tr id='rowID-0'> <td>No records found </td> <td> </td> <td> </td> <td> </td> <td> </td> </tr> ");
                // }
                // else{
                    $("#rowID-0").hide();
                    if(result.records[propertyExpInfo].EpcDiffDate <= 0){
                        getEpcColor = "red";
                    }
                    else if (result.records[propertyExpInfo].EpcDiffDate > 0) {
                        getEpcColor = "rgba(17, 97, 17, 0.72)";
                    }

                    if(result.records[propertyExpInfo].ElectricCertDiffDate <= 0){
                        getPatColor = "red";
                    }
                    else if (result.records[propertyExpInfo].ElectricCertDiffDate > 0) {
                        getPatColor = "rgba(17, 97, 17, 0.72)";
                    }

                    if(result.records[propertyExpInfo].GasCertDiffDate <= 0){
                        getGasCertColor = "red";
                    }
                    else if (result.records[propertyExpInfo].GasCertDiffDate > 0) {
                        getGasCertColor = "rgba(17, 97, 17, 0.72)";
                    }

                    if(result.records[propertyExpInfo].LegCertDiffDate <= 0){
                        getLegionColor = "red";
                    }
                    else if (result.records[propertyExpInfo].LegCertDiffDate > 0) {
                        getLegionColor = "rgba(17, 97, 17, 0.72)";
                    }

                    getEPC = moment(result.records[propertyExpInfo].EpcValidTill).format('Do MMM YYYY');

                    if(getEPC=="Invalid date"){
                        getEPC = "-";
                        getEpcColor = "#000";
                    }

                    getPAT = moment(result.records[propertyExpInfo].ElectricCertValidTill).format('Do MMM YYYY');

                    if(getPAT=="Invalid date"){
                        getPAT="-";
                        getPatColor="#000";
                    }

                    getGasExp = moment(result.records[propertyExpInfo].GasCertValidTill).format('Do MMM YYYY');

                    if(getGasExp=="Invalid date"){
                        getGasExp="-";
                        getGasCertColor="#000";
                    }

                    getLegCert = moment(result.records[propertyExpInfo].LegCertValidTill).format('Do MMM YYYY');

                    if(getLegCert=="Invalid date"){
                        getLegCert = "-";
                        getLegionColor = "#000";
                    }


                    $(".getPropertyExpiryInfo").append("<tr id='propertyExp-"+result.records[propertyExpInfo].PropertyRegister+"'> <td id='propAddress-"+result.records[propertyExpInfo].PropertyRegister+"'> "+result.records[propertyExpInfo].PropAddress+"</td> <td id='epcValidTill-"+result.records[propertyExpInfo].PropertyRegister+"' style='color:"+getEpcColor+";font-weight:bold;'> "+getEPC+" </td> <td id='patValidTill-"+result.records[propertyExpInfo].PropertyRegister+"' style='color:"+getPatColor+";font-weight:bold;'> "+getPAT+"</td> <td id='gasCertValidTill-"+result.records[propertyExpInfo].PropertyRegister+"' style='color:"+getGasCertColor+";font-weight:bold;'>"+getGasExp+" </td> <td id='legCertValidTill-"+result.records[propertyExpInfo].PropertyRegister+"'  style='color:"+getLegionColor+";font-weight:bold;'>"+getLegCert+" </td> </tr>");
                //}
            }
        }
    });
  }




  function getLastTwoDaysMessages(adminUserID){
    
    var getMessageUrl = "";
    if(adminUserID==0){
        getMessageUrl = "GetLastTwoDaysMessageForSuperAdminView";
    }
    else{
        getMessageUrl = 'GetLastTwoDaysMessage/' + adminUserID;
    }

     $.get(domainAddress + getMessageUrl, {}, function(result) {
        //console.log(result);
        $(".messageNotesContent").html('');
        if (result.record_count == 0) {
            $(".noOfAppMessages").text(result.record_count);
            $(".noOfMessages").text(result.record_count);
            $(".noOfMessageApps").prop("data-percent", result.record_count);
            $(".noOfMessageApps").attr("data-percent", result.record_count);
            $(".messageNotesContent").append("<li> <div class='uk-grid' data-uk-grid-margin> <div class='uk-width-2-10'>   </div>  <div class='uk-width-7-10'>  <div class='uk-grid' data-uk-grid-margin> <div class='uk-width-6-10'> No Messages Found </div> <div class='uk-width-4-10'>   </div> </div>   </div> </div> </li> ");
        } else {
            $(".noOfAppMessages").text(result.record_count);
            $(".noOfMessages").text(result.record_count);
            var checkApiUrl = "";
            var getImage = "";
            for (workLogNotes in result.records) {
                checkApiUrl = result.records[workLogNotes].GetImage;
                checkApiUrl = checkApiUrl.slice(0,3);
                if(checkApiUrl=="api"){
                    getImage = domainAddress+result.records[workLogNotes].GetImage;
                } 
                else{
                    getImage = domainAddress+result.records[workLogNotes].GetImage;
                }
                $(".messageNotesContent").append("<li> <div class='uk-grid' data-uk-grid-margin> <div class='uk-width-2-10'> <img src='"+getImage+"' class='imgUserCircle'/> </div>  <div class='uk-width-7-10'>  <div class='uk-grid' data-uk-grid-margin> <div class='uk-width-6-10'> <h3><b>"+result.records[workLogNotes].WorkAssignedBy+"</b></h3> </div> <div class='uk-width-4-10'> <span class='dashWorkLogDate'>"+moment(result.records[workLogNotes].WorkCreatedDate).format('Do MMM YYYY,  h:mm a')+"</span> </div> </div> <p class='dashWorkLogContent'>"+result.records[workLogNotes].Content+"</p> <p class='dashWorkLogCaseNo'> <a href='https://agent.myrequest.co.uk/particularProblem.php?ProblemID="+result.records[workLogNotes].RequestID+"' style='cursor:poiter;'>( Request # "+result.records[workLogNotes].RequestID+" )</a> </p> </div> </div> </li> <hr/>");
            }   


            $(" .getMessages").on('click', function() {
                var getWorkLogID = this.id.replace('getMessages-', '');
                var getName = $("#getMessages-" + getWorkLogID).text();
                //console.log(getName);
            });
            $(".sendReply").on('click', function() {
                var getWorkLogID = this.id.replace('sendReply-', '');
                var getInputReply = $("#inputReply-" + getWorkLogID).val();
                var getStatus = "Notes";
                var getProblemID = $("#hiddenProblemID-" + getWorkLogID).val();
                var getWorkAssignedBy = localStorage.getItem("MyRequest_UserName");
                if (getInputReply == "") {
                    alert("Enter the Reply Content");
                    return false;
                } else {
                    //console.log(getWorkLogID + " || " + getInputReply + " || " + getStatus + " || " + getProblemID + " || " + getWorkAssignedBy);
                    $("#inputReply-" + getWorkLogID).val('');
                }
            });
        }
        getMessages = result.record_count;
        $(".MessageCount").text(getMessages);

       

    });
  }