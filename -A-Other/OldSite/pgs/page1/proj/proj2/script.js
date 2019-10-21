var m1e = document.getElementById("m1");
var m2e = document.getElementById("m2");
var m3e = document.getElementById("m3");
var fn1l = document.getElementById("ored");
var fn2l = document.getElementById("oyel");
var fn3l = document.getElementById("oblu");

function startRace() {
    console.log("startRace Activated, Race is Beginning...");
    var x = 0;
    var interv = setInterval(function() {
        randFuncGen();
        if(++x === 30) {
            window.clearInterval(interv);
        }
    }, 1700);

    (function() {
        var counter = 30;
         setInterval(function() {
          counter--;
           if(counter >= 0) {
                span = document.getElementById("count");
                span.innerHTML = 'Race Ends in ' + counter + ' Seconds';
            }
            // Display 'counter' wherever you want to display it.
            if(counter === 0) {
                //    alert('this is where it happens');
                span.innerHTML = 'Race Is Over! Winner is Underlined!';
                clearInterval(counter);
                clearInterval(interv);
                console.log("Timer Ended, Fixing Car Position, Controlling Speed. Wait 10 Seconds...");
                var y = 0;
                var intervend = setInterval(function() {
                    if(++y === 10) {
                        window.clearInterval(intervend);
                        m1e.setAttribute("scrollamount", "100");
                        m2e.setAttribute("scrollamount", "100");
                        m3e.setAttribute("scrollamount", "100");
                        console.log("Speed Controlled. Race is Over.");
                    }
                }, 1000);
            }
        }, 1000);
    })();
}

function randFuncGen() {
    var functions = [fn1, fn2, fn3];

    function fn1() {
        m1e.setAttribute("scrollamount", "100");
        m2e.setAttribute("scrollamount", "102");
        m3e.setAttribute("scrollamount", "101");
        fn1l.innerHTML = " Red: 3rd Place | ";
        fn2l.innerHTML = "<u> Yellow: 1st Place |</u> ";
        fn3l.innerHTML = " Blue: 2nd Place";
    }

    function fn2() {
        console.log("Determining Winner...");
        m1e.setAttribute("scrollamount", "102");
        m2e.setAttribute("scrollamount", "101");
        m3e.setAttribute("scrollamount", "100");
        fn1l.innerHTML = "<u> Red: 1st Place |</u> ";
        fn2l.innerHTML = " Yellow: 2nd Place | ";
        fn3l.innerHTML = " Blue: 3rd Place";
    }

    function fn3() {
        m1e.setAttribute("scrollamount", "101");
        m2e.setAttribute("scrollamount", "100");
        m3e.setAttribute("scrollamount", "102");
        fn1l.innerHTML = " Red: 2nd Place | ";
        fn2l.innerHTML = " Yellow: 3rd Place | ";
        fn3l.innerHTML = "<u> Blue: 1st Place</u>";
    }

    function randomNumber(n) {
        return Math.floor(Math.random() * n);
    }
    functions[randomNumber(functions.length)]();
}