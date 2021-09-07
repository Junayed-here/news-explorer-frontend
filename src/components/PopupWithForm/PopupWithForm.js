import React from 'react';
import './PopupWithForm.css'

function PopupWithForm(props) {
    const isOpen = props.isOpen ? 'popup_show' : '';

    const isActive = props.activeSubmit ? 'active' : '';
    React.useEffect(()=>{
        const popup = document.querySelector('.popup');
        popup.addEventListener("click", (e) => {
            if(e.target.classList.contains('button_role_close') || e.target.classList.contains("popup_show")){
                props.onClose();
            }
        });
        document.addEventListener('keyup', (e)=>{
            if (e.key === "Escape" || e.keyCode === 27 && document.querySelector('.popup_show').length > 0) {
                props.onClose();
            }
        });
    },[props.isOpen]);

    return (
        <div className={`popup popup_type_${props.name} `+isOpen}>
            <div className="popup__body popup__body-with-form ">
                <button className="button button_role_close"></button>
                <h3 className="popup__title">{props.title}</h3>
                <form action="#" className="popup__form popup__edit-form" name={`${props.name}`}  onSubmit={props.onSubmit}>
                    {props.children}
                    <button className={`button button_role_submit popup__submit_button ` + isActive} disabled={!props.activeSubmit} type="submit">{props.submitButtonText}</button>
                </form>
                <p className="popup__or_text">or <span className="popup__or_link" onClick={props.orTextClick}>{props.orText}</span></p>
            </div>
        </div>
    );
}

export default PopupWithForm;
