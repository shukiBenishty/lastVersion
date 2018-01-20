// const valByString = function(o, s) {
//     s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
//     s = s.replace(/^\./, '');           // strip a leading dot
//     var a = s.split('.');
//     for (var i = 0, n = a.length; i < n; ++i) {
//         var k = a[i];
//         if (k in o) {
//             o = o[k];
//         } else {
//             return;
//         }
//     }
//     return o;
// }

export default function(values) {
  const errors = {};
  const requiredFields = [
     "addressCity",
     "addressStreet",
     "firstName",
     "id": "",
     "lastName",
     "phone",
     "telephone"
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'שדה חובה';
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'כתובת מייל לא חוקית';
  }
  return errors;
}
