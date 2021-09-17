import './UserInfo.css';

function UserInfo(props) {
    const   {keywordsText,dataCount,currentUser} = props;

    return(
        <div className="userInfo">
            <div className="container">
                <p className="userInfo__subtitle">Saved articles</p>
                <h2 className="userInfo__title">
                    {currentUser.name}, you have {dataCount} saved articles
                </h2>
                <p className="userInfo__keyword">
                    By keywords: <span className="userInfo__keyword_data">{keywordsText}</span>
                </p>
            </div>
        </div>
    )
}

export default UserInfo;