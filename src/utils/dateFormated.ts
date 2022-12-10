import { formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale';

const dateFormated = (date: string | undefined) => {
  if (date) {
    const dateRelative = formatRelative(new Date(date), new Date(), {
      locale: ru,
    });
    const words = dateRelative.split(' в ');
    return words.join(', ');
  }
};

export default dateFormated;
