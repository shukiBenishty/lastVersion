
export default ( function showResults(values, dispatch) {
  dispatch({
              type: 'ADD_EMPLOYEE',
              data: values
          });
});
