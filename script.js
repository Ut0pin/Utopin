// Get the circle element
const circle = document.getElementById('circle');

// Variables to store the current position
let currentX = window.innerWidth / 2; // Initial X position
let currentY = window.innerHeight / 2; // Initial Y position

// Easing function
function easeOutQuad(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
}

// Add an event listener to track mouse movement
document.addEventListener('mousemove', (event) => {
    // Calculate the new position of the circle based on mouse coordinates and scroll position
    const targetX = event.clientX + window.pageXOffset - circle.offsetWidth / 2;
    const targetY = event.clientY + window.pageYOffset - circle.offsetHeight / 2;

    // Set the new position of the circle with easing
    const startTime = Date.now();
    const duration = 1000; // You can adjust the duration to control the overall speed

    function updatePosition() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;

        if (elapsedTime < duration) {
            currentX = easeOutQuad(elapsedTime, currentX, targetX - currentX, duration);
            currentY = easeOutQuad(elapsedTime, currentY, targetY - currentY, duration);

            circle.style.left = currentX + 'px';
            circle.style.top = currentY + 'px';

            requestAnimationFrame(updatePosition);
        } else {
            // Snap to the final position when the animation is complete
            circle.style.left = targetX + 'px';
            circle.style.top = targetY + 'px';
        }
    }

    updatePosition();
});

window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    var scrollButton = document.getElementById("scrollButton");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollButton.style.display = "block";
    } else {
        scrollButton.style.display = "none";
    }
}

// Get the scroll button element
const scrollButton = document.getElementById('scrollButton');

// Function to make the button vibrate
function vibrateButton() {
    scrollButton.style.transform = 'translate(-50%, -50%) rotate(5deg)';
    setTimeout(() => {
        scrollButton.style.transform = 'translate(-50%, -50%) rotate(-5deg)';
        setTimeout(() => {
            scrollButton.style.transform = 'translate(-50%, -50%) rotate(5deg)';
            setTimeout(() => {
                scrollButton.style.transform = 'translate(-50%, -50%) rotate(0deg)';
            }, 50);
        }, 50);
    }, 50);
}

// Add event listeners for mouse hover and mouse leave
scrollButton.addEventListener('mouseenter', vibrateButton);
scrollButton.addEventListener('mouseleave', () => {
    scrollButton.style.transform = 'translate(-50%, -50%) rotate(0deg)';
});

// Function to scroll to the top of the page
function scrollToTop() {
    var scrollStep = -window.scrollY / (1000 / 15),
        scrollInterval = setInterval(function () {
            if (window.scrollY != 0) {
                window.scrollBy(0, scrollStep);
            }
            else clearInterval(scrollInterval);
        }, 15);
}
