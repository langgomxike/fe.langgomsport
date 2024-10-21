import React from 'react';
import Skeleton from "react-loading-skeleton";


const skeletonCount = 10;


export default function () {
    // render
    return (
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px"}}>
            {Array.from({length: skeletonCount}).map((_, index) => (
                <Skeleton key={index} height="30px"/>
            ))}
        </div>

    )
}