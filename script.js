const defocusBackground = document.getElementById("defocus-background");
const cardQuestionContainer = document.getElementById("add-question-card");
const ioContainer = document.getElementById("io-container");
const flashcardTitle = document.getElementById("flashcard-title");
const addQuestion = document.getElementById("add-flashcard");

const saveButton = document.getElementById("save-btn");
const closeButton = document.getElementById("close-btn");
const question = document.getElementById("question");
// const answer = document.getElementById("answer");
// const errorMessage = document.getElementById("error");

// const closeBtn = document.getElementById("close-btn");

const ioButton = document.getElementById("io");
const confirm = document.getElementById("confirm");
const code = document.getElementById("code");

const play = document.getElementById("play");

var cards = [];
var current = -1;
var binded = -1;
var consumed = false;
var playing = false;

// //Add question when user clicks 'Add Flashcard' button
// addQuestion.addEventListener("click", () => {
//   addQuestionCard.style.display = "block";
// });
// //Hide Create flashcard Card
// //Submit Question

document.onmouseup = () => {
  consumed = false;
};

addQuestion.addEventListener("click", () => {
  if(consumed) return;
  consumed = true;
  defocusBackground.style.display = "block";
  cardQuestionContainer.style.display = "flex";
  flashcardTitle.innerText = "Add Flashcard";
});

saveButton.addEventListener("click", () => {
  if(consumed) return;
  consumed = true;
  if(binded >= 0){
    cards[binded] = [question.value, answer.value, false];
    binded = -1;
  }else{
    cards[cards.length] = [question.value, answer.value, false];
  }
  rebuild();
  defocusBackground.style.display = "none";
  cardQuestionContainer.style.display = "none";
  question.value = "";
  answer.value = "";
});

closeButton.addEventListener("click", () => {
  if(consumed) return;
  consumed = true;
  defocusBackground.style.display = "none";
  cardQuestionContainer.style.display = "none";
  current = -1;
  binded = -1;
});

ioButton.addEventListener("click", () => {
  if(consumed) return;
  consumed = true;

  var out = "";
  for(var i = 0;i < cards.length;i++){
    out += cards[i][0] + '\n';
    out += cards[i][1] + '\n';
  }
  code.value = out;

  defocusBackground.style.display = "block";
  ioContainer.style.display = "flex";
});

confirm.addEventListener("click", () => {
  if(consumed) return;
  consumed = true;

  cards = [];
  for(var i = 0;i < code.value.length;){
    var a = "";
    var b = "";
    for(var j = 0;j < 2;j++){
      var current = "";
      while(i < code.value.length && code.value[i] !== '\n'){
        current += code.value[i];
        i++;
      }
      i++;
      if(j === 0){
        a = current;
      }else{
        b = current;
      }
    }
    cards[cards.length] = [a, b, false]
  }
  rebuild();

  defocusBackground.style.display = "none";
  ioContainer.style.display = "none";
});

play.addEventListener("click", () => {
  if(playing){
    defocusBackground.style.display = "none";
    playing = false;
    play.innerHTML = '<i class="fa-solid fa-play" style="font-size: 2.5em"></i>';
  }else{
    defocusBackground.style.display = "block";
    playing = true;
    play.innerHTML = '<i class="fa-solid fa-x" style="font-size: 2.5em"></i>';
  }
});

function rebuild(){
  var list = document.getElementById("card-list-container");
  list.innerHTML = '';

  for(var i = 0;i < cards.length;i++){
    var card = document.createElement('button');
    card.classList.add("card");

    card.innerHTML += '<p class="card-text">' + (cards[i][2] ? cards[i][1] : cards[i][0]) + '</p>'

    var edit = document.createElement('button');
    edit.classList.add("edit");
    edit.innerHTML = '<i class="fa-solid fa-pen-to-square" style="font-size: 3em;"></i>';
    card.appendChild(edit);

    var trash = document.createElement('button');
    trash.classList.add("delete");
    trash.innerHTML = '<i class="fa-solid fa-trash-can" style="font-size: 3em;"></i>';
    card.appendChild(trash);

    if(current === i){
      edit.style.display = "flex";
      trash.style.display = "flex";
    }

    const real = i, realEdit = edit, realTrash = trash;

    edit.addEventListener("click", () => {
      if(consumed) return;
      consumed = true;
      question.value = cards[real][0];
      answer.value = cards[real][1];
      defocusBackground.style.display = "block";
      cardQuestionContainer.style.display = "flex";
      binded = real;
      current = -1;
      flashcardTitle.innerText = "Edit Flashcard";
    });

    trash.addEventListener("click", () => {
      if(consumed) return;
      consumed = true;
      cards.splice(real, 1);
      sus();
    });

    card.addEventListener("mouseover", () => {
      realEdit.style.display = "flex";
      realTrash.style.display = "flex";
      current = real;
    });
    card.addEventListener("mouseout", () => {
      realEdit.style.display = "none";
      realTrash.style.display = "none";
      current = -1;
    });
    card.addEventListener("click", () => {
      if(consumed) return;
      consumed = true;
      cards[real][2] = !cards[real][2];
      sus();
    });

    list.appendChild(card);
  }
}

function sus(){
  rebuild();
}