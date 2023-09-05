import { getDictionary } from "../dictionaries";

const About = async({params:{ lang }}) => {
  const {about} = await getDictionary(lang);
  return (
    <div className=' bg-base-000 mx-auto pb-10 w-full overflow-x-hidden'>
      <div>
        <div className='absolute bg-black/20 w-screen h-screen max-h-[67vw] top-[72px] left-0'>
          <p />
        </div>
        <img src='/about.jpg' alt='About Us' className='max-h-[67vw]' />

        <div className='absolute top-60 left-20 text-[50px] text-white font-bold font-sans w-[400px] z-40 drop-shadow-xl max-lg:text-[32px] max-lg:w-[250px] max-md:top-24 max-md:left-16'>
          {about.unlock}
        </div>
      </div>
      <h1 className='font-bold text-3xl justify-center items-center text-center pt-10'>
        {about.aboutus}
      </h1>
      <div className='p-5 text-lg leading-8 font-sans'>
        {about.welcome}
        <br />
        <br />
        {about.why}
        <br />
        <br />
        {about.mission}
        <br />
        <br />
        {about.vision}
        <br />
        <br />
        {about.joinus}
      </div>
      <span className='flex w-full border-t border-black my-2'></span>
      <div id='contact'>
        <h1 className='font-bold text-3xl justify-center items-center text-center pt-10'>
          {about.contactus}
        </h1>
        <div className='flex flex-row justify-center items-center py-5 leading-8 max-md:flex-col'>
          <div className='flex flex-col'>
            <div className='flex flex-row text-left'>
              <div className=''>{about.emailcolon}</div>
              <div className='link link-hover'> {about.email}</div>
            </div>
            <div className='flex flex-row text-left'>
              <div className=''>{about.phonecolon}</div>
              <div className='link link-hover'>{about.phone}</div>
            </div>
          </div>
          <div className='text-left ml-40 max-md:ml-0 max-md:mt-5'>
            <div >
              {about.officehr_1}
            </div>
            <div>
              {about.officehr_2}
            </div>
            <div>
              {about.officehr_3}
            </div>
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
