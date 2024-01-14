export interface Runnable {
    run: () => void;
}

export interface RunnableWithParam<P, R = void> {
    run: (payload: P) => R;
}
