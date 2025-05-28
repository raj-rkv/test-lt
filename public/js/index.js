
//   nav-collapse
// document.getElementById("customMenuToggle").addEventListener("click", function () {
//     document.getElementById("customNavbarLinks").classList.toggle("active");
// });

document.addEventListener("DOMContentLoaded", function () {

    const navbarLinks = document.querySelector("#customNavbarLinks");
    const menuToggle = document.querySelector("#customMenuToggle");
    const animatedElements = document.querySelectorAll(".fading-in");


    function closeNavbarOnScroll() {
        if (navbarLinks.classList.contains("active")) {
            navbarLinks.classList.remove("active");
        }
    }

    menuToggle.addEventListener("click", function () {
        navbarLinks.classList.toggle("active");
    });


    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    animatedElements.forEach((el) => observer.observe(el));
    window.addEventListener("scroll", closeNavbarOnScroll);
});

function showTable(event, tableId) {
    event.preventDefault();
    document.querySelectorAll('.table-container').forEach(table => table.classList.remove('active'));
    document.getElementById(tableId).classList.add('active');
    document.querySelectorAll('.tab-menu button').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
}

// carousel indicators change 
document.addEventListener("DOMContentLoaded", function () {


    let carouselCnt = document.querySelectorAll(".carousel");

    carouselCnt.forEach((carousel) => {
        carousel.setAttribute('data-bs-ride', 'carousel');

    })


    let carPrevbutton = document.querySelectorAll('.carousel-control-prev-icon');
    let carNextbutton = document.querySelectorAll('  .carousel-control-next-icon');

    for (let i = 0; i < carNextbutton.length; i++) {
        carNextbutton[i].style.width = '3rem';
        carPrevbutton[i].style.width = '3rem';
        carNextbutton[i].style.height = '3rem';
        carPrevbutton[i].style.height = '3rem';
    }


    let carouselIndicatorButtons = document.querySelectorAll(".carousel-indicators button");
    let carouselIndicator = document.querySelectorAll('.carousel-indicators');

    carouselIndicator.forEach((indicator) => {

        indicator.style.backgroundColor = '#ffff';
        indicator.style.width = 'fit-content';
        indicator.classList.add('mx-auto');
        indicator.style.borderRadius = '50px';


    })
    carouselIndicatorButtons.forEach((btn) => {

        btn.style.borderTop = '5px solid transparent';
        btn.style.borderBottom = '5px solid transparent';

        btn.classList.add("rounded-circle");
        btn.classList.add("firstIndicator");
        btn.style.backgroundColor = "#333366";
        btn.style.width = "10px";
        btn.style.height = "10px";



    });


});


const planCont = document.querySelectorAll('div .layout-plan');
// For Master plan width 
let masterPlanContainer = document.getElementById(`layout_plan_${planCont.length - 1}`);
let masterPlanImgContainer = document.querySelector(`#layout_plan_${planCont.length - 1} .img-plan-cnt`);
let towerAImageContainer = document.querySelectorAll('#layout_plan_0 .img-plan-cnt');
//   let towerBImageContainer = document.querySelectorAll('#towerB-plan-cnt .img-plan-cnt');
let ImgcontainerWidth = '';
function changeMasterPlanWidth(ImgcontainerWidth) {
    masterPlanImgContainer.style.width = ImgcontainerWidth + 'px';
    masterPlanImgContainer.style.height = ImgcontainerWidth + 'px';
}
ImgcontainerWidth = towerAImageContainer[0].offsetWidth;
changeMasterPlanWidth(ImgcontainerWidth);



// Layout carousel functionality

let layoutIndex = 0;
let layoutCards = '';
let isLayoutTransitioning = false;
let layoutPlanTowerA = document.getElementById('towerA-plan-cnt');
let layoutPlanTowerB = document.getElementById('towerB-plan-cnt');
let layoutTabButtons = document.querySelectorAll('.tab-links button') ;
let defaultElment = layoutPlanTowerA;
let cInt = '';



function showLayoutSlide(element, index, smooth = true) {

    let currentPlanSlider = element.querySelector('.carousel-wrapper .carousel');

    let totalPlans = element.querySelectorAll(`#${element.id} .carousel .img-plan-cnt`).length;

    totalPlans = totalPlans / 3;


    if (isLayoutTransitioning) return;
    const visibleCards = getVisibleCards();
    // console.log(visibleCards);

    // Calculate the translation considering the cloned cards
    let translateX = -(index + totalPlans) * (100 / visibleCards);


    if (!smooth) {
        currentPlanSlider.style.transition = 'none';
    } else {
        currentPlanSlider.style.transition = 'transform 0.5s ease';
    }

    currentPlanSlider.style.transform = `translateX(${translateX}%)`;

    layoutIndex = index;

    if (smooth) {
        isLayoutTransitioning = true;
        setTimeout(() => {
            isLayoutTransitioning = false;
            if (index >= totalPlans) {
                showLayoutSlide(element, 0, false);
            } else if (index < 0) {
                showLayoutSlide(element, totalPlans - 1, false);
            }
        }, 500);
    }
}

function prevLayoutSlide(element) {
    let index =  getIndex(element) ;
    const currentTabId = "layout_plan_" + index ;
    // const currentTabId = element.id.includes('c1') ? 'towerA-plan-cnt' : 'towerB-plan-cnt';
    const currentPlanElement = document.querySelector(`#${currentTabId}`);

    if (!isLayoutTransitioning) {
        showLayoutSlide(currentPlanElement, layoutIndex - 1);
    }
}
function getIndex(element){
    let str = element.id ;
    const parts = str.split("_");
    const lastPart = parts[parts.length - 1];
    const elementIndex = parseInt(lastPart, 10);
    return elementIndex ;
}
function nextLayoutSlide(element) {
    let index =  getIndex(element) ;
    const currentTabId = "layout_plan_" + index ;
    const currentPlanElement = document.querySelector(`#${currentTabId}`);
    // console.log(element , currentTabId , currentPlanElement);
    if (!isLayoutTransitioning) {
        showLayoutSlide(currentPlanElement, layoutIndex + 1);
    }
}

function cloneLayoutSlide(ele) {
    let updatedCarousel = '';

    layoutCards = ele.querySelectorAll('.img-plan-cnt')

    updatedCarousel = ele.querySelector('.carousel');
    layoutCards.forEach(card => {
        const clone = card.cloneNode(true);
        updatedCarousel.appendChild(clone);
    });
    layoutCards.forEach(card => {
        const clone = card.cloneNode(true);
        // updatedCarousel.insertBefore(clone, updatedCarousel.firstChild);
        updatedCarousel.appendChild(clone);
    });
}

planCont.forEach((plan , index) => {
      if( index != planCont.length - 1){
        cloneLayoutSlide(plan);
      }
});


function switchTab(element) {

    document.querySelectorAll('.tab-links button').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
  
    
    let totalPlan = planCont.length ; 

    let str = element.id ;
    const parts = str.split("_");
    const lastPart = parts[parts.length - 1];
    const buttonIndex = parseInt(lastPart, 10);
    
    planCont.forEach((plan,index)=>{
          if( buttonIndex == index){
              plan.style.display = "flex";
              if( index != totalPlan - 1){
                showLayoutSlide(plan, 0, false);
                defaultElment = plan ;
                ImgcontainerWidth = plan.getElementsByClassName('img-plan-cnt')[0].offsetWidth ;
                changeMasterPlanWidth(ImgcontainerWidth);
              }
            
          }else{
            plan.style.display = "none";
          }
    });
   


    // if (element.id === "towerA-btn") {
    //     planCont[0].style.display = "flex";
    //     planCont[1].style.display = "none";
    //     planCont[2].style.display = "none";
    //     planCont[3].style.display = "none";
    //     showLayoutSlide(planCont[0], 0, false);
    //     defaultElment = planCont[0];
    //     // ImgcontainerWidth = towerAImageContainer[0].offsetWidth;
    //     //  changeMasterPlanWidth(ImgcontainerWidth) ;
    // } else if (element.id === "towerB-btn") {
    //     planCont[0].style.display = "none";
    //     planCont[1].style.display = "flex";
    //     planCont[2].style.display = "none";
    //     planCont[3].style.display = "none";
    //     showLayoutSlide(planCont[1], 0, false);

    //     defaultElment = planCont[1];
    //     // ImgcontainerWidth = towerBImageContainer[0].offsetWidth;
    //     // changeMasterPlanWidth(ImgcontainerWidth) ;
    // } else if (element.id === "towerC-btn") {
    //     planCont[0].style.display = "none";
    //     planCont[1].style.display = "none";
    //     planCont[2].style.display = "flex";
    //     planCont[3].style.display = "none";
    //     showLayoutSlide(planCont[2], 0, false);

    //     defaultElment = planCont[2];
    //     // ImgcontainerWidth = towerBImageContainer[0].offsetWidth;
    //     // changeMasterPlanWidth(ImgcontainerWidth) ;
    // } else if (element.id === "mas-plan-btn") {
    //     planCont[0].style.display = "none";
    //     planCont[1].style.display = "none";
    //     planCont[2].style.display = "none";
    //     planCont[3].style.display = "flex";
    //     changeMasterPlanWidth(ImgcontainerWidth);
    // }

}




function autoTriggerButtonClick() {
    let buttonToTrigger = defaultElment.querySelectorAll('.carousel-btn');

    nextLayoutSlide(buttonToTrigger[1]);
}

function onHoverLayoutStop(ele) {

    clearInterval(cInt);
}

function setAutomaticLayoutChange() {
    cInt = setInterval(autoTriggerButtonClick, 2500);
}

setAutomaticLayoutChange();

document.addEventListener('DOMContentLoaded', () => {
    // initializeLayoutCarousels();
    const ele = document.getElementById("layout_btn_0");
    switchTab(ele);


});

// Partners carousel functionality
// let partnersIndex = 0;
// const partnersCarousel = document.querySelector('.partners-carousel');
// const partnerCards = document.querySelectorAll('.partner-card');
// const totalPartners = partnerCards.length;
// const partnerNextBtn = document.getElementById('partner-next-btn');
// let isTransitioning = false;


function getVisibleCards() {
    if (window.innerWidth <= 576) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
}

// function cloneCards() {
//     // Clone first and last cards for smooth infinite scroll
//     partnerCards.forEach(card => {
//         const clone = card.cloneNode(true);
//         partnersCarousel.appendChild(clone);
//     });
//     partnerCards.forEach(card => {
//         const clone = card.cloneNode(true);
//         // partnersCarousel.insertBefore(clone, partnersCarousel.firstChild);
//         partnersCarousel.appendChild(clone);
//     });
// }

// function showPartners(index, smooth = true) {
//     if (isTransitioning) return;
//     const visibleCards = getVisibleCards();

//     // Calculate the translation considering the cloned cards
//     let translateX = -(index + totalPartners) * (100 / visibleCards);

//     if (!smooth) {
//         partnersCarousel.style.transition = 'none';
//     } else {
//         partnersCarousel.style.transition = 'transform 0.5s ease';
//     }

//     partnersCarousel.style.transform = `translateX(${translateX}%)`;

//     partnersIndex = index;

//     if (smooth) {
//         isTransitioning = true;
//         setTimeout(() => {
//             isTransitioning = false;

//             if (index >= totalPartners) {
//                 showPartners(0, false);
//             } else if (index < 0) {
//                 showPartners(totalPartners - 1, false);
//             }
//         }, 500);
//     }
// }

// function prevPartners() {
//     if (!isTransitioning) {
//         showPartners(partnersIndex - 1);
//     }
// }

// function nextPartners() {
//     if (!isTransitioning) {
//         showPartners(partnersIndex + 1);
//     }
// }


// automatic carousel change partners 
// setInterval(() => {
//     nextPartners();
// }, 2500)


// Initialize partners carousel
// cloneCards();
// showPartners(0, false);

// Update carousel on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // showPartners(partnersIndex, false);
        showLayoutSlide(defaultElment, layoutIndex, false);
    }, 250);
});

// Add transition end listener
// partnersCarousel.addEventListener('transitionend', () => {
//     isTransitioning = false;
// });



function validateForm() {
    const name = document.forms["PopupForm"]["name"].value.trim();
    const email = document.forms["PopupForm"]["email"].value.trim();
    const mobile = document.forms["PopupForm"]["mobile"].value.trim();
    const countryCode = document.forms["PopupForm"]["CountryCode"].value;
    const agree = document.forms["PopupForm"]["agree"].checked;

    if (name === "" || email === "" || mobile === "" || countryCode === "") {
        alert("Please fill in all required fields.");
        return false;
    }

    if (!agree) {
        alert("Please agree to receive updates.");
        return false;
    }

    const phoneRegex = /^[0-9]{6,15}$/;
    if (!phoneRegex.test(mobile)) {
        alert("Please enter a valid mobile number.");
        return false;
    }

    return true;
}

