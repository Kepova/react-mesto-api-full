export const BASE_URL = 'https://api.mesto.kepova.nomoredomains.sbs';

const CheckResponse = (res) => {
    if (res.ok) {
        return res;
    }
    return res
        .then((data) => {
            throw new Error(data.message);
        })
}

export const register = ({ email, password }) => {
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

export const login = ({ email, password }) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "access-control-request-headers": "https://mesto.kepova.nomoredomains.sbs",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
        .then(CheckResponse)
}

export const getUserData = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            "access-control-request-headers": "https://mesto.kepova.nomoredomains.sbs",
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${jwt}`
        }
    })
        .then(CheckResponse)
}
