import React from "react";
import loadingImg from '../../images/loading.png';
import notFound from '../../images/notFound.png';
import NewsCard from "../NewsCard/NewsCard";
import Moment from "react-moment";

function SavedNews(props) {
    const   {data} = props;
    const   dataCount = data.length;

    function handleDeleteNews(id) {
        props.handleDeleteSaveNews(id);
    }

    return (
        <section className="cards_section">
            <div className="container">
                {
                    (dataCount < 1) ?
                        <div className="noResult">
                            <img className="noResult__img" src={notFound} alt="No result found"/>
                            <h4 className="noResult__title">
                                Nothing found
                            </h4>
                            <p className="noResult__text">
                                Sorry, but nothing matched your search terms.
                            </p>
                        </div>
                        :
                        <>
                            <div className="cards__list">
                                {
                                    data.map((item,index)=>(
                                        <div className="card" key={index} onClick={()=> handleDeleteNews(item._id)}>
                                            <div className="card__image_box">
                                                <img src={item.image} alt="Article" className="card__image"/>
                                                <p className="card__action_keyword">{item.keyword}</p>
                                                <div className="card__action_box">
                                                    <div className="card__action card__action_remove"></div>
                                                    <p className="card__action_text">Remove from saved</p>
                                                </div>
                                            </div>
                                            <div className="cards__info_box">
                                                <p className="cards__posting_date">
                                                    <Moment format="MMMM DD, YYYY">
                                                        {item.date}
                                                    </Moment>
                                                </p>
                                                <h3 className="card__title">
                                                    {item.title}
                                                </h3>
                                                <p className="card__text">
                                                    {item.text}
                                                </p>
                                                <p className="card__keyword">
                                                    {item.source}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                }
            </div>
        </section>
    );
}

export default SavedNews;
