document.addEventListener("DOMContentLoaded", () => {
function displayResult(container, numbers) {
    container.innerHTML = ""; // clear previous
    numbers.forEach(num => {
      const chip = document.createElement("span");
      chip.className = "badge bg-primary me-1 mb-1";
      chip.textContent = num;
      container.appendChild(chip);
    });
  }
   function runLoop(start, end, step = 1, filter = "none") {
    const result = [];
    if (step === 0) step = 1; // avoid infinite loop

    if (start <= end && step < 0) step = Math.abs(step);
    if (start >= end && step > 0) step = -step;

    for (let i = start; (step > 0) ? i <= end : i >= end; i += step) {
      if (filter === "odd" && i % 2 === 0) continue;
      if (filter === "even" && i % 2 !== 0) continue;
      if (filter === "mul5" && i % 5 !== 0) continue;
      result.push(i);
    }
    return result;
  }
   const cards = document.querySelectorAll("#cards .card");
  cards.forEach(card => {
    const runBtn = card.querySelector("button.btn-primary");
    const resetBtn = card.querySelector("button.btn-outline-secondary");
    const resultRow = card.querySelector(".result-row");

    runBtn.addEventListener("click", () => {
        const desc = card.querySelector(".text-secondary").textContent;
         let start = parseInt(desc.match(/start\s(-?\d+)/i)[1]);
      let end = parseInt(desc.match(/end\s(-?\d+)/i)[1]);
      let stepMatch = desc.match(/step\s(-?\d+)/i);
      let step = stepMatch ? parseInt(stepMatch[1]) : 1;
      let filter = "none";
      if (/odd/i.test(desc)) filter = "odd";
      if (/even/i.test(desc)) filter = "even";
      if (/mult of 5/i.test(desc)) filter = "mul5";

      const numbers = runLoop(start, end, step, filter);
      displayResult(resultRow, numbers);
    });

    resetBtn.addEventListener("click", () => {
      resultRow.innerHTML = "";
    });
  });
 const pgRun = document.getElementById("pg-run");
  const pgReset = document.getElementById("pg-reset");
  const pgRow = document.getElementById("pg-row");

  pgRun.addEventListener("click", () => {
    const start = parseInt(document.getElementById("pg-start").value);
    const end = parseInt(document.getElementById("pg-end").value);
    const step = parseInt(document.getElementById("pg-step").value);
    const filter = document.getElementById("pg-filter").value;

    const numbers = runLoop(start, end, step, filter);
    displayResult(pgRow, numbers);
  });

  pgReset.addEventListener("click", () => {
    pgRow.innerHTML = "";
  });

});