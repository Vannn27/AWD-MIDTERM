var rows = 3;
var columns = 3;

var currTile;
var otherTile; // the tile that is being swapped with the current tile

var turns = 0;

  //var imgOrder= ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

var imgOrder = ["1", "9", "4", "8", "6", "2", "5", "7", "3"];

window.onload = function() {
            const coords = {x: 0, y: 0}; //initialize the x and y coordinates of the mouse
            const circles = document.querySelectorAll(".circle");
            circles.forEach(function (circle){
                circle.x = 0;
                circle.y = 0; //initialize the x and y coordinates of the circles
            });
            
            window.addEventListener("mousemove", function(e){
                coords.x = e.clientX;
                coords.y = e.clientY; //get the x and y coordinates of the mouse
            
                animatecircles();
            });

            function animatecircles(){

                let x = coords.x;
                let y = coords.y;

                circles.forEach(function (circle, index){
                    circle.style.left = coords.x -12 + "px";
                    circle.style.top = coords.y -12 + "px"; //move the circle to the x and y coordinates of the mouse
                    circle.x = x;
                    circle.y = y; //update the x and y coordinates of the circles

                    const nextCircle = circles[index + 1] || circles[0];
                    x += (nextCircle.x - circle.x) * 0.3;
                    y += (nextCircle.y - circle.y) * 0.3; //move the circles to the next circle
                    
                });
            }



    for(let r=0; r < rows; r++){
        for (let c=0; c < columns; c++){

            //<img id="0+0 src= "1.png">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString(); 
            tile.src = imgOrder.shift() + ".png";
            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart); //click image to drag
            tile.addEventListener("dragover", dragOver); //while clicking the image, you drag the mouse
            tile.addEventListener("dragenter", dragEnter); //while dragging an image onto another tile
            tile.addEventListener("dragleave", dragLeave); //dragging image leaves the image
            tile.addEventListener("drop", dragDrop); //drag an image ontoanother image, drop the image
            tile.addEventListener("dragend", dragEnd); //after drag drop, swap the two tiles
            document.getElementById("board").appendChild(tile);
        }
    }
}

function dragStart(){
    currTile = this; //this refers to the img tile being dragged
    this.style.opacity = '0.4'; //change the opacity of the tile being dragged
}

function dragOver(e){
    e.preventDefault();
    this.style.background = 'lightgreen';
}

function dragEnter(e){
    e.preventDefault();
}

function dragLeave(){
    this.style.background = '';
}

function dragDrop(){
    otherTile = this; //this refers to the img tile being dropped onto
    this.style.background = '';
}

function dragEnd(){
    this.style.opacity = '';
    if (!otherTile.src.includes("9.png")){ //if the other tile is not the blank tile
        return; //do nothing
    }
    let currCoords = currTile.id.split("-"); //ex. "0-0" -> ["0", "0"] split the id of the current tile
    let r = parseInt(currCoords[0]); //row of the current tile
    let c = parseInt(currCoords[1]); //column of the current tile

    let otherCoords = otherTile.id.split("-"); //ex. "0-0" -> ["0", "0"] split the id of the other tile
    let r2 = parseInt(otherCoords[0]); //row of the other tile
    let c2 = parseInt(otherCoords[1]); //column of the other tile

    let moveLeft = r== r2 && c2 == c-1; //if the other tile is to the left of the current tile
    let moveRight = r== r2 && c2 == c+1; //if the other tile is to the right of the current tile

    let moveUp = r== r2-1 && c2 == c; //if the other tile is above the current tile
    let moveDown = r== r2+1 && c2 == c; //if the other tile is below the current tile

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown; //if the other tile is adjacent to the current tile

    if(isAdjacent){
    let currImg = currTile.src;
    let otherImg = otherTile.src;

    currTile.src = otherImg; //swap the src of the two tiles
    otherTile.src = currImg; //swap the src of the two tiles

    turns += 1;
    document.getElementById("turns").innerText = turns;
    }
}



