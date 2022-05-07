import {Link} from 'react-router-dom'
import Logo from '../assets/svg/logo_white.svg'
import {Outlet} from 'react-router-dom'
import LayoutFooter from '../components/LayoutFooter'
import Nav from '../components/Nav'

const PrimaryLayout=()=>{
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