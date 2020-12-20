import React from 'react';

import Toolbar from './toolbar/toolbar'
import HomeBody from './homeBody/homeBody';
import HomeFooter from './homeFooter/homeFooter';
import SecondHome from './secondHomeBody/secondHomeBody';

export default function home() {
    return (
        <div>
            <Toolbar />
            <HomeBody />
            <HomeFooter />
            <SecondHome />
        </div>
    )
}
