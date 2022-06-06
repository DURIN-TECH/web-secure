if (
  window.find("seed phrase") ||
  window.find("private key") ||
  window.find("pass phrase")
) {
  // retrieves all input tags on the site and disables them
  const inputs = Array.from(document.getElementsByTagName("input"));
  inputs.forEach((input) => {
    input.disabled = true;
    input.style.borderColor = "red";
    input.placeholder = "disabled"
  });
  alert(`Due to occurence of keywords such as [seed phrase, private key, pass phrase]. All input fields have been disabled for security reasons`);
}
