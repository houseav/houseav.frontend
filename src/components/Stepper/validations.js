export const validateStep1 = (
  formData,
  setValidation,
  setFormData,
  selectedOption,
  newErrors,
  isValid
) => {
  if (!formData.userInfo?.username) {
    newErrors.username = "Username is required";
    isValid = false;
  }

  if (!formData.userInfo?.email) {
    newErrors.email = "Email is required";
    isValid = false;
  } else if (!validateEmail(formData.userInfo?.email)) {
    newErrors.email = "Invalid email address";
    isValid = false;
  }

  if (!formData.userInfo?.password) {
    newErrors.password = "Password is required";
    isValid = false;
  }

  if (formData.userInfo?.password !== formData.userInfo?.confirmPassword) {
    newErrors.passwordConfirm = "Passwords do not match";
    isValid = false;
  }

  if (!formData.userInfo?.number) {
    newErrors.number = "Phone number is required";
    isValid = false;
  } else if (formData.userInfo?.number.length < 7) {
    newErrors.number = "Phone number is less than 7 digits";
    isValid = false;
  } else if (formData.userInfo?.number.length > 15) {
    newErrors.number = "Phone number is more than 15 digits";
  }
  
  

  

  if (!selectedOption) {
    setValidation("Please select a church");
    newErrors.selectedOption = "Please select a church";
    isValid = false;
  } else {
    setFormData((prevState) => ({
      ...prevState,
      userInfo: {
        ...prevState.userInfo,
        churchId: selectedOption,
      },
    }));
  }

  if (!formData.userInfo?.prefix) {
    setFormData((prevState) => ({
      ...prevState,
      userInfo: {
        ...prevState.userInfo,
        prefix: "+39",
      },
    }));
  }

  return isValid;
};

//TODO check RFC for right regex
const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailPattern.test(email)) return true;
  return false;
};

export const validateStep2 = (formData, setValidation, newErrors, isValid) => {
  if (!formData.referenceLetter?.namePastorLeader) {
    newErrors.namePastorLeader = "Name Pastor/Leader is required";
    isValid = false;
  }

  if (!formData.referenceLetter?.surnamePastorLeader) {
    newErrors.surnamePastorLeader = "Surname Pastor/Leader is require";
    isValid = false;
  }

  if (!formData.referenceLetter?.numberPastorLeader) {
    newErrors.numberPastorLeader = "Number Pastor/Leader is required";
    isValid = false;
  }

  if (!formData.referenceLetter?.timeInChurch) {
    newErrors.timeInChurch =
      "Is required how long have you been attending your church";
    isValid = false;
  }

  if (!formData.referenceLetter?.numberChurch) {
    newErrors.numberChurch = "Number church is required";
  }

  setValidation("Please fill in all fields");
  return isValid;
};
