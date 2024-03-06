import {Outlet} from "react-router-dom";
import React, {Suspense} from "react";
import {Page, Button} from '@shopify/polaris';

const Layout = () => {

    return (
        <Page
            backAction={{content: 'Settings', url: ''}}
            title="Create volume discount"
            fullWidth
        >
            <Suspense fallback={null}>
                <Outlet />
            </Suspense>
        </Page>

    )
}
export default Layout;