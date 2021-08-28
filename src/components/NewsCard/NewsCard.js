import './NewsCard.css';

function NewsCard(props) {
    const {card, dataType} = props;
    const {title, image, text, date, source, tag} = card;
    return (
        <div className="card">
            <div className="card__image_box">
                <img src={image} alt="Article" className="card__image"/>
                {
                    (dataType === 'saved') ?
                        <>
                            <p className="card__action_keyword">{tag}</p>
                            <div className="card__action_box">
                                <div className="card__action card__action_remove"></div>
                                <p className="card__action_text">Remove from saved</p>
                            </div>
                        </>
                        :
                        <div className="card__action_box">
                            <div className="card__action card__action_save"></div>
                            <p className="card__action_text">Sign in to save articles</p>
                        </div>
                }
            </div>
            <div className="cards__info_box">
                <p className="cards__posting_date">
                    {date}
                </p>
                <h3 className="card__title">
                    {title}
                </h3>
                <p className="card__text">
                    {text}
                </p>
                <p className="card__keyword">
                    {source}
                </p>
            </div>
        </div>
    );
}

export default NewsCard;
