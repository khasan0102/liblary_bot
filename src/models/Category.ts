import { fetch, fetchAll } from "src/lib/postgres";
import { ICategories } from "src/types/interfaces";

const CATEGORIES = `
    SELECT *
    FROM categories
    ORDER BY created_at
`;

const CATEGORY = `
    SELECT *
    FROM categories c
    WHERE c.category_id = $1
`;

const CREATE = `
    INSERT INTO categories(category_name)
    VALUES ($1)
    RETURNING *
`;

const UPDATE = `
    UPDATE categories
    SET category_name = $2
    WHERE category_id = $1
    RETURNING *
`;

const DELETE = `
    DELETE FROM categories
    WHERE category_id = $1
    RETURNING *
`;

const getAll = (): Promise<ICategories[]> => fetchAll(CATEGORIES);

const getOne = (categoryId: number): Promise<ICategories | undefined> =>
    fetch(CATEGORY, categoryId);

const create = (categoryName: string): Promise<ICategories> =>
    fetch(CREATE, categoryName);

const updateOne = (
    categoryId: number,
    categoryName: string
): Promise<ICategories | undefined> => fetch(UPDATE, categoryId, categoryName);

const deleteOne = (categoryId: number): Promise<ICategories | undefined> => fetch(DELETE, categoryId);


export default  {
    getAll,
    getOne,
    create,
    updateOne,
    deleteOne
}
