const studentName = 'Meliza Gabinete';
const age = 20;
const course = 'BS in Computer Science';

console.log('Student Name:', studentName);
console.log('Age:', age);
console.log('Course:', course);

for (let number = 1; number <= 10; number += 1) {
  console.log(number);
}

let countdown = 5;
while (countdown >= 1) {
  console.log(countdown);
  countdown -= 1;
}

const ageMessage = age >= 18
  ? 'The student is at least 18 years old.'
  : 'The student is under 18 years old.';
console.log(ageMessage);

function validateForm() {
  const form = document.getElementById('studentForm');
  const fullName = document.getElementById('fullName');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const formAge = document.getElementById('age');
  const dob = document.getElementById('dob');
  const gender = form.querySelector('input[name="gender"]:checked');
  const selectedCourse = document.getElementById('course');
  const formMessage = document.getElementById('formMessage');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errors = [];

  if (!fullName.value.trim()) {
    errors.push('Full Name is required.');
  }
  if (!email.value.trim()) {
    errors.push('Email Address is required.');
  } else if (!emailPattern.test(email.value.trim())) {
    errors.push('Please enter a valid email address.');
  }
  if (!password.value) {
    errors.push('Password is required.');
  } else if (password.value.length < 8) {
    errors.push('Password must contain at least eight characters.');
  }
  if (!confirmPassword.value) {
    errors.push('Confirm Password is required.');
  } else if (password.value !== confirmPassword.value) {
    errors.push('Password and Confirm Password must match.');
  }
  if (!formAge.value) {
    errors.push('Age is required.');
  } else if (!Number.isInteger(Number(formAge.value)) || Number(formAge.value) < 1) {
    errors.push('Age must be a positive whole number.');
  }
  if (!dob.value) {
    errors.push('Date of Birth is required.');
  }
  if (!gender) {
    errors.push('Please select a gender.');
  }
  if (!selectedCourse.value) {
    errors.push('Please select a course.');
  }

  formMessage.hidden = false;
  if (errors.length > 0) {
    formMessage.className = 'alert alert-danger mt-3 mb-0';
    formMessage.innerHTML = errors.map((error) => `<div>${error}</div>`).join('');
    return false;
  }

  formMessage.className = 'alert alert-success mt-3 mb-0';
  formMessage.textContent = 'Validation successful. Your student information was submitted.';
  return true;
}

function displayStudentInformation() {
  document.getElementById('studentSummary').textContent = `${studentName} | ${age} years old | ${course}`;
  window.alert(`${studentName}\n${age} years old\n${course}\n${ageMessage}`);
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('studentForm');
  const resultsTable = document.getElementById('resultsTable');
  const resultsBody = document.getElementById('resultsBody');
  const noDataMessage = document.getElementById('noDataMessage');

  displayStudentInformation();

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData(form);
    const selectedLanguages = formData.getAll('languages').length
      ? formData.getAll('languages').join(', ')
      : 'No language selected';

    const entries = [
      ['Full Name', formData.get('fullName')],
      ['Email Address', formData.get('email')],
      ['Age', formData.get('age')],
      ['Date of Birth', formData.get('dob')],
      ['Gender', formData.get('gender')],
      ['Programming Languages', selectedLanguages],
      ['Course', formData.get('course')],
      ['Comments', formData.get('comments') || 'No comments']
    ];

    resultsBody.innerHTML = '';

    const headerRow = document.createElement('tr');
    const valueRow = document.createElement('tr');

    entries.forEach(([label, value]) => {
      const headerCell = document.createElement('th');
      headerCell.textContent = label;
      headerCell.scope = 'row';
      headerCell.className = 'bg-primary text-white';
      headerRow.appendChild(headerCell);

      const valueCell = document.createElement('td');
      valueCell.textContent = value;
      valueRow.appendChild(valueCell);
    });

    resultsBody.appendChild(headerRow);
    resultsBody.appendChild(valueRow);
    resultsTable.hidden = false;
    noDataMessage.style.display = 'none';
    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
  });

  form.addEventListener('reset', () => {
    const formMessage = document.getElementById('formMessage');
    formMessage.hidden = true;
    formMessage.textContent = '';
  });

  const registerForm = document.getElementById('registerForm');
  registerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const registerFullName = document.getElementById('registerFullName');
    const registerEmail = document.getElementById('registerEmail');
    const registerPassword = document.getElementById('registerPassword');
    const registerConfirmPassword = document.getElementById('registerConfirmPassword');
    const registerAge = document.getElementById('registerAge');
    const registerMessage = document.getElementById('registerMessage');
    const registeredAccount = document.getElementById('registeredAccount');
    const errors = [];

    if (!registerFullName.value.trim()) {
      errors.push('Full Name is required.');
    }
    if (!registerEmail.value.trim() || !registerEmail.validity.valid) {
      errors.push('Please enter a valid email address.');
    }
    if (registerPassword.value.length < 8) {
      errors.push('Password must contain at least eight characters.');
    }
    if (registerPassword.value !== registerConfirmPassword.value) {
      errors.push('Password and Confirm Password must match.');
    }
    if (!registerAge.value) {
      errors.push('Age is required.');
    } else if (!Number.isInteger(Number(registerAge.value)) || Number(registerAge.value) < 1 || Number(registerAge.value) > 120) {
      errors.push('Age must be a whole number between 1 and 120.');
    }

    registerMessage.hidden = false;
    if (errors.length > 0) {
      registerMessage.className = 'alert alert-danger mt-3 mb-0';
      registerMessage.innerHTML = errors.map((error) => `<div>${error}</div>`).join('');
      return;
    }

    const account = {
      fullName: registerFullName.value.trim(),
      email: registerEmail.value.trim(),
      age: Number(registerAge.value)
    };
    localStorage.setItem('registeredAccount', JSON.stringify(account));
    registerMessage.className = 'alert alert-success mt-3 mb-0';
    registerMessage.textContent = 'Account created successfully.';
    registeredAccount.hidden = false;
    registeredAccount.innerHTML = `<strong>Saved account:</strong> ${account.fullName} | ${account.email} | Age: ${account.age}`;
  });

  const savedAccount = localStorage.getItem('registeredAccount');
  if (savedAccount) {
    const account = JSON.parse(savedAccount);
    registeredAccount.hidden = false;
    registeredAccount.innerHTML = `<strong>Saved account:</strong> ${account.fullName} | ${account.email} | Age: ${account.age}`;
  }
});
