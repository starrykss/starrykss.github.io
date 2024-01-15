function generate_dice_number() {
  var randomNumber = Math.floor(Math.random() * 6) + 1; // 1 ~ 6

  return randomNumber;
}

// 주사위 숫자 생성하기
var randomNumber1 = generate_dice_number();
var randomNumber2 = generate_dice_number();

// 주사위 숫자에 따라 주사위 이미지 바꾸기
document
  .querySelector(".img1")
  .setAttribute("src", "./images/dice" + randomNumber1 + ".png");
document
  .querySelector(".img2")
  .setAttribute("src", "./images/dice" + randomNumber2 + ".png");

// <h1> 글자 수정하기
var h1_text = document.querySelector("h1");
if (randomNumber1 < randomNumber2) {
  h1_text.textContent = "Player 2 Wins!🏆";
} else if (randomNumber1 > randomNumber2) {
  h1_text.textContent = "Player 1 Wins!🏆";
} else {
  h1_text.textContent = "Draw!🤝";
}
