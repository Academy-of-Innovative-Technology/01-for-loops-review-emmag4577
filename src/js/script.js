document.addEventListener("DOMContentLoaded", () => {

  function generateNumbers(start, end, step = 1, filter = "none") {
    const numbers = [];
    if (step === 0) step = 1;
    if (start <= end) {
      for (let i = start; i <= end; i += Math.abs(step)) {
        if (filter === "odd" && i % 2 === 0) continue;
        if (filter === "even" && i % 2 !== 0) continue;
        if (filter === "mul5" && i % 5 !== 0) continue;
        numbers.push(i);
      }
    } else {
      for (let i = start; i >= end; i -= Math.abs(step)) {
        if (filter === "odd" && i % 2 === 0) continue;
        if (filter === "even" && i % 2 !== 0) continue;
        if (filter === "mul5" && i % 5 !== 0) continue;
        numbers.push(i);
      }
    }
    return numbers;
  }

  function animateNumbers(container, numbers, speed = 100) {
    container.innerHTML = "";
    numbers.forEach((num, index) => {
      setTimeout(() => {
        const chip = document.createElement("span");
        chip.className = "badge bg-primary me-1 mb-1";
        chip.textContent = num;
        container.appendChild(chip);
      }, index * speed);
    });
  }

  const cards = document.querySelectorAll("#cards .card");
  cards.forEach(card => {
    const runBtn = card.querySelector("button.btn-primary");
    const resetBtn = card.querySelector("button.btn-outline-secondary");
    const resultRow = card.querySelector(".result-row");
    const info = card.querySelector(".text-secondary").textContent;

    runBtn.addEventListener("click", () => {
      let start = parseInt(info.match(/start\s(-?\d+)/)[1]);
      let end = parseInt(info.match(/end\s(-?\d+)/)[1]);
      let step = info.includes("step") ? parseInt(info.match(/step\s(-?\d+)/)[1]) : 1;
      let filter = "none";
      if (info.includes("odd only")) filter = "odd";
      if (info.includes("even only")) filter = "even";
      if (info.includes("mult of 5")) filter = "mul5";

      const numbers = generateNumbers(start, end, step, filter);
      animateNumbers(resultRow, numbers);
    });

    resetBtn.addEventListener("click", () => {
      resultRow.innerHTML = "";
    });
  });

  const pgRun = document.getElementById("pg-run");
  const pgReset = document.getElementById("pg-reset");
  const pgRow = document.getElementById("pg-row");

  pgRun.addEventListener("click", () => {
    let start = parseInt(document.getElementById("pg-start").value);
    let end = parseInt(document.getElementById("pg-end").value);
    let step = parseInt(document.getElementById("pg-step").value);
    let filter = document.getElementById("pg-filter").value;

    const numbers = generateNumbers(start, end, step, filter);
    animateNumbers(pgRow, numbers);
  });

  pgReset.addEventListener("click", () => {
    pgRow.innerHTML = "";
  });

});
