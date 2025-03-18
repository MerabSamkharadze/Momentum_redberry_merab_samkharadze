"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Down from "../../public/svg/Down";

const employeeFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "მინიმუმ 2 სიმბოლო" })
    .max(255, { message: "მაქსიმუმ 255 სიმბოლო" })
    .regex(/^[A-Za-zა-ჰ]+$/, { message: "მხოლოდ ქართული და ლათინური ასოები" }),
  lastName: z
    .string()
    .min(2, { message: "მინიმუმ 2 სიმბოლო" })
    .max(255, { message: "მაქსიმუმ 255 სიმბოლო" })
    .regex(/^[A-Za-zა-ჰ]+$/, { message: "მხოლოდ ქართული და ლათინური ასოები" }),
  avatar: z
    .any()
    .refine((files) => files instanceof FileList && files.length > 0, {
      message: "სურათი სავალდებულოა",
    })
    .refine(
      (files) => files instanceof FileList && files[0].size <= 600 * 1024,
      { message: "სურათის ზომა არ უნდა აღემატებოდეს 600KB-ს" }
    )
    .refine(
      (files) =>
        files instanceof FileList && files[0].type.startsWith("image/"),
      { message: "ფაილი უნდა იყოს სურათი" }
    ),
  department: z.string().nonempty("დეპარტამენტი სავალდებულოა"),
});

export type EmployeeForm = z.infer<typeof employeeFormSchema>;

type Department = {
  id: string;
  name: string;
};

type EmployeeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  refetchEmployees: () => void;
};

const EmployeeModal: React.FC<EmployeeModalProps> = ({
  isOpen,
  onClose,
  refetchEmployees,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm<EmployeeForm>({
    resolver: zodResolver(employeeFormSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      avatar: null,
      department: "",
    },
  });

  useEffect(() => {
    trigger();
  }, [trigger]);

  const [departments, setDepartments] = useState<Department[]>([]);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const firstNameValue = watch("firstName");
  const lastNameValue = watch("lastName");

  const isFirstNameMinValid = firstNameValue.length >= 2;
  const isFirstNameMaxValid = firstNameValue.length <= 255;
  const isFirstNamePatternValid = /^[A-Za-zა-ჰ]+$/.test(firstNameValue);

  const isLastNameMinValid = lastNameValue.length >= 2;
  const isLastNameMaxValid = lastNameValue.length <= 255;
  const isLastNamePatternValid = /^[A-Za-zა-ჰ]+$/.test(lastNameValue);
  // --- დროპდაუნების სამართავი სტეიტები ---
  const [openDepartment, setOpenDepartment] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");

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
      setValue("avatar", event.target.files, { shouldValidate: true });
    } else {
      setValue("avatar", null, { shouldValidate: true });
      setAvatarPreview(null);
      alert("გთხოვთ, ატვირთე სურათი, რომლის ზომაც არ აღემატება 600KB-ს.");
    }
  };

  const removeAvatar = () => {
    setValue("avatar", null, { shouldValidate: true });
    setAvatarPreview(null);
  };

  const onSubmit = async (data: EmployeeForm) => {
    const formData = new FormData();
    formData.append("name", data.firstName);
    formData.append("surname", data.lastName);
    formData.append("department_id", selectedDepartmentId);

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
      refetchEmployees();
      onClose();
    } catch (error) {
      console.error("Error submitting the employee data:", error);
    }
  };

  const handleClose = () => {
    reset();
    setAvatarPreview(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex pt-[125px] justify-center bg-[#0D0F1026]"
      onClick={handleClose}
    >
      <div
        className="px-12 pt-10 pb-14n h-[777px] bg-white rounded-[10px] inline-flex flex-col justify-start items-end gap-9 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="w-10 h-10 relative cursor-pointer bg-gray-300 hover:bg-gray-400 transition rounded-4xl flex items-center justify-center overflow-hidden"
        >
          <span className="text-white font-bold text-2xl">✕</span>
        </button>

        <div className="w-[813px] flex flex-col gap-6">
          <div className="text-center text-neutral-800 text-3xl font-medium">
            თანამშრომლის დამატება
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-11"
          >
            <div className="flex gap-11">
              {/* სახელი */}
              <div className="w-96 flex flex-col gap-[3px]">
                <div className="flex items-center gap-1">
                  <span className="text-neutral-700 text-sm font-medium">
                    სახელი
                  </span>
                  <span>*</span>
                </div>
                <div className="h-10 p-2.5 bg-white rounded-md border focus-within:border-violet-600">
                  <input
                    type="text"
                    className="w-full bg-transparent focus:outline-none"
                    {...register("firstName")}
                  />
                </div>
                {/* რეალურ დროში მოთხოვნების ჩვენება */}
                <div className="flex flex-col gap-1 mt-1">
                  <span
                    className={`text-xs flex ${
                      isFirstNameMinValid ? "text-[#08A508]" : "text-[#FA4D4D]"
                    }`}
                  >
                    <img
                      src={`/check${isFirstNameMinValid ? "_green" : ""}.svg`}
                      alt="check"
                    />
                    მინიმუმ 2 სიმბოლო
                  </span>
                  <span
                    className={`text-xs flex ${
                      isFirstNameMaxValid ? "text-[#08A508]" : "text-[#FA4D4D]"
                    }`}
                  >
                    <img
                      src={`/check${isFirstNameMaxValid ? "_green" : ""}.svg`}
                      alt="check"
                    />
                    მაქსიმუმ 255 სიმბოლო
                  </span>
                  <span
                    className={`text-xs flex ${
                      isFirstNamePatternValid
                        ? "text-[#08A508]"
                        : "text-[#FA4D4D]"
                    }`}
                  >
                    <img
                      src={`/check${
                        isFirstNamePatternValid ? "_green" : ""
                      }.svg`}
                      alt="check"
                    />
                    მხოლოდ ქართული და ლათინური ასოები
                  </span>
                </div>
              </div>

              {/* გვარი */}
              <div className="w-96 flex flex-col gap-[3px]">
                <div className="flex items-center gap-1">
                  <span className="text-neutral-700 text-sm font-medium">
                    გვარი
                  </span>
                  <span>*</span>
                </div>
                <div className="h-10 p-2.5 bg-white rounded-md border focus-within:border-violet-600">
                  <input
                    type="text"
                    className="w-full bg-transparent focus:outline-none"
                    {...register("lastName")}
                  />
                </div>
                <div className="flex flex-col gap-1 mt-1">
                  <span
                    className={`text-xs flex ${
                      isLastNameMinValid ? "text-[#08A508]" : "text-[#FA4D4D]"
                    }`}
                  >
                    <img
                      src={`/check${isLastNameMinValid ? "_green" : ""}.svg`}
                      alt="check"
                    />
                    მინიმუმ 2 სიმბოლო
                  </span>
                  <span
                    className={`text-xs flex ${
                      isLastNameMaxValid ? "text-[#08A508]" : "text-[#FA4D4D]"
                    }`}
                  >
                    <img
                      src={`/check${isLastNameMaxValid ? "_green" : ""}.svg`}
                      alt="check"
                    />
                    მაქსიმუმ 255 სიმბოლო
                  </span>
                  <span
                    className={`text-xs flex ${
                      isLastNamePatternValid
                        ? "text-[#08A508]"
                        : "text-[#FA4D4D]"
                    }`}
                  >
                    <img
                      src={`/check${
                        isLastNamePatternValid ? "_green" : ""
                      }.svg`}
                      alt="check"
                    />
                    მხოლოდ ქართული და ლათინური ასოები
                  </span>
                </div>
              </div>
            </div>

            {/* ავატარი */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <span className="text-neutral-700 text-sm font-medium">
                  ავატარი
                </span>
                <span>*</span>
              </div>
              <div className="h-28 relative bg-white rounded-lg border overflow-hidden">
                {avatarPreview ? (
                  <>
                    <Image
                      src={avatarPreview}
                      alt="Avatar Preview"
                      width={88}
                      height={88}
                      className="absolute left-[363px] h-[88px] top-[16px] rounded-full object-cover overflow-hidden"
                    />
                    <button
                      type="button"
                      onClick={removeAvatar}
                      className="w-6 h-6 absolute left-[430px] top-[83px] bg-white rounded-full flex items-center justify-center"
                    >
                      <img src="/trash-2.svg" alt="trash" />
                    </button>
                  </>
                ) : (
                  <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer text-gray-400">
                    <span>
                      <img src="/image.svg" alt="image" />
                    </span>
                    <span className="justify-start text-neutral-700 text-sm font-normal font-sans">
                      ატვირთე ფოტო
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                )}
              </div>
              {!avatarPreview && errors.avatar && (
                <span className="text-xs text-[#FA4D4D]">
                  {errors.avatar.message as string}
                </span>
              )}
            </div>

            {/* --- დეპარტამენტი --- */}
            <div className="h-28 w-96 flex flex-col">
              <div className="py-1.5 flex items-center">
                <label className="text-neutral-700 text-base font-normal font-['FiraGO']">
                  დეპარტამენტი
                </label>
                <span className="ml-1">*</span>
              </div>
              <div className="z-40">
                <div
                  className="p-3.5 bg-white rounded-[5px] outline-1 outline-zinc-200 flex items-center justify-between cursor-pointer"
                  onClick={() => setOpenDepartment(!openDepartment)}
                >
                  <span>{selectedDepartment || ""}</span>
                  <span
                    className={`transform transition-transform ${
                      openDepartment ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <div className="w-3.5 h-3.5">
                      <Down />
                    </div>
                  </span>
                </div>
                {openDepartment && (
                  <div className="mt-2 w-full bg-white rounded border border-violet-600">
                    {departments.map((dep) => (
                      <div
                        key={dep.id}
                        className="p-3.5 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setSelectedDepartment(dep.name);
                          setSelectedDepartmentId(dep.id);
                          setValue("department", dep.name, {
                            shouldValidate: true,
                          });
                          setOpenDepartment(false);
                        }}
                      >
                        <span>{dep.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ღილაკები */}
            <div className="flex justify-end gap-5">
              <button
                type="button"
                onClick={handleClose}
                className="h-10 px-4 rounded-md border text-violet-700 hover:bg-gray-100"
              >
                გაუქმება
              </button>
              <button
                type="submit"
                disabled={!isValid}
                className="px-5 py-2.5 bg-violet-600 rounded-md text-white hover:bg-violet-700 disabled:cursor-not-allowed"
              >
                დაამატე თანამშრომელი
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
