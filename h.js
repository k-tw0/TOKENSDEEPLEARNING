// Función para normalizar el texto de entrada
function normalizeText(text) {
    const punctuationRegex = /[,.!?;:]/g;
    
    // Dividir el texto en tokens (palabras)
    const tokens = text.split(' ');
    
    // Eliminar caracteres de puntuación de cada token
    const normalizedTokens = tokens.map(token => token.replace(punctuationRegex, ''));
    
    // Lematizar cada token convirtiéndolo a minúsculas
    const lemmatizedTokens = normalizedTokens.map(token => lemmatize(token));
    
    // Unir los tokens lematizados en un solo texto
    return lemmatizedTokens.join(' ');
  }
  
  // Función para lematizar un token
  function lemmatize(token) {
    function lemmatizer(token) {
      // Lematizador simple: convierte el token a minúsculas
      return token.toLowerCase();
    }
    
    // Obtener el lema del token
    const lemma = lemmatizer(token);
    
    // Retornar el lema del token
    return lemma;
  }
  
  const wordIndex = {}; // Diccionario para mapear palabras a índices numéricos
  let index = 0;
  
  // Función para preprocesar el texto y convertirlo en una secuencia de índices numéricos
  function preprocessText(text) {
    const normalizedText = normalizeText(text);
    
    // Dividir el texto normalizado en tokens (palabras)
    const tokenizedText = normalizedText.split(' ');
  
    // Convertir palabras en índices numéricos
    const indexedText = tokenizedText.map(word => {
      if (!wordIndex.hasOwnProperty(word)) {
        wordIndex[word] = index;
        index++;
      }
      return wordIndex[word];
    });
  
    return indexedText;
  }
  
  // Resto del código del modelo TensorFlow.js
  const sentence = "Me encanta correr, pero no puedo correr hoy.";
  const preprocessedSentence = preprocessText(sentence);
  console.log(preprocessedSentence);
  
  const maxLength = 8; // Longitud máxima esperada por el modelo
  
  // Ajustar la longitud del texto preprocesado al máximo permitido
  const paddedSentence = preprocessedSentence.slice(0, maxLength);
  
  // Rellenar con ceros si es necesario para alcanzar la longitud máxima
  const paddedZeros = Array(maxLength - paddedSentence.length).fill(0);
  
  // Crear el arreglo de entrada final
  const inputArray = paddedSentence.concat(paddedZeros);
  
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [maxLength] }));
  model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });
  
  const xs = tf.tensor2d([inputArray], [1, maxLength]); // Asegurar que tenga forma [1, maxLength]
  const ys = tf.tensor2d([[1]]);
  
  model.fit(xs, ys).then(() => {
    const inputSentence = "Quiero correr mañana";
    const preprocessedInput = preprocessText(inputSentence);
  
    // Ajustar la longitud del texto preprocesado de entrada al máximo permitido
    const paddedInput = preprocessedInput.slice(0, maxLength);
  
    // Rellenar con ceros si es necesario para alcanzar la longitud máxima
    const paddedZeros = Array(maxLength - paddedInput.length).fill(0);
  
    // Crear el arreglo de entrada final para la predicción
    const inputArray = paddedInput.concat(paddedZeros);
    
    const inputTensor = tf.tensor2d([inputArray], [1, maxLength]);
    const prediction = model.predict(inputTensor);
    prediction.print();
  });
  /*
  El número que ves, como por ejemplo [[6.0515614],], corresponde a la predicción generada por el modelo TensorFlow.js.

En este caso, el modelo está configurado con una capa de salida que tiene un solo neurón (units: 1). 
Cuando realizas la predicción utilizando el método model.predict(), obtienes un tensor que contiene los valores predichos por el modelo.

El tensor resultante tiene una forma de [1, 1], lo que significa que es una matriz de una fila y una columna. 
El valor numérico predicho se encuentra en la posición (0, 0) de esta matriz. En el ejemplo que mencionaste, el número 6.0515614 es el valor predicho por el modelo.

Cabe destacar que este número puede cambiar en cada ejecución del código debido
 a que el modelo está sujeto a variaciones aleatorias durante el proceso de entrenamiento y optimización. Además, 
 los resultados pueden variar dependiendo de los datos de entrada y la configuración del modelo.

Si deseas obtener el valor numérico predicho sin la estructura del tensor, puedes acceder a él utilizando el método 
arraySync() para convertir el tensor en un arreglo de JavaScript. Por ejemplo, puedes hacer prediction.arraySync()[0][0]
 para obtener directamente el valor predicho sin la estructura del tensor.*/