import loadingImg from '../../images/loading.png';
import notFound from '../../images/notFound.png';
import './NewsCardList.css';
import NewsCard from "../NewsCard/NewsCard";
import React from "react";

function NewsCardList(props) {
    const   {dataType, data, isLoading, handleSaveNews, loggedIn, signInClick,handleDeleteSaveNews} = props;
    const   dataCount = data.length;
    const   [newData, setNewData] = React.useState([]);
    const   [dataLimit, setDataLimit] = React.useState(3);

    React.useEffect(()=>{
        setDataLimit(3);
    },[isLoading]);

    React.useEffect(()=>{
        setDataLimit(3);
    },[data]);

    React.useEffect(()=>{
        setNewData([]);
        if (dataCount>0){
            for (let i=0; i<dataLimit; i++){
                setNewData((newData)=> [...newData,data[i]]);
            }
        }
    },[dataLimit,isLoading]);

    function showMore(e) {
        if (dataCount > (dataLimit+3)){
            setDataLimit(dataLimit+3);
            e.target.classList.remove('d-none')
        }else{
            setDataLimit(dataCount);
            e.target.classList.add('d-none')
        }
    }

    return (
        <section className="cards_section">
            <div className="container">
                {
                    isLoading ?
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
                                <h2 className="cards_section_title">Search Result</h2>
                                <div className="cards__list">
                                    {
                                        newData.map((item,index)=>(
                                            <NewsCard card={item} dataType={dataType} key={index} handleSaveNews={handleSaveNews} loggedIn={loggedIn} signInClick={signInClick} handleDeleteSaveNews={handleDeleteSaveNews}/>
                                        ))
                                    }
                                </div>
                                <button className="card__show_more_button" onClick={showMore}>
                                    Show more
                                </button>
                            </>
                }


            </div>
        </section>
    );
}

export default NewsCardList;
