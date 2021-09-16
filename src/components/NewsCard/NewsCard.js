import React, {useState} from 'react';
import './NewsCard.css';
import Moment from "react-moment"

function NewsCard(props) {
    const   {card, handleSaveNews, loggedIn, signInClick, handleDeleteSaveNews} = props;
    const   {title, urlToImage, description, publishedAt, keyword, url, id, source} = card;
    const   [isSaved, setIsSaved] = useState((card.id !== undefined));

    function handleSave() {
        if(loggedIn && !isSaved) {
            handleSaveNews({title:title, image:urlToImage, text:description, date:publishedAt, source:source, link:url});
            setIsSaved(true);
        }else{
            signInClick();
        }
    }

    function handleUnSave() {
        handleDeleteSaveNews(id);
        setIsSaved(false);
    }
    return (
        <div className="card">
            <div className="card__image_box">
                <img src={urlToImage} alt="Article" className="card__image"/>
                {
                    isSaved ?
                        <>
                            <div className="card__action_box" onClick={handleUnSave}>
                                <div className="card__action card__action_save saved"></div>
                                <p className="card__action_text">Remove from saved</p>
                            </div>
                        </>
                        :
                        <div className="card__action_box" onClick={handleSave}>
                            <div className="card__action card__action_save"></div>
                            <p className="card__action_text">{loggedIn? "Click to save this article" :"Sign in to save articles"}</p>
                        </div>
                }
            </div>
            <div className="cards__info_box">
                <p className="cards__posting_date">
                    <Moment format="MMMM DD, YYYY">
                        {publishedAt}
                    </Moment>
                </p>
                <h3 className="card__title">
                    {title}
                </h3>
                <p className="card__text">
                    {description}
                </p>
                <p className="card__keyword">
                    {source}
                </p>
            </div>
        </div>
    );
}

export default NewsCard;
