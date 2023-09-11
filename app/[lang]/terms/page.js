'use client';

const termsOfUse = [
  {
    title: '1. Account Creation',
    content:
      "To use the XLearners e-learning platform (the platform or the company) and create an account, users must be at least 13 years old. This is to comply with online safety regulations and to ensure minors' protection.  Users must take appropriate measures to ensure the security of their account. This involves not sharing passwords or other login credentials and using strong, unique passwords. Any actions, whether it's content posting, interactions, or purchases made under your account, fall under your responsibility. This means if something happens under your account, you'll be the point of contact and could face legal consequences.",
  },
  {
    title: '2. User Conduct',
    content:
      "Users are obligated to use the platform in ways that respect all applicable local, state, national, and international laws. Users shouldn't take actions that can harm the platform's operations, security, or reputation. Additionally, any behavior that can degrade or negatively impact other users' experience is discouraged.",
  },
  {
    title: '3. Intellectual Property',
    content:
      'The platform hosts a variety of content, from videos to written materials, all of which are protected under intellectual property laws. This means the creators or the platform hold exclusive rights to this content. Without express permission from either the platform or the original creators, users cannot replicate, distribute, edit, or showcase the content elsewhere.',
  },
  {
    title: '4. Course Enrollment and Payment',
    content:
      'When a user decides to enroll in a course, they are entering into a financial agreement to pay the mentioned fee. Once paid, course fees are final. The only exception is if conditions in the Refund Policy are met. The platform holds the right to adjust the pricing of courses. These changes can happen at any time and might not come with advance notice.',
  },
  {
    title: '5. Refund Policy',
    content:
      'All payments made towards course fees, events, or workshop deposits are, as a general rule, non-refundable. This approach is taken to maintain the integrity and commitment towards our educational offerings. We strongly advise users to thoroughly evaluate and reflect upon their decisions before committing to a purchase. Ensure you review course descriptions, event details, and workshop agendas to align with your learning objectives and interests. If users discover discrepancies between the course content and its described outline after attending a limited number of sessions, they are encouraged to reach out to our support team promptly. Recognizing the potential for genuine concerns, we commit to reviewing each claim on its individual merit. This means considering the nature of the discrepancy, the number of sessions attended, and the feedback provided by the user, and other information needed. While we are open to feedback and concerns, the platform retains the ultimate authority in deciding the validity of refund requests. Our decision, made after careful evaluation, will be considered final in all cases.',
  },
  {
    title: '6. Content Accuracy',
    content:
      'The platform aims to provide up-to-date, accurate, and reliable information. However, the vast nature of content means occasional errors might occur. Before making decisions or taking actions based on platform content, users are advised to cross-check information for its validity and applicability.',
  },
  {
    title: '7. Third-Party Links',
    content:
      "For user convenience or additional resources, the platform might include links to other websites. However, these external sites are not under the platform's control, so the platform cannot guarantee their content or safety.",
  },
  {
    title: '8. Modification of Services',
    content:
      'To stay current and offer the best experience, the platform might update, suspend, or remove specific courses, tools, or features. These changes aim to optimize user experience but might come without warning.',
  },
  {
    title: '9. Termination',
    content:
      'If a user is found to be violating platform terms, participating in malicious activities, or causing harm, their access to the platform can be terminated either temporarily or permanently.',
  },
  {
    title: '10. Governing Law',
    content:
      'Any disagreements, conflicts, or interpretations of these terms will be addressed following the laws specific to Hong Kong. This determines the legal procedures, rights, and obligations of both parties.',
  },
  {
    title: '11. Limitation of Liability',
    content:
      "The platform, including all its stakeholders, is not to be held accountable for any indirect damages or losses a user might claim from using the platform's services.",
  },
  {
    title: '12. Contact Information',
    content:
      "For any inquiries, feedback, or concerns regarding the platform's terms and services, users can directly communicate via the provided email address, Inquiry@XLearners.com.",
  },
];

const Term = () => {
  return (
    <div className=' bg-base-000 mx-auto py-10 px-2 sm:px-6 lg:px-8 max-w-3xl max-md:w-full overflow-x-hidden'>
      <div className='flex justify-center items-center text-3xl font-bold'>
        Terms of use
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

export default Term;
