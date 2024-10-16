const initialQuestions = [
  {
    label: "Friendliness",
    rating: 0
  },
  {
    label: "Cleanliness",
    rating: 0
  },
  {
    label: "Food",
    rating: 0
  }
];

const questions = JSON.parse(localStorage.getItem("storeQuestions")) || initialQuestions;
console.log(questions, ' questions');

const makeStarRating = (question) => {
  const container = document.createElement('div');
  const label = document.createElement('label');
  label.textContent = question.label;
  container.appendChild(label);
  container.appendChild(makeStars(5, question));
  return container;
}

const makeStars = (maxValue, question) => {
  const starContainer = document.createElement('div');

  for (let starPosition = 1; starPosition <= maxValue; starPosition++) {
    const starElement = document.createElement('span');
    starContainer.appendChild(starElement);
    if(starPosition <= question.rating) {
      starElement.classList.add('filled');
    } else {
      starElement.classList.add('empty');
    }

    starElement.onclick = () => {
      for(let index = 0; index < maxValue; index++) {
        if(index < starPosition) {
          starContainer.children[index].classList.add('filled');
        } else {
          starContainer.children[index].classList.remove('filled');
          starContainer.children[index].classList.add('empty');
        }
      }
      question.rating = starPosition;
      localStorage.setItem("storeQuestions", JSON.stringify(questions));
    }
  }
  return starContainer;
}


const ratingElement = document.getElementById("ratings");

questions.forEach(question => {
  ratingElement.appendChild(makeStarRating(question));
})
