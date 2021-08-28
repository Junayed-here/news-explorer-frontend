import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import About from '../About/About';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import UserInfo from '../UserInfo/UserInfo';
import SignIn from '../SignIn/SignIn';
import cardImg_1 from "../../images/cards_1.jpg";
import cardImg_2 from "../../images/cards_2.jpg";
import cardImg_3 from "../../images/cards_3.jpg";
import cardImg_4 from "../../images/cards_4.jpg";
import cardImg_5 from "../../images/cards_5.jpg";

const data = [
    {
        'title': 'Everyone Needs a Special \'Sit Spot\' in Nature',
        'image': cardImg_1,
        'text': 'Ever since I read Richard Louv\'s influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find...',
        'date': 'November 4, 2020',
        'source': 'Treehugger',
        'tag': 'Nature'
    },
    {
        'title': 'Nature makes you better',
        'image': cardImg_2,
        'text': 'We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves.',
        'date': 'February 19, 2019',
        'source': 'National Geographic',
        'tag': 'Nature'
    },
    {
        'title': 'Nostalgic Photos of Tourists in U.S. National Parks',
        'image': cardImg_3,
        'text': 'Uri Løvevild Golman and Helle Løvevild Golman are National Geographic Explorers and conservation photographers who just completed a project and book they call their love letter to...',
        'date': 'October 19, 2020',
        'source': 'National Geographic',
        'tag': 'Yellowstone'
    },
    {
        'title': 'Grand Teton Renews Historic Crest Trail',
        'image': cardImg_4,
        'text': '“The linking together of the Cascade and Death Canyon trails, at their heads, took place on October 1, 1933, and marked the first step in the realization of a plan whereby the hiker will be...',
        'date': 'November 4, 2020',
        'source': 'National parks traveler',
        'tag': 'Parks'
    },
    {
        'title': 'Scientists Don\'t Know Why Polaris Is So Weird ',
        'image': cardImg_5,
        'text': 'Humans have long relied on the starry sky to push into new frontiers, sail to the very edge of the world and find their way back home again. Even animals look to the stars to guide them. ',
        'date': 'March 16, 2020',
        'source': 'treehugger',
        'tag': 'Photography'
    }
];
function App() {
    const   [loggedIn, setLoggedIn] = React.useState(false);
    const   [searchKey, setSearchKey] = React.useState('');

    React.useEffect(()=>{
        // setLoggedIn(true);
    }, []);

    function handleSearch(keyword) {
        setSearchKey(keyword);
    }

    return (
        <div className="app">
            <Switch>
                <Route exact path='/'>
                    <Header
                        nav={
                            <Navigation loggedIn={loggedIn}/>
                        }
                        headerContent={
                            <SearchForm handleSearch={handleSearch}/>
                        }>
                    </Header>
                    {
                        (searchKey !== '') ? <NewsCardList dataType="search" data={data} isLoading={true}/> : ''
                    }
                    {
                        console.log(searchKey)
                    }
                    <About />
                </Route>
                <Route path='/saved-news'>
                    <Header
                        nav={
                            <Navigation loggedIn={loggedIn} theme="light"/>
                        }
                        headerContent={
                            <UserInfo />
                        }>
                    </Header>
                    <NewsCardList dataType="saved" data={data} isLoading={false}/>
                </Route>
            </Switch>
            <Footer />
            <SignIn />
        </div>
    );
}

export default App;
