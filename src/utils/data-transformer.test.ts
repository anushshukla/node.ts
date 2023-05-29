import dataTransform, { BaseTransformedData } from './data-transform';

describe('data-transform', () => {
  it('should transform data as per the given transformer and data', async () => {
    const transformer = {
      name: 'firstName',
      address: 'address.full',
      phoneNumber: 'phoneNumbers[0]',
    };
    const data = {
      firstName: 'John',
      address: {
        full: '123 Main St',
      },
      phoneNumbers: [123456789],
    };
    interface TransformedData extends BaseTransformedData {
      name: string;
      address: string;
      phoneNumber: number;
    }
    const transformedData: TransformedData = dataTransform<typeof transformer, typeof data, TransformedData>(
      transformer,
      data,
    );

    expect(transformedData.name).toEqual(data.firstName);
    expect(transformedData.address).toEqual(data.address.full);
    expect(transformedData.phoneNumber).toEqual(data.phoneNumbers[0]);
  });
});
