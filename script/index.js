
//board
var board;
var ctx;
board = document.getElementById("board");
board.height = 399;
board.width = 964;
ctx = board.getContext("2d"); //used for drawing on the board

//currIndex
let playerCharacterIndex = 0;
let hoverIndex = 0;
let gameMapIndex = 0;

//every individual image
const img = new Image();
const map = new Image();

//dialog
let currdial = "tempat apa ini?";
let dialogindex = 0;
let dialogDisplay = true;

//import array
import {
    dialog,
    playerCharacter,
    gameMap,
    hover
} from './array.js';

//import Object
import {
    rectArea
} from './Object.js'

//browser load
window.onload = function() {

    // update();
    setInterval(update, 1000/10); //100 milliseconds

    // Tambahkan event listener mousemove
    board.addEventListener('mousemove',
        function(event) {
            const x = event.clientX - board.offsetLeft;
            const y = event.clientY - board.offsetTop;

            // Periksa apakah mouse berada di atas board
            if (x >= 199 && x <= 199+rectArea.width && y >= 206 && y <= 206+rectArea.width) {
                // Lakukan aksi hover
                hoverIndex = 1;
                return;
            } else if (x >= 287 && x <= 287+rectArea.width && y >= 170 && y <= 170+rectArea.width) {
                // Lakukan aksi hover
                hoverIndex = 1;
                return;
            } else {
                // Lakukan aksi non-hover
                hoverIndex = 0;
                return;
            }
        });

    // Tambahkan event listener untuk klik mouse
    board.addEventListener('click',
        function(event) {
            console.log(rectArea.width)
            const x = event.clientX;
            const y = event.clientY;

            // Periksa apakah koordinat mouse berada dalam area persegi panjang dialog
            if (x >= 0 && x <= 0 + board.width && y >= board.height /2 && y <= board.height) {
                if (dialogindex == 3 || !dialogDisplay) {
                    dialogDisplay = false;
                    return;
                } else {
                    currdial = dialog[dialogindex]
                    dialogindex++;
                    playerCharacterIndex++;
                    return;
                }
            }
            // Periksa apakah koordinat mouse berada dalam area tombol persegi
            if (x >= 287 && x <= 287+rectArea.width && y >= 170 && y <= 170+rectArea.width && !dialogDisplay && gameMapIndex == 0) {
                gameMapIndex = 1;
                return;
            }
            if (x >= 0 && x <= rectArea.width && y >= 0 && y <= rectArea.width && !dialogDisplay && gameMapIndex == 1) {
                gameMapIndex = 0;
                return;
            }
        });
}

function update() {
    ctx.clearRect(0,
        0,
        board.width,
        board.height);

    // map background
    map.src = gameMap[gameMapIndex];
    ctx.drawImage(map,
        0,
        0,
        board.width,
        board.height);

    // back button
    if (!dialogDisplay && gameMapIndex == 1) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(0,
            0,
            rectArea.width,
            rectArea.width);
    }

    //interact button
    if (!dialogDisplay && gameMapIndex == 0) {

        ctx.fillStyle = hover[hoverIndex];
        ctx.fillRect(199,
            206,
            rectArea.width,
            rectArea.width);

        ctx.fillStyle = hover[hoverIndex];
        ctx.fillRect(287,
            170,
            rectArea.width,
            rectArea.width);
    }

    if (dialogDisplay) {
        //player character
        img.src = playerCharacter[playerCharacterIndex];
        ctx.drawImage(img,
            0,
            0,
            board.width/5,
            board.height/2);

        // dialog background
        ctx.fillStyle = "red";
        ctx.fillRect(0,
            board.height /2,
            board.width,
            board.height/2);

        // dialog text
        ctx.font = '24px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(currdial,
            board.width / 2,
            board.height / 2 + board.height / 4);

    }
}