export interface Produit {
    id: number;
    nom: string;
    prix: number;
    stock: number;
    categorie: string;
}

export type NouveauProduit = Omit<Produit, 'id'>;