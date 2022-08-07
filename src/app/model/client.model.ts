export class ClientModel {
  constructor(
      // public id: number,
      public nom: string,
      public prenom: string,
      public telephone: number,
      public email: string,
      public adresse: string,
      // Souscription
      public debut: Date,
      public fin: Date,
      // vehicule
      public marque: string,
      public immatriculation: string,
      public puissance: string,
      public encirculation: Date,
  ) {}
}
