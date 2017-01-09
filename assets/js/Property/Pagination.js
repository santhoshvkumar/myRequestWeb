  $("#leftArrow").click(function() {
      userPropertyCountLimit = 0;
      maxProp = 1;
      $("#enterPageNO").val(1);
      getPropertyList(getValue);
      if (maxProp < lastPage) {
          $("#getLoadingModalContent").addClass('md-show');
          $("#nextPage").attr("disabled", false);
      }
  });

  $("#rightArrow").click(function() {
      $("#previousPage").removeAttr("disabled");
      userPropertyCountLimit = (9 * lastPage) - 9;
      maxProp = lastPage;
      $("#enterPageNO").val(lastPage);
      $("#getLoadingModalContent").addClass('md-show');
      getPropertyList(getValue);
  });
  $("#previousPage").click(function() {
      //console.log("inital count : "+userPropertyCountLimit);
      if (userPropertyCountLimit == 0) {
          userPropertyCountLimit = 0;
          $("#previousPage").attr("disabled", "disabled");
      } else {
          userPropertyCountLimit -= 9;
          $("#previousPage").removeAttr("disabled");
      }
      //console.log("prev count : "+userPropertyCountLimit);
      if (userPropertyCountLimit == 0) {
          $("#previousPage").attr("disabled", "disabled");
      }
      maxProp--;
      if (maxProp == 0) {
          $("#enterPageNO").val('');
      } else {
          $("#enterPageNO").val(maxProp);
      }
      $("#getLoadingModalContent").addClass('md-show');
      getPropertyList(getValue);
  });


  $("#nextPage").click(function() {
      //console.log("next inital count : "+userPropertyCountLimit);
      $("#previousPage").removeAttr("disabled");
      userPropertyCountLimit += 9;
      //console.log("next count : "+userPropertyCountLimit);


      if (maxProp == lastPage) {
          $("#nextPage").attr("disabled", true);
      } else {
          $("#nextPage").attr("disabled", false);
          maxProp++;
          $("#enterPageNO").val(maxProp);
          if (maxProp <= lastPage) {
              $("#getLoadingModalContent").addClass('md-show');
              getPropertyList(getValue);
          }
      }

  });



  $("#enterPageNO").on("change", function(e) {
      console.log("THis is called" + $("#enterPageNO").val());
      if ($("#enterPageNO").val() < lastPage) {
          maxProp++;
          $("#enterPageNO").val(maxProp);
      }


      console.log("next inital count : " + userPropertyCountLimit + " page # : " + maxProp);
      userPropertyCountLimit = 9 * ($("#enterPageNO").val() - 1);
      //console.log("next count : " + userPropertyCountLimit);
      $("#getLoadingModalContent").addClass('md-show');
      getPropertyList(getValue);
  });


  $("#enterPageNO").keyup(function() {
      console.log("THis is called " + $("#enterPageNO").val());
      if ($("#enterPageNO").val() < lastPage) {
          maxProp++;
          $("#enterPageNO").val(maxProp);
      }

      console.log("next inital count : " + userPropertyCountLimit + " page # : " + maxProp);
      userPropertyCountLimit = 9 * ($("#enterPageNO").val() - 1);
      console.log("change count : " + userPropertyCountLimit);
      $("#getLoadingModalContent").addClass('md-show');
      getPropertyList(getValue);
  });