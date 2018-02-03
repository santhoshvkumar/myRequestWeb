var getPropLat, getPropLong, isEdit=false;
 $(function() {
     var getPhoneCode = localStorage.getItem("MyRequest_PhoneCode-prefix");
     var getcountryCode = localStorage.getItem("MyRequest_countryCode");

     var adminUserID = localStorage.getItem("MyRequest_AdminID");
     $("#moveinadminID").val(adminUserID);
     $("#moveoutadminID").val(adminUserID);

     $(".landlord-prefix").text(getPhoneCode);

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
      
     $("#inputEconomy7").on('change', function() {
         if (this.checked) {
             $("#hiddenIsEconomy7").val(1);
         } else {
             $("#hiddenIsEconomy7").val(0);
         }
     });

     $("#inputWaterMeter").on('change', function() {
         if (this.checked) {
             $("#hiddenIsWaterMeter").val(1);
         } else {
             $("#hiddenIsWaterMeter").val(0);
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
 var map = ''; 
 var count = 1;
 var NoofTenantscount = 1;
 var finalTenantCount = 0;
 var adminUserID = 0;
 var isAppInstalled = 0;
 var occupancy = "";
 var homeInsurance = "";
 var getPropertyManaged = "";
 var isVoid = "";
 var imageUrl1 = "";
 var imageUrl2 = "";
 var imageUrl3 = "";
 var imageUrl4 = "";
 var imageUrl5 = "";
 var getAddTenantArr = new Array();
 var getApiAddress = "";
 var getLatitude = 0;
 var getLongitude = 0;
 var userPropertyCountLimit = 0;
 var maxProp = 0;
 var lastPage = 0;
 var agencyCode = localStorage.getItem('MyRequest_LettingAgencyCode');
 var getValue = "";
 var totalRecordCount = 0;
 var getTenantObjArr = new Array();
 var mapCountCheck = 0;
 var checkMaxCount = 0;
 $("#leftArrow").attr("disabled",true);
 $("#previousPage").attr("disabled",true);
 $("#nextPage").attr("disabled",false);
 $("#rightArrow").attr("disabled",false);

 $(document).ready(function() {
     $("#inputCountry").val("UK");
     var country = $("#inputCountry").val();
     localStorage.removeItem('MyRequestTenantsData');
     adminUserID = localStorage.getItem("MyRequest_AdminID");
     var adminUserName = localStorage.getItem("MyRequest_UserName");
     var adminType = localStorage.getItem("MyRequest_AdminType");
    
     var businessName = localStorage.getItem("MyRequest_BusinessName");
     var logo = localStorage.getItem("MyRequest_Logo");
     var fuel = $("#select2-inputFuel-container").html("Duel");

        $(".propertyContent").hide();
        
        var getPhoneCode = localStorage.getItem("MyRequest_PhoneCode-prefix");

        $(".getTenantsInfo").text("+ Current Occupant");
        var Occupantplusminus = $(".getTenantsInfo").text();
        if(Occupantplusminus == "+ Current Occupant"){
            $(".getTenantList").hide();
        }

        $(".PropertyDetailsinfo").text("- Property Details");
        var PropertyDetailsinfo = $(".PropertyDetailsinfo").text();
        if(PropertyDetailsinfo == "- Property Details"){
            $(".PropertyDetails").show();
        }

        $(".getUtilityInfo").text("+ Utility Management Details");
        var getUtilityinfo = $(".PropertyDetailsinfo").text();
        if(getUtilityinfo == "+ Utility Management Details"){
            $(".utilityInfo").hide();
        }

        $(".getPropMandatoryInfo").text("+ Property Mandatory Details");
        var getPropertyinfo = $(".getPropMandatoryInfo").text();
        if(getPropertyinfo == "+ Property Mandatory Details"){
            $(".propMandatoryContent").hide();
        }

        $(".landLordTitle").text("+ Landlord Details");
        var getlandlordInfo = $(".landLordTitle").text();
        if(getlandlordInfo == "+ Landlord Details"){
            $(".landlordInfo").hide();
        }

        $(".divUtilityHistory").hide();
        $(".divtenantHistory").hide();
             
     localStorage.setItem("MyRequest_RepairStatus", "");
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
        //  $(".getUserName").text(adminUserName);
         $("#utilityAgreeLettingAgentName").text(adminUserName);
         $("#FileURLUploadImage4").attr("action",domainAddress+"ajaximage.php");
         $("#FileURLUploadImage1").attr("action",domainAddress+"ajaximage.php");
         $("#FileURLUploadImage2").attr("action",domainAddress+"ajaximage.php");
         $("#FileURLUploadImage3").attr("action",domainAddress+"ajaximage.php");
         $("#FileURLUploadImage5").attr("action",domainAddress+"ajaximage.php");
     }

    if(getPhoneCode == '+44'){
        $(".postcodebasedcountry").html("Post Code<span class='req'>*</span>");
        $(".postcodebasedcountryth").html("Post Code");
        }
        else {
        $(".postcodebasedcountry").html("Zip Code<span class='req'>*</span>");
        $(".postcodebasedcountryth").html("Zip Code");
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
 
     $('.economy7 > span').css('box-shadow', 'rgba(255, 179, 0, 0.498039) 0px 0px 0px 7px inset').css('border-color', 'rgba(255, 179, 0, 0.498039)').css('transition', 'border 0.4s').css('box-shadow', '0.4s').css('background-color', '1.2s').css('background-color', 'rgba(255, 179, 0, 0.498039)');
     $('.economy7 > span > small').css('left', '18px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(255, 179, 0)');
     $("#inputEconomy7").prop("checked", true);
 
     $('.waterMeter > span').css('box-shadow', 'rgba(255, 179, 0, 0.498039) 0px 0px 0px 7px inset').css('border-color', 'rgba(255, 179, 0, 0.498039)').css('transition', 'border 0.4s').css('box-shadow', '0.4s').css('background-color', '1.2s').css('background-color', 'rgba(255, 179, 0, 0.498039)');
     $('.waterMeter > span > small').css('left', '18px').css('transition', 'background-color 0.4s, left 0.2s').css('background-color', 'rgb(255, 179, 0)');
     $("#inputWaterMeter").prop("checked", true);
 
     


     $(".hmoInputTenent").hide();
     $(".hmoLicenseNumber").hide();

     $.get(domainAddress + "GetSpecialityList", function(result) {
         $("#inputSpeciality").html('');
         $("#inputSpeciality").html("<option value='0'>Select Speciality</option>");
         if (result.record_count == 0) {
             $("#inputSpeciality").append("<option value='0'>Select Speciality</option>");
         } else {
             for (speciality in result.records) {
                 $("#inputSpeciality").append("<option value='" + result.records[speciality].SpecialityID + "'>" + result.records[speciality].SpecialityName + "</option>");
             }

         }
     });


     maxProp++;
     $("#enterPageNO").val(maxProp);
     getPropertyList(getValue);
     $(".getTenantList").html('');
     $("#getIsAppInstallCheck-" + count).css("height", "610px");

     $("#inputState").select2()
         .on("change", function(e) {
             getStateCityList();
         });

     $("#inputState1").select2()
         .on("change", function(e) {
             getLandlordStateCityList();
         });

     $(".md-overlay").css("background", "rgba(0,0,0,0.5)");
     $("#getLoadingModalContent").addClass('md-show');
     $(".getLettingAgencyBusinessName").text("My Property - " + businessName);
     $("#inputWaterAuthority").select2();
     $("#inputLandlordTitle").select2();
     $("#inputProperty").select2();
     $("#inputBedrooms").select2();
     $("#inputPropertyStatus").select2();
     $("#inputFuel").select2();
     $("#inputSupplierElectric").select2();
     $("#inputSupplierGas").select2();
     $('#singleHmo').iCheck('check');
     $('#landBuildInsurYes').iCheck('uncheck');
     $('#landBuildInsurNo').iCheck('check');
     $('#voidPartYes').iCheck('check');
     $(".btnSubmitPropertyMoveOut").hide();
     $(".landlordInfo").hide();
     $(".utilityInfo").hide();
     $(".propMandatoryContent").hide();
     $(".utilityIcon").hide();
     $(".utilityIconLabel").hide();
     $(".ele2").hide();
     $(".ele3").hide();
     getCityCouncilList();
     $("#inputTaxAuthority").select2();
     $(".utilityImage").hide();
     $(".utilityLabel").hide();

    $(".getTenantList").html('');
    getAddTenant(1);
    //getAddTenant(2);
    $("#closeCard-1").hide();
    //$("#closeCard-2").show();
    $("#hiddenIsNewTenantUpdate-1").val(1);
    getAddRemove(1);
    $("#getIsAppInstallCheck-1").css("height", "610px");
    //$("#getIsAppInstallCheck-2").css("height", "610px");

 }); // ready


    $('#inputWaterMeter').on('change', function() {
         if (this.value == '1'); {
             $("#inputWater").toggle();
             $(".waterMet").toggle();
             $(".waterAuthority").toggle();
             $("#inputWaterAuthority").toggle();
             $("#inputWaterAuthority").select2();
         }
         if (this.value == '0'); {
             $("#inputWaterAuthority").hide();
             $("#inputWaterAuthority").select2();
         }

     });


    $('#inputGas').keypress(function(event) {
        if (event.which < 46 || event.which >= 58 || event.which == 47) {
            event.preventDefault();
        }

        if (event.which == 46 && $(this).val().indexOf('.') != -1) {
            this.value = '';
        }
    });

    $('#inputGasSerialNo').keypress(function(event) {
        if (event.which < 46 || event.which >= 58 || event.which == 47) {
            event.preventDefault();
        }

        if (event.which == 46 && $(this).val().indexOf('.') != -1) {
            this.value = '';
        }
    });

    $('#inputGasMPRN').keypress(function(event) {
        if (event.which < 46 || event.which >= 58 || event.which == 47) {
            event.preventDefault();
        }

        if (event.which == 46 && $(this).val().indexOf('.') != -1) {
            this.value = '';
        }
    });
    
    $('#inputRead1').keypress(function(event) {
        if (event.which < 46 || event.which >= 58 || event.which == 47) {
            event.preventDefault();
        }

        if (event.which == 46 && $(this).val().indexOf('.') != -1) {
            this.value = '';
        }
    });
    $('#inputRead2').keypress(function(event) {
        if (event.which < 46 || event.which >= 58 || event.which == 47) {
            event.preventDefault();
        }

        if (event.which == 46 && $(this).val().indexOf('.') != -1) {
            this.value = '';
        }
    });

    $('#inputSerial1').keypress(function(event) {
        if (event.which < 46 || event.which >= 58 || event.which == 47) {
            event.preventDefault();
        }

        if (event.which == 46 && $(this).val().indexOf('.') != -1) {
            this.value = '';
        }
    });
    $('#inputSerial2').keypress(function(event) {
        if (event.which < 46 || event.which >= 58 || event.which == 47) {
            event.preventDefault();
        }

        if (event.which == 46 && $(this).val().indexOf('.') != -1) {
            this.value = '';
        }
    });

    $(".electricMPAN-prefix").hide();

    $("#inputElectricMPAN").keyup(function() {
        var inputElectricMPAN = $("#inputElectricMPAN").val();
        if (inputElectricMPAN == "") {
            $(".electricMPAN-prefix").hide();
            $("#inputElectricMPAN").removeAttr('style');
            $("#inputElectricMPAN").css("border-color", "red");
            return false;
        } else {
            $(".electricMPAN-prefix").show();
            $("#inputElectricMPAN").css("padding", "10px 25px 10px 18px");
            $("#inputElectricMPAN").css("border-color", "rgba(0,0,0,.12)");
            return false;
        }
    });
    
    $('#inputElectricMPAN').keypress(function(event) {
        if (event.which < 46 || event.which >= 58 || event.which == 47) {
            event.preventDefault();
        }

        if (event.which == 46 && $(this).val().indexOf('.') != -1) {
            this.value = '';
        }
    });
    
    $('#inputWater').keypress(function(event) {
        if (event.which < 46 || event.which >= 58 || event.which == 47) {
            event.preventDefault();
        }

        if (event.which == 46 && $(this).val().indexOf('.') != -1) {
            this.value = '';
        }
    });







 function getStateCityList() {
     var stateID = $("#inputState").val();
     $.get("CityState/getCity.php?stateID=" + stateID, function(result) {
         $("#inputCity").html('');
         $("#inputCity").html("<option value='0'>Choose City</option>");
         var getResult = JSON.parse(result);
         for (inputCity in getResult.records) {
             $("#inputCity").append("<option value='" + getResult.records[inputCity].CityName + "'>" + getResult.records[inputCity].CityName + "</option>");

         }
         $("#inputCity").select2();
     });
 } // getStateCityList() 

 function getLandlordStateCityList() {
     var stateID = $("#inputState1").val();
     $.get("CityState/getCity.php?stateID=" + stateID, function(result) {
         $("#inputCity1").html('');
         $("#inputCity1").html("<option value='0'>Choose City</option>");
         var getResult = JSON.parse(result);
         for (inputCity in getResult.records) {
             $("#inputCity1").append("<option value='" + getResult.records[inputCity].CityName + "'>" + getResult.records[inputCity].CityName + "</option>");

         }
         $("#inputCity1").select2();
     });
 } // getStateCityList() 



 $(".getProperty").click(function() {
     clearAllValues();
 });

 $(".logOut").click(function() {
     logOutClearCatch();
 });



 function getCityCouncilList() {

     $.get("CityState/council.php?", function(result) {
         $("#inputTaxAuthority").html('');
         $("#inputTaxAuthority").html("<option value='0'>Select Council</option>");
         var getResult = JSON.parse(result);
         for (inputTaxAuthority in getResult.records) {
            if(getResult.records[inputTaxAuthority].CouncilName!="Name"){
                $("#inputTaxAuthority").append("<option value='" + getResult.records[inputTaxAuthority].CouncilName + "'>" + getResult.records[inputTaxAuthority].CouncilName + "</option>");
            }
         }
         $("#inputTaxAuthority").select2();
     });
 } // getCityCouncilList(); 

 $(".closeMap").click(function(){
     var modalUtilityList = UIkit.modal("#googleMap",{bgclose: false, keyboard:false});
     modalUtilityList.hide(); 
 });
 $(".errorinfoforcode").hide();
 var mapCount = 0;
 $("#inpuZip").on('blur', function(e) {
     console.log("Blur Function Called");
         var getAddress = $("#inputAddress").val().replace(/["']/g, "`");
         var getCounty = $("#select2-inputState-container").html();
         var getCity = $("#select2-inputCity-container").html();
         var postalCode = $("#inpuZip").val();
         var getCountryName = localStorage.getItem("MyRequest_countryCode");
         var wholeAddress = getAddress + "," + getCounty + "," + getCity + ", " + postalCode + " ," + getCountryName;
         var Latitude = "";
         var Longitude = "";
         console.log(wholeAddress);
        if(postalCode == ""){
            $(".errorinfoforcode").show();
            $(".errorinfoforcode").css({"color":"red", "font-size":"12px"});
            if(getPhoneCode == "+44"){
                $(".errorinfoforcode").text("* Enter the Post Code");
            } else {
                $(".errorinfoforcode").text("* Enter the Zip Code");
            }
         } 
        else {
            $(".errorinfoforcode").hide();
            if(getAddress=="" && getCounty=="Choose County" && getCity==undefined && postalCode==""){
                console.log("No Address Details Fetched");
            }
            else {
            $(".errorinfoforcode").hide();
            var geocoder = new google.maps.Geocoder();
                if (geocoder) {
                    geocoder.geocode({
                        'address': wholeAddress
                    }, function (results, status) {
                        if(results.length == 0){
                            Latitude = 51.528308;
                            Longitude = -0.3817961;
                        } else {
                            Latitude = results[0].geometry.location.lat();
                            Longitude = results[0].geometry.location.lng();
                        }
                        console.log(Latitude+" || "+ Longitude);
                            var modalUtilityList = UIkit.modal("#googleMap",{bgclose: false, keyboard:false});
                            var myCenter = new google.maps.LatLng(Latitude, Longitude);
                            var mapCanvas = document.getElementById("propertyLocationGoogleMap");
                            var mapOptions = {center: myCenter, zoom: 10};
                            map = new google.maps.Map(mapCanvas, mapOptions);
                            var marker = new google.maps.Marker({
                                position:myCenter,
                                position: myCenter,
                                draggable: true,
                                animation: google.maps.Animation.DROP
                            });
                            marker.setMap(map);
                            setTimeout(function() {
                                google.maps.event.trigger(map,'resize');
                                map.setCenter(new google.maps.LatLng(Latitude, Longitude));
                                map.setZoom(10);
                            }, 100)
                            if( mapCount === 0){
                                $(".propertyLocationGoogleMap").googleMap({
                                    zoom: 10, // Initial zoom level (optional)
                                    type: "ROADMAP" // Map type (optional)
                                });
                                mapCount = 1;
                            }
                            $(".propertyLocationGoogleMap").addMarker({
                                coords: [Latitude, Longitude], // Postal address
                                zoom: 10,
                                draggable: true,
                                success: function(e) {
                                    getLatitude = e.lat;
                                    getLongitude = e.lon;
                                }
                            });
                            modalUtilityList.show(); 
                        
                    });
                }
            }
        }
 }); // inputAddress
 
 $("#googleMap").on('hide.uk.modal', function () { 
     map = ''; 
     google.maps.event.clearListeners(window, 'resize'); 
 }); 


 $(".btnSubmitProperty").click(function() {
     addUpdatePropertyValidation();
 });


 $(".btnSubmitUtility").click(function() {
     buttonSubmitProptyUtil();
 }); // btnSubmitUtility


    $("#closeCSVModal").click(function() {
        $("#ImportModel").hide(); 
    });

    $("#ImportCSVButton").click(function() {
        var importModal = UIkit.modal("#ImportModel");
        importModal.show();
        $("#ImportModel").show(); 
        $("#ImportCSVForm").hide();    
        $(".listImportDetails").html('');
    });

    $( "#VecoCsv" ).click(function() {
        $("#file").val('');
        $("#ImportCSVForm").show();
        $("#importText").text("Import Veco Property Move In");
        $("#importText1").text("Import Veco Property Move Out");
    });

    $( "#CFPCsv" ).click(function() {
        $("#file").val('');
        $("#ImportCSVForm").show();
        $("#importText").text("Import CFP Property Move In");
        $("#importText1").text("Import CFP Property Move Out");
    });


 $(".btnSubmitIsAgree").click(function() {
     $("#hiddenIsAgree").val(1);
     var isAgreeSet = $("#hiddenIsAgree").val();
     var modal = UIkit.modal("#modalAgreeSkip");
     var dataForm = '{"IsAgreeUtility":"' + isAgreeSet + '"}';
     var sendURL = domainAddress + 'UpdateAdminIsAgree/' + adminUserID;

     $.ajax({
         type: "POST",
         url: sendURL,
         data: dataForm,
         success: function(dataCheck) {
            localStorage.setItem( "MyRequest_IsAgreeUtility", isAgreeSet );
             var modal = UIkit.modal("#modalAgreeSkip");
             modal.hide();
             var modalUtilityList = UIkit.modal("#modalUtilityList");
             modalUtilityList.show();
         }
     });
 }); // btnSubmitIsAgree

 $(".btnSubmitPropertyMoveOut").click(function() {
     var ids = $('.tenantList').map(function() {
        return $(this).attr("tenantID");
     }).get();
     UIkit.modal.confirm('Are you sure to remove and move-out Tenant ?', function() {
        for(var i=0; i<ids.length; i++) {
            //console.log("id is => "+ids[i]);
            var getPhoneCode = localStorage.getItem("MyRequest_PhoneCode-prefix");

            var getCountValue = ids[i];//this.id.replace("btnRemoveUserTenant-", "");
            var hiddenAddPropertyID = $("#hiddenAddPropertyID-" + getCountValue).val();
            var hiddenPropertyID = $("#hiddenPropertyID").val();
            var hiddenUserRegID = $("#hiddenUserRegID-" + getCountValue).val();
            var inputMobile = getPhoneCode+$("#inputMobile-" + getCountValue).val();
            var inputEmail = $("#inputEmail-" + getCountValue).val();
            var inputName = $("#inputName-" + getCountValue).val();
            var hiddenAddress = $("#hiddenAddress-" + getCountValue).val();
            var hiddenElectricSupplier1 = $("#hiddenElectricSupplier1-" + getCountValue).val();
            var hiddenElectricSupplier2 = $("#hiddenElectricSupplier2-" + getCountValue).val();
            var hiddenFuelType = $("#hiddenFuelType-" + getCountValue).val();
            var hiddenGasMeterRead = $("#hiddenGasMeterRead-" + getCountValue).val();
            var hiddenSupplierElectric = $("#hiddenSupplierElectric-" + getCountValue).val();
            var hiddenSupplierGas = $("#hiddenSupplierGas-" + getCountValue).val();
            var hiddenTenancyStart = $("#hiddenTenancyStart-" + getCountValue).val();
            var hiddenTenancyEnd = $("#hiddenTenancyEnd-" + getCountValue).val();
            var hiddenWaterMeterRead = $("#hiddenWaterMeterRead-" + getCountValue).val();
            var hiddenIsGas = $("#hiddenIsGas-" + getCountValue).val();
            var hiddenIsElectricity = $("#hiddenIsElectricity-" + getCountValue).val();
            var hiddenIsWater = $("#hiddenIsWater-" + getCountValue).val();
            var hiddenIsCouncil = $("#hiddenIsCouncil-" + getCountValue).val();
            var hiddenAvailTenantInsurance = $("#hiddenAvailTenantInsurance-" + getCountValue).val();
            $(".utilityIcon").hide();
            $(".utilityIconLabel").hide();
            var getDate = new Date();
            var currentdate = moment(getDate).format('YYYY-MM-DD HH:mm:ss');
            var adminUserID = localStorage.getItem("MyRequest_AdminID");
            
            
                var dataForm = '{"AddPropertyID":"' + hiddenAddPropertyID + '","PropertyID":"' + hiddenPropertyID + '","UserID":"' + hiddenUserRegID + '","MobileNumber":"' + inputMobile + '","EmailID":"' + inputEmail + '","Name":"' + inputName + '","Address":"' + hiddenAddress + '","ElectricSupplier1":"' + hiddenElectricSupplier1 + '","ElectricSupplier2":"' + hiddenElectricSupplier2 + '","FuelType":"' + hiddenFuelType + '","GasMeterRead":"' + hiddenGasMeterRead + '","SupplierElectric":"' + hiddenSupplierElectric + '","SupplierGas":"' + hiddenSupplierGas + '","TenancyStart":"' + hiddenTenancyStart + '","TenancyEnd":"' + hiddenTenancyEnd + '","WaterMeterRead":"' + hiddenWaterMeterRead + '","IsGas":"0","IsElectricity":"0","IsWater":"0","IsCouncil":"0","IsAvailTenantInsurance":"' + hiddenAvailTenantInsurance + '","UtilityRegType":"move-out","Status":"Updated","Date":"' + currentdate + '","AdminID":"' + adminUserID + '"}';
                console.log(dataForm);

                var sendURL = domainAddress + 'CreateUserUtilityMoveOut';
                console.log(sendURL);
                $("#getLoadingModalContent").addClass('md-show');
                $.ajax({
                    type: "POST",
                    url: sendURL,
                    data: dataForm,
                    success: function(dataCheck) {
                        console.log(dataCheck);
                        $("#getLoadingModalContent").removeClass('md-show');
                        
                        $("#getIsAppInstallCheck-" + getCountValue).remove();
                        var editPropertyID = $("#hiddenPropertyID").val();
                       
                    }
                });               
        }
        UIkit.modal.alert('All Tenants Move-Out Successfully from this property');
            var editPropertyID = $("#hiddenPropertyID").val();
            getReloadUserTenants(editPropertyID);
     });
     //moveOut();
 });


 $(".btnSubmitTenantInsurance").click(function() {
     getValueOfTenant();
 });


 $(".btnSubmit").click(function() {
     var latitude = $("#latitude").val();
     var longitude = $("#longitude").val();
     $(".location").hide();
     var modalUtilityList = UIkit.modal("#googleMap");
     modalUtilityList.show();
 });

$('#moveinCSV').on("submit", function(e){  
    e.preventDefault(); //form will not submitted  
    $.ajax({  
        // url:"http://localhost:8888/myRequestHome/myrequestapi/UploadCSV/move-in.php",  
        url:"https://api.myrequest.co.uk/UploadCSV/move-in.php",
        method:"POST",  
        data:new FormData(this),  
        contentType:false,          // The content type used when sending data to the server. 
        cache:false,                // To unable request pages to be cached  
        processData:false,          // To send DOMDocument or non processed data file it is set to false  
        success: function(result){
            if(result == "SelectFile"){
                UIkit.modal.alert("Please Select a File");
            } else if(result == "InvalidFile"){
                UIkit.modal.alert("Invalid File. Please Upload Only CSV File");
            } else if (result == "CoulmnsError"){
                UIkit.modal.alert("CSV Columns Does not Match Please Download Sample CSV File");
            } else {
                $("#ImportModel").hide();
                getPropertyList(getValue);
                var PropertyResults = JSON.parse(result);
                var modal = UIkit.modal("#modalImportCSVResult");
                modal.show();
                for (Property in PropertyResults.records) {
                    if(PropertyResults.records[Property].Message == "Inserted"){
                        $(".listImportDetails").append("<tr><td>" + PropertyResults.records[Property].Address + "</td><td style='color:green; font-weight: bold;'>" + PropertyResults.records[Property].Message + "</td></tr> ");
                    } else {
                        $(".listImportDetails").append("<tr><td>" + PropertyResults.records[Property].Address + "</td><td style='color:red; font-weight: bold;'>" + PropertyResults.records[Property].Message + "</td></tr> ");
                    }
                }
            }
        }  
    })  
});

 $('#moveoutCSV').on("submit", function(e){  
    e.preventDefault(); //form will not submitted  
    $.ajax({  
        // url:"http://localhost:8888/myRequestHome/myrequestapi/UploadCSV/move-out.php",  
        url:"https://api.myrequest.co.uk/UploadCSV/move-out.php",  
        method:"POST",  
        data:new FormData(this),  
        contentType:false,          // The content type used when sending data to the server.  
        cache:false,                // To unable request pages to be cached  
        processData:false,          // To send DOMDocument or non processed data file it is set to false  
        success: function(result){  
            if(result == "SelectFile"){
                UIkit.modal.alert("Please Select a Move Out File");
            } else if(result == "InvalidFile"){
                UIkit.modal.alert("Invalid File. Please Upload Only CSV File");
            } else if (result == "CoulmnsError"){
                UIkit.modal.alert("CSV Columns Does not Match Please Download Sample CSV File");
            } else {
                $("#ImportModel").hide();
                getPropertyList(getValue);
                var PropertyResults = JSON.parse(result);
                var modals = UIkit.modal("#modalImportCSVResult");
                modals.show();
                for (Property in PropertyResults.records) {
                    if(PropertyResults.records[Property].Message == "Inserted"){
                        $(".listImportDetails").append("<tr><td>" + PropertyResults.records[Property].Address + "</td><td style='color:green; font-weight: bold;'>" + PropertyResults.records[Property].Message + "</td></tr> ");
                    } else {
                        $(".listImportDetails").append("<tr><td>" + PropertyResults.records[Property].Address + "</td><td style='color:red; font-weight: bold;'>" + PropertyResults.records[Property].Message + "</td></tr> ");
                    }
                }
            }
        }  
    })  
});