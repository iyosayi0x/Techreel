import axios from 'axios'
import { useParams , Link} from 'react-router-dom'
import { useState, useEffect } from 'react'
import NotFound from './NotFound'
import {Helmet} from 'react-helmet-async'
import {useGaTrackerConditional} from '../hooks/useGaTracker'
import BlogPostCard from '../components/BlogPostCard'
import BlogPostCardSkel from '../components/BlogPostCardSkel'
import ArrowLeft from '@mui/icons-material/ArrowRightAlt'

const Article=()=>{
    const API_URL = import.meta.env.VITE_API_URL
    const {article_slug} = useParams()
    const [post , setPost] = useState({})
    const [isLoading , setIsLoading]  = useState(false)
    const [error404 , setError404] = useState(false)
    const track = useGaTrackerConditional()
    /*
        for similar posts
    */
    const [similarPostsLoading, setSimilarPostsLoading]=useState(true)
    const [similarPosts , setSimilarPosts]= useState([])


    const getSimilarPost=async(tags)=>{
        const controller = new AbortController()
        const Config ={
            headers:{
                "Content-type":'application/json'
            },
            signal:controller.signal
        }
        const body= JSON.stringify({tags})
        try {
            setSimilarPostsLoading(true)
            const res = await axios.post(`${API_URL}blog/similar/` , body , Config)
            const data = await res.data
            setSimilarPostsLoading(false)
            setSimilarPosts(data)
            // start getReqeust for similar post
        }catch(err){}
        finally{
            controller.abort()
        }
    }

    /*
        getRequest function , get data for post
    */
    const getRequest=async(api_url, setCallback)=>{
        const controller = new AbortController()
        try {
            setError404(false)
            setIsLoading(true)
            const res = await axios.get(api_url , {signal:controller.signal})
            const data = await res.data
            setCallback(data)
            setIsLoading(false)
            track(`${window.location.pathname}/${data.slug}`)
            // start getReqeust for similar post
            getSimilarPost(data.tags)
            return controller

        }catch(err){
            setError404(true)
        }
        finally {
            controller.abort()
        }
        return controller
    }

    /*
        sends get request on initial render
    */
    useEffect(()=>{
        const gtRqst = getRequest(`${API_URL}blog/${article_slug}/`, setPost)
        return ()=>{
            gtRqst.then(controller =>controller.abort())
        }
    },[article_slug])


    /*
        google analytics tracker
    */
    // useEffect(()=>{
    //     if(isLoading === false && error404===false){
    //         track()
    //     }
    // },[isLoading, error404])

    /*
        setsInnerHtml of container with martkup
    */
    const createMarkup=()=> {
        return {__html: post?.content}
    }

    /*
        Shows this if page is not found...
    */
    if(error404){
        return <NotFound/>
    }

    /*
        shows this if data is loading ..
    */
    if(isLoading){
        return <div className='article_wrapper'>
            <p>Working on it...</p>
        </div>
    }

    return (
        <div className='article_wrapper'>

            {
                !isLoading &&  <Helmet>
                    <title>{`${post?.title}`} - Techreel</title>
                    <meta name='description' content={`${post?.exert}`}/>
                    <meta property="og:title" content={`${post?.title}`}/>
                    <meta property="og:description" content={`${post?.exert}`}/>
                    <meta property="og:image" content={`${post?.thumbnail}`}/>
                    <meta property="og:type" content="article" />
                    <meta name="twitter:card" content="summary" />
                    <meta name="twitter:site" content="@techreel_co" />
                    <meta name="twitter:creator" content={`${post?.author?.twitter_handle || '@iyosayi18'}`} />
                </Helmet>
            }

            <h1 className='article_title'>{post?.title}</h1>
            <div className='article_detail'>
                <p className='article_author'>{post?.author?.name}</p>
                <p className='article_date'>{post?.date_created}</p>
            </div>
            <img className='article_thumbnail' src={post?.thumbnail} alt='Article Thumbnail'/>
            <section className='article_content' dangerouslySetInnerHTML={createMarkup()}/>

            <div className='article_footer'>
                <p className='article_home_link_container'>
                    <Link to='/'>Back to home <ArrowLeft/></Link>
                </p>
                <div className='article_similarPosts'>
                        <p className='article_similarPosts_header'>Similar posts</p>
                        <div className='article_similarPosts_grid'>

                            {
                                similarPostsLoading && (
                                    <>
                                        <BlogPostCardSkel/>
                                        <BlogPostCardSkel/>
                                        <BlogPostCardSkel/>
                                    </>
                                )
                            }

                            {
                                similarPosts.map(post =>{
                                    const {id , slug , exert , tags , title , thumbnail} = post
                                    return <BlogPostCard
                                        key={id}
                                        exert = {`${exert.slice(0,120)}...`}
                                        title = {title}
                                        slug={slug}
                                        thumbnail_url={thumbnail}
                                        tags={tags}
                                    />
                                })
                            }

                        </div>
                </div>
            </div>

        </div>
    )
}
export default Article
