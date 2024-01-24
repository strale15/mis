document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove);

    var centerDiv = document.querySelector('.center');
    var rect = centerDiv.getBoundingClientRect();
    var center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };

    var textImage = document.querySelector('.text');

    // Function to update the radial gradient position
    function updateRadialGradientPosition(x, y) {
        var offsetX = x - center.x;
        var offsetY = y - center.y;

        var percentX = 0.5;
        var percentY = 0.6;
        console.log(center.x*percentX);
        if(offsetX > center.x*percentX) {
            offsetX = center.x*percentX;
        } else if(offsetX < -center.x*percentX) {
            offsetX = -center.x*percentX;
        }

        if(offsetY > center.y*percentY) {
            offsetY = center.y*percentY;
        } else if(offsetY < -center.y*percentY) {
            offsetY = -center.y*percentY;
        }
             
        textImage.style.maskPosition = `${offsetX}px ${offsetY}px`;
        textImage.style.webkitMaskPosition = `${offsetX}px ${offsetY}px`;
    }

    function handleMouseMove(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
    
        checkAndUpdatePosition(mouseX, mouseY);
    }
    
    function handleTouchMove(event) {
        // Handle touch events for mobile devices
        const touch = event.touches[0];
        const touchX = touch.clientX;
        const touchY = touch.clientY;
    
        checkAndUpdatePosition(touchX, touchY);
    }
    
    function checkAndUpdatePosition(x, y) {
        // Check if the coordinates are inside the .center div
        if (
            x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom
        ) {
            updateRadialGradientPosition(x, y);
        }
    }
});