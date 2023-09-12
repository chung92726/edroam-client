'use client';

const termsOfUse = [
  {
    title: 'Understanding Cookies',
    content:
      "Cookies are tiny text files placed on your device by websites you visit. They're used for multiple reasons: tracking browsing behavior, customizing user experiences, and serving relevant advertisements.",
  },
  {
    title: 'How do we use cookies?',
    content:
      'We use cookies to enhance your browsing experience and provide personalized features on our platform. Some of the ways we use cookies include:',
  },
  {
    title: '1. Essential Cookies',
    content:
      "These cookies are foundational for our website's functionality. They're indispensable, ensuring smooth navigation and seamless access to all features. Ensuring user sessions aren't interrupted, maintaining website security, and enabling functions like shopping carts or user logins.",
  },
  {
    title: '2. Analytical Cookies',
    content:
      "By offering insights into user behavior, these cookies help us refine and optimize our platform's performance.They fetch data on page visit frequencies, user interaction patterns, and possible site bottlenecks, helping us implement user-preferred features. All collected data remains aggregated, ensuring user anonymity.",
  },
  {
    title: '3. Functional Cookies',
    content:
      "Functional cookies allow the website to remember choices you make and provide enhanced features. Whether it's remembering your language and region or modifying site visuals according to your preferences, functional cookies adapt our website to cater to your unique choices.",
  },
  {
    title: '4. Advertising Cookies',
    content:
      "Tailoring promotional content to resonate with your interests is the prime function of these cookies. They map your online activity, gauging your interests to curate ads that you'll find most relevant. This tracking spans various websites to form a cohesive user profile for enhanced targeting.",
  },
  {
    title: '5. Third-Party Cookies',
    content:
      'Our website may contain content and links from third-party websites. These third parties may also place cookies on your device when you interact with their content. We do not have control over the cookies used by these third parties and recommend reviewing their privacy policies for more information.',
  },
  {
    title: 'How to manage cookies?',
    content:
      'You can typically accept or decline cookies, delete existing cookies, and set preferences for future cookie usage through your browser settings. However, please note that disabling or blocking cookies may impact your experience on our website and limit certain functionalities.',
  },
  {
    title: 'Changes to our Cookies Policy',
    content:
      'The digital landscape is ever-evolving, prompting us to regularly revisit our Cookies Policy. Changes will primarily arise from technological advancements, improved best practices, or shifts in legal frameworks. Stay updated by frequently checking this section.',
  },
  {
    title: 'Get in Touch',
    content:
      'If you have any questions or concerns about our Cookies Policy, please contact us at query@xlearners.io',
  },
];

const Cookies = () => {
  return (
    <div className=' bg-base-000 mx-auto py-10 px-2 sm:px-6 lg:px-8 max-w-3xl max-md:w-full overflow-x-hidden'>
      <div className='flex justify-center items-center text-3xl font-bold'>
        Cookies Policy
      </div>
      {termsOfUse.map((item) => (
        <div key={item.title} className=''>
          <ol>
            <li>
              <h3 className='text-xl font-bold py-5'>{item.title}</h3>
            </li>
            <li className='text-sm pb-1'>{item.content}</li>
          </ol>
        </div>
      ))}
    </div>
  );
};

export default Cookies;
