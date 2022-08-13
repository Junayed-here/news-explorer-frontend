import React from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Main from "../Main/Main";
import About from '../About/About';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNews from '../SavedNews/SavedNews';
import UserInfo from '../UserInfo/UserInfo';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import SuccessReg from '../SuccessReg/SuccessReg';
import CurrentUserContext from '../../context/CurrentUserContext'
import * as auth from "../../utils/auth";
import MainApi from "../../utils/MainApi";
import {searchNews} from "../../utils/NewsApi";
import config from '../../utils/config.json';
import ProtectedRoute from "../../utils/ProtectedRoute";
import Preloader from "../Preloader/Preloader";

function App() {
    const   history = useHistory();
    const   [preloader, setPreloader] = React.useState(true);
    const   [token, setToken] = React.useState(localStorage.getItem('jwt'));
    const   [currentUser, setCurrentUser] = React.useState({});
    const   [loggedIn, setLoggedIn] = React.useState(false);
    const   [searchLoading, setSearchLoading] = React.useState(true);
    const   [searchKey, setSearchKey] = React.useState('');
    const   [isSignInPopupOpen, setIsSignInPopupOpen] = React.useState(false);
    const   [isSignUpPopupOpen, setIsSignUpPopupOpen] = React.useState(false);
    const   [isSuccessRegUpPopupOpen, setIsSuccessRegUpPopupOpen] = React.useState(false);
    const   [activeMenu, setActiveMenu] = React.useState(false);
    const   [searchResult, setSearchResult] = React.useState([]);
    const   [savedNews, setSavedNews] = React.useState([]);
    const   [sortedSavedNews, setSortedSavedNews] = React.useState([]);
    const   [dataCount, setDataCount] = React.useState(0);
    const   [keywordsText, setKeywordsText] = React.useState('');
    const   [formError, setFormError] = React.useState('');
    const   api = new MainApi({
        baseUrl: config.MAIN_URL,
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
        },
    });

    React.useEffect(()=>{
        if (token){
            auth.validation(token)
                .then((res)=>{
                    if (res){
                        setCurrentUser(res);
                        setLoggedIn(true);
                    }else{
                        history.push('/');
                    }
                    setPreloader(false);
                })
                .catch((err) => console.log(err));
        }else{
            setPreloader(false);
        }
    },[token]);

    React.useEffect(()=>{
        if (currentUser._id !== undefined){
            getSavedNews();
        }
    },[currentUser])

    React.useEffect(()=>{
        if (savedNews.length > 0){
            sortSavedData(savedNews);
            searchResultMatching(searchResult);
        }
    },[savedNews]);

    function handleSearch(keyword) {
        setSearchLoading(true);
        setSearchKey(keyword);
        searchNews(keyword).then((res)=> {
            if (res.articles.length > 0){
                searchResultMatching(res.articles);
                setSearchLoading(false);
            }

        })
            .catch(err => console.log(err));
    }
    function handleLogIn(user) {
        auth.authorization(user).then((res)=> {
            if (res.errorMassage){
                setCurrentUser({});
                setLoggedIn(false);
                setFormError(res.errorMassage);
            }else {
                localStorage.setItem("jwt", res.token);
                setToken(res.token);
                onPopupClose();
            }
        })
            .catch(err => console.log(err));
    }
    function handleSignUp(user) {
        auth.register(user).then((res)=> {
            if (res.errorMassage){
                setFormError(res.errorMassage);
            }else{
                handleSuccessReg();
            }
        }).catch(err => console.log(err));
    }
    function handleSaveNews(data) {
        api.saveNews({...data, keyword: searchKey}).then((res) => {
            getSavedNews()
        }).catch(err => console.log(err));
    }
    function sortSavedData(data) {
        const   keywords = [];
        const   keywordsUnique = {};
        setDataCount(data.length);
        data.map((item)=>{
            keywords.push(item.keyword);
        });

        keywords.forEach(function (x) { keywordsUnique[x] = (keywordsUnique[x] || 0) + 1; });
        const keywordsUniqueSorted = Object.keys(keywordsUnique).sort(function(a,b){return keywordsUnique[b]-keywordsUnique[a]});

        const sortData = (arr1, arr2) => {
            arr2.sort((a, b) => {
                const aKey = Object.values(a)[1];
                const bKey = Object.values(b)[1];
                return arr1.indexOf(aKey) - arr1.indexOf(bKey);
            });
        };

        sortData(keywordsUniqueSorted,data);
        setSortedSavedNews(data);

        if (Object.keys(keywordsUniqueSorted).length > 3){
            setKeywordsText(`${Object.values(keywordsUniqueSorted)[0]}, ${Object.values(keywordsUniqueSorted)[1]} and ${Object.values(keywordsUniqueSorted).length - 2} others.`);
        }else if(Object.keys(keywordsUniqueSorted).length === 3){
            setKeywordsText(`${Object.values(keywordsUniqueSorted)[0]}, ${Object.values(keywordsUniqueSorted)[1]} and ${Object.values(keywordsUniqueSorted)[2]}.`);
        }else if(Object.values(keywordsUniqueSorted).length === 2){
            setKeywordsText(`${Object.values(keywordsUniqueSorted)[0]} and ${Object.values(keywordsUniqueSorted)[1]}.`);
        }else if(Object.keys(keywordsUniqueSorted).length === 1){
            setKeywordsText(`${Object.values(keywordsUniqueSorted)[0]}.`);
        }else if(Object.values(keywordsUniqueSorted).length < 1){
            setKeywordsText(`N/A`);
        }
    }
    function searchResultMatching(data) {
        let readyData = [];
        data.map((item)=>{
            const singleData = new Object();
            singleData.title = item.title;
            singleData.urlToImage = item.urlToImage;
            singleData.description = item.description;
            singleData.publishedAt = item.publishedAt;
            singleData.url = item.url;
            singleData.source = (item.source !== null) ? ((item.source.name !== undefined) ? item.source.name:item.source) : "Unknown";
            singleData.keyword = searchKey;
            if (loggedIn){
                for (let i=0; i<sortedSavedNews.length;i++){
                    if (item.title === sortedSavedNews[i].title && item.description === sortedSavedNews[i].text){
                        singleData.id = sortedSavedNews[i]._id;
                        break;
                    }
                }
            }
            readyData.push(singleData);
        });
        setSearchResult(readyData);
    }
    function onSignOut() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        setCurrentUser({});
        setToken('');
    }
    function getSavedNews() {
        api.getSavedNews().then(res => {
            setSavedNews('');
            if (res){
                const match = []
                res.map((item)=>{
                    if (item.owner === currentUser._id){
                        match.push(item);
                    }
                });
                setSavedNews(match);
            }
        });
    }
    function handleSignInClick(){
        onPopupClose();
        setIsSignInPopupOpen(!isSignInPopupOpen);
    }
    function handleSignUpClick(){
        onPopupClose();
        setIsSignUpPopupOpen(!isSignUpPopupOpen);
    }
    function handleSuccessReg(){
        onPopupClose();
        setIsSuccessRegUpPopupOpen(!isSuccessRegUpPopupOpen);
    }
    function onPopupClose(){
        setIsSignInPopupOpen(false);
        setIsSignUpPopupOpen(false);
        setIsSuccessRegUpPopupOpen(false);
        setFormError('');
    }
    function mobileMenuToggle() {
        setActiveMenu(!activeMenu);
    }
    function mobileMenuDeactivate() {
        {activeMenu && setActiveMenu(false)}
    }
    function handleDeleteSaveNews(id) {
        api.deleteSavedNews(id).then(async (res) => {
            await getSavedNews();
        });
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="app" onClick={mobileMenuDeactivate}>
                <Preloader preloaderState={preloader}/>
                <Switch>
                    <Route exact path='/'>
                        <Header
                            nav={
                                <Navigation loggedIn={loggedIn}
                                            handleSignInClick={handleSignInClick}
                                            handleSignOutClick={onSignOut}
                                            mobileMenuToggle={mobileMenuToggle}
                                            userName={currentUser.name}
                                            popUpOpened={isSignInPopupOpen || isSignUpPopupOpen || isSuccessRegUpPopupOpen}
                                            activeMenu={activeMenu}/>
                            }
                            headerContent={
                                <SearchForm handleSearch={handleSearch}/>
                            }>
                        </Header>
                        <Main>
                            {
                                (searchKey !== '') ? <NewsCardList data={searchResult} isLoading={searchLoading} handleDeleteSaveNews={handleDeleteSaveNews} handleSaveNews={handleSaveNews} loggedIn={loggedIn} signInClick={handleSignInClick}/> : ''
                            }
                            <About />
                        </Main>
                    </Route>
                    <ProtectedRoute path='/saved-news' loggedIn={loggedIn}>
                        <Header
                            nav={
                                <Navigation loggedIn
                                            handleSignOutClick={onSignOut}
                                            theme="light"
                                            userName={currentUser.name}
                                            mobileMenuToggle={mobileMenuToggle}
                                            popUpOpened={isSignInPopupOpen || isSignUpPopupOpen || isSuccessRegUpPopupOpen}
                                            activeMenu={activeMenu}/>
                            }
                            headerContent={
                                <UserInfo dataCount={dataCount} keywordsText={keywordsText} currentUser={currentUser}/>
                            }>
                        </Header>
                        <Main>
                            <SavedNews data={sortedSavedNews} handleDeleteSaveNews={handleDeleteSaveNews}/>
                        </Main>
                    </ProtectedRoute>
                </Switch>
                <Footer />
                {isSignInPopupOpen && <SignIn isOpen={isSignInPopupOpen} onClose={onPopupClose} openSignUp={handleSignUpClick} onSubmit={handleLogIn} formError={formError}/>}
                {isSignUpPopupOpen && <SignUp isOpen={isSignUpPopupOpen} onClose={onPopupClose} openSignUp={handleSignInClick} onSubmit={handleSignUp} formError={formError}/>}
                {isSuccessRegUpPopupOpen && <SuccessReg name='successReg' isOpen={isSuccessRegUpPopupOpen} onClose={onPopupClose} signInClick={handleSignInClick}/>}
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
