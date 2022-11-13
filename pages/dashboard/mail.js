import Layout from '../../src/layouts'
import {Page} from '../../src/components'


export default function Mail () {

    return (
        <Page title= 'Mail '>
            mail
        </Page>
    )
}


Mail.getLayout = (page) => <Layout>{page}</Layout>