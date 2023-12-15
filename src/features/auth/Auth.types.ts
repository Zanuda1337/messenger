export interface Form<Fields> {
  onSubmit: (data: Fields) => void;
  initialValues: Fields;
  fetching?: boolean;
}
