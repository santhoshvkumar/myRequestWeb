  $("#leftArrow").click(function() {
      userPropertyCountLimit = 0;
      maxProp = 1;
      $("#enterPageNO").val(1);
      if (maxProp < lastPage) {
          $("#getLoadingModalContent").addClass('md-show');
          $("#nextPage").attr("disabled", false);
          getPropertyList(getValue);
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
      if (userPropertyCountLimit == 0) {
          userPropertyCountLimit = 0;
          $("#previousPage").attr("disabled", "disabled");
      } else {
          userPropertyCountLimit -= 9;
          $("#previousPage").removeAttr("disabled");
      }
      if (userPropertyCountLimit == 0) {
          $("#previousPage").attr("disabled", "disabled");
      }
      maxProp--;
      if (maxProp == 0) {
          $("#enterPageNO").val('1');
      } else {
          $("#enterPageNO").val(maxProp);
          $("#getLoadingModalContent").addClass('md-show');
          getPropertyList(getValue);
      }
      
  });


  $("#nextPage").click(function() {
      $("#previousPage").removeAttr("disabled");
      userPropertyCountLimit += 9;
      
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
      if ($("#enterPageNO").val() < lastPage) {
          maxProp++;
          $("#enterPageNO").val(maxProp);
      }

      userPropertyCountLimit = 9 * ($("#enterPageNO").val() - 1);
      $("#getLoadingModalContent").addClass('md-show');
      getPropertyList(getValue);
  });


  $("#enterPageNO").keyup(function() {
      if ($("#enterPageNO").val() < lastPage) {
          maxProp++;
          $("#enterPageNO").val(maxProp);
      }

      userPropertyCountLimit = 9 * ($("#enterPageNO").val() - 1);
      $("#getLoadingModalContent").addClass('md-show');
      getPropertyList(getValue);
  });