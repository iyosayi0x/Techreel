import FeaturedPost from '../components/Featured'
import BlogPost from '../components/BlogPostCard'
import PopularPosts from '../components/PopularPost'
import {useState, useEffect} from 'react'
import axios from 'axios'

const Home=()=>{
    const API_URL = import.meta.env.VITE_API_URL
    const [featuredPosts , setFeaturedPosts] = useState([])
    const [popularPosts , setPopularPosts] = useState([])
    const [blogPosts , setBlogPosts] = useState([])
    const [blogPostNextUrl , setBlogPostNextUrl] = useState(null)
    const [loading , setLoading] = useState({
        blogPostLoading:false,
        blogPostNextLoading:false
    })

    /*
        This function is a reusable get request
    */
    const getRequest=async(api_url, setCallback)=>{
        try {
            const res = await axios.get(api_url)
            const data = await res.data
            setCallback(data)
        }catch(err){}
    }

    const getBlogPosts=async()=>{
        try {
            const res = await axios.get(`${API_URL}blog`)
            const data = await res.data
            setBlogPosts(data?.results)
            setBlogPostNextUrl(data?.next)
        }catch(err){}
    }

    const fetchMorePosts=async()=>{

        try {
            setLoading({...loading , blogPostNextLoading:true })
            const res = await axios.get(blogPostNextUrl)
            const data = await res.data
            setBlogPosts(prevPosts=>prevPosts.concat(data?.results))
            setBlogPostNextUrl(data?.next)
            setLoading({...loading , blogPostNextLoading:false })
        }catch(err){}
    }
    useEffect(()=>{
        getBlogPosts()
        getRequest(`${API_URL}blog/featured/`, setFeaturedPosts)
        getRequest(`${API_URL}blog/popular/`, setPopularPosts)
        document.title = "Latest updates in the world of tech - Techreel"
    },[])
    return (
        <div className='home_wrapper'>
                <section className='home_featured'>
                    {
                        featuredPosts.map(featuredPost =>{
                            const {thumbnail , slug , title , id} = featuredPost
                            return (<FeaturedPost thumbnail_url={thumbnail} slug={slug} article_title={title} key={id}/>)
                        })
                    }
                </section>
                <section className='home_blogposts'>
                    <PopularPosts popularPosts={popularPosts}/>
                    {
                        blogPosts.map(blogPost=>{
                            const {thumbnail , slug , title , id , exert, tags} = blogPost
                            return (<BlogPost
                                thumbnail_url={thumbnail}
                                exert={exert}
                                slug={slug}
                                title={title}
                                key={id}
                                tags={tags}
                                />
                                )
                        })
                    }
                </section>
                {blogPostNextUrl !==null && (
                    loading.blogPostNextLoading ? <small className='btn_loading_placeholder'>Loading ... </small> :
                    <button className='btn_primary' onClick={fetchMorePosts}>See More</button>
                )}
        </div>
    )
}

export default Home