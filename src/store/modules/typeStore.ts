export interface Recado {
  id: string;
  description: string;
  detail: string;
  archive: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  recados: Recado[];
}

export interface GetRecados {
  id: string;
  query?: {
    archive: boolean;
  };
}

export interface PutRecados {
  id: string;
  idRecado: string;
  data: {
    detail?: string;
    description?: string;
    archive?: boolean;
  };
}

export type DeleteRecado = Omit<PutRecados, "data">;

export interface InitialStateUserLogged {
  success: boolean;
  message: string;
  data: User | null;
}
