import config from '../utils/config.json';

export const register = (user) => {
    return fetch(`${config.MAIN_URL}/api/signup`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email:user.email, password:user.password, name:user.username}),
    })
        .then((res) => {
            if (res.ok){
                return res.json();
            } else if(res.status === 409){
                return {"errorMassage": "Email already exist, try another email."};
            }else{
                return {"errorMassage": "Something went wrong, please try again."};
            }
        })
        .then((res) => {
            return res;
        });
};

export const authorization  = (user) => {
    return fetch(`${config.MAIN_URL}/api/signin`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email:user.email, password:user.password}),
    })
        .then((res) => {
            if (res.ok){
                return res.json();
            } else if(res.status === 401){
                return {"errorMassage": "Incorrect email or password"};
            }else{
                return {"errorMassage": "Something went wrong, please try again."};
            }
        })
        .then((res) => {
            return res;
        })
};

export const validation = (jwt) => {
    return fetch(`${config.MAIN_URL}/api/users/me`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "authorization" : `Bearer ${jwt}`
        },
    })
        .then((res) => res.json())
        .then((res) => res)
        .catch((err) => console.log(err));
};