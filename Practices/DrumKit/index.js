var numberOfDrums = document.querySelectorAll(".drum").length;

// 이벤트 추가하기
for (var i = 0; i < numberOfDrums; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function() {
        var buttonInnerHTML = this.innerHTML;    // 버튼 내부의 문자

        makeSound(buttonInnerHTML);
        buttonAnimation(buttonInnerHTML);
    });
    document.querySelectorAll(".drum")[i].addEventListener("keydown", function(event) {
        var inputKey = event.key;

        makeSound(inputKey);
        buttonAnimation(inputKey);
    })
}

function makeSound(key) {
    switch (key) {
        case 'w':
            var audio = new Audio('./sounds/tom-1.mp3');
            break;
        case 'a':
            var audio = new Audio('./sounds/tom-2.mp3');
            break;
        case 's':
            var audio = new Audio('./sounds/tom-3.mp3');
            break;
        case 'd':
            var audio = new Audio('./sounds/tom-4.mp3');
            break;
        case 'j':
            var audio = new Audio('./sounds/snare.mp3');
            break;
        case 'k':
            var audio = new Audio('./sounds/crash.mp3');
            break;
        case 'l':
            var audio = new Audio('./sounds/kick-bass.mp3');
            break;
        default:
            console.log(inputKey)
    }
    audio.play();
}

function buttonAnimation(currentKey) {
    var activeButton = document.querySelector('.' + currentKey);
    activeButton.classList.add("pressed");   // 클래스 추가

    setTimeout(function() {
        activeButton.classList.remove("pressed");
    }, 100);    // 0.1초 후 클래스 제거
}