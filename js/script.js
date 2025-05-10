document.addEventListener(`DOMContentLoaded`, function () {
  // 새로고침하면 스크롤 맨 상단으로
  window.onload = function () {
    setTimeout(function () {
      scrollTo(0, 0);
    }, 100);
  };

  // 마우스 커서
  const customCursor = document.querySelector(".custom-cursor");

  // 커서 따라다니기
  document.addEventListener("mousemove", function (e) {
    const x = e.clientX;
    const y = e.clientY;
    customCursor.style.transform = `translate(${x}px, ${y}px)`;
  });
  // 로딩 텍스트 애니메이션
  gsap.from(".col_logo svg", {
    yPercent: 100,
    duration: 1.5,
    ease: "power4.inOut",
    stagger: {
      amount: 0.5,
    },
    delay: 0.5,
  });

  gsap.to(".col_logo", {
    clipPath: "polygon(0% 0%, 100% 0%,100% 100%,0% 100%)",
    duration: 1.5,
    ease: "power4.inOut",
    stagger: {
      //   amount: 0.5,
    },
  });
  // 로딩 오버레이 클릭 시 애니메이션 종료
  const overlay = document.querySelector(".overlay");

  overlay.addEventListener("click", function () {
    gsap.to(".col_logo svg", {
      yPercent: -100,
      duration: 1.5,
      ease: "power4.inOut",
      stagger: {
        amount: 0.5,
      },
    });

    gsap.to(".col_logo", {
      clipPath: "polygon(0% 85%, 100% 85%,100% 100%,0% 100%)",
      duration: 1,
      ease: "power4.inOut",
      stagger: {
        amount: 0.5,
      },
    });

    gsap.to(".overlay", {
      clipPath: "polygon(0% 0%, 100% 0%,100% 0%,0% 0%)",
      duration: 2,
      ease: "power4.inOut",
    });

    gsap.to(".loader .load_box", {
      clipPath: "polygon(0% 100%, 100% 100%,100% 0%,0% 0%)",
      duration: 2,
      ease: "power4.inOut",
      stagger: {
        amount: 1,
      },
    });

    gsap.to(".loader", {
      clipPath: "polygon(0% 0%, 100% 0%,100% 0%,0% 0%)",
      duration: 2,
      ease: "power4.inOut",
      delay: 1,
    });
  });

  // 마우스 hover 시 커서 커지기

  document.querySelectorAll(".big_logo").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      customCursor.classList.add("bigger");
    });
    el.addEventListener("mouseleave", () => {
      customCursor.classList.remove("bigger");
    });
  });

  // 떨어지는 애니메이션
  // const Engine = Matter.Engine,
  //   World = Matter.World,
  //   Bodies = Matter.Bodies;
  // Body = Matter.Body;
  // Composite = Matter.Composite;
  // const Runner = Matter.Runner;

  // const engine = Engine.create();
  // const container = document.getElementById("container");

  // const renderer = Matter.Render.create({
  //   element: container,
  //   engine: engine,
  //   options: {
  //     width: container.offsetWidth,
  //     height: container.offsetHeight,
  //     wireframes: false,
  //     background: "#f9f9f9",
  //   },
  // });

  // const walls = [
  //   Bodies.rectangle(0 - 50, 0 - 50, 1, container.offsetHeight * 2 - 50, {
  //     isStatic: true,
  //   }),
  //   Bodies.rectangle(
  //     container.offsetWidth + 50,
  //     0 - 50,
  //     1,
  //     container.offsetHeight * 2 + 50,
  //     { isStatic: true }
  //   ),
  //   Bodies.rectangle(
  //     0 - 50,
  //     container.offsetHeight + 50,
  //     container.offsetWidth * 2 + 50,
  //     1,
  //     { isStatic: true }
  //   ),
  // ];

  // const physics = {
  //   restitution: 0.7,
  //   friction: 0.4,
  // };

  // const imageConfigs = [
  //   { path: "./image/intro_animation_01.webp", width: 340 },
  //   { path: "./image/intro_animation_02.webp", width: 380 },
  //   { path: "./image/intro_animation_03.webp", width: 340 },
  //   { path: "./image/intro_animation_04.webp", width: 340 },
  //   { path: "./image/intro_animation_05.webp", width: 380 },
  //   { path: "./image/intro_animation_06.webp", width: 380 },
  //   { path: "./image/intro_animation_07.webp", width: 380 },
  //   { path: "./image/intro_animation_08.webp", width: 340 },
  // ];

  // let allBodies = [];
  // let isAnimating = false;
  // let animationFinished = false;

  // const loadImageAndCreateBox = (imgConfig, index) => {
  //   return new Promise((resolve) => {
  //     const img = new Image();
  //     img.src = imgConfig.path;

  //     img.onload = () => {
  //       const aspectRatio = img.height / img.width;
  //       const width = imgConfig.width;
  //       const height = width * aspectRatio;

  //       const x = 150 + index * 220;
  //       const y = -300 - index * 700;

  //       const box = Bodies.rectangle(x, y, width, height, {
  //         ...physics,
  //         render: {
  //           sprite: {
  //             texture: imgConfig.path,
  //             xScale: width / img.width,
  //             yScale: height / img.height,
  //           },
  //         },
  //       });

  //       resolve(box);
  //     };

  //     img.onerror = () => {
  //       console.error("Failed to load:", imgConfig.path);
  //       resolve();
  //     };
  //   });
  // };

  // const runner = Runner.create();

  // const startAnimation = () => {
  //   if (isAnimating && animationFinished) {
  //     container.classList.add("slide-up");

  //     setTimeout(() => {
  //       allBodies.forEach((body) => {
  //         World.remove(engine.world, body);
  //       });

  //       if (renderer.canvas && renderer.canvas.parentNode) {
  //         renderer.canvas.parentNode.removeChild(renderer.canvas);
  //       }

  //       animationFinished = false;
  //       isAnimating = false;
  //     }, 700); // 슬라이드 업 시간과 일치
  //     return;
  //   }

  //   if (isAnimating) return;

  //   isAnimating = true;

  //   Promise.all(imageConfigs.map(loadImageAndCreateBox)).then((elements) => {
  //     const mouseConstraint = Matter.MouseConstraint.create(engine, {
  //       element: container,
  //       constraint: {
  //         stiffness: 0.2,
  //         render: {
  //           visible: false,
  //         },
  //       },
  //     });

  //     allBodies = [...walls, mouseConstraint, ...elements];
  //     World.add(engine.world, allBodies);

  //     Runner.run(runner, engine);
  //     Matter.Render.run(renderer);

  //     setTimeout(() => {
  //       animationFinished = true;
  //     }, 4000);
  //   });
  // };

  // const clickLogo = document.querySelector(`#container .big_logo`);
  // clickLogo.addEventListener("click", startAnimation);

  const Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;
  Body = Matter.Body;
  Composite = Matter.Composite;
  const Runner = Matter.Runner;

  const engine = Engine.create();
  const container = document.getElementById("container");

  const renderer = Matter.Render.create({
    element: container,
    engine: engine,
    options: {
      width: container.offsetWidth,
      height: container.offsetHeight,
      wireframes: false,
      background: "#f9f9f9",
    },
  });

  const walls = [
    Bodies.rectangle(0 - 50, 0 - 50, 1, container.offsetHeight * 2 - 50, {
      isStatic: true,
    }),
    Bodies.rectangle(
      container.offsetWidth + 50,
      0 - 50,
      1,
      container.offsetHeight * 2 + 50,
      { isStatic: true }
    ),
    Bodies.rectangle(
      0 - 50,
      container.offsetHeight + 50,
      container.offsetWidth * 2 + 50,
      1,
      { isStatic: true }
    ),
  ];

  const physics = {
    restitution: 0.7,
    friction: 0.4,
  };

  // 화면 너비에 따라 width 다르게 설정
  const getImageConfigs = () => {
    const isSmallScreen = window.innerWidth <= 1600;

    return [
      {
        path: "./image/intro_animation_01.webp",
        width: isSmallScreen ? 260 : 340,
      },
      {
        path: "./image/intro_animation_02.webp",
        width: isSmallScreen ? 260 : 380,
      },
      {
        path: "./image/intro_animation_03.webp",
        width: isSmallScreen ? 260 : 340,
      },
      {
        path: "./image/intro_animation_04.webp",
        width: isSmallScreen ? 260 : 340,
      },
      {
        path: "./image/intro_animation_05.webp",
        width: isSmallScreen ? 260 : 380,
      },
      {
        path: "./image/intro_animation_06.webp",
        width: isSmallScreen ? 260 : 380,
      },
      {
        path: "./image/intro_animation_07.webp",
        width: isSmallScreen ? 260 : 380,
      },
      {
        path: "./image/intro_animation_08.webp",
        width: isSmallScreen ? 260 : 340,
      },
    ];
  };

  let imageConfigs = getImageConfigs();

  let allBodies = [];
  let isAnimating = false;
  let animationFinished = false;

  const loadImageAndCreateBox = (imgConfig, index) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imgConfig.path;

      img.onload = () => {
        const aspectRatio = img.height / img.width;
        const width = imgConfig.width;
        const height = width * aspectRatio;

        const x = 150 + index * 220;
        const y = -300 - index * 700;

        const box = Bodies.rectangle(x, y, width, height, {
          ...physics,
          render: {
            sprite: {
              texture: imgConfig.path,
              xScale: width / img.width,
              yScale: height / img.height,
            },
          },
        });

        resolve(box);
      };

      img.onerror = () => {
        console.error("Failed to load:", imgConfig.path);
        resolve();
      };
    });
  };

  const runner = Runner.create();

  const startAnimation = () => {
    // 화면 크기마다 imageConfigs 다시 계산
    imageConfigs = getImageConfigs();

    if (isAnimating && animationFinished) {
      container.classList.add("slide-up");

      setTimeout(() => {
        allBodies.forEach((body) => {
          World.remove(engine.world, body);
        });

        if (renderer.canvas && renderer.canvas.parentNode) {
          renderer.canvas.parentNode.removeChild(renderer.canvas);
        }

        animationFinished = false;
        isAnimating = false;
      }, 700);
      return;
    }

    if (isAnimating) return;

    isAnimating = true;

    Promise.all(imageConfigs.map(loadImageAndCreateBox)).then((elements) => {
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        element: container,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      });

      allBodies = [...walls, mouseConstraint, ...elements];
      World.add(engine.world, allBodies);

      Runner.run(runner, engine);
      Matter.Render.run(renderer);

      setTimeout(() => {
        animationFinished = true;
      }, 4000);
    });
  };

  const clickLogo = document.querySelector(`#container .big_logo`);
  clickLogo.addEventListener("click", startAnimation);

  // 스와이퍼
  const not_active_slide_scale_value = 0.85;
  const not_active_slide_opacity_value = 0.4;

  var swiper_scale_active = new Swiper("[swiper_scale_active]", {
    slidesPerView: 2,
    parallax: true,

    // Responsive breakpoints
    breakpoints: {
      320: {
        speed: 900,
        slidesPerView: 1,
      },
      640: {
        speed: 1400,
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 1,
      },
      1220: {
        slidesPerView: 1.2,
      },
    },
    keyboard: {
      enabled: true,
    },
    centeredSlides: true,
    loop: true,
    loopedSlides: 10,
    slideToClickedSlide: true,
    spaceBetween: 0,
    grabCursor: true,
    effect: "creative",
    creativeEffect: {
      limitProgress: 2,
      prev: {
        opacity: not_active_slide_opacity_value,
        scale: not_active_slide_scale_value,
        translate: ["-90%", 0, 0],
      },
      next: {
        opacity: not_active_slide_opacity_value,
        scale: not_active_slide_scale_value,
        translate: ["90%", 0, 0],
      },
    },
  });

  console.log(swiper_scale_active);

  const prev = document.querySelector("[btn_group] [prev]");
  prev.addEventListener("click", prev_slide);

  const next = document.querySelector("[btn_group] [next]");
  next.addEventListener("click", next_slide);

  function prev_slide() {
    swiper_scale_active.slidePrev(0);
  }

  function next_slide() {
    swiper_scale_active.slideNext(0);
  }

  add_aria_for_navigation();

  function add_aria_for_navigation() {
    const this_slider = document.querySelector(
      "[swiper_scale_active] .swiper-wrapper"
    );
    const id_value = "my_swiper_scale_active"; /* use any value you want */
    this_slider.setAttribute("id", id_value);
    prev.setAttribute("aria-controls", id_value);
    next.setAttribute("aria-controls", id_value);

    prev.setAttribute("aria-label", "Previous slid");
    next.setAttribute("aria-label", "Next Slide");
  }

  // 비디오 자동 재생 및 일시정지 관리
  swiper_scale_active.on("slideChangeTransitionEnd", () => {
    // 슬라이드 전환이 끝나고 나서 비디오 상태를 업데이트
    const slides = swiper_scale_active.slides;

    slides.forEach((slide, i) => {
      const video = slide.querySelector("video");
      if (video) {
        // 현재 활성 슬라이드에서만 비디오 재생
        if (i === swiper_scale_active.activeIndex) {
          video.play().catch((err) => {
            console.warn("Autoplay blocked or failed", err);
          });
        } else {
          // 비활성 슬라이드에서는 비디오 일시정지
          video.pause();
          video.currentTime = 0; // 원하면 리셋
        }
      }
    });
  });

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

  const modal = document.querySelector(".modal-frame");
  const modalOverlay = document.querySelector(".modal-overlay");
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
      modalOverlay.classList.remove("state-show");
      modal.classList.remove("state-appear");
      modal.classList.add("state-leave");
    });
  });

  // 모달 열기
  openButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      modalOverlay.classList.add("state-show");
      modal.classList.remove("state-leave");
      modal.classList.add("state-appear");
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

  const lenis = new Lenis();

  lenis.on("scroll", (e) => {
    console.log(e);
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // header_color 조정
  // 스크롤 이벤트 offsetTop 값 활용
  const headerChange = document.querySelector(`.headphone_standard_color`);

  window.addEventListener(`scroll`, function () {
    // const headerChangeTop = headerChange.offsetTop - 500;

    const scrollTopData = window.scrollY;
    console.log(scrollTopData);

    const header = document.querySelector(`.header_area`);

    // if (scrollTopData > headerChangeTop) {
    //   header.classList.add(`on`);
    // } else {
    //   header.classList.remove(`on`);
    // }
    if (scrollTopData > 14620) {
      header.classList.add(`on`);
    } else {
      header.classList.remove(`on`);
    }
  });

  // 섹션 고정
  gsap.utils.toArray(".trigger_section_pin").forEach((panel, i) => {
    ScrollTrigger.create({
      trigger: panel,
      start: "0% 0%",
      // end: "100%, 100%",
      pin: true,
      pinSpacing: false,
      scrub: 0,
    });
  });

  var indexes = { current: 0, last: null };
  var ontracSlides = document.getElementsByClassName("ontracSlides");

  window.onload = slidePictures;

  function slidePictures() {
    if (indexes.last !== null) {
      ontracSlides[indexes.last].classList.remove("visible");
    }

    ontracSlides[indexes.current].classList.add("visible");

    indexes.last = indexes.current;
    indexes.current = (indexes.current + 1) % ontracSlides.length;

    setTimeout(slidePictures, 3000);
  }

  // sub_menu(tab)
  //마우스 올리면 카테고리에 맞는 탭 활성화
  const submenuTab = document.querySelectorAll(`.menu_list .list.mouse_tab`);
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
  subMenus.forEach((menu) => {
    menu.addEventListener(`mouseleave`, () => {
      submenuBox.classList.remove(`active`);
    });
  });

  // --------------------------------
  const menuGroupTabs = document.querySelectorAll(`.menu_group_box .category`);

  for (const menuGroupTab of menuGroupTabs) {
    menuGroupTab.addEventListener(`click`, function () {
      const currentMenu = this.querySelector(".menu_list");
      const isActive = currentMenu.classList.contains("active");

      // 모든 menu_list에서 active 제거
      menuGroupTabs.forEach((tab) => {
        tab.querySelector(".menu_list")?.classList.remove("active");
      });

      // 클릭한 탭이 기존에 비활성 상태였을 때만 active 추가 (토글 효과)
      if (!isActive) {
        currentMenu.classList.add("active");
      }

      // 탭 active 클래스도 토글
      menuGroupTabs.forEach((tab) => tab.classList.remove("active"));
      if (!isActive) {
        this.classList.add("active");
      }
    });
  }

  // 푸터 1024부터 탭으로 변경
  const footerTabs = document.querySelectorAll(`.footer_inner .category`);

  for (const footerTab of footerTabs) {
    footerTab.addEventListener(`click`, function () {
      const currentMenu = this.querySelector(".menu_list");
      const isActive = currentMenu.classList.contains("active");

      // 모든 menu_list에서 active 제거
      footerTabs.forEach((tab) => {
        tab.querySelector(".menu_list")?.classList.remove("active");
      });

      // 클릭한 탭이 기존에 비활성 상태였을 때만 active 추가 (토글 효과)
      if (!isActive) {
        currentMenu.classList.add("active");
      }

      // 탭 active 클래스도 토글
      footerTabs.forEach((tab) => tab.classList.remove("active"));
      if (!isActive) {
        this.classList.add("active");
      }
    });
  }

  const menuHamburger = document.querySelector(`.header_area .hamburger`);
  const HamburgerBox = document.getElementById(`tab8`);

  menuHamburger.addEventListener(`click`, function () {
    HamburgerBox.classList.toggle(`active`);
    submenuBox.classList.toggle(`active`);
  });
  const menuSearch = document.querySelector(`.header_area .icon.mouse_tab`);
  const SearchBox = document.getElementById(`tab7`);

  menuSearch.addEventListener(`click`, function () {
    SearchBox.classList.toggle(`active`);
    submenuBox.classList.toggle(`active`);
  });
}); /* end */
