import {useEffect} from 'react-router-dom'
import ReactGA from 'react-ga4';

// Tracking id for google analytics
const MEASUREMENT_ID = ''
const useGaTracker=()=>{
    useEffect(() => {
        /*
            Initializing google analytics if href = techreel.co
        */
        if(window.location.host === 'techreel.co'){
            ReactGA.initialize(MEASUREMENT_ID);
            const current_page=window.location.pathname + window.location.search
            ReactGA.send({hitType:"pageview" , page:current_page})
        }
    }, []);
}

export default useGaTracker

export const useAnalyticsEventTracker = (category , action , label) => {
        ReactGA.event({category, action, label});
        return eventTracker;
}