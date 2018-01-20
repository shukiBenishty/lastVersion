
export default ( function asyncValidate(values /*, dispatch */) {

  if (['foo@foo.com', 'bar@bar.com'].includes(values.email)) {
    throw { email: 'Email already Exists' };
  }
});
