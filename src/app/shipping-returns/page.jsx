export const metadata = {
  title: 'Shipping & Returns | Sagasa',
  description: 'Information regarding Sagasa shipping methods, rates, and return policies.',
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

export default function Shipping() {
  return (
    <LegalPageLayout title="Shipping & Returns">
      <h2 className="text-2xl font-medium text-[var(--color-foreground)] mt-8 mb-4">Shipping Information</h2>
      <p>We process and ship orders Monday through Friday, excluding holidays. Orders are typically processed within 1-2 business days.</p>
      
      <ul className="list-disc pl-6 space-y-2">
        <li>Standard Shipping (3-5 business days): $8.00</li>
        <li>Express Shipping (1-2 business days): $25.00</li>
        <li>Free standard shipping on all orders over $149.</li>
      </ul>
      
      <h2 className="text-2xl font-medium text-[var(--color-foreground)] mt-8 mb-4">Returns Policy</h2>
      <p>We want you to be completely satisfied with your purchase. If you need to return an item, we accept returns within 30 days of the original purchase date. Items must be unworn, unwashed, and have the original tags attached.</p>
    </LegalPageLayout>
  );
}