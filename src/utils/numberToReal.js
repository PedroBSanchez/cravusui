const numberToReal = (number) => {
  let numero = number.toFixed(2).split(".");
  numero[0] = "R$" + numero[0].split(/(?=(?:...)*$)/).join(".");
  return numero.join(",");
};

export { numberToReal };
