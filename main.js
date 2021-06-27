// Select the span in control button (The Start Game Button):
document.querySelector(".control-buttons span").onclick = () => {
    // Prompt window to ask for name:  
    let yourName = prompt("Enter Your Name: ");
    // Check if the prompt is empty: 
    if (yourName == null || yourName == "") {
        document.querySelector(".name span").innerHTML = "Unknown";
    } else {
        document.querySelector(".name span").innerHTML = yourName;
    }
    // Remove the splash screen:
    document.querySelector(".control-buttons").remove();


// Set the cutDown counter : 
let seconds = 22,
    countDiv = document.getElementById('countdown'),
    secondPass,
    countDown = setInterval(function () {

        "use strict";
        secondPass();
        
    }, 1000);

    secondPass = () => {    
        "use strict";

        let minutes = Math.floor(seconds / 60),
            remainSeconds = seconds % 60;

        if (seconds <10) {
            remainSeconds = '0' + remainSeconds;
        }
        
        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        countDiv.innerHTML = minutes + ":" + remainSeconds;

        if (seconds > 0) {
            seconds -= 1;

        } else {
            clearInterval(countDown);
            countDiv.innerHTML = "Time Out";
            
            // Block the clicking :
            blocksContainer.classList.add('no-clicking');
            
            
     
            // Create overlay element :
            let overlay = document.createElement("div");

            // Add class to overlay : 
            overlay.className = 'popup-overlay';

            // Append the overlay to the Body :
            document.body.appendChild(overlay);

            // Create The popup :
            let popupBox = document.createElement("div");

            // Add class to the Popup Box : 
            popupBox.className = 'popup-box';

            let imgHeading = document.createElement("h3");

            // create text for Heading :
            let imgText = "Time Over";

            // Append the text to the Heading :
            imgHeading.append(imgText);

            // Append the Heading to the Popup box :
            popupBox.appendChild(imgHeading);

            // Create the Image : 
            let popupImage = document.createElement("img");

            // Set Image Source 'src' :
            popupImage.src = "../Memory Game/imgs/hello.png";

            // Add image to Popup Box : 
            popupBox.appendChild(popupImage);

            // Append the popup box to the Body : 
            document.body.appendChild(popupBox);
            
            //  Create The Close span ('X' mark) :
            let closeButton = document.createElement("span");

            // Create the close button text : 
            let closeButtonText = document.createTextNode("X");

            // Append text to close button :
            closeButton.appendChild(closeButtonText);

            // Add class to closeButton : 
            closeButton.className = "close-button";
            
            // Add the close button to the Popup Box :
            popupBox.appendChild(closeButton);


            document.querySelector('.memory-game  .game-block.is-flipped').classList.remove('is-flipped');
        }
    };

}

// Effection duration: 
let duration = 500;

// Select blocks container: 
let blocksContainer = document.querySelector(".memory-game");

let blocks = Array.from(blocksContainer.children);

// Create range of keys:
// let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);

// Add order css property to game blocks: 
blocks.forEach((block, index) => {
    // Add Css  Order Property : 
    block.style.order = orderRange[index];

    // Add Click Event :
    block.addEventListener('click', () => {
        // Trigger the Flip Block Function :
        flipBlock(block);
    });
});

// Create Shuffle Function :
function shuffle (array) {
    // variables setting: 
    let current = array.length,
        temp,
        random;

    while (current > 0) {
        // Get random element: 
        random = Math.floor(Math.random() * current);

        // Decrease the length by one:
        current--;

        /*
            [1] Save current element in stash(box).
            [2] Current element = Random element.
            [3] Random element = Get element from stash.
        */
       // [1] Save current element in stash(box):
        temp = array[current];
        
        // [2] Current element = Random element:
        array[current] = array[random];

        // [3] Random element = Get element from stash:
        array[random] = temp;
    }

    return array;
}


// Create Flip block function :
function flipBlock (selectedBlock) {
    // Add class 'is-flipped' :
    selectedBlock.classList.add('is-flipped');

    // Collect all Flipped cards :
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    // Check if there is Two Selected Blocks (cards) :
    if (allFlippedBlocks.length === 2 ) {
        // console.log('two is selected');

        // Stop Clicking Function : 
        stopClicking();

        // Ckeck Matched Blocks Function :
        ckeckMatchedBlocks(allFlippedBlocks[0],allFlippedBlocks[1]);

    }
}

// Stop Clicking Function : 
function stopClicking () {

    // Add class 'no-clicking' on main container :
    blocksContainer.classList.add('no-clicking');

    // Set the Duration of no clicking :
    setTimeout(() => {
        // Remove class 'no-clicking' after the duration :
        blocksContainer.classList.remove('no-clicking');

    }, duration); 
}

// Ckeck Matched Blocks Function :
function ckeckMatchedBlocks (firstBlock, secondBlock) {

    let triesElement = document.querySelector('.tries span');
    
    if (firstBlock.dataset.illustration ===  secondBlock.dataset.illustration) {

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
   
        firstBlock.classList.add('matched');
        secondBlock.classList.add('matched');

        // Audio that run on the status of success :
        // document.getElementById('success').play();

    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');    
        }, duration);

        // Audio that run on the status of failure :
        // document.getElementById('fail').play();
    }
      
}

///////////////////////////////////////////////////////////////// Close the Popup : 
     document.addEventListener("click", (e) => {

        // check if the element has class name 'close button' ? 
        if (e.target.className == 'close-button') {
    
            // Remove the current popup :
            e.target.parentNode.remove();
    
            // Then Remove the overlay :
            document.querySelector(".popup-overlay").remove();
            
            // Reload window : 
            /* setTimeout(() => {
                window.location.reload();
            }, 300); */
            
        }
    });    
 

