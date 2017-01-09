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

        for (Advertisement in resultAllAdvertisement.records) {
            $(".allAdvertisementList").append("<tr id='rowID-" + resultAllAdvertisement.records[Advertisement].AdvertisementID + "'> <td id='inputAdvertisementURL-" + resultAllAdvertisement.records[Advertisement].AdvertisementID + "' style='width: 400px;'> <img src='" + domainAddress + resultAllAdvertisement.records[Advertisement].Image1 + "' name='" + resultAllAdvertisement.records[Advertisement].AdvertisementImageURL + "' id='editAdvertisementImage-" + resultAllAdvertisement.records[Advertisement].AdvertisementID + "' style='width: 400px;height:100px;'/></td><td id='advertisementURL-" + resultAllAdvertisement.records[Advertisement].AdvertisementID + "' style='vertical-align: middle;'><a href='" + resultAllAdvertisement.records[Advertisement].AdvertisementURL + "' target='_blank'>" + resultAllAdvertisement.records[Advertisement].AdvertisementURL + "</a></td> <td style='vertical-align: middle;'><a class='editAdvertisement' id='editAdvertisementID-" + resultAllAdvertisement.records[Advertisement].AdvertisementID + "' style='cursor:pointer;'>  <i class='fa fa-pencil  pencil fa-1x'></i> </a></td> <td style='vertical-align: middle;'><a class='deleteAdvertisement' id='deleteAdvertisementID-" + resultAllAdvertisement.records[Advertisement].AdvertisementID + "' style='cursor:pointer;'> <i class='fa fa-trash  trash fa-1x'></i> </a></td></tr> <input type='hidden' id='hiddenAdvertisementImage-" + resultAllAdvertisement.records[Advertisement].AdvertisementID + "' value='" + resultAllAdvertisement.records[Advertisement].Image1 + "' />");
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