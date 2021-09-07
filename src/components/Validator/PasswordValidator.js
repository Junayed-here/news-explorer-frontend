function PasswordValidator(props) {
    const {password} = props;
    let errorsMessage;

    if (!password) {
        errorsMessage = 'Password is required';
    } else if (password.length <= 5) {
        errorsMessage = 'Password is too short! use 6 or more char.';
    }

    return errorsMessage;
}

export default PasswordValidator;