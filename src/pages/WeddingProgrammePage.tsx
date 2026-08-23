import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useConfig } from '../hooks/useConfig';
import ScrollTrigger from '../components/ScrollTrigger';

function SectionBanner({ title }: { title: string }) {
  return (
    <div className="bg-wedding-primary text-white font-serif uppercase tracking-[0.15em] text-center py-2.5 px-6 text-sm md:text-base font-semibold mb-6">
      {title}
    </div>
  );
}

function renderFormattedText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={i} className="italic text-wedding-charcoal/70">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function HymnSection({
  section,
}: {
  section: {
    title: string;
    refrain?: string;
    verses?: string[];
    twoColumn?: boolean;
  };
}) {
  return (
    <div className="mb-12">
      <SectionBanner title={section.title} />
      <div className={section.twoColumn ? 'md:columns-2 md:gap-10' : ''}>
        {section.verses?.map((verse, i) => (
          <div key={i} className="mb-6 break-inside-avoid">
            <p className="font-serif text-base md:text-lg leading-relaxed text-wedding-charcoal whitespace-pre-line">
              {verse}
            </p>
            {section.refrain && (
              <p className="font-serif text-base md:text-lg leading-relaxed text-wedding-charcoal/80 italic mt-3 whitespace-pre-line">
                [REFRAIN]
              </p>
            )}
          </div>
        ))}
      </div>
      {section.refrain && (
        <div className="mt-4 mb-6 pl-4 border-l-2 border-wedding-primary/30">
          <p className="font-serif text-sm uppercase tracking-widest text-wedding-primary font-semibold mb-2">
            Refrain
          </p>
          <p className="font-serif text-base md:text-lg leading-relaxed text-wedding-charcoal italic whitespace-pre-line">
            {section.refrain}
          </p>
        </div>
      )}
    </div>
  );
}

function ReadingSection({
  section,
}: {
  section: { title: string; verses?: string[] };
}) {
  return (
    <div className="mb-12">
      <SectionBanner title={section.title} />
      <div className="space-y-3">
        {section.verses?.map((verse, i) => (
          <p
            key={i}
            className="font-serif text-base md:text-lg leading-relaxed text-wedding-charcoal"
          >
            {verse}
          </p>
        ))}
      </div>
    </div>
  );
}

function CeremonyTextSection({
  section,
}: {
  section: { title: string; paragraphs?: string[] };
}) {
  return (
    <div className="mb-12">
      <SectionBanner title={section.title} />
      <div className="space-y-4">
        {section.paragraphs?.map((para, i) => (
          <p
            key={i}
            className="font-serif text-base md:text-lg leading-relaxed text-wedding-charcoal whitespace-pre-line"
          >
            {renderFormattedText(para)}
          </p>
        ))}
      </div>
    </div>
  );
}

function SimpleListSection({
  section,
}: {
  section: { title: string; items?: string[] };
}) {
  return (
    <div className="mb-12">
      <SectionBanner title={section.title} />
      <div className="space-y-2">
        {section.items?.map((item, i) => (
          <p
            key={i}
            className="font-serif text-base md:text-lg font-semibold text-wedding-charcoal uppercase tracking-wide"
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

function HeadingOnlySection({ title }: { title: string }) {
  return (
    <div className="mb-8">
      <p className="font-serif text-lg md:text-xl font-semibold text-wedding-charcoal uppercase tracking-wide">
        {title}
      </p>
    </div>
  );
}

export default function WeddingProgrammePage() {
  const config = useConfig();
  const programme = config.weddingProgramme;

  if (!programme) return null;

  return (
    <div className="min-h-screen bg-wedding-cream">
      {/* Back Button */}
      <Link
        to="/"
        className="fixed top-6 left-6 z-50 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full shadow-lg hover:bg-white/30 transition-all"
        aria-label="Back to home"
      >
        <ArrowLeft size={24} />
      </Link>

      {/* Cover Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex flex-col items-center justify-center bg-[#3a3f1c] px-6 py-16 relative overflow-hidden"
      >
        {/* Decorative floral corners (subtle) */}
        <div className="absolute top-0 left-0 w-32 h-32 opacity-10">
          <div className="w-full h-full bg-[url('/images/ozi-kene-proposal-images/836a8d83-f919-4b2e-a331-445bc224fb24.JPG')] bg-cover rounded-br-full" />
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <div className="w-full h-full bg-[url('/images/ozi-kene-proposal-images/836a8d83-f919-4b2e-a331-445bc224fb24.JPG')] bg-cover rounded-bl-full" />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif text-wedding-peach tracking-[0.4em] uppercase text-center mb-4"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 300 }}
        >
          {programme.cover.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-serif text-white/70 text-xs md:text-sm tracking-[0.15em] uppercase text-center max-w-md mb-10"
        >
          {programme.cover.subtitle}
        </motion.p>

        {/* Oval frame with names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="border border-wedding-peach/40 rounded-[50%] px-10 md:px-16 py-10 md:py-14 mb-10"
        >
          <p className="font-serif italic text-wedding-peach text-2xl md:text-4xl text-center leading-relaxed">
            {programme.cover.brideName}
          </p>
          <p className="font-serif text-wedding-peach/80 text-2xl md:text-3xl text-center my-2">
            &
          </p>
          <p className="font-serif italic text-wedding-peach text-2xl md:text-4xl text-center leading-relaxed">
            {programme.cover.groomName}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <p className="font-serif text-white/60 text-[10px] md:text-xs tracking-[0.1em] mb-1">
            @
          </p>
          <p className="font-serif text-white/80 text-xs md:text-sm tracking-[0.1em] uppercase text-center max-w-md mb-8">
            {programme.cover.venue}
          </p>
          <p className="font-serif text-wedding-peach/90 text-sm md:text-base tracking-[0.2em] uppercase">
            {programme.cover.date}
          </p>
        </motion.div>
      </motion.section>

      {/* Content Area */}
      <div className="relative">
        {/* Watermark */}
        <div className="fixed bottom-0 right-0 w-48 md:w-64 pointer-events-none z-10 opacity-[0.08]">
          <img
            src={programme.watermarkImage}
            alt=""
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        <div className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-20 border-x border-dashed border-wedding-primary/15">
          {/* Officiating Ministers */}
          <ScrollTrigger animation="fade-up">
            <div className="mb-14">
              <SectionBanner title="Officiating Ministers" />
              <div className="space-y-1 text-center">
                {programme.officiatingMinisters.map((minister, i) => (
                  <p
                    key={i}
                    className="font-serif text-base md:text-lg text-wedding-charcoal"
                  >
                    <span className="font-semibold">{minister.title}</span>{' '}
                    {minister.name}{' '}
                    {minister.role && (
                      <span className="text-wedding-charcoal/70">
                        {minister.role}
                      </span>
                    )}
                  </p>
                ))}
              </div>
            </div>
          </ScrollTrigger>

          {/* Order of Service */}
          <ScrollTrigger animation="fade-up">
            <div className="mb-14">
              <SectionBanner title="Order of Service" />
              <div className="space-y-2">
                {programme.orderOfService.map((item) => (
                  <p
                    key={item.number}
                    className="font-serif text-base md:text-lg text-wedding-charcoal"
                  >
                    <span className="inline-block w-8 font-semibold">
                      {item.number}.
                    </span>
                    {item.title}
                  </p>
                ))}
              </div>
            </div>
          </ScrollTrigger>

          {/* Programme Sections */}
          {programme.sections.map((section) => (
            <ScrollTrigger key={section.id} animation="fade-up">
              {section.type === 'hymn' && <HymnSection section={section} />}
              {section.type === 'reading' && (
                <ReadingSection section={section} />
              )}
              {section.type === 'ceremony-text' && (
                <CeremonyTextSection section={section} />
              )}
              {section.type === 'simple-list' && (
                <SimpleListSection section={section} />
              )}
              {section.type === 'heading-only' && (
                <HeadingOnlySection title={section.title} />
              )}
            </ScrollTrigger>
          ))}
        </div>
      </div>

      {/* Closing Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 px-6 flex flex-col items-center justify-center bg-white"
      >
        <img
          src={config.assets.logoBlack}
          alt={config.couple.displayName}
          className="w-20 h-20 object-contain mb-12"
        />
        <p
          className="font-serif text-wedding-charcoal text-center leading-relaxed"
          style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' }}
        >
          {programme.closing.message.split(' ').map((word, i, arr) => (
            <span key={i}>
              <span className="italic">{word}</span>
              {i < arr.length - 1 ? ' ' : ''}
              {(word === 'You' || word === 'For') && <br />}
            </span>
          ))}
        </p>
      </motion.section>
    </div>
  );
}
