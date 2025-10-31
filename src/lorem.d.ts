interface LoremGenerator {
  /**
   * Generate a single word
   * @param minLen - minimum word length (default: 3)
   * @param maxLen - maximum word length (default: 10)
   * @returns random word
   */
  word(minLen?: number, maxLen?: number): string;

  /**
   * Generate multiple words
   * @param count - number of words to generate
   * @param minLen - minimum word length (default: 3)
   * @param maxLen - maximum word length (default: 10)
   * @returns array of random words
   */
  words(count: number, minLen?: number, maxLen?: number): string[];

  /**
   * Generate a single sentence
   * @param minWords - minimum number of words (default: 5)
   * @param maxWords - maximum number of words (default: 15)
   * @returns capitalized sentence with period
   */
  sentence(minWords?: number, maxWords?: number): string;

  /**
   * Generate multiple sentences
   * @param count - number of sentences to generate
   * @param minWords - minimum number of words per sentence (default: 5)
   * @param maxWords - maximum number of words per sentence (default: 15)
   * @returns array of sentences
   */
  sentences(count: number, minWords?: number, maxWords?: number): string[];

  /**
   * Generate a paragraph (multiple sentences joined with spaces)
   * @param minSentences - minimum number of sentences (default: 3)
   * @param maxSentences - maximum number of sentences (default: 7)
   * @returns paragraph text
   */
  paragraph(minSentences?: number, maxSentences?: number): string;

  /**
   * Generate multiple paragraphs (joined with double newlines)
   * @param count - number of paragraphs to generate
   * @param minSentences - minimum number of sentences per paragraph (default: 3)
   * @param maxSentences - maximum number of sentences per paragraph (default: 7)
   * @returns multi-paragraph text
   */
  paragraphs(count: number, minSentences?: number, maxSentences?: number): string;
}

/**
 * Create a seeded lorem ipsum text generator
 * @param seed - numeric or string seed for deterministic output (optional)
 * @returns lorem generator instance
 */
declare function lorem(seed?: number | string): LoremGenerator;

export = lorem;
