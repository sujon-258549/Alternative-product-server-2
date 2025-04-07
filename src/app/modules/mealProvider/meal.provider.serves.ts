import { TMaleProvider } from './meal.provider.interfaces';
import MaleProvider from './meal.provider.mode';
import { sendImageCloudinary } from './../utility/uploadImageCloudinary';
const CreateMealProviderIntoDB = async (payload: TMaleProvider) => {
  const result = await MaleProvider.create(payload);
  sendImageCloudinary();
  return result;
};

export const mealProviderServes = { CreateMealProviderIntoDB };
