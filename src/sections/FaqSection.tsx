import ScrollTrigger from '../components/ScrollTrigger';
import FaqAccordion from '../components/FaqAccordion';
import { useConfig } from '../hooks/useConfig';

export default function FaqSection() {
  const config = useConfig();

  return (
    <section id="faq" className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <ScrollTrigger animation="fade-up">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-wedding-navy text-center mb-16">
            Frequently Asked Questions
          </h2>
        </ScrollTrigger>

        <ScrollTrigger animation="fade-up">
          <div className="bg-wedding-cream rounded-lg overflow-hidden shadow-lg">
            {config.faqs.map((faq, index) => (
              <FaqAccordion
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </ScrollTrigger>

        {/* Gift Information */}
        <ScrollTrigger animation="fade-up">
          <div className="mt-16 bg-wedding-nude/30 rounded-lg p-8">
            <h3 className="text-2xl font-serif font-semibold text-wedding-navy text-center mb-6">
              Gift Information
            </h3>
            <p className="text-gray-700 text-center mb-8">{config.gifts.message}</p>

            <div className="grid md:grid-cols-2 gap-6">
              {config.gifts.accounts.map((account, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-wedding-navy">{account.bankName}</h4>
                    <span className="text-xs bg-wedding-primary/10 text-wedding-primary px-3 py-1 rounded-full">
                      {account.type}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>
                      <span className="font-medium">Account Name:</span> {account.accountName}
                    </p>
                    <p>
                      <span className="font-medium">Account Number:</span> {account.accountNumber}
                    </p>
                    {account.swiftCode && (
                      <p>
                        <span className="font-medium">SWIFT Code:</span> {account.swiftCode}
                      </p>
                    )}
                    {account.additionalInfo && (
                      <details className="mt-3">
                        <summary className="cursor-pointer text-wedding-secondary hover:text-wedding-primary transition-colors">
                          More details
                        </summary>
                        <div className="mt-2 text-xs text-gray-600 whitespace-pre-line">
                          {account.additionalInfo}
                        </div>
                      </details>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollTrigger>
      </div>
    </section>
  );
}
