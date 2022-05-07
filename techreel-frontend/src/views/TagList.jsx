import {Link} from 'react-router-dom'
const TagList=()=>{
    return (
        <section className='sitemap_page'>
            <p className='sitemap_page_name'>Tags</p>
            <ul className='sitemap_page_link_list'>
                <li className='sitemap_page_link_item'>
                    <Link to='/tag/tech/'>Tech</Link>
                </li>
                <li className='sitemap_page_link_item'>
                    <Link to='/tag/programming/'>Programming</Link>
                </li>
                <li className='sitemap_page_link_item'>
                    <Link to='/tag/reviews/'>Reviews</Link>
                </li>
                <li className='sitemap_page_link_item'>
                    <Link to='/tag/phones/'>Phones</Link>
                </li>
                <li className='sitemap_page_link_item'>
                    <Link to='/tag/laptops/'>Laptops</Link>
                </li>
            </ul>
        </section>
    )
}
export default TagList