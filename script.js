const textBox = document.querySelector("input");
const numFormatter = new Intl.NumberFormat("en-US");
let currentValue = "";
let output = "";
let negate = false;
let scientificNot = false;
function calculation(operation) {
  switch (operation) {
    case "+":
      output =
        Number(currentValue.slice(0, -1)) +
        (textBox.value.endsWith("-")
          ? -Number(textBox.value.replaceAll(",", "").slice(0, -1))
          : Number(textBox.value.replaceAll(",", "")));
      break;
    case "_":
      output =
        Number(currentValue.slice(0, -1)) -
        (textBox.value.endsWith("-")
          ? -Number(textBox.value.replaceAll(",", "").slice(0, -1))
          : Number(textBox.value.replaceAll(",", "")));

      break;
    case "x":
      output =
        Number(currentValue.slice(0, -1)) *
        (textBox.value.endsWith("-")
          ? -Number(textBox.value.replaceAll(",", "").slice(0, -1))
          : Number(textBox.value.replaceAll(",", "")));
      break;
    case "/":
      output =
        Number(currentValue.slice(0, -1)) /
        (textBox.value.endsWith("-")
          ? -Number(textBox.value.replaceAll(",", "").slice(0, -1))
          : Number(textBox.value.replaceAll(",", "")));
      break;
  }
  // if (output < 0) textBox.value = `${Math.abs(output)}-`;
  // else textBox.value = output;

  // currentValue = output;
  // textBox.value = "";
}
function decimalSeparator(number) {
  const string = String(number);
  let temp = [];
  let finalArray = [];
  let tempString = string.includes(".") ? string.slice(0, string.indexOf(".")) : string;
  if (tempString.length >= 4) {
    temp = [];
    finalArray = tempString
      .split("")
      .reverse()
      .reduce(function (acc, num, i, arr) {
        temp.push(num);
        if ((i + 1) % 3 === 0 || i == arr.length - 1) {
          acc.push(temp.reverse());
          temp = [];
        }
        return acc;
      }, []);
    tempString = finalArray.reverse().join(" ").replaceAll(",", "").replaceAll(" ", ",");
    return string.includes(".") ? tempString + string.slice(string.indexOf(".")) : tempString;
  } else {
    return number;
  }
}
function lengthChecker() {
  if (String(output).length > 12 && String(output).includes(".")) {
    textBox.value =
      output < 0
        ? `${numFormatter.format(
            Math.abs(
              output.toFixed(12 - String(output).slice(0, String(output).indexOf(".") + 1).length)
            )
          )}-`
        : numFormatter.format(
            output.toFixed(12 - String(output).slice(0, String(output).indexOf(".") + 1).length)
          );
    currentValue = output;
    return true;
  }
  if (String(output).length > 12 && !String(output).includes(".")) {
    textBox.value = "sorry too long";
    output = currentValue = "";
    return true;
  }
  return false;
}
document.body.addEventListener("focusin", (e) => {
  if (e.target.classList.contains("--nofocus")) {
    e.relatedTarget ? e.relatedTarget.focus() : e.target.blur();
  }
});
for (let i = 0; i <= 9; i++) {
  document.getElementById(`${i}`).addEventListener("click", function (e) {
    if (
      (currentValue.includes("+") ||
        currentValue.includes("_") ||
        currentValue.includes("x") ||
        currentValue.includes("/")) &&
      +currentValue.slice(0, -1) === output &&
      output ===
        (textBox.value.endsWith("-")
          ? -Number(textBox.value.replaceAll(",", "").slice(0, -1))
          : Number(textBox.value.replaceAll(",", "")))
    )
      textBox.value = "";
    if (textBox.value.replaceAll(",", "").length < 13) textBox.value += e.target.id;
  });
}
document.getElementById("CE").addEventListener("click", function () {
  textBox.value = "";
});
document.getElementById("AC").addEventListener("click", function () {
  currentValue = "";
  output = 0;
  textBox.value = "";
});
document.getElementById(".").addEventListener("click", function () {
  if (!textBox.value.includes(".")) textBox.value += ".";
});
document.getElementById("%").addEventListener("click", function () {
  textBox.value = numFormatter.format(
    Number(
      textBox.value.endsWith("-")
        ? String(0 - Number(textBox.value.replaceAll(",", "").slice(0, -1)))
        : textBox.value.replaceAll(",", "")
    ) / 100
  );
});
document.getElementById("+/-").addEventListener("click", function () {
  negate = !negate;
  textBox.value = textBox.value.endsWith("-") ? textBox.value.slice(0, -1) : `${textBox.value}-`;
});
document.getElementById("+").addEventListener("click", function () {
  if (String(currentValue).endsWith("+")) {
    calculation("+");
    if (lengthChecker()) return;
    if (output < 0) textBox.value = `${numFormatter.format(Math.abs(output))}-`;
    else textBox.value = numFormatter.format(output);
    currentValue = output;
    currentValue += "+";
  } else {
    if (
      !currentValue ||
      negate ||
      output ==
        (textBox.value.endsWith("-")
          ? String(0 - Number(textBox.value.replaceAll(",", "").slice(0, -1)))
          : textBox.value.replaceAll(",", ""))
    ) {
      currentValue = textBox.value.endsWith("-")
        ? String(0 - Number(textBox.value.replaceAll(",", "").slice(0, -1)))
        : textBox.value.replaceAll(",", "");
      textBox.value = "";
    } else {
      calculation(String(currentValue).slice(-1));
      currentValue = output;
      textBox.value = "";
    }
    currentValue += "+";
  }
});
document.getElementById("-").addEventListener("click", function () {
  if (String(currentValue).endsWith("_")) {
    calculation("_");
    if (lengthChecker()) return;
    if (output < 0) textBox.value = `${numFormatter.format(Math.abs(output))}-`;
    else textBox.value = numFormatter.format(output);
    currentValue = output;
    currentValue += "_";
  } else {
    if (
      !currentValue ||
      negate ||
      output ==
        (textBox.value.endsWith("-")
          ? String(0 - Number(textBox.value.replaceAll(",", "").slice(0, -1)))
          : textBox.value.replaceAll(",", ""))
    ) {
      currentValue = textBox.value.endsWith("-")
        ? String(0 - Number(textBox.value.replaceAll(",", "").slice(0, -1)))
        : textBox.value.replaceAll(",", "");
      textBox.value = "";
    } else {
      calculation(String(currentValue).slice(-1));
      currentValue = output;
      textBox.value = "";
    }
    currentValue += "_";
  }
});
document.getElementById("X").addEventListener("click", function () {
  if (String(currentValue).endsWith("x")) {
    calculation("x");
    if (lengthChecker()) return;
    if (output < 0) textBox.value = `${numFormatter.format(Math.abs(output))}-`;
    else textBox.value = numFormatter.format(output);
    currentValue = output;
    currentValue += "x";
  } else {
    if (
      !currentValue ||
      negate ||
      output ==
        (textBox.value.endsWith("-")
          ? String(0 - Number(textBox.value.replaceAll(",", "").slice(0, -1)))
          : textBox.value.replaceAll(",", ""))
    ) {
      currentValue = textBox.value.endsWith("-")
        ? String(0 - Number(textBox.value.replaceAll(",", "").slice(0, -1)))
        : textBox.value.replaceAll(",", "");
      textBox.value = "";
    } else {
      calculation(String(currentValue).slice(-1));
      currentValue = output;
      textBox.value = "";
    }
    currentValue += "x";
  }
});
document.getElementById("/").addEventListener("click", function () {
  if (String(currentValue).endsWith("/")) {
    calculation("/");
    if (lengthChecker()) return;
    if (output < 0) textBox.value = `${numFormatter.format(Math.abs(output))}-`;
    else textBox.value = numFormatter.format(output);
    currentValue = output;
    currentValue += "/";
  } else {
    if (
      !currentValue ||
      negate ||
      output ==
        (textBox.value.endsWith("-")
          ? String(0 - Number(textBox.value.replaceAll(",", "").slice(0, -1)))
          : textBox.value.replaceAll(",", ""))
    ) {
      currentValue = textBox.value.endsWith("-")
        ? String(0 - Number(textBox.value.replaceAll(",", "").slice(0, -1)))
        : textBox.value.replaceAll(",", "");
      textBox.value = "";
    } else {
      calculation(String(currentValue).slice(-1));
      currentValue = output;
      textBox.value = "";
    }
    currentValue += "/";
  }
});
document.getElementById("=").addEventListener("click", function () {
  calculation(String(currentValue).slice(-1));
  if (lengthChecker()) return;
  if (output < 0) textBox.value = `${numFormatter.format(Math.abs(output))}-`;
  else textBox.value = numFormatter.format(output);

  currentValue = output;
});
