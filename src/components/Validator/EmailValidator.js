function EmailValidator(props) {
    const {email} = props;
    let errorsMessage;

    if (!email) {
        errorsMessage = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errorsMessage = 'Enter a valid email address';
    }

    return errorsMessage;
}

export default EmailValidator;