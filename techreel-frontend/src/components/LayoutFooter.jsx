import {Link} from 'react-router-dom'
const LayoutFooter=()=>{
    return (
        <footer className='footer'>
            <div className='footer_section'>
                <h3 className='footer_heading'>Site Information</h3>
                <ul>
                    <li><Link to='/about/'>About</Link></li>
                    <li><Link to='/sitemap/'>Sitemap</Link></li>
                </ul>
            </div>
            <div className='footer_section'>
                <h3 className='footer_heading'>Social Media</h3>
                <ul>
                    <li><a target='_blank' href='https://twitter.com/techreel_co'>Twitter</a></li>
                    <li><a target='_blank' href='https://facebook.com/techreel_co'>Facebook</a></li>
                    <li><a target='_blank' href='https://instagram.com/techreel_co'>Instagram</a></li>
                </ul>
            </div>
            <div className='footer_section'>
                <h3 className='footer_heading'>Policies</h3>
                <ul>
                    <li><Link to='/privacy-policy/'>Privacy policy</Link></li>
                    <li><Link to='/terms-of-use/'>Terms of use</Link></li>
                </ul>
            </div>
            <p className='footer_cp'> Copyright &copy; 2022 | techreel</p>
    </footer>
    )
}
export default LayoutFooter