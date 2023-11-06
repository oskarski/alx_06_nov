const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(e.target);


    // console.log(loginForm.login.value);
    // console.log(e.target.elements.login.value); // <= nie polecam
    // console.log(data.get('login')); // <= polecam

    alert(`Login: ${data.get('login')} i Haslo: ${data.get('password')}`);
    // prompt();
    // confirm();

    console.log('Zatwierdzony formularz');
});

document.getElementById('btn').addEventListener('click', (e) => {
    console.log('KLIK');
    console.log('Target: ', e.target);
    console.log('Current Target: ', e.currentTarget);
});

// document.getElementById('btn-strong').addEventListener('click', (e) => {
//     console.log('KLIK STRONG');
// });

// function submitForm(e) {
//     console.log('SUBMIT');
//     return false;
// }

// stopPropagation