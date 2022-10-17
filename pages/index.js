// _data
import { _pricingHome } from '../_data/mock';
// layouts
import Layout from '../src/layouts';
// components
import { Page } from '../src/components';
// sections
import { PricingHome } from '../src/sections/pricing';
import {
  HomeHero,
  // HomeFAQs,
  HomeNewStart,
  // HomeDemoPages,
  HomeForDesigner,
  HomeCombination,
  HomeAdvertisement,
  HomeFeatureHighlights,
  HomeFlexibleComponents,
} from '../src/sections/home';
import { useFirebase } from '../src/hooks';

// ----------------------------------------------------------------------

export default function HomePage() {

  const {signOut} = useFirebase()

  return (
    <Page title="">

      <button style= {{padding: '400px'}} onClick={signOut}>Logout</button>
      {/* <HomeHero />

      <HomeNewStart />

      <HomeFlexibleComponents />
      

      <HomeFeatureHighlights />

      <HomeForDesigner />

      <PricingHome plans={_pricingHome} />

      <HomeCombination />

      <HomeAdvertisement /> */}
    </Page>
  );
}

// ----------------------------------------------------------------------

HomePage.getLayout = function getLayout(page) {
  return <Layout simpleFooter>{page}</Layout>;
};
