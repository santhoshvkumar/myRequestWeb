function addUpdateAdvertisement(){
		$(".getAdvertisement").click(function() {
            $(".btnSubmitAdvertisement").show();
            $(".advertisementContent").toggle();
            $("#hiddenAdvertisementID").val(0);
            $("#inputAdvertisementURL").val('');
            $("#imgAdvertisementImage").attr("src", "assets/img/noImage.gif");
            $(".md-input-wrapper").removeClass("md-input-filled");
            if(checkRecordCount<5){
                $(".btnSubmitAdvertisement").show();
                $(".btnSubmitAdvertisement").text("Add Advertisement");
            }
            else{
                $(".btnSubmitAdvertisement").hide();
            }
        });


        $(".btnSearch").click(function () {
            getValue = $("#inputSearch").val();
            $("#getLoadingModalContent").addClass('md-show');
            getAdvertisementList(getValue);
        });


        $("#inputAdvertisementURL").keyup(function() {
            var advertisementImageURL = $("#inputAdvertisementURL").val().replace(/["']/g, "`");
            if (advertisementImageURL == "") {
                $(".help-block").show();
                $(".help-block").text("* Enter the Advertisement URL");
                $("#inputAdvertisementURL").css("border-color","red");
                 
                $(".btnSubmitAdvertisement").attr("disabled", true);
                return false;
            } else {

                $(".help-block").hide();
                $(".help-block").text("");
                $("#inputAdvertisementURL").css("border-color","rgba(0,0,0,.12)");
                 
                $(".btnSubmitAdvertisement").attr("disabled", false);
            }
        });



        $(".btnSubmitAdvertisement").click(function() {

            var hiddenAdvertisementID = $("#hiddenAdvertisementID").val();
            var advertisementImageURL = $("#inputAdvertisementURL").val();
            var adminUserID = localStorage.getItem("MyRequest_AdminID");
            var getUploadedFilePath = imageUrl1;
            
           
            if (advertisementImageURL == "") {
                $(".help-block").css('color', 'red');
                $(".help-block").show();
                $(".help-block").text("* Enter the Advertisement URL");
                $("#inputAdvertisementURL").css("border-color","red");
                $(".btnSubmitAdvertisement").attr("disabled", true);
                return false;
            }


            if(getUploadedFilePath == ""){
                $(".help-block").css('color', 'red');
                $(".help-block").show();
                $(".help-block").text("* Select the Advertisement Image");
                $("#imgAdvertisementImage").css("border","1px solid red");
                $(".btnSubmitAdvertisement").attr("disabled", true);
                return false;
            }

            if (advertisementImageURL != "") {
                 $("#getLoadingModalContent").addClass('md-show');
                var dataForm = '{"AdvertisementImageURL":"' + advertisementImageURL + '","Image1":"' + getUploadedFilePath + '","AdminID":"' + adminUserID + '"}';
                console.log(dataForm);
                if (hiddenAdvertisementID == 0) {
                    var sendURL = domainAddress + 'CreateAdvertisement';
                    console.log(sendURL);
                    $.ajax({
                        type: "POST",
                        url: sendURL,
                        data: dataForm,
                        success: function(dataCheck) {
                            console.log(dataCheck);
                            getAdvertisementList(getValue);
                            imageUrl1 = "";
                            $("#inputAdvertisementURL").val('');
                            $("#progressbox1").hide();
                            UIkit.modal.alert('Advertisement Created Successfully');
                            $("#getLoadingModalContent").removeClass('md-show');
                        }
                    });

                } else {
                    var sendURL = domainAddress + 'updateAdvertisement/' + hiddenAdvertisementID;
                    console.log(sendURL);
                    $.ajax({
                        type: "POST",
                        url: sendURL,
                        data: dataForm,
                        success: function(dataCheck) {
                            console.log(dataCheck);
                            getAdvertisementList(getValue);
                            imageUrl1 = "";
                            $("#hiddenAdvertisementID").val(0);
                            $("#inputAdvertisementURL").val('');
                            $("#imgAdvertisementImage").attr("src", "assets/img/noImage.gif");
                            $("#progressbox1").hide();
                            $(".btnSubmitAdvertisement").text("Add Advertisement");
                            UIkit.modal.alert('Advertisement Updated Successfully');
                            $("#getLoadingModalContent").removeClass('md-show');
                        }
                    });
                   
                } // sec if specialityID

                 $(".md-input-wrapper").removeClass("md-input-filled");
                    $(".advertisementContent").hide();
            }
        });
}