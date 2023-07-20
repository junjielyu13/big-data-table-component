window.addEventListener("DOMContentLoaded", function () {
  const table = document.getElementById("scroll-table");
  const container = document.getElementById("table-container");

  let isMouseDown = false;
  let startX, startY, startScrollLeft, startScrollTop;

  container.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    startX = e.clientX;
    // startY = e.clientY;
    startScrollLeft = container.scrollLeft;
    // startScrollTop = container.scrollTop;
  });

  container.addEventListener("mousemove", (e) => {
    if (isMouseDown) {
      const deltaX = e.clientX - startX;
      // const deltaY = e.clientY - startY;
      container.scrollLeft = startScrollLeft - deltaX;
      // container.scrollTop = startScrollTop - deltaY;
    }
  });

  container.addEventListener("mouseup", () => {
    isMouseDown = false;
  });

  container.addEventListener("mouseleave", () => {
    isMouseDown = false;
  });

  const scrollTable = document.getElementById("scroll-table");

  this.window.addEventListener("scroll", function () {
    const theader = scrollTable.querySelector("thead").clientHeight;

    const tbodyRect = scrollTable
      .querySelector("tbody")
      .getBoundingClientRect();

    if (tbodyRect.top < 60) {
      scrollTable.querySelector("thead").style.top = `${
        tbodyRect.top * -1 + theader + 60
      }px`;
    } else {
      scrollTable.querySelector("thead").style.top = `${0}px`;
    }
  });
});
