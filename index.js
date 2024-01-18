document.addEventListener("click", function (event) {
  var isClickInside = document.querySelector(".navbar").contains(event.target);
  if (!isClickInside) {
    var navbarToggler = document.querySelector(".navbar-toggler");
    if (navbarToggler.getAttribute("aria-expanded") === "true") {
      navbarToggler.click();
    }
  }
});

$.when($.ready).then(function () {
  var selectedTheme = localStorage.getItem("themetype");
  if (selectedTheme) {
    if (selectedTheme === "fa-moon") {
      applyDarkTheme();
    } else {
      applyLightTheme();
    }
  }
});

$("#theme").click(function () {
  var currentTheme = localStorage.getItem("themetype");
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
  localStorage.setItem("themetype", "fa-moon");
  $("#themetype").removeClass("fa-moon").addClass("fa-sun");
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
}

function applyLightTheme() {
  localStorage.setItem("themetype", "fa-sun");
  $("#themetype").removeClass("fa-sun").addClass("fa-moon");
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
}
