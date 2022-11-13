import Layout from '../../src/layouts'
import {Page} from '../../src/components'
import {ChatComponent} from '../../src/sections/chat'


export default function Chat () {

    return (
        <Page title= 'Chat '>
            <ChatComponent />
        </Page>
    )
}


Chat.getLayout = (page) => <Layout>{page}</Layout>