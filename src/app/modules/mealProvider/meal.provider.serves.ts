import { TMaleProvider } from './meal.provider.interfaces';
import MaleProvider from './meal.provider.mode';

const CreateMealProviderIntoDB = async (payload: TMaleProvider) => {
  const result = await MaleProvider.create(payload);
  return result;
};

export const mealProviderServes = { CreateMealProviderIntoDB };
