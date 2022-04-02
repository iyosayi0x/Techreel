import {Helmet} from 'react-helmet-async'
import useGaTracker from '../hooks/useGaTracker'
import {Link} from 'react-router-dom'

const Sitemap=()=>{
    /*
        google analytics tracker
    */
    useGaTracker()
    return (
        <div className='sitemap'>
            <Helmet>
                <title>Sitemap - Techreel</title>
                <meta name='og:title' content='Sitemap -Techreel'/>
                <meta name='description' content='Explore techreel by using our sitemap to browse through all our content'/>
            </Helmet>
            <h1 className='sitemap_header'>Sitemap</h1>
            <section className='sitemap_links_wrapper'>

                <div className='sitemap_link_shell'>
                    <Link to='/' className='sitemap_link'>Home</Link>
                </div>
                <div className='sitemap_link_shell'>
                    <Link to='/about/' className='sitemap_link'>About</Link>
                </div>
                <div className='sitemap_link_shell'>
                    <Link to='/tags/' className='sitemap_link'>Tags</Link>
                </div>

            </section>
        </div>
    )
}
export default Sitemap