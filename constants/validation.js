const isSolidNumber = value => /[\d]+/.test(value);

const emailErrors = emailFieldName => {
  return function() {
    const errors = [];

    if (!this.$v[emailFieldName].$dirty) return errors;

    !this.$v[emailFieldName].email &&
      errors.push("Введите E-mail правильного формата");
    !this.$v[emailFieldName].required &&
      errors.push("E-mail требуется для восстановления пароля");

    return errors;
  };
};

export { isSolidNumber, emailErrors };
