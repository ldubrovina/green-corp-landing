const INCREASE_NUMBER_ANIMATION_SPEED = 50;
let animation_inited = false;

function increaseNumberAnimationStep(i, element, endNumber) {
    if (i <= endNumber) {
        if (i === endNumber) {
            element.innerText = i + "+";
        } else {
            element.innerText = i;
        }
    }
    i += 100;

    setTimeout(increaseNumberAnimationStep, INCREASE_NUMBER_ANIMATION_SPEED, i, element, endNumber);
}

function initIncreaseNumberAnimation() {
    let element = document.querySelector(".features__clients-count");
    increaseNumberAnimationStep(0, element, 5000);
}

function updateScroll() {
    let headerClassList = document.querySelector("header").classList;
    if (window.scrollY > 0) {
        headerClassList.add("header__scrolled");
    } else {
        headerClassList.remove("header__scrolled");
    }

    let countElementTopPosition = document.querySelector(".features__clients-count").offsetTop;
    let windowBottomPosition = window.scrollY + window.innerHeight;
    if (windowBottomPosition >= countElementTopPosition && animation_inited === false) {
        initIncreaseNumberAnimation();
        animation_inited = true
    }
}

function onLinkClick(event) {
    event.preventDefault();
    document.querySelector(event.target.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
    });
}

function addSmoothScroll(anchor) {
    anchor.addEventListener("click", onLinkClick)
}

document.querySelector("#budget").addEventListener("change", function handleSelectChange(event) {
    const otherInput = document.querySelector(".form__other-input");

    if (event.target.value === "other") {
        const formContainer = document.createElement("div");
        formContainer.classList.add("form__group", "form__other-input");

        const input = document.createElement("input");
        input.placeholder = "Введите ваш вариант";
        input.type = "text";

        formContainer.appendChild(input);

        document.querySelector("#form form").insertBefore(formContainer,
            document.querySelector(".form_submit"));
    } else if (Boolean(otherInput)) {
        document.querySelector("#form form").removeChild(otherInput);
    }
})

window.addEventListener("scroll", updateScroll);
updateScroll();

document.querySelectorAll("a[href^='#']").forEach(anchor => {
    addSmoothScroll(anchor);
})
addSmoothScroll(document.querySelector(".more-button"));
