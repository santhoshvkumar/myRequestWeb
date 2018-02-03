  $("#leftArrow").click(function() {
    $("#leftArrow").attr("disabled", true);
    $("#previousPage").attr("disabled", true);
    userPropertyCountLimit = 0;
    maxProp = 1;
    checkMaxCount=0;
    $("#enterPageNO").val(1);
    getPropertyList(getValue);
    if (maxProp < lastPage) {
        $("#getLoadingModalContent").addClass('md-show');
        $("#nextPage").attr("disabled", false);
        $("#previousPage").attr("disabled", "disabled");
        $("#leftArrow").attr("disabled", "disabled");
    }
  });

  $("#rightArrow").click(function() {
    checkMaxCount=0;
    $("#leftArrow").attr("disabled", false);
    $("#previousPage").removeAttr("disabled");
    userPropertyCountLimit = (9 * lastPage);
    userPropertyCountLimit -=9;
    maxProp = lastPage;
    checkMaxCount+=(9 * lastPage);
    $("#enterPageNO").val(maxProp);
    $("#getLoadingModalContent").addClass('md-show');
    getPropertyList(getValue);
  });

  $("#previousPage").click(function() {
    $("#nextPage").attr("disabled", false);
    checkMaxCount=0;
    if (userPropertyCountLimit == 0) {
        userPropertyCountLimit = 0;
        $("#leftArrow").attr("disabled", true);
        $("#previousPage").attr("disabled", true);
    } else {
        checkMaxCount=userPropertyCountLimit-checkMaxCount;
        userPropertyCountLimit -= 9;
        $("#previousPage").removeAttr("disabled");
    }
    if (userPropertyCountLimit == 0) {
        $("#leftArrow").attr("disabled", true);
        $("#previousPage").attr("disabled", true);
    }
    maxProp--;
    if (maxProp == 0) {
        $("#enterPageNO").val('');
    } else {
        $("#enterPageNO").val(maxProp);
    }
    getPropertyList(getValue);
      
  });


  $("#nextPage").click(function() {
    checkMaxCount=0;
    $("#leftArrow").attr("disabled", false);
    $("#previousPage").removeAttr("disabled");
    checkMaxCount = userPropertyCountLimit+checkMaxCount+18;
    userPropertyCountLimit += 9;
    
    if (maxProp == lastPage) {
        $("#nextPage").attr("disabled", true);
    } else {
        $("#nextPage").attr("disabled", false);
        maxProp++;
        $("#enterPageNO").val(maxProp);
        if (maxProp <= lastPage) {
            getPropertyList(getValue);
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
        countLimit = 9 * ($("#enterPageNO").val() - 1);
        $("#getLoadingModalContent").addClass('md-show');
        getPropertyList(getValue);
    } 
  });
