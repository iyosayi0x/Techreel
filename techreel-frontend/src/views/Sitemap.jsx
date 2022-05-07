import {Helmet} from 'react-helmet-async'
import useGaTracker from '../hooks/useGaTracker'
import {Link} from 'react-router-dom'
import {Outlet} from 'react-router-dom'

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

            <main className='sitemap_container'>

                <section className='sitemap_links_wrapper'>
                    <div className='sitemap_link_shell'>
                        <Link to='/' className='sitemap_link'>Home</Link>
                    </div>
                    <div className='sitemap_link_shell'>
                        <Link to='articles/' className='sitemap_link'>Articles</Link>
                    </div>
                    <div className='sitemap_link_shell'>
                        <Link to='tags/' className='sitemap_link'>Tags</Link>
                    </div>
                    <div className='sitemap_link_shell'>
                        <Link to='/about/' className='sitemap_link'>About</Link>
                    </div>

                </section>

                <aside className='sitemap_page_wrapper'>
                    <Outlet/>
                </aside>

            </main>
        </div>
    )
}
export default Sitemap