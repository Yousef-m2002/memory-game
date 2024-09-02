 // Select The Start Game Button
    document.querySelector(".control-buttons .button").onclick = function () {
        document.getElementById('enterna').play();  
        // Prompt Window To Ask For Name
        let yourName = prompt(" اسمك ايه ياااض؟ ");
        // If Name Is Empty
        if (yourName == null || yourName == "") {
            // Set Name To Unknown
            document.querySelector(".name span").innerHTML = 'Unknown';
            // Name Is Not Empty
        } else {
            // Set Name To Your Name
            document.querySelector(".name span").innerHTML = yourName;
        }
      // Remove Splash Screen
        document.querySelector(".control-buttons").remove();
        document.getElementById('enter').play();  
};

    // Effect Duration
    let duration = 1000;

    // Select Blocks Container
    let blocksContainer = document.querySelector(".memory-game-blocks");
        
    // Create Array From Game Blocks
    let blocks = Array.from(blocksContainer.children);
    // Create Range Of Keys
    // let orderRange = [...Array(blocks.length).keys()];

    let orderRange = Array.from(Array(blocks.length).keys());

  // console.log(orderRange);
    shuffle(orderRange);
      // console.log(orderRange);

      // Add Order Css Property To Game Blocks
    blocks.forEach((block, index) => {
    
      // Add CSS Order Property
    block.style.order = orderRange[index];

        // Add Click Event
        block.addEventListener('click', function () {
        
            // Trigger The Flip Block Function
            flipBlock(block);
        
        });
    });
  // Flip Block Function
    function flipBlock(selectedBlock) {

  // Add Class is-flipped
    selectedBlock.classList.add('is-flipped');

  // Collect All Flipped Cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    // If Theres Two Selected Blocks
    if (allFlippedBlocks.length === 2) {
  
      // Stop Clicking Function
        stopClicking();
    
      // Check Matched Block Function
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    
    }
}
 // Stop Clicking Function
    function stopClicking() {
    
      // Add Class No Clicking on Main Container
        blocksContainer.classList.add('no-clicking');
    
        // Wait Duration
        setTimeout(() => {
        
          // Remove Class No Clicking After The Duration
            blocksContainer.classList.remove('no-clicking');
        
        }, duration);

}
let counter=0;
  // Check Matched Block
    let triesElement = document.querySelector('.tries span');
    function checkMatchedBlocks(firstBlock, secondBlock) {
      
    //   let triesElement = document.querySelector('.tries span');
    
        if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    
          firstBlock.classList.remove('is-flipped');
          secondBlock.classList.remove('is-flipped');
      
          firstBlock.classList.add('has-match');
          secondBlock.classList.add('has-match');
          counter++;
          if(counter !==10){
            document.getElementById('success').play();
          }
          
    
        } else {
    
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    
        setTimeout(() => {
    
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
    
        }, duration);
        document.getElementById('fail').play();
        

    }
    if(triesElement.innerHTML ==20){
        document.getElementById('abn').play();  
        Swal.fire({
            title: "  ماانت دماغك وروحك مش فيك ",
            imageUrl: ".//متعصب.jpeg",
            imageHeight: 200,
            imageWidth:300,
            imageAlt: "A tall image",
            showDenyButton: true,
            confirmButtonText: "العب تاني ",
            denyButtonText: `طيبه كدا `
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                console.log(true);
                triesElement.innerHTML = 0;
                blocks.forEach((e)=>{
                    e.classList.remove('has-match');
                    console.log(e);
                })
            } else if (result.isDenied) {
                location.reload();
            }
        });
    }
    
      if(counter==10){
        document.getElementById('w').play();  
        Swal.fire({
          imageUrl: ".//عبدالغفور .jpg",
          imageHeight: 200,
          imageWidth:300,
          imageAlt: "A tall image",
          showDenyButton: true,
          confirmButtonText: "العب تاني ",
            denyButtonText: `طيبه كدا `
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                triesElement.innerHTML = 0;
                blocks.forEach((e)=>{
                    e.classList.remove('has-match');
                })
            } else if (result.isDenied) {
                location.reload();
            }
        });
      }
  }
  
  // Shuffle Function
    function shuffle(array) {
      // Settings Vars
        let current = array.length,
            temp,
            random;
        while (current > 0) {
            // Get Random Number
            random = Math.floor(Math.random() * current);
            // Decrease Length By One
            current--;
            // [1] Save Current Element in Stash
            temp = array[current];
            // [2] Current Element = Random Element
            array[current] = array[random];
            // [3] Random Element = Get Element From Stash
            array[random] = temp;
        }
        return array;
    }
  