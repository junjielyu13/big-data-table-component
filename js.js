window.addEventListener("DOMContentLoaded", function () {
  const tableContainer = document.querySelector("#table-container");
  const tdWidth = document.querySelector(
    "#scroll-table > tbody > tr > td"
  ).offsetWidth;
  let isMouseDown = false;
  let startX, startScrollLeft;
  let startY, startScrollTop;

  var mainPageHeight = window.innerHeight / 2;
  this.window.addEventListener("resize", function () {
    mainPageHeight = this.window.innerHeight / 2;
  });
  var leftArrow = document.createElement("img");
  leftArrow.src = "./img/chevron-back-outline.svg";
  leftArrow.width = "125";
  leftArrow.style.opacity = 0.1;
  leftArrow.style.position = "absolute";
  leftArrow.style.left = tableContainer.scrollLeft;
  leftArrow.style.zIndex = 2;
  leftArrow.addEventListener("click", function () {
    tableContainer.scrollLeft -= tdWidth;
    leftArrow.style.left = tableContainer.scrollLeft;
    rightArrow.style.right = -tableContainer.scrollLeft;

    if (tableContainer.scrollLeft <= 1) {
      leftArrow.style.display = "none";
    }
    rightArrow.style.display = "block";
  });
  leftArrow.addEventListener("mouseenter", function () {
    leftArrow.style.opacity = 0.2;
  });
  leftArrow.addEventListener("mouseleave", function () {
    leftArrow.style.opacity = 0.1;
  });
  var rightArrow = document.createElement("img");
  rightArrow.src = "./img/chevron-forward-outline.svg";
  rightArrow.width = "125";
  rightArrow.style.cursor = "pointer";
  rightArrow.style.opacity = 0.1;
  rightArrow.style.position = "absolute";
  rightArrow.style.right = -tableContainer.scrollLeft;
  rightArrow.style.zIndex = 2;
  rightArrow.addEventListener("click", function () {
    tableContainer.scrollLeft += tdWidth;
    leftArrow.style.left = tableContainer.scrollLeft;
    rightArrow.style.right = -tableContainer.scrollLeft;
    if (
      tableContainer.scrollWidth -
        tableContainer.offsetWidth -
        tableContainer.scrollLeft <=
      1
    ) {
      rightArrow.style.display = "none";
    }
    leftArrow.style.display = "block";
  });
  rightArrow.addEventListener("mouseenter", function () {
    rightArrow.style.opacity = 0.2;
  });
  rightArrow.addEventListener("mouseleave", function () {
    rightArrow.style.opacity = 0.1;
  });
  tableContainer.appendChild(leftArrow);
  tableContainer.appendChild(rightArrow);
  tableContainer.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    startX = e.clientX;
    // startY = e.clientY;
    startScrollLeft = tableContainer.scrollLeft;
    // startScrollTop = container.scrollTop;
  });
  tableContainer.addEventListener("mousemove", (e) => {
    if (isMouseDown) {
      const deltaX = e.clientX - startX;
      // const deltaY = e.clientY - startY;
      tableContainer.scrollLeft = startScrollLeft - deltaX;
      // container.scrollTop = startScrollTop - deltaY;
      if (tableContainer.scrollLeft <= 0) {
        leftArrow.style.display = "none";
      } else {
        leftArrow.style.display = "block";
      }
      if (
        tableContainer.scrollWidth -
          tableContainer.offsetWidth -
          tableContainer.scrollLeft <=
        0
      ) {
        rightArrow.style.display = "none";
      } else {
        rightArrow.style.display = "block";
      }
      leftArrow.style.left = tableContainer.scrollLeft;
      rightArrow.style.right = -tableContainer.scrollLeft;
    }
  });
  tableContainer.addEventListener("mouseup", () => {
    isMouseDown = false;
  });
  tableContainer.addEventListener("mouseleave", () => {
    isMouseDown = false;
  });
  const navbarHeight = document.querySelector(".navbar-brand").clientHeight;
  const scrollTable = document.querySelector("#scroll-table");
  var theader = scrollTable.querySelector("thead");
  this.window.addEventListener("scroll", function () {
    const tbodyRect = scrollTable
      .querySelector("tbody")
      .getBoundingClientRect();
    const tableTop = tableContainer.getBoundingClientRect().top;

    if (tbodyRect.top < 80) {
      leftArrow.style.top = mainPageHeight - tableTop - 125;
      rightArrow.style.top = mainPageHeight - tableTop - 125;
      if (tableContainer.scrollLeft > 0) {
        leftArrow.style.display = "block";
      } else {
        leftArrow.style.display = "none";
      }
      if (
        tableContainer.scrollWidth -
          tableContainer.offsetWidth -
          tableContainer.scrollLeft >
        0
      ) {
        rightArrow.style.display = "block";
      } else {
        rightArrow.style.display = "none";
      }

      theader.style.top = `${
        -tbodyRect.top + theader.clientHeight + navbarHeight
      }px`;
    } else {
      theader.style.top = `${0}px`;
      leftArrow.style.display = "none";
      rightArrow.style.display = "none";
    }
    if (tbodyRect.bottom < mainPageHeight * 1.33 - 125) {
      leftArrow.style.display = "none";
      rightArrow.style.display = "none";
    }
  });
});
