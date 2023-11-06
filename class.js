const obj = {
    keepSignedIn: true,
    login: 'oskar',
    password: '1234'
};

const secondPerson = {
    login: 'oskar',
    password: '1234'
};


// w TS *
// class Foo {
//     constructor(
//         private readonly name: string,
//     ) {}
// }

class SignInDto {
    keepSignedIn = true;

    constructor(login, password) {
        this.login = login;
        this.password = password;
    }

    print() {
        console.log(this.login + ' ' + this.password)
    }
}

const dto = new SignInDto('oskar', '1234');
const secondDto = new SignInDto('maciek', '1qaz');


console.log(dto instanceof SignInDto);
console.log(obj instanceof SignInDto);
console.log(secondDto);
secondDto.print();

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


console.log(
    Object.keys({ login: 'oskar', password: '1234' })
);

console.log(
    Object.keys(dto)
);


console.log(
    Object.values({ login: 'oskar', password: '1234' })
);

console.log(
    Object.values(dto)
);

console.log(
    Object.entries({ login: 'oskar', password: '1234' })
);

console.log(
    Object.entries(dto)
);

for (const entry of Object.entries(dto)) {
    console.log({ klucz: entry[0], wartosc: entry[1] })
}

for (const entry of Object.entries(dto)) {
    console.log({ klucz: entry[0], wartosc: entry[1] })
}

for (const entry of Object.entries(dto)) {
    // destrukturyzacja tablicy
    const [first, second] = entry;
    // w react
    // const [state, setState] = useState();

    console.log({ klucz: first, wartosc: second });
}

for (const [first, second] of Object.entries(dto)) {
    console.log({ klucz: first, wartosc: second });
}

// destrukturyzacja tablicy
const [first, second] = ['pierwszy element', 'drugi element'];
// w react
// const [state, setState] = useState();

// destrukturyzacja obiektu
const { login } = dto;
console.log(login);
// dto.login

// Praktyka w react *
// const LoginForm = (props) => {
//     return <div id={props.id }></div>;
// }
// {/* <LoginForm id='login-form' /> */}
// const LoginForm = (props) => {
//     const { id } = props;

//     return <div id={id}></div>;
// }

// {/* <LoginForm id='login-form' /> */}
// const LoginForm = ({ id }) => {
//     return <div id={id}></div>;
// }


const arr = [];

arr['arr_first'] = '11111';
arr.arr_second =  '22222'

const { arr_first, arr_second } = arr;
console.log(arr_first, arr_second);
console.log(arr.arr_first);


const json1 = '{}';
console.log(
    json1,
    JSON.parse(json1)
);

const json2 = '{"login": "oskar", "age": 2}';
console.log(
    json2,
    JSON.parse(json2)
);

const signInDto = new SignInDto("Oskar", "1234");

console.log(signInDto);
signInDto.print();
console.log(JSON.stringify(signInDto))

const stringFromDto = JSON.stringify(signInDto);
const dtoFromString = JSON.parse(stringFromDto);

console.log(dtoFromString)
console.log(new SignInDto(dtoFromString.login, dtoFromString.password))
