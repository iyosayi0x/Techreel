import {Link, useNavigate} from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import {useState} from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import Logo_blue from '../assets/svg/logo.svg'
import CloseIcon from '@mui/icons-material/Close'
import NewsLetter from './NewsLetter'

const Nav=()=>{
    const [navClass , setNavClass] = useState('nav nav_hidden')
    const [showSearch , setShowSearch] = useState(false)
    const navigate = useNavigate()
    const [searchValue , setSearchValue] = useState('')

    const handleSubmit=(e)=>{
        e.preventDefault()
        if (searchValue.trim() !==''){
            navigate(`/search?q=${searchValue}`)
            setSearchValue('')
            setShowSearch(false)
        }
    }
    return (
        <>
            {
                showSearch && (
                <div className='searchbar'>
                    <form onSubmit={handleSubmit}>
                        <input type='search' placeholder='Search for something...' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}/><button>Go</button>
                    </form>
                    <div className='primarylayout_searchOverlay' onClick={()=>setShowSearch(false)}/>
                </div>
                )
            }

            <div className='layout_menu' onClick={()=>setNavClass('nav')}>
                    <MenuIcon/>
                </div>
            <nav className={navClass}>

                <div className='nav_header_small'>
                    <Link  to='/'>
                        <img src={Logo_blue} alt='Techreel Logo' className='primarylayout_logo_blue'/>
                    </Link>
                    <CloseIcon onClick={()=>setNavClass('nav nav_hidden')}/>
                </div>

                <ul className='nav_primary'>
                    <li className='nav_listitem'>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className='nav_listitem'>
                        <Link to='/tag/tech/'>Tech</Link>
                    </li>
                    <li className='nav_listitem'>
                        <Link to='/tag/phones/'>Phones</Link>
                    </li>
                    <li className='nav_listitem'>
                        <Link to='/tag/programming/'>Programming</Link>
                    </li>
                    <li className='nav_listitem'>
                        <Link to='/tag/reviews/'>Reviews</Link>
                    </li>
                    <NewsLetter list_class='nav_btn_primary'/>
                    <div className='icon_wrapper_trans' onClick={()=>setShowSearch(true)}>
                        <SearchIcon/>
                    </div>
                </ul>

                <ul className='nav_footer_small'>
                    <li className='nav_listitem'>
                        <Link to='/about/'>About</Link>
                    </li>
                    <li className='nav_listitem'>
                        <Link to='/sitemap'>Sitemap</Link>
                    </li>
                    <li className='nav_listitem'>
                        <Link to='/privacy-policy'>Privacy policy</Link>
                    </li>
                    <li className='nav_listitem'>
                        <Link to='/terms-of-use/'>Terms of use</Link>
                    </li>
                </ul>

            </nav>
        </>
    )
}
export default Nav