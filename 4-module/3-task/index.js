function highlight(table) {
  let row = table.tBodies[0];

  for (let i = 0; i < row.rows.length; i++) {
    if (row.rows[i].cells[3].dataset.available === "true") {
      row.rows[i].classList.add("available");
    } else {
      row.rows[i].classList.add("unavailable");
    }

    if (!row.rows[i].cells[3].hasAttribute("data-available")) {
      row.rows[i].setAttribute("hidden", "");
    }

    if (row.rows[i].cells[2].textContent === "m") {
      row.rows[i].classList.add("male");
    } 
    if (row.rows[i].cells[2].textContent === "f") {
      row.rows[i].classList.add("female");
    }

    if (parseInt(row.rows[i].cells[1].textContent) < 18) {
      row.rows[i].style.textDecoration = "line-through";
    }
  }
}
