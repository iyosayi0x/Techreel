import {useParams} from 'react-router-dom'
import {useState , useEffect} from 'react'
import BlogPost from '../components/BlogPostCard'
import axios from 'axios'
import BlogPostCardSkel , {TextSkel} from '../components/BlogPostCardSkel'
import EmptyState from '../components/EmptyState'
import {Helmet} from 'react-helmet-async'
import useGaTracker from '../hooks/useGaTracker'

const Tag=()=>{
    const API_URL = import.meta.env.VITE_API_URL
    const {tag} = useParams()
    const [queriedPosts , setQueriedPosts] = useState([])
    const [tagEmpty , setTagEmpty] = useState(false)
    const [isLoading , setIsLoading] = useState(false)

    const postRequest=async(api_url, setCallback)=>{
        const controller = new AbortController()
        const config = {
            headers:{
                "Content-type":"application/json"
            },
            signal: controller.signal
        }
        const body = JSON.stringify({tag})
        try {
            setIsLoading(true)
            setTagEmpty(false)
            setQueriedPosts([])
            const res = await axios.post(api_url , body , config)
            const data = await res.data
            setCallback(data)
            if(data.length === 0){
                setTagEmpty(true)
            }
            setIsLoading(false)
        }catch(err){
            setIsLoading(false)
            setTagEmpty(true)
        }
        return controller
    }
    useEffect(()=>{
        const request = postRequest(`${API_URL}blog/tag/`, setQueriedPosts)
        return ()=>{
            request.then(request.then(controller =>controller.abort()))
        }
    },[tag])

    /*
        google analytics tracker
    */
    useGaTracker()

    if(tagEmpty && !isLoading){
        return <EmptyState parent_class='tag'/>
    }

    return (
        <div className='tag'>

            <Helmet>
                <title>Tag Explore - {tag}</title>
                <meta name='og:title' content='Tag Explore'/>
                <meta name='description' content='Explore posts based on tag filter'/>
            </Helmet>

            {!isLoading && <h1>{tag}</h1>}
            {isLoading && <TextSkel/>}
            <div className='tag_items_wrapper'>
                {isLoading &&(
                    <>
                        <BlogPostCardSkel/>
                        <BlogPostCardSkel/>
                        <BlogPostCardSkel/>
                        <BlogPostCardSkel/>
                    </>
                )}
            {
                queriedPosts.map(queriedPost=>{
                    const {thumbnail , slug , title , id , exert, tags} = queriedPost
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
            </div>
        </div>
    )
}
export default Tag