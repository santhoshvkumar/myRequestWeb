function uploadAdvertisementImage() {
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
                    //$("#imgAdvertisementImage").css("height", "80px").css("width", "110px").css("border", "");
                    $(".fileupload-preview1").text(domainAddress + imageUrl1);

                }

            },
            error: function() { 
                console.log('d');


            }
        }).submit();
    });
}