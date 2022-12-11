import React from 'react'
import './index.scss'

const Header = () => {
    return (
        <div className="fluid-container header">
            <div className='container header_bg' data-cy="header-background">
                <p data-cy="header-title">TO DO LIST APP</p>
            </div>
        </div>
    )
}

export default Header