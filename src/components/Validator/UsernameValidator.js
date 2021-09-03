function UsernameValidator(props) {
    const {username} = props;
    let errorsMessage;

    if (!username) {
        errorsMessage = 'Username is required';
    } else if (username.length <= 3) {
        errorsMessage = 'Username is too short! use 4 or more char.';
    }

    return errorsMessage;
}

export default UsernameValidator;