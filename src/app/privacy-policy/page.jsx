import '../legal.css';

export const metadata = {
  title: 'Privacy Policy | Sagasa',
  description: 'Privacy Policy for Sagasa India.',
};

export default function PrivacyPolicy() {
  return (
    <div className="legal-container">
      <div className="legal-header">
        <h1 className="legal-title">Privacy Policy</h1>
        <p className="legal-last-updated">Last Updated: August 13, 2026</p>
      </div>

      <div className="legal-content">
        <p>
          At Sagasa, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you interact with our website and services.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We may collect the following types of information:
        </p>
        <ul>
          <li><strong>Personal Information:</strong> Name, email address, phone number, shipping and billing addresses, and payment details when you make a purchase or create an account.</li>
          <li><strong>Usage Data:</strong> Information about how you navigate and interact with our website, including IP addresses, browser types, and device information.</li>
          <li><strong>Communication Data:</strong> Records of your correspondence with our customer support team.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use your information for the following purposes:
        </p>
        <ul>
          <li>To process and fulfill your orders.</li>
          <li>To communicate with you about your account, orders, and inquiries.</li>
          <li>To send you promotional offers and marketing communications (only if you have opted in).</li>
          <li>To improve our website, products, and overall customer experience.</li>
          <li>To detect and prevent fraud and ensure the security of our platform.</li>
        </ul>

        <h2>3. Data Sharing and Disclosure</h2>
        <p>
          We do not sell your personal information to third parties. We may share your data with trusted service providers who assist us in operating our website, conducting our business, or servicing you, provided that these parties agree to keep this information confidential.
        </p>

        <h2>4. Your Rights and Choices</h2>
        <p>
          You have the right to access, correct, or delete your personal information. You can also opt out of receiving marketing communications from us at any time by following the unsubscribe instructions included in our emails or by contacting our support team.
        </p>

        <h2>5. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
        </p>

        <h2>6. Changes to this Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised "Last Updated" date. We encourage you to review this policy periodically.
        </p>

        <h2>7. Contact Us</h2>
        <p>
          If you have any questions or concerns about our Privacy Policy or data practices, please contact us at privacy@sagasa.in.
        </p>
      </div>
    </div>
  );
}
