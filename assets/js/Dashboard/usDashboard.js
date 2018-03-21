$(function() {
    var getCountry = localStorage.getItem("MyRequest_countryCode");
    var adminType = localStorage.getItem("MyRequest_AdminType");
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

    if(adminType == "SuperAdmin"){
        if(getNewCountryCode == "US"){
            $("#dashTotalIcon").removeClass();
            $("#dashTotalIcon").addClass("fa fa-usd");
            $("#repairChargeIcon").removeClass();
            $("#repairChargeIcon").addClass("fa fa-usd");
            $("#commissionEarnedIcon").removeClass();
            $("#commissionEarnedIcon").addClass("fa fa-usd");
        } else if(getNewCountryCode == "Canada"){
            $("#dashTotalIcon").removeClass();
            $("#dashTotalIcon").addClass("fa fa-usd");
            $("#repairChargeIcon").removeClass();
            $("#repairChargeIcon").addClass("fa fa-usd");
            $("#commissionEarnedIcon").removeClass();
            $("#commissionEarnedIcon").addClass("fa fa-usd");
        } else if(getNewCountryCode == "India"){
            $("#dashTotalIcon").removeClass();
            $("#dashTotalIcon").addClass("fa fa-inr");
            $("#repairChargeIcon").removeClass();
            $("#repairChargeIcon").addClass("fa fa-inr");
            $("#commissionEarnedIcon").removeClass();
            $("#commissionEarnedIcon").addClass("fa fa-inr");
        } else {
            $("#dashTotalIcon").removeClass();
            $("#dashTotalIcon").addClass("fa fa-gbp");
            $("#repairChargeIcon").removeClass();
            $("#repairChargeIcon").addClass("fa fa-gbp");
            $("#commissionEarnedIcon").removeClass();
            $("#commissionEarnedIcon").addClass("fa fa-gbp");
        }
    }


    $('#full_screen_toggle').on('click',function(e) {
        e.preventDefault();
        screenfull.toggle();
        $window.resize();
    });

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
    adminUserID = localStorage.getItem("MyRequest_AdminID");
    adminUserName = localStorage.getItem("MyRequest_UserName");
    var adminType = localStorage.getItem("MyRequest_AdminType");
    var businessName = localStorage.getItem("MyRequest_BusinessName");   
    var logo = localStorage.getItem("MyRequest_Logo");
    
    if (adminType == "USSuperAdmin" ) {
        $(".myRequestAdminLogo").addClass("requestAdminLogo");
        $(".requestAdminLogo").removeClass("myRequestAdminLogo");
        $(".createCaseButton").hide();
        $("#lettingAgentMenu").hide();
        $("#superAdminMenu").hide();
        $("#ussuperAdminMenu").show();
        $(".getTenantWorkList").hide();
    }

    $(".md-overlay").css("background","rgba(0,0,0,0.5)");
    $("#getLoadingModalContent").addClass('md-show');    
    $("#getLettingAgents").select2();

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
        $.get(domainAddress + "getAdminDetails/" + adminUserID, function(result) {
            if (result.record_count == 0) {
                $(".getUserName").text('No User');
            } else {
                for (var getUserInfo in result.records) {
                    $(".getUserName").text(result.records[getUserInfo].AdminFirstName+" "+result.records[getUserInfo].AdminLastName);
                }
            }
        });
    }

    if(adminType == "SuperAdmin" ||  adminType == "UKSuperAdmin" || adminType == "USSuperAdmin" ) {
        var Getcountry = '';
        if (adminType == "SuperAdmin"){
            Getcountry = "All";
        } 

        if(adminType == "UKSuperAdmin"){
            Getcountry = "UK";
        }

        if(adminType == "USSuperAdmin"){
            Getcountry = "US";
        }

        $(".forAdmin").hide();
        $(".forSuperAdmin").show();
        $("#pieChartLoc").show();
        $(".getLettingAgencyBusinessName").text("Dashboard");
        loadAllLettingAgentDetails();

        $.get(domainAddress + "GetAllLettingAgentDetailsByCountry/" +Getcountry, {}, function(result) {
            $("#getLettingAgents").html('');
            if (result.record_count == 0) {
                $("#getLettingAgents").html("<option value='0'>No Letting Agent Found</option>");
            } else {
                // $("#getLettingAgents").html("<option value='0'>Select Letting Agent</option>");
                $("#getLettingAgents").html("<option value='All'>All</option>");
                for (var lettingAgents in result.records) {
                    $("#getLettingAgents").append("<option value='" + result.records[lettingAgents].Admin_ID + "'>" + result.records[lettingAgents].AdminFirstName + " " + result.records[lettingAgents].AdminLastName + " - " + result.records[lettingAgents].BusinessName + "</option>");
                }
            }
        });

        $("#getLettingAgents").on('change',function(){
            if (this.value == "All"){
                loadAllLettingAgentDetails();
            } else {
                loadParticularLettingAgentDetails(this.value);
            }
        });

        function loadAllLettingAgentDetails(){

            // Get All Letting Agent Awaiting Approval For SuperAdmin Starts
            $(".noOfApprovalRequired").html('');
            $.get(domainAddress + "GetAllApprovalListRequestForSuperAdmin/"+Getcountry, {}, function(result) {
                if (result.record_count == 0) {
                    $(".noOfApprovalRequired").text(0);
                } else {
                    $(".noOfApprovalRequired").text(result.record_count);
                }
            });
            // Get All Letting Agent Awaiting Approval For SuperAdmin Ends

            // Get All Tenants Count For SuperAdmin Starts
            $.get(domainAddress + 'GetTotalTenantsForSuperAdmin/'+Getcountry, {}, function(result) {
                if(result.record_count == 0){
                    $("#dashPproperties").text(0);
                    $("#dashTenants").text(0);
                    $(".noOfAppInstalled").text(0);
                    $(".noOfTenants").text(0);
                    $(".noOfApps").prop("data-percent", 0);
                    $(".noOfApps").attr("data-percent", 0);
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
            // Get All Tenants Count For SuperAdmin Ends

            // Get All Contractors Count For SuperAdmin Starts
            $.get(domainAddress + 'GetTotalTenantContractorsForSuperAdmin/'+Getcountry, {}, function(result) {
                if (result.record_count == 0) {
                    // $(".noOfAppContractors").text(0);
                    // $(".noOfContractors").text(0);
                    // $(".noOfContractorApps").prop("data-percent", 0);
                    // $(".noOfContractorApps").attr("data-percent", 0);
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
            // Get All Contractors Count For SuperAdmin Ends

            // Get All Repairs Charges For SuperAdmin Starts
            $.get(domainAddress + "GetDashboardDetailsForSuperAdmin/"+Getcountry, {}, function(result) {
                for (var getDashBoardValuesForSuperadmin in result.records) {
                    $("#dashComplaints").text(result.records[getDashBoardValuesForSuperadmin].TotalComplaints);
                    $("#dashOpen1").text(result.records[getDashBoardValuesForSuperadmin].NoOpen);
                    $("#dashClose").text(result.records[getDashBoardValuesForSuperadmin].NoCompleted);
                     
                    if(result.records[getDashBoardValuesForSuperadmin].TotalAmount == null){
                        $("#dashAmount").css("font-size","20px");
                        $("#dashAmount").text(0);
                    } else {
                        if (result.records[getDashBoardValuesForSuperadmin].TotalAmount.length > 7){
                            $("#dashAmount").css("font-size","24px");
                            $("#dashAmount").text(parseFloat(result.records[getDashBoardValuesForSuperadmin].TotalAmount).toFixed(2));
                        } else {
                            $("#dashAmount").css("font-size","20px");
                            $("#dashAmount").text(parseFloat(result.records[getDashBoardValuesForSuperadmin].TotalAmount).toFixed(2));
                        }
                    }
                    getTotalAmount = result.records[getDashBoardValuesForSuperadmin].TotalAmount;
                    $(".dashTotalAmount").text(getTotalAmount);
                    var totPerComplaints = parseInt(result.records[getDashBoardValuesForSuperadmin].NoOpen) / parseInt(result.records[getDashBoardValuesForSuperadmin].TotalAmount);
                    totPerComplaints = totPerComplaints * 100;

                    var Daysleft = result.records[getDashBoardValuesForSuperadmin].DateDiff;
                    if(Daysleft == undefined || Daysleft == '' || Daysleft == '0'){
                        $(".dashTotalDaysLeft").text(0);
                    } else {
                        $(".dashTotalDaysLeft").text(Daysleft);
                    }
                }
            });
            // Get All Repairs Charges For SuperAdmin Ends

            // Get All MoveIn & MoveOut Counts For SuperAdmin Starts
            $.get(domainAddress + "GetUtilityStatusCountForSuperAdmin/"+Getcountry, {}, function(result) {
                $(".countUpMoveIn").html(result.countMoveIn);
                $(".countUpMoveOut").text(result.countMoveOut);                  
            }); 
            // Get All MoveIn & MoveOut Counts For SuperAdmin Ends

            // Get All Works Pie Chart For SuperAdmin Starts
            $.get(domainAddress + "GetAllProblemWorkStatusCount/"+Getcountry, {}, function(result) {
                pieChartData = new Array();

                var myLine;
                pieChartData = new Array();
                statusCount = {};

                if(result.record_count==0){
                    $(".getRepairStatus").show();
                    $("#smallPieChartLocAdmin").hide();
                    $("#repairStatus").show();
                    $("#repairStatus").text("No status found");
                } else {
                    $(".getRepairStatus").show();
                    $("#repairStatus").hide();
                    $("#smallPieChartLocAdmin").show();
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
                    }
                    var myLine = new Chart(document.getElementById("smallPieChartLocAdmin").getContext("2d")).Pie(pieChartData);
                }
                
            });
            // Get All Works Pie Chart For SuperAdmin Ends
            
        }

        function loadParticularLettingAgentDetails(adminUserID){

            // Get Particular Admin Awaiting Approval Starts
            $(".noOfApprovalRequired").html('');
            $.get(domainAddress + "GetAllApprovalList/" + adminUserID, {}, function(result) {
                if (result.record_count == 0) {
                    $(".noOfApprovalRequired").text(0);
                } else {
                    $(".noOfApprovalRequired").text(result.record_count);
                }
            });
            // Get Particular Admin Awaiting Approval Ends

            // Get Particular Admin Tenants Count Starts
            $.get(domainAddress + 'GetTotalTenants/' + adminUserID, {}, function(result) {
                if(result.record_count == 0){
                    $("#dashPproperties").text(0);
                    $(".noOfAppInstalled").text(0);
                    $(".noOfTenants").text(0);
                    $(".countTenantAppInstalled").prop("data-percent", "0");
                    $(".countTenantAppInstalled").attr("data-percent", "0");
                } else {
                    $("#dashPproperties").text(result.record_count);
                    $(".noOfAppInstalled").text(result.records[0].TenantCountInstalledApp);
                    $(".noOfTenants").text(result.records[0].TenantCount);
                    var totalCount = parseInt(result.records[0].TenantCountInstalledApp) / parseInt(result.records[0].TenantCount);
                    totalCount = parseInt(totalCount * 100);                    
                    $(".countTenantAppInstalled").prop("data-percent", totalCount);
                    $(".countTenantAppInstalled").attr("data-percent", totalCount);
                }
            });
            // Get Particular Admin Tenants Count Ends

            // Get Particular Admin Contractors Count Starts
            $.get(domainAddress + 'GetAdminTenantContractorListCount/' + adminUserID, {}, function(result) {
                if (result.record_count == 0) {
                    $(".noOfAppContractors").text(0);
                    $(".noOfContractors").text(0);
                    $(".countContractorAppInstalled").prop("data-percent", 0);
                    $(".countContractorAppInstalled").attr("data-percent", 0);
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
            // Get Particular Admin Contractors Count Ends

            // Get Particular Admin Repairs Charges Starts
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

                    if(result.records[getDashBoardValues].TotalAmount == null){
                        $("#dashAmount").css("font-size","20px");
                        $("#dashAmount").text(0);
                    } else {
                        if (result.records[getDashBoardValues].TotalAmount.length > 7){
                            $("#dashAmount").css("font-size","24px");
                            $("#dashAmount").text(parseFloat(result.records[getDashBoardValues].TotalAmount).toFixed(2));
                        } else {
                            $("#dashAmount").css("font-size","20px");
                            $("#dashAmount").text(parseFloat(result.records[getDashBoardValues].TotalAmount).toFixed(2));
                        }
                    }

                    $(".dashComplaints").text(result.records[getDashBoardValues].TotalComplaints);
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
            // Get Particular Admin Repairs Charges Ends

            // Get Particular Admin MoveIn & MoveOut Counts Starts
            $.get(domainAddress + "GetAllUtilityStatusCountAdmin1/" + adminUserID, {}, function(result) {
                $(".countUpMoveIn").html(result.countMoveIn);
                $(".countUpMoveOut").text(result.countMoveOut);
            });
            // Get Particular Admin MoveIn & MoveOut Counts Ends

            // Get Particular Admin Works Pie Chart For SuperAdmin Starts
            $.get(domainAddress + "GetAllProblemWorkStatusCountAdmin/" + adminUserID, {}, function(result) {
                var myLine;
                pieChartData = new Array();
                statusCount = {};

                if(result.record_count==0){
                    $(".getRepairStatus").show();
                    $("#smallPieChartLocAdmin").hide();
                    $("#repairStatus").show();
                    $("#repairStatus").text("No status found");
                } else {
                    $(".getRepairStatus").show();
                    $("#repairStatus").hide();
                    $("#smallPieChartLocAdmin").show();
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
                    }
                    var myLine = new Chart(document.getElementById("smallPieChartLocAdmin").getContext("2d")).Pie(pieChartData);
                }
                
            });
            // Get Particular Admin Works Pie Chart For SuperAdmin Ends

        }

    } else {
        $(".forAdmin").show();
        $(".forSuperAdmin").hide();
        $("#pieChartLoc").hide();
        $(".getLettingAgencyBusinessName").text("Dashboard - " + businessName);
        if(logo==undefined || logo==null || logo=="undefined" || logo=="Fail upload folder with read access."){
            $(".myRequestAdminLogo").attr("src", "assets/img/myRequestLogo.png").show();
        } else {
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
        });        
    }

}); // ready