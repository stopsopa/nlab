/**
 * @doc https://github.com/stopsopa/nlab#lorem
 *
 * Seeded pseudo-random lorem ipsum text generator for testing purposes.
 *
 * const lorem = require('nlab/lorem');
 *
 * const gen = lorem(12345);
 * console.log(gen.word());      // random latin word
 * console.log(gen.sentence());  // capitalized sentence with period
 * console.log(gen.paragraph()); // multiple sentences
 */
const lorem = (function () {
  const th = (msg) => new Error("lorem error: " + msg);

  // Latin words commonly used in lorem ipsum text
  const LATIN_WORDS = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
    "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
    "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
    "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
    "deserunt", "mollit", "anim", "id", "est", "laborum"
  ];

  /**
   * Simple xorshift32 PRNG implementation
   * Fast, deterministic, good enough for testing
   */
  function createPRNG(seed) {
    // Convert string seed to number if needed
    if (typeof seed === "string") {
      let hash = 0;
      for (let i = 0; i < seed.length; i++) {
        hash = ((hash << 5) - hash) + seed.charCodeAt(i);
        hash = hash & hash; // Convert to 32-bit integer
      }
      seed = Math.abs(hash) || 1;
    }

    if (typeof seed !== "number") {
      seed = Math.floor(Math.random() * 0xFFFFFFFF);
    }

    if (seed === 0) {
      seed = 1; // xorshift32 requires non-zero seed
    }

    let state = seed >>> 0; // Ensure unsigned 32-bit

    return function next() {
      state ^= state << 13;
      state ^= state >>> 17;
      state ^= state << 5;
      state = state >>> 0; // Keep as unsigned 32-bit
      return state / 0xFFFFFFFF; // Return float between 0 and 1
    };
  }

  /**
   * Get random integer between min (inclusive) and max (inclusive)
   */
  function randomInt(random, min, max) {
    return Math.floor(random() * (max - min + 1)) + min;
  }

  /**
   * Get random element from array
   */
  function randomChoice(random, arr) {
    return arr[Math.floor(random() * arr.length)];
  }

  /**
   * Capitalize first letter of string
   */
  function capitalize(str) {
    if (!str || typeof str !== "string") {
      return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const LoremGenerator = function (seed) {
    const random = createPRNG(seed);

    /**
     * Generate a single word
     * @param {number} minLen - minimum word length (default: 3)
     * @param {number} maxLen - maximum word length (default: 10)
     * @returns {string}
     */
    this.word = function (minLen, maxLen) {
      if (typeof minLen === "undefined") minLen = 3;
      if (typeof maxLen === "undefined") maxLen = 10;

      if (!Number.isInteger(minLen) || minLen < 1) {
        throw th("minLen must be a positive integer");
      }
      if (!Number.isInteger(maxLen) || maxLen < minLen) {
        throw th("maxLen must be an integer >= minLen");
      }

      // Filter words by length and pick random one
      const suitable = LATIN_WORDS.filter(w => w.length >= minLen && w.length <= maxLen);

      if (suitable.length === 0) {
        // Fallback: generate random word if no suitable latin words
        const len = randomInt(random, minLen, maxLen);
        const consonants = "bcdfghjklmnpqrstvwxyz";
        const vowels = "aeiou";
        let word = "";
        for (let i = 0; i < len; i++) {
          if (i % 2 === 0) {
            word += consonants[Math.floor(random() * consonants.length)];
          } else {
            word += vowels[Math.floor(random() * vowels.length)];
          }
        }
        return word;
      }

      return randomChoice(random, suitable);
    };

    /**
     * Generate multiple words
     * @param {number} count - number of words to generate
     * @param {number} minLen - minimum word length (default: 3)
     * @param {number} maxLen - maximum word length (default: 10)
     * @returns {string[]}
     */
    this.words = function (count, minLen, maxLen) {
      if (!Number.isInteger(count) || count < 1) {
        throw th("count must be a positive integer");
      }

      const result = [];
      for (let i = 0; i < count; i++) {
        result.push(this.word(minLen, maxLen));
      }
      return result;
    };

    /**
     * Generate a single sentence
     * @param {number} minWords - minimum number of words (default: 5)
     * @param {number} maxWords - maximum number of words (default: 15)
     * @returns {string}
     */
    this.sentence = function (minWords, maxWords) {
      if (typeof minWords === "undefined") minWords = 5;
      if (typeof maxWords === "undefined") maxWords = 15;

      if (!Number.isInteger(minWords) || minWords < 1) {
        throw th("minWords must be a positive integer");
      }
      if (!Number.isInteger(maxWords) || maxWords < minWords) {
        throw th("maxWords must be an integer >= minWords");
      }

      const wordCount = randomInt(random, minWords, maxWords);
      const words = this.words(wordCount);
      const sentence = capitalize(words.join(" ")) + ".";
      return sentence;
    };

    /**
     * Generate multiple sentences
     * @param {number} count - number of sentences to generate
     * @param {number} minWords - minimum number of words per sentence (default: 5)
     * @param {number} maxWords - maximum number of words per sentence (default: 15)
     * @returns {string[]}
     */
    this.sentences = function (count, minWords, maxWords) {
      if (!Number.isInteger(count) || count < 1) {
        throw th("count must be a positive integer");
      }

      const result = [];
      for (let i = 0; i < count; i++) {
        result.push(this.sentence(minWords, maxWords));
      }
      return result;
    };

    /**
     * Generate a paragraph (multiple sentences joined with spaces)
     * @param {number} minSentences - minimum number of sentences (default: 3)
     * @param {number} maxSentences - maximum number of sentences (default: 7)
     * @returns {string}
     */
    this.paragraph = function (minSentences, maxSentences) {
      if (typeof minSentences === "undefined") minSentences = 3;
      if (typeof maxSentences === "undefined") maxSentences = 7;

      if (!Number.isInteger(minSentences) || minSentences < 1) {
        throw th("minSentences must be a positive integer");
      }
      if (!Number.isInteger(maxSentences) || maxSentences < minSentences) {
        throw th("maxSentences must be an integer >= minSentences");
      }

      const sentenceCount = randomInt(random, minSentences, maxSentences);
      const sentences = this.sentences(sentenceCount);
      return sentences.join(" ");
    };

    /**
     * Generate multiple paragraphs (joined with double newlines)
     * @param {number} count - number of paragraphs to generate
     * @param {number} minSentences - minimum number of sentences per paragraph (default: 3)
     * @param {number} maxSentences - maximum number of sentences per paragraph (default: 7)
     * @returns {string}
     */
    this.paragraphs = function (count, minSentences, maxSentences) {
      if (!Number.isInteger(count) || count < 1) {
        throw th("count must be a positive integer");
      }

      const result = [];
      for (let i = 0; i < count; i++) {
        result.push(this.paragraph(minSentences, maxSentences));
      }
      return result.join("\n\n");
    };
  };

  return function (seed) {
    return new LoremGenerator(seed);
  };
})();

module.exports = lorem;
