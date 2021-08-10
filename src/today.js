export default function today() {
  let t = new Date();
  let dd = String(t.getDate()).padStart(2, "0");
  let mm = String(t.getMonth() + 1).padStart(2, "0");
  let yyyy = t.getFullYear();
  t = mm + "/" + dd + "/" + yyyy;

  return t;
}
