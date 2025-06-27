export const budgetSchema = {
  type: 'array',
  minItems: 1,
  items: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        description: 'Exact budget category name from the source data',
        minLength: 1,
      },
      percent: {
        type: 'integer',
        description: 'Percentage of budget spent (0 or higher)',
        minimum: 0,
      },
      category: {
        type: 'string',
        description: 'Korean language budget category',
        enum: ['식비', '교통비', '공과금,통신비', '주거비', '의료,건강', '취미,여가', '쇼핑', '저축,투자', '기타'],
      },
      subTitle: {
        type: 'string',
        description: 'Summary of spending status in Korean',
      },
      description: {
        type: 'array',
        description: 'Natural conversational insight about spending patterns, split into sentences',
        minItems: 2,
        maxItems: 4,
        items: {
          type: 'string',
          minLength: 20,
          maxLength: 150,
        },
      },
    },
    required: ['title', 'percent', 'category', 'subTitle', 'description'],
    additionalProperties: false,
  },
};
