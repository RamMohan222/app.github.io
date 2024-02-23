$.when($.ready).then(function () {
  var selectedTheme = localStorage.getItem("theme-type");
  if (selectedTheme) {
    if (selectedTheme === "fa-moon") {
      applyDarkTheme();
    } else {
      applyLightTheme();
    }
  }
});

// menu toggle:start
$(document).on("click", function (event) {
  if (!$(event.target).closest(".navbar").length) {
    var navbarToggler = $(".navbar-toggler");
    if (navbarToggler.attr("aria-expanded") === "true") {
      navbarToggler.click();
    }
  }
});
// menu toggle:end

$("#theme").click(function () {
  var currentTheme = localStorage.getItem("theme-type");
  if (!currentTheme) {
    currentTheme = "fa-sun";
  }

  if (currentTheme === "fa-sun") {
    applyDarkTheme();
  } else {
    applyLightTheme();
  }
});

function applyDarkTheme() {
  localStorage.setItem("theme-type", "fa-moon");
  $("#theme-type").removeClass("fa-moon").addClass("fa-sun");
  $("body").css({ "background-color": "var(--bg-color-dark)" });
  $(".mission-title, .mission-desc").css({ color: "var(--card-color-dark)" });

  $(".batch-timings-card").css({
    "background-color": "var(--card-bg-color-dark)",
    color: "var(--card-color-dark)",
  });

  $(".tth-card-content-card").css({
    "background-color": "var(--card-bg-color-dark)",
    color: "var(--card-color-dark)",
  });

  $(".tth-card-title").css({ color: "var(--tth-card-title-color-dark)" });
}

function applyLightTheme() {
  localStorage.setItem("theme-type", "fa-sun");
  $("#theme-type").removeClass("fa-sun").addClass("fa-moon");
  $("body").css({ "background-color": "var(--bg-color-light)" });
  $(".mission-title, .mission-desc").css({ color: "var(--card-color-light)" });

  $(".batch-timings-card").css({
    "background-color": "var(--card-bg-color-light)",
    color: "var(--card-color-light)",
  });

  $(".tth-card-content-card").css({
    "background-color": "var(--card-bg-color-light)",
    color: "var(--card-color-light)",
  });
  $(".tth-card-title").css({ color: "var(--tth-card-title-color-light)" });
}
