const balls = document.querySelectorAll(".ball");
const lines = document.querySelectorAll(".line");

document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;

    balls[0].style.transition = `transform 0.4s ease`;
    balls[0].style.transform = `translate(${x}px, ${y}px)`;

    for (let i = 1; i < balls.length; i++) {
        const prevX = balls[i - 1].offsetLeft + balls[i - 1].offsetWidth / 2;
        const prevY = balls[i - 1].offsetTop + balls[i - 1].offsetHeight / 2;
        const angle = Math.atan2(y - prevY, x - prevX);

        const distance = Math.sqrt(Math.pow(x - prevX, 2) + Math.pow(y - prevY, 2));

        balls[i].style.transition = `transform ${0.2 + i * 0.1}s ease`;
        balls[i].style.transform = `translate(${prevX + distance * Math.cos(angle)}px, ${prevY + distance * Math.sin(angle)}px)`;

        lines[i - 1].style.transition = `width ${0.2 + i * 0.1}s ease`;
        lines[i - 1].style.width = distance + "px";
        lines[i - 1].style.transform = `translate(${prevX}px, ${prevY}px) rotate(${angle}rad)`;
    }
});
