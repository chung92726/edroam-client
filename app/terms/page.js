"use client";

const termsOfUse = [
  {
    title: "1. Account Creation",
    content:
      "Users must be at least 18 years old to create an account on the platform. You are responsible for maintaining the confidentiality of your account login credentials. You are solely responsible for all activities that occur under your account.",
  },
  {
    title: "2. User Conduct",
    content:
      "You agree to use the platform for lawful purposes and in a manner that does not violate any applicable laws or regulations. You shall not engage in any activities that may harm the platform's integrity or interfere with the experiences of other users.",
  },
  {
    title: "3. Intellectual Property",
    content:
      "All content on the platform, including course materials, videos, and written content, are protected by copyright and other intellectual property laws. Users are not allowed to reproduce, distribute, or modify any copyrighted materials without obtaining prior written consent from the content owner.",
  },
  {
    title: "4. Course Enrollment and Payment",
    content:
      "By enrolling in a course, you agree to pay the specified course fee. Course fees are non-refundable unless otherwise stated in our Refund Policy. ProEdu reserves the right to change course prices at any time without prior notice.",
  },
  {
    title: "5. Refund Policy",
    content:
      "ProEdu has a refund policy that outlines the conditions under which a refund may be issued to users.",
  },
  {
    title: "6. Content Accuracy",
    content:
      "While we strive to provide accurate and up-to-date content, ProEdu does not guarantee the accuracy, completeness, or reliability of any information on the platform. Users should verify the information provided on the platform before making any decisions based on the content.",
  },
  {
    title: "7. Third-Party Links",
    content:
      "Our platform may contain links to third-party websites. These links are provided for convenience, and ProEdu is not responsible for the content or practices of these external sites.",
  },
  {
    title: "8. Modification of Services",
    content:
      "ProEdu reserves the right to modify, suspend, or discontinue any part of the platform, including courses, features, or functionality, at any time without prior notice.",
  },
  {
    title: "9. Termination",
    content:
      "ProEdu may terminate or suspend your access to the platform if you violate these terms and conditions or engage in any prohibited activities.",
  },
  {
    title: "10. Governing Law",
    content:
      "These terms and conditions shall be governed by and construed in accordance with the laws of Hong Kong.",
  },
  {
    title: "11. Limitation of Liability",
    content:
      "ProEdu and its affiliates, directors, employees, or agents will not be liable for any direct, indirect, incidental, consequential, or special damages arising out of or in connection with the use of our platform, courses, or materials.",
  },
  {
    title: "12. Contact Information",
    content:
      "If you have any questions or concerns regarding these terms and conditions, you can contact us at Info@proedu.com",
  },
];

const Term = () => {
  return (
    <div className=" bg-base-000 mx-auto py-10 px-2 sm:px-6 lg:px-8 w-full overflow-x-hidden">
      <div className="flex justify-center items-center text-3xl font-bold">
        Terms of use
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

export default Term;
