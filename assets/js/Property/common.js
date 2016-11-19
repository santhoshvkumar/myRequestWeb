         $(".getLandlordInfo").on('click', function() {
             if ($(".landlordInfo").is(":hidden")) {
                 $(".landlordInfo").show("slow");
                 $(".landLordTitle").text('- Landlord Details');
             } else {
                 $(".landlordInfo").hide("slow");
                 $(".landLordTitle").text('+ Landlord Details');
             }
         }); // .getLandlordInfo


         $(".getUtilityInfo").on('click', function() {
             if ($(".utilityInfo").is(":hidden")) {
                 $(".utilityInfo").show("slow");
                 $(".getUtilityInfo").text('- Utility Management Details');
             } else {
                 $(".utilityInfo").hide("slow");
                 $(".getUtilityInfo").text('+ Utility Management Details');
             }
         }); // .getUtilityInfo 




         $(".getPropMandatoryInfo").on('click', function() {
             if ($(".propMandatoryContent").is(":hidden")) {
                 $(".propMandatoryContent").show("slow");
                 $(".getPropMandatoryInfo").text('- Property Mandatory Details');
             } else {
                 $(".propMandatoryContent").hide("slow");
                 $(".getPropMandatoryInfo").text('+ Property Mandatory Details');
             }
         }); // .getPropMandatoryInfo

         $(".getPropertyInfo").click(function() {
             $(".propertyInfo").toggle();
         });

         $("#inputMobileNumber").keypress(function(e) {
             if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                 return false;
             }
         });

         $(".btnSearch").click(function () {
            getValue = $("#inputSearch").val();
            getPropertyList(getValue);
            $('html, body').animate({
               scrollTop: $(".lblPropertyList").offset().top -25
            }, 800);
         });  // SearchSpeciality

         $("#inputHMONoOfTenent").keyup(function(e) {
            count = $("#inputHMONoOfTenent").val();
            if(count==""){

            }
            else{
                if (count == 1) {
                    $("#singleHmo").prop("checked",true);
                    $("#multipleHmo").prop("checked",false);
                    $('.propSingle > div').addClass('checked');
                    $('.propMultiple > div').removeClass('checked');
                    $("#imgHmoUploadPic").css("border","");
                    $(".hmoInputTenent").hide();
                    $(".hmoLicenseNumber").hide();
                } else {
                    $("#singleHmo").prop("checked",false);
                    $("#multipleHmo").prop("checked",true);
                    $('.propSingle > div').removeClass('checked');
                    $('.propMultiple > div').addClass('checked');
                    $(".hmoInputTenent").show('slow');
                    $(".hmoLicenseNumber").show('slow');
                }

                $(".getTenantList").html('');
                for(var i=1;i<=count;i++){
                    getAddTenant(i);
                    $("#getIsAppInstallCheck-"+i).css("height", "610px");
                }
                getAddRemove(count);
            }
            
        });

         $("#inputHMONoOfTenent").on('change',function(){
            count = $("#inputHMONoOfTenent").val();
            if (count == 1) {
                $("#singleHmo").prop("checked",true);
                $("#multipleHmo").prop("checked",false);
                $('.propSingle > div').addClass('checked');
                $('.propMultiple > div').removeClass('checked');
                $("#imgHmoUploadPic").css("border","");
                $(".hmoInputTenent").hide();
                $(".hmoLicenseNumber").hide();
            } else {
                $("#singleHmo").prop("checked",false);
                $("#multipleHmo").prop("checked",true);
                $('.propSingle > div').removeClass('checked');
                $('.propMultiple > div').addClass('checked');
                $(".hmoInputTenent").show('slow');
                $(".hmoLicenseNumber").show('slow');
            }

            $(".getTenantList").html('');
            for(var i=1;i<=count;i++){
                getAddTenant(i);
                $("#getIsAppInstallCheck-"+i).css("height", "610px");
            }
            getAddRemove(count);
         });

         $("#inputHMONoOfTenent").keydown(function(e) {
             // Allow: backspace, delete, tab, escape, enter and .
             if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                 // Allow: Ctrl+A
                 (e.keyCode == 65 && e.ctrlKey === true) ||
                 // Allow: Ctrl+C
                 (e.keyCode == 67 && e.ctrlKey === true) ||
                 // Allow: Ctrl+X
                 (e.keyCode == 88 && e.ctrlKey === true) ||
                 // Allow: home, end, left, right
                 (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
             }
             // Ensure that it is a number and stop the keypress
             if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                 e.preventDefault();
             }
         });