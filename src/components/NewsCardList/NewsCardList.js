import loadingImg from '../../images/loading.png';
import notFound from '../../images/notFound.png';
import './NewsCardList.css';
import NewsCard from "../NewsCard/NewsCard";
import React from "react";

function NewsCardList(props) {
    const   {dataType, data, isLoading} = props;
    const   dataCount = data.length;
    const   [loading, setLoading] = React.useState(isLoading);

    setTimeout(() => {
        setLoading(false);
    }, 2000);

    return (
        <section className="cards_section">
            <div className="container">
                {
                    loading ?
                        <div className="loading">
                            <img src={loadingImg} className="loading__img" alt="Loading data"/>
                            <p className="loading__text">
                                Searching for news...
                            </p>
                        </div>
                        :
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
                                {
                                    (dataType === 'search') && <h2 className="cards_section_title">Search Result</h2>
                                }
                                <div className="cards__list">
                                    {
                                        data.map((item,index)=>(
                                            <NewsCard card={item} dataType={dataType} key={index}/>
                                        ))
                                    }
                                </div>
                                {
                                    (dataType === 'search') &&
                                    <button className="card__show_more_button">
                                        Show more
                                    </button>
                                }
                            </>
                }


            </div>
        </section>
    );
}

export default NewsCardList;
