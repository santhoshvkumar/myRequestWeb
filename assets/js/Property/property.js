var getPropLat, getPropLong, isEdit=false;
 $(function() {
     var getPhoneCode = localStorage.getItem("MyRequest_PhoneCode-prefix");
     
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
    
     localStorage.setItem("MyRequest_RepairStatus", "");
     if (adminUserID == "" || adminUserID == null) {
         window.location.href = "index.html";
     } else {
         $(".getUserName").text(adminUserName);
         $("#FileURLUploadImage4").attr("action",domainAddress+"ajaximage.php");
         $("#FileURLUploadImage1").attr("action",domainAddress+"ajaximage.php");
         $("#FileURLUploadImage2").attr("action",domainAddress+"ajaximage.php");
         $("#FileURLUploadImage3").attr("action",domainAddress+"ajaximage.php");
         $("#FileURLUploadImage5").attr("action",domainAddress+"ajaximage.php");
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
     $(".getLettingAgencyBusinessName").text("Add Property - " + businessName);
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
 var mapCount = 0;
 $("#inpuZip").on('blur', function(e) {
         var getAddress = $("#inputAddress").val().replace(/["']/g, "`");
         var getCounty = $("#select2-inputState-container").html();
         var getCity = $("#select2-inputCity-container").html();
         var postalCode = $("#inpuZip").val();
         var getCountryName = localStorage.getItem("MyRequest_countryCode");
         var wholeAddress = getAddress + " " + getCounty + "," + getCity + ", " + postalCode + " ," + getCountryName;
         var Latitude = "";
         var Longitude = "";
         if(getAddress=="" && getCounty=="Select County" && getCity==undefined && postalCode==""){
            //console.log("No Address Details Fetched");
         }
         else{
         var geocoder = new google.maps.Geocoder();
            if (geocoder) {
                geocoder.geocode({
                    'address': wholeAddress
                }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                         var modalUtilityList = UIkit.modal("#googleMap",{bgclose: false, keyboard:false});
                          var myCenter = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                          var mapCanvas = document.getElementById("propertyLocationGoogleMap");
                          var mapOptions = {center: myCenter, zoom: 10};
                           map = new google.maps.Map(mapCanvas, mapOptions);
                          var marker = new google.maps.Marker({position:myCenter});
                          marker.setMap(map);
                          setTimeout(function() {
                              google.maps.event.trigger(map,'resize');
                              map.setCenter(new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()));
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
                                address: wholeAddress, // Postal address
                                zoom: 10,
                                draggable: true,
                                success: function(e) {
                                    getLatitude = e.lat;
                                    getLongitude = e.lon;
                                }
                            });
                         modalUtilityList.show(); 
                    }
                });
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
     moveOut();
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