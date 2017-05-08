 $(function() {

    $('#full_screen_toggle').on('click', function(e) {
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

 var problemID = 0;
 var problemImage = "";
 var notes = "";
 var unitID = 0;
 var unitName = "";
 var specialityID = 0;
 var specialityName = "";
 var problemUserNameID = 0;
 var name = "";
 var problemEmailID = 0;
 var emailID = "";
 var problemPhoneNumber = 0;
 var phoneNumber = "";
 var contractorID = 0;
 var contractorName = "";
 var buildingName = "";
 var workName = "";
 var workDesc = "";
 var isAssignCheck = "";
 var problemCountLimit = 0;
 var getProblemDetailsAsObject = new Array();

 var getBlockDates = new Array();
 var newItem = {};
 var getProblemID = 0;
 var getContractorName = "";
 var getProblemNotes = "";
 var getStartDate = "";
 var getEndDate = "";
 var getProblemStatus = "";
 var getAssignStatus = "";
 var getColor = "";
 var getTitle = "";
 var workAssign = "";
 var assignColor = "";
 var recordCountOnReady = 0;
 var adminUserID = 0;
 var localProblemStatus = "";
 var getValue = "";
 var dataForm = "";
 var sendURL = "";
 var loadCountRecordValue = 0;
 var addStartDate = "";
 var addEndDate = "";
 var imageUrl1 = "";
 var inputWhenDate = "";
 var inputWhenTime = "";
 var getDate = "";
 var countDateTime = 0;
 var businessName = "";

 $(window).load(function() {
    $("#getLoadingModalContent").removeClass('md-show');
});

 $(document).ready(function() {
    console.log("ready call");
    adminUserID = localStorage.getItem("MyRequest_AdminID");
    var adminUserName = localStorage.getItem("MyRequest_UserName");
    var adminType = localStorage.getItem("MyRequest_AdminType");

    businessName = localStorage.getItem("MyRequest_BusinessName");
    var logo = localStorage.getItem("MyRequest_Logo");
    localProblemStatus = localStorage.getItem("MyRequest_RepairStatus");

    $(".md-overlay").css("background", "rgba(0,0,0,0.5)");
    $("#getLoadingModalContent").addClass('md-show');
    var isFilled = localStorage.getItem("MyRequest_profileFill");
    if (isFilled == "true") {

        window.location.href = domainAgentAddress+'MyProfile.html';
    }


    if (adminUserID == "" || adminUserID == null) {
        window.location.href = "index.html";
    } else {
        $(".getUserName").text(adminUserName);
        $("#FileURLUploadRequestImage1").attr("action",domainAddress+"ajaxrequestimage.php");

    }

    if (adminType == "SuperAdmin") {
        $(".superAdmin").show();
    } else {
        getDateDiff(adminUserID);
        $(".superAdmin").hide();
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
    }

    if (localProblemStatus == "" || localProblemStatus == null) {

    } else {
        $("#getAssignStatusType").val(localProblemStatus);
        if (localProblemStatus == "!Completed") {
            $("#getAssignStatusType").val("");
        }
    }


    $("#previousPage").attr("disabled", true);

    recordCountOnReady = 0;

    loadProblems(getValue);



    $.get(domainAddress + "GetAllSpecialityList/"+adminUserID, {}, function(result) {
                    //console.log(result);
                    $("#caseSpecialisation").html('');

                    if(result.record_count==0){
                        $("#caseSpecialisation").html("<option value='0'>Select Speciality</option>");
                        $("#caseSpecialisation").html("<option value='0'>No Speciality Found</option>");
                    }
                    else{
                     $("#caseSpecialisation").html("<option value='0'>Select Speciality</option>");
                     for (var Speciality in result.records) {
                        $("#caseSpecialisation").append("<option value='" + result.records[Speciality].SpecialityID + "'>" + result.records[Speciality].SpecialityName + "</option>");
                    }
                    $("#caseContractor").html("");
                    $("#caseContractor").html("<option value='0'>Select Speciality to view Contractor</option>");
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
                                $("#caseProperty").append("<option value='" + result.records[Property].PropertyRegister + "' ref='"+ result.records[Property].PropAddress + "-" + result.records[Property].PropCity + "-" + result.records[Property].PropState + "-" + result.records[Property].PropCountry + "-" + result.records[Property].PropPostalCode +"' refLat='"+result.records[Property].PropertyLatitude+"' refLng='"+result.records[Property].PropertyLongitude+"'>" + result.records[Property].PropOwnerName + "-" + result.records[Property].PropAddress + "-" + result.records[Property].PropCity + "-" + result.records[Property].PropState + "-" + result.records[Property].PropCountry + "-" + result.records[Property].PropPostalCode + "</option>");
                            }
                        }
                    }
                    $("#caseProperty").select2();
                }); // GetAllEventList




 $('#startDate').on('change.bfhdatepicker', function(e) {
                    //console.log(this.value);
                });


 $('#endDateValue').on('change.bfhdatepicker', function(e) {
                    //console.log(this.value);
                });


 $("#startDate").mouseover(function() {
    $("#startDate").css("cursor", "pointer");
});

 $("#endDateValue").mouseover(function() {
    $("#endDateValue").css("cursor", "pointer");
});

 $('#startDate').val("Select Start Date");
 $("#endDateValue").val("Select End Date");
 $(".getLettingAgencyBusinessName").text("Repair Requests - " + businessName );



 $("#getAssignStatusType").select2();

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




$("#advancedSearch").on('click', function() {
    $(".md-input-wrapper").addClass("md-input-filled");
    $("#startDate").val('Select Start Date');
    $("#endDateValue").val('Select End Date');
    $("#formRow").toggle('slow');
                /*problemCountLimit=0;
                $(".ListAllProblem").html("");
                loadProblems(getValue);*/
            });

$(".btnSearch").click(function() {
    problemCountLimit = 0;
    getValue = $("#searchCase").val();
    $(".ListAllProblem").html("");
    loadProblems(getValue);
});


function loadProblems(getValue) {
    console.log("for getValue : " + getValue + " Limit : " + problemCountLimit);

    if (getValue == "" || getValue == undefined) {
        dataForm = '{"Limit":"' + parseInt(problemCountLimit) + '","ProblemStatus":"' + localProblemStatus + '","AdminID":"' + adminUserID + '"}';
        sendURL = domainAddress + "AllProblemByCount";
    } else if (getValue == "ParticularAdvancedSearch") {

        dataForm = '{"Limit":"' + parseInt(problemCountLimit) + '","StartDate":"' + addStartDate + '","EndDate":"' + addEndDate + '","AdminID":"' + adminUserID + '"}';
        sendURL = domainAddress + "ParticularAdvancedSearch";
    } else {
        dataForm = '{"Limit":"' + parseInt(problemCountLimit) + '","SearchValue":"' + getValue + '","AdminID":"' + adminUserID + '"}';
        sendURL = domainAddress + "SearchProblem";
    }


    console.log(dataForm);
    console.log(sendURL);




    $(".loading").show();
    $.ajax({
        type: "POST",
        url: sendURL,
        data: dataForm,
        success: function(data) {
            console.log(data);
            loadCountRecordValue = data.record_count;
            if (data.record_count == 0 || data.All_Records_Count == 0) {
                if (recordCountOnReady == 0) {
                    console.log("No records found on page ready");
                    $(".ListAllProblem").html("");
                    $(".ListAllProblem").html("<tr id='rowID-0'> <td id='problemID-0'>No records Found</td>  <td id='problemImage-0'> </td>  <td id='specialityName-0'> </td>   <td id='contractorName-0'> </td> <td id='userName-0'> </td> <td> </td> <td> </td> <td> </td> <td> </td> <td> </td> </tr>");
                    $("#getLoadingModalContent").removeClass('md-show');
                } else {
                    console.log("that's all db values");
                }

                $(".pageCount").hide();
                $(".loading").hide();
                $("#btnGetProblemList").attr("disabled", true);
                $("#SearchProblem").css("cursor", "default");
                $(".btnAssign").attr("disabled", true);
                $(".btnGetAll").attr("disabled", true);
            } else {

                $("#btnGetProblemList").attr("disabled", false);
                $("#btnPrintAllProblems").attr("disabled", false);
                $("#getExcel").attr("disabled", false);
                $(".btnAssign").attr("disabled", false);
                $(".btnGetAll").attr("disabled", false);
                if (localProblemStatus == "Completed") {
                    $("#fixedAmount").show();
                } else {
                    $("#fixedAmount").hide();
                }

                if (localProblemStatus == "Closed") {
                    $("#closed").hide();
                } else {
                    $("#closed").show();
                }

                if (data.record_count < 5) {
                    $("#btnGetProblemList").attr("disabled", true);
                } else {
                    $("#btnGetProblemList").attr("disabled", false);
                }

                for (var Problem in data.ProblemRecord) {
                    $(".loading").hide();
                    var showStatus = "";
                    problemID = data.ProblemRecord[Problem].ProblemID;
                    problemImage = decodeURIComponent(data.ProblemRecord[Problem].ProblemImage);
                    notes = data.ProblemRecord[Problem].ProblemNotes;
                    var ContractorID = data.ProblemRecord[Problem].ContractorID;
                    var specialityName = data.ProblemRecord[Problem].SpecialityName;
                    var name = data.ProblemRecord[Problem].Name;
                    var emailID = data.ProblemRecord[Problem].EmailID;
                    var phoneNumber = data.ProblemRecord[Problem].PhoneNumber;
                    var contractorCount = 0;
                    var isAssign = data.ProblemRecord[Problem].AssignStatus;


                    if (isAssign == "Awaiting Info") {
                        showStatus = "AwaitingInfo";
                    } else if (isAssign == "Assigned") {
                        showStatus = "Assigned";
                    } else if (isAssign == "Awaiting Approval") {
                        showStatus = "AwaitingApproval";
                    } else if (isAssign == "Approved") {
                        showStatus = "Approved";
                    } else if (isAssign == "CheckIn") {
                        showStatus = "CheckIn";
                    } else if (isAssign == "Started") {
                        showStatus = "Started";
                    } else if (isAssign == "Completed") {
                        showStatus = "Completed";
                    } else if (isAssign == "Closed") {
                        showStatus = "Closed";
                    }


                    if (ContractorID == "" || ContractorID == null) {

                        contractorCount = 0;
                        contractorName = "";
                    } else {
                        var contractorName = "";
                        for (var contractor in data.ProblemRecord[Problem].Count) {
                            contractorCount = data.ProblemRecord[Problem].Count[contractor].CountContractor;
                            contractorName = data.ProblemRecord[Problem].Count[contractor].ContractorName;
                        }
                    }


                    var getProblemCreateArr = data.ProblemRecord[Problem].DateTime.split(" ");
                    var getContractorDate = getProblemCreateArr[0].split("-");
                    var getCreateMomentDate = getContractorDate[0] + getContractorDate[1] + getContractorDate[2];
                                    // var getMoment = moment(data.ProblemRecord[Problem].DateTime, "YYYYMMDD").fromNow();
                                    var getDate = moment(data.ProblemRecord[Problem].DateTime, "YYYY-MM-DD HH:mm:ss +00:00  [UTC]").local().format("YYYY-MM-DD HH:mm:ss +00:00 [UTC]");
                                    var timezone = jstz.determine();
                                    var getLocalZone = timezone.name();

                                    var getMoment = moment(getDate).tz(getLocalZone).format('YYYY-MM-DD HH:mm:ss [UTC]');
                                    getMoment = moment(getMoment).fromNow();
                                    if (getMoment == "Invalid date")
                                        getMoment = moment(data.ProblemRecord[Problem].DateTime, "YYYY-MM-DD HH:mm:ss +00:00  [UTC]").local().fromNow();



                                    $(".ListAllProblem").append("<tr style='border-top: 2px solid #D9D9D9;' id='problemRow-" + data.ProblemRecord[Problem].ProblemID + "' class='all isAssignCheck-" + showStatus + "'> <td id='problemID-" + data.ProblemRecord[Problem].ProblemID + "' class='problemAlign'style='vertical-align:middle;text-align:center;'> " + data.ProblemRecord[Problem].RequestID + "<br/><span class='momentBox'>(" + getMoment + ")</span></td><td id='problemImageID-" + data.ProblemRecord[Problem].ProblemID + "' class='problemImageSize'style='vertical-align:middle;'>  <a href='particularProblem.php?ProblemID=" + data.ProblemRecord[Problem].ProblemID + "''>    <span  id='problemImage-" + data.ProblemRecord[Problem].ProblemID + "'>   </span> </a></td>  <td id='problemSpecialityNameID-" + data.ProblemRecord[Problem].ProblemID + "' class='problemAlign'style='vertical-align:middle'> <span id='speciality-" + data.ProblemRecord[Problem].ProblemID + "'>  </span> </td> <td  id='problemContractorNameID-" + data.ProblemRecord[Problem].ProblemID + "' class='problemAlign'style='vertical-align:middle'> <span class='getContractor' id='contractor-" + data.ProblemRecord[Problem].ProblemID + "' name='" + ContractorID + "'> </span> </td> <td id='problemUserNameID-" + data.ProblemRecord[Problem].ProblemID + "' class='problemAlign'style='vertical-align:middle'> <span id='userName-" + data.ProblemRecord[Problem].ProblemID + "'>  </span> </td> <td id='problemEmailID-" + data.ProblemRecord[Problem].ProblemID + "' class='problemAlign'style='vertical-align:middle'> <span id='emailID-" + data.ProblemRecord[Problem].ProblemID + "'>  </span> </td> <td id='problemPhoneNumber-" + data.ProblemRecord[Problem].ProblemID + "' class='problemAlign'style='vertical-align:middle'> <span id='phoneNumber-" + data.ProblemRecord[Problem].ProblemID + "'>  </span> </td>   <td class='problemAlign'style='vertical-align:middle''><a href='particularProblem.php?ProblemID=" + problemID + "' class='linkColor'>" + isAssign + "</a></td> <td id='getFixedAmount-" + problemID + "' style='display:none;vertical-align:middle;text-align: center;'> </td> <td id='getClosed-" + data.ProblemRecord[Problem].ProblemID + "' class='problemAlign' style='vertical-align:middle''> <button type='button' class='md-btn md-btn-primary isArchive' id='isArchive-" + data.ProblemRecord[Problem].ProblemID + "' data-on-label='Archive'>Close</button></td></tr>");





                                    if (localProblemStatus == "Closed") {
                                        $("#getClosed-" + data.ProblemRecord[Problem].ProblemID).hide();
                                    } else {
                                        $("#getClosed-" + data.ProblemRecord[Problem].ProblemID).show();
                                    }



                                    if (localProblemStatus == "Completed") {
                                        fixedAmount = data.ProblemRecord[Problem].FixedAmount;
                                        if (fixedAmount == null || fixedAmount == "") {
                                            fixedAmount = "--";
                                        } else {
                                            fixedAmount = "<i class='fa fa-gbp'></i> " + fixedAmount;
                                        }
                                        $("#getFixedAmount-" + problemID).show();
                                        $("#getFixedAmount-" + problemID).append(fixedAmount);
                                    } else {
                                        $("#getFixedAmount-" + problemID).hide();
                                        $("#getFixedAmount-" + problemID).html("");
                                    }

                                    $("#problemImage-" + problemID).html("<img src='assets/img/no_image.jpg' alt='NoProblemImage' style='width: 112px;height: 101px;' />");
                                    
                                    if (problemImage == null || problemImage == "null" || problemImage == "" || problemImage == "[object TiUIImageView]" || problemImage == "[object ImageView]") {
                                        $("#problemImage-" + problemID).html("<img src='assets/img/no_image.jpg' alt='NoProblemImage' style='width: 112px;height: 101px;' />");
                                    } else {

                                        $("#problemImage-" + problemID).html("<img src='" + domainAddress + problemImage + "' alt='problemImage' style='width: 112px;height: 101px;' />");
                                    }

                                    if (contractorName == null || contractorName == "") {
                                        $("#contractor-" + problemID).html("<span class='reportNoCountTdSpan' id='contractorCount-" + ContractorID + "'>!</span> <span> Unassigned</span>");
                                    } else if (contractorName != null) {
                                        if (contractorName == "null null") {
                                            $("#contractor-" + problemID).html("<span class='reportNoCountTdSpan' id='contractorCount-" + ContractorID + "'>!</span> <span> Unassigned</span>");
                                        } else {
                                            $("#contractor-" + problemID).append("<span class='reportCountTdSpan' id='contractorCount-" + ContractorID + "'>" + contractorCount + "</span> " + contractorName);
                                            $("#contractor-" + problemID).css("cursor", "pointer");
                                        }
                                    }




                                    if (specialityName == null) {
                                        $("#speciality-" + problemID).html("No Speciality Found");
                                    } else if (specialityName != null) {
                                        $("#speciality-" + problemID).append("<a href='particularProblem.php?ProblemID=" + problemID + "' class='linkColor'>" + specialityName + "</a> ");
                                    }

                                    if (name == null) {
                                        $("#userName-" + problemID).html("No UserName Found");
                                    } else if (name != null) {
                                        $("#userName-" + problemID).append("<a href='particularProblem.php?ProblemID=" + problemID + "' class='linkColor'>" + name);
                                    }

                                    if (emailID == null) {
                                        $("#emailID-" + problemID).html("No EmailID Found");
                                        //$("#emailID-" + problemID).append("<a href='mailto:" + businessEmail + "' target='_top'>" + businessEmail + "</a> ");
                                    }  else if (emailID != null) {
                                        $("#emailID-" + problemID).append("<a href='mailto:" + emailID + "' target='_top'>" + emailID + "</a> ");
                                    }

                                    if (phoneNumber == null) {
                                        $("#phoneNumber-" + problemID).html("No PhoneNumber Found");
                                    } else if (phoneNumber != null) {
                                        $("#phoneNumber-" + problemID).append("<a href='tel:" + phoneNumber + "'>" + phoneNumber + "</a> ");
                                    }

                                    //if (emailID == "No EmailID Found") {
                                    //    alert("hai");
                                    //}

                                    //for (var adminDetails in result.records) {

                                    //    $(".caseList").append("<tr> <td>" + result.records[adminDetails].businessEmail + "</td> <td>" + result.records[adminDetails].phoneNumber + "</td>  </tr>");
                                    //}

                                    /*     if(data.ProblemRecord[Problem].ProblemStatus=="Closed"){
                                            $(".getIsClose").hide();
                                        }
                                        else{
                                            $(".getIsClose").show();
                                        }  */




                                } // for




                                /* $('#caseList').DataTable({
                                 createdRow: function ( row ) {
                                 $('td', row).attr('tabindex', 0);
                                 }                      
                                 });    
                                $(".dataTables_paginate").hide();
                                $(".dataTables_length").hide();
                                $(".dataTables_info").hide();
                                $("#caseList_filter").hide();
                                $("#caseList_length").hide(); */


                                /*  $(".getIsClose").on("click",function(e){   
                            getProblemID = this.id.replace('isClose-','');
                            //alert(getProblemID);
                              UIkit.modal.confirm('Are you sure want to close the case?', function(e){
                            console.log(e); 
                            if(e==false){   
            
                            }   
                            else{
                                isCloseStatus = 1;
                                var dataForm = '{"IsClose":"'+isCloseStatus+'"}';
                                var sendURL = domainAddress + 'UpdateProblemClosed/' + getProblemID;
                                console.log(sendURL);
                                $.ajax({
                                    type: "POST",
                                    url: sendURL,
                                    data: dataForm,
                                success: function(dataCheck) {
                                    console.log(dataCheck);
                                    $(".ListAllProblem").html("");
                                    problemCountLimit=0;
                                    var dataForm = '{"Limit":"'+parseInt(problemCountLimit)+'","ProblemStatus":"'+localProblemStatus+'"}';
                                    console.log(dataForm);
                                    var sendURL = domainAddress+"AllProblemByCount"; 
                                            
                                    loadProblems(getValue);
                                    alert('Problem Closed Successfully');
                                          
                                    }   
                                });
                            }
                            
                        }); 
                            
});          */

 $(".isArchive").off('click').on('click', function(event) {
    getProblemID = this.id.replace('isArchive-', '');

    UIkit.modal.confirm('Do you want to close the case?', function(e) {
                                        // console.log(e);
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
                                                $(".ListAllProblem").html("");
                                                problemCountLimit = 0;
                                                loadProblems(getValue);
                                                UIkit.modal.alert('Request Closed Successfully');

                                            }
                                        });
                                    });
});




 $(".getContractor").off('click').on('click', function(event) {

    var getProblemId = this.id.replace('contractor-', '');
    var getContractorID = $("#" + this.id).attr("name");
    //console.log(getContractorID);
    if(getContractorID != "null"){
        $.get(domainAddress + "GetContractor/" + getContractorID, {}, function(result) {
        console.log(result);
        if (result.record_count == 0) {
            /* modal hide*/
            $("#contractorName").text("");
            $("#contractorPhone").text("");
            $("#contractorEmail").text("");
            $("#contractorCity").text("");
            $("#contractorState").text("");
            $("#contractorZip").text("");
            $("#contractorValidTill").text("");
        } else {
            for (var contractor in result.records) {
                var getPhoneNumber = result.records[contractor].phoneNo1;

                $("#contractorName").text(result.records[contractor].ContractorName);

                if (contractorPhone == undefined || contractorPhone == null) {
                    $("#contractorPhone").text("No Phone Number Found");
                } else {
                    var getPhoneNumber = result.records[contractor].phoneNo1;
                    $("#contractorPhone").text(getPhoneNumber);
                }

                var getEmail = result.records[contractor].emailID;
                if (contractorEmail == undefined || contractorEmail == null) {
                    $("#contractorEmail").html("<a target='_top'>No Email Found</a>");
                } else {
                    var getEmail = result.records[contractor].emailID;
                    $("#contractorEmail").html("<a href='mailto:" + getEmail + "' target='_top'>" + getEmail + "</a>");
                }
                var getContractorUserPhoto = result.records[contractor].image1;

                if (getContractorUserPhoto == null || getContractorUserPhoto == "null") {
                    $("#contractorImage").attr("src", "assets/img/sign-in.jpg");
                } else {
                    //console.log(domainAddress+getContractorUserPhoto);
                    $("#contractorImage").attr("src", domainAddress + getContractorUserPhoto);
                }


                var contractorValidTill = result.records[contractor].ContractValidTill;
                if (contractorValidTill == undefined || contractorValidTill == null) {
                    $("#contractorValidTill").text("No Valid Till Found");

                } else {
                    var getContractorDate = contractorValidTill.split("-");
                    var getCYear = getContractorDate[0];
                    var getCMonth = getContractorDate[1];
                    var getCDate = getContractorDate[2];
                    $("#contractorValidTill").text(getCDate + "/" + getCMonth + "/" + getCYear+" [Validity Period]");
                }


                if (result.records[contractor].City == null && result.records[contractor].State == null && result.records[contractor].Zip == null && result.records[contractor].ContractValidTill == null) {
                    console.log("no contractor address details found");
                    $("#contractorCity").text("No City Found");
                    $("#contractorState").text("No County Found");
                    $("#contractorZip").text("No Postal Code Found");
                } else {
                    $("#contractorCity").text(result.records[contractor].City);
                    $("#contractorState").text(result.records[contractor].State);
                    $("#contractorZip").text(result.records[contractor].Zip);
                }

                $("#getUserContractorName").text(result.records[contractor].ContractorName + "'s Calendar");

                for (var caseCount in result.records[contractor].CaseStatus) {

                    if (result.records[contractor].CaseStatus[caseCount].ProblemStatus == "Awaiting Info") {
                        $(".awaitingInfoCount").html("(" + result.records[contractor].CaseStatus[caseCount].CountTotal + ")");
                    } else if (result.records[contractor].CaseStatus[caseCount].ProblemStatus == "Assigned") {
                        $(".assignedCount").text("(" + result.records[contractor].CaseStatus[caseCount].CountTotal + ")");
                    } else if (result.records[contractor].CaseStatus[caseCount].ProblemStatus == "Awaiting Approval") {
                        $(".awaitingApprovalCount").text("(" + result.records[contractor].CaseStatus[caseCount].CountTotal + ")");
                    } else if (result.records[contractor].CaseStatus[caseCount].ProblemStatus == "Approved") {
                        $(".approvedCount").text("(" + result.records[contractor].CaseStatus[caseCount].CountTotal + ")");
                    } else if (result.records[contractor].CaseStatus[caseCount].ProblemStatus == "Completed") {
                        $(".completedCount").text("(" + result.records[contractor].CaseStatus[caseCount].CountTotal + ")");
                    } else if (result.records[contractor].CaseStatus[caseCount].ProblemStatus == "Closed") {
                        $(".closedCount").text("(" + result.records[contractor].CaseStatus[caseCount].CountTotal + ")");
                    } else if (result.records[contractor].CaseStatus[caseCount].ProblemStatus == "CheckIn") {
                        $(".checkInCount").text("(" + result.records[contractor].CaseStatus[caseCount].CountTotal + ")");
                    } else if (result.records[contractor].CaseStatus[caseCount].ProblemStatus == "Started") {
                        $(".startedCount").text("(" + result.records[contractor].CaseStatus[caseCount].CountTotal + ")");
                    }

                }
            }




            $.get(domainAddress + "GetWorkListForContractor/" + getContractorID, {}, function(resultProblemList) {
                //console.log(resultProblemList);
                $('#calendar').html("");
                if (resultProblemList.record_count == 0) {
                    //console.log("No Problem Found");
                    $('#calendar').fullCalendar({
                        defaultDate: '2015-02-12',
                        editable: true,
                        disableDragging: true,
                        eventLimit: true, // allow "more" link when too many events
                        events: getBlockDates
                    });
                } else {


                    getBlockDates = new Array();
                    for (Problem in resultProblemList.ProblemCONTRACTORRecord) {
                        getProblemID = resultProblemList.ProblemCONTRACTORRecord[Problem].ProblemID;
                        getRequestID = resultProblemList.ProblemCONTRACTORRecord[Problem].RequestID;
                        getProblemNotes = resultProblemList.ProblemCONTRACTORRecord[Problem].Notes;
                        getStartDate = resultProblemList.ProblemCONTRACTORRecord[Problem].StartDate;
                        getEndDate = resultProblemList.ProblemCONTRACTORRecord[Problem].EndDate;
                        getProblemStatus = resultProblemList.ProblemCONTRACTORRecord[Problem].ProblemStatus;
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
                                getTitle = "Request # " + getRequestID;
                            } else {
                                getTitle = "Request # " + getRequestID + " CTOR Yet to Assign";
                            }

                            newItem = {
                                'title': getTitle,
                                'start': getStartDate,
                                'end': getEndDate,
                                'backgroundColor': getColor,
                                'problemID':getProblemID
                            };
                            getBlockDates.push(newItem);

                        }

                    } // for loop


                    $('#calendar').fullCalendar({
                        defaultDate: '2015-02-12',
                        editable: true,
                        disableDragging: true,
                        eventLimit: true, // allow "more" link when too many events
                        events: getBlockDates,

                        eventClick: function(calEvent, jsEvent, view) {
                            //console.log('Event: ' + calEvent.title);
                            var getCaseInfo = calEvent.title.split(' ');
                            var getCaseID = calEvent.problemID;
                            //console.log(getCaseID);
                                window.location.href = "particularProblem.php?ProblemID=" + getCaseID;
                            }
                        });


                    }
                }); // $.get(domainAddress+"getContractorWork/"+getContractorID
                /* modal show*/
            }

        });
        var modal = UIkit.modal("#modalContractorModal");

        modal.show();
    }  
  }); // .getContractor

 $(".problemDelete").on('click', function(e) {
    getProblemID = this.id.replace('problemDeleteID-', '');
    UIkit.modal.confirm('Are you sure?', function() {
        $.post(domainAddress + 'DeleteProblem/' + getProblemID, function(e) {
                                            //console.log(e);
                                            $("#rowID-" + getProblemID).remove();
                                            UIkit.modal.alert('Problem Deleted Successfully');
                                        });
    });
                                }); // deleteSpeciality

 problemCountLimit++;
 problemCountLimit++;
 problemCountLimit++;
 problemCountLimit++;
 problemCountLimit++;

                            } // else
                        } // success
                }); // ajax
}


$("#getAssignStatusType").on('change', function() {
    localStorage.setItem("MyRequest_RepairStatus", this.value);
    localProblemStatus = this.value;
    getValue = "";
    $(".ListAllProblem").html("");
    problemCountLimit = 0;
    loadProblems(getValue);
});



$("#btnGetProblemList").click(function() {
                //console.log("click for problemList load");
                $("#btnGetProblemList").attr("disabled", true);
                //console.log(problemCountLimit);
                loadProblems(getValue);
            }); // btnGetProblemList 




$("#getExcel").click(function() {
    if (loadCountRecordValue == 0) {
        alert("No Cases found");
    } else {
        window.open(domainAddress+'excelAllProblems.php?adminID=' + adminUserID);
    }
});




$("#searchadvancebutton").click(function() {
                //console.log("searchadvancebutton click");
                var startDate = $('#startDate').val();
                var endDateChange = $('#endDateValue').val();
                var getStartDate = startDate.split(".");
                addStartDate = getStartDate[2] + "-" + getStartDate[1] + "-" + getStartDate[0];
                var getEndDate = endDateChange.split(".");
                addEndDate = getEndDate[2] + "-" + getEndDate[1] + "-" + getEndDate[0];
                if (startDate == "Select Start Date" || startDate == "") {
                    alert("Select Start Date");
                    return false;
                }

                if (endDateChange == "Select End Date" || endDateChange == "") {
                    alert("Select End Date");
                    return false;
                } else {
                    problemCountLimit = 0;
                    $(".ListAllProblem").html("");
                    getValue = "ParticularAdvancedSearch";
                    loadProblems(getValue);
                }

            });


 $("#btnPrintAllProblems").click(function() {
    var startDate = $('#startDate').val();
    var endDateChange = $('#endDateValue').val();
    if (loadCountRecordValue == 0) {
        alert("No Cases found");
        return false;
    } else {
        if (startDate == "Select Start Date" && endDateChange == "Select End Date") {
            alert("Select the Start Date & End Date");
            return false;
        } else {
            var getStartDate = startDate.split(".");
            addStartDate = getStartDate[2] + "-" + getStartDate[1] + "-" + getStartDate[0];
            var getEndDate = endDateChange.split(".");
            addEndDate = getEndDate[2] + "-" + getEndDate[1] + "-" + getEndDate[0];
            window.open('tcpdf/examples/allProblems.php?agencyID=' + adminUserID + '&startDate=' + addStartDate + '&endDate=' + addEndDate);
        }

    }

});

 $.get(domainAddress + "GetAllState", function(result) {
                //console.log(result);
                $("#state").html('');
                $("#state").html("<option value='0'>Select County</option>");
                if (result.record_count == 0) {
                    $("#state").append("<option value='0'>No State Found</option>");
                } else {
                    for (state in result.records) {
                        $("#state").append("<option value='" + result.records[state].StateName + "'>" + result.records[state].StateName + "</option>");
                    }
                }
            });

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
            });

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
        $(".help-block").css('color', 'red');
        $(".help-block").show();
        $(".help-block").text("* Select the Specialisation");
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
        $(".help-block").tooltip("show");
        $(".help-block").css('color', 'red');
        $(".help-block").show();
        $(".help-block").text("* Select the Property");
        $("#addCase").attr("disabled", true);
    } else {
        $(".help-block").hide();
        $(".help-block").text("");
        $("#addCase").attr("disabled", false);
    }
});


 $("#caseContractor").on('change', function () {
    var inputcaseContractor = $("#caseContractor").val();
    if (inputcaseContractor == 0) {
        $(".help-block").tooltip("show");
        $(".help-block").css('color', 'red');
        $(".help-block").show();
        $(".help-block").text("* Select the Contractor Name");
        $("#addCase").attr("disabled", true);
    } else {
        $(".help-block").hide();
        $(".help-block").text("");
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
                        }  else {
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
                            imageUrl1 = result;
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
    var inputCasePropertyLat = $("#caseProperty :selected").attr('refLat');
    var inputCasePropertyLng = $("#caseProperty :selected").attr('refLng');
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
        var dataForm = '{"SpecialityID":"' + inputCaseSpecialisation + '","Notes":"' + inputCaseNotes + '","PropertyAddress":"' + inputCaseProperty + '","ContractorID":"' + inputcaseContractor + '","problemImage":"' + getUploadedImgPath + '","AdminID":"' + adminUserID + '","WhenToRespond":"'+inputWhenToRespond+'","Latitude":"'+inputCasePropertyLat+'","Longitude":"'+inputCasePropertyLng+'"}';
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
                 problemCountLimit = 0;
                 $(".ListAllProblem").html("");
                 loadProblems(getValue);
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