import { getDictionary } from '../../dictionaries.js';
import MarketplacePage from './marketplace.js'

const Marketplace= async ({ params}) => {
  const {marketplace} = await getDictionary(params.lang);
  return (
    <>
      <MarketplacePage marketplace={marketplace} params={params} />
    </>
  )
}

export default Marketplace