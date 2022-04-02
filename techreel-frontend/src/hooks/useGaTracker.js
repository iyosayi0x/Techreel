import {useEffect} from 'react'
import ReactGA from 'react-ga4';

// Tracking id for google analytics
const MEASUREMENT_ID = 'G-VGX2K261D5'
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

export const useAnalyticsEventTracker = (category) => {
        const eventTracker = (action,label='default') => {
                if(window.location.host === 'techreel.co'){
                    if(label){
                        ReactGA.event({category, action, label});
                    }else {
                        ReactGA.event({category, action});
                    }
                }
        }
        return eventTracker;
}
