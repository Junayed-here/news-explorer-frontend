import React from 'react';
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import Input from "../Input/Input";
import EmailValidator from "../Validator/EmailValidator";
import PasswordValidator from "../Validator/PasswordValidator";

function SignIn(props) {
    const [email,setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [activeSubmit, setActiveSubmit] = React.useState(false);
    const [validationErrors, setValidationErrors] = React.useState({});

    React.useEffect(()=>{
        setEmail('');
        setPassword('');
        setActiveSubmit(false);
    },[props.isOpen]);

    React.useEffect(()=>{
        if (!validationErrors.email && !validationErrors.password && email !== '' && password !== ''){
            props.openSuccess();
            props.onClose();
        }else{
            setActiveSubmit(false);
        }
    },[validationErrors]);

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setValidationErrors({email: EmailValidator({email}), password: PasswordValidator({password})});
    }

    function activeSubmitFun() {
        if (email !== '' && password !== ''){
            setActiveSubmit(true);
            return;
        }
        setActiveSubmit(false);
    }

    return (
        <PopupWithForm
            name='signIn'
            title='Sign in'
            submitButtonText='Sign in'
            isOpen={props.isOpen}
            onSubmit={handleSubmit}
            onClose={props.onClose}
            orTextClick={props.openSignUp}
            activeSubmit={activeSubmit}
            orText='Sign up'>
            <label htmlFor="email" className="popup__label">Email</label>
            <Input
                value={email}
                className="popup__input"
                type="email"
                name="email"
                placeholder="Enter email"
                id="email"
                errors={validationErrors.email}
                handleChange={handleEmailChange}
                handleKeyUp={activeSubmitFun}
                />
            <label htmlFor="password" className="popup__label">Password</label>
            <Input
                value={password}
                className="popup__input"
                type="password"
                name="password"
                placeholder="Enter password"
                id="password"
                errors={validationErrors.password}
                handleChange={handlePasswordChange}
                handleKeyUp={activeSubmitFun}
                />
        </PopupWithForm>
    );
}

export default SignIn;
