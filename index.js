const allButtons = document.querySelectorAll('button');
let maxLength;
let currentNum;

//set up the max length of the comic
fetch("https://xkcd.now.sh/?comic=latest")
.then(response => response.json())
.then(data =>  {
  maxLength = data.num;
  return maxLength;
})
.then(length => {
  console.log(length);
});

//This value is not update in here, but updated in the handleClicked function. Why?
//console.log below return undefined, but handleClicked return 2377.
//console.log(maxLength);

window.onload = function() {
  let paramsString = new URLSearchParams(window.location.search);
  let searchParams = new URLSearchParams(paramsString);

  //get the current comic
  const currentComic = searchParams.get('comic');
  //If the default one, reutn the latest, else, return the pathway with the number.
  if (currentComic === null) {
    paramsString = "https://xkcd.now.sh/?comic=latest";
  } else {
    paramsString = "https://xkcd.now.sh/?comic=" + currentComic;
  }
  //window.location.href = `${window.location.pathname}?${searchParams.toString()}`;


  //Load the lastest comic and display it.
  updateContent(paramsString);
}

/*
//Try to make a const hold the length of comic, not working.
function getComicLength() {
  let length;
  fetch("https://xkcd.now.sh/?comic=latest")
  .then(response => response.json())
  .then(data => {

    length = data.num;
    console.log(length);

    length = data.num;
  })
  .then(() => {
    console.log(length);
    return length;
  })
} */

//generate randon number
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


//Call the get request and update the website content
function updateContent(sampleURL) {
  fetch(sampleURL, {

  })
  .then(response => response.json())
  .then(data =>  {

    //set the variable and update the content
    let latestTitle = data.title;
    let latestImg = data.img;
    let latestAlt = data.alt;

    document.getElementsByClassName('title-content')[0].innerHTML = latestTitle;
    document.getElementById('comic-id').src = latestImg;
    document.getElementsByClassName('alt-content')[0].innerHTML = latestAlt;

    //set the current num, for the using of Next and Prev
    currentNum = data.num;
  });
}

//handler for button clicked
function handleClicked(event) {
  //console.log("currentNum is: " + currentNum);
  console.log("maxLength is: " + maxLength);
  //get the current path comic value
  let paramsString = new URLSearchParams(window.location.search);
  let searchParams = new URLSearchParams(paramsString);

  //get the current comic
  const currentComic = searchParams.get('comic');

  let content = event.innerHTML;
  if (content === "PREV") {
    //if the first one
    if (currentNum === 1) {
      alert("This is the first page of comic");
    }
    else {
      //update to prev comic
      let prevNum = parseInt(currentNum) - 1;
      let prevComic = "https://xkcd.now.sh/?comic=" + prevNum;
      updateContent(prevComic);
    }

  }
  else if(content === "NEXT") {
    //if the last one
    if (currentNum === maxLength) {
      alert("This is the last page of comic");
    }
    else {
      //update to the next comic
      let nextNum = parseInt(currentNum)+1;
      let nextComic = "https://xkcd.now.sh/?comic=" + nextNum;

      updateContent(nextComic);
    }
  }
  else {
    //generate random number from 1 - comic length.
    let maxRange = maxLength + 1;
    let randomNumber = getRandomInt(maxRange);

    //check the comic, comic minimum is one, so no 0
    if (randomNumber === 0) {
      randomNumber = 1;
    }
    //console.log(randomNumber);

    let randomURL = "https://xkcd.now.sh/?comic=" + randomNumber;
    updateContent(randomURL);

  }
}
//Add event listen to each button
let buttons = allButtons;

for(let i =0; i<buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    handleClicked(this);
  });
}
