
import empty_state from '../assets/svg/empty_state.svg'
const EmptyState=({parent_class})=>{
    return (
        <div className={parent_class}>
        <img src={empty_state} alt='No content found' className='empty_state_image'/>
        <section className='empty_state_message'>
            <p>
                No results found
            </p>
        </section>
    </div>
    )
}
export default EmptyState