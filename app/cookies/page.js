"use client";

const termsOfUse = [
  {
    title: "How do we use cookies?",
    content:
      "We use cookies to enhance your browsing experience and provide personalized features on our platform. Some of the ways we use cookies include:",
  },
  {
    title: "1. Essential Cookies",
    content:
      "These cookies are necessary for the operation of our website. They enable you to navigate the site and use its features, such as accessing secure areas and making payments.",
  },
  {
    title: "2. Analytical Cookies",
    content:
      "We use analytical cookies to collect information about how visitors use our website. This helps us analyze data, improve the performance of our platform, and understand user preferences. The information collected is anonymous and used for statistical purposes only.",
  },
  {
    title: "3. Functional Cookies",
    content:
      "Functional cookies allow the website to remember choices you make and provide enhanced features. For example, they may remember your language preferences or customize the appearance of the site based on your settings.",
  },
  {
    title: "4. Advertising Cookies",
    content:
      "Advertising cookies are used to deliver personalized advertisements to you based on your interests. These cookies may track your browsing habits across different websites and collect information to provide targeted advertising.",
  },
  {
    title: "5. Third-Party Cookies",
    content:
      "Our website may contain content and links from third-party websites. These third parties may also place cookies on your device when you interact with their content. We do not have control over the cookies used by these third parties and recommend reviewing their privacy policies for more information.",
  },
  {
    title: "How to manage cookies?",
    content:
      "You can typically accept or decline cookies, delete existing cookies, and set preferences for future cookie usage through your browser settings. However, please note that disabling or blocking cookies may impact your experience on our website and limit certain functionalities.",
  },
  {
    title: "Changes to our Cookies Policy",
    content:
      "We may update our Cookies Policy from time to time to reflect any changes in our practices or for legal or regulatory reasons. Any updates will be posted on this page.",
  },
  {
    title: "Contact Us",
    content:
      "If you have any questions or concerns about our Cookies Policy, please contact us at Info@proedu.com",
  },
];

const Cookies = () => {
  return (
    <div className=" bg-base-000 mx-auto py-10 px-2 sm:px-6 lg:px-8 w-full overflow-x-hidden">
      <div className="flex justify-center items-center text-3xl font-bold">
        Cookies Policy
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

export default Cookies;
