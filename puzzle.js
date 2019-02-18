//indsættelse af variabler

const imageAddress = "https://i.ytimg.com/vi/wPii1LIAUGA/hqdefault.jpg";
const numOfXPieces = 4;
const numOfYPieces = 4;
let container_width;
let container_height;

//opstart af scriptet ved at trykke på knappen.
document.addEventListener("DOMContentLoaded", startTheScript);
function startTheScript() {
  document.querySelector("button").addEventListener("click", loadTheImage);
}

//Load image
function loadTheImage() {
  document.querySelector("img").src = imageAddress;
  document.querySelector("img").onload = theImageHasLoaded;
}

//When the img has been loadet, I want to know.
function theImageHasLoaded() {
  console.log("BILLEDET ER ANKOMMET");
  container_width = document.querySelector("img").width;
  container_height = document.querySelector("img").height;
  console.log(container_width, container_height);

  //Here i'm a putting height and width for the container.
  document.querySelector(
    "#container"
  ).style.gridTemplateColumns = `repeat(${numOfXPieces}, 1fr)`;
  document.querySelector("#container").style.width = `${container_width}px`;
  document.querySelector("#container").style.height = `${container_height}px`;
  for (let y = 0; y < numOfYPieces; y++) {
    for (let x = 0; x < numOfXPieces; x++) {
      //Here will i greate "piece", which is my small parts in the puzzle.
      let piece = document.createElement("div");
      piece.style.height = container_height / numOfYPieces + "px";
      piece.classList.add("piece");

      //To make the background diffrent, will I ask it to set an ID for each piece.
      piece.setAttribute("id", `${x}${y}`);

      // This is here I style my pieces.
      piece.style.backgroundImage = `url(${imageAddress})`;
      piece.style.backgroundPosition = `${y *
        (container_width / numOfYPieces)}px ${x *
        (container_height / numOfXPieces)}px`;
      piece.style.position = "absolute";
      piece.style.width = `${container_width / numOfYPieces}px`;
      piece.style.height = container_height / numOfXPieces;

      //This is where i'm asking it to pick a randome piece.
      piece.style.left = `${Math.random() * 500 + 800}px`;
      piece.style.top = `${Math.random() * 500 + 250}px`;
      piece.draggable = "true";
      document.querySelector("#container").appendChild(piece);
    }
  }

  for (let y = 0; y < numOfYPieces; y++) {
    for (let x = 0; x < numOfXPieces; x++) {
      let dropZone = document.createElement("div");
      dropZone.style.height = container_height / numOfYPieces + "px";
      dropZone.classList.add("dropZone");

      //I'm asking for an ID for the dropZone as in I also want the Id to tell me where i'm dropping.
      dropZone.setAttribute("id", `${x}${y}`);

      //This is where I will style my container / dropzone.
      dropZone.style.border = "solid black";
      document.querySelector("#container").appendChild(dropZone);
    }
  }
}
let dragged;

/* events fired on the draggable target */
document.addEventListener("drag", function(event) {});
document.addEventListener("dragstart", function(event) {
  // store a ref. on the dragged elem
  dragged = event.target;
});

/* events fired on the drop targets */
document.addEventListener("dragover", function(event) {
  // prevent default to allow drop
  event.preventDefault();
});

document.addEventListener("drop", function(event) {
  // prevent default action (open as link for some elements)
  event.preventDefault();
  console.log("DROP", event.target.className);
  // move dragged elem to the selected drop target
  if (event.target.className == "dropZone") {
    event.target.style.background = "";
    dragged.parentNode.removeChild(dragged);
    event.target.appendChild(dragged);
    dragged.style.left = event.target.style.left;
    dragged.style.top = event.target.style.top;
  } else if (event.target.className == "theBody") {
    // park the dragged elem somewhere on the body
    dragged.style.left = event.pageX + "px";
    dragged.style.top = event.pageY + "px";
  }
});
