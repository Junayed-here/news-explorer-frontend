import './UserInfo.css';

function UserInfo() {
    return(
        <div className="userInfo">
            <div className="container">
                <p className="userInfo__subtitle">Saved articles</p>
                <h2 className="userInfo__title">
                    Elise, you have 5 saved articles
                </h2>
                <p className="userInfo__keyword">
                    By keywords: <span className="userInfo__keyword_data">Nature, Yellowstone, and 2 other</span>
                </p>
            </div>
        </div>
    )
}

export default UserInfo;