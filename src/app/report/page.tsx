import { redirect } from "next/navigation";
import { isValidDog, mapToDog, ReportQueryParams } from "@/app/report/queryParams";
import { getQueryParam } from "@/utils/queryUtils";

interface ReportPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ReportPage({ searchParams }: ReportPageProps) {

  const awaitedSearchParams = await searchParams;

  // Convert the raw searchParams using the getQueryParam utility.
  const params: ReportQueryParams = {
    name: getQueryParam(awaitedSearchParams.name),
    breedId: getQueryParam(awaitedSearchParams.breedId),
    gender: getQueryParam(awaitedSearchParams.gender),
    ticks: getQueryParam(awaitedSearchParams.ticks),
    weightKg: getQueryParam(awaitedSearchParams.weightKg),
    lang: getQueryParam(awaitedSearchParams.lang),
    physicalQuirksBitmap: getQueryParam(awaitedSearchParams.physicalQuirksBitmap),
    behavioralQuirksBitmap: getQueryParam(awaitedSearchParams.behavioralQuirksBitmap),
    knownCommandsBitmap: getQueryParam(awaitedSearchParams.knownCommandsBitmap),
  };

  // Validate the query parameters.
  const { isValid, errors } = isValidDog(params);
  if (!isValid) {
    console.error("Validation errors:", errors);
    redirect("/");
  }

  // Map the validated parameters to a Dog object.
  const dog = mapToDog(params);

  return (
    <main style={{ padding: "1rem" }}>
      <pre>{JSON.stringify(dog, null, 2)}</pre>
    </main>
  );
}
