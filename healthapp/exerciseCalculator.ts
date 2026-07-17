interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Arguments {
    dailyHours: number[];
    target: number;
}

const parseArgumentsC = (args: string[]): Arguments => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const numbers = args.slice(2).map(Number);

  if (!numbers.some(isNaN)) {
    return {
      dailyHours: numbers.slice(1),
      target: numbers[0]
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateExercises = (dailyHours: number[], target: number): Result => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(h => h > 0).length;

    const hours = dailyHours.reduce((s, h) => s + h, 0);
    const average = hours / periodLength;
    const success = average >= target;

    let rating: number;
    let ratingDescription: string;

    if (average >= target){
        rating = 3;
        ratingDescription = "great! target reached";
    } else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    } else {
        rating = 1;
        ratingDescription = 'bad';
    }

    return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average
    };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { dailyHours, target } = parseArgumentsC(process.argv);
    console.log(calculateExercises(dailyHours, target));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  };
};