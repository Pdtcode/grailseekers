/**
 * Client
 **/

import * as runtime from "./runtime/library.js";

import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model User
 *
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>;
/**
 * Model Product
 *
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>;
/**
 * Model ProductVariant
 *
 */
export type ProductVariant =
  $Result.DefaultSelection<Prisma.$ProductVariantPayload>;
/**
 * Model Drop
 *
 */
export type Drop = $Result.DefaultSelection<Prisma.$DropPayload>;
/**
 * Model Order
 *
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>;
/**
 * Model OrderItem
 *
 */
export type OrderItem = $Result.DefaultSelection<Prisma.$OrderItemPayload>;
/**
 * Model Address
 *
 */
export type Address = $Result.DefaultSelection<Prisma.$AddressPayload>;

/**
 * Enums
 */
export namespace $Enums {
  export const OrderStatus: {
    PENDING: "PENDING";
    PROCESSING: "PROCESSING";
    SHIPPED: "SHIPPED";
    DELIVERED: "DELIVERED";
    CANCELLED: "CANCELLED";
  };

  export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
}

export type OrderStatus = $Enums.OrderStatus;

export const OrderStatus: typeof $Enums.OrderStatus;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = "log" extends keyof ClientOptions
    ? ClientOptions["log"] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions["log"]>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["other"] };

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(
    optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>,
  );
  $on<V extends U>(
    eventType: V,
    callback: (
      event: V extends "query" ? Prisma.QueryEvent : Prisma.LogEvent,
    ) => void,
  ): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel },
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (
      prisma: Omit<PrismaClient, runtime.ITXClientDenyList>,
    ) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<
    "extends",
    Prisma.TypeMapCb<ClientOptions>,
    ExtArgs,
    $Utils.Call<
      Prisma.TypeMapCb<ClientOptions>,
      {
        extArgs: ExtArgs;
      }
    >
  >;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Products
   * const products = await prisma.product.findMany()
   * ```
   */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productVariant`: Exposes CRUD operations for the **ProductVariant** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more ProductVariants
   * const productVariants = await prisma.productVariant.findMany()
   * ```
   */
  get productVariant(): Prisma.ProductVariantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.drop`: Exposes CRUD operations for the **Drop** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Drops
   * const drops = await prisma.drop.findMany()
   * ```
   */
  get drop(): Prisma.DropDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Orders
   * const orders = await prisma.order.findMany()
   * ```
   */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more OrderItems
   * const orderItems = await prisma.orderItem.findMany()
   * ```
   */
  get orderItem(): Prisma.OrderItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.address`: Exposes CRUD operations for the **Address** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Addresses
   * const addresses = await prisma.address.findMany()
   * ```
   */
  get address(): Prisma.AddressDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics;
  export type Metric<T> = runtime.Metric<T>;
  export type MetricHistogram = runtime.MetricHistogram;
  export type MetricHistogramBucket = runtime.MetricHistogramBucket;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export import JsonObject = runtime.JsonObject;
  export import JsonArray = runtime.JsonArray;
  export import JsonValue = runtime.JsonValue;
  export import InputJsonObject = runtime.InputJsonObject;
  export import InputJsonArray = runtime.InputJsonArray;
  export import InputJsonValue = runtime.InputJsonValue;

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> =
    T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<
    T extends (...args: any) => $Utils.JsPromise<any>,
  > = PromiseType<ReturnType<T>>;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? "Please either choose `select` or `include`."
    : T extends SelectAndOmit
      ? "Please either choose `select` or `omit`."
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> =
    T extends Array<any>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends BigInt
            ? False
            : T extends object
              ? True
              : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<
    __Either<O, K>
  >;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = O extends unknown ? _Either<O, K, strict> : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O
    ? O[K]
    : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown
    ? AtStrict<O, K>
    : never;
  export type At<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ?
          | (K extends keyof O ? { [P in K]: O[P] } & O : O)
          | ({ [P in keyof O as P extends K ? P : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<
    T,
    U = Omit<T, "_avg" | "_sum" | "_count" | "_min" | "_max">,
  > = IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<"OR", K>, Extends<"AND", K>>,
      Extends<"NOT", K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<
            UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
          >
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<
    T,
    K extends Enumerable<keyof T> | keyof T,
  > = Prisma__Pick<T, MaybeTupleToUnion<K>>;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}`
    ? never
    : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    User: "User";
    Product: "Product";
    ProductVariant: "ProductVariant";
    Drop: "Drop";
    Order: "Order";
    OrderItem: "OrderItem";
    Address: "Address";
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  export type Datasources = {
    db?: Datasource;
  };

  interface TypeMapCb<ClientOptions = {}>
    extends $Utils.Fn<
      { extArgs: $Extensions.InternalArgs },
      $Utils.Record<string, any>
    > {
    returns: Prisma.TypeMap<
      this["params"]["extArgs"],
      ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}
    >;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > = {
    globalOmitOptions: {
      omit: GlobalOmitOptions;
    };
    meta: {
      modelProps:
        | "user"
        | "product"
        | "productVariant"
        | "drop"
        | "order"
        | "orderItem"
        | "address";
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>;
        fields: Prisma.UserFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUser>;
          };
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>;
            result: $Utils.Optional<UserGroupByOutputType>[];
          };
          count: {
            args: Prisma.UserCountArgs<ExtArgs>;
            result: $Utils.Optional<UserCountAggregateOutputType> | number;
          };
        };
      };
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>;
        fields: Prisma.ProductFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>;
          };
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>;
          };
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[];
          };
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>;
          };
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[];
          };
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>;
          };
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>;
          };
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[];
          };
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>;
          };
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateProduct>;
          };
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ProductGroupByOutputType>[];
          };
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>;
            result: $Utils.Optional<ProductCountAggregateOutputType> | number;
          };
        };
      };
      ProductVariant: {
        payload: Prisma.$ProductVariantPayload<ExtArgs>;
        fields: Prisma.ProductVariantFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ProductVariantFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ProductVariantFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>;
          };
          findFirst: {
            args: Prisma.ProductVariantFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ProductVariantFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>;
          };
          findMany: {
            args: Prisma.ProductVariantFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>[];
          };
          create: {
            args: Prisma.ProductVariantCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>;
          };
          createMany: {
            args: Prisma.ProductVariantCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ProductVariantCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>[];
          };
          delete: {
            args: Prisma.ProductVariantDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>;
          };
          update: {
            args: Prisma.ProductVariantUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>;
          };
          deleteMany: {
            args: Prisma.ProductVariantDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ProductVariantUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ProductVariantUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>[];
          };
          upsert: {
            args: Prisma.ProductVariantUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>;
          };
          aggregate: {
            args: Prisma.ProductVariantAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateProductVariant>;
          };
          groupBy: {
            args: Prisma.ProductVariantGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ProductVariantGroupByOutputType>[];
          };
          count: {
            args: Prisma.ProductVariantCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<ProductVariantCountAggregateOutputType>
              | number;
          };
        };
      };
      Drop: {
        payload: Prisma.$DropPayload<ExtArgs>;
        fields: Prisma.DropFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.DropFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DropPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.DropFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DropPayload>;
          };
          findFirst: {
            args: Prisma.DropFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DropPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.DropFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DropPayload>;
          };
          findMany: {
            args: Prisma.DropFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DropPayload>[];
          };
          create: {
            args: Prisma.DropCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DropPayload>;
          };
          createMany: {
            args: Prisma.DropCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.DropCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DropPayload>[];
          };
          delete: {
            args: Prisma.DropDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DropPayload>;
          };
          update: {
            args: Prisma.DropUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DropPayload>;
          };
          deleteMany: {
            args: Prisma.DropDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.DropUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.DropUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DropPayload>[];
          };
          upsert: {
            args: Prisma.DropUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DropPayload>;
          };
          aggregate: {
            args: Prisma.DropAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateDrop>;
          };
          groupBy: {
            args: Prisma.DropGroupByArgs<ExtArgs>;
            result: $Utils.Optional<DropGroupByOutputType>[];
          };
          count: {
            args: Prisma.DropCountArgs<ExtArgs>;
            result: $Utils.Optional<DropCountAggregateOutputType> | number;
          };
        };
      };
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>;
        fields: Prisma.OrderFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>;
          };
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>;
          };
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[];
          };
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>;
          };
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[];
          };
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>;
          };
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>;
          };
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[];
          };
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>;
          };
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateOrder>;
          };
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>;
            result: $Utils.Optional<OrderGroupByOutputType>[];
          };
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>;
            result: $Utils.Optional<OrderCountAggregateOutputType> | number;
          };
        };
      };
      OrderItem: {
        payload: Prisma.$OrderItemPayload<ExtArgs>;
        fields: Prisma.OrderItemFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.OrderItemFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.OrderItemFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>;
          };
          findFirst: {
            args: Prisma.OrderItemFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.OrderItemFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>;
          };
          findMany: {
            args: Prisma.OrderItemFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[];
          };
          create: {
            args: Prisma.OrderItemCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>;
          };
          createMany: {
            args: Prisma.OrderItemCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.OrderItemCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[];
          };
          delete: {
            args: Prisma.OrderItemDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>;
          };
          update: {
            args: Prisma.OrderItemUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>;
          };
          deleteMany: {
            args: Prisma.OrderItemDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.OrderItemUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.OrderItemUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[];
          };
          upsert: {
            args: Prisma.OrderItemUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>;
          };
          aggregate: {
            args: Prisma.OrderItemAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateOrderItem>;
          };
          groupBy: {
            args: Prisma.OrderItemGroupByArgs<ExtArgs>;
            result: $Utils.Optional<OrderItemGroupByOutputType>[];
          };
          count: {
            args: Prisma.OrderItemCountArgs<ExtArgs>;
            result: $Utils.Optional<OrderItemCountAggregateOutputType> | number;
          };
        };
      };
      Address: {
        payload: Prisma.$AddressPayload<ExtArgs>;
        fields: Prisma.AddressFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.AddressFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AddressPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.AddressFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>;
          };
          findFirst: {
            args: Prisma.AddressFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AddressPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.AddressFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>;
          };
          findMany: {
            args: Prisma.AddressFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>[];
          };
          create: {
            args: Prisma.AddressCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>;
          };
          createMany: {
            args: Prisma.AddressCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.AddressCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>[];
          };
          delete: {
            args: Prisma.AddressDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>;
          };
          update: {
            args: Prisma.AddressUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>;
          };
          deleteMany: {
            args: Prisma.AddressDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.AddressUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.AddressUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>[];
          };
          upsert: {
            args: Prisma.AddressUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>;
          };
          aggregate: {
            args: Prisma.AddressAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateAddress>;
          };
          groupBy: {
            args: Prisma.AddressGroupByArgs<ExtArgs>;
            result: $Utils.Optional<AddressGroupByOutputType>[];
          };
          count: {
            args: Prisma.AddressCountArgs<ExtArgs>;
            result: $Utils.Optional<AddressCountAggregateOutputType> | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    "define",
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = "pretty" | "colorless" | "minimal";
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string;
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig;
  }
  export type GlobalOmitConfig = {
    user?: UserOmit;
    product?: ProductOmit;
    productVariant?: ProductVariantOmit;
    drop?: DropOmit;
    order?: OrderOmit;
    orderItem?: OrderItemOmit;
    address?: AddressOmit;
  };

  /* Types for Logging */
  export type LogLevel = "info" | "query" | "warn" | "error";
  export type LogDefinition = {
    level: LogLevel;
    emit: "stdout" | "event";
  };

  export type GetLogType<T extends LogLevel | LogDefinition> =
    T extends LogDefinition
      ? T["emit"] extends "event"
        ? T["level"]
        : never
      : never;
  export type GetEvents<T extends any> =
    T extends Array<LogLevel | LogDefinition>
      ?
          | GetLogType<T[0]>
          | GetLogType<T[1]>
          | GetLogType<T[2]>
          | GetLogType<T[3]>
      : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | "findUnique"
    | "findUniqueOrThrow"
    | "findMany"
    | "findFirst"
    | "findFirstOrThrow"
    | "create"
    | "createMany"
    | "createManyAndReturn"
    | "update"
    | "updateMany"
    | "updateManyAndReturn"
    | "upsert"
    | "delete"
    | "deleteMany"
    | "executeRaw"
    | "queryRaw"
    | "aggregate"
    | "count"
    | "runCommandRaw"
    | "findRaw"
    | "groupBy";

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName;
    action: PrismaAction;
    args: any;
    dataPath: string[];
    runInTransaction: boolean;
  };

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>;

  // tested in getLogLevel.test.ts
  export function getLogLevel(
    log: Array<LogLevel | LogDefinition>,
  ): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<
    Prisma.DefaultPrismaClient,
    runtime.ITXClientDenyList
  >;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    orders: number;
    addresses: number;
  };

  export type UserCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    orders?: boolean | UserCountOutputTypeCountOrdersArgs;
    addresses?: boolean | UserCountOutputTypeCountAddressesArgs;
  };

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOrdersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: OrderWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAddressesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AddressWhereInput;
  };

  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    orderItems: number;
    variants: number;
  };

  export type ProductCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    orderItems?: boolean | ProductCountOutputTypeCountOrderItemsArgs;
    variants?: boolean | ProductCountOutputTypeCountVariantsArgs;
  };

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountOrderItemsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: OrderItemWhereInput;
  };

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountVariantsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ProductVariantWhereInput;
  };

  /**
   * Count Type ProductVariantCountOutputType
   */

  export type ProductVariantCountOutputType = {
    orderItems: number;
  };

  export type ProductVariantCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    orderItems?: boolean | ProductVariantCountOutputTypeCountOrderItemsArgs;
  };

  // Custom InputTypes
  /**
   * ProductVariantCountOutputType without action
   */
  export type ProductVariantCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductVariantCountOutputType
     */
    select?: ProductVariantCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * ProductVariantCountOutputType without action
   */
  export type ProductVariantCountOutputTypeCountOrderItemsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: OrderItemWhereInput;
  };

  /**
   * Count Type DropCountOutputType
   */

  export type DropCountOutputType = {
    products: number;
  };

  export type DropCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    products?: boolean | DropCountOutputTypeCountProductsArgs;
  };

  // Custom InputTypes
  /**
   * DropCountOutputType without action
   */
  export type DropCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the DropCountOutputType
     */
    select?: DropCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * DropCountOutputType without action
   */
  export type DropCountOutputTypeCountProductsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ProductWhereInput;
  };

  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    items: number;
  };

  export type OrderCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    items?: boolean | OrderCountOutputTypeCountItemsArgs;
  };

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountItemsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: OrderItemWhereInput;
  };

  /**
   * Count Type AddressCountOutputType
   */

  export type AddressCountOutputType = {
    orders: number;
  };

  export type AddressCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    orders?: boolean | AddressCountOutputTypeCountOrdersArgs;
  };

  // Custom InputTypes
  /**
   * AddressCountOutputType without action
   */
  export type AddressCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AddressCountOutputType
     */
    select?: AddressCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * AddressCountOutputType without action
   */
  export type AddressCountOutputTypeCountOrdersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: OrderWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  export type UserMinAggregateOutputType = {
    id: string | null;
    email: string | null;
    name: string | null;
    firebaseUid: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserMaxAggregateOutputType = {
    id: string | null;
    email: string | null;
    name: string | null;
    firebaseUid: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserCountAggregateOutputType = {
    id: number;
    email: number;
    name: number;
    firebaseUid: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type UserMinAggregateInputType = {
    id?: true;
    email?: true;
    name?: true;
    firebaseUid?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserMaxAggregateInputType = {
    id?: true;
    email?: true;
    name?: true;
    firebaseUid?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserCountAggregateInputType = {
    id?: true;
    email?: true;
    name?: true;
    firebaseUid?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type UserAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
     **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UserMaxAggregateInputType;
  };

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>;
  };

  export type UserGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: UserWhereInput;
    orderBy?:
      | UserOrderByWithAggregationInput
      | UserOrderByWithAggregationInput[];
    by: UserScalarFieldEnum[] | UserScalarFieldEnum;
    having?: UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
  };

  export type UserGroupByOutputType = {
    id: string;
    email: string;
    name: string | null;
    firebaseUid: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof UserGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], UserGroupByOutputType[P]>
          : GetScalarType<T[P], UserGroupByOutputType[P]>;
      }
    >
  >;

  export type UserSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      email?: boolean;
      name?: boolean;
      firebaseUid?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      orders?: boolean | User$ordersArgs<ExtArgs>;
      addresses?: boolean | User$addressesArgs<ExtArgs>;
      _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["user"]
  >;

  export type UserSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      email?: boolean;
      name?: boolean;
      firebaseUid?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs["result"]["user"]
  >;

  export type UserSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      email?: boolean;
      name?: boolean;
      firebaseUid?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs["result"]["user"]
  >;

  export type UserSelectScalar = {
    id?: boolean;
    email?: boolean;
    name?: boolean;
    firebaseUid?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type UserOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    "id" | "email" | "name" | "firebaseUid" | "createdAt" | "updatedAt",
    ExtArgs["result"]["user"]
  >;
  export type UserInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    orders?: boolean | User$ordersArgs<ExtArgs>;
    addresses?: boolean | User$addressesArgs<ExtArgs>;
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type UserIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};
  export type UserIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $UserPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "User";
    objects: {
      orders: Prisma.$OrderPayload<ExtArgs>[];
      addresses: Prisma.$AddressPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        email: string;
        name: string | null;
        firebaseUid: string | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["user"]
    >;
    composites: {};
  };

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> =
    $Result.GetResult<Prisma.$UserPayload, S>;

  type UserCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<UserFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: UserCountAggregateInputType | true;
  };

  export interface UserDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["User"];
      meta: { name: "User" };
    };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(
      args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(
      args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
     **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], UserCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends UserAggregateArgs>(
      args: Subset<T, UserAggregateArgs>,
    ): Prisma.PrismaPromise<GetUserAggregateType<T>>;

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs["orderBy"] }
        : { orderBy?: UserGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetUserGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    orders<T extends User$ordersArgs<ExtArgs> = {}>(
      args?: Subset<T, User$ordersArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$OrderPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    addresses<T extends User$addressesArgs<ExtArgs> = {}>(
      args?: Subset<T, User$addressesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$AddressPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", "String">;
    readonly email: FieldRef<"User", "String">;
    readonly name: FieldRef<"User", "String">;
    readonly firebaseUid: FieldRef<"User", "String">;
    readonly createdAt: FieldRef<"User", "DateTime">;
    readonly updatedAt: FieldRef<"User", "DateTime">;
  }

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findMany
   */
  export type UserFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User create
   */
  export type UserCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>;
  };

  /**
   * User createMany
   */
  export type UserCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User update
   */
  export type UserUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User upsert
   */
  export type UserUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
  };

  /**
   * User delete
   */
  export type UserDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
  };

  /**
   * User.orders
   */
  export type User$ordersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    where?: OrderWhereInput;
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[];
    cursor?: OrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[];
  };

  /**
   * User.addresses
   */
  export type User$addressesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null;
    where?: AddressWhereInput;
    orderBy?:
      | AddressOrderByWithRelationInput
      | AddressOrderByWithRelationInput[];
    cursor?: AddressWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[];
  };

  /**
   * User without action
   */
  export type UserDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
  };

  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null;
    _avg: ProductAvgAggregateOutputType | null;
    _sum: ProductSumAggregateOutputType | null;
    _min: ProductMinAggregateOutputType | null;
    _max: ProductMaxAggregateOutputType | null;
  };

  export type ProductAvgAggregateOutputType = {
    price: Decimal | null;
  };

  export type ProductSumAggregateOutputType = {
    price: Decimal | null;
  };

  export type ProductMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    price: Decimal | null;
    slug: string | null;
    category: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    inStock: boolean | null;
    dropId: string | null;
  };

  export type ProductMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    price: Decimal | null;
    slug: string | null;
    category: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    inStock: boolean | null;
    dropId: string | null;
  };

  export type ProductCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    price: number;
    images: number;
    slug: number;
    category: number;
    createdAt: number;
    updatedAt: number;
    inStock: number;
    dropId: number;
    _all: number;
  };

  export type ProductAvgAggregateInputType = {
    price?: true;
  };

  export type ProductSumAggregateInputType = {
    price?: true;
  };

  export type ProductMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    price?: true;
    slug?: true;
    category?: true;
    createdAt?: true;
    updatedAt?: true;
    inStock?: true;
    dropId?: true;
  };

  export type ProductMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    price?: true;
    slug?: true;
    category?: true;
    createdAt?: true;
    updatedAt?: true;
    inStock?: true;
    dropId?: true;
  };

  export type ProductCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    price?: true;
    images?: true;
    slug?: true;
    category?: true;
    createdAt?: true;
    updatedAt?: true;
    inStock?: true;
    dropId?: true;
    _all?: true;
  };

  export type ProductAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Products to fetch.
     */
    orderBy?:
      | ProductOrderByWithRelationInput
      | ProductOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Products from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Products.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Products
     **/
    _count?: true | ProductCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: ProductAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: ProductSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ProductMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ProductMaxAggregateInputType;
  };

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
    [P in keyof T & keyof AggregateProduct]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>;
  };

  export type ProductGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ProductWhereInput;
    orderBy?:
      | ProductOrderByWithAggregationInput
      | ProductOrderByWithAggregationInput[];
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum;
    having?: ProductScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductCountAggregateInputType | true;
    _avg?: ProductAvgAggregateInputType;
    _sum?: ProductSumAggregateInputType;
    _min?: ProductMinAggregateInputType;
    _max?: ProductMaxAggregateInputType;
  };

  export type ProductGroupByOutputType = {
    id: string;
    name: string;
    description: string | null;
    price: Decimal;
    images: string[];
    slug: string;
    category: string | null;
    createdAt: Date;
    updatedAt: Date;
    inStock: boolean;
    dropId: string | null;
    _count: ProductCountAggregateOutputType | null;
    _avg: ProductAvgAggregateOutputType | null;
    _sum: ProductSumAggregateOutputType | null;
    _min: ProductMinAggregateOutputType | null;
    _max: ProductMaxAggregateOutputType | null;
  };

  type GetProductGroupByPayload<T extends ProductGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ProductGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof ProductGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>;
        }
      >
    >;

  export type ProductSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      description?: boolean;
      price?: boolean;
      images?: boolean;
      slug?: boolean;
      category?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      inStock?: boolean;
      dropId?: boolean;
      drop?: boolean | Product$dropArgs<ExtArgs>;
      orderItems?: boolean | Product$orderItemsArgs<ExtArgs>;
      variants?: boolean | Product$variantsArgs<ExtArgs>;
      _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["product"]
  >;

  export type ProductSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      description?: boolean;
      price?: boolean;
      images?: boolean;
      slug?: boolean;
      category?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      inStock?: boolean;
      dropId?: boolean;
      drop?: boolean | Product$dropArgs<ExtArgs>;
    },
    ExtArgs["result"]["product"]
  >;

  export type ProductSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      description?: boolean;
      price?: boolean;
      images?: boolean;
      slug?: boolean;
      category?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      inStock?: boolean;
      dropId?: boolean;
      drop?: boolean | Product$dropArgs<ExtArgs>;
    },
    ExtArgs["result"]["product"]
  >;

  export type ProductSelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    price?: boolean;
    images?: boolean;
    slug?: boolean;
    category?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    inStock?: boolean;
    dropId?: boolean;
  };

  export type ProductOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | "id"
    | "name"
    | "description"
    | "price"
    | "images"
    | "slug"
    | "category"
    | "createdAt"
    | "updatedAt"
    | "inStock"
    | "dropId",
    ExtArgs["result"]["product"]
  >;
  export type ProductInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    drop?: boolean | Product$dropArgs<ExtArgs>;
    orderItems?: boolean | Product$orderItemsArgs<ExtArgs>;
    variants?: boolean | Product$variantsArgs<ExtArgs>;
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type ProductIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    drop?: boolean | Product$dropArgs<ExtArgs>;
  };
  export type ProductIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    drop?: boolean | Product$dropArgs<ExtArgs>;
  };

  export type $ProductPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Product";
    objects: {
      drop: Prisma.$DropPayload<ExtArgs> | null;
      orderItems: Prisma.$OrderItemPayload<ExtArgs>[];
      variants: Prisma.$ProductVariantPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        name: string;
        description: string | null;
        price: Prisma.Decimal;
        images: string[];
        slug: string;
        category: string | null;
        createdAt: Date;
        updatedAt: Date;
        inStock: boolean;
        dropId: string | null;
      },
      ExtArgs["result"]["product"]
    >;
    composites: {};
  };

  type ProductGetPayload<
    S extends boolean | null | undefined | ProductDefaultArgs,
  > = $Result.GetResult<Prisma.$ProductPayload, S>;

  type ProductCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<ProductFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: ProductCountAggregateInputType | true;
  };

  export interface ProductDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Product"];
      meta: { name: "Product" };
    };
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(
      args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<
        Prisma.$ProductPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<
        Prisma.$ProductPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(
      args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<
        Prisma.$ProductPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<
        Prisma.$ProductPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     *
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ProductFindManyArgs>(
      args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ProductPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     *
     */
    create<T extends ProductCreateArgs>(
      args: SelectSubset<T, ProductCreateArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<
        Prisma.$ProductPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ProductCreateManyArgs>(
      args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ProductPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     *
     */
    delete<T extends ProductDeleteArgs>(
      args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<
        Prisma.$ProductPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ProductUpdateArgs>(
      args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<
        Prisma.$ProductPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ProductDeleteManyArgs>(
      args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ProductUpdateManyArgs>(
      args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(
      args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ProductPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(
      args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      $Result.GetResult<
        Prisma.$ProductPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
     **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], ProductCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ProductAggregateArgs>(
      args: Subset<T, ProductAggregateArgs>,
    ): Prisma.PrismaPromise<GetProductAggregateType<T>>;

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs["orderBy"] }
        : { orderBy?: ProductGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetProductGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Product model
     */
    readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    drop<T extends Product$dropArgs<ExtArgs> = {}>(
      args?: Subset<T, Product$dropArgs<ExtArgs>>,
    ): Prisma__DropClient<
      $Result.GetResult<
        Prisma.$DropPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;
    orderItems<T extends Product$orderItemsArgs<ExtArgs> = {}>(
      args?: Subset<T, Product$orderItemsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$OrderItemPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    variants<T extends Product$variantsArgs<ExtArgs> = {}>(
      args?: Subset<T, Product$variantsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$ProductVariantPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", "String">;
    readonly name: FieldRef<"Product", "String">;
    readonly description: FieldRef<"Product", "String">;
    readonly price: FieldRef<"Product", "Decimal">;
    readonly images: FieldRef<"Product", "String[]">;
    readonly slug: FieldRef<"Product", "String">;
    readonly category: FieldRef<"Product", "String">;
    readonly createdAt: FieldRef<"Product", "DateTime">;
    readonly updatedAt: FieldRef<"Product", "DateTime">;
    readonly inStock: FieldRef<"Product", "Boolean">;
    readonly dropId: FieldRef<"Product", "String">;
  }

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput;
  };

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput;
  };

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Products to fetch.
     */
    orderBy?:
      | ProductOrderByWithRelationInput
      | ProductOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Products from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Products.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[];
  };

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Products to fetch.
     */
    orderBy?:
      | ProductOrderByWithRelationInput
      | ProductOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Products from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Products.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[];
  };

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Products to fetch.
     */
    orderBy?:
      | ProductOrderByWithRelationInput
      | ProductOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Products from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Products.
     */
    skip?: number;
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[];
  };

  /**
   * Product create
   */
  export type ProductCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>;
  };

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null;
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Product update
   */
  export type ProductUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>;
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput;
  };

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>;
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput;
    /**
     * Limit how many Products to update.
     */
    limit?: number;
  };

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null;
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>;
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput;
    /**
     * Limit how many Products to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput;
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>;
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>;
  };

  /**
   * Product delete
   */
  export type ProductDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput;
  };

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput;
    /**
     * Limit how many Products to delete.
     */
    limit?: number;
  };

  /**
   * Product.drop
   */
  export type Product$dropArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Drop
     */
    select?: DropSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Drop
     */
    omit?: DropOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DropInclude<ExtArgs> | null;
    where?: DropWhereInput;
  };

  /**
   * Product.orderItems
   */
  export type Product$orderItemsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    where?: OrderItemWhereInput;
    orderBy?:
      | OrderItemOrderByWithRelationInput
      | OrderItemOrderByWithRelationInput[];
    cursor?: OrderItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[];
  };

  /**
   * Product.variants
   */
  export type Product$variantsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null;
    where?: ProductVariantWhereInput;
    orderBy?:
      | ProductVariantOrderByWithRelationInput
      | ProductVariantOrderByWithRelationInput[];
    cursor?: ProductVariantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ProductVariantScalarFieldEnum | ProductVariantScalarFieldEnum[];
  };

  /**
   * Product without action
   */
  export type ProductDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
  };

  /**
   * Model ProductVariant
   */

  export type AggregateProductVariant = {
    _count: ProductVariantCountAggregateOutputType | null;
    _avg: ProductVariantAvgAggregateOutputType | null;
    _sum: ProductVariantSumAggregateOutputType | null;
    _min: ProductVariantMinAggregateOutputType | null;
    _max: ProductVariantMaxAggregateOutputType | null;
  };

  export type ProductVariantAvgAggregateOutputType = {
    stock: number | null;
  };

  export type ProductVariantSumAggregateOutputType = {
    stock: number | null;
  };

  export type ProductVariantMinAggregateOutputType = {
    id: string | null;
    productId: string | null;
    size: string | null;
    color: string | null;
    sku: string | null;
    stock: number | null;
  };

  export type ProductVariantMaxAggregateOutputType = {
    id: string | null;
    productId: string | null;
    size: string | null;
    color: string | null;
    sku: string | null;
    stock: number | null;
  };

  export type ProductVariantCountAggregateOutputType = {
    id: number;
    productId: number;
    size: number;
    color: number;
    sku: number;
    stock: number;
    _all: number;
  };

  export type ProductVariantAvgAggregateInputType = {
    stock?: true;
  };

  export type ProductVariantSumAggregateInputType = {
    stock?: true;
  };

  export type ProductVariantMinAggregateInputType = {
    id?: true;
    productId?: true;
    size?: true;
    color?: true;
    sku?: true;
    stock?: true;
  };

  export type ProductVariantMaxAggregateInputType = {
    id?: true;
    productId?: true;
    size?: true;
    color?: true;
    sku?: true;
    stock?: true;
  };

  export type ProductVariantCountAggregateInputType = {
    id?: true;
    productId?: true;
    size?: true;
    color?: true;
    sku?: true;
    stock?: true;
    _all?: true;
  };

  export type ProductVariantAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ProductVariant to aggregate.
     */
    where?: ProductVariantWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductVariants to fetch.
     */
    orderBy?:
      | ProductVariantOrderByWithRelationInput
      | ProductVariantOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ProductVariantWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductVariants from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductVariants.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ProductVariants
     **/
    _count?: true | ProductVariantCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: ProductVariantAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: ProductVariantSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ProductVariantMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ProductVariantMaxAggregateInputType;
  };

  export type GetProductVariantAggregateType<
    T extends ProductVariantAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateProductVariant]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductVariant[P]>
      : GetScalarType<T[P], AggregateProductVariant[P]>;
  };

  export type ProductVariantGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ProductVariantWhereInput;
    orderBy?:
      | ProductVariantOrderByWithAggregationInput
      | ProductVariantOrderByWithAggregationInput[];
    by: ProductVariantScalarFieldEnum[] | ProductVariantScalarFieldEnum;
    having?: ProductVariantScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductVariantCountAggregateInputType | true;
    _avg?: ProductVariantAvgAggregateInputType;
    _sum?: ProductVariantSumAggregateInputType;
    _min?: ProductVariantMinAggregateInputType;
    _max?: ProductVariantMaxAggregateInputType;
  };

  export type ProductVariantGroupByOutputType = {
    id: string;
    productId: string;
    size: string;
    color: string | null;
    sku: string;
    stock: number;
    _count: ProductVariantCountAggregateOutputType | null;
    _avg: ProductVariantAvgAggregateOutputType | null;
    _sum: ProductVariantSumAggregateOutputType | null;
    _min: ProductVariantMinAggregateOutputType | null;
    _max: ProductVariantMaxAggregateOutputType | null;
  };

  type GetProductVariantGroupByPayload<T extends ProductVariantGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ProductVariantGroupByOutputType, T["by"]> & {
          [P in keyof T &
            keyof ProductVariantGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductVariantGroupByOutputType[P]>
            : GetScalarType<T[P], ProductVariantGroupByOutputType[P]>;
        }
      >
    >;

  export type ProductVariantSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      productId?: boolean;
      size?: boolean;
      color?: boolean;
      sku?: boolean;
      stock?: boolean;
      product?: boolean | ProductDefaultArgs<ExtArgs>;
      orderItems?: boolean | ProductVariant$orderItemsArgs<ExtArgs>;
      _count?: boolean | ProductVariantCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["productVariant"]
  >;

  export type ProductVariantSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      productId?: boolean;
      size?: boolean;
      color?: boolean;
      sku?: boolean;
      stock?: boolean;
      product?: boolean | ProductDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["productVariant"]
  >;

  export type ProductVariantSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      productId?: boolean;
      size?: boolean;
      color?: boolean;
      sku?: boolean;
      stock?: boolean;
      product?: boolean | ProductDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["productVariant"]
  >;

  export type ProductVariantSelectScalar = {
    id?: boolean;
    productId?: boolean;
    size?: boolean;
    color?: boolean;
    sku?: boolean;
    stock?: boolean;
  };

  export type ProductVariantOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    "id" | "productId" | "size" | "color" | "sku" | "stock",
    ExtArgs["result"]["productVariant"]
  >;
  export type ProductVariantInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    product?: boolean | ProductDefaultArgs<ExtArgs>;
    orderItems?: boolean | ProductVariant$orderItemsArgs<ExtArgs>;
    _count?: boolean | ProductVariantCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type ProductVariantIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    product?: boolean | ProductDefaultArgs<ExtArgs>;
  };
  export type ProductVariantIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    product?: boolean | ProductDefaultArgs<ExtArgs>;
  };

  export type $ProductVariantPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "ProductVariant";
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>;
      orderItems: Prisma.$OrderItemPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        productId: string;
        size: string;
        color: string | null;
        sku: string;
        stock: number;
      },
      ExtArgs["result"]["productVariant"]
    >;
    composites: {};
  };

  type ProductVariantGetPayload<
    S extends boolean | null | undefined | ProductVariantDefaultArgs,
  > = $Result.GetResult<Prisma.$ProductVariantPayload, S>;

  type ProductVariantCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    ProductVariantFindManyArgs,
    "select" | "include" | "distinct" | "omit"
  > & {
    select?: ProductVariantCountAggregateInputType | true;
  };

  export interface ProductVariantDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["ProductVariant"];
      meta: { name: "ProductVariant" };
    };
    /**
     * Find zero or one ProductVariant that matches the filter.
     * @param {ProductVariantFindUniqueArgs} args - Arguments to find a ProductVariant
     * @example
     * // Get one ProductVariant
     * const productVariant = await prisma.productVariant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductVariantFindUniqueArgs>(
      args: SelectSubset<T, ProductVariantFindUniqueArgs<ExtArgs>>,
    ): Prisma__ProductVariantClient<
      $Result.GetResult<
        Prisma.$ProductVariantPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one ProductVariant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductVariantFindUniqueOrThrowArgs} args - Arguments to find a ProductVariant
     * @example
     * // Get one ProductVariant
     * const productVariant = await prisma.productVariant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductVariantFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ProductVariantFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__ProductVariantClient<
      $Result.GetResult<
        Prisma.$ProductVariantPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first ProductVariant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantFindFirstArgs} args - Arguments to find a ProductVariant
     * @example
     * // Get one ProductVariant
     * const productVariant = await prisma.productVariant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductVariantFindFirstArgs>(
      args?: SelectSubset<T, ProductVariantFindFirstArgs<ExtArgs>>,
    ): Prisma__ProductVariantClient<
      $Result.GetResult<
        Prisma.$ProductVariantPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first ProductVariant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantFindFirstOrThrowArgs} args - Arguments to find a ProductVariant
     * @example
     * // Get one ProductVariant
     * const productVariant = await prisma.productVariant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductVariantFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ProductVariantFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__ProductVariantClient<
      $Result.GetResult<
        Prisma.$ProductVariantPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more ProductVariants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductVariants
     * const productVariants = await prisma.productVariant.findMany()
     *
     * // Get first 10 ProductVariants
     * const productVariants = await prisma.productVariant.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const productVariantWithIdOnly = await prisma.productVariant.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ProductVariantFindManyArgs>(
      args?: SelectSubset<T, ProductVariantFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ProductVariantPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a ProductVariant.
     * @param {ProductVariantCreateArgs} args - Arguments to create a ProductVariant.
     * @example
     * // Create one ProductVariant
     * const ProductVariant = await prisma.productVariant.create({
     *   data: {
     *     // ... data to create a ProductVariant
     *   }
     * })
     *
     */
    create<T extends ProductVariantCreateArgs>(
      args: SelectSubset<T, ProductVariantCreateArgs<ExtArgs>>,
    ): Prisma__ProductVariantClient<
      $Result.GetResult<
        Prisma.$ProductVariantPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many ProductVariants.
     * @param {ProductVariantCreateManyArgs} args - Arguments to create many ProductVariants.
     * @example
     * // Create many ProductVariants
     * const productVariant = await prisma.productVariant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ProductVariantCreateManyArgs>(
      args?: SelectSubset<T, ProductVariantCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many ProductVariants and returns the data saved in the database.
     * @param {ProductVariantCreateManyAndReturnArgs} args - Arguments to create many ProductVariants.
     * @example
     * // Create many ProductVariants
     * const productVariant = await prisma.productVariant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ProductVariants and only return the `id`
     * const productVariantWithIdOnly = await prisma.productVariant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ProductVariantCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ProductVariantCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ProductVariantPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a ProductVariant.
     * @param {ProductVariantDeleteArgs} args - Arguments to delete one ProductVariant.
     * @example
     * // Delete one ProductVariant
     * const ProductVariant = await prisma.productVariant.delete({
     *   where: {
     *     // ... filter to delete one ProductVariant
     *   }
     * })
     *
     */
    delete<T extends ProductVariantDeleteArgs>(
      args: SelectSubset<T, ProductVariantDeleteArgs<ExtArgs>>,
    ): Prisma__ProductVariantClient<
      $Result.GetResult<
        Prisma.$ProductVariantPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one ProductVariant.
     * @param {ProductVariantUpdateArgs} args - Arguments to update one ProductVariant.
     * @example
     * // Update one ProductVariant
     * const productVariant = await prisma.productVariant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ProductVariantUpdateArgs>(
      args: SelectSubset<T, ProductVariantUpdateArgs<ExtArgs>>,
    ): Prisma__ProductVariantClient<
      $Result.GetResult<
        Prisma.$ProductVariantPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more ProductVariants.
     * @param {ProductVariantDeleteManyArgs} args - Arguments to filter ProductVariants to delete.
     * @example
     * // Delete a few ProductVariants
     * const { count } = await prisma.productVariant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ProductVariantDeleteManyArgs>(
      args?: SelectSubset<T, ProductVariantDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ProductVariants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductVariants
     * const productVariant = await prisma.productVariant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ProductVariantUpdateManyArgs>(
      args: SelectSubset<T, ProductVariantUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ProductVariants and returns the data updated in the database.
     * @param {ProductVariantUpdateManyAndReturnArgs} args - Arguments to update many ProductVariants.
     * @example
     * // Update many ProductVariants
     * const productVariant = await prisma.productVariant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ProductVariants and only return the `id`
     * const productVariantWithIdOnly = await prisma.productVariant.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ProductVariantUpdateManyAndReturnArgs>(
      args: SelectSubset<T, ProductVariantUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ProductVariantPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one ProductVariant.
     * @param {ProductVariantUpsertArgs} args - Arguments to update or create a ProductVariant.
     * @example
     * // Update or create a ProductVariant
     * const productVariant = await prisma.productVariant.upsert({
     *   create: {
     *     // ... data to create a ProductVariant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductVariant we want to update
     *   }
     * })
     */
    upsert<T extends ProductVariantUpsertArgs>(
      args: SelectSubset<T, ProductVariantUpsertArgs<ExtArgs>>,
    ): Prisma__ProductVariantClient<
      $Result.GetResult<
        Prisma.$ProductVariantPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of ProductVariants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantCountArgs} args - Arguments to filter ProductVariants to count.
     * @example
     * // Count the number of ProductVariants
     * const count = await prisma.productVariant.count({
     *   where: {
     *     // ... the filter for the ProductVariants we want to count
     *   }
     * })
     **/
    count<T extends ProductVariantCountArgs>(
      args?: Subset<T, ProductVariantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], ProductVariantCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a ProductVariant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ProductVariantAggregateArgs>(
      args: Subset<T, ProductVariantAggregateArgs>,
    ): Prisma.PrismaPromise<GetProductVariantAggregateType<T>>;

    /**
     * Group by ProductVariant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ProductVariantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductVariantGroupByArgs["orderBy"] }
        : { orderBy?: ProductVariantGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ProductVariantGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetProductVariantGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ProductVariant model
     */
    readonly fields: ProductVariantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductVariant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductVariantClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ProductDefaultArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      | $Result.GetResult<
          Prisma.$ProductPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    orderItems<T extends ProductVariant$orderItemsArgs<ExtArgs> = {}>(
      args?: Subset<T, ProductVariant$orderItemsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$OrderItemPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the ProductVariant model
   */
  interface ProductVariantFieldRefs {
    readonly id: FieldRef<"ProductVariant", "String">;
    readonly productId: FieldRef<"ProductVariant", "String">;
    readonly size: FieldRef<"ProductVariant", "String">;
    readonly color: FieldRef<"ProductVariant", "String">;
    readonly sku: FieldRef<"ProductVariant", "String">;
    readonly stock: FieldRef<"ProductVariant", "Int">;
  }

  // Custom InputTypes
  /**
   * ProductVariant findUnique
   */
  export type ProductVariantFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null;
    /**
     * Filter, which ProductVariant to fetch.
     */
    where: ProductVariantWhereUniqueInput;
  };

  /**
   * ProductVariant findUniqueOrThrow
   */
  export type ProductVariantFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null;
    /**
     * Filter, which ProductVariant to fetch.
     */
    where: ProductVariantWhereUniqueInput;
  };

  /**
   * ProductVariant findFirst
   */
  export type ProductVariantFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null;
    /**
     * Filter, which ProductVariant to fetch.
     */
    where?: ProductVariantWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductVariants to fetch.
     */
    orderBy?:
      | ProductVariantOrderByWithRelationInput
      | ProductVariantOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ProductVariants.
     */
    cursor?: ProductVariantWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductVariants from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductVariants.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ProductVariants.
     */
    distinct?: ProductVariantScalarFieldEnum | ProductVariantScalarFieldEnum[];
  };

  /**
   * ProductVariant findFirstOrThrow
   */
  export type ProductVariantFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null;
    /**
     * Filter, which ProductVariant to fetch.
     */
    where?: ProductVariantWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductVariants to fetch.
     */
    orderBy?:
      | ProductVariantOrderByWithRelationInput
      | ProductVariantOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ProductVariants.
     */
    cursor?: ProductVariantWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductVariants from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductVariants.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ProductVariants.
     */
    distinct?: ProductVariantScalarFieldEnum | ProductVariantScalarFieldEnum[];
  };

  /**
   * ProductVariant findMany
   */
  export type ProductVariantFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null;
    /**
     * Filter, which ProductVariants to fetch.
     */
    where?: ProductVariantWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductVariants to fetch.
     */
    orderBy?:
      | ProductVariantOrderByWithRelationInput
      | ProductVariantOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ProductVariants.
     */
    cursor?: ProductVariantWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductVariants from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductVariants.
     */
    skip?: number;
    distinct?: ProductVariantScalarFieldEnum | ProductVariantScalarFieldEnum[];
  };

  /**
   * ProductVariant create
   */
  export type ProductVariantCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null;
    /**
     * The data needed to create a ProductVariant.
     */
    data: XOR<ProductVariantCreateInput, ProductVariantUncheckedCreateInput>;
  };

  /**
   * ProductVariant createMany
   */
  export type ProductVariantCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many ProductVariants.
     */
    data: ProductVariantCreateManyInput | ProductVariantCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * ProductVariant createManyAndReturn
   */
  export type ProductVariantCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null;
    /**
     * The data used to create many ProductVariants.
     */
    data: ProductVariantCreateManyInput | ProductVariantCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * ProductVariant update
   */
  export type ProductVariantUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null;
    /**
     * The data needed to update a ProductVariant.
     */
    data: XOR<ProductVariantUpdateInput, ProductVariantUncheckedUpdateInput>;
    /**
     * Choose, which ProductVariant to update.
     */
    where: ProductVariantWhereUniqueInput;
  };

  /**
   * ProductVariant updateMany
   */
  export type ProductVariantUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update ProductVariants.
     */
    data: XOR<
      ProductVariantUpdateManyMutationInput,
      ProductVariantUncheckedUpdateManyInput
    >;
    /**
     * Filter which ProductVariants to update
     */
    where?: ProductVariantWhereInput;
    /**
     * Limit how many ProductVariants to update.
     */
    limit?: number;
  };

  /**
   * ProductVariant updateManyAndReturn
   */
  export type ProductVariantUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null;
    /**
     * The data used to update ProductVariants.
     */
    data: XOR<
      ProductVariantUpdateManyMutationInput,
      ProductVariantUncheckedUpdateManyInput
    >;
    /**
     * Filter which ProductVariants to update
     */
    where?: ProductVariantWhereInput;
    /**
     * Limit how many ProductVariants to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * ProductVariant upsert
   */
  export type ProductVariantUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null;
    /**
     * The filter to search for the ProductVariant to update in case it exists.
     */
    where: ProductVariantWhereUniqueInput;
    /**
     * In case the ProductVariant found by the `where` argument doesn't exist, create a new ProductVariant with this data.
     */
    create: XOR<ProductVariantCreateInput, ProductVariantUncheckedCreateInput>;
    /**
     * In case the ProductVariant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductVariantUpdateInput, ProductVariantUncheckedUpdateInput>;
  };

  /**
   * ProductVariant delete
   */
  export type ProductVariantDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null;
    /**
     * Filter which ProductVariant to delete.
     */
    where: ProductVariantWhereUniqueInput;
  };

  /**
   * ProductVariant deleteMany
   */
  export type ProductVariantDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ProductVariants to delete
     */
    where?: ProductVariantWhereInput;
    /**
     * Limit how many ProductVariants to delete.
     */
    limit?: number;
  };

  /**
   * ProductVariant.orderItems
   */
  export type ProductVariant$orderItemsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    where?: OrderItemWhereInput;
    orderBy?:
      | OrderItemOrderByWithRelationInput
      | OrderItemOrderByWithRelationInput[];
    cursor?: OrderItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[];
  };

  /**
   * ProductVariant without action
   */
  export type ProductVariantDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null;
  };

  /**
   * Model Drop
   */

  export type AggregateDrop = {
    _count: DropCountAggregateOutputType | null;
    _min: DropMinAggregateOutputType | null;
    _max: DropMaxAggregateOutputType | null;
  };

  export type DropMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    startDate: Date | null;
    endDate: Date | null;
    isActive: boolean | null;
    password: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type DropMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    startDate: Date | null;
    endDate: Date | null;
    isActive: boolean | null;
    password: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type DropCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    startDate: number;
    endDate: number;
    isActive: number;
    password: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type DropMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    startDate?: true;
    endDate?: true;
    isActive?: true;
    password?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type DropMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    startDate?: true;
    endDate?: true;
    isActive?: true;
    password?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type DropCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    startDate?: true;
    endDate?: true;
    isActive?: true;
    password?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type DropAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Drop to aggregate.
     */
    where?: DropWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Drops to fetch.
     */
    orderBy?: DropOrderByWithRelationInput | DropOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: DropWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Drops from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Drops.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Drops
     **/
    _count?: true | DropCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: DropMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: DropMaxAggregateInputType;
  };

  export type GetDropAggregateType<T extends DropAggregateArgs> = {
    [P in keyof T & keyof AggregateDrop]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDrop[P]>
      : GetScalarType<T[P], AggregateDrop[P]>;
  };

  export type DropGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: DropWhereInput;
    orderBy?:
      | DropOrderByWithAggregationInput
      | DropOrderByWithAggregationInput[];
    by: DropScalarFieldEnum[] | DropScalarFieldEnum;
    having?: DropScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DropCountAggregateInputType | true;
    _min?: DropMinAggregateInputType;
    _max?: DropMaxAggregateInputType;
  };

  export type DropGroupByOutputType = {
    id: string;
    name: string;
    description: string | null;
    startDate: Date;
    endDate: Date | null;
    isActive: boolean;
    password: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: DropCountAggregateOutputType | null;
    _min: DropMinAggregateOutputType | null;
    _max: DropMaxAggregateOutputType | null;
  };

  type GetDropGroupByPayload<T extends DropGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DropGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof DropGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], DropGroupByOutputType[P]>
          : GetScalarType<T[P], DropGroupByOutputType[P]>;
      }
    >
  >;

  export type DropSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      description?: boolean;
      startDate?: boolean;
      endDate?: boolean;
      isActive?: boolean;
      password?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      products?: boolean | Drop$productsArgs<ExtArgs>;
      _count?: boolean | DropCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["drop"]
  >;

  export type DropSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      description?: boolean;
      startDate?: boolean;
      endDate?: boolean;
      isActive?: boolean;
      password?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs["result"]["drop"]
  >;

  export type DropSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      description?: boolean;
      startDate?: boolean;
      endDate?: boolean;
      isActive?: boolean;
      password?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs["result"]["drop"]
  >;

  export type DropSelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    isActive?: boolean;
    password?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type DropOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | "id"
    | "name"
    | "description"
    | "startDate"
    | "endDate"
    | "isActive"
    | "password"
    | "createdAt"
    | "updatedAt",
    ExtArgs["result"]["drop"]
  >;
  export type DropInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    products?: boolean | Drop$productsArgs<ExtArgs>;
    _count?: boolean | DropCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type DropIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};
  export type DropIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $DropPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Drop";
    objects: {
      products: Prisma.$ProductPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        name: string;
        description: string | null;
        startDate: Date;
        endDate: Date | null;
        isActive: boolean;
        password: string | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["drop"]
    >;
    composites: {};
  };

  type DropGetPayload<S extends boolean | null | undefined | DropDefaultArgs> =
    $Result.GetResult<Prisma.$DropPayload, S>;

  type DropCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<DropFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: DropCountAggregateInputType | true;
  };

  export interface DropDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Drop"];
      meta: { name: "Drop" };
    };
    /**
     * Find zero or one Drop that matches the filter.
     * @param {DropFindUniqueArgs} args - Arguments to find a Drop
     * @example
     * // Get one Drop
     * const drop = await prisma.drop.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DropFindUniqueArgs>(
      args: SelectSubset<T, DropFindUniqueArgs<ExtArgs>>,
    ): Prisma__DropClient<
      $Result.GetResult<
        Prisma.$DropPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Drop that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DropFindUniqueOrThrowArgs} args - Arguments to find a Drop
     * @example
     * // Get one Drop
     * const drop = await prisma.drop.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DropFindUniqueOrThrowArgs>(
      args: SelectSubset<T, DropFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__DropClient<
      $Result.GetResult<
        Prisma.$DropPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Drop that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DropFindFirstArgs} args - Arguments to find a Drop
     * @example
     * // Get one Drop
     * const drop = await prisma.drop.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DropFindFirstArgs>(
      args?: SelectSubset<T, DropFindFirstArgs<ExtArgs>>,
    ): Prisma__DropClient<
      $Result.GetResult<
        Prisma.$DropPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Drop that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DropFindFirstOrThrowArgs} args - Arguments to find a Drop
     * @example
     * // Get one Drop
     * const drop = await prisma.drop.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DropFindFirstOrThrowArgs>(
      args?: SelectSubset<T, DropFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__DropClient<
      $Result.GetResult<
        Prisma.$DropPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Drops that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DropFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Drops
     * const drops = await prisma.drop.findMany()
     *
     * // Get first 10 Drops
     * const drops = await prisma.drop.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const dropWithIdOnly = await prisma.drop.findMany({ select: { id: true } })
     *
     */
    findMany<T extends DropFindManyArgs>(
      args?: SelectSubset<T, DropFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$DropPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Drop.
     * @param {DropCreateArgs} args - Arguments to create a Drop.
     * @example
     * // Create one Drop
     * const Drop = await prisma.drop.create({
     *   data: {
     *     // ... data to create a Drop
     *   }
     * })
     *
     */
    create<T extends DropCreateArgs>(
      args: SelectSubset<T, DropCreateArgs<ExtArgs>>,
    ): Prisma__DropClient<
      $Result.GetResult<
        Prisma.$DropPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Drops.
     * @param {DropCreateManyArgs} args - Arguments to create many Drops.
     * @example
     * // Create many Drops
     * const drop = await prisma.drop.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends DropCreateManyArgs>(
      args?: SelectSubset<T, DropCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Drops and returns the data saved in the database.
     * @param {DropCreateManyAndReturnArgs} args - Arguments to create many Drops.
     * @example
     * // Create many Drops
     * const drop = await prisma.drop.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Drops and only return the `id`
     * const dropWithIdOnly = await prisma.drop.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends DropCreateManyAndReturnArgs>(
      args?: SelectSubset<T, DropCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$DropPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Drop.
     * @param {DropDeleteArgs} args - Arguments to delete one Drop.
     * @example
     * // Delete one Drop
     * const Drop = await prisma.drop.delete({
     *   where: {
     *     // ... filter to delete one Drop
     *   }
     * })
     *
     */
    delete<T extends DropDeleteArgs>(
      args: SelectSubset<T, DropDeleteArgs<ExtArgs>>,
    ): Prisma__DropClient<
      $Result.GetResult<
        Prisma.$DropPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Drop.
     * @param {DropUpdateArgs} args - Arguments to update one Drop.
     * @example
     * // Update one Drop
     * const drop = await prisma.drop.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends DropUpdateArgs>(
      args: SelectSubset<T, DropUpdateArgs<ExtArgs>>,
    ): Prisma__DropClient<
      $Result.GetResult<
        Prisma.$DropPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Drops.
     * @param {DropDeleteManyArgs} args - Arguments to filter Drops to delete.
     * @example
     * // Delete a few Drops
     * const { count } = await prisma.drop.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends DropDeleteManyArgs>(
      args?: SelectSubset<T, DropDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Drops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DropUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Drops
     * const drop = await prisma.drop.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends DropUpdateManyArgs>(
      args: SelectSubset<T, DropUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Drops and returns the data updated in the database.
     * @param {DropUpdateManyAndReturnArgs} args - Arguments to update many Drops.
     * @example
     * // Update many Drops
     * const drop = await prisma.drop.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Drops and only return the `id`
     * const dropWithIdOnly = await prisma.drop.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends DropUpdateManyAndReturnArgs>(
      args: SelectSubset<T, DropUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$DropPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Drop.
     * @param {DropUpsertArgs} args - Arguments to update or create a Drop.
     * @example
     * // Update or create a Drop
     * const drop = await prisma.drop.upsert({
     *   create: {
     *     // ... data to create a Drop
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Drop we want to update
     *   }
     * })
     */
    upsert<T extends DropUpsertArgs>(
      args: SelectSubset<T, DropUpsertArgs<ExtArgs>>,
    ): Prisma__DropClient<
      $Result.GetResult<
        Prisma.$DropPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Drops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DropCountArgs} args - Arguments to filter Drops to count.
     * @example
     * // Count the number of Drops
     * const count = await prisma.drop.count({
     *   where: {
     *     // ... the filter for the Drops we want to count
     *   }
     * })
     **/
    count<T extends DropCountArgs>(
      args?: Subset<T, DropCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], DropCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Drop.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DropAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends DropAggregateArgs>(
      args: Subset<T, DropAggregateArgs>,
    ): Prisma.PrismaPromise<GetDropAggregateType<T>>;

    /**
     * Group by Drop.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DropGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends DropGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DropGroupByArgs["orderBy"] }
        : { orderBy?: DropGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, DropGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetDropGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Drop model
     */
    readonly fields: DropFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Drop.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DropClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    products<T extends Drop$productsArgs<ExtArgs> = {}>(
      args?: Subset<T, Drop$productsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$ProductPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Drop model
   */
  interface DropFieldRefs {
    readonly id: FieldRef<"Drop", "String">;
    readonly name: FieldRef<"Drop", "String">;
    readonly description: FieldRef<"Drop", "String">;
    readonly startDate: FieldRef<"Drop", "DateTime">;
    readonly endDate: FieldRef<"Drop", "DateTime">;
    readonly isActive: FieldRef<"Drop", "Boolean">;
    readonly password: FieldRef<"Drop", "String">;
    readonly createdAt: FieldRef<"Drop", "DateTime">;
    readonly updatedAt: FieldRef<"Drop", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Drop findUnique
   */
  export type DropFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Drop
     */
    select?: DropSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Drop
     */
    omit?: DropOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DropInclude<ExtArgs> | null;
    /**
     * Filter, which Drop to fetch.
     */
    where: DropWhereUniqueInput;
  };

  /**
   * Drop findUniqueOrThrow
   */
  export type DropFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Drop
     */
    select?: DropSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Drop
     */
    omit?: DropOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DropInclude<ExtArgs> | null;
    /**
     * Filter, which Drop to fetch.
     */
    where: DropWhereUniqueInput;
  };

  /**
   * Drop findFirst
   */
  export type DropFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Drop
     */
    select?: DropSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Drop
     */
    omit?: DropOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DropInclude<ExtArgs> | null;
    /**
     * Filter, which Drop to fetch.
     */
    where?: DropWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Drops to fetch.
     */
    orderBy?: DropOrderByWithRelationInput | DropOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Drops.
     */
    cursor?: DropWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Drops from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Drops.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Drops.
     */
    distinct?: DropScalarFieldEnum | DropScalarFieldEnum[];
  };

  /**
   * Drop findFirstOrThrow
   */
  export type DropFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Drop
     */
    select?: DropSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Drop
     */
    omit?: DropOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DropInclude<ExtArgs> | null;
    /**
     * Filter, which Drop to fetch.
     */
    where?: DropWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Drops to fetch.
     */
    orderBy?: DropOrderByWithRelationInput | DropOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Drops.
     */
    cursor?: DropWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Drops from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Drops.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Drops.
     */
    distinct?: DropScalarFieldEnum | DropScalarFieldEnum[];
  };

  /**
   * Drop findMany
   */
  export type DropFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Drop
     */
    select?: DropSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Drop
     */
    omit?: DropOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DropInclude<ExtArgs> | null;
    /**
     * Filter, which Drops to fetch.
     */
    where?: DropWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Drops to fetch.
     */
    orderBy?: DropOrderByWithRelationInput | DropOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Drops.
     */
    cursor?: DropWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Drops from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Drops.
     */
    skip?: number;
    distinct?: DropScalarFieldEnum | DropScalarFieldEnum[];
  };

  /**
   * Drop create
   */
  export type DropCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Drop
     */
    select?: DropSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Drop
     */
    omit?: DropOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DropInclude<ExtArgs> | null;
    /**
     * The data needed to create a Drop.
     */
    data: XOR<DropCreateInput, DropUncheckedCreateInput>;
  };

  /**
   * Drop createMany
   */
  export type DropCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Drops.
     */
    data: DropCreateManyInput | DropCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Drop createManyAndReturn
   */
  export type DropCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Drop
     */
    select?: DropSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Drop
     */
    omit?: DropOmit<ExtArgs> | null;
    /**
     * The data used to create many Drops.
     */
    data: DropCreateManyInput | DropCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Drop update
   */
  export type DropUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Drop
     */
    select?: DropSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Drop
     */
    omit?: DropOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DropInclude<ExtArgs> | null;
    /**
     * The data needed to update a Drop.
     */
    data: XOR<DropUpdateInput, DropUncheckedUpdateInput>;
    /**
     * Choose, which Drop to update.
     */
    where: DropWhereUniqueInput;
  };

  /**
   * Drop updateMany
   */
  export type DropUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Drops.
     */
    data: XOR<DropUpdateManyMutationInput, DropUncheckedUpdateManyInput>;
    /**
     * Filter which Drops to update
     */
    where?: DropWhereInput;
    /**
     * Limit how many Drops to update.
     */
    limit?: number;
  };

  /**
   * Drop updateManyAndReturn
   */
  export type DropUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Drop
     */
    select?: DropSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Drop
     */
    omit?: DropOmit<ExtArgs> | null;
    /**
     * The data used to update Drops.
     */
    data: XOR<DropUpdateManyMutationInput, DropUncheckedUpdateManyInput>;
    /**
     * Filter which Drops to update
     */
    where?: DropWhereInput;
    /**
     * Limit how many Drops to update.
     */
    limit?: number;
  };

  /**
   * Drop upsert
   */
  export type DropUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Drop
     */
    select?: DropSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Drop
     */
    omit?: DropOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DropInclude<ExtArgs> | null;
    /**
     * The filter to search for the Drop to update in case it exists.
     */
    where: DropWhereUniqueInput;
    /**
     * In case the Drop found by the `where` argument doesn't exist, create a new Drop with this data.
     */
    create: XOR<DropCreateInput, DropUncheckedCreateInput>;
    /**
     * In case the Drop was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DropUpdateInput, DropUncheckedUpdateInput>;
  };

  /**
   * Drop delete
   */
  export type DropDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Drop
     */
    select?: DropSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Drop
     */
    omit?: DropOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DropInclude<ExtArgs> | null;
    /**
     * Filter which Drop to delete.
     */
    where: DropWhereUniqueInput;
  };

  /**
   * Drop deleteMany
   */
  export type DropDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Drops to delete
     */
    where?: DropWhereInput;
    /**
     * Limit how many Drops to delete.
     */
    limit?: number;
  };

  /**
   * Drop.products
   */
  export type Drop$productsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null;
    where?: ProductWhereInput;
    orderBy?:
      | ProductOrderByWithRelationInput
      | ProductOrderByWithRelationInput[];
    cursor?: ProductWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[];
  };

  /**
   * Drop without action
   */
  export type DropDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Drop
     */
    select?: DropSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Drop
     */
    omit?: DropOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DropInclude<ExtArgs> | null;
  };

  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null;
    _avg: OrderAvgAggregateOutputType | null;
    _sum: OrderSumAggregateOutputType | null;
    _min: OrderMinAggregateOutputType | null;
    _max: OrderMaxAggregateOutputType | null;
  };

  export type OrderAvgAggregateOutputType = {
    total: Decimal | null;
  };

  export type OrderSumAggregateOutputType = {
    total: Decimal | null;
  };

  export type OrderMinAggregateOutputType = {
    id: string | null;
    orderNumber: string | null;
    userId: string | null;
    status: $Enums.OrderStatus | null;
    total: Decimal | null;
    shippingAddressId: string | null;
    stripePaymentIntentId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type OrderMaxAggregateOutputType = {
    id: string | null;
    orderNumber: string | null;
    userId: string | null;
    status: $Enums.OrderStatus | null;
    total: Decimal | null;
    shippingAddressId: string | null;
    stripePaymentIntentId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type OrderCountAggregateOutputType = {
    id: number;
    orderNumber: number;
    userId: number;
    status: number;
    total: number;
    shippingAddressId: number;
    stripePaymentIntentId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type OrderAvgAggregateInputType = {
    total?: true;
  };

  export type OrderSumAggregateInputType = {
    total?: true;
  };

  export type OrderMinAggregateInputType = {
    id?: true;
    orderNumber?: true;
    userId?: true;
    status?: true;
    total?: true;
    shippingAddressId?: true;
    stripePaymentIntentId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type OrderMaxAggregateInputType = {
    id?: true;
    orderNumber?: true;
    userId?: true;
    status?: true;
    total?: true;
    shippingAddressId?: true;
    stripePaymentIntentId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type OrderCountAggregateInputType = {
    id?: true;
    orderNumber?: true;
    userId?: true;
    status?: true;
    total?: true;
    shippingAddressId?: true;
    stripePaymentIntentId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type OrderAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Orders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Orders
     **/
    _count?: true | OrderCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: OrderAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: OrderSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: OrderMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: OrderMaxAggregateInputType;
  };

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
    [P in keyof T & keyof AggregateOrder]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>;
  };

  export type OrderGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: OrderWhereInput;
    orderBy?:
      | OrderOrderByWithAggregationInput
      | OrderOrderByWithAggregationInput[];
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum;
    having?: OrderScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OrderCountAggregateInputType | true;
    _avg?: OrderAvgAggregateInputType;
    _sum?: OrderSumAggregateInputType;
    _min?: OrderMinAggregateInputType;
    _max?: OrderMaxAggregateInputType;
  };

  export type OrderGroupByOutputType = {
    id: string;
    orderNumber: string;
    userId: string;
    status: $Enums.OrderStatus;
    total: Decimal;
    shippingAddressId: string | null;
    stripePaymentIntentId: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: OrderCountAggregateOutputType | null;
    _avg: OrderAvgAggregateOutputType | null;
    _sum: OrderSumAggregateOutputType | null;
    _min: OrderMinAggregateOutputType | null;
    _max: OrderMaxAggregateOutputType | null;
  };

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<OrderGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof OrderGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>;
        }
      >
    >;

  export type OrderSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      orderNumber?: boolean;
      userId?: boolean;
      status?: boolean;
      total?: boolean;
      shippingAddressId?: boolean;
      stripePaymentIntentId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      items?: boolean | Order$itemsArgs<ExtArgs>;
      shippingAddress?: boolean | Order$shippingAddressArgs<ExtArgs>;
      _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["order"]
  >;

  export type OrderSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      orderNumber?: boolean;
      userId?: boolean;
      status?: boolean;
      total?: boolean;
      shippingAddressId?: boolean;
      stripePaymentIntentId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      shippingAddress?: boolean | Order$shippingAddressArgs<ExtArgs>;
    },
    ExtArgs["result"]["order"]
  >;

  export type OrderSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      orderNumber?: boolean;
      userId?: boolean;
      status?: boolean;
      total?: boolean;
      shippingAddressId?: boolean;
      stripePaymentIntentId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      shippingAddress?: boolean | Order$shippingAddressArgs<ExtArgs>;
    },
    ExtArgs["result"]["order"]
  >;

  export type OrderSelectScalar = {
    id?: boolean;
    orderNumber?: boolean;
    userId?: boolean;
    status?: boolean;
    total?: boolean;
    shippingAddressId?: boolean;
    stripePaymentIntentId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type OrderOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | "id"
    | "orderNumber"
    | "userId"
    | "status"
    | "total"
    | "shippingAddressId"
    | "stripePaymentIntentId"
    | "createdAt"
    | "updatedAt",
    ExtArgs["result"]["order"]
  >;
  export type OrderInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    items?: boolean | Order$itemsArgs<ExtArgs>;
    shippingAddress?: boolean | Order$shippingAddressArgs<ExtArgs>;
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type OrderIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    shippingAddress?: boolean | Order$shippingAddressArgs<ExtArgs>;
  };
  export type OrderIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    shippingAddress?: boolean | Order$shippingAddressArgs<ExtArgs>;
  };

  export type $OrderPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Order";
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
      items: Prisma.$OrderItemPayload<ExtArgs>[];
      shippingAddress: Prisma.$AddressPayload<ExtArgs> | null;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        orderNumber: string;
        userId: string;
        status: $Enums.OrderStatus;
        total: Prisma.Decimal;
        shippingAddressId: string | null;
        stripePaymentIntentId: string | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["order"]
    >;
    composites: {};
  };

  type OrderGetPayload<
    S extends boolean | null | undefined | OrderDefaultArgs,
  > = $Result.GetResult<Prisma.$OrderPayload, S>;

  type OrderCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<OrderFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: OrderCountAggregateInputType | true;
  };

  export interface OrderDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Order"];
      meta: { name: "Order" };
    };
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(
      args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<
        Prisma.$OrderPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(
      args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<
        Prisma.$OrderPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(
      args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<
        Prisma.$OrderPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(
      args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<
        Prisma.$OrderPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     *
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     *
     */
    findMany<T extends OrderFindManyArgs>(
      args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$OrderPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     *
     */
    create<T extends OrderCreateArgs>(
      args: SelectSubset<T, OrderCreateArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<
        Prisma.$OrderPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends OrderCreateManyArgs>(
      args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(
      args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$OrderPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     *
     */
    delete<T extends OrderDeleteArgs>(
      args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<
        Prisma.$OrderPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends OrderUpdateArgs>(
      args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<
        Prisma.$OrderPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends OrderDeleteManyArgs>(
      args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends OrderUpdateManyArgs>(
      args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Orders and returns the data updated in the database.
     * @param {OrderUpdateManyAndReturnArgs} args - Arguments to update many Orders.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends OrderUpdateManyAndReturnArgs>(
      args: SelectSubset<T, OrderUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$OrderPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(
      args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      $Result.GetResult<
        Prisma.$OrderPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
     **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], OrderCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends OrderAggregateArgs>(
      args: Subset<T, OrderAggregateArgs>,
    ): Prisma.PrismaPromise<GetOrderAggregateType<T>>;

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs["orderBy"] }
        : { orderBy?: OrderGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetOrderGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Order model
     */
    readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    items<T extends Order$itemsArgs<ExtArgs> = {}>(
      args?: Subset<T, Order$itemsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$OrderItemPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    shippingAddress<T extends Order$shippingAddressArgs<ExtArgs> = {}>(
      args?: Subset<T, Order$shippingAddressArgs<ExtArgs>>,
    ): Prisma__AddressClient<
      $Result.GetResult<
        Prisma.$AddressPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", "String">;
    readonly orderNumber: FieldRef<"Order", "String">;
    readonly userId: FieldRef<"Order", "String">;
    readonly status: FieldRef<"Order", "OrderStatus">;
    readonly total: FieldRef<"Order", "Decimal">;
    readonly shippingAddressId: FieldRef<"Order", "String">;
    readonly stripePaymentIntentId: FieldRef<"Order", "String">;
    readonly createdAt: FieldRef<"Order", "DateTime">;
    readonly updatedAt: FieldRef<"Order", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput;
  };

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput;
  };

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Orders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[];
  };

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Orders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[];
  };

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Orders.
     */
    skip?: number;
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[];
  };

  /**
   * Order create
   */
  export type OrderCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>;
  };

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null;
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Order update
   */
  export type OrderUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>;
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput;
  };

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>;
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput;
    /**
     * Limit how many Orders to update.
     */
    limit?: number;
  };

  /**
   * Order updateManyAndReturn
   */
  export type OrderUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null;
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>;
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput;
    /**
     * Limit how many Orders to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput;
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>;
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>;
  };

  /**
   * Order delete
   */
  export type OrderDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput;
  };

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput;
    /**
     * Limit how many Orders to delete.
     */
    limit?: number;
  };

  /**
   * Order.items
   */
  export type Order$itemsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    where?: OrderItemWhereInput;
    orderBy?:
      | OrderItemOrderByWithRelationInput
      | OrderItemOrderByWithRelationInput[];
    cursor?: OrderItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[];
  };

  /**
   * Order.shippingAddress
   */
  export type Order$shippingAddressArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null;
    where?: AddressWhereInput;
  };

  /**
   * Order without action
   */
  export type OrderDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
  };

  /**
   * Model OrderItem
   */

  export type AggregateOrderItem = {
    _count: OrderItemCountAggregateOutputType | null;
    _avg: OrderItemAvgAggregateOutputType | null;
    _sum: OrderItemSumAggregateOutputType | null;
    _min: OrderItemMinAggregateOutputType | null;
    _max: OrderItemMaxAggregateOutputType | null;
  };

  export type OrderItemAvgAggregateOutputType = {
    quantity: number | null;
    price: Decimal | null;
  };

  export type OrderItemSumAggregateOutputType = {
    quantity: number | null;
    price: Decimal | null;
  };

  export type OrderItemMinAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    productId: string | null;
    variantId: string | null;
    quantity: number | null;
    price: Decimal | null;
  };

  export type OrderItemMaxAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    productId: string | null;
    variantId: string | null;
    quantity: number | null;
    price: Decimal | null;
  };

  export type OrderItemCountAggregateOutputType = {
    id: number;
    orderId: number;
    productId: number;
    variantId: number;
    quantity: number;
    price: number;
    _all: number;
  };

  export type OrderItemAvgAggregateInputType = {
    quantity?: true;
    price?: true;
  };

  export type OrderItemSumAggregateInputType = {
    quantity?: true;
    price?: true;
  };

  export type OrderItemMinAggregateInputType = {
    id?: true;
    orderId?: true;
    productId?: true;
    variantId?: true;
    quantity?: true;
    price?: true;
  };

  export type OrderItemMaxAggregateInputType = {
    id?: true;
    orderId?: true;
    productId?: true;
    variantId?: true;
    quantity?: true;
    price?: true;
  };

  export type OrderItemCountAggregateInputType = {
    id?: true;
    orderId?: true;
    productId?: true;
    variantId?: true;
    quantity?: true;
    price?: true;
    _all?: true;
  };

  export type OrderItemAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which OrderItem to aggregate.
     */
    where?: OrderItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderItems to fetch.
     */
    orderBy?:
      | OrderItemOrderByWithRelationInput
      | OrderItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: OrderItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned OrderItems
     **/
    _count?: true | OrderItemCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: OrderItemAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: OrderItemSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: OrderItemMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: OrderItemMaxAggregateInputType;
  };

  export type GetOrderItemAggregateType<T extends OrderItemAggregateArgs> = {
    [P in keyof T & keyof AggregateOrderItem]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderItem[P]>
      : GetScalarType<T[P], AggregateOrderItem[P]>;
  };

  export type OrderItemGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: OrderItemWhereInput;
    orderBy?:
      | OrderItemOrderByWithAggregationInput
      | OrderItemOrderByWithAggregationInput[];
    by: OrderItemScalarFieldEnum[] | OrderItemScalarFieldEnum;
    having?: OrderItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OrderItemCountAggregateInputType | true;
    _avg?: OrderItemAvgAggregateInputType;
    _sum?: OrderItemSumAggregateInputType;
    _min?: OrderItemMinAggregateInputType;
    _max?: OrderItemMaxAggregateInputType;
  };

  export type OrderItemGroupByOutputType = {
    id: string;
    orderId: string;
    productId: string;
    variantId: string | null;
    quantity: number;
    price: Decimal;
    _count: OrderItemCountAggregateOutputType | null;
    _avg: OrderItemAvgAggregateOutputType | null;
    _sum: OrderItemSumAggregateOutputType | null;
    _min: OrderItemMinAggregateOutputType | null;
    _max: OrderItemMaxAggregateOutputType | null;
  };

  type GetOrderItemGroupByPayload<T extends OrderItemGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<OrderItemGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof OrderItemGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
            : GetScalarType<T[P], OrderItemGroupByOutputType[P]>;
        }
      >
    >;

  export type OrderItemSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      orderId?: boolean;
      productId?: boolean;
      variantId?: boolean;
      quantity?: boolean;
      price?: boolean;
      order?: boolean | OrderDefaultArgs<ExtArgs>;
      product?: boolean | ProductDefaultArgs<ExtArgs>;
      variant?: boolean | OrderItem$variantArgs<ExtArgs>;
    },
    ExtArgs["result"]["orderItem"]
  >;

  export type OrderItemSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      orderId?: boolean;
      productId?: boolean;
      variantId?: boolean;
      quantity?: boolean;
      price?: boolean;
      order?: boolean | OrderDefaultArgs<ExtArgs>;
      product?: boolean | ProductDefaultArgs<ExtArgs>;
      variant?: boolean | OrderItem$variantArgs<ExtArgs>;
    },
    ExtArgs["result"]["orderItem"]
  >;

  export type OrderItemSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      orderId?: boolean;
      productId?: boolean;
      variantId?: boolean;
      quantity?: boolean;
      price?: boolean;
      order?: boolean | OrderDefaultArgs<ExtArgs>;
      product?: boolean | ProductDefaultArgs<ExtArgs>;
      variant?: boolean | OrderItem$variantArgs<ExtArgs>;
    },
    ExtArgs["result"]["orderItem"]
  >;

  export type OrderItemSelectScalar = {
    id?: boolean;
    orderId?: boolean;
    productId?: boolean;
    variantId?: boolean;
    quantity?: boolean;
    price?: boolean;
  };

  export type OrderItemOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    "id" | "orderId" | "productId" | "variantId" | "quantity" | "price",
    ExtArgs["result"]["orderItem"]
  >;
  export type OrderItemInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    order?: boolean | OrderDefaultArgs<ExtArgs>;
    product?: boolean | ProductDefaultArgs<ExtArgs>;
    variant?: boolean | OrderItem$variantArgs<ExtArgs>;
  };
  export type OrderItemIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    order?: boolean | OrderDefaultArgs<ExtArgs>;
    product?: boolean | ProductDefaultArgs<ExtArgs>;
    variant?: boolean | OrderItem$variantArgs<ExtArgs>;
  };
  export type OrderItemIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    order?: boolean | OrderDefaultArgs<ExtArgs>;
    product?: boolean | ProductDefaultArgs<ExtArgs>;
    variant?: boolean | OrderItem$variantArgs<ExtArgs>;
  };

  export type $OrderItemPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "OrderItem";
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>;
      product: Prisma.$ProductPayload<ExtArgs>;
      variant: Prisma.$ProductVariantPayload<ExtArgs> | null;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        orderId: string;
        productId: string;
        variantId: string | null;
        quantity: number;
        price: Prisma.Decimal;
      },
      ExtArgs["result"]["orderItem"]
    >;
    composites: {};
  };

  type OrderItemGetPayload<
    S extends boolean | null | undefined | OrderItemDefaultArgs,
  > = $Result.GetResult<Prisma.$OrderItemPayload, S>;

  type OrderItemCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    OrderItemFindManyArgs,
    "select" | "include" | "distinct" | "omit"
  > & {
    select?: OrderItemCountAggregateInputType | true;
  };

  export interface OrderItemDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["OrderItem"];
      meta: { name: "OrderItem" };
    };
    /**
     * Find zero or one OrderItem that matches the filter.
     * @param {OrderItemFindUniqueArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderItemFindUniqueArgs>(
      args: SelectSubset<T, OrderItemFindUniqueArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<
        Prisma.$OrderItemPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one OrderItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderItemFindUniqueOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderItemFindUniqueOrThrowArgs>(
      args: SelectSubset<T, OrderItemFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<
        Prisma.$OrderItemPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first OrderItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderItemFindFirstArgs>(
      args?: SelectSubset<T, OrderItemFindFirstArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<
        Prisma.$OrderItemPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first OrderItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderItemFindFirstOrThrowArgs>(
      args?: SelectSubset<T, OrderItemFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<
        Prisma.$OrderItemPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more OrderItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderItems
     * const orderItems = await prisma.orderItem.findMany()
     *
     * // Get first 10 OrderItems
     * const orderItems = await prisma.orderItem.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.findMany({ select: { id: true } })
     *
     */
    findMany<T extends OrderItemFindManyArgs>(
      args?: SelectSubset<T, OrderItemFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$OrderItemPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a OrderItem.
     * @param {OrderItemCreateArgs} args - Arguments to create a OrderItem.
     * @example
     * // Create one OrderItem
     * const OrderItem = await prisma.orderItem.create({
     *   data: {
     *     // ... data to create a OrderItem
     *   }
     * })
     *
     */
    create<T extends OrderItemCreateArgs>(
      args: SelectSubset<T, OrderItemCreateArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<
        Prisma.$OrderItemPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many OrderItems.
     * @param {OrderItemCreateManyArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends OrderItemCreateManyArgs>(
      args?: SelectSubset<T, OrderItemCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many OrderItems and returns the data saved in the database.
     * @param {OrderItemCreateManyAndReturnArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many OrderItems and only return the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends OrderItemCreateManyAndReturnArgs>(
      args?: SelectSubset<T, OrderItemCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$OrderItemPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a OrderItem.
     * @param {OrderItemDeleteArgs} args - Arguments to delete one OrderItem.
     * @example
     * // Delete one OrderItem
     * const OrderItem = await prisma.orderItem.delete({
     *   where: {
     *     // ... filter to delete one OrderItem
     *   }
     * })
     *
     */
    delete<T extends OrderItemDeleteArgs>(
      args: SelectSubset<T, OrderItemDeleteArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<
        Prisma.$OrderItemPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one OrderItem.
     * @param {OrderItemUpdateArgs} args - Arguments to update one OrderItem.
     * @example
     * // Update one OrderItem
     * const orderItem = await prisma.orderItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends OrderItemUpdateArgs>(
      args: SelectSubset<T, OrderItemUpdateArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<
        Prisma.$OrderItemPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more OrderItems.
     * @param {OrderItemDeleteManyArgs} args - Arguments to filter OrderItems to delete.
     * @example
     * // Delete a few OrderItems
     * const { count } = await prisma.orderItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends OrderItemDeleteManyArgs>(
      args?: SelectSubset<T, OrderItemDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends OrderItemUpdateManyArgs>(
      args: SelectSubset<T, OrderItemUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more OrderItems and returns the data updated in the database.
     * @param {OrderItemUpdateManyAndReturnArgs} args - Arguments to update many OrderItems.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more OrderItems and only return the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends OrderItemUpdateManyAndReturnArgs>(
      args: SelectSubset<T, OrderItemUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$OrderItemPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one OrderItem.
     * @param {OrderItemUpsertArgs} args - Arguments to update or create a OrderItem.
     * @example
     * // Update or create a OrderItem
     * const orderItem = await prisma.orderItem.upsert({
     *   create: {
     *     // ... data to create a OrderItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderItem we want to update
     *   }
     * })
     */
    upsert<T extends OrderItemUpsertArgs>(
      args: SelectSubset<T, OrderItemUpsertArgs<ExtArgs>>,
    ): Prisma__OrderItemClient<
      $Result.GetResult<
        Prisma.$OrderItemPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemCountArgs} args - Arguments to filter OrderItems to count.
     * @example
     * // Count the number of OrderItems
     * const count = await prisma.orderItem.count({
     *   where: {
     *     // ... the filter for the OrderItems we want to count
     *   }
     * })
     **/
    count<T extends OrderItemCountArgs>(
      args?: Subset<T, OrderItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], OrderItemCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends OrderItemAggregateArgs>(
      args: Subset<T, OrderItemAggregateArgs>,
    ): Prisma.PrismaPromise<GetOrderItemAggregateType<T>>;

    /**
     * Group by OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends OrderItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderItemGroupByArgs["orderBy"] }
        : { orderBy?: OrderItemGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, OrderItemGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetOrderItemGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the OrderItem model
     */
    readonly fields: OrderItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderItemClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, OrderDefaultArgs<ExtArgs>>,
    ): Prisma__OrderClient<
      | $Result.GetResult<
          Prisma.$OrderPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ProductDefaultArgs<ExtArgs>>,
    ): Prisma__ProductClient<
      | $Result.GetResult<
          Prisma.$ProductPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    variant<T extends OrderItem$variantArgs<ExtArgs> = {}>(
      args?: Subset<T, OrderItem$variantArgs<ExtArgs>>,
    ): Prisma__ProductVariantClient<
      $Result.GetResult<
        Prisma.$ProductVariantPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the OrderItem model
   */
  interface OrderItemFieldRefs {
    readonly id: FieldRef<"OrderItem", "String">;
    readonly orderId: FieldRef<"OrderItem", "String">;
    readonly productId: FieldRef<"OrderItem", "String">;
    readonly variantId: FieldRef<"OrderItem", "String">;
    readonly quantity: FieldRef<"OrderItem", "Int">;
    readonly price: FieldRef<"OrderItem", "Decimal">;
  }

  // Custom InputTypes
  /**
   * OrderItem findUnique
   */
  export type OrderItemFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput;
  };

  /**
   * OrderItem findUniqueOrThrow
   */
  export type OrderItemFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput;
  };

  /**
   * OrderItem findFirst
   */
  export type OrderItemFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderItems to fetch.
     */
    orderBy?:
      | OrderItemOrderByWithRelationInput
      | OrderItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[];
  };

  /**
   * OrderItem findFirstOrThrow
   */
  export type OrderItemFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderItems to fetch.
     */
    orderBy?:
      | OrderItemOrderByWithRelationInput
      | OrderItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[];
  };

  /**
   * OrderItem findMany
   */
  export type OrderItemFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * Filter, which OrderItems to fetch.
     */
    where?: OrderItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OrderItems to fetch.
     */
    orderBy?:
      | OrderItemOrderByWithRelationInput
      | OrderItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OrderItems.
     */
    skip?: number;
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[];
  };

  /**
   * OrderItem create
   */
  export type OrderItemCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * The data needed to create a OrderItem.
     */
    data: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>;
  };

  /**
   * OrderItem createMany
   */
  export type OrderItemCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * OrderItem createManyAndReturn
   */
  export type OrderItemCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null;
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * OrderItem update
   */
  export type OrderItemUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * The data needed to update a OrderItem.
     */
    data: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>;
    /**
     * Choose, which OrderItem to update.
     */
    where: OrderItemWhereUniqueInput;
  };

  /**
   * OrderItem updateMany
   */
  export type OrderItemUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update OrderItems.
     */
    data: XOR<
      OrderItemUpdateManyMutationInput,
      OrderItemUncheckedUpdateManyInput
    >;
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput;
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number;
  };

  /**
   * OrderItem updateManyAndReturn
   */
  export type OrderItemUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null;
    /**
     * The data used to update OrderItems.
     */
    data: XOR<
      OrderItemUpdateManyMutationInput,
      OrderItemUncheckedUpdateManyInput
    >;
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput;
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * OrderItem upsert
   */
  export type OrderItemUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * The filter to search for the OrderItem to update in case it exists.
     */
    where: OrderItemWhereUniqueInput;
    /**
     * In case the OrderItem found by the `where` argument doesn't exist, create a new OrderItem with this data.
     */
    create: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>;
    /**
     * In case the OrderItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>;
  };

  /**
   * OrderItem delete
   */
  export type OrderItemDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
    /**
     * Filter which OrderItem to delete.
     */
    where: OrderItemWhereUniqueInput;
  };

  /**
   * OrderItem deleteMany
   */
  export type OrderItemDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which OrderItems to delete
     */
    where?: OrderItemWhereInput;
    /**
     * Limit how many OrderItems to delete.
     */
    limit?: number;
  };

  /**
   * OrderItem.variant
   */
  export type OrderItem$variantArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null;
    where?: ProductVariantWhereInput;
  };

  /**
   * OrderItem without action
   */
  export type OrderItemDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null;
  };

  /**
   * Model Address
   */

  export type AggregateAddress = {
    _count: AddressCountAggregateOutputType | null;
    _min: AddressMinAggregateOutputType | null;
    _max: AddressMaxAggregateOutputType | null;
  };

  export type AddressMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    street: string | null;
    city: string | null;
    state: string | null;
    postalCode: string | null;
    country: string | null;
    isDefault: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type AddressMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    street: string | null;
    city: string | null;
    state: string | null;
    postalCode: string | null;
    country: string | null;
    isDefault: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type AddressCountAggregateOutputType = {
    id: number;
    userId: number;
    street: number;
    city: number;
    state: number;
    postalCode: number;
    country: number;
    isDefault: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type AddressMinAggregateInputType = {
    id?: true;
    userId?: true;
    street?: true;
    city?: true;
    state?: true;
    postalCode?: true;
    country?: true;
    isDefault?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type AddressMaxAggregateInputType = {
    id?: true;
    userId?: true;
    street?: true;
    city?: true;
    state?: true;
    postalCode?: true;
    country?: true;
    isDefault?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type AddressCountAggregateInputType = {
    id?: true;
    userId?: true;
    street?: true;
    city?: true;
    state?: true;
    postalCode?: true;
    country?: true;
    isDefault?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type AddressAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Address to aggregate.
     */
    where?: AddressWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Addresses to fetch.
     */
    orderBy?:
      | AddressOrderByWithRelationInput
      | AddressOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: AddressWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Addresses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Addresses
     **/
    _count?: true | AddressCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: AddressMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: AddressMaxAggregateInputType;
  };

  export type GetAddressAggregateType<T extends AddressAggregateArgs> = {
    [P in keyof T & keyof AggregateAddress]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAddress[P]>
      : GetScalarType<T[P], AggregateAddress[P]>;
  };

  export type AddressGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AddressWhereInput;
    orderBy?:
      | AddressOrderByWithAggregationInput
      | AddressOrderByWithAggregationInput[];
    by: AddressScalarFieldEnum[] | AddressScalarFieldEnum;
    having?: AddressScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AddressCountAggregateInputType | true;
    _min?: AddressMinAggregateInputType;
    _max?: AddressMaxAggregateInputType;
  };

  export type AddressGroupByOutputType = {
    id: string;
    userId: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: AddressCountAggregateOutputType | null;
    _min: AddressMinAggregateOutputType | null;
    _max: AddressMaxAggregateOutputType | null;
  };

  type GetAddressGroupByPayload<T extends AddressGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<AddressGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof AddressGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AddressGroupByOutputType[P]>
            : GetScalarType<T[P], AddressGroupByOutputType[P]>;
        }
      >
    >;

  export type AddressSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      street?: boolean;
      city?: boolean;
      state?: boolean;
      postalCode?: boolean;
      country?: boolean;
      isDefault?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      orders?: boolean | Address$ordersArgs<ExtArgs>;
      _count?: boolean | AddressCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["address"]
  >;

  export type AddressSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      street?: boolean;
      city?: boolean;
      state?: boolean;
      postalCode?: boolean;
      country?: boolean;
      isDefault?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["address"]
  >;

  export type AddressSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      street?: boolean;
      city?: boolean;
      state?: boolean;
      postalCode?: boolean;
      country?: boolean;
      isDefault?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["address"]
  >;

  export type AddressSelectScalar = {
    id?: boolean;
    userId?: boolean;
    street?: boolean;
    city?: boolean;
    state?: boolean;
    postalCode?: boolean;
    country?: boolean;
    isDefault?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type AddressOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | "id"
    | "userId"
    | "street"
    | "city"
    | "state"
    | "postalCode"
    | "country"
    | "isDefault"
    | "createdAt"
    | "updatedAt",
    ExtArgs["result"]["address"]
  >;
  export type AddressInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    orders?: boolean | Address$ordersArgs<ExtArgs>;
    _count?: boolean | AddressCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type AddressIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type AddressIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $AddressPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Address";
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
      orders: Prisma.$OrderPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        userId: string;
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        isDefault: boolean;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["address"]
    >;
    composites: {};
  };

  type AddressGetPayload<
    S extends boolean | null | undefined | AddressDefaultArgs,
  > = $Result.GetResult<Prisma.$AddressPayload, S>;

  type AddressCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<AddressFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: AddressCountAggregateInputType | true;
  };

  export interface AddressDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Address"];
      meta: { name: "Address" };
    };
    /**
     * Find zero or one Address that matches the filter.
     * @param {AddressFindUniqueArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AddressFindUniqueArgs>(
      args: SelectSubset<T, AddressFindUniqueArgs<ExtArgs>>,
    ): Prisma__AddressClient<
      $Result.GetResult<
        Prisma.$AddressPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Address that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AddressFindUniqueOrThrowArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AddressFindUniqueOrThrowArgs>(
      args: SelectSubset<T, AddressFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__AddressClient<
      $Result.GetResult<
        Prisma.$AddressPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Address that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindFirstArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AddressFindFirstArgs>(
      args?: SelectSubset<T, AddressFindFirstArgs<ExtArgs>>,
    ): Prisma__AddressClient<
      $Result.GetResult<
        Prisma.$AddressPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Address that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindFirstOrThrowArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AddressFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AddressFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__AddressClient<
      $Result.GetResult<
        Prisma.$AddressPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Addresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Addresses
     * const addresses = await prisma.address.findMany()
     *
     * // Get first 10 Addresses
     * const addresses = await prisma.address.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const addressWithIdOnly = await prisma.address.findMany({ select: { id: true } })
     *
     */
    findMany<T extends AddressFindManyArgs>(
      args?: SelectSubset<T, AddressFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AddressPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Address.
     * @param {AddressCreateArgs} args - Arguments to create a Address.
     * @example
     * // Create one Address
     * const Address = await prisma.address.create({
     *   data: {
     *     // ... data to create a Address
     *   }
     * })
     *
     */
    create<T extends AddressCreateArgs>(
      args: SelectSubset<T, AddressCreateArgs<ExtArgs>>,
    ): Prisma__AddressClient<
      $Result.GetResult<
        Prisma.$AddressPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Addresses.
     * @param {AddressCreateManyArgs} args - Arguments to create many Addresses.
     * @example
     * // Create many Addresses
     * const address = await prisma.address.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AddressCreateManyArgs>(
      args?: SelectSubset<T, AddressCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Addresses and returns the data saved in the database.
     * @param {AddressCreateManyAndReturnArgs} args - Arguments to create many Addresses.
     * @example
     * // Create many Addresses
     * const address = await prisma.address.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Addresses and only return the `id`
     * const addressWithIdOnly = await prisma.address.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AddressCreateManyAndReturnArgs>(
      args?: SelectSubset<T, AddressCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AddressPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Address.
     * @param {AddressDeleteArgs} args - Arguments to delete one Address.
     * @example
     * // Delete one Address
     * const Address = await prisma.address.delete({
     *   where: {
     *     // ... filter to delete one Address
     *   }
     * })
     *
     */
    delete<T extends AddressDeleteArgs>(
      args: SelectSubset<T, AddressDeleteArgs<ExtArgs>>,
    ): Prisma__AddressClient<
      $Result.GetResult<
        Prisma.$AddressPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Address.
     * @param {AddressUpdateArgs} args - Arguments to update one Address.
     * @example
     * // Update one Address
     * const address = await prisma.address.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AddressUpdateArgs>(
      args: SelectSubset<T, AddressUpdateArgs<ExtArgs>>,
    ): Prisma__AddressClient<
      $Result.GetResult<
        Prisma.$AddressPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Addresses.
     * @param {AddressDeleteManyArgs} args - Arguments to filter Addresses to delete.
     * @example
     * // Delete a few Addresses
     * const { count } = await prisma.address.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AddressDeleteManyArgs>(
      args?: SelectSubset<T, AddressDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Addresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Addresses
     * const address = await prisma.address.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AddressUpdateManyArgs>(
      args: SelectSubset<T, AddressUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Addresses and returns the data updated in the database.
     * @param {AddressUpdateManyAndReturnArgs} args - Arguments to update many Addresses.
     * @example
     * // Update many Addresses
     * const address = await prisma.address.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Addresses and only return the `id`
     * const addressWithIdOnly = await prisma.address.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends AddressUpdateManyAndReturnArgs>(
      args: SelectSubset<T, AddressUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AddressPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Address.
     * @param {AddressUpsertArgs} args - Arguments to update or create a Address.
     * @example
     * // Update or create a Address
     * const address = await prisma.address.upsert({
     *   create: {
     *     // ... data to create a Address
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Address we want to update
     *   }
     * })
     */
    upsert<T extends AddressUpsertArgs>(
      args: SelectSubset<T, AddressUpsertArgs<ExtArgs>>,
    ): Prisma__AddressClient<
      $Result.GetResult<
        Prisma.$AddressPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Addresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressCountArgs} args - Arguments to filter Addresses to count.
     * @example
     * // Count the number of Addresses
     * const count = await prisma.address.count({
     *   where: {
     *     // ... the filter for the Addresses we want to count
     *   }
     * })
     **/
    count<T extends AddressCountArgs>(
      args?: Subset<T, AddressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], AddressCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Address.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends AddressAggregateArgs>(
      args: Subset<T, AddressAggregateArgs>,
    ): Prisma.PrismaPromise<GetAddressAggregateType<T>>;

    /**
     * Group by Address.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends AddressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AddressGroupByArgs["orderBy"] }
        : { orderBy?: AddressGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, AddressGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetAddressGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Address model
     */
    readonly fields: AddressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Address.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AddressClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    orders<T extends Address$ordersArgs<ExtArgs> = {}>(
      args?: Subset<T, Address$ordersArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$OrderPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Address model
   */
  interface AddressFieldRefs {
    readonly id: FieldRef<"Address", "String">;
    readonly userId: FieldRef<"Address", "String">;
    readonly street: FieldRef<"Address", "String">;
    readonly city: FieldRef<"Address", "String">;
    readonly state: FieldRef<"Address", "String">;
    readonly postalCode: FieldRef<"Address", "String">;
    readonly country: FieldRef<"Address", "String">;
    readonly isDefault: FieldRef<"Address", "Boolean">;
    readonly createdAt: FieldRef<"Address", "DateTime">;
    readonly updatedAt: FieldRef<"Address", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Address findUnique
   */
  export type AddressFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null;
    /**
     * Filter, which Address to fetch.
     */
    where: AddressWhereUniqueInput;
  };

  /**
   * Address findUniqueOrThrow
   */
  export type AddressFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null;
    /**
     * Filter, which Address to fetch.
     */
    where: AddressWhereUniqueInput;
  };

  /**
   * Address findFirst
   */
  export type AddressFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null;
    /**
     * Filter, which Address to fetch.
     */
    where?: AddressWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Addresses to fetch.
     */
    orderBy?:
      | AddressOrderByWithRelationInput
      | AddressOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Addresses.
     */
    cursor?: AddressWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Addresses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Addresses.
     */
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[];
  };

  /**
   * Address findFirstOrThrow
   */
  export type AddressFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null;
    /**
     * Filter, which Address to fetch.
     */
    where?: AddressWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Addresses to fetch.
     */
    orderBy?:
      | AddressOrderByWithRelationInput
      | AddressOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Addresses.
     */
    cursor?: AddressWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Addresses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Addresses.
     */
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[];
  };

  /**
   * Address findMany
   */
  export type AddressFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null;
    /**
     * Filter, which Addresses to fetch.
     */
    where?: AddressWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Addresses to fetch.
     */
    orderBy?:
      | AddressOrderByWithRelationInput
      | AddressOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Addresses.
     */
    cursor?: AddressWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Addresses.
     */
    skip?: number;
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[];
  };

  /**
   * Address create
   */
  export type AddressCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null;
    /**
     * The data needed to create a Address.
     */
    data: XOR<AddressCreateInput, AddressUncheckedCreateInput>;
  };

  /**
   * Address createMany
   */
  export type AddressCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Addresses.
     */
    data: AddressCreateManyInput | AddressCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Address createManyAndReturn
   */
  export type AddressCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null;
    /**
     * The data used to create many Addresses.
     */
    data: AddressCreateManyInput | AddressCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Address update
   */
  export type AddressUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null;
    /**
     * The data needed to update a Address.
     */
    data: XOR<AddressUpdateInput, AddressUncheckedUpdateInput>;
    /**
     * Choose, which Address to update.
     */
    where: AddressWhereUniqueInput;
  };

  /**
   * Address updateMany
   */
  export type AddressUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Addresses.
     */
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyInput>;
    /**
     * Filter which Addresses to update
     */
    where?: AddressWhereInput;
    /**
     * Limit how many Addresses to update.
     */
    limit?: number;
  };

  /**
   * Address updateManyAndReturn
   */
  export type AddressUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null;
    /**
     * The data used to update Addresses.
     */
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyInput>;
    /**
     * Filter which Addresses to update
     */
    where?: AddressWhereInput;
    /**
     * Limit how many Addresses to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Address upsert
   */
  export type AddressUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null;
    /**
     * The filter to search for the Address to update in case it exists.
     */
    where: AddressWhereUniqueInput;
    /**
     * In case the Address found by the `where` argument doesn't exist, create a new Address with this data.
     */
    create: XOR<AddressCreateInput, AddressUncheckedCreateInput>;
    /**
     * In case the Address was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AddressUpdateInput, AddressUncheckedUpdateInput>;
  };

  /**
   * Address delete
   */
  export type AddressDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null;
    /**
     * Filter which Address to delete.
     */
    where: AddressWhereUniqueInput;
  };

  /**
   * Address deleteMany
   */
  export type AddressDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Addresses to delete
     */
    where?: AddressWhereInput;
    /**
     * Limit how many Addresses to delete.
     */
    limit?: number;
  };

  /**
   * Address.orders
   */
  export type Address$ordersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null;
    where?: OrderWhereInput;
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[];
    cursor?: OrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[];
  };

  /**
   * Address without action
   */
  export type AddressDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: "ReadUncommitted";
    ReadCommitted: "ReadCommitted";
    RepeatableRead: "RepeatableRead";
    Serializable: "Serializable";
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const UserScalarFieldEnum: {
    id: "id";
    email: "email";
    name: "name";
    firebaseUid: "firebaseUid";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type UserScalarFieldEnum =
    (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];

  export const ProductScalarFieldEnum: {
    id: "id";
    name: "name";
    description: "description";
    price: "price";
    images: "images";
    slug: "slug";
    category: "category";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
    inStock: "inStock";
    dropId: "dropId";
  };

  export type ProductScalarFieldEnum =
    (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum];

  export const ProductVariantScalarFieldEnum: {
    id: "id";
    productId: "productId";
    size: "size";
    color: "color";
    sku: "sku";
    stock: "stock";
  };

  export type ProductVariantScalarFieldEnum =
    (typeof ProductVariantScalarFieldEnum)[keyof typeof ProductVariantScalarFieldEnum];

  export const DropScalarFieldEnum: {
    id: "id";
    name: "name";
    description: "description";
    startDate: "startDate";
    endDate: "endDate";
    isActive: "isActive";
    password: "password";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type DropScalarFieldEnum =
    (typeof DropScalarFieldEnum)[keyof typeof DropScalarFieldEnum];

  export const OrderScalarFieldEnum: {
    id: "id";
    orderNumber: "orderNumber";
    userId: "userId";
    status: "status";
    total: "total";
    shippingAddressId: "shippingAddressId";
    stripePaymentIntentId: "stripePaymentIntentId";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type OrderScalarFieldEnum =
    (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum];

  export const OrderItemScalarFieldEnum: {
    id: "id";
    orderId: "orderId";
    productId: "productId";
    variantId: "variantId";
    quantity: "quantity";
    price: "price";
  };

  export type OrderItemScalarFieldEnum =
    (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum];

  export const AddressScalarFieldEnum: {
    id: "id";
    userId: "userId";
    street: "street";
    city: "city";
    state: "state";
    postalCode: "postalCode";
    country: "country";
    isDefault: "isDefault";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type AddressScalarFieldEnum =
    (typeof AddressScalarFieldEnum)[keyof typeof AddressScalarFieldEnum];

  export const SortOrder: {
    asc: "asc";
    desc: "desc";
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const QueryMode: {
    default: "default";
    insensitive: "insensitive";
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const NullsOrder: {
    first: "first";
    last: "last";
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "String"
  >;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "String[]"
  >;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "DateTime"
  >;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "DateTime[]"
  >;

  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Decimal"
  >;

  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Decimal[]"
  >;

  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Boolean"
  >;

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Int"
  >;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Int[]"
  >;

  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "OrderStatus"
  >;

  /**
   * Reference to a field of type 'OrderStatus[]'
   */
  export type ListEnumOrderStatusFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, "OrderStatus[]">;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Float"
  >;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Float[]"
  >;

  /**
   * Deep Input Types
   */

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[];
    OR?: UserWhereInput[];
    NOT?: UserWhereInput | UserWhereInput[];
    id?: StringFilter<"User"> | string;
    email?: StringFilter<"User"> | string;
    name?: StringNullableFilter<"User"> | string | null;
    firebaseUid?: StringNullableFilter<"User"> | string | null;
    createdAt?: DateTimeFilter<"User"> | Date | string;
    updatedAt?: DateTimeFilter<"User"> | Date | string;
    orders?: OrderListRelationFilter;
    addresses?: AddressListRelationFilter;
  };

  export type UserOrderByWithRelationInput = {
    id?: SortOrder;
    email?: SortOrder;
    name?: SortOrderInput | SortOrder;
    firebaseUid?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    orders?: OrderOrderByRelationAggregateInput;
    addresses?: AddressOrderByRelationAggregateInput;
  };

  export type UserWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      email?: string;
      firebaseUid?: string;
      AND?: UserWhereInput | UserWhereInput[];
      OR?: UserWhereInput[];
      NOT?: UserWhereInput | UserWhereInput[];
      name?: StringNullableFilter<"User"> | string | null;
      createdAt?: DateTimeFilter<"User"> | Date | string;
      updatedAt?: DateTimeFilter<"User"> | Date | string;
      orders?: OrderListRelationFilter;
      addresses?: AddressListRelationFilter;
    },
    "id" | "email" | "firebaseUid"
  >;

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder;
    email?: SortOrder;
    name?: SortOrderInput | SortOrder;
    firebaseUid?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: UserCountOrderByAggregateInput;
    _max?: UserMaxOrderByAggregateInput;
    _min?: UserMinOrderByAggregateInput;
  };

  export type UserScalarWhereWithAggregatesInput = {
    AND?:
      | UserScalarWhereWithAggregatesInput
      | UserScalarWhereWithAggregatesInput[];
    OR?: UserScalarWhereWithAggregatesInput[];
    NOT?:
      | UserScalarWhereWithAggregatesInput
      | UserScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"User"> | string;
    email?: StringWithAggregatesFilter<"User"> | string;
    name?: StringNullableWithAggregatesFilter<"User"> | string | null;
    firebaseUid?: StringNullableWithAggregatesFilter<"User"> | string | null;
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string;
  };

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[];
    OR?: ProductWhereInput[];
    NOT?: ProductWhereInput | ProductWhereInput[];
    id?: StringFilter<"Product"> | string;
    name?: StringFilter<"Product"> | string;
    description?: StringNullableFilter<"Product"> | string | null;
    price?:
      | DecimalFilter<"Product">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    images?: StringNullableListFilter<"Product">;
    slug?: StringFilter<"Product"> | string;
    category?: StringNullableFilter<"Product"> | string | null;
    createdAt?: DateTimeFilter<"Product"> | Date | string;
    updatedAt?: DateTimeFilter<"Product"> | Date | string;
    inStock?: BoolFilter<"Product"> | boolean;
    dropId?: StringNullableFilter<"Product"> | string | null;
    drop?: XOR<DropNullableScalarRelationFilter, DropWhereInput> | null;
    orderItems?: OrderItemListRelationFilter;
    variants?: ProductVariantListRelationFilter;
  };

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrderInput | SortOrder;
    price?: SortOrder;
    images?: SortOrder;
    slug?: SortOrder;
    category?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    inStock?: SortOrder;
    dropId?: SortOrderInput | SortOrder;
    drop?: DropOrderByWithRelationInput;
    orderItems?: OrderItemOrderByRelationAggregateInput;
    variants?: ProductVariantOrderByRelationAggregateInput;
  };

  export type ProductWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      slug?: string;
      AND?: ProductWhereInput | ProductWhereInput[];
      OR?: ProductWhereInput[];
      NOT?: ProductWhereInput | ProductWhereInput[];
      name?: StringFilter<"Product"> | string;
      description?: StringNullableFilter<"Product"> | string | null;
      price?:
        | DecimalFilter<"Product">
        | Decimal
        | DecimalJsLike
        | number
        | string;
      images?: StringNullableListFilter<"Product">;
      category?: StringNullableFilter<"Product"> | string | null;
      createdAt?: DateTimeFilter<"Product"> | Date | string;
      updatedAt?: DateTimeFilter<"Product"> | Date | string;
      inStock?: BoolFilter<"Product"> | boolean;
      dropId?: StringNullableFilter<"Product"> | string | null;
      drop?: XOR<DropNullableScalarRelationFilter, DropWhereInput> | null;
      orderItems?: OrderItemListRelationFilter;
      variants?: ProductVariantListRelationFilter;
    },
    "id" | "slug"
  >;

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrderInput | SortOrder;
    price?: SortOrder;
    images?: SortOrder;
    slug?: SortOrder;
    category?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    inStock?: SortOrder;
    dropId?: SortOrderInput | SortOrder;
    _count?: ProductCountOrderByAggregateInput;
    _avg?: ProductAvgOrderByAggregateInput;
    _max?: ProductMaxOrderByAggregateInput;
    _min?: ProductMinOrderByAggregateInput;
    _sum?: ProductSumOrderByAggregateInput;
  };

  export type ProductScalarWhereWithAggregatesInput = {
    AND?:
      | ProductScalarWhereWithAggregatesInput
      | ProductScalarWhereWithAggregatesInput[];
    OR?: ProductScalarWhereWithAggregatesInput[];
    NOT?:
      | ProductScalarWhereWithAggregatesInput
      | ProductScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Product"> | string;
    name?: StringWithAggregatesFilter<"Product"> | string;
    description?: StringNullableWithAggregatesFilter<"Product"> | string | null;
    price?:
      | DecimalWithAggregatesFilter<"Product">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    images?: StringNullableListFilter<"Product">;
    slug?: StringWithAggregatesFilter<"Product"> | string;
    category?: StringNullableWithAggregatesFilter<"Product"> | string | null;
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string;
    inStock?: BoolWithAggregatesFilter<"Product"> | boolean;
    dropId?: StringNullableWithAggregatesFilter<"Product"> | string | null;
  };

  export type ProductVariantWhereInput = {
    AND?: ProductVariantWhereInput | ProductVariantWhereInput[];
    OR?: ProductVariantWhereInput[];
    NOT?: ProductVariantWhereInput | ProductVariantWhereInput[];
    id?: StringFilter<"ProductVariant"> | string;
    productId?: StringFilter<"ProductVariant"> | string;
    size?: StringFilter<"ProductVariant"> | string;
    color?: StringNullableFilter<"ProductVariant"> | string | null;
    sku?: StringFilter<"ProductVariant"> | string;
    stock?: IntFilter<"ProductVariant"> | number;
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>;
    orderItems?: OrderItemListRelationFilter;
  };

  export type ProductVariantOrderByWithRelationInput = {
    id?: SortOrder;
    productId?: SortOrder;
    size?: SortOrder;
    color?: SortOrderInput | SortOrder;
    sku?: SortOrder;
    stock?: SortOrder;
    product?: ProductOrderByWithRelationInput;
    orderItems?: OrderItemOrderByRelationAggregateInput;
  };

  export type ProductVariantWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      sku?: string;
      AND?: ProductVariantWhereInput | ProductVariantWhereInput[];
      OR?: ProductVariantWhereInput[];
      NOT?: ProductVariantWhereInput | ProductVariantWhereInput[];
      productId?: StringFilter<"ProductVariant"> | string;
      size?: StringFilter<"ProductVariant"> | string;
      color?: StringNullableFilter<"ProductVariant"> | string | null;
      stock?: IntFilter<"ProductVariant"> | number;
      product?: XOR<ProductScalarRelationFilter, ProductWhereInput>;
      orderItems?: OrderItemListRelationFilter;
    },
    "id" | "sku"
  >;

  export type ProductVariantOrderByWithAggregationInput = {
    id?: SortOrder;
    productId?: SortOrder;
    size?: SortOrder;
    color?: SortOrderInput | SortOrder;
    sku?: SortOrder;
    stock?: SortOrder;
    _count?: ProductVariantCountOrderByAggregateInput;
    _avg?: ProductVariantAvgOrderByAggregateInput;
    _max?: ProductVariantMaxOrderByAggregateInput;
    _min?: ProductVariantMinOrderByAggregateInput;
    _sum?: ProductVariantSumOrderByAggregateInput;
  };

  export type ProductVariantScalarWhereWithAggregatesInput = {
    AND?:
      | ProductVariantScalarWhereWithAggregatesInput
      | ProductVariantScalarWhereWithAggregatesInput[];
    OR?: ProductVariantScalarWhereWithAggregatesInput[];
    NOT?:
      | ProductVariantScalarWhereWithAggregatesInput
      | ProductVariantScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"ProductVariant"> | string;
    productId?: StringWithAggregatesFilter<"ProductVariant"> | string;
    size?: StringWithAggregatesFilter<"ProductVariant"> | string;
    color?:
      | StringNullableWithAggregatesFilter<"ProductVariant">
      | string
      | null;
    sku?: StringWithAggregatesFilter<"ProductVariant"> | string;
    stock?: IntWithAggregatesFilter<"ProductVariant"> | number;
  };

  export type DropWhereInput = {
    AND?: DropWhereInput | DropWhereInput[];
    OR?: DropWhereInput[];
    NOT?: DropWhereInput | DropWhereInput[];
    id?: StringFilter<"Drop"> | string;
    name?: StringFilter<"Drop"> | string;
    description?: StringNullableFilter<"Drop"> | string | null;
    startDate?: DateTimeFilter<"Drop"> | Date | string;
    endDate?: DateTimeNullableFilter<"Drop"> | Date | string | null;
    isActive?: BoolFilter<"Drop"> | boolean;
    password?: StringNullableFilter<"Drop"> | string | null;
    createdAt?: DateTimeFilter<"Drop"> | Date | string;
    updatedAt?: DateTimeFilter<"Drop"> | Date | string;
    products?: ProductListRelationFilter;
  };

  export type DropOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrderInput | SortOrder;
    startDate?: SortOrder;
    endDate?: SortOrderInput | SortOrder;
    isActive?: SortOrder;
    password?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    products?: ProductOrderByRelationAggregateInput;
  };

  export type DropWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: DropWhereInput | DropWhereInput[];
      OR?: DropWhereInput[];
      NOT?: DropWhereInput | DropWhereInput[];
      name?: StringFilter<"Drop"> | string;
      description?: StringNullableFilter<"Drop"> | string | null;
      startDate?: DateTimeFilter<"Drop"> | Date | string;
      endDate?: DateTimeNullableFilter<"Drop"> | Date | string | null;
      isActive?: BoolFilter<"Drop"> | boolean;
      password?: StringNullableFilter<"Drop"> | string | null;
      createdAt?: DateTimeFilter<"Drop"> | Date | string;
      updatedAt?: DateTimeFilter<"Drop"> | Date | string;
      products?: ProductListRelationFilter;
    },
    "id"
  >;

  export type DropOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrderInput | SortOrder;
    startDate?: SortOrder;
    endDate?: SortOrderInput | SortOrder;
    isActive?: SortOrder;
    password?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: DropCountOrderByAggregateInput;
    _max?: DropMaxOrderByAggregateInput;
    _min?: DropMinOrderByAggregateInput;
  };

  export type DropScalarWhereWithAggregatesInput = {
    AND?:
      | DropScalarWhereWithAggregatesInput
      | DropScalarWhereWithAggregatesInput[];
    OR?: DropScalarWhereWithAggregatesInput[];
    NOT?:
      | DropScalarWhereWithAggregatesInput
      | DropScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Drop"> | string;
    name?: StringWithAggregatesFilter<"Drop"> | string;
    description?: StringNullableWithAggregatesFilter<"Drop"> | string | null;
    startDate?: DateTimeWithAggregatesFilter<"Drop"> | Date | string;
    endDate?:
      | DateTimeNullableWithAggregatesFilter<"Drop">
      | Date
      | string
      | null;
    isActive?: BoolWithAggregatesFilter<"Drop"> | boolean;
    password?: StringNullableWithAggregatesFilter<"Drop"> | string | null;
    createdAt?: DateTimeWithAggregatesFilter<"Drop"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Drop"> | Date | string;
  };

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[];
    OR?: OrderWhereInput[];
    NOT?: OrderWhereInput | OrderWhereInput[];
    id?: StringFilter<"Order"> | string;
    orderNumber?: StringFilter<"Order"> | string;
    userId?: StringFilter<"Order"> | string;
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus;
    total?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string;
    shippingAddressId?: StringNullableFilter<"Order"> | string | null;
    stripePaymentIntentId?: StringNullableFilter<"Order"> | string | null;
    createdAt?: DateTimeFilter<"Order"> | Date | string;
    updatedAt?: DateTimeFilter<"Order"> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    items?: OrderItemListRelationFilter;
    shippingAddress?: XOR<
      AddressNullableScalarRelationFilter,
      AddressWhereInput
    > | null;
  };

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder;
    orderNumber?: SortOrder;
    userId?: SortOrder;
    status?: SortOrder;
    total?: SortOrder;
    shippingAddressId?: SortOrderInput | SortOrder;
    stripePaymentIntentId?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
    items?: OrderItemOrderByRelationAggregateInput;
    shippingAddress?: AddressOrderByWithRelationInput;
  };

  export type OrderWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      orderNumber?: string;
      AND?: OrderWhereInput | OrderWhereInput[];
      OR?: OrderWhereInput[];
      NOT?: OrderWhereInput | OrderWhereInput[];
      userId?: StringFilter<"Order"> | string;
      status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus;
      total?:
        | DecimalFilter<"Order">
        | Decimal
        | DecimalJsLike
        | number
        | string;
      shippingAddressId?: StringNullableFilter<"Order"> | string | null;
      stripePaymentIntentId?: StringNullableFilter<"Order"> | string | null;
      createdAt?: DateTimeFilter<"Order"> | Date | string;
      updatedAt?: DateTimeFilter<"Order"> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
      items?: OrderItemListRelationFilter;
      shippingAddress?: XOR<
        AddressNullableScalarRelationFilter,
        AddressWhereInput
      > | null;
    },
    "id" | "orderNumber"
  >;

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder;
    orderNumber?: SortOrder;
    userId?: SortOrder;
    status?: SortOrder;
    total?: SortOrder;
    shippingAddressId?: SortOrderInput | SortOrder;
    stripePaymentIntentId?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: OrderCountOrderByAggregateInput;
    _avg?: OrderAvgOrderByAggregateInput;
    _max?: OrderMaxOrderByAggregateInput;
    _min?: OrderMinOrderByAggregateInput;
    _sum?: OrderSumOrderByAggregateInput;
  };

  export type OrderScalarWhereWithAggregatesInput = {
    AND?:
      | OrderScalarWhereWithAggregatesInput
      | OrderScalarWhereWithAggregatesInput[];
    OR?: OrderScalarWhereWithAggregatesInput[];
    NOT?:
      | OrderScalarWhereWithAggregatesInput
      | OrderScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Order"> | string;
    orderNumber?: StringWithAggregatesFilter<"Order"> | string;
    userId?: StringWithAggregatesFilter<"Order"> | string;
    status?: EnumOrderStatusWithAggregatesFilter<"Order"> | $Enums.OrderStatus;
    total?:
      | DecimalWithAggregatesFilter<"Order">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    shippingAddressId?:
      | StringNullableWithAggregatesFilter<"Order">
      | string
      | null;
    stripePaymentIntentId?:
      | StringNullableWithAggregatesFilter<"Order">
      | string
      | null;
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string;
  };

  export type OrderItemWhereInput = {
    AND?: OrderItemWhereInput | OrderItemWhereInput[];
    OR?: OrderItemWhereInput[];
    NOT?: OrderItemWhereInput | OrderItemWhereInput[];
    id?: StringFilter<"OrderItem"> | string;
    orderId?: StringFilter<"OrderItem"> | string;
    productId?: StringFilter<"OrderItem"> | string;
    variantId?: StringNullableFilter<"OrderItem"> | string | null;
    quantity?: IntFilter<"OrderItem"> | number;
    price?:
      | DecimalFilter<"OrderItem">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>;
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>;
    variant?: XOR<
      ProductVariantNullableScalarRelationFilter,
      ProductVariantWhereInput
    > | null;
  };

  export type OrderItemOrderByWithRelationInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    productId?: SortOrder;
    variantId?: SortOrderInput | SortOrder;
    quantity?: SortOrder;
    price?: SortOrder;
    order?: OrderOrderByWithRelationInput;
    product?: ProductOrderByWithRelationInput;
    variant?: ProductVariantOrderByWithRelationInput;
  };

  export type OrderItemWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: OrderItemWhereInput | OrderItemWhereInput[];
      OR?: OrderItemWhereInput[];
      NOT?: OrderItemWhereInput | OrderItemWhereInput[];
      orderId?: StringFilter<"OrderItem"> | string;
      productId?: StringFilter<"OrderItem"> | string;
      variantId?: StringNullableFilter<"OrderItem"> | string | null;
      quantity?: IntFilter<"OrderItem"> | number;
      price?:
        | DecimalFilter<"OrderItem">
        | Decimal
        | DecimalJsLike
        | number
        | string;
      order?: XOR<OrderScalarRelationFilter, OrderWhereInput>;
      product?: XOR<ProductScalarRelationFilter, ProductWhereInput>;
      variant?: XOR<
        ProductVariantNullableScalarRelationFilter,
        ProductVariantWhereInput
      > | null;
    },
    "id"
  >;

  export type OrderItemOrderByWithAggregationInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    productId?: SortOrder;
    variantId?: SortOrderInput | SortOrder;
    quantity?: SortOrder;
    price?: SortOrder;
    _count?: OrderItemCountOrderByAggregateInput;
    _avg?: OrderItemAvgOrderByAggregateInput;
    _max?: OrderItemMaxOrderByAggregateInput;
    _min?: OrderItemMinOrderByAggregateInput;
    _sum?: OrderItemSumOrderByAggregateInput;
  };

  export type OrderItemScalarWhereWithAggregatesInput = {
    AND?:
      | OrderItemScalarWhereWithAggregatesInput
      | OrderItemScalarWhereWithAggregatesInput[];
    OR?: OrderItemScalarWhereWithAggregatesInput[];
    NOT?:
      | OrderItemScalarWhereWithAggregatesInput
      | OrderItemScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"OrderItem"> | string;
    orderId?: StringWithAggregatesFilter<"OrderItem"> | string;
    productId?: StringWithAggregatesFilter<"OrderItem"> | string;
    variantId?: StringNullableWithAggregatesFilter<"OrderItem"> | string | null;
    quantity?: IntWithAggregatesFilter<"OrderItem"> | number;
    price?:
      | DecimalWithAggregatesFilter<"OrderItem">
      | Decimal
      | DecimalJsLike
      | number
      | string;
  };

  export type AddressWhereInput = {
    AND?: AddressWhereInput | AddressWhereInput[];
    OR?: AddressWhereInput[];
    NOT?: AddressWhereInput | AddressWhereInput[];
    id?: StringFilter<"Address"> | string;
    userId?: StringFilter<"Address"> | string;
    street?: StringFilter<"Address"> | string;
    city?: StringFilter<"Address"> | string;
    state?: StringFilter<"Address"> | string;
    postalCode?: StringFilter<"Address"> | string;
    country?: StringFilter<"Address"> | string;
    isDefault?: BoolFilter<"Address"> | boolean;
    createdAt?: DateTimeFilter<"Address"> | Date | string;
    updatedAt?: DateTimeFilter<"Address"> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    orders?: OrderListRelationFilter;
  };

  export type AddressOrderByWithRelationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    street?: SortOrder;
    city?: SortOrder;
    state?: SortOrder;
    postalCode?: SortOrder;
    country?: SortOrder;
    isDefault?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
    orders?: OrderOrderByRelationAggregateInput;
  };

  export type AddressWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: AddressWhereInput | AddressWhereInput[];
      OR?: AddressWhereInput[];
      NOT?: AddressWhereInput | AddressWhereInput[];
      userId?: StringFilter<"Address"> | string;
      street?: StringFilter<"Address"> | string;
      city?: StringFilter<"Address"> | string;
      state?: StringFilter<"Address"> | string;
      postalCode?: StringFilter<"Address"> | string;
      country?: StringFilter<"Address"> | string;
      isDefault?: BoolFilter<"Address"> | boolean;
      createdAt?: DateTimeFilter<"Address"> | Date | string;
      updatedAt?: DateTimeFilter<"Address"> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
      orders?: OrderListRelationFilter;
    },
    "id"
  >;

  export type AddressOrderByWithAggregationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    street?: SortOrder;
    city?: SortOrder;
    state?: SortOrder;
    postalCode?: SortOrder;
    country?: SortOrder;
    isDefault?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: AddressCountOrderByAggregateInput;
    _max?: AddressMaxOrderByAggregateInput;
    _min?: AddressMinOrderByAggregateInput;
  };

  export type AddressScalarWhereWithAggregatesInput = {
    AND?:
      | AddressScalarWhereWithAggregatesInput
      | AddressScalarWhereWithAggregatesInput[];
    OR?: AddressScalarWhereWithAggregatesInput[];
    NOT?:
      | AddressScalarWhereWithAggregatesInput
      | AddressScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Address"> | string;
    userId?: StringWithAggregatesFilter<"Address"> | string;
    street?: StringWithAggregatesFilter<"Address"> | string;
    city?: StringWithAggregatesFilter<"Address"> | string;
    state?: StringWithAggregatesFilter<"Address"> | string;
    postalCode?: StringWithAggregatesFilter<"Address"> | string;
    country?: StringWithAggregatesFilter<"Address"> | string;
    isDefault?: BoolWithAggregatesFilter<"Address"> | boolean;
    createdAt?: DateTimeWithAggregatesFilter<"Address"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Address"> | Date | string;
  };

  export type UserCreateInput = {
    id?: string;
    email: string;
    name?: string | null;
    firebaseUid?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    orders?: OrderCreateNestedManyWithoutUserInput;
    addresses?: AddressCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateInput = {
    id?: string;
    email: string;
    name?: string | null;
    firebaseUid?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput;
    addresses?: AddressUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    orders?: OrderUpdateManyWithoutUserNestedInput;
    addresses?: AddressUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput;
    addresses?: AddressUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type UserCreateManyInput = {
    id?: string;
    email: string;
    name?: string | null;
    firebaseUid?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProductCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    price: Decimal | DecimalJsLike | number | string;
    images?: ProductCreateimagesInput | string[];
    slug: string;
    category?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    inStock?: boolean;
    drop?: DropCreateNestedOneWithoutProductsInput;
    orderItems?: OrderItemCreateNestedManyWithoutProductInput;
    variants?: ProductVariantCreateNestedManyWithoutProductInput;
  };

  export type ProductUncheckedCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    price: Decimal | DecimalJsLike | number | string;
    images?: ProductCreateimagesInput | string[];
    slug: string;
    category?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    inStock?: boolean;
    dropId?: string | null;
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput;
    variants?: ProductVariantUncheckedCreateNestedManyWithoutProductInput;
  };

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    images?: ProductUpdateimagesInput | string[];
    slug?: StringFieldUpdateOperationsInput | string;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    inStock?: BoolFieldUpdateOperationsInput | boolean;
    drop?: DropUpdateOneWithoutProductsNestedInput;
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput;
    variants?: ProductVariantUpdateManyWithoutProductNestedInput;
  };

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    images?: ProductUpdateimagesInput | string[];
    slug?: StringFieldUpdateOperationsInput | string;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    inStock?: BoolFieldUpdateOperationsInput | boolean;
    dropId?: NullableStringFieldUpdateOperationsInput | string | null;
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput;
    variants?: ProductVariantUncheckedUpdateManyWithoutProductNestedInput;
  };

  export type ProductCreateManyInput = {
    id?: string;
    name: string;
    description?: string | null;
    price: Decimal | DecimalJsLike | number | string;
    images?: ProductCreateimagesInput | string[];
    slug: string;
    category?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    inStock?: boolean;
    dropId?: string | null;
  };

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    images?: ProductUpdateimagesInput | string[];
    slug?: StringFieldUpdateOperationsInput | string;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    inStock?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    images?: ProductUpdateimagesInput | string[];
    slug?: StringFieldUpdateOperationsInput | string;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    inStock?: BoolFieldUpdateOperationsInput | boolean;
    dropId?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type ProductVariantCreateInput = {
    id?: string;
    size: string;
    color?: string | null;
    sku: string;
    stock?: number;
    product: ProductCreateNestedOneWithoutVariantsInput;
    orderItems?: OrderItemCreateNestedManyWithoutVariantInput;
  };

  export type ProductVariantUncheckedCreateInput = {
    id?: string;
    productId: string;
    size: string;
    color?: string | null;
    sku: string;
    stock?: number;
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutVariantInput;
  };

  export type ProductVariantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    size?: StringFieldUpdateOperationsInput | string;
    color?: NullableStringFieldUpdateOperationsInput | string | null;
    sku?: StringFieldUpdateOperationsInput | string;
    stock?: IntFieldUpdateOperationsInput | number;
    product?: ProductUpdateOneRequiredWithoutVariantsNestedInput;
    orderItems?: OrderItemUpdateManyWithoutVariantNestedInput;
  };

  export type ProductVariantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    size?: StringFieldUpdateOperationsInput | string;
    color?: NullableStringFieldUpdateOperationsInput | string | null;
    sku?: StringFieldUpdateOperationsInput | string;
    stock?: IntFieldUpdateOperationsInput | number;
    orderItems?: OrderItemUncheckedUpdateManyWithoutVariantNestedInput;
  };

  export type ProductVariantCreateManyInput = {
    id?: string;
    productId: string;
    size: string;
    color?: string | null;
    sku: string;
    stock?: number;
  };

  export type ProductVariantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    size?: StringFieldUpdateOperationsInput | string;
    color?: NullableStringFieldUpdateOperationsInput | string | null;
    sku?: StringFieldUpdateOperationsInput | string;
    stock?: IntFieldUpdateOperationsInput | number;
  };

  export type ProductVariantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    size?: StringFieldUpdateOperationsInput | string;
    color?: NullableStringFieldUpdateOperationsInput | string | null;
    sku?: StringFieldUpdateOperationsInput | string;
    stock?: IntFieldUpdateOperationsInput | number;
  };

  export type DropCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    startDate: Date | string;
    endDate?: Date | string | null;
    isActive?: boolean;
    password?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    products?: ProductCreateNestedManyWithoutDropInput;
  };

  export type DropUncheckedCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    startDate: Date | string;
    endDate?: Date | string | null;
    isActive?: boolean;
    password?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    products?: ProductUncheckedCreateNestedManyWithoutDropInput;
  };

  export type DropUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    products?: ProductUpdateManyWithoutDropNestedInput;
  };

  export type DropUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    products?: ProductUncheckedUpdateManyWithoutDropNestedInput;
  };

  export type DropCreateManyInput = {
    id?: string;
    name: string;
    description?: string | null;
    startDate: Date | string;
    endDate?: Date | string | null;
    isActive?: boolean;
    password?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type DropUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type DropUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OrderCreateInput = {
    id?: string;
    orderNumber: string;
    status?: $Enums.OrderStatus;
    total: Decimal | DecimalJsLike | number | string;
    stripePaymentIntentId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutOrdersInput;
    items?: OrderItemCreateNestedManyWithoutOrderInput;
    shippingAddress?: AddressCreateNestedOneWithoutOrdersInput;
  };

  export type OrderUncheckedCreateInput = {
    id?: string;
    orderNumber: string;
    userId: string;
    status?: $Enums.OrderStatus;
    total: Decimal | DecimalJsLike | number | string;
    shippingAddressId?: string | null;
    stripePaymentIntentId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput;
  };

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderNumber?: StringFieldUpdateOperationsInput | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    total?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    stripePaymentIntentId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput;
    items?: OrderItemUpdateManyWithoutOrderNestedInput;
    shippingAddress?: AddressUpdateOneWithoutOrdersNestedInput;
  };

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderNumber?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    total?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    shippingAddressId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    stripePaymentIntentId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput;
  };

  export type OrderCreateManyInput = {
    id?: string;
    orderNumber: string;
    userId: string;
    status?: $Enums.OrderStatus;
    total: Decimal | DecimalJsLike | number | string;
    shippingAddressId?: string | null;
    stripePaymentIntentId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderNumber?: StringFieldUpdateOperationsInput | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    total?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    stripePaymentIntentId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderNumber?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    total?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    shippingAddressId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    stripePaymentIntentId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OrderItemCreateInput = {
    id?: string;
    quantity: number;
    price: Decimal | DecimalJsLike | number | string;
    order: OrderCreateNestedOneWithoutItemsInput;
    product: ProductCreateNestedOneWithoutOrderItemsInput;
    variant?: ProductVariantCreateNestedOneWithoutOrderItemsInput;
  };

  export type OrderItemUncheckedCreateInput = {
    id?: string;
    orderId: string;
    productId: string;
    variantId?: string | null;
    quantity: number;
    price: Decimal | DecimalJsLike | number | string;
  };

  export type OrderItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    quantity?: IntFieldUpdateOperationsInput | number;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput;
    product?: ProductUpdateOneRequiredWithoutOrderItemsNestedInput;
    variant?: ProductVariantUpdateOneWithoutOrderItemsNestedInput;
  };

  export type OrderItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderId?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    variantId?: NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: IntFieldUpdateOperationsInput | number;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
  };

  export type OrderItemCreateManyInput = {
    id?: string;
    orderId: string;
    productId: string;
    variantId?: string | null;
    quantity: number;
    price: Decimal | DecimalJsLike | number | string;
  };

  export type OrderItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    quantity?: IntFieldUpdateOperationsInput | number;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
  };

  export type OrderItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderId?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    variantId?: NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: IntFieldUpdateOperationsInput | number;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
  };

  export type AddressCreateInput = {
    id?: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country?: string;
    isDefault?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutAddressesInput;
    orders?: OrderCreateNestedManyWithoutShippingAddressInput;
  };

  export type AddressUncheckedCreateInput = {
    id?: string;
    userId: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country?: string;
    isDefault?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    orders?: OrderUncheckedCreateNestedManyWithoutShippingAddressInput;
  };

  export type AddressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    street?: StringFieldUpdateOperationsInput | string;
    city?: StringFieldUpdateOperationsInput | string;
    state?: StringFieldUpdateOperationsInput | string;
    postalCode?: StringFieldUpdateOperationsInput | string;
    country?: StringFieldUpdateOperationsInput | string;
    isDefault?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutAddressesNestedInput;
    orders?: OrderUpdateManyWithoutShippingAddressNestedInput;
  };

  export type AddressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    street?: StringFieldUpdateOperationsInput | string;
    city?: StringFieldUpdateOperationsInput | string;
    state?: StringFieldUpdateOperationsInput | string;
    postalCode?: StringFieldUpdateOperationsInput | string;
    country?: StringFieldUpdateOperationsInput | string;
    isDefault?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    orders?: OrderUncheckedUpdateManyWithoutShippingAddressNestedInput;
  };

  export type AddressCreateManyInput = {
    id?: string;
    userId: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country?: string;
    isDefault?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AddressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    street?: StringFieldUpdateOperationsInput | string;
    city?: StringFieldUpdateOperationsInput | string;
    state?: StringFieldUpdateOperationsInput | string;
    postalCode?: StringFieldUpdateOperationsInput | string;
    country?: StringFieldUpdateOperationsInput | string;
    isDefault?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AddressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    street?: StringFieldUpdateOperationsInput | string;
    city?: StringFieldUpdateOperationsInput | string;
    state?: StringFieldUpdateOperationsInput | string;
    postalCode?: StringFieldUpdateOperationsInput | string;
    country?: StringFieldUpdateOperationsInput | string;
    isDefault?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type OrderListRelationFilter = {
    every?: OrderWhereInput;
    some?: OrderWhereInput;
    none?: OrderWhereInput;
  };

  export type AddressListRelationFilter = {
    every?: AddressWhereInput;
    some?: AddressWhereInput;
    none?: AddressWhereInput;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type AddressOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder;
    email?: SortOrder;
    name?: SortOrder;
    firebaseUid?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder;
    email?: SortOrder;
    name?: SortOrder;
    firebaseUid?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder;
    email?: SortOrder;
    name?: SortOrder;
    firebaseUid?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type DecimalFilter<$PrismaModel = never> = {
    equals?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    lt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    lte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string;
  };

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
  };

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type DropNullableScalarRelationFilter = {
    is?: DropWhereInput | null;
    isNot?: DropWhereInput | null;
  };

  export type OrderItemListRelationFilter = {
    every?: OrderItemWhereInput;
    some?: OrderItemWhereInput;
    none?: OrderItemWhereInput;
  };

  export type ProductVariantListRelationFilter = {
    every?: ProductVariantWhereInput;
    some?: ProductVariantWhereInput;
    none?: ProductVariantWhereInput;
  };

  export type OrderItemOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ProductVariantOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    price?: SortOrder;
    images?: SortOrder;
    slug?: SortOrder;
    category?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    inStock?: SortOrder;
    dropId?: SortOrder;
  };

  export type ProductAvgOrderByAggregateInput = {
    price?: SortOrder;
  };

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    price?: SortOrder;
    slug?: SortOrder;
    category?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    inStock?: SortOrder;
    dropId?: SortOrder;
  };

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    price?: SortOrder;
    slug?: SortOrder;
    category?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    inStock?: SortOrder;
    dropId?: SortOrder;
  };

  export type ProductSumOrderByAggregateInput = {
    price?: SortOrder;
  };

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    lt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    lte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalWithAggregatesFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedDecimalFilter<$PrismaModel>;
    _sum?: NestedDecimalFilter<$PrismaModel>;
    _min?: NestedDecimalFilter<$PrismaModel>;
    _max?: NestedDecimalFilter<$PrismaModel>;
  };

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput;
    isNot?: ProductWhereInput;
  };

  export type ProductVariantCountOrderByAggregateInput = {
    id?: SortOrder;
    productId?: SortOrder;
    size?: SortOrder;
    color?: SortOrder;
    sku?: SortOrder;
    stock?: SortOrder;
  };

  export type ProductVariantAvgOrderByAggregateInput = {
    stock?: SortOrder;
  };

  export type ProductVariantMaxOrderByAggregateInput = {
    id?: SortOrder;
    productId?: SortOrder;
    size?: SortOrder;
    color?: SortOrder;
    sku?: SortOrder;
    stock?: SortOrder;
  };

  export type ProductVariantMinOrderByAggregateInput = {
    id?: SortOrder;
    productId?: SortOrder;
    size?: SortOrder;
    color?: SortOrder;
    sku?: SortOrder;
    stock?: SortOrder;
  };

  export type ProductVariantSumOrderByAggregateInput = {
    stock?: SortOrder;
  };

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type ProductListRelationFilter = {
    every?: ProductWhereInput;
    some?: ProductWhereInput;
    none?: ProductWhereInput;
  };

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type DropCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    startDate?: SortOrder;
    endDate?: SortOrder;
    isActive?: SortOrder;
    password?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type DropMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    startDate?: SortOrder;
    endDate?: SortOrder;
    isActive?: SortOrder;
    password?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type DropMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    startDate?: SortOrder;
    endDate?: SortOrder;
    isActive?: SortOrder;
    password?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?:
      | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
      | Date
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: NestedDateTimeNullableFilter<$PrismaModel>;
  };

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.OrderStatus[]
      | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus;
  };

  export type UserScalarRelationFilter = {
    is?: UserWhereInput;
    isNot?: UserWhereInput;
  };

  export type AddressNullableScalarRelationFilter = {
    is?: AddressWhereInput | null;
    isNot?: AddressWhereInput | null;
  };

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder;
    orderNumber?: SortOrder;
    userId?: SortOrder;
    status?: SortOrder;
    total?: SortOrder;
    shippingAddressId?: SortOrder;
    stripePaymentIntentId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type OrderAvgOrderByAggregateInput = {
    total?: SortOrder;
  };

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder;
    orderNumber?: SortOrder;
    userId?: SortOrder;
    status?: SortOrder;
    total?: SortOrder;
    shippingAddressId?: SortOrder;
    stripePaymentIntentId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder;
    orderNumber?: SortOrder;
    userId?: SortOrder;
    status?: SortOrder;
    total?: SortOrder;
    shippingAddressId?: SortOrder;
    stripePaymentIntentId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type OrderSumOrderByAggregateInput = {
    total?: SortOrder;
  };

  export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.OrderStatus[]
      | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.OrderStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>;
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>;
  };

  export type OrderScalarRelationFilter = {
    is?: OrderWhereInput;
    isNot?: OrderWhereInput;
  };

  export type ProductVariantNullableScalarRelationFilter = {
    is?: ProductVariantWhereInput | null;
    isNot?: ProductVariantWhereInput | null;
  };

  export type OrderItemCountOrderByAggregateInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    productId?: SortOrder;
    variantId?: SortOrder;
    quantity?: SortOrder;
    price?: SortOrder;
  };

  export type OrderItemAvgOrderByAggregateInput = {
    quantity?: SortOrder;
    price?: SortOrder;
  };

  export type OrderItemMaxOrderByAggregateInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    productId?: SortOrder;
    variantId?: SortOrder;
    quantity?: SortOrder;
    price?: SortOrder;
  };

  export type OrderItemMinOrderByAggregateInput = {
    id?: SortOrder;
    orderId?: SortOrder;
    productId?: SortOrder;
    variantId?: SortOrder;
    quantity?: SortOrder;
    price?: SortOrder;
  };

  export type OrderItemSumOrderByAggregateInput = {
    quantity?: SortOrder;
    price?: SortOrder;
  };

  export type AddressCountOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    street?: SortOrder;
    city?: SortOrder;
    state?: SortOrder;
    postalCode?: SortOrder;
    country?: SortOrder;
    isDefault?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type AddressMaxOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    street?: SortOrder;
    city?: SortOrder;
    state?: SortOrder;
    postalCode?: SortOrder;
    country?: SortOrder;
    isDefault?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type AddressMinOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    street?: SortOrder;
    city?: SortOrder;
    state?: SortOrder;
    postalCode?: SortOrder;
    country?: SortOrder;
    isDefault?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type OrderCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
      | OrderCreateWithoutUserInput[]
      | OrderUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | OrderCreateOrConnectWithoutUserInput
      | OrderCreateOrConnectWithoutUserInput[];
    createMany?: OrderCreateManyUserInputEnvelope;
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
  };

  export type AddressCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          AddressCreateWithoutUserInput,
          AddressUncheckedCreateWithoutUserInput
        >
      | AddressCreateWithoutUserInput[]
      | AddressUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AddressCreateOrConnectWithoutUserInput
      | AddressCreateOrConnectWithoutUserInput[];
    createMany?: AddressCreateManyUserInputEnvelope;
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[];
  };

  export type OrderUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
      | OrderCreateWithoutUserInput[]
      | OrderUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | OrderCreateOrConnectWithoutUserInput
      | OrderCreateOrConnectWithoutUserInput[];
    createMany?: OrderCreateManyUserInputEnvelope;
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
  };

  export type AddressUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          AddressCreateWithoutUserInput,
          AddressUncheckedCreateWithoutUserInput
        >
      | AddressCreateWithoutUserInput[]
      | AddressUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AddressCreateOrConnectWithoutUserInput
      | AddressCreateOrConnectWithoutUserInput[];
    createMany?: AddressCreateManyUserInputEnvelope;
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[];
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type OrderUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
      | OrderCreateWithoutUserInput[]
      | OrderUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | OrderCreateOrConnectWithoutUserInput
      | OrderCreateOrConnectWithoutUserInput[];
    upsert?:
      | OrderUpsertWithWhereUniqueWithoutUserInput
      | OrderUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: OrderCreateManyUserInputEnvelope;
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    update?:
      | OrderUpdateWithWhereUniqueWithoutUserInput
      | OrderUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | OrderUpdateManyWithWhereWithoutUserInput
      | OrderUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[];
  };

  export type AddressUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          AddressCreateWithoutUserInput,
          AddressUncheckedCreateWithoutUserInput
        >
      | AddressCreateWithoutUserInput[]
      | AddressUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AddressCreateOrConnectWithoutUserInput
      | AddressCreateOrConnectWithoutUserInput[];
    upsert?:
      | AddressUpsertWithWhereUniqueWithoutUserInput
      | AddressUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: AddressCreateManyUserInputEnvelope;
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[];
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[];
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[];
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[];
    update?:
      | AddressUpdateWithWhereUniqueWithoutUserInput
      | AddressUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | AddressUpdateManyWithWhereWithoutUserInput
      | AddressUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[];
  };

  export type OrderUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
      | OrderCreateWithoutUserInput[]
      | OrderUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | OrderCreateOrConnectWithoutUserInput
      | OrderCreateOrConnectWithoutUserInput[];
    upsert?:
      | OrderUpsertWithWhereUniqueWithoutUserInput
      | OrderUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: OrderCreateManyUserInputEnvelope;
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    update?:
      | OrderUpdateWithWhereUniqueWithoutUserInput
      | OrderUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | OrderUpdateManyWithWhereWithoutUserInput
      | OrderUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[];
  };

  export type AddressUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          AddressCreateWithoutUserInput,
          AddressUncheckedCreateWithoutUserInput
        >
      | AddressCreateWithoutUserInput[]
      | AddressUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AddressCreateOrConnectWithoutUserInput
      | AddressCreateOrConnectWithoutUserInput[];
    upsert?:
      | AddressUpsertWithWhereUniqueWithoutUserInput
      | AddressUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: AddressCreateManyUserInputEnvelope;
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[];
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[];
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[];
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[];
    update?:
      | AddressUpdateWithWhereUniqueWithoutUserInput
      | AddressUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | AddressUpdateManyWithWhereWithoutUserInput
      | AddressUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[];
  };

  export type ProductCreateimagesInput = {
    set: string[];
  };

  export type DropCreateNestedOneWithoutProductsInput = {
    create?: XOR<
      DropCreateWithoutProductsInput,
      DropUncheckedCreateWithoutProductsInput
    >;
    connectOrCreate?: DropCreateOrConnectWithoutProductsInput;
    connect?: DropWhereUniqueInput;
  };

  export type OrderItemCreateNestedManyWithoutProductInput = {
    create?:
      | XOR<
          OrderItemCreateWithoutProductInput,
          OrderItemUncheckedCreateWithoutProductInput
        >
      | OrderItemCreateWithoutProductInput[]
      | OrderItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutProductInput
      | OrderItemCreateOrConnectWithoutProductInput[];
    createMany?: OrderItemCreateManyProductInputEnvelope;
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
  };

  export type ProductVariantCreateNestedManyWithoutProductInput = {
    create?:
      | XOR<
          ProductVariantCreateWithoutProductInput,
          ProductVariantUncheckedCreateWithoutProductInput
        >
      | ProductVariantCreateWithoutProductInput[]
      | ProductVariantUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | ProductVariantCreateOrConnectWithoutProductInput
      | ProductVariantCreateOrConnectWithoutProductInput[];
    createMany?: ProductVariantCreateManyProductInputEnvelope;
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[];
  };

  export type OrderItemUncheckedCreateNestedManyWithoutProductInput = {
    create?:
      | XOR<
          OrderItemCreateWithoutProductInput,
          OrderItemUncheckedCreateWithoutProductInput
        >
      | OrderItemCreateWithoutProductInput[]
      | OrderItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutProductInput
      | OrderItemCreateOrConnectWithoutProductInput[];
    createMany?: OrderItemCreateManyProductInputEnvelope;
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
  };

  export type ProductVariantUncheckedCreateNestedManyWithoutProductInput = {
    create?:
      | XOR<
          ProductVariantCreateWithoutProductInput,
          ProductVariantUncheckedCreateWithoutProductInput
        >
      | ProductVariantCreateWithoutProductInput[]
      | ProductVariantUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | ProductVariantCreateOrConnectWithoutProductInput
      | ProductVariantCreateOrConnectWithoutProductInput[];
    createMany?: ProductVariantCreateManyProductInputEnvelope;
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[];
  };

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string;
    increment?: Decimal | DecimalJsLike | number | string;
    decrement?: Decimal | DecimalJsLike | number | string;
    multiply?: Decimal | DecimalJsLike | number | string;
    divide?: Decimal | DecimalJsLike | number | string;
  };

  export type ProductUpdateimagesInput = {
    set?: string[];
    push?: string | string[];
  };

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
  };

  export type DropUpdateOneWithoutProductsNestedInput = {
    create?: XOR<
      DropCreateWithoutProductsInput,
      DropUncheckedCreateWithoutProductsInput
    >;
    connectOrCreate?: DropCreateOrConnectWithoutProductsInput;
    upsert?: DropUpsertWithoutProductsInput;
    disconnect?: DropWhereInput | boolean;
    delete?: DropWhereInput | boolean;
    connect?: DropWhereUniqueInput;
    update?: XOR<
      XOR<
        DropUpdateToOneWithWhereWithoutProductsInput,
        DropUpdateWithoutProductsInput
      >,
      DropUncheckedUpdateWithoutProductsInput
    >;
  };

  export type OrderItemUpdateManyWithoutProductNestedInput = {
    create?:
      | XOR<
          OrderItemCreateWithoutProductInput,
          OrderItemUncheckedCreateWithoutProductInput
        >
      | OrderItemCreateWithoutProductInput[]
      | OrderItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutProductInput
      | OrderItemCreateOrConnectWithoutProductInput[];
    upsert?:
      | OrderItemUpsertWithWhereUniqueWithoutProductInput
      | OrderItemUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: OrderItemCreateManyProductInputEnvelope;
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    update?:
      | OrderItemUpdateWithWhereUniqueWithoutProductInput
      | OrderItemUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?:
      | OrderItemUpdateManyWithWhereWithoutProductInput
      | OrderItemUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[];
  };

  export type ProductVariantUpdateManyWithoutProductNestedInput = {
    create?:
      | XOR<
          ProductVariantCreateWithoutProductInput,
          ProductVariantUncheckedCreateWithoutProductInput
        >
      | ProductVariantCreateWithoutProductInput[]
      | ProductVariantUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | ProductVariantCreateOrConnectWithoutProductInput
      | ProductVariantCreateOrConnectWithoutProductInput[];
    upsert?:
      | ProductVariantUpsertWithWhereUniqueWithoutProductInput
      | ProductVariantUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: ProductVariantCreateManyProductInputEnvelope;
    set?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[];
    disconnect?:
      | ProductVariantWhereUniqueInput
      | ProductVariantWhereUniqueInput[];
    delete?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[];
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[];
    update?:
      | ProductVariantUpdateWithWhereUniqueWithoutProductInput
      | ProductVariantUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?:
      | ProductVariantUpdateManyWithWhereWithoutProductInput
      | ProductVariantUpdateManyWithWhereWithoutProductInput[];
    deleteMany?:
      | ProductVariantScalarWhereInput
      | ProductVariantScalarWhereInput[];
  };

  export type OrderItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?:
      | XOR<
          OrderItemCreateWithoutProductInput,
          OrderItemUncheckedCreateWithoutProductInput
        >
      | OrderItemCreateWithoutProductInput[]
      | OrderItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutProductInput
      | OrderItemCreateOrConnectWithoutProductInput[];
    upsert?:
      | OrderItemUpsertWithWhereUniqueWithoutProductInput
      | OrderItemUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: OrderItemCreateManyProductInputEnvelope;
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    update?:
      | OrderItemUpdateWithWhereUniqueWithoutProductInput
      | OrderItemUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?:
      | OrderItemUpdateManyWithWhereWithoutProductInput
      | OrderItemUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[];
  };

  export type ProductVariantUncheckedUpdateManyWithoutProductNestedInput = {
    create?:
      | XOR<
          ProductVariantCreateWithoutProductInput,
          ProductVariantUncheckedCreateWithoutProductInput
        >
      | ProductVariantCreateWithoutProductInput[]
      | ProductVariantUncheckedCreateWithoutProductInput[];
    connectOrCreate?:
      | ProductVariantCreateOrConnectWithoutProductInput
      | ProductVariantCreateOrConnectWithoutProductInput[];
    upsert?:
      | ProductVariantUpsertWithWhereUniqueWithoutProductInput
      | ProductVariantUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: ProductVariantCreateManyProductInputEnvelope;
    set?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[];
    disconnect?:
      | ProductVariantWhereUniqueInput
      | ProductVariantWhereUniqueInput[];
    delete?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[];
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[];
    update?:
      | ProductVariantUpdateWithWhereUniqueWithoutProductInput
      | ProductVariantUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?:
      | ProductVariantUpdateManyWithWhereWithoutProductInput
      | ProductVariantUpdateManyWithWhereWithoutProductInput[];
    deleteMany?:
      | ProductVariantScalarWhereInput
      | ProductVariantScalarWhereInput[];
  };

  export type ProductCreateNestedOneWithoutVariantsInput = {
    create?: XOR<
      ProductCreateWithoutVariantsInput,
      ProductUncheckedCreateWithoutVariantsInput
    >;
    connectOrCreate?: ProductCreateOrConnectWithoutVariantsInput;
    connect?: ProductWhereUniqueInput;
  };

  export type OrderItemCreateNestedManyWithoutVariantInput = {
    create?:
      | XOR<
          OrderItemCreateWithoutVariantInput,
          OrderItemUncheckedCreateWithoutVariantInput
        >
      | OrderItemCreateWithoutVariantInput[]
      | OrderItemUncheckedCreateWithoutVariantInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutVariantInput
      | OrderItemCreateOrConnectWithoutVariantInput[];
    createMany?: OrderItemCreateManyVariantInputEnvelope;
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
  };

  export type OrderItemUncheckedCreateNestedManyWithoutVariantInput = {
    create?:
      | XOR<
          OrderItemCreateWithoutVariantInput,
          OrderItemUncheckedCreateWithoutVariantInput
        >
      | OrderItemCreateWithoutVariantInput[]
      | OrderItemUncheckedCreateWithoutVariantInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutVariantInput
      | OrderItemCreateOrConnectWithoutVariantInput[];
    createMany?: OrderItemCreateManyVariantInputEnvelope;
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type ProductUpdateOneRequiredWithoutVariantsNestedInput = {
    create?: XOR<
      ProductCreateWithoutVariantsInput,
      ProductUncheckedCreateWithoutVariantsInput
    >;
    connectOrCreate?: ProductCreateOrConnectWithoutVariantsInput;
    upsert?: ProductUpsertWithoutVariantsInput;
    connect?: ProductWhereUniqueInput;
    update?: XOR<
      XOR<
        ProductUpdateToOneWithWhereWithoutVariantsInput,
        ProductUpdateWithoutVariantsInput
      >,
      ProductUncheckedUpdateWithoutVariantsInput
    >;
  };

  export type OrderItemUpdateManyWithoutVariantNestedInput = {
    create?:
      | XOR<
          OrderItemCreateWithoutVariantInput,
          OrderItemUncheckedCreateWithoutVariantInput
        >
      | OrderItemCreateWithoutVariantInput[]
      | OrderItemUncheckedCreateWithoutVariantInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutVariantInput
      | OrderItemCreateOrConnectWithoutVariantInput[];
    upsert?:
      | OrderItemUpsertWithWhereUniqueWithoutVariantInput
      | OrderItemUpsertWithWhereUniqueWithoutVariantInput[];
    createMany?: OrderItemCreateManyVariantInputEnvelope;
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    update?:
      | OrderItemUpdateWithWhereUniqueWithoutVariantInput
      | OrderItemUpdateWithWhereUniqueWithoutVariantInput[];
    updateMany?:
      | OrderItemUpdateManyWithWhereWithoutVariantInput
      | OrderItemUpdateManyWithWhereWithoutVariantInput[];
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[];
  };

  export type OrderItemUncheckedUpdateManyWithoutVariantNestedInput = {
    create?:
      | XOR<
          OrderItemCreateWithoutVariantInput,
          OrderItemUncheckedCreateWithoutVariantInput
        >
      | OrderItemCreateWithoutVariantInput[]
      | OrderItemUncheckedCreateWithoutVariantInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutVariantInput
      | OrderItemCreateOrConnectWithoutVariantInput[];
    upsert?:
      | OrderItemUpsertWithWhereUniqueWithoutVariantInput
      | OrderItemUpsertWithWhereUniqueWithoutVariantInput[];
    createMany?: OrderItemCreateManyVariantInputEnvelope;
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    update?:
      | OrderItemUpdateWithWhereUniqueWithoutVariantInput
      | OrderItemUpdateWithWhereUniqueWithoutVariantInput[];
    updateMany?:
      | OrderItemUpdateManyWithWhereWithoutVariantInput
      | OrderItemUpdateManyWithWhereWithoutVariantInput[];
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[];
  };

  export type ProductCreateNestedManyWithoutDropInput = {
    create?:
      | XOR<
          ProductCreateWithoutDropInput,
          ProductUncheckedCreateWithoutDropInput
        >
      | ProductCreateWithoutDropInput[]
      | ProductUncheckedCreateWithoutDropInput[];
    connectOrCreate?:
      | ProductCreateOrConnectWithoutDropInput
      | ProductCreateOrConnectWithoutDropInput[];
    createMany?: ProductCreateManyDropInputEnvelope;
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
  };

  export type ProductUncheckedCreateNestedManyWithoutDropInput = {
    create?:
      | XOR<
          ProductCreateWithoutDropInput,
          ProductUncheckedCreateWithoutDropInput
        >
      | ProductCreateWithoutDropInput[]
      | ProductUncheckedCreateWithoutDropInput[];
    connectOrCreate?:
      | ProductCreateOrConnectWithoutDropInput
      | ProductCreateOrConnectWithoutDropInput[];
    createMany?: ProductCreateManyDropInputEnvelope;
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
  };

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
  };

  export type ProductUpdateManyWithoutDropNestedInput = {
    create?:
      | XOR<
          ProductCreateWithoutDropInput,
          ProductUncheckedCreateWithoutDropInput
        >
      | ProductCreateWithoutDropInput[]
      | ProductUncheckedCreateWithoutDropInput[];
    connectOrCreate?:
      | ProductCreateOrConnectWithoutDropInput
      | ProductCreateOrConnectWithoutDropInput[];
    upsert?:
      | ProductUpsertWithWhereUniqueWithoutDropInput
      | ProductUpsertWithWhereUniqueWithoutDropInput[];
    createMany?: ProductCreateManyDropInputEnvelope;
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    update?:
      | ProductUpdateWithWhereUniqueWithoutDropInput
      | ProductUpdateWithWhereUniqueWithoutDropInput[];
    updateMany?:
      | ProductUpdateManyWithWhereWithoutDropInput
      | ProductUpdateManyWithWhereWithoutDropInput[];
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[];
  };

  export type ProductUncheckedUpdateManyWithoutDropNestedInput = {
    create?:
      | XOR<
          ProductCreateWithoutDropInput,
          ProductUncheckedCreateWithoutDropInput
        >
      | ProductCreateWithoutDropInput[]
      | ProductUncheckedCreateWithoutDropInput[];
    connectOrCreate?:
      | ProductCreateOrConnectWithoutDropInput
      | ProductCreateOrConnectWithoutDropInput[];
    upsert?:
      | ProductUpsertWithWhereUniqueWithoutDropInput
      | ProductUpsertWithWhereUniqueWithoutDropInput[];
    createMany?: ProductCreateManyDropInputEnvelope;
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[];
    update?:
      | ProductUpdateWithWhereUniqueWithoutDropInput
      | ProductUpdateWithWhereUniqueWithoutDropInput[];
    updateMany?:
      | ProductUpdateManyWithWhereWithoutDropInput
      | ProductUpdateManyWithWhereWithoutDropInput[];
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[];
  };

  export type UserCreateNestedOneWithoutOrdersInput = {
    create?: XOR<
      UserCreateWithoutOrdersInput,
      UserUncheckedCreateWithoutOrdersInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput;
    connect?: UserWhereUniqueInput;
  };

  export type OrderItemCreateNestedManyWithoutOrderInput = {
    create?:
      | XOR<
          OrderItemCreateWithoutOrderInput,
          OrderItemUncheckedCreateWithoutOrderInput
        >
      | OrderItemCreateWithoutOrderInput[]
      | OrderItemUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutOrderInput
      | OrderItemCreateOrConnectWithoutOrderInput[];
    createMany?: OrderItemCreateManyOrderInputEnvelope;
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
  };

  export type AddressCreateNestedOneWithoutOrdersInput = {
    create?: XOR<
      AddressCreateWithoutOrdersInput,
      AddressUncheckedCreateWithoutOrdersInput
    >;
    connectOrCreate?: AddressCreateOrConnectWithoutOrdersInput;
    connect?: AddressWhereUniqueInput;
  };

  export type OrderItemUncheckedCreateNestedManyWithoutOrderInput = {
    create?:
      | XOR<
          OrderItemCreateWithoutOrderInput,
          OrderItemUncheckedCreateWithoutOrderInput
        >
      | OrderItemCreateWithoutOrderInput[]
      | OrderItemUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutOrderInput
      | OrderItemCreateOrConnectWithoutOrderInput[];
    createMany?: OrderItemCreateManyOrderInputEnvelope;
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
  };

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus;
  };

  export type UserUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<
      UserCreateWithoutOrdersInput,
      UserUncheckedCreateWithoutOrdersInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput;
    upsert?: UserUpsertWithoutOrdersInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutOrdersInput,
        UserUpdateWithoutOrdersInput
      >,
      UserUncheckedUpdateWithoutOrdersInput
    >;
  };

  export type OrderItemUpdateManyWithoutOrderNestedInput = {
    create?:
      | XOR<
          OrderItemCreateWithoutOrderInput,
          OrderItemUncheckedCreateWithoutOrderInput
        >
      | OrderItemCreateWithoutOrderInput[]
      | OrderItemUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutOrderInput
      | OrderItemCreateOrConnectWithoutOrderInput[];
    upsert?:
      | OrderItemUpsertWithWhereUniqueWithoutOrderInput
      | OrderItemUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: OrderItemCreateManyOrderInputEnvelope;
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    update?:
      | OrderItemUpdateWithWhereUniqueWithoutOrderInput
      | OrderItemUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?:
      | OrderItemUpdateManyWithWhereWithoutOrderInput
      | OrderItemUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[];
  };

  export type AddressUpdateOneWithoutOrdersNestedInput = {
    create?: XOR<
      AddressCreateWithoutOrdersInput,
      AddressUncheckedCreateWithoutOrdersInput
    >;
    connectOrCreate?: AddressCreateOrConnectWithoutOrdersInput;
    upsert?: AddressUpsertWithoutOrdersInput;
    disconnect?: AddressWhereInput | boolean;
    delete?: AddressWhereInput | boolean;
    connect?: AddressWhereUniqueInput;
    update?: XOR<
      XOR<
        AddressUpdateToOneWithWhereWithoutOrdersInput,
        AddressUpdateWithoutOrdersInput
      >,
      AddressUncheckedUpdateWithoutOrdersInput
    >;
  };

  export type OrderItemUncheckedUpdateManyWithoutOrderNestedInput = {
    create?:
      | XOR<
          OrderItemCreateWithoutOrderInput,
          OrderItemUncheckedCreateWithoutOrderInput
        >
      | OrderItemCreateWithoutOrderInput[]
      | OrderItemUncheckedCreateWithoutOrderInput[];
    connectOrCreate?:
      | OrderItemCreateOrConnectWithoutOrderInput
      | OrderItemCreateOrConnectWithoutOrderInput[];
    upsert?:
      | OrderItemUpsertWithWhereUniqueWithoutOrderInput
      | OrderItemUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: OrderItemCreateManyOrderInputEnvelope;
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[];
    update?:
      | OrderItemUpdateWithWhereUniqueWithoutOrderInput
      | OrderItemUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?:
      | OrderItemUpdateManyWithWhereWithoutOrderInput
      | OrderItemUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[];
  };

  export type OrderCreateNestedOneWithoutItemsInput = {
    create?: XOR<
      OrderCreateWithoutItemsInput,
      OrderUncheckedCreateWithoutItemsInput
    >;
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput;
    connect?: OrderWhereUniqueInput;
  };

  export type ProductCreateNestedOneWithoutOrderItemsInput = {
    create?: XOR<
      ProductCreateWithoutOrderItemsInput,
      ProductUncheckedCreateWithoutOrderItemsInput
    >;
    connectOrCreate?: ProductCreateOrConnectWithoutOrderItemsInput;
    connect?: ProductWhereUniqueInput;
  };

  export type ProductVariantCreateNestedOneWithoutOrderItemsInput = {
    create?: XOR<
      ProductVariantCreateWithoutOrderItemsInput,
      ProductVariantUncheckedCreateWithoutOrderItemsInput
    >;
    connectOrCreate?: ProductVariantCreateOrConnectWithoutOrderItemsInput;
    connect?: ProductVariantWhereUniqueInput;
  };

  export type OrderUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<
      OrderCreateWithoutItemsInput,
      OrderUncheckedCreateWithoutItemsInput
    >;
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput;
    upsert?: OrderUpsertWithoutItemsInput;
    connect?: OrderWhereUniqueInput;
    update?: XOR<
      XOR<
        OrderUpdateToOneWithWhereWithoutItemsInput,
        OrderUpdateWithoutItemsInput
      >,
      OrderUncheckedUpdateWithoutItemsInput
    >;
  };

  export type ProductUpdateOneRequiredWithoutOrderItemsNestedInput = {
    create?: XOR<
      ProductCreateWithoutOrderItemsInput,
      ProductUncheckedCreateWithoutOrderItemsInput
    >;
    connectOrCreate?: ProductCreateOrConnectWithoutOrderItemsInput;
    upsert?: ProductUpsertWithoutOrderItemsInput;
    connect?: ProductWhereUniqueInput;
    update?: XOR<
      XOR<
        ProductUpdateToOneWithWhereWithoutOrderItemsInput,
        ProductUpdateWithoutOrderItemsInput
      >,
      ProductUncheckedUpdateWithoutOrderItemsInput
    >;
  };

  export type ProductVariantUpdateOneWithoutOrderItemsNestedInput = {
    create?: XOR<
      ProductVariantCreateWithoutOrderItemsInput,
      ProductVariantUncheckedCreateWithoutOrderItemsInput
    >;
    connectOrCreate?: ProductVariantCreateOrConnectWithoutOrderItemsInput;
    upsert?: ProductVariantUpsertWithoutOrderItemsInput;
    disconnect?: ProductVariantWhereInput | boolean;
    delete?: ProductVariantWhereInput | boolean;
    connect?: ProductVariantWhereUniqueInput;
    update?: XOR<
      XOR<
        ProductVariantUpdateToOneWithWhereWithoutOrderItemsInput,
        ProductVariantUpdateWithoutOrderItemsInput
      >,
      ProductVariantUncheckedUpdateWithoutOrderItemsInput
    >;
  };

  export type UserCreateNestedOneWithoutAddressesInput = {
    create?: XOR<
      UserCreateWithoutAddressesInput,
      UserUncheckedCreateWithoutAddressesInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutAddressesInput;
    connect?: UserWhereUniqueInput;
  };

  export type OrderCreateNestedManyWithoutShippingAddressInput = {
    create?:
      | XOR<
          OrderCreateWithoutShippingAddressInput,
          OrderUncheckedCreateWithoutShippingAddressInput
        >
      | OrderCreateWithoutShippingAddressInput[]
      | OrderUncheckedCreateWithoutShippingAddressInput[];
    connectOrCreate?:
      | OrderCreateOrConnectWithoutShippingAddressInput
      | OrderCreateOrConnectWithoutShippingAddressInput[];
    createMany?: OrderCreateManyShippingAddressInputEnvelope;
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
  };

  export type OrderUncheckedCreateNestedManyWithoutShippingAddressInput = {
    create?:
      | XOR<
          OrderCreateWithoutShippingAddressInput,
          OrderUncheckedCreateWithoutShippingAddressInput
        >
      | OrderCreateWithoutShippingAddressInput[]
      | OrderUncheckedCreateWithoutShippingAddressInput[];
    connectOrCreate?:
      | OrderCreateOrConnectWithoutShippingAddressInput
      | OrderCreateOrConnectWithoutShippingAddressInput[];
    createMany?: OrderCreateManyShippingAddressInputEnvelope;
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
  };

  export type UserUpdateOneRequiredWithoutAddressesNestedInput = {
    create?: XOR<
      UserCreateWithoutAddressesInput,
      UserUncheckedCreateWithoutAddressesInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutAddressesInput;
    upsert?: UserUpsertWithoutAddressesInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutAddressesInput,
        UserUpdateWithoutAddressesInput
      >,
      UserUncheckedUpdateWithoutAddressesInput
    >;
  };

  export type OrderUpdateManyWithoutShippingAddressNestedInput = {
    create?:
      | XOR<
          OrderCreateWithoutShippingAddressInput,
          OrderUncheckedCreateWithoutShippingAddressInput
        >
      | OrderCreateWithoutShippingAddressInput[]
      | OrderUncheckedCreateWithoutShippingAddressInput[];
    connectOrCreate?:
      | OrderCreateOrConnectWithoutShippingAddressInput
      | OrderCreateOrConnectWithoutShippingAddressInput[];
    upsert?:
      | OrderUpsertWithWhereUniqueWithoutShippingAddressInput
      | OrderUpsertWithWhereUniqueWithoutShippingAddressInput[];
    createMany?: OrderCreateManyShippingAddressInputEnvelope;
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    update?:
      | OrderUpdateWithWhereUniqueWithoutShippingAddressInput
      | OrderUpdateWithWhereUniqueWithoutShippingAddressInput[];
    updateMany?:
      | OrderUpdateManyWithWhereWithoutShippingAddressInput
      | OrderUpdateManyWithWhereWithoutShippingAddressInput[];
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[];
  };

  export type OrderUncheckedUpdateManyWithoutShippingAddressNestedInput = {
    create?:
      | XOR<
          OrderCreateWithoutShippingAddressInput,
          OrderUncheckedCreateWithoutShippingAddressInput
        >
      | OrderCreateWithoutShippingAddressInput[]
      | OrderUncheckedCreateWithoutShippingAddressInput[];
    connectOrCreate?:
      | OrderCreateOrConnectWithoutShippingAddressInput
      | OrderCreateOrConnectWithoutShippingAddressInput[];
    upsert?:
      | OrderUpsertWithWhereUniqueWithoutShippingAddressInput
      | OrderUpsertWithWhereUniqueWithoutShippingAddressInput[];
    createMany?: OrderCreateManyShippingAddressInputEnvelope;
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[];
    update?:
      | OrderUpdateWithWhereUniqueWithoutShippingAddressInput
      | OrderUpdateWithWhereUniqueWithoutShippingAddressInput[];
    updateMany?:
      | OrderUpdateManyWithWhereWithoutShippingAddressInput
      | OrderUpdateManyWithWhereWithoutShippingAddressInput[];
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[];
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    lt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    lte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string;
  };

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    lt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    lte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalWithAggregatesFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedDecimalFilter<$PrismaModel>;
    _sum?: NestedDecimalFilter<$PrismaModel>;
    _min?: NestedDecimalFilter<$PrismaModel>;
    _max?: NestedDecimalFilter<$PrismaModel>;
  };

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
      in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
      notIn?:
        | Date[]
        | string[]
        | ListDateTimeFieldRefInput<$PrismaModel>
        | null;
      lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      not?:
        | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
        | Date
        | string
        | null;
      _count?: NestedIntNullableFilter<$PrismaModel>;
      _min?: NestedDateTimeNullableFilter<$PrismaModel>;
      _max?: NestedDateTimeNullableFilter<$PrismaModel>;
    };

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.OrderStatus[]
      | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus;
  };

  export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>;
      in?:
        | $Enums.OrderStatus[]
        | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
      notIn?:
        | $Enums.OrderStatus[]
        | ListEnumOrderStatusFieldRefInput<$PrismaModel>;
      not?:
        | NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel>
        | $Enums.OrderStatus;
      _count?: NestedIntFilter<$PrismaModel>;
      _min?: NestedEnumOrderStatusFilter<$PrismaModel>;
      _max?: NestedEnumOrderStatusFilter<$PrismaModel>;
    };

  export type OrderCreateWithoutUserInput = {
    id?: string;
    orderNumber: string;
    status?: $Enums.OrderStatus;
    total: Decimal | DecimalJsLike | number | string;
    stripePaymentIntentId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: OrderItemCreateNestedManyWithoutOrderInput;
    shippingAddress?: AddressCreateNestedOneWithoutOrdersInput;
  };

  export type OrderUncheckedCreateWithoutUserInput = {
    id?: string;
    orderNumber: string;
    status?: $Enums.OrderStatus;
    total: Decimal | DecimalJsLike | number | string;
    shippingAddressId?: string | null;
    stripePaymentIntentId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput;
  };

  export type OrderCreateOrConnectWithoutUserInput = {
    where: OrderWhereUniqueInput;
    create: XOR<
      OrderCreateWithoutUserInput,
      OrderUncheckedCreateWithoutUserInput
    >;
  };

  export type OrderCreateManyUserInputEnvelope = {
    data: OrderCreateManyUserInput | OrderCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type AddressCreateWithoutUserInput = {
    id?: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country?: string;
    isDefault?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    orders?: OrderCreateNestedManyWithoutShippingAddressInput;
  };

  export type AddressUncheckedCreateWithoutUserInput = {
    id?: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country?: string;
    isDefault?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    orders?: OrderUncheckedCreateNestedManyWithoutShippingAddressInput;
  };

  export type AddressCreateOrConnectWithoutUserInput = {
    where: AddressWhereUniqueInput;
    create: XOR<
      AddressCreateWithoutUserInput,
      AddressUncheckedCreateWithoutUserInput
    >;
  };

  export type AddressCreateManyUserInputEnvelope = {
    data: AddressCreateManyUserInput | AddressCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type OrderUpsertWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput;
    update: XOR<
      OrderUpdateWithoutUserInput,
      OrderUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      OrderCreateWithoutUserInput,
      OrderUncheckedCreateWithoutUserInput
    >;
  };

  export type OrderUpdateWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput;
    data: XOR<
      OrderUpdateWithoutUserInput,
      OrderUncheckedUpdateWithoutUserInput
    >;
  };

  export type OrderUpdateManyWithWhereWithoutUserInput = {
    where: OrderScalarWhereInput;
    data: XOR<
      OrderUpdateManyMutationInput,
      OrderUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[];
    OR?: OrderScalarWhereInput[];
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[];
    id?: StringFilter<"Order"> | string;
    orderNumber?: StringFilter<"Order"> | string;
    userId?: StringFilter<"Order"> | string;
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus;
    total?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string;
    shippingAddressId?: StringNullableFilter<"Order"> | string | null;
    stripePaymentIntentId?: StringNullableFilter<"Order"> | string | null;
    createdAt?: DateTimeFilter<"Order"> | Date | string;
    updatedAt?: DateTimeFilter<"Order"> | Date | string;
  };

  export type AddressUpsertWithWhereUniqueWithoutUserInput = {
    where: AddressWhereUniqueInput;
    update: XOR<
      AddressUpdateWithoutUserInput,
      AddressUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      AddressCreateWithoutUserInput,
      AddressUncheckedCreateWithoutUserInput
    >;
  };

  export type AddressUpdateWithWhereUniqueWithoutUserInput = {
    where: AddressWhereUniqueInput;
    data: XOR<
      AddressUpdateWithoutUserInput,
      AddressUncheckedUpdateWithoutUserInput
    >;
  };

  export type AddressUpdateManyWithWhereWithoutUserInput = {
    where: AddressScalarWhereInput;
    data: XOR<
      AddressUpdateManyMutationInput,
      AddressUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type AddressScalarWhereInput = {
    AND?: AddressScalarWhereInput | AddressScalarWhereInput[];
    OR?: AddressScalarWhereInput[];
    NOT?: AddressScalarWhereInput | AddressScalarWhereInput[];
    id?: StringFilter<"Address"> | string;
    userId?: StringFilter<"Address"> | string;
    street?: StringFilter<"Address"> | string;
    city?: StringFilter<"Address"> | string;
    state?: StringFilter<"Address"> | string;
    postalCode?: StringFilter<"Address"> | string;
    country?: StringFilter<"Address"> | string;
    isDefault?: BoolFilter<"Address"> | boolean;
    createdAt?: DateTimeFilter<"Address"> | Date | string;
    updatedAt?: DateTimeFilter<"Address"> | Date | string;
  };

  export type DropCreateWithoutProductsInput = {
    id?: string;
    name: string;
    description?: string | null;
    startDate: Date | string;
    endDate?: Date | string | null;
    isActive?: boolean;
    password?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type DropUncheckedCreateWithoutProductsInput = {
    id?: string;
    name: string;
    description?: string | null;
    startDate: Date | string;
    endDate?: Date | string | null;
    isActive?: boolean;
    password?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type DropCreateOrConnectWithoutProductsInput = {
    where: DropWhereUniqueInput;
    create: XOR<
      DropCreateWithoutProductsInput,
      DropUncheckedCreateWithoutProductsInput
    >;
  };

  export type OrderItemCreateWithoutProductInput = {
    id?: string;
    quantity: number;
    price: Decimal | DecimalJsLike | number | string;
    order: OrderCreateNestedOneWithoutItemsInput;
    variant?: ProductVariantCreateNestedOneWithoutOrderItemsInput;
  };

  export type OrderItemUncheckedCreateWithoutProductInput = {
    id?: string;
    orderId: string;
    variantId?: string | null;
    quantity: number;
    price: Decimal | DecimalJsLike | number | string;
  };

  export type OrderItemCreateOrConnectWithoutProductInput = {
    where: OrderItemWhereUniqueInput;
    create: XOR<
      OrderItemCreateWithoutProductInput,
      OrderItemUncheckedCreateWithoutProductInput
    >;
  };

  export type OrderItemCreateManyProductInputEnvelope = {
    data: OrderItemCreateManyProductInput | OrderItemCreateManyProductInput[];
    skipDuplicates?: boolean;
  };

  export type ProductVariantCreateWithoutProductInput = {
    id?: string;
    size: string;
    color?: string | null;
    sku: string;
    stock?: number;
    orderItems?: OrderItemCreateNestedManyWithoutVariantInput;
  };

  export type ProductVariantUncheckedCreateWithoutProductInput = {
    id?: string;
    size: string;
    color?: string | null;
    sku: string;
    stock?: number;
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutVariantInput;
  };

  export type ProductVariantCreateOrConnectWithoutProductInput = {
    where: ProductVariantWhereUniqueInput;
    create: XOR<
      ProductVariantCreateWithoutProductInput,
      ProductVariantUncheckedCreateWithoutProductInput
    >;
  };

  export type ProductVariantCreateManyProductInputEnvelope = {
    data:
      | ProductVariantCreateManyProductInput
      | ProductVariantCreateManyProductInput[];
    skipDuplicates?: boolean;
  };

  export type DropUpsertWithoutProductsInput = {
    update: XOR<
      DropUpdateWithoutProductsInput,
      DropUncheckedUpdateWithoutProductsInput
    >;
    create: XOR<
      DropCreateWithoutProductsInput,
      DropUncheckedCreateWithoutProductsInput
    >;
    where?: DropWhereInput;
  };

  export type DropUpdateToOneWithWhereWithoutProductsInput = {
    where?: DropWhereInput;
    data: XOR<
      DropUpdateWithoutProductsInput,
      DropUncheckedUpdateWithoutProductsInput
    >;
  };

  export type DropUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type DropUncheckedUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OrderItemUpsertWithWhereUniqueWithoutProductInput = {
    where: OrderItemWhereUniqueInput;
    update: XOR<
      OrderItemUpdateWithoutProductInput,
      OrderItemUncheckedUpdateWithoutProductInput
    >;
    create: XOR<
      OrderItemCreateWithoutProductInput,
      OrderItemUncheckedCreateWithoutProductInput
    >;
  };

  export type OrderItemUpdateWithWhereUniqueWithoutProductInput = {
    where: OrderItemWhereUniqueInput;
    data: XOR<
      OrderItemUpdateWithoutProductInput,
      OrderItemUncheckedUpdateWithoutProductInput
    >;
  };

  export type OrderItemUpdateManyWithWhereWithoutProductInput = {
    where: OrderItemScalarWhereInput;
    data: XOR<
      OrderItemUpdateManyMutationInput,
      OrderItemUncheckedUpdateManyWithoutProductInput
    >;
  };

  export type OrderItemScalarWhereInput = {
    AND?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[];
    OR?: OrderItemScalarWhereInput[];
    NOT?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[];
    id?: StringFilter<"OrderItem"> | string;
    orderId?: StringFilter<"OrderItem"> | string;
    productId?: StringFilter<"OrderItem"> | string;
    variantId?: StringNullableFilter<"OrderItem"> | string | null;
    quantity?: IntFilter<"OrderItem"> | number;
    price?:
      | DecimalFilter<"OrderItem">
      | Decimal
      | DecimalJsLike
      | number
      | string;
  };

  export type ProductVariantUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductVariantWhereUniqueInput;
    update: XOR<
      ProductVariantUpdateWithoutProductInput,
      ProductVariantUncheckedUpdateWithoutProductInput
    >;
    create: XOR<
      ProductVariantCreateWithoutProductInput,
      ProductVariantUncheckedCreateWithoutProductInput
    >;
  };

  export type ProductVariantUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductVariantWhereUniqueInput;
    data: XOR<
      ProductVariantUpdateWithoutProductInput,
      ProductVariantUncheckedUpdateWithoutProductInput
    >;
  };

  export type ProductVariantUpdateManyWithWhereWithoutProductInput = {
    where: ProductVariantScalarWhereInput;
    data: XOR<
      ProductVariantUpdateManyMutationInput,
      ProductVariantUncheckedUpdateManyWithoutProductInput
    >;
  };

  export type ProductVariantScalarWhereInput = {
    AND?: ProductVariantScalarWhereInput | ProductVariantScalarWhereInput[];
    OR?: ProductVariantScalarWhereInput[];
    NOT?: ProductVariantScalarWhereInput | ProductVariantScalarWhereInput[];
    id?: StringFilter<"ProductVariant"> | string;
    productId?: StringFilter<"ProductVariant"> | string;
    size?: StringFilter<"ProductVariant"> | string;
    color?: StringNullableFilter<"ProductVariant"> | string | null;
    sku?: StringFilter<"ProductVariant"> | string;
    stock?: IntFilter<"ProductVariant"> | number;
  };

  export type ProductCreateWithoutVariantsInput = {
    id?: string;
    name: string;
    description?: string | null;
    price: Decimal | DecimalJsLike | number | string;
    images?: ProductCreateimagesInput | string[];
    slug: string;
    category?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    inStock?: boolean;
    drop?: DropCreateNestedOneWithoutProductsInput;
    orderItems?: OrderItemCreateNestedManyWithoutProductInput;
  };

  export type ProductUncheckedCreateWithoutVariantsInput = {
    id?: string;
    name: string;
    description?: string | null;
    price: Decimal | DecimalJsLike | number | string;
    images?: ProductCreateimagesInput | string[];
    slug: string;
    category?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    inStock?: boolean;
    dropId?: string | null;
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput;
  };

  export type ProductCreateOrConnectWithoutVariantsInput = {
    where: ProductWhereUniqueInput;
    create: XOR<
      ProductCreateWithoutVariantsInput,
      ProductUncheckedCreateWithoutVariantsInput
    >;
  };

  export type OrderItemCreateWithoutVariantInput = {
    id?: string;
    quantity: number;
    price: Decimal | DecimalJsLike | number | string;
    order: OrderCreateNestedOneWithoutItemsInput;
    product: ProductCreateNestedOneWithoutOrderItemsInput;
  };

  export type OrderItemUncheckedCreateWithoutVariantInput = {
    id?: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: Decimal | DecimalJsLike | number | string;
  };

  export type OrderItemCreateOrConnectWithoutVariantInput = {
    where: OrderItemWhereUniqueInput;
    create: XOR<
      OrderItemCreateWithoutVariantInput,
      OrderItemUncheckedCreateWithoutVariantInput
    >;
  };

  export type OrderItemCreateManyVariantInputEnvelope = {
    data: OrderItemCreateManyVariantInput | OrderItemCreateManyVariantInput[];
    skipDuplicates?: boolean;
  };

  export type ProductUpsertWithoutVariantsInput = {
    update: XOR<
      ProductUpdateWithoutVariantsInput,
      ProductUncheckedUpdateWithoutVariantsInput
    >;
    create: XOR<
      ProductCreateWithoutVariantsInput,
      ProductUncheckedCreateWithoutVariantsInput
    >;
    where?: ProductWhereInput;
  };

  export type ProductUpdateToOneWithWhereWithoutVariantsInput = {
    where?: ProductWhereInput;
    data: XOR<
      ProductUpdateWithoutVariantsInput,
      ProductUncheckedUpdateWithoutVariantsInput
    >;
  };

  export type ProductUpdateWithoutVariantsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    images?: ProductUpdateimagesInput | string[];
    slug?: StringFieldUpdateOperationsInput | string;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    inStock?: BoolFieldUpdateOperationsInput | boolean;
    drop?: DropUpdateOneWithoutProductsNestedInput;
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput;
  };

  export type ProductUncheckedUpdateWithoutVariantsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    images?: ProductUpdateimagesInput | string[];
    slug?: StringFieldUpdateOperationsInput | string;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    inStock?: BoolFieldUpdateOperationsInput | boolean;
    dropId?: NullableStringFieldUpdateOperationsInput | string | null;
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput;
  };

  export type OrderItemUpsertWithWhereUniqueWithoutVariantInput = {
    where: OrderItemWhereUniqueInput;
    update: XOR<
      OrderItemUpdateWithoutVariantInput,
      OrderItemUncheckedUpdateWithoutVariantInput
    >;
    create: XOR<
      OrderItemCreateWithoutVariantInput,
      OrderItemUncheckedCreateWithoutVariantInput
    >;
  };

  export type OrderItemUpdateWithWhereUniqueWithoutVariantInput = {
    where: OrderItemWhereUniqueInput;
    data: XOR<
      OrderItemUpdateWithoutVariantInput,
      OrderItemUncheckedUpdateWithoutVariantInput
    >;
  };

  export type OrderItemUpdateManyWithWhereWithoutVariantInput = {
    where: OrderItemScalarWhereInput;
    data: XOR<
      OrderItemUpdateManyMutationInput,
      OrderItemUncheckedUpdateManyWithoutVariantInput
    >;
  };

  export type ProductCreateWithoutDropInput = {
    id?: string;
    name: string;
    description?: string | null;
    price: Decimal | DecimalJsLike | number | string;
    images?: ProductCreateimagesInput | string[];
    slug: string;
    category?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    inStock?: boolean;
    orderItems?: OrderItemCreateNestedManyWithoutProductInput;
    variants?: ProductVariantCreateNestedManyWithoutProductInput;
  };

  export type ProductUncheckedCreateWithoutDropInput = {
    id?: string;
    name: string;
    description?: string | null;
    price: Decimal | DecimalJsLike | number | string;
    images?: ProductCreateimagesInput | string[];
    slug: string;
    category?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    inStock?: boolean;
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput;
    variants?: ProductVariantUncheckedCreateNestedManyWithoutProductInput;
  };

  export type ProductCreateOrConnectWithoutDropInput = {
    where: ProductWhereUniqueInput;
    create: XOR<
      ProductCreateWithoutDropInput,
      ProductUncheckedCreateWithoutDropInput
    >;
  };

  export type ProductCreateManyDropInputEnvelope = {
    data: ProductCreateManyDropInput | ProductCreateManyDropInput[];
    skipDuplicates?: boolean;
  };

  export type ProductUpsertWithWhereUniqueWithoutDropInput = {
    where: ProductWhereUniqueInput;
    update: XOR<
      ProductUpdateWithoutDropInput,
      ProductUncheckedUpdateWithoutDropInput
    >;
    create: XOR<
      ProductCreateWithoutDropInput,
      ProductUncheckedCreateWithoutDropInput
    >;
  };

  export type ProductUpdateWithWhereUniqueWithoutDropInput = {
    where: ProductWhereUniqueInput;
    data: XOR<
      ProductUpdateWithoutDropInput,
      ProductUncheckedUpdateWithoutDropInput
    >;
  };

  export type ProductUpdateManyWithWhereWithoutDropInput = {
    where: ProductScalarWhereInput;
    data: XOR<
      ProductUpdateManyMutationInput,
      ProductUncheckedUpdateManyWithoutDropInput
    >;
  };

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[];
    OR?: ProductScalarWhereInput[];
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[];
    id?: StringFilter<"Product"> | string;
    name?: StringFilter<"Product"> | string;
    description?: StringNullableFilter<"Product"> | string | null;
    price?:
      | DecimalFilter<"Product">
      | Decimal
      | DecimalJsLike
      | number
      | string;
    images?: StringNullableListFilter<"Product">;
    slug?: StringFilter<"Product"> | string;
    category?: StringNullableFilter<"Product"> | string | null;
    createdAt?: DateTimeFilter<"Product"> | Date | string;
    updatedAt?: DateTimeFilter<"Product"> | Date | string;
    inStock?: BoolFilter<"Product"> | boolean;
    dropId?: StringNullableFilter<"Product"> | string | null;
  };

  export type UserCreateWithoutOrdersInput = {
    id?: string;
    email: string;
    name?: string | null;
    firebaseUid?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    addresses?: AddressCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutOrdersInput = {
    id?: string;
    email: string;
    name?: string | null;
    firebaseUid?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    addresses?: AddressUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutOrdersInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutOrdersInput,
      UserUncheckedCreateWithoutOrdersInput
    >;
  };

  export type OrderItemCreateWithoutOrderInput = {
    id?: string;
    quantity: number;
    price: Decimal | DecimalJsLike | number | string;
    product: ProductCreateNestedOneWithoutOrderItemsInput;
    variant?: ProductVariantCreateNestedOneWithoutOrderItemsInput;
  };

  export type OrderItemUncheckedCreateWithoutOrderInput = {
    id?: string;
    productId: string;
    variantId?: string | null;
    quantity: number;
    price: Decimal | DecimalJsLike | number | string;
  };

  export type OrderItemCreateOrConnectWithoutOrderInput = {
    where: OrderItemWhereUniqueInput;
    create: XOR<
      OrderItemCreateWithoutOrderInput,
      OrderItemUncheckedCreateWithoutOrderInput
    >;
  };

  export type OrderItemCreateManyOrderInputEnvelope = {
    data: OrderItemCreateManyOrderInput | OrderItemCreateManyOrderInput[];
    skipDuplicates?: boolean;
  };

  export type AddressCreateWithoutOrdersInput = {
    id?: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country?: string;
    isDefault?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutAddressesInput;
  };

  export type AddressUncheckedCreateWithoutOrdersInput = {
    id?: string;
    userId: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country?: string;
    isDefault?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AddressCreateOrConnectWithoutOrdersInput = {
    where: AddressWhereUniqueInput;
    create: XOR<
      AddressCreateWithoutOrdersInput,
      AddressUncheckedCreateWithoutOrdersInput
    >;
  };

  export type UserUpsertWithoutOrdersInput = {
    update: XOR<
      UserUpdateWithoutOrdersInput,
      UserUncheckedUpdateWithoutOrdersInput
    >;
    create: XOR<
      UserCreateWithoutOrdersInput,
      UserUncheckedCreateWithoutOrdersInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutOrdersInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutOrdersInput,
      UserUncheckedUpdateWithoutOrdersInput
    >;
  };

  export type UserUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    addresses?: AddressUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    addresses?: AddressUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type OrderItemUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput;
    update: XOR<
      OrderItemUpdateWithoutOrderInput,
      OrderItemUncheckedUpdateWithoutOrderInput
    >;
    create: XOR<
      OrderItemCreateWithoutOrderInput,
      OrderItemUncheckedCreateWithoutOrderInput
    >;
  };

  export type OrderItemUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput;
    data: XOR<
      OrderItemUpdateWithoutOrderInput,
      OrderItemUncheckedUpdateWithoutOrderInput
    >;
  };

  export type OrderItemUpdateManyWithWhereWithoutOrderInput = {
    where: OrderItemScalarWhereInput;
    data: XOR<
      OrderItemUpdateManyMutationInput,
      OrderItemUncheckedUpdateManyWithoutOrderInput
    >;
  };

  export type AddressUpsertWithoutOrdersInput = {
    update: XOR<
      AddressUpdateWithoutOrdersInput,
      AddressUncheckedUpdateWithoutOrdersInput
    >;
    create: XOR<
      AddressCreateWithoutOrdersInput,
      AddressUncheckedCreateWithoutOrdersInput
    >;
    where?: AddressWhereInput;
  };

  export type AddressUpdateToOneWithWhereWithoutOrdersInput = {
    where?: AddressWhereInput;
    data: XOR<
      AddressUpdateWithoutOrdersInput,
      AddressUncheckedUpdateWithoutOrdersInput
    >;
  };

  export type AddressUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string;
    street?: StringFieldUpdateOperationsInput | string;
    city?: StringFieldUpdateOperationsInput | string;
    state?: StringFieldUpdateOperationsInput | string;
    postalCode?: StringFieldUpdateOperationsInput | string;
    country?: StringFieldUpdateOperationsInput | string;
    isDefault?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutAddressesNestedInput;
  };

  export type AddressUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    street?: StringFieldUpdateOperationsInput | string;
    city?: StringFieldUpdateOperationsInput | string;
    state?: StringFieldUpdateOperationsInput | string;
    postalCode?: StringFieldUpdateOperationsInput | string;
    country?: StringFieldUpdateOperationsInput | string;
    isDefault?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OrderCreateWithoutItemsInput = {
    id?: string;
    orderNumber: string;
    status?: $Enums.OrderStatus;
    total: Decimal | DecimalJsLike | number | string;
    stripePaymentIntentId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutOrdersInput;
    shippingAddress?: AddressCreateNestedOneWithoutOrdersInput;
  };

  export type OrderUncheckedCreateWithoutItemsInput = {
    id?: string;
    orderNumber: string;
    userId: string;
    status?: $Enums.OrderStatus;
    total: Decimal | DecimalJsLike | number | string;
    shippingAddressId?: string | null;
    stripePaymentIntentId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type OrderCreateOrConnectWithoutItemsInput = {
    where: OrderWhereUniqueInput;
    create: XOR<
      OrderCreateWithoutItemsInput,
      OrderUncheckedCreateWithoutItemsInput
    >;
  };

  export type ProductCreateWithoutOrderItemsInput = {
    id?: string;
    name: string;
    description?: string | null;
    price: Decimal | DecimalJsLike | number | string;
    images?: ProductCreateimagesInput | string[];
    slug: string;
    category?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    inStock?: boolean;
    drop?: DropCreateNestedOneWithoutProductsInput;
    variants?: ProductVariantCreateNestedManyWithoutProductInput;
  };

  export type ProductUncheckedCreateWithoutOrderItemsInput = {
    id?: string;
    name: string;
    description?: string | null;
    price: Decimal | DecimalJsLike | number | string;
    images?: ProductCreateimagesInput | string[];
    slug: string;
    category?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    inStock?: boolean;
    dropId?: string | null;
    variants?: ProductVariantUncheckedCreateNestedManyWithoutProductInput;
  };

  export type ProductCreateOrConnectWithoutOrderItemsInput = {
    where: ProductWhereUniqueInput;
    create: XOR<
      ProductCreateWithoutOrderItemsInput,
      ProductUncheckedCreateWithoutOrderItemsInput
    >;
  };

  export type ProductVariantCreateWithoutOrderItemsInput = {
    id?: string;
    size: string;
    color?: string | null;
    sku: string;
    stock?: number;
    product: ProductCreateNestedOneWithoutVariantsInput;
  };

  export type ProductVariantUncheckedCreateWithoutOrderItemsInput = {
    id?: string;
    productId: string;
    size: string;
    color?: string | null;
    sku: string;
    stock?: number;
  };

  export type ProductVariantCreateOrConnectWithoutOrderItemsInput = {
    where: ProductVariantWhereUniqueInput;
    create: XOR<
      ProductVariantCreateWithoutOrderItemsInput,
      ProductVariantUncheckedCreateWithoutOrderItemsInput
    >;
  };

  export type OrderUpsertWithoutItemsInput = {
    update: XOR<
      OrderUpdateWithoutItemsInput,
      OrderUncheckedUpdateWithoutItemsInput
    >;
    create: XOR<
      OrderCreateWithoutItemsInput,
      OrderUncheckedCreateWithoutItemsInput
    >;
    where?: OrderWhereInput;
  };

  export type OrderUpdateToOneWithWhereWithoutItemsInput = {
    where?: OrderWhereInput;
    data: XOR<
      OrderUpdateWithoutItemsInput,
      OrderUncheckedUpdateWithoutItemsInput
    >;
  };

  export type OrderUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderNumber?: StringFieldUpdateOperationsInput | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    total?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    stripePaymentIntentId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput;
    shippingAddress?: AddressUpdateOneWithoutOrdersNestedInput;
  };

  export type OrderUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderNumber?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    total?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    shippingAddressId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    stripePaymentIntentId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ProductUpsertWithoutOrderItemsInput = {
    update: XOR<
      ProductUpdateWithoutOrderItemsInput,
      ProductUncheckedUpdateWithoutOrderItemsInput
    >;
    create: XOR<
      ProductCreateWithoutOrderItemsInput,
      ProductUncheckedCreateWithoutOrderItemsInput
    >;
    where?: ProductWhereInput;
  };

  export type ProductUpdateToOneWithWhereWithoutOrderItemsInput = {
    where?: ProductWhereInput;
    data: XOR<
      ProductUpdateWithoutOrderItemsInput,
      ProductUncheckedUpdateWithoutOrderItemsInput
    >;
  };

  export type ProductUpdateWithoutOrderItemsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    images?: ProductUpdateimagesInput | string[];
    slug?: StringFieldUpdateOperationsInput | string;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    inStock?: BoolFieldUpdateOperationsInput | boolean;
    drop?: DropUpdateOneWithoutProductsNestedInput;
    variants?: ProductVariantUpdateManyWithoutProductNestedInput;
  };

  export type ProductUncheckedUpdateWithoutOrderItemsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    images?: ProductUpdateimagesInput | string[];
    slug?: StringFieldUpdateOperationsInput | string;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    inStock?: BoolFieldUpdateOperationsInput | boolean;
    dropId?: NullableStringFieldUpdateOperationsInput | string | null;
    variants?: ProductVariantUncheckedUpdateManyWithoutProductNestedInput;
  };

  export type ProductVariantUpsertWithoutOrderItemsInput = {
    update: XOR<
      ProductVariantUpdateWithoutOrderItemsInput,
      ProductVariantUncheckedUpdateWithoutOrderItemsInput
    >;
    create: XOR<
      ProductVariantCreateWithoutOrderItemsInput,
      ProductVariantUncheckedCreateWithoutOrderItemsInput
    >;
    where?: ProductVariantWhereInput;
  };

  export type ProductVariantUpdateToOneWithWhereWithoutOrderItemsInput = {
    where?: ProductVariantWhereInput;
    data: XOR<
      ProductVariantUpdateWithoutOrderItemsInput,
      ProductVariantUncheckedUpdateWithoutOrderItemsInput
    >;
  };

  export type ProductVariantUpdateWithoutOrderItemsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    size?: StringFieldUpdateOperationsInput | string;
    color?: NullableStringFieldUpdateOperationsInput | string | null;
    sku?: StringFieldUpdateOperationsInput | string;
    stock?: IntFieldUpdateOperationsInput | number;
    product?: ProductUpdateOneRequiredWithoutVariantsNestedInput;
  };

  export type ProductVariantUncheckedUpdateWithoutOrderItemsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    size?: StringFieldUpdateOperationsInput | string;
    color?: NullableStringFieldUpdateOperationsInput | string | null;
    sku?: StringFieldUpdateOperationsInput | string;
    stock?: IntFieldUpdateOperationsInput | number;
  };

  export type UserCreateWithoutAddressesInput = {
    id?: string;
    email: string;
    name?: string | null;
    firebaseUid?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    orders?: OrderCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutAddressesInput = {
    id?: string;
    email: string;
    name?: string | null;
    firebaseUid?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutAddressesInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutAddressesInput,
      UserUncheckedCreateWithoutAddressesInput
    >;
  };

  export type OrderCreateWithoutShippingAddressInput = {
    id?: string;
    orderNumber: string;
    status?: $Enums.OrderStatus;
    total: Decimal | DecimalJsLike | number | string;
    stripePaymentIntentId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutOrdersInput;
    items?: OrderItemCreateNestedManyWithoutOrderInput;
  };

  export type OrderUncheckedCreateWithoutShippingAddressInput = {
    id?: string;
    orderNumber: string;
    userId: string;
    status?: $Enums.OrderStatus;
    total: Decimal | DecimalJsLike | number | string;
    stripePaymentIntentId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput;
  };

  export type OrderCreateOrConnectWithoutShippingAddressInput = {
    where: OrderWhereUniqueInput;
    create: XOR<
      OrderCreateWithoutShippingAddressInput,
      OrderUncheckedCreateWithoutShippingAddressInput
    >;
  };

  export type OrderCreateManyShippingAddressInputEnvelope = {
    data:
      | OrderCreateManyShippingAddressInput
      | OrderCreateManyShippingAddressInput[];
    skipDuplicates?: boolean;
  };

  export type UserUpsertWithoutAddressesInput = {
    update: XOR<
      UserUpdateWithoutAddressesInput,
      UserUncheckedUpdateWithoutAddressesInput
    >;
    create: XOR<
      UserCreateWithoutAddressesInput,
      UserUncheckedCreateWithoutAddressesInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutAddressesInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutAddressesInput,
      UserUncheckedUpdateWithoutAddressesInput
    >;
  };

  export type UserUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    orders?: OrderUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type OrderUpsertWithWhereUniqueWithoutShippingAddressInput = {
    where: OrderWhereUniqueInput;
    update: XOR<
      OrderUpdateWithoutShippingAddressInput,
      OrderUncheckedUpdateWithoutShippingAddressInput
    >;
    create: XOR<
      OrderCreateWithoutShippingAddressInput,
      OrderUncheckedCreateWithoutShippingAddressInput
    >;
  };

  export type OrderUpdateWithWhereUniqueWithoutShippingAddressInput = {
    where: OrderWhereUniqueInput;
    data: XOR<
      OrderUpdateWithoutShippingAddressInput,
      OrderUncheckedUpdateWithoutShippingAddressInput
    >;
  };

  export type OrderUpdateManyWithWhereWithoutShippingAddressInput = {
    where: OrderScalarWhereInput;
    data: XOR<
      OrderUpdateManyMutationInput,
      OrderUncheckedUpdateManyWithoutShippingAddressInput
    >;
  };

  export type OrderCreateManyUserInput = {
    id?: string;
    orderNumber: string;
    status?: $Enums.OrderStatus;
    total: Decimal | DecimalJsLike | number | string;
    shippingAddressId?: string | null;
    stripePaymentIntentId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AddressCreateManyUserInput = {
    id?: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country?: string;
    isDefault?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type OrderUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderNumber?: StringFieldUpdateOperationsInput | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    total?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    stripePaymentIntentId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    items?: OrderItemUpdateManyWithoutOrderNestedInput;
    shippingAddress?: AddressUpdateOneWithoutOrdersNestedInput;
  };

  export type OrderUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderNumber?: StringFieldUpdateOperationsInput | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    total?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    shippingAddressId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    stripePaymentIntentId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput;
  };

  export type OrderUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderNumber?: StringFieldUpdateOperationsInput | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    total?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    shippingAddressId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    stripePaymentIntentId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AddressUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    street?: StringFieldUpdateOperationsInput | string;
    city?: StringFieldUpdateOperationsInput | string;
    state?: StringFieldUpdateOperationsInput | string;
    postalCode?: StringFieldUpdateOperationsInput | string;
    country?: StringFieldUpdateOperationsInput | string;
    isDefault?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    orders?: OrderUpdateManyWithoutShippingAddressNestedInput;
  };

  export type AddressUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    street?: StringFieldUpdateOperationsInput | string;
    city?: StringFieldUpdateOperationsInput | string;
    state?: StringFieldUpdateOperationsInput | string;
    postalCode?: StringFieldUpdateOperationsInput | string;
    country?: StringFieldUpdateOperationsInput | string;
    isDefault?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    orders?: OrderUncheckedUpdateManyWithoutShippingAddressNestedInput;
  };

  export type AddressUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    street?: StringFieldUpdateOperationsInput | string;
    city?: StringFieldUpdateOperationsInput | string;
    state?: StringFieldUpdateOperationsInput | string;
    postalCode?: StringFieldUpdateOperationsInput | string;
    country?: StringFieldUpdateOperationsInput | string;
    isDefault?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type OrderItemCreateManyProductInput = {
    id?: string;
    orderId: string;
    variantId?: string | null;
    quantity: number;
    price: Decimal | DecimalJsLike | number | string;
  };

  export type ProductVariantCreateManyProductInput = {
    id?: string;
    size: string;
    color?: string | null;
    sku: string;
    stock?: number;
  };

  export type OrderItemUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string;
    quantity?: IntFieldUpdateOperationsInput | number;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput;
    variant?: ProductVariantUpdateOneWithoutOrderItemsNestedInput;
  };

  export type OrderItemUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderId?: StringFieldUpdateOperationsInput | string;
    variantId?: NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: IntFieldUpdateOperationsInput | number;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
  };

  export type OrderItemUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderId?: StringFieldUpdateOperationsInput | string;
    variantId?: NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: IntFieldUpdateOperationsInput | number;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
  };

  export type ProductVariantUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string;
    size?: StringFieldUpdateOperationsInput | string;
    color?: NullableStringFieldUpdateOperationsInput | string | null;
    sku?: StringFieldUpdateOperationsInput | string;
    stock?: IntFieldUpdateOperationsInput | number;
    orderItems?: OrderItemUpdateManyWithoutVariantNestedInput;
  };

  export type ProductVariantUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string;
    size?: StringFieldUpdateOperationsInput | string;
    color?: NullableStringFieldUpdateOperationsInput | string | null;
    sku?: StringFieldUpdateOperationsInput | string;
    stock?: IntFieldUpdateOperationsInput | number;
    orderItems?: OrderItemUncheckedUpdateManyWithoutVariantNestedInput;
  };

  export type ProductVariantUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string;
    size?: StringFieldUpdateOperationsInput | string;
    color?: NullableStringFieldUpdateOperationsInput | string | null;
    sku?: StringFieldUpdateOperationsInput | string;
    stock?: IntFieldUpdateOperationsInput | number;
  };

  export type OrderItemCreateManyVariantInput = {
    id?: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: Decimal | DecimalJsLike | number | string;
  };

  export type OrderItemUpdateWithoutVariantInput = {
    id?: StringFieldUpdateOperationsInput | string;
    quantity?: IntFieldUpdateOperationsInput | number;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput;
    product?: ProductUpdateOneRequiredWithoutOrderItemsNestedInput;
  };

  export type OrderItemUncheckedUpdateWithoutVariantInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderId?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    quantity?: IntFieldUpdateOperationsInput | number;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
  };

  export type OrderItemUncheckedUpdateManyWithoutVariantInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderId?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    quantity?: IntFieldUpdateOperationsInput | number;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
  };

  export type ProductCreateManyDropInput = {
    id?: string;
    name: string;
    description?: string | null;
    price: Decimal | DecimalJsLike | number | string;
    images?: ProductCreateimagesInput | string[];
    slug: string;
    category?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    inStock?: boolean;
  };

  export type ProductUpdateWithoutDropInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    images?: ProductUpdateimagesInput | string[];
    slug?: StringFieldUpdateOperationsInput | string;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    inStock?: BoolFieldUpdateOperationsInput | boolean;
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput;
    variants?: ProductVariantUpdateManyWithoutProductNestedInput;
  };

  export type ProductUncheckedUpdateWithoutDropInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    images?: ProductUpdateimagesInput | string[];
    slug?: StringFieldUpdateOperationsInput | string;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    inStock?: BoolFieldUpdateOperationsInput | boolean;
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput;
    variants?: ProductVariantUncheckedUpdateManyWithoutProductNestedInput;
  };

  export type ProductUncheckedUpdateManyWithoutDropInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    images?: ProductUpdateimagesInput | string[];
    slug?: StringFieldUpdateOperationsInput | string;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    inStock?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type OrderItemCreateManyOrderInput = {
    id?: string;
    productId: string;
    variantId?: string | null;
    quantity: number;
    price: Decimal | DecimalJsLike | number | string;
  };

  export type OrderItemUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string;
    quantity?: IntFieldUpdateOperationsInput | number;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    product?: ProductUpdateOneRequiredWithoutOrderItemsNestedInput;
    variant?: ProductVariantUpdateOneWithoutOrderItemsNestedInput;
  };

  export type OrderItemUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    variantId?: NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: IntFieldUpdateOperationsInput | number;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
  };

  export type OrderItemUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string;
    productId?: StringFieldUpdateOperationsInput | string;
    variantId?: NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: IntFieldUpdateOperationsInput | number;
    price?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
  };

  export type OrderCreateManyShippingAddressInput = {
    id?: string;
    orderNumber: string;
    userId: string;
    status?: $Enums.OrderStatus;
    total: Decimal | DecimalJsLike | number | string;
    stripePaymentIntentId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type OrderUpdateWithoutShippingAddressInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderNumber?: StringFieldUpdateOperationsInput | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    total?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    stripePaymentIntentId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput;
    items?: OrderItemUpdateManyWithoutOrderNestedInput;
  };

  export type OrderUncheckedUpdateWithoutShippingAddressInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderNumber?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    total?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    stripePaymentIntentId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput;
  };

  export type OrderUncheckedUpdateManyWithoutShippingAddressInput = {
    id?: StringFieldUpdateOperationsInput | string;
    orderNumber?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    total?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    stripePaymentIntentId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
