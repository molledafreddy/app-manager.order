import React from 'react';
import loaderG from "../assets/images/loaderG.gif";

const loading = () => {
    return (
        // <div className="loader-bg">
        //     <div className="loader-track">
        //         <div className="loader-fill"/>
        //     </div>
        // </div>
        <div>
            <img  style={{width: '40px'}} src={loaderG} alt="activity-user"/>
        </div>
    );
};

export default loading;