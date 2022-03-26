import {Link} from 'react-router-dom'

const BlogPostCard=({exert , thumbnail_url , title , tags,slug})=>{
    return (
        <article className='blogpostcard'>
            <Link to={`/${slug}/`} className='blogpostcard_link'>
                <img className='blogpostcard_thumbnail' src={thumbnail_url} alt='Article thumbnail'/>
                <h2 className='blogpostcard_title'>{title}</h2>
                <div className='blogpostcard_tags_containter'>
                    {
                        tags.map(tag => <p className='blogpostcard_tag' key={tag}>{tag}</p>)
                    }
                </div>
                <p className="blogpostcard_exert">
                    {exert}
                </p>
            </Link>
        </article>
    )
}
export default BlogPostCard