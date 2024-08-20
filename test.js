function revertirCadena(texto) {
  return texto.split("").reverse().join("");
}

console.log(revertirCadena("hola")); //debe retornar "aloh"
