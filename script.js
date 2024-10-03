function updateYear() {
  const footer = document.querySelector("footer span");
  footer.append(" - " + new Date().getFullYear());
}

updateYear();
