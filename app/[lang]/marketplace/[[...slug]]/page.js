import { getDictionary } from '../../dictionaries.js';
import MarketplacePage from './marketplace.js';

const Marketplace = async ({ params }) => {
  const { marketPlace } = await getDictionary(params.lang);
  return (
    <>
      <MarketplacePage marketPlace={marketPlace} params={params} />
    </>
  );
};

export default Marketplace;
