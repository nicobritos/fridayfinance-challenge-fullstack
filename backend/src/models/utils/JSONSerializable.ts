export type JSONSerializableKeys<T> = {
  [Key in keyof T]?: Key extends keyof JSONSerializable<object>
    ? undefined
    : unknown;
};

export interface JSONSerializable<T> {
  toJSON(): JSONSerializableKeys<T>;
}
