import React from 'react';

export default function LoadingScreen({ img, onLogoClick }) {
    return (
        <div className="loading__screen" onClick={ onLogoClick }>
            <img src={img} alt="logo" className="loading__screen-logo" />
            </div>
    )
}