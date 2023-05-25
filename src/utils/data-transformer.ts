import lodashGet from 'lodash.get';

export interface BaseTransformedData {
  [key: string]: string | number;
}

export default function dataTransform<
  Transformer extends Record<string, string>,
  Data,
  TransformedData extends BaseTransformedData,
>(transformer: Transformer, data: Data): TransformedData {
  const transformedData = {} as BaseTransformedData;
  for (const transformerKeys of Object.keys(transformer)) {
    transformedData[transformerKeys] = lodashGet(data, transformer[transformerKeys]);
  }
  return transformedData as TransformedData;
}
