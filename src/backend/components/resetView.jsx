import React from 'react';

export default function ResetView({ onSetNewTimer}) {
    return (
        <div className="reset-view">
                <p className="reset-p">Timer reset</p>
            <div className="reset-view-buttons">
                <button onClick={onSetNewTimer}>Set New Timer</button>
            </div>
        </div>
    );
}
