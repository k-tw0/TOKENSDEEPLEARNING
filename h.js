function segmentarOraciones(texto) {
    // Define una expresión regular para encontrar los posibles puntos finales de las oraciones.
    var regex = /[.!?]+/g;
  
    // Divide el texto en oraciones utilizando la expresión regular.
    var oraciones = texto.split(regex);
  
    // Elimina espacios en blanco adicionales al comienzo o final de cada oración.
    oraciones = oraciones.map(function(oracion) {
      return oracion.trim();
    });
  
    // Elimina cualquier oración vacía generada por la división.
    oraciones = oraciones.filter(function(oracion) {
      return oracion !== "";
    });
  
    // Retorna el arreglo de oraciones segmentadas.
    return oraciones;
  }
  
  // Ejemplo de uso:
  var textoEjemplo = "Hola. ¿Cómo estás? Me alegra verte!";
  var oracionesSegmentadas = segmentarOraciones(textoEjemplo);
  console.log(oracionesSegmentadas);
  
  function tokenizarOracion(oracion) {
    // Utiliza la función split() para dividir la oración en palabras individuales.
    var palabras = oracion.split(" ");
  
    // Elimina cualquier espacio en blanco adicional al comienzo o final de cada palabra.
    palabras = palabras.map(function(palabra) {
      return palabra.trim();
    });
  
    // Elimina cualquier palabra vacía generada por la división.
    palabras = palabras.filter(function(palabra) {
      return palabra !== "";
    });
  
    // Retorna el arreglo de palabras tokenizadas.
    return palabras;
  }
  
  // Ejemplo de uso:
  var oracionEjemplo = "El tokenizador puede dividir una oración en palabras individuales.";
  var palabrasTokenizadas = tokenizarOracion(oracionEjemplo);
  console.log(palabrasTokenizadas);
  
  
  
  
  function eliminarPuntuacion(texto) {
    // Expresión regular para eliminar la puntuación y los caracteres especiales
    var regex = /[^\w\s]|_/g;
  
    // Reemplazar los caracteres coincidentes con la expresión regular por una cadena vacía
    var textoSinPuntuacion = texto.replace(regex, "");
  
    return textoSinPuntuacion;
  }
  
  // Ejemplo de uso
  var textoOriginal = "¡Hola, mundo! Esto es un ejemplo de texto con puntuación y caracteres especiales.";
  var textoSinPuntuacion = eliminarPuntuacion(textoOriginal);
  
  console.log(textoSinPuntuacion);
  
  
  
  
  function normalizeText(text) {
    // Define the punctuation characters to be removed.
    const punctuationRegex = /[,.!?;:]/g;
  
    // Split the text into tokens.
    const tokens = text.split(' ');
  
    // Remove punctuation from each token.
    const normalizedTokens = tokens.map(token => token.replace(punctuationRegex, ''));
  
    // Lemmatize each token.
    const lemmatizedTokens = normalizedTokens.map(token => lemmatize(token));
  
    // Return the normalized text.
    return lemmatizedTokens.join(' ');
  }
  
  function lemmatize(token) {
    // Define the lemmatizer function.
    // Replace this with an actual lemmatizer implementation for Spanish.
    function lemmatizer(token) {
      // Placeholder implementation. Replace this with your lemmatizer logic for Spanish.
      return token.toLowerCase();
    }
  
    // Get the lemmatized form of the token.
    const lemma = lemmatizer(token);
  
    // Return the lemmatized form of the token.
    return lemma;
  }
  
  // Example usage
  const sentence = "Me encanta correr, pero no puedo correr hoy.";
  const normalizedSentence = normalizeText(sentence);
  console.log(normalizedSentence);
  
  
  // Función principal para lematizar un texto
  function lemmatizeText(inputText) {
    // Dividir el texto en palabras
    var words = inputText.split(' ');
  
    // Lematizar cada palabra
    var lemmas = words.map(lemmatizeWord);
  
    // Mostrar los resultados
    console.log(lemmas.join(' '));
  }
  
  // Función para lematizar una palabra individual
  function lemmatizeWord(word) {
    // Aquí puedes definir tus propias reglas de lematización
    // Por ejemplo, convirtiendo plurales a singulares, etc.
    // Este ejemplo solo cubre algunas reglas básicas
  
    if (word.endsWith('s')) {
      // Eliminar la 's' al final para convertir plurales a singulares
      return word.slice(0, -1);
    }
  
    // Devolver la palabra original si no se aplica ninguna regla
    return word;
  }
  
  // Ejemplo de uso
  var inputText = "Los gatos negros saltan sobre los techos";
  lemmatizeText(inputText);
  
  
  
  // Notice there is no 'import' statement. 'tf' is available on the index-page
        // because of the script tag above.
  
        // Define a model for linear regression.
        const model = tf.sequential();
        model.add(tf.layers.dense({units: 1, inputShape: [1]}));
  
        // Prepare the model for training: Specify the loss and the optimizer.
        model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
  
        // Generate some synthetic data for training.
        const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
        const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);
  
        // Train the model using the data.
        model.fit(xs, ys).then(() => {
          // Use the model to do inference on a data point the model hasn't seen before:
          // Open the browser devtools to see the output
          model.predict(tf.tensor2d([5], [1, 1])).print();
        });