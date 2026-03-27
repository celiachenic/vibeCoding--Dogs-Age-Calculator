const birthdayInput = document.getElementById("birthday");
const calculateBtn = document.getElementById("calculateBtn");
const result = document.getElementById("result");

function calculateDogAge() {
  const birthdayValue = birthdayInput.value;

  if (!birthdayValue) {
    result.textContent = "請先輸入小狗生日。";
    return;
  }

  localStorage.setItem("dogBirthday", birthdayValue);

  const birthday = new Date(birthdayValue);
  const today = new Date();

  if (birthday > today) {
    result.textContent = "生日不能選未來日期。";
    return;
  }

  const diffTime = today - birthday;
  const dogAgeDays = diffTime / (1000 * 60 * 60 * 24);
  const dogAgeYears = dogAgeDays / 365.25;

  if (dogAgeYears <= 0) {
    result.textContent = "小狗年齡尚未滿 1 天，先等等再算啦。";
    return;
  }

  let humanAge;

  if (dogAgeYears < 1) {
    humanAge = dogAgeYears * 15;
  } else if (dogAgeYears < 2) {
    humanAge = 15 + (dogAgeYears - 1) * 9;
  } else {
    humanAge = 16 * Math.log(dogAgeYears) + 31;
  }

  let finalText = `小狗目前狗年齡為 ${dogAgeYears.toFixed(2)} 歲，換算為人類年齡大約為 ${humanAge.toFixed(2)} 歲。`;

  if (dogAgeYears < 2) {
    finalText += "（幼犬階段已使用較符合生長速度的估算方式）";
  }

  result.textContent = finalText;
}

calculateBtn.addEventListener("click", calculateDogAge);

const savedBirthday = localStorage.getItem("dogBirthday");
if (savedBirthday) {
  birthdayInput.value = savedBirthday;
  calculateDogAge();
}
