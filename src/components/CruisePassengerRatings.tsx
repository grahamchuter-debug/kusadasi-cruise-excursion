interface Rating {
  label: string;
  stars: number;
}

const RATINGS: Rating[] = [
  { label: "Walking Around Port", stars: 3 },
  { label: "History", stars: 5 },
  { label: "Culture", stars: 5 },
  { label: "Photography", stars: 5 },
  { label: "Families", stars: 4 },
  { label: "Food", stars: 4 },
  { label: "Shopping", stars: 4 },
  { label: "Scenic Beauty", stars: 4 },
];

function StarRow({ count }: { count: number }) {
  return (
    <span className="inline-flex gap-0.5 text-amber-500" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < count ? "opacity-100" : "opacity-25"} aria-hidden="true">
          ★
        </span>
      ))}
    </span>
  );
}

export function CruisePassengerRatings() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <p className="section-eyebrow">Cruise passenger snapshot</p>
        <h2 className="section-title mt-2">How Kuşadası scores for cruise passengers</h2>
        <p className="section-subtitle">
          An honest at-a-glance view — the port town is pleasant, but Ephesus is why ships call here.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {RATINGS.map((r) => (
            <div key={r.label} className="card-feature flex items-center justify-between gap-4">
              <span className="text-sm font-medium text-gray-800">{r.label}</span>
              <StarRow count={r.stars} />
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-gray-500">
          Kuşadası itself scores modestly for independent port walks — but Ephesus, the Virgin Mary chapel and Şirince village deliver world-class history and culture on a standard port day.
        </p>
      </div>
    </section>
  );
}
