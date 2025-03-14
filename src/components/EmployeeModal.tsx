"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

type EmployeeForm = {
  firstName: string;
  lastName: string;
  avatar: FileList | null;
  department: string;
};

type Department = {
  id: string;
  name: string;
};

type EmployeeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const EmployeeModal: React.FC<EmployeeModalProps> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EmployeeForm>();

  const [departments, setDepartments] = useState<Department[]>([]);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/api/departments")
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((error) => console.error("Error fetching departments:", error));
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.size <= 600 * 1024 && file.type.startsWith("image/")) {
      setAvatarPreview(URL.createObjectURL(file));
      setValue("avatar", event.target.files);
    } else {
      setValue("avatar", null);
      setAvatarPreview(null);
      alert("Invalid file. Ensure it's an image and less than 600KB.");
    }
  };

  const removeAvatar = () => {
    setValue("avatar", null);
    setAvatarPreview(null);
  };

  const onSubmit = async (data: EmployeeForm) => {
    const formData = new FormData();

    formData.append("name", data.firstName);
    formData.append("surname", data.lastName);
    formData.append("department_id", data.department);

    if (data.avatar && data.avatar[0]) {
      formData.append("avatar", data.avatar[0]);
    }

    try {
      const response = await fetch(
        "https://momentum.redberryinternship.ge/api/employees",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer 9e686711-3c8a-4e08-8fbe-15612e25ab5b`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Network response was not ok: " + errorText);
      }

      await response.json();

      reset();
      setAvatarPreview(null);
      onClose();
    } catch (error) {
      console.error("Error submitting the employee data:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0F1026]"
      onClick={onClose}
    >
      <div
        className="px-12 pt-10 pb-14 bg-white rounded-[10px] inline-flex flex-col justify-start items-end gap-9 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="w-10 h-10 relative cursor-pointer bg-gray-300 hover:bg-gray-400  transition rounded-4xl flex items-center justify-center overflow-hidden"
        >
          <span className="  text-white font-bold cursor-pointer text-2xl">
            ✕
          </span>
        </button>

        <div className="w-[813px] flex flex-col justify-end items-end gap-6">
          <div className="self-stretch flex flex-col justify-start items-center gap-11">
            <div className="self-stretch text-center justify-start text-neutral-800 text-3xl font-medium font-['FiraGO']">
              თანამშრომლის დამატება
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="self-stretch flex flex-col justify-start items-start gap-11"
            >
              <div className="self-stretch inline-flex justify-start items-center gap-11">
                <div className="w-96 inline-flex flex-col justify-start items-start gap-[3px]">
                  <div className="self-stretch inline-flex justify-start items-start">
                    <div className="flex justify-start items-start">
                      <div className="justify-start text-neutral-700 text-sm font-medium font-['FiraGO']">
                        სახელი
                      </div>
                      <div className="w-2 h-2 -mt-1 relative ">*</div>
                    </div>
                  </div>

                  <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                    <div className="self-stretch h-10 p-2.5 bg-white rounded-md  outline-1 outline-offset-[-1px] outline-gray-300 inline-flex justify-between items-center">
                      <input
                        type="text"
                        className="flex-1 bg-transparent focus:outline-none"
                        {...register("firstName", {
                          required: "სავალდებულო",
                          minLength: {
                            value: 2,
                            message: "მინიმუმ 2 სიმბოლო",
                          },
                          maxLength: {
                            value: 255,
                            message: "მაქსიმუმ 255 სიმბოლო",
                          },
                          pattern: {
                            value: /^[A-Za-zა-ჰ]+$/,
                            message: "მხოლოდ ქართული და ლათინური ასოები",
                          },
                        })}
                      />
                    </div>

                    {errors.firstName && (
                      <p className="text-red-500 text-xs ml-1">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-96 inline-flex flex-col justify-start items-start gap-[3px]">
                  <div className="self-stretch inline-flex justify-start items-start">
                    <div className="flex justify-start items-start">
                      <div className="justify-start text-neutral-700 text-sm font-medium font-['FiraGO']">
                        გვარი
                      </div>
                      <div className="w-2 h-2 -mt-1 relative ">*</div>
                    </div>
                  </div>

                  <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                    <div className="self-stretch h-10 p-2.5 bg-white rounded-md  outline-1 outline-offset-[-1px] outline-gray-300 inline-flex justify-between items-center">
                      <input
                        type="text"
                        className="flex-1 bg-transparent focus:outline-none"
                        {...register("lastName", {
                          required: "სავალდებულო",
                          minLength: {
                            value: 2,
                            message: "მინიმუმ 2 სიმბოლო",
                          },
                          maxLength: {
                            value: 255,
                            message: "მაქსიმუმ 255 სიმბოლო",
                          },
                          pattern: {
                            value: /^[A-Za-zა-ჰ]+$/,
                            message: "მხოლოდ ქართული და ლათინური ასოები",
                          },
                        })}
                      />
                    </div>

                    {errors.lastName && (
                      <p className="text-red-500 text-xs ml-1">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div
                data-property-1="uploaded"
                className="self-stretch flex flex-col justify-start items-start gap-2"
              >
                <div className="self-stretch inline-flex justify-start items-start">
                  <div className="flex justify-start items-start">
                    <div className="justify-start text-neutral-700 text-sm font-medium font-['FiraGO']">
                      ავატარი
                    </div>
                    <div className="w-2 h-2 -mt-1 relative ">*</div>
                  </div>
                </div>

                <div className="self-stretch h-28 relative bg-white rounded-lg  outline-1 outline-offset-[-1px] outline-gray-300 overflow-hidden">
                  {avatarPreview ? (
                    <>
                      <Image
                        src={avatarPreview}
                        alt="Avatar Preview"
                        width={88}
                        height={88}
                        className="absolute left-[363px] top-[16px] rounded-full object-cover "
                      />

                      <button
                        type="button"
                        onClick={removeAvatar}
                        className="w-6 h-6 left-[430px] top-[83px] absolute bg-white rounded-[30px]  outline-[0.30px] outline-gray-500 flex items-center justify-center"
                      >
                        <span className="text-xs text-gray-600">x</span>
                      </button>
                    </>
                  ) : (
                    <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer text-gray-400">
                      <span className="text-sm">Click or drop to upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  )}
                </div>
              </div>

              <div
                data-property-1="Default"
                className="w-96 flex flex-col justify-start items-start gap-[3px]"
              >
                <div className="self-stretch inline-flex justify-start items-start">
                  <div className="flex justify-start items-start">
                    <div className="justify-start text-neutral-700 text-sm font-medium font-['FiraGO']">
                      დეპარტამენტი
                    </div>
                    <div className="w-2 h-2 -mt-1 relative ">*</div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                  <div className="self-stretch h-10 p-2.5 bg-white rounded-md  outline-1 outline-offset-[-1px] outline-gray-300 inline-flex items-center">
                    <select
                      className="w-full bg-transparent focus:outline-none"
                      {...register("department", {
                        required: "სავალდებულო",
                      })}
                    >
                      <option value="">აირჩიეთ დეპარტამენტი</option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {errors.department && (
                    <p className="text-red-500 text-xs ml-1">
                      {errors.department.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="inline-flex justify-start items-center gap-5">
                <button
                  type="button"
                  onClick={onClose}
                  data-state="Default"
                  data-type="Secondary"
                  className="h-10 px-4 py-2.5 rounded-[5px]  outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-0.5 cursor-pointer hover:outline-violet-500 text-violet-700 hover:bg-gray-100"
                >
                  გაუქმება
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-violet-600 cursor-pointer rounded-[5px] flex justify-center items-center gap-1 hover:bg-violet-700"
                >
                  <div className="justify-start text-white text-lg font-normal font-['FiraGO']">
                    დაამატე თანამშრომელი
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
