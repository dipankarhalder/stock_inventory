import { useParams } from "react-router-dom";

export const InvoiceCustomer = () => {
  const params = useParams();

  console.log(params);

  return <div>InvoiceCustomer</div>;
};
