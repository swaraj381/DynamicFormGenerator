import { useEffect } from "react";
import { FieldErrors, useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  username: string;
  email: string;
  fullname: string;
  address: {
    line1: string;
    line2: string;
  };
  age: number;
  dob: Date;
  phone: {
    number: string;
  }[];
  gender: string;
};

export const Form = () => {
  const form = useForm<FormValues>({
    defaultValues: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await response.json();
      return {
        username: "Batman",
        email: data.email,
        fullname: "",
        address: {
          line1: "",
          line2: "",
        },
        age: 0,
        dob: new Date(),
        phone: [{ number: "" }],
        gender: "male",
      };
    },
    mode: "onTouched",
  });

  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
    trigger,
  } = form;

  const { fields, append, remove } = useFieldArray({
    name: "phone",
    control,
  });

  const {
    errors,
    isDirty,
    touchedFields,
    dirtyFields,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  } = formState;

  console.log({
    errors,
    isDirty,
    touchedFields,
    dirtyFields,
    isValid,
  });
  console.log({
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form errors", errors);
  };

  const onReset = () => {
    reset();
  };

  const handleGetValues = () => {
    console.log("Get values", getValues("username"));
  };

  const handleSetValue = () => {
    setValue("username", "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div>
      <h1>Dynamic Form</h1>

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: { value: true, message: "Username is required" },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "Enter a different email address"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not supported"
                  );
                },
                emailAvailable: async (fieldValue) => {
                  const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                  );
                  const data = await response.json();
                  return data.length === 0 || "Email already exists";
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            {...register("fullname", {
              required: { value: true, message: "FullName is required" },
            })}
          />
          <p className="error">{errors.fullname?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="address-line1">Address Line 1</label>
          <input
            type="text"
            id="address-line1"
            {...register("address.line1", {
              required: { value: true, message: "Address is required" },
            })}
          />
          <p className="error">{errors.address?.line1?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="address-line2">Address Line 2</label>
          <input
            type="text"
            id="address-line2"
            {...register("address.line2", {
              required: { value: true, message: "Address is required" },
              //disabled: !watch("address.line1"), 
            })}
          />
          <p className="error">{errors.address?.line2?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="age">Age</label>
           <input
              type="number"
              id="age"
              {...register("age", {
              valueAsNumber: true,
              required: { value: true, message: "Age is required" },
              min: { value: 0, message: "Age must be a non-negative number" },
              validate: {
                nonNegative: (value) => value >= 0 || "Age must be a non-negative number",
              },
             })}
             defaultValue={0}
          />
          <p className="error">{errors.age?.message}</p>
       </div>


        <div className="form-control">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
              required: { value: true, message: "Date of Birth is required" },
            })}
          />
          <p className="error">{errors.dob?.message}</p>
        </div>

        <div className="form-control">
          <label>List of phone numbers</label>
          <div>
            {fields.map((field, index) => (
              <div className="form-control" key={field.id}>
                <input
                  type="text"
                  {...register(`phone.${index}.number` as const)}
                />

                {index > 0 && (
                  <button type="button" onClick={() => remove(index)}>
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                append({
                  number: "",
                })
              }
            >
              Add phone number
            </button>
          </div>
        </div>

        <div className="form-control">
          <label>Gender</label>
          <div>
            <label>
              <input
                type="radio"
                value="male"
                {...register("gender", {
                  required: "Please select your gender",
                })}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="female"
                {...register("gender", {
                  required: "Please select your gender",
                })}
              />
              Female
            </label>
          </div>
          <p className="error">{errors.gender?.message}</p>
        </div>

        <button type="button" onClick={handleGetValues}>
          Get values
        </button>
        <button type="button" onClick={handleSetValue}>
          Set value
        </button>
        <button type="button" onClick={onReset}>
          Reset
        </button>
        <button type="button" onClick={() => trigger("username")}>
          Username
        </button>
        <button disabled={!isDirty || !isValid} type="submit">
          Submit
        </button>
      </form>

      <DevTool control={control} />
    </div>
  );
};

export default Form;
