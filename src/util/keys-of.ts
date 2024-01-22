// https://stackoverflow.com/questions/55012174/why-doesnt-object-keys-return-a-keyof-type-in-typescript
function keysOf<T extends object>(obj: T): Array<keyof T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Array.from(Object.keys(obj)) as any;
}

export default keysOf;
