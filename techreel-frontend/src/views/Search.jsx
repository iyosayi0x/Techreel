import {useLocation} from 'react-router-dom'
import {useState , useEffect} from 'react'
import BlogPost from '../components/BlogPostCard'
import axios from 'axios'

const Search=()=>{
    const API_URL = import.meta.env.VITE_API_URL
    const {search} = useLocation()
    const searchParams = new URLSearchParams(search)
    const search_term = searchParams.get('q')

    const [queriedPosts , setQueriedPosts] = useState([])

    const postRequest=async(api_url, setCallback)=>{
        const config = {
            headers:{
                "Content-type":"application/json"
            }
        }
        const body = JSON.stringify({search_term})
        try {
            const res = await axios.post(api_url , body , config)
            const data = await res.data
            setCallback(data)
        }catch(err){}
    }
    useEffect(()=>{
        postRequest(`${API_URL}blog/search/`, setQueriedPosts)
    },[])

    return (
        <div className='search'>
            <div className='search_items_wrapper'>
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
export default Search