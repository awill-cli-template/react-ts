// 同步 Action 的基础类型
export type GenericAction<T extends string, P = void> = P extends void ? { type: T } : { type: T; payload: P };

// 定义处理函数类型
type Reducer<S, A extends GenericAction<string>> = (state: S, action: A) => S;

// 定义 同步ActionMap 的类型
export type ActionMap<S, A extends GenericAction<string>> = {
  [K in A["type"]]: Reducer<S, Extract<A, { type: K }>>;
};

// 定义异步Action的类型,A同步aciton的类型，P异步action的payload类型
type AsyncAction<A, P = void> = (dispatch: React.Dispatch<A>, payload: P) => Promise<void>;

// 定义异步ActionMap的类型，A同步action的类型，T异步action的类型
export type AsyncActionMap<A extends GenericAction<string>, T extends GenericAction<string>> = {
  [K in T["type"]]?: AsyncAction<A, T extends { payload: infer P } ? P : void>;
};

// 定义Slice的类型，S状态类型，A同步action的类型，T异步action的类型
export type Slice<S, A extends GenericAction<string>, T extends GenericAction<string>> = {
  name: string;
  initialState: S;
  reducers: ActionMap<S, A>;
  asyncReducers?: AsyncActionMap<A, T>;
};
