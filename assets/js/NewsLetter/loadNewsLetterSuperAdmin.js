function loadNewsLetter() {
    var adminUserID = 0;
    var newsLetterCountLimit = 0;
    var lastPage = 0;
    var maxProp = 0;
    var getValue = "";
    var checkMaxCount = 0;
	$("#leftArrow").attr("disabled",true);
    $("#previousPage").attr("disabled",true);
    $("#nextPage").attr("disabled",false);
    $("#rightArrow").attr("disabled",false);
    $("#enterPageNO").attr("disabled", true);
    var AdminCountry = localStorage.getItem("MyRequest_countryCode");
    $(window).load(function() {
        $("#getLoadingModalContent").removeClass('md-show');
    });


    $(document).ready(function() {
        console.log("ready call");
        adminUserID = localStorage.getItem("MyRequest_AdminID");
        var adminUserName = localStorage.getItem("MyRequest_UserName");
        var adminType = localStorage.getItem("MyRequest_AdminType");

        var businessName = localStorage.getItem("MyRequest_BusinessName");
        var logo = localStorage.getItem("MyRequest_Logo");
        localStorage.setItem("MyRequest_RepairStatus", "");
        var isFilled = localStorage.getItem("MyRequest_profileFill");
        if (isFilled == "true") {

            window.location.href = domainAgentAddress+'MyProfile.html';
        }

        $(".md-overlay").css("background", "rgba(0,0,0,0.5)");
        $("#getLoadingModalContent").addClass('md-show');
        
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
            // $(".getUserName").text(adminUserName);
        }

        if (adminType == "SuperAdmin") {

        } else {
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

        var superAdminType = localStorage.getItem("MyRequest_AdminType");
        var Getcountry = '';
        if (superAdminType == "SuperAdmin"){
            Getcountry = "All";
            $(".USSuperAdminMenu").hide();
            $(".superAdminMenu").show();
        } 
        
        if(superAdminType == "UKSuperAdmin"){
            Getcountry = "UK";
            $(".USSuperAdminMenu").hide();
            $(".superAdminMenu").show();
        }
        
        if(superAdminType == "USSuperAdmin"){
            Getcountry = "US";
            $(".superAdminMenu").hide();
            $(".USSuperAdminMenu").show();
        }


        $("#inputDropValue").select2();

        tinymce.init({
            selector: "textarea",
            plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table contextmenu paste"
            ],
            toolbar: "styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",

            relative_urls: false,

            convert_urls: false,

            remove_script_host: false,

            menubar: false,
            toolbar_items_size: 'small',

            style_formats: [{
                title: 'Bold text',
                inline: 'b'
            }, {
                title: 'Red text',
                inline: 'span',
                styles: {
                    color: '#ff0000'
                }
            }, {
                title: 'Red header',
                block: 'h1',
                styles: {
                    color: '#ff0000'
                }
            }, {
                title: 'Example 1',
                inline: 'span',
                classes: 'example1'
            }, {
                title: 'Example 2',
                inline: 'span',
                classes: 'example2'
            }, {
                title: 'Table styles'
            }, {
                title: 'Table row 1',
                selector: 'tr',
                classes: 'tablerow1'
            }],



            file_browser_callback: function(field_name, url, type, win) {
                if (type == 'image') $('#my_form input').click();
            },

            onpageload: function() {
                console.log("onpageload");

            }

        }); // tinymce 



        getAllNewsLetter(getValue);

        $(".getLettingAgencyBusinessName").text("Newsletter - " + businessName );

        maxProp++;
        $("#enterPageNO").val(maxProp);

    });
    $(".btnSearch").click(function() {
        getValue = $("#inputSearch").val();
        getAllNewsLetter(getValue);
    });

    $(".getNewsLetter").click(function() {
        $(".newsLetterContent").toggle();
        $(".getAnsweredUsersList").hide();
        $(".md-input-wrapper").removeClass("md-input-filled");
        $("#inputNewsLetterName").val('');
        $("#hiddenNewsLetterID").val(0);
        $("#inputDropValue").val("ForLettingAgent");
        $("#select2-inputDropValue-container").html("For Letting Agents Only");
        $(".btnSubmitNewsLetter").text("Add Newsletter");
        tinyMCE.activeEditor.setContent("");
    });



    $("#leftArrow").click(function() {
        $("#leftArrow").attr("disabled", true);
        $("#previousPage").attr("disabled", true);
        newsLetterCountLimit = 0;
        maxProp = 1;
        checkMaxCount=0;
        $("#enterPageNO").val(1);
        getAllNewsLetter(getValue);
        if (maxProp < lastPage) {
            $("#nextPage").attr("disabled", false);
            $("#previousPage").attr("disabled", "disabled");
            $("#leftArrow").attr("disabled", "disabled");
        }
    });

    $("#rightArrow").click(function() {
        checkMaxCount=0;
        $("#leftArrow").attr("disabled", false);
        $("#previousPage").removeAttr("disabled");
        newsLetterCountLimit = (9 * lastPage);
        newsLetterCountLimit -=9;
        maxProp = lastPage;
        checkMaxCount+=(9 * lastPage);
        $("#enterPageNO").val(maxProp);
        getAllNewsLetter(getValue);
    });

    $("#previousPage").click(function() {
        $("#nextPage").attr("disabled", false);
        checkMaxCount=0;
        if (newsLetterCountLimit == 0) {
            newsLetterCountLimit = 0;
            $("#leftArrow").attr("disabled", true);
            $("#previousPage").attr("disabled", true);
        } else {
            checkMaxCount=newsLetterCountLimit-checkMaxCount;
            newsLetterCountLimit -= 9;
            $("#previousPage").removeAttr("disabled");
        }
        if (newsLetterCountLimit == 0) {
            $("#leftArrow").attr("disabled", true);
            $("#previousPage").attr("disabled", true);
        }
        maxProp--;
        if (maxProp == 0) {
            $("#enterPageNO").val('');
        } else {
            $("#enterPageNO").val(maxProp);
        }
        getAllNewsLetter(getValue);
    });


    $("#nextPage").click(function() {
        checkMaxCount=0;
        $("#leftArrow").attr("disabled", false);
        $("#previousPage").removeAttr("disabled");
        checkMaxCount = newsLetterCountLimit+checkMaxCount+18;
        newsLetterCountLimit += 9;
        
        if (maxProp == lastPage) {
            $("#nextPage").attr("disabled", true);
        } else {
            $("#nextPage").attr("disabled", false);
            maxProp++;
            $("#enterPageNO").val(maxProp);
            if (maxProp <= lastPage) {
                getAllNewsLetter(getValue);
            }
        }
    });

    $("#enterPageNO").keyup(function() {
        if ($("#enterPageNO").val() <= lastPage && $("#enterPageNO").val()!=0) {
            maxProp = $("#enterPageNO").val();
            $("#enterPageNO").val(maxProp);
            if (maxProp == lastPage) {
                $("#leftArrow").attr("disabled", false);
                $("#previousPage").removeAttr("disabled");
                $("#nextPage").attr("disabled", true);
            } else {
                if(maxProp > 1){
                    $("#previousPage").attr("disabled", false);
                    $("#rightArrow").attr("disabled", false);
                    $("#leftArrow").attr("disabled", false);
                } else {
                    $("#previousPage").attr("disabled", true);
                    $("#rightArrow").attr("disabled", true);
                    $("#leftArrow").attr("disabled", true);
                }
                $("#nextPage").attr("disabled", false);
            }
            newsLetterCountLimit = 9 * ($("#enterPageNO").val() - 1);
            getAllNewsLetter(getValue);
        } 
    });

    $("#inputNewsLetterName").keyup(function() {
        var inputNewsLetterName = $("#inputNewsLetterName").val();
        if (inputNewsLetterName == "") {
            $(".errorInfo").show();
            $("#inputSpecialityName").css("border-color", "red");
            $(".errorInfo").text("* Enter the Newsletter Name");
            $(".btnSubmitNewsLetter").attr("disabled", true);
            return false;
        } else {
            $(".errorInfo").hide();
            $(".errorInfo").text("");
            $("#inputNewsLetterName").css("border-color", "rgba(0,0,0,.12)");
            $(".btnSubmitNewsLetter").attr("disabled", false);
        }
    });


    $("#inputNewsLetterDescription").keyup(function() {
        var inputNewsLetterDescription = $("#inputNewsLetterDescription").val();
        console.log("call : " + inputNewsLetterDescription);
        if (inputNewsLetterDescription == "") {
            $(".errorInfo").show();
            $(".newsLetterDescriptionLbl").css("color", "red");
            $(".errorInfo").text("* Enter the Newsletter Name");
            $(".btnSubmitNewsLetter").attr("disabled", true);
            return false;
        } else {
            $(".errorInfo").hide();
            $(".errorInfo").text("");
            $(".newsLetterDescriptionLbl").css("color", "");
        }
    });

    $(".logOut").click(function() {
        logOutClearCatch();
    });


    $(".btnSubmitNewsLetter").click(function() {
        var newsLetterID = $("#hiddenNewsLetterID").val();
        $("#getLoadingModalContent").addClass('md-show');
        var inputDropValue = $("#inputDropValue").val();
        var newsLetterName = $("#inputNewsLetterName").val().replace(/'/g, "′");
        adminUserID = localStorage.getItem("MyRequest_AdminID");
        var newsLetterFor = "";
        var newsLetterDescription = encodeURI(tinyMCE.activeEditor.getContent()).replace(/'/g, "`");
        $("#getLoadingModalContent").addClass('md-show');

        if (newsLetterName == "") {
            $(".errorInfo").show();
            $(".errorInfo").text("* Enter the Newsletter Name");
            $("#inputNewsLetterName").css("border-color", "red");
            $("#getLoadingModalContent").removeClass('md-show');
            $(".btnSubmitSpeciality").attr("disabled", true);
            return false;
        }

        if (newsLetterDescription == "") {
            $(".errorInfo").show();
            $(".errorInfo").text("* Enter the Newsletter Description");
            $("#getLoadingModalContent").removeClass('md-show');
            $(".newsLetterDescriptionLbl").css("color", "red");
            return false;
        } else {
            $(".errorInfo").hide();
            $(".errorInfo").text("");
            $(".newsLetterDescriptionLbl").css("color", "");

            var dataForm = '{"TitleName":"' + newsLetterName + '","TitleDescription":"' + newsLetterDescription + '","AdminID":"' + adminUserID + '","NewsLetterFor":"' + inputDropValue + '","IsUtilityNewsLetter":"0","Getcountry":"' +AdminCountry+ '"}';
            console.log(dataForm);

            newsLetterFor = "For Letting Agent";

            if (newsLetterID == 0) {
                var sendURL = domainAddress + 'CreateNewsLetter';
                console.log(sendURL);
                $.ajax({
                    type: "POST",
                    url: sendURL,
                    data: dataForm,
                    success: function(dataCheck) {
                        console.log(dataCheck);
                         var callForPush = domainAddress + "push/messageSendBySuperAdminForLettingAgent.php";
                        // debugger;
                        /*  For Push Notification to All Tenant & Contractor */
                         $.post(callForPush, {StatusMessage:newsLetterName, adminID:adminUserID, Title:'Newsletter'}, function(result) {
                             console.log(result);
                         });
                        console.log(callForPush);
                        console.log({StatusMessage:newsLetterName, adminID:adminUserID, Title:'Newsletter'});
                         /*  For Push Notification to All Tenant & Contractor */

                        newsLetterCountLimit = 0;
                        getAllNewsLetter(getValue);
                        $("#inputDropValue").val("ForLettingAgent");
                        $("#select2-inputDropValue-container").html("For Letting Agents Only");
                        $("#inputNewsLetterName").val('');
                        $("#inputNewsLetterDescription").val('');
                        UIkit.modal.alert('NewsLetter Created Successfully');
                        tinyMCE.get("inputNewsLetterDescription").setContent("");
                        $("#getLoadingModalContent").removeClass('md-show');
                    }
                });
            } else {
                var sendURL = domainAddress + 'UpdateNewsLetterDetails/' + newsLetterID;
                console.log(sendURL);
                $.ajax({
                    type: "POST",
                    url: sendURL,
                    data: dataForm,
                    success: function(dataCheck) {
                        console.log(dataCheck);
                        newsLetterCountLimit = 0;
                        getAllNewsLetter(getValue);
                        $("#inputDropValue").val("ForLettingAgent");
                        $("#select2-inputDropValue-container").html("For Letting Agents Only");
                        $("#inputNewsLetterName").val('');
                        $("#inputNewsLetterDescription").val('');
                        UIkit.modal.alert("Newsletter Updated Successfully");
                        $(".btnSubmitNewsLetter").text("Add Newsletter");
                        tinyMCE.get("inputNewsLetterDescription").setContent("");
                        $("#getLoadingModalContent").removeClass('md-show');

                    }
                });



            }


            $(".md-input-wrapper").removeClass("md-input-filled");
            $(".newsLetterContent").hide();
        }

    }); // .btnSubmitNewsLetter



    function getAllNewsLetter(getValue) {
        adminUserID = localStorage.getItem("MyRequest_AdminID");
        if (getValue == "" || getValue == undefined) {
            dataForm = '{"Limit":"' + parseInt(newsLetterCountLimit) + '","AdminID":"' + adminUserID + '","Getcountry":"' + AdminCountry + '"}';
            sendURL = domainAddress + "NewsLetterListByCount";
        } else {
            dataForm = '{"Limit":"' + parseInt(newsLetterCountLimit) + '","SearchValue":"' + getValue + '","AdminID":"' + adminUserID + '","Getcountry":"' + AdminCountry + '"}';
            sendURL = domainAddress + "SearchNewsletterList";
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
                        $(".allNewsLetterList").html('');
                        $(".allNewsLetterList").append("<tr class='odd gradeX' id='rowID-0'> <td id='titleName-0'>No Records Found</td> <td id='noOfViews-0'></td> <td class='editNewsLetter' id='editNewsLetter-0'> </td> <td class='deleteNewsLetter' id='deleteNewsLetter-0' > </td><td></td></tr> ");
                        $("#getLoadingModalContent").removeClass('md-show');
                    } else {
                        loadNewsLetterList(result);
                    }


                } // ajax success
        }); // ajax POSTS

    }



    function loadNewsLetterList(result) {

        if (result.record_count == 0) {
            $("#nextPage").attr("disabled", true);
            var enterPageNO = $("#enterPageNO").val();
            enterPageNO--;
            $("#enterPageNO").val(enterPageNO);
            $("#enterPageNO").attr("disabled", true);
            $("#getLoadingModalContent").removeClass('md-show');
        } else {
            $(".allNewsLetterList").html('');
            if (result.record_count == result.All_Records_Count) {
                console.log("equal to 9");
                $("#enterPageNO").attr("disabled", true);
                $("#nextPage").attr("disabled", true);
                $("#rightArrow").attr("disabled", true);
            } else if (result.record_count < 9 && result.record_count != 0) {
                console.log("less than 9");
                $("#enterPageNO").attr("disabled", true);
                $("#rightArrow").attr("disabled", true);
                $("#nextPage").attr("disabled", true);
            } else if (result.record_count >= 9) {
                console.log("great than 9");
                $("#enterPageNO").attr("disabled", false);
                if(checkMaxCount==result.All_Records_Count){
                    $("#nextPage").attr("disabled", "disabled");
                    $("#rightArrow").attr("disabled", "disabled");
                } else {
                    $("#nextPage").removeAttr("disabled");
                    $("#rightArrow").removeAttr("disabled");
                }
            }
            lastPage = parseInt(result.All_Records_Count / 9) + 1;
            console.log(lastPage);
            for (getNewsLetter in result.records) {
                $(".allNewsLetterList").append("<tr class='odd gradeX' id='rowID-" + result.records[getNewsLetter].NewsLetterID + "'> <td id='titleName-" + result.records[getNewsLetter].NewsLetterID + "'>" + result.records[getNewsLetter].TitleName + "</td><td id='newsLetterFor-" + result.records[getNewsLetter].NewsLetterID + "'>" + result.records[getNewsLetter].NewsLetterFor + "</td> <td id='noOfViews-" + result.records[getNewsLetter].NewsLetterID + "'>" + result.records[getNewsLetter].TotalNosViewed + "</td> <td class='editNewsLetter' id='editNewsLetter-" + result.records[getNewsLetter].NewsLetterID + "' style='cursor:pointer;'><i class='fa fa-pencil  pencil fa-1x'></i></td><td class='deleteNewsLetter' id='deleteNewsLetter-" + result.records[getNewsLetter].NewsLetterID + "' style='cursor:pointer;'><i class='fa fa-trash  trash fa-1x'></i> <input type='hidden' id='hiddenNotificationContentID-" + result.records[getNewsLetter].NewsLetterID + "' value='" + result.records[getNewsLetter].NotificationContentID + "' /> </td></tr> ");
            }

            $("#getLoadingModalContent").removeClass('md-show');
            
            $(".editNewsLetter").on('click', function(e) {
                $(window).scrollTop(0);
                $(".md-input-wrapper").addClass("md-input-filled");
                $(".newsLetterContent").show();
                var editNewsLetter = this.id.replace('editNewsLetter-', '');
                var hiddenNotificationContentID = $("#hiddenNotificationContentID-" + editNewsLetter).val();
                $("#hiddenNewsLetterID").val(editNewsLetter);
                $("#getLoadingModalContent").addClass('md-show');
                $.get(domainAddress + "GetNewsLetterDetails/" + editNewsLetter, {}, function(result) {
                    console.log(result);
                    for (var getNewsLetter in result.records) {
                        $("#select2-inputDropValue-container").html(result.records[getNewsLetter].NewsLetterFor);
                        $("#inputDropValue").val(result.records[getNewsLetter].NewsLetterFor);
                        $("#inputNewsLetterName").val(result.records[getNewsLetter].TitleName);

                        $("#select2-inputDropValue-container").html(result.records[getNewsLetter].NewsLetterFor);
                        $("#inputDropValue").val(result.records[getNewsLetter].NewsLetterFor);

                        tinyMCE.activeEditor.setContent(decodeURIComponent(result.records[getNewsLetter].TitleDescription), {
                            format: 'raw'
                        });
                        $("#getLoadingModalContent").removeClass('md-show');
                        $(".btnSubmitNewsLetter").text("Update NewsLetter");

                    }

                });

                if (hiddenNotificationContentID == 0) {
                    $(".getAnsweredUsersList").show();
                    $(".listAnsweredUsers").html('');
                    $(".listAnsweredUsers").append("<tr> <td>No records found </td> <td> </td> <td> </td> </tr>");
                } else {
                    $.get(domainAddress + "GetNewsLetterViewedUsersList/" + hiddenNotificationContentID + "/" + adminUserID, {}, function(result) {
                        console.log(result);
                        $(".getAnsweredUsersList").show();
                        $(".listAnsweredUsers").html('');
                        if (result.record_count == 0) {
                            $(".listAnsweredUsers").append("<tr> <td>No records found </td> <td> </td> <td> </td> </tr>");
                        } else {
                            for (var getAnsweredUsers in result.records) {

                                $(".listAnsweredUsers").append("<tr> <td id='name-" + result.records[getAnsweredUsers].UserID + "'>" + result.records[getAnsweredUsers].Name + " </td> <td id='emailID-" + result.records[getAnsweredUsers].UserID + "'> <a href='mailto:" + result.records[getAnsweredUsers].EmailID + "' target='_top'>" + result.records[getAnsweredUsers].EmailID + " </a></td> <td id='mobileNumber-" + result.records[getAnsweredUsers].UserID + "'>" + result.records[getAnsweredUsers].MobileNumber + " </td> </tr>");
                            }

                            $("#getLoadingModalContent").removeClass('md-show');
                        }

                    });
                }



            });



            $(".deleteNewsLetter").on('click', function(e) {
                var getNewsLetterID = this.id.replace('deleteNewsLetter-', '');

                UIkit.modal.confirm('Do you want to delete the Newsletter?', function() {
                    $("#getLoadingModalContent").addClass('md-show');
                    $.post(domainAddress + 'DeleteNewsLetterDetails/' + getNewsLetterID, function(e) {
                        $("#rowID-" + getNewsLetterID).remove();
                        getAllNewsLetter(getValue);
                        $("#getLoadingModalContent").removeClass('md-show');
                        UIkit.modal.alert("Newsletter Deleted Successfully");
                    });
                });


            }); // deleteNewsLetter

        }

    } // loadNewsLetterList(result)
}