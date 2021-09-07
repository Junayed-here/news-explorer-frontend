import authorImage from '../../images/author_image.png';
import './About.css';

function About() {
    return (
        <section className="about">
            <div className="container">
                <div className="about__content">
                    <div className="about__image_box">
                        <img src={authorImage} alt="Author" className="about__image"/>
                    </div>
                    <div className="about__info_box">
                        <h2 className="about__title">
                            About the author
                        </h2>
                        <p className="about__text">
                            This block describes the project author. Here you should indicate your name, what you do, and which development technologies you know.
                        </p>
                        <p className="about__text">
                            You can also talk about your experience with Practicum, what you learned there, and how you can help potential customers.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
