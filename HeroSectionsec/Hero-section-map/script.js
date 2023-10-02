let dropdownicon = document.querySelector('.city-selection-list-input-image');
let dropdownlist = document.querySelector('.city-selection-list-option');
var scrollmap = document.querySelector('.main-hero-section-map');
var bhuneswarx = 1.2;
var bhuneshwary = 1.2;
var delhix = 0.8;
var delhiy = 0.55;
var Luckx = 0.9;
var Lucky = 0.75;
//add more locations-do mapping according to backend criteria,search for new locations manually ,adjust in case of resizing
console.log(scrollmap);

document.addEventListener('DOMContentLoaded', function () {
    var scrollmap = document.querySelector('.main-hero-section-map');
    var originLeft = scrollmap.scrollWidth / 2 - window.innerWidth / 2;
    var originTop = scrollmap.scrollHeight / 2 - window.innerHeight / 2;

    console.log('Origin Left:', originLeft);
    console.log('Origin Top:', originTop);

    scrollmap.scrollLeft = originLeft;
    scrollmap.scrollTop = originTop;

    // Delay execution for 3 seconds (3000 milliseconds) before starting the smooth scrolling
    setTimeout(function () {
        // Define destination points with multipliers
        var destinations = [
            { leftMultiplier: 1, topMultiplier:1 },//dont remove it otherwise jerky initial transition
            //Add random destinations
            //chose multipliers carefully otherwise you'll end up in water
            { leftMultiplier: (.8 * Math.random() + 0.2), topMultiplier: Math.min((3* Math.random()),1.7) },
            { leftMultiplier: 0.7 * Math.random(), topMultiplier: Math.min(2 * Math.random(),1.8)*0.2 },
             // final destination
            { leftMultiplier: Luckx, topMultiplier: Lucky },
           
        ];

        // Function to calculate the duration based on distance
        function calculateDuration(destination, originLeft, originTop) {
            var destinationLeft = destination.leftMultiplier * originLeft;
            var destinationTop = destination.topMultiplier * originTop;
            var distance = Math.sqrt(Math.pow(destinationLeft - originLeft, 2) + Math.pow(destinationTop - originTop, 2));
            return Math.max(1000, distance * 2); // Minimum duration of 1000ms (1 second)
        }

        // Function to perform smooth scrolling with delay
        function performSmoothScroll(destinationIndex) {
            if (destinationIndex < destinations.length) {
                var destination = destinations[destinationIndex];
                var destinationLeft = destination.leftMultiplier * originLeft;
                var destinationTop = destination.topMultiplier * originTop;

                // Shorter initial duration for the first transition
                var duration = destinationIndex === 0 ? 1000 : calculateDuration(destination, destinations[destinationIndex - 1].leftMultiplier * originLeft, destinations[destinationIndex - 1].topMultiplier * originTop);

                setTimeout(function () {
                    smoothScroll(scrollmap, destinationLeft, destinationTop, duration, function () {
                        // Recursive call for the next destination
                        performSmoothScroll(destinationIndex + 1);
                    });
                }, 2000); // 2-second delay before starting the smooth scrolling
            }
        }

        // Start smooth scrolling
        performSmoothScroll(0);
    }, 1000); // Delay for 3 seconds after DOM load
});

function smoothScroll(element, toLeft, toTop, duration, callback) {
    var start = {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop,
    };
    var change = {
        scrollLeft: toLeft - start.scrollLeft,
        scrollTop: toTop - start.scrollTop,
    };
    var startTime = performance.now();

    function animateScroll(currentTime) {
        var elapsedTime = currentTime - startTime;
        var progress = Math.min(elapsedTime / duration, 1);

        // Apply easing effect (slower ease-in-out)
        progress = easeInOutCubic(progress);

        element.scrollLeft = start.scrollLeft + change.scrollLeft * progress;
        element.scrollTop = start.scrollTop + change.scrollTop * progress;

        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        } else {
            if (callback) callback(); // Call the callback when scrolling is done
        }
    }

    requestAnimationFrame(animateScroll);
}

// Easing function for slower ease-in-out
//!!Dont change
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}
function easeLinear(t) {
    return t;
}
// let dropdownicon = document.querySelector('.city-selection-list-input-image');
// let dropdownlist = document.querySelector('.city-selection-list-option');
// var scrollmap = document.querySelector('.main-hero-section-map');
// var bhuneswarx = 1.2;
// var bhuneshwary = 1.2;
// var delhix = 0.8;
// var delhiy = 0.55;
// var Luckx = 0.9;
// var Lucky = 0.75;
// //add more locations-do mapping according to backend criteria,search for new locations manually ,adjust in case of resizing
// console.log(scrollmap);
// var randomdestinations = [
//     { leftMultiplier: 1.2, topMultiplier:1.2 },
//     { leftMultiplier: .8, topMultiplier:.55 },
//     { leftMultiplier: .85, topMultiplier:.753 },
//     { leftMultiplier: .6, topMultiplier:.2},
//     { leftMultiplier: .4, topMultiplier:.7},
//     { leftMultiplier: 1.8, topMultiplier:.6 },
//     { leftMultiplier: 0.08, topMultiplier:.9},
//     { leftMultiplier: 0.5, topMultiplier:1.9},
//     { leftMultiplier: 0.5, topMultiplier:Math.min(Math.abs(1.7*Math.sin(Math.random()+0.7)),1.4)},
// ]
// console.log(randomdestinations)
// document.addEventListener('DOMContentLoaded', function () {
//     var scrollmap = document.querySelector('.main-hero-section-map');
//     var originLeft = scrollmap.scrollWidth / 2 - window.innerWidth / 2;
//     var originTop = scrollmap.scrollHeight / 2 - window.innerHeight / 2;

//     console.log('Origin Left:', originLeft);
//     console.log('Origin Top:', originTop);

//     scrollmap.scrollLeft = originLeft;
//     scrollmap.scrollTop = originTop;

//     // Delay execution for 3 seconds (3000 milliseconds) before starting the smooth scrolling
//     setTimeout(function () {
//         // Define destination points with multipliers
//         var destinations = [
//             { leftMultiplier: 1, topMultiplier:1 },//dont remove it otherwise jerky initial transition
//             //Add random destinations
//             //chose multipliers carefully otherwise you'll end up in water
//             randomdestinations[Math.floor(Math.min(randomdestinations.length*Math.random(),randomdestinations.length-1))],
//             randomdestinations[Math.floor(Math.min(randomdestinations.length*Math.random(),randomdestinations.length-1))],
//             randomdestinations[Math.floor(Math.min(randomdestinations.length*Math.random(),randomdestinations.length-1))]
//             // { leftMultiplier: (.8 *Math.random() + 0.7*Math.sin(Math.random())), topMultiplier: Math.max(Math.abs((3* Math.random())-0.7*Math.sin(Math.random()))*0.7,.4) },
//             // { leftMultiplier: 0.7 * Math.random(), topMultiplier: Math.min(Math.abs(2 * Math.random()+0.7*Math.sin(Math.random())),1.8) },
//              // final destination
//             // { leftMultiplier: Luckx, topMultiplier: Lucky },
           
//         ];

//         // Function to calculate the duration based on distance
//         function calculateDuration(destination, originLeft, originTop) {
//             var destinationLeft = destination.leftMultiplier * originLeft;
//             var destinationTop = destination.topMultiplier * originTop;
//             var distance = Math.sqrt(Math.pow(destinationLeft - originLeft, 2) + Math.pow(destinationTop - originTop, 2));
//             return Math.max(1000, distance * 2); // Minimum duration of 1000ms (1 second)
//         }

//         // Function to perform smooth scrolling with delay
//         function performSmoothScroll(destinationIndex) {
//             if (destinationIndex < destinations.length) {
//                 var destination = destinations[destinationIndex];
//                 var destinationLeft = destination.leftMultiplier * originLeft;
//                 var destinationTop = destination.topMultiplier * originTop;

//                 // Shorter initial duration for the first transition
//                 var duration = destinationIndex === 0 ? 1000 : calculateDuration(destination, destinations[destinationIndex - 1].leftMultiplier * originLeft, destinations[destinationIndex - 1].topMultiplier * originTop);

//                 setTimeout(function () {
//                     smoothScroll(scrollmap, destinationLeft, destinationTop, duration, function () {
//                         // Recursive call for the next destination
//                         performSmoothScroll(destinationIndex + 1);
//                     });
//                 }, 2000); // 2-second delay before starting the smooth scrolling
//             }
//         }

//         // Start smooth scrolling
//         performSmoothScroll(0);
//     }, 1000); // Delay for 3 seconds after DOM load
// });

// function smoothScroll(element, toLeft, toTop, duration, callback) {
//     var start = {
//         scrollLeft: element.scrollLeft,
//         scrollTop: element.scrollTop,
//     };
//     var change = {
//         scrollLeft: toLeft - start.scrollLeft,
//         scrollTop: toTop - start.scrollTop,
//     };
//     var startTime = performance.now();

//     function animateScroll(currentTime) {
//         var elapsedTime = currentTime - startTime;
//         var progress = Math.min(elapsedTime / duration, 1);

//         // Apply easing effect (slower ease-in-out)
//         progress = easeInOutCubic(progress);

//         element.scrollLeft = start.scrollLeft + change.scrollLeft * progress;
//         element.scrollTop = start.scrollTop + change.scrollTop * progress;

//         if (progress < 1) {
//             requestAnimationFrame(animateScroll);
//         } else {
//             if (callback) callback(); // Call the callback when scrolling is done
//         }
//     }

//     requestAnimationFrame(animateScroll);
// }

// // Easing function for slower ease-in-out
// //!!Dont change
// function easeInOutCubic(t) {
//     return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
// }