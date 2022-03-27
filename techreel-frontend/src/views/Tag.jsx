import {useParams} from 'react-router-dom'
import {useState , useEffect} from 'react'
import BlogPost from '../components/BlogPostCard'
import axios from 'axios'
import empty_state from '../assets/svg/empty_state.svg'
import BlogPostCardSkel , {TextSkel} from '../components/BlogPostCardSkel'

const Tag=()=>{
    const API_URL = import.meta.env.VITE_API_URL
    const {tag} = useParams()
    const [queriedPosts , setQueriedPosts] = useState([])
    const [tagEmpty , setTagEmpty] = useState(false)
    const [isLoading , setIsLoading] = useState(false)

    const postRequest=async(api_url, setCallback)=>{
        const config = {
            headers:{
                "Content-type":"application/json"
            }
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
    }
    useEffect(()=>{
        postRequest(`${API_URL}blog/tag/`, setQueriedPosts)
    },[tag])

    if(tagEmpty && !isLoading){
        return (
            <div className='tag'>
                <img src={empty_state} alt='No content found' className='empty_state_image'/>
                <section className='empty_state_message'>
                    <p>Sorry we could not find any posts</p>
                </section>
            </div>
        )
    }

    return (
        <div className='tag'>
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