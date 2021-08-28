import './Header.css';

function Header(props) {
    const {nav, headerContent} = props;
    return (
        <header className="header">
            {
                nav
            }
            {
                headerContent
            }
        </header>
    );
}

export default Header;
