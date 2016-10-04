function ImageUpload() {
    $("#energyPerformanceCertificate").off('click').on('change', function() {
        $("#getLoadingModalContent").addClass('md-show');
        /*            console.log("image 1 upload click");
         */
        var progressbox = $('#progressbox1');
        var progressbar = $('#progressbar1');
        var statustxt = $('#statustxt1');

        $("#preview1").html('');

        $("#FileURLUploadImage1").ajaxForm({
            target: '#preview1',
            beforeSubmit: function() {
                /*                    console.log('v');
                 */
            },
            uploadProgress: function(event, position, total, percentComplete) {
                /*                    console.log("on  progress");
                 */
                progressbar.width(percentComplete + '%') //update progressbar percent complete
                    /*                    console.log(percentComplete);
                     */
                statustxt.html(percentComplete + '%'); //update status text
                $('#progressbar1').css("width", percentComplete + "%");
                $('#progressbox1').css("margin", "0px");
                $('#progressbox1').show();
                $('#progressbar1').show();

                if (percentComplete > 50) {
                    /*                         console.log("if : "+percentComplete);
                     */
                    statustxt.css('color', '#fff');
                    statustxt.html(percentComplete + '%'); //change status text to white after 50%
                    $('#progressbar1').css("width", percentComplete + "%");
                    $('#progressbox1').css("margin", "0px");
                    $('#progressbox1').show();
                    $('#progressbar1').show();
                }
                $(".btnSubmitProperty").attr("disabled", true);
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
                    $('#progressbox1').css("margin", "0px");
                    $('#progressbox1').show();
                    $('#progressbar1').show();
                    /*                         console.log('z ' + result);
                     */
                    var getUrl = "url(" + result + ")";

                    imageUrl1 = result;
                    /*                    console.log(imageUrl1);
                     */
                    $(".errorInfo").hide();
                    $(".errorInfo").text("");

                    $("#imgEnergyPerformanceCertificate").attr('src', domainAddress + imageUrl1);
                    $("#imgEnergyPerformanceCertificate").css("height", "80px").css("width", "100px").css("border", "");
                    $(".fileupload-preview1").text(domainAddress + imageUrl1);
                    $("#getLoadingModalContent").removeClass('md-show');
                    $(".btnSubmitProperty").attr("disabled", false);
                    $("#progressbox1").hide();
                }

            },
            error: function() {
                /*                    console.log('d');   
                 */

            }
        }).submit();
    });




    $("#electricityCertificate").off('click').on('change', function() {
        $("#getLoadingModalContent").addClass('md-show');
        /*            console.log("image 2 upload click");
         */
        var progressbox = $('#progressbox2');
        var progressbar = $('#progressbar2');
        var statustxt = $('#statustxt2');

        $("#preview2").html('');

        $("#FileURLUploadImage2").ajaxForm({
            target: '#preview2',
            beforeSubmit: function() {
                // console.log('v');

            },
            uploadProgress: function(event, position, total, percentComplete) {
                /*                    console.log("on  progress");
                 */
                progressbar.width(percentComplete + '%') //update progressbar percent complete
                    /*                    console.log(percentComplete);
                     */
                statustxt.html(percentComplete + '%'); //update status text
                $('#progressbar2').css("width", percentComplete + "%");
                $('#progressbox2').css("margin", "0px");
                $('#progressbox2').show();
                $('#progressbar2').show();

                if (percentComplete > 50) {
                    /*                         console.log("if : "+percentComplete);
                     */
                    statustxt.css('color', '#fff');
                    statustxt.html(percentComplete + '%'); //change status text to white after 50%
                    $('#progressbar2').css("width", percentComplete + "%");
                    $('#progressbox2').css("margin", "0px");
                    $('#progressbox2').show();
                    $('#progressbar2').show();
                }
                $(".btnSubmitProperty").attr("disabled", true);
            },
            success: function(result, percentComplete) {
                if (result == "Please select image..!") {
                    $("#progressbox2").hide();
                    alert("Please select image..!");
                    return false;
                } else if (result == "Invalid file format..") {
                    $("#progressbox2").hide();
                    alert("Upload only JPG or PNG file format");
                    return false;
                } else if (result == "Image file size max 1 MB") {
                    $("#progressbox2").hide();
                    alert("Upload Image file sixe less then 1 MB");
                    return false;
                } else {
                    if (percentComplete == "success") {
                        percentComplete = 100;
                        statustxt.html(percentComplete + ' %');
                    }

                    $('#progressbar2').css("width", percentComplete + "%");
                    $('#progressbox2').css("margin", "0px");
                    $('#progressbox2').show();
                    $('#progressbar2').show();
                    var getUrl = "url(" + result + ")";
                    /*                    console.log('z ' + getUrl);
                     */
                    imageUrl2 = result;
                    $(".errorInfo").hide();
                    $(".errorInfo").text("");

                    $("#imgElectricityCertificate").attr('src', domainAddress + imageUrl2);
                    $("#imgElectricityCertificate").css("height", "80px").css("width", "100px").css("border", "");
                    $(".fileupload-preview2").text(domainAddress + imageUrl2);
                    $("#getLoadingModalContent").removeClass('md-show');
                    $(".btnSubmitProperty").attr("disabled", false);
                    $("#progressbox2").hide();
                }

            },
            error: function() {
                /*                    console.log('d');
                 */

            }
        }).submit();
    });




    $("#gasCertificate").off('click').on('change', function() {
        $("#getLoadingModalContent").addClass('md-show');
        /*            console.log("image 3 upload click");
         */
        var progressbox = $('#progressbox3');
        var progressbar = $('#progressbar3');
        var statustxt = $('#statustxt3');

        $("#preview3").html('');

        $("#FileURLUploadImage3").ajaxForm({
            target: '#preview3',
            beforeSubmit: function() {
                /*                    console.log('v');
                 */
            },
            uploadProgress: function(event, position, total, percentComplete) {
                /*                    console.log("on  progress");
                 */
                progressbar.width(percentComplete + '%') //update progressbar percent complete
                    /*                    console.log(percentComplete);
                     */
                statustxt.html(percentComplete + '%'); //update status text
                $('#progressbar3').css("width", percentComplete + "%");
                $('#progressbox3').css("margin", "0px");
                $('#progressbox3').show();
                $('#progressbar3').show();

                if (percentComplete > 50) {
                    /*                         console.log("if : "+percentComplete);
                     */
                    statustxt.css('color', '#fff');
                    statustxt.html(percentComplete + '%'); //change status text to white after 50%
                    $('#progressbar3').css("width", percentComplete + "%");
                    $('#progressbox3').css("margin", "0px");
                    $('#progressbox3').show();
                    $('#progressbar3').show();
                }
                $(".btnSubmitProperty").attr("disabled", true);
            },
            success: function(result, percentComplete) {
                if (result == "Please select image..!") {
                    $("#progressbox3").hide();
                    alert("Please select image..!");
                    return false;
                } else if (result == "Invalid file format..") {
                    $("#progressbox3").hide();
                    alert("Upload only JPG or PNG file format");
                    return false;
                } else if (result == "Image file size max 1 MB") {
                    $("#progressbox3").hide();
                    alert("Upload Image file sixe less then 1 MB");
                    return false;
                } else {
                    if (percentComplete == "success") {
                        percentComplete = 100;
                        statustxt.html(percentComplete + ' %');
                    }

                    $('#progressbar3').css("width", percentComplete + "%");
                    $('#progressbox3').css("margin", "0px");
                    $('#progressbox3').show();
                    $('#progressbar3').show();
                    var getUrl = "url(" + result + ")";
                    /*                    console.log('z ' + getUrl);
                     */
                    imageUrl3 = result;
                    $(".errorInfo").hide();
                    $(".errorInfo").text("");

                    $("#imgGasCertificate").attr('src', domainAddress + imageUrl3);
                    $("#imgGasCertificate").css("height", "80px").css("width", "100px").css("border", "");
                    $(".fileupload-preview3").text(domainAddress + imageUrl3);
                    $("#getLoadingModalContent").removeClass('md-show');
                    $(".btnSubmitProperty").attr("disabled", false);
                    $("#progressbox3").hide();
                }

            },
            error: function() {
                /*                    console.log('d');
                 */

            }
        }).submit();
    });


    $("#legCertificate").off('click').on('change', function() {
        $("#getLoadingModalContent").addClass('md-show');
        /*            console.log("image 5 upload click");
         */
        var progressbox = $('#progressbox5');
        var progressbar = $('#progressbar5');
        var statustxt = $('#statustxt5');

        $("#preview5").html('');

        $("#FileURLUploadImage5").ajaxForm({
            target: '#preview5',
            beforeSubmit: function() {
                /*                    console.log('v');
                 */
            },
            uploadProgress: function(event, position, total, percentComplete) {
                /*                    console.log("on  progress");
                 */
                progressbar.width(percentComplete + '%') //update progressbar percent complete
                    /*                    console.log(percentComplete);
                     */
                statustxt.html(percentComplete + '%'); //update status text
                $('#progressbar5').css("width", percentComplete + "%");
                $('#progressbox5').css("margin", "0px");
                $('#progressbox5').show();
                $('#progressbar5').show();

                if (percentComplete > 50) {
                    /*                         console.log("if : "+percentComplete);
                     */
                    statustxt.css('color', '#fff');
                    statustxt.html(percentComplete + '%'); //change status text to white after 50%
                    $('#progressbar5').css("width", percentComplete + "%");
                    $('#progressbox5').css("margin", "0px");
                    $('#progressbox5').show();
                    $('#progressbar5').show();
                }
                $(".btnSubmitProperty").attr("disabled", true);
            },
            success: function(result, percentComplete) {
                if (result == "Please select image..!") {
                    $("#progressbox5").hide();
                    alert("Please select image..!");
                    return false;
                } else if (result == "Invalid file format..") {
                    $("#progressbox5").hide();
                    alert("Upload only JPG or PNG file format");
                    return false;
                } else if (result == "Image file size max 1 MB") {
                    $("#progressbox5").hide();
                    alert("Upload Image file sixe less then 1 MB");
                    return false;
                } else {
                    if (percentComplete == "success") {
                        percentComplete = 100;
                        statustxt.html(percentComplete + ' %');
                    }

                    $('#progressbar5').css("width", percentComplete + "%");
                    $('#progressbox5').css("margin", "0px");
                    $('#progressbox5').show();
                    $('#progressbar5').show();
                    var getUrl = "url(" + result + ")";
                    /*                    console.log('z ' + getUrl);
                     */
                    imageUrl5 = result;
                    $(".errorInfo").hide();
                    $(".errorInfo").text("");

                    $("#imgLegCertificate").attr('src', domainAddress + imageUrl5);
                    $("#imgLegCertificate").css("height", "80px").css("width", "100px").css("border", "");
                    $(".fileupload-preview5").text(domainAddress + imageUrl5);
                    $("#getLoadingModalContent").removeClass('md-show');
                    $(".btnSubmitProperty").attr("disabled", false);
                    $("#progressbox5").hide();
                }

            },
            error: function() {
                /*                    console.log('d');
                 */

            }
        }).submit();
    });




    $("#hmoUploadPic").off('click').on('change', function() {
        $("#getLoadingModalContent").addClass('md-show');
        /*            console.log("image 4 upload click");
         */
        var progressbox = $('#progressbox4');
        var progressbar = $('#progressbar4');
        var statustxt = $('#statustxt4');

        $("#preview4").html('');

        $("#FileURLUploadImage4").ajaxForm({
            target: '#preview4',
            beforeSubmit: function() {
                /*                    console.log('v');
                 */
            },
            uploadProgress: function(event, position, total, percentComplete) {
                /*                    console.log("on  progress");
                 */
                progressbar.width(percentComplete + '%') //update progressbar percent complete
                    /*                    console.log(percentComplete);
                     */
                statustxt.html(percentComplete + '%'); //update status text
                $('#progressbar4').css("width", percentComplete + "%");
                $('#progressbox4').css("margin", "-25px 0px 20px -10px");
                $('#progressbox4').show();
                $('#progressbar4').show();

                if (percentComplete > 50) {
                    /*                         console.log("if : "+percentComplete);
                     */
                    statustxt.css('color', '#fff');
                    statustxt.html(percentComplete + '%'); //change status text to white after 50%
                    $('#progressbar4').css("width", percentComplete + "%");
                    $('#progressbox4').css("margin", "-25px 0px 20px -10px");
                    $('#progressbox4').show();
                    $('#progressbar4').show();
                }
                $(".btnSubmitProperty").attr("disabled", true);
            },
            success: function(result, percentComplete) {
                if (result == "Please select image..!") {
                    $("#progressbox4").hide();
                    alert("Please select image..!");
                    return false;
                } else if (result == "Invalid file format..") {
                    $("#progressbox4").hide();
                    alert("Upload only JPG or PNG file format");
                    return false;
                } else if (result == "Image file size max 1 MB") {
                    $("#progressbox4").hide();
                    alert("Upload Image file sixe less then 1 MB");
                    return false;
                } else {
                    if (percentComplete == "success") {
                        percentComplete = 100;
                        statustxt.html(percentComplete + ' %');
                    }

                    $('#progressbar4').css("width", percentComplete + "%");
                    $('#progressbox4').css("margin", "-25px 0px 20px -10px");
                    $('#progressbox4').show();
                    $('#progressbar4').show();
                    var getUrl = "url(" + result + ")";
                    /*                    console.log('z ' + getUrl);
                     */
                    imageUrl4 = result;
                    $(".errorInfo").hide();

                    $(".errorInfo").text("");

                    $("#imgHmoUploadPic").attr('src', domainAddress + imageUrl4);
                    $("#imgHmoUploadPic").css("height", "100px").css("width", "120px").css("border", "");

                    $(".fileupload-preview4").text(domainAddress + imageUrl4);


                    $(".btnSubmitProperty").attr("disabled", false);
                    $("#getLoadingModalContent").removeClass('md-show');
                    $("#progressbox4").hide();

                }

            },
            error: function() {
                /*                    console.log('d');
                 */

            }
        }).submit();

    });

}