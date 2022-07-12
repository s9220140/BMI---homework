// dom
const list = document.querySelector(".user-data");
const count = document.querySelector(".result");
const result2 = document.querySelector(".result2");
const stateText = document.querySelector(".state");
const returnBtn = document.querySelector(".return");
const inputGroup = document.querySelectorAll("input");
const clearBtn = document.querySelector(".clearBtn");
let data = JSON.parse(localStorage.getItem("bmiData")) || [];

// 監聽更新
count.addEventListener("click", addData);
list.addEventListener("click", deleteData);
returnBtn.addEventListener("click", resetBtn);
clearBtn.addEventListener("click", clearData);
updateList(data);

inputGroup.forEach((item) => {
  item.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      addData(e);
      item.blur();
    }
  });
});

function addData(e) {
  e.preventDefault();
  let heightNum = Number(document.querySelector(".height").value);
  let weightNum = Number(document.querySelector(".weight").value);
  if (!heightNum || !weightNum) return;
  let meterHeight = heightNum / 100;
  let BMI = (weightNum / Math.pow(meterHeight, 2)).toFixed(2);
  let day = new Date();
  let fullDay = {
    year: day.getFullYear(),
    month: day.getMonth() + 1,
    date: day.getDate(),
  };
  let userData = {
    height: heightNum,
    weight: weightNum,
    bmi: BMI,
    fullTime: `${fullDay.month}-${fullDay.date}-${fullDay.year}`,
    status: bmiStatus(BMI),
  };
  data.push(userData);
  updateList(data);
  localStorage.setItem("bmiData", JSON.stringify(data));
  document.querySelector("form").reset();
  // 隱藏按鈕
  count.style.display = "none";
  showBtn(data);
}

function showBtn(items) {
  result2.style.display = "flex";
  stateText.style.display = "block";
  let num = document.querySelector(".resultNum");
  for (let i = 0; i < items.length; i++) {
    result2.style.color = items[i].status.color;
    result2.style.borderColor = items[i].status.color;
    returnBtn.style.backgroundColor = items[i].status.color;
    stateText.style.color = items[i].status.color;
    num.textContent = items[i].bmi;
  }
}

function updateList(items) {
  str = "";
  let len = items.length;
  for (let i = 0; i < len; i++) {
    str += `<li style="border-left: 7px solid ${items[i].status.color}">                           
    <p><a href="#" class="delete fas fa-trash" data-index="${i}"></a>${items[i].status.state}</p>
    <p><span>BMI</span>${items[i].bmi}</p>
    <p><span>weight</span>${items[i].weight}kg</p>
    <p><span>height</span>${items[i].height}cm</p>
    <p>${items[i].fullTime}</p>
    </li>`;
  }
  list.innerHTML = str;
}

function deleteData(e) {
  e.preventDefault();
  if (e.target.nodeName !== "A") return;
  let index = e.target.dataset.index;
  data.splice(index, 1);
  localStorage.setItem("bmiData", JSON.stringify(data));
  updateList(data);
}

function bmiStatus(bmi) {
  let bmistatus = {};
  if (bmi < 18.5) {
    bmistatus.state = "體重過輕";
    bmistatus.color = "#31BAF9";
  } else if (bmi >= 18.5 && bmi < 24) {
    bmistatus.state = "正常範圍";
    bmistatus.color = "#86D73F";
  } else if (bmi >= 24 && bmi < 27) {
    bmistatus.state = "過重";
    bmistatus.color = "#FF982D";
  } else if (bmi >= 27 && bmi < 30) {
    bmistatus.state = "輕度肥胖";
    bmistatus.color = "#FF6C02";
  } else if (bmi >= 30 && bmi < 35) {
    bmistatus.state = "中度肥胖";
    bmistatus.color = "#FF6C02";
  } else {
    bmistatus.state = "重度肥胖";
    bmistatus.color = "#FF1200";
  }
  return bmistatus;
}

function resetBtn() {
  result2.style.display = "none";
  stateText.style.display = "none";
  count.style.display = "flex";
}

function clearData() {
  let len = data.length;
  data.splice(0, len);
  localStorage.setItem("bmiData", JSON.stringify(data));
  updateList(data);
}
