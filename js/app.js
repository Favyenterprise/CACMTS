$(document).ready(function () {
    $("#hero-slider").owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        dots:false,
        items:1,
        smartSpeed:1000,
        navText:['PREV' ,  'NEXT'],
        responsive: {
            0: {

            },
            600: {

            },
            1000: {

            }
        }
    })
    



    $(document).ready(function () {
    $("#project-slider").owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        dots:false,
       
        smartSpeed:1000,
        margin:10,
         navText:['PREV' ,  'NEXT']
,
        responsive: {
            0: {
        items:1,
            },
            764: {
items:2,
nav:false,

            },
            1140: {
items:2,
center:true, 
margin:8,
nav:false,


            }
        }
    })
});






});

$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
   dots:true,
   
   
})


  // Simple scroll animation for .review
  window.addEventListener("scroll", function () {
    const review = document.querySelector(".review");
    const reviewTop = review.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (reviewTop < windowHeight - 100) {
      review.classList.add("visible");
    }

  });
// </script>
