
var height = 6; // number of guesses
var width = 5; //length of the word


var row = 0; //current guess
var col = 0; //current letter of guess

var gameOver = false;
var word = 'GEOFF';

window.onload = function (){
    initialize();
}

function initialize() {

 // create the game board
 for (let r = 0; r < height; r++) {
     for (let c = 0; c < width; c++) {
         // <span></span>
         let tile = document.createElement("span");
          // <span id = "0-0"></span>
         tile.id = r.toString() + "-" + c.toString();
          // <span id = "0-0" class="tile"></span>
         tile.classList.add("tile");
         tile.innerText = "";
         document.getElementById("board").appendChild(tile);
     }
 }



 /*handles typing */
 document.addEventListener("keyup", (e) => {
    if(gameOver) return;
    // alert(e.code[0]); K
    // alert(e.code[1]); e
    // alert(e.code[2]); y
    // alert(e.code[3]); 
    
    //insert letter and move along
    if("KeyA" <= e.code && e.code <= "KeyZ"){
        if(col < width){
            let currTile = document.getElementById(row.toString() + "-" + col.toString());
            if(currTile.innerText == "") {
                currTile.innerText = e.code[3];
                col += 1;

            }
        }
    } // allow deleting letter and go back
    else if (e.code == "Backspace") {
        if (0 < col && col <= width){
            col -= 1;
            let currTile = document.getElementById(row.toString() + "-" + col.toString());
            currTile.innerText = "";           
        }

    }
    //check if right
    else if (col == 5 && e.code == "Enter") {
        update();
        row += 1;
        col = 0;
    }
    else {
        return;
    }

    //check if gameover
    if(!gameOver && row == height) {
        gameOver = true;
        document.getElementById("answer").innerText = ("The Answer was " + word);
    }
 }
  )

/* Using the buttons */
 const keys = document.querySelectorAll(".keyboard-row button");
  for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({ target }) => {
      const letter = target.getAttribute("data-key").toUpperCase();;
      if("keyA" <= "key" + letter && "key" + letter <= "keyZ"){

        if(col < width){
            let currTile = document.getElementById(row.toString() + "-" + col.toString());
            if(currTile.innerText == "") {
                currTile.innerText = letter;
                col += 1;

            }
        }
    }
      else if (col == 5 && letter === "ENTER") {
        update();
        row += 1;
        col = 0;
        return;
      }
      else if (letter === "DEL") {
        if (0 < col && col <= width){
            col -= 1;
            let currTile = document.getElementById(row.toString() + "-" + col.toString());
            currTile.innerText = "";           
        }
        return;
      }
      else {return;}

      if(!gameOver && row == height) {
        gameOver = true;
        document.getElementById("answer").innerText = ("The Answer was " + word);
    }
    }
};

}



function update() {
    let correct = 0;
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        //Is it in the correct position?
        if (word[c] == letter) {
            currTile.classList.add("correct");
            correct += 1;
        } // Is it in the word?
        else if (word.includes(letter)) {
            currTile.classList.add("present");
        } // Not in the word
        else {
            currTile.classList.add("absent");
        }

        if (correct == width) {
            gameOver = true;
        }

    }
}
