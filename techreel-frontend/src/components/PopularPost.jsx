import PopularPostCard from './PopularPostCard'

const PopularPosts=({popularPosts})=>{
    if (popularPosts.length <= 0) {
        return <></>
    }
    return (
        <section className='popularposts'>
            <h1>Popular posts</h1>
            <div className='popularposts_cards_container'>
                {
                    popularPosts.map(popularPost=>{
                        const {slug , title , thumbnail , id} = popularPost
                        return (<PopularPostCard slug={slug} title={title} thumbnail_url={thumbnail} key={id}/>)
                    })
                }
            </div>
        </section>
    )
}
export default PopularPosts