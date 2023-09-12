'use client';

import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

import { Context } from '@/context/index';

const InstructorAgreement = () => {
  const router = useRouter();

  const { state } = useContext(Context);
  const { user } = state;

  useEffect(() => {
    if (!user) router.push('/login');
  }, []);

  return (
    <div className=' bg-base-000 mx-auto py-10 px-2 sm:px-6 lg:px-8 max-w-3xl max-md:w-full overflow-x-hidden'>
      <div className='flex justify-center items-center text-3xl font-bold uppercase mb-10'>
        Instructor Agreement
      </div>
      <p>
        By registering as an Instructor on our platform, you implicitly agree to
        the terms of this Agreement established by ProEdge Consulting (HK) Ltd,
        a company incorporated under the laws of Hong Kong ("Company"). By doing
        so, you are recognized as an "Instructor" under the terms and conditions
        set forth herein.
      </p>
      <div className=''>
        <ol>
          <li>
            <h3 className='text-xl font-bold py-5'>1. SERVICES</h3>
          </li>
          <li className='text-sm pb-1'>
            The Instructor commits to delivering educational content that
            encompasses, but is not limited to, online courses, lectures,
            exercises, quizzes, offline workshops, meetings, and classes,
            collectively referred to as "Content". All online courses provided
            by the Instructor must align strictly with their respective course
            descriptions. Similarly, offline activities such as workshops must
            be conducted in alignment with the provided workshop outlines.
            <br />
            <br />
            Furthermore, the Instructor agrees to maintain a satisfactory level
            of engagement with users. This engagement includes, but is not
            limited to, addressing queries in the community and course Q&A
            sections for those enrolled in their courses. The Instructor is
            obligated to ensure that the Content provided meets the expectations
            set in the course descriptions and workshop outlines, offering
            students a consistent and transparent learning experience.
          </li>
          <li>
            <h3 className='text-xl font-bold py-5'>2. PRODUCTS</h3>
          </li>
          <li className='text-sm pb-1'>
            The Instructor commits to offering products on the platform that are
            compliant with all applicable laws, regulations, and safety
            standards. It is the Instructor's responsibility to ensure the items
            they sell, including but not limited to course-related craft-kits
            and side products, meet these criteria. The Instructor represents
            and warrants that, to the best of their knowledge, the products they
            provide do not infringe on any intellectual property rights and are
            free from defects that could cause harm or injury. Any liabilities
            arising from the products' non-compliance or safety concerns will be
            borne by the Instructor.
          </li>
          <li>
            <h3 className='text-xl font-bold py-5'>
              3. CONTENT, PRODUCT, AND PRODUCTION OWNERSHIP & LICENSING
            </h3>
          </li>
          <li className='text-sm pb-1'>
            a) Content Ownership: The Instructor represents and warrants that
            they own or possess the necessary rights and permissions to all the
            Content and product-related materials they submit to the platform.
            <br />
            <br />
            b) Licensing: <br />
            <br />
            <dd>
              &#8226;General License: The Instructor grants the Company a
              worldwide, non-exclusive, royalty-free license to use, reproduce,
              distribute, display, and promote the Content and any
              product-related materials or representations associated with their
              offerings on the platform.
            </dd>
            <br />
            <dd>
              &#8226;Production Services: In cases where the Company provides
              production services for the Content, the licensing terms may be
              modified as per the specific agreement for that case. The general
              principle, however, is that while the Instructor retains copyright
              ownership, they grant the Company enhanced rights to utilize the
              produced Content for platform promotion, distribution, and other
              agreed-upon purposes.
            </dd>
            <br />
            <br />
            c) Product Representations: The Instructor ensures that any product
            images, descriptions, and related content accurately represent the
            actual products being sold, and they hold all necessary rights or
            permissions to use such representations on the platform.
          </li>
          <li>
            <h3 className='text-xl font-bold py-5'>
              4. REVENUE SHARING & INSTRUCTOR PAYOUTS
            </h3>
          </li>
          <li className='text-sm pb-1'>
            a) Direct Link Sales: For sales generated through a direct link
            provided by the Instructor, the Instructor will receive 90% of the
            revenue, after deducting any commission fees paid to payment service
            providers.
            <br />
            <br />
            b) Platform-Driven Sales: For sales initiated directly through the
            platform (not via a direct link), the Instructor will receive 60% of
            the revenue.
            <br />
            <br />
            c) Direct Link Sales with Production Service: If the sale is made
            through a direct link provided by the Instructor and utilizes the
            Company's production services, the Instructor's share will be 70% of
            the revenue after deducting any commission fees paid to payment
            service providers.
            <br />
            <br />
            d) Platform-Driven Sales with Production Service: For sales
            initiated directly through the platform that also utilize the
            Company's production services, the Instructor will receive 40% of
            the revenue.
            <br />
            <br />
            e) Product Sales: For tangible products sold by the Instructor on
            the platform, the Instructor will receive 90% of the revenue after
            deducting any commission fees paid to payment service providers from
            those sales.
            <br />
            <br />
            f) Payment Schedule: Payments to the Instructor based on the above
            revenue sharing model will be initiated immediately after each
            enrollment. However, processing times may vary due to payment
            service providers, and it may take a few working days for the
            Instructor to receive the funds. The Company will provide a detailed
            breakdown of sales and corresponding payouts upon request or as
            deemed necessary.
            <br />
            <br />
            g) Deductions: All percentages specified above are after any fees or
            commissions paid to payment service providers or other third parties
            involved in the transaction process.
            <br />
            <br />
            h) Adjustments: The Company reserves the right to adjust the above
            percentages in the event of refunds, chargebacks, or disputes
            related to a sale.
          </li>
          <li>
            <h3 className='text-xl font-bold py-5'>5. TERMINATION</h3>
          </li>
          <li className='text-sm pb-1'>
            a) Termination by Notice: Either party may terminate this Agreement
            by providing [30 days] written notice to the other party.
            <br />
            <br />
            b) Termination for Cause: The Company reserves the right to
            terminate this Agreement immediately, without prior notice, if the
            Instructor breaches any terms of this Agreement, engages in
            misconduct, or acts in a manner deemed harmful to the platform's
            interests, including but not limited to the aforementioned reasons.
            Should the Instructor's actions or omissions result in any loss to
            the Company under these circumstances, the Company retains the right
            to take legal action against the Instructor to recover such losses.
            <br />
            <br />
            c) Upon Termination: The Instructor will cease using platform
            resources, and both parties will fulfill any post-termination
            obligations outlined in this Agreement, such as the removal of
            content or the return of proprietary information.
            <br />
            <br />
            d) Financial Reconciliation: Upon termination, the Company will pay
            any outstanding fees due to the Instructor after making necessary
            adjustments for chargebacks, refunds, or any other costs associated
            with the Instructor's offerings on the platform.
            <br />
            <br />
            e) Survival: Provisions related to confidentiality, liability, and
            any other clauses explicitly designed to survive termination will
            remain in effect post-termination.
          </li>
          <li>
            <h3 className='text-xl font-bold py-5'>6. CONFIDENTIALITY</h3>
          </li>
          <li className='text-sm pb-1'>
            Both parties agree not to disclose any confidential information
            obtained during the course of this Agreement.
          </li>
          <li>
            <h3 className='text-xl font-bold py-5'>7. INDEMNIFICATION</h3>
          </li>
          <li className='text-sm pb-1'>
            The Instructor agrees to indemnify and hold the Company harmless
            from any claims or damages resulting from the Instructor's breach of
            this Agreement or any misrepresentation.
          </li>
          <li>
            <h3 className='text-xl font-bold py-5'>8. DISPUTE RESOLUTION</h3>
          </li>
          <li className='text-sm pb-1'>
            Any disputes arising from this Agreement will first attempt to be
            resolved through amicable negotiation. If unsuccessful, both parties
            agree to submit the dispute to arbitration in Hong Kong.
          </li>
          <li>
            <h3 className='text-xl font-bold py-5'>9. GOVERNING LAW</h3>
          </li>
          <li className='text-sm pb-1'>
            This Agreement shall be governed by the laws of Hong Kong.
          </li>
          <li>
            <h3 className='text-xl font-bold py-5'>10. AMENDMENTS</h3>
          </li>
          <li className='text-sm pb-1'>
            Any changes or modifications to this Agreement will be communicated
            to the Instructor electronically, via email or through notifications
            on the platform. Continued use of the platform after such
            notifications implies acceptance of these changes. If the Instructor
            does not agree with the amended terms, they have the option to
            terminate their relationship with the Company. All modifications to
            this Agreement will be deemed effective upon their posting on the
            platform or when communicated to the Instructor, unless otherwise
            specified.
          </li>
          <li>
            <h3 className='text-xl font-bold py-5'>
              11. INDEPENDENT CONTRACTOR
            </h3>
          </li>
          <li className='text-sm pb-1'>
            The Instructor is an independent contractor and nothing in this
            Agreement creates an employer-employee relationship.
          </li>
          <li>
            <h3 className='text-xl font-bold py-5'>12. ENTIRE AGREEMENT</h3>
          </li>
          <li className='text-sm pb-1'>
            This Instructor Agreement contains the entire understanding between
            the parties concerning the subject matter herein and supersedes any
            prior understandings or agreements, whether oral or written,
            relating to the role and obligations of the Instructor.
            Notwithstanding the foregoing, the Terms and Conditions, Privacy
            Policy, and Cookies Policy previously agreed to by the Instructor
            upon registration as a user on the platform remain in full force and
            effect. This Agreement does not supersede, negate, or modify those
            platform-wide policies, and both sets of agreements and policies
            coexist independently. Any ambiguity or conflicts between this
            Agreement and the platform's general policies should be resolved in
            favor of maintaining the integrity of the platform's general
            policies unless explicitly stated otherwise in writing.
          </li>
          <li>
            <h3 className='text-xl font-bold py-5'>13. ASSIGNMENT</h3>
          </li>
          <li className='text-sm pb-1'>
            The Instructor may not assign their rights or obligations under this
            Agreement without the express written consent of the Company.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default InstructorAgreement;
