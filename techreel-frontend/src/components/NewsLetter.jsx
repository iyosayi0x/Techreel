import {useState} from 'react'
import axios from 'axios'

const NewsLetter=({list_class})=>{
    const API_URL = import.meta.env.VITE_API_URL
    const [showNewsLetter, setShowNewsLetter] = useState(false)
    const [email, setEmail] = useState('')
    const [isLoading , setIsLoading] = useState(false)
    const [message , setMessage] = useState({})

    const toggleVisibility=()=>{
        setShowNewsLetter(prevShowNewsLetter => !prevShowNewsLetter)
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
            const res = await axios.post(`${API_URL}newsletter/signup/` , body , config)
            const message = await res.data
            setMessage(message)
            setIsLoading(false)
        }catch(err){
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
                            Sign up for the newsletter
                            <div className='news_letter_form_field'>
                                <label htmlFor='email'>Email</label>
                                <input type='email'
                                name='email'
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                                required={true}
                                />
                            </div>
                        </form>
                    </section>
                    </>
                )
            }
        </main>
    )
}
export default NewsLetter