// 엔지니어 비하인드 스토리
const wrapper = document.getElementById("imageWrapper");
const zone = document.getElementById("imageZone");
const images = zone.querySelectorAll(".page");
const numImages = images.length;

window.addEventListener("scroll", () => {
  const rect = wrapper.getBoundingClientRect();
  const scrollHeight = window.innerHeight * (numImages - 1);

  if (rect.top <= 0 && Math.abs(rect.top) < scrollHeight) {
    // 고정된 상태, 인덱스 계산
    const progress = Math.abs(rect.top) / scrollHeight;
    const index = Math.min(Math.floor(progress * numImages), numImages - 1);

    images.forEach((img, i) => {
      img.classList.toggle("active", i === index);
    });
  } else if (Math.abs(rect.top) >= scrollHeight) {
    // 다 지나간 상태
    images.forEach((img, i) => {
      img.classList.toggle("active", i === numImages - 1);
    });
  } else {
    // 아직 진입 전
    images.forEach((img) => img.classList.remove("active"));
  }
});

// 모달창 plugin
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".modal-frame");
  const overlay = document.querySelector(".modal-overlay");
  const closeButtons = document.querySelectorAll(".close");
  const openButtons = document.querySelectorAll(".open");

  // 애니메이션 종료 후 state-leave 클래스 제거
  modal.addEventListener("animationend", function (e) {
    if (modal.classList.contains("state-leave")) {
      modal.classList.remove("state-leave");
    }
  });

  // 모달 닫기
  closeButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      overlay.classList.remove("state-show");
      modal.classList.remove("state-appear");
      modal.classList.add("state-leave");
    });
  });

  // 모달 열기
  openButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      overlay.classList.add("state-show");
      modal.classList.remove("state-leave");
      modal.classList.add("state-appear");
    });
  });
});

// 아코디언 active 효과

const topAccodianBox = document.querySelectorAll(`.top .feature_list`);

const bottomAccodianBox = document.querySelectorAll(`.bottom .feature_list`);

for (let topBoxSelect of topAccodianBox) {
  topBoxSelect.addEventListener(`mouseenter`, function () {
    this.classList.add(`active`);

    for (let topSiblings of topAccodianBox) {
      if (topSiblings != this) {
        topSiblings.classList.remove(`active`);
      }
    }
  });
}
for (let bottomBoxSelect of bottomAccodianBox) {
  bottomBoxSelect.addEventListener(`mouseenter`, function () {
    this.classList.add(`active`);

    for (let bottomSiblings of bottomAccodianBox) {
      if (bottomSiblings != this) {
        bottomSiblings.classList.remove(`active`);
      }
    }
  });
}
// 스탠다드 헤드폰 슬라이드
const radios = document.querySelectorAll('input[name="standard_headphone"]');
let currentBg = null;

radios.forEach((radio) => {
  radio.addEventListener("change", () => {
    const bgWrap = document.querySelector(".standard_select_bg_wrap");
    const selected = radio.id.split("standard_headphone")[1];
    const nextBg = bgWrap.querySelector(`.standard_bg_0${selected}`);

    if (currentBg && currentBg !== nextBg) {
      currentBg.style.zIndex = 1;
    }

    // 새로운 배경 위로 올림
    nextBg.style.zIndex = 9;
    nextBg.style.animation = "none"; // 초기화
    nextBg.offsetHeight; // reflow 강제
    nextBg.style.animation = "slideDown 0.8s ease forwards";

    currentBg = nextBg;
  });
});

// color banner text animation
gsap.registerPlugin(ScrollTrigger);

// pin 처리
ScrollTrigger.create({
  trigger: ".pin-container",
  start: "top top",
  end: "bottom bottom",
  pin: ".pin-inner",
  scrub: true,
});

// 줄마다 색상 채우기
const lines = document.querySelectorAll(".text_line");

lines.forEach((line, i) => {
  gsap.fromTo(
    line,
    { backgroundSize: "0% 100%" },
    {
      backgroundSize: "100% 100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".pin-container",
        start: `top+=${300 + i * 150} top`,
        end: `top+=${1000 + i * 150} top`,
        scrub: true,
        // markers: true
      },
    }
  );
});

// 가로스크롤
const horizontal = document.querySelector("#horizontal");
const sections = gsap.utils.toArray("#horizontal > section");

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: horizontal,
    start: "top top",
    end: () => "+=" + (horizontal.offsetWidth - innerWidth),
    pin: true,
    scrub: 1,
    snap: {
      snapTo: 1 / (sections.length - 1),
      inertia: false,
      duration: { min: 0.1, max: 0.1 },
    },
    invalidateOnRefresh: true,
    anticipatePin: 1,
  },
});
// header_color 조정
// 스크롤 이벤트 offsetTop 값 활용
const headerChange = document.querySelector(`.headphone_standard_color`);

window.addEventListener(`scroll`, function () {
  const headerChangeTop = headerChange.offsetTop - 500;

  const scrollTopData = window.scrollY;
  console.log(scrollTopData);

  const header = document.querySelector(`.header_area`);

  if (scrollTopData > headerChangeTop) {
    header.classList.add(`on`);
  } else {
    header.classList.remove(`on`);
  }
});

// sub_menu(tab)
//마우스 올리면 카테고리에 맞는 탭 활성화
const submenuTab = document.querySelectorAll(`.menu_list li`);
const submenuBox = document.querySelector(`.sub_menu_box`);
const subMenus = document.querySelectorAll(`.sub_menu`);
//forEach, dataset 으로 변경해서 작성해보기
submenuTab.forEach((li) => {
  li.addEventListener(`mouseenter`, () => {
    submenuBox.classList.add(`active`);

    // 모든 서브메뉴에서 active 제거
    // 여기서 화살표함수 한줄로 적을때 중괄호 안써도 오류없음
    subMenus.forEach((tab) => tab.classList.remove(`active`));

    // 해당 탭만 active 추가
    const target = li.dataset.tab;
    const changeTab = document.getElementById(target);
    changeTab.classList.add(`active`);
  });
});

// 서브메뉴박스에서 마우스 나가면 서브메뉴박스가 없어지게 설정
submenuBox.addEventListener(`mouseleave`, function () {
  this.classList.remove(`active`);
});
