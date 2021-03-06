function loadPolling(){
	var optionCount = 2;
    var AdminCountry = localStorage.getItem("MyRequest_countryCode");
    var lastPage = 0;
    var adminUserID = 0;
    var getAddPollingArr = new Array();
    var getMainCount = 0;
    var maxProp =1;
    var pollingLimitCount = 0;
    var getValue = "";
    var checkMaxCount = 0;
    var CSS_COLOR_NAMES = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Yellow", "YellowGreen"];
    $("#inputDropValue").select2();

    $(function() {

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
                    (!$(e.target).closest($switcher).length) || (e.keyCode == 27)
                ) {
                    $switcher.removeClass('switcher_active');
                }
            }
        });

        if (localStorage.getItem("altair_theme") !== null) {
            $theme_switcher.children('li[data-app-theme=' + localStorage.getItem("altair_theme") + ']').click();
        }
    });

    

    $(window).load(function() {
        $("#getLoadingModalContent").removeClass('md-show');
    });

    $(document).ready(function() {
        adminUserID = localStorage.getItem("MyRequest_AdminID");
        var adminUserName = localStorage.getItem("MyRequest_UserName");
        var adminType = localStorage.getItem("MyRequest_AdminType");

        var businessName = localStorage.getItem("MyRequest_BusinessName");
        var logo = localStorage.getItem("MyRequest_Logo");
        localStorage.setItem("MyRequest_RepairStatus", "");
        var isFilled = localStorage.getItem("MyRequest_profileFill");
        if (isFilled == "true") {
            window.location.href = domainAgentAddress+'MyProfile.html';
        }

         $(".md-overlay").css("background","rgba(0,0,0,0.5)");
        $("#getLoadingModalContent").addClass('md-show');
         
        if (adminUserID == "" || adminUserID == null) {
            window.location.href = "index.html";
        } else {
            $.get(domainAddress + "getAdminDetails/" + adminUserID, function(result) {
                if (result.record_count == 0) {

                } else {
                    for (var getUserInfo in result.records) {
                        $(".getUserName").text(result.records[getUserInfo].AdminFirstName+" "+result.records[getUserInfo].AdminLastName);
                    }
                }
            });
            // $(".getUserName").text(adminUserName);
        }

        if (adminType == "SuperAdmin") {

        } else {
            getDateDiff(adminUserID);
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

        $("#enterPageNO").attr("disabled", true);
        $("#leftArrow").attr("disabled", true);
        $("#previousPage").attr("disabled", true);
        $("#nextPage").attr("disabled", true);
        $("#rightArrow").attr("disabled", true);
        $("#enterPageNO").val(maxProp);
        $(".getLettingAgencyBusinessName").text("Polling - " + businessName );
        getallPolling(getValue);
    }); // ready

    $(".logOut").click(function() {
        logOutClearCatch();
    });


    $(".btnAddOption").on("click", function(e) {
        optionCount++;

        if (optionCount > 2)
            $(".btnRemoveOption").show()

        $(".addNewOptions").append('<div class="uk-grid newOption-' + optionCount + '"  data-uk-grid-margin>     <div class="uk-width-medium-1-1">  <div class="parsley-row"> <div class="md-input-wrapper">  <label for="inputPollingOption' + optionCount + '">Polling Options ' + optionCount + '<span class="req">*</span></label>     <input type="text" id="inputPollingOption' + optionCount + '" name="pollingOption" class="md-input inputPollingOption" />       <span class="md-input-bar"></span>    </div> </div> </div> </div>');


         $(".inputPollingOption").keyup(function(){
            var optionValue = $("#"+this.id).val();
            if(optionValue==""){
                $(".errorInfo").show();
                $(".errorInfo").text("*Enter the Polling Options");
                $("#"+this.id).css("border-color","red");
                $(".btnSubmitPolling").attr("disabled", true);
            }
            else{
                $(".errorInfo").hide();
                $(".errorInfo").text("");
                $("#"+this.id).css("border-color","rgba(0,0,0,.12)");
                $(".btnSubmitPolling").attr("disabled", false);
            }
        });
             
    });

    $(".btnRemoveOption").on("click", function(e) {
        if (optionCount == 3)
            $(".btnRemoveOption").hide();
            $(".newOption-" + optionCount).remove();
            $("#inputPollingOption" + optionCount).remove();
            optionCount--;
    });

    $(".inputPollingOption").keyup(function(){
        var optionValue = $("#"+this.id).val();
        if(optionValue==""){
            $(".errorInfo").show();
            $(".errorInfo").text("*Enter the Polling Options");
            $("#"+this.id).css("border-color","red");
            $(".btnSubmitPolling").attr("disabled", true);
        }
        else{
            $(".errorInfo").hide();
            $(".errorInfo").text("");
            $("#"+this.id).css("border-color","rgba(0,0,0,.12)");
            $(".btnSubmitPolling").attr("disabled", false);
        }
    });


    $("#leftArrow").click(function(){
        $("#leftArrow").attr("disabled", true);
        $("#previousPage").attr("disabled", true);
        pollingLimitCount = 0;
        maxProp = 1;
        checkMaxCount=0;
        $("#enterPageNO").val(1);
        getallPolling(getValue);
        if (maxProp < lastPage) {
            $("#nextPage").attr("disabled", false);
            $("#previousPage").attr("disabled", "disabled");
            $("#leftArrow").attr("disabled", "disabled");
        }
    });

    $("#rightArrow").click(function(){
        checkMaxCount=0;
        $("#leftArrow").attr("disabled", false);
        $("#previousPage").removeAttr("disabled");
        pollingLimitCount = (9 * lastPage);
        pollingLimitCount -=9;
        maxProp = lastPage;
        checkMaxCount+=(9 * lastPage);
        $("#enterPageNO").val(maxProp);
        getallPolling(getValue);
    });

    $("#previousPage").click(function(){
        $("#nextPage").attr("disabled", false);
        checkMaxCount=0;
        if(pollingLimitCount == 0)
        {
            pollingLimitCount = 0;
            $("#leftArrow").attr("disabled", true);
            $("#previousPage").attr("disabled", "disabled");
        } else {
            checkMaxCount=pollingLimitCount-checkMaxCount;
            pollingLimitCount -= 9;
            $("#previousPage").removeAttr("disabled");
        }
        
        if(pollingLimitCount == 0)
        {
            $("#leftArrow").attr("disabled", true);
            $("#previousPage").attr("disabled", "disabled");
        }
        maxProp--;
        if(maxProp==0){
            $("#enterPageNO").val('');
        }
        else{
            $("#enterPageNO").val(maxProp);
        }
        getallPolling(getValue);
    });

       
    $("#nextPage").click(function(){
        $("#leftArrow").attr("disabled", false);
        $("#previousPage").removeAttr("disabled");
        checkMaxCount = pollingLimitCount+checkMaxCount+18;
        pollingLimitCount += 9;
        if (maxProp == lastPage) {
            $("#nextPage").attr("disabled", true);
        } else {
            $("#nextPage").attr("disabled", false);
            maxProp++;
            $("#enterPageNO").val(maxProp);
            if (maxProp <= lastPage) {
                getallPolling(getValue);
            }
        }
    });



    $("#enterPageNO").on("change",function(e){
        if( $("#enterPageNO").val() > maxProp){
            maxProp++;
            $("#enterPageNO").val(maxProp);
         }
    

                pollingLimitCount = 9*$("#enterPageNO").val();
        if (pollingLimitCount == 0) {
            $("#previousPage").attr("disabled", "disabled");
        } else {
            $("#previousPage").removeAttr("disabled");
        }

         $("#getLoadingModalContent").addClass('md-show');
        getallPolling(getValue);
    });



    $(".getPolling").click(function() {
        $(".newsLetterContent").toggle();
        $(".getAnsweredUsersList").hide();
        $(".md-input-wrapper").removeClass("md-input-filled");
        $("#inputPollingTitle").val('');
        $("#inputPollingOption1").val('');
        $("#inputPollingOption2").val('');
        $("#inputPollingTitle").attr("disabled", false);
        $("#inputPollingOption1").attr("disabled", false);
        $("#inputPollingOption2").attr("disabled", false);
        $("#inputDropValue").val("TenantAndContractor");
        $("#select2-inputDropValue-container").html("For Both Contractor & Tenant");
        $(".btnSubmitPolling").show();
        $(".btnAddOption").show();
        //$(".newsLetterContent").hide();
        $(".btnSubmitPolling").text("Add Polling");
                for (var i = 3; i <= optionCount; i++) {
            $(".newOption-" + i).remove();
            $("#inputPollingOption" + i).remove();
        }
        optionCount = 2;

    });


$("#inputPollingTitle").keyup(function(){
var pollingTitle = $("#inputPollingTitle").val();
if(pollingTitle == ""){
    $(".errorInfo").show();
    $("#inputPollingTitle").css("border-color","red");
    $(".errorInfo").text("* Enter the Polling Title");
    $(".btnSubmitPolling").attr("disabled",true);
    return false;
}
else{
    $(".errorInfo").hide();
    $(".errorInfo").text("");
    $("#inputPollingTitle").css("border-color","rgba(0,0,0,.12)");
    $(".btnSubmitPolling").attr("disabled",false);
}
});

$(".btnSearch").click(function () {
    getValue = $("#inputSearch").val();
    getallPolling(getValue);
});


    $(".btnSubmitPolling").click(function() {
        getAddPollingArr = new Array();
        var isPollingSet = 0;
        var pollingID = $("#hiddenPollingID").val();
        var pollingTitle = $("#inputPollingTitle").val().replace(/'/g, "′");
        var inputDropValue = $("#inputDropValue").val();
        var adminUserID = localStorage.getItem("MyRequest_AdminID");
        userID = localStorage.getItem("ReportUserID");
        var getPollingList = "";

        if (pollingTitle == "") {
            $(".errorInfo").show();
            $(".errorInfo").text("* Enter the Polling Title");
              $("#inputPollingTitle").css("border-color","red");
            $(".btnSubmitPolling").attr("disabled", true);
            return false;
        }


        for (var getCount = 1; getCount <= optionCount; getCount++) {
            getPollingList = $("#inputPollingOption" + getCount).val().replace(/'/g, "′");

            if(getPollingList==""){
                isPollingSet = 0;
                $(".errorInfo").show();
                $(".errorInfo").text("*Enter the Polling Options");
                $("#inputPollingOption" + getCount).css("border-color","red");
                $(".btnSubmitPolling").attr("disabled", true);
                return false;
            }
            else{
                isPollingSet = 1;
                $(".errorInfo").hide();
                $(".errorInfo").text("");
                $("#inputPollingOption" + getCount).css("border-color","rgba(0,0,0,.12)");
                $(".btnSubmitPolling").attr("disabled", false);
             
                var newPollingDataForm = "{'PollingOptionName':'" + getPollingList + "','PollingAnswer':'0'}";

                getAddPollingArr.push(newPollingDataForm);
            }
        } // for count

         

        if(pollingTitle != "" && getAddPollingArr!="") {
            var dataForm = '{"PollingTitle":"' + pollingTitle + '","IsUtilityPolling":"0","PollingFor":"' +inputDropValue+ '","AdminID":"' + adminUserID + '","PollingOptionArr":"' + getAddPollingArr + '","Getcountry":"' + AdminCountry + '"}';
            var sendURL = domainAddress + 'CreatePolling';
            $.ajax({
                type:  "POST",
                url: sendURL,
                data: dataForm,
                success: function(dataCheck) {
                    /*  For Push Notification to All Tenant & Contractor */
                    var callForPush;
                    if(inputDropValue === "TenantAndContractor") {
                        callForPush=  domainAddress + "push/msgSendByAdminForAllTenantCont.php"
                    } else if( inputDropValue === "For Contractor") {
                        callForPush=  domainAddress + "push/messageSendByAdminForAllContractor.php"
                    } else if( inputDropValue === "For Tenant") {
                        callForPush=  domainAddress + "push/messageSendByAdminForAllTenant.php"
                    }
                    // debugger;
                     $.post( callForPush, {StatusMessage:"Polling : " + pollingTitle, adminID:adminUserID, Title:'Polling'}, function(result) {
                         //console.log(result);
                     });
                     /*  For Push Notification to All Tenant & Contractor */

                    $(".newsLetterContent").hide();
                    $("#inputDropValue").val("TenantAndContractor");
                    $("#select2-inputDropValue-container").html("For Both Contractor & Tenant");
                    $("#inputPollingTitle").val('');
                    $("#inputPollingOption1").val('');
                    $("#inputPollingOption2").val('');
                    $(".addNewOptions").html('');
                    $(".btnRemoveOption").hide();
                    pollingLimitCount=0;
                    getallPolling(getValue);
                    UIkit.modal.alert('Polling Created Successfully');
                    $("#getLoadingModalContent").removeClass('md-show');
                }
            });
        }
    }); // #createPolling


    function getallPolling(getValue) {
        $("#getLoadingModalContent").addClass('md-show');
        var adminUserID = localStorage.getItem("MyRequest_AdminID");
        if(getValue=="" || getValue==undefined){
            dataForm = '{"Limit":"'+parseInt(pollingLimitCount)+'","AdminID":"'+adminUserID+'","Getcountry":"' + AdminCountry + '"}';
            sendURL = domainAddress+"PollingListByCount";
        }
        else{
            dataForm = '{"Limit":"'+parseInt(pollingLimitCount)+'","SearchValue":"'+getValue+'","AdminID":"'+adminUserID+'","Getcountry":"' + AdminCountry + '"}';
            sendURL = domainAddress+"SearchPollingList";
        }
        
        $.ajax({
            type: "POST",
            url: sendURL,
            data: dataForm,
            success: function(getResultPolling) {
                if(getResultPolling.record_count==0  && getResultPolling.All_Records_Count == 0){
                    $(".allPollingList").html('');
                    $(".allPollingList").append("<tr class='odd gradeX' id='rowID-0'><td id='titleName-0'>No Records Found</td> <td id='noOfAnswered-0'></td> <td> </td> <td>  </td><td>  </td></tr>");
                    $("#getLoadingModalContent").removeClass('md-show');
                    $("#enterPageNO").attr("disabled", true);
                    $("#nextPage").attr("disabled", true);
                    $("#rightArrow").attr("disabled", true);
                }
                else{
                    loadPollingList(getResultPolling);
                }
            }
        }); 
    }


    function loadPollingList(getResultPolling){
        if (getResultPolling.record_count == 0) {
            $("#nextPage").attr("disabled", true);
            var enterPageNO = $("#enterPageNO").val();
            enterPageNO--;
            $("#enterPageNO").val(enterPageNO);
        } else {
            $(".allPollingList").html('');
            if(getResultPolling.record_count == getResultPolling.All_Records_Count ){ 
                $("#enterPageNO").attr("disabled", true);
                $("#nextPage").attr("disabled", true);
                $("#rightArrow").attr("disabled", true);
            } else if(getResultPolling.record_count < 9 && getResultPolling.record_count != 0 ){ 
                $("#enterPageNO").attr("disabled", true);
                $("#rightArrow").attr("disabled", true);
                $("#nextPage").attr("disabled", true);
            }
            else if(getResultPolling.record_count >= 9){  
                $("#enterPageNO").attr("disabled", true);
                if(checkMaxCount==getResultPolling.All_Records_Count){
                    $("#nextPage").attr("disabled", "disabled");
                    $("#rightArrow").attr("disabled", "disabled");
                } else {
                    $("#nextPage").removeAttr("disabled");
                    $("#rightArrow").removeAttr("disabled");
                }
            } 

             lastPage = Math.ceil(getResultPolling.All_Records_Count / 9);


            for (var getPolling in getResultPolling.records) {
                if(getResultPolling.records[getPolling].PollingFor == "TenantAndContractor"){
                    getResultPolling.records[getPolling].PollingFor = "For Both Contractor & Tenant";
                }
                $(".allPollingList").append("<tr class='odd gradeX' id='rowID-" + getResultPolling.records[getPolling].PollingID + "'><td id='titleName-" + getResultPolling.records[getPolling].PollingID + "'>" + getResultPolling.records[getPolling].PollingTitle + "</td> <td id='pollingfor-" + getResultPolling.records[getPolling].PollingID + "'>" + getResultPolling.records[getPolling].PollingFor + "</td> <td id='noOfAnswered-" + getResultPolling.records[getPolling].PollingID + "'>" + getResultPolling.records[getPolling].TotalNosAnswered + "</td> <td class='editPolling' id='editPolling-" + getResultPolling.records[getPolling].PollingID + "' style='cursor:pointer;'><i class='fa fa fa-eye eye fa-1x' ></i></td><td class='deletePolling' id='deletePollingID-" + getResultPolling.records[getPolling].PollingID + "' style='cursor:pointer;'><i class='fa fa-trash trash fa-1x'></i> </td></tr>");
            }   
                  $("#getLoadingModalContent").removeClass('md-show'); 


            $(".deletePolling").on('click', function(e) {
                deletePollingID = this.id.replace('deletePollingID-', '');
                UIkit.modal.confirm('Are you sure?', function() {
                     $("#getLoadingModalContent").addClass('md-show');
                    $.post(domainAddress + 'DeletePolling/' + deletePollingID, function(e) {
                        $("#rowID-" + deletePollingID).remove();
                        pollingLimitCount = 0;
                        getallPolling(getValue);
                         $("#getLoadingModalContent").removeClass('md-show');
                        UIkit.modal.alert('Polling Deleted Successfully');
                    });
                });
            }); // deletePolling


            $(".editPolling").on("click", function(e) {
                $(window).scrollTop(0);
                $(".newsLetterContent").show();
                $("#inputPollingTitle").val('');
                $("#inputPollingOption1").val('');
                $("#inputPollingOption2").val('');
                var pollingOptionCount = "";
                var pieChartData = new Array();
                var getPollingID = this.id.replace("editPolling-", "");
                var getNotificationContentID = 0;
                
                $("#smallPieChartPollingResult").html("");
                var myLine = new Chart(document.getElementById("smallPieChartPollingResult").getContext("2d")).Pie(pieChartData);
                myLine.destroy();
                for (var getPolling in getResultPolling.records) {
                    if (getPollingID == getResultPolling.records[getPolling].PollingID) {
                    	getNotificationContentID = getResultPolling.records[getPolling].NotificationContentID;
                        $("#inputDropValue").val(getResultPolling.records[getPolling].PollingFor);
                        if(getResultPolling.records[getPolling].PollingFor == "TenantAndContractor"){
                            getResultPolling.records[getPolling].PollingFor = "For Both Contractor & Tenant";
                        }
                        $("#select2-inputDropValue-container").html(getResultPolling.records[getPolling].PollingFor);
                        
                        $("#inputPollingTitle").val(getResultPolling.records[getPolling].PollingTitle);
                        $("#inputPollingTitle").attr("disabled",true)
                        for (var i = 3; i <= optionCount; i++) {
                            $(".newOption-" + i).remove();
                            $("#inputPollingOption" + i).remove();
                        }
                        optionCount = 1;
                        for (var getPollingOption in getResultPolling.records[getPolling].Polling) {
                            //console.log(getResultPolling.records[getPolling].Polling);
                            if (optionCount <= 2) {
                                $("#inputPollingOption" + optionCount).val(getResultPolling.records[getPolling].Polling[getPollingOption].PollingOptionName);

                            } else {
                                $(".addNewOptions").append('<div class="uk-grid newOption-' + optionCount + '"  data-uk-grid-margin>     <div class="uk-width-medium-1-1">  <div class="parsley-row"> <div class="md-input-wrapper">  <label for="inputPollingOption' + optionCount + '">Polling Options ' + optionCount + '<span class="req">*</span></label>     <input type="text" id="inputPollingOption' + optionCount + '" name="pollingOption" class="md-input" value="' + getResultPolling.records[getPolling].Polling[getPollingOption].PollingOptionName + '" />       <span class="md-input-bar"></span>    </div> </div> </div> </div>')
                            }
                            $("#inputPollingOption" + optionCount).attr("disabled",true);
                            optionCount++;




                            pollingOptionCount = {
                                value: getResultPolling.records[getPolling].Polling[getPollingOption].PollingAns,
                                color: CSS_COLOR_NAMES[Math.floor(Math.random() * CSS_COLOR_NAMES.length)],
                                label: getResultPolling.records[getPolling].Polling[getPollingOption].PollingOptionName,
                                pollingOptionID: getResultPolling.records[getPolling].Polling[getPollingOption].PollingOptionID
                            };
                            pieChartData.push(pollingOptionCount);
                            //console.log(pieChartData);
                        } // Polling for loop End

                    } // If Condition Ends Here

                } // For Loop Outer Getting Closed
                var myLine = new Chart(document.getElementById("smallPieChartPollingResult").getContext("2d")).Pie(pieChartData);

                 $("#smallPieChartPollingResult").click( 
                    function(evt){
                        var activePoints = myLine.getSegmentsAtEvent(evt);
                        //console.log("PollingOption : "+activePoints[0].label);
                        //console.log("PollingNotificationContentID : "+getNotificationContentID);

                        for(var getPollingInfo in pieChartData){
                        	if(pieChartData[getPollingInfo].label==activePoints[0].label){
                        		

                        		$.get(domainAddress + "GetPollingAnsweredUsersList/" + getNotificationContentID +"/"+ pieChartData[getPollingInfo].pollingOptionID +"/"+ adminUserID, {}, function(result) {
			                        $(".getAnsweredUsersList").show();
			                        $(".listAnsweredUsers").html('');
       								if(result.record_count==0){
       									$(".listAnsweredUsers").append("<tr> <td>No records found </td> <td> </td> <td> </td> </tr>");
       								}
       								else{
       									for (var getAnsweredUsers in result.records) {
       										 
			                                $(".listAnsweredUsers").append("<tr> <td id='name-"+result.records[getAnsweredUsers].UserID+"'>"+result.records[getAnsweredUsers].Name+" </td> <td id='emailID-"+result.records[getAnsweredUsers].UserID+"'> <a href='mailto:"+result.records[getAnsweredUsers].EmailID+"' target='_top'>"+result.records[getAnsweredUsers].EmailID+" </a></td> <td id='mobileNumber-"+result.records[getAnsweredUsers].UserID+"'>"+result.records[getAnsweredUsers].MobileNumber+" </td> </tr>");
			                            }

                                         
       								}
			                    });
                        	}
                        }

                        

                    }
                );   

                $(".md-input-wrapper").addClass("md-input-filled");
                  
                $(".btnSubmitPolling").hide();
                $(".btnAddOption").hide();

            });
        }
    }    // loadPollingList   
}