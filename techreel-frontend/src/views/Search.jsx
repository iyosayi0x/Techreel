import {useLocation} from 'react-router-dom'
import {useState , useEffect} from 'react'
import BlogPost from '../components/BlogPostCard'
import axios from 'axios'
import BlogPostCardSkel from '../components/BlogPostCardSkel'
import EmptyState from '../components/EmptyState'
import {Helmet} from 'react-helmet-async'
import useGaTracker from '../hooks/useGaTracker'

const Search=()=>{
    const API_URL = import.meta.env.VITE_API_URL
    const {search} = useLocation()
    const searchParams = new URLSearchParams(search)
    const [isLoading , setIsLoading] = useState(false)
    const [searchNull , setSearchNull] = useState(false)
    const search_term = searchParams.get('q')

    const [queriedPosts , setQueriedPosts] = useState([])

    const postRequest=async(api_url, setCallback)=>{
        const controller = new AbortController()
        const config = {
            headers:{
                "Content-type":"application/json"
            },
            signal:controller.signal
        }
        const body = JSON.stringify({search_term})
        try {
            setIsLoading(true)
            setSearchNull(false)
            setQueriedPosts([])
            const res = await axios.post(api_url , body , config)
            const data = await res.data
            setCallback(data)
            if(data.length === 0){
                setSearchNull(true)
            }
            setIsLoading(false)
        }catch(err){
            setSearchNull(true)
        }
    }
    useEffect(()=>{
        const request = postRequest(`${API_URL}blog/search/`, setQueriedPosts)
        return ()=>{
            request.then(controller => controller.abort())
        }
    },[search])

    /*
        google analytics tracker
    */
        useGaTracker()

    if(searchNull && !isLoading){
        return <EmptyState parent_class='search'/>
    }

    return (
        <div className='search'>
            <Helmet>
                <title>Search filter - Techreel</title>
                <meta name='og:title' content='Search filter - Techreel'/>
                <meta name='description' content='Explore by filtering posts based on search'/>
            </Helmet>
            <div className='search_items_wrapper'>
                {isLoading && (
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
export default Search