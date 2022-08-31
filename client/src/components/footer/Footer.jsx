import React from "react";
import './footer.css';

function Footer(){
    return (
        <div className="footerContainer">
            <div className="socialMedia">
                <h1>Social Media</h1>
                <p className="textSocial">
                    lksdf  j flsd fjdsflkhukl jflkjsd fjkhs ljk ksdfj kj fdsk jskjf sjf kj sdflhsufhekjf <datagrid>fs dlkjf l fk sdfjdsf</datagrid>
                </p>
                <div className="phone">
                    <img src="/assets/images/telephone.png" alt="" className="icons" />
                    <span>06-65-80-06-74</span>
                </div>
                <div className="email">
                    <img src="/assets/images/gmail.png" alt="" className="icons" />
                    <span>medsaad608@gmail.com</span>
                </div>
                <div className="sodialMediaIcons">
                    <img src="/assets/images/fb.png" alt="" className="icons" />
                    <img src="/assets/images/instagram.png" alt="" className="icons" />
                    <img src="/assets/images/twitter.png" alt="" className="icons" />
                    <img src="/assets/images/youtube.png" alt="" className="icons" />
                </div>
            </div>
            <div className="links">
                <h1>Links</h1>
                <ul className="linksList">
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                </ul>
            </div>
            <div className="contactUs">
                <h1>Contact Us</h1>
                <form action="" className="form">
                    <input name="" className="input" placeholder="Your email address" type="text" />
                    <textarea name="" className="textArea" placeholder="Message" id="" cols="30" rows="10"></textarea>
                    <button className="subimt">submit</button>
                </form>
            </div>
        </div>
    )
}
export default Footer;