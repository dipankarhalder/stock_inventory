import { useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { categoryType } from "../../../constant/types";
import { Button } from "../../../shared/button/Button";
import { FormInput } from "../../../components/auth/FormInput";
import { ToastContext } from "../../../shared/toast/context/ToastContext";
import { toastStatus, btnStatus } from "../../../constant";
import { postServices } from "../../../services/core.services";
import { addCategoryService } from "../../../services/endpoints";
import { useCategoryStore } from "../../../stores/categoryStore";

const initialState = {
  categoryName: "",
  categoryCode: "",
  status: "",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case categoryType.CATEGORYNAME:
      return { ...state, categoryName: action.payload };
    case categoryType.CATEGORYCODE:
      return { ...state, categoryCode: action.payload };
    case categoryType.STATUS:
      return { ...state, status: action.payload };
    case categoryType.RESET:
      return { categoryName: "", categoryCode: "", status: "" };
    default:
      return state;
  }
};

export const AddUserCategory = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { addToast } = useContext(ToastContext);
  const { isLoading, setLoading } = useCategoryStore();

  const formFields = [
    {
      name: "categoryName",
      type: "text",
      value: state.categoryName,
      placeholder: "Category Name",
      dispatchType: categoryType.CATEGORYNAME,
    },
    {
      name: "categoryCode",
      type: "text",
      value: state.categoryCode,
      placeholder: "Category Code",
      dispatchType: categoryType.CATEGORYCODE,
    },
    {
      name: "status",
      type: "text",
      value: state.status,
      placeholder: "Statue",
      dispatchType: categoryType.STATUS,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(state);

    try {
      const res = await postServices(addCategoryService, state);

      await addToast({
        type: toastStatus.SUCCESS,
        title: "Success!",
        description: res.data.message || "New category added successfully",
      });

      navigate("..", { relative: "path" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app_add_form">
      <div className="app_new_item_form">
        <h2>Add New Category</h2>
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
