const About = () => {
  return (
    <div className=' bg-base-000 mx-auto pb-10 w-full overflow-x-hidden'>
      <div>
        <div className='absolute bg-black/20 w-screen h-screen max-h-[67vw] top-[72px] left-0'>
          <p />
        </div>
        <img src='./about.jpg' alt='About Us' className='max-h-[67vw]' />

        <div className='absolute top-60 left-20 text-[50px] text-white font-bold font-sans w-[400px] z-40 drop-shadow-xl max-lg:text-[32px] max-lg:w-[250px] max-md:top-24 max-md:left-16'>
          Unlock Your Creative Potential in the Digital World!
        </div>
      </div>
      <h1 className='font-bold text-3xl justify-center items-center text-center pt-10'>
        About Us
      </h1>
      <div className='p-5 text-lg leading-8 font-sans'>
        Welcome to ProEdu, the ultimate online learning destination for digital
        designers! Whether you're a beginner taking your first steps into the
        exciting world of digital design or an experienced professional looking
        to refine your skills, we're here to empower you on your creative
        journey.
        <br />
        <br />
        At ProEdu, we offer a diverse range of comprehensive video tutorials in
        Website Design, UI/UX and Graphic Design and more. Our carefully curated
        courses are crafted by industry experts, ensuring that you receive
        top-quality instruction and practical knowledge that you can immediately
        apply to your projects.
        <br />
        <br />
        Our mission is to provide an interactive and immersive learning
        experience, equipping you with the tools and techniques needed to thrive
        in the fast-paced digital landscape. Our user-friendly platform makes it
        easy to navigate through our extensive course library, allowing you to
        tailor your learning path to your specific interests and goals.
        <br />
        <br />
        We believe that creativity knows no boundaries, which is why ProEdu is
        accessible to learners from all walks of life. Whether you prefer to
        learn at your own pace or engage in collaborative discussions with
        fellow designers, our platform provides the flexibility and support you
        need to succeed.
        <br />
        <br />
        Join our vibrant community of digital designers and unlock your creative
        potential today. Together, let's embark on an inspiring journey where
        innovation and imagination take center stage. Get ready to create,
        design, and bring your ideas to life with ProEdu!
      </div>
      <span className='flex w-full border-t border-black my-2'></span>
      <div id='contact'>
        <h1 className='font-bold text-3xl justify-center items-center text-center pt-10'>
          Contact Us
        </h1>
        <div className='flex flex-row justify-center items-center py-5 leading-8 max-md:flex-col'>
          <div className='flex flex-col'>
            <div className='flex flex-row text-left'>
              <div className=''>Email: &nbsp; </div>
              <div className='link link-hover'> info@proedu.com</div>
            </div>
            <div className='flex flex-row text-left'>
              <div className=''>Phone: &nbsp; </div>
              <div className='link link-hover'> +852 2408 3103</div>
            </div>
          </div>
          <div className='text-left ml-40 max-md:ml-0 max-md:mt-5'>
            Our office hours is
            <br /> Mon - Fri
            <br /> 0900 - 1800
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
