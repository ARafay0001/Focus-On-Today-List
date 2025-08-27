const inputFields = document.querySelectorAll("input");
const goalContainer = document.querySelectorAll(".goal-container");
const error = document.querySelectorAll(".error")[0];
const progress = document.getElementById("progress");
const progressTwo  =  document.getElementById("progress2");
progressTwo.textContent = `0 / ${goalContainer.length}Completed`;

const data = JSON.parse(window.localStorage.getItem("storage")) || { first : 
{value: "", complete: false} , second : {value: "", complete: false} , third : {value: "", complete: false}};

let checkCount = 0
// console.log(noOfCheck)
goalContainer.forEach((goal) => {

  const goals = goal.childNodes[1];
  const goalid = goals.nextElementSibling.id;
  // console.log(data[goalid].complete)
  if (data[goalid].complete) {
     goal.classList.add("complete")
     checkCount ++
  }
  goal.addEventListener("click", (e) => {
    const inputs = [...inputFields];
    const isTure = inputs.every((e) => {
      return e.value !== "";
    });
    if (isTure) {
      if (e.target.closest(".check")) {
        goal.classList.toggle("complete");
        const goals = [...goalContainer];
        const gaolCompleteArray = goals.filter((goal) => {
          return goal.classList.contains("complete");
        });
        const goalCount = gaolCompleteArray.length;
        // console.log(goalCount);
        const compliment = document.querySelectorAll(".bar-label")[0];
        if (goalCount === 1) {
          compliment.textContent =
            "Great start! You finished your first goal 🎉";
        } else if (goalCount === 2) {
          compliment.textContent = "Awesome! Two goals down 💪";
        } else if (goalCount === 3) {
          compliment.textContent = "Fantastic! Three goals completed 🚀";
        } else {
          compliment.textContent = "Raise the bar by completing your goals! ✔";
        }

        const currentGoalContainer =
          document.querySelectorAll(".goal-container");
        const goalContainerCount = currentGoalContainer.length;
        progress.style.width = `${(goalCount / goalContainerCount) * 100}%`;
        progressTwo.textContent = `${goalCount} / ${goalContainerCount} Completed`;
        const checkId = goal.childNodes[3].id
        console.log(checkId);
        if (data[checkId].complete == true) {
          data[checkId].complete = false
        } else (
          data[checkId].complete = true
        )
        window.localStorage.setItem("storage", JSON.stringify(data))
        // console.log(data[checkId])

      }
    } else if (e.target.closest(".check")) {
      error.classList.remove("disable");
      return;
    }
  });
});
progress.style.width = `${(checkCount / goalContainer.length) * 100}%`;
progressTwo.textContent = `${checkCount} / ${goalContainer.length} Completed`;

inputFields.forEach((input) => {
    input.value = data[input.id]?.value || "";
    input.addEventListener("focus", (e) => {
    error.classList.add("disable");
  });
  input.addEventListener("input", (e) => {
    const inputId = e.target.id
   data[inputId] = {
    value : e.target.value, 
    complete : false,
   }
   window.localStorage.setItem("storage", JSON.stringify(data))

  })
});