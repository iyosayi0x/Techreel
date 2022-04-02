import {useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {useAnalyticsEventTracker} from '../hooks/useGaTracker'

const NewsLetter=({list_class})=>{
    /*
        Ga analytics event tracker
    */
    const evtTracker = useAnalyticsEventTracker('Newsletter')

    const API_URL = import.meta.env.VITE_API_URL
    const [showNewsLetter, setShowNewsLetter] = useState(false)
    const [email, setEmail] = useState('')
    const [isLoading , setIsLoading] = useState(false)
    const [message , setMessage] = useState({})

    const toggleVisibility=()=>{
        setShowNewsLetter(prevShowNewsLetter => !prevShowNewsLetter)
        setMessage({})
        evtTracker('newsletter form toggle')
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }
        const body = JSON.stringify({email})
        try {
            setIsLoading(true)
            evtTracker('user attempt newsletter signup')
            const res = await axios.post(`${API_URL}newsletter/signup/` , body , config)
            const message = await res.data
            setMessage(message)
        }catch(err){}finally{
            setEmail('')
            setIsLoading(false)
        }
    }


    return (
        <main className='news_letter'>
            <li className={list_class} onClick={toggleVisibility}>Join</li>
            {
                showNewsLetter && (
                    <>
                    <div className='news_letter_form_overlay' onClick={toggleVisibility}/>
                    <section className='news_letter_form_wrapper'>
                        <form onSubmit={handleSubmit}>
                            <p className='news_letter_bold_text'> Subscribe!</p>
                            <p className='news_letter_description'>Subsribe to our newsletter so you wont miss any updates on tech and best deals.</p>
                            <div className='news_letter_form_field'>

                                {message?.description?.success && <div className='message_success news_letter_message'>{message.description?.success}</div>}
                                {message?.description?.error && <div className='message_error news_letter_message'>{message.description?.error}</div>}

                                <div className='news_letter_label_wrapper'>
                                    <label htmlFor='email'>Email</label>
                                </div>

                                <input type='email'
                                name='email'
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                                required={true}
                                />
                                <br/>
                                {!isLoading && <input type='submit' value='Subsribe'/>}
                                {isLoading && <button className='news_letter_loading_btn'>Loading...</button>}
                            </div>
                            <p className='news_letter_footer'>By clicking “Subscribe” you agree to Techreel's <Link to='/privacy-policy/'>Privacy Policy</Link> and consent to Techreel using your contact data for newsletter purposes</p>
                        </form>
                    </section>
                    </>
                )
            }
        </main>
    )
}
export default NewsLetter