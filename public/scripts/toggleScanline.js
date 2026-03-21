const scanlineToggle = document.querySelector("button#toggle-scanline");
const body = document.querySelector("body");
const init_tv = document.querySelector("div.init_tv");

scanlineToggle.addEventListener("click", () => {
  body.classList.toggle("scanlines");
  // init_tv.classList.toggle("filter");
});
