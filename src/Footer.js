import React from 'react'
import './Footer.css'
import {Typography} from '@material-ui/core';

function Footer() {
    return (
        <div className="footer">
            <Typography className="footer__note" color="textSecondary">
                Developed by Mohammed Abdullah Ibne Khan
            </Typography>
            <Typography className="footer__email" color="textSecondary">
                @abdullahibnekhan@gmail.com
            </Typography>
        </div>
    )
}

export default Footer
