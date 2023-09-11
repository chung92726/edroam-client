import { getDictionary } from '../../dictionaries';
import CreateStripePage from './create-stripe.js';

const CreateStripe = async ({ params: { lang } }) => {
  const { userCreateStripe } = await getDictionary(lang);

  return (
    <>
      <CreateStripePage userCreateStripe={userCreateStripe} />
    </>
  );
};

export default CreateStripe;
