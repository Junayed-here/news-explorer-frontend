import React from 'react';
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import Input from "../Input/Input";
import EmailValidator from "../Validator/EmailValidator";
import PasswordValidator from "../Validator/PasswordValidator";
import UsernameValidator from "../Validator/UsernameValidator";

function SignUp(props) {
    const [email,setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [activeSubmit, setActiveSubmit] = React.useState(false);
    const [validationErrors, setValidationErrors] = React.useState({});
    const {formError} = props;

    React.useEffect(()=>{
        setEmail('');
        setPassword('');
        setUsername('');
        setActiveSubmit(false);
    },[props.isOpen]);

    React.useEffect(()=>{
        if (!validationErrors.email && !validationErrors.password && !validationErrors.username && email !== '' && password !== '' && username !== ''){
            props.onSubmit({password,email,username})
            // props.openSuccess();
        }else{
            setActiveSubmit(false);
        }
    },[validationErrors]);

    function handleEmailChange(e) {
        setEmail(e.target.value);
        activeSubmitFun();
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
        activeSubmitFun();
    }

    function handleUsernameChange(e) {
        setUsername(e.target.value);
        activeSubmitFun();
    }

    function handleSubmit(e) {
        e.preventDefault();
        setValidationErrors({
            email: EmailValidator({email}),
            password: PasswordValidator({password}),
            username: UsernameValidator({username})
        });
    }

    function activeSubmitFun() {
        if (email !== '' && password !== '' && username !== ''){
            setActiveSubmit(true);
            return;
        }
        setActiveSubmit(false);
    }

    return (
        <PopupWithForm
            name='signUp'
            title='Sign up'
            submitButtonText='Sign Up'
            isOpen={props.isOpen}
            onSubmit={handleSubmit}
            onClose={props.onClose}
            orTextClick={props.openSignUp}
            activeSubmit={activeSubmit}
            formError={formError}
            orText='Sign in'>
            <label htmlFor="email" className="popup__label">Email</label>
            <Input
                value={email}
                className="popup__input"
                type="email"
                name="email"
                placeholder="Enter email"
                id="reg_email"
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
                id="reg_password"
                errors={validationErrors.password}
                handleChange={handlePasswordChange}
                handleKeyUp={activeSubmitFun}
                />
            <label htmlFor="userName" className="popup__label">Username</label>
            <Input
                value={username}
                className="popup__input"
                type="text"
                name="username"
                placeholder="Enter your username"
                id="password"
                errors={validationErrors.username}
                handleChange={handleUsernameChange}
                handleKeyUp={activeSubmitFun}
                />
        </PopupWithForm>
    );
}

export default SignUp;
