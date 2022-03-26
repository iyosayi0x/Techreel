import {useParams} from 'react-router-dom'
import {useState , useEffect} from 'react'
import BlogPost from '../components/BlogPostCard'
import axios from 'axios'
import empty_state from '../assets/svg/empty_state.svg'

const Tag=()=>{
    const API_URL = import.meta.env.VITE_API_URL
    const {tag} = useParams()
    const [queriedPosts , setQueriedPosts] = useState([])
    const [postTag, setPostTag] = useState('')
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
            const res = await axios.post(api_url , body , config)
            const data = await res.data
            setCallback(data)
            setPostTag(tag)
            if(data.length === 0){
                setTagEmpty(true)
            }
            setIsLoading(false)
        }catch(err){}
    }
    useEffect(()=>{
        postRequest(`${API_URL}blog/tag/`, setQueriedPosts)
    },[tag])

    if(tagEmpty && !isLoading){
        return (
            <div className='tag'>
                <img src={empty_state} alt='No content found' className='tag_empty_state_image'/>
                <section className='tag_empty_state_message'>
                    <p>Sorry we could not find any posts</p>
                </section>
            </div>
        )
    }

    return (
        <div className='tag'>
            <h1>{postTag}</h1>
            <div className='tag_items_wrapper'>
            {
                queriedPosts.map(queriedPost=>{
                    const {thumbnail , slug , title , id , exert, tags} = queriedPost
                    console.log('yes')
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