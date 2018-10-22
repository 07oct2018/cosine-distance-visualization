export default function (text) {
  try {
    let data = JSON.parse(text);
    return (
        Array.isArray(data) && 
        data.every(
          a => Array.isArray(a) && 
          a.length == 3 &&
          a.every(b => typeof b === "number")
        )
      )
  } catch (e) {
    if (e.name == "SyntaxError")
      return false;
    else
      throw e;
  } 
}
