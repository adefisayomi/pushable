import Layout from '../src/layouts';
// components
import { Page } from '../src/components';
import {
  HomeHero,
  // HomeFAQs,
  HomeNewStart,
} from '../src/sections/home';
import { useFirebase} from '../src/hooks';

// ----------------------------------------------------------------------

export default function HomePage() {

  const {signOut, facebookLogin} = useFirebase()

  return (
    <Page title="">
      <HomeHero />

      <div>
        Ill show up here

        <button onClick= {facebookLogin}>Login with facebook</button>
      </div>
      

      <HomeNewStart />

     {/*  <HomeFlexibleComponents />
      

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
