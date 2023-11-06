const $authorErrorMessage = document.getElementById('author-error');
const $authorInput = document.getElementById('author');

const $messageErrorMessage = document.getElementById('message-error');
const $messageInput = document.getElementById('message');


const validateAuthorField = (authorValue) => {
    if (!$authorErrorMessage)  {
        alert('Cos poszlo nie tak!');
        $authorInput.classList.add('error-border');
        return false;
    }
    // Early return 
    if (!authorValue) {
        $authorErrorMessage.innerText = 'Pole wymagane!';
        $authorInput.classList.add('error-border');
        return false;
    }

    $authorInput.classList.remove('error-border');
    $authorErrorMessage.innerText = '';

    return true;
}

const validateMessageField = (messageValue) => {
    if (!messageValue) {
        document.getElementById('message-error').innerText = 'Pole wymagane!';
        document.getElementById('message').classList.add('error-border');
        return false;
    } 

    if (messageValue.length < 2) {
        document.getElementById('message-error').innerText = 'Pole musi miec min 2 znaki!';
        document.getElementById('message').classList.add('error-border');
        return false;
    }

    $messageInput.classList.remove('error-border');
    $messageErrorMessage.innerText = '';

    return true;
}


document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const author = formData.get('author');
    const message = formData.get('message');

    const isAuthorValid = validateAuthorField(author);
    const isMessageValid = validateMessageField(message);

    if (!isMessageValid) {
        $messageInput.focus();
    }
    if (!isAuthorValid) {
        $authorInput.focus();
    }
});

$authorInput.addEventListener('input', (e) => {
    validateAuthorField(e.target.value);
});

$messageInput.addEventListener('input', (e) => {
    validateMessageField(e.target.value);
});