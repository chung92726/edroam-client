'use client';

const termsOfUse = [
  {
    title: 'Interpretation',
    content:
      'The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.',
  },
  {
    title: 'Definitions',
    content: '',
  },
  {
    title: 'Account:',
    content:
      'Refers to the unique login and access portal created for you on our Service.',
  },
  {
    title: 'Company:',
    content:
      '"The Company", "The Platform", "We", "Us", or "Our" all refer to XLearners e-learning platform.',
  },
  {
    title: 'Cookies:',
    content:
      'Small data packets sent to your device from our Service to store pertinent browsing information.',
  },
  {
    title: 'Personal Data:',
    content:
      'Any data that can identify an individual. This does not encompass anonymous data.',
  },
  {
    title: 'Service Provider:',
    content:
      'Refers to any entity that processes data on our behalf. This includes companies or individuals who assist with our Service, for analytics, or service related operations.',
  },
  {
    title: 'Third-party Social Media Service:',
    content:
      'Websites or services that you can use to sign in or create an account on our Service.',
  },
  {
    title: 'Data Controller:',
    content:
      'The natural or legal person, public authority, agency or any other body which processes Personal Data on behalf of the Company.',
  },
  {
    title: 'Data Processor:',
    content:
      'The natural or legal person, public authority, agency or other body which processes Personal Data on behalf of the Data Controller.',
  },
  {
    title: 'Data Subject:',
    content: 'The individual about whom Personal Data is being collected.',
  },
  {
    title: 'User Behavior Data:',
    content:
      'Data collected about actions taken by the User within the Service, such as clicks, page views, and other interactions.',
  },
  {
    title: 'Special Categories of Data:',
    content:
      'Personal Data revealing racial or ethnic origin, political opinions, religious beliefs, health or sexual orientation.',
  },
  {
    title: 'Anonymized Data:',
    content: 'Data that has been stripped of all identifiable information.',
  },
  {
    title: 'Aggregated Data:',
    content:
      'Data that has been combined and processed to be displayed as a summary.',
  },
  {
    title: 'Opt-Out:',
    content:
      'The opportunity for Users to refuse future communications from Us or to direct Us not to share their information with third parties for marketing purposes.',
  },
  {
    title: '1. Collection of Personal Information',
    content:
      "During your engagement with our Service, we might gather specific personal details that could identify or contact you. Such as your name, email, phone number, payment particulars, and any other relevant data essential for our services. Additionally, we automatically accumulate Usage Data such as Your device's IP address, Browser type and version, The specific pages you engage with on our Service and the duration of such engagements, Date and time stamps of your visits, Unique device identifiers and diagnostic data.",
  },
  {
    title: '2. Usage of Your Information',
    content:
      'Your information paves the way for us to ensure your smooth experience on our platform. It aids in payment processes and keeping you updated on courses and any significant shifts on our platform. Occasionally, you might receive promotional content or critical announcements via your email. Should you wish, you can opt out of these communications anytime. Your personal data is instrumental for a myriad of purposes: Offering and refining our Service, Observing and understanding Service usage patterns, Account management and registration, Legal compliance, Guarding against potential malicious activities related to the Service, Facilitating business transitions, including mergers or acquisitions.',
  },
  {
    title: '3. Information Sharing and Disclosure',
    content:
      'Your personal details might be shared with our trusted partners who play a pivotal role in facilitating our services, including entities like payment processors or those providing customer support. Situations might also arise when we are legally compelled or find it imperative to disclose your data to safeguard our rights, assets, or safety, as well as those of others. We may share your information with third-party entities under specific circumstances: Business Transactions: If our business engages in mergers, acquisitions, or other forms of transitions, your personal details might be transferred. Law Enforcement: On occasion, we may be compelled to reveal your data due to legal mandates or requests from public agencies. Other Legal Stipulations: There might arise scenarios where disclosure is critical to comply with the law, shield ourselves from legal liabilities, or safeguard our user base.',
  },
  {
    title: '4. Security Measures',
    content:
      "While we're unwavering in our commitment to shield your data from unauthorized intervention or misuse, it's vital to acknowledge that no electronic transmission or storage method can promise total security. Nonetheless, rest assured that we employ reasonable measures to keep your data secure. ",
  },
  {
    title: '5. Data Retention & Transfer',
    content:
      'Your personal data is stored only for durations that align with its intended use or as mandated by law. In some instances, your data might be transferred and maintained on systems situated outside your jurisdiction, which might be governed by differing data protection regulations.',
  },
  {
    title: '6. Your Rights',
    content:
      "You're granted the liberty to access, modify, or erase your personal data. There might also be situations where you can limit or contest certain processing activities. To act on any of these rights, reach out to us through the contact details shared in this policy.",
  },
  {
    title: '7. Updates to the Privacy Policy',
    content:
      'We remain dynamic in our approach and might occasionally refresh this Privacy Policy, which might be done without prior intimation.',
  },
];

const Privacy = () => {
  return (
    <div className=' bg-base-000 mx-auto py-10 px-2 sm:px-6 lg:px-8 max-w-3xl max-md:w-full overflow-x-hidden'>
      <div className='flex justify-center items-center text-3xl font-bold'>
        Privacy Policy
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

export default Privacy;
