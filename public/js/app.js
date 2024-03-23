const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
const msgOne = document.querySelector("#message-1");
const msgTwo = document.querySelector("#message-2");

async function getData(address, btn1, btn2) {
  btn1.textContent = "Loading...";
  btn2.textContent = "";
  if (!address) {
    return (btn1.textContent = "provide some address please");
  }
  const res = await fetch(`http://localhost:3000/weather?address=${address}`);
  if (!res) {
    return (btn1.textContent = "Error failed to fetch data");
  }
  const data = await res.json();
  btn1.textContent = data.location;
  btn2.textContent = data.forecast;
}

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const address = input.value;
  getData(address, msgOne, msgTwo);
});
