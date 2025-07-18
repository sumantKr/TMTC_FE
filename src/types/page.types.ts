export interface IPageProps<
  T extends Record<string, any> = object,
  K extends Record<string, any> = object
> {
  searchParams: Promise<T>;
  params: Promise<K>;
}
