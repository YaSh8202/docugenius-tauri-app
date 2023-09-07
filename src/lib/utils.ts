import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string;

const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

export const uploadToCloudinary = async (file: File, title: string) => {
  const formData = new FormData();
  const newFile = new File([file], title, { type: file.type });
  
  formData.append("file", newFile);
  formData.append("upload_preset", uploadPreset);
  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  console.log("data file", data);
  const secureUrl = data.secure_url as string;
  return secureUrl;
};
