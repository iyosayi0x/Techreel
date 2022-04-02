import FeaturedPost from '../components/Featured'
import BlogPost from '../components/BlogPostCard'
import PopularPosts from '../components/PopularPost'
import {useState, useEffect} from 'react'
import axios from 'axios'
import BlogPostCardSkel , {PopularPostSkel , FeaturedPostSkel} from '../components/BlogPostCardSkel'
import {Helmet} from 'react-helmet-async'

const Home=()=>{
    // Backend api url
    const API_URL = import.meta.env.VITE_API_URL

    /*
        Data to map over ,
        featured posts
        popular posts
        blog posts
    */
    const [featuredPosts , setFeaturedPosts] = useState([])
    const [popularPosts , setPopularPosts] = useState([])
    const [blogPosts , setBlogPosts] = useState([])

    const [blogPostNextUrl , setBlogPostNextUrl] = useState(null)

    /*
        loading state for components
    */
    const [loading , setLoading] = useState({
        blogPostLoading:false,
        popularPostLoading:false,
        featuredPostLoading:false,
        blogPostNextLoading:false
    })

    /*
        This function is a reusable get request ,
        for popular and featured posts
    */
    const getRequest=async(api_url, setCallback , loadingState)=>{
        try {
            setLoading(prevLoading =>({...prevLoading, [loadingState]:true}))
            const res = await axios.get(api_url)
            const data = await res.data
            setCallback(data)
            setLoading(prevLoading => ({...prevLoading , [loadingState]:false }))
        }catch(err){}
    }

    /*
        Custom get request for blog Posts
    */
    const getBlogPosts=async()=>{
        try {(
            setLoading(prevLoading => ({...prevLoading , 'blogPostLoading':true})))
            const res = await axios.get(`${API_URL}blog`)
            const data = await res.data
            setBlogPosts(data?.results)
            setBlogPostNextUrl(data?.next)
            setLoading(prevLoading => ({...prevLoading ,'blogPostLoading':false}))
        }catch(err){}
    }

    /*
        used to fetch more posts
    */
    const fetchMorePosts=async()=>{
        try {
            setLoading(prevLoading => ({...prevLoading , blogPostNextLoading:true }))
            const res = await axios.get(blogPostNextUrl)
            const data = await res.data
            setBlogPosts(prevPosts=>prevPosts.concat(data?.results))
            setBlogPostNextUrl(data?.next)
            setLoading(prevLoading => ({...prevLoading , blogPostNextLoading:false }))
        }catch(err){}
    }

    /*
        When the component mounts
        make http requests
    */
    useEffect(()=>{
        getRequest(`${API_URL}blog/featured/`, setFeaturedPosts , 'featuredPostLoading')
        getRequest(`${API_URL}blog/popular/`, setPopularPosts , 'popularPostLoading')
        getBlogPosts()
        // document.title = "Latest updates in the world of tech - Techreel"
    },[])

    return (
        <div className='home_wrapper'>

        <Helmet prioritizeSeoTags>
            <title>Latest updated in the world of tech - Techreel</title>
            <meta name='description' content='Get the latest updates in tech and best deals on new gadgets , laptop, phones , updates in the world of programming and lots more'/>
            <meta name='keywords' content='Tech , Technology , Programming , Phones , Laptops , Tv , Gadgets , Deals'/>
            <meta property="og:title" content='Latest updated in the world of tech - Techreel'/>
            <meta property="og:description" content='Get the latest updates in tech and best deals on new gadgets , laptop, phones , updates in the world of programming and lots more'/>
        </Helmet>

                {
                    !loading.featuredPostLoading  && <section className='home_featured'>
                                    {
                                        featuredPosts.map(featuredPost =>{
                                            const {thumbnail , slug , title , id} = featuredPost
                                            return (<FeaturedPost thumbnail_url={thumbnail} slug={slug} article_title={title} key={id}/>)
                                        })
                                    }
                                </section>
                }

                {
                    loading.featuredPostLoading && <section className='home_featured skel_featured'>
                            <FeaturedPostSkel/>
                            <FeaturedPostSkel/>
                            <FeaturedPostSkel/>
                    </section>
                }

                <section className='home_blogposts'>
                    {
                        !loading.popularPostLoading && (<PopularPosts popularPosts={popularPosts}/>)
                    }

                    {
                        loading.popularPostLoading &&   <div className='popularposts'>
                                <PopularPostSkel/>
                                <PopularPostSkel/>
                                <PopularPostSkel/>
                            </div>
                    }

                    {
                        loading.blogPostLoading && (
                            <>
                                <BlogPostCardSkel/>
                                <BlogPostCardSkel/>
                                <BlogPostCardSkel/>
                                <BlogPostCardSkel/>
                                <BlogPostCardSkel/>
                            </>
                        )
                    }

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