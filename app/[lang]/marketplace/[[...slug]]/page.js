import { getDictionary } from '../../dictionaries.js';
import MarketplacePage from './marketplace.js';

const Marketplace = async ({ params }) => {
  const { marketPlace, allCat, levels, allLang, courseInfo } =
    await getDictionary(params.lang);
  return (
    <>
      <MarketplacePage
        marketPlace={marketPlace}
        allCat={allCat}
        levels={levels}
        allLang={allLang}
        courseInfo={courseInfo}
        params={params}
      />
    </>
  );
};

export default Marketplace;
