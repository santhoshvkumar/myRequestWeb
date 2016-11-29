function changesRadioProperty() {
    $("#getElect").on('change', function() {
        if (this.checked) {
            $("#hiddenIsElectricity").val(1);
        } else {
            $("#hiddenIsElectricity").val(0);
        }
    });
    
    $("#getGas").on('change', function() {
        if (this.checked) {
            $("#hiddenIsGas").val(1);
        } else {
            $("#hiddenIsGas").val(0);
        }   
    });

      $("#getTenant").on('change', function() {
            if (this.checked) {
                $("#hiddenIsLeadTenant").val(1);
            } else {
                $("#hiddenIsLeadTenant").val(0);
            }
        });

    $("#getWater").on('change', function() {
        if (this.checked) {
            $("#hiddenIsWater").val(1);
        } else {
            $("#hiddenIsWater").val(0);
        }
    });

    $("#getCouncil").on('change', function() {
        if (this.checked) {
             $("#hiddenIsCouncil").val(1);
        } else {
            $("#hiddenIsCouncil").val(0);
        }
    });

    $("#getTenantInsurance").on('change', function() {
        if (this.checked) {
            $("#hiddenIsTenantInsurance").val(1);
        } else {
            $("#hiddenIsTenantInsurance").val(0);
        }
    });

    

    $("#getAvailTenantInsurance").on('change', function() {
        if (this.checked) {
            $("#hiddenAvailTenantInsurance").val(1);
        } else {
            $("#hiddenAvailTenantInsurance").val(0);
        }
    });
    
                
    $("#getLandlordInsurance").on('change', function() {
        if (this.checked) {
            $("#hiddenIsLandlordInsurance").val(1);
        } else {
            $("#hiddenIsLandlordInsurance").val(0);
        }
    });

    $("#getRentProtectionInsurance").on('change', function() {
        if (this.checked) {
            $("#hiddenIsRentProtectionInsurance").val(1);
        } else {
            $("#hiddenIsRentProtectionInsurance").val(0);
        }
    });
        
    $('input[name="hmoSelect"]:radio').on('ifChecked', function(event) {
        if (this.value == "multiple") {
            $(".hmoInputTenent").show('slow');
            $(".hmoLicenseNumber").show('slow');
            $("#inputHMONoOfTenent").val(2);
            if(isEdit==false){
                $(".getTenantList").html('');
                getAddTenant(1);
                getAddTenant(2);
                $("#closeCard-1").hide();
                $("#closeCard-2").show();
                getAddRemove(2);
                $("#getIsAppInstallCheck-1").css("height", "610px");
                $("#getIsAppInstallCheck-2").css("height", "610px");
            }

        } else {
            $("#imgHmoUploadPic").css("border","");
            $(".hmoInputTenent").hide();
            $(".hmoLicenseNumber").hide();
            $("#inputHMONoOfTenent").val(1);
            if(isEdit==false){
                $(".getTenantList").html('');
                getAddTenant(1);
                $("#closeCard-1").hide();
                getAddRemove(1);
                $("#getIsAppInstallCheck-1").css("height", "610px");
            }
        }
        isEdit=false;
    });


     $("#inputEconomy7").on('change', function() {
        if (this.checked) {
            $("#hiddenIsEconomy7").val(1);
            $(".electMeter").show();
        } else {
            $("#hiddenIsEconomy7").val(0);
            $(".electMeter").hide();
        }
    });



    $('#inputFuel').on('change', function() {

        console.log(this.value);

        if (this.value == '1') {
            $("#inputGas").show();
            $(".ele1").show();
        }
        if (this.value == '2') {
            $("#inputGas").hide();
            $(".ele1").hide();
        }
        if (this.value == '3') {
            $("#inputGas").hide();
            $(".ele1").hide();
        }
    });
}