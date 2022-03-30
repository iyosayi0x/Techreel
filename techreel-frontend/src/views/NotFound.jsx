import notfound_svg from '../assets/svg/notfound.svg'
import {Link} from 'react-router-dom'
import ArrowLeft from '@mui/icons-material/ArrowRightAlt'
import {Helmet} from 'react-helmet'

const NotFound=()=>{
    return (
        <div className='notfound'>
            <Helmet>
                <title>404 Notfound - Techreel</title>
                <meta name='description' content='404 page not found'/>
            </Helmet>
            <div className='notfound_infowrapper'>
                <h1>PAGE NOT FOUND</h1>
                <p>Sorry the page you're looking for could not be found :(</p>
            </div>
            <img src={notfound_svg} alt='404 image' className='notfound_image'/>
            <div className='notfound_linkwrapper'>
                <Link to='/'>Back to home<ArrowLeft/></Link>
            </div>
        </div>
    )
}
export default NotFound