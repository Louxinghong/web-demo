window.onload = () => {
  let backToTop = $(".back-to-top");
  let timer = null;
  let pageHight = document.documentElement.clientHeight;
  console.log(pageHight);

  window.onscroll = () => {
    let scrollDistance = document.documentElement.scrollTop + 150;
    console.log(scrollDistance);
    if (scrollDistance >= pageHight) {
      backToTop.css("display", "block");
    } else {
      backToTop.css("display", "none");
    }
  };

  $(".back-to-top").click(() => {
    timer = setInterval(function() {
      let allScroll = document.documentElement.scrollTop;
      let speedTop = allScroll / 6;
      document.documentElement.scrollTop = allScroll - speedTop;

      if (allScroll === 0) {
        clearInterval(timer);
      }
    }, 30);
  });
};

$(".table-menu-img").click(() => {
  $(".table-drawer").css("transform", "translate(0)");
  $(".container").css("filter", "blur(10px)");
  $("body").css("overflow-y", "hidden");
});

$(".close-drawer").click(() => {
  $(".table-drawer").css("transform", "translate(100%)");
  $(".container").css("filter", "blur(0)");
  $("body").css("overflow-y", "visible ");
});
