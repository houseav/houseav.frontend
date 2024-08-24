import { useState } from "react";
import { firebaseApp } from "../firebase.js";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { IoImages, IoCheckmarkDoneCircle } from "react-icons/io5";
import FloatingLabelInput from "../components/Input/FloatingLabelnput.jsx";
import InputToolTip from "../components/Input/InputToolTip.jsx";
import { LuCopyPlus } from "react-icons/lu";
import Spinner from "../components/Spinner.jsx";
import { useTranslation } from "react-i18next";

export default function CreateListing() {
  const { t } = useTranslation();
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [isPresentAniamls, setIsPresentAniamls] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  var currentTime = new Date().getTime();
  var oneWeek = 7 * 24 * 60 * 60 * 1000;
  var currentTimePlusWeek = currentTime + oneWeek;
  const [formData, setFormData] = useState({
    imageUrls: "",
    title: "",
    description: "",
    address: "",
    type: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    wifi: false,
    parking: false,
    furnished: false,
    availability: true,
    availabilityDateStart: new Date(currentTime).toISOString().split("T")[0],
    availabilityDateEnd: new Date(currentTimePlusWeek)
      .toISOString()
      .split("T")[0],
    sleepPlace: 1,
    allergy: "",
    animals: "",
    requestRoommateType: "Any",
    transportation: "",
    zone: "",
    verified: false,
  });

  const checkFormData = () => {
    let newErrors = {};
    let isValid = true;
    if (!formData?.title) {
      newErrors.title = "Title is required";
      isValid = false;
    }
    if (!formData?.description) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    if (!formData?.address) {
      newErrors.address = "Address is required";
      isValid = false;
    }

    if (!formData?.availabilityDateStart) {
      newErrors.availabilityDateStart = "Availability Date is required";
      isValid = false;
    }

    if (!formData?.availabilityDateEnd) {
      newErrors.availabilityDateEnd = "Availability Date is required";
      isValid = false;
    }

    if (!formData?.bedrooms) {
      newErrors.bedrooms = "Bedrooms is required";
      isValid = false;
    }

    if (!formData?.bathrooms) {
      newErrors.bathrooms = "Bathrooms is required";
      isValid = false;
    }

    if (!formData?.sleepPlace) {
      newErrors.sleepPlace = "Sleep Place is required";
      isValid = false;
    }

    if (isPresentAniamls && !formData?.animals) {
      newErrors.animals = "Animals is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (event) => {
    if (
      event.target.id === "parking" ||
      event.target.id === "furnished" ||
      event.target.id === "wifi"
    ) {
      setFormData({
        ...formData,
        [event.target.id]: event.target.checked,
      });
    }

    if (
      event.target.type === "text" ||
      event.target.type === "textarea" ||
      event.target.type === "number" ||
      event.target.type === "date"
    ) {
      setFormData({
        ...formData,
        [event.target.id]: event.target.value,
      });
    }
  };

  const handleImageSubmit = () => {
    if (
      files.length > 0 &&
      files.length + formData.imageUrls.split(";").length < 7
    ) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImageUrls(files[i]));
      }

      // I use Proimise because i have multiple asynchronous operations that can be executed concurrently, i wait all of them to complete before continuing.
      Promise.all(promises)
        .then((urls) => {
          const existingUrls = formData.imageUrls
            ? formData.imageUrls.split(";")
            : [];
          const allUrls = existingUrls.concat(urls);
          const concatenatedUrls = allUrls.join(";");

          setFormData({
            ...formData,
            imageUrls: concatenatedUrls,
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setImageUploadError(t("src.pages.listing.errorImageSize"));
          setUploading(false);
        });
    } else {
      setImageUploadError(t("src.pages.listing.errorImageOverload"));
      setUploading(false);
    }
  };

  const storeImageUrls = async (file) => {
    if (file.size > 2 * 1024 * 1024) {
      throw new Error("Error Occurred: File exceeds maximum size (2MB)");
    }
    return new Promise((resolve, reject) => {
      const storage = getStorage(firebaseApp);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls
        .split(";")
        .filter((item, indexUrls) => indexUrls != index),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!checkFormData()) return;
    try {
      if (formData.imageUrls.split(";").length < 1)
        return setError(t("src.pages.listing.errorImageAtLeast"));
      setLoading(true);
      setError(false);
      formData.bedrooms = +formData.bedrooms;
      formData.bathrooms = +formData.bathrooms;
      formData.sleepPlace = +formData.sleepPlace;
      const res = await fetch("/house", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.access_token}`,
        },
        body: JSON.stringify({
          ...formData,
          userId: currentUser.user.id,
        }),
      });
      setLoading(false);
      const acceptableStatusCodes = [200, 201, 202];
      if (!acceptableStatusCodes.includes(res.status)) {
        setError(t("src.pages.listing.errorImageGeneral"));
        return;
      }

      navigate(`/profile`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold my-7 flex items-center gap-2 justify-center">
        <LuCopyPlus />
        {t("src.pages.listing.title")}
      </h1>
      <span className=" text-red-400 hover:text-red-300 font-semibold my-7 flex items-center gap-2 justify-center animate-pulse">
        {t("src.pages.listing.attentionDisclaimer")}
      </span>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <FloatingLabelInput
            label={t("src.pages.listing.inputPlaceholderTitle")}
            onChange={handleChange}
            error={errors.title}
            id="title"
            value={formData.title}
          />

          <textarea
            type="text"
            placeholder={t("src.pages.listing.inputPlaceholderDescription")}
            // className="border p-3 rounded-lg"
            className="border p-3 rounded-lg bg-transparent dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none focus:ring-0  peer"
            id="description"
            onChange={handleChange}
            value={formData.description}
          />
          <FloatingLabelInput
            label={t("src.pages.listing.inputPlaceholderAddress")}
            onChange={handleChange}
            error={errors.address}
            value={formData.address}
            id="address"
            required
          />

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="availability"
              checked={isAvailable}
              onChange={() => setIsAvailable(!isAvailable)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span>{t("src.pages.listing.inputPlaceHolderAvailability")}</span>
          </label>
          {isAvailable && (
            <div className="space-y-4">
              <FloatingLabelInput
                label={t("src.pages.listing.inputFromAvailable")}
                onChange={handleChange}
                error={errors.availabilityDateStart}
                value={formData.availabilityDateStart}
                id="availabilityDateStart"
                required
                type="date"
              />
              <FloatingLabelInput
                label={t("src.pages.listing.inputToAvailable")}
                onChange={handleChange}
                error={errors.availabilityDateEnd}
                value={formData.availabilityDateEnd}
                id="availabilityDateEnd"
                required
                type="date"
              />
            </div>
          )}

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>{t("src.pages.listing.inputPlaceHolderParking")}</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>{t("src.pages.listing.inputPlaceHolderFurnished")}</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="wifi"
                className="w-5"
                onChange={handleChange}
                checked={formData.wifi}
              />
              <span>wifi</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="availability"
                className="w-5"
                onChange={handleChange}
                checked={formData.availability}
              />
              <span>{t("src.pages.listing.inputPlaceHolderAvailability")}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <FloatingLabelInput
                label={t("src.pages.listing.inputPlaceholderBedrooms")}
                onChange={handleChange}
                error={errors.bedrooms}
                value={formData.bedrooms}
                id="bedrooms"
                required
                type="number"
              />
            </div>
            <div className="flex items-center gap-2">
              <FloatingLabelInput
                label={t("src.pages.listing.inputPlaceholderBathrooms")}
                onChange={handleChange}
                error={errors.bathrooms}
                value={formData.bathrooms}
                id="bathrooms"
                required
                type="number"
              />
            </div>
            <div className="flex items-center gap-2">
              <FloatingLabelInput
                label={t("src.pages.listing.inputPlaceHolderSleepPlace")}
                onChange={handleChange}
                error={errors.sleepPlace}
                value={formData.sleepPlace}
                id="sleepPlace"
                required
                type="number"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            {t("src.pages.listing.imageLabel")}:
            <span className="font-normal text-gray-600 ml-2">
              {t("src.pages.listing.imageLabelAttention")}
            </span>
          </p>
          <div className="flex gap-4 items-center">
            <label
              htmlFor="images"
              className="cursor-pointer bg-slate-400 text-white px-4 py-2 rounded-lg  focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out hover:file:bg-gray-700 hover:file:scale-105 hover:file:shadow-md file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-gray-900 file:text-gray-50
              hover:bg-slate-300
              shadow-md hover:shadow-lg hover:scale-105
              flex items-center space-x-2
              "
            >
              <IoImages />
              <p>{t("src.pages.listing.imageLabelBtnChoose")}</p>
            </label>
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="hidden"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="h-[70%] pr-3 pl-3 pt-3 pb-3 text-blue-700 border border-blue-700 rounded-lg hover:shadow-lg disabled:opacity-80 flex gap-2 items-center bg-slate-100"
            >
              <RiUploadCloud2Fill className="text-2xl" />
              {uploading ? (
                <>
                  <p>{t("src.pages.listing.imageLabelLoading")}</p>
                </>
              ) : (
                <p>{t("src.pages.listing.imageLabelBtnUpload")}</p>
              )}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.split(";").map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center hover:bg-slate-100"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-40 h-40 sm:w-20 sm:h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg hover:opacity-75"
                >
                  {t("src.pages.listing.imageLabelBtnDel")}
                </button>
              </div>
            ))}
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex flex-col items-center justify-center space-y-4 mt-2">
              <label className="flex items-center space-x-2">
                <span className="text-gray-700">
                  Are animals present in the house?
                </span>
                <input
                  type="checkbox"
                  checked={isPresentAniamls}
                  onChange={() => setIsPresentAniamls(!isPresentAniamls)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </label>
              {isPresentAniamls && (
                <div className="space-y-3 w-full flex flex-col items-center">
                  <InputToolTip
                    id="animals"
                    formData={formData}
                    placeholder={t("src.pages.listing.inputPlaceholderAnimals")}
                    setFormData={setFormData}
                    toolTipMessage='Please provide information about the animals in the house. For example: "We have a cat named Whiskers."'
                    error={errors.animals}
                  />
                </div>
              )}
            </div>
          </div>

          <button
            disabled={loading || uploading}
            className="w-full text-center mt-4 justify-center text-gray-900 font-semibold py-3 px-6 bg-gray-400 bg-opacity-50 rounded-lg shadow-md hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center gap-3"
          >
            {loading ? (
              <Spinner />
            ) : (
              <div className="flex gap-2">
                <IoCheckmarkDoneCircle className="text-2xl" />

                {t("src.pages.listing.btnCreate")}
              </div>
            )}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}
