import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import {Helmet} from 'react-helmet'

const About=()=>{
    return (
        <div className='about'>
            <Helmet>
                <title>About Techreel - Techreel</title>
                <meta name='description' content='About techreel'/>
            </Helmet>
            <h1 className='about_header'>About Us</h1>
            <div className='about_section'>
                <p>
                    Techreel is Dedicated to providing you with the latest updates in the tech space , info on the world of developers , latest new tech , best deals on phones , laptops and other tech gadgets.
                </p>
                <p>
                    For support contact us at support@techreel.co
                </p>
                <div className='about_socials'>
                Get in touch with us:
                    <ul>
                        <li><a target='_blank' href='https://twitter.com/techreel_co'><TwitterIcon />Twitter</a></li>
                        <li><a target='_blank' href='https://facebook.com/techreel_co'><FacebookIcon/>Facebook</a></li>
                        <li><a target='_blank' href='https://instagram.com/techreel_co'><InstagramIcon/>Instagram</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default About