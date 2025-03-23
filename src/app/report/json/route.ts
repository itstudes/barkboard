import { redirect } from "next/navigation";
import { isValidDog, mapToDog, ReportQueryParams } from "@/app/report/queryParams";
import { getQueryParam } from "@/utils/queryUtils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    // Extract search parameters from the URL
    const { searchParams } = new URL(request.url);
  
    const params = {
      name: getQueryParam(searchParams.get('name')),
      breedId: getQueryParam(searchParams.get('breedId')),
      gender: getQueryParam(searchParams.get('gender')),
      ticks: getQueryParam(searchParams.get('ticks')),
      weightKg: getQueryParam(searchParams.get('weightKg')),
      lang: getQueryParam(searchParams.get('lang')),
      physicalQuirksBitmap: getQueryParam(searchParams.get('physicalQuirksBitmap')),
      behavioralQuirksBitmap: getQueryParam(searchParams.get('behavioralQuirksBitmap')),
      knownCommandsBitmap: getQueryParam(searchParams.get('knownCommandsBitmap')),
    };
  
    // Validate the query parameters.
    const { isValid, errors } = isValidDog(params);
    if (!isValid) {
      return NextResponse.json({ errors }, { status: 400 });
    }
  
    // Map the validated parameters to a Dog object.
    const dog = mapToDog(params);
  
    return NextResponse.json(dog);
  }
