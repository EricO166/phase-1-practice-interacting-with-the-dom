// challenge.js

document.addEventListener("DOMContentLoaded", () => {
  let counter = document.getElementById("counter");
  const plusBtn = document.getElementById("plus");
  const minusBtn = document.getElementById("minus");
  const heartBtn = document.getElementById("heart");
  const pauseBtn = document.getElementById("pause");
  const likesUl = document.querySelector(".likes");
  const commentForm = document.getElementById("comment-form");
  const commentInput = document.getElementById("comment-input");
  const commentsDiv = document.getElementById("list");

  let count = 0;
  let isPaused = false;
  let timer = setInterval(incrementCounter, 1000);
  const likes = {};

  function incrementCounter() {
    count++;
    counter.textContent = count;
  }

  function updateCounterDisplay() {
    counter.textContent = count;
  }

  plusBtn.addEventListener("click", () => {
    count++;
    updateCounterDisplay();
  });

  minusBtn.addEventListener("click", () => {
    count--;
    updateCounterDisplay();
  });

  heartBtn.addEventListener("click", () => {
    likes[count] = likes[count] ? likes[count] + 1 : 1;
    const existingLi = document.getElementById(`like-${count}`);
    if (existingLi) {
      existingLi.textContent = `${count} has been liked ${likes[count]} times`;
    } else {
      const li = document.createElement("li");
      li.id = `like-${count}`;
      li.textContent = `${count} has been liked ${likes[count]} times`;
      likesUl.appendChild(li);
    }
  });

  pauseBtn.addEventListener("click", () => {
    if (isPaused) {
      timer = setInterval(incrementCounter, 1000);
      pauseBtn.textContent = "pause";
      toggleButtonsDisabled(false);
    } else {
      clearInterval(timer);
      pauseBtn.textContent = "resume";
      toggleButtonsDisabled(true);
    }
    isPaused = !isPaused;
  });

  function toggleButtonsDisabled(disabled) {
    plusBtn.disabled = disabled;
    minusBtn.disabled = disabled;
    heartBtn.disabled = disabled;
    commentForm.querySelector("button").disabled = disabled;
  }

  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const comment = commentInput.value;
    if (comment.trim() !== "") {
      const p = document.createElement("p");
      p.textContent = comment;
      commentsDiv.appendChild(p);
      commentInput.value = "";
    }
  });
});