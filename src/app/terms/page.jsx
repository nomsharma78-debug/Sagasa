export const metadata = {
  title: 'Terms of Service | Sagasa',
  description: 'Terms of Service for accessing and using the Sagasa website.',
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

export default function Terms() {
  return (
    <LegalPageLayout title="Terms of Service">
      <h2 className="text-2xl font-medium text-[var(--color-foreground)] mt-8 mb-4">1. Introduction</h2>
      <p>Welcome to Sagasa. By accessing our website, you agree to these Terms of Service. Please read them carefully.</p>
      
      <h2 className="text-2xl font-medium text-[var(--color-foreground)] mt-8 mb-4">2. Use of the Site</h2>
      <p>You may use our site for lawful purposes only. You must not use our site in any way that causes, or may cause, damage to the site or impairment of the availability or accessibility of the site.</p>
      
      <h2 className="text-2xl font-medium text-[var(--color-foreground)] mt-8 mb-4">3. Intellectual Property</h2>
      <p>All content included on the site, such as text, graphics, logos, images, is the property of Sagasa or its content suppliers and protected by copyright laws.</p>
    </LegalPageLayout>
  );
}