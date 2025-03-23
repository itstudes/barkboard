import { Base2Entity } from "@/types/Base2Entity";

/**
 * Compute a combined bitmap from an array of Base2Entity objects.
 * It ORs the base2Id values together.
 * 
 * @param entities - Array of entities that implement Base2Entity
 * @returns The combined bitmap as a number
 */
export const getBitmap = (entities: Base2Entity[]): number => {
  return entities.reduce((bitmap, entity) => bitmap | entity.base2Id, 0);
};

/**
 * Filter entities that are represented in the provided bitmap.
 * Each entity's base2Id is tested against the bitmap.
 * 
 * @param entities - Array of entities implementing Base2Entity
 * @param bitmap - The bitmap value to test against
 * @returns An array of entities that are present in the bitmap.
 */
export const filterEntitiesByBitmap = <T extends Base2Entity>(entities: T[], bitmap: number): T[] => {
  return entities.filter(entity => (bitmap & entity.base2Id) === entity.base2Id);
};
