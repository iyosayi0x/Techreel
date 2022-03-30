import {Link} from 'react-router-dom'

const PopularPostCard=({slug , title , thumbnail_url})=>{
    return (
        <Link to={slug} className='card_posturl'>
        <div className='card_wrapper'>
                <p className='card_title'>{title}</p>
                <img className='card_thumbnail' src={thumbnail_url} alt='Article thumbnail'/>
        </div>
        </Link>
    )
}
export default PopularPostCard