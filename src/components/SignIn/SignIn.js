import React from 'react';
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function SignIn(props) {
    const email = React.useRef(null);
    const password = React.useRef(null);
    React.useEffect(()=>{
        email.current.value = '';
        password.current.value = '';
    },[props.isOpen]);


    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <PopupWithForm
            name='signIn'
            title='Sign in'
            submitButtonText='Sign in'
            isOpen={props.isOpen}
            onSubmit={handleSubmit}
            onClose={props.onClose}
            or_link={props.onClose}
            or_text='Sign up'>
            <label htmlFor="email" className="popup__label">Email</label>
            <input
                ref={email}
                className="popup__input"
                type="email"
                name="email"
                placeholder="Enter email"
                id="email"
                required/>
            <label htmlFor="password" className="popup__label">Password</label>
            <input
                ref={password}
                className="popup__input"
                type="password"
                name="password"
                placeholder="Enter password"
                id="password"
                required/>
        </PopupWithForm>
    );
}

export default SignIn;
