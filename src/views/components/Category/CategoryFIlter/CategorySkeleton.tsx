import React from 'react';
import Skeleton from "react-loading-skeleton";


const skeletonCount = 7;


export default function () {
    // render
    return (
        <div>
            {
                Array.from({length: skeletonCount}).map((_, index) => (
                    <Skeleton key={index} height={30 + "px"}/>
                ))
            }
        </div>
    )
}