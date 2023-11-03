export const httpMethods = [
  {
    id: "qwewqe131ewq",
    name: "GET",
    color: "text-green-500",
  },
  {
    id: "weqr42245-rf-43r-rf4",
    name: "POST",
    color: "text-yellow-500",
  },
  {
    id: "1",
    name: "PUT",
    color: "text-blue-500",
  },
  {
    id: "ew-f53656-rfs--eqadfad",
    name: "DELETE",
    color: "text-red-500",
  },
];

export function getColorOfMethod(method: string) {
  return (
    httpMethods.find((httpMethod) => httpMethod.name === method)?.color ??
    "text-white"
  );
}
