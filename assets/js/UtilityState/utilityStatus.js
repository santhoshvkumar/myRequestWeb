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
        
        var adminUserID = 0;
        var utilityListCountLimit = 0;
        var maxProp =1;
        var getValue = "";
       
       
        var agencyCode = localStorage.getItem('MyRequest_LettingAgencyCode');


          $(window).load(function() {
                $("#getLoadingModalContent").removeClass('md-show');
            });

        $(document).ready(function() {
            console.log("ready call");
            $(".getUserUtilityListContact").hide('slow');
             $(".getUtility").show();
            adminUserID = localStorage.getItem("MyRequest_AdminID");
            var adminUserName = localStorage.getItem("MyRequest_UserName");
            var adminType = localStorage.getItem("MyRequest_AdminType");

            var businessName = localStorage.getItem("MyRequest_BusinessName");
            var logo = localStorage.getItem("MyRequest_Logo");
            var isFilled = localStorage.getItem("MyRequest_profileFill");
            if(isFilled == "true"){
                window.location.href = 'http://myrequest.co.uk/myRequestAdmin/MyProfile.html';
            }

             $(".md-overlay").css("background","rgba(0,0,0,0.5)");
             $("#getLoadingModalContent").addClass('md-show');
            localStorage.setItem("MyRequest_RepairStatus","");
            if(adminUserID == "" || adminUserID == null){
                window.location.href="index.html";
            }
            else{
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

            if(adminType == "SuperAdmin"){
                
            }
            else{
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



            $("#previousPage").attr("disabled",true);
            $("#enterPageNO").val(maxProp);
            $(".getLettingAgencyBusinessName").text("Utility Management - " +businessName);

            $("#enterPageNO").val(maxProp); 
            getUtilityList(getValue);
            $("#inputFuel").select2();
            $(".select2").css("margin-top","-50px");
            $("#inputSupplierElectric").select2();
            $(".select2").css("margin-top","-50px");
            $("#inputSupplierGas").select2();
            $(".select2").css("margin-top","-50px");
            $("#inputEconomy7").select2();
            $("#inputInfo").select2();
            $(".select2").css("margin-top","-50px");
            $("#UtilityRegType").select2();
            $("#inputGasInfo").select2();
            $("#inputElectricityInfo").select2();
            $("#inputCouncilInfo").select2();
            $("#inputWaterActionInfo").select2();
            $("#inputBroadbandInfo").select2();
            $("#inputMediaInfo").select2();
            utilityLogSubmit();

            }); // ready


        $(".btnSearch").click(function () {
            getValue = $("#inputSearch").val();
            getUtilityList(getValue);
        });

           $(".btnSubmitAddNotes").click(function(){
            $("#getLoadingModalContent").addClass('md-show');
            var inputNotes = $("#inputNotes").val().replace(/(\r\n|\n|\r)/gm," ");
            var inputRequirement = $("#select2-inputInfo-container").html();
            var hiddenUtilityID = $("#hiddenUtilityID").val();
            var hiddenPropertyID = $("#hiddenPropertyID").val();
            var hiddenUserRegID = $("#hiddenUserRegID").val();

            var inputGasStatus = $("#inputGasInfo").val();
            var inputGasNotes = $("#inputGasNotes").val();
            var inputElectricityStatus = $("#inputElectricityInfo").val();
            var inputElectricityNotes = $("#inputElectricityNotes").val();
            var inputCouncilStatus = $("#inputCouncilInfo").val();
            var inputCouncilNotes = $("#inputCouncilNotes").val();
            var inputWaterSewerageStatus = $("#inputWaterActionInfo").val();
            var inputWaterSewerageNotes = $("#inputWaterNotes").val();
            var inputBroadBandStatus = $("#inputBroadbandInfo").val();
            var inputMediaStatus = $("#inputMediaInfo").val();
            var inputMediaNotes = $("#inputMediaNotes").val();

            if(inputNotes=="" || inputNotes==" "){
                $(".errorInfo").show();
                $(".errorInfo").text("* Enter the Notes");
                $(".btnSubmitAddNotes").attr("disabled", true);
                return false;
            }   

            if(inputRequirement=="Select Requirement"){
                $(".errorInfo").show();
                $(".errorInfo").text("* Select the Requirement");
                $(".btnSubmitAddNotes").attr("disabled", true);
                return false;
            }   

            else{
                 var dataForm = '{"UtilityID":"' + hiddenUtilityID + '","PropertyID":"' + hiddenPropertyID + '","UserRegID":"' + hiddenUserRegID + '","Notes":"' + inputNotes + '","RequirementType":"' + inputRequirement + '","GasStatus":"' + inputGasStatus + '","GasNotes":"' + inputGasNotes + '","ElectricityStatus":"' + inputElectricityStatus + '","ElectricityNotes":"' + inputElectricityNotes+ '","CouncilStatus":"' + inputCouncilStatus + '","CouncilNotes":"' + inputCouncilNotes + '","WaterSewerageStatus":"' + inputWaterSewerageStatus + '","WaterSewerageNotes":"' + inputWaterSewerageNotes + '","BroadBandStatus":"' + inputBroadBandStatus+ '","BroadBandNotes":"' + inputBroadBandNotes+ '","MediaStatus":"' + inputMediaStatus+ '","MediaNotes":"' + inputMediaNotes+ '"}';
                console.log(dataForm);
                        
                var sendURL = domainAddress + 'CreateUtilityLog';
                console.log(sendURL);

                $.ajax({       
                    type: "POST",
                    url: sendURL,
                    data: dataForm,
                    success: function(dataCheck) {
                        //console.log(dataCheck);
                        getUtilityList(getValue);
                        $(".utilityContent").hide();
                        $("#getName").val('');
                        $("#inputMobileNumber").val('');
                        $("#UtilityRegType").val('');
                        $("#Date").val('');
                        $("#endDate").val('');
                        $("#getElect").val('');
                        $("#getGas").val('');
                        $("#getCouncil").val('');
                        $("#getWater").val('');
                        $("#select2-inputFuel-container").html("Select Fuel Type");
                        $("#inputFuel").val(0);
                        $("#select2-inputSupplierElectric-container").html("Select Supplier Electric");
                        $("#inputSupplierElectric").val(0);
                        $("#select2-inputSupplierGas-container").html("Select Supplier Gas");
                        $("#inputSupplierGas").val(0);
                        $("#inputRead1").val('');
                        $("#inputRead2").val('');
                        $("#inputGas").val('');
                        $("#inputWater").val('');
                        $("#inputNotes").val('');   
                        $("#select2-inputInfo-container").html("Select Requirement");
                        UIkit.modal.alert('Utility Notes Created Successfully');
                           $("#getLoadingModalContent").removeClass('md-show'); 
                    }
                }); 
            }

        });

        $(".logOut").click(function() {
            logOutClearCatch();
        }); 

        $("#leftArrow").click(function(){
            $("#previousPage").removeAttr("disabled");
            utilityListCountLimit = 0;
           
            maxProp=1;
            $("#enterPageNO").val(1);
             $("#getLoadingModalContent").addClass('md-show');
            getUtilityList(getValue);
            if(maxProp<lastPage){
                $("#nextPage").attr("disabled",false);
            }
        });     

        $("#rightArrow").click(function(){
            $("#previousPage").removeAttr("disabled");
            utilityListCountLimit = (9*lastPage)-9;
           
            maxProp=lastPage;
            $("#enterPageNO").val(lastPage);
             $("#getLoadingModalContent").addClass('md-show');
            getUtilityList(getValue);
        });
            
        $("#previousPage").click(function(){
            
            if(utilityListCountLimit == 0)
            {
              utilityListCountLimit = 0;
               $("#previousPage").attr("disabled","disabled");
            }
            else
            {
              utilityListCountLimit -= 9;
              $("#previousPage").removeAttr("disabled");
            }
           
            if(utilityListCountLimit == 0)
            {
              $("#previousPage").attr("disabled","disabled");
            }
            maxProp--;
            if(maxProp==0){
                $("#enterPageNO").val('');
            }
            else{
                $("#enterPageNO").val(maxProp);
            }
             $("#getLoadingModalContent").addClass('md-show');
            getUtilityList(getValue);
        });
            
                
        $("#nextPage").click(function(){
            $("#previousPage").removeAttr("disabled");
            utilityListCountLimit += 9;
            maxProp++;
            $("#enterPageNO").val(maxProp);
             $("#getLoadingModalContent").addClass('md-show');
            getUtilityList(getValue);
        });



        $("#enterPageNO").on("change",function(e){
             console.log("THis is called"+$("#enterPageNO").val());
             if( $("#enterPageNO").val() > maxProp){
                maxProp++;
                $("#enterPageNO").val(maxProp);
             }
            
            console.log("next inital count : " + utilityListCountLimit);
            utilityListCountLimit = 9*$("#enterPageNO").val();
            if (utilityListCountLimit == 0) {
                $("#previousPage").attr("disabled", "disabled");
            } else {
                $("#previousPage").removeAttr("disabled");
            }
             $("#getLoadingModalContent").addClass('md-show');
            getUtilityList(getValue);
        });

            



         function getUtilityList(getValue){

             if(getValue=="" || getValue==undefined){
                  dataForm = '{"Limit":"'+parseInt(utilityListCountLimit)+'","AdminID":"'+adminUserID+'"}';
                  sendURL = domainAddress+"AdminUtilityListByCount";
            }
            else{
                 dataForm = '{"Limit":"'+parseInt(utilityListCountLimit)+'","SearchValue":"'+getValue+'","AdminID":"'+adminUserID+'"}';
                 sendURL = domainAddress+"SearchUtilityStatusAdminList";
            } 
                
             console.log(dataForm);
            console.log(sendURL);

            $.ajax({
                type: "POST",
                url: sendURL,
                data: dataForm,
                success: function (result) {
                   console.log(result); 
                
                   if(result.record_count==0  && result.All_Records_Count == 0){
                    $(".adminUtilityList").html('');
                    $(".adminUtilityList").append("<tr id='rowID-0'><td id='getUtilityType-0'>No Records Found</td>   <td id='address-0'> </td>  <td id='name-0'> </td> <td id='getDate-0'> </td> <td id='status-0'> </td> <td></td>  </tr> ");
                    $("#getLoadingModalContent").removeClass('md-show');
                   }
                   else{
                        loadUtilityStatusList(result);
                   }
                   
                    
                } // ajax success
            }); // ajax POSTS
        }       

        function loadUtilityStatusList(result){

            if (result.record_count == 0) {
                $("#nextPage").attr("disabled", true);
            } else {
                $(".adminUtilityList").html('');
                if (result.record_count == result.All_Records_Count) {
                    console.log("equal to 9");
                    $(".pageCount").show();
                    $("#nextPage").attr("disabled", "disabled");
                } else if (result.record_count < 9 && result.record_count != 0) {
                    console.log("less than 9");
                    $(".pageCount").show();
                    $("#nextPage").attr("disabled", "disabled");
                } else if (result.record_count >= 9) {
                    console.log("great than 9");
                    $("#nextPage").removeAttr("disabled");
                    $(".pageCount").show();
                }

                lastPage = parseInt(result.All_Records_Count / 9) + 1;
                console.log(lastPage);
                var utilityType = "";
                for (utility in result.records) {
                    if(result.records[utility].UtilityRegType=="move-in"){
                        utilityType = "Move-in";
                    }
                    else{
                        utilityType = "Move-out";
                    }   
                    $(".adminUtilityList").append("<tr id='rowID-" + result.records[utility].UtilityID + "'><td id='getUtilityType-" + result.records[utility].UtilityID + "'>" + utilityType + "</td>   <td id='address-" + result.records[utility].UtilityID + "'>" + result.records[utility].Address + "</td>  <td id='name-" + result.records[utility].UtilityID + "'>" + result.records[utility].Name + "</td> <td id='getDate-" + result.records[utility].UtilityID + "'>" + moment(result.records[utility].Date).format('Do MMM YYYY,  h:mm a') + "</td> <td id='status-" + result.records[utility].UtilityID + "'>" + result.records[utility].Status + "</td> <td><a class='editUtility' id='editUtilityID-" + result.records[utility].PropertyID + "' > <i class='fa fa fa-pencil pencil fa-1x'></i> </a> <input type='hidden' id='hidddenGetUtilityID-"+result.records[utility].PropertyID+"' value='"+result.records[utility].UtilityID+"' /> <input type='hidden' id='hidddenGetUserID-"+result.records[utility].PropertyID+"' value='"+result.records[utility].UserID+"' /> </td>  </tr> ");


                }


                     $("#getLoadingModalContent").removeClass('md-show'); 

                
              
              $(".editUtility").on('click', function(e) {
                  $("#getLoadingModalContent").addClass('md-show');
                    var editUtilityPropertyID = this.id.replace('editUtilityID-', '');
                    var editHiddenUtilityID = $("#hidddenGetUtilityID-"+editUtilityPropertyID).val();
                    var editHiddenUserID = $("#hidddenGetUserID-"+editUtilityPropertyID).val();
                    $("#hiddenUtilityID").val(editHiddenUtilityID);
                    $("#hiddenUserRegID").val(editHiddenUserID);
                    $.get(domainAddress + "GetUserUtilityID/" + editUtilityPropertyID, {}, function(result) {
                        $(".getUserUtilityListContact").show('slow');
                        for (var getUtility in result.records) {
                            $("#getName").val(result.records[getUtility].Name);
                            $("#inputEmailID").text(result.records[getUtility].EmailID);
                            $("#inputAddress").text(result.records[getUtility].Address);
                            $("#inputCity").text(result.records[getUtility].PropCity+", "+result.records[getUtility].PropState+", "+result.records[getUtility].PropAddress+" - "+result.records[getUtility].PropPostalCode);
                            $("#hiddenPropertyID").val(result.records[getUtility].PropertyID);
                            $("#tenancyStartDate").text(moment(result.records[getUtility].TenancyStart).format('Do MMM YYYY'));
                            $("#tenancyEndDate").text(moment(result.records[getUtility].TenancyEnd).format('Do MMM YYYY'));
                            $("#gasFuelType").text(result.records[getUtility].FuelType);
                            $("#electricitySupplier").text(result.records[getUtility].SupplierElectric);
                            $("#gasSuppliers").text(result.records[getUtility].SupplierGas);
                            $("#electricityMeterReading1").text(result.records[getUtility].ElectricSupplier1);
                            $("#electricityMeterReading2").text(result.records[getUtility].ElectricSupplier2);
                            $("#electricityEconomy").text(result.records[getUtility].Economy7);
                            $("#gasMeterReading").text(result.records[getUtility].GasMeterRead);
                            $("#waterMeterRead").text(result.records[getUtility].WaterMeterRead);
                            $("#waterAuthority").text(result.records[getUtility].WaterAuthority);
                            $("#getBroadBandProvider").text(result.records[getUtility].BroadbandProvider);
                            $("#getMediaProvider").text(result.records[getUtility].MediaProvider);
                            if(result.records[getUtility].CouncilAuthority=="Choose Council"){
                                result.records[getUtility].CouncilAuthority = "--";
                            }          

                             if(result.records[getUtility].PropGasStatus == "" || result.records[getUtility].PropGasStatus == null){
                                $("#select2-inputGasInfo-container").html("Action Taken");
                            }else{
                                $("#select2-inputGasInfo-container").html(result.records[getUtility].PropGasStatus);
                            }           

                             $("#inputGasNotes").val(result.records[getUtility].PropGasNotes);
                                            
                             if(result.records[getUtility].PropElectricityStatus == "" || result.records[getUtility].PropElectricityStatus == null){
                                $("#select2-inputElectricityInfo-container").html("Action Taken");
                            }else{
                                $("#inputElectricityInfo").val(result.records[getUtility].PropertyID);
                                $("#select2-inputElectricityInfo-container").html(result.records[getUtility].PropElectricityStatus);
                            }         
                            $("#inputElectricityNotes").val(result.records[getUtility].PropElectricityNotes);

                            if(result.records[getUtility].PropCouncilStatus == "" || result.records[getUtility].PropCouncilStatus == null){
                                $("#select2-inputCouncilInfo-container").html("Action Taken");
                            }else{
                                $("#inputCouncilInfo").val(result.records[getUtility].PropertyID);
                                $("#select2-inputCouncilInfo-container").html(result.records[getUtility].PropCouncilStatus);
                            }       
                            $("#inputCouncilNotes").val(result.records[getUtility].PropCouncilNotes);


                             if(result.records[getUtility].PropWaterSewerageStatus == "" || result.records[getUtility].PropWaterSewerageStatus == null){
                                $("#select2-inputWaterActionInfo-container").html("Action Taken");
                            }else{
                               $("#inputWaterActionInfo").val(result.records[getUtility].PropertyID);
                                $("#select2-inputWaterActionInfo-container").html(result.records[getUtility].   PropWaterSewerageStatus);
                            }
                            $("#inputWaterNotes").val(result.records[getUtility].PropWaterSewerageNotes);

                                                        
                             if(result.records[getUtility].PropBroadBandStatus == "" || result.records[getUtility].PropBroadBandStatus == null){
                                $("#select2-inputBroadbandInfo-container").html("Action Taken");
                            }else{
                               $("#inputBroadbandInfo").val(result.records[getUtility].PropertyID);
                                $("#select2-inputBroadbandInfo-container").html(result.records[getUtility].PropBroadBandStatus);
                            }   
                            $("#inputBroadbandNotes").val(result.records[getUtility].PropBroadBandNotes);
                                                       

                             if(result.records[getUtility].PropMediaStatus == "" || result.records[getUtility].PropMediaStatus == null){
                                $("#select2-inputMediaInfo-container").html("Action Taken");
                            }else{
                               $("#inputMediaInfo").val(result.records[getUtility].PropertyID);
                               $("#select2-inputMediaInfo-container").html(result.records[getUtility].PropMediaStatus);
                            }     
                            $("#inputMediaNotes").val(result.records[getUtility].PropMediaNotes);
                                        
                            $("#councilAuthority").text(result.records[getUtility].CouncilAuthority);
                            $("#inputCountry").val(result.records[getUtility].PropCountry);
                            $("#landLordInsurance").text(result.records[getUtility].HomeInsurance = 1 ? "True" : "False");
                            $("#propMgnt").text(result.records[getUtility].PropManaged);
                            $("#propType").text(result.records[getUtility].PropertyType);
                            
                            if(result.records[getUtility].IsVoidBy==""){
                                $("#isVoidProg").text('No');
                            }
                            else{
                                $("#isVoidProg").text(result.records[getUtility].IsVoidBy);
                            }
                            
                            $("#landLordName").text(result.records[getUtility].LandLordName);
                            $("#landLordEmail").text(result.records[getUtility].LandLordEmailID);
                            $("#landLordMobile").text(result.records[getUtility].LandLordMobileNumber);
                                                                                            
                            if(result.records[getUtility].UtilityRegType=="move-in"){
                                $("#select2-UtilityRegType-container").html("Move-in");
                                $("#UtilityRegType").val(result.records[getUtility].UtilityRegType);
                            }
                            else{
                                $("#select2-UtilityRegType-container").html("Move-out");
                                $("#UtilityRegType").val(result.records[getUtility].UtilityRegType);
                            }         
                                                                    
                            $("#Date").val(result.records[getUtility].Date);


                          var isElectricity = result.records[getUtility].IsElectricity;
                            $("#hiddenIsElectricity").val(result.records[getUtility].IsElectricity);
                            if(isElectricity==1){
                                $('.electricity > span').css('box-shadow','rgba(255, 179, 0, 0.498039) 0px 0px 0px 7px inset').css('border-color','rgba(255, 179, 0, 0.498039)').css('transition','border 0.4s').css('box-shadow','0.4s').css('background-color','1.2s').css('background-color','rgba(255, 179, 0, 0.498039)');
                                $('.electricity > span > small').css('left','18px').css('transition','background-color 0.4s, left 0.2s').css('background-color','rgb(255, 179, 0)');
                                $("#getElect").prop("checked",true);
                            }           
                            else{
                                $('.electricity > span').css('box-shadow','rgba(0, 0, 0, 0.258824) 0px 0px 0px 0px inset').css('border-color','rgba(0, 0, 0, 0.258824)').css('transition','border 0.4s, box-shadow 0.4s').css('background-color','rgba(0, 0, 0, 0.258824)');
                                $('.electricity > span > small').css('left','0px').css('transition','background-color 0.4s, left 0.2s').css('background-color','rgb(250, 250, 250)');
                                $("#getElect").prop("checked",false);
                            }

                         var isGas = result.records[getUtility].IsGas;
                            $("#hiddenIsGas").val(result.records[getUtility].IsGas);
                            if(isGas==1){
                                $('.gas > span').css('box-shadow','rgba(255, 179, 0, 0.498039) 0px 0px 0px 7px inset').css('border-color','rgba(255, 179, 0, 0.498039)').css('transition','border 0.4s').css('box-shadow','0.4s').css('background-color','1.2s').css('background-color','rgba(255, 179, 0, 0.498039)');
                                $('.gas > span > small').css('left','18px').css('transition','background-color 0.4s, left 0.2s').css('background-color','rgb(255, 179, 0)');
                                $("#getGas").prop("checked",true);
                            }   
                            else{   
                                 $('.gas > span').css('box-shadow','rgba(0, 0, 0, 0.258824) 0px 0px 0px 0px inset').css('border-color','rgba(0, 0, 0, 0.258824)').css('transition','border 0.4s, box-shadow 0.4s').css('background-color','rgba(0, 0, 0, 0.258824)');
                                $('.gas > span > small').css('left','0px').css('transition','background-color 0.4s, left 0.2s').css('background-color','rgb(250, 250, 250)');
                                $("#getGas").prop("checked",false);
                            }   
                                                                   
                            var isWater = result.records[getUtility].IsWater;
                            $("#hiddenIsWater").val(result.records[getUtility].IsWater);
                            if(isWater==1){
                                $('.water > span').css('box-shadow','rgba(255, 179, 0, 0.498039) 0px 0px 0px 7px inset').css('border-color','rgba(255, 179, 0, 0.498039)').css('transition','border 0.4s').css('box-shadow','0.4s').css('background-color','1.2s').css('background-color','rgba(255, 179, 0, 0.498039)');
                                $('.water > span > small').css('left','18px').css('transition','background-color 0.4s, left 0.2s').css('background-color','rgb(255, 179, 0)');
                                $("#getWater").prop("checked",true);
                            }
                            else{
                                 $('.water > span').css('box-shadow','rgba(0, 0, 0, 0.258824) 0px 0px 0px 0px inset').css('border-color','rgba(0, 0, 0, 0.258824)').css('transition','border 0.4s, box-shadow 0.4s').css('background-color','rgba(0, 0, 0, 0.258824)');
                                $('.water > span > small').css('left','0px').css('transition','background-color 0.4s, left 0.2s').css('background-color','rgb(250, 250, 250)');
                                $("#getWater").prop("checked",false);
                            }   
                                            
                            var isCouncil = result.records[getUtility].IsCouncil;
                            $("#hiddenIsCouncil").val(result.records[getUtility].IsCouncil);
                            if(isCouncil==1){
                                $('.council > span').css('box-shadow','rgba(255, 179, 0, 0.498039) 0px 0px 0px 7px inset').css('border-color','rgba(255, 179, 0, 0.498039)').css('transition','border 0.4s').css('box-shadow','0.4s').css('background-color','1.2s').css('background-color','rgba(255, 179, 0, 0.498039)');
                                $('.council > span > small').css('left','18px').css('transition','background-color 0.4s, left 0.2s').css('background-color','rgb(255, 179, 0)');
                                $("#getCouncil").prop("checked",true);
                            }
                            else{
                                $('.council > span').css('box-shadow','rgba(0, 0, 0, 0.258824) 0px 0px 0px 0px inset').css('border-color','rgba(0, 0, 0, 0.258824)').css('transition','border 0.4s, box-shadow 0.4s').css('background-color','rgba(0, 0, 0, 0.258824)');
                                $('.council > span > small').css('left','0px').css('transition','background-color 0.4s, left 0.2s').css('background-color','rgb(250, 250, 250)');
                                $("#getCouncil").prop("checked",true);
                            }   
                            var getPropertyID = result.records[getUtility].PropertyID;
                               $.get(domainAddress+"GetUserUtilityListByProperty/"+getPropertyID,{},function(result){
                                   
                                    $(".getPropertyUtility").show();
                                    if(result.record_count==0){
                                        $(".propertyUtility").html('');
                                        $(".propertyUtility").append("<tr> <td>No records found</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>");
                                    }
                                    else{
                                        $(".propertyUtility").html('');
                                        var isElectricity = "";
                                        var isGas = "";
                                        var isWater = "";
                                        var isCouncil = "";
                                        var cElectricity = "";
                                        var cGas = "";
                                        var cWater = "";
                                        var cCouncil = "";
                                        var utilityStatusCheck = "";

                                        for(var propertyUtility in result.records){

                                            if(result.records[propertyUtility].IsElectricity==0 && result.records[propertyUtility].IsGas==0 && result.records[propertyUtility].IsWater==0 &&result.records[propertyUtility].IsCouncil==0){
                                                utilityStatusCheck="Not Applicable";
                                            }   

                                            else{   

                                                utilityStatusCheck=result.records[propertyUtility].Status;
                                            }       

                                            if(result.records[propertyUtility].IsElectricity==1){
                                                isElectricity = '<i class="fa fa-check"></i>';
                                                cElectricity = "Green";
                                            }    
                                            else{   
                                                isElectricity = '<i class="fa fa-times"></i>';
                                                cElectricity = "Red";
                                            }           

                                            if(result.records[propertyUtility].IsGas==1){
                                                isGas = '<i class="fa fa-check"></i>';
                                                cGas = "Green";
                                            }
                                            else{
                                                isGas = '<i class="fa fa-times"></i>';
                                                cGas = "Red";
                                            }

                                            if(result.records[propertyUtility].IsWater==1){
                                                isWater = '<i class="fa fa-check"></i>';
                                                cWater = "Green";
                                            }
                                            else{
                                                isWater = '<i class="fa fa-times"></i>';
                                                cWater = "Red";
                                            }   

                                            if(result.records[propertyUtility].IsCouncil==1){
                                                isCouncil = '<i class="fa fa-check"></i>';
                                                cCouncil = "Green";
                                            }   
                                            else{
                                                isCouncil = '<i class="fa fa-times"></i>';
                                                cCouncil = "Red";
                                            }               
                                                    
                                            $(".propertyUtility").append("<tr> <td>"+result.records[propertyUtility].UtilityRegType+"</td> <td>"+result.records[propertyUtility].Name+"</td> <td>"+result.records[propertyUtility].EmailID+"</td> <td>"+result.records[propertyUtility].MobileNumber+"</td> <td>"+moment(result.records[propertyUtility].Date).format('Do MMM YYYY,  h:mm a') +"</td>  <td style='color:"+cElectricity+";'>"+isElectricity+"</td> <td style='color:"+cGas+";'>"+isGas+"</td> <td style='color:"+cWater+";'>"+isWater+"</td> <td style='color:"+cCouncil+";'>"+isCouncil+"</td> <td>"+utilityStatusCheck+"</td> </tr>");
                                        }
                                    }
                                        
                            });     
                                            
                            if(result.records[getUtility].Status=="Not Applicable"){
                                $(".propertyUtility").hide(); 
                            }

                            if(result.records[getUtility].Status=="Updated"){
                                $(".btnSubmitUtility").hide(); 
                            }
                            else{
                                $(".btnSubmitUtility").show();   
                                $(".btnSubmitUtility").html("Update Utility");
                            }

                        }    

                          $("#getLoadingModalContent").removeClass('md-show');



                                
                    });                 
                                    
                              
                    $(".utilityContent").show();
                    $(".utilityInfo").show();
                        
                    $(".md-input-wrapper").addClass("md-input-filled");
                    getListPropertyUtilityLogs(editUtilityPropertyID);
                }); // editUtility   

                    $(".deleteUtility").on('click', function(e) {
                    var deleteUtilityID = this.id.replace('deleteUtilityID-', '');
                    UIkit.modal.confirm('Are you sure?', function() {
                        $.post(domainAddress + 'DeleteUtility/' + deleteUtilityID + "/", function(e) {
                            console.log(e);
                            $("#rowID-" + deleteUtilityID).remove();
                            getUtilityList(getValue);
                            UIkit.modal.alert('Utility Deleted Successfully');
                        });
                    });
                }); // deleteUtilityID    


            }

        } // loadUserTenantsList
