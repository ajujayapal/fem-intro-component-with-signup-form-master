const button = document.querySelector("#btn-trial");
const textFields = document.querySelectorAll(".field input");
const emailField = document.querySelector("#email");
const tosLink = document.querySelector(".tos > span > span");
const terms = document.querySelector("#terms");
const backButton = document.querySelector(".back-link");
const trialMessage = document.querySelector(".trial-message");

backButton.addEventListener("click", () => terms.classList.remove("slide"));

tosLink.addEventListener("click", () => {
  terms.classList.add("slide");
  terms.scrollTop = 0;
});

button.addEventListener("click", handleclick);

for (let i = 0; i < textFields.length; i++) {
  // Remove any error message when user starts typing
  textFields[i].addEventListener("input", () => {
    hideError(textFields[i]);
  });

  //Remove .quake classname from error message and icon once animation ends
  getErrorMessageElement(textFields[i]).addEventListener("animationend", () => {
    getErrorMessageElement(textFields[i]).classList.remove("quake");
  });

  getErrorIconElement(textFields[i]).addEventListener("animationend", () => {
    getErrorIconElement(textFields[i]).classList.remove("quake");
  });
}

function handleclick(e) {
  e.preventDefault();
  let isError = 0;

  for (let i = 0; i < textFields.length; i++) {
    if (textFields[i].value == "") {
      showError(textFields[i]);
      isError = 1;
    } else {
      hideError(textFields[i]);
    }

    if (!isValidEmail()) {
      showError(emailField);
      isError = 1;
    }
  }

  if (!isError) {
    successful();
  }
}

function showError(eleTextField) {
  eleTextField.placeholder = "";
  eleTextField.parentElement.querySelector(".error-message").style.display =
    "block";
  eleTextField.parentElement.querySelector(".error-icon").style.display =
    "block";
  getErrorMessageElement(eleTextField).classList.add("quake");
  getErrorIconElement(eleTextField).classList.add("quake");
}

function hideError(eleTextField) {
  eleTextField.parentElement.querySelector(".error-message").style.display =
    "none";
  eleTextField.parentElement.querySelector(".error-icon").style.display =
    "none";
  getErrorMessageElement(eleTextField).classList.remove("quake");
  getErrorIconElement(eleTextField).classList.remove("quake");
}

function getErrorMessageElement(eleTextField) {
  return eleTextField.parentElement.querySelector(".error-message");
}

function getErrorIconElement(eleTextField) {
  return eleTextField.parentElement.querySelector(".error-icon");
}

function isValidEmail() {
  const email = emailField.value;
  const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!pattern.test(email)) {
    return false;
  }
  return true;
}

function clear() {
  for (let i = 0; i < textFields.length; i++) {
    textFields[i].value = "";
  }
}

function successful() {
  clear();
  trialMessage.innerHTML = "Thank you!";
  trialMessage.style.backgroundColor = "hsl(154, 59%, 51%)";
}
