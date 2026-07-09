interface TimelineItem {
  time: string;
  title: string;
  description: string;
  highlight?: boolean;
}

const TIMELINE: TimelineItem[] = [
  {
    time: "Before arrival",
    title: "Position for the Aegean approach",
    description: "Kuşadası sits on a broad bay with the ancient hills of Selçuk visible inland — a hint of Ephesus before you even step ashore.",
    highlight: true,
  },
  {
    time: "Docking",
    title: "Modern cruise terminal",
    description: "Ships berth at the Kuşadası Cruise Port, 2–3 km north of the town centre. The terminal is efficient — most excursion coaches depart from here.",
  },
  {
    time: "Don't miss",
    title: "Library of Celsus",
    description: "The two-storey marble façade of the Library of Celsus is the defining image of Ephesus — plan your excursion around seeing it in morning light.",
    highlight: true,
  },
  {
    time: "Don't miss",
    title: "Great Theatre",
    description: "Carved into a hillside above Curetes Street, the Great Theatre held 25,000 spectators — still one of the ancient world's largest amphitheatres.",
    highlight: true,
  },
  {
    time: "Don't miss",
    title: "Marble Streets",
    description: "Walk the paved Roman thoroughfares of Curetes Street — fountains, temples and colonnades that feel improbably intact after two millennia.",
  },
  {
    time: "Don't miss",
    title: "Temple of Hadrian",
    description: "One of Ephesus's finest surviving monuments — intricate relief carvings on a street that once hosted Roman senators.",
  },
  {
    time: "Don't miss",
    title: "Terrace Houses",
    description: "Optional but extraordinary — multi-storey Roman residences with mosaics and frescoes, protected under a modern shelter.",
  },
  {
    time: "Don't miss",
    title: "House of the Virgin Mary",
    description: "A modest stone chapel in pine forest above Selçuk — revered by Christian and Muslim pilgrims for centuries.",
  },
  {
    time: "Don't miss",
    title: "Şirince Village",
    description: "Ottoman stone houses, fruit wine cellars and village squares — authentic Turkish countryside 8 km from Ephesus.",
  },
  {
    time: "Don't miss",
    title: "Local Turkish cuisine",
    description: "Meze spreads, grilled köfte, fresh Aegean fish and Turkish coffee — ask your guide for a village lunch if time allows.",
    highlight: true,
  },
];

export function ArrivalTimeline() {
  return (
    <section className="section-padding bg-coastal-50">
      <div className="container-wide">
        <p className="section-eyebrow">What not to miss</p>
        <h2 className="section-title mt-2">Don&apos;t miss on your Kuşadası port day</h2>
        <p className="section-subtitle">
          Visitors aren&apos;t really coming to see Kuşadası — they&apos;re coming to experience one of the greatest archaeological sites on Earth.
        </p>

        <div className="mt-10 relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-coastal-200 hidden sm:block" aria-hidden="true" />
          <div className="space-y-6">
            {TIMELINE.map((item) => (
              <div key={item.title} className="relative sm:pl-12">
                <div
                  className={`hidden sm:block absolute left-2.5 top-5 h-3 w-3 rounded-full border-2 border-white ${
                    item.highlight ? "bg-maple-500 ring-2 ring-maple-500/30" : "bg-coastal-400"
                  }`}
                  aria-hidden="true"
                />
                <div className={`card-feature ${item.highlight ? "border-maple-500/20 bg-gradient-to-br from-maple-500/5 to-white" : ""}`}>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="pill-accent text-xs font-semibold">{item.time}</span>
                    <h3 className="font-display text-lg font-bold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-gray-700 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-sm text-gray-500 text-center">
          Tip: Book Ephesus excursions for morning departures — cooler temperatures, thinner crowds and better light for photography at the Library of Celsus.
        </p>
      </div>
    </section>
  );
}
