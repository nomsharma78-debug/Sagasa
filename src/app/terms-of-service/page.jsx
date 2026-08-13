import '../legal.css';

export const metadata = {
  title: 'Terms of Service | Sagasa',
  description: 'Terms of Service for Sagasa India.',
};

export default function TermsOfService() {
  return (
    <div className="legal-container">
      <div className="legal-header">
        <h1 className="legal-title">Terms of Service</h1>
        <p className="legal-last-updated">Last Updated: August 13, 2026</p>
      </div>

      <div className="legal-content">
        <p>
          Welcome to Sagasa. These Terms of Service ("Terms") govern your use of the Sagasa website, services, and applications (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By creating an account, making a purchase, or simply browsing our website, you confirm that you have read, understood, and agreed to these Terms. If you do not agree, you may not use our Services.
        </p>

        <h2>2. Use of Services</h2>
        <p>
          You agree to use our Services only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
        </p>

        <h2>3. Products and Pricing</h2>
        <p>
          We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Services. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors.
        </p>

        <h2>4. Intellectual Property</h2>
        <p>
          All content on our website, including text, graphics, logos, images, and software, is the property of Sagasa India or its content suppliers and is protected by international copyright laws.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, Sagasa shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
        </p>

        <h2>6. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the new Terms on our website. Your continued use of the Services after such modifications constitutes your acceptance of the new Terms.
        </p>

        <h2>7. Contact Information</h2>
        <p>
          If you have any questions about these Terms, please contact us at support@sagasa.in.
        </p>
      </div>
    </div>
  );
}
