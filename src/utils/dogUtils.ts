import { Dog } from "@/types/Dog";

//weight labels
const VERY_UNDERWEIGHT_LABEL = "Very Underweight";
const UNDERWEIGHT_LABEL = "Underweight";
const NORMAL_LABEL = "Healthy weight";
const OVERWEIGHT_LABEL = "Overweight";
const VERY_OVERWEIGHT_LABEL = "Very Overweight";

//age labels
const PUPPY_LABEL = "Puppy";
const TEENAGER_LABEL = "Teenager";
const ADULT_LABEL = "Adult";
const SENIOR_LABEL = "Senior";

//age category thresholds
const PUPPY_AGE = 1;
const TEENAGER_AGE = 2;
const SENIOR_FROM_AGE_PERCENTAGE = 0.75; // 75% of max age

/*
 * Utility function to get the number of days until a dog's birthday.
 * @param {Dog} dog - The dog object containing the birthday.
 * @return {number} - The number of days until the dog's birthday.
 */
export function daysTillBirthday(dog: Dog): number {
  const today = new Date();
  const birthday = dog.birthday;

  if (birthday < today) {
    birthday.setFullYear(birthday.getFullYear() + 1);
  }

  return Math.ceil((birthday.getTime() - today.getTime()) / (1000 * 3600 * 24));
}

/*
 * Utility function to get the age category of a dog based on its age and breed info.
 * @param {Dog} dog - The dog object containing the age and breed info.
 * @return {string} - The age category of the dog (e.g., "Puppy", "Teenager", "Adult", "Senior").
 */
export function getAgeCategory(dog: Dog): string {
  const age = dog.age;
  const maxAge = dog.breedInfo.maxAge;

  if (age <= PUPPY_AGE) {
    return PUPPY_LABEL;
  } else if (age <= TEENAGER_AGE) {
    return TEENAGER_LABEL;
  } else if (age > maxAge * SENIOR_FROM_AGE_PERCENTAGE) {
    return SENIOR_LABEL;
  } else {
    return ADULT_LABEL;
  }
}

/*
 * Utility function to get the weight category of a dog based on its weight and breed info.
 * @param {Dog} dog - The dog object containing the weight and breed info.
 * @return {string} - The weight category of the dog (e.g., "Very Underweight", "Underweight", "Healthy weight", "Overweight", "Very Overweight").
 */
export function getWeightCategory(dog: Dog): string {
  const weight = dog.weightKg;
  const breedInfo = dog.breedInfo;

  if (
    weight <= breedInfo.underWeightKg &&
    weight > breedInfo.veryUnderWeightKg
  ) {
    return UNDERWEIGHT_LABEL;
  } else if (weight <= breedInfo.veryUnderWeightKg) {
    return VERY_UNDERWEIGHT_LABEL;
  } else if (
    weight >= breedInfo.overWeightKg &&
    weight < breedInfo.veryOverWeightKg
  ) {
    return OVERWEIGHT_LABEL;
  } else if (weight >= breedInfo.veryOverWeightKg) {
    return VERY_OVERWEIGHT_LABEL;
  } else {
    return NORMAL_LABEL;
  }
}
