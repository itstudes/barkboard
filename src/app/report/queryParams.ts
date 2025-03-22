import { Dog } from "@/types/Dog";
import { BreedInfo } from "@/types/BreedInfo";
import { getQueryParam } from "@/utils/queryUtils";

// Constants for validation.
const MAX_WEIGHT_KG = 110; // Maximum weight for a dog in kilograms.
const MIN_WEIGHT_KG = 1; // Minimum weight for a dog in kilograms.
const MAX_AGE_YEARS = 20; // Maximum age for a dog in years.
const STEP_CORE_PARAMS = 1; // Step for core parameters.
const STEP_HEALTH_METRICS = 2; // Step for health metrics.

// Define an interface for the query parameters.
export interface ReportQueryParams {
  name?: string;
  breedId?: string;
  gender?: string;
  ticks?: string;
  weightKg?: string;
  lang?: string;
  physicalQuirksBitmap?: string;
  behavioralQuirksBitmap?: string;
  obedienceCommandsBitmap?: string;
  playCommandsBitmap?: string;
  behaviorCommandsBitmap?: string;
  advancedCommandsBitmap?: string;
  socialCommandsBitmap?: string;
}

// Define an interface for reporting invalid query parameters.
export interface InvalidQueryItem {
  propertyName: string;
  errorMessage: string;
  fixAtStep: number;
}

/**
 * Validates the query parameters to ensure that they can be mapped to a Dog object.
 * @param params The query parameters parsed from the URL.
 * @param breeds An array of valid BreedInfo objects.
 * @returns An object with isValid flag and an array of InvalidQueryItem errors.
 */
export function isValidDog(
  params: ReportQueryParams,
  breeds: BreedInfo[]
): { isValid: boolean; errors: InvalidQueryItem[] } {
  const errors: InvalidQueryItem[] = [];

  // Define required parameters and their associated fix step.
  const requiredParams: { key: keyof ReportQueryParams; fixAtStep: number }[] =
    [
      { key: "name", fixAtStep: STEP_CORE_PARAMS },
      { key: "breedId", fixAtStep: STEP_CORE_PARAMS },
      { key: "gender", fixAtStep: STEP_CORE_PARAMS },
      { key: "ticks", fixAtStep: STEP_HEALTH_METRICS },
      { key: "weightKg", fixAtStep: STEP_HEALTH_METRICS },
    ];

  // Check for missing required parameters.
  for (const { key, fixAtStep } of requiredParams) {
    if (!params[key]) {
      errors.push({
        propertyName: key,
        errorMessage: `Missing required parameter: ${key}`,
        fixAtStep,
      });
    }
  }

  // Validate numeric values.
  const ticks = getQueryParam(params.ticks);
  if (ticks && isNaN(Number(ticks))) {
    errors.push({
      propertyName: "ticks",
      errorMessage: "Ticks must be a valid number",
      fixAtStep: STEP_HEALTH_METRICS,
    });
  }

  const weight = getQueryParam(params.weightKg);
  if (weight && isNaN(Number(weight))) {
    errors.push({
      propertyName: "weightKg",
      errorMessage: "Weight must be a valid number",
      fixAtStep: STEP_HEALTH_METRICS,
    });
  }

  // Validate the weight range (1–110 kg).
  if (weight && !isNaN(Number(weight))) {
    const weightNum = Number(weight);
    if (weightNum < MIN_WEIGHT_KG || weightNum > MAX_WEIGHT_KG) {
      errors.push({
        propertyName: "weightKg",
        errorMessage: `Weight must be between ${MIN_WEIGHT_KG} and ${MAX_WEIGHT_KG} kg`,
        fixAtStep: STEP_HEALTH_METRICS,
      });
    }
  }

  // Validate that ticks is not more than current time + 1 minute.
  if (ticks && !isNaN(Number(ticks))) {
    const ticksNum = Number(ticks);
    const oneMinuteFromNow = Date.now() + 60000; // current time + 1 minute in ms.
    if (ticksNum > oneMinuteFromNow) {
      errors.push({
        propertyName: "ticks",
        errorMessage: "Ticks cannot be more than one minute in the future",
        fixAtStep: STEP_HEALTH_METRICS,
      });
    }
  }

  // Validate age range using ticks.
  if (ticks && !isNaN(Number(ticks))) {
    const birthDate = new Date(Number(ticks));
    const currentDate = new Date();
    const ageInYears = currentDate.getFullYear() - birthDate.getFullYear();
    if (ageInYears < 0 || ageInYears > MAX_AGE_YEARS) {
      errors.push({
        propertyName: "ticks",
        errorMessage: `Birth date results in an invalid age: ${ageInYears} years`,
        fixAtStep: STEP_HEALTH_METRICS,
      });
    }
  }

  // Validate gender.
  const gender = getQueryParam(params.gender);
  const validGenders = ["male", "male_neutered", "female", "female_spayed"];
  if (gender && !validGenders.includes(gender)) {
    errors.push({
      propertyName: "gender",
      errorMessage: `Invalid gender. Allowed values are: ${validGenders.join(
        ", "
      )}`,
      fixAtStep: STEP_CORE_PARAMS,
    });
  }

  // Ensure the provided breedId exists within the breeds collection.
  const breedIdStr = getQueryParam(params.breedId);
  if (breedIdStr && !isNaN(Number(breedIdStr))) {
    const breedId = Number(breedIdStr);
    if (!breeds.some((breed) => breed.id === breedId)) {
      errors.push({
        propertyName: "breedId",
        errorMessage: "Invalid breedId. No matching breed found.",
        fixAtStep: STEP_CORE_PARAMS,
      });
    }
  }

  return { isValid: errors.length === 0, errors };
}

/**
 * Maps the query parameters to a Dog object.
 * @param params The validated query parameters.
 * @param breeds An array of valid BreedInfo objects.
 * @returns A Dog object.
 */
export function mapToDog(params: ReportQueryParams, breeds: BreedInfo[]): Dog {
  const breedId = Number(getQueryParam(params.breedId));
  const breed = breeds.find((b) => b.id === breedId)!;

  // Compute the birth date and age.
  const ticks = Number(getQueryParam(params.ticks));
  const birthDate = new Date(ticks);
  const currentDate = new Date();
  const ageInYears = currentDate.getFullYear() - birthDate.getFullYear();

  return {
    name: getQueryParam(params.name)!,
    breedInfo: breed,
    gender: getQueryParam(params.gender)! as Dog["gender"],
    birthday: birthDate,
    birthdayTicks: ticks,
    age: ageInYears,
    weightKg: Number(getQueryParam(params.weightKg)),
    languageCode: getQueryParam(params.lang) || "en",
    physicalQuirks: [],
    behaviorQuirks: [],
    knownCommands: [],
  };
}

/**
 * Builds a /report URL with query parameters based on the provided ReportQueryParams object.
 * @param params The ReportQueryParams object containing the parameters.
 * @returns A string representing the full /report URL.
 */
export function buildReportUrl(params: ReportQueryParams): string {
  const searchParams = new URLSearchParams();
  // Iterate over each key in the params object.
  Object.keys(params).forEach((key) => {
    const value = params[key as keyof ReportQueryParams];
    if (value !== undefined) {
      searchParams.append(key, value);
    }
  });
  return `/report?${searchParams.toString()}`;
}
