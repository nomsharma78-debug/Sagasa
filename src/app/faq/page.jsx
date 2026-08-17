import Accordion from '@/components/Accordion';

export const metadata = {
  title: 'FAQ | Sagasa',
  description: 'Frequently Asked Questions about Sagasa returns, shipping, and care instructions.',
};

const faqData = [
  {
    title: 'What is your return policy?',
    content: 'We accept returns within 30 days of the original purchase date for unused and unwashed items with tags still attached. Please note that sale items are final and cannot be returned.'
  },
  {
    title: 'How long does shipping take?',
    content: 'Standard shipping typically takes 3-5 business days within the US. International shipping can take anywhere from 7-14 business days depending on the destination.'
  },
  {
    title: 'Do you ship internationally?',
    content: 'Yes, we ship to over 50 countries worldwide. Shipping costs will apply and will be added at checkout.'
  },
  {
    title: 'How do I care for my garments?',
    content: 'We recommend washing all our garments in cold water and hanging them to dry to preserve the fabric quality and fit. Specific care instructions can be found on the label of each item.'
  }
];

const FAQ = () => {
  return (
    <div className="page-container container section animate-in fade-in duration-500">
      <div className="page-header text-center mb-16">
        <h1 className="animate-in slide-in-from-bottom-4 duration-700">
          Frequently Asked Questions
        </h1>
      </div>
      
      <div className="max-w-[800px] mx-auto animate-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
        <Accordion items={faqData} />
      </div>
    </div>
  );
};

export default FAQ;

