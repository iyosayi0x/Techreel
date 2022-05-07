import {Outlet} from 'react-router-dom'
import LayoutFooter from '../components/LayoutFooter'
import Nav from '../components/NavSecondary'

const SeconadaryLayout=()=>{
    return (
        <div className='secondarylayout layout'>
            <Nav/>
            <Outlet/>
            <LayoutFooter/>
        </div>
    )
}
export default SeconadaryLayout