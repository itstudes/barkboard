import { Dog } from "@/types/Dog";
import { BreedInfo } from "@/types/BreedInfo";
import { getQueryParam } from "@/utils/queryUtils";
import { breeds } from "@/constants/data/DogBreeds";
import { physicalQuirks, behavioralQuirks } from '../../constants/data/DogQuirks';
import { commands } from '../../constants/data/DogCommands';
import { getBitmap, filterEntitiesByBitmap } from '../../utils/base2Utils';

// Constants for validation.
const MAX_WEIGHT_KG = 110; // Maximum weight for a dog in kilograms.
const MIN_WEIGHT_KG = 1; // Minimum weight for a dog in kilograms.
const MAX_AGE_YEARS = 20; // Maximum age for a living dog in years.
const VALID_GENDERS = ["male", "male_neutered", "female", "female_spayed"];

//UI stepper steps
const STEP_CORE_PARAMS = 1;         // Step for core parameters.
const STEP_HEALTH_METRICS = 2;      // Step for health metrics.
const STEP_PHYSICAL_QUIRKS = 3;     // Step for physical quirks.
const STEP_BEHAVIORAL_QUIRKS = 4;   // Step for behavioral quirks.
const STEP_COMMANDS = 5;            // Step for commands.

// Define an interface for the query parameters.
export interface ReportQueryParams {
  name?: string;
  breedId?: string
  gender?: string;
  ticks?: string;
  weightKg?: string;
  lang?: string;
  physicalQuirksBitmap?: string;
  behavioralQuirksBitmap?: string;
  knownCommandsBitmap?: string;
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
export function isValidDog(params: ReportQueryParams): { isValid: boolean; errors: InvalidQueryItem[] } {
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

  // Validate the weight range
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
  if (gender && !VALID_GENDERS.includes(gender)) {
    errors.push({
      propertyName: "gender",
      errorMessage: `Invalid gender. Allowed values are: ${VALID_GENDERS.join(
        ", "
      )}`,
      fixAtStep: STEP_CORE_PARAMS,
    });
  }

    // Validate breedId.
    const breedIdStr = getQueryParam(params.breedId);
    if (breedIdStr) {
      if (isNaN(Number(breedIdStr))) {
        errors.push({
          propertyName: "breedId",
          errorMessage: "breedId must be a valid number",
          fixAtStep: STEP_CORE_PARAMS,
        });
      } else {
        const breedId = Number(breedIdStr);
        if (!breeds.some((breed) => breed.id === breedId)) {
          errors.push({
            propertyName: "breedId",
            errorMessage: "Invalid breedId. No matching breed found.",
            fixAtStep: STEP_CORE_PARAMS,
          });
        }
      }
    }
  
    // Validate physicalQuirksBitmap.
    const physicalQuirksBitmapStr = getQueryParam(params.physicalQuirksBitmap);
    if (physicalQuirksBitmapStr) {
      if (isNaN(Number(physicalQuirksBitmapStr))) {
        errors.push({
          propertyName: "physicalQuirksBitmap",
          errorMessage: "physicalQuirksBitmap must be a valid number",
          fixAtStep: STEP_PHYSICAL_QUIRKS,
        });
      } else {
        const bitmap = Number(physicalQuirksBitmapStr);
        // Calculate allowed bits from the physical quirks constant collection.
        const allowedBitmap = getBitmap(physicalQuirks);
        if ((bitmap & ~allowedBitmap) !== 0) {
          errors.push({
            propertyName: "physicalQuirksBitmap",
            errorMessage: "physicalQuirksBitmap contains invalid bits",
            fixAtStep: STEP_PHYSICAL_QUIRKS,
          });
        }
      }
    }
  
    // Validate behavioralQuirksBitmap.
    const behavioralQuirksBitmapStr = getQueryParam(params.behavioralQuirksBitmap);
    if (behavioralQuirksBitmapStr) {
      if (isNaN(Number(behavioralQuirksBitmapStr))) {
        errors.push({
          propertyName: "behavioralQuirksBitmap",
          errorMessage: "behavioralQuirksBitmap must be a valid number",
          fixAtStep: STEP_BEHAVIORAL_QUIRKS,
        });
      } else {
        const bitmap = Number(behavioralQuirksBitmapStr);
        const allowedBitmap = getBitmap(behavioralQuirks);
        if ((bitmap & ~allowedBitmap) !== 0) {
          errors.push({
            propertyName: "behavioralQuirksBitmap",
            errorMessage: "behavioralQuirksBitmap contains invalid bits",
            fixAtStep: STEP_BEHAVIORAL_QUIRKS,
          });
        }
      }
    }
  
    // Validate knownCommandsBitmap.
    const knownCommandsBitmapStr = getQueryParam(params.knownCommandsBitmap);
    if (knownCommandsBitmapStr) {
      if (isNaN(Number(knownCommandsBitmapStr))) {
        errors.push({
          propertyName: "knownCommandsBitmap",
          errorMessage: "knownCommandsBitmap must be a valid number",
          fixAtStep: STEP_COMMANDS,
        });
      } else {
        const bitmap = Number(knownCommandsBitmapStr);
        const allowedBitmap = getBitmap(commands);
        if ((bitmap & ~allowedBitmap) !== 0) {
          errors.push({
            propertyName: "knownCommandsBitmap",
            errorMessage: "knownCommandsBitmap contains invalid bits",
            fixAtStep: STEP_COMMANDS,
          });
        }
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
export function mapToDog(params: ReportQueryParams): Dog {
  const breedId = Number(getQueryParam(params.breedId));
  const breed = breeds.find((b) => b.id === breedId)!;

  // Compute the birth date and age.
  const ticks = Number(getQueryParam(params.ticks));
  const birthDate = new Date(ticks);
  const currentDate = new Date();
  const ageInYears = currentDate.getFullYear() - birthDate.getFullYear();

   // Extract bitmaps. If a bitmap is not provided, default to 0.
   const physicalQuirksBitmap = Number(getQueryParam(params.physicalQuirksBitmap)) || 0;
   const behavioralQuirksBitmap = Number(getQueryParam(params.behavioralQuirksBitmap)) || 0;
   const knownCommandsBitmap = Number(getQueryParam(params.knownCommandsBitmap)) || 0; 

  return {
    name: getQueryParam(params.name)!,
    breedInfo: breed,
    gender: getQueryParam(params.gender)! as Dog["gender"],
    birthday: birthDate,
    birthdayTicks: ticks,
    age: ageInYears,
    weightKg: Number(getQueryParam(params.weightKg)),
    languageCode: getQueryParam(params.lang) || "en",
    physicalQuirks: filterEntitiesByBitmap(physicalQuirks, physicalQuirksBitmap),
    behaviorQuirks: filterEntitiesByBitmap(behavioralQuirks, behavioralQuirksBitmap),
    knownCommands: filterEntitiesByBitmap(commands, knownCommandsBitmap),
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
