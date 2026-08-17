export const metadata = {
  title: 'Privacy Policy | Sagasa',
  description: 'Learn how Sagasa collects, uses, and protects your information.',
};

const LegalPageLayout = ({ title, children }) => {
  return (
    <div className="page-container container section animate-in fade-in duration-500">
      <div className="page-header text-center mb-16">
        <h1 className="animate-in slide-in-from-bottom-4 duration-700">
          {title}
        </h1>
      </div>
      
      <div className="max-w-[800px] mx-auto text-lg text-[var(--color-text-muted)] leading-relaxed space-y-6 animate-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both prose prose-lg">
        {children}
      </div>
    </div>
  );
};

export default function Privacy() {
  return (
    <LegalPageLayout title="Privacy Policy">
      <h2 className="text-2xl font-medium text-[var(--color-foreground)] mt-8 mb-4">Information We Collect</h2>
      <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact our customer support.</p>
      
      <h2 className="text-2xl font-medium text-[var(--color-foreground)] mt-8 mb-4">How We Use Information</h2>
      <p>We use the information we collect to process transactions, communicate with you about your orders, and improve our services and website.</p>
      
      <h2 className="text-2xl font-medium text-[var(--color-foreground)] mt-8 mb-4">Sharing of Information</h2>
      <p>We do not sell your personal information. We may share your information with third-party service providers who help us operate our business, such as payment processors and shipping companies.</p>
    </LegalPageLayout>
  );
}