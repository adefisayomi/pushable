import {useState, useEffect} from 'react'
import AsideMenu from './AsideMenu';
import Routes from '../../routes'



export default function Aside () {

    const [topic, setTopic] = useState('Payment');
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleChangeTopic = (event, newValue) => {
        setTopic(newValue);
    };

    useEffect(() => {
        if (mobileOpen) {
        setMobileOpen(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topic]);

    return (
        <>
            <AsideMenu
                sidebarConfig={TOPICS}
                topic={topic}
                isOpenSidebar={mobileOpen}
                onChangeTopic={handleChangeTopic}
                onCloseSidebar={() => setMobileOpen(false)}
            />
        </>
    )
}

const TOPICS = [
    {
      title: 'chat',
      icon: 'https://zone-assets-api.vercel.app/assets/icons/faq/ic_faq_account.svg',
      url: Routes.login
    },
    {
      title: 'mail',
      icon: 'https://zone-assets-api.vercel.app/assets/icons/faq/ic_faq_payment.svg',
    //   content: <SupportContent contents={_faqsSupport} />,
    },
    {
      title: 'calender',
      icon: 'https://zone-assets-api.vercel.app/assets/icons/faq/ic_faq_delivery.svg',
    //   content: <SupportContent contents={_faqsSupport} />,
    }
  ];