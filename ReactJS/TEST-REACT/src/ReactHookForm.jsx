import { useForm, Controller } from 'react-hook-form';
import { useEffect } from "react"

export default function ReactHookForm() {
  const { handleSubmit, register, control,  formState: {errors, isSubmitting}, watch, setValue, getValues } = useForm({
    defaultValues: {
      name: "name"
    }
  });

  // Contionusly watch the value of 'name' as the user types
  const watchedName = watch("name");

  // Example: Automatically set the value of 'name' after 2 seconds
  useEffect(()=> {
    const timer = setTimeout(() => {
      setValue("name", "Enter Your Name"); // Programmatically setting the 'name' value
      console.log("Set Name Programmatically to 'Enter Your Name'");
    }, 2000)
    return () => clearTimeout(timer);
  }, [setValue]);

  // Example: Get values programmatically when needed
  const handleGetValues  = () => {
    const formValues = getValues();
    console.log("Current form values", formValues);
  }

  return (
    <div>
      <form onSubmit={handleSubmit((data) => {console.log("Submitted data",data)})}>
        {/* Input field using register */}
        <input 
          type="text"
          placeholder='enter your name'
          {...register("name", {
            required: "Name is required", 
            maxLength: { value: 20, message: "Max length is 20" },
            minLength: { value: 4, message: "Min length is 4" },
            validate: {
              matchPattern: (value) => /^[A-Z][a-zA-Z' -]+(?: [A-Z][a-zA-Z' -]+)*$/.test(value) || "Name is not valid"
            }
          })}  
        />
        {errors.name && <p>{errors.name.message}</p>}
        <br /><br />
        {/* Display watched name */}
        <p>Watched Name: {watchedName}{console.log("Watched Name: ",watchedName)}</p>
        {/* Input field using Controller with validation */}
        <Controller
          name="email"
          control={control}
          rules={{
            required: "email is required",
          }}
          render={({field: {onChange, value = "123"}}) => 
            <>
              <input
                // {...field}
                placeholder='enter your email'
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  console.log("Email Changed: ", e.target.value);
                }}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </>
          }
        />
        <br /><br />
        <input type="submit" disabled={isSubmitting} value={isSubmitting ? "Submitting" : "Submit"} />
        <br /><br />
        <button type='button' onClick={handleGetValues}>Get Form Value</button>
      </form>
    </div>
  )
}