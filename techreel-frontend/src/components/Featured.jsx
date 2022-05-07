import {Link} from 'react-router-dom'

const Featured=({thumbnail_url , article_title , slug})=>{
    return (
        <div className='featuredpost'>
                <img src={thumbnail_url} alt='Article thumbnail'/>
                <Link to={slug} className='featuredpost_link'>
                    <div className='thumbnail_overlay'>
                        <h1>{article_title}</h1>
                    </div>
                </Link>
        </div>
    )
}
export default Featured