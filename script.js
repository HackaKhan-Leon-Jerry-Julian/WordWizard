const addQuestionCard = document.getElementById("add-question-card");
const addQuestion = document.getElementById("add-flashcard");

const saveButton = document.getElementById("save-btn");
const closeButton = document.getElementById("close-btn");
const question = document.getElementById("question");
// const answer = document.getElementById("answer");
// const errorMessage = document.getElementById("error");

// const closeBtn = document.getElementById("close-btn");
// const exportBtn = document.getElementById("export");

var cards = [];

// //Add question when user clicks 'Add Flashcard' button
// addQuestion.addEventListener("click", () => {
//   addQuestionCard.style.display = "block";
// });
// //Hide Create flashcard Card
// //Submit Question

addQuestion.addEventListener("click", () => {
  addQuestionCard.style.display = "flex";
});

saveButton.addEventListener("click", () => {
  cards[cards.length] = [question.value, answer.value];
  rebuild();
  addQuestionCard.style.display = "none";
  question.value = "";
  answer.value = "";
});

closeButton.addEventListener("click", () => {
  addQuestionCard.style.display = "none";
});



// exportBtn.addEventListener(
//   "click",
//   (exportCards = () => {
//     var listCard = document.getElementsByClassName("card-list-container");
//     var div = document.createElement("div");
//     div.innerHTML += `
//     <p class="goofy-div">sus</p>`;
//     listCard[0].appendChild(div);
//   })
// );
// //Card Generate

function rebuild(){
  var list = document.getElementById("card-list-container");
  list.innerHTML = '';

  for(var i = 0;i < cards.length;i++){
    var div = document.createElement("div");
    div.innerHTML += '<p class="question-div">${questions[i]}</p>';

    list.appendChild(div);
  }
}

//   for(var i = 0;i < questoons.length;i++){
//     var div = document.createElement("div");
//     div.classList.add("card");
//     div.innerHTML += `<p class="question-div">${questions[i]}</p>`;

//     listCard[0].appendChild(div);
//     hideQuestion();
//   }
// }

  // var div = document.createElement("div");
  // div.classList.add("card");
  // //Question
  // div.innerHTML += `
  // <p class="question-div">${question.value}</p>`;
  // //Answer
  // var displayAnswer = document.createElement("p");
  // displayAnswer.classList.add("answer-div", "hide");
  // displayAnswer.innerText = answer.value;
  // //Link to show/hide answer
  // var link = document.createElement("a");
  // link.setAttribute("href", "#");
  // link.setAttribute("class", "show-hide-btn");
  // link.innerHTML = "Show/Hide";
  // link.addEventListener("click", () => {
  //   displayAnswer.classList.toggle("hide");
  // });
  // div.appendChild(link);
  // div.appendChild(displayAnswer);
  // //Edit button
  // let buttonsCon = document.createElement("div");
  // buttonsCon.classList.add("buttons-con");
  // var editButton = document.createElement("button");
  // editButton.setAttribute("class", "edit");
  // editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  // editButton.addEventListener("click", () => {
  //   editBool = true;
  //   modifyElement(editButton, true);
  //   addQuestionCard.classList.remove("hide");
  // });
  // buttonsCon.appendChild(editButton);
  // disableButtons(false);
  // //Delete Button
  // var deleteButton = document.createElement("button");
  // deleteButton.setAttribute("class", "delete");
  // deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  // deleteButton.addEventListener("click", () => {
  //   modifyElement(deleteButton);
  // });
  // buttonsCon.appendChild(deleteButton);
  // div.appendChild(buttonsCon);
  // listCard[0].appendChild(div);
  // hideQuestion();