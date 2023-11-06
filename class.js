const obj = {
    keepSignedIn: true,
    login: 'oskar',
    password: '1234'
};

const secondPerson = {
    login: 'oskar',
    password: '1234'
};

class SignInDto {
    keepSignedIn = true;

    constructor(login, password) {
        this.login = login;
        this.password = password;
    }
}

const dto = new SignInDto('oskar', '1234');
const secondDto = new SignInDto('maciek', '1qaz');


console.log(dto instanceof SignInDto);
console.log(obj instanceof SignInDto);
console.log(secondDto);

class NotFoundError extends Error {}

const getUserById = (id) => {
    // ...

    // throw new Error('Jakis blad');
    return null;
}


try {
    // ... 
    const user = getUserById();

    throw new Error('Inny blad');
    if (!user) throw new NotFoundError();
} catch(err) {
    if (err instanceof NotFoundError) {
        alert('Nie znaleziono usera!')
    }
    else {
        console.error(err)
    }
}
