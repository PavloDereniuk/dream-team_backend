const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const dateRegex = /^(\d{2})-(\d{2})-(\d{4})$/;

const bloodGroups = {
  1: "groupBloodNotAllowed.1",
  2: "groupBloodNotAllowed.2",
  3: "groupBloodNotAllowed.3",
  4: "groupBloodNotAllowed.4",
};

const activityLevelFactor = { 1: 1.2, 2: 1.375, 3: 1.55, 4: 1.725, 5: 1.9 };

const sexValue = { male: { factor: 5 }, female: { factor: -161 } };

export {emailRegex, dateRegex, bloodGroups, activityLevelFactor,  sexValue}