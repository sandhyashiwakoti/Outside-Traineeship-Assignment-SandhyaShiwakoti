jQuery(document).ready(function ($) {
  // Show first tab by default
  $(".team-tab-btn").first().addClass("active");
  $(".team-tab-content").first().addClass("active");

  // On tab button click
  $(".team-tab-btn").on("click", function () {
    var target = $(this).data("target");

    // Remove active from all
    $(".team-tab-btn").removeClass("active");
    $(".team-tab-content").removeClass("active");

    // Add active to clicked
    $(this).addClass("active");
    $("#" + target).addClass("active");
  });
});
