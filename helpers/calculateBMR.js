const calculateBMR = (currentWeight, height, birthday, sex, levelActivity) => {
    const activityLevelFactor = { 1: 1.2, 2: 1.375, 3: 1.55, 4: 1.725, 5: 1.9 };
    const sexValue = { male: { factor: 5 }, female: { factor: -161 } };

    const birthdayDate = new Date(birthday);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthdayDate.getFullYear();

    let bmr;

    if (sex === "male") {
      bmr = Math.round(
        (10 * currentWeight + 6.25 * height - 5 * age + sexValue.male.factor) *
          activityLevelFactor[levelActivity]
      );
    } else if (sex === "female") {
      bmr = Math.round(
        (10 * currentWeight + 6.25 * height - 5 * age + sexValue.female.factor) *
          activityLevelFactor[levelActivity]
      );
    } else {
      throw new Error('Select your sex');
    }
  
    return bmr;
  };

  export {calculateBMR}
