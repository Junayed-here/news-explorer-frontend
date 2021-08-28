import githubIcon from '../../images/github.svg';
import facebookIcon from '../../images/facebook.svg';
import './Footer.css';

function App() {
  return (
      <footer className="footer">
          <div className="container">
              <div className="footer__content">
                  <p className="footer__copyright_text">
                      &copy; 2021 Supersite, Powered by News API
                  </p>
                  <div className="footer__links_box">
                      <ul className="footer__menu">
                          <li className="footer__menu_item">
                              <a href="/" className="footer__menu_link">Home</a>
                          </li>
                          <li className="footer__menu_item">
                              <a href="/" className="footer__menu_link">Practicum by Yandex</a>
                          </li>
                      </ul>
                      <ul className="footer__social_links">
                          <li className="footer__social_link_item">
                              <a href="/" className="footer__social_link">
                                  <img src={githubIcon} alt="Github profile"/>
                              </a>
                          </li>
                          <li className="footer__social_link_item">
                              <a href="/" className="footer__social_link">
                                  <img src={facebookIcon} alt="Facebook profile"/>
                              </a>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
      </footer>
  );
}

export default App;
