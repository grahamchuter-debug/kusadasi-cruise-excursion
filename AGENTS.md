# Kuşadası Cruise Excursions

World 2.0 editorial cruise planning site for kusadasicruiseexcursion.com.

## Key paths

- Homepage: `src/app/page.tsx`
- World 2.0 components: `src/components/SpiritOfKusadasi.tsx`, `HonestAdvice.tsx`, `EditorsChoice.tsx`, `CruisePassengerRatings.tsx`, `ArrivalTimeline.tsx`, `ExcursionCategories.tsx`
- Content generator: `scripts/generate-kusadasi-data.mjs`
- Data: `src/data/`

## Regenerate content

```bash
npm run generate:data
npm run build
```
