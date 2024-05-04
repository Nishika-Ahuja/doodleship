var obj = {};

// Function to reset the game when the UFO collides with a robot
obj.reset = function() {
    alert(document.querySelector("#name").innerHTML + ", sorry! You DIED!");

    // Reset the position of all robots
    for (i = 0; i < robots.length; i++) {
        robots[i].style.top = "9vh";
        curr[i] = 9;
    }

    // Reset UFO position and score
    d = 60;
    l = 50;
    spaceship.style.top = d + "vh";
    spaceship.style.left = l + "vw";
    document.querySelector("#score").innerHTML = 0;

    document.querySelector("#name").innerHTML = prompt("Enter new player name: ");
}

// Function to handle UFO movement and collisions
obj.f = function(event) {
    // Get current UFO position
    var a = parseInt(spaceship.style.left);
    var b = parseInt(spaceship.style.top);


    // collisions with robots
    for (i = 0; i < robots.length; i++) {
        if (robots[i].classList.contains('shield-robot')) {
            continue;
        }
        
        // Check collisions with normal robots
        if ((parseInt(robots[i].style.left) + 5 > a && a > parseInt(robots[i].style.left)) || 
            ((a + 5 > parseInt(robots[i].style.left)) && a < parseInt(robots[i].style.left)) || 
            ((a + 5 <= parseInt(robots[i].style.left) + 5) && a >= parseInt(robots[i].style.left))) {
            if ((parseInt(robots[i].style.top) + 5 > b) && (b + 5 > parseInt(robots[i].style.top))) {
                document.getElementById('collisionSound').play();
                obj.reset();
                return;
            }
        }
    }

    var k = event.key.toLowerCase();
    if (k == 's') {
        if (100 <= d + 7) {
            obj.reset();
            return;
        }
        d += 2;
        spaceship.style.top = d + "vh";
    } else if (k == 'w') {
        if (d <= 8) {
            obj.reset();
            return;
        }
        d -= 2;
        spaceship.style.top = d + "vh";
    } else if (k == 'd') {
        if (100 <= l + 6) {
            obj.reset();
            return;
        }
        l += 2;
        spaceship.style.left = l + "vw";
    } else if (k == 'a') {
        if (l <= 0) {
            obj.reset();
            return;
        }
        l -= 2;
        spaceship.style.left = l + "vw";
    }

    for (i = 0; i < robots.length; i++) {
        robots[i].style.top = curr[i] + "vh";
        curr[i] = curr[i] + speeds[i];
        if (curr[i] >= 94) {
            curr[i] = 9;
            k = Math.random() * 7;
            if (k < 1) {
                k = 1;
            }
            speeds[i] = k;
            document.querySelector("#score").innerHTML = parseInt(document.querySelector("#score").innerHTML) + 1;
        }
    }
}



document.querySelector("#name").innerHTML = prompt("Enter your name: ");

// Initialize UFO and robot positions
var d = 60;
var l = 50;
var robots = document.querySelectorAll(".robo>div");
var speeds = [];
for (i = 0; i < robots.length; i++) {
    var k = ((Math.random()) ** 2) * 7;
    if (k < 1) {
        k = 1;
    }
    speeds[i] = k;
}
var curr = [];
for (i = 0; i < robots.length; i++) {
    curr[i] = speeds[i] + 9;
}

var spaceship = document.querySelector("#player"); 
window.addEventListener("keypress", obj.f, false);




