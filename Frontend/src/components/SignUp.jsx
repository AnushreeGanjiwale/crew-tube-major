import axios from "axios";
import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { Login } from "../redux/userSlice";
import { apiRequest } from "../utils";

const SignUp = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [isRegister, setIsRegister] = useState(true);
  const [accountType, setAccountType] = useState("seeker");
  const [errMsg, setErrMsg] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const closeModal = () => setOpen(false);

  const onSubmit = async(data) => {
    let URL = null
   
    if(isRegister){
      if (accountType == "seeker"){
        URL ="auth/register";
      }else{
        URL = "companies/register";
      }
    }else{
      if(accountType === "seeker"){
        URL = "auth/login";
      }else{
        URL = "companies/login";
      }
    }

    try{
      const res = await apiRequest({
        url:URL,
        data:data,
        method:"POST",
      });
       console.log(res, "-----------------------------res");
      if(res?.status === "failed"){
        setErrMsg(res?.message);
      }else{
        setErrMsg("");
        const data = {token:res?.token,...res?.user};
        console.log(data, "data-----------------------------------")
        dispatch(Login(data));
        localStorage.setItem("userInfo",JSON.stringify(data));
        // window.location.replace("/find-jobs");
       
      }
    }catch(error){
      console.log(error);
    }
    dispatch(Login({ user: data })); // Dispatch login action
  };

  return (
    <Transition appear show={open}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-semibold leading-6 text-gray-900"
                >
                  {isRegister ? "Create Account" : "Account Sign In"}
                </Dialog.Title>

                <div className="w-full flex items-center justify-center py-4">
                  <button
                    className={`flex-1 px-4 py-2 rounded text-sm outline-none ${
                      accountType === "seeker"
                        ? "bg-red-600 text-white font-semibold"
                        : "bg-white border border-gray-300"
                    }`}
                    onClick={() => setAccountType("seeker")}
                  >
                    User Account
                  </button>
                  <button
                    className={`flex-1 px-4 py-2 rounded text-sm outline-none ${
                      accountType !== "seeker"
                        ? "bg-red-600 text-white font-semibold"
                        : "bg-white border border-gray-300"
                    }`}
                    onClick={() => setAccountType("company")}
                  >
                    Company Account
                  </button>
                </div>

                <form
                  className="w-full flex flex-col gap-5"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <TextInput
                    name="email"
                    label="Email Address"
                    placeholder="email@example.com"
                    type="email"
                    register={register("email", {
                      required: "Email Address is required!",
                    })}
                    error={errors.email ? errors.email.message : ""}
                  />

                  {isRegister && (
                    <div className="w-full flex gap-1 md:gap-2">
                      <div
                        className={`${
                          accountType === "seeker" ? "w-1/2" : "w-full"
                        }`}
                      >
                        <TextInput
                          name={
                            accountType === "seeker" ? "firstName" : "name"
                          }
                          label={
                            accountType === "seeker"
                              ? "First Name"
                              : "Company Name"
                          }
                          placeholder={
                            accountType === "seeker"
                              ? "eg. James"
                              : "Company name"
                          }
                          type="text"
                          register={register(
                            accountType === "seeker" ? "firstName" : "name",
                            {
                              required:
                                accountType === "seeker"
                                  ? "First name is required!"
                                  : "Company name is required!",
                            }
                          )}
                          error={
                            accountType === "seeker"
                              ? errors.firstName
                                ? errors.firstName.message
                                : ""
                              : errors.name
                              ? errors.name.message
                              : ""
                          }
                        />
                      </div>
                      {accountType === "seeker" && (
                        <div className="w-1/2">
                          <TextInput
                            name="lastName"
                            label="Last Name"
                            placeholder="eg. Bond"
                            type="text"
                            register={register("lastName", {
                              required: "Last name is required!",
                            })}
                            error={
                              errors.lastName ? errors.lastName.message : ""
                            }
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <TextInput
                    name="password"
                    label="Password"
                    placeholder="******"
                    type="password"
                    register={register("password", {
                      required: "Password is required!",
                    })}
                    error={errors.password ? errors.password.message : ""}
                  />

                  {isRegister && (
                    <TextInput
                      name="confirm-password"
                      label="Confirm Password"
                      placeholder="******"
                      type="password"
                      register={register("confirm-password", {
                        required: "Confirm your password!",
                        validate: {
                          value: (value) =>
                            value === getValues().password ||
                            "Passwords do not match!",
                        },
                      })}
                      error={
                        errors["confirm-password"]
                          ? errors["confirm-password"].message
                          : ""
                      }
                    />
                  )}

                  <CustomButton
                    title={isRegister ? "Create Account" : "Login"}
                    type="submit"
                    className="w-full bg-primary-green mt-4"
                  />

                  <p
                    className="self-start text-primary-green text-sm cursor-pointer"
                    onClick={() => setIsRegister(!isRegister)}
                  >
                    {isRegister
                      ? "Already have an account? Login"
                      : "Create Account"}
                  </p>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

SignUp.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default SignUp;

