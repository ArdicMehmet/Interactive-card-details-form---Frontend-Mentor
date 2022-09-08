//CONTAINER DOM
const FORM_CONTAINER_DOM = document.querySelector('#formContainer');
const COMPLATED_DOM = document.querySelector('#complated');

// INPUT ALL DOM
const CARD_HOLDER_NAME_INPUT_DOM = document.querySelector('#cardHolderNameInput');
const CARD_NUMBER_INPUT_DOM = document.querySelector('#cardNumberInput');
const CARD_MONTH_INPUT_DOM = document.querySelector('#monthInput');
const CARD_YEAR_INPUT_DOM = document.querySelector('#yearInput');
const CARD_CVC_INPUT_DOM = document.querySelector('#cvcInput');

const DOM_LIST = [CARD_HOLDER_NAME_INPUT_DOM, CARD_NUMBER_INPUT_DOM, CARD_MONTH_INPUT_DOM, CARD_YEAR_INPUT_DOM, CARD_CVC_INPUT_DOM]

// Card Number and card's index now
let cardNumber = [0, 0, 0, 0, " ", 0, 0, 0, 0, " ", 0, 0, 0, 0, " ", 0, 0, 0, 0];
let cardCount = 0;

// CVC and cvc's index now
let cvc = [0, 0, 0];
let cvcCount = 0;

// BUTTONS DOM
const SEND_BTN_DOM = document.querySelector('#sendBtn');
const COUNTINUE_BTN_DOM = document.querySelector('#continueButton');

//CARD TEXT ALL DOM
const CARD_HOLDER_NAME_TEXT_DOM = document.querySelector(`#${CARD_HOLDER_NAME_INPUT_DOM.getAttribute("data-text")}`);
const CARD_NUMBER_TEXT_DOM = document.querySelector(`#${CARD_NUMBER_INPUT_DOM.getAttribute("data-text")}`);
const CARD_MONTH_TEXT_DOM = document.querySelector(`#${CARD_MONTH_INPUT_DOM.getAttribute("data-text")}`);
const CARD_YEAR_TEXT_DOM = document.querySelector(`#${CARD_YEAR_INPUT_DOM.getAttribute("data-text")}`);
const CARD_CVC_TEXT_DOM = document.querySelector(`#${CARD_CVC_INPUT_DOM.getAttribute("data-text")}`);


CARD_NUMBER_TEXT_DOM.innerHTML = cardNumber.join("");

function message(domItem, message = "Dont blank") {
    domItem.innerHTML = message;
}
function clearErrorBorder(domItem) {
    domItem.classList.remove("errorBorder");
}
function addErrorBorder(domItem) {
    domItem.classList.add("errorBorder");
}

SEND_BTN_DOM.addEventListener('click', event => {
    event.preventDefault();
    let status = false;
    DOM_LIST.forEach(domItem => {
        let errorDomId = domItem.getAttribute("data-error");
        let domItemName = domItem.getAttribute("data-name");

        if (!domItem.value) {
            message(document.querySelector(`#${errorDomId}`));
            addErrorBorder(domItem);
            status = true;
        }
        else {
            message(document.querySelector(`#${errorDomId}`), "");
            clearErrorBorder(domItem);
        }
        if (domItemName !== "cardHolderName") {
            if (domItemName === "cardNumber" && domItem.value.length !== 16 && domItem.value !== "") {
                message(document.querySelector(`#${errorDomId}`), "Have to Card Number Size 16");
                addErrorBorder(domItem);
                status = true;
            }
            if ((domItemName === "cardMonth" || domItemName === "cardYear") && domItem.value.length !== 2 && domItem.value !== "") {
                message(document.querySelector(`#${errorDomId}`), "Have to Month and Year Size 2");
                addErrorBorder(domItem);
                status = true;
            }
            if (domItemName === "cardCvc" && domItem.value.length !== 3 && domItem.value !== "") {
                message(document.querySelector(`#${errorDomId}`), "Have to Card Cvc Size 3");
                addErrorBorder(domItem);
                status = true;
            }

            if (!Number(domItem.value) && domItem.value !== "") {
                message(document.querySelector(`#${errorDomId}`), "Please Enter Number");
                addErrorBorder(domItem);
                status = true;
            }
        }
    })
    if (!status) {
        COMPLATED_DOM.classList.remove('fadeIn');
        FORM_CONTAINER_DOM.classList.remove('fadeUp');
        FORM_CONTAINER_DOM.classList.add('fadeIn');

        setTimeout(_ => {
            FORM_CONTAINER_DOM.style.display = "none";
            COMPLATED_DOM.style.display = "flex";
            COMPLATED_DOM.classList.add('fadeUp');

        }, 300)

    }

})
//Copy paste For HOLDER NAME
CARD_HOLDER_NAME_INPUT_DOM.addEventListener("change", _ => {

    CARD_HOLDER_NAME_TEXT_DOM.innerHTML = CARD_HOLDER_NAME_INPUT_DOM.value === "" ? "JANE APPLESEED" : CARD_HOLDER_NAME_INPUT_DOM.value;

})

CARD_HOLDER_NAME_INPUT_DOM.addEventListener("input", event => {

    if (event.inputType === "deleteContentBackward" || event.inputType === "insertFromPaste") {
        CARD_HOLDER_NAME_TEXT_DOM.innerHTML = CARD_HOLDER_NAME_INPUT_DOM.value === "" ? "JANE APPLESEED" : CARD_HOLDER_NAME_INPUT_DOM.value;
    }
    if (event.inputType === "insertText") {
        CARD_HOLDER_NAME_TEXT_DOM.innerHTML = CARD_HOLDER_NAME_INPUT_DOM.value;
    }

})

CARD_NUMBER_INPUT_DOM.addEventListener("input", event => {

    if (event.inputType === "deleteContentBackward") {
        let cardTemporary = CARD_NUMBER_INPUT_DOM.value;
        cardCount = cardTemporary.length;
        for (let index = cardCount; index < 16; index++) {
            cardNumber[(parseInt(index / 4) * 5) + (index % 4)] = 0;
        }
        CARD_NUMBER_TEXT_DOM.innerHTML = cardNumber.join("");
    }

    if (event.inputType === "insertText" || event.inputType === "insertFromPaste") {
        let cardTemporary = CARD_NUMBER_INPUT_DOM.value;
        cardCount = cardTemporary.length;
        let countAdress;
        for (let index = 0; index < 16; index++) {
            countAdress = (parseInt(index / 4) * 5) + (index % 4);
            if (index < cardCount) {
                cardNumber[countAdress] = cardTemporary[index];
            }
            else {
                cardNumber[countAdress] = 0;
            }
        }
        CARD_NUMBER_TEXT_DOM.innerHTML = cardNumber.join("");
    }
})
CARD_MONTH_INPUT_DOM.addEventListener("input", event => {
    if (event.inputType === "insertText") {
        CARD_MONTH_TEXT_DOM.innerHTML = CARD_MONTH_INPUT_DOM.value;
    }
    if (event.inputType === "deleteContentBackward" || event.inputType === "insertFromPaste") {
        CARD_MONTH_TEXT_DOM.innerHTML = CARD_MONTH_INPUT_DOM.value === "" ? "00" : CARD_MONTH_INPUT_DOM.value;

    }
})

CARD_YEAR_INPUT_DOM.addEventListener("input", event => {
    if (event.inputType === "insertText") {
        CARD_YEAR_TEXT_DOM.innerHTML = CARD_YEAR_INPUT_DOM.value;
    }
    if (event.inputType === "deleteContentBackward" || event.inputType === "insertFromPaste") {
        CARD_YEAR_TEXT_DOM.innerHTML = CARD_YEAR_INPUT_DOM.value === "" ? "00" : CARD_YEAR_INPUT_DOM.value;

    }
})

CARD_CVC_INPUT_DOM.addEventListener("input", event => {
    let cvcTemporary;
    if (event.inputType === "deleteContentBackward") {
        cvcTemporary = CARD_CVC_INPUT_DOM.value;
        cvcCount = cvcTemporary.length;
        for (let index = 0; index < cvc.length; index++) {
            if (index < cvcCount) {
                cvc[index] = cvcTemporary[index];
            }
            else {
                cvc[index] = 0;
            }

        }
        CARD_CVC_TEXT_DOM.innerHTML = cvc.join("");
    }
    if (event.inputType === "insertText" || event.inputType === "insertFromPaste") {
        cvcTemporary = CARD_CVC_INPUT_DOM.value;
        cvcCount = cvcTemporary.length;
        for (let index = 0; index < cvc.length; index++) {
            if (index < cvcCount) {
                cvc[index] = cvcTemporary[index];
            }
            else {
                cvc[index] = 0;
            }
            CARD_CVC_TEXT_DOM.innerHTML = cvc.join("");
        }
    }
})

COUNTINUE_BTN_DOM.addEventListener('click', _ => {
    FORM_CONTAINER_DOM.classList.remove('fadeIn');
    COMPLATED_DOM.classList.remove('fadeUp');
    COMPLATED_DOM.classList.add('fadeIn');
    setTimeout(_ => {
        COMPLATED_DOM.style.display = "none";
        FORM_CONTAINER_DOM.style.display = "flex";
        FORM_CONTAINER_DOM.classList.add("fadeUp");
    }, 300)
})
