import React, { useState, ReactChildren, ReactNode } from 'react';
import './index.css';

interface LoadingProps{
    visible: boolean;
    children: ReactNode;
}

const Loading: React.FC<LoadingProps> = ({ visible, children }) => {
    return (
        visible ?
            <div className="search-loading-wrap">
                <div className="search-loading"></div>
                { React.Children.only(children) }
      </div> : null
    )
}

export default Loading;