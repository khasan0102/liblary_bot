interface IUser {
    chat_id: number,
    username: string,
    phone_number: string,
    role: string,
    step: number,
    created_at: string
}

export default IUser;