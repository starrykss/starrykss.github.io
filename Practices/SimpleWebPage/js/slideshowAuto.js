/* 자동으로 슬라이드 이미지 전환하기 */

var slides = document.querySelectorAll("#slides > img");
var prev = document.getElementById("prev");
var next = document.getElementById("next");

var current = 0;

showSlides(current);   // 현재 이미지 표시

function showSlides(n) {
    var slides = document.querySelectorAll("#slides >img");
    for (let i = 0; i < slides.length; i++) {   // 배열의 처음부터 끝까지 반복
        slides[i].style.display = "none";    // 모든 이미지를 화면에서 감춤.
    }
    current++;    // 다음 이미지로 이동
    if (current > slides.length) {    // 마지막 이미지라면
        current = 1;     // 1번째로 이동
    }
    slides[current - 1].style.display = "block";    // 현재 위치 이미지 표시
    setTimeout(showSlides, 8000);    // 8초마다 showSlides() 함수를 반복 실행 
}