export type User = {
    id: number;
    name: string;
    email: string;
  };
  
  export type Tutor = {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
  
  export type Species = "gato" | "cachorro";
  
  export type Animal = {
    id: number;
    name: string;
    species: Species;
    breed: string;
    age: number;
    tutorId: number;
    photoUrl?: string;
  };
  