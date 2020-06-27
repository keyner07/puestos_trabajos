import { getRepository } from 'typeorm';
import { Configuration } from '../entity/configuration.entity';

/**
 *
 * @param type to find of id of that.
 * @return id of that object.
 */
export async function findById(type: string, entity: string | any): Promise<number> {
    const { id }: number | any = await getRepository(entity).findOne({ name: type });
    return id;
}

/**
 *
 * @return numPagination
 */

export async function findNumPag() {
    const { NumPagination }: number | any = await getRepository(Configuration).findOne(1);
    return NumPagination;
}

/**
 *
 * @param num type number
 * @return
 */
export async function updateNummPag(num: number) {
    return await getRepository(Configuration).update({ id: 1 }, { NumPagination: num });
}