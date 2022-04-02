import {useEffect} from 'react-router-dom'
import ReactGA from 'react-ga';

// Tracking id for google analytics
const TRACKING_ID = ''
const useGaTracker=()=>{
    useEffect(() => {
        /*
            Initializing google analytics if href = techreel.co
        */
        if(window.location.host === 'techreel.co'){
            ReactGA.initialize(TRACKING_ID);
            ReactGA.pageview(window.location.pathname + window.location.search);
        }
    }, []);
}

export default useGaTracker

export const useAnalyticsEventTracker = (category , action , label) => {
        ReactGA.event({category, action, label});
        return eventTracker;
}