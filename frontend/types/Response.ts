export type Response<T> = {
    status: number;
    status_msg: string;
    data: T;
}