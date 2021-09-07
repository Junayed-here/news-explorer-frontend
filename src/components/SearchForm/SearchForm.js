import React from 'react';
import './SearchForm.css';

function SearchForm(props) {
    const [searchKeyword, setSearchKeyword] = React.useState('');
    const {handleSearch} = props;

    function handleKeywordChange(e) {
        setSearchKeyword(e.target.value);
        handleSearch(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleSearch(searchKeyword);
    }
    return (
        <div className="header__content header__content_form_box">
            <div className="header__form_box">
                <h1 className="header__title">
                    What's going on in the world?
                </h1>
                <p className="header__subtitle">
                    Find the latest news on any topic and save them in your personal account.
                </p>
                <form className="header__form" action="/" onSubmit={handleSubmit}>
                    <input type="text" className="header__form-input" placeholder="Enter topic" onChange={handleKeywordChange}/>
                    <button className="button button-role-submit header__form-submit">Search</button>
                </form>
            </div>
        </div>
    );
}

export default SearchForm;
