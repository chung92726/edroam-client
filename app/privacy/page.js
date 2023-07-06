"use client";

const termsOfUse = [
  {
    title: "1. Information We Collect",
    content:
      "We may collect personal information such as your name, email address, payment details, and other information necessary to provide our services.",
  },
  {
    title: "2. How We Use Your Information",
    content:
      "We use your information to facilitate your access to our platform, process payments, and communicate with you about courses and platform updates. Your email address may also be used to send promotional materials or important announcements related to our platform. You can opt-out of these communications at any time.",
  },
  {
    title: "3. Information Sharing and Disclosure",
    content:
      "We may share your personal information with trusted third parties who assist us in providing our services, such as payment processors or customer support providers. We may also disclose your information if required by law or to protect our rights, property, or safety, as well as the rights, property, or safety of others.",
  },
  {
    title: "4. Security Measures",
    content:
      "We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, or misuse. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.",
  },
  {
    title: "5. Retention of Personal Information",
    content:
      "We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.",
  },
  {
    title: "6. Your Rights",
    content:
      "You have the right to access, update, or delete your personal information. You may also have the right to restrict or object to certain processing activities. If you wish to exercise any of these rights, please contact us using the information provided in this policy.",
  },
  {
    title: "7. Updates to the Privacy Policy",
    content:
      "We may update this Privacy Policy from time to time without prior notice",
  },
];

const Privacy = () => {
  return (
    <div className=" bg-base-000 mx-auto py-10 px-2 sm:px-6 lg:px-8 w-full overflow-x-hidden">
      <div className="flex justify-center items-center text-3xl font-bold">
        Privacy Policy
      </div>
      {termsOfUse.map((item) => (
        <div key={item.title} className="">
          <ol>
            <li>
              <h3 className="text-xl font-bold py-5">{item.title}</h3>
            </li>
            <li className="text-sm pb-1">{item.content}</li>
          </ol>
        </div>
      ))}
    </div>
  );
};

export default Privacy;
