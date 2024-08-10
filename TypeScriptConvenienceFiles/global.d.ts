import DefaultMoodType from "../Components/Helpers/Interfaces/DefaultMoodType";

declare global {
    var recentMoods: DefaultMoodType[]
    var token: string
}
  
  // Ensure this file is included in the TypeScript compilation
  export {};
  