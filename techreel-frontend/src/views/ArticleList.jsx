import {useEffect , useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const ArticleList = () => {
    const API_URL = import.meta.env.VITE_API_URL
    const [urls , setUrls] = useState([])
    const [loading , setLoading] = useState(false)

    const getRequest=async(api_url, setCallback)=>{
        const controller = new AbortController()
        try {
            setLoading(true)
            const res = await axios.get(api_url , {signal:controller.signal})
            const data = await res.data
            setCallback(data)
            setLoading(false)
        }catch(err){}
        return controller
    }

    useEffect(()=>{
        const getRqst = getRequest(`${API_URL}blog/sitemap/blogposts/` , setUrls)
        return ()=>{
            getRqst.then(controller => controller.abort())
        }
    },[])

    return (
        <section className='sitemap_page'>
            <p className='sitemap_page_name'>Articles</p>
            <ul className='sitemap_page_link_list'>
                {
                    loading && <p>working on it ...</p>
                }
                {
                    urls.map(url=>{
                        const {slug , id , title} = url
                        return (
                        <li className='sitemap_page_link_item' key={id}>
                            <Link to={`/${slug}/`}>{title}</Link>
                        </li>
                        )

                    })
                }
            </ul>
        </section>
    )
}

export default ArticleList