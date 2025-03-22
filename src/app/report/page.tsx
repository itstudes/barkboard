import { redirect } from "next/navigation";
import { isValidDog, mapToDog, ReportQueryParams } from "@/app/report/queryParams";
import { getQueryParam } from "@/utils/queryUtils";
import { breeds } from "@/constants/data/DogBreeds";

interface ReportPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ReportPage({ searchParams }: ReportPageProps) {
  // Convert the raw searchParams using the getQueryParam utility.
  const params: ReportQueryParams = {
    name: getQueryParam(searchParams.name),
    breedId: getQueryParam(searchParams.breedId),
    gender: getQueryParam(searchParams.gender),
    ticks: getQueryParam(searchParams.ticks),
    weightKg: getQueryParam(searchParams.weightKg),
    lang: getQueryParam(searchParams.lang),
    physicalQuirksBitmap: getQueryParam(searchParams.physicalQuirksBitmap),
    behavioralQuirksBitmap: getQueryParam(searchParams.behavioralQuirksBitmap),
    obedienceCommandsBitmap: getQueryParam(searchParams.obedienceCommandsBitmap),
    playCommandsBitmap: getQueryParam(searchParams.playCommandsBitmap),
    behaviorCommandsBitmap: getQueryParam(searchParams.behaviorCommandsBitmap),
    advancedCommandsBitmap: getQueryParam(searchParams.advancedCommandsBitmap),
    socialCommandsBitmap: getQueryParam(searchParams.socialCommandsBitmap),
  };

  // Validate the query parameters.
  const { isValid, errors } = isValidDog(params, breeds);
  if (!isValid) {
    console.error("Validation errors:", errors);
    redirect("/");
  }

  // Map the validated parameters to a Dog object.
  const dog = mapToDog(params, breeds);

  return (
    <main style={{ padding: "1rem" }}>
      <h1>Dog Report</h1>
      <pre>{JSON.stringify(dog, null, 2)}</pre>
    </main>
  );
}
