import React from 'react';
import {CCardHeader} from "@coreui/react";

const MainHeading = ({heading="Main"}) => {
    return (
        <CCardHeader>
    <h3 className="text-center">{heading}</h3>
    </CCardHeader>
    );
}

export default MainHeading;



