// wyszukanie elementów na stronie i przypisanie ich do stałych
const $authorErrorMessage = document.getElementById('author-error');
const $authorInput = document.getElementById('author');

const $messageErrorMessage = document.getElementById('message-error');
const $messageInput = document.getElementById('message');

const $resetButton = document.getElementById('reset-btn');

const $messageList = document.getElementById('message-list');

// Ustawianie domyslnej wartosci przy uzyciu operatora || lub ??
// const persistedMessagesString = localStorage.getItem('messages') ?? '[]'; <- podobnie do || ale tylko dla null i undefined
// Wyciągnięcie zapisanych danych w localStorage
const persistedMessagesString = localStorage.getItem('messages') || '[]';
// zamiana zapisanych danych z localStorage ( string ) na tablicę 
const messagesArray = JSON.parse(persistedMessagesString);

const validateAuthorField = (authorValue) => {
    // Jeśli nie ma elementu $authorErrorMessage ( bo go nie znaleziono ) , to wykonaj pewne akcje
    if (!$authorErrorMessage)  {
        alert('Cos poszlo nie tak!');
        $authorInput.classList.add('error-border');
        // Early return <- wyjscie z funkcji 
        return false;
    } 
    // Jeśli authorValue jest falsy dodaj odpowiedni tekst i klasę kolorującą ramkę 
    if (!authorValue) {
        $authorErrorMessage.innerText = 'Pole wymagane!';
        $authorInput.classList.add('error-border');
        return false;
    }

    // Jeśli dane poprawne, usuń stan błędu 
    $authorInput.classList.remove('error-border');
    $authorErrorMessage.innerText = '';

    return true;
}

const validateMessageField = (messageValue) => {
    // Jeśli messageValue jest falsy, to wejdz w stan błędu 
    if (!messageValue) {
        document.getElementById('message-error').innerText = 'Pole wymagane!';
        document.getElementById('message').classList.add('error-border');
        return false;
    } 

    // Jeśli messageValue ma mniej znaków niz 2, to wejdz w stan błędu 
    if (messageValue.length < 2) {
        document.getElementById('message-error').innerText = 'Pole musi miec min 2 znaki!';
        document.getElementById('message').classList.add('error-border');
        return false;
    }

    // Jeśli dane poprawne, usuń stan błędu 
    $messageInput.classList.remove('error-border');
    $messageErrorMessage.innerText = '';

    return true;
}

// Funkcja zapisująca dane do localStorage. Przed zapisem zamiana na napis
const saveData = () => {
    localStorage.setItem('messages', JSON.stringify(messagesArray))
}

// Klasa do definiowania obiektów reprezentujących wiadomości
class Message {
    constructor(author, body, liked, disliked) {
        this.author = author;
        this.body = body;
        this.liked = liked;
        this.disliked = disliked;
    }
}

// Funkcje renderująca listę wiadomosci
const renderMesssages = (messagesArray) => {
    // Wyczyszczenie listy, przed dodaniem najnowszej wersji 
    $messageList.innerHTML = '';

    // Doklejanie HTML'a do $messageList na bazie messagesArray
    for (const message of messagesArray) {
        $messageList.innerHTML += `
            <li class="list-group-item">
                <div class="fw-bold">${message.author}</div>
                <span>${message.body}</span>

                <button class="like-btn btn btn-info" ${message.liked && 'disabled'}>:)</button>
                <button class="dislike-btn btn btn-warning"  ${message.disliked && 'disabled'}>:(</button>
                <button class="delete-btn btn btn-danger">Usun</button>
            </li>
        `;
    }

    // Znalezeienie guzików z klasą like-btn. Zamieniamy na tablicę przy uzyciu Array.from(). getElementsByClassName() zwraca kolekcje, a łatwiej nam będzie pracować z tablicą
    const likesBtn = Array.from(document.getElementsByClassName('like-btn'));

    // Kazdemu guzikowi do polubien przypisz event listener na zdarzenie click
    for (const likeBtn of likesBtn) {
        likeBtn.addEventListener('click', (e) => {
            // Po kliknieciu dodaj kliknietemu przyciskowi atrybut disabled
            e.target.setAttribute('disabled', true);

            // Odwolanie do elementu nadrzednego dla kliknietego guzika, czyli elementu li
            const $parentLi = e.target.parentElement;

            // Znajdz wiadomosc, ktrej tresc pasuje do tresci z li, w ktorym jest klikniety przycisk 
            const messageToLike = messagesArray.find(msg => {
                return msg.body === $parentLi.querySelector('span').innerText;
            });

            // Zmodyfikuj dane 
            messageToLike.liked = true;
            // Zapisz w localStorage, zeby po odswiezeniu byly one dostepne
            saveData();
        });
    }

    // Analogiczna logika dla przyciskow do znielubienia
    const dislikesBtn = Array.from(document.getElementsByClassName('dislike-btn'));

    for (const dislikeBtn of dislikesBtn) {
        dislikeBtn.addEventListener('click', (e) => {
            e.target.setAttribute('disabled', true);
        });
    }

    // Znajdz wszystkie przyciski do usuwania
    const deleteBtns = Array.from(document.getElementsByClassName('delete-btn'));

    // Kaxdemu guzikowi przypisz event listener na zdarzenie click
    for (const deleteBtn of deleteBtns) {
        deleteBtn.addEventListener('click', (e) => {
            console.log('USUN')
            const $parentLi = e.target.parentElement;

            // Znajdz wiadomosc, ktorej tresc pasuje do tresci z li, w ktorym jest klikniety przycisk 
            const indexOfMessageToDelete = messagesArray.findIndex(msg => {
                return msg.body === $parentLi.querySelector('span').innerText;
            });

            // Usun element z tablicy
            messagesArray.splice(indexOfMessageToDelete, 1);

            // Zapisz dane do localStorage
            saveData();
            // Przerenderuj listę, tak aby jeszcze zobaczyć widok pasujący do danych ze zmiennej messagesArray
            // Czyli bez usunietej wiadomosci 
            renderMesssages(messagesArray);
        });
    }
}

// Przypisz event listener na zdarzenie submit w formularzu
document.querySelector('#message-form').addEventListener('submit', (e) => {
    // Nie przeladowuj strony - powstrzymaj domyslne zachowanie przegladarki
    e.preventDefault();

    // Korzystajac z FormData wyciagamy dane z formularza
    const formData = new FormData(e.target);

    const author = formData.get('author');
    const message = formData.get('message');

    // Sprawdzamy czy dane sa poprawne
    const isAuthorValid = validateAuthorField(author);
    const isMessageValid = validateMessageField(message);

    // Jesli wiadomosc nie jest poprawna, to ustaw w tym polu kursor
    if (!isMessageValid) {
        $messageInput.focus();
    }
    // Jesli autor nie jest poprawny, to ustaw w tym polu kursor
    if (!isAuthorValid) {
        $authorInput.focus();
    }

    // Jesli dane nie sa poprawne, to zakoncz wykonywanie funkcji 
    if (!isAuthorValid || !isMessageValid) return;

    // Dopisz nowa wiadomosc do listy wiadomosci 
    messagesArray.push(new Message(author, message, false, false));

    // Zapisz w localStorage
    saveData();

    // Zaktualizuj widok bazujac na najnowszej wersji tablicy messagesArray
    renderMesssages(messagesArray);
});

// Dodaj event listener na zdarzenie input, czyli kiedy ktos coś wpisuje w input
$authorInput.addEventListener('input', (e) => {
    // Waliduj przy wpisywaniu tekstu 
    validateAuthorField(e.target.value);
});

// Analogicznie jak wyzej
$messageInput.addEventListener('input', (e) => {
    validateMessageField(e.target.value);
});

// po kliknieciu w reset button programistycznie resetujemy wartosci pól 
// Polecam tak nie robic, tylko skorzystac z guzika typu "reset"
$resetButton.addEventListener('click', () => {
    $authorInput.value = null;
    $messageInput.value = null;
});

// Wyrenderuj poczatkowy stan aplikacji ( na bazie danych zapisanych z localStorage )
renderMesssages(messagesArray);