import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NotFound from './NotFound'
import {Helmet} from 'react-helmet-async'
import {useGaTrackerConditional} from '../hooks/useGaTracker'

const Article=()=>{
    const API_URL = import.meta.env.VITE_API_URL
    const {article_slug} = useParams()
    const [post , setPost] = useState({})
    const [isLoading , setIsLoading]  = useState(false)
    const [error404 , setError404] = useState(false)
    const track = useGaTrackerConditional()
    /*
        sends a get Request to the backend
        gets the post content
    */
    const getRequest=async(api_url, setCallback)=>{
        try {
            setError404(false)
            setIsLoading(true)
            const res = await axios.get(api_url)
            const data = await res.data
            setCallback(data)
            setIsLoading(false)
        }catch(err){
            setError404(true)
        }
    }
    useEffect(()=>{
        getRequest(`${API_URL}blog/${article_slug}/`, setPost)
    },[])


    /*
        google analytics tracker
    */
    useEffect(()=>{
        if(isLoading === false && error404===false){
            track()
        }
    },[isLoading, error404])

    const createMarkup=()=> {
        return {__html: post?.content}
    }

    if(error404){
        return <NotFound/>
    }
    if(isLoading){
        return <div className='article_wrapper'>
            <p>Working on it...</p>
        </div>
    }

    return (
        <div className='article_wrapper'>
            <Helmet>
                <title>{`${post?.title}`} - Techreel</title>
                <meta name='description' content={`${post?.exert}`}/>
                <meta property="og:title" content={`${post?.title}`}/>
                <meta property="og:description" content={`${post?.exert}`}/>
                <meta property="og:image" content={`${post?.thumbnail}`}/>
                <meta property="og:type" content="article" />
            </Helmet>
            <h1 className='article_title'>{post?.title}</h1>
            <div className='article_detail'>
                <p className='article_author'>{post?.author}</p>
                <p className='article_date'>{post?.date_created}</p>
            </div>
            <img className='article_thumbnail' src={post?.thumbnail} alt='Article Thumbnail'/>
            <section className='article_content' dangerouslySetInnerHTML={createMarkup()}/>
        </div>
    )
}
export default Article