"use client";

const companyLogos = [];

export default function LogoSection() {
  // If there are no logos, don't render the section
  if (companyLogos.length === 0) {
    return null;
  }
  
  return (
    <section className="py-12 sm:py-16 bg-background border-y border-border">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
          {companyLogos.map((company) => (
            <div key={company} className="flex justify-center">
              <div className="h-8 w-32 relative flex items-center justify-center">
                <span className="text-sm font-apercu-mono text-muted-foreground">{company}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
