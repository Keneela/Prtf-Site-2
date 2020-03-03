const typeWriter = function(txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

// Type method
typeWriter.prototype.type = function() {
  const current = this.wordIndex % this.words.length;
  //Get full text of current word
  const fullTxt = this.words[current];
  // Check if deleting
  if (this.isDeleting) {
    //remove character
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    //add character
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }
  //insert txt into element
  this.txtElement.innerHTML = `<span class='txt'>${this.txt}</span>`;

  //init type Speed
  let typeSpeed = 300;
  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  //Is word complete?
  if (!this.isDeleting && this.txt === fullTxt) {
    typeSpeed = this.wait; //the pause
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    //move to next word
    this.wordIndex++;
    //pause before typing
    typeSpeed = 500;
  }
  setTimeout(() => this.type(), typeSpeed);
};
// init on DOM load
document.addEventListener("DOMContentLoaded", init);

// //init app
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  //Init Typewriter
  new typeWriter(txtElement, words, wait);
}
