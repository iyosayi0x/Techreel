import {Link , useNavigate} from 'react-router-dom'
import Logo from '../assets/svg/logo_white.svg'
import SearchIcon from '@mui/icons-material/Search'
import {Outlet} from 'react-router-dom'
import {useState} from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import Logo_blue from '../assets/svg/logo.svg'
import LayoutFooter from '../components/LayoutFooter'
import CloseIcon from '@mui/icons-material/Close'
import Nav from '../components/Nav'

const PrimaryLayout=()=>{
    const [showSearch , setShowSearch] = useState(false)
    const [searchValue , setSearchValue] = useState('')

    const [navClass , setNavClass] = useState('nav nav_hidden')

    const navigate = useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault()
        if (searchValue.trim() !==''){
            navigate(`/search?q=${searchValue}`)
            setSearchValue('')
            setShowSearch(false)
        }
    }
    return (
        <div className='primarylayout layout'>
            <header className='primarylayout_header'>
                <section className='primarylayout_header_toolbar'>
                    <Link to='/'>
                        <img src={Logo} alt='techreel logo' className='primarylayout_logo'/>
                    </Link>
                </section>
                <Nav/>
            </header>
            <Outlet/>
            <LayoutFooter/>
        </div>
    )
}
export default PrimaryLayout