interface IUser {
    chat_id: number
    username: string
    phone_number: string
    role: string
    step: number
    created_at: string
}

interface IAuthor {
    author_id: number
    author_name: string
    books_count: number
    created_at: string
}

interface ILanguage {
    language_id: number
    language: string
    books_count: number
    created_at: string
}

interface ICategories {
    category_id: number
    category_name: string
    books_count: number
    created_at: string
}

export type {
    IUser,
    IAuthor,
    ICategories,
    ILanguage
};