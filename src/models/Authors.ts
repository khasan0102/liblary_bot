import { fetch, fetchAll } from "src/lib/postgres";
import { IAuthor } from "src/types/interfaces";

const AUTHORS = `
    SELECT *
    FROM authors
    ORDER BY created_at
`;

const AUTHOR = `
    SELECT *
    FROM authors a
    WHERE a.author_id = $1
`;

const CREATE = `
    INSERT INTO authors(author_name)
    VALUES ($1)
    RETURNING *
`;

const UPDATE = `
    UPDATE authors
    SET author_name = $2
    WHERE author_id = $1
    RETURNING *
`;

const DELETE = `
    DELETE FROM authors
    WHERE author_id = $1
    RETURNING *
`;

const getAll = (): Promise<IAuthor[]> => fetchAll(AUTHORS);

const getOne = (authorId: number): Promise<IAuthor | undefined> =>
    fetch(AUTHOR, authorId);

const create = (authorName: string): Promise<IAuthor> =>
    fetch(CREATE, authorName);

const updateOne = (
    authorId: number,
    authorName: string
): Promise<IAuthor | undefined> => fetch(UPDATE, authorId, authorName);

const deleteOne = (authorId: number): Promise<IAuthor | undefined> => fetch(DELETE, authorId);

export default  {
    getAll,
    getOne,
    create,
    updateOne,
    deleteOne
}
