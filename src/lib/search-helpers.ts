export type SearchField<T> = {
  getValue: (item: T) => string | string[] | undefined;
  weight?: number;
};

export type SearchResult<T> = {
  item: T;
  score: number;
};

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshteinDistance(a: string, b: string): number {
  const previous = Array.from({ length: b.length + 1 }, (_, i) => i);

  for (let i = 1; i <= a.length; i++) {
    const current = [i];

    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;

      current[j] = Math.min(
        current[j - 1] + 1,
        previous[j] + 1,
        previous[j - 1] + cost,
      );
    }

    previous.splice(0, previous.length, ...current);
  }

  return previous[b.length];
}

function isFuzzyMatch(query: string, word: string): boolean {
  if (query.length < 4) return false;

  const distance = levenshteinDistance(query, word);

  const maxDistance = query.length <= 5 ? 1 : query.length <= 8 ? 2 : 3;

  return distance <= maxDistance;
}

export function search<T>(
  items: T[],
  query: string,
  fields: SearchField<T>[],
): SearchResult<T>[] {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return items.map((item) => ({
      item,
      score: 0,
    }));
  }

  const queryWords = normalizedQuery.split(" ");

  return items
    .map((item) => {
      let score = 0;

      for (const field of fields) {
        const rawValue = field.getValue(item);

        if (!rawValue) continue;

        const values = Array.isArray(rawValue) ? rawValue : [rawValue];

        const weight = field.weight ?? 1;

        for (const value of values) {
          const normalizedValue = normalizeText(value);

          // Exact match
          if (normalizedValue === normalizedQuery) {
            score += 100 * weight;
          }

          // Starts with query
          else if (normalizedValue.startsWith(normalizedQuery)) {
            score += 50 * weight;
          }

          // Contains full query
          else if (normalizedValue.includes(normalizedQuery)) {
            score += 25 * weight;
          }

          // Match individual words
          for (const queryWord of queryWords) {
            if (normalizedValue.includes(queryWord)) {
              score += 10 * weight;
              continue;
            }

            // Fuzzy match against individual words
            const valueWords = normalizedValue.split(" ");

            if (
              valueWords.some((valueWord) => isFuzzyMatch(queryWord, valueWord))
            ) {
              score += 5 * weight;
            }
          }
        }
      }

      return {
        item,
        score,
      };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);
}
