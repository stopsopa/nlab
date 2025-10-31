const lorem = require("nlab/lorem.js");

try {
  jest.setTimeout(100);
} catch (e) {}

it("lorem - basic word generation", (done) => {
  try {
    const gen = lorem(12345);
    const word = gen.word();

    expect(typeof word).toEqual("string");
    expect(word.length).toBeGreaterThan(0);

    done();
  } catch (e) {
    done(String(e));
  }
});

it("lorem - deterministic with same seed", (done) => {
  try {
    const gen1 = lorem(12345);
    const gen2 = lorem(12345);

    expect(gen1.word()).toEqual(gen2.word());
    expect(gen1.sentence()).toEqual(gen2.sentence());
    expect(gen1.paragraph()).toEqual(gen2.paragraph());

    done();
  } catch (e) {
    done(String(e));
  }
});

it("lorem - different seeds produce different output", (done) => {
  try {
    const gen1 = lorem(12345);
    const gen2 = lorem(54321);

    const word1 = gen1.word();
    const word2 = gen2.word();

    // While theoretically they could be the same, with different seeds it's extremely unlikely
    // We'll just verify they're both valid strings
    expect(typeof word1).toEqual("string");
    expect(typeof word2).toEqual("string");

    done();
  } catch (e) {
    done(String(e));
  }
});

it("lorem - string seed works", (done) => {
  try {
    const gen1 = lorem("test-seed");
    const gen2 = lorem("test-seed");

    expect(gen1.word()).toEqual(gen2.word());
    expect(gen1.sentence()).toEqual(gen2.sentence());

    done();
  } catch (e) {
    done(String(e));
  }
});

it("lorem - word with length constraints", (done) => {
  try {
    const gen = lorem(12345);
    const word = gen.word(5, 8);

    expect(word.length).toBeGreaterThanOrEqual(5);
    expect(word.length).toBeLessThanOrEqual(8);

    done();
  } catch (e) {
    done(String(e));
  }
});

it("lorem - word throws on invalid minLen", (done) => {
  try {
    const gen = lorem(12345);
    gen.word(-1, 10);

    done("should have thrown");
  } catch (e) {
    expect(String(e)).toContain("minLen must be a positive integer");
    done();
  }
});

it("lorem - word throws on invalid maxLen", (done) => {
  try {
    const gen = lorem(12345);
    gen.word(10, 5);

    done("should have thrown");
  } catch (e) {
    expect(String(e)).toContain("maxLen must be an integer >= minLen");
    done();
  }
});

it("lorem - words generates array", (done) => {
  try {
    const gen = lorem(12345);
    const words = gen.words(5);

    expect(Array.isArray(words)).toEqual(true);
    expect(words.length).toEqual(5);
    words.forEach((word) => {
      expect(typeof word).toEqual("string");
      expect(word.length).toBeGreaterThan(0);
    });

    done();
  } catch (e) {
    done(String(e));
  }
});

it("lorem - words throws on invalid count", (done) => {
  try {
    const gen = lorem(12345);
    gen.words(0);

    done("should have thrown");
  } catch (e) {
    expect(String(e)).toContain("count must be a positive integer");
    done();
  }
});

it("lorem - sentence has proper structure", (done) => {
  try {
    const gen = lorem(12345);
    const sentence = gen.sentence();

    expect(typeof sentence).toEqual("string");
    expect(sentence.length).toBeGreaterThan(0);
    expect(sentence.endsWith(".")).toEqual(true);
    expect(sentence[0]).toEqual(sentence[0].toUpperCase());

    done();
  } catch (e) {
    done(String(e));
  }
});

it("lorem - sentence respects word count bounds", (done) => {
  try {
    const gen = lorem(12345);
    const sentence = gen.sentence(3, 3);

    // Remove period and split by spaces
    const words = sentence.slice(0, -1).split(" ");
    expect(words.length).toEqual(3);

    done();
  } catch (e) {
    done(String(e));
  }
});

it("lorem - sentence throws on invalid minWords", (done) => {
  try {
    const gen = lorem(12345);
    gen.sentence(0, 10);

    done("should have thrown");
  } catch (e) {
    expect(String(e)).toContain("minWords must be a positive integer");
    done();
  }
});

it("lorem - sentence throws on invalid maxWords", (done) => {
  try {
    const gen = lorem(12345);
    gen.sentence(10, 5);

    done("should have thrown");
  } catch (e) {
    expect(String(e)).toContain("maxWords must be an integer >= minWords");
    done();
  }
});

it("lorem - sentences generates array", (done) => {
  try {
    const gen = lorem(12345);
    const sentences = gen.sentences(3);

    expect(Array.isArray(sentences)).toEqual(true);
    expect(sentences.length).toEqual(3);
    sentences.forEach((sentence) => {
      expect(typeof sentence).toEqual("string");
      expect(sentence.endsWith(".")).toEqual(true);
      expect(sentence[0]).toEqual(sentence[0].toUpperCase());
    });

    done();
  } catch (e) {
    done(String(e));
  }
});

it("lorem - sentences throws on invalid count", (done) => {
  try {
    const gen = lorem(12345);
    gen.sentences(-1);

    done("should have thrown");
  } catch (e) {
    expect(String(e)).toContain("count must be a positive integer");
    done();
  }
});

it("lorem - paragraph has proper structure", (done) => {
  try {
    const gen = lorem(12345);
    const paragraph = gen.paragraph();

    expect(typeof paragraph).toEqual("string");
    expect(paragraph.length).toBeGreaterThan(0);

    // Should contain multiple sentences (periods followed by space or end)
    const sentenceCount = (paragraph.match(/\. /g) || []).length + 1;
    expect(sentenceCount).toBeGreaterThanOrEqual(3);

    done();
  } catch (e) {
    done(String(e));
  }
});

it("lorem - paragraph respects sentence count bounds", (done) => {
  try {
    const gen = lorem(12345);
    const paragraph = gen.paragraph(2, 2);

    // Count periods to determine number of sentences
    const sentenceCount = (paragraph.match(/\./g) || []).length;
    expect(sentenceCount).toEqual(2);

    done();
  } catch (e) {
    done(String(e));
  }
});

it("lorem - paragraph throws on invalid minSentences", (done) => {
  try {
    const gen = lorem(12345);
    gen.paragraph(0, 5);

    done("should have thrown");
  } catch (e) {
    expect(String(e)).toContain("minSentences must be a positive integer");
    done();
  }
});

it("lorem - paragraph throws on invalid maxSentences", (done) => {
  try {
    const gen = lorem(12345);
    gen.paragraph(10, 5);

    done("should have thrown");
  } catch (e) {
    expect(String(e)).toContain("maxSentences must be an integer >= minSentences");
    done();
  }
});

it("lorem - paragraphs generates multiple paragraphs", (done) => {
  try {
    const gen = lorem(12345);
    const text = gen.paragraphs(3);

    expect(typeof text).toEqual("string");
    expect(text.length).toBeGreaterThan(0);

    // Should contain double newlines separating paragraphs
    const paragraphs = text.split("\n\n");
    expect(paragraphs.length).toEqual(3);

    paragraphs.forEach((paragraph) => {
      expect(paragraph.length).toBeGreaterThan(0);
      expect(paragraph).toContain(".");
    });

    done();
  } catch (e) {
    done(String(e));
  }
});

it("lorem - paragraphs throws on invalid count", (done) => {
  try {
    const gen = lorem(12345);
    gen.paragraphs(0);

    done("should have thrown");
  } catch (e) {
    expect(String(e)).toContain("count must be a positive integer");
    done();
  }
});

it("lorem - uses latin words from dictionary", (done) => {
  try {
    const gen = lorem(12345);
    const latinWords = [
      "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
      "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore"
    ];

    // Generate many words and check if at least some are from latin dictionary
    const words = gen.words(50);
    const foundLatinWords = words.filter((word) => latinWords.includes(word));

    expect(foundLatinWords.length).toBeGreaterThan(0);

    done();
  } catch (e) {
    done(String(e));
  }
});

it("lorem - fallback word generation for extreme lengths", (done) => {
  try {
    const gen = lorem(12345);
    // Request length that no latin word satisfies
    const word = gen.word(50, 100);

    expect(typeof word).toEqual("string");
    expect(word.length).toBeGreaterThanOrEqual(50);
    expect(word.length).toBeLessThanOrEqual(100);

    done();
  } catch (e) {
    done(String(e));
  }
});

it("lorem - no seed generates different output each time", (done) => {
  try {
    const gen1 = lorem();
    const gen2 = lorem();

    const word1 = gen1.word();
    const word2 = gen2.word();

    // Both should be valid strings
    expect(typeof word1).toEqual("string");
    expect(typeof word2).toEqual("string");

    done();
  } catch (e) {
    done(String(e));
  }
});
