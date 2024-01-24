document.addEventListener("DOMContentLoaded", function () {
    var mouseDown = false;
    var textImage = document.querySelector('.text');

    document.addEventListener('mousedown', function (event) {
        // Check if the left mouse button is pressed
        if (event.button === 0) {
            // Call the checkAndUpdatePosition function on mouse move
            mouseDown = true;
            //textImage.style.webkitMaskImage = 'radial-gradient(circle at 50% 50%, red 10%, rgba(255, 0, 0, 0) 15%)';
            //textImage.style.maskImage = 'radial-gradient(circle at 50% 50%, red 10%, rgba(255, 0, 0, 0) 15%)';
        }
    });

    document.addEventListener('mouseup', function () {
        // Remove the event listener for mouse move when the mouse button is released
        mouseDown = false;
        //textImage.style.webkitMaskImage = 'radial-gradient(circle at 50% 50%, red 0%, rgba(255, 0, 0, 0) 0%)';
        //textImage.style.maskImage = 'radial-gradient(circle at 50% 50%, red 0%, rgba(255, 0, 0, 0) 0%)';
    });

    document.addEventListener('touchstart', function (event) {
        // Prevent default behavior to avoid double-tap zooming on mobile devices
        event.preventDefault();
    
        // Call the checkAndUpdatePosition function on touch move
        mouseDown = true;
        // Your other touchstart code here
    });
    
    document.addEventListener('touchend', function () {
        // Remove the event listener for touch move when the touch is released
        mouseDown = false;
        // Your other touchend code here
    });


    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove);

    var centerDiv = document.querySelector('.center');
    var rect = centerDiv.getBoundingClientRect();
    var center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };

    

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
            mouseDown &&
            x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom
        ) {
            textImage.style.webkitMaskImage = 'radial-gradient(circle at 50% 50%, red 10%, rgba(255, 0, 0, 0) 15%)';
            textImage.style.maskImage = 'radial-gradient(circle at 50% 50%, red 10%, rgba(255, 0, 0, 0) 15%)';
            updateRadialGradientPosition(x, y);
        } else {
            textImage.style.webkitMaskImage = 'radial-gradient(circle at 50% 50%, red 0%, rgba(255, 0, 0, 0) 0%)';
            textImage.style.maskImage = 'radial-gradient(circle at 50% 50%, red 0%, rgba(255, 0, 0, 0) 0%)';
        }
    }
});