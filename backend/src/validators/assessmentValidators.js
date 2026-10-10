export const validateAssessmentSubmitInput = (data) => {
  const errors = {};
  if (!data || !Array.isArray(data.answers) || data.answers.length === 0) {
    errors.answers = 'Answers must be a non-empty array';
  } else {
    data.answers.forEach((ans, idx) => {
      if (!ans.questionId) errors[`answers[${idx}].questionId`] = 'Question ID is required';
      if (ans.selectedOptionIndex === undefined || ans.selectedOptionIndex === null || ans.selectedOptionIndex < 0) {
        errors[`answers[${idx}].selectedOptionIndex`] = 'Valid option index is required';
      }
    });
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateQuestionInput = (data) => {
  const errors = {};
  if (!data || !data.questionText || !data.questionText.trim()) {
    errors.questionText = 'Question text is required';
  }
  if (!data || !Array.isArray(data.options) || data.options.length < 2) {
    errors.options = 'At least 2 options are required';
  }
  if (!data || data.correctOptionIndex === undefined || data.correctOptionIndex === null || data.correctOptionIndex < 0) {
    errors.correctOptionIndex = 'Valid correct option index is required';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
