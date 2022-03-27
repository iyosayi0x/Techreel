import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NotFound from './NotFound'

const Article=()=>{
    const API_URL = import.meta.env.VITE_API_URL
    const {article_slug} = useParams()
    const [post , setPost] = useState({})
    const [isLoading , setIsLoading]  = useState(false)
    const [error404 , setError404] = useState(false)
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
            document.title=`${data?.title} -Techreel`
        }catch(err){
            setError404(true)
        }
    }
    useEffect(()=>{
        getRequest(`${API_URL}blog/${article_slug}/`, setPost)
    },[])


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
            <h1 className='article_title'>{post?.title}</h1>
            <div className='article_detail'>
                <p className='article_author'>iyosayi</p>
                <p className='article_date'>June first 2020</p>
            </div>
            <img className='article_thumbnail' src={post?.thumbnail} alt='Article Thumbnail'/>
            <section className='article_content' dangerouslySetInnerHTML={createMarkup()}/>
        </div>
    )
}
export default Article