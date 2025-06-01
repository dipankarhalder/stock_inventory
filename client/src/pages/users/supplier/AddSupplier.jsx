import { useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { supplierType } from "../../../constant/types";
import { Button } from "../../../shared/button/Button";
import { FormInput } from "../../../components/auth/FormInput";
import { ToastContext } from "../../../shared/toast/context/ToastContext";
import { toastStatus, btnStatus } from "../../../constant";
import { postServices } from "../../../services/core.services";
import { addSupplierService } from "../../../services/endpoints";
import { useSupplierStore } from "../../../stores/supplierStore";

const initialState = {
  supId: "",
  name: "",
  company: "",
  email: "",
  phone: "",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case supplierType.SUPID:
      return { ...state, supId: action.payload };
    case supplierType.NAME:
      return { ...state, name: action.payload };
    case supplierType.COMPANY:
      return { ...state, company: action.payload };
    case supplierType.EMAIL:
      return { ...state, email: action.payload };
    case supplierType.PHONE:
      return { ...state, phone: action.payload };
    case supplierType.RESET:
      return { supId: "", name: "", company: "", email: "", phone: "" };
    default:
      return state;
  }
};

export const AddSupplier = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { addToast } = useContext(ToastContext);
  const { isLoading, setLoading } = useSupplierStore();

  const formFields = [
    {
      name: "supId",
      type: "text",
      value: state.supId,
      placeholder: "Supplier ID",
      dispatchType: supplierType.SUPID,
    },
    {
      name: "name",
      type: "text",
      value: state.name,
      placeholder: "Supplier name",
      dispatchType: supplierType.NAME,
    },
    {
      name: "company",
      type: "text",
      value: state.company,
      placeholder: "Company name",
      dispatchType: supplierType.COMPANY,
    },
    {
      name: "email",
      type: "email",
      value: state.email,
      placeholder: "Email address",
      dispatchType: supplierType.EMAIL,
    },
    {
      name: "phone",
      type: "text",
      value: state.phone,
      placeholder: "Phone",
      dispatchType: supplierType.PHONE,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await postServices(addSupplierService, state);

      await addToast({
        type: toastStatus.SUCCESS,
        title: "Success!",
        description: res.data.message || "New supplier added successfully",
      });

      navigate("..", { relative: "path" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app_add_form">
      <div className="app_new_item_form">
        <h2>Add New Supplier</h2>
        <p>Please fill the filed informations</p>
        <div className="app_form_auth">
          <form onSubmit={handleSubmit}>
            {formFields.map((field, index) => (
              <div className="app_wrap_field" key={index}>
                <FormInput {...field} dispatch={dispatch} />
              </div>
            ))}
            <div>
              <Button status={isLoading && btnStatus.LOADING}>Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
