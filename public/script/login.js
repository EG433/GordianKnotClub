const formElements = [...document.querySelector('.form').children];

formElements.forEach((item, i) => {
  setTimeout(() => {
    item.style.opacity = 1;
  }, i * 100);
});

const nameField = document.querySelector('.name') || null;
const emailField = document.querySelector('.email');
const passwordField = document.querySelector('.password');
const submitButton = document.querySelector('.submit-btn');

submitButton.addEventListener('click', async (event) => {
  event.preventDefault();
  const url = nameField ? '/register-user' : '/login';
  const data = {
    email: emailField.value,
    password: passwordField.value,
  };
  if (nameField) {
    data.name = nameField.value;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(data)
    });
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error || 'Network response was not ok');
    }
    
    alert(responseData.message);
    if (responseData.message && url === '/login') {
      window.location.href = 'userpage.html'; // Redirect to user page on successful login
    }
  } catch (error) {
    console.error('Error:', error);
    alert(error.message);
  }
});
