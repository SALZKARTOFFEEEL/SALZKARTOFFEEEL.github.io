const colors =
{
  default: "ffe270",
  success: "70ff70",
  failure: "ff7070",
  generic: "70a9ff",
  dark:    "1c1c26",
  bright:  "ffffff"
};

const head = document.getElementsByTagName("head")[0];

const meta = document.createElement("meta");
meta.name = "theme-color";
meta.content = "#" + colors.default;

head.appendChild(meta);