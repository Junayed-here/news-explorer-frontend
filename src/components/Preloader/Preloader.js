import './Preloader.css';

function Preloader(props) {
    const {preloaderState} = props;
    preloaderState ? document.body.classList.add('fullScreen'):document.body.classList.remove('fullScreen');

    return (
        <>
            {
                preloaderState &&

                <div className="preloader_wrap">
                    <i className="circle-preloader"></i>
                </div>
            }
        </>

    );
}

export default Preloader;
