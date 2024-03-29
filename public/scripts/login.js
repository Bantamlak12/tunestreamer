const form = document.querySelector('.signin-form');
const signInButton = document.querySelector('.sign-in');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// ************************************************************ //
// FUNCTIONS
// ************************************************************ //

// DISPLAY ERROR MESSAGE
const displayErrorMessage = (message, parentClassName, childClassName) => {
  let errorMessage = document.querySelector(`.${childClassName}`);
  if (!errorMessage) {
    errorMessage = document.createElement('p');
    errorMessage.classList.add(`${childClassName}`);
    parentClassName.appendChild(errorMessage);
  }
  errorMessage.textContent = message;
  errorMessage.style.visibility = 'visible';
};

// REMOVE ERROR MESSAGE
const removeErrorMessage = (childClassName) => {
  const errorMessage = document.querySelector(childClassName);
  if (errorMessage) {
    errorMessage.remove();
  }
};

// SET ERROR MESSAGE
const setError = (input) => {
  input.style.boxShadow = 'none';
  input.classList.add('error');
};

// SET SUCCESS MESSAGE
const setSuccess = (input) => {
  input.classList.remove('error');
};

// ************************************************************ //
// TOGGLE PASSWORD'S EYE ICON
// ************************************************************ //
const icon = document.querySelector('.password-toggle-icon');

icon.addEventListener('click', (e) => {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);

  icon.classList.toggle('fa-eye');
});

// ************************************************************ //
// VALIDATE USER INPUTS
// ************************************************************ //

const validateInput = (email) => {
  let isValid = true;

  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  // VALIDATE Email
  if (emailValue === '') {
    setError(emailInput);
    isValid = false;
  } else {
    setSuccess(emailInput);
  }

  // VALIDATE password
  if (passwordValue === '') {
    setError(passwordInput);
    isValid = false;
  } else {
    setSuccess(passwordInput);
  }

  return isValid;
};

emailInput.addEventListener('input', (e) => {
  e.preventDefault();
  setSuccess(emailInput);
});
passwordInput.addEventListener('input', (e) => {
  setSuccess(passwordInput);
  removeErrorMessage('.error-message');
});

// ************************************************************ //
// SEND POST REQUEST TO SIGN IN
// ************************************************************ //
signInButton.addEventListener('click', (e) => {
  e.preventDefault();

  if (validateInput()) {
    const formData = new FormData(form);
    let userCredentials = {};

    for (const [key, value] of formData) {
      userCredentials[key] = value;
    }

    // Send sign in credentials to backend
    fetch('/auth/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          // Extract error message
          message = 'Email or Password is incorect.';
          parentClass = document.querySelector('.input-passwd');
          childClass = 'error-message';
          displayErrorMessage(message, parentClass, childClass);
        } else if (!data.isAdmin) {
          window.location.href = '/my-musics';
        } else if (data.isAdmin) {
          window.location.href = '/admin/musics';
        }
      });
  }
});
