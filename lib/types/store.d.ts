declare module "store" {
    interface StorePayload<PayloadType> {
        payload: PayloadType;
    }

    type ReducerAction<T> = {
        type: string;
        value: T;
    };
}
