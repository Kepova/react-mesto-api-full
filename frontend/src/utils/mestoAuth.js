export const BASE_URL = 'https://api.mesto.kepova.nomoredomains.sbs';

const CheckResponse = (res) => {

    if (res.ok) {
        return res.json();
    }
    return res.json()
        .then((data) => {
            throw new Error(data.message);
        })
}

export const register = ({email, password}) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "access-control-request-headers": "https://mesto.kepova.nomoredomains.sbs",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
        .then(CheckResponse)
}

export const login = ({email, password}) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            "Access-Control-Allow-Origin": "https://mesto.kepova.nomoredomains.sbs",
            "access-control-request-headers": "https://mesto.kepova.nomoredomains.sbs",
            "Content-Type": "application/json"
        },
        body: JSON.parse({ email, password })
    })
        .then(CheckResponse)
}

export const getUserData = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "access-control-request-headers": "https://mesto.kepova.nomoredomains.sbs",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
    })
        .then(CheckResponse)
}
