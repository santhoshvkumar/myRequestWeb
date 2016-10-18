function loadAdvertisement() {
    var adminUserID = 0;
    var checkRecordCount = 0;
    var advertisementCountLimit = 0;
    var maxProp = 0;
    var getValue = "";
    var adminType = "";
    var imageUrl1 = "";

    $(window).load(function() {
        $("#getLoadingModalContent").removeClass('md-show');
    });

    $(document).ready(function() {
        console.log("ready call");
        adminUserID = localStorage.getItem("MyRequest_AdminID");
        var adminUserName = localStorage.getItem("MyRequest_UserName");
        adminType = localStorage.getItem("MyRequest_AdminType");
        var businessName = localStorage.getItem("MyRequest_BusinessName");
        var lettingAgencyCode = localStorage.getItem("MyRequest_LettingAgencyCode");
        var logo = localStorage.getItem("MyRequest_Logo");
        localStorage.setItem("MyRequest_RepairStatus", "");

        $(".md-overlay").css("background", "rgba(0,0,0,0.5)");
        $("#getLoadingModalContent").addClass('md-show');
        var isFilled = localStorage.getItem("MyRequest_profileFill");
        if (isFilled == "true") {
            window.location.href = domainAgentAddress+'MyProfile.html';
        }
        //Not to allow Page

        $.get(domainAddress + "GetDateDiff/" + adminUserID, {}, function(result) {
            var getDiffDate = parseInt(result.records[0].DiffDate);
            var diffDate = 30 - getDiffDate;

            if (diffDate < -6) {
                $("#mainBody").css("opacity", "0.1");
                $("#mainBody").css("pointer-events", "none");
                $("#mainBody").css("outline", "none");


                var modulus = Math.abs(diffDate);
                UIkit.modal.alert = function(content, options) {
                    var modal = UIkit.modal.dialog(([
                        '<div class="uk-margin uk-modal-content">' + String(content) + '<br > for immediate assitance Pls contact  <a href="mailto:enquiry@myrequest.co.uk"> Drop Us Mail </a></div>',
                        '<div class="uk-modal-footer uk-text-right">  <button class="md-btn md-btn-primary  uk-btn-CenterAlign" style="margin-top:15px;"><a href="https://dashboard.gocardless.com/api/paylinks/113KHDBWH0" style="color:#fcdb34" target="_blank">Pay Now</a></button></div>'
                    ]).join(""), UIkit.$.extend({
                        bgclose: false,
                        keyboard: false
                    }, options)).show();
                    return modal;
                };


                UIkit.modal.alert(messagePaymentDue.format(modulus), {
                    center: true
                }).on('hide.uk.modal', function() {
                    // custome js code
                });



            }

        }); // End's here

        if (adminUserID == "" || adminUserID == null) {
            window.location.href = "index.html";
        } else {
            $(".getUserName").text(adminUserName);
            $("#FileURLUploadImage1").attr("action",domainAddress+"ajaximage.php");
        }

        if (adminType == "SuperAdmin") {

        } else {
            var getLogoImagePath = logo.slice(0,4);
            if(getLogoImagePath=="api/"){
                getLogoImagePath = logo.slice(4);
                $(".myRequestAdminLogo").attr("src", domainAddress + getLogoImagePath).show();
            }
            else{
                $(".myRequestAdminLogo").attr("src", domainAddress + logo).show();
            }
        }


        $(".getLettingAgencyBusinessName").text("Advertisement - " + businessName + " - " + lettingAgencyCode);
        getAdvertisementList(getValue);



    }); // ready


    $("#advertisementImageUrl1").off('click').on('change', function() {
        $("#getLoadingModalContent").addClass('md-show');
        console.log("image 1 upload click");
        var progressbox = $('#progressbox1');
        var progressbar = $('#progressbar1');
        var statustxt = $('#statustxt1');

        $("#preview1").html('');

        $("#FileURLUploadImage1").ajaxForm({
            target: '#preview1',
            beforeSubmit: function() {
                console.log('v');

            },
            uploadProgress: function(event, position, total, percentComplete) {
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
                $(".btnSubmitProduct").attr("disabled", true);
            },
            success: function(result, percentComplete) {
                if (result == "Please select image..!") {
                    $("#progressbox1").hide();
                    alert("Please select image..!");
                    return false;
                } else if (result == "Invalid file format..") {
                    $("#progressbox1").hide();
                    alert("Upload only JPG or PNG file format");
                    return false;
                } else if (result == "Image file size max 1 MB") {
                    $("#progressbox1").hide();
                    alert("Upload Image file sixe less then 1 MB");
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
                    imageUrl1 = result;
                    $(".help-block").hide();
                    $(".help-block").text("");
                    $(".btnSubmitAdvertisement").attr("disabled", false);
                    $("#getLoadingModalContent").removeClass('md-show');
                    $('#progressbox1').hide();
                    $("#imgAdvertisementImage").attr('src', domainAddress + imageUrl1);
                    $("#imgAdvertisementImage").css("height", "80px").css("width", "110px").css("border", "");
                    $(".fileupload-preview1").text(domainAddress + imageUrl1);

                }

            },
            error: function() {
                console.log('d');


            }
        }).submit();
    });


    $(".getAdvertisement").click(function() {
        $(".btnSubmitAdvertisement").show();
        $(".advertisementContent").toggle();
        $("#hiddenAdvertisementID").val(0);
        $("#inputAdvertisementURL").val('');
        $("#imgAdvertisementImage").attr("src", "assets/img/noImage.gif");
        $(".md-input-wrapper").removeClass("md-input-filled");
        if (checkRecordCount < 5) {
            $(".btnSubmitAdvertisement").show();
            $(".btnSubmitAdvertisement").text("Add Advertisement");
        } else {
            $(".btnSubmitAdvertisement").hide();
             UIkit.modal.alert('Advertisement Cant be Created above Five');

        }
    });


    function getAdvertisementList(getValue) {

        if (getValue == "" || getValue == undefined) {
            dataForm = '{"Limit":"' + parseInt(advertisementCountLimit) + '","AdminID":"' + adminUserID + '","AdminType":"' + adminType + '"}';
            sendURL = domainAddress + "AllAdvertisementByCount";
        } else {
            dataForm = '{"Limit":"' + parseInt(advertisementCountLimit) + '","SearchValue":"' + getValue + '","AdminID":"' + adminUserID + '","AdminType":"' + adminType + '"}';
            sendURL = domainAddress + "SearchAdvertisementList";
        }
        console.log(dataForm);
        console.log(sendURL);

        $.ajax({
            type: "POST",
            url: sendURL,
            data: dataForm,
            success: function(result) {
                    console.log(result);


                    if (result.record_count == 0 && result.All_Records_Count == 0) {
                        $(".allAdvertisementList").html('');
                        $(".allAdvertisementList").append("<tr id='rowID-0'> <td id='inputAdvertisementURL-0'>No Record Found</td>  <td> </td> <td> </td> <td> </td> </tr>");
                        $("#getLoadingModalContent").removeClass('md-show');
                    } else {
                        loadAdvertisementList(result);

                    }


                } // ajax success
        }); // ajax POSTS
    } // getAdvertisementList




    function loadAdvertisementList(resultAllAdvertisement) {
        if (resultAllAdvertisement.record_count == 6) {
           console.log("functionality works");
        }

        if (resultAllAdvertisement.record_count == 0) {
            $("#nextPage").attr("disabled", true);
            var enterPageNO = $("#enterPageNO").val();
            enterPageNO--;
            $("#enterPageNO").val(enterPageNO);
            $("#enterPageNO").attr("disabled", true);
            $("#getLoadingModalContent").removeClass('md-show');
        } else {
            checkRecordCount = resultAllAdvertisement.record_count;
            $("#enterPageNO").attr("disabled", false);
            $(".allAdvertisementList").html('');
            if (resultAllAdvertisement.record_count == resultAllAdvertisement.All_Records_Count) {
                console.log("equal to 9");
                $("#nextPage").attr("disabled", "disabled");
            } else if (resultAllAdvertisement.record_count < 5 && resultAllAdvertisement.record_count != 0) {
                console.log("less than 5");
                $("#nextPage").attr("disabled", "disabled");
            } else if (resultAllAdvertisement.record_count >= 5) {
                console.log("great than 9");
                $("#nextLastPage").removeAttr("disabled");
                //$("#nextLastPage").show();
            }
            lastPage = parseInt(resultAllAdvertisement.All_Records_Count / 9) + 1;
            console.log(lastPage);
            var getAdImage = "";
            for (Advertisement in resultAllAdvertisement.records) {
                var getLogoImagePath = resultAllAdvertisement.records[Advertisement].Image1.slice(0,4);
                if(getLogoImagePath=="api/"){
                    getLogoImagePath = resultAllAdvertisement.records[Advertisement].Image1.slice(4);
                    getAdImage = getLogoImagePath;
                }
                else{
                    getAdImage = resultAllAdvertisement.records[Advertisement].Image1;
                }

                $(".allAdvertisementList").append("<tr id='rowID-" + resultAllAdvertisement.records[Advertisement].AdvertisementID + "'> <td id='inputAdvertisementURL-" + resultAllAdvertisement.records[Advertisement].AdvertisementID + "' style='width: 400px;'> <img src='" + domainAddress + getAdImage + "' name='" + resultAllAdvertisement.records[Advertisement].AdvertisementImageURL + "' id='editAdvertisementImage-" + resultAllAdvertisement.records[Advertisement].AdvertisementID + "' style='width: 400px;height:100px;'/></td><td id='advertisementURL-" + resultAllAdvertisement.records[Advertisement].AdvertisementID + "' style='vertical-align: middle;'><a href='" + resultAllAdvertisement.records[Advertisement].AdvertisementURL + "' target='_blank'>" + resultAllAdvertisement.records[Advertisement].AdvertisementURL + "</a></td> <td style='vertical-align: middle;'><a class='editAdvertisement' id='editAdvertisementID-" + resultAllAdvertisement.records[Advertisement].AdvertisementID + "' style='cursor:pointer;'>  <i class='fa fa-pencil  pencil fa-1x'></i> </a></td> <td style='vertical-align: middle;'><a class='deleteAdvertisement' id='deleteAdvertisementID-" + resultAllAdvertisement.records[Advertisement].AdvertisementID + "' style='cursor:pointer;'> <i class='fa fa-trash  trash fa-1x'></i> </a></td></tr> <input type='hidden' id='hiddenAdvertisementImage-" + resultAllAdvertisement.records[Advertisement].AdvertisementID + "' value='" + resultAllAdvertisement.records[Advertisement].Image1 + "' />");
            }

            $("#getLoadingModalContent").removeClass('md-show');

            $(".editAdvertisement").on('click', function(e) {
                $("#getLoadingModalContent").addClass('md-show');
                $(".md-input-wrapper").addClass("md-input-filled");
                $(".advertisementContent").show();
                $("body").animate({
                    scrollTop: 0
                }, 'slow');
                editAdvertisementID = this.id.replace('editAdvertisementID-', '');
                $("#hiddenAdvertisementID").val(editAdvertisementID);
                var editAdvertisementURL = $("#advertisementURL-" + editAdvertisementID).text();
                var editAdvertisementImageURL = $("#hiddenAdvertisementImage-" + editAdvertisementID).val();
                $("#inputAdvertisementURL").val(editAdvertisementURL);
                if (editAdvertisementImageURL == "" || editAdvertisementImageURL == null) {
                    $("#imgAdvertisementImage").attr("src", "assets/img/noImage.gif");
                    imageUrl1 = "";
                } else {
                    imageUrl1 = editAdvertisementImageURL;
                    $("#imgAdvertisementImage").attr('src', domainAddress + editAdvertisementImageURL);
                    $("#imgAdvertisementImage").css("height", "80px").css("width", "100px");
                }
                $(".md-input-wrapper").addClass("md-input-filled");
                $(".advertisementContent").show();
                $(".btnSubmitAdvertisement").show();
                $(".btnSubmitAdvertisement").text("Update Advertisement");
                $("#getLoadingModalContent").removeClass('md-show');
            }); // .editAdvertisement


            $(".deleteAdvertisement").on('click', function(e) {
                deleteAdvertisementID = this.id.replace('deleteAdvertisementID-', '');
                UIkit.modal.confirm('Are you sure?', function() {
                    $("#getLoadingModalContent").addClass('md-show');
                    $.post(domainAddress + 'DeleteAdvertisement/' + deleteAdvertisementID, function(e) {
                        console.log(e);
                        $("#rowID-" + deleteAdvertisementID).remove();
                        $("#getLoadingModalContent").removeClass('md-show');
                        getAdvertisementList(getValue);
                        UIkit.modal.alert('Advertisement Deleted Successfully');
                    });
                });
            }); // deleteAdvertisement

        }

    }



    $(".btnSearch").click(function() {
        getValue = $("#inputSearch").val();
        $("#getLoadingModalContent").addClass('md-show');
        getAdvertisementList(getValue);
    });


    $("#inputAdvertisementURL").keyup(function() {
        var advertisementImageURL = $("#inputAdvertisementURL").val().replace(/["']/g, "`");
        if (advertisementImageURL == "") {
            $(".help-block").show();
            $(".help-block").text("* Enter the Advertisement URL");
            $("#inputAdvertisementURL").css("border-color", "red");

            $(".btnSubmitAdvertisement").attr("disabled", true);
            return false;
        } else {

            $(".help-block").hide();
            $(".help-block").text("");
            $("#inputAdvertisementURL").css("border-color", "rgba(0,0,0,.12)");

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
            $("#inputAdvertisementURL").css("border-color", "red");
            $(".btnSubmitAdvertisement").attr("disabled", true);
            return false;
        }


        if (getUploadedFilePath == "") {
            $(".help-block").css('color', 'red');
            $(".help-block").show();
            $(".help-block").text("* Select the Advertisement Image");
            $("#imgAdvertisementImage").css("border", "1px solid red");
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

    $(".logOut").click(function() {
        logOutClearCatch();
    });

}