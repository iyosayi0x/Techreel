import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import PrimaryLayout from "./hocs/PrimaryLayout"
import Home from "./views/Home"
import Article from './views/Article'
import Sitemap from './views/Sitemap'
import NotFound from './views/NotFound'
import About from './views/About'
import Search from './views/Search'
import SecondaryLayout from './hocs/SecondaryLayout'
import PrivacyPolicy from "./views/PrivacyPolicy"
import TermsOfUse from "./views/TermsOfUse"
import Tag from './views/Tag'
import TagList from './views/TagList'
import UseScrollTop from './hooks/useScrollTop'

function App() {
  return (
      <Router>
        <UseScrollTop/>
        <Routes>
          <Route element={<PrimaryLayout/>} path='/'>
            <Route index element={<Home/>}/>
          </Route>
          <Route element={<SecondaryLayout/>} path='/'>
            <Route element={<Sitemap/>} path='sitemap/'/>
            <Route element={<About/>} path='about/'/>
            <Route element={<Search/>} path='search/'/>
            <Route element={<PrivacyPolicy/>} path='privacy-policy'/>
            <Route element={<TermsOfUse/>} path='terms-of-use'/>
            <Route element={<TagList/>} path='sitemap/tags/'/>
            <Route element={<Tag/>} path='tag/:tag'/>
            <Route element={<Article/>} path=':article_slug'/>
            <Route element={<NotFound/>} path='*'/>
          </Route>
        </Routes>
      </Router>
  )
}
export default App
